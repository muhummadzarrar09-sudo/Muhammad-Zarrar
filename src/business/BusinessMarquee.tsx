import { bizMarquee } from "@/business/data";

/** Mirrors the portfolio Marquee — the "breath" strip between hero & content. */
export default function BizMarquee() {
  const row = [...bizMarquee, ...bizMarquee];
  return (
    <section aria-hidden className="relative flex overflow-hidden border-y border-line bg-surface/40 py-5">
      <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-light tracking-tight text-ink/80 sm:text-3xl">
              {m}
            </span>
            <span className="text-spark">✦</span>
          </span>
        ))}
      </div>
      <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-light tracking-tight text-ink/80 sm:text-3xl">
              {m}
            </span>
            <span className="text-spark">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
