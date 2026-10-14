#!/usr/bin/env python3
"""Make Zarrar.Solutions' two-sided business card using the real website assets.

Run from any directory after installing design/business-card/requirements.txt.
No network calls, AI redraws, system fonts, or changes to the website are needed.
PDF text stays selectable and embedded; SVG type is outlined for portability.
The original OG logo stays a lossless raster, placed at more than 300 ppi.
"""
from __future__ import annotations

import argparse
import base64
import io
import json
import re
import tempfile
from dataclasses import dataclass
from html import escape
from pathlib import Path
from urllib.parse import urlparse
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

import pymupdf
import qrcode
import zxingcpp
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as PDFTrueTypeFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT / "design/business-card"
WIDTH, HEIGHT = 88.9, 50.8  # 3.5 x 2 inches, landscape
BLEED, SAFE, MARK_SPACE = 3.0, 5.0, 3.0  # millimetres
DPI = 300
PREFIX = "zarrar-business-card"
LOGO = ROOT / "public/images/logo-mark-transparent-original.png"
FONT_SPECS = {
    "display": ("fraunces-latin-wght-normal.woff2", 520),
    "italic": ("fraunces-latin-wght-italic.woff2", 420),
    "body": ("inter-latin-wght-normal.woff2", 450),
    "medium": ("inter-latin-wght-normal.woff2", 550),
    "brand": ("montserrat-latin-800-normal.woff2", 800),
}


def number(value: float) -> str:
    return f"{value:.5f}".rstrip("0").rstrip(".") or "0"


def palette_from_css() -> dict[str, str]:
    """Read the current CSS tokens, not the older palette in the README."""
    css = (ROOT / "src/app/globals.css").read_text()
    tokens = dict(re.findall(r"--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;", css))
    return {
        "cream": tokens["ground-700"],
        "ink": tokens["text"],
        "walnut": tokens["text-2"],
        "terracotta": tokens["gold"],
        "copper": tokens["copper"],
        "sand": tokens["ground-300"],
        "paper": tokens["ground-500"],
    }


def load_config(path: Path) -> dict[str, str]:
    data = json.loads(path.read_text())
    required = {
        "name", "title", "company", "tagline", "phone_display", "phone_uri",
        "website", "website_display", "qr_label",
    }
    if not isinstance(data, dict) or not required.issubset(data):
        raise ValueError("The card configuration is missing required fields.")
    if any(not isinstance(data[key], str) or not data[key].strip() for key in required):
        raise ValueError("All card fields must be non-empty strings.")
    url = urlparse(data["website"])
    if url.scheme != "https" or not url.hostname or url.username or url.password:
        raise ValueError("Use a public HTTPS website URL without credentials.")
    if data["website_display"] != data["website"].removeprefix("https://").rstrip("/"):
        raise ValueError("The printed website and QR destination must match.")
    if not re.fullmatch(r"tel:\+[1-9][0-9]{7,14}", data["phone_uri"]):
        raise ValueError("phone_uri must be an international tel:+... link.")
    display_digits = re.sub(r"\D", "", data["phone_display"])
    if display_digits.startswith("0"):
        display_digits = "92" + display_digits[1:]  # Pakistan local display
    if display_digits != data["phone_uri"].removeprefix("tel:+"):
        raise ValueError("The displayed phone number and telephone link differ.")
    if len(data["company"].split(".")) != 2:
        raise ValueError("The existing brand lockup expects the form Zarrar.Solutions.")
    return data


