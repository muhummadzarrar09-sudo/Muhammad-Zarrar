/**
 * Velocity marquees — the pxpush trick.
 *
 * Every `[data-vmarquee]` track already loops via a plain CSS animation
 * (the no-JS / reduced-motion baseline). At runtime this module takes
 * over with GSAP: the same seamless -50% loop, but the playback speed
 * reacts to scroll velocity — fast scrolling speeds the wall up (up to
 * ~4.5×) and scrolling UP flips direction — then eases back to base
 * speed. `[data-vskew]` elements (the type-wall rows) also get the
 * classic skew-on-velocity lean.
 *
 * Reduced motion: the module never attaches, the CSS animation is frozen
 * by the global reduced-motion rule, content stays readable.
 */

export async function initVelocityMarquees(): Promise<() => void> {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const tracks = Array.from(
    document.querySelectorAll<HTMLElement>("[data-vmarquee]")
  );
  if (!tracks.length) return () => {};

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const cleanups: Array<() => void> = [];
  const items: Array<{ tween: gsap.core.Tween; base: number }> = [];

  tracks.forEach((track) => {
    const speed = parseFloat(track.dataset.speed || "40");
    const reverse = track.dataset.reverse === "1";

    // Take over from the CSS animation.
    const prevAnimation = track.style.animation;
    track.style.animation = "none";

    const tween = reverse
      ? gsap.fromTo(
          track,
          { xPercent: -50 },
          { xPercent: 0, ease: "none", duration: speed, repeat: -1 }
        )
      : gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: speed,
          repeat: -1,
        });
    items.push({ tween, base: reverse ? -1 : 1 });

    cleanups.push(() => {
      tween.kill();
      gsap.set(track, { clearProps: "xPercent" });
      track.style.animation = prevAnimation;
    });
  });

  // Skew-on-velocity — the type-wall rows lean into the scroll.
  const skewEls = Array.from(
    document.querySelectorAll<HTMLElement>("[data-vskew]")
  );
  const clampSkew = gsap.utils.clamp(-4.5, 4.5);

  let vel = 0;
  const st = ScrollTrigger.create({
    onUpdate: (self) => {
      vel = self.getVelocity();
    },
  });

  const tick = () => {
    const dir = vel >= 0 ? 1 : -1;
    const boost = Math.min(Math.abs(vel) / 600, 3.5);
    for (const { tween, base } of items) {
      const target = base * dir * (1 + boost);
      tween.timeScale(tween.timeScale() + (target - tween.timeScale()) * 0.075);
    }
    const skew = clampSkew(vel / 400);
    for (const el of skewEls) {
      const cur = parseFloat(el.dataset.curSkew || "0");
      const next = cur + (skew - cur) * 0.08;
      el.dataset.curSkew = String(next);
      el.style.transform = `skewX(${next}deg)`;
    }
    // decay toward idle
    vel *= 0.9;
    if (Math.abs(vel) < 0.5) vel = 0;
  };
  gsap.ticker.add(tick);

  cleanups.push(() => {
    gsap.ticker.remove(tick);
    st.kill();
  });

  return () => cleanups.forEach((fn) => fn());
}
