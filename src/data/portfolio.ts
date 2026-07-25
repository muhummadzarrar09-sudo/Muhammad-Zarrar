// =========================================================================
// PORTFOLIO CONTENT — single source of truth.
// Projects mirror public GitHub repositories for muhummadzarrar09-sudo.
// =========================================================================

export const profile = {
  name: "Muhammad Zarrar",
  initials: "MZ",
  handle: "muhummadzarrar09-sudo",
  role: "Full-Stack Developer & AI Systems Engineer",
  location: "Earth · Remote-first",
  availability: "Available for select projects",
  avatar: "https://avatars.githubusercontent.com/u/266341933?v=4&s=512",
  github: "https://github.com/muhummadzarrar09-sudo",
  email: "muhummadzarrar09@gmail.com",
  emailSubject: "Project Inquiry — Let's build something",
  emailBody: [
    "Hi Muhammad,",
    "",
    "I came across your work and I'd love to talk about a project. Here's a quick brief so you have some context:",
    "",
    "• My name / company: ",
    "• What I'd like to build: ",
    "• Scope (features, platforms, integrations): ",
    "• Ideal timeline / deadline: ",
    "• Budget range: ",
    "",
    "Links for reference (site, repo, brief): ",
    "",
    "Looking forward to hearing your thoughts.",
    "",
    "Best,",
    "",
  ].join("\n"),
  bio: "Compiling...",
  tagline:
    "I build full-stack products, AI agents, voice interfaces, and polished web experiences — turning rough ideas into usable systems from database to pixel.",
  heroLine1: "Full-Stack",
  heroLine2: "Developer",
  heroEmphasis: "& AI Engineer",
};

export const heroProof = [
  { label: "Builds", value: "AI agents, dashboards, booking flows, web systems" },
  { label: "Stack", value: "TypeScript, React, Python, automation, full-stack" },
  { label: "Style", value: "Useful first, cinematic where it supports the product" },
];

export const stats = [
  { value: 14, suffix: "+", label: "Shipped repositories" },
  { value: 6, suffix: "", label: "AI systems built" },
  { value: 9, suffix: "", label: "Languages & runtimes" },
  { value: 100, suffix: "%", label: "Obsession with detail" },
];

export const marquee = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "LLM Orchestration",
  "Voice AI",
  "Browser Automation",
  "Dart / Flutter",
  "PostgreSQL",
  "System Design",
  "Design Engineering",
];

