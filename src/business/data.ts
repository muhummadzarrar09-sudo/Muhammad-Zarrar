// =========================================================================
// BUSINESS SITE CONTENT — single source of truth. Replace phone/email/links
// here. Prices are placeholders (Rs.).
// =========================================================================

export const biz = {
  name: "Muhammad Zarrar",
  age: 18,
  brand: "Zarrar.studio",
  phone: "+92 333 5666050",
  whatsapp: "923335666050",
  email: "muhummadzarrar09@gmail.com",
  github: "https://github.com/muhummadzarrar09-sudo",
  location: "Remote · Worldwide",
  headline: "I Build Websites, Apps & AI Systems That Turn Attention Into Revenue.",
  sub:
    "Premium websites, booking systems, dashboards, forms, and automation tools for businesses that need more leads, better workflows, and a stronger digital presence.",
};

export const bizMarquee = [
  "Websites",
  "Booking Systems",
  "AI Assistants",
  "Dashboards",
  "Lead Capture",
  "Automation",
  "WhatsApp Integration",
  "SEO",
  "MVP Builds",
  "Full-Stack",
];

export type Service = {
  title: string;
  for: string;
  outcome: string;
  deliverables: string[];
  icon: string;
};

export const services: Service[] = [
  {
    title: "Premium Business Websites",
    for: "Clinics, coaches, academies, local services",
    outcome: "More trust and more inbound inquiries.",
    deliverables: ["Custom design", "Fast & responsive", "SEO-ready", "Mobile-first"],
    icon: "globe",
  },
  {
    title: "Appointment Booking Systems",
    for: "Clinics, salons, academies",
    outcome: "Fewer missed calls, more booked slots.",
    deliverables: ["Booking calendar", "Reminders", "Admin panel", "WhatsApp confirm"],
    icon: "calendar",
  },
  {
    title: "Forms & Lead Capture",
    for: "Any business that wants more leads",
    outcome: "Capture every single inquiry.",
    deliverables: ["Smart forms", "Lead routing", "CRM / Sheet sync", "Spam protection"],
    icon: "form",
  },
  {
    title: "Admin Dashboards",
    for: "Teams drowning in spreadsheets",
    outcome: "See and control everything in one place.",
    deliverables: ["Analytics", "CRUD & roles", "Exports", "Realtime data"],
    icon: "dashboard",
  },
  {
    title: "AI Assistants & Automation",
    for: "Businesses ready to scale support",
    outcome: "24/7 responses, far less manual work.",
    deliverables: ["Chatbots", "Automations", "Integrations", "Voice tools"],
    icon: "cpu",
  },
  {
    title: "MVP / Startup Builds",
    for: "Founders with an idea",
    outcome: "A real, working product — fast.",
    deliverables: ["Full-stack app", "Auth & payments", "Deploy", "Scalable base"],
    icon: "rocket",
  },
];

export type BizProject = {
  name: string;
  tag: string;
  problem: string;
  features: string[];
  tech: string[];
  status: string;
  github: string;
  demo: string;
  accent: string;
};

