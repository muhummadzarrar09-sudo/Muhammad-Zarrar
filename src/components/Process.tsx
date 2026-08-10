import { CheckCircle2, Mail } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { process as processData, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";

const goodFit = [
  "You have a real workflow, customer problem, or product decision to improve.",
  "You want a thoughtful builder involved in the technical and product details.",
  "You value a useful first release over a long list of impressive features.",
];

export default function Process() {
  const gridRef = useRef<HTMLDivElement>(null);
  // Draws the connecting line across the four steps as the section scrolls.
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="process" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="04"
          label="Working together"
          title={
            <>
              Clear thinking.
              <br />
              <span className="italic text-clay-deep">Useful momentum.</span>
            </>
          }
        />
        <Reveal delay={0.08} className="max-w-sm">
          <p className="text-[14px] leading-relaxed text-muted">
            I keep engagements deliberately small, direct, and close to the actual product. You get working proof early—not a black box or a bloated agency process.
          </p>
        </Reveal>
      </div>

      <div ref={gridRef} className="relative mt-14">
        {/* Connector line — draws through the gaps between the step cards */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="absolute left-4 right-4 top-[2.6rem] hidden h-px origin-left bg-clay-deep/50 lg:block"
        />
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processData.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.06} className="relative z-10">
              <div className="human-card flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-5xl font-light tracking-tightest text-clay-deep/30">
                  {s.no}
                </span>
                <span className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">{s.role}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{s.body}</p>

              <div className="mt-auto border-t border-line pt-6 font-mono text-[10px] leading-relaxed text-faint">
                {i === 0 && "The goal is a better decision, not more meetings."}
                {i === 1 && "You should be able to react to something real."}
                {i === 2 && "The unglamorous parts are part of the job."}
                {i === 3 && "A launch should leave you with clarity, not dependency."}
              </div>
            </div>
          </Reveal>
        ))}
        </div>
      </div>

      <Reveal delay={0.16} className="mt-10">
        <div className="grid gap-8 rounded-2xl border border-line-strong bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_0.88fr] notebook-page">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">A good fit</div>
            <h3 className="mt-3 font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
              The best work starts with a problem that matters.
            </h3>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-soft">
              I&apos;m not the right fit for a vague feature factory. I&apos;m at my best when we can make a focused, meaningful piece of software genuinely easier to use.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-7 rounded-xl border border-line bg-canvas-deep/50 p-5">
            <ul className="space-y-4">
              {goodFit.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-clay-deep" size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Project context")}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
            >
              <Mail size={14} strokeWidth={1.8} />
              Send project context
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
