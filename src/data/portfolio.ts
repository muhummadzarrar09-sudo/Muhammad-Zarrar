// =========================================================================
// PORTFOLIO DATA
// Clean, honest, no commit-ese. Dynamic GitHub data from build-time fetch.
// Projects refreshed from github.com/muhummadzarrar09-sudo (Aug 2026 pull):
// descriptions, stacks, stats and recency match the real repos.
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
    "Building products people actually use — from voice agents to mobile video engines.",
  /** Optional real-signature image (e.g. "/images/signature.png"). Empty = drawn signature. */
  signature: "",
};

export type Skill = { name: string; highlight?: string };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Client Product",
    blurb: "Full-stack apps with real auth, RLS, and deployment — not just UI demos.",
    skills: [
      { name: "Next.js / TypeScript", highlight: "Sasa+ client project" },
      { name: "Supabase / RLS" },
      { name: "Cloudflare" },
      { name: "Auth & security hardening" },
    ],
  },
  {
    group: "Mobile & Video",
    blurb: "Native Android with Kotlin — video engines, offline-first, crash visibility.",
    skills: [
      { name: "Kotlin / Android", highlight: "SwingFrame + GrindOS" },
      { name: "Flutter / Flame", highlight: "Broskie campaign" },
      { name: "Video engine / AI diagnostics" },
      { name: "Jetpack Compose / Gradle" },
    ],
  },
  {
    group: "Voice & AI",
    blurb: "Push-to-talk agents, browser automation, local inference — built for accessibility.",
    skills: [
      { name: "Python / FastAPI", highlight: "Omni voice agent" },
      { name: "Voice AI + PTT" },
      { name: "LoRA / QLoRA tooling", highlight: "Website-Auditor" },
      { name: "Browser automation" },
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
  /** Verified, checkable numbers — shown as stat chips. */
  stats?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    name: "Sasa+",
    tag: "Client Project",
    year: "2026",
    stack: ["Next.js", "Supabase", "Cloudflare"],
    blurb: "Client project — 30-day discipline challenge with streaks, circles, and proof.",
    description:
      "Built for a real client: Sasa+ gives Sasa Exclusive members a daily challenge app with a schedule of discipline blocks, visible streaks, accountability circles of 3–4, and proof that the work happened — no chat feed, no noise. Invite-only entry verified by purchase email, waitlist, auth, and timezone-aware day tracking.",
    outcome: "Delivered with daily schedules, visible streaks, accountability circles, and purchase-email verification — live at sasaplus.vercel.app.",
    focus: "Product engineering, access control, and a handoff a client can operate independently.",
    liveUrl: "https://www.sasaplus.vercel.app",
    accent: "#2D3A32",
    image: "/images/surreal-sasa.webp",
    stats: [
      { value: "30", label: "day challenge" },
      { value: "4–6", label: "blocks / day" },
      { value: "3–4", label: "circle size" },
    ],
    featured: true,
  },
  {
    name: "SwingFrame",
    tag: "Video AI",
    year: "2026",
    stack: ["Kotlin", "Jetpack Compose", "Media3", "ML Kit"],
    blurb: "Golf swing analysis — 100% on-device video engine with AI diagnostics.",
    description:
      "A free, on-device golf coach: frame-accurate scrubbable playback (Media3), joint tracking with ML Kit Pose Detection, ghost-mode swing comparison, and auto-capture that clips the swing automatically. No cloud, no subscriptions, no API costs.",
    outcome: "Shipped with on-device pose tracking, frame-scrub playback, and ghost-mode comparison — everything runs locally on the phone.",
    focus: "Native Android video handling, offline ML, and turning raw footage into useful feedback.",
    url: "https://github.com/muhummadzarrar09-sudo/SwingFrame",
    accent: "#7E9A7E",
    image: "/images/surreal-swingframe.webp",
    stats: [
      { value: "6", label: "frames — drag to scrub" },
      { value: "100%", label: "on-device" },
      { value: "0", label: "subscriptions" },
    ],
    featured: true,
  },
  {
    name: "Website-Auditor",
    tag: "AI Tooling",
    year: "2026",
    stack: ["Node.js CLI", "JavaScript", "LoRA / QLoRA", "Live Dashboard"],
    blurb: "Site-intelligence CLI — five-pillar audits with LoRA-tuned AI personas.",
    description:
      "An ultra-fast deep-audit engine that walks a site and scores five pillars — security, performance (TTFB & assets), SEO, accessibility, and modern best practices — then hands off to specialized LoRA/QLoRA personas (like an e-commerce CRO analyst) for the diagnosis. Cyberpunk terminal gauges in the CLI, plus a live web dashboard for the results.",
    outcome: "Production-ready CLI + dashboard: multi-pillar diagnostics with swappable AI personas, MIT licensed.",
    focus: "Making expensive agency-style audits a one-command, locally-run diagnostic.",
    url: "https://github.com/muhummadzarrar09-sudo/WEBSITE-AUDITOR",
    accent: "#00C8D7",
    image: "/images/surreal-auditor.webp",
    stats: [
      { value: "5", label: "audit pillars" },
      { value: "LoRA", label: "tuned personas" },
      { value: "1", label: "command, no agency" },
    ],
    featured: true,
  },
  {
    name: "Broskie",
    tag: "Game",
    year: "2026",
    stack: ["Flutter", "Flame", "Dart"],
    blurb: "Neon-soaked 2D platformer — a full campaign born from a blank 12 AM idea.",
    description:
      "A complete platformer campaign built with Flutter + Flame: break out of corporate orientation, cross the Factory and the Neon Slums, defeat The Foreman, and fight the Data Broker inside the Monopoly Core. Four 3,000–4,600px stages with real level design — momentum movement, directional dash, coyote time, jump buffering, multi-touch controls, saved unlocks and best ranks. No placeholder levels pretending to be complete.",
    outcome: "Shipped a real campaign — 4 stages, 2 boss fights, saved progression, and an actual ending.",
    focus: "Game feel: momentum, coyote time, and camera work that makes a touch platformer playable.",
    url: "https://github.com/muhummadzarrar09-sudo/Broskie",
    accent: "#FF4D1C",
    image: "/images/surreal-broskie.webp",
    stats: [
      { value: "4", label: "full stages" },
      { value: "2", label: "boss fights" },
      { value: "1", label: "real ending" },
    ],
    featured: true,
  },
  {
    name: "Omni",
    tag: "Voice Agent",
    year: "2026",
    stack: ["Python", "FastAPI", "llama.cpp", "Whisper"],
    blurb: "Local voice agent — push-to-talk, browser automation, 100+ tools, fully offline.",
    description:
      "A local AGI butler that thinks with a real 1.5B-parameter model (Qwen2.5 via llama.cpp), hears with Whisper, sees screenshots and PDFs, and acts with 100+ tools — browser, files, code, calendar. FastAPI backend (65+ endpoints) + Next.js UI. No cloud, no API keys, MIT licensed. 2.3M+ lines of Python powering a voice-first accessibility tool.",
    outcome: "14 test suites, 140+ tests passing, 65+ API endpoints, 100+ tools — everything runs offline on your machine.",
    focus: "Voice-first accessibility, local inference, and browser actions that can be controlled conversationally.",
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#A85A41",
    image: "/images/surreal-omni.webp",
    stats: [
      { value: "140+", label: "tests passing" },
      { value: "65+", label: "API endpoints" },
      { value: "100+", label: "tools" },
    ],
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
    stats: [
      { value: "367K+", label: "lines of Kotlin" },
      { value: "on-device", label: "crash mirror" },
    ],
  },
  {
    name: "GrindOS",
    tag: "Personal OS",
    year: "2026",
    stack: ["Kotlin", "Jetpack Compose"],
    blurb: "Personal command center — study sprints, prayer + Quran trackers, kanban, reminders.",
    description:
      "A native Android app built for one demanding user: me. FAST entrance prep with a topic tracker and sprint timer, five daily prayer + Quran page trackers with streaks, a hackathon kanban board, books and golf logs, and five notification personalities (Gentle, Hype, Roast, DeenFirst, ExamWar).",
    outcome: "The daily-driver app that keeps me locked in — every module used every day.",
    focus: "ADHD-friendly routine design: frictionless input, visible streaks, honest error logs.",
    url: "https://github.com/muhummadzarrar09-sudo/GrindOS",
    accent: "#3E5248",
    stats: [
      { value: "5", label: "notification modes" },
      { value: "1", label: "demanding user" },
    ],
  },
  {
    name: "Pixelfy",
    tag: "Android + AI",
    year: "2026",
    stack: ["Kotlin", "Compose", "ONNX"],
    blurb: "Local-first AI image enhancement — import, improve, compare, export. No cloud required.",
    description:
      "An Android image editor with one honest promise: import a photo, make it visibly better, compare before/after, export — Local Mode first, cloud/auth strictly opt-in. Phase-driven development with the roadmap and readiness audits public in the repo.",
    outcome: "A working local-mode core loop with public phase docs — no vaporware milestones.",
    focus: "On-device inference and a before/after loop that proves the improvement honestly.",
    url: "https://github.com/muhummadzarrar09-sudo/Pixelfy",
    accent: "#7A8E7E",
    stats: [
      { value: "100%", label: "local mode" },
      { value: "public", label: "phase docs" },
    ],
  },
  {
    name: "STREAK IT",
    tag: "Habit Tracker",
    year: "2026",
    stack: ["Flutter", "Dart", "Firebase"],
    blurb: "Offline-first habit tracker — don't break the chain, #FF4D1C on #000000.",
    description:
      "A privacy-first, offline-first habit tracker with a dark brutalist design that looks like nothing else in the category. One-command PowerShell build pipeline for dev + install.",
    outcome: "A habit tracker that works with zero network and zero accounts.",
    focus: "Offline-first data design and a visual identity that refuses category conventions.",
    url: "https://github.com/muhummadzarrar09-sudo/strike-it",
    accent: "#FF4D1C",
    stats: [
      { value: "0", label: "accounts needed" },
      { value: "#FF4D1C", label: "on #000000" },
    ],
  },
  {
    name: "forms",
    tag: "Forms Engine",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Prisma"],
    blurb: "Free Typeform alternative — embeddable, with audit trail and isolated test DB.",
    description:
      "Embeddable forms engine with full audit trail, isolated test database, and deployment runbook. Built as a cheap, self-hosted alternative to Typeform — and the most actively maintained thing I own (68 commits in the last month).",
    outcome: "Working forms engine with deploy docs and an audit trail.",
    focus: "Embeddable forms, data history, and an ownership-friendly alternative to subscription tooling.",
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#D88A6E",
    stats: [
      { value: "68", label: "commits / 30 days" },
      { value: "1MB+", label: "of TypeScript" },
    ],
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
  { label: "Email", handle: "Write a note", url: `mailto:${profile.email}` },
];
