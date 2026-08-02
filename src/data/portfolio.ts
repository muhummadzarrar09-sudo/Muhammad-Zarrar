// =========================================================================
// PORTFOLIO CONTENT — live synced Aug 2 2026 from github.com/muhummadzarrar09-sudo
// Real repos: Omni, LOCK-IN, SwingFrame, Recto, forms, bookings, etc.
// No outdated Luminar/JARVIS/Operator-OS filler — only what you actually ship.
// =========================================================================

export const profile = {
  name: "Muhammad Zarrar",
  initials: "MZ",
  handle: "muhummadzarrar09-sudo",
  role: "Full-Stack, AI & Mobile Engineer",
  location: "Rawalpindi, PK · Remote-first",
  availability: "Building in public — open to select product work",
  avatar: "https://avatars.githubusercontent.com/u/266341933?v=4&s=512",
  github: "https://github.com/muhummadzarrar09-sudo",
  email: "muhummadzarrar09@gmail.com",
  emailSubject: "Hey Zarrar — lets build something",
  emailBody: [
    "Hey Zarrar,",
    "",
    "Saw your GitHub (Omni / LOCK-IN / SwingFrame) and wanted to reach out:",
    "",
    "• Who I am: ",
    "• What I want to build: ",
    "• Why now: ",
    "",
  ].join("\n"),
  bio: "Compiling ....", // GitHub bio as of Aug 2 2026
  tagline:
    "Building voice agents, study OS, video AI and mobile apps — from push-to-talk browsers to golf swing diagnostics. Full-stack, Kotlin, Python, TypeScript.",
};

export const heroProof = [
  { label: "Now", value: "Omni voice agent, LOCK-IN study OS, SwingFrame golf AI" },
  { label: "Stack", value: "TypeScript, Kotlin, Python, Next.js, Supabase" },
  { label: "Style", value: "Ships fast, learns in public, useful first" },
];

export const stats = [
  { value: 21, suffix: "+", label: "Public repositories" },
  { value: 437, suffix: "", label: "Contributions last year" },
  { value: 4, suffix: "", label: "Pinned builds" },
  { value: 100, suffix: "%", label: "Hand-built, no templates" },
];

export const marquee = [
  "TypeScript",
  "Kotlin",
  "Python",
  "Next.js",
  "Supabase",
  "Voice AI",
  "Video Engine",
  "Product Engineering",
];