export type Skill = { name: string; level: number };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Product Engineering",
    blurb: "Taking ideas from a blank repo to a polished, production-ready product.",
    skills: [
      { name: "TypeScript / JavaScript", level: 95 },
      { name: "React & Next.js", level: 92 },
      { name: "Node.js & APIs", level: 90 },
      { name: "Dart & Flutter", level: 78 },
    ],
  },
  {
    group: "Applied AI",
    blurb: "Designing autonomous agents that perceive, decide and act in the real world.",
    skills: [
      { name: "LLM Orchestration", level: 93 },
      { name: "Voice & Speech (STT/TTS)", level: 88 },
      { name: "Browser Automation", level: 85 },
      { name: "Local / Edge Inference", level: 80 },
    ],
  },
  {
    group: "Systems & Craft",
    blurb: "The foundation underneath everything — and the polish on top of it.",
    skills: [
      { name: "System Architecture", level: 90 },
      { name: "Databases & Modelling", level: 86 },
      { name: "UI / Motion Design", level: 84 },
      { name: "DevOps & CI/CD", level: 78 },
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
    tag: "Voice Agent",
    year: "2026",
    stack: ["Python", "Voice AI", "Browser Automation", "MIT"],
    blurb: "A voice-controlled autonomous agent with push-to-talk, browser automation and local AI.",
    description:
      "OMNI listens, reasons and acts. Push-to-talk activation triggers a locally-aware agent that can drive the browser, automate tasks and process language on-device — engineered for accessibility and practical hands-free workflows.",
    outcome: "Hands-free browser/task automation with push-to-talk control and local-first assistant behavior.",
    proof: ["Voice activation", "Browser automation", "Local AI workflow", "Accessibility-first interaction"],
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#ff4d17",
    featured: true,
  },
  {
    name: "JARVIS",
    tag: "AI Assistant",
    year: "2026",
    stack: ["Python", "LLMs", "Automation"],
    blurb: "Just A Rather Very Intelligent System — a personal AI assistant that actually helps.",
    description:
      "An intelligent assistant that ties natural language understanding to real tool-use. JARVIS orchestrates models, memory and actions into a single conversational interface that feels less like software and more like a collaborator.",
    outcome: "A personal automation assistant that connects natural language to tool-use and task execution.",
    proof: ["Tool orchestration", "Conversation loop", "Task automation", "Assistant architecture"],
    url: "https://github.com/muhummadzarrar09-sudo/JARVIS",
    accent: "#1c5d4f",
    featured: true,
  },
  {
    name: "Operator-OS",
    tag: "Platform",
    year: "2026",
    stack: ["Dart", "Flutter", "Systems"],
    blurb: "An operating layer for autonomous operators.",
    description:
      "Operator-OS explores what an interface looks like when the user is an agent, not a human — a cross-platform system built in Dart for orchestrating and supervising autonomous work.",
    outcome: "A cross-platform supervision layer for coordinating autonomous operator workflows.",
    proof: ["Cross-platform UI", "Agent supervision", "System architecture", "Dart / Flutter base"],
    url: "https://github.com/muhummadzarrar09-sudo/Operator-OS",
    accent: "#b9f24a",
  },
  {
    name: "forms",
    tag: "Productivity",
    year: "2026",
    stack: ["TypeScript", "React"],
    blurb: "A typed, end-to-end forms engine.",
    description:
      "A developer-friendly forms system: strongly-typed schemas, validation and rendering handled from a single source of truth, so building complex inputs feels effortless.",
    outcome: "A typed forms foundation that keeps schemas, validation, and UI rendering aligned.",
    proof: ["Schema-driven fields", "Validation flow", "Typed rendering", "Reusable form patterns"],
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#ff6a3d",
  },
  {
    name: "bookings",
    tag: "Productivity",
    year: "2026",
    stack: ["TypeScript", "Full-Stack"],
    blurb: "Scheduling, made simple and reliable.",
    description:
      "A full-stack booking application handling availability, conflicts, payment-flow foundations and notifications — the unglamorous infrastructure that makes a product feel trustworthy.",
    outcome: "Scheduling infrastructure for availability, booking flow, and operational reliability.",
    proof: ["Availability logic", "Conflict handling", "Notification flow", "Full-stack structure"],
    url: "https://github.com/muhummadzarrar09-sudo/bookings",
    accent: "#ffb347",
  },
  {
    name: "Luminar",
    tag: "Experiment",
    year: "2026",
    stack: ["TypeScript", "AI"],
    blurb: "Lighting the way data becomes insight.",
    description:
      "An ongoing experiment in turning raw input into clear, luminous output — a sandbox for ideas about interfaces, intelligence and motion.",
    outcome: "An interface and AI sandbox for transforming raw inputs into clearer outputs.",
    proof: ["Interface experiments", "AI-assisted output", "Motion studies", "TypeScript foundation"],
    url: "https://github.com/muhummadzarrar09-sudo/Luminar",
    accent: "#837d6f",
  },
];

export const process = [
  {
    no: "01",
    title: "Discover",
    role: "Market Research",
    body: "I start with the problem, not the tech. Mapping constraints, users and the landscape so every decision is grounded in something real.",
  },
  {
    no: "02",
    title: "Define",
    role: "Branding & Strategy",
    body: "Turning research into a clear point of view — the narrative, the architecture and the shape the product will take.",
  },
  {
    no: "03",
    title: "Design",
    role: "Layout & Motion",
    body: "Information architecture meets interface craft. Layouts that breathe, motion that means something, and a system behind every pixel.",
  },
  {
    no: "04",
    title: "Deploy",
    role: "Build & Ship",
    body: "End-to-end engineering — database to pixel — then ship, measure, and refine until the seams disappear.",
  },
];

export const socials = [
  { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: profile.github },
  {
    label: "Email",
    handle: "muhummadzarrar09@gmail.com",
    url: "mailto:muhummadzarrar09@gmail.com",
  },
];


