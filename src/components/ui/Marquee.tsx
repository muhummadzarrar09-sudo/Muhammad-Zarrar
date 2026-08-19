/**
 * Ticker — the PX/PUSH-style system strip: a mono line of status copy
 * separated by long dashes, running edge to edge with no fades.
 * "v.26" leads like their "v.02"; "//" marks the live status like their
 * "//The department is open."
 *
 * CSS-driven (pauses on hover, freezes under reduced motion via the
 * global rule). Two copies for a seamless -50% loop.
 */

const ITEMS = [
  { text: "v.26", clay: true },
  { text: "Welcome to the workshop" },
  { text: "// Open for 1–2 projects" },
  { text: "Rawalpindi → remote-first" },
  { text: "Kotlin · TypeScript · Python" },
  { text: "No templates — built by hand" },
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-b border-ink py-3">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {ITEMS.map((item, i) => (
              <span
                key={i}
                className={`flex items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] ${
                  item.clay ? "font-semibold text-clay-deep" : "text-ink"
                }`}
              >
                <span className="px-5">{item.text}</span>
                {/* The long pxpush-style dash run between items */}
                <span aria-hidden="true" className="text-ink/40">
                  ------------------
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
