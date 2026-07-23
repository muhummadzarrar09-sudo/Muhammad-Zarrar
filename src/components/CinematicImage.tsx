"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Cinematic Image — built for kinetic storytelling
 * Strong scroll-driven movement, elegant and certain.
 */

interface CinematicImageProps {
  src: string;
  alt?: string;
  className?: string;
  variant?: "parallax" | "slowZoom" | "horizontal" | "reveal";
  intensity?: number;
}

export function CinematicImage({
  src,
  alt = "",
  className = "",
  variant = "parallax",
  intensity = 1,
}: CinematicImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different cinematic behaviors — ultra calm, luxurious, premium
  const y = useTransform(scrollYProgress, [0, 1], [intensity * -28, intensity * 34]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1.035]);
  const x = useTransform(scrollYProgress, [0, 1], [intensity * -14, intensity * 14]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.55, 1, 1, 0.88]);

  let motionProps: any = { opacity };

  if (variant === "parallax") {
    motionProps = { y, scale, opacity };
  } else if (variant === "slowZoom") {
    motionProps = { scale, opacity };
  } else if (variant === "horizontal") {
    motionProps = { x, opacity };
  } else if (variant === "reveal") {
    motionProps = { y: useTransform(scrollYProgress, [0, 1], [80, 0]), opacity };
  }

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-3xl ${className}`}>
      <motion.div style={motionProps} className="relative w-full h-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 pointer-events-none" />
      </motion.div>
    </div>
  );
}
