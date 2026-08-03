import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Fold line that unfolds as you scroll into it — no 3D, just scaleX
export function Fold({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <div ref={ref} className="relative mx-auto max-w-6xl px-5 sm:px-8 py-8">
      <div className="relative flex items-center gap-3">
        <span className="h-px w-6 shrink-0 bg-clay/40" />
        <div className="relative h-px flex-1 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 origin-left border-t border-dashed border-line"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 origin-left border-t border-dashed border-clay/20"
            style={{ transform: "translateY(2px)" }}
          />
        </div>
        {label && (
          <span className="font-caption text-[10px] uppercase tracking-[0.2em] text-faint whitespace-nowrap">
            — {label} —
          </span>
        )}
      </div>
    </div>
  );
}

// Staple — two small dots at top of a notebook page
export function Staple() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 gap-7 pt-[9px]">
      <span className="h-[7px] w-[7px] rounded-full bg-ink/10 border border-ink/10" />
      <span className="h-[7px] w-[7px] rounded-full bg-ink/10 border border-ink/10" />
    </div>
  );
}

// Redline correction — cross out old + red new
export function Redline({ oldText, newText }: { oldText: string; newText: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 font-mono text-[11px]">
      <span className="relative text-faint line-through decoration-clay/60">{oldText}</span>
      <span className="text-clay font-medium tracking-tight">→ {newText}</span>
    </span>
  );
}

// Marginalia — handwritten note that appears on scroll, left or right
export function Marginalia({
  children,
  side = "right",
}: {
  children: ReactNode;
  side?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "right" ? 12 : -12, rotate: side === "right" ? 1.2 : -1.2 }}
      animate={inView ? { opacity: 1, x: 0, rotate: side === "right" ? 1 : -0.8 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className={`hidden lg:block absolute top-8 font-display italic text-[13px] leading-[1.4] text-clay/80 max-w-[150px] ${
        side === "right" ? "right-[-172px] text-left" : "left-[-172px] text-right"
      }`}
    >
      <span className="block h-px w-8 bg-clay/30 mb-2 ml-auto mr-auto lg:ml-0" />
      {children}
    </motion.div>
  );
}

// Rubber stamp
export function Stamp({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rotate-[-8deg] items-center justify-center rounded-[3px] border-[1.5px] border-clay/70 px-2 py-0.5 font-caption text-[9px] font-bold uppercase tracking-[0.15em] text-clay/80">
      {children}
    </span>
  );
}

// Hand-drawn circle arrow around CLIENT — Awwwards detail
export function ClientCircled({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="relative inline-flex">
      {/* Hand-drawn SVG circle — imperfect ellipse + arrow head */}
      <motion.svg
        width="78"
        height="36"
        viewBox="0 0 78 36"
        className="pointer-events-none absolute -left-2 -top-2 text-clay"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      >
        <motion.path
          d="M 6 18 C 6 6, 22 2, 39 3 C 56 4, 72 7, 72 18 C 72 29, 55 33, 39 33 C 23 33, 6 30, 6 18 Z
             M 68 12 L 73 18 L 67 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          style={{ filter: "url(#rough)" }}
        />
      </motion.svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Sticky page numbers p.01 / 05 — updates on scroll, brutalist left margin
export function PageNumbers() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = ["top", "about", "expertise", "work", "process", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const observe = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    const t = window.setTimeout(observe, 1000);
    return () => {
      obs.disconnect();
      mo.disconnect();
      clearTimeout(t);
    };
  }, []);

  const map: Record<string, number> = {
    top: 0,
    about: 1,
    expertise: 2,
    work: 3,
    process: 4,
    contact: 5,
  };
  const current = map[active] ?? 0;

  return (
    <div className="pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 lg:flex flex-col items-center gap-3 pl-4">
      <div className="font-caption text-[10px] font-bold tracking-[0.2em] text-faint rotate-[-90deg] origin-center whitespace-nowrap">
        p.{String(current).padStart(2, "0")} / 05
      </div>
      <div className="flex flex-col gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-[18px] w-px transition-all duration-500 ${
              i === current ? "bg-clay h-[28px]" : "bg-line"
            }`}
          />
        ))}
      </div>
      <div className="font-mono text-[9px] text-faint rotate-[-90deg] whitespace-nowrap tracking-[0.15em]">
        brutalist notebook
      </div>
    </div>
  );
}

// Torn edge bottom using mask
export function TornEdge() {
  return <div className="pointer-events-none h-[18px] w-full bg-canvas" style={{ clipPath: "polygon(0 0, 3% 100%, 7% 20%, 11% 90%, 15% 10%, 20% 85%, 26% 15%, 32% 95%, 38% 5%, 44% 80%, 50% 10%, 56% 90%, 62% 20%, 68% 100%, 74% 15%, 80% 85%, 86% 10%, 92% 90%, 96% 20%, 100% 100%, 100% 0)" }} />;
}

// Hand-drawn arrow pointing to red margin line — brutalist annotation
export function MarginArrow({ label = "red margin — composition book" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="pointer-events-none absolute left-[52px] lg:left-[68px] top-0 hidden sm:flex items-center gap-2 z-20"
    >
      <svg width="40" height="20" viewBox="0 0 40 20" className="text-clay/60">
        <motion.path
          d="M 0 10 Q 12 2, 22 10 T 38 10 M 32 6 L 38 10 L 32 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        />
      </svg>
      <span className="font-caption text-[9px] uppercase tracking-[0.15em] text-clay/70 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

// Envelope that seals — for Contact section
export function Envelope({ isSealed, children }: { isSealed: boolean; children: ReactNode }) {
  return (
    <div className="relative">
      {/* Flap */}
      <motion.div
        className="absolute -top-[28px] left-0 right-0 h-[30px] origin-bottom bg-surface border border-line border-b-0"
        style={{
          clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          transformOrigin: "50% 100%",
        }}
        animate={{ rotateX: isSealed ? 0 : -35, y: isSealed ? 0 : -8 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      />
      {/* Seal dot */}
      <motion.div
        className="absolute -top-2 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full bg-clay grid place-items-center text-canvas font-bold text-[10px]"
        animate={{ scale: isSealed ? 1 : 0.85, opacity: isSealed ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      >
        M
      </motion.div>
      <div className="relative rounded-t-none rounded-b-[1.8rem] border border-line bg-surface p-6 sm:p-8 pt-8">
        {children}
      </div>
    </div>
  );
}
