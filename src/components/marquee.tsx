const ITEMS = [
  "Website Audits",
  "Audit + Redesign",
  "RetailFlow",
  "BookingFlow",
  "Dashboards",
  "Installable PWAs",
  "Local SEO",
  "WhatsApp Systems",
];

/** Slow editorial marquee — pure CSS animation, static under reduced motion. */
export function Marquee() {
  const row = (
    <>
      {ITEMS.map((item) => (
        <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}>
          {item} <i aria-hidden="true">✦</i>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}
