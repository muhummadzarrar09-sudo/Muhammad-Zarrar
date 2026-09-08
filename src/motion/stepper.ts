import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Process stepper — React Bits Stepper, tailored to the walk.
 *
 * The phases stand in a single column beside a sticky rail. Rail state is
 * DERIVED from scroll progress (the recognize-room pattern): fill scaleY,
 * lit ticks and clayed past-numbers recompute in onUpdate, exact in both
 * directions. The rail is aria-hidden decoration — the steps themselves
 * are plain semantic content. Full-motion boot only; everyone else gets
 * the same steps with a quiet rail.
 */
export function playStepper() {
  const root = document.querySelector<HTMLElement>(".stepper");
  if (!root) return;
  const fill = root.querySelector<HTMLElement>(".stepper-fill");
  const ticks = Array.from(root.querySelectorAll<HTMLElement>(".stepper-tick"));
  const steps = Array.from(root.querySelectorAll<HTMLElement>(".stepper-step"));
  if (!ticks.length || !steps.length) return;

  ScrollTrigger.create({
    id: "stepper-rail",
    trigger: root,
    start: "top 68%",
    end: "bottom 58%",
    onUpdate: (self) => {
      const p = self.progress;
      if (fill) fill.style.transform = `scaleY(${p.toFixed(3)})`;
      const active = Math.min(steps.length - 1, Math.floor(p * steps.length));
      ticks.forEach((tick, i) => tick.classList.toggle("is-on", i <= active));
      steps.forEach((step, i) => step.classList.toggle("is-past", i < active));
    },
  });
}
