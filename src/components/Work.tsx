import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { Staple, Stamp, Tape } from "@/components/Brutalist";
import { getLenis } from "@/lib/scroll";
import { cn } from "@/utils/cn";

/**
 * Work — the scroll-film.
 * The showcase lives in a CSS position:sticky viewport inside a tall
 * container; GSAP ScrollTrigger scrubs a timeline across exactly one
 * viewport per project (image settles, text rises, ghost number
 * parallaxes), then the sticky viewport releases and the next section
 * scrolls in — overlap is impossible by construction.
 *
 * `prefers-reduced-motion` gets the same content as a calm stacked layout,
 * no sticky, no scrub.
 */

type Project = (typeof projects)[number];

function FilmPanel({
  project: p,
  index,
  staticMode,
  registerPanel,
}: {
  project: Project;
  index: number;
  staticMode?: boolean;
  registerPanel: (el: HTMLElement | null, index: number) => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={(el) => registerPanel(el, index)}
      className={cn(
        "flex",
        staticMode ? "relative min-h-[85svh] py-24" : "absolute inset-0 h-svh",
        !staticMode && index > 0 && "opacity-0"
      )}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* ——— Text ——— */}
        <div className="relative order-2 lg:order-1">
          <span
            aria-hidden
            className="film-ghost pointer-events-none absolute -top-14 -left-3 select-none font-display text-[6rem] font-light italic leading-none text-ink/[0.06] sm:-top-20 sm:text-[9rem] lg:-top-28 lg:-left-6 lg:text-[12rem]"
          >
            {number}
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-caption text-[11px] uppercase tracking-[0.18em] text-muted">
              {p.tag}
            </span>
            <span className="h-px w-8 bg-line" />
            <Stamp>{p.tag === "Client Project" ? "DELIVERED" : "SHIPPED"}</Stamp>
          </div>

          <h3 className="mt-5 font-display text-[clamp(2rem,6vw,4.2rem)] font-light leading-[0.98] tracking-tightest text-balance">
            {p.name}
          </h3>

          <p className="mt-3 text-[14px] font-medium leading-snug text-clay-deep sm:text-[15px]">
            {p.blurb}
          </p>
          <p className="mt-4 hidden max-w-xl text-[14px] leading-relaxed text-ink-soft text-pretty md:block">
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

          <div className="mt-5 hidden items-start gap-2 font-mono text-[11px] leading-relaxed text-ink-soft md:flex">
            <ArrowUpRight size={12} strokeWidth={1.8} className="mt-0.5 shrink-0 text-clay-deep" />
            <span>{p.outcome}</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-clay-deep"
                aria-label={`Open the live ${p.name} project`}
              >
                Open live project
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </a>
            )}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-clay-deep hover:bg-clay-wash"
              aria-label={`Inspect ${p.name} source on GitHub`}
            >
              Inspect source
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* ——— Visual ——— */}
        {p.image ? (
          <div className="order-1 lg:order-2">
            {/* Tilt lives on this wrapper — GSAP scales the inner frame and
                would otherwise clobber the CSS rotation with its transform */}
            <div className="relative rotate-[-1.2deg]">
              <div className="film-media relative overflow-hidden rounded-2xl border border-line-strong bg-canvas-deep lift">
                <Staple />
                <Tape rotate={-8} className="left-6 top-4 z-10" />
                <div className="relative aspect-[4/3] max-h-[34svh] w-full overflow-hidden sm:max-h-[44svh] lg:max-h-none">
                  <img
                    src={p.image}
                    alt={`${p.name} project preview`}
                    width={720}
                    height={540}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
                </div>
                <div className="hidden items-center justify-between border-t border-line bg-surface px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:flex">
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
        ) : (
          <div className="order-1 grid place-items-center lg:order-2">
            <div className="font-display text-[clamp(3rem,10vw,8rem)] font-light italic leading-none text-ink/[0.08]">
              {p.name}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const filmRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const registerPanel = (el: HTMLElement | null, index: number) => {
    panelRefs.current[index] = el;
  };

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    let ctx: { revert: () => void } | undefined;

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
        const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
        if (panels.length < 2) return;
        const count = panels.length;

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: filmRef.current,
            start: "top top",
            // Scrub distance: exactly one viewport per panel. The film
            // viewport itself is held in place by CSS position:sticky
            // (not GSAP pinning), so there is no pin-spacer, no fixed-
            // positioning edge cases, and it is physically impossible
            // for the next section to overlap the last panel.
            end: () => `+=${count * window.innerHeight}px`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (counterRef.current) {
                const n = Math.min(
                  count,
                  Math.floor(self.progress * count) + 1
                );
                counterRef.current.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });

        // Panel 0 is visible on arrival; every other panel waits off-stage.
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });
        panels.slice(1).forEach((p) => gsap.set(p, { autoAlpha: 0, y: 80 }));

        panels.forEach((p, i) => {
          const media = p.querySelector<HTMLElement>(".film-media");
          if (media) {
            tl.fromTo(
              media,
              { scale: 1.12 },
              { scale: 1, duration: 0.4, ease: "power2.out" },
              i
            );
          }
          const ghost = p.querySelector<HTMLElement>(".film-ghost");
          if (ghost) {
            tl.fromTo(
              ghost,
              { yPercent: 18 },
              { yPercent: -18, duration: 0.8, ease: "none" },
              i
            );
          }
          if (i === 0) {
            tl.to(p, { autoAlpha: 0, y: -80, duration: 0.2 }, 0.8);
            return;
          }
          tl.fromTo(
            p,
            { autoAlpha: 0, y: 80 },
            { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
            i
          );
          if (i < count - 1) {
            tl.to(p, { autoAlpha: 0, y: -80, duration: 0.2, ease: "power2.in" }, i + 0.8);
          } else {
            // Last panel — dissolve out just before the sticky release, so
            // the next section arrives over canvas, not as a hard cut.
            tl.to(p, { autoAlpha: 0, y: -40, duration: 0.2, ease: "power2.in" }, count - 0.2);
          }
        });

        // Progress line — fills across the whole film (duration = count,
        // so each panel gets exactly one viewport of scrubbed scroll)
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { transformOrigin: "top" });
          tl.fromTo(
            progressBarRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: count, ease: "none" },
            0
          );
        }

        // Counter + progress rail — dissolve with the last panel so the
        // release stretch is pure canvas.
        if (counterRef.current && progressBarRef.current) {
          tl.to(
            [counterRef.current, progressBarRef.current],
            { autoAlpha: 0, duration: 0.2, ease: "power2.in" },
            count - 0.2
          );
        }
      }, filmRef);

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const t = window.setTimeout(() => ScrollTrigger.refresh(), 800);

      dispose = () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(t);
        if (lenis) lenis.off("scroll", ScrollTrigger.update);
      };
    })();

    return () => {
      cancelled = true;
      dispose?.();
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      {/* ——— Header ——— */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
              A small selection of the product systems, Android tools, and AI
              experiments I&apos;ve taken from idea to a working build.
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
      </div>

      {/* ——— The scroll-film ———
          Sticky architecture: the outer container provides the scroll
          distance (count+1 viewports = count of scrub + 1 of natural
          release), the inner viewport is position:sticky top-0 so it
          rides the scroll, and the following section enters only as the
          sticky viewport scrolls away — overlap is impossible. */}
      <div
        ref={filmRef}
        className="relative"
        style={!reduced ? { height: `${(featured.length + 1) * 100}dvh` } : undefined}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            reduced ? "" : "sticky top-0 h-svh bg-canvas"
          )}
        >
          {featured.map((p, i) => (
            <FilmPanel
              key={p.name}
              project={p}
              index={i}
              staticMode={reduced}
              registerPanel={registerPanel}
            />
          ))}

          {/* Film progress — counter + fill line */}
          {!reduced && (
            <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:right-10">
              <span
                ref={counterRef}
                className="font-display text-3xl font-light italic text-clay-deep"
              >
                01
              </span>
              <span className="font-mono text-[10px] text-faint">
                / {String(featured.length).padStart(2, "0")}
              </span>
              <div className="h-24 w-px overflow-hidden bg-line">
                <div
                  ref={progressBarRef}
                  className="h-full w-full bg-clay-deep"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ——— After the film ——— */}
      <div className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <Reveal delay={0.14}>
          <div className="rounded-2xl border border-dashed border-line bg-canvas-deep/50 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay-deep">
                Evidence over adjectives
              </div>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-soft">
                Every featured build links to a public repository, and live
                products are linked where they can be shared. I&apos;d rather
                show the work than pad the page with invented metrics or
                anonymous praise.
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
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {rest.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-line-strong bg-surface p-6 transition-colors hover:border-clay-deep hover:bg-clay-wash/40"
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
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
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
    </section>
  );
}
