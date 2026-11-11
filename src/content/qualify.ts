/** Project-brief choices and the first-party WhatsApp handoff. */

export type BriefChoice = {
  id: string;
  label: string;
};

export type NeedOption = BriefChoice;

export type BudgetOption = {
  id: string;
  label: string;
  min: number;
  max: number;
};

/**
 * Every question earns a practical piece of scope. The option questions are
 * intentionally checklists: a business can need a catalogue and bookings, or
 * a redesign plus a dashboard. The budget remains one range by definition.
 */
export const NEEDS: NeedOption[] = [
  { id: "audit", label: "Fix or improve an existing website" },
  { id: "redesign", label: "Build a new business website" },
  { id: "retail", label: "Create an online catalogue or shop" },
  { id: "booking", label: "Set up appointments or bookings" },
  { id: "dashboard", label: "Build an internal tool or dashboard" },
  { id: "unsure", label: "Not sure — I need a recommendation" },
];

export const GOALS: BriefChoice[] = [
  { id: "whatsapp", label: "Send a WhatsApp enquiry" },
  { id: "pricing", label: "Understand services and pricing" },
  { id: "order", label: "Browse products and place an order" },
  { id: "book", label: "Book an appointment or consultation" },
  { id: "search", label: "Find the business on Google" },
  { id: "internal", label: "Give the team one place to work" },
];

export const SCOPES: BriefChoice[] = [
  { id: "landing", label: "One focused landing page" },
  { id: "small-site", label: "A 5–8 page business site" },
  { id: "medium-site", label: "An 8–12 page site" },
  { id: "catalogue", label: "A catalogue with products or services" },
  { id: "custom", label: "A custom system with more moving parts" },
];

/** These are individual materials, not a vague readiness score, so selecting
 * several is both useful and expected. */
export const READINESS: BriefChoice[] = [
  { id: "brand", label: "A logo or visual identity" },
  { id: "copy", label: "Service copy or product descriptions" },
  { id: "images", label: "Photos, product images or video" },
  { id: "prices", label: "A service or product list with prices" },
  { id: "nothing", label: "Nothing is ready yet" },
];

export const BUDGETS: BudgetOption[] = [
  { id: "under-50", label: "Under PKR 50,000", min: 0, max: 50000 },
  { id: "50-150", label: "PKR 50–150k", min: 50000, max: 150000 },
  { id: "150-300", label: "PKR 150–300k", min: 150000, max: 300000 },
  { id: "300-500", label: "PKR 300–500k", min: 300000, max: 500000 },
  { id: "500-plus", label: "PKR 500k+", min: 500000, max: 2000000 },
  { id: "unsure", label: "I don't know yet", min: 0, max: 0 },
];

export const TIMELINES: BriefChoice[] = [
  { id: "two-weeks", label: "Within the next two weeks" },
  { id: "this-month", label: "This month" },
  { id: "three-months", label: "Within the next three months" },
  { id: "no-date", label: "No fixed date yet" },
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

export type BriefValues = {
  name: string;
  business: string;
  /** `existing` requires a URL. `new` sends a clear starting-from-scratch note. */
  siteState: "" | "existing" | "new";
  url: string;
  whatsapp: string;
  needIds: string[];
  goalIds: string[];
  scopeIds: string[];
  readinessIds: string[];
  timelineIds: string[];
  budgetId: string;
};

function selectedLabels(items: BriefChoice[], ids: string[]) {
  return items
    .filter((item) => ids.includes(item.id))
    .map((item) => item.label)
    .join("; ");
}

export function composeBrief(values: BriefValues) {
  const budget = BUDGETS.find((item) => item.id === values.budgetId);

  return [
    `Hello Zarrar — ${values.name.trim()} from ${values.business.trim()} filled the project brief.`,
    ``,
    `WhatsApp: ${values.whatsapp.trim()}`,
    `Current website / Instagram: ${
      values.siteState === "new" ? "Starting from scratch" : values.url.trim() || "—"
    }`,
    `Projects selected: ${selectedLabels(NEEDS, values.needIds) || "—"}`,
    `Customer outcomes selected: ${selectedLabels(GOALS, values.goalIds) || "—"}`,
    `Likely scope selected: ${selectedLabels(SCOPES, values.scopeIds) || "—"}`,
    `Materials ready: ${selectedLabels(READINESS, values.readinessIds) || "—"}`,
    `Target launch: ${selectedLabels(TIMELINES, values.timelineIds) || "—"}`,
    `Approved budget: ${budget?.label ?? "Not confirmed yet"}`,
  ].join("\n");
}
