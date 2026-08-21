/** Real failure patterns found in audits — the home page proof section. */
export const FINDINGS = [
  {
    title: "Paying for a dead domain",
    body: "Expired domain. Suspended hosting. The owner was still paying monthly for both — the site had just quietly gone dark months earlier.",
  },
  {
    title: "A menu with no prices",
    body: "A full catalog, zero prices. Customers don't message to ask. They go to the competitor who shows the number.",
  },
  {
    title: "Three WhatsApp numbers, one site",
    body: "Three different numbers on one website. Half the inquiries landed on a phone nobody checks.",
  },
  {
    title: "Google sees a blank page",
    body: "The site only renders in the browser, so Google's crawler reads an empty shell. It ranks accordingly: nowhere.",
  },
  {
    title: "Pirated plugins, ticking",
    body: "Nulled page-builder licenses — one update away from breaking the site, or handing it to whoever owns the backdoor.",
  },
  {
    title: "70+ files, 10-second load",
    body: "Seventy-plus files load on the homepage. On mobile data that's 10+ seconds. Most visitors are gone by second four.",
  },
];

export const TRUST_CHIPS = [
  "48-hour audit turnaround",
  "7-day builds",
  "You own everything on full payment",
];

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export const WHY_US = [
  {
    title: "Direct line to the builder",
    body: "No account managers, no handoffs, no telephone game. You talk to the person who writes the code.",
  },
  {
    title: "Builds Google can actually read",
    body: "Server-rendered pages, clean markup, structured data. Crawlers see everything — so rankings can move.",
  },
  {
    title: "One WhatsApp flow that converts",
    body: "Every path on the site leads to one number, one pre-filled message, one fast reply. No dead ends.",
  },
  {
    title: "Honest PKR pricing, in writing",
    body: "Ranges on the website, an exact written quote after the audit. If the scope changes, the price changes in writing too.",
  },
];

export const PROCESS_STEPS = [
  {
    name: "Audit",
    timeline: "48 hours",
    summary: "We read your site's actual source code and test it like a customer.",
    detail:
      "Not a screenshot review. Not a vibe check. We open the actual source code, load every page on a real Pakistani mobile connection, and walk the site the way a customer would — phone in hand, patience limited.",
    deliverables: [
      "Technical + UX inspection of your current site",
      "Tested on real mobile data, not a lab connection",
      "Every issue recorded as evidence, not opinion",
    ],
  },
  {
    name: "Findings",
    timeline: "Written report",
    summary: "Every issue with evidence. Every fix with a price. You decide.",
    detail:
      "You get a written report and a recorded walkthrough. Each finding comes with proof — what we found, where, and what it costs you. Then a plain recommendation: fix it, rebuild it, or leave it alone.",
    deliverables: [
      "Written report — every finding with evidence",
      "Recorded walkthrough you keep forever",
      "A priced list of fixes, in priority order",
    ],
  },
  {
    name: "Build",
    timeline: "Typically 7 working days",
    summary: "Daily progress on a private preview link. No surprises at the end.",
    detail:
      "Standard sites ship in about seven working days. You watch the build happen: daily progress on a private preview link, your feedback worked in as we go. No big reveal, no last-minute surprises.",
    deliverables: [
      "Private preview link, updated daily",
      "Your feedback worked in as we go",
      "Everything approved before launch day",
    ],
  },
  {
    name: "Launch",
    timeline: "Zero downtime",
    summary: "Your old site stays live until the second we flip to the new one.",
    detail:
      "We switch your existing domain to the new site with zero downtime. The old site stays live until the second we flip — then we verify every page, form, and flow together, live, before we call it done.",
    deliverables: [
      "Zero-downtime switch on your existing domain",
      "Every page, form, and flow verified together",
      "Handover of all code, content, and access",
    ],
  },
];

export const ADDONS = [
  {
    name: "WhatsApp order / inquiry flow",
    price: "PKR 80,000",
    desc: "One tap from your site to a pre-filled order or inquiry in your WhatsApp.",
  },
  {
    name: "PWA — installable app",
    price: "PKR 60,000",
    desc: "Your site installs to the home screen like an app. No app-store fees, no reviews queue.",
  },
  {
    name: "Local SEO package",
    price: "PKR 40,000–80,000",
    desc: "Google Business profile, local citations, and on-page work for \u201cnear me\u201d searches.",
  },
  {
    name: "Quote calculators",
    price: "PKR 80,000–150,000",
    desc: "Interactive calculators that turn curious visitors into qualified leads.",
  },
  {
    name: "Monthly care plan",
    price: "PKR 20,000–25,000/month",
    desc: "Hosting, updates, small changes within 48 hours, and a plain-language monthly report.",
  },
];

/** The five points covered by the free mini-audit. */
export const FREE_AUDIT_POINTS = [
  {
    name: "Speed on mobile data",
    desc: "How long your page actually takes on a Pakistani 4G connection — and what's slowing it down.",
  },
  {
    name: "Google visibility",
    desc: "Whether Google can read and index the pages you're paying for.",
  },
  {
    name: "Mobile experience",
    desc: "What customers actually see and tap on a phone — the screen they arrive on.",
  },
  {
    name: "Conversion path",
    desc: "How many steps between \u201cinterested\u201d and \u201ctalking to you\u201d — and where people drop off.",
  },
  {
    name: "Security basics",
    desc: "SSL, updates, and the obvious holes that get sites hijacked.",
  },
];
