import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicImage } from "@/components/CinematicImage";
import { CinematicChapter } from "@/components/CinematicChapter";
import { CinematicSculpture } from "@/components/CinematicSculpture";
import { ScrollReactiveSculpture } from "@/components/ScrollReactiveSculpture";
import { CinematicSpacer } from "@/components/CinematicSpacer";
import { cn } from "@/utils/cn";
import { sound } from "@/lib/sound";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useWhoosh() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const fired = useRef(false);
  useEffect(() => {
    if (inView && !fired.current) { fired.current = true; sound.whoosh(); }
  }, [inView]);
  return ref;
}

export default function Process() {
  const [active, setActive] = useState(0);
  const sectionRef = useWhoosh();
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;

    // Scroll-driven cinematic highlight on process cards
    const cards = el.querySelectorAll(".process-step");

    cards.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 72%",
          end: "bottom 28%",
          scrub: 1.4,
          onUpdate: (self) => {
            if (self.progress > 0.5 && active !== i) {
              setActive(i);
            }
          },
        },
      });
    });
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        04
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="04"
          label="Process"
          title={
            <>
              Like a studio —
              <br />
              <KineticText text="research, brand, build, repeat." mode="refined" className="italic text-spark" />
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Four phases. Every decision is deliberate. Every detail earns its place.
          </p>
        </Reveal>
      </div>

      {/* Opening cinematic chapter for Process */}
      <CinematicChapter 
        image="/images/cinematic-01.jpg"
        chapter="ACT I — THE APPROACH"
        title="We don’t start with code."
        body="We start with light, with silence, with the problem. Then we build the story."
        variant="slowZoom"
      />

      {/* Cinematic process opener — strong kinetic still */}
      <div className="mb-8 relative h-[320px] rounded-3xl overflow-hidden">
        <CinematicImage 
          src="/images/cinematic-04.jpg" 
          variant="parallax" 
          intensity={1.4}
          className="h-full w-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/75" />
        <div className="absolute inset-x-8 bottom-10">
          <div className="font-mono tracking-[3px] text-spark text-xs mb-3">THE METHOD</div>
          <KineticText 
            text="Research. Define. Design. Deploy." 
            mode="refined" 
            className="font-display text-[38px] leading-none text-canvas tracking-[-1.2px]" 
          />
        </div>
      </div>

      {/* FULL SHORT FILM — Process as a 4-act cinematic experience */}
      <CinematicChapter 
        image="/images/cinematic-02.jpg"
        chapter="ACT I — RESEARCH"
        title="We listen before we build."
        body="The first frame is always the problem. We sit with it until it tells us what it needs."
        variant="slowZoom"
      />

      <CinematicChapter 
        image="/images/cinematic-05.jpg"
        chapter="ACT II — DEFINE"
        title="We turn chaos into story."
        body="Every system needs a clear point of view. We write the script before we shoot the pixels."
        variant="parallax"
      />

      <CinematicChapter 
        image="/images/cinematic-03.jpg"
        chapter="ACT III — DESIGN & MOTION"
        title="Light and motion are the actors."
        body="This is where the film comes alive. Every transition, every shadow, every hover has intention."
        variant="slowZoom"
      />

      <CinematicChapter 
        image="/images/cinematic-06.jpg"
        chapter="ACT IV — DEPLOY"
        title="Then we ship with certainty."
        body="No loose ends. The final cut is clean, deliberate, and ready for the audience."
        variant="slowZoom"
      />

      {/* 3D sculpture as the final physical manifestation of the process */}
      <div className="mt-16">
        <CinematicSculpture />
      </div>

      {/* SCROLL-REACTIVE SCULPTURE — the process lives in the scroll (pure kinetic + cinematic) */}
      <div className="mt-12">
        <div className="text-center mb-5">
          <div className="font-mono text-xs tracking-[3px] text-spark">PROCESS IN MOTION</div>
        </div>
        <ScrollReactiveSculpture />
      </div>

      <CinematicSpacer height={130} />

      {/* Closing calm 3D moment */}
      <div className="mt-10">
        <MiniCinematicSculpture />
      </div>

      <div ref={stepsRef} className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
        {process.map((s, i) => (
          <motion.div
            key={s.no}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.07, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => { setActive(i); sound.pew(); }}
            data-hover
            data-cursor-label={active === i ? "Active" : "Hover"}
            className={cn(
              "process-step relative flex flex-col gap-5 bg-canvas p-7 transition-all duration-500 sm:p-8",
              active === i ? "bg-ink text-canvas scale-[1.005] shadow-2xl shadow-ink/40" : ""
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "font-display text-6xl font-light tracking-tighter transition-colors",
                  active === i ? "text-spark" : "text-ink/10"
                )}
              >
                {s.no}
              </span>
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-500",
                  active === i ? "scale-100 bg-spark" : "scale-50 bg-line"
                )}
              />
            </div>

            <div>
              <h3 className="font-display text-[26px] font-medium tracking-tight leading-none">
                <KineticText text={s.title} mode="stagger" scrollTrigger={false} />
              </h3>
              <div className={cn("mt-2.5 font-mono text-[11px] uppercase tracking-[0.18em]", active === i ? "text-spark-soft" : "text-spark")}>
                {s.role}
              </div>
            </div>

            <p className={cn("text-sm leading-relaxed", active === i ? "text-canvas/70" : "text-muted")}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-9 max-w-2xl text-sm leading-relaxed text-muted">
          Whether it’s an autonomous agent or a full product, the same belief holds: great software is part research, part branding, part layout and part motion — then the engineering to make it real.
        </p>
      </Reveal>

      {/* Cinematic closer for process */}
      <div className="mt-16 relative h-[220px] rounded-3xl overflow-hidden">
        <CinematicImage 
          src="/images/cinematic-06.jpg" 
          variant="reveal" 
          intensity={0.7}
          className="h-full w-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70" />
        <div className="absolute inset-0 flex items-center px-8">
          <div className="max-w-md text-canvas">
            <div className="font-mono text-xs tracking-widest text-spark mb-1">END OF PHASE</div>
            <div className="font-display text-3xl tracking-tight">Then we ship with certainty.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
