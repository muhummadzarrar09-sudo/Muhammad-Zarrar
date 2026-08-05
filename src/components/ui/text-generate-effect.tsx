"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Text Generate Effect — Aceternity UI
 * Source: ui.aceternity.com/components/text-generate-effect
 * MIT License
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)} ref={ref}>
      <div className="mt-4">
        <div className="dark:text-white text-black leading-snug tracking-tight">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="inline-block"
              initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
              animate={
                isInView
                  ? { opacity: 1, filter: filter ? "blur(0px)" : "none" }
                  : {}
              }
              transition={{
                duration: duration,
                delay: idx * 0.08,
              }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
