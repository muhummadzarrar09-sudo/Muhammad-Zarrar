import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, whyUs } from "@/business/data";
import { BizIcon } from "@/business/ui";
import { SectionHeading } from "@/components/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BizServices() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section id="services" ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading index="01" label="Services • Storyboard Act 02" title={<>What we<br /><span className="italic text-spark">build for you.</span></>} />
        <motion.p style={{ y }} className="max-w-sm text-base leading-relaxed text-ink-soft">
          Lean systems that solve visibility, inquiry, appointment, stock — no bloat. <span className="text-ink font-medium">Storyboard: problem → signal → system.</span>
        </motion.p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
            className="group relative overflow-hidden rounded-[1.4rem] border border-line bg-surface/70 p-6 backdrop-blur-xl hover:border-spark/30 hover:shadow-[0_20px_60px_-30px_rgba(23,21,15,0.2)] transition-all duration-500"
          >
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-spark/5 blur-2xl group-hover:bg-spark/10 transition" />
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-spark/10 text-spark"><BizIcon name={s.icon} className="h-5 w-5" /></span>
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-light tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.outcome}</p>
            <div className="mt-4 border-t border-line pt-3">
              <div className="font-mono text-[10px] uppercase tracking-wide text-muted">For {s.for}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.deliverables.map((d) => (
                  <span key={d} className="rounded-full border border-line px-2.5 py-1 text-[10px] text-ink-soft bg-canvas">{d}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Horizontal pinned storyboard for Why Us
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useEffect } from "react";

export function BizWhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".why-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.1,
          end: () => "+=" + (trackRef.current?.offsetWidth || 0),
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why" className="relative h-[100vh] overflow-hidden border-y border-line bg-canvas-deep/20">
      <div ref={trackRef} className="flex h-full w-[250vw]">
        <div className="why-panel flex h-full w-[100vw] shrink-0 items-center px-8 sm:px-16">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-spark">05 • Why us • Act 05</div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.9] tracking-tight">Built for how<br /><span className="italic text-spark">businesses really work.</span></h2>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">Cinematic storyboard, not template. Scroll → each reason pins.</p>
          </div>
        </div>
        {whyUs.map((w, i) => (
          <div key={w.title} className="why-panel flex h-full w-[50vw] shrink-0 items-center px-8">
            <div className="rounded-[1.6rem] border border-line bg-surface/80 p-8 backdrop-blur max-w-[420px]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-spark" />
                <span className="font-mono text-xs uppercase tracking-wide text-spark">0{i + 1}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-light">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{w.body}</p>
              <div className="mt-6 h-px w-12 bg-spark" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
