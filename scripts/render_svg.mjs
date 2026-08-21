import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
const [svgPath, outPath, size, bg] = [process.argv[2], process.argv[3] || "/tmp/logo_svg.png", parseInt(process.argv[4] || "500", 10), process.argv[5]];
let svg = fs.readFileSync(svgPath, "utf8");
const opts = { fitTo: { mode: "width", value: size } };
if (bg) {
  opts.background = bg;
}
const r = new Resvg(svg, opts);
fs.writeFileSync(outPath, r.render().asPng());
console.log("rendered", outPath);
