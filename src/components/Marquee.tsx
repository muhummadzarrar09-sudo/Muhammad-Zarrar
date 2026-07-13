import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { useRef } from "react";
import { marquee } from "@/data/portfolio";

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const velocity = useVelocity(scrollYProgress);
  const smoothVel = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVel, [-1, 1], [-8, 8]);

  const row = [...marquee, ...marquee];
  return (
    <section ref={ref} className="relative flex overflow-hidden border-y border-line bg-surface/50 py-4">
      <motion.div style={{ skewX: skew }} className="flex shrink-0">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pr-8">
          {row.map((m, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{m}</span>
              <span className="h-1 w-1 rounded-full bg-spark" />
            </span>
          ))}
        </div>
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pr-8">
          {row.map((m, i) => (
            <span key={`2-${i}`} className="flex items-center gap-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{m}</span>
              <span className="h-1 w-1 rounded-full bg-spark" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
