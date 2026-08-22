/**
 * WCAG contrast gate for the Zarrar.Solutions palette.
 * Run: node scripts/check-contrast.mjs   (exits 1 on any failure)
 *
 * Every foreground/background pair the UI can actually produce is listed
 * here. Tokens are mirrored from src/app/globals.css :root — if you change a
 * token there, change it here and re-run.
 */

const hex = (h) => {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lin = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const L = (r) => 0.2126 * lin(r[0]) + 0.7152 * lin(r[1]) + 0.0722 * lin(r[2]);
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)];
  const [hi, lo] = x > y ? [x, y] : [y, x];
  return (hi + 0.05) / (lo + 0.05);
};
/** composite an alpha colour over an opaque ground */
const over = (f, a, b) => f.map((c, i) => c * a + b[i] * (1 - a));

const T = {
  canvas: hex("#c4c3b6"),
  ground850: hex("#d4d2c6"),
  ground900: hex("#b8b7aa"),
  aura: hex("#dfdcd5"),
  bone: hex("#e7e5e4"),
  chalk: hex("#ebebeb"),
  ink: hex("#111110"),
  text: hex("#111110"),
  text2: hex("#3f3e3b"),
  text3: hex("#4a4944"),
  e400: hex("#3f3e3b"),
  e500: hex("#111110"),
  e550: hex("#000000"),
  e600: hex("#000000"),
  onAccent: hex("#ffffff"),
  gold: hex("#7a2e18"),
  rust: hex("#a84424"),
  danger: hex("#8b1e1e"),
  success: hex("#14532d"),
  warning: hex("#713f12"),
  info: hex("#1e3a8a"),
};

const AA = 4.5;   // body text
const LG = 3;     // large text (>=24px or >=18.66px bold) + UI components
const DEC = 1.2;  // purely decorative rules — no minimum, sanity floor only

const CASES = [
  ["--text on --canvas", T.text, T.canvas, AA],
  ["--text-2 on --canvas", T.text2, T.canvas, AA],
  ["--text-3 (placeholder) on --canvas", T.text3, T.canvas, AA],
  ["--accent on --canvas", T.e500, T.canvas, AA],
  ["--accent-2 on --canvas", T.e400, T.canvas, AA],
  [".idx-no graphite on --canvas", T.e400, T.canvas, AA],
  [".ph-no graphite on --canvas", T.e400, T.canvas, AA],
  [".finding-line --text-2 on --canvas", T.text2, T.canvas, AA],
  ["--gold (logo rust) on --canvas", T.gold, T.canvas, AA],

  ["--text on --aura (vellum)", T.text, T.aura, AA],
  ["--text-2 on --aura", T.text2, T.aura, AA],
  ["--accent on --aura", T.e500, T.aura, AA],
  ["--text on --bone room", T.text, T.bone, AA],
  ["--text-2 on --bone room", T.text2, T.bone, AA],
  [".idx-mark --danger on --bone", T.danger, T.bone, AA],

  ["--text on footer --ground-900", T.text, T.ground900, AA],
  ["--text-2 on footer --ground-900", T.text2, T.ground900, AA],
  ["--text-2 footer-bottom-note on --ground-900", T.text2, T.ground900, AA],
  ["--text on mobile panel --ground-850", T.text, T.ground850, AA],
  ["--text-2 on mobile panel --ground-850", T.text2, T.ground850, AA],
  ["--text on chalk footer", T.text, T.chalk, AA],
  ["--text-2 on chalk footer", T.text2, T.chalk, AA],

  ["--danger on --canvas", T.danger, T.canvas, AA],
  ["--success on --canvas", T.success, T.canvas, AA],
  ["--warning on --canvas", T.warning, T.canvas, AA],
  ["--info on --canvas", T.info, T.canvas, AA],

  [".btn-primary label (default)", T.onAccent, T.e500, AA],
  [".btn-primary label (hover)", T.onAccent, T.e600, AA],
  [".btn-primary label (active)", T.onAccent, T.e550, AA],
  [".btn-light label", T.ink, T.onAccent, AA],
  [".btn-ghost label on --canvas", T.text, T.canvas, AA],
  [".cta-full heading on ink", T.onAccent, T.e550, AA],

  ["--hairline-strong (inputs, ghost btn, toggle)", over(T.text, 0.52, T.canvas), T.canvas, LG],
  [".tl-marker border --hairline-strong", over(T.text, 0.52, T.canvas), T.canvas, LG],
  [".status-code border --danger", T.danger, T.canvas, LG],
  [".why-check border --danger", T.danger, T.canvas, LG],
  ["LogoMark Z rust on --canvas (large graphic)", T.rust, T.canvas, LG],
  ["LogoMark clay rust token on --canvas", T.gold, T.canvas, AA],

  ["--hairline (card frames, decorative)", over(T.text, 0.12, T.canvas), T.canvas, DEC],
  ["--hairline-soft (section rules, decorative)", over(T.text, 0.10, T.canvas), T.canvas, DEC],
];

let failed = 0;
console.log("pair".padEnd(52) + "ratio    min  result");
console.log("-".repeat(76));
for (const [name, fg, bg, min] of CASES) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    name.padEnd(52) +
      r.toFixed(2).padStart(5) +
      String(min).padStart(7) +
      (ok ? "  PASS" : "  FAIL")
  );
}
console.log("-".repeat(76));
console.log(
  failed === 0
    ? `All ${CASES.length} pairs pass.`
    : `${failed} of ${CASES.length} pairs FAIL.`
);
process.exit(failed === 0 ? 0 : 1);
