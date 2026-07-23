"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Cinematic Chapter Break
 * For strong kinetic storytelling — these feel like film stills.
 */

interface CinematicBreakProps {
  image: string;
  label?: string;
  headline: string;
  sub?: string;
  align?: "left" | "center";
}

export function CinematicBreak({ image, label, headline, sub, align = "left" }: CinematicBreakProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 55]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 0.97]);

  return (
    <div ref={ref} className="relative my-16 h-[380px] md:h-[460px] overflow-hidden rounded-3xl">
      <motion.img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-ink/85" />

      <div className={`absolute inset-0 flex items-center px-8 md:px-14 ${align === "center" ? "justify-center text-center" : ""}`}>
        <div className="max-w-2xl">
          {label && <div className="font-mono text-xs tracking-[3.5px] text-spark mb-2">{label}</div>}
          <div className="font-display text-[42px] md:text-[52px] leading-[1.02] tracking-[-1.8px] text-canvas">
            {headline}
          </div>
          {sub && <p className="mt-5 text-lg text-canvas/70 max-w-lg">{sub}</p>}
        </div>
      </div>
    </div>
  );
}
