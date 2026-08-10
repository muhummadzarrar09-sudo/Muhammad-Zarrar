import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { smoothScrollToId } from "@/lib/scroll";

const SECTIONS = [
  { id: "about", no: "01", label: "About" },
  { id: "expertise", no: "02", label: "Expertise" },
  { id: "work", no: "03", label: "Work" },
  { id: "process", no: "04", label: "Process" },
  { id: "contact", no: "05", label: "Contact" },
];

/**
 * Section index — a quiet editorial rail on the right edge (large screens
 * only). Highlights the section in view; clicking scrolls smoothly.
 */
export default function SectionIndex() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-5">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => smoothScrollToId(s.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3 transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                )}
              >
                <span className="font-mono text-[9px] tracking-[0.2em] text-muted">
                  {s.no}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300",
                    isActive ? "text-clay-deep" : "text-faint"
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    isActive ? "w-6 bg-clay-deep" : "w-3 bg-line-strong"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
