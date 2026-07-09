import { useCallback, useRef } from "react";

/**
 * 3D perspective tilt on mouse move — the single interaction that separates
 * "nice" from "premium agency". Returns event handlers to spread on a
 * container. Children receive:
 *   data-tilt-x  → rotation around Y axis  (−12…12)
 *   data-tilt-y  → rotation around X axis  (−12…12)
 *   data-tilt-gx → gradient glare X offset (0…100)
 *   data-tilt-gy → gradient glare Y offset (0…100)
 *
 * The glare is a radial-gradient highlight that follows the cursor, creating
 * the "glass reflection" effect seen on Linear, Vercel, and Apple product
 * pages. It's applied via CSS pseudo-element on the card.
 */
export function useTilt3D(intensity = 12) {
  const ref = useRef<HTMLElement>(null);

  const move = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width; // 0..1
      const y = (e.clientY - r.top) / r.height;
      const tiltX = (y - 0.5) * -intensity;
      const tiltY = (x - 0.5) * intensity;
      const gx = x * 100;
      const gy = y * 100;
      el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015,1.015,1.015)`;
      el.style.setProperty("--tilt-gx", `${gx}%`);
      el.style.setProperty("--tilt-gy", `${gy}%`);
    },
    [intensity],
  );

  const leave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.setProperty("--tilt-gx", "50%");
    el.style.setProperty("--tilt-gy", "50%");
  }, []);

  return { ref, move, leave };
}
