/**
 * Editorial diagrams for Field Notes — data-driven inline SVG in the house
 * voice. Static ink (nothing moves, nothing needs a gate); every number
 * comes from the post it illustrates, and every caption says illustrative.
 * Decorative to assistive tech: the <Diagram> frame carries the summary.
 */

const WATERFALL_ROWS = [
  { label: "theme.css", start: 0, dur: 2.8, hot: false },
  { label: "builder-runtime.js", start: 0.4, dur: 9.1, hot: true },
  { label: "font cdn \u00d73", start: 1, dur: 2.5, hot: false },
  { label: "slider.js", start: 2, dur: 3, hot: false },
  { label: "chat-widget.js", start: 3, dur: 4, hot: false },
];

const PX_PER_SEC = 44;
const PLOT_X = 160;
const ROW_Y = 30;
const ROW_GAP = 36;
const BAR_H = 20;

export function WaterfallFigure() {
  return (
    <svg
      viewBox="0 0 640 244"
      aria-hidden="true"
      focusable="false"
    >
      {/* axis */}
      <line
        x1={PLOT_X}
        y1={210}
        x2={PLOT_X + 10 * PX_PER_SEC}
        y2={210}
        style={{ stroke: "var(--hairline-strong)" }}
        strokeWidth={1}
      />
      {[0, 2, 4, 6, 8, 10].map((s) => (
        <g key={s}>
          <line
            x1={PLOT_X + s * PX_PER_SEC}
            y1={210}
            x2={PLOT_X + s * PX_PER_SEC}
            y2={216}
            style={{ stroke: "var(--hairline-strong)" }}
            strokeWidth={1}
          />
          <text
            x={PLOT_X + s * PX_PER_SEC}
            y={230}
            textAnchor="middle"
            fontSize={10}
            style={{ fill: "var(--text-2)" }}
          >
            {s}s
          </text>
        </g>
      ))}
      {/* the four-second exit */}
      <line
        x1={PLOT_X + 4 * PX_PER_SEC}
        y1={24}
        x2={PLOT_X + 4 * PX_PER_SEC}
        y2={210}
        style={{ stroke: "var(--danger)" }}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text
        x={PLOT_X + 4 * PX_PER_SEC}
        y={14}
        textAnchor="middle"
        fontSize={10}
        style={{ fill: "var(--danger)" }}
      >
        visitors leave ~4s
      </text>
      {/* bars */}
      {WATERFALL_ROWS.map((row, i) => {
        const y = ROW_Y + i * ROW_GAP;
        const x = PLOT_X + row.start * PX_PER_SEC;
        const w = row.dur * PX_PER_SEC;
        return (
          <g key={row.label}>
            <text
              x={PLOT_X - 10}
              y={y + BAR_H / 2}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={11}
              style={{ fill: "var(--text)" }}
            >
              {row.label}
            </text>
            <rect
              x={x}
              y={y}
              width={w}
              height={BAR_H}
              rx={3}
              style={
                row.hot
                  ? { fill: "var(--gold)" }
                  : {
                      fill: "var(--gold)",
                      fillOpacity: 0.28,
                      stroke: "var(--hairline-strong)",
                      strokeWidth: 1,
                    }
              }
            />
            <text
              x={x + w + 6}
              y={y + BAR_H / 2}
              dominantBaseline="central"
              fontSize={10}
              style={{ fill: "var(--text-2)" }}
            >
              {row.dur.toFixed(1)}s
            </text>
          </g>
        );
      })}
      {/* first paint flag */}
      <text
        x={634}
        y={ROW_Y + 4 * ROW_GAP + BAR_H / 2}
        textAnchor="end"
        dominantBaseline="central"
        fontSize={10}
        style={{ fill: "var(--gold)" }}
      >
        paints ~10s
      </text>
    </svg>
  );
}

/**
 * Two audiences, one URL: what Google fetched (the shell) against what
 * visitors saw (the painted page). After the post's own test — view-source
 * it — so the left frame is literally titled view-source.
 */
export function RenderFigure() {
  const frame = (x: number, title: string) => (
    <g key={title}>
      <rect
        x={x}
        y={8}
        width={288}
        height={220}
        rx={8}
        style={{ fill: "var(--surface)", stroke: "var(--hairline-strong)" }}
        strokeWidth={1}
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={x + 20 + i * 14}
          cy={26}
          r={3}
          style={{ fill: "var(--hairline-strong)" }}
        />
      ))}
      <text
        x={x + 66}
        y={26}
        dominantBaseline="central"
        fontSize={10}
        style={{ fill: "var(--text-2)" }}
      >
        {title}
      </text>
      <line
        x1={x}
        y1={40}
        x2={x + 288}
        y2={40}
        style={{ stroke: "var(--hairline-strong)" }}
        strokeWidth={1}
      />
    </g>
  );

  return (
    <svg viewBox="0 0 640 280" aria-hidden="true" focusable="false">
      {frame(8, "view-source")}
      {frame(344, "viewport")}
      {/* the shell */}
      <text x={28} y={78} fontSize={12} style={{ fill: "var(--text-2)" }}>
        {"<div id=\"root\">"}
      </text>
      <text x={28} y={100} fontSize={12} style={{ fill: "var(--text-2)" }}>
        {"<!-- nothing here -->"}
      </text>
      <text x={28} y={122} fontSize={12} style={{ fill: "var(--text-2)" }}>
        {"</div>"}
      </text>
      <text
        x={152}
        y={188}
        textAnchor="middle"
        fontSize={30}
        style={{ fill: "var(--danger)" }}
      >
        0 words
      </text>
      {/* the painted page */}
      <rect
        x={360}
        y={56}
        width={256}
        height={44}
        rx={3}
        style={{ fill: "var(--gold)" }}
        fillOpacity={0.85}
      />
      {[
        { y: 112, w: 200 },
        { y: 128, w: 240 },
        { y: 144, w: 170 },
      ].map((line) => (
        <rect
          key={line.y}
          x={360}
          y={line.y}
          width={line.w}
          height={8}
          rx={2}
          style={{ fill: "var(--text)" }}
          fillOpacity={0.65}
        />
      ))}
      <rect
        x={360}
        y={164}
        width={120}
        height={48}
        rx={3}
        style={{ fill: "none", stroke: "var(--hairline-strong)" }}
        strokeWidth={1}
      />
      <line
        x1={360}
        y1={164}
        x2={480}
        y2={212}
        style={{ stroke: "var(--hairline-strong)" }}
        strokeWidth={1}
      />
      <line
        x1={480}
        y1={164}
        x2={360}
        y2={212}
        style={{ stroke: "var(--hairline-strong)" }}
        strokeWidth={1}
      />
      {/* versus */}
      <text
        x={320}
        y={118}
        textAnchor="middle"
        fontSize={13}
        style={{ fill: "var(--gold)" }}
      >
        vs
      </text>
      {/* captions */}
      <text
        x={152}
        y={252}
        textAnchor="middle"
        fontSize={11}
        style={{ fill: "var(--text-2)" }}
      >
        what Google fetched
      </text>
      <text
        x={488}
        y={252}
        textAnchor="middle"
        fontSize={11}
        style={{ fill: "var(--text-2)" }}
      >
        what visitors saw
      </text>
    </svg>
  );
}
