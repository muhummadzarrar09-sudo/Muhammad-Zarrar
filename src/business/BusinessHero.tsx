import { motion } from "framer-motion";
import { biz } from "@/business/data";
import { MagneticButton, RevealWords } from "@/components/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

function WaBadge({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.5-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5s0-.3 0-.4-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6 9.4c0 1.1.8 2.1.9 2.3s1.5 2.4 3.7 3.3a12 12 0 0 0 1.3.5 3 3 0 0 0 1.4.1c.4-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

/* A single product tile for the catalog grid */
function Product({ name, price, tint }: { name: string; price: string; tint: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-canvas">
      <div className="flex aspect-square items-center justify-center" style={{ background: tint }}>
        <span className="font-display text-sm font-light italic text-ink/35">{name.split(" ")[0]}</span>
      </div>
      <div className="px-1.5 py-1">
        <div className="truncate text-[10px] font-medium leading-tight text-ink">{name}</div>
        <div className="text-[9px] font-medium text-[#34785c]">{price}</div>
      </div>
    </div>
  );
}

/* The focal device: a phone running the RetailFlow storefront catalog */
function PhoneStorefront() {
  return (
    <div className="relative w-full max-w-[300px]">
      {/* phone frame */}
      <div className="relative rounded-[2.6rem] border border-ink/15 bg-ink p-2 shadow-2xl shadow-ink/30">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="overflow-hidden rounded-[2.1rem] bg-canvas">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1.5 text-[9px] font-medium text-ink">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-ink/70" />
              <span className="inline-block h-2 w-3 rounded-sm bg-ink/70" />
            </span>
          </div>
          {/* store header */}
          <div className="flex items-center justify-between px-4 pb-2.5 pt-1">
            <div>
              <div className="font-display text-sm font-medium leading-tight text-ink">Al-Madina</div>
              <div className="text-[8px] uppercase tracking-wider text-muted">Garments</div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1 text-[8px] text-muted">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" strokeLinecap="round" />
              </svg>
              Search
            </div>
          </div>
          {/* category pills */}
          <div className="flex gap-1.5 overflow-hidden px-4 pb-3">
            {["All", "Kurta", "Shalwar", "Accessories"].map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-2 py-0.5 text-[8px] ${i === 0 ? "bg-ink text-canvas" : "border border-line bg-surface text-muted"}`}
              >
                {c}
              </span>
            ))}
          </div>
          {/* product grid */}
          <div className="grid grid-cols-2 gap-2 px-4 pb-4">
            <Product name="Linen Kurta" price="Rs. 3,500" tint="linear-gradient(135deg,#ff4d1722,#1c5d4f14)" />
            <Product name="Black Kurta" price="Rs. 4,200" tint="linear-gradient(135deg,#17150f14,#ff4d1718)" />
            <Product name="Cotton Shalwar" price="Rs. 1,800" tint="linear-gradient(135deg,#ffb34722,#ff4d1710)" />
            <Product name="Embroidered Set" price="Rs. 6,500" tint="linear-gradient(135deg,#1c5d4f1f,#ffb34712)" />
          </div>
          {/* sticky order bar */}
          <div className="mx-4 mb-4 flex items-center justify-center gap-1.5 rounded-xl bg-circuit py-2 text-[10px] font-semibold text-canvas">
            <WaBadge className="h-3 w-3" /> Order on WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessHero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT — copy */}
        <motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-circuit" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Digital studio · {biz.location}</span>
          </motion.div>

          {/* Punchy two-line headline — short, scannable, one emphasis word */}
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[0.96] tracking-tightest text-balance">
            <RevealWords text="Bring your shop" delay={0.22} />
            <br />
            <RevealWords text="online & organized." className="italic text-spark" delay={0.42} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft text-pretty sm:text-lg"
          >
            We build websites, online catalogs, and booking systems for local businesses — so customers browse your products and order straight on WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton onClick={() => scrollTo("retailflow")} cursorLabel="Explore" className="bg-ink text-canvas hover:bg-spark">
              View RetailFlow <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href={biz.whatsappCta} variant="outline" cursorLabel="WhatsApp">
              <WaBadge /> Talk on WhatsApp
            </MagneticButton>
          </motion.div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
          >
            {biz.strip.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5">
                {s}
                {i < biz.strip.length - 1 && <span className="h-1 w-1 rounded-full bg-spark" />}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — single focal device + one accent (clean, focused) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE }}
          className="relative hidden justify-self-center lg:flex"
        >
          <div style={{ perspective: 1200 }}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "rotateY(-12deg) rotateX(4deg)" }}
            >
              {/* focal glow directly behind the device */}
              <div className="absolute -inset-8 -z-10 rounded-full bg-spark/20 blur-[80px]" />
              <PhoneStorefront />
            </motion.div>
          </div>

          {/* one accent — a WhatsApp order confirmation, floating */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
            className="absolute -right-4 top-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-44 rounded-2xl border border-line bg-surface/95 p-3 shadow-xl shadow-ink/15 backdrop-blur"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-circuit/15 text-circuit">
                  <WaBadge className="h-3.5 w-3.5" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold text-ink">New order</div>
                  <div className="text-[9px] text-muted">Black Kurta · M · Rs. 4,200</div>
                </div>
              </div>
              <div className="mt-2 rounded-md bg-circuit/10 px-2 py-1 text-center text-[9px] font-medium text-circuit">
                ✓ Confirmed on WhatsApp
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: show the device below the copy, centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
        className="mt-10 flex justify-center lg:hidden"
      >
        <PhoneStorefront />
      </motion.div>
    </section>
  );
}
