import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicImage } from "@/components/CinematicImage";
import { CinematicFilmStrip } from "@/components/CinematicFilmStrip";
import { CinematicChapter } from "@/components/CinematicChapter";
import { CinematicSculpture } from "@/components/CinematicSculpture";
import { MiniCinematicSculpture } from "@/components/MiniCinematicSculpture";
import { CinematicSystems } from "@/components/CinematicSystems";
import { CinematicLightStudy } from "@/components/CinematicLightStudy";
import { CinematicReelPlayer } from "@/components/CinematicReelPlayer";
import { ScrollReactiveSculpture } from "@/components/ScrollReactiveSculpture";
import { CinematicSpacer } from "@/components/CinematicSpacer";
import { useTilt3D } from "@/hooks/useTilt3D";
import { sound } from "@/lib/sound";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

/* Kinetic Featured Card — Awwwards level */
function FeaturedCard({ p, i }: { p: Project; i: number }) {
  const { ref, move, leave } = useTilt3D(12);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

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
  }, []);

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={p.url}
      target="_blank"
      rel="noreferrer"
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
      rel="noreferrer"
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
        <p className="mt-1 truncate text-sm text-muted">{p.blurb}</p>
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

function useSectionWhoosh() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const fired = useRef(false);
  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      sound.whoosh();
    }
  }, [inView]);
  return ref;
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
          <a href="https://github.com/muhummadzarrar09-sudo" target="_blank" rel="noreferrer" className="link-underline font-mono text-sm text-ink-soft">
            View all on GitHub ↗
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.name} p={p} i={i} />
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
        <CinematicFilmStrip />
      </div>

      <div className="flex justify-center mt-6">
        <CinematicReelPlayer targetId="film-strip" />
      </div>

      <CinematicSpacer height={200} />

      {/* SCROLL-REACTIVE CINEMATIC 3D — the ultimate kinetic + scroll experience */}
      <div className="my-14">
        <div className="text-center mb-5">
          <div className="font-mono text-xs tracking-[3px] text-spark">04 — MOTION WITH THE SCROLL</div>
        </div>
        <ScrollReactiveSculpture />
      </div>

      <CinematicSpacer height={160} />

      {/* Cinematic Light Study as a breathing room between film and rest */}
      <div className="my-20">
        <CinematicLightStudy />
      </div>

      {/* 3D cinematic sculpture moment — the physical heart */}
      <div className="my-12">
        <div className="text-center mb-6">
          <div className="font-mono text-xs tracking-[3px] text-spark">03 — FORM</div>
        </div>
        <CinematicSculpture />
      </div>

      <CinematicSpacer height={110} />

      {/* Second sculpture — different angle / moment */}
      <div className="my-10">
        <MiniCinematicSculpture />
      </div>

      <CinematicSpacer height={90} />

      {/* Systems sculpture */}
      <div className="mt-12">
        <CinematicSystems />
      </div>

      <CinematicSpacer height={100} />

      {/* Light study — pure cinematic light & form */}
      <div className="mt-14">
        <CinematicLightStudy />
      </div>

      <CinematicSpacer height={85} />

      {/* Final 3D systems moment */}
      <div className="mt-12">
        <CinematicSystems />
      </div>

      <div className="mt-14 border-t border-line">
        {rest.map((p, i) => (
          <Row key={p.name} p={p} i={i} />
        ))}
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
