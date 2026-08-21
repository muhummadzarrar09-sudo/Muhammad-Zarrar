/**
 * Generates PWA icons (192/512/maskable), the Apple touch icon, and the
 * branded OG image set (home + per-page variants, 1200x630) using
 * ImageMagick — no runtime dependencies.
 * Run: node scripts/generate-assets.mjs   (or: npm run assets)
 *
 * Brand: ink tile (#0E2931), canvas Z (#E2E2E0), teal period.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const run = promisify(execFile);
const ROOT = process.cwd();

const INK = "#2A0001";
const CANVAS = "#FFD5A9";
const TEAL = "#DA7134";
const TEAL_DIM = "#E89154";
const MID_TEAL = "#DA7134";
const MUTED_ON_INK = "#F0B98D";
const HATCH_INK = "#400C04";

/* Z polygon + period dot in a 48x48 design space (matches src/app/icon.svg). */
const Z_POLY = [
  [12, 12], [36, 12], [36, 17], [21, 31], [36, 31], [36, 36],
  [12, 36], [12, 31], [27, 17], [12, 17],
];
const DOT = { cx: 40, cy: 33.5, r: 3 };

function scaledPoly(scale, ox = 0, oy = 0) {
  return Z_POLY.map(([x, y]) => `${x * scale + ox},${y * scale + oy}`).join(" ");
}

function scaledDot(scale, ox = 0, oy = 0) {
  const cx = DOT.cx * scale + ox;
  const cy = DOT.cy * scale + oy;
  const r = DOT.r * scale;
  return `${cx},${cy} ${cx + r},${cy}`;
}

async function convert(args) {
  await run("convert", args);
}

/** Icon: ink tile with Z mark + teal period, supersampled 4x for clean edges. */
async function icon(outPath, size) {
  const ss = size * 4;
  const s = ss / 48;
  await convert([
    "-size", `${ss}x${ss}`, `xc:${INK}`,
    "-fill", CANVAS, "-draw", `polygon ${scaledPoly(s)}`,
    "-fill", TEAL, "-draw", `circle ${scaledDot(s)}`,
    "-filter", "Lanczos", "-resize", `${size}x${size}`,
    outPath,
  ]);
  console.log("✓", path.relative(ROOT, outPath));
}

/** Maskable icon: artwork at 78% so OS cropping never touches the mark. */
async function maskableIcon(outPath, size) {
  const ss = size * 4;
  const inner = ss * 0.78;
  const s = inner / 48;
  const offset = (ss - inner) / 2;
  await convert([
    "-size", `${ss}x${ss}`, `xc:${INK}`,
    "-fill", CANVAS, "-draw", `polygon ${scaledPoly(s, offset, offset)}`,
    "-fill", TEAL, "-draw", `circle ${scaledDot(s, offset, offset)}`,
    "-filter", "Lanczos", "-resize", `${size}x${size}`,
    outPath,
  ]);
  console.log("✓", path.relative(ROOT, outPath));
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

/** Branded OG image: ink background, Z mark, serif headline, teal details. */
async function ogImage(outPath, { eyebrow, lines, sub }) {
  const W = 2400, H = 1260; // 2x supersample
  const args = ["-size", `${W}x${H}`, `xc:${INK}`];

  /* Z mark, left side */
  const box = 300;
  const s = box / 48;
  const ox = 180, oy = 480;
  args.push("-fill", CANVAS, "-draw", `polygon ${scaledPoly(s, ox, oy)}`);
  args.push("-fill", TEAL, "-draw", `circle ${scaledDot(s, ox, oy)}`);

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

await mkdir(path.join(ROOT, "public/icons"), { recursive: true });
await mkdir(path.join(ROOT, "public"), { recursive: true });

await icon(path.join(ROOT, "public/icons/icon-192.png"), 192);
await icon(path.join(ROOT, "public/icons/icon-512.png"), 512);
await maskableIcon(path.join(ROOT, "public/icons/icon-maskable-512.png"), 512);
await icon(path.join(ROOT, "src/app/apple-icon.png"), 180);
for (const page of OG_PAGES) {
  await ogImage(path.join(ROOT, "public", page.out), page);
}

console.log("\nAll assets generated.");
