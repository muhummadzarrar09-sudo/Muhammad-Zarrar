import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { bizProcess } from "@/business/data";
import { Reveal, SectionHeading } from "@/components/primitives";
import { useSectionWhoosh } from "@/business/useSectionWhoosh";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BusinessProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const whooshRef = useSectionWhoosh();

  return (
    <section id="process" ref={whooshRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        06
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="04"
          label="Process"
          title={
            <>
              Simple, fast,
              <br />
              <span className="italic text-spark">proven.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Four steps from audit to launch. No fluff, no endless meetings.
          </p>
        </Reveal>
      </div>

      {/* Centered timeline */}
      <div ref={ref} className="relative mx-auto mt-16 max-w-2xl">
        {/* vertical track */}
        <div className="absolute bottom-2 left-4 top-2 w-px bg-line sm:left-6">
          <motion.div style={{ height: lineH }} className="absolute left-0 top-0 w-px bg-gradient-to-b from-ink to-spark" />
        </div>

        <div className="space-y-10">
          {bizProcess.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ delay: i * 0.05, duration: 0.7, ease: EASE }}
              className="relative pl-12 sm:pl-16"
            >
              {/* dot — centered exactly on the track */}
              <span className="absolute left-4 top-1.5 z-10 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center rounded-full border-2 border-spark bg-canvas sm:left-6">
                <span className="h-1.5 w-1.5 rounded-full bg-spark" />
              </span>
              <div className="font-mono text-xs text-muted">{s.no}</div>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
