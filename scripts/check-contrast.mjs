/**
 * WCAG contrast gate for the Zarrar.Solutions palette.
 * Run: node scripts/check-contrast.mjs   (exits 1 on any failure)
 *
 * Tokens are mirrored from src/app/globals.css :root — the PUTTY GALLERY
 * palette (cream paper, soft ink, one clay accent). This file used to mirror
 * the superseded putty/#c4c3b6 scheme, so it was passing colours the site no
 * longer shipped. If a token changes in globals.css, change it here and rerun.
 *
 * Tiers are the tier each pair is actually used at:
 *   AAA 7    body and reading copy on paper
 *   AA  4.5  large text, small caps, placeholders, secondary footer copy
 *   LG  3    non-text UI (borders, input edges, markers)
 *   DEC 1.2  purely decorative rules — sanity floor only
 *
 * --copper (#e7925e) is deliberately absent: at 1.93:1 on paper it is a
 * decorative wash, never text. The footer hover that used it now uses
 * --gold-deep.
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
  /* grounds */
  canvas: hex("#f3e4c7"), // --ground-700
  ground750: hex("#f7e7d3"), // --ground-750 raised card
  ground800: hex("#f0ccb7"), // --ground-800 inset well / aura
  ground850: hex("#e8b49d"), // --ground-850 mobile sheet
  ground900: hex("#d8b89a"), // --ground-900 footer
  ground400: hex("#fff7ee"), // --ground-400 brightest paper
  /* ink */
  text: hex("#1a1412"), // --text
  text2: hex("#5a3328"), // --text-2
  text3: hex("#8a4733"), // --text-3
  /* clay */
  gold: hex("#a3492f"), // --gold
  goldDeep: hex("#723021"), // --gold-deep
  /* semantic */
  danger: hex("#8b1e1e"),
  success: hex("#14532d"),
  warning: hex("#713f12"),
  info: hex("#1e3a8a"),
  white: hex("#ffffff"),
  cream: hex("#f3e4c7"), // --accent-on-ink
};

const AAA = 7;
const AA = 4.5;
const LG = 3;
const DEC = 1.2;

const CASES = [
  /* ---- paper ---- */
  ["--text on --canvas", T.text, T.canvas, AAA],
  ["--text-2 on --canvas", T.text2, T.canvas, AAA],
  ["--text-3 placeholders / micro-labels on --canvas", T.text3, T.canvas, AA],
  ["--gold rules + large display accents on --canvas", T.gold, T.canvas, AA],
  ["--gold-deep small caps on --canvas", T.goldDeep, T.canvas, AAA],

  /* ---- raised + inset ---- */
  ["--text on --ground-750 (raised card)", T.text, T.ground750, AAA],
  ["--text-2 on --ground-750", T.text2, T.ground750, AAA],
  ["--text on --ground-400 (bleached paper)", T.text, T.ground400, AAA],
  ["--text-2 on --ground-400", T.text2, T.ground400, AAA],
  ["--text on --ground-800 (inset well)", T.text, T.ground800, AAA],
  ["--text-2 on --ground-800", T.text2, T.ground800, AA],
  ["--text-3 on --ground-800", T.text3, T.ground800, AA],
  ["--gold-deep on --ground-800", T.goldDeep, T.ground800, AA],

  /* ---- footer + mobile sheet ---- */
  ["--text on footer --ground-900", T.text, T.ground900, AAA],
  ["--text-2 on footer --ground-900", T.text2, T.ground900, AA],
  ["--gold-deep footer link hover", T.goldDeep, T.ground900, AA],
  ["--text on mobile sheet --ground-850", T.text, T.ground850, AAA],
  ["--text-2 on mobile sheet --ground-850", T.text2, T.ground850, AA],

  /* ---- semantic ---- */
  ["--danger on --canvas", T.danger, T.canvas, AA],
  ["--success on --canvas", T.success, T.canvas, AA],
  ["--warning on --canvas", T.warning, T.canvas, AA],
  ["--info on --canvas", T.info, T.canvas, AA],

  /* ---- buttons ---- */
  [".btn-primary label on --gold", T.white, T.gold, AA],
  [".btn-primary hover label on --gold-deep", T.white, T.goldDeep, AA],
  ["ink button label (--accent-on-ink on --text)", T.cream, T.text, AAA],

  /* ---- non-text UI ---- */
  ["--hairline-strong (inputs, ghost button, toggle)", over(T.text, 0.48, T.canvas), T.canvas, LG],
  ["--gold focus ring on --canvas", T.gold, T.canvas, LG],
  ["--danger border on --canvas", T.danger, T.canvas, LG],
  ["--hairline (card frames, decorative)", over(T.text, 0.14, T.canvas), T.canvas, DEC],
  ["--hairline-soft (section rules, decorative)", over(T.text, 0.1, T.canvas), T.canvas, DEC],
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
