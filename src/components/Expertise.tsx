import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { expertise } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/primitives";
import { KineticText } from "@/components/KineticText";
import { CinematicChapter } from "@/components/CinematicChapter";
import { MiniCinematicSculpture } from "@/components/MiniCinematicSculpture";
import { CinematicSpacer } from "@/components/CinematicSpacer";
import { sound } from "@/lib/sound";
import { gsap } from "gsap";

function useWhoosh() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const fired = useRef(false);
  useEffect(() => {
    if (inView && !fired.current) { fired.current = true; sound.whoosh(); }
  }, [inView]);
  return ref;
}

export default function Expertise() {
  const sectionRef = useWhoosh();

  return (
    <section id="expertise" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <span className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[14rem] font-light leading-none tracking-tightest text-ink/[0.025] sm:-left-8" aria-hidden>
        02
      </span>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          index="02"
          label="Expertise"
          title={
            <>
              <KineticText text="A full-stack range," mode="stagger" />
              <br />
              <KineticText text="depth where it counts." mode="refined" className="italic text-spark" />
            </>
          }
        />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            From the model layer to the last animation frame — the disciplines I move between to ship complete products.
          </p>
        </Reveal>
      </div>

      {/* Cinematic Expertise acts — film structure */}
      <CinematicChapter 
        image="/images/cinematic-05.jpg"
        chapter="ACT III — THE RANGE"
        title="Depth where it counts."
        body="We move between layers so the final product feels inevitable."
        variant="slowZoom"
      />

      {/* Subtle 3D precision moment */}
      <div className="my-8">
        <MiniCinematicSculpture />
      </div>

      <CinematicSpacer height={120} />

      <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {expertise.map((g, gi) => (
          <motion.div
            key={g.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: gi * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 bg-canvas p-7 sm:p-8 group"
            onMouseEnter={() => sound.pew()}
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-spark">0{gi + 1}</div>
              <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
                <KineticText text={g.group} mode="stagger" scrollTrigger={false} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.blurb}</p>
            </div>

            <div className="mt-auto flex flex-col gap-4">
              {g.skills.map((s, si) => (
                <div key={s.name} className="group/skill">
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm text-ink-soft">{s.name}</span>
                    <span className="font-mono text-[11px] text-muted">{s.level}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-canvas-deep">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-ink via-spark to-ember"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        delay: gi * 0.1 + si * 0.08 + 0.2,
                        duration: 1.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
