"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * 2px teal route progress bar. Starts on internal link click,
 * completes when the new route renders. No layout impact.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const firstRender = useRef(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        anchor.target === "_blank"
      ) {
        return;
      }
      if (href === pathname) return;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setState("loading");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setState("done");
    const t1 = setTimeout(() => setState("idle"), 650);
    return () => clearTimeout(t1);
  }, [pathname]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="route-progress" data-state={state} aria-hidden="true">
      <span />
    </div>
  );
}
