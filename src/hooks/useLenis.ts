import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Premium smooth scrolling (Lenis).
 * Use in App.tsx or a top-level component.
 * Gives Awwwards-level buttery, cinematic scroll.
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 2.8, // Always cinematic slow + deliberate (Director's Cut default)
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.25,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop. Keep the id so route changes/unmounts do not leave an
    // orphaned animation frame calling into a destroyed Lenis instance.
    let rafId = 0;
    let active = true;
    function raf(time: number) {
      if (!active) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Only expose globally in DEV for debugging; never in production to avoid attack surface
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (import.meta.env.DEV) {
        const w = window as unknown as { __lenis?: Lenis };
        if (w.__lenis === lenis) delete w.__lenis;
      }
    };
  }, [enabled]);

  return null;
}

export default useLenis;
