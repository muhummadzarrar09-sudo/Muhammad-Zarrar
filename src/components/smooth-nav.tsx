"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";

/**
 * Glide helper — funnel every programmatic scroll through Lenis when it
 * owns the page, fall back to the browser otherwise. Dispatching the
 * CustomEvent is safe even before the engine boots (nothing listens).
 */
export function glideTo(target: string | number) {
  if (typeof window === "undefined") return;
  if (document.documentElement.classList.contains("has-lenis")) {
    window.dispatchEvent(
      new CustomEvent("motion:scrollTo", { detail: target })
    );
  } else {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    } else {
      document
        .querySelector(target)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  }
}

/**
 * An internal <Link> that never goes dead. Clicking the link for the page
 * you're already on glides back to the top of it (or to its hash) instead
 * of doing nothing — footer and header nav stay connected to the walk.
 */
export function SmartLink({
  href,
  children,
  className,
  ariaLabel,
  ariaCurrent,
  tabIndex,
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | "true" | "false";
  tabIndex?: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;

    const sameRoute = url.pathname === pathname;
    const hash = url.hash || "";

    if (sameRoute && !hash) {
      // Same page, no target — glide home to the top.
      event.preventDefault();
      glideTo(0);
      return;
    }
    if (sameRoute && hash) {
      // Same page, in-page target — own the glide ourselves so it runs
      // through the same offset & easing whether or not Lenis's own
      // anchor interceptor is present.
      event.preventDefault();
      event.stopPropagation();
      glideTo(hash);
    }
    // Different route — let the router (and the route progress bar) run.
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
