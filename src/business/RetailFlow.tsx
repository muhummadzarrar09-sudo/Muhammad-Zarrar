import { motion } from "framer-motion";
import { biz, retailFlow } from "@/business/data";
import { MagneticButton, Reveal, SectionHeading } from "@/components/primitives";
import { useSectionWhoosh } from "@/business/useSectionWhoosh";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RetailFlow() {
  const ref = useSectionWhoosh();

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="retailflow" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        04
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="04"
          label="Deep dive"
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

      {/* Link to main pricing instead of duplicating cards */}
      <div className="mt-10 rounded-3xl border border-line bg-surface p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Pricing</div>
            <p className="mt-1 text-lg font-medium text-ink">See the RetailFlow Catalog System pricing in the packages above.</p>
            <p className="mt-1 text-sm text-ink-soft">Starter from Rs. 25,000+ — Professional versions include admin tools, variants, and stock management.</p>
          </div>
          <div>
            <button
              onClick={scrollToPricing}
              data-hover
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-spark/60 hover:text-spark"
            >
              View full pricing
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted">{retailFlow.note}</p>
      </Reveal>
    </section>
  );
}
