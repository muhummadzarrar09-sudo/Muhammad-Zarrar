// =========================================================================
// ZARRAR.SOLUTIONS — business landing page content (single source of truth).
// Replace phone/email/links here. Prices are starting estimates (Rs.).
// =========================================================================

export const biz = {
  brand: "Zarrar.Solutions",
  founder: "Muhammad Zarrar",
  phone: "+92 333 5666050",
  whatsapp: "923335666050",
  email: "muhummadzarrar09@gmail.com",
  github: "https://github.com/muhummadzarrar09-sudo",
  location: "Rawalpindi · Islamabad",
  /** Primary sales CTA — opens WhatsApp with a ready-made message. */
  whatsappCta:
    "https://wa.me/923335666050?text=Assalamualaikum%2C%20I%20want%20to%20discuss%20a%20website%20or%20catalog%20system%20for%20my%20business.",
  headline:
    "We build websites, catalogs, and booking systems that help local businesses look professional and capture more inquiries.",
  sub: "Zarrar.Solutions is a digital studio building online catalogs, business websites, booking systems, dashboards, and automation tools for retailers, clinics, salons, academies, and service businesses.",
  strip: ["Websites", "Catalog Systems", "Booking Systems", "Dashboards", "WhatsApp Workflows"],
};

export const bizMarquee = [
  "Business Websites",
  "Retail Catalogs",
  "Booking Systems",
  "WhatsApp Ordering",
  "Dashboards",
  "Automation",
  "Stock Systems",
  "Lead Capture",
  "MVP Builds",
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
    title: "Business Websites",
    for: "Local businesses, retailers, clinics, academies, salons",
    outcome: "A professional online presence and easier customer inquiries.",
    deliverables: ["Landing page", "WhatsApp CTA", "Forms", "Mobile design", "Deployment"],
    icon: "globe",
  },
  {
    title: "Retail Catalog Systems",
    for: "Clothing stores, boutiques, stationery, cosmetics, shoe stores",
    outcome: "Customers view products, prices, and availability before messaging.",
    deliverables: ["Product catalog", "Categories", "Product pages", "WhatsApp ordering", "Admin panel"],
    icon: "grid",
  },
  {
    title: "Booking / Appointment Systems",
    for: "Clinics, salons, coaches, academies, consultants",
    outcome: "Fewer missed inquiries and easier appointment handling.",
    deliverables: ["Booking form", "Service pages", "WhatsApp confirmation", "Lead tracking"],
    icon: "calendar",
  },
  {
    title: "Dashboards & Admin Panels",
    for: "Businesses managing data in registers, Excel, or WhatsApp",
    outcome: "Better control over products, leads, orders, and customers.",
    deliverables: ["CRUD dashboards", "Analytics", "Role-based views", "Exports"],
    icon: "dashboard",
  },
  {
    title: "Automation & WhatsApp Workflows",
    for: "Teams wasting time on repetitive replies and manual follow-ups",
    outcome: "Faster response and smoother customer handling.",
    deliverables: ["WhatsApp flows", "Lead routing", "Auto messages", "Sheets / CRM sync"],
    icon: "cpu",
  },
  {
    title: "MVP / Custom Builds",
    for: "Founders or businesses with a custom software idea",
    outcome: "A working product, shipped fast.",
    deliverables: ["Full-stack app", "Auth", "Database", "Deployment", "Admin tools"],
    icon: "rocket",
  },
];

export type BizProject = {
  name: string;
  tag: string;
  business: string; // capability framed in business terms
  features: string[];
  tech: string[];
  status: string;
  github: string;
  accent: string;
};

