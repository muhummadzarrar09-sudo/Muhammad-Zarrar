export type Faq = { q: string; a: string };
export type Tier = { price: string; label: string; desc: string };

export type Service = {
  slug: string;
  name: string;
  /** card + list one-liner */
  blurb: string;
  /** pill shown everywhere the price appears */
  priceLabel: string;
  /** fuller price phrasing for the pricing page */
  priceDetail: string;
  /** opening paragraph on the detail page */
  lead: string;
  problem: string[];
  included: string[];
  whoFor: string;
  faqs: Faq[];
  tiers?: Tier[];
  /** structured-data offer, in PKR */
  offer: { price?: number; minPrice?: number; maxPrice?: number };
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "website-audit",
    name: "Website Audit",
    blurb:
      "Speed, SEO, mobile, conversion, security — a written report with evidence, plus a recorded walkthrough. 48-hour turnaround.",
    priceLabel: "from PKR 35,000",
    priceDetail: "PKR 35,000–50,000 standalone · credited toward any build",
    lead: "You can't fix what you can't see. Most owners discover their site's problems only when inquiries dry up — and by then the diagnosis is guesswork. We read your site's actual source code, test it on real mobile data, and tell you exactly what's wrong. In writing. With evidence.",
    problem: [
      "Site owners usually learn what's broken from a declining sales graph — not from a diagnosis. Agencies quote rebuilds without ever opening the code. That's how businesses pay twice for the same mistake.",
      "An audit reverses the order. First the evidence: what is slow, what Google can't read, where customers drop off, what's insecure. Only then does anyone talk about fixes — and which ones are actually worth paying for.",
    ],
    included: [
      "Speed test on Pakistani mobile data — page by page, file by file",
      "Google visibility check: indexing, crawlability, structured data",
      "Mobile experience review — what customers actually see and tap",
      "Conversion path audit: CTAs, forms, and your WhatsApp flow",
      "Security basics: SSL, updates, plugin licensing, backups",
      "Written report — every finding documented with evidence",
      "Recorded walkthrough of the report, yours to keep",
      "48-hour turnaround, and the fee is credited toward any build",
    ],
    whoFor:
      "Businesses with an existing website that isn't performing — and owners who want a diagnosis before paying for a rebuild. It's also the right first step before accepting any redesign quote, ours or anyone else's.",
    faqs: [
      {
        q: "Why charge for an audit when others do it free?",
        a: "A free audit is usually a sales call with a slide deck. Ours is a deliverable: a written report, a recorded walkthrough, and evidence for every finding. And the full fee is credited toward any build we do afterwards — so if we end up building, it costs you nothing in the end.",
      },
      {
        q: "What do you need from me to start?",
        a: "Your website URL and payment of the audit fee — that's it. No logins, no access to your hosting. If you can share Analytics or Search Console read-only access, the report gets deeper; if not, we work without.",
      },
      {
        q: "What if the audit finds nothing wrong?",
        a: "That hasn't happened yet. But if your site is genuinely clean, we'll say so in writing — and you'll have independent proof to show anyone who tries to sell you an unnecessary rebuild.",
      },
    ],
    offer: { minPrice: 35000, maxPrice: 50000 },
    metaDescription:
      "Website audit in Islamabad & Rawalpindi — speed, Google visibility, mobile, conversion and security. Written report with evidence in 48 hours, from PKR 35,000.",
  },
  {
    slug: "redesign",
    name: "Audit + Redesign",
    blurb:
      "A full audit first, then a mobile-first rebuild engineered around the findings — SEO, speed, and a WhatsApp flow wired in.",
    priceLabel: "from PKR 150,000",
    priceDetail: "from PKR 150,000 · tiers at 150k / 300k / 500k",
    lead: "Most rebuilds start with a mood board. Ours starts with an audit — so the new site fixes the failures we measured, not the ones someone guessed at. You get a mobile-first rebuild with the conversion paths, SEO, and speed your old site never had.",
    problem: [
      "A website that's slow, invisible on Google, and quiet on WhatsApp doesn't need a fresh coat of paint — it needs surgery. But most rebuilds skip the diagnosis: new template, same broken flows, same disappointing results.",
      "We rebuild differently. The audit comes first, the findings shape the structure, and every design decision maps to something the evidence said was broken.",
    ],
    included: [
      "Full website audit first — findings drive the rebuild",
      "Mobile-first design built around your business, not a template",
      "Conversion CTAs and lead forms placed where customers decide",
      "On-page SEO: titles, structure, and structured data",
      "Speed optimization — target under 3 seconds on mobile data",
      "WhatsApp click-to-chat wired into every decision point",
      "Server-rendered pages Google can read in full",
      "You own the code, design, and content on full payment",
    ],
    whoFor:
      "Businesses whose current site was built fast and shows it — slow, invisible on Google, quiet on inquiries. If the bones are worth keeping, we'll tell you and price a repair instead of a rebuild.",
    faqs: [
      {
        q: "Why does the audit come before the redesign?",
        a: "Because rebuilding without a diagnosis is how you pay twice for the same mistakes. The audit tells us — with evidence — what the new site must fix, and that list becomes the build spec you approve.",
      },
      {
        q: "How long does a redesign take?",
        a: "Seven working days is typical for a standard site. Larger builds take longer, and you'll get the exact timeline in writing before we start — with daily progress on a private preview link while we build.",
      },
      {
        q: "What happens to my old site during the build?",
        a: "It stays live the whole time. We build on a private preview link, and your domain switches over only when you've approved everything. Zero downtime — the old site stays up until the second we flip.",
      },
    ],
    tiers: [
      {
        price: "PKR 150,000",
        label: "Essential",
        desc: "Up to 5 pages. Audit, mobile-first rebuild, lead forms, WhatsApp flow, on-page SEO, speed optimization.",
      },
      {
        price: "PKR 300,000",
        label: "Extended",
        desc: "Up to 12 pages. Everything in Essential, plus deeper conversion work and content restructuring.",
      },
      {
        price: "PKR 500,000",
        label: "Complete",
        desc: "Larger builds. Deeper content work, integrations, and the detail a flagship site needs.",
      },
    ],
    offer: { price: 150000 },
    metaDescription:
      "Audit-led website redesign in Rawalpindi & Islamabad — mobile-first rebuild with SEO, speed and WhatsApp flows. From PKR 150,000, exact quote after the audit.",
  },
  {
    slug: "retailflow",
    name: "RetailFlow — Catalog Systems",
    blurb:
      "Product catalogs with categories, filters and search, a WhatsApp order flow, and an admin dashboard you run yourself.",
    priceLabel: "from PKR 250,000",
    priceDetail: "from PKR 250,000 by catalog size and workflow depth",
    lead: "Posting products to Instagram and answering \u201cprice?\u201d in DMs all day is not a system. Customers can't browse, can't search, and can't order after closing time — so they go to whoever lets them. RetailFlow turns your inventory into a catalog that sells while you sleep.",
    problem: [
      "Retailers across Pakistan run real businesses on chat threads: photos in a WhatsApp broadcast, prices in someone's head, orders scribbled between messages. It works until it doesn't — and every day it costs sales nobody counts.",
      "A catalog system removes the bottleneck. Customers browse, filter, and tap one button to order on WhatsApp — the message arrives pre-filled with exactly what they want. You confirm. That's the whole flow.",
    ],
    included: [
      "Product catalog with categories, filters, and search",
      "WhatsApp order flow — orders arrive pre-filled and ready to confirm",
      "Admin dashboard to add, price, edit, and hide products yourself",
      "Mobile-first catalog pages built for small screens first",
      "On-page SEO so product pages can rank in Google",
      "Fast, server-rendered pages — no blank-page problem for Google",
      "Training session so your team actually runs the dashboard",
      "Your data, on your domain — exportable any time",
    ],
    whoFor:
      "Retailers, boutiques, furniture stores, electronics shops — any business with more than about twenty products that has outgrown Instagram posts and spreadsheets.",
    faqs: [
      {
        q: "Is this an online store with card payments?",
        a: "It's a catalog with a WhatsApp order flow — because that's how most of Pakistan actually buys. If you want card payments later, that's a separate module we can scope and price in writing. Nothing stops you from adding it.",
      },
      {
        q: "How do we add new products after launch?",
        a: "Through your admin dashboard — photos, names, prices, categories, stock status. No code, no waiting for us. Training for your team is included in the build.",
      },
      {
        q: "What if we don't have proper product photos?",
        a: "Send what you have — phone photos are fine. We crop, clean, and optimize every image for the web as part of the build, so the catalog looks sharp even from rough source material.",
      },
    ],
    offer: { price: 250000 },
    metaDescription:
      "RetailFlow catalog systems in Pakistan — products with categories, filters, search and a WhatsApp order flow, plus an admin dashboard. From PKR 250,000.",
  },
  {
    slug: "bookingflow",
    name: "BookingFlow — Appointment Systems",
    blurb:
      "Online booking calendar with WhatsApp confirmations and reminders, no-show reduction, and deposits for high-ticket bookings.",
    priceLabel: "from PKR 200,000",
    priceDetail: "from PKR 200,000 by services, staff, and deposit needs",
    lead: "Bookings over phone calls and chat mean missed calls, double-booked slots, and no-shows nobody confirmed. Your calendar lives in someone's memory. BookingFlow puts it on your website — with WhatsApp doing the reminding so you don't have to.",
    problem: [
      "Every missed call is a missed appointment. Every appointment without a reminder is a likely no-show. For clinics, salons, gyms, and consultants, the calendar is the revenue — and most of it runs on memory and hope.",
      "BookingFlow makes the calendar self-service: customers pick a real, available slot on your site, and WhatsApp confirms and reminds them automatically. Deposits protect the high-ticket bookings.",
    ],
    included: [
      "Online booking calendar with your real working hours and slots",
      "Automatic WhatsApp confirmations and reminders",
      "No-show reduction — reminders before every appointment",
      "Deposit collection for high-ticket bookings",
      "Buffer times, breaks, and blocked days built in",
      "Owner dashboard to view and manage the day at a glance",
      "Server-rendered booking pages Google can read and rank",
      "Your domain, your data — no per-booking fees, no lock-in",
    ],
    whoFor:
      "Clinics, salons, gyms, consultants — anyone whose revenue runs on appointments and whose current system is a phone, a notebook, and someone's memory.",
    faqs: [
      {
        q: "Do my customers need to install anything?",
        a: "No. They book on your website, and confirmations and reminders arrive on WhatsApp — the app they already check fifty times a day. That's deliberate, and it's why the system gets used.",
      },
      {
        q: "How do deposits work?",
        a: "For high-ticket appointments, the customer pays a deposit to confirm the slot, and the calendar marks it as booked. We scope the collection method with you — bank-transfer confirmation or a payment gateway — and price it in writing before building.",
      },
      {
        q: "Can I change working hours, breaks, and holidays?",
        a: "Yes — from your dashboard, any time. Slot lengths, buffer times, blocked days, and closing hours all update instantly. No code changes, no waiting on us.",
      },
    ],
    offer: { price: 200000 },
    metaDescription:
      "Booking system in Pakistan — online appointment calendar with WhatsApp confirmations, reminders and deposits. For clinics, salons, gyms. From PKR 200,000.",
  },
  {
    slug: "dashboards",
    name: "Dashboards & Internal Tools",
    blurb:
      "Lead trackers, order logs, and operations CRUD apps — custom-built around the way your team actually works.",
    priceLabel: "from PKR 300,000",
    priceDetail: "from PKR 300,000 by workflow complexity",
    lead: "Your operations run on WhatsApp groups, spreadsheets, and someone's memory. Data gets lost, nobody trusts the numbers, and you can't see the business from one screen. We build the internal tool that replaces the chaos — shaped around how you actually work.",
    problem: [
      "Every growing business hits the same wall: the chat-and-spreadsheet system that got them started starts eating hours. Leads fall out of threads. Order status lives in someone's head. Reports take a day to assemble and are wrong anyway.",
      "Off-the-shelf software is the usual answer — and usually a bad fit, rented per seat forever. A custom tool costs more up front and then belongs to you: no subscriptions, no foreign workflow, no lock-in.",
    ],
    included: [
      "Lead trackers, order logs, operations CRUD apps — custom-built",
      "Workflow mapped first: who enters what, who approves what",
      "Role-based access — everyone sees exactly what they should",
      "Data export — your records stay yours, always",
      "Deployed on your own hosting and domain",
      "Documentation and a handover session for your team",
      "Built to be extended — modules can be added later",
      "Honest scoping: if a spreadsheet would do, we'll say so",
    ],
    whoFor:
      "Growing teams drowning in spreadsheets and chat threads — distributors, multi-branch clinics, agencies, any operation that needs one source of truth instead of five versions of it.",
    faqs: [
      {
        q: "Why custom instead of off-the-shelf software?",
        a: "Off-the-shelf means monthly per-seat fees and a workflow shaped around someone else's assumptions. Custom costs more up front, then it's yours: built exactly around your process, with no subscription and no lock-in.",
      },
      {
        q: "What does \u201ccustom-built\u201d mean in practice?",
        a: "We map your actual workflow first — who enters what, who approves what, who needs to see what. Then we build exactly that, and you approve a working preview before anything goes live. No surprises at handover.",
      },
      {
        q: "Who owns the data?",
        a: "You do — completely. It lives on hosting you control, it's exportable at any time, and the code is yours on full payment. Local-first is a rule here, not a slogan.",
      },
    ],
    offer: { price: 300000 },
    metaDescription:
      "Custom dashboards and internal tools in Pakistan — lead trackers, order logs and operations apps built around your workflow. From PKR 300,000.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