@dataclass
class Font:
    pdf_name: str
    path: Path
    source: TTFont

    def __post_init__(self) -> None:
        self.glyphs = self.source.getGlyphSet()
        self.cmap = self.source.getBestCmap()
        self.units = self.source["head"].unitsPerEm

    def outline(self, text: str, size: float, tracking: float,
                x: float, y: float) -> tuple[str, tuple[float, float, float, float]]:
        """An SVG path and true ink bounds, in top-left millimetre coordinates."""
        pen = SVGPathPen(self.glyphs, ntos=number)
        bounds = BoundsPen(self.glyphs)
        scale = size / mm / self.units
        cursor = x
        for char in text:
            if ord(char) not in self.cmap:
                raise ValueError(f"{self.pdf_name} has no glyph for {char!r}")
            glyph = self.glyphs[self.cmap[ord(char)]]
            transform = (scale, 0, 0, -scale, cursor, y)
            glyph.draw(TransformPen(pen, transform))
            glyph.draw(TransformPen(bounds, transform))
            cursor += glyph.width * scale + tracking / mm
        if bounds.bounds is None:
            raise ValueError("Text must include a visible glyph.")
        return pen.getCommands(), bounds.bounds


def prepare_fonts(folder: Path) -> dict[str, Font]:
    fonts = {}
    for key, (filename, weight) in FONT_SPECS.items():
        font = TTFont(ROOT / "src/fonts" / filename, recalcTimestamp=False)
        if "fvar" in font:
            font = instantiateVariableFont(font, {"wght": weight}, inplace=True)
        font.flavor = None
        path = folder / f"{key}.ttf"
        font.save(path)
        pdf_name = f"Zarrar-{key}"
        pdfmetrics.registerFont(PDFTrueTypeFont(pdf_name, str(path)))
        fonts[key] = Font(pdf_name, path, font)
    return fonts


