import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { useRef } from "react";
import { bizMarquee } from "@/business/data";

export default function BizMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const vel = useVelocity(scrollYProgress);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const skew = useTransform(smooth, [-1, 1], [-10, 10]);
  const row = [...bizMarquee, ...bizMarquee];
  return (
    <section ref={ref} className="relative flex overflow-hidden border-y border-line bg-surface/50 py-4">
      <motion.div style={{ skewX: skew }} className="flex">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pr-8">
          {row.map((m, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">{m}</span>
              <span className="h-1 w-1 rounded-full bg-spark" />
            </span>
          ))}
        </div>
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap pr-8">
          {row.map((m, i) => (
            <span key={`2-${i}`} className="flex items-center gap-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">{m}</span>
              <span className="h-1 w-1 rounded-full bg-spark" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
