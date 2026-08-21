"use client";

import { useState } from "react";

type Row = {
  label: string;
  before: string;
  after: string;
  beforeW: number;
  afterW: number;
};

const ROWS: Row[] = [
  { label: "Requests on homepage", before: "73 files", after: "12 files", beforeW: 92, afterW: 18 },
  { label: "Load on Jazz 4G (real)", before: "10.4s", after: "1.9s", beforeW: 88, afterW: 22 },
  { label: "Google indexable content", before: "blank shell", after: "100% SSR", beforeW: 12, afterW: 100 },
  { label: "WhatsApp numbers on site", before: "3 numbers", after: "1 flow", beforeW: 78, afterW: 20 },
];

export function Teardown() {
  const [active, setActive] = useState(0);
  const row = ROWS[active];

  return (
    <div className="teardown">
      <div className="teardown-head">
        <h3>Real audit pattern — interactive teardown</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ROWS.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setActive(i)}
              className={`btn btn-sm ${active === i ? "btn-primary" : "btn-ghost"}`}
              style={{ minHeight: 32, fontSize: "0.68rem" }}
            >
              {r.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
      <div className="teardown-grid">
        <div className="teardown-col">
          <div className="teardown-k">Before — what we found</div>
          <div className="teardown-v bad">{row.before}</div>
          <div className="teardown-bar">
            <span style={{ width: `${row.beforeW}%` }} />
          </div>
          <p style={{ marginTop: 12, fontSize: "0.88rem", color: "var(--text-2)" }}>
            {active === 0 && "70+ JS/CSS files, unoptimized images, third-party widgets loading on every page."}
            {active === 1 && "On Pakistani 4G, most visitors left by second 4. Owner thought site was 'fast on my WiFi'."}
            {active === 2 && "Client-side rendering only — crawler saw <div id='root'></div>. Ranked nowhere."}
            {active === 3 && "Three different numbers in header, footer, contact page. Half the leads landed on an unchecked phone."}
          </p>
        </div>
        <div className="teardown-col">
          <div className="teardown-k">After — what we built</div>
          <div className="teardown-v good">{row.after}</div>
          <div className="teardown-bar good">
            <span style={{ width: `${row.afterW}%` }} />
          </div>
          <p style={{ marginTop: 12, fontSize: "0.88rem", color: "var(--text-2)" }}>
            {active === 0 && "12 requests: HTML, 2 fonts, 1 texture, 1 CSS, rest is content. No analytics, no pixels."}
            {active === 1 && "Under 2s on same connection. Same content, server-rendered, optimized, no bloat."}
            {active === 2 && "Next.js SSR + JSON-LD. Every page readable by Google on first crawl. No blank shell."}
            {active === 3 && "One wa.me deep link, pre-filled message, one number everywhere. Conversion path: 1 tap."}
          </p>
        </div>
      </div>
    </div>
  );
}
