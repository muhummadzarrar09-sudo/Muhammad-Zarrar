const ITEMS = [
  "Kotlin",
  "Video Engines",
  "Voice AI",
  "Next.js",
  "Supabase",
  "Cloudflare",
  "TypeScript",
  "FastAPI",
  "Android",
  "Motion Design",
];

/**
 * Skill marquee — the classic editorial flex strip.
 * CSS-driven (pauses on hover, freezes under reduced motion via the
 * global reduced-motion rule). Two copies for a seamless -50% loop.
 */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-surface/60 py-4">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {ITEMS.map((item) => (
              <span
                key={item}
                className="mr-10 flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-clay-deep/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
      {/* Edge fades — the strip dissolves into the paper */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
    </div>
  );
}
