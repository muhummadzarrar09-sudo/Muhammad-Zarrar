/**
 * motion-ui.tsx — Aceternity-style animated components
 * Built on framer-motion. Premium scroll-triggered animations.
 */
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/utils/cn";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* TextReveal — word-by-word staggered reveal on scroll                */
/* ------------------------------------------------------------------ */
export function TextReveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: "div" | "p" | "span" | "h1" | "h2" | "h3";
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = children.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      aria-label={children}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            custom={i}
            variants={{
              hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
              show: (idx: number) => ({
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.8,
                  ease: EASE_OUT,
                  delay: delay + idx * 0.05,
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
/* SpotlightCard — hover spotlight glow effect                         */
/* ------------------------------------------------------------------ */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(196, 107, 77, 0.08)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) =>
              `radial-gradient(400px circle at ${latestX}px ${latestY}px, ${spotlightColor}, transparent 70%)`
          ),
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FloatingElement — gentle floating animation                         */
/* ------------------------------------------------------------------ */
export function FloatingElement({
  children,
  className,
  duration = 6,
  y = 8,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-y / 2, y / 2, -y / 2] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* BlurIn — simple blur-to-clear reveal                                */
/* ------------------------------------------------------------------ */
export function BlurIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MagneticButton — pulls toward cursor                                */
/* ------------------------------------------------------------------ */
export function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
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
  const reset = () => { x.set(0); y.set(0); };

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex items-center gap-2 will-change-transform",
        className
      )}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {inner}
    </button>
  );
}
