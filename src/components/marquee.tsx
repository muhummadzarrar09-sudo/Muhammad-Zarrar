const ITEMS = [
  "A diagnosis you can keep",
  "A number in writing",
  "One WhatsApp that converts",
  "You own the keys",
  "Reply in 24 hours",
  "No sequence, no chase",
  "The builder reads it",
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
