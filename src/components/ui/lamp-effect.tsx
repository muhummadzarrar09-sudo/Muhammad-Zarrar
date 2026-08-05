"use client";
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Lamp Effect — Aceternity UI
 * Source: ui.aceternity.com/components/lamp-effect
 * MIT License
 */
export function LampEffect({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Lamp glow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -top-1 mx-auto h-[2px] w-[60%] bg-gradient-to-r from-transparent via-clay to-transparent"
        style={{ filter: "blur(4px)" }}
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -top-1 mx-auto h-[2px] w-[60%] bg-gradient-to-r from-transparent via-clay to-transparent"
      />
      {/* Glow cone */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={isInView ? { opacity: 0.15, scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute -top-8 left-1/2 h-[160px] w-[400px] -translate-x-1/2 bg-clay/30 blur-[100px]"
        style={{ borderRadius: "50% 50% 0 0" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
