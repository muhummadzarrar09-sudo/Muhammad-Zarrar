// =========================================================================
// PORTFOLIO DATA
// Clean, honest, no commit-ese. Dynamic GitHub data from build-time fetch.
// =========================================================================

import githubData from "./github.json";

// Re-export dynamic GitHub stats for components
export const github = githubData;

export const profile = {
  name: "Muhammad Zarrar",
  initials: "MZ",
  handle: "muhummadzarrar09-sudo",
  role: "Independent Product Engineer",
  location: "Rawalpindi, PK · Remote-first",
  availability: "Open to 1–2 projects",
  avatar: "https://avatars.githubusercontent.com/u/266341933?v=4&s=512",
  github: "https://github.com/muhummadzarrar09-sudo",
  email: "muhummadzarrar09@gmail.com",
  emailSubject: "Hey Zarrar — project idea",
  bio: "Full-stack, AI & mobile engineer",
  tagline:
    "Building products people actually use — from voice AI to mobile video engines.",
};

export type Skill = { name: string; highlight?: string };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Client Product",
    blurb: "Full-stack apps with real auth, RLS, and deployment — not just UI demos.",
    skills: [
      { name: "Next.js / TypeScript", highlight: "LOCK-IN client project" },
      { name: "Supabase / RLS" },
      { name: "Cloudflare" },
      { name: "Auth & security hardening" },
    ],
  },
  {
    group: "Mobile & Video",
    blurb: "Native Android with Kotlin — video engines, offline-first, crash visibility.",
    skills: [
      { name: "Kotlin / Android", highlight: "Recto + SwingFrame" },
      { name: "Video engine / AI diagnostics" },
      { name: "Jetpack Compose / Gradle" },
      { name: "Offline-first architecture" },
    ],
  },
  {
    group: "Voice & AI",
    blurb: "Push-to-talk agents, browser automation, local inference — built for accessibility.",
    skills: [
      { name: "Python / FastAPI", highlight: "Omni voice agent" },
      { name: "Voice AI + PTT" },
      { name: "Browser automation" },
      { name: "GSAP / motion design" },
    ],
  },
];

