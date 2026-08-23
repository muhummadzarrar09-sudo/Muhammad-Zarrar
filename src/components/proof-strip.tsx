import { CodeMark } from "./code-mark";

const PROOF_POINTS = [
  {
    label: "Builder, not a handoff",
    detail: "You speak to the person doing the work.",
  },
  {
    label: "A reply within 24 hours",
    detail: "A considered answer, not an auto-response.",
  },
  {
    label: "Zero trackers",
    detail: "No analytics following this conversation.",
  },
  {
    label: "Nothing stored",
    detail: "This page keeps none of your answers.",
  },
];

export function ProofStrip() {
  return (
    <section
      className="proof-strip proof-rail-section"
      id="after-hero"
      data-motion
      aria-labelledby="proof-rail-title"
    >
      <div className="container">
        <div className="proof-rail">
          <header className="proof-rail-head">
            <CodeMark className="proof-rail-mark" />
            <div>
              <p className="proof-rail-kicker">What happens next</p>
              <h2 id="proof-rail-title">A straight conversation.</h2>
            </div>
          </header>

          <ol className="proof-rail-list">
            {PROOF_POINTS.map((point, index) => (
              <li className="proof-rail-item" key={point.label}>
                <span className="proof-rail-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{point.label}</h3>
                  <p>{point.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
