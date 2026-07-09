import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Anything that should trigger a contextual tooltip.
const MATCH =
  "a, button, [data-hover], [data-cursor], input, textarea, label, [role='button'], [data-cursor-label]";

/** Auto-detect a friendly action label for the element under the cursor. */
function labelFor(el: HTMLElement): string {
  const custom = el.dataset.cursorLabel;
  if (custom !== undefined) return custom;
  if (el.matches('a[href^="mailto"]')) return "Email";
  if (el.matches('a[target="_blank"], a[href^="http"]')) return "Open";
  if (el.matches("input, textarea")) return "Type";
  if (el.tagName === "A") return "Navigate";
  if (el.tagName === "BUTTON" || el.getAttribute("role") === "button")
    return "Tap";
  return "";
}

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  // Raw pointer
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The dot is tight & precise; the tooltip drifts just behind it.
  const dotX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.25 });
  const tipX = useSpring(x, { stiffness: 650, damping: 38, mass: 0.5 });
  const tipY = useSpring(y, { stiffness: 650, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // Smart placement: keep the tooltip fully inside the viewport.
      setFlipX(e.clientX > window.innerWidth * 0.62);
      setFlipY(e.clientY > window.innerHeight * 0.72);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(MATCH) as HTMLElement | null;
      if (!el) {
        setHovering(false);
        setLabel("");
        return;
      }
      setHovering(true);
      setLabel(labelFor(el));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const click = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("click", click);
    };
  }, [x, y]);

  if (!enabled) return null;

  const showTip = hovering && label.length > 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[110]" aria-hidden>
      {/* THE DOT — small, precise, alive */}
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: down ? 1.7 : hovering ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          className="-translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-2.5 w-2.5 rounded-full bg-spark">
            <span className="absolute inset-0 rounded-full bg-spark opacity-70 blur-[5px]" />
          </div>
        </motion.div>
      </motion.div>

      {/* THE TOOLTIP — a blob that flips to stay on screen */}
      <motion.div style={{ x: tipX, y: tipY }} className="absolute left-0 top-0">
        <AnimatePresence>
          {showTip && (
            <motion.span
              key={label + String(flipX) + String(flipY)}
              initial={{ opacity: 0, scale: 0.7, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: flipX ? "auto" : "22px",
                right: flipX ? "22px" : "auto",
                top: flipY ? "auto" : "22px",
                bottom: flipY ? "22px" : "auto",
              }}
              className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-spark/30 bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-canvas shadow-lg shadow-ink/25"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-spark" />
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CLICK RIPPLES */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: r.x, top: r.y }}
            className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-spark"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
