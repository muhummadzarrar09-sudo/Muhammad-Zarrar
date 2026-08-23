import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { killWireframes, playWireframes } from "./play";

gsap.registerPlugin(ScrollTrigger);

export type MotionHandle = {
  scrollTo: (target: string | number, opts?: { offset?: number }) => void;
  destroy: () => void;
};

/**
 * Live scroll signal for wheel-reactive scenes (marquee, parallax boosts).
 * Written every Lenis frame in engine.ts, read by the scene modules.
 */
export const motionState = {
  velocity: 0,
  scrolling: false,
};

/**
 * Anchor landings must clear the 68px sticky header plus breathing room.
 * Every glide in the app (Lenis anchors, marker jumps, footer links,
 * cross-route hash navigation) funnels through this single offset.
 */
export const ANCHOR_OFFSET = -84;

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
      offset: ANCHOR_OFFSET,
      duration: 1.32,
    },
  });

  lenis.on("scroll", (e: { velocity: number }) => {
    ScrollTrigger.update();
    motionState.velocity = e.velocity;
    motionState.scrolling = Math.abs(e.velocity) > 0.1;
  });

  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  playWireframes(pathname);

  const onRefresh = () => {
    if (!html.classList.contains("has-motion")) return;
    ScrollTrigger.refresh();
  };
  window.addEventListener("load", onRefresh);
  const fonts = document.fonts;
  if (fonts?.ready) fonts.ready.then(onRefresh);

  const onScrollTo = (event: Event) => {
    const detail = (event as CustomEvent<string | number>).detail;
    if (detail === undefined || detail === null || detail === "") return;
    if (typeof detail === "number") {
      lenis.scrollTo(detail, { duration: 1.15 });
    } else {
      lenis.scrollTo(detail, { offset: ANCHOR_OFFSET, duration: 1.15 });
    }
  };
  window.addEventListener("motion:scrollTo", onScrollTo);

  /**
   * Hash landings — cross-route (`/#brief` from an inner page) and reloads.
   * The App Router swaps the DOM; a moment later we glide to the target
   * with the same gallery-walk easing as every other scroll on the site,
   * instead of the browser's instant jump.
   */
  const glideToHash = (duration = 1.15) => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;
    lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET, duration });
  };
  const onHashChange = () => {
    // Lenis `anchors` already glides same-document clicks; don't fight it.
    if (lenis.isScrolling) return;
    glideToHash();
  };
  window.addEventListener("hashchange", onHashChange);
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (!html.classList.contains("has-motion")) return;
      glideToHash(1.32);
    }, 180);
  });

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
      lenis.scrollTo(target, { offset: opts?.offset ?? ANCHOR_OFFSET, duration: 1.15 });
    },
    destroy: () => {
      window.removeEventListener("load", onRefresh);
      window.removeEventListener("motion:scrollTo", onScrollTo);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onBeforeNavigate, true);
      killWireframes();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      motionState.velocity = 0;
      motionState.scrolling = false;
      html.classList.remove("has-motion", "has-lenis");
    },
  };
}