export const bizProjects: BizProject[] = [
  {
    name: "JARVIS",
    tag: "AI Assistant System",
    problem: "Repetitive support and tasks eat hours every week.",
    features: ["Natural language", "Tool-use & memory", "Task automation", "Conversational UI"],
    tech: ["Python", "LLMs", "Automation"],
    status: "Live",
    github: "https://github.com/muhummadzarrar09-sudo/JARVIS",
    demo: "#",
    accent: "#ff4d17",
  },
  {
    name: "OMNI",
    tag: "Voice Autonomous Agent",
    problem: "Hands-busy users need control without a screen.",
    features: ["Push-to-talk", "Browser automation", "Local AI", "Accessibility-first"],
    tech: ["Python", "Voice AI"],
    status: "Live",
    github: "https://github.com/muhummadzarrar09-sudo/Omni",
    demo: "#",
    accent: "#22d3ee",
  },
  {
    name: "Forms",
    tag: "Form Builder",
    problem: "Rigid forms frustrate users and lose leads.",
    features: ["Typed schemas", "Validation", "Dynamic rendering", "Analytics"],
    tech: ["TypeScript", "React"],
    status: "Production",
    github: "https://github.com/muhummadzarrar09-sudo/forms",
    demo: "#",
    accent: "#a78bfa",
  },
  {
    name: "Bookings",
    tag: "Booking Platform",
    problem: "Phone-tag wastes time and loses patients.",
    features: ["Availability", "Conflict handling", "Reminders", "Admin dashboard"],
    tech: ["TypeScript", "Full-Stack"],
    status: "Production",
    github: "https://github.com/muhummadzarrar09-sudo/bookings",
    demo: "#",
    accent: "#34d399",
  },
  {
    name: "GrindOS",
    tag: "Productivity OS",
    problem: "Scattered tools kill focus and momentum.",
    features: ["Tasks & goals", "Focus timers", "Dashboards", "Cross-platform"],
    tech: ["Dart", "Flutter"],
    status: "In development",
    github: "https://github.com/muhummadzarrar09-sudo",
    demo: "#",
    accent: "#fbbf24",
  },
  {
    name: "Personal Site",
    tag: "This Portfolio",
    problem: "Every serious builder needs a credible presence.",
    features: ["Design system", "Motion & sound", "Custom cursor", "Sub-site routing"],
    tech: ["React", "TypeScript"],
    status: "Live",
    github: "https://github.com/muhummadzarrar09-sudo",
    demo: "#",
    accent: "#fb7185",
  },
];

export const clinic = {
  name: "ClinicLaunch System",
  tagline:
    "A premium appointment-booking website system for clinics that want more patient inquiries through WhatsApp, forms, and Google search.",
  plans: [
    {
      name: "Starter",
      price: "Rs. 25,000",
      suffix: "+",
      desc: "A clean, fast clinic website with booking + WhatsApp capture.",
      featured: false,
      period: "one-time",
      features: [
        "Professional clinic website",
        "Appointment booking form",
        "WhatsApp lead capture",
        "Mobile responsive design",
        "Delivered in 7 days",
      ],
    },
    {
      name: "Professional",
      price: "Rs. 50,000",
      suffix: "+",
      desc: "Full system: site, booking, dashboard, automations & SEO.",
      featured: true,
      period: "one-time",
      features: [
        "Everything in Starter",
        "Admin dashboard / Sheet sync",
        "Doctor & service sections",
        "Google reviews CTA",
        "Basic SEO setup",
        "Priority support",
      ],
    },
    {
      name: "Monthly Care",
      price: "Rs. 8,000",
      suffix: "/month+",
      desc: "Hosting, updates, tweaks & ongoing improvements.",
      featured: false,
      period: "per month",
      features: [
        "Hosting & SSL",
        "Monthly updates",
        "Content tweaks",
        "Performance checks",
        "Ongoing improvements",
      ],
    },
  ],
};

export const bizProcess = [
  { no: "01", title: "Audit", body: "I study your business, market and current setup to find the fastest wins." },
  { no: "02", title: "Design", body: "A clear plan and a premium interface tailored to your audience." },
  { no: "03", title: "Build", body: "Full-stack engineering — booking, forms, dashboards, automation." },
  { no: "04", title: "Launch", body: "Deploy, hand over, and refine until it performs." },
];

export const whyMe = [
  { title: "Fast builder", body: "Ideas ship in days, not months. Momentum matters." },
  { title: "Full-stack ability", body: "Database to pixel — one person, no handoff gaps." },
  { title: "Modern AI & web fluency", body: "Voice, agents, automation — the tools that compound." },
  { title: "Working systems, not pretty pages", body: "Booking, leads, dashboards. Things that move numbers." },
  { title: "Outcome-focused", body: "Leads, bookings, trust, speed — that's the brief." },
  { title: "18, not green", body: "Young, hungry, and serious about shipping real value." },
];

// sections for the business nav (its own "sitemap") — matches page sequence
export const bizLinks = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "clinic", label: "Clinics" },
  { id: "process", label: "Process" },
  { id: "why", label: "Why me" },
  { id: "contact", label: "Contact" },
];
