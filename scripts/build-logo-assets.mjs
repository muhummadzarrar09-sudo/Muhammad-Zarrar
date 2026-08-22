/**
 * Regenerates every logo raster from public/images/logo-mark.svg.
 * Run: node scripts/build-logo-assets.mjs
 *
 * One source vector -> favicon.svg, icon.svg, PWA icons, apple-icon, ICO.
 * See logo_replacement.md for the full swap procedure.
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";

const SRC = "public/images/logo-mark.svg";
const GROUND = "#C4C3B6"; // --canvas / themeColor
const raw = fs.readFileSync(SRC, "utf8");

/** Wrap the mark on the eclipse ground with `pad` units of safe zone. */
function padded(pad) {
  const inner = raw
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  const box = 500 + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${box} ${box}">
  <rect x="${-pad}" y="${-pad}" width="${box}" height="${box}" fill="${GROUND}"/>
  ${inner}
</svg>`;
}

function render(svg, out, size) {
  const r = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  fs.writeFileSync(out, r.render().asPng());
  console.log(`  ${out}  ${size}px`);
}

console.log("logo assets from", SRC);

// Canonical vector, mirrored to the two file-convention slots
fs.copyFileSync(SRC, "public/favicon.svg");
fs.copyFileSync(SRC, "src/app/icon.svg");
console.log("  public/favicon.svg\n  src/app/icon.svg");

const p24 = padded(24);
const p62 = padded(62);   // maskable safe zone
const p8 = padded(8);

render(p24, "public/icons/icon-512.png", 512);
render(p24, "public/icons/icon-192.png", 192);
render(p62, "public/icons/icon-maskable-512.png", 512);
render(p24, "src/app/apple-icon.png", 180);
render(p8, "/tmp/fav32.png", 32);
render(p8, "/tmp/fav48.png", 48);
