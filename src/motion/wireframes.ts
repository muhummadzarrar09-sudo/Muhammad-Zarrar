/**
 * Motion wireframes — the storyboard.
 *
 * The walk is wheel-tied. Every scene scrubs. Scroll back and it undoes.
 * Edit a scene here; don't hunt through JSX.
 *
 * page: "/"  home only
 * page: "*"  every route
 */

export type MotionVars = Record<string, string | number | boolean | null>;

export type WireframeTween = {
  target: string;
  from?: MotionVars;
  to?: MotionVars;
  at?: number | string;
  duration?: number;
  stagger?: number;
};

export type WireframeScene = {
  id: string;
  /** Human note — what the client should feel. */
  note: string;
  page: "/" | "*";
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string;
  pinOnMobile?: boolean;
  anticipatePin?: number;
  once?: boolean;
  stagger?: {
    target: string;
    from?: MotionVars;
    to?: MotionVars;
    each?: number;
  };
  tweens?: WireframeTween[];
};

/** Unused on the walk — scrub is ease none. Kept for any one-shot fallback. */
export const EASE = "none";

export const WIREFRAMES: WireframeScene[] = [
  /* hero-converge lives in ./hero.ts — type swooshes back,
     glass sign halves ride a path and lock into one. */
  {
    id: "recognize",
    note: "Tuesday rises with the wheel — each row a step, not a pop.",
    page: "/",
    trigger: "#you",
    start: "top 92%",
    end: "top 18%",
    scrub: 1.05,
    tweens: [
      {
        target: "#you .sec-title",
        from: { y: 40 },
        to: { y: 0, ease: "none" },
        duration: 0.55,
      },
      {
        target: "#you .lede",
        from: { y: 28 },
        to: { y: 0, ease: "none" },
        at: 0.08,
        duration: 0.5,
      },
    ],
    stagger: {
      target: "#you .index-row",
      from: { y: 32 },
      to: { y: 0 },
      each: 0.06,
    },
  },
  /* exhibit-pin + typewriter live in ./exhibit.ts — painting stays,
     card and letters are the wheel. */
  /* plaque hang lives in ./plaques.ts — three circular
     paintings drop from the nails, Design.md crop. */
  {
    id: "contrast",
    note: "Usual vs here — pairs dissolve in, left then right.",
    page: "/",
    trigger: "#different",
    start: "top 92%",
    end: "top 18%",
    scrub: 1.05,
    tweens: [
      {
        target: "#different .sec-title",
        from: { y: 36 },
        to: { y: 0, ease: "none" },
        duration: 0.5,
      },
    ],
    stagger: {
      target: "#different .contrast-row",
      from: { y: 28 },
      to: { y: 0 },
      each: 0.07,
    },
  },
  {
    id: "next-steps",
    note: "Three columns rise as the anxiety leaves.",
    page: "/",
    trigger: "#next",
    start: "top 92%",
    end: "top 18%",
    scrub: 1.05,
    tweens: [
      {
        target: "#next .sec-title",
        from: { y: 36 },
        to: { y: 0, ease: "none" },
        duration: 0.5,
      },
    ],
    stagger: {
      target: "#next .phase",
      from: { y: 32 },
      to: { y: 0 },
      each: 0.08,
    },
  },
  /* manifesto-write lives in ./manifesto.ts — letters start as the
     folio walks in. CSS sticky holds. No GSAP pin. */
  {
    id: "brief-last",
    note: "The last room dissolves in. Intro, then the card they fill.",
    page: "/",
    trigger: "#brief",
    start: "top 92%",
    end: "top 22%",
    scrub: 1.05,
    tweens: [
      {
        target: "#brief .qualify-intro",
        from: { y: 32 },
        to: { y: 0, ease: "none" },
        duration: 0.55,
      },
      {
        target: "#brief .qualify-card",
        from: { y: 40 },
        to: { y: 0, ease: "none" },
        at: 0.12,
        duration: 0.55,
      },
    ],
  },
  {
    id: "page-leave",
    note: "Inner pages: already in the title. The hero thins as the walk starts.",
    page: "*",
    trigger: ".page-hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.05,
    tweens: [
      {
        target: ".page-hero h1",
        from: { y: 0, opacity: 1 },
        to: { y: -24, opacity: 0.28, ease: "none" },
      },
      {
        target: ".page-hero .lede",
        from: { opacity: 1 },
        to: { opacity: 0.2, ease: "none" },
      },
    ],
  },
];
