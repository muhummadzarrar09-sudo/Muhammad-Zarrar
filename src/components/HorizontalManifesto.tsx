import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { expertise } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".manifesto-panel");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          end: () => "+=" + (trackRef.current?.offsetWidth || 0),
          snap: 1 / (sections.length - 1),
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100vh] overflow-hidden border-y border-line bg-canvas-deep/30">
      <div ref={trackRef} className="flex h-full w-[300vw]">
        {/* INTRO */}
        <div className="manifesto-panel flex h-full w-[100vw] shrink-0 items-center px-8 sm:px-16">
          <div className="max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-spark">02 • Range • Manifesto</div>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,8vw,6.5rem)] font-light leading-[0.9] tracking-tight">
              Full-stack range,<br />
              <span className="italic text-spark">depth where it counts.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">Scroll horizontally — each panel is a discipline I move between to ship complete products. No slides, just signal.</p>
            <div className="mt-8 font-mono text-xs text-muted">→ scroll to dissect →</div>
          </div>
        </div>

        {expertise.map((g, i) => (
          <div key={g.group} className="manifesto-panel flex h-full w-[100vw] shrink-0 items-center px-8 sm:px-16">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-spark">0{i + 1} • {g.group}</div>
                <h3 className="mt-4 font-display text-4xl font-light tracking-tight">{g.group}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted max-w-[36ch]">{g.blurb}</p>
                <div className="mt-8 h-px w-24 bg-spark" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {g.skills.map((s) => (
                  <div key={s.name} className="rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur">
                    <div className="font-mono text-[11px] text-muted">{s.name}</div>
                    <div className="mt-2 font-display text-3xl font-light">{s.level}%</div>
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-canvas-deep">
                      <div className="h-full bg-spark" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
