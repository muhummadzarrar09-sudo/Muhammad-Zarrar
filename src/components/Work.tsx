import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import { projects, profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Staple, Stamp } from "@/components/Brutalist";

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
              Built to be used —
              <br />
              <span className="italic text-clay-deep">not just looked at.</span>
            </>
          }
        />
        <Reveal delay={0.08} className="max-w-sm md:text-right">
          <p className="text-[14px] leading-relaxed text-ink-soft">
            A small selection of the product systems, Android tools, and AI experiments I&apos;ve taken from idea to a working build.
          </p>
          <a
            href="https://github.com/muhummadzarrar09-sudo?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 link-underline font-mono text-[12px] text-ink-soft"
          >
            Browse the full GitHub <ArrowUpRight size={13} strokeWidth={1.8} />
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="relative">
            <article className="notebook-page human-card group flex h-full flex-col overflow-hidden">
              {p.image && (
                <div className="relative aspect-video overflow-hidden bg-canvas-deep">
                  <img
                    src={p.image}
                    alt={`${p.name} project preview`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/10 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-surface/70 bg-ink/90 font-mono text-[10px] text-canvas backdrop-blur">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-surface/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur">
                      {p.year}
                    </span>
                  </div>
                </div>
              )}

              <div className="relative flex flex-1 flex-col p-7 sm:p-8">
                <Staple />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
                    <span className="font-caption text-[11px] uppercase tracking-[0.18em] text-muted">{p.tag}</span>
                  </div>
                  <Stamp>{p.tag === "Client Project" ? "DELIVERED" : "SHIPPED"}</Stamp>
                </div>

                <h3 className="mt-5 font-display text-[2rem] font-light leading-[1.05] tracking-tightest">{p.name}</h3>
                <p className="mt-2 text-[13px] font-medium leading-snug text-clay-deep">{p.blurb}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-soft text-pretty">{p.description}</p>

                <dl className="mt-6 space-y-3 border-y border-line py-5 text-[13px]">
                  <div className="grid grid-cols-[5rem_1fr] gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Focus</dt>
                    <dd className="leading-relaxed text-ink-soft">{p.focus}</dd>
                  </div>
                  <div className="grid grid-cols-[5rem_1fr] gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Shipped</dt>
                    <dd className="leading-relaxed text-ink-soft">{p.outcome}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.stack.map((item) => (
                    <span key={item} className="rounded-full border border-line bg-canvas-deep px-2.5 py-1 font-mono text-[10px] text-muted">
                      {item}
                    </span>
                  ))}
                </div>

                <div className={`mt-7 grid gap-2 ${p.liveUrl ? "sm:grid-cols-2" : ""}`}>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
                      aria-label={`Open the live ${p.name} project`}
                    >
                      Open live project
                      <ArrowUpRight size={15} strokeWidth={1.8} />
                    </a>
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-between rounded-xl border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-clay-deep hover:bg-clay-wash"
                    aria-label={`Inspect ${p.name} source on GitHub`}
                  >
                    Inspect source
                    <ArrowUpRight size={15} strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.14} className="mt-10">
        <div className="rounded-2xl border border-dashed border-line bg-canvas-deep/50 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">Evidence over adjectives</div>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-soft">
              Every featured build links to a public repository, and live products are linked where they can be shared. I&apos;d rather show the work than pad the page with invented metrics or anonymous praise.
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

      <Reveal delay={0.18} className="mt-5">
        <div className="grid gap-6 rounded-2xl border border-line-strong bg-surface p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8 notebook-page">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">
              <CheckCircle2 size={13} strokeWidth={1.8} />
              Working style
            </div>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              I&apos;m most useful when there&apos;s a real product problem to solve: an MVP to validate, a workflow to make less painful, or a technical edge case that needs careful engineering.
            </p>
          </div>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Project idea")}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
          >
            <Mail size={14} strokeWidth={1.8} />
            Talk about a project
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-12">
        <div className="mx-auto max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          — selected builds · source available where appropriate —
        </div>
      </Reveal>
    </section>
  );
}
