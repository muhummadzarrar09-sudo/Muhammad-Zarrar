"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

/**
 * Client boot for Lenis + GSAP. Dynamically imports the engine so the
 * motion stack never lands on the static HTML of a no-JS crawl.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    let handle: { destroy: () => void } | undefined;
    let cancelled = false;

    import("@/motion/engine").then(({ startMotion }) => {
      if (cancelled) return;
      handle = startMotion(pathname);
    });

    return () => {
      cancelled = true;
      handle?.destroy();
    };
  }, [pathname]);

  return null;
}
