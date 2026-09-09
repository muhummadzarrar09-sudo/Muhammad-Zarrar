"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Route wipe — a paper curtain between pages. Capture-phase clicks on
 * internal links drop it (200ms, clay leading edge); when the new route
 * renders, it lifts (320ms), masking pop-in. Same-page anchors never
 * wipe. Skipped entirely under reduced motion; absent without JS.
 * Coexists with the 2px progress bar — different moments, different jobs.
 */
export function RouteWipe() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || !el.classList.contains("is-down")) return;
    el.classList.add("is-lifting");
    const t = window.setTimeout(
      () => el.classList.remove("is-down", "is-lifting"),
      340
    );
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download"))
        return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;
      const dest = new URL(anchor.href, window.location.href);
      if (dest.origin !== window.location.origin) return;
      if (dest.pathname === window.location.pathname) return;
      ref.current?.classList.add("is-down");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <div ref={ref} className="route-wipe" aria-hidden="true" />;
}
