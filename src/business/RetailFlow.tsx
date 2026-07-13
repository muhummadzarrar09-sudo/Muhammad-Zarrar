import { motion } from "framer-motion";
import { biz, retailFlow } from "@/business/data";
import { MagneticButton, Reveal, SectionHeading } from "@/components/primitives";
import { useSectionWhoosh } from "@/business/useSectionWhoosh";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RetailFlow() {
  const ref = useSectionWhoosh();
  return (
    <section id="retailflow" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        02
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="02"
          label="Productized offer"
          title={
            <>
              RetailFlow
              <br />
              <span className="italic text-spark">system.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft text-pretty">
            {retailFlow.tagline}
          </p>
        </Reveal>
      </div>

      {/* Explanation + core message */}
      <div className="mt-12 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="biz-card h-full rounded-2xl p-6 sm:p-8">
            <p className="text-base leading-relaxed text-ink-soft text-pretty">{retailFlow.explanation}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-spark/30 bg-spark/[0.04] p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-spark">Core message</span>
            <p className="mt-3 text-lg font-medium leading-snug text-ink text-balance">{retailFlow.core}</p>
          </div>
        </Reveal>
      </div>

      {/* Who it's for */}
      <Reveal delay={0.08}>
        <div className="mt-8 flex flex-wrap gap-2">
          {retailFlow.audience.map((a) => (
            <span key={a} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft">
              {a}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Pricing — premium payment-card style, each tier lists its own features */}
      <div className="mt-14 grid items-start gap-5 md:grid-cols-3">
        {retailFlow.plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
            data-hover
            className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 hover:-translate-y-1.5 ${
              plan.featured ? "border-spark/40 bg-ink text-canvas" : "border-line bg-surface text-ink hover:border-spark/30"
            }`}
            style={{
              boxShadow: plan.featured
                ? "0 24px 60px -24px rgba(255,77,23,0.5)"
                : "0 1px 1px rgba(23,21,15,0.04), 0 12px 28px -16px rgba(23,21,15,0.2)",
            }}
          >
            {plan.featured && (
              <>
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-spark/30 blur-[60px]" />
                <span className="absolute right-5 top-5 rounded-full bg-spark px-2.5 py-1 text-[10px] font-semibold text-canvas">
                  Popular
                </span>
              </>
            )}

            <span className={`relative font-mono text-[11px] uppercase tracking-[0.2em] ${plan.featured ? "text-spark" : "text-muted"}`}>
              {plan.name}
            </span>

            <div className="relative mt-4 flex items-end gap-1.5">
              <span className="font-display text-[2.75rem] font-light leading-none tracking-tightest">{plan.price}</span>
              <span className={`pb-1 text-sm ${plan.featured ? "text-canvas/50" : "text-muted"}`}>{plan.suffix}</span>
            </div>
            <div className={`relative mt-1 font-mono text-[11px] uppercase tracking-wider ${plan.featured ? "text-canvas/40" : "text-muted"}`}>
              {plan.period}
            </div>

            <p className={`relative mt-4 text-sm leading-relaxed ${plan.featured ? "text-canvas/70" : "text-ink-soft"}`}>{plan.desc}</p>

            <div className={`relative my-5 h-px w-full ${plan.featured ? "bg-canvas/15" : "bg-line"}`} />

            <ul className="relative flex flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${plan.featured ? "bg-spark/25 text-spark" : "bg-circuit/15 text-circuit"}`}>
                    ✓
                  </span>
                  <span className={plan.featured ? "text-canvas/80" : "text-ink-soft"}>{f}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-7">
              <MagneticButton
                href={biz.whatsappCta}
                cursorLabel="WhatsApp"
                className={`w-full justify-center ${plan.featured ? "bg-spark text-canvas hover:bg-canvas hover:text-ink" : "bg-ink text-canvas hover:bg-spark"}`}
              >
                Get started
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted">{retailFlow.note}</p>
      </Reveal>
    </section>
  );
}
