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
  canvas: hex("#2a0001"),
  ground850: hex("#1e0001"),
  ground900: hex("#1c0001"),
  ink1: hex("#5e180d"),
  ink2: hex("#4a1109"),
  ink3: hex("#360802"),
  aura: hex("#852616"),
  text: hex("#ffd5a9"),
  text2: hex("#d99a68"),
  text3: hex("#ad744e"),
  text2OnAura: hex("#f0b98d"),
  e50: hex("#fadfc8"),
  e200: hex("#efb994"),
  e300: hex("#e79f72"),
  e400: hex("#e18853"),
  e500: hex("#da7134"),
  e550: hex("#c1642e"),
  danger: hex("#ff5c47"),
  dangerOnInk: hex("#ff7361"),
  success: hex("#4cc38a"),
  warning: hex("#f5b544"),
  info: hex("#7cb8e0"),
};

const AA = 4.5;   // body text
const LG = 3;     // large text (>=24px or >=18.66px bold) + UI components
const DEC = 1.2;  // purely decorative rules — no minimum, sanity floor only

const CASES = [
  // ---- body text on the dominant ground ----
  ["--text on --canvas", T.text, T.canvas, AA],
  ["--text-2 on --canvas", T.text2, T.canvas, AA],
  ["--text-3 (placeholder) on --canvas", T.text3, T.canvas, AA],
  ["--accent on --canvas", T.e500, T.canvas, AA],
  ["--accent-2 on --canvas", T.e400, T.canvas, AA],
  [".idx-no ember-400 on --canvas", T.e400, T.canvas, AA],
  [".ph-no ember-400 on --canvas", T.e400, T.canvas, AA],
  [".finding-line --text-2 on --canvas", T.text2, T.canvas, AA],

  // ---- the .section-ink / .cta-full gradient, sampled at all three stops ----
  ["--text on ink stop 1", T.text, T.ink1, AA],
  ["--text on ink stop 3", T.text, T.ink3, AA],
  ["--text-2 on ink stop 1", T.text2, T.ink1, AA],
  ["--text-2 on ink stop 2", T.text2, T.ink2, AA],
  ["--text-2-on-aura on ink stop 1", T.text2OnAura, T.ink1, AA],
  [".sec-index --accent-on-ink on ink stop 1", T.e300, T.ink1, AA],
  [".idx-no --accent-on-ink on ink stop 1", T.e300, T.ink1, AA],
  [".idx-mark --danger-on-ink on ink stop 1", T.dangerOnInk, T.ink1, AA],
  [".index-row:hover .idx-title ember-200 on ink 1", T.e200, T.ink1, AA],
  [".cta-full h2 em ember-50 on ink stop 1", T.e50, T.ink1, AA],

  // ---- footer / panels ----
  ["--text-2 on footer --ground-900", T.text2, T.ground900, AA],
  ["--text-3 footer-bottom-note on --ground-900", T.text3, T.ground900, AA],
  ["--text on mobile panel --ground-850", T.text, T.ground850, AA],
  ["--text-2 on mobile panel --ground-850", T.text2, T.ground850, AA],

  // ---- semantic, all deliberately outside the ember ramp ----
  ["--danger on --canvas", T.danger, T.canvas, AA],
  ["--success on --canvas", T.success, T.canvas, AA],
  ["--warning on --canvas", T.warning, T.canvas, AA],
  ["--info on --canvas", T.info, T.canvas, AA],

  // ---- button labels across every state ----
  [".btn-primary label (default)", T.canvas, T.e500, AA],
  [".btn-primary label (hover)", T.canvas, T.e400, AA],
  [".btn-primary label (active)", T.canvas, T.e550, AA],
  [".btn-light label", T.canvas, T.text, AA],
  [".btn-ghost label on --canvas", T.text, T.canvas, AA],

  // ---- non-text UI components need 3:1 ----
  ["--hairline-strong (inputs, ghost btn, toggle)", over(T.text, 0.42, T.canvas), T.canvas, LG],
  [".tl-marker border --hairline-strong", over(T.text, 0.42, T.canvas), T.canvas, LG],
  [".status-code border --danger", T.danger, T.canvas, LG],
  [".why-check border --danger", T.danger, T.canvas, LG],
  ["LogoMark Z #ffd5a9 on --aura", T.text, T.aura, AA],

  // ---- decorative rules: no WCAG obligation, floor only ----
  ["--hairline (card frames, decorative)", over(T.text, 0.28, T.canvas), T.canvas, DEC],
  ["--hairline-soft (section rules, decorative)", over(T.text, 0.16, T.canvas), T.canvas, DEC],
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
