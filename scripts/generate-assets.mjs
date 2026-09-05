/**
 * Generates the branded OG image set (home + per-page variants, 1200x630).
 *
 * Pure Node — each card is composed as SVG and rasterised with @resvg/resvg-js
 * using the site's REAL self-hosted fonts (Fraunces display + Inter utility),
 * so a share card is typeset like the site, not like a system fallback.
 *
 * Palette mirrors src/app/globals.css tokens. If a token changes there,
 * change it here and re-run:  node scripts/generate-assets.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = process.cwd();

/* ---- Palette (mirror of globals.css) ---- */
const PUTTY = "#C4C3B6"; // --ground-700 · the canvas
const INK = "#111110"; // --ember-500   · headline
const GRAPHITE = "#3F3E3B"; // --ember-400   · support text
const FRAME = "rgba(17,17,16,0.30)"; // museum plate edge
const HATCH = "rgba(17,17,16,0.14)"; // corner hatch motif

/* ---- Brand assets & fonts ---- */
const LOGO_SVG = path.join(ROOT, "public/images/logo-mark.svg");
const FRAUNCES = await readFile(
  path.join(ROOT, "src/fonts/fraunces-latin-wght-normal.woff2"),
);
const FRAUNCES_ITALIC = await readFile(
  path.join(ROOT, "src/fonts/fraunces-latin-wght-italic.woff2"),
);
const INTER = await readFile(
  path.join(ROOT, "src/fonts/inter-latin-wght-normal.woff2"),
);

/* Supersampled canvas: 2400x1260, rendered to 1200x630. */
const W = 2400;
const H = 1260;
const MARK = 560; // clay ZS monogram, square
const TX = 820; // text column origin

const esc = (t) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---- Auto-fit: no line may cross the plate frame ----
 * Frame right edge sits at x=2344 on the 2400 canvas; text must stop ~100px
 * short of it. Every line is measured with the real fonts at its base size
 * and scaled down if it would overflow — set once, safe forever. */
const TEXT_MAX_X = 2240;
const TEXT_MAX_W = TEXT_MAX_X - TX;

const fontFiles = [FRAUNCES, FRAUNCES_ITALIC, INTER];

const measureCache = new Map();

/** Rendered width (px, 2400-canvas scale) of one text run at `size`. */
function measureText(text, { family, weight, italic, size, ls }) {
  const key = `${text}|${family}|${weight}|${italic}|${size}|${ls}`;
  if (measureCache.has(key)) return measureCache.get(key);
  const h = Math.ceil(size * 2.2);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="3600" height="${h}" viewBox="0 0 3600 ${h}">` +
    `<rect width="3600" height="${h}" fill="#ffffff"/>` +
    `<text x="10" y="${Math.ceil(h * 0.72)}" font-family="${family}" font-weight="${weight}"` +
    `${italic ? ` font-style="italic"` : ""} font-size="${size}" letter-spacing="${ls}" fill="#000000">${esc(text)}</text></svg>`;
  const png = new Resvg(svg, { fontFiles }).render().asPng();
  const tmp = path.join("/tmp", `og-measure-${Math.abs(hash(key))}.png`);
  fs.writeFileSync(tmp, png);
  execFileSync("convert", [tmp, "-colorspace", "gray", "-threshold", "50%", "-negate", tmp]);
  const geom = execFileSync("identify", ["-format", "%@", tmp]).toString();
  const w = parseInt(geom.split("x")[0], 10) || 0;
  measureCache.set(key, w);
  return w;
}

function hash(s) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return h;
}

/** Largest size ≤ base that keeps every line inside TEXT_MAX_W. */
function fitSize(lines, spec, base) {
  let size = base;
  for (const line of lines) {
    const w = measureText(line, { ...spec, size });
    if (w > TEXT_MAX_W) size = Math.min(size, Math.floor((base * TEXT_MAX_W) / w));
  }
  return size;
}

/** The mark on the card: the PIXEL ORIGINAL (transparent cut), inlined as
 * a data URI — the flat SVG rebuild stays reserved for tiny sizes. */
async function markInner() {
  const png = await readFile(path.join(ROOT, "public/images/logo-mark-transparent-original.png"));
  return "data:image/png;base64," + png.toString("base64");
}

/** Branded OG card: putty gallery wall, framed, clay mark, Fraunces headline.
 * Root carries width/height at FINAL size with a 2x viewBox — the supersample
 * is native SVG scaling (resvg ignores fitTo when fontFiles is set). */
function ogSvg({ eyebrow, lines, sub }, mark) {
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 ${W} ${H}">`,
    `<rect width="${W}" height="${H}" fill="${PUTTY}"/>`,
    /* museum plate frame */
    `<rect x="56" y="56" width="${W - 112}" height="${H - 112}" fill="none" stroke="${FRAME}" stroke-width="3"/>`,
    /* corner hatch — the site's scrim motif, clipped inside the frame */
    `<clipPath id="in-frame"><rect x="58" y="58" width="${W - 116}" height="${H - 116}"/></clipPath>`,
    `<g clip-path="url(#in-frame)" stroke="${HATCH}" stroke-width="4">`,
  ];
  for (let x = 1620; x <= W + 90; x += 36) {
    parts.push(`<line x1="${x}" y1="${H}" x2="${x + 90}" y2="${H - 90}"/>`);
  }
  parts.push(`</g>`);
  /* clay ZS monogram — the only colour on the card */
  parts.push(
    `<g transform="translate(110 ${(H - MARK) / 2})">` +
      `<image href="${mark}" x="0" y="0" width="${MARK}" height="${MARK}"/>` +
      `</g>`,
  );
  /* fitted sizes — measured with the real fonts, never allowed to cross the frame */
  const eyebrowSize = fitSize([eyebrow], { family: "Inter", weight: 600, ls: 10 }, 34);
  const headlineSize = fitSize(lines, { family: "Fraunces", weight: 620, ls: -1 }, 118);
  const subSize = fitSize(sub, { family: "Fraunces", weight: 400, italic: true, ls: 0 }, 54);

  /* eyebrow — Inter caps label */
  parts.push(
    `<text x="${TX}" y="262" font-family="Inter" font-weight="600" font-size="${eyebrowSize}" letter-spacing="10" fill="${GRAPHITE}">${esc(eyebrow)}</text>`,
  );
  /* headline — Fraunces display, ink */
  let y = 424;
  for (const line of lines) {
    parts.push(
      `<text x="${TX}" y="${y}" font-family="Fraunces" font-weight="620" font-size="${headlineSize}" letter-spacing="-1" fill="${INK}">${esc(line)}</text>`,
    );
    y += 152;
  }
  /* support — Fraunces italic, graphite */
  y += 54;
  for (const line of sub) {
    parts.push(
      `<text x="${TX}" y="${y}" font-family="Fraunces" font-weight="400" font-style="italic" font-size="${subSize}" fill="${GRAPHITE}">${esc(line)}</text>`,
    );
    y += 84;
  }
  /* rule + colophon */
  y += 46;
  parts.push(`<rect x="${TX}" y="${y}" width="260" height="6" fill="${INK}"/>`);
  y += 104;
  const COLOPHON = "AUDIT-LED DIGITAL SYSTEMS · ISLAMABAD & RAWALPINDI · PAKISTAN-WIDE";
  const colophonSize = fitSize([COLOPHON], { family: "Inter", weight: 400, ls: 4 }, 28);
  parts.push(
    `<text x="${TX}" y="${y}" font-family="Inter" font-weight="400" font-size="${colophonSize}" letter-spacing="4" fill="${GRAPHITE}">${esc(COLOPHON)}</text>`,
  );
  parts.push(`</svg>`);
  return parts.join("\n");
}

