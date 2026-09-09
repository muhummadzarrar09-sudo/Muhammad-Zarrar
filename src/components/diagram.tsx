import type { ReactNode } from "react";
import { ServiceMotif } from "./service-motif";

/**
 * Museum frame for every diagnostic figure: blueprint panel, viewfinder
 * ticks, mono plate label, honest caption. The art is always inline SVG —
 * sharp at any size, token-colored for day and night, printable.
 */
export function Diagram({
  label,
  caption,
  artLabel,
  children,
}: {
  label: string;
  caption: string;
  artLabel: string;
  children: ReactNode;
}) {
  return (
    <figure className="diagram" role="img" aria-label={artLabel}>
      <p className="diagram-label">{label}</p>
      <div className="diagram-panel">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type TagTone = "high" | "med" | "low" | "info" | "sample";

/** Severity + specimen tags. Tones ride the semantic tokens, both themes. */
export function DTag({ tone, children }: { tone: TagTone; children: ReactNode }) {
  return <span className={`dtag dtag-${tone}`}>{children}</span>;
}

const SERVICE_FIGURES: Record<
  string,
  { label: string; caption: string; art: string }
> = {
  "website-audit": {
    label: "Fig. A \u2014 Inspection",
    caption:
      "The audit in one sketch: source read, device tested, findings written.",
    art: "Magnifier over code lines with a confirming check.",
  },
  redesign: {
    label: "Fig. B \u2014 Rebuild",
    caption: "Same content, new bones \u2014 the stack restacked, then lit.",
    art: "Three stacked layers with a spark.",
  },
  retailflow: {
    label: "Fig. C \u2014 Storefront",
    caption: "Shelves, not DMs \u2014 the catalog drawn as a building.",
    art: "Storefront awning over stocked shelves.",
  },
  bookingflow: {
    label: "Fig. D \u2014 Calendar",
    caption: "Requests become appointments \u2014 checked and clocked.",
    art: "Calendar with a confirmed booking and clock.",
  },
  dashboards: {
    label: "Fig. E \u2014 Numbers",
    caption: "Bars first, then the line they were hiding.",
    art: "Bar chart with a rising trend line.",
  },
};

/**
 * Each service, exhibited: the hero motif reframed as a full museum plate
 * with an honest caption. The captions describe the drawing, never the
 * outcome — the page copy already makes every claim.
 */
export function ServiceFigure({ slug }: { slug: string }) {
  const meta = SERVICE_FIGURES[slug];
  if (!meta) return null;
  return (
    <Diagram label={meta.label} caption={meta.caption} artLabel={meta.art}>
      <ServiceMotif slug={slug} />
    </Diagram>
  );
}

const GRADE_ARC: Record<string, number> = {
  A: 1,
  B: 0.82,
  C: 0.64,
  D: 0.45,
  F: 0.28,
};

/**
 * Grade ring — the audit distilled to one letter. Static ink; the number
 * it reports always arrives as real text beside it.
 */
export function GradeRing({ grade, size = 64 }: { grade: string; size?: number }) {
  const frac = GRADE_ARC[grade] ?? 0.5;
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg
      className="grade-ring"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`Grade ${grade}`}
    >
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="var(--hairline-strong)"
        strokeWidth="4"
      />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${(c * frac).toFixed(1)} ${c.toFixed(1)}`}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="32" textAnchor="middle" dominantBaseline="central">
        {grade}
      </text>
    </svg>
  );
}
