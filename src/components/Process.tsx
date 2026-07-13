import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { cn } from "@/utils/cn";
import { sound } from "@/lib/sound";

function useWhoosh() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const fired = useRef(false);
  useEffect(() => {
    if (inView && !fired.current) { fired.current = true; sound.whoosh(); }
  }, [inView]);
  return ref;
}

export default function Process() {
  const [active, setActive] = useState(0);
  const sectionRef = useWhoosh();
  return (
    <section id="process" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      {/* decorative background number */}
      <span
        className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8"
        aria-hidden
      >
        04
      </span>
      <SectionHeading
        index="04"
        label="Process"
        title={
          <>
            Like a studio — research,
            <br />
            <span className="italic text-spark">brand, build, repeat.</span>
          </>
        }
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        {process.map((s, i) => (
          <motion.div
            key={s.no}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActive(i)}
            data-hover
            data-cursor-label={active === i ? "Active" : "Hover"}
            className={cn(
              "relative flex flex-col gap-5 bg-canvas p-7 transition-colors duration-500 sm:p-8",
              active === i ? "bg-ink text-canvas" : "",
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "font-display text-5xl font-light tracking-tightest transition-colors",
                  active === i ? "text-spark" : "text-ink/15",
                )}
              >
                {s.no}
              </span>
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-500",
                  active === i ? "scale-100 bg-spark" : "scale-50 bg-line",
                )}
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-medium tracking-tight">
                {s.title}
              </h3>
              <div
                className={cn(
                  "mt-1 font-mono text-[11px] uppercase tracking-[0.18em]",
                  active === i ? "text-spark-soft" : "text-spark",
                )}
              >
                {s.role}
              </div>
            </div>
            <p
              className={cn(
                "text-sm leading-relaxed",
                active === i ? "text-canvas/70" : "text-muted",
              )}
            >
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          Whether it’s an autonomous agent or a full product, the same belief
          holds: great software is part research, part branding, part layout and
          part motion — then the engineering to make it real.
        </p>
      </Reveal>
    </section>
  );
}
