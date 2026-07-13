import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { biz } from "@/business/data";
import { MagneticButton } from "@/components/primitives";
import ShaderField from "@/components/ShaderField";

const EASE = [0.16, 1, 0.3, 1] as const;

function WaIcon({ c = "h-3.5 w-3.5" }: { c?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={c} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.5-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5s0-.3 0-.4-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6 9.4c0 1.1.8 2.1.9 2.3s1.5 2.4 3.7 3.3a12 12 0 0 0 1.3.5 3 3 0 0 0 1.4.1c.4-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function Phone() {
  return (
    <div className="relative w-[300px]">
      <div className="relative rounded-[2.6rem] border border-ink/15 bg-ink p-2 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="overflow-hidden rounded-[2.1rem] bg-canvas">
          <div className="flex items-center justify-between px-5 pt-3 pb-1.5 text-[9px] font-medium text-ink"><span>9:41</span><span className="flex gap-1"><span className="h-2 w-2 rounded-sm bg-ink/70" /><span className="h-2 w-3 rounded-sm bg-ink/70" /></span></div>
          <div className="flex items-center justify-between px-4 pb-2.5 pt-1"><div><div className="font-display text-sm font-medium">Al-Madina</div><div className="text-[8px] uppercase tracking-wider text-muted">Garments • Live catalog</div></div><div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1 text-[8px] text-muted">Search</div></div>
          <div className="grid grid-cols-2 gap-2 px-4 pb-4">
            {[["Linen Kurta","Rs. 3,500"],["Black Kurta","Rs. 4,200"],["Cotton Shalwar","Rs. 1,800"],["Set","Rs. 6,500"]].map(([n,p])=>(<div key={n} className="overflow-hidden rounded-lg border border-line bg-canvas"><div className="aspect-square grid place-items-center bg-gradient-to-br from-spark/10 to-circuit/10 font-display text-[11px] italic text-ink/30">{n.split(" ")[0]}</div><div className="px-1.5 py-1"><div className="text-[10px] font-medium truncate">{n}</div><div className="text-[9px] text-circuit font-medium">{p}</div></div></div>))}
          </div>
          <div className="mx-4 mb-4 flex items-center justify-center gap-1.5 rounded-xl bg-circuit py-2.5 text-[10px] font-semibold text-canvas"><WaIcon /> Order on WhatsApp</div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, className="", delay=0, mx, my }: { children: React.ReactNode; className?: string; delay?: number; mx?: any; my?: any }) {
  const x = useTransform(mx ?? 0, [-1,1], [-10,10]);
  const y = useTransform(my ?? 0, [-1,1], [-10,10]);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.8 }} style={{ x, y }} className={`absolute z-20 ${className}`}>
      <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-3.5 py-2 shadow-xl backdrop-blur-xl">
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function BusinessHero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const scale = useTransform(smooth, [0,1], [1,1.28]);
  const y = useTransform(smooth, [0,1], ["0%","18%"]);
  const opacity = useTransform(smooth, [0,0.7,1], [1,1,0]);
  const blur = useTransform(smooth, [0,1], ["blur(0px)","blur(24px)"]);

  useEffect(()=>{ const f=(e:MouseEvent)=>{ mx.set((e.clientX/window.innerWidth-0.5)*2); my.set((e.clientY/window.innerHeight-0.5)*2); }; window.addEventListener("mousemove", f); return ()=>window.removeEventListener("mousemove", f); },[mx,my]);

  const scrollTo = (id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <section ref={ref} className="relative h-[210vh]">
      <div className="sticky top-0 flex h-[100vh] items-center overflow-hidden">
        <motion.div style={{ scale, y, filter: blur, opacity }} className="absolute inset-0">
          <ShaderField />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,transparent_40%,rgba(23,21,15,0.06))]" />
        </motion.div>

        <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-volt opacity-70" /><span className="relative h-2 w-2 rounded-full bg-circuit" /></span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Studio • {biz.location} • immersive commerce</span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.8rem,7vw,5.4rem)] font-light leading-[0.88] tracking-tightest">
              <span className="block overflow-hidden"><motion.span initial={{ y:"110%" }} animate={{ y:"0%" }} transition={{ duration:0.9, ease:EASE, delay:0.18 }} className="block">Bring your shop</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y:"110%" }} animate={{ y:"0%" }} transition={{ duration:0.9, ease:EASE, delay:0.32 }} className="block italic text-spark">online & organized.</motion.span></span>
            </h1>

            <motion.p initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.58 }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Cinematic catalogs, WhatsApp ordering, stock signal. From noise (WhatsApp pics) to <span className="text-ink font-medium">clear system that captures inquiries.</span>
            </motion.p>

            <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.72 }} className="mt-8 flex flex-wrap gap-3">
              <MagneticButton onClick={()=>scrollTo("retailflow")} className="bg-ink text-canvas hover:bg-spark">View RetailFlow →</MagneticButton>
              <MagneticButton href={biz.whatsappCta} variant="outline"><WaIcon /> Talk on WhatsApp</MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }} className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wide text-muted">
              {biz.strip.map((s,i)=>(<span key={s} className="flex items-center gap-2">{s}{i<biz.strip.length-1 && <span className="h-1 w-1 rounded-full bg-spark" />}</span>))}
            </motion.div>

            <Chip className="left-0 top-[-18%] hidden xl:flex" delay={1.1} mx={mx} my={my}><span className="h-2 w-2 rounded-full bg-spark animate-pulse" /><span className="font-mono text-[10px] uppercase">Live catalog • Real time</span></Chip>
          </div>

          {/* RIGHT — phone SSS */}
          <motion.div initial={{ opacity:0, scale:0.92, rotateY:-10 }} animate={{ opacity:1, scale:1, rotateY:-12 }} transition={{ duration:1.2, ease:[0.83,0,0.17,1], delay:0.35 }} className="relative hidden lg:flex justify-center" style={{ perspective:1200 }}>
            <motion.div animate={{ y:[0,-14,0] }} transition={{ duration:7, repeat:Infinity, ease:"easeInOut" }} style={{ rotateX: useTransform(my, [-1,1], [6,-6]) as any }} className="relative">
              <div className="absolute -inset-10 -z-10 rounded-full bg-spark/20 blur-[80px]" />
              <Phone />
            </motion.div>

            <Chip className="-right-6 top-1/2 -translate-y-1/2" delay={1.3} mx={mx} my={my}>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-circuit/15 text-circuit"><WaIcon /></span>
              <div className="leading-tight"><div className="font-mono text-[10px] font-semibold">New order</div><div className="text-[9px] text-muted">Black Kurta • M • Rs. 4,200 ✓ WhatsApp</div></div>
            </Chip>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
