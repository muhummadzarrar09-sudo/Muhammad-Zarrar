import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fully custom dropdown — no native <select> chrome. Styled to the warm
 * palette. Supports a `dark` variant for use on the ink contact card.
 */
export default function Dropdown({
  value,
  options,
  onChange,
  className,
  dark = false,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const trigger = dark
    ? "border-canvas/20 bg-canvas/5 text-canvas hover:border-canvas/40"
    : "border-line bg-canvas text-ink hover:border-spark/50";

  const listCls = dark
    ? "border-canvas/15 bg-[#1f1d16] text-canvas"
    : "border-line bg-surface text-ink";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        data-hover
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm outline-none transition-colors",
          trigger,
        )}
      >
        <span className={cn(value ? "" : dark ? "text-canvas/40" : "text-muted")}>{value || "Select…"}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="shrink-0">
          <svg viewBox="0 0 24 24" className={cn("h-4 w-4", dark ? "text-canvas/50" : "text-muted")} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={cn(
              "absolute z-30 mt-1.5 max-h-56 w-full overflow-auto rounded-lg border p-1 shadow-xl shadow-ink/10",
              listCls,
            )}
          >
            {options.map((o) => {
              const active = o === value;
              return (
                <li key={o}>
                  <button
                    type="button"
                    data-hover
                    onClick={() => {
                      onChange(o);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                      active
                        ? dark
                          ? "bg-spark/20 text-spark"
                          : "bg-spark/10 text-spark"
                        : dark
                          ? "text-canvas/80 hover:bg-canvas/10"
                          : "text-ink-soft hover:bg-canvas-deep",
                    )}
                  >
                    {o}
                    {active && <span className="text-xs">✓</span>}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
