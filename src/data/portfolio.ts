// =========================================================================
// PORTFOLIO — ABSOLUTE LATEST BY COMMIT DATE, Aug 2 2026
// Clean tags: name + simple tag, details in description/blurb, not in title
// Notes per user: LOCK-IN = client project, TheStandard = predecessor of LOCK-IN, retailflow = demo of catalog system
// Order: Recto Aug1, SwingFrame Aug1, forms Jul30, LOCK-IN Jul30 client, TheStandard Jul23 predecessor, retailflow Jul22 demo, Omni Jul19, TheDesiEdit Jul16
// =========================================================================

export const profile = {
  name: "Muhammad Zarrar",
  initials: "MZ",
  handle: "muhummadzarrar09-sudo",
  role: "Full-Stack, AI & Mobile Engineer",
  location: "Rawalpindi, PK · Remote-first",
  availability: "Latest commits Aug 1 — Recto + SwingFrame",
  avatar: "https://avatars.githubusercontent.com/u/266341933?v=4&s=512",
  github: "https://github.com/muhummadzarrar09-sudo",
  email: "muhummadzarrar09@gmail.com",
  emailSubject: "Hey Zarrar — saw Recto / SwingFrame / client work",
  emailBody: [
    "Hey Zarrar,",
    "",
    "Saw your latest (Recto, SwingFrame, LOCK-IN client):",
    "",
    "• Who I am: ",
    "• Idea: ",
  ].join("\n"),
  bio: "Compiling ....",
  tagline:
    "Building in Kotlin, TypeScript, Python — from golf video AI to catalog demos. Latest by commit, not pinned.",
};

export const heroProof = [
  { label: "Aug 1 — Latest", value: "Recto + SwingFrame (Kotlin, video engine)" },
  { label: "Jul 30 — Client", value: "LOCK-IN client + forms engine" },
  { label: "How I show it", value: "Name + details in description, not in title" },
];

export const stats = [
  { value: 21, suffix: "+", label: "Public repos" },
  { value: 437, suffix: "", label: "Contributions last year" },
  { value: 8, suffix: "", label: "Latest Jul-Aug" },
  { value: 100, suffix: "%", label: "Hand-built" },
];

export const marquee = ["Kotlin", "TypeScript", "Python", "Next.js", "Client Projects", "Video AI", "Voice AI"];

