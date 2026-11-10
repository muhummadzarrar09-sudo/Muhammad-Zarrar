/**
 * The estimator's only source of numbers.
 *
 * Every figure here is copied from what the site already publishes in
 * /pricing and src/content/services.ts. Nothing is invented: where the site
 * says "from PKR 250,000", the estimate stays open-ended at the top and says
 * so. If a price changes on the pricing page, it changes here in the same
 * commit — `check:routes` fails if the estimator and the pricing page drift.
 */

export type Need = {
  id: string;
  label: string;
  note: string;
  low: number;
  /** null = "from" pricing: scope decides the top, so we don't invent one. */
  high: number | null;
  /** paid for itself: honest note under the number */
  includedNote?: string;
};

export const NEEDS: Need[] = [
  {
    id: "audit",
    label: "Find out what's wrong",
    note: "A written audit of the site you already have",
    low: 35_000,
    high: 50_000,
    includedNote: "Credited against any build afterwards.",
  },
  {
    id: "rebuild",
    label: "A new or rebuilt website",
    note: "Audit first, then the build the evidence asks for",
    low: 150_000,
    high: 300_000,
  },
  {
    id: "catalog",
    label: "A catalog with orders",
    note: "RetailFlow — products, filters, WhatsApp ordering",
    low: 250_000,
    high: null,
  },
  {
    id: "booking",
    label: "Bookings & appointments",
    note: "BookingFlow — calendar, reminders, deposits",
    low: 200_000,
    high: null,
  },
  {
    id: "dashboard",
    label: "An internal tool",
    note: "Lead trackers, order logs, the back office",
    low: 300_000,
    high: null,
  },
];

/** Published tiers for the rebuild: 150k / 300k / 500k. */
export const SIZES = [
  { id: "starter", label: "5–8 pages", note: "One service line, one audience", low: 150_000, high: 150_000 },
  { id: "full", label: "8–12 pages", note: "Several services, more paths in", low: 300_000, high: 300_000 },
  { id: "flagship", label: "12+ pages or a system", note: "Multi-branch, multi-language, integrations", low: 500_000, high: 500_000 },
];

export type AddOn = {
  id: string;
  label: string;
  note: string;
  low: number;
  high: number;
  /** monthly rather than one-time */
  monthly?: boolean;
};

export const ADD_ONS: AddOn[] = [
  {
    id: "whatsapp",
    label: "WhatsApp order flow",
    note: "One tap from page to a pre-filled order",
    low: 80_000,
    high: 80_000,
  },
  {
    id: "pwa",
    label: "Installable app (PWA)",
    note: "Adds to the home screen, no app store",
    low: 60_000,
    high: 60_000,
  },
  {
    id: "local-seo",
    label: "Local SEO package",
    note: "Business profile, citations, near-me work",
    low: 40_000,
    high: 80_000,
  },
  {
    id: "calculator",
    label: "Quote calculator",
    note: "Turns browsers into qualified leads",
    low: 80_000,
    high: 150_000,
  },
  {
    id: "care",
    label: "Monthly care plan",
    note: "Hosting, updates, 48-hour small changes",
    low: 20_000,
    high: 25_000,
    monthly: true,
  },
];

export const pk = (n: number) =>
  `PKR ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(n)}`;

/** Formats a one-time range: exact, bounded, or open-ended. */
export function rangeLabel(low: number, high: number | null): string {
  if (high === null) return `from ${pk(low)}`;
  if (high === low) return pk(low);
  return `${pk(low)}–${pk(high).replace("PKR ", "")}`;
}
