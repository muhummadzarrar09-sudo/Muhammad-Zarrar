import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Staple — realistic metal staple at top of notebook page             */
/* ------------------------------------------------------------------ */
export function Staple() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 gap-8 pt-[6px]">
      <svg width="10" height="14" viewBox="0 0 10 14" className="text-ink/40">
        <path d="M 2 0 L 2 10 Q 2 13, 5 13 Q 8 13, 8 10 L 8 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="2" y1="0" x2="8" y2="0" stroke="currentColor" strokeWidth="1.3" />
      </svg>
      <svg width="10" height="14" viewBox="0 0 10 14" className="text-ink/40">
        <path d="M 2 0 L 2 10 Q 2 13, 5 13 Q 8 13, 8 10 L 8 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="2" y1="0" x2="8" y2="0" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stamp — rubber stamp effect                                         */
/* ------------------------------------------------------------------ */
export function Stamp({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rotate-[-8deg] items-center justify-center rounded-[3px] border-[1.5px] border-clay-deep/80 px-2.5 py-0.5 font-caption text-[10px] font-bold uppercase tracking-[0.12em] text-clay-deep shadow-sm">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* PaperClip — realistic wire paper clip SVG                           */
/* ------------------------------------------------------------------ */
export function PaperClip({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute select-none ${className}`}>
      <svg width="20" height="48" viewBox="0 0 20 48" fill="none" className="text-ink/[0.35]">
        {/* Outer wire */}
        <path
          d="M 7 2 C 14 2, 18 6, 18 14 L 18 34 C 18 40, 14 44, 10 44 C 6 44, 3 40, 3 34 L 3 12 C 3 7, 6 4, 10 4"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"
        />
        {/* Inner wire (the loop back) */}
        <path
          d="M 10 4 C 13 4, 15 7, 15 12 L 15 32 C 15 37, 13 39, 10 39 C 7 39, 6 37, 6 32 L 6 14"
          stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"
        />
        {/* Highlight reflection */}
        <path
          d="M 8 6 L 8 10"
          stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tape — washi/masking tape with realistic texture                    */
/* ------------------------------------------------------------------ */
export function Tape({ rotate = -6, className = "" }: { rotate?: number; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-7 w-24 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(0% 0%, 100% 0%, 99% 12%, 100% 100%, 98% 100%, 0% 100%, 1% 88%, 0% 0%)",
      }}
    >
      {/* Tape body with subtle texture */}
      <div className="absolute inset-0 bg-sand/60 backdrop-blur-[1px] border border-sand/40" />
      {/* Wrinkle lines for realism */}
      <svg className="absolute inset-0 w-full h-full text-ink/[0.06]" preserveAspectRatio="none">
        <line x1="10%" y1="30%" x2="90%" y2="35%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="15%" y1="60%" x2="85%" y2="58%" stroke="currentColor" strokeWidth="0.3" />
        <line x1="5%" y1="80%" x2="95%" y2="82%" stroke="currentColor" strokeWidth="0.4" />
      </svg>
      {/* Torn edge indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-sand/80" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-sand/80" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TypewriterCursor — blinking cursor                                  */
/* ------------------------------------------------------------------ */
export function TypewriterCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
      className="inline-block h-[1em] w-[2px] bg-clay-deep ml-1 translate-y-[2px]"
    />
  );
}

/* ------------------------------------------------------------------ */
/* CoffeeStain — realistic coffee ring stain                           */
/* ------------------------------------------------------------------ */
export function CoffeeStain({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <svg width="72" height="72" viewBox="0 0 72 72" className="text-[#8B6B4A]">
        {/* Outer ring — irregular */}
        <ellipse cx="36" cy="36" rx="30" ry="28" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.06"
          transform="rotate(-5 36 36)" />
        {/* Inner ring — thinner, offset */}
        <ellipse cx="35" cy="37" rx="22" ry="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.04"
          transform="rotate(3 35 37)" />
        {/* Splash droplets */}
        <circle cx="58" cy="22" r="3" fill="currentColor" opacity="0.03" />
        <circle cx="14" cy="50" r="2" fill="currentColor" opacity="0.025" />
        <circle cx="60" cy="40" r="1.5" fill="currentColor" opacity="0.02" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScribbleLink — hand-drawn underline on hover                        */
/* ------------------------------------------------------------------ */
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
        width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 w-full text-clay-deep/50"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hover ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        <motion.path
          d="M 0 5 Q 10 1, 20 4 T 40 5 T 60 4 T 80 5 T 100 4"
          fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="0.5 2"
        />
      </motion.svg>
    </a>
  );
}
