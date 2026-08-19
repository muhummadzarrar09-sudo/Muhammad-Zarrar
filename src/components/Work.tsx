import { ArrowUpRight } from "lucide-react";
import { useCallback, useState } from "react";
import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Staple, Stamp, Tape } from "@/components/Brutalist";
import SwingFrameScrubber from "@/components/ui/SwingFrameScrubber";
import ProjectStory from "@/components/ui/ProjectStory";
import { cn } from "@/utils/cn";

/**
 * Work — the evidence list.
 *
 * The GSAP sticky scroll-film and its scroll-scrubbed parallax were removed
 * (owner's call — the scrubbed motion felt bad). What's left is a calm
 * editorial list: one alternating row per featured build, plain fade-up
 * reveals only, the SwingFrame scrubber as the one interactive demo, and
 * the case-study overlay intact.
 */

type Project = (typeof projects)[number];

function ProjectRow({
  project: p,
  index,
  onStory,
}: {
  project: Project;
  index: number;
  onStory: (p: Project) => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 border-t border-line py-14 first:border-t-0 sm:py-16 lg:grid-cols-2 lg:gap-14">
      {/* ——— Text ——— */}
      <div className={cn("relative", flip && "lg:order-2")}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[5rem] font-light italic leading-none text-ink/[0.06] sm:-top-14 sm:text-[8rem] lg:text-[10rem]"
        >
          {number}
        </span>

        <div className="relative flex flex-wrap items-center gap-3">
          <span className="font-caption text-[11px] uppercase tracking-[0.18em] text-muted">
            {p.tag}
          </span>
          <span className="h-px w-8 bg-line" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            {p.year}
          </span>
          <Stamp>{p.tag === "Client Project" ? "DELIVERED" : "SHIPPED"}</Stamp>
        </div>

        <h3 className="mt-5 font-display text-[clamp(2rem,6vw,4rem)] font-light leading-[0.98] tracking-tightest text-balance">
          {p.name}
        </h3>

        <p className="mt-3 text-[14px] font-medium leading-snug text-clay-deep sm:text-[15px]">
          {p.blurb}
        </p>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-soft text-pretty">
          {p.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[10px] text-muted"
            >
              {item}
            </span>
          ))}
        </div>

        {p.stats && (
          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
            {p.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-xl font-light tracking-tight text-ink sm:text-2xl">
                  {s.value}
                </div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-ink-soft">
          <ArrowUpRight size={12} strokeWidth={1.8} className="mt-0.5 shrink-0 text-clay-deep" />
          <span>{p.outcome}</span>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal btn-brutal-solid"
              aria-label={`Open the live ${p.name} project`}
            >
              Open live project
              <span aria-hidden="true" className="text-[0.95em]">↗</span>
            </a>
          )}
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal"
              aria-label={`Inspect ${p.name} source on GitHub`}
            >
              Inspect source
              <span aria-hidden="true" className="text-[0.95em]">↗</span>
            </a>
          )}
          <button type="button" onClick={() => onStory(p)} className="btn-brutal">
            Read the story
            <span aria-hidden="true" className="text-[0.95em]">↗</span>
          </button>
        </div>
      </div>

      {/* ——— Visual ——— */}
      <div className={cn(flip && "lg:order-1")}>
        <div className="relative mx-auto max-w-[560px] rotate-[-1.2deg]">
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-canvas-deep lift">
            <Staple />
            <Tape rotate={-8} className="left-6 top-4 z-10" />
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {p.name === "SwingFrame" ? (
                /* The video engine, demonstrated — drag to scrub the swing */
                <SwingFrameScrubber />
              ) : (
                <img
                  src={p.image}
                  alt={`${p.name} project preview`}
                  width={720}
                  height={540}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between border-t border-line bg-surface px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>
                {p.name} — {p.year}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                {p.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [story, setStory] = useState<Project | null>(null);
  const closeStory = useCallback(() => setStory(null), []);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      {/* ——— Header ——— */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="Nº003"
            label="Selected work"
            meta="Evidence, not adjectives"
            title={
              <>
                Built to be used —
                <br />
                <span className="italic text-clay-deep">not just looked at.</span>
              </>
            }
          />
          <Reveal delay={0.08} className="max-w-sm md:text-right">
            <p className="text-[14px] leading-relaxed text-ink-soft">
              Product systems, Android engines, AI tooling, and one full game —
              each taken from a blank repo to a working build.
            </p>
            <a
              href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 link-underline font-mono text-[12px] text-ink-soft"
            >
              Browse all 22 repos <ArrowUpRight size={13} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>
      </div>

      {/* ——— The evidence list ——— */}
      <div className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={0.04}>
            <ProjectRow project={p} index={i} onStory={setStory} />
          </Reveal>
        ))}
      </div>

      {/* ——— After the list ——— */}
      <div className="mx-auto mt-4 max-w-6xl px-5 sm:px-8">
        <Reveal delay={0.14}>
          <div className="rounded-2xl border border-dashed border-line bg-canvas-deep/50 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">
                Evidence over adjectives
              </div>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-soft">
                Source is public where it can be shared — the Sasa+ client build lives under a
                private repo. Live products are linked when they can be shared. I&apos;d rather show
                the work than pad the page with invented metrics or anonymous praise.
              </p>
            </div>
            <a
              href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-ink-soft link-underline sm:mt-0"
            >
              Inspect GitHub <ArrowUpRight size={12} strokeWidth={1.8} />
            </a>
          </div>
        </Reveal>

        {/* More experiments — the non-featured builds, kept honest */}
        {rest.length > 0 && (
          <Reveal delay={0.16} className="mt-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              More experiments
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-line-strong bg-surface p-6 transition-colors hover:border-clay-deep hover:bg-clay-wash/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-[10px] uppercase tracking-[0.18em] text-muted">
                      {p.tag}
                    </span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <h4 className="mt-3 font-display text-2xl font-light tracking-tightest">
                    {p.name}
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.blurb}</p>
                  {p.stats && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {p.stats.map((s) => (
                        <span key={s.label} className="font-mono text-[10px] text-ink-soft">
                          <span className="text-clay-deep">{s.value}</span>
                          <span className="text-faint"> · {s.label}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mb-0 mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9px] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* Case-study overlay */}
      <ProjectStory project={story} onClose={closeStory} />
    </section>
  );
}