export type Project = {
  name: string;
  tag: string;
  year: string;
  stack: string[];
  blurb: string;
  description: string;
  outcome: string;
  focus: string;
  url?: string;
  liveUrl?: string;
  accent: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "LOCK-IN",
    tag: "Client Project",
    year: "2026",
    stack: ["Next.js", "Supabase", "Cloudflare"],
    blurb: "Client project — deep work system with auth, RLS, and Cloudflare hardening.",
    description:
      "Built for a real client on Next.js + Supabase + Cloudflare. Auth deep-dive, data-leak hardening, RLS policies, and premium UX. TheStandard was the predecessor that evolved into this. Source lives in the client's private repo.",
    outcome: "Delivered with hardened auth, Supabase RLS policies, and Cloudflare deployment.",
    focus: "Product engineering, access control, and a handoff a client can operate independently.",
    liveUrl: "https://lock-in-red.vercel.app",
    accent: "#2D3A32",
    image: "/images/surreal-lockin.webp",
    featured: true,
  },
  {
    name: "SwingFrame",
    tag: "Video AI",
    year: "2026",
    stack: ["Kotlin", "Jetpack Compose", "ML Kit"],
    blurb: "Golf swing analysis — 100% on-device video engine with AI diagnostics.",
    description:
      "A free, on-device golf coach: frame-accurate scrubbable playback (Media3), joint tracking with ML Kit Pose Detection, ghost-mode swing comparison, and auto-capture that clips the swing automatically. No cloud, no subscriptions, no API costs.",
    outcome: "Shipped with on-device pose tracking, frame-scrub playback, and ghost-mode comparison — everything runs locally on the phone.",
    focus: "Native Android video handling, offline ML, and turning raw footage into useful feedback.",
    url: "https://github.com/muhummadzarrar09-sudo/SwingFrame",
    accent: "#7E9A7E",
    image: "/images/surreal-swingframe.webp",
    featured: true,
  },
  {
    name: "Recto",
    tag: "Kotlin Lab",
    year: "2026",
    stack: ["Kotlin", "Android"],
    blurb: "Experimental Android lab — crash visibility and offline-first experiments.",
    description:
      "Playground for making crashes actually visible: a CrashLogger that mirrors errors on-device (CrashViewActivity) so they surface where you can act on them instead of hiding in logcat. Offline-first architecture experiments.",
    outcome: "Crash-visibility and offline-first experiments that make on-device failures easier to act on.",
    focus: "Developer experience: surfacing errors where they are useful instead of burying them in logcat.",
    url: "https://github.com/muhummadzarrar09-sudo/Recto",
    accent: "#C46B4D",
    image: "/images/surreal-recto.webp",
    featured: true,
  },
  {
    name: "forms",
    tag: "Forms Engine",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Prisma"],
    blurb: "Free Typeform alternative — embeddable, with audit trail and isolated test DB.",
    description:
      "Embeddable forms engine with full audit trail, isolated test database, and deployment runbook. Built as a cheap, self-hosted alternative to Typeform.",
    outcome: "Working forms engine with deploy docs and an audit trail.",
    focus: "Embeddable forms, data history, and an ownership-friendly alternative to subscription tooling.",
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#D88A6E",
  },
  {
    name: "Omni",
    tag: "Voice Agent",
    year: "2026",
    stack: ["Python", "FastAPI", "Local LLM"],
    blurb: "Local voice agent — push-to-talk, browser automation, 100+ tools, fully offline.",
    description:
      "A local AGI butler that thinks with a real 1.5B-parameter model (Qwen2.5 via llama.cpp), hears with Whisper, sees screenshots and PDFs, and acts with 100+ tools — browser, files, code, calendar. FastAPI backend (65+ endpoints) + Next.js UI. No cloud, no API keys, MIT licensed.",
    outcome: "14 test suites, 140+ tests passing, 65+ API endpoints, 100+ tools — everything runs offline on your machine.",
    focus: "Voice-first accessibility, local inference, and browser actions that can be controlled conversationally.",
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#A85A41",
  },
  {
    name: "TheDesiEdit",
    tag: "Brand Landing",
    year: "2026",
    stack: ["Vite", "GSAP", "Lenis"],
    blurb: "Scroll-driven brand landing — GSAP pinned sections + smooth scroll.",
    description:
      "Premium motion landing for The Desi Edit brand. GSAP ScrollTrigger pinned sections, Lenis smooth scroll, multi-font system including Noto Nastaliq Urdu.",
    outcome: "Brand landing with scroll-led motion built from an existing brand kit.",
    focus: "Translating a brand system into a fast, deliberate, expressive web experience.",
    url: "https://github.com/muhummadzarrar09-sudo/TheDesiEdit",
    accent: "#B88D6A",
  },
];

export const process = [
  {
    no: "01",
    title: "Find the real problem",
    role: "Shared context",
    body: "We start with the workflow, the people using it, and the decision that makes the project worth doing — before choosing features or a stack.",
  },
  {
    no: "02",
    title: "Make it tangible early",
    role: "Working proof",
    body: "I turn the risky part into something you can react to early: a small flow, a technical spike, or a usable first slice — not a promise hidden in a deck.",
  },
  {
    no: "03",
    title: "Build for the handoff",
    role: "Calm execution",
    body: "The details that make a product dependable get attention: typed code, sensible boundaries, tests where they matter, and decisions someone else can follow.",
  },
  {
    no: "04",
    title: "Ship with a next move",
    role: "Useful momentum",
    body: "A release is a point to learn from. We leave with a working product, clear ownership, and a practical view of what deserves the next round of effort.",
  },
];

export const socials = [
  { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: profile.github },
  { label: "Email", handle: "muhummadzarrar09@gmail.com", url: `mailto:${profile.email}` },
];
