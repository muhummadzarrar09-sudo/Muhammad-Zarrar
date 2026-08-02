// =========================================================================
// PORTFOLIO CONTENT — personal, human, honest.
// =========================================================================

export const profile = {
  name: "Muhammad Zarrar",
  initials: "MZ",
  handle: "muhummadzarrar09-sudo",
  role: "Full-Stack & AI Engineer",
  location: "Rawalpindi, PK · Remote-first",
  availability: "Taking 1-2 projects — careful, deep work",
  avatar: "https://avatars.githubusercontent.com/u/266341933?v=4&s=512",
  github: "https://github.com/muhummadzarrar09-sudo",
  email: "muhummadzarrar09@gmail.com",
  emailSubject: "Hey Zarrar — project idea",
  emailBody: [
    "Hey Zarrar,",
    "",
    "I saw your portfolio and wanted to reach out about an idea:",
    "",
    "• Who I am: ",
    "• What I'm building: ",
    "• Why it matters: ",
    "• Timeline / budget if any: ",
    "",
    "Would love your thoughts.",
    "",
    "Best,",
  ].join("\n"),
  bio: "Hand-building useful things.",
  tagline:
    "I take messy ideas and turn them into working software people can actually use — voice agents, dashboards, booking flows, small tools that delete boring work.",
  heroLine1: "I build things",
  heroLine2: "people use",
  heroEmphasis: "actually use",
};

export const heroProof = [
  { label: "Builds", value: "AI agents, dashboards, booking flows, product systems" },
  { label: "Stack", value: "TypeScript, React, Python, Postgres" },
  { label: "Style", value: "Useful first, pretty when it helps" },
];

export const stats = [
  { value: 14, suffix: "+", label: "Repos shipped" },
  { value: 6, suffix: "", label: "AI systems" },
  { value: 3, suffix: "", label: "Years learning" },
  { value: 100, suffix: "%", label: "Hand-built" },
];

export const marquee = [
  "TypeScript",
  "React",
  "Python",
  "LLM Orchestration",
  "Voice AI",
  "Product Engineering",
  "System Design",
];

export type Skill = { name: string; level: number };
export const expertise: { group: string; blurb: string; skills: Skill[] }[] = [
  {
    group: "Product Engineering",
    blurb: "From blank repo to something someone pays for or relies on. Database to pixel.",
    skills: [
      { name: "TypeScript / JavaScript", level: 92 },
      { name: "React & Next.js", level: 90 },
      { name: "Node.js & APIs", level: 88 },
      { name: "Postgres & System Design", level: 84 },
    ],
  },
  {
    group: "Applied AI",
    blurb: "Agents that actually do things — voice, browser, tool-use — not just chat demos.",
    skills: [
      { name: "LLM Orchestration", level: 90 },
      { name: "Voice (STT/TTS) & Realtime", level: 86 },
      { name: "Browser Automation", level: 84 },
      { name: "Edge / Local Inference", level: 78 },
    ],
  },
  {
    group: "Craft & Systems",
    blurb: "The quiet parts — error handling, empty states, a11y, speed, maintainability.",
    skills: [
      { name: "UI Engineering", level: 86 },
      { name: "Motion (when it helps)", level: 80 },
      { name: "DevOps & Shipping", level: 76 },
      { name: "Writing & Docs", level: 82 },
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
    stack: ["Python", "Voice AI", "Browser Automation"],
    blurb: "Push-to-talk voice agent that drives the browser and does real work.",
    description:
      "OMNI listens, reasons and acts. Push-to-talk → local AI → browser automation. Built for hands-free work where typing is slow or impossible. Obsessed with <300ms latency.",
    outcome: "Hands-free browser task automation with local-first voice control.",
    proof: ["Push-to-talk", "Browser as API", "Local inference", "Latency-focused"],
    url: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#C46B4D",
    featured: true,
  },
  {
    name: "JARVIS",
    tag: "AI Assistant",
    year: "2026",
    stack: ["Python", "LLMs", "Tool-use"],
    blurb: "A personal assistant that actually helps — not just chats.",
    description:
      "Ties natural language to real tools, memory, and actions. Less chatbot, more collaborator that can run tasks and remember context.",
    outcome: "Personal assistant with tool orchestration and memory.",
    proof: ["Tool-use", "Memory", "Task automation", "Natural UX"],
    url: "https://github.com/muhummadzarrar09-sudo/JARVIS",
    accent: "#2D3A32",
    featured: true,
  },
  {
    name: "Operator-OS",
    tag: "Platform",
    year: "2026",
    stack: ["Dart", "Flutter", "Systems"],
    blurb: "Supervision layer for autonomous operators.",
    description:
      "What does UI look like when the user is an agent, not a human? Operator-OS explores that — orchestrating and monitoring autonomous work.",
    outcome: "Cross-platform supervision for agent workflows.",
    proof: ["Dart/Flutter", "Agent supervision", "Orchestration", "Systems thinking"],
    url: "https://github.com/muhummadzarrar09-sudo/Operator-OS",
    accent: "#7A8E7E",
  },
  {
    name: "forms",
    tag: "Library",
    year: "2026",
    stack: ["TypeScript", "React"],
    blurb: "Typed forms where schema, validation and UI stay in sync.",
    description:
      "A forms engine that keeps schema, validation, and rendering from one source of truth. So complex forms don't become chaos.",
    outcome: "Typed, schema-driven forms foundation.",
    proof: ["Schema-driven", "Validation", "Typed UI", "DX-focused"],
    url: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#D88A6E",
  },
  {
    name: "bookings",
    tag: "Product",
    year: "2026",
    stack: ["TypeScript", "Full-Stack"],
    blurb: "Scheduling infra that doesn't drop the ball.",
    description:
      "Availability, conflicts, notifications — the unglamorous stuff that makes a booking product feel trustworthy.",
    outcome: "Reliable scheduling core with conflict handling.",
    proof: ["Availability", "Conflicts", "Notifications", "Full-stack"],
    url: "https://github.com/muhummadzarrar09-sudo/bookings",
    accent: "#D7C9AF",
  },
  {
    name: "Luminar",
    tag: "Experiment",
    year: "2026",
    stack: ["TypeScript", "AI"],
    blurb: "Sandbox for ideas about light, data and interfaces.",
    description: "Ongoing experiment in turning raw input into clear output. Where I try ideas before they become real products.",
    outcome: "Interface & AI playground.",
    proof: ["Experiments", "Motion studies", "TypeScript", "Learning log"],
    url: "https://github.com/muhummadzarrar09-sudo/Luminar",
    accent: "#8C857C",
  },
];

export const process = [
  {
    no: "01",
    title: "Listen",
    role: "Problem first",
    body: "We talk, you show me the mess. I ask dumb questions until the real problem shows up, not the surface one.",
  },
  {
    no: "02",
    title: "Sketch",
    role: "Paper before code",
    body: "Quick flows on paper, then a rough prototype. If it doesn't make sense on paper, code won't fix it.",
  },
  {
    no: "03",
    title: "Build small",
    role: "Ship a slice",
    body: "Thin slice, typed, working, shippable. Then iterate. No 3-month big reveal — we learn from real use.",
  },
  {
    no: "04",
    title: "Refine",
    role: "Make it human",
    body: "Edge cases, empty states, speed, copy. The boring details that make it feel finished — then hand it over clean.",
  },
];

export const socials = [
  { label: "GitHub", handle: "@muhummadzarrar09-sudo", url: profile.github },
  { label: "Email", handle: "muhummadzarrar09@gmail.com", url: "mailto:muhummadzarrar09@gmail.com" },
];
