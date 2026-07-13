import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "DECODING SIGNAL...",
  "14 repos • 6 AI systems • voice • full-stack",
  "compiling → rendering → transmitting",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setLine(i + 1), 420 * (i + 1)));
    });
    timers.push(window.setTimeout(() => setExit(true), 420 * (LINES.length + 1) + 200));
    timers.push(window.setTimeout(() => onDone(), 420 * (LINES.length + 1) + 900));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const pct = Math.round((line / LINES.length) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-ink text-canvas"
      animate={exit ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.95, ease: [0.83, 0, 0.17, 1] }}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(3rem,18vw,14rem)] font-light leading-[0.85] tracking-tightest"
        >
          M<span className="italic text-spark">Z</span>
        </motion.div>

        <div className="mt-8 w-[min(90vw,420px)]">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas/40">{pct}% • signal lock</div>
          <div className="mt-3 h-px w-full bg-canvas/15">
            <motion.div className="h-full bg-spark" animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
          </div>
          <div className="mt-4 space-y-1 font-mono text-[11px] leading-relaxed text-canvas/50">
            {LINES.slice(0, line).map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                {l}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-canvas/10 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/30">
        <span>Rawalpindi • Remote-first</span>
        <span>2026 • Transmission v2</span>
      </div>
    </motion.div>
  );
}
