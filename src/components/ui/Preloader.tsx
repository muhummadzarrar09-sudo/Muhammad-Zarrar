import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { signalAppEnter } from "@/lib/enter";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;

/**
 * Branded preloader — "MZ" wax-stamp slams in, a progress line fills,
 * then the whole sheet slides up to reveal the page mid-animation.
 * Skipped for `prefers-reduced-motion` (and the page is signalled
 * immediately so nothing waits on it).
 */
export default function Preloader() {
  // Skip entirely for reduced-motion visitors AND repeat visitors in the
  // same session (the wax stamp is a first-visit moment, not an ad).
  const [done, setDone] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    try {
      return sessionStorage.getItem("mz-preloader-seen") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (done) {
      // No overlay — make sure the page choreography still fires.
      signalAppEnter();
      return;
    }
    try {
      sessionStorage.setItem("mz-preloader-seen", "1");
    } catch {
      /* private mode — just show it every time */
    }
    const t1 = window.setTimeout(() => signalAppEnter(), 900);
    const t2 = window.setTimeout(() => setDone(true), 1250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="fixed inset-0 z-[250] grid place-items-center bg-canvas"
          exit={{ y: "-100%", transition: { duration: 0.85, ease: EASE_IN_OUT_QUINT } }}
        >
          <div className="text-center">
            {/* Wax-stamp monogram */}
            <motion.div
              initial={{ scale: 2.8, rotate: -16, opacity: 0 }}
              animate={{ scale: 1, rotate: -6, opacity: 1 }}
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              className="relative mx-auto grid h-24 w-24 place-items-center rounded-2xl border-[1.5px] border-clay-deep bg-surface lift"
            >
              <span className="font-display text-4xl font-light tracking-tight text-clay-deep">
                MZ
              </span>
              {/* Little corner notch — the stamp didn't land perfectly */}
              <span className="absolute -right-2 -top-3 h-4 w-4 rotate-12 rounded-[3px] border-[1.5px] border-clay-deep/70 bg-canvas" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="mt-7 font-mono text-[10px] uppercase tracking-[0.32em] text-muted"
            >
              Muhammad Zarrar — Portfolio
            </motion.p>

            {/* Filling progress line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mx-auto mt-6 h-px w-44 overflow-hidden bg-line"
            >
              <motion.div
                className="h-full origin-left bg-clay-deep"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, duration: 1.05, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
