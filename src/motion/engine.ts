import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { killWireframes, playWireframes } from "./play";
import { destroyPointer, initPointer } from "./pointer";

gsap.registerPlugin(ScrollTrigger);

export type MotionHandle = {
  scrollTo: (target: string | number, opts?: { offset?: number }) => void;
  destroy: () => void;
};

type Live = {
  pathname: string;
  handle: MotionHandle;
  refs: number;
};

let live: Live | null = null;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function proxy(slot: Live): MotionHandle {
  return {
    scrollTo: (target, opts) => slot.handle.scrollTo(target, opts),
    destroy: () => {
      slot.refs = Math.max(0, slot.refs - 1);
      const snapshot = slot;
      queueMicrotask(() => {
        if (snapshot.refs > 0) return;
        if (live !== snapshot) return;
        snapshot.handle.destroy();
        live = null;
      });
    },
  };
}

/**
 * Boot Lenis + GSAP ScrollTrigger and play the wireframes.
 * Idempotent for the same pathname so React Strict Mode remounts
 * don't kill and replay every entrance.
 */
export function startMotion(pathname: string): MotionHandle {
  if (live) {
    if (live.pathname === pathname) {
      live.refs += 1;
      return proxy(live);
    }
    live.handle.destroy();
    live = null;
  }

  const handle = bootMotion(pathname);
  live = { pathname, handle, refs: 1 };
  return proxy(live);
}

function bootMotion(pathname: string): MotionHandle {
  const html = document.documentElement;

  if (reduced()) {
    html.classList.add("has-motion-reduced");
    html.classList.remove("has-motion", "has-lenis");
    return {
      scrollTo: (target) => {
        if (typeof target === "string") {
          document.querySelector(target)?.scrollIntoView({ behavior: "auto" });
        } else {
          window.scrollTo({ top: target, behavior: "auto" });
        }
      },
      destroy: () => {
        html.classList.remove("has-motion-reduced");
      },
    };
  }

  html.classList.add("has-motion", "has-lenis");

  const lenis = new Lenis({
    // A slightly longer settle makes wheel, trackpad and in-page anchor
    // travel feel like one continuous gallery walk, rather than a sequence
    // of browser jumps. ScrollTrigger remains tied to Lenis below, so every
    // scrubbed scene also runs backwards cleanly on the return journey.
    duration: 1.32,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    wheelMultiplier: 0.88,
    touchMultiplier: 1.06,
    syncTouch: false,
    anchors: {
      offset: -8,
      duration: 1.32,
    },
  });

  lenis.on("scroll", ScrollTrigger.update);

  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  playWireframes(pathname);

  /* Mouse-reactive layer (cursor aura, magnetic CTAs, marquee skew,
     plaque pan). Subscribes to Lenis itself for velocity. Self-guards:
     fine pointer + hover capable only, and never on the reduced-motion
     boot (we're below that branch already). */
  initPointer(lenis);

  const onRefresh = () => {
    if (!html.classList.contains("has-motion")) return;
    ScrollTrigger.refresh();
  };
  window.addEventListener("load", onRefresh);
  const fonts = document.fonts;
  if (fonts?.ready) fonts.ready.then(onRefresh);

  const onScrollTo = (event: Event) => {
    const detail = (event as CustomEvent<string>).detail;
    if (detail) lenis.scrollTo(detail, { offset: -8, duration: 1.32 });
  };
  window.addEventListener("motion:scrollTo", onScrollTo);

  // App Router swaps the page subtree before passive effect cleanup runs.
  // A pinned ScrollTrigger must release its spacer *before* that swap, or
  // GSAP can attempt to remove a pin node React has already removed.
  const onBeforeNavigate = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.hash === window.location.hash) return;
    killWireframes();
  };
  document.addEventListener("click", onBeforeNavigate, true);

  return {
    scrollTo: (target, opts) => {
      lenis.scrollTo(target, { offset: opts?.offset ?? -8, duration: 1.15 });
    },
    destroy: () => {
      window.removeEventListener("load", onRefresh);
      window.removeEventListener("motion:scrollTo", onScrollTo);
      document.removeEventListener("click", onBeforeNavigate, true);
      destroyPointer();
      killWireframes();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      html.classList.remove("has-motion", "has-lenis");
    },
  };
}