export const bizProjects: BizProject[] = [
  {
    name: "Forms",
    tag: "Lead Capture Systems",
    business: "Structured form and lead-capture systems that route every inquiry to the right place.",
    features: ["Smart forms", "Lead routing", "Sheet / CRM sync", "Spam protection"],
    tech: ["TypeScript", "React", "Full-Stack"],
    status: "Production",
    github: "https://github.com/muhummadzarrar09-sudo/forms",
    accent: "#ff6a3d",
  },
  {
    name: "Bookings",
    tag: "Appointment Systems",
    business: "Scheduling infrastructure — availability, conflicts, reminders, and clean appointment flow.",
    features: ["Availability logic", "Conflict handling", "Reminders", "Admin dashboard"],
    tech: ["TypeScript", "Full-Stack"],
    status: "Production",
    github: "https://github.com/muhummadzarrar09-sudo/bookings",
    accent: "#34785c",
  },
  {
    name: "JARVIS",
    tag: "Automation & Assistants",
    business: "AI assistant systems that handle repetitive tasks and lighten manual workloads.",
    features: ["Natural language", "Tool-use & memory", "Task automation", "Conversational"],
    tech: ["Python", "LLMs", "Automation"],
    status: "Live",
    github: "https://github.com/muhummadzarrar09-sudo/JARVIS",
    accent: "#ff4d17",
  },
  {
    name: "OMNI",
    tag: "Voice / Browser Automation",
    business: "Voice and browser automation capability for hands-free and accessibility-first flows.",
    features: ["Push-to-talk", "Browser automation", "Local AI", "Accessibility"],
    tech: ["Python", "Voice AI"],
    status: "Live",
    github: "https://github.com/muhummadzarrar09-sudo/Omni",
    accent: "#1c5d4f",
  },
  {
    name: "Operator-OS",
    tag: "Systems & Platforms",
    business: "Cross-platform system architecture for orchestrating and supervising autonomous work.",
    features: ["Architecture", "Cross-platform", "Orchestration", "Supervision"],
    tech: ["Dart", "Flutter", "Systems"],
    status: "In development",
    github: "https://github.com/muhummadzarrar09-sudo/Operator-OS",
    accent: "#c08532",
  },
  {
    name: "Portfolio",
    tag: "Premium Web Experience",
    business: "Design-led brand and web execution — premium interfaces, motion, and craft.",
    features: ["Design system", "Motion & sound", "Custom cursor", "Sub-site routing"],
    tech: ["React", "TypeScript"],
    status: "Live",
    github: "https://github.com/muhummadzarrar09-sudo",
    accent: "#ffb347",
  },
];

// --- Pricing Packages (public offers) ------------------------------------
export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  priceSecondary?: string;
  description: string;
  bestFor: string;
  includes: string[];
  delivery?: string;
  notes: string[];
};

export const pricingPackages: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter Website",
    price: "Rs. 29,999",
    description:
      "A focused one-page business website built to make your business look professional, explain your services clearly, and send visitors toward WhatsApp or inquiry forms.",
    bestFor:
      "Small businesses, shops, service providers, clinics, salons, academies, and local brands that need a clean online presence.",
    includes: [
      "1-page custom website",
      "Mobile responsive design",
      "Smooth animations",
      "WhatsApp button / CTA",
      "Contact form or inquiry section",
      "Services/products overview",
      "Basic SEO setup",
      "Basic speed optimization",
      "Deployment included",
      "Demo/reference before build",
    ],
    delivery: "7 days after confirmation and advance payment.",
    notes: [
      "Domain is not included.",
      "Domain purchase/setup can be added depending on actual domain cost.",
      "Basic SEO only.",
      "Add-ons cost extra.",
    ],
  },
  {
    id: "retailflow",
    name: "RetailFlow Catalog System",
    price: "Rs. 25,000+",
    description:
      "An online catalog system for retailers. Customers can view products, prices, categories, stock status, and order/check availability through WhatsApp.",
    bestFor:
      "Clothing stores, boutiques, stationery shops, cosmetics shops, shoe stores, gift shops, bookshops, and small local brands.",
    includes: [
      "Public product catalog",
      "Product categories",
      "Product detail pages",
      "Product images and prices",
      "WhatsApp order/check availability button",
      "Mobile responsive design",
      "Basic deployment",
    ],
    notes: [
      "Final price depends on features and number of products.",
      "Professional version can include: Admin dashboard, Add/edit/delete products, Stock status, Size/color variants, Search and filters, Featured/new arrivals, Inquiry/order tracking.",
      "Add-ons cost extra.",
    ],
  },
  {
    id: "professional",
    name: "Professional Website",
    price: "Rs. 70,000+",
    description:
      "A premium multi-page website for businesses that need stronger credibility, better structure, more content, and a better inquiry flow.",
    bestFor:
      "Businesses that need service pages, reviews, location pages, stronger CTAs, better structure, and a more premium online presence.",
    includes: [
      "Everything in Starter Website",
      "Up to 5 pages/sub-pages",
      "Premium design system",
      "Advanced scroll animations",
      "About page",
      "Services/category pages",
      "Reviews/testimonials section",
      "Credibility section",
      "Location page",
      "FAQ section",
      "Stronger CTA structure",
      "Basic analytics setup",
      "Improved technical SEO foundation",
      "WhatsApp inquiry flow",
    ],
    delivery: "7–14 days depending on scope, content, and client response time.",
    notes: [
      "Priority delivery is available as an add-on depending on deadline.",
      "Add-ons cost extra.",
    ],
  },
  {
    id: "care",
    name: "Monthly / Yearly Care",
    price: "Rs. 25,000/month",
    priceSecondary: "Rs. 258,000/year",
    description:
      "Ongoing support, updates, improvements, technical maintenance, and basic SEO monitoring for your website or catalog system.",
    bestFor: "Businesses that want their website or system maintained professionally after launch.",
    includes: [
      "Website maintenance",
      "Bug fixes",
      "Minor design/content changes",
      "Hosting/deployment support",
      "Product/service updates",
      "WhatsApp CTA updates",
      "Form/inquiry flow checks",
      "Basic SEO maintenance",
      "Monthly performance check",
      "Technical issue checks",
      "Monthly improvement suggestions",
    ],
    notes: [
      "SEO Note: SEO improvements are aimed at strengthening visibility, technical health, and local relevance. Rankings are not guaranteed.",
      "Advanced SEO campaigns are quoted separately.",
      "Add-ons cost extra.",
    ],
  },
];