export type Skill = { name: string; level: number };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Product Engineering",
    blurb: "Next.js, Supabase, Prisma, real auth hardening — from blank repo to production.",
    skills: [
      { name: "TypeScript / Next.js", level: 92 },
      { name: "Supabase / Postgres", level: 88 },
      { name: "Node.js & APIs", level: 86 },
      { name: "System Design & Shipping", level: 88 },
    ],
  },
  {
    group: "Applied AI",
    blurb: "Voice push-to-talk, browser automation, video engine + AI diagnostics — not chat demos.",
    skills: [
      { name: "Voice (STT/TTS) + Push-to-Talk", level: 91 },
      { name: "Browser Automation", level: 87 },
      { name: "Video Engine / AI Diagnostics", level: 84 },
      { name: "LLM Orchestration + Local Inference", level: 86 },
    ],
  },
  {
    group: "Mobile & Craft",
    blurb: "Kotlin Android — Recto, SwingFrame, GrindOS, Pixelfy. Offline-first, console errors visible.",
    skills: [
      { name: "Kotlin / Android", level: 84 },
      { name: "Gradle / App Architecture", level: 80 },
      { name: "UI Engineering & Motion", level: 85 },
      { name: "Docs, Audits & Hardening", level: 82 },
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
  proof: string[];
  url: string;
  accent: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Omni",
    tag: "Voice Agent • Pinned",
    year: "2026",
    stack: ["Python", "Voice AI", "Browser Automation", "Local AI"],
    blurb: "Voice-controlled autonomous agent with Push-to-Talk, browser automation, local AI. Built for accessibility.",
    description:
      "OMNI — 36 commits, FastAPI backend + Next frontend, 14 test suites, 65+ endpoints. Push-to-talk activation, local model processing, browser as API. Docs: ARCHITECTURE.md, API.md, PERFORMANCE.md, TROUBLESHOOTING.md. AIM 7/10: It Remembers You.",
    outcome: "Accessible voice agent that drives the browser with <300ms focus on latency and memory (profiles + session digests).",
    proof: ["Push-to-Talk", "Local AI", "Browser automation", "Accessibility-first"],
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#C46B4D",
    featured: true,
  },
  {
    name: "LOCK-IN",
    tag: "Study/Life OS • Pinned • 121 commits",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Supabase", "Cloudflare"],
    blurb: "Next.js OS to stay LOCKED IN for studies and life — tasks, deep work, notes, progress.",
    description:
      "Made specifically for myself to stay locked in. App Router, Supabase, premium UX execution summary, auth deep-dive audit (RLS), data-leak hardening, Cloudflare. 8 branches, 121 commits as of Jul 30.",
    outcome: "Personal productivity OS with hardened auth, supabase isolation, and daily deep-work tracking.",
    proof: ["Next.js App Router", "Supabase RLS", "Premium UX", "Self-dogfooded"],
    url: "https://github.com/muhummadzarrar09-sudo/LOCK-IN",
    accent: "#2D3A32",
    featured: true,
  },
  {
    name: "SwingFrame",
    tag: "Video AI • Golf • 2 days ago",
    year: "2026",
    stack: ["Kotlin", "Android", "Video Engine", "AI Diagnostics"],
    blurb: "Golf swing video engine + AI diagnostics with custom graffiti golfer logo.",
    description:
      "Phase 1 & 2 shipped: core video engine, AI diagnostics, cold-boot splash screen, graffiti-style human golfer launcher icon. Kotlin Android, 4 branches, last update Jul 31 2026.",
    outcome: "Mobile video analysis for sports — frame-accurate engine + AI feedback.",
    proof: ["Video Engine", "AI Diagnostics", "Custom Logo System", "Launcher Icon"],
    url: "https://github.com/muhummadzarrar09-sudo/SwingFrame",
    accent: "#7E9A7E",
    featured: true,
  },
  {
    name: "Recto",
    tag: "Mobile Lab • 35 commits",
    year: "2026",
    stack: ["Kotlin", "Android", "Gradle"],
    blurb: "Experimental Android build — console errors side-by-side so crashes are visible.",
    description:
      "No description on GitHub yet. 35 commits, 2 branches, 1 tag. Commit msgs: 'FINE tuning and some Console error app side by side so if it crashes we now know why'. Active Jul 16 2026.",
    outcome: "Android lab for offline-first experiments and crash visibility tooling.",
    proof: ["35 commits", "Console mirroring", "Fine tuning", "Kotlin"],
    url: "https://github.com/muhummadzarrar09-sudo/Recto",
    accent: "#A07A5A",
  },
  {
    name: "forms",
    tag: "Product • Pinned • 86 commits",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Prisma", "Supabase"],
    blurb: "Typeform-like forms engine — embed anywhere, cheap alternative to Typeform.",
    description:
      "Full audit trail: handoff-audit.md, ui-ux-audit.md, revival-plan.md, TESTING.md with isolated test DB, DEPLOYMENT.md (Supabase/Vercel), batches/ remediation reports. 6 branches, last update Jul 30 2026.",
    outcome: "Embeddable forms with isolated e2e setup, audit logs, and real deployment runbook.",
    proof: ["Audit Trail", "Prisma + Supabase", "E2E Isolation", "Typeform UX"],
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#D88A6E",
  },
  {
    name: "bookings",
    tag: "Product • Pinned",
    year: "2026",
    stack: ["TypeScript", "Full-Stack", "Scheduling"],
    blurb: "Scheduling infra that doesn't drop the ball — availability, conflicts, notifications.",
    description:
      "The boring reliable stuff: availability logic, conflict handling, notification flow. Pinned on profile as of Aug 2026.",
    outcome: "Production-ready scheduling core built for real businesses.",
    proof: ["Availability", "Conflicts", "Notifications", "Pinned"],
    url: "https://github.com/muhummadzarrar09-sudo/bookings",
    accent: "#D7C9AF",
  },
  {
    name: "GrindOS",
    tag: "Kotlin • Personal",
    year: "2026",
    stack: ["Kotlin", "Android", "MIT"],
    blurb: "Specifically for myself to stay LOCKED IN — predecessor to LOCK-IN web.",
    description:
      "Sister project to LOCK-IN but native Android. MIT licensed, last update Jul 8 2026. Personal discipline OS.",
    outcome: "Mobile discipline tracker that became LOCK-IN web.",
    proof: ["Self-use", "Kotlin", "MIT", "Study focus"],
    url: "https://github.com/muhummadzarrar09-sudo/GrindOS",
    accent: "#6B7F76",
  },
];

export const process = [
  {
    no: "01",
    title: "Listen",
    role: "Problem first",
    body: "You show the mess — I ask dumb questions until the real constraint pops. No deck, just understanding.",
  },
  {
    no: "02",
    title: "Sketch",
    role: "Paper before code",
    body: "Flows on paper + rough clickable. If it doesn't make sense on paper, code won't save it.",
  },
  {
    no: "03",
    title: "Build slice",
    role: "Ship small",
    body: "Thin slice, typed, hardened. Omni got 14 test suites, LOCK-IN got auth audits. Ship then learn from use.",
  },
  {
    no: "04",
    title: "Refine + harden",
    role: "Make it stay",
    body: "Empty states, offline, RLS policies, perf logs, docs. The boring that makes it actually used.",
  },
];

export const socials = [
  { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: profile.github },
  { label: "Email", handle: "muhummadzarrar09@gmail.com", url: "mailto:muhummadzarrar09@gmail.com" },
];
