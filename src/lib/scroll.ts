import Lenis from "lenis";

/**
 * Lenis smooth scroll — module-scoped singleton.
 * (Deliberately NOT exposed on `window` — the old build leaked
 * `window.__lenis`, which the audit flagged. No globals here.)
 *
 * Disabled entirely for `prefers-reduced-motion` users: they get
 * native scrolling, and every consumer falls back gracefully.
 */

let lenis: Lenis | null = null;
let rafId = 0;
let onClickCleanup: (() => void) | undefined;

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined" || prefersReduced()) return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // Smooth-scroll every in-page `#hash` link (nav links, hero CTAs, skip link)
  // with a consistent offset — instead of fighting native `scroll-behavior`.
  const onClick = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const id = href.slice(1);
    if (id && document.getElementById(id)) {
      e.preventDefault();
      smoothScrollToId(id);
    }
  };
  document.addEventListener("click", onClick);
  onClickCleanup = () => document.removeEventListener("click", onClick);

  return lenis;
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId);
  onClickCleanup?.();
  onClickCleanup = undefined;
  lenis?.destroy();
  lenis = null;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** 6.5rem = the CSS `scroll-margin-top` used for anchored sections. */
const ANCHOR_OFFSET = 104;

export function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    const top = el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
    lenis.scrollTo(Math.max(0, top), { duration: 1.4 });
  } else {
    el.scrollIntoView({
      behavior: prefersReduced() ? "auto" : "smooth",
      block: "start",
    });
  }
}

export function smoothScrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 });
  } else {
    window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });
  }
}
