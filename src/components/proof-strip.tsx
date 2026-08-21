export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="This site's own audit">
      <div className="container">
        <div className="proof-strip-inner">
          <div className="proof-metric">
            <div className="proof-metric-value">0</div>
            <div className="proof-metric-label">trackers, pixels, analytics — open Network tab</div>
          </div>
          <div className="proof-metric">
            <div className="proof-metric-value">47kb</div>
            <div className="proof-metric-label">JS total (self-hosted fonts, no CDN) — built to our own standard</div>
          </div>
          <div className="proof-metric">
            <div className="proof-metric-value">100%</div>
            <div className="proof-metric-label">server-rendered — Google sees everything, not a blank shell</div>
          </div>
          <div className="proof-metric">
            <div className="proof-metric-value">38/38</div>
            <div className="proof-metric-label">contrast pairs passing AA — checked by script, not eyeballed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
