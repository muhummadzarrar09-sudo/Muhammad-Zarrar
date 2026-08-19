import { cn } from "@/utils/cn";

/**
 * TypeWall — the PX/PUSH-style type wall: full-bleed rows of one phrase
 * repeated in huge display type, rows scrolling in alternating directions,
 * solid and outlined rows alternating for depth. The bullet dot between
 * repeats carries the clay accent.
 *
 * Motion: each row's track is a `[data-vmarquee]` — a plain CSS loop at
 * baseline, taken over at runtime by the velocity engine (src/lib/marquee.ts)
 * so the whole wall speeds up, flips direction with the scroll, and the
 * rows ([data-vskew]) lean into the velocity. Reduced motion freezes it
 * with content intact.
 */

type WallRow = {
  text: string;
  outline?: boolean;
  reverse?: boolean;
  /** Seconds for one full loop. Defaults to 40. */
  speed?: number;
};

export default function TypeWall({
  rows,
  label,
  className,
}: {
  /** The phrase shown on every row, e.g. "Product engineer". */
  rows: WallRow[];
  /** Accessible summary of what the wall says (the wall itself is aria-hidden). */
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("type-wall relative select-none", className)}>
      {/* The repeated display text is decorative emphasis — hide it from
          screen readers and offer one clean sentence instead. */}
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="overflow-hidden border-y border-ink">
        {rows.map((row, i) => (
          <div
            key={i}
            data-vskew
            className={cn(
              "overflow-hidden border-b border-ink will-change-transform",
              i === rows.length - 1 && "border-b-0"
            )}
          >
            <div
              data-vmarquee=""
              data-speed={row.speed ?? 40}
              data-reverse={row.reverse ? "1" : undefined}
              className={cn(
                "wall-track flex w-max items-center py-1",
                row.reverse && "wall-reverse"
              )}
            >
              {[0, 1].map((copy) => (
                <span
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center whitespace-nowrap font-sans text-[clamp(2.4rem,7vw,6.25rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em]"
                >
                  {Array.from({ length: 6 }).map((_, j) => (
                    <span key={j} className="flex shrink-0 items-center">
                      <span className={row.outline ? "text-outline" : "text-ink"}>
                        {row.text}
                      </span>
                      <span className="mx-[0.35em] inline-block h-[0.16em] w-[0.16em] rounded-full bg-clay-deep" />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