class Artwork:
    """One drawing, recorded as both vector PDF and portable outlined SVG."""

    def __init__(self, pdf: canvas.Canvas, fonts: dict[str, Font],
                 page_height: float, offset: float, live_links: bool) -> None:
        self.pdf, self.fonts = pdf, fonts
        self.page_height, self.offset, self.live_links = page_height, offset, live_links
        self.svg: list[str] = []
        self.critical: list[tuple[str, tuple[float, float, float, float]]] = []
        self.logo_ppi: list[float] = []
        self.point_sizes: list[float] = []

    def point(self, x: float, y: float) -> tuple[float, float]:
        return (x + self.offset) * mm, (self.page_height - self.offset - y) * mm

    def rect(self, x: float, y: float, w: float, h: float, color: str) -> None:
        self.pdf.setFillColor(HexColor(color))
        self.pdf.rect(*self.point(x, y + h), w * mm, h * mm, stroke=0, fill=1)
        self.svg.append(f'<rect x="{number(x)}" y="{number(y)}" width="{number(w)}" '
                        f'height="{number(h)}" fill="{color}"/>')

    def line(self, x1: float, y1: float, x2: float, y2: float,
             color: str, width: float = 0.35) -> None:
        self.pdf.setStrokeColor(HexColor(color))
        self.pdf.setLineWidth(width)
        self.pdf.line(*self.point(x1, y1), *self.point(x2, y2))
        self.svg.append(f'<path d="M{number(x1)} {number(y1)}L{number(x2)} {number(y2)}" '
                        f'fill="none" stroke="{color}" stroke-width="{number(width / mm)}"/>')

    def circle(self, x: float, y: float, r: float, color: str) -> None:
        self.pdf.setFillColor(HexColor(color))
        self.pdf.circle(*self.point(x, y), r * mm, stroke=0, fill=1)
        self.svg.append(f'<circle cx="{number(x)}" cy="{number(y)}" '
                        f'r="{number(r)}" fill="{color}"/>')

    def width(self, text: str, font: str, size: float, tracking: float = 0) -> float:
        return (pdfmetrics.stringWidth(text, self.fonts[font].pdf_name, size)
                + tracking * max(0, len(text) - 1)) / mm

    def text(self, text: str, x: float, y: float, font: str, size: float,
             color: str, tracking: float = 0, align: str = "left",
             uri: str | None = None) -> float:
        width = self.width(text, font, size, tracking)
        if align == "center":
            x -= width / 2
        elif align == "right":
            x -= width
        selected = self.fonts[font]
        path, bounds = selected.outline(text, size, tracking, x, y)
        self.critical.append((text, bounds))
        self.point_sizes.append(size)
        self.pdf.setFillColor(HexColor(color))
        obj = self.pdf.beginText(*self.point(x, y))
        obj.setFont(selected.pdf_name, size)
        obj.setCharSpace(tracking)
        obj.textOut(text)
        self.pdf.drawText(obj)
        self.svg.append(f'<g role="img" aria-label="{escape(text, quote=True)}">'
                        f'<path d="{path}" fill="{color}"/></g>')
        if uri and self.live_links:
            left, top, right, bottom = bounds
            self.link(uri, left, top - 0.7, right - left, bottom - top + 1.4)
        return width

    def link(self, uri: str, x: float, y: float, w: float, h: float) -> None:
        if self.live_links:
            self.pdf.linkURL(uri, (*self.point(x, y + h), *self.point(x + w, y)),
                             relative=0, thickness=0)

    def logo(self, image: Image.Image, x: float, y: float, width: float) -> None:
        height = width * image.height / image.width
        self.pdf.drawImage(ImageReader(image), *self.point(x, y + height),
                           width * mm, height * mm, mask="auto")
        stream = io.BytesIO()
        image.save(stream, format="PNG", optimize=True)
        encoded = base64.b64encode(stream.getvalue()).decode("ascii")
        self.svg.append(f'<image x="{number(x)}" y="{number(y)}" '
                        f'width="{number(width)}" height="{number(height)}" '
                        f'xlink:href="data:image/png;base64,{encoded}"/>')
        self.critical.append(("Original ZS logo", (x, y, x + width, y + height)))
        self.logo_ppi.append(image.width / (width / 25.4))

    def frame(self, color: str) -> None:
        inset = 3.25
        right, bottom = WIDTH - inset, HEIGHT - inset
        for coords in [(inset, inset, right, inset), (right, inset, right, bottom),
                       (right, bottom, inset, bottom), (inset, bottom, inset, inset)]:
            self.line(*coords, color, 0.3)

    def qr(self, data: str, x: float, y: float, size: float,
           ink: str, paper: str) -> dict:
        qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q, border=4)
        qr.add_data(data, optimize=0)
        qr.make(fit=True)
        matrix = qr.get_matrix()  # Includes the full four-module quiet zone.
        step = size / len(matrix)
        self.rect(x, y, size, size, paper)
        # Fill all runs in ONE compound path: independent painted rectangles
        # can show antialias seams between adjacent rows in a PDF rasterizer.
        pdf_path = self.pdf.beginPath()
        svg_runs = []
        for row_index, row in enumerate(matrix):
            column = 0
            while column < len(row):
                if not row[column]:
                    column += 1
                    continue
                start = column
                while column < len(row) and row[column]:
                    column += 1
                rx, ry, rw = x + start * step, y + row_index * step, (column - start) * step
                pdf_path.rect(*self.point(rx, ry + step), rw * mm, step * mm)
                svg_runs.append(f'M{number(rx)} {number(ry)}h{number(rw)}'
                                f'v{number(step)}h-{number(rw)}z')
        self.pdf.setFillColor(HexColor(ink))
        self.pdf.drawPath(pdf_path, stroke=0, fill=1, fillMode=1)
        self.svg.append(f'<path d="{" ".join(svg_runs)}" fill="{ink}" fill-rule="nonzero"/>')
        self.critical.append(("QR including quiet zone", (x, y, x + size, y + size)))
        self.link(data, x, y, size, size)
        return {"payload": data, "error_correction": "Q", "version": qr.version,
                "size_mm": size, "module_mm": round(step, 4), "quiet_zone_modules": 4}

    def export_svg(self, path: Path, label: str) -> None:
        path.write_text(
            f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'width="{WIDTH + 2 * BLEED}mm" height="{HEIGHT + 2 * BLEED}mm" '
            f'viewBox="{-BLEED} {-BLEED} {WIDTH + 2 * BLEED} {HEIGHT + 2 * BLEED}" '
            f'role="img" aria-labelledby="title description">\n'
            f'<title id="title">{escape(label)}</title>\n'
            f'<desc id="description">88.9 × 50.8 mm trim plus 3 mm bleed. '
            'Outlined vector type and QR; original embedded raster logo. '
            'Edit card.json and rerun the Python generator to change text.</desc>\n'
            + "\n".join(self.svg) + "\n</svg>\n"
        )

    def validate_layout(self) -> None:
        for label, (left, top, right, bottom) in self.critical:
            if min(left, top) < SAFE or right > WIDTH - SAFE or bottom > HEIGHT - SAFE:
                raise ValueError(f"Content exceeds the {SAFE} mm safe zone: {label!r}")
        if min(self.logo_ppi) < DPI:
            raise ValueError("The original logo must retain at least 300 effective ppi.")


