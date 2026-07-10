import { motion } from "framer-motion";
import { services, whyMe } from "@/business/data";
import { BizIcon } from "@/business/ui";
import { Reveal, SectionHeading } from "@/components/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BizServices() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        01
      </span>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="01"
          label="Services"
          title={
            <>
              What I can
              <br />
              <span className="italic text-spark">build for you.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Every service is engineered to move a real business metric — more leads, more bookings, less manual work.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:mt-20">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: i * 0.07, duration: 0.7, ease: EASE }}
            data-hover
            data-cursor-label="Service"
            className="biz-card biz-card-hover group relative flex flex-col gap-4 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-spark/10 text-spark">
                <BizIcon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{s.outcome}</p>
            <div className="mt-auto space-y-2 border-t border-line pt-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">For {s.for}</div>
              <div className="flex flex-wrap gap-1.5">
                {s.deliverables.map((d) => (
                  <span key={d} className="rounded-md border border-line px-2 py-0.5 text-[11px] text-ink-soft">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function BizWhyMe() {
  return (
    <section id="why" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        05
      </span>
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          index="05"
          label="Why me"
          title={
            <>
              Young. Sharp.
              <br />
              <span className="italic text-spark">Serious about shipping.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            I'm 18, full-stack, and fluent in modern AI and web tools. I build working systems — not just pretty pages.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {whyMe.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
            data-hover
            className="biz-card biz-card-hover rounded-2xl p-5"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-spark" />
              <h3 className="text-sm font-semibold text-ink">{w.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
