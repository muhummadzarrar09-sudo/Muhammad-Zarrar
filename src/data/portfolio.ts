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
  url: string;
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
      "Built for a real client on Next.js + Supabase + Cloudflare. Auth deep-dive, data-leak hardening, RLS policies, and premium UX. TheStandard was the predecessor that evolved into this.",
    outcome: "Delivered with hardened auth, Supabase RLS policies, and Cloudflare deployment.",
    focus: "Product engineering, access control, and a handoff a client can operate independently.",
    url: "https://github.com/muhummadzarrar09-sudo/LOCK-IN",
    liveUrl: "https://lock-in-red.vercel.app",
    accent: "#2D3A32",
    image: "/images/surreal-lockin.webp",
    featured: true,
  },
  {
    name: "SwingFrame",
    tag: "Video AI",
    year: "2026",
    stack: ["Kotlin", "Video Engine", "AI"],
    blurb: "Golf swing analysis — frame-accurate video engine with AI diagnostics.",
    description:
      "Mobile video AI for sports. Custom video engine with frame-accurate playback, AI-powered swing diagnostics, and a hand-drawn graffiti golfer as the launcher icon.",
    outcome: "Frame-accurate playback and AI swing-diagnostic flows built for a mobile-first experience.",
    focus: "Native Android video handling, interaction design, and turning raw footage into useful feedback.",
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
      "Playground for making crashes actually visible. Console mirroring so errors surface on-device instead of hiding in logcat. Offline-first architecture experiments.",
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
    stack: ["Python", "FastAPI", "Voice AI"],
    blurb: "Push-to-talk voice agent — drives the browser, runs local AI.",
    description:
      "Accessible voice agent with push-to-talk activation. Drives the browser as API, runs inference locally. Built with FastAPI backend and Next.js frontend. MIT licensed.",
    outcome: "Accessible push-to-talk voice agent with 14 test suites and 65+ API endpoints.",
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