def lockup(a: Artwork, company: str, x: float, y: float, size: float,
           color: str, accent: str, centered: bool = False) -> None:
    first, second = company.upper().split(".")
    tracking = size * 0.04
    left = a.width(first, "brand", size, tracking)
    right = a.width(second, "brand", size, tracking)
    gap = size * 0.48 / mm
    radius = size * 0.083 / mm
    if centered:
        x -= (left + 2 * gap + 2 * radius + right) / 2
    a.text(first, x, y, "brand", size, color, tracking)
    bead = x + left + gap + radius
    a.circle(bead, y - size * 0.34 / mm, radius, accent)
    a.text(second, bead + radius + gap, y, "brand", size, color, tracking)


def contact_side(a: Artwork, data: dict, p: dict, logo: Image.Image) -> None:
    a.rect(-BLEED, -BLEED, WIDTH + 2 * BLEED, HEIGHT + 2 * BLEED, p["cream"])
    a.frame(p["sand"])
    a.logo(logo, 6.5, 6.6, 7.5)
    lockup(a, data["company"], 17.2, 11.15, 7.1, p["ink"], p["terracotta"])
    # A small gallery-hatch detail, taken from the OG artwork's visual language.
    for x in (77.2, 79.4, 81.6):
        a.line(x - 1.6, 10.85, x + 0.3, 8.95, p["terracotta"], 0.45)
    a.text(data["name"], 6.5, 26.1, "display", 22, p["ink"])
    a.line(6.5, 31.0, 10.4, 31.0, p["terracotta"], 1.0)
    a.text(data["title"].upper(), 12.2, 31.85, "medium", 7.0, p["walnut"], 0.5)
    a.line(6.5, 36.3, WIDTH - 6.5, 36.3, p["sand"], 0.35)
    a.text("PHONE / WHATSAPP", 6.5, 40.4, "medium", 5.8, p["walnut"], 0.5)
    a.text(data["phone_display"], 6.5, 45.1, "medium", 9.0, p["ink"], uri=data["phone_uri"])
    a.text("WEBSITE", 46.0, 40.4, "medium", 5.8, p["walnut"], 0.5)
    a.text(data["website_display"], 46.0, 45.1, "body", 8.0, p["ink"], uri=data["website"])


def brand_side(a: Artwork, data: dict, p: dict, logo: Image.Image) -> dict:
    a.rect(-BLEED, -BLEED, WIDTH + 2 * BLEED, HEIGHT + 2 * BLEED, p["ink"])
    a.frame(p["walnut"])
    center = 29.0
    a.logo(logo, center - 9.0, 9.15, 18.0)
    lockup(a, data["company"], center, 32.7, 8.15, p["cream"], p["copper"], centered=True)
    a.text(data["tagline"], center, 39.0, "italic", 9.0, p["sand"], align="center")
    a.line(53.4, 11.0, 53.4, 39.8, p["walnut"], 0.4)
    qr = a.qr(data["website"], 59.7, 10.2, 23.0, p["ink"], p["cream"])
    a.text(data["qr_label"], 71.2, 39.0, "medium", 6.0, p["sand"], 0.45, align="center")
    return qr


