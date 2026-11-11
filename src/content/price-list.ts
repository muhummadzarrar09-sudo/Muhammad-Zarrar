import { ADDONS } from "./site-content";
import { SERVICES } from "./services";
import { SITE_URL } from "@/lib/site";

/**
 * The published price list — one machine-readable table for the page, the
 * JSON-LD and llms.txt.
 *
 * Every `display` string here must also appear verbatim on /pricing; the
 * route check asserts that, so this file can never quietly disagree with the
 * page a customer reads. Numbers are the same numbers the estimator uses.
 */

export const PRICE_UPDATED = { iso: "2026-11-10", label: "November 2026" };

export type PriceRow = {
  /** short label used in tables and schema */
  name: string;
  /** exactly as printed on /pricing */
  display: string;
  /** lowest number in the range, in PKR */
  low: number;
  /** highest number, or null when the service is open-ended ("from") */
  high: number | null;
  unit: "project" | "month";
  includes: string;
  href: string;
};

export const SERVICE_PRICES: PriceRow[] = [
  {
    name: "Website audit",
    display: "PKR 35,000–50,000",
    low: 35000,
    high: 50000,
    unit: "project",
    includes:
      "48-hour written report with evidence and a recorded walkthrough. Credited toward any build.",
    href: "/services/website-audit",
  },
  {
    name: "Custom build · 5–8 pages",
    display: "PKR 150,000",
    low: 150000,
    high: 150000,
    unit: "project",
    includes:
      "Audit-led rebuild or a new site: mobile-first, server-rendered, SEO fundamentals, WhatsApp flow.",
    href: "/services/redesign",
  },
  {
    name: "Custom build · 8–12 pages",
    display: "PKR 300,000",
    low: 300000,
    high: 300000,
    unit: "project",
    includes:
      "The same build with more pages, more sections and a content model you can extend.",
    href: "/services/redesign",
  },
  {
    name: "Custom build · 12+ pages",
    display: "PKR 500,000",
    low: 500000,
    high: 500000,
    unit: "project",
    includes:
      "Larger sites and custom modules — interactive calculators, multi-language, integrations.",
    href: "/services/redesign",
  },
  {
    name: "RetailFlow catalog system",
    display: "from PKR 250,000",
    low: 250000,
    high: null,
    unit: "project",
    includes:
      "Product catalog with categories, filters and search, WhatsApp ordering, and an admin dashboard.",
    href: "/services/retailflow",
  },
  {
    name: "BookingFlow appointment system",
    display: "from PKR 200,000",
    low: 200000,
    high: null,
    unit: "project",
    includes:
      "Self-service calendar, WhatsApp confirmations and reminders, optional deposits.",
    href: "/services/bookingflow",
  },
  {
    name: "Dashboards & internal tools",
    display: "from PKR 300,000",
    low: 300000,
    high: null,
    unit: "project",
    includes:
      "Lead trackers, order logs and ops tools shaped around how your team already works.",
    href: "/services/dashboards",
  },
];

export const ADDON_PRICES: PriceRow[] = ADDONS.map((addon) => {
  const numbers = [...addon.price.matchAll(/(\d[\d,]*)/g)].map((m) =>
    Number(m[1].replace(/,/g, "")),
  );
  return {
    name: addon.name,
    display: addon.price,
    low: numbers[0],
    high: numbers.length > 1 ? numbers[1] : null,
    unit: /\/month/.test(addon.price) ? ("month" as const) : ("project" as const),
    includes: addon.desc,
    href: "/pricing#addons",
  };
});

export const ALL_PRICES = [...SERVICE_PRICES, ...ADDON_PRICES];

/** Project work only — the care plan is monthly and would skew the band. */
export const PROJECT_PRICES = ALL_PRICES.filter((row) => row.unit === "project");

export const PRICE_BAND = {
  low: Math.min(...PROJECT_PRICES.map((row) => row.low)),
  high: Math.max(...SERVICE_PRICES.map((row) => row.high ?? row.low)),
};

/**
 * The one sentence an answer engine should quote when someone asks what a
 * custom website costs here. Written to stand alone, with the date attached.
 */
export const PRICE_ANSWER = `A fully custom website from this studio costs PKR 150,000 for 5–8 pages, PKR 300,000 for 8–12 pages, and PKR 500,000 for 12+ pages with custom modules. An audit is PKR 35,000–50,000 and is credited toward the build. These are published prices, verified ${PRICE_UPDATED.label}, not a "from" teaser.`;

/** OfferCatalog JSON-LD — the same table, in the vocabulary crawlers read. */
export function priceCatalogLd() {
  const offers = SERVICE_PRICES.map((row) => ({
    "@type": "Offer",
    name: row.name,
    url: `${SITE_URL}/pricing`,
    priceCurrency: "PKR",
    availability: "https://schema.org/InStock",
    itemOffered: { "@type": "Service", name: row.name, url: `${SITE_URL}${row.href}` },
    ...(row.high !== null && row.high !== row.low
      ? {
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: row.low,
            maxPrice: row.high,
            priceCurrency: "PKR",
          },
        }
      : { price: row.low }),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/pricing#custom-website`,
        name: "Custom website design and build",
        serviceType: "Website design and development",
        description: PRICE_ANSWER,
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: ["Islamabad", "Rawalpindi", "Pakistan"],
        url: `${SITE_URL}/pricing`,
        dateModified: PRICE_UPDATED.iso,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "PKR",
          lowPrice: PRICE_BAND.low,
          highPrice: PRICE_BAND.high,
          offerCount: SERVICE_PRICES.length,
          availability: "https://schema.org/InStock",
        },
        hasOfferCatalog: { "@id": `${SITE_URL}/pricing#catalog` },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/pricing#catalog`,
        name: `Published prices — Zarrar.Solutions (${PRICE_UPDATED.label})`,
        url: `${SITE_URL}/pricing`,
        dateModified: PRICE_UPDATED.iso,
        numberOfItems: offers.length,
        itemListElement: offers,
      },
    ],
  };
}

/** Every service page keeps its own Offer; this ties them to the catalog. */
export const CATALOG_ID = `${SITE_URL}/pricing#catalog`;

export const SERVICE_NAMES = SERVICES.map((service) => service.name);
