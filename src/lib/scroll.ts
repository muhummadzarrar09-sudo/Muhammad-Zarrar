/**
 * Native smooth scrolling helpers.
 *
 * Lenis was removed (owner's call — the smoothed wheel + scroll-scrubbed
 * parallax felt bad). Anchors now ride the browser's native
 * `scroll-behavior: smooth` (see index.css) plus each section's
 * `scroll-margin-top`, which honors the fixed nav offset. Reduced-motion
 * users get instant jumps (also via CSS).
 */

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Smooth-scroll to a section id, respecting the reduced-motion setting. */
export function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReduced() ? "auto" : "smooth",
    block: "start",
  });
}

/** Smooth-scroll back to the top of the page. */
export function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });
}
