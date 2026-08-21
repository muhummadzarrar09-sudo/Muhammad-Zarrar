"use client";

import { useLayoutEffect, useRef } from "react";

const LINES = [
  "Most websites don't fail loudly.",
  "They fail quietly —",
  "a slow load here, a blank page to Google there,",
  "money leaking out of flows nobody ever audited.",
];

const FINAL_LINE = "We find the leaks. Then we build the fix.";

/**
 * The pinned manifesto — a full-screen section pinned with GSAP ScrollTrigger;
 * each line lands as you scroll, then the page releases. GSAP is loaded
 * dynamically so only the home page pays for it, and the whole effect is
 * skipped (static block instead) under prefers-reduced-motion.
 */
export function PinnedManifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(lines, { y: 64, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      lines.forEach((line) => {
        tl.to(line, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" });
        tl.to({}, { duration: 0.45 }); // hold
      });
      tl.to({}, { duration: 0.6 });

      cleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(lines, { clearProps: "all" });
        ScrollTrigger.refresh();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      className="manifesto"
      id="manifesto"
      data-tl="Manifesto"
      aria-label="The manifesto"
      ref={rootRef}
    >
      <div className="manifesto-inner">
        <span className="eyebrow">The Manifesto</span>
        {LINES.map((line) => (
          <p className="manifesto-line" data-line key={line}>
            {line}
          </p>
        ))}
        <p className="manifesto-line manifesto-final" data-line>
          {FINAL_LINE}
        </p>
      </div>
    </section>
  );
}
