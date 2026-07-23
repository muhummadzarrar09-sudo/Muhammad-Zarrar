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

    const lenis = new Lenis({
      duration: 2.8, // Always cinematic slow + deliberate (Director's Cut default)
      easing: (t: number) => Math.min(1, 1.0010000000000001 * (-Math.pow(2, -10 * t) + 1)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose globally for debugging + advanced control
    (window as any).__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef.current;
}

export default useLenis;
