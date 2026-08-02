// =========================================================================
// PORTFOLIO CONTENT — ABSOLUTE LATEST BY COMMIT DATE, Aug 2 2026
// Ordered by Last Updated desc (not pinned). Live from github.com/muhummadzarrar09-sudo
// Recto Aug1, SwingFrame Aug1, forms Jul30, LOCK-IN Jul30 (CLIENT), TheStandard Jul23, retailflow Jul22, Omni Jul19, TheDesiEdit Jul16
// LOCK-IN is a CLIENT PROJECT — not personal OS successor
// =========================================================================

export const profile = {
  name: "Muhammad Zarrar",
  initials: "MZ",
  handle: "muhummadzarrar09-sudo",
  role: "Full-Stack, AI & Mobile Engineer",
  location: "Rawalpindi, PK · Remote-first",
  availability: "Shipping daily — latest commits Aug 1",
  avatar: "https://avatars.githubusercontent.com/u/266341933?v=4&s=512",
  github: "https://github.com/muhummadzarrar09-sudo",
  email: "muhummadzarrar09@gmail.com",
  emailSubject: "Hey Zarrar — saw your latest work",
  emailBody: [
    "Hey Zarrar,",
    "",
    "Saw Recto / SwingFrame / LOCK-IN — latest on GitHub:",
    "",
    "• Who I am: ",
    "• What I'm building: ",
  ].join("\n"),
  bio: "Compiling ....",
  tagline:
    "Latest: Recto (Kotlin Aug1), SwingFrame golf video AI (Aug1), forms engine (Jul30), LOCK-IN client project (Jul30), TheStandard enrollment (Jul23), retailflow storefront (Jul22), Omni voice agent (Jul19), TheDesiEdit scroll landing (Jul16).",
};

export const heroProof = [
  { label: "Latest — Aug 1", value: "Recto (Kotlin 35 commits) + SwingFrame (video engine + golf AI)" },
  { label: "Jul 30 — Client", value: "LOCK-IN client project (Next.js + Supabase 121 commits) + forms (86 commits)" },
  { label: "Stack Live", value: "Kotlin, TypeScript, Python, Next.js, Supabase, Video AI, Voice AI" },
];

export const stats = [
  { value: 21, suffix: "+", label: "Public repos (live)" },
  { value: 437, suffix: "", label: "Contributions last year" },
  { value: 8, suffix: "", label: "Latest shipped (Jul-Aug)" },
  { value: 100, suffix: "%", label: "Hand-built" },
];

export const marquee = [
  "Kotlin",
  "TypeScript",
  "Python",
  "Next.js",
  "Supabase",
  "Video Engine",
  "Voice AI",
  "Client Projects",
];

