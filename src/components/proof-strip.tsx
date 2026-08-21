export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="This site's own audit">
      <div className="container">
        <div className="proof-strip-inner">
          <div className="proof-metric">
            <div className="proof-metric-value">0</div>
            <div className="proof-metric-label">trackers, pixels, analytics — verify in Network</div>
          </div>
          <div className="proof-metric">
            <div className="proof-metric-value">12 REQ</div>
            <div className="proof-metric-label">total — HTML + 2 fonts + 1 texture + CSS + content</div>
          </div>
          <div className="proof-metric">
            <div className="proof-metric-value">100% SSR</div>
            <div className="proof-metric-label">server-rendered — Google sees full HTML, not blank shell</div>
          </div>
          <div className="proof-metric">
            <div className="proof-metric-value">38/38 AA</div>
            <div className="proof-metric-label">contrast pairs passing — checked by script, not eyeballed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
