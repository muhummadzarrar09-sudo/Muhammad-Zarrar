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
      <span className="h-[7px] w-[7px] rounded-full bg-ink/50 border border-ink/50" />
      <span className="h-[7px] w-[7px] rounded-full bg-ink/50 border border-ink/50" />
    </div>
  );
}

// Redline correction — cross out old + red new
export function Redline({ oldText, newText }: { oldText: string; newText: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 font-mono text-[11px]">
      <span className="relative text-faint line-through decoration-clay/60">{oldText}</span>
      <span className="text-clay-deep font-medium tracking-tight">→ {newText}</span>
    </span>
  );
}

// Marginalia — handwritten note that appears on scroll, left or right
export function Marginalia({
  children,
  side = "right",
  top = "top-8",
  showFrom = "min-[1440px]:block",
}: {
  children: ReactNode;
  side?: "left" | "right";
  top?: string;
  showFrom?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "right" ? 12 : -12, rotate: side === "right" ? 1.2 : -1.2 }}
      animate={inView ? { opacity: 1, x: 0, rotate: side === "right" ? 1 : -0.8 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className={`hidden ${showFrom} absolute ${top} z-10 font-display italic text-[13px] leading-[1.4] text-clay-deep max-w-[150px] ${
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
    <span className="inline-flex rotate-[-8deg] items-center justify-center rounded-[3px] border-[1.5px] border-clay-deep/80 px-2 py-0.5 font-caption text-[10px] font-bold uppercase tracking-[0.12em] text-clay-deep">
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
    <div className="pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 min-[1340px]:flex flex-col items-center gap-3 pl-4">
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
      <svg width="40" height="20" viewBox="0 0 40 20" className="text-clay-deep/80">
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
      <span className="font-caption text-[9px] uppercase tracking-[0.15em] text-clay-deep whitespace-nowrap">{label}</span>
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
        className="absolute -top-2 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full bg-clay-deep grid place-items-center text-canvas font-bold text-[10px]"
        animate={{ scale: isSealed ? 1 : 0.85, opacity: 1 }}
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

// Paper clip — brutalist desk artifact
export function PaperClip({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute select-none ${className}`}>
      <svg width="18" height="42" viewBox="0 0 18 42" fill="none" className="text-ink/50">
        <path d="M 6 2 C 12 2, 16 6, 16 14 L 16 32 C 16 38, 12 40, 8 40 C 4 40, 2 38, 2 32 L 2 10 C 2 6, 4 4, 8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// Washi tape — semi-transparent tape over corner
export function Tape({ rotate = -6, className = "" }: { rotate?: number; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-6 w-20 bg-sand/70 backdrop-blur-[1px] border border-sand/50 ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, clipPath: "polygon(2% 0, 98% 0, 100% 15%, 98% 100%, 2% 100%, 0 85%)" }}
    />
  );
}

// Scribble underline — hand-drawn underline on hover, surreal
export function ScribbleLink({ children, href }: { children: ReactNode; href: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="relative inline-flex"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-10">{children}</span>
      <motion.svg
        width="100%"
        height="8"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 w-full text-clay/50"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hover ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        <motion.path
          d="M 0 5 Q 10 1, 20 4 T 40 5 T 60 4 T 80 5 T 100 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="0.5 2"
        />
      </motion.svg>
    </a>
  );
}

// Typewriter cursor blink — surreal
export function TypewriterCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" } as any}
      className="inline-block h-[1em] w-[2px] bg-clay-deep ml-1 translate-y-[2px]"
    />
  );
}

// Coffee stain — surreal desk detail, ultra-subtle
export function CoffeeStain({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute rounded-full bg-[#9C6B4A]/[0.06] blur-[1px] ${className}`} style={{ width: 64, height: 64 }} />
  );
}