export type Skill = { name: string; level: number };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Product + Client",
    blurb: "LOCK-IN client project, TheStandard enrollment v2, forms engine handoff audits — real client shipping.",
    skills: [
      { name: "Next.js / TypeScript", level: 92 },
      { name: "Supabase / RLS / Auth", level: 88 },
      { name: "Client Handoff & Audits", level: 86 },
      { name: "Cloudflare / Deploy", level: 80 },
    ],
  },
  {
    group: "Mobile & Video AI",
    blurb: "Latest Aug1: Recto + SwingFrame — Kotlin, video engine, AI diagnostics for golf, console mirroring.",
    skills: [
      { name: "Kotlin / Android", level: 88 },
      { name: "Video Engine + AI Diagnostics", level: 86 },
      { name: "Gradle / Compose", level: 82 },
      { name: "Offline-first & Crash Visibility", level: 84 },
    ],
  },
  {
    group: "Voice & Storefronts",
    blurb: "Omni push-to-talk, retailflow catalog + WhatsApp ordering, TheDesiEdit GSAP/Lenis scroll landing.",
    skills: [
      { name: "Voice AI (STT/TTS) + PTT", level: 90 },
      { name: "Browser Automation", level: 86 },
      { name: "Retail Catalog + WhatsApp Flow", level: 83 },
      { name: "GSAP + Lenis Motion", level: 84 },
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
    name: "Recto",
    tag: "Latest Aug 1 • 35 commits • 2 branches",
    year: "2026",
    stack: ["Kotlin", "Android", "Gradle"],
    blurb: "Experimental Android — console errors side-by-side so crashes are visible. Last: Added some files sooo lets see where this leads.",
    description:
      "Latest commit Aug 1 2026: 35 commits total. Kotlin Android. Commit notes: 'FINE tuning and some Console error app side by side so if it crashes we now know why'. No description on GitHub yet — pure lab.",
    outcome: "Kotlin lab for offline-first + crash observability — shipped yesterday.",
    proof: ["Aug 1", "35 commits", "Console mirroring", "Fine tuning"],
    url: "https://github.com/muhummadzarrar09-sudo/Recto",
    accent: "#C46B4D",
    featured: true,
  },
  {
    name: "SwingFrame",
    tag: "Latest Aug 1 • Video AI • Golf",
    year: "2026",
    stack: ["Kotlin", "Video Engine", "AI Diagnostics", "Android"],
    blurb: "Golf swing video engine + AI diagnostics. Custom graffiti human golfer launcher icon + cold-boot splash.",
    description:
      "Latest Aug 1 2026 (2 days ago): feat: Phase 1 & 2 - Core Video Engine & AI Diagnostics (#3). Graffiti style human golfer color palette, set as Android launcher icon. 4 branches, 6 commits. Kotlin.",
    outcome: "Frame-accurate golf video analysis for mobile — engine + diagnostics shipped Jul 31.",
    proof: ["Phase 1 & 2", "Video Engine", "AI Diagnostics", "Graffiti Logo"],
    url: "https://github.com/muhummadzarrar09-sudo/SwingFrame",
    accent: "#7E9A7E",
    featured: true,
  },
  {
    name: "forms",
    tag: "Jul 30 • 86 commits • 6 branches",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Prisma", "Supabase"],
    blurb: "Typeform-like — free/cheap alternative, embed anywhere. Full handoff audits.",
    description:
      "Jul 30 2026: 86 commits. Docs: handoff-audit, ui-ux-audit, revival-plan, TESTING.md isolated DB, DEPLOYMENT.md Supabase/Vercel runbook, batches/ reports. Cheap Typeform alternative with mini-services.",
    outcome: "Production forms with audit logs, isolated e2e, and deploy runbook.",
    proof: ["86 commits", "Handoff audit", "Isolated Test DB", "Embed anywhere"],
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#D88A6E",
    featured: true,
  },
  {
    name: "LOCK-IN",
    tag: "CLIENT PROJECT • Jul 30 • 121 commits • 8 branches",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Supabase", "Cloudflare"],
    blurb: "CLIENT PROJECT — Next.js + Supabase + Cloudflare. Not personal OS successor.",
    description:
      "Client project — 121 commits as of Jul 30. 8 branches. Next.js App Router, Supabase, Cloudflare folder. You clarified: client project, not GrindOS successor or personal OS. Premium UX exec summary + auth deep-dive + data-leak hardening docs present.",
    outcome: "Client delivery with Supabase RLS, Cloudflare, premium UX, hardened auth.",
    proof: ["CLIENT", "121 commits", "Supabase RLS", "Cloudflare"],
    url: "https://github.com/muhummadzarrar09-sudo/LOCK-IN",
    accent: "#2D3A32",
    featured: false,
  },
  {
    name: "TheStandard",
    tag: "Jul 23 • 46 commits • Enrollment v2",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Supabase"],
    blurb: "Enrollment v2: server-side magic link with enrollment check, complete rebuild, looping fixes.",
    description:
      "TheStandard: GitHub says 'Outdated' but actually rebuild v2 Jul 22: magic link + enrollment check, middleware looping fixes, lib/supabase rebuilt. 46 commits, 1 branch. Repo title Outdated but code is v2.",
    outcome: "Enrollment system v2 with magic link + server-side checks.",
    proof: ["46 commits", "Magic Link", "Enrollment Check", "Rebuild v2"],
    url: "https://github.com/muhummadzarrar09-sudo/TheStandard",
    accent: "#8C857C",
  },
  {
    name: "retailflow",
    tag: "Jul 22 • Demo Storefront",
    year: "2026",
    stack: ["TypeScript", "Vite", "Catalog"],
    blurb: "Marigold & Clay — RetailFlow demo storefront: catalog + WhatsApp ordering, not a pitch.",
    description:
      "Jul 22 Initial Commit: Docs folder, public/products, scripts, src. README: 'Marigold & Clay — a RetailFlow demo storefront — A complete, working storefront — not a sales pitch. Premium online catalog + WhatsApp ordering system.'",
    outcome: "Working demo of RetailFlow catalog + WhatsApp ordering.",
    proof: ["Marigold & Clay", "Catalog", "WhatsApp Ordering", "Demo"],
    url: "https://github.com/muhummadzarrar09-sudo/retailflow",
    accent: "#D7C9AF",
  },
  {
    name: "Omni",
    tag: "Jul 19 • Voice Agent • 36 commits",
    year: "2026",
    stack: ["Python", "FastAPI", "Next", "Voice AI"],
    blurb: "Voice-controlled autonomous agent with Push-to-Talk, browser automation, local AI. Built for accessibility.",
    description:
      "OMNI Jul 19: 36 commits, _archive, assets (5GB models gitignored), backend_fastapi, frontend_next, docs (ARCHITECTURE, API 65+ endpoints, CHANGELOG, PERFORMANCE, TROUBLESHOOTING), tests 14 suites. Built for accessibility, loved by everyone. MIT.",
    outcome: "Accessible PTT voice agent with browser automation and local inference, 14 test suites green.",
    proof: ["36 commits", "65+ endpoints", "14 test suites", "Accessibility"],
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#A85A41",
  },
  {
    name: "TheDesiEdit",
    tag: "Jul 16 • Scroll Landing",
    year: "2026",
    stack: ["Vite", "GSAP", "Lenis", "Tailwind"],
    blurb: "Premium scroll-driven landing for The Desi Edit — 'Desi life, honestly reviewed'. Brand kit, GSAP + Lenis.",
    description:
      "Jul 16 merge PR #1: 5 commits, app, components, docs, supabase. Stack: Vite, vanilla ES modules, GSAP+ScrollTrigger pinned sections, Lenis smooth scroll, Fraunces/Lora/Inter/Noto Nastaliq Urdu. Motion landing page.",
    outcome: "Scroll-driven brand landing with GSAP pinned sections + Lenis smooth.",
    proof: ["GSAP ScrollTrigger", "Lenis", "Urdu Font", "Brand Kit"],
    url: "https://github.com/muhummadzarrar09-sudo/TheDesiEdit",
    accent: "#B88D6A",
  },
];

export const process = [
  {
    no: "01",
    title: "Listen",
    role: "Client first",
    body: "For LOCK-IN client work I listen first — constraints, Supabase RLS, Cloudflare, then sketch.",
  },
  {
    no: "02",
    title: "Build latest",
    role: "Latest commits",
    body: "Latest is Recto/SwingFrame Aug1, forms/LOCK-IN Jul30 — ship small daily, not big reveals.",
  },
  {
    no: "03",
    title: "Harden",
    role: "Audit trail",
    body: "Like forms audit (handoff-audit.md), LOCK-IN data-leak hardening — typed, auditable.",
  },
  {
    no: "04",
    title: "Ship",
    role: "Hand over",
    body: "Demo storefront (retailflow Marigold & Clay) or motion landing (TheDesiEdit) — clean hand-off + docs.",
  },
];

export const socials = [
  { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: profile.github },
  { label: "Email", handle: "muhummadzarrar09@gmail.com", url: "mailto:muhummadzarrar09@gmail.com" },
];
