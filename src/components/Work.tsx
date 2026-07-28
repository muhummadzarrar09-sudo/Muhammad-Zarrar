import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicImage } from "@/components/CinematicImage";
import { CinematicChapter } from "@/components/CinematicChapter";
import { CinematicSpacer } from "@/components/CinematicSpacer";
import { CinematicLoadingFrame } from "@/components/LazyFallback";
import { useTilt3D } from "@/hooks/useTilt3D";
import { sound } from "@/lib/sound";
import { gsap } from "gsap";
import { initGsap } from "@/lib/gsap";
import { useSectionWhoosh } from "@/hooks/useSectionWhoosh";

const CinematicFilmStrip = lazy(() => import("@/components/CinematicFilmStrip"));
const CinematicReelPlayer = lazy(() => import("@/components/CinematicReelPlayer"));
const ScrollReactiveSculpture = lazy(() => import("@/components/ScrollReactiveSculpture"));
const CinematicLightStudy = lazy(() => import("@/components/CinematicLightStudy"));
const CinematicSculpture = lazy(() => import("@/components/CinematicSculpture"));
const MiniCinematicSculpture = lazy(() => import("@/components/MiniCinematicSculpture"));
const CinematicSystems = lazy(() => import("@/components/CinematicSystems"));

function LazyCinematic({ children, label, title }: { children: React.ReactNode; label: string; title: string }) {
  return <Suspense fallback={<CinematicLoadingFrame label={label} title={title} />}>{children}</Suspense>;
}

initGsap();

const EASE = [0.22, 1, 0.36, 1] as const;

/* Kinetic Featured Card — Awwwards level */
function FeaturedCard({ p, i }: { p: Project; i: number }) {
  const { ref, move, leave } = useTilt3D(12);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Scroll-scrub kinetic title inside the card
      const titleEl = el.querySelector(".kinetic-project-name");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { y: 30, opacity: 0.6 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "bottom 25%",
              scrub: 1.8,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="Open ↗"
      onMouseMove={move as unknown as React.MouseEventHandler}
      onMouseLeave={leave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay: i * 0.1, duration: 1.1, ease: EASE }}
      className="tilt-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface lift"
    >
      {/* visual area */}
      <div ref={cardRef} className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `radial-gradient(120% 120% at 20% 0%, ${p.accent}22, transparent 60%), radial-gradient(100% 100% at 100% 100%, ${p.accent}33, transparent 55%)`,
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-40" />

        <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-light leading-none tracking-tightest opacity-[0.05]" aria-hidden>
          0{i + 1}
        </span>

        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">{p.tag}</span>
        </div>
        <div className="absolute bottom-4 right-5 font-mono text-xs text-muted">{p.year}</div>

        {/* CERTAIN, CONTROLLED KINETIC PROJECT TITLE */}
        <div className="absolute bottom-4 left-5 font-display text-5xl font-light tracking-tightest text-ink sm:text-6xl overflow-hidden">
          <KineticText 
            text={p.name} 
            mode="refined" 
            className="kinetic-project-name" 
            scrollTrigger={false} 
          />
        </div>
      </div>

      {/* body */}
      <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
        <p className="text-base leading-relaxed text-ink-soft text-pretty">{p.description}</p>
        <div className="rounded-2xl border border-line/70 bg-canvas/60 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-spark">Outcome</div>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.outcome}</p>
        </div>
        <div className="grid gap-1.5 text-sm text-muted sm:grid-cols-2">
          {p.proof.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-spark" />
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* Row with subtle kinetic hover */
function Row({ p, i }: { p: Project; i: number }) {
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="Open ↗"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ delay: i * 0.05, duration: 0.7, ease: EASE }}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 transition-colors hover:bg-surface/60 sm:gap-8"
      onMouseEnter={() => sound.pew()}
    >
      <span className="font-mono text-xs text-muted">0{i + 3}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-spark sm:text-3xl">
            <KineticText text={p.name} mode="refined" scrollTrigger={false} className="inline-block" />
          </h3>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
        </div>
        <p className="mt-1 truncate text-sm text-muted" title={p.outcome}>{p.outcome}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-xs text-muted sm:block">{p.year}</span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-spark group-hover:bg-spark group-hover:text-canvas">
          <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
        </span>
      </div>
    </motion.a>
  );
}

