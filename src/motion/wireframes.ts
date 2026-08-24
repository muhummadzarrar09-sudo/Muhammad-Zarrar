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
  /* hero-converge lives in ./hero.ts — the promise dissolves, bare
     chevrons meet as </>, then the loading line hands off to Lenis. */
  {
    id: "proof-rail",
    note: "The code mark docks, the rail constructs, then four promises land.",
    page: "/",
    trigger: "#after-hero",
    start: "top 96%",
    end: "bottom 46%",
    scrub: 0.72,
    tweens: [
      {
        target: ".proof-rail-rule",
        from: { scaleX: 0 },
        to: { scaleX: 1 },
        duration: 0.3,
        stagger: 0.04,
      },
      {
        target: ".proof-rail-divider",
        from: { scaleY: 0 },
        to: { scaleY: 1 },
        at: 0.2,
        duration: 0.34,
        stagger: 0.06,
      },
      {
        target: ".proof-rail-mark",
        from: { x: 22, y: -12, scale: 1.55, opacity: 0 },
        to: { x: 0, y: 0, scale: 1, opacity: 1 },
        at: 0.12,
        duration: 0.32,
      },
      {
        target: ".proof-rail-kicker",
        from: { y: 8, opacity: 0 },
        to: { y: 0, opacity: 1 },
        at: 0.26,
        duration: 0.26,
      },
      {
        target: ".proof-rail-head h2",
        from: { y: 22, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        to: { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)" },
        at: 0.31,
        duration: 0.34,
      },
      {
        target: ".proof-rail-index",
        from: { y: 12, opacity: 0 },
        to: { y: 0, opacity: 1 },
        at: 0.36,
        duration: 0.3,
        stagger: 0.06,
      },
      {
        target: ".proof-rail-item h3",
        from: { y: 14, opacity: 0 },
        to: { y: 0, opacity: 1 },
        at: 0.42,
        duration: 0.32,
        stagger: 0.06,
      },
      {
        target: ".proof-rail-item p",
        from: { y: 12, opacity: 0 },
        to: { y: 0, opacity: 1 },
        at: 0.5,
        duration: 0.34,
        stagger: 0.06,
      },
    ],
  },
  /* Section 01 diagnostic scan lives in ./recognize.ts. */
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
        from: { y: 36, opacity: 0.18 },
        to: { y: 0, opacity: 1, ease: "none" },
        duration: 0.5,
      },
    ],
    stagger: {
      target: "#different .contrast-row",
      from: { y: 28, opacity: 0.16 },
      to: { y: 0, opacity: 1 },
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
        from: { y: 36, opacity: 0.18 },
        to: { y: 0, opacity: 1, ease: "none" },
        duration: 0.5,
      },
    ],
    stagger: {
      target: "#next .phase",
      from: { y: 32, opacity: 0.16 },
      to: { y: 0, opacity: 1 },
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
        from: { y: 40, opacity: 0.16 },
        to: { y: 0, opacity: 1, ease: "none" },
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
