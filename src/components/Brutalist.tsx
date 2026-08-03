import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

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
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint whitespace-nowrap">
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
    <span className="inline-flex rotate-[-8deg] items-center justify-center rounded-[3px] border-[1.5px] border-clay/70 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-clay/80">
      {children}
    </span>
  );
}

// Torn edge bottom using mask
export function TornEdge() {
  return <div className="pointer-events-none h-[18px] w-full bg-canvas" style={{ clipPath: "polygon(0 0, 3% 100%, 7% 20%, 11% 90%, 15% 10%, 20% 85%, 26% 15%, 32% 95%, 38% 5%, 44% 80%, 50% 10%, 56% 90%, 62% 20%, 68% 100%, 74% 15%, 80% 85%, 86% 10%, 92% 90%, 96% 20%, 100% 100%, 100% 0)" }} />;
}