export type Skill = { name: string; level: number };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Client Product",
    blurb: "LOCK-IN client project (121c) built on top of TheStandard predecessor — real client handoff, Supabase RLS, Cloudflare.",
    skills: [
      { name: "Next.js / TypeScript", level: 92 },
      { name: "Supabase / RLS", level: 88 },
      { name: "Client Handoff & Docs", level: 86 },
      { name: "Cloudflare", level: 80 },
    ],
  },
  {
    group: "Mobile & Video",
    blurb: "Recto (35c) + SwingFrame (video engine + golf AI) latest Aug 1 — Kotlin, offline-first, crash-visible.",
    skills: [
      { name: "Kotlin / Android", level: 88 },
      { name: "Video Engine / Diagnostics", level: 86 },
      { name: "Compose / Gradle", level: 82 },
      { name: "Offline / Crash Visibility", level: 84 },
    ],
  },
  {
    group: "Voice & Catalog Demos",
    blurb: "Omni voice PTT, retailflow is just a demo showing how I'd build a client's catalog + WhatsApp ordering, TheDesiEdit scroll.",
    skills: [
      { name: "Voice AI + PTT", level: 90 },
      { name: "Catalog + WhatsApp Flow", level: 83 },
      { name: "GSAP / Lenis", level: 84 },
      { name: "Forms Engine / Audits", level: 85 },
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
    tag: "Kotlin Lab",
    year: "2026",
    stack: ["Kotlin", "Android"],
    blurb: "Experimental Android lab. Pure playground for offline-first and making crashes actually visible in console.",
    description:
      "Latest — Aug 1 2026, 35 commits, 2 branches. Commit: 'Added some files sooo lets see where this leads' + 'FINE tuning and some Console error app side by side so if it crashes we now know why'. No fancy description on GitHub, just me iterating. Details live in commit history, not in title.",
    outcome: "Kotlin lab shipped yesterday for crash-visibility experiments.",
    proof: ["Kotlin", "Offline-first", "Console mirroring", "35 commits"],
    url: "https://github.com/muhummadzarrar09-sudo/Recto",
    accent: "#C46B4D",
    featured: true,
  },
  {
    name: "SwingFrame",
    tag: "Video AI",
    year: "2026",
    stack: ["Kotlin", "Video Engine", "AI"],
    blurb: "Golf swing analysis — frame-accurate video engine + AI diagnostics. Custom graffiti golfer logo.",
    description:
      "Aug 1 2026, Phase 1 & 2: Core Video Engine & AI Diagnostics (#3). Custom AI-generated logo, cold-boot splash, graffiti human golfer set as Android launcher icon. 4 branches, 6 commits. All details in description, not title.",
    outcome: "Mobile video AI for sports — engine + diagnostics live.",
    proof: ["Video Engine", "AI Diagnostics", "Graffiti Logo", "Launcher Icon"],
    url: "https://github.com/muhummadzarrar09-sudo/SwingFrame",
    accent: "#7E9A7E",
    featured: true,
  },
  {
    name: "forms",
    tag: "Forms Engine",
    year: "2026",
    stack: ["TypeScript", "Next.js", "Prisma"],
    blurb: "Free/cheap Typeform alternative you can embed anywhere. Built with audit trail and isolated test DB.",
    description:
      "Jul 30 2026, 86 commits, 6 branches. Docs: handoff-audit, ui-ux-audit, revival-plan, TESTING.md (isolated DB), DEPLOYMENT.md Supabase/Vercel, batches/ reports. Full story in docs, not in tag.",
    outcome: "Embeddable forms with real handoff docs and deploy runbook.",
    proof: ["Next.js", "Prisma", "Audit Trail", "E2E Isolation"],
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#D88A6E",
    featured: true,
  },
  {
    name: "LOCK-IN",
    tag: "Client Project",
    year: "2026",
    stack: ["Next.js", "Supabase", "Cloudflare"],
    blurb: "Client project — NOT a personal OS. Deep work tasks + notes + progress, built for a client on Next.js + Supabase + Cloudflare.",
    description:
      "Jul 30 2026, 121 commits, 8 branches. This is a CLIENT PROJECT per your note — not successor of GrindOS or personal OS. TheStandard is its predecessor (see next project) lol. Has premium UX summary, auth deep-dive, data-leak hardening docs.",
    outcome: "Client delivery — Supabase RLS, Cloudflare, hardened auth.",
    proof: ["Client", "Supabase", "Cloudflare", "Auth Hardening"],
    url: "https://github.com/muhummadzarrar09-sudo/LOCK-IN",
    accent: "#2D3A32",
    featured: false,
  },
  {
    name: "TheStandard",
    tag: "Enrollment System",
    year: "2026",
    stack: ["Next.js", "Supabase"],
    blurb: "Predecessor of LOCK-IN client project — enrollment v2 built with magic link + enrollment checks. Rebuilt completely.",
    description:
      "Jul 23 2026, 46 commits. GitHub shows 'Outdated' but it's actually complete rebuild v2: server-side magic link with enrollment check, middleware looping fixes, lib/supabase rebuilt. As you said, this is predecessor of LOCK-IN. Details in description, not title.",
    outcome: "Enrollment v2 that became LOCK-IN client — magic link + checks.",
    proof: ["Predecessor of LOCK-IN", "Magic Link", "Rebuild v2", "46 commits"],
    url: "https://github.com/muhummadzarrar09-sudo/TheStandard",
    accent: "#8C857C",
  },
  {
    name: "retailflow",
    tag: "Catalog Demo",
    year: "2026",
    stack: ["Vite", "TypeScript", "Tailwind"],
    blurb: "Demo only — shows how I'd build a client's catalog system. Marigold & Clay example storefront.",
    description:
      "Jul 22 Initial Commit — just a demo website if someone wants to know how I'll build their catalog system. README: 'Marigold & Clay — a RetailFlow demo storefront — not a sales pitch. Premium catalog + WhatsApp ordering system.'",
    outcome: "Demo storefront for catalog + WhatsApp ordering flow.",
    proof: ["Demo", "Marigold & Clay", "Catalog", "WhatsApp"],
    url: "https://github.com/muhummadzarrar09-sudo/retailflow",
    accent: "#D7C9AF",
  },
  {
    name: "Omni",
    tag: "Voice Agent",
    year: "2026",
    stack: ["Python", "FastAPI", "Voice AI"],
    blurb: "Push-to-talk voice agent that drives the browser. Local AI, browser as API, built for accessibility.",
    description:
      "Jul 19, 36 commits, backend_fastapi + frontend_next, docs: ARCHITECTURE, API 65+ endpoints, PERFORMANCE, TROUBLESHOOTING, 14 test suites. Built for accessibility, loved by everyone. MIT.",
    outcome: "Accessible PTT voice agent with local inference.",
    proof: ["Push-to-Talk", "Local AI", "Browser API", "14 Suites"],
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#A85A41",
  },
  {
    name: "TheDesiEdit",
    tag: "Brand Landing",
    year: "2026",
    stack: ["Vite", "GSAP", "Lenis"],
    blurb: "Scroll-driven landing for The Desi Edit — 'Desi life, honestly reviewed'. Built from brand kit.",
    description:
      "Jul 16, 5 commits, PR #1. Stack: Vite vanilla ES, GSAP ScrollTrigger pinned sections, Lenis smooth scroll, Fraunces/Lora/Inter/Noto Nastaliq Urdu. Premium motion landing.",
    outcome: "Brand landing with GSAP pinned sections + Lenis.",
    proof: ["GSAP", "Lenis", "Noto Urdu", "Brand Kit"],
    url: "https://github.com/muhummadzarrar09-sudo/TheDesiEdit",
    accent: "#B88D6A",
  },
];

export const process = [
  {
    no: "01",
    title: "Listen",
    role: "Client first",
    body: "For LOCK-IN client I started from TheStandard predecessor — read RLS, constraints, then sketched.",
  },
  {
    no: "02",
    title: "Demo fast",
    role: "Show don't pitch",
    body: "retailflow is demo only — I build a Marigold & Clay style demo so client sees catalog + WhatsApp flow before paying.",
  },
  {
    no: "03",
    title: "Build latest",
    role: "Commit order",
    body: "Recto/SwingFrame Aug1, forms Jul30, LOCK-IN client Jul30 — latest by commit, not pinned.",
  },
  {
    no: "04",
    title: "Clean tags",
    role: "Description, not title",
    body: "Tag is simple (Client Project, Catalog Demo). Details live in description/blurb, not stuffed in title per your note.",
  },
];

export const socials = [
  { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: profile.github },
  { label: "Email", handle: "muhummadzarrar09@gmail.com", url: "mailto:muhummadzarrar09@gmail.com" },
];
