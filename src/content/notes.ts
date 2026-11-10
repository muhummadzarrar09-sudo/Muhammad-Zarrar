export const TOPICS = [
  { id: "conversion", label: "Conversion" },
  { id: "speed", label: "Speed" },
  { id: "visibility", label: "Visibility" },
  { id: "trust", label: "Trust" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export type Figure = "waterfall" | "render" | "price-gap";

export type Note = {
  slug: string;
  title: string;
  date: string; // display
  dateISO: string;
  excerpt: string;
  topics: TopicId[];
  /** Social tags for the note — one unique per post, three standing. */
  hashtags: string[];
  sections: { heading: string; body: string[] }[];
  takeaway: string;
  figure?: Figure;
};

/* Voice rules: English only. Short sentences. Evidence over adjectives.
   Only real audit patterns and this site's own measurable reality —
   never invented clients or numbers. Newest first: the index, the RSS
   feed, the sitemap and the "keep reading" chain all read this order. */
export const NOTES: Note[] = [
  {
    slug: "menu-with-no-prices",
    hashtags: ["#YourMenuHasNoPrices", "#ShowYourPrices", "#PakistanBusiness", "#WebsiteAudit"],
    figure: "price-gap",
    topics: ["conversion"],
    title: "Your menu has no prices",
    date: "October 30, 2026",
    dateISO: "2026-10-30",
    excerpt:
      "The most-asked question in a business inbox is the one the website could answer in a glance. What a missing price actually costs — and the version that works.",
    sections: [
      {
        heading: "The symptom",
        body: [
          "\u201cPrice?\u201d Same message, forty times a week. The owner answers each one and reads it as interest. It isn't. It's the same customer, forty times over, being made to ask.",
          "A menu with no prices doesn't feel secretive from the inside. It feels polite. Nobody wants to scare a customer off with a number, so the number waits for a conversation. Meanwhile the customer is on a phone, in a hurry, with three other tabs open.",
        ],
      },
      {
        heading: "The finding",
        body: [
          "Most customers who can't find a price don't ask. They open the next tab — the competitor who printed the number. The few who do message you spend a message, a wait, and a small act of hope before they know whether they can afford you. A one-second scan became a negotiation with an unknown response time.",
          "In audits this isn't one business. It's a pattern. The catalogue is complete. The photos are good. The prices are missing or replaced with \u201cDM for price\u201d. The same business is usually wondering why inquiries don't turn into orders.",
          "There's a second cost, quieter. A customer comparing three suppliers on a phone screen has to message all three to compare. Two of them answer tomorrow. The one who printed a range is already the front-runner, because they're the only one who answered instantly — and they didn't even have to read the message.",
          "On a phone, the price is the page. Everything above it is preamble.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "Publish a range, not a secret. \u201cRs 4,500\u20136,000 depending on size\u201d answers the real question and keeps the quote honest. Then say what moves the number inside that range — size, quantity, delivery, timeline. The customer can place themselves on the scale before they message you.",
          "Change what the message is for. A pre-filled WhatsApp link next to the item names the item for them, so the first question becomes \u201cis Saturday available?\u201d instead of \u201chow much?\u201d. One is a booking. The other is an interview.",
          "If the price genuinely can't be published — custom work, quoted per project — say why, and say how fast the answer comes. \u201cEvery job is quoted within 24 hours; send this and you'll have a number tomorrow\u201d is still an answer. Silence isn't.",
          "Then keep it true. A price list that was right in 2023 is a different lie. Put a date under it — \u201cprices updated January 2026\u201d — and give one person the job of changing it when costs change. A range that moves with the market keeps the trust a fake fixed price loses.",
        ],
      },
      {
        heading: "Check yours",
        body: [
          "Open your site on a phone, in a private tab, as a stranger would. Find one product or service and count the taps it takes to reach a number. If the answer is a message box, you've found the gap.",
          "Then write down the five things customers ask about most. Not everything — five. Give each one a range and the one thing that moves it. Publish that list today, in plain text, on the page where people look for it. You don't need a design project for this. You need a paragraph.",
        ],
      },
    ],
    takeaway:
      "A missing price isn't a conversation starter. It's a reason to open the next tab.",
  },
  {
    slug: "three-numbers-one-website",
    hashtags: ["#OneNumber", "#WhatsAppBusiness", "#PakistanBusiness", "#WebsiteAudit"],
    topics: ["conversion", "trust"],
    title: "Three numbers, one website",
    date: "October 16, 2026",
    dateISO: "2026-10-16",
    excerpt:
      "Three different numbers across a single site. Whichever one the customer picked was a coin toss — and half the tosses landed in a phone nobody checks.",
    sections: [
      {
        heading: "The symptom",
        body: [
          "\u201cPeople say they messaged us and we never replied.\u201d The messages are real. So is the silence. The owner assumes the customer is mistaken, or impatient, or lying. Usually the site is the one at fault.",
        ],
      },
      {
        heading: "The finding",
        body: [
          "In audits we keep counting the same thing: three numbers on one website. One in the header. A different one on the contact page. A third left behind in an old post, a footer, or a photo of a business card.",
          "One belongs to the owner. One to a designer who left two years ago. One to a SIM in a drawer. The customer doesn't know any of that. They tap whichever number is nearest their thumb, and the site treats a coin toss as a reply.",
          "Sometimes the number is baked into an image. A phone can't tap a picture. The visitor copies eleven digits by hand, which is where most of them stop.",
          "And the timing matters. Messages arrive in the evening, after work, when the shop is shut. An unanswered message at 9pm doesn't wait for morning — it becomes a call to whoever answers. The competitor's reply at 9:04 isn't better work. It's the same work, answered.",
          "The reply rate was never a mystery. It's arithmetic. Wrong door, no answer.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "One number, in one place, that every button on the site reads from. Tap-to-call on mobile, a wa.me link with the message already written, and the same number on every page — because a customer who finds two numbers believes neither.",
          "Then match the rest of the internet to it: the Google Business Profile, the Facebook page, the old cards in the drawer. Where you can't change a number, forward it. Where you can't forward it, put an auto-reply on it that names the new one.",
          "Write the auto-reply, too. A number that answers with a name and a time beats a number that answers with nothing: \u201cThis is Zarrar.Solutions — we reply within the hour between 9am and 9pm.\u201d The customer learns two things at once: someone is there, and how long to wait.",
          "Test it the way a stranger would. Open the site on a phone, tap the number, send the message, and check the phone that receives it is in the room with you.",
        ],
      },
      {
        heading: "Check yours",
        body: [
          "Search your own site for the first four digits of every number you've ever used. Count the hits. Then call each one from a phone that isn't yours and see what answers.",
          "Open the Google Business Profile, the Facebook page, and the site side by side. If the numbers disagree, the customer is being asked to guess. Fix the site first — it's the one you control — then the listings, then the old cards as they surface.",
        ],
      },
    ],
    takeaway:
      "Every extra number is another chance to lose a customer you already had.",
  },
  {
    slug: "paying-for-a-dark-website",
    hashtags: ["#DeadWebsite", "#DomainRenewal", "#PakistanBusiness", "#WebsiteAudit"],
    topics: ["trust"],
    title: "The website you're still paying for",
    date: "September 29, 2026",
    dateISO: "2026-09-29",
    excerpt:
      "Suspended hosting, an expired domain, and months of invoices for a site nobody could open. The cheapest finding in an audit — and the easiest to miss.",
    sections: [
      {
        heading: "The symptom",
        body: [
          "\u201cWe're getting the site updated.\u201d The owner has said this for months. The invoices keep arriving, so the site must be fine. It isn't.",
        ],
      },
      {
        heading: "The finding",
        body: [
          "The domain lapsed, or the hosting was suspended, or a vendor migrated the site and never moved the DNS. What the visitor gets is a parking page, an error, or a \u201crenew your hosting\u201d screen in a language nobody in the office reads.",
          "The email on that domain dies with it. So do the reports being sent to it — which is how a dead site stays dead for a year without anyone noticing.",
          "It gets worse quietly. A lapsed domain gets re-registered within days. It can come back wearing ads, or wearing a competitor's name. The business still has the old address printed on everything it owns.",
          "And a visitor doesn't read a dead site as a technical fault. They read it as a closed business. Nobody calls to check. They simply stop calling.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "Three checks, once a month, five minutes. The domain: in the registrar's own panel, not a vendor's. The hosting: its renewal date. The certificate: still valid and still for your domain.",
          "Then put a calendar reminder thirty days before each date — on your calendar, not the vendor's. Thirty days is enough time to renew, move, or argue. The day after expiry is enough time for none of that.",
          "Keep the logins. If a vendor holds the domain, ask for the transfer code now, while everyone is still friendly. The domain is your business's name. Not a line item on somebody else's account.",
          "Then check the site the way a customer would, once a month: open it on a phone, on mobile data, and see it load. It takes eleven seconds. It's the cheapest insurance this business will ever buy.",
        ],
      },
      {
        heading: "Check yours",
        body: [
          "Turn off Wi-Fi and open your own address on a phone. Not the admin panel, not the preview link — the address that's printed on the card. If it loads, note the certificate warning, if any, and when the domain renews.",
          "If it doesn't load, you're not looking at a redesign. You're looking at a renewal, a DNS record, or a five-minute call to a registrar. Start there. A rebuild can wait until the front door opens again.",
        ],
      },
    ],
    takeaway:
      "The most expensive website is the one you pay for every month and nobody can open.",
  },
  {
    slug: "homepage-weighs-70-files",
    hashtags: ["#PageSpeed", "#MobileData", "#PakistanBusiness", "#WebsiteAudit"],
    figure: "waterfall",
    topics: ["speed"],
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
      {
        heading: "Check yours",
        body: [
          "Open your site in a desktop browser and turn on the network panel. Set the throttling to Slow 4G, disable the cache, and reload. Count the requests and watch the clock in the corner.",
          "The number to look at isn't the file size. It's how long the page is blank. Everything before the first word appears is machinery — and on a customer's phone, that's the only part they experience.",
          "Repeat it on a phone on mobile data, with the cache off. That's the test your customer runs every time, without knowing they're running it.",
        ],
      },
    ],
    takeaway: "Speed isn't a feature. On mobile data, speed is the front door.",
  },
  {
    slug: "google-sees-a-blank-page",
    hashtags: ["#GoogleIndexing", "#ViewSource", "#PakistanBusiness", "#WebsiteAudit"],
    figure: "render",
    topics: ["visibility"],
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
      {
        heading: "Check yours",
        body: [
          "Right-click, view source, and search the raw HTML for one sentence you know is on the page. If you can't find it, neither can the crawler.",
          "Then disable JavaScript in the browser and reload. A site built properly still shows its words. A site built the other way shows an empty box — and a year of shared links that went nowhere.",
          "This costs nothing and settles the argument. Either your words are in the HTML, or they were never really published.",
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

/** Every word we publish in the note, used for reading time + schema. */
export function noteWordCount(note: Note): number {
  const text = [
    note.title,
    note.excerpt,
    note.takeaway,
    ...note.sections.flatMap((section) => [section.heading, ...section.body]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Rounded at 200 words per minute — the standard adult reading figure. */
export function readingMinutes(note: Note): number {
  return Math.max(1, Math.round(noteWordCount(note) / 200));
}

export function topicLabel(id: TopicId): string {
  return TOPICS.find((topic) => topic.id === id)?.label ?? id;
}

/** Stable in-page anchor for a section heading. */
export function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Related notes: shared topics first, then recency. Never the note itself,
 * never a filler — one honest post beats three padding ones.
 */
export function relatedNotes(note: Note, limit = 2): Note[] {
  const scored = NOTES.filter((n) => n.slug !== note.slug)
    .map((n) => ({
      note: n,
      shared: n.topics.filter((t) => note.topics.includes(t)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.note.dateISO.localeCompare(a.note.dateISO));

  return scored.slice(0, limit).map((entry) => entry.note);
}

/** Notes carrying a topic, newest first (the order NOTES is already in). */
export function notesWithTopic(id: TopicId): Note[] {
  return NOTES.filter((note) => note.topics.includes(id));
}
