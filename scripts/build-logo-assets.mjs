/**
 * Regenerates every logo raster.
 * Run: node scripts/build-logo-assets.mjs
 *
 * Two cuts, one mark (see logo_replacement.md):
 *   · public/images/logo-mark.svg        FULL detail — ≥64px surfaces
 *   · public/images/logo-mark-small.svg  flat cut    — <64px surfaces
 *
 * Which cut lands where is measured, not taste: the full mark's pinstripes
 * and keyline verified to blur into a brown mass at 32px, so every favicon
 * surface (browser tab, home-screen) renders the small cut. PWA/apple icons
 * render at ≥180px and use the full mark on the putty ground.
 */
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";
import fs from "node:fs";

const FULL = "public/images/logo-mark.svg";
const SMALL = "public/images/logo-mark-small.svg";
const GROUND = "#C4C3B6"; // --ground-700 / themeColor

function inner(svgPath) {
  const raw = fs.readFileSync(svgPath, "utf8");
  return raw
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
}

/** Wrap a mark on the putty ground with `pad` units of safe zone. */
function padded(markInner, pad) {
  const box = 500 + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${box} ${box}">
  <rect x="${-pad}" y="${-pad}" width="${box}" height="${box}" fill="${GROUND}"/>
  ${markInner}
</svg>`;
}

function render(svg, out, size) {
  const r = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  fs.writeFileSync(out, r.render().asPng());
  console.log(`  ${out}  ${size}px`);
}

console.log("logo assets — full:", FULL, "· small:", SMALL);

/* ---------- <64px surfaces: the small cut ---------- */

// File-convention slots the browser reads directly (tab, history, bookmark).
fs.copyFileSync(SMALL, "public/favicon.svg");
fs.copyFileSync(SMALL, "src/app/icon.svg");
console.log("  public/favicon.svg  (small cut)");
console.log("  src/app/icon.svg    (small cut)");

// favicon.ico — multi-size (16/32/48), the step this script always forgot.
const smallPadded = padded(inner(SMALL), 8);
render(smallPadded, "/tmp/fav16.png", 16);
render(smallPadded, "/tmp/fav32.png", 32);
render(smallPadded, "/tmp/fav48.png", 48);
const ico = await pngToIco(["/tmp/fav16.png", "/tmp/fav32.png", "/tmp/fav48.png"]);
fs.writeFileSync("public/favicon.ico", ico);
console.log("  public/favicon.ico  16+32+48");

/* ---------- ≥64px surfaces: the full clay mark ---------- */

const fullPadded24 = padded(inner(FULL), 24);
const fullPadded62 = padded(inner(FULL), 62); // maskable safe zone

render(fullPadded24, "public/icons/icon-512.png", 512);
render(fullPadded24, "public/icons/icon-192.png", 192);
render(fullPadded62, "public/icons/icon-maskable-512.png", 512);
render(fullPadded24, "src/app/apple-icon.png", 180);