/** OG card set — one branded variant per key page. */
const OG_PAGES = [
  {
    out: "og.png",
    eyebrow: "ZARRAR.SOLUTIONS",
    lines: ["We don't just make websites."],
    sub: ["We audit broken digital flows —", "and build the systems that fix them."],
  },
  {
    out: "og-services.png",
    eyebrow: "SERVICES",
    lines: ["Five services.", "One starting point: evidence."],
    sub: ["Audits, redesigns, catalogs, booking systems,", "and dashboards that run the back office."],
  },
  {
    out: "og-pricing.png",
    eyebrow: "PRICING",
    lines: ["In PKR, in writing."],
    sub: ["Honest ranges up front.", "Exact written quote after the audit."],
  },
  {
    out: "og-process.png",
    eyebrow: "PROCESS",
    lines: ["Four phases.", "Honest timelines."],
    sub: ["Audit. Findings. Build. Launch.", "Zero-downtime switch on your domain."],
  },
  {
    out: "og-about.png",
    eyebrow: "ABOUT",
    lines: ["One builder.", "A system that ships."],
    sub: ["When you call, you talk to", "the person who writes the code."],
  },
  {
    out: "og-free-audit.png",
    eyebrow: "FREE · REPLIES WITHIN 24 HOURS",
    lines: ["Free 5-Point Mini-Audit."],
    sub: ["Speed · Google visibility · mobile ·", "conversion path · security basics."],
  },
  {
    out: "og-contact.png",
    eyebrow: "CONTACT",
    lines: ["Talk to the builder."],
    sub: ["No account managers. No ticket queues.", "Replies within 24 hours."],
  },
  {
    out: "og-notes.png",
    eyebrow: "FIELD NOTES",
    lines: ["Evidence, written down."],
    sub: ["Short notes from real audits:", "what we found, and what the fix was."],
  },
  {
    out: "og-website-audit.png",
    eyebrow: "WEBSITE AUDIT · 48 HOURS",
    lines: ["Read the code.", "Test like a customer."],
    sub: ["Written report + recorded walkthrough.", "From PKR 35,000 — credited to any build."],
  },
  {
    out: "og-redesign.png",
    eyebrow: "AUDIT + REDESIGN",
    lines: ["Rebuild around", "the evidence."],
    sub: ["Mobile-first, server-rendered, fast.", "From PKR 150,000."],
  },
  {
    out: "og-retailflow.png",
    eyebrow: "RETAILFLOW · CATALOG SYSTEMS",
    lines: ["A catalog that sells", "while you sleep."],
    sub: ["Categories, filters, search, WhatsApp orders.", "From PKR 250,000."],
  },
  {
    out: "og-bookingflow.png",
    eyebrow: "BOOKINGFLOW · APPOINTMENTS",
    lines: ["Your calendar,", "self-service."],
    sub: ["Bookings, reminders, deposits — on WhatsApp.", "From PKR 200,000."],
  },
  {
    out: "og-dashboards.png",
    eyebrow: "DASHBOARDS & INTERNAL TOOLS",
    lines: ["One screen.", "One source of truth."],
    sub: ["Lead trackers, order logs, ops tools.", "From PKR 300,000."],
  },
];

await mkdir(path.join(ROOT, "public"), { recursive: true });

const mark = await markInner();

for (const page of OG_PAGES) {
  const resvg = new Resvg(ogSvg(page, mark), { fontFiles });
  await writeFile(
    path.join(ROOT, "public", page.out),
    resvg.render().asPng(),
  );
  console.log("✓", `public/${page.out}`);
}

console.log("\nAll assets generated.");
