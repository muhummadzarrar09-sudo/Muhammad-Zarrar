"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * CinematicSpacer — pure breathing room.
 * Elegant negative space that feels alive and cinematic.
 * Used between heavy moments for immersion.
 */
export function CinematicSpacer({ height = 180 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <div 
      ref={ref} 
      className="relative mx-auto max-w-6xl px-5"
      style={{ height: `${height}px` }}
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center opacity-40"
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-line to-transparent" />
      </motion.div>
    </div>
  );
}
