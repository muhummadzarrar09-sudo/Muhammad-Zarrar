import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/utils/cn";

// Auros-style motion: expressive, gravity-weighted with a snappy overshoot.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — fade + rise into view on scroll                            */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(8px)" }
      }
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Word-by-word headline reveal */
export function RevealWords({
  text,
  className,
  as: Tag = "span",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            custom={i}
            variants={{
              hidden: { opacity: 0, y: "0.55em", filter: "blur(10px)" },
              show: (idx: number) => ({
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.9,
                  ease: EASE_OUT,
                  delay: delay + idx * 0.06,
                },
              }),
            }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* MagneticButton — pulls toward the cursor for a tactile feel         */
/* ------------------------------------------------------------------ */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.4,
  variant = "solid",
  cursorLabel,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  variant?: "solid" | "ghost" | "outline";
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "solid"
      ? "bg-ink text-canvas hover:bg-spark"
      : variant === "outline"
        ? "border border-ink/20 text-ink hover:border-ink/50"
        : "text-ink hover:text-spark";

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform",
        styles,
        className,
      )}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        data-hover
        data-cursor-label={cursorLabel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-hover
      data-cursor-label={cursorLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — consistent editorial label + title                 */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-spark">{index}</span>
          <span className="h-px w-8 bg-line" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tightest text-balance sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}


