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
  canvas: hex("#f6f1e8"),
  ground850: hex("#f3eee4"),
  ground900: hex("#ede6d8"),
  aura: hex("#e4f3f0"),
  text: hex("#1b1814"),
  text2: hex("#534e46"),
  text3: hex("#645f57"),
  text2OnAura: hex("#4a453c"),
  e400: hex("#0e756f"),
  e500: hex("#0c6b66"),
  e550: hex("#0a5854"),
  e600: hex("#094f4b"),
  onAccent: hex("#ffffff"),
  gold: hex("#8b6234"),
  danger: hex("#c53030"),
  dangerOnInk: hex("#b91c1c"),
  success: hex("#246e4c"),
  warning: hex("#8b5a0b"),
  info: hex("#1d5fa8"),
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
  ["--gold on --canvas", T.gold, T.canvas, AA],

  // ---- the .section-ink / .cta-full teal wash ----
  ["--text on --aura", T.text, T.aura, AA],
  ["--text-2-on-aura on --aura", T.text2OnAura, T.aura, AA],
  ["--accent on --aura", T.e500, T.aura, AA],
  ["--accent-on-ink on --aura", T.e600, T.aura, AA],
  [".idx-mark --danger-on-ink on --aura", T.dangerOnInk, T.aura, AA],

  // ---- footer / panels ----
  ["--text on footer --ground-900", T.text, T.ground900, AA],
  ["--text-2 on footer --ground-900", T.text2, T.ground900, AA],
  ["--text-3 footer-bottom-note on --ground-900", T.text3, T.ground900, AA],
  ["--text on mobile panel --ground-850", T.text, T.ground850, AA],
  ["--text-2 on mobile panel --ground-850", T.text2, T.ground850, AA],

  // ---- semantic ----
  ["--danger on --canvas", T.danger, T.canvas, AA],
  ["--success on --canvas", T.success, T.canvas, AA],
  ["--warning on --canvas", T.warning, T.canvas, AA],
  ["--info on --canvas", T.info, T.canvas, AA],

  // ---- button labels across every state ----
  [".btn-primary label (default)", T.onAccent, T.e500, AA],
  [".btn-primary label (hover)", T.onAccent, T.e600, AA],
  [".btn-primary label (active)", T.onAccent, T.e550, AA],
  [".btn-light label", T.onAccent, T.text, AA],
  [".btn-ghost label on --canvas", T.text, T.canvas, AA],

  // ---- non-text UI components need 3:1 ----
  ["--hairline-strong (inputs, ghost btn, toggle)", over(T.text, 0.52, T.canvas), T.canvas, LG],
  [".tl-marker border --hairline-strong", over(T.text, 0.52, T.canvas), T.canvas, LG],
  [".status-code border --danger", T.danger, T.canvas, LG],
  [".why-check border --danger", T.danger, T.canvas, LG],
  ["LogoMark Z teal on --canvas", T.e500, T.canvas, AA],
  ["LogoMark S gold on --canvas", T.gold, T.canvas, AA],

  // ---- decorative rules: no WCAG obligation, floor only ----
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
