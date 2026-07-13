import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Tight dot, looser ring — Fable restraint
  const dotX = useSpring(x, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60 });
  const ringX = useSpring(x, { stiffness: 180, damping: 26 });
  const ringY = useSpring(y, { stiffness: 180, damping: 26 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.("a, button, [data-hover]") as HTMLElement | null;
      setHovering(!!el);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[110]" aria-hidden>
      {/* dot */}
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-spark" />
      </motion.div>
      {/* ring */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 0.6 : 0.25 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full border border-ink/15"
        />
      </motion.div>
    </div>
  );
}
