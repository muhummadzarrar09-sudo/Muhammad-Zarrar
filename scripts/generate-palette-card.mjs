import { writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";

/**
 * Palette card for the studio's own use (Instagram carousels, decks, docs).
 * 1080 × 1350 — the 4:5 feed crop. Rendered with the site's real fonts so the
 * card matches the site exactly.
 *
 *   node scripts/generate-palette-card.mjs
 */

const ROOT = process.cwd();

/* resvg needs TTF paths under `font.fontFiles` — see scripts/fonts/README. */
const FONT_DIR = path.join(ROOT, "scripts/fonts");
const fontFiles = [
  path.join(FONT_DIR, "fraunces-500.ttf"),
  path.join(FONT_DIR, "fraunces-italic-400.ttf"),
  path.join(FONT_DIR, "inter-400.ttf"),
  path.join(FONT_DIR, "inter-600.ttf"),
];

const CANVAS = "#f3e4c7";
const INK = "#1a1412";
const WALNUT = "#5a3328";
const HAIRLINE = "rgba(36,20,15,0.18)";

/** Order matters: paper → ink → clay. Read as three families, not a list. */
const SWATCHES = [
  { hex: "#FFF7EE", name: "Bleached paper", role: "highest lift" },
  { hex: "#F3E4C7", name: "Putty / canvas", role: "the ground" },
  { hex: "#F7E7D3", name: "Cream wash", role: "raised card" },
  { hex: "#F0CCB7", name: "Warm sand", role: "inset well" },
  { hex: "#E8B49D", name: "Blush panel", role: "mobile sheet" },
  { hex: "#D8B89A", name: "Parchment", role: "footer / edge" },
  { hex: "#1A1412", name: "Soft ink", role: "type + buttons" },
  { hex: "#5A3328", name: "Walnut", role: "secondary copy" },
  { hex: "#8A4733", name: "Old brown", role: "tertiary copy" },
  { hex: "#A3492F", name: "Terracotta", role: "the one accent" },
  { hex: "#723021", name: "Deep clay", role: "pressed / small caps" },
  { hex: "#E7925E", name: "Copper glow", role: "decor only, never text" },
];

const COLS = 3;
const CARD_W = 276;
const CARD_H = 172;
const GAP_X = 30;
const GAP_Y = 24;
const GRID_X = (1080 - (COLS * CARD_W + (COLS - 1) * GAP_X)) / 2;
const GRID_Y = 392;

const swatch = (s, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = GRID_X + col * (CARD_W + GAP_X);
  const y = GRID_Y + row * (CARD_H + GAP_Y);
  const dark = ["#1A1412", "#5A3328", "#8A4733", "#A3492F", "#723021"].includes(s.hex);
  return `
  <g>
    <rect x="${x}" y="${y}" width="${CARD_W}" height="${CARD_H}" fill="${s.hex}" stroke="${HAIRLINE}" stroke-width="1"/>
    <text x="${x + 20}" y="${y + 38}" font-family="Inter" font-weight="600" font-size="15" letter-spacing="2.6"
      fill="${dark ? "#f3e4c7" : INK}">${s.hex.toUpperCase()}</text>
    <text x="${x + 20}" y="${y + 108}" font-family="Fraunces" font-weight="500" font-size="26"
      fill="${dark ? "#f3e4c7" : INK}">${s.name}</text>
    <text x="${x + 20}" y="${y + 138}" font-family="Inter" font-weight="400" font-size="14"
      fill="${dark ? "rgba(243,228,199,0.72)" : WALNUT}">${s.role}</text>
  </g>`;
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="${CANVAS}"/>
  <rect x="40" y="40" width="1000" height="1270" fill="none" stroke="${HAIRLINE}" stroke-width="1.5"/>

  <text x="72" y="112" font-family="Inter" font-weight="600" font-size="15" letter-spacing="6" fill="${WALNUT}">ZARRAR.SOLUTIONS · BRAND REFERENCE</text>
  <text x="72" y="214" font-family="Fraunces" font-weight="500" font-size="76" letter-spacing="-1.6" fill="${INK}">The putty palette</text>
  <text x="72" y="268" font-family="Fraunces" font-style="italic" font-weight="400" font-size="30" fill="${WALNUT}">Warm paper, soft ink, one clay accent.</text>
  <line x1="72" y1="308" x2="1008" y2="308" stroke="${HAIRLINE}" stroke-width="1.5"/>
  <text x="72" y="344" font-family="Inter" font-weight="500" font-size="14" letter-spacing="3.4" fill="${WALNUT}">SIX PAPERS · THREE INKS · THREE CLAYS</text>

  ${SWATCHES.map(swatch).join("")}

  <line x1="72" y1="1196" x2="1008" y2="1196" stroke="${HAIRLINE}" stroke-width="1.5"/>
  <text x="72" y="1236" font-family="Inter" font-weight="500" font-size="14" letter-spacing="3.2" fill="${WALNUT}">COPPER #E7925E IS DECORATION — NEVER SMALL TEXT</text>
  <text x="72" y="1262" font-family="Inter" font-weight="400" font-size="13" letter-spacing="2.4" fill="${WALNUT}">EVERY PAIR CONTRAST-VERIFIED · ZARRAR.SOLUTIONS</text>
</svg>`;

const resvg = new Resvg(svg, { font: { fontFiles, loadSystemFonts: false } });
await writeFile(path.join(ROOT, "palette", "zarrar-palette-2026.png"), resvg.render().asPng());
console.log("✓ palette/zarrar-palette-2026.png");
