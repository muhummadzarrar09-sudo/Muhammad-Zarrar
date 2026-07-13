import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { process } from "@/data/portfolio";
import { SectionHeading } from "@/components/primitives";

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading index="04" label="Protocol" title={<>Studio method —<br /><span className="italic text-spark">research, brand, build.</span></>} />

      <div className="relative mt-16">
        {/* line */}
        <div className="absolute left-[18px] top-0 hidden h-full w-px bg-line md:block">
          <motion.div style={{ scaleY: pathLength, originY: 0 }} className="h-full w-full bg-spark" />
        </div>

        <div className="grid gap-10 md:gap-0">
          {process.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="relative grid gap-4 md:grid-cols-[48px_1fr] md:gap-8"
            >
              <div className="relative hidden md:block">
                <div className="grid h-9 w-9 place-items-center rounded-full border border-line bg-canvas font-mono text-xs text-spark">
                  {s.no}
                </div>
              </div>
              <div className="border-l border-line pl-6 md:border-l-0 md:pl-0 pb-10">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-light tracking-tight">{s.title}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{s.role}</span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
