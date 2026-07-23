"use client";

/**
 * Cinematic projector vignette + light leak — ALWAYS ON.
 * Permanent heavy cinematic projector look for the full film experience.
 */
export function ProjectorVignette() {
  return (
    <>
      {/* Heavy but elegant permanent vignette — calm, luxurious */}
      <div 
        className="pointer-events-none fixed inset-0 z-[240]"
        style={{
          background: `radial-gradient(
            circle at 50% 45%,
            transparent 34%,
            rgba(0,0,0,0.59) 79%
          )`,
        }}
      />

      {/* Very subtle permanent projector warm glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-[235] mix-blend-screen"
        style={{
          background: `radial-gradient(
            circle at 48% 42%,
            rgba(255, 106, 61, 0.065) 0%,
            transparent 72%
          )`,
        }}
      />
    </>
  );
}
