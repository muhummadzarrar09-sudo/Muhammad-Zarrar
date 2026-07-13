import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "$ initializing zarrar.dev",
  "> loading modules · ai · voice · fullstack",
  "> compiling interfaces...",
  "> rendering experience ✓",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const step = 360;
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setCount(i + 1), step * (i + 1)));
    });
    timers.push(
      window.setTimeout(() => setExit(true), step * (LINES.length + 1)),
    );
    timers.push(window.setTimeout(() => onDone(), step * (LINES.length + 1) + 750));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const pct = Math.round((count / LINES.length) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-canvas"
      animate={exit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
    >
      <div className="w-[min(86vw,520px)]">
        <div className="mb-6 font-mono text-xs leading-relaxed text-canvas/60">
          {LINES.slice(0, count).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={l.includes("✓") ? "text-volt" : ""}
            >
              {l}
            </motion.div>
          ))}
          {count < LINES.length && (
            <span className="inline-block h-3 w-1.5 animate-pulse bg-spark align-middle" />
          )}
        </div>

        <div className="mb-2 flex items-end justify-between">
          <span className="font-display text-5xl font-light tracking-tightest">
            {pct}
            <span className="text-spark">%</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-canvas/40">
            Muhammad Zarrar
          </span>
        </div>
        <div className="h-px w-full bg-canvas/15">
          <motion.div
            className="h-full bg-spark"
            animate={{ width: `${pct}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
