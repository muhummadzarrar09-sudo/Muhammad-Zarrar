import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Staple, Stamp, Tape } from "@/components/Brutalist";
import SwingFrameScrubber from "@/components/ui/SwingFrameScrubber";
import ProjectStory from "@/components/ui/ProjectStory";
import { getLenis } from "@/lib/scroll";
import { cn } from "@/utils/cn";

/**
 * Work — the horizontal roll.
 *
 * Desktop (≥lg, motion allowed): the section pins via GSAP ScrollTrigger and
 * the three heavy builds ROLL horizontally as you scroll vertically — an
 * intro card, three full project panels (with inner parallax: the media and
 * the ghost number drift at their own rates via `containerAnimation`), and
 * an end cap. A progress rail + counter track position. Lenis feeds
 * ScrollTrigger for buttery scrubbing.
 *
 * Everything else (mobile, reduced motion) gets the same content as a calm
 * alternating list — no pinning, no scrub. The pile of remaining builds
 * stays behind the VIEW THE REST toggle either way.
 */

type Project = (typeof projects)[number];

const EASE = [0.25, 1, 0.5, 1] as const;

/* ------------------------------------------------------------------ */
/* Desktop roll panel                                                  */
/* ------------------------------------------------------------------ */

function RollPanel({
  project: p,
  index,
  registerPanel,
  onStory,
}: {
  project: Project;
  index: number;
  registerPanel: (el: HTMLElement | null, index: number) => void;
  onStory: (p: Project) => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={(el) => registerPanel(el, index)}
      className="roll-panel relative flex h-[74vh] w-[min(82vw,880px)] shrink-0 items-center"
    >
      <div className="relative grid w-full grid-cols-[0.9fr_1.1fr] items-center gap-10 xl:gap-14">
        {/* ——— Text ——— */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-caption text-[11px] uppercase tracking-[0.18em] text-muted">
              {p.tag}
            </span>
            <span className="h-px w-8 bg-line" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {p.year}
            </span>
            <Stamp>{p.tag === "Client Project" ? "DELIVERED" : "SHIPPED"}</Stamp>
          </div>

          <h3 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[0.98] tracking-tightest text-balance">
            {p.name}
          </h3>

          <p className="mt-3 text-[14px] font-medium leading-snug text-clay-deep">
            {p.blurb}
          </p>
          <p className="mt-3 line-clamp-3 max-w-md text-[13.5px] leading-relaxed text-ink-soft text-pretty">
            {p.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
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
            <div className="mt-5 grid max-w-md grid-cols-3 gap-3 border-y border-line py-3">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-lg font-light tracking-tight text-ink xl:text-xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2.5">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-solid btn-brutal-sm"
                aria-label={`Open the live ${p.name} project`}
              >
                Open live
                <span aria-hidden="true" className="text-[0.95em]">↗</span>
              </a>
            )}
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal btn-brutal-sm"
                aria-label={`Inspect ${p.name} source on GitHub`}
              >
                Source
                <span aria-hidden="true" className="text-[0.95em]">↗</span>
              </a>
            )}
            <button type="button" onClick={() => onStory(p)} className="btn-brutal btn-brutal-sm">
              Read the story
              <span aria-hidden="true" className="text-[0.95em]">↗</span>
            </button>
          </div>
        </div>

        {/* ——— Visual ——— */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="roll-ghost pointer-events-none absolute -top-16 -right-6 z-0 select-none font-display text-[9rem] font-light italic leading-none text-ink/[0.07] xl:text-[12rem]"
          >
            {number}
          </span>
          <div className="relative z-10 rotate-[-1.2deg]">
            <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-canvas-deep lift">
              <Staple />
              <Tape rotate={-8} className="left-6 top-4 z-10" />
              <div className="roll-clip relative aspect-[4/3] w-full overflow-hidden">
                <div className="roll-media absolute inset-[-8%]">
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
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical fallback row (mobile + reduced motion)                     */
/* ------------------------------------------------------------------ */

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

      <div className={cn(flip && "lg:order-1")}>
        <div className="relative mx-auto max-w-[560px] rotate-[-1.2deg]">
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-canvas-deep lift">
            <Staple />
            <Tape rotate={-8} className="left-6 top-4 z-10" />
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {p.name === "SwingFrame" ? (
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

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [story, setStory] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const closeStory = useCallback(() => setStory(null), []);

  const filmRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const registerPanel = (el: HTMLElement | null, index: number) => {
    panelRefs.current[index] = el;
  };

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    let ctx: { revert: () => void } | undefined;
    // Minimal structural type — keeps the dynamic import lazy.
    let mm: {
      add: (
        query: string,
        callback: () => (() => void) | void
      ) => void;
      revert: () => void;
    } | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = getLenis();
      if (lenis) lenis.on("scroll", ScrollTrigger.update);

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const track = trackRef.current;
          const film = filmRef.current;
          if (!track || !film) return;

          const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const roll = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: film,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.6}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const count = panels.length;
                if (counterRef.current) {
                  const n = Math.min(
                    count,
                    Math.max(1, Math.round(self.progress * (count - 1)) + 1)
                  );
                  counterRef.current.textContent = String(n).padStart(2, "0");
                }
                if (barRef.current) {
                  barRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          // Inner parallax — media drifts one way, ghost number the other,
          // each at its own rate relative to the roll itself.
          panels.forEach((p) => {
            const media = p.querySelector(".roll-media");
            if (media) {
              gsap.fromTo(
                media,
                { xPercent: -5 },
                {
                  xPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: p,
                    containerAnimation: roll,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            }
            const ghost = p.querySelector(".roll-ghost");
            if (ghost) {
              gsap.fromTo(
                ghost,
                { xPercent: 16 },
                {
                  xPercent: -16,
                  ease: "none",
                  scrollTrigger: {
                    trigger: p,
                    containerAnimation: roll,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            }
          });

          return () => {
            roll.scrollTrigger?.kill();
            roll.kill();
          };
        });
      }, filmRef);

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const t = window.setTimeout(() => ScrollTrigger.refresh(), 900);

      dispose = () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(t);
        if (lenis) lenis.off("scroll", ScrollTrigger.update);
      };
    })();

    return () => {
      cancelled = true;
      dispose?.();
      mm?.revert();
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      {/* ——— Header ——— */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="Nº003"
            label="Selected work"
            meta="Three heavy ones — rolled"
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
              Three main builds roll past — a delivered client product, an
              on-device video engine, and a local voice agent. Everything else
              waits below.
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

      {/* ——— The horizontal roll (desktop) ——— */}
      {!reduced && (
        <div ref={filmRef} className="relative mt-10 hidden lg:block">
          <div className="relative flex h-svh items-center overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max items-center gap-[7vw] px-[9vw] will-change-transform"
            >
              {/* Intro card */}
              <div className="flex w-[min(46vw,520px)] shrink-0 flex-col justify-center">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-clay-deep">
                  01–03 · The heavy ones
                </div>
                <h3 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.02] tracking-tightest">
                  Keep scrolling —<br />
                  <span className="italic text-clay-deep">the work rolls sideways.</span>
                </h3>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted">
                  Three builds, each taken from a blank repo to something
                  people use. The evidence rolls in from the right.
                </p>
                <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                  Roll
                  <span className="h-px w-14 bg-line-strong" />
                  →
                </div>
              </div>

              {featured.map((p, i) => (
                <RollPanel
                  key={p.name}
                  project={p}
                  index={i}
                  registerPanel={registerPanel}
                  onStory={setStory}
                />
              ))}

              {/* End cap */}
              <div className="flex w-[min(40vw,420px)] shrink-0 flex-col items-start justify-center">
                <div className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight tracking-tightest">
                  That&apos;s the heavy third.<br />
                  <span className="italic text-clay-deep">Eight more below.</span>
                </div>
                <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                  ↓ Continue
                  <span className="h-px w-14 bg-line-strong" />
                </div>
              </div>
            </div>

            {/* Roll HUD — counter + progress rail */}
            <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
              <span ref={counterRef} className="font-display text-2xl font-light italic text-clay-deep">
                01
              </span>
              <span className="font-mono text-[10px] text-faint">
                / {String(featured.length).padStart(2, "0")}
              </span>
              <div className="h-px w-28 overflow-hidden bg-line">
                <div ref={barRef} className="h-full w-full origin-left bg-clay-deep" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ——— Vertical fallback (mobile + reduced motion) ——— */}
      <div className={cn("mx-auto mt-16 max-w-6xl px-5 sm:px-8", !reduced && "lg:hidden")}>
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={0.04}>
            <ProjectRow project={p} index={i} onStory={setStory} />
          </Reveal>
        ))}
      </div>

      {/* ——— After the roll ——— */}
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

        {/* The rest — tucked behind one toggle, kept honest */}
        {rest.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                aria-expanded={showAll}
                className="btn-brutal"
              >
                {showAll
                  ? "Show less"
                  : `View the rest — ${rest.length} more builds`}
                <span aria-hidden="true" className="text-[0.95em]">
                  {showAll ? "↑" : "↓"}
                </span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {showAll && (
                <motion.div
                  key="rest"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    The rest — audit engines, games, labs, and trackers
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
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Case-study overlay */}
      <ProjectStory project={story} onClose={closeStory} />
    </section>
  );
}
