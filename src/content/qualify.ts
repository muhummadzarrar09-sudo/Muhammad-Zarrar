/** Homepage qualifying brief — what they need, what they hoped to pay, what we quote. */

export type NeedOption = {
  id: string;
  label: string;
  get: string;
  quote: string;
  min: number;
  max: number;
};

export type BudgetOption = {
  id: string;
  label: string;
  min: number;
  max: number;
};

export const NEEDS: NeedOption[] = [
  {
    id: "audit",
    label: "I need to know what's broken",
    get: "A written diagnosis — evidence, not a sales call — in 48 hours.",
    quote: "PKR 35,000–50,000",
    min: 35000,
    max: 50000,
  },
  {
    id: "redesign",
    label: "I need the site rebuilt",
    get: "A mobile-first site that fixes what the audit measured. You own it.",
    quote: "PKR 150,000–500,000",
    min: 150000,
    max: 500000,
  },
  {
    id: "retail",
    label: "I need a catalog that takes orders",
    get: "Customers browse, tap, and WhatsApp you a pre-filled order.",
    quote: "from PKR 250,000",
    min: 250000,
    max: 600000,
  },
  {
    id: "booking",
    label: "I need people to book themselves",
    get: "A live calendar. WhatsApp confirms and reminds. Fewer no-shows.",
    quote: "from PKR 200,000",
    min: 200000,
    max: 500000,
  },
  {
    id: "dashboard",
    label: "I need one place for the team",
    get: "Leads, orders, the day — on a tool you own, not a rented seat.",
    quote: "from PKR 300,000",
    min: 300000,
    max: 800000,
  },
  {
    id: "unsure",
    label: "I'm not sure yet — just tell me",
    get: "We'll read the brief and recommend the smallest honest path.",
    quote: "We'll name it after we see the site",
    min: 0,
    max: 0,
  },
];

export const BUDGETS: BudgetOption[] = [
  { id: "under-50", label: "Under PKR 50,000", min: 0, max: 50000 },
  { id: "50-150", label: "PKR 50–150k", min: 50000, max: 150000 },
  { id: "150-300", label: "PKR 150–300k", min: 150000, max: 300000 },
  { id: "300-500", label: "PKR 300–500k", min: 300000, max: 500000 },
  { id: "500-plus", label: "PKR 500k+", min: 500000, max: 2000000 },
  { id: "unsure", label: "I don't know yet", min: 0, max: 0 },
];

export const TIMELINES = [
  "As soon as you can",
  "This month",
  "In the next 90 days",
  "Just looking, honestly",
];

export const OUTCOMES = [
  {
    src: "/images/gallery/ledger.jpg",
    title: "A diagnosis you can show anyone",
    body: "What's slow, what Google can't read, where they drop off — in writing. Yours to keep.",
  },
  {
    src: "/images/gallery/vessel.jpg",
    title: "A system with your name on it",
    body: "Code, domain, data. On full payment it's yours. No rented theme. No hostage hosting.",
  },
  {
    src: "/images/gallery/hands.jpg",
    title: "One WhatsApp that actually converts",
    body: "One number. One pre-filled message. The tap they already know how to make.",
  },
];

export const RECOGNITIONS = [
  {
    title: "It looks fine on your WiFi",
    body: "On their Jazz 4G it takes ten seconds. They're gone by four.",
  },
  {
    title: "People ask the price in DMs",
    body: "Because the site never shows it. They don't wait. They go to whoever does.",
  },
  {
    title: "Three numbers, one site",
    body: "Half the inquiries land on a phone nobody checks. You think it's quiet. It isn't.",
  },
  {
    title: "Google still hasn't found you",
    body: "If the page only paints in the browser, the crawler reads a blank shell. Rankings follow.",
  },
  {
    title: "You're still paying for a dark site",
    body: "Expired domain, suspended host, the invoice still goes out. It happens more than anyone admits.",
  },
  {
    title: "The rebuild quote came with no diagnosis",
    body: "That's how you pay twice for the same mistake. The audit is supposed to come first.",
  },
];

export const CONTRAST = [
  {
    usual: "A mood board and a 'starting from' price",
    here: "A written diagnosis, then an exact number",
  },
  {
    usual: "An account manager between you and the work",
    here: "You talk to the person who writes the code",
  },
  {
    usual: "A rented theme you never really own",
    here: "The keys, on full payment. Completely.",
  },
  {
    usual: "Three WhatsApps and a contact form that dies",
    here: "One flow. One tap. One reply.",
  },
];

export const NEXT_STEPS = [
  {
    no: "01",
    title: "We read your brief today",
    body: "Not a ticket. The builder reads what you wrote — your site, your number, your words.",
  },
  {
    no: "02",
    title: "You hear back within 24 hours",
    body: "Five findings, or an honest 'this isn't a fit, and here's why.' No sequence. No chase.",
  },
  {
    no: "03",
    title: "If it's a fit, a quote in writing",
    body: "The number only moves if the work does — and that change is in writing too.",
  },
];

export function quoteFit(
  need: NeedOption | undefined,
  budget: BudgetOption | undefined
): "fit" | "low" | "high" | "ask" {
  if (!need || !budget) return "ask";
  if (need.id === "unsure" || budget.id === "unsure") return "ask";
  if (budget.max > 0 && budget.max < need.min) return "low";
  if (need.max > 0 && budget.min > need.max) return "high";
  return "fit";
}