function ProofSnapshot({ items }: { items: Project[] }) {
  const highlights = [
    { label: "Core focus", value: "AI agents + full-stack systems" },
    { label: "Proof style", value: "Public repos, real interfaces, working flows" },
    { label: "Delivery bias", value: "Typed, shippable, maintainable builds" },
  ];

  return (
    <div className="mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-spark">Proof snapshot</div>
          <h3 className="mt-3 font-display text-3xl font-light tracking-tightest text-ink sm:text-4xl">
            What the projects demonstrate.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">
          Not just visuals — each project shows a concrete engineering capability: orchestration, automation, typed UI systems, or production workflow design.
        </p>
      </div>

      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-2xl border border-line/70 bg-canvas/70 p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{item.label}</div>
            <div className="mt-2 text-sm font-medium leading-snug text-ink">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.flatMap((project) => project.proof.slice(0, 2).map((proof) => `${project.name}: ${proof}`)).slice(0, 6).map((proof) => (
          <div key={proof} className="flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-2 text-xs text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-spark" />
            {proof}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const sectionRef = useSectionWhoosh();

  return (
    <section id="work" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        03
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="03"
          label="Selected Work"
          title={
            <>
              Things I've
              <br />
              <KineticText text="built & shipped." mode="refined" className="italic text-spark" />
            </>
          }
        />
        <Reveal delay={0.1}>
          <a href="https://github.com/muhummadzarrar09-sudo" target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-sm text-ink-soft">
            View all on GitHub ↗
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.name} p={p} i={i} />
        ))}
      </div>

      <ProofSnapshot items={projects} />

      <div className="mt-14 border-t border-line">
        {rest.map((p, i) => (
          <Row key={p.name} p={p} i={i} />
        ))}
      </div>

      {/* MASSIVE CINEMATIC CHAPTER — the turning point */}
      <div className="my-20 relative h-[520px] rounded-3xl overflow-hidden">
        <CinematicImage 
          src="/images/cinematic-03.jpg" 
          variant="slowZoom" 
          intensity={1.15}
          className="h-full w-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/92" />
        
        <div className="absolute inset-0 flex items-end p-10 md:p-14">
          <div className="max-w-2xl">
            <div className="font-mono text-xs tracking-[4px] text-spark mb-3">02 — THE WORK</div>
            <KineticText 
              text="Systems that feel like cinema." 
              mode="refined" 
              className="font-display text-[52px] leading-[1.0] tracking-[-2.4px] text-canvas" 
            />
            <p className="mt-5 text-xl text-canvas/70 max-w-lg">
              Every project is a carefully directed story.
            </p>
          </div>
        </div>
      </div>

      {/* THE KINETIC CINEMATIC FILM STRIP — the emotional core of the entire portfolio */}
      <div id="film-strip">
        <LazyCinematic label="Loading film strip" title="A cinematic journey through craft."><CinematicFilmStrip /></LazyCinematic>
      </div>

      <div className="flex justify-center mt-6">
        <Suspense fallback={null}><CinematicReelPlayer targetId="film-strip" /></Suspense>
      </div>

      <CinematicSpacer height={200} />

      {/* SCROLL-REACTIVE CINEMATIC 3D — the ultimate kinetic + scroll experience */}
      <div className="my-14">
        <div className="text-center mb-5">
          <div className="font-mono text-xs tracking-[3px] text-spark">04 — MOTION WITH THE SCROLL</div>
        </div>
        <LazyCinematic label="Loading scroll sculpture" title="The form moves with you."><ScrollReactiveSculpture /></LazyCinematic>
      </div>

      <CinematicSpacer height={160} />

      {/* Cinematic Light Study as a breathing room between film and rest */}
      <div className="my-20">
        <LazyCinematic label="Loading light study" title="Light defines the frame."><CinematicLightStudy /></LazyCinematic>
      </div>

      {/* 3D cinematic sculpture moment — the physical heart */}
      <div className="my-12">
        <div className="text-center mb-6">
          <div className="font-mono text-xs tracking-[3px] text-spark">03 — FORM</div>
        </div>
        <LazyCinematic label="Loading sculpture" title="Form follows certainty."><CinematicSculpture /></LazyCinematic>
      </div>

      <CinematicSpacer height={110} />

      {/* Second sculpture — different angle / moment */}
      <div className="my-10">
        <LazyCinematic label="Loading sculpture" title="A quieter physical moment."><MiniCinematicSculpture /></LazyCinematic>
      </div>

      <CinematicSpacer height={90} />

      {/* Systems sculpture */}
      <div className="mt-12">
        <LazyCinematic label="Loading systems study" title="Systems become visible."><CinematicSystems /></LazyCinematic>
      </div>

      <CinematicSpacer height={100} />

      {/* Light study — pure cinematic light & form */}
      <div className="mt-14">
        <LazyCinematic label="Loading light study" title="Light defines the frame."><CinematicLightStudy /></LazyCinematic>
      </div>

      <CinematicSpacer height={85} />

      {/* Final 3D systems moment */}
      <div className="mt-12">
        <LazyCinematic label="Loading systems study" title="Systems become visible."><CinematicSystems /></LazyCinematic>
      </div>

      {/* Closing cinematic chapter */}
      <div className="mt-20">
        <CinematicChapter 
          image="/images/cinematic-07.jpg"
          chapter="FINAL FRAME"
          title="Ship with certainty."
          body="Every project ends the same way: clean, deliberate, and ready for the world."
          variant="slowZoom"
        />
      </div>

      {/* Extra cinematic epilogue */}
      <CinematicChapter 
        image="/images/cinematic-01.jpg"
        chapter="EPILOGUE"
        title="The story continues with you."
        body="The best work is the one that becomes part of someone else’s film."
        variant="parallax"
      />

      {/* End credits */}
      <div className="mt-16">
        <PortfolioEndCredits />
      </div>
    </section>
  );
}

/* End Credits style closer - pure cinema */
export function PortfolioEndCredits() {
  return (
    <div className="relative mt-24 py-20 border-t border-line text-center">
      <div className="max-w-md mx-auto px-5">
        <div className="font-mono text-[10px] tracking-[4px] text-muted mb-4">— THE END —</div>
        <div className="font-display text-4xl tracking-[-1.5px] mb-3">Muhammad Zarrar</div>
        <div className="text-sm text-muted">Full-Stack Developer &amp; AI Systems Engineer</div>
        <div className="mt-8 text-xs text-muted/60 tracking-widest">DIRECTED WITH CERTAINTY • 2026</div>
      </div>
    </div>
  );
}
