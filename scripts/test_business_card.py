"""Regression checks for the independent business-card assets.

Generate first, then run:
  .venv/bin/python -m unittest discover -s scripts -p 'test_business_card.py'
"""
import base64
import io
import json
import tempfile
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

import pymupdf
import zxingcpp
from PIL import Image, ImageColor
from reportlab.lib.units import mm

import generate_business_card as card

OUTPUT = card.DESIGN / "exports"


class CardTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = card.load_config(card.DESIGN / "card.json")
        cls.palette = card.palette_from_css()

    def test_current_brand_and_requested_details(self):
        self.assertEqual(self.data["name"], "Muhammad Zarrar")
        self.assertEqual(self.data["company"], "Zarrar.Solutions")
        self.assertEqual(self.data["phone_display"].replace(" ", ""), "03335666050")
        self.assertEqual(self.data["website"], "https://zarrarsolutions.vercel.app")
        self.assertEqual(self.palette["cream"], "#f3e4c7")
        self.assertEqual(self.palette["ink"], "#1a1412")
        self.assertEqual(self.palette["terracotta"], "#a3492f")
        self.assertEqual(self.palette["copper"], "#e7925e")

    def test_invalid_contact_links_are_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "card.json"
            for field, value in [
                ("website", "http://example.com"),
                ("website_display", "zarrar.solutions"),
                ("phone_uri", "tel:+923331234567"),
                ("name", ""),
            ]:
                with self.subTest(field=field):
                    data = {**self.data, field: value}
                    path.write_text(json.dumps(data))
                    with self.assertRaises(ValueError):
                        card.load_config(path)

    def test_print_page_boxes_and_embedded_fonts(self):
        with pymupdf.open(OUTPUT / f"{card.PREFIX}-print.pdf") as document:
            self.assertEqual(len(document), 2)
            for page in document:
                for actual, expected in zip(page.trimbox, (6, 6, 94.9, 56.8)):
                    self.assertAlmostEqual(actual / mm, expected, places=3)
                for actual, expected in zip(page.bleedbox, (3, 3, 97.9, 59.8)):
                    self.assertAlmostEqual(actual / mm, expected, places=3)
                self.assertAlmostEqual(page.mediabox.width / mm, 100.9, places=3)
                self.assertAlmostEqual(page.mediabox.height / mm, 62.8, places=3)
                self.assertFalse(page.get_links(), "No clickable annotations in the print master")
                for font in page.get_fonts():
                    self.assertTrue(document.extract_font(font[0])[3], font[3])

    def test_selectable_text_and_digital_links(self):
        with pymupdf.open(OUTPUT / f"{card.PREFIX}-digital.pdf") as document:
            text = document[0].get_text()
            for key in ("name", "phone_display", "website_display"):
                self.assertIn(self.data[key], text)
            self.assertIn("CHIEF EXECUTIVE OFFICER", text)
            self.assertNotIn("@", text, "No unrequested email should appear")
            self.assertIn(self.data["tagline"], document[1].get_text())
            for page in document:
                self.assertAlmostEqual(page.rect.width / mm, 88.9, places=3)
                self.assertAlmostEqual(page.rect.height / mm, 50.8, places=3)
            links = [link.get("uri") for page in document for link in page.get_links()]
            self.assertEqual(links.count(self.data["website"]), 2)
            self.assertIn(self.data["phone_uri"], links)

    def test_png_size_dpi_and_qr(self):
        for side, color in [("front", "cream"), ("back", "ink")]:
            with Image.open(OUTPUT / f"{side}.png") as image:
                self.assertEqual(image.size, (1050, 600))
                for dpi in image.info["dpi"]:
                    self.assertAlmostEqual(dpi, 300, places=1)
                # PDF real-number -> 8-bit RGB rasterization can round a channel
                # down by one even when the source hex color is exact.
                expected = ImageColor.getrgb(self.palette[color])
                self.assertTrue(all(abs(a - b) <= 1 for a, b in zip(image.getpixel((0, 0)), expected)))
                if side == "back":
                    self.assertIn(self.data["website"], [r.text for r in zxingcpp.read_barcodes(image)])
                    smaller = image.resize((525, 300), Image.Resampling.LANCZOS)
                    self.assertIn(self.data["website"], [r.text for r in zxingcpp.read_barcodes(smaller)])

    def test_svg_is_self_contained_and_logo_is_not_redrawn(self):
        with Image.open(card.LOGO) as original:
            original = original.convert("RGBA")
            cropped = original.crop(original.getbbox())
        ns = {"s": "http://www.w3.org/2000/svg"}
        for side in ("front", "back"):
            svg = ET.parse(OUTPUT / f"{side}.svg").getroot()
            self.assertEqual(svg.attrib["viewBox"], "-3.0 -3.0 94.9 56.8")
            self.assertTrue(svg.findall(".//s:path", ns))
            self.assertFalse(svg.findall(".//s:text", ns), "All SVG text must be outlined")
            self.assertFalse(svg.findall(".//s:script", ns))
            images = svg.findall(".//s:image", ns)
            self.assertEqual(len(images), 1, "The original logo is the only raster")
            uri = images[0].attrib["{http://www.w3.org/1999/xlink}href"]
            self.assertTrue(uri.startswith("data:image/png;base64,"))
            with Image.open(io.BytesIO(base64.b64decode(uri.split(",", 1)[1]))) as actual:
                self.assertEqual(actual.size, cropped.size)
                self.assertEqual(actual.tobytes(), cropped.tobytes())

    def test_preflight_and_download_pack(self):
        report = json.loads((OUTPUT / "preflight.json").read_text())
        self.assertEqual(report["status"], "PASS")
        self.assertGreaterEqual(report["minimum_original_logo_ppi"], 300)
        self.assertGreaterEqual(report["minimum_text_contrast_ratio"], 4.5)
        self.assertEqual(report["qr"]["quiet_zone_modules"], 4)
        self.assertEqual(report["qr"]["verified_from_both_pdfs_at_dpi"], [150, 300])
        with ZipFile(OUTPUT / f"{card.PREFIX}-print-pack.zip") as archive:
            self.assertIsNone(archive.testzip())
            for name in archive.namelist():
                self.assertNotIn("..", name)
                expected = card.DESIGN / name if name == "PRINT-README.txt" else OUTPUT / name
                self.assertEqual(archive.read(name), expected.read_bytes())

    def test_long_name_fails_safely_instead_of_clipping(self):
        from reportlab.pdfgen import canvas
        with tempfile.TemporaryDirectory() as directory:
            fonts = card.prepare_fonts(Path(directory))
            pdf = canvas.Canvas(io.BytesIO(), initialFontName="Zarrar-body")
            art = card.Artwork(pdf, fonts, card.HEIGHT, 0, False)
            art.text("Muhammad Zarrar " * 6, 6.5, 26.1, "display", 22, self.palette["ink"])
            with self.assertRaisesRegex(ValueError, "safe zone"):
                art.validate_layout()
            for font in fonts.values():
                font.source.close()


if __name__ == "__main__":
    unittest.main()
