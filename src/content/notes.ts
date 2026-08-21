export type Note = {
  slug: string;
  title: string;
  date: string; // display
  dateISO: string;
  excerpt: string;
  sections: { heading: string; body: string[] }[];
  takeaway: string;
};

/* Voice rules: English only. Short sentences. Evidence over adjectives.
   Only real audit patterns and this site's own measurable reality —
   never invented clients or numbers. */
export const NOTES: Note[] = [
  {
    slug: "homepage-weighs-70-files",
    title: "Your homepage weighs seventy files",
    date: "August 18, 2026",
    dateISO: "2026-08-18",
    excerpt:
      "The site works fine on office Wi-Fi. Nobody's customer is on office Wi-Fi. A look at what page builders leave behind — and what a homepage should weigh.",
    sections: [
      {
        heading: "The symptom",
        body: [
          "\u201cThe site works fine on my Wi-Fi.\u201d It does. But the owner's Wi-Fi is not the customer's reality. Customers are on a 4G connection outside a shop in Saddar, on a phone three OS versions old, with twelve apps fighting for memory.",
          "That's the connection a homepage has to survive. Most don't.",
        ],
      },
      {
        heading: "The finding",
        body: [
          "In real audits we keep counting the same thing: 70+ files loading on a single homepage. Theme CSS. A page-builder runtime. Three font CDNs. A slider nobody slides. A chat widget for a chat nobody answers.",
          "On mobile data that stack takes 10+ seconds to show anything. Most visitors are gone by second four — we've watched it happen in the waterfall, request after request queued behind machinery the visitor never asked for.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "Delete the machinery. Server-render the page so the HTML arrives as the page, not as a promise of a page. Self-host two fonts. Ship one stylesheet. Zero trackers.",
          "For reference, the site you're reading right now does exactly that: roughly 100 kB of JavaScript total, every page real HTML on arrival. View it on your phone's data. That's the bar.",
        ],
      },
    ],
    takeaway: "Speed isn't a feature. On mobile data, speed is the front door.",
  },
  {
    slug: "google-sees-a-blank-page",
    title: "Google sees a blank page",
    date: "August 11, 2026",
    dateISO: "2026-08-11",
    excerpt:
      "\u201cWe have a website, but Google doesn't.\u201d If the site only renders in the browser, the crawler receives an empty shell. Here's the two-minute test.",
    sections: [
      {
        heading: "The symptom",
        body: [
          "\u201cWe have a website, but Google doesn't.\u201d Usually said after a year of sharing links and getting nothing back. The business is real. The reviews are real. The rankings are absent.",
        ],
      },
      {
        heading: "The finding",
        body: [
          "The site renders in the browser only. Everything — menu, prices, the about page, the words — is painted by JavaScript after the page loads.",
          "A crawler that doesn't run that JavaScript receives an empty shell. In audits we've pulled the raw HTML of sites like this and counted zero words of content. A div and a dream. It ranks accordingly: nowhere.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "Serve the words in the HTML. Server-rendered pages, one h1, real headings, structured data a machine can read.",
          "The cheap test: right-click, view source. The page should read like your business — menu, services, prices, city — not like a loading spinner. This page you're on passes the test. View-source it; the whole site is in the HTML.",
        ],
      },
    ],
    takeaway:
      "If a crawler can't read it, you don't have a webpage. You have an app nobody installed.",
  },
];

export function getNote(slug: string): Note | undefined {
  return NOTES.find((n) => n.slug === slug);
}
