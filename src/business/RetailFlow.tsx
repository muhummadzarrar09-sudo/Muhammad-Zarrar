import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { biz, retailFlow } from "@/business/data";
import { MagneticButton, SectionHeading } from "@/components/primitives";

export default function RetailFlow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineW = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="retailflow" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading index="02" label="Productized • Cinematic Act 03" title={<>RetailFlow<br /><span className="italic text-spark">system.</span></>} />
        <p className="max-w-sm text-base leading-relaxed text-ink-soft">{retailFlow.tagline}</p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[1.4rem] border border-line bg-surface/70 p-6 sm:p-8 backdrop-blur">
          <p className="text-base leading-relaxed text-ink-soft">{retailFlow.explanation}</p>
          <div className="mt-6 h-px w-full bg-line">
            <motion.div style={{ scaleX: lineW, originX: 0 }} className="h-full w-full bg-spark" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {retailFlow.audience.map((a) => (
              <span key={a} className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-soft">{a}</span>
            ))}
          </div>
        </div>
        <div className="rounded-[1.4rem] border border-spark/30 bg-spark/[0.04] p-6 sm:p-8">
          <span className="font-mono text-[11px] uppercase tracking-wide text-spark">Core signal</span>
          <p className="mt-3 text-lg font-medium leading-snug text-ink">{retailFlow.core}</p>
        </div>
      </div>

      <div className="mt-14 grid items-start gap-5 md:grid-cols-3">
        {retailFlow.plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7 }}
            className={`group relative flex flex-col rounded-[1.8rem] border p-7 transition-all duration-500 hover:-translate-y-2 ${plan.featured ? "border-spark/40 bg-ink text-canvas shadow-[0_24px_60px_-24px_rgba(255,77,23,0.5)]" : "border-line bg-surface"}`}
          >
            {plan.featured && <span className="absolute right-5 top-5 rounded-full bg-spark px-2.5 py-1 text-[10px] font-semibold text-canvas">Popular • Act 03 climax</span>}
            <span className={`font-mono text-[11px] uppercase tracking-wide ${plan.featured ? "text-spark" : "text-muted"}`}>{plan.name}</span>
            <div className="mt-4 flex items-end gap-1.5"><span className="font-display text-[2.8rem] font-light leading-none">{plan.price}</span><span className="pb-1 text-sm opacity-60">{plan.suffix}</span></div>
            <div className="mt-1 font-mono text-[11px] uppercase opacity-50">{plan.period}</div>
            <p className={`mt-4 text-sm leading-relaxed ${plan.featured ? "text-canvas/70" : "text-ink-soft"}`}>{plan.desc}</p>
            <div className={`my-5 h-px w-full ${plan.featured ? "bg-canvas/15" : "bg-line"}`} />
            <ul className="flex flex-col gap-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm"><span className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full text-[10px] ${plan.featured ? "bg-spark/25 text-spark" : "bg-circuit/15 text-circuit"}`}>✓</span><span className={plan.featured ? "text-canvas/80" : "text-ink-soft"}>{f}</span></li>
              ))}
            </ul>
            <div className="mt-7"><MagneticButton href={biz.whatsappCta} className={`w-full justify-center ${plan.featured ? "bg-spark text-canvas" : "bg-ink text-canvas"}`}>Get started →</MagneticButton></div>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-muted">{retailFlow.note}</p>
    </section>
  );
}