// --- Add-ons -------------------------------------------------------------
export const addons = [
  "Domain purchase/setup",
  "Extra pages",
  "Priority delivery",
  "Advanced SEO setup",
  "Google Business Profile optimization",
  "Location pages",
  "Review/testimonial system",
  "Product upload/import support",
  "Admin dashboard",
  "Stock management",
  "Search and filters",
  "WhatsApp automation",
  "Analytics/Search Console setup",
  "Blog/content pages",
  "Payment integration",
  "Hosting/email setup",
  "Maintenance and monthly reporting",
];

// --- RetailFlow (kept for reference / detailed section) ------------------
export const retailFlow = {
  name: "RetailFlow",
  title: "RetailFlow system.",
  tagline:
    "A simple online catalog and stock system for retailers who want customers to view products, prices, availability, and order through WhatsApp.",
  explanation:
    "Big brands have product catalogs. Local retailers usually rely on WhatsApp pictures, Instagram posts, and memory. RetailFlow gives shops a cleaner system: products are organized online, customers browse them, and inquiries come through WhatsApp.",
  core: "Not full e-commerce. A practical catalog + WhatsApp ordering system built for how local businesses already sell.",
  audience: [
    "Clothing stores",
    "Boutiques",
    "Stationery shops",
    "Bookshops",
    "Cosmetics shops",
    "Shoe stores",
    "Gift shops",
    "Small local brands",
  ],
  // Note: Public pricing now lives in pricingPackages. This is kept for detailed description.
  note: "First local case-study builds may qualify for a discounted starter setup. Ask on WhatsApp.",
};

export const bizProcess = [
  { no: "01", title: "Audit", body: "We study your business, market, and current setup to find the fastest practical wins." },
  { no: "02", title: "Design", body: "A clear plan and a premium interface tailored to your customers and how you sell." },
  { no: "03", title: "Build", body: "Full-stack engineering — catalogs, booking, dashboards, and automation." },
  { no: "04", title: "Launch", body: "Deploy, hand over, and refine until the system performs." },
];

export const whyUs = [
  { title: "Built for real business use", body: "Systems that help with inquiries, products, bookings, and daily operations." },
  { title: "Fast execution", body: "Lean builds, fast demos, and clear handover." },
  { title: "Modern web stack", body: "React, TypeScript, dashboards, databases, automation, and deployment." },
  { title: "WhatsApp-first thinking", body: "Built around how local businesses already communicate with customers." },
  { title: "Practical, not bloated", body: "No unnecessary complexity. Start with what helps the business immediately." },
  { title: "Design + development together", body: "The system should look premium and actually work." },
];

// sections for the business nav — matches the page sequence
export const bizLinks = [
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "addons", label: "Add-ons" },
  { id: "retailflow", label: "RetailFlow" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "why", label: "Why us" },
  { id: "contact", label: "Contact" },
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
