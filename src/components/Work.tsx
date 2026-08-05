import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Fold, Staple, Stamp } from "@/components/Brutalist";

export default function Work() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="03"
          label="Selected work"
          title={
            <>
              Working now —
              <br />
              <span className="italic text-clay-deep">featured builds.</span>
            </>
          }
        />
        <Reveal delay={0.08}>
          <a
            href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-[12px] text-ink-soft"
          >
            View all projects ↗
          </a>
        </Reveal>
      </div>

      {/* Featured projects — notebook cards with images */}
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="relative">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="notebook-page human-card group relative flex h-full flex-col overflow-hidden"
            >
              {/* Project image */}
              {p.image && (
                <div className="relative aspect-video overflow-hidden bg-canvas-deep">
                  <img
                    src={p.image}
                    alt={`${p.name} preview`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                </div>
              )}

              <div className="relative p-7 pt-5 sm:p-8 sm:pt-6 flex flex-col flex-1">
                <Staple />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
                    <span className="font-caption text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                  </div>
                  <Stamp>{p.tag === "Client Project" ? "CLIENT" : "WORKING"}</Stamp>
                </div>

                <h3 className="mt-4 font-display text-[1.9rem] font-light leading-[1.05] tracking-tightest">{p.name}</h3>
                <p className="mt-2 text-[13px] font-medium text-clay-deep leading-snug">{p.blurb}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft text-pretty">{p.description}</p>

                <div className="mt-4 rounded-xl border border-dashed border-line-strong bg-canvas-deep px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Outcome</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.outcome}</div>
                </div>

                {p.testimonial && (
                  <div className="mt-3 rounded-xl border border-clay/20 bg-clay-wash/30 px-4 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">Client handoff</div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft italic">&ldquo;{p.testimonial}&rdquo;</p>
                  </div>
                )}

                <div className="mt-auto pt-5 flex items-center gap-2 font-mono text-[12px] text-ink-soft">
                  <span className="h-px w-4 bg-line" />
                  <span>{p.stack.join(" · ")}</span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* More projects note */}
      <Reveal delay={0.12} className="mt-10">
        <div className="rounded-2xl border border-dashed border-line bg-canvas-deep/50 px-6 py-5">
          <div className="flex gap-3 text-[13px] leading-relaxed text-ink-soft">
            <span className="mt-2 h-px w-6 shrink-0 bg-clay/50" />
            <p className="max-w-3xl">
              More builds live on{" "}
              <a
                href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink font-medium link-underline"
              >
                GitHub
              </a>{" "}
              — including forms engine, Omni voice agent, TheDesiEdit brand landing, and others.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-12">
        <div className="mx-auto max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          — working builds only — p.03 —
        </div>
      </Reveal>

      <Fold label="end of work" />
    </section>
  );
}