def crop_marks(pdf: canvas.Canvas, page_h: float, offset: float) -> None:
    pdf.saveState()
    pdf.setStrokeColorCMYK(0, 0, 0, 1)
    pdf.setLineWidth(0.25)

    def pt(x: float, y: float) -> tuple[float, float]:
        return (x + offset) * mm, (page_h - offset - y) * mm

    # The marks start 0.5 mm OUTSIDE the bleed, never in the finished artwork.
    for y in (0, HEIGHT):
        pdf.line(*pt(-BLEED - 2.5, y), *pt(-BLEED - 0.5, y))
        pdf.line(*pt(WIDTH + BLEED + 0.5, y), *pt(WIDTH + BLEED + 2.5, y))
    for x in (0, WIDTH):
        pdf.line(*pt(x, -BLEED - 2.5), *pt(x, -BLEED - 0.5))
        pdf.line(*pt(x, HEIGHT + BLEED + 0.5), *pt(x, HEIGHT + BLEED + 2.5))
    pdf.restoreState()


def make_pdf(output: Path, data: dict, p: dict, fonts: dict, logo: Image.Image,
             for_print: bool) -> tuple[list[Artwork], dict]:
    offset = BLEED + MARK_SPACE if for_print else 0.0
    page_w, page_h = WIDTH + 2 * offset, HEIGHT + 2 * offset
    pdf = canvas.Canvas(str(output), pagesize=(page_w * mm, page_h * mm),
                        pageCompression=1, invariant=1, initialFontName="Zarrar-body")
    pdf.setTitle(f'{data["name"]} — {data["company"]} business card')
    pdf.setAuthor(data["company"])
    pdf.setSubject("Front / contact, then reverse / brand. Two-sided, head-to-head.")
    pdf.setCreator("Zarrar.Solutions / scripts/generate_business_card.py")
    drawings = []
    qr = {}
    for side in ("front", "back"):
        pdf.setTrimBox((offset * mm, offset * mm,
                        (offset + WIDTH) * mm, (offset + HEIGHT) * mm))
        if for_print:
            pdf.setBleedBox(((offset - BLEED) * mm, (offset - BLEED) * mm,
                             (offset + WIDTH + BLEED) * mm, (offset + HEIGHT + BLEED) * mm))
        else:
            pdf.setBleedBox((0, 0, page_w * mm, page_h * mm))
        art = Artwork(pdf, fonts, page_h, offset, live_links=not for_print)
        if side == "front":
            contact_side(art, data, p, logo)
        else:
            qr = brand_side(art, data, p, logo)
        art.validate_layout()
        if for_print:
            art.export_svg(output.parent / f"{side}.svg", f'{data["company"]} — {side}')
            crop_marks(pdf, page_h, offset)
        drawings.append(art)
        pdf.showPage()
    pdf.save()
    return drawings, qr


