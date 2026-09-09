/**
 * Blueprint motifs — one honest diagram per service, drawn in hairline
 * clay strokes. Decorative (aria-hidden); the headings carry the meaning.
 * Diagrams, not decoration: each motif sketches what the service does.
 */
const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
} as const;

function AuditMotif() {
  return (
    <g {...STROKE}>
      <circle cx="52" cy="46" r="26" />
      <line x1="71" y1="65" x2="92" y2="86" strokeLinecap="round" />
      <line x1="38" y1="40" x2="60" y2="40" strokeLinecap="round" />
      <line x1="38" y1="48" x2="54" y2="48" strokeLinecap="round" />
      <line x1="38" y1="56" x2="63" y2="56" strokeLinecap="round" />
      <path d="M84 92l6 6 11-12" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function RedesignMotif() {
  return (
    <g {...STROKE}>
      <rect x="30" y="62" width="60" height="26" rx="2" />
      <rect x="30" y="44" width="60" height="26" rx="2" />
      <rect x="30" y="26" width="60" height="26" rx="2" />
      <path d="M92 22v14M85 29h14" strokeLinecap="round" />
      <circle cx="92" cy="76" r="2" fill="currentColor" stroke="none" />
    </g>
  );
}

function RetailMotif() {
  return (
    <g {...STROKE}>
      <path d="M28 38h64l-6-14H34l-6 14z" strokeLinejoin="round" />
      <line x1="30" y1="38" x2="30" y2="90" />
      <line x1="90" y1="38" x2="90" y2="90" />
      <line x1="30" y1="90" x2="90" y2="90" />
      <line x1="30" y1="58" x2="90" y2="58" />
      <line x1="30" y1="74" x2="90" y2="74" />
      <rect x="40" y="46" width="10" height="12" />
      <rect x="56" y="46" width="10" height="12" />
      <rect x="72" y="46" width="8" height="12" />
    </g>
  );
}

function BookingMotif() {
  return (
    <g {...STROKE}>
      <rect x="30" y="30" width="60" height="58" rx="3" />
      <line x1="30" y1="44" x2="90" y2="44" />
      <line x1="42" y1="24" x2="42" y2="34" strokeLinecap="round" />
      <line x1="78" y1="24" x2="78" y2="34" strokeLinecap="round" />
      <path d="M48 66l8 8 14-16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="76" cy="70" r="9" />
      <path d="M76 65v5l4 3" strokeLinecap="round" />
    </g>
  );
}

function DashboardsMotif() {
  return (
    <g {...STROKE}>
      <line x1="30" y1="88" x2="92" y2="88" strokeLinecap="round" />
      <rect x="34" y="62" width="10" height="26" />
      <rect x="50" y="50" width="10" height="38" />
      <path d="M34 52l16-12 12 8 22-18" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="84" cy="30" r="3" />
    </g>
  );
}

const MOTIFS: Record<string, () => React.JSX.Element> = {
  "website-audit": AuditMotif,
  redesign: RedesignMotif,
  retailflow: RetailMotif,
  bookingflow: BookingMotif,
  dashboards: DashboardsMotif,
};

export function ServiceMotif({ slug }: { slug: string }) {
  const Motif = MOTIFS[slug];
  if (!Motif) return null;
  return (
    <svg
      className="service-motif"
      viewBox="0 0 120 116"
      aria-hidden="true"
      focusable="false"
    >
      <Motif />
    </svg>
  );
}
