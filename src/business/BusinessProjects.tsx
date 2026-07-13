import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { bizProjects } from "@/business/data";
import { SectionHeading } from "@/components/primitives";

function Card({ p, i, total }: { p: any; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <div ref={ref} className="sticky top-[16vh] pb-[8vh]" style={{ zIndex: i }}>
      <motion.div style={{ scale, y }} className="group">
        <a href={p.github} target="_blank" rel="noreferrer" className="block">
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-muted">
            <span className="text-spark">0{i + 1}</span><span className="h-px w-8 bg-line" /><span>{p.tag}</span><span className="ml-auto rounded-full px-2 py-0.5 text-[10px]" style={{ background: `${p.accent}20`, color: p.accent }}>{p.status}</span>
          </div>
          <div className="relative overflow-hidden rounded-[1.6rem] border border-line bg-surface aspect-[16/9.5] shadow-[0_24px_70px_-30px_rgba(23,21,15,0.25)]">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <div className="absolute inset-0" style={{ background: `radial-gradient(120% at 20% 0%, ${p.accent}22, transparent 60%), radial-gradient(100% at 100% 100%, ${p.accent}28, transparent 60%)` }} />
              <div className="absolute inset-0 dot-grid opacity-30" />
              <div className="absolute inset-0 grid place-items-center"><span className="font-display text-[8rem] font-light opacity-[0.03]">{p.name}</span></div>
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
              <h3 className="font-display text-4xl font-light text-canvas">{p.name}</h3>
              <p className="mt-2 text-sm text-canvas/70 max-w-[56ch]">{p.business}</p>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

export default function BusinessProjects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading index="04" label="Proof • Act 04 Sticky Stack" title={<>Systems we've<br /><span className="italic text-spark">designed & built.</span></>} />
      </div>
      <div className="mt-16">
        {bizProjects.slice(0, 4).map((p, i) => (
          <Card key={p.name} p={p} i={i} total={4} />
        ))}
      </div>
    </section>
  );
}
