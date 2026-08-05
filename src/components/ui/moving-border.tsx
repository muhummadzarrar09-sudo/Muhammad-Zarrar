"use client";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Moving Border — Aceternity UI
 * Source: ui.aceternity.com/components/moving-border
 * MIT License
 */
export function MovingBorderButton({
  children,
  className,
  containerClassName,
  href,
  duration = 3000,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  href?: string;
  duration?: number;
}) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-full p-[1px]",
        containerClassName
      )}
      onClick={() => href && (window.location.href = href)}
    >
      <MovingBorder duration={duration} />
      <div
        className={cn(
          "relative z-10 rounded-full bg-surface px-6 py-3 text-sm font-medium text-ink",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
}

function MovingBorder({ duration = 3000 }: { duration?: number }) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const px = Math.floor((time % duration) / duration * length);
      progress.set(px / length);
    }
  });

  const x = useTransform(progress, (v) => {
    const el = pathRef.current;
    if (!el) return 0;
    const point = el.getPointAtLength(v * (el.getTotalLength() || 0));
    return point.x;
  });

  const y = useTransform(progress, (v) => {
    const el = pathRef.current;
    if (!el) return 0;
    const point = el.getPointAtLength(v * (el.getTotalLength() || 0));
    return point.y;
  });

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect
        ref={pathRef}
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="999"
        ry="999"
        fill="none"
        stroke="none"
      />
      <motion.circle
        cx={x}
        cy={y}
        r="20"
        fill="url(#movingBorderGradient)"
        className="opacity-60"
      />
      <defs>
        <radialGradient id="movingBorderGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C46B4D" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C46B4D" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
