/**
 * Generates the branded OG image set (home + per-page variants, 1200x630)
 * using ImageMagick + @resvg/resvg-js.
 * Run: node scripts/generate-assets.mjs   (or: npm run assets)
 *
 * The brand mark is rendered from the canonical vector
 * (public/images/logo-mark.svg) — the same source every icon uses.
 * Icons are owned by scripts/build-logo-assets.mjs, NOT this script.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { Resvg } from "@resvg/resvg-js";

const run = promisify(execFile);
const ROOT = process.cwd();

const INK = "#2A0001";
const TEAL_DIM = "#E89154";
const MID_TEAL = "#DA7134";
const MUTED_ON_INK = "#F0B98D";
const HATCH_INK = "#400C04";

const LOGO_SVG = path.join(ROOT, "public/images/logo-mark.svg");
/* Supersampled (2x) size of the mark on the OG canvas, and its placement. */
const MARK_SIZE = 640;
const MARK_X = 10;
const MARK_Y = 300;

async function convert(args) {
  await run("convert", args);
}

/** Rasterize the canonical ZS monogram (transparent ground) for compositing. */
async function renderMark() {
  const svg = await readFile(LOGO_SVG, "utf8");
  const out = path.join(os.tmpdir(), "og-mark.png");
  const r = new Resvg(svg, { fitTo: { mode: "width", value: MARK_SIZE } });
  await writeFile(out, r.render().asPng());
  return out;
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

/** Branded OG image: ink background, ZS monogram, serif headline, teal details. */
async function ogImage(outPath, { eyebrow, lines, sub }, markPng) {
  const W = 2400, H = 1260; // 2x supersample
  const args = ["-size", `${W}x${H}`, `xc:${INK}`];

  /* ZS monogram (canonical mark), left side */
  args.push(markPng, "-geometry", `+${MARK_X}+${MARK_Y}`, "-composite");

  /* Diagonal hatch texture, bottom-right corner */
  for (let x = 1460; x <= W; x += 36) {
    args.push(
      "-stroke", HATCH_INK, "-strokewidth", "4",
      "-draw", `line ${x},${H} ${x + 90},${H - 90}`
    );
  }
  args.push("-stroke", "none");

  const tx = 620;
  args.push(
    "-font", "DejaVu-Sans-Bold", "-pointsize", "38", "-kerning", "12",
    "-fill", TEAL_DIM, "-gravity", "NorthWest",
    "-annotate", `+${tx}+300`, eyebrow
  );

  let y = 430;
  for (const line of lines) {
    args.push(
      "-font", "DejaVu-Serif-Bold", "-pointsize", "102", "-kerning", "1",
      "-fill", "#FFD5A9", "-gravity", "NorthWest",
      "-annotate", `+${tx}+${y}`, line
    );
    y += 132;
  }

  y += 30;
  for (const line of sub) {
    args.push(
      "-font", "DejaVu-Serif", "-pointsize", "58",
      "-fill", MUTED_ON_INK, "-gravity", "NorthWest",
      "-annotate", `+${tx}+${y}`, line
    );
    y += 88;
  }

  y += 50;
  args.push("-fill", MID_TEAL, "-draw", `rectangle ${tx},${y} ${tx + 240},${y + 6}`);
  y += 100;
  args.push(
    "-font", "DejaVu-Sans", "-pointsize", "32", "-kerning", "5",
    "-fill", MUTED_ON_INK, "-gravity", "NorthWest",
    "-annotate", `+${tx}+${y}`,
    "AUDIT-LED DIGITAL SYSTEMS · ISLAMABAD & RAWALPINDI · PAKISTAN-WIDE"
  );

  args.push("-filter", "Lanczos", "-resize", "1200x630", outPath);
  await convert(args);
  console.log("✓", path.relative(ROOT, outPath));
}

await mkdir(path.join(ROOT, "public"), { recursive: true });

const markPng = await renderMark();
for (const page of OG_PAGES) {
  await ogImage(path.join(ROOT, "public", page.out), page, markPng);
}

console.log("\nAll assets generated.");
