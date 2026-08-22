"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fade/slide-up on section entry via IntersectionObserver.
 * Content is fully visible without JS; the hidden state is only
 * applied client-side right before observing. Respects
 * prefers-reduced-motion (both here and in CSS).
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.closest("[data-motion], .page-hero")) return;

    el.classList.add("rv");
    /*
     * Keep this reversible. A one-shot reveal makes a long page feel inert
     * when someone scrolls back through it; toggling the state lets every
     * section gently re-enter in either direction without hiding content
     * before JavaScript has loaded.
     */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("rv-in", entry.isIntersecting);
        }
      },
      {
        threshold: 0.12,
        // The element is reset only once it has properly left the reading area.
        rootMargin: "-8% 0px -12% 0px",
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
