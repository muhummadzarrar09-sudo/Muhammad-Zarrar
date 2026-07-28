import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { sound } from "@/lib/sound";

/**
 * Plays a soft "whoosh" the first time a section scrolls into view — the same
 * section-entry cue used in the main portfolio. Attach the returned ref to a
 * <section>. Fires once, then never again.
 */
export function useSectionWhoosh() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const fired = useRef(false);
  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      sound.whoosh();
    }
  }, [inView]);
  return ref;
}