def render_sides(pdf_path: Path, output: Path) -> list[Image.Image]:
    images = []
    with pymupdf.open(pdf_path) as doc:
        for index, page in enumerate(doc):
            pixmap = page.get_pixmap(dpi=DPI, alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            image.save(output / ("front.png" if index == 0 else "back.png"), dpi=(DPI, DPI))
            images.append(image)
    return images


def preview(images: list[Image.Image], data: dict, p: dict,
            fonts: dict, output: Path) -> None:
    """Flat, faithful front/back presentation, not an invented AI mockup."""
    sheet = Image.new("RGB", (2400, 1300), p["paper"])
    draw = ImageDraw.Draw(sheet)

    def text(value: str, xy: tuple[int, int], key: str, size: int,
             fill: str, anchor: str = "la") -> None:
        draw.text(xy, value, fill=fill, font=ImageFont.truetype(str(fonts[key].path), size), anchor=anchor)

    text("ZARRAR.SOLUTIONS  /  BUSINESS CARD", (110, 85), "medium", 25, p["walnut"])
    text(data["name"], (106, 137), "display", 91, p["ink"])
    text("TWO SIDES. ONE IDENTITY.", (2290, 100), "medium", 24, p["terracotta"], "ra")
    draw.line((110, 275, 2290, 275), fill=p["sand"], width=2)
    for index, (x, image) in enumerate(zip((110, 1240), images)):
        y = 340
        shadow = Image.new("RGBA", sheet.size)
        ImageDraw.Draw(shadow).rectangle((x + 5, y + 20, x + image.width + 5, y + image.height + 20),
                                        fill=(26, 20, 18, 38))
        sheet = Image.alpha_composite(sheet.convert("RGBA"), shadow.filter(ImageFilter.GaussianBlur(22)))
        sheet.paste(image, (x, y))
        draw = ImageDraw.Draw(sheet)
        text("01 / FRONT — CONTACT" if index == 0 else "02 / REVERSE — BRAND", (x, 991),
             "medium", 24, p["walnut"])
    draw.line((110, 1080, 2290, 1080), fill=p["sand"], width=2)
    for index, key in enumerate(("cream", "ink", "terracotta", "copper")):
        x = 110 + index * 330
        draw.rectangle((x, 1130, x + 32, 1162), fill=p[key], outline=p["sand"], width=1)
        text(key.upper(), (x + 49, 1127), "medium", 18, p["walnut"])
        text(p[key].upper(), (x + 49, 1154), "body", 18, p["walnut"])
    text('3.5 × 2 in  /  88.9 × 50.8 mm', (2290, 1127), "medium", 22, p["ink"], "ra")
    text("Print artwork includes 3 mm bleed.", (2290, 1162), "body", 21, p["walnut"], "ra")
    sheet.convert("RGB").save(output / f"{PREFIX}-preview.png", optimize=True)


def contrast(first: str, second: str) -> float:
    def luminance(value: str) -> float:
        channels = [int(value[i:i + 2], 16) / 255 for i in (1, 3, 5)]
        linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
        return sum(c * w for c, w in zip(linear, (0.2126, 0.7152, 0.0722)))
    light, dark = sorted((luminance(first), luminance(second)), reverse=True)
    return (light + 0.05) / (dark + 0.05)


def preflight(output: Path, data: dict, palette: dict, drawings: list[Artwork], qr: dict) -> dict:
    def close(actual: float, expected: float) -> None:
        if abs(actual - expected) > 0.01:
            raise ValueError(f"Unexpected PDF dimension: {actual} instead of {expected}")

    minimum_contrast = min(contrast(palette["ink"], palette["cream"]),
                           contrast(palette["walnut"], palette["cream"]),
                           contrast(palette["sand"], palette["ink"]))
    if minimum_contrast < 4.5:
        raise ValueError("The current website palette no longer gives sufficient text contrast.")
    for suffix in ("print", "digital"):
        with pymupdf.open(output / f"{PREFIX}-{suffix}.pdf") as document:
            if len(document) != 2:
                raise ValueError("The card must contain exactly two pages.")
            text = document[0].get_text()
            for value in (data["name"], data["phone_display"], data["website_display"]):
                if value not in text:
                    raise ValueError(f"PDF text missing: {value}")
            for page in document:
                close(page.trimbox.width / mm, WIDTH)
                close(page.trimbox.height / mm, HEIGHT)
                if suffix == "print":
                    close(page.bleedbox.width / mm, WIDTH + 2 * BLEED)
                    close(page.bleedbox.height / mm, HEIGHT + 2 * BLEED)
                    close(page.mediabox.width / mm, WIDTH + 2 * (BLEED + MARK_SPACE))
                    close(page.mediabox.height / mm, HEIGHT + 2 * (BLEED + MARK_SPACE))
                for font in page.get_fonts():
                    if not document.extract_font(font[0])[3]:
                        raise ValueError(f"PDF font not embedded: {font[3]}")
            if suffix == "digital":
                links = {link.get("uri", "") for page in document for link in page.get_links()}
                if not {data["phone_uri"], data["website"]}.issubset(links):
                    raise ValueError("The digital card is missing its phone or website link.")
            # Decode the QR from the ACTUAL PDF render, not just the input matrix.
            for dpi in (150, 300):
                pix = document[1].get_pixmap(dpi=dpi, alpha=False, clip=document[1].trimbox)
                image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
                payloads = [result.text for result in zxingcpp.read_barcodes(image)]
                if data["website"] not in payloads:
                    raise ValueError(f"QR cannot be decoded in {suffix} PDF at {dpi} dpi.")
    report = {
        "status": "PASS",
        "trim_mm": [WIDTH, HEIGHT],
        "bleed_mm": BLEED,
        "minimum_content_inset_mm": SAFE,
        "sides": ["front / contact", "reverse / brand"],
        "palette_source": "src/app/globals.css",
        "palette": palette,
        "logo_source": str(LOGO.relative_to(ROOT)),
        "minimum_original_logo_ppi": round(min(v for art in drawings for v in art.logo_ppi), 2),
        "pdf_text": "Selectable; true website fonts embedded and subset",
        "svg_type": "Outlined paths; no external fonts or images",
        "minimum_label_type_pt": min(v for art in drawings for v in art.point_sizes),
        "minimum_contact_type_pt": 8,
        "minimum_text_contrast_ratio": round(minimum_contrast, 2),
        "qr": {**qr, "verified_from_both_pdfs_at_dpi": [150, 300]},
        "digital_links_verified": [data["phone_uri"], data["website"]],
        "color_space": "Website RGB artwork; K-only crop marks. Not a certified PDF/X file.",
        "printer_note": "Convert with the printer's stock/press ICC profile if CMYK is required; approve a physical proof.",
    }
    (output / "preflight.json").write_text(json.dumps(report, indent=2) + "\n")
    return report


def package(output: Path) -> None:
    members = [
        f"{PREFIX}-print.pdf", f"{PREFIX}-digital.pdf", f"{PREFIX}-preview.png",
        "front.svg", "back.svg", "front.png", "back.png", "preflight.json",
    ]
    with ZipFile(output / f"{PREFIX}-print-pack.zip", "w", ZIP_DEFLATED) as archive:
        files = [(output / name, name) for name in members]
        files.append((DESIGN / "PRINT-README.txt", "PRINT-README.txt"))
        for path, name in files:
            item = ZipInfo(name, date_time=(2026, 10, 14, 0, 0, 0))
            item.compress_type = ZIP_DEFLATED
            item.external_attr = 0o644 << 16
            archive.writestr(item, path.read_bytes())


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=DESIGN / "card.json")
    parser.add_argument("--output-dir", type=Path, default=DESIGN / "exports")
    args = parser.parse_args()
    data, p = load_config(args.config), palette_from_css()
    output = args.output_dir.resolve()
    output.mkdir(parents=True, exist_ok=True)
    with Image.open(LOGO) as source:
        rgba = source.convert("RGBA")
        logo = rgba.crop(rgba.getbbox())  # Remove empty canvas, never redraw/resample the logo.
    with tempfile.TemporaryDirectory(prefix="zarrar-card-") as temporary:
        fonts = prepare_fonts(Path(temporary))
        drawings, qr = make_pdf(output / f"{PREFIX}-print.pdf", data, p, fonts, logo, True)
        make_pdf(output / f"{PREFIX}-digital.pdf", data, p, fonts, logo, False)
        images = render_sides(output / f"{PREFIX}-digital.pdf", output)
        preview(images, data, p, fonts, output)
        report = preflight(output, data, p, drawings, qr)
        package(output)
        for font in fonts.values():
            font.source.close()
    print(f"Created {output}")
    print(f"Preflight: {report['status']} — 2 pages, embedded fonts, 3 mm bleed, 5 mm safe zone.")
    print("QR decoded from both PDFs at 150 and 300 dpi. Original logo exceeds 300 ppi.")
    print("Colour: RGB website palette. Ask the printer for their required CMYK profile/proof.")


if __name__ == "__main__":
    main()
