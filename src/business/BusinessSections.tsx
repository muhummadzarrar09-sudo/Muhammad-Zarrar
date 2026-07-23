import { motion } from "framer-motion";
import { services, whyUs, pricingPackages, addons } from "@/business/data";
import { BizIcon } from "@/business/ui";
import { Reveal, SectionHeading, MagneticButton } from "@/components/primitives";
import { useSectionWhoosh } from "@/business/useSectionWhoosh";
import { KineticText } from "@/components/KineticText";
import { biz } from "@/business/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

// ============================================================================
// Services — keep existing but add subtle kinetic titles
// ============================================================================
export function BizServices() {
  const ref = useSectionWhoosh();
  return (
    <section id="services" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        01
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="01"
          label="Services"
          title={
            <>
              What we
              <br />
              <KineticText text="build for you." mode="refined" className="italic text-spark" />
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Lean digital systems that solve practical business problems — product visibility, lead capture, appointment flow, and admin control.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <span key={d} className="rounded-md border border-line px-2 py-0.5 text-[11px] text-ink-soft">{d}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// PRICING — Cinematic / Editorial (more cinematic than the portfolio)
// ============================================================================
export function Pricing() {
  const ref = useSectionWhoosh();
  const cardsRef = useRef<HTMLDivElement>(null);

  const scrollToAddons = () => {
    document.getElementById("addons")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Cinematic scroll-driven cards
  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".pricing-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 92, opacity: 0.5, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            end: "bottom 30%",
            scrub: 2.1,
          },
        }
      );
    });
  }, []);

  return (
    <section id="pricing" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        02
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="02"
          label="Pricing"
          title={
            <>
              Clear packages.
              <br />
              <KineticText text="Built for real businesses." mode="refined" className="italic text-spark" />
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Professional. Practical. Transparent.
          </p>
        </Reveal>
      </div>

      <div ref={cardsRef} className="mt-14 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pricingPackages.map((pkg, i) => (
          <div
            key={pkg.id}
            className="pricing-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-spark/30"
            style={{ boxShadow: "0 1px 1px rgba(23,21,15,0.04), 0 12px 28px -16px rgba(23,21,15,0.2)" }}
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{pkg.name}</span>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-[2.45rem] font-light leading-none tracking-tightest text-ink">{pkg.price}</span>
              </div>
              {pkg.priceSecondary && (
                <div className="mt-0.5 font-mono text-xs tracking-wider text-muted">or {pkg.priceSecondary}</div>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pkg.description}</p>

            <div className="mt-4 rounded-xl border border-line/70 bg-canvas/60 px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Best for</div>
              <p className="mt-1 text-sm leading-snug text-ink">{pkg.bestFor}</p>
            </div>

            <div className="mt-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Includes</div>
              <ul className="space-y-1.5 text-sm">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-ink-soft">
                    <span className="mt-1 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-spark" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {pkg.delivery && (
              <div className="mt-4 text-xs text-muted border-t border-line pt-4">
                <span className="font-medium">Delivery:</span> {pkg.delivery}
              </div>
            )}

            <div className="mt-auto pt-5 space-y-1.5 border-t border-line text-xs text-muted">
              {pkg.notes.map((note, idx) => {
                if (note.toLowerCase().includes("add-ons cost extra")) {
                  return (
                    <a key={idx} href="#addons" onClick={(e) => { e.preventDefault(); scrollToAddons(); }} className="block hover:text-spark underline-offset-2 hover:underline transition-colors">
                      {note}
                    </a>
                  );
                }
                return <div key={idx}>{note}</div>;
              })}
            </div>

            <div className="mt-6">
              <MagneticButton href={biz.whatsappCta} cursorLabel="WhatsApp" className="w-full justify-center bg-ink text-canvas hover:bg-spark">
                Start on WhatsApp
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-muted">
          First local case-study builds may qualify for a discounted starter setup. Ask on WhatsApp.
        </p>
      </Reveal>

      {/* Cinematic CTA block */}
      <div className="mt-12 rounded-3xl border border-line bg-surface p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-light tracking-tight text-ink">Not sure which package fits?</h3>
            <p className="mt-2 max-w-md text-base text-ink-soft">
              Send your business name and what you want to build. We’ll suggest the right package and add-ons.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={biz.whatsappCta} className="bg-spark text-canvas hover:bg-canvas hover:text-ink">
              Talk on WhatsApp
            </MagneticButton>
            <button onClick={() => document.getElementById("addons")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-spark/60 hover:text-spark">
              View Add-ons
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Add-ons — clean & elegant
// ============================================================================
export function Addons() {
  const ref = useSectionWhoosh();

  return (
    <section id="addons" ref={ref} className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 border-t border-line">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          index="03"
          label="Add-ons"
          title={
            <>
              Tailored
              <br />
              <span className="italic text-spark">to your business.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Every business is different. These can be added depending on scope, timeline, and complexity.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {addons.map((addon, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink-soft transition-colors hover:border-spark/30">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-spark" />
            <span>{addon}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2 text-sm text-muted">
        <p><strong className="text-ink">Add-ons are quoted separately</strong> depending on scope, timeline, and complexity.</p>
        <p>SEO disclaimer: We do not guarantee rankings. SEO work improves structure, technical health, content clarity, and local relevance.</p>
      </div>
    </section>
  );
}

// ============================================================================
// Why Us (kept original but with light kinetic treatment)
// ============================================================================
export function BizWhyUs() {
  const ref = useSectionWhoosh();
  return (
    <section id="why" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        05
      </span>

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          index="05"
          label="Why Zarrar.Solutions"
          title={
            <>
              Built for how
              <br />
              <span className="italic text-spark">businesses really work.</span>
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            We don't build generic templates. We build practical systems that help you sell, organize, and respond faster.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((w, i) => (
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
