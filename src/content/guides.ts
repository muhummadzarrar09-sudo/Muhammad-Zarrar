import type { Faq } from "./services";

/**
 * The Guides cluster.
 *
 * Each guide answers one question a buyer actually types, in the order they
 * type it: what it costs, why Google ignores them, whether a Facebook page is
 * enough, and how to check a site before paying anyone. The Field Notes are
 * evidence from audits; the Guides are the how-to. They cross-link, and the
 * FAQ hub links into them, so one question has one canonical deep page.
 *
 * Same rules as everything else: no invented clients, no fabricated
 * statistics, and no quoted price that isn't already published on /pricing.
 */

export type GuideSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  /** H1 — the question, verbatim where the query allows */
  h1: string;
  metaTitle: string;
  description: string;
  /** answer-first paragraph, for the reader in a hurry and the snippet */
  answer: string;
  updatedISO: string;
  updatedLabel: string;
  keywords: string[];
  sections: GuideSection[];
  table?: {
    caption: string;
    columns: string[];
    rows: string[][];
  };
  faqs: Faq[];
  related: { label: string; href: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "website-cost-pakistan",
    h1: "How much does a website cost in Pakistan?",
    metaTitle: "How Much Does a Website Cost in Pakistan? An Honest Answer",
    description:
      "Advertised website prices in Pakistan run from about PKR 20,000 to PKR 500,000+. What the quote leaves out, what three years actually costs, and the questions to ask before you transfer a deposit.",
    answer:
      "Advertised prices in Pakistan start around PKR 20,000 for a template and run past PKR 500,000 for a custom system. The number worth comparing is the three-year cost — build, plus hosting and domain, plus any mandatory monthly retainer, plus the odds of a rebuild. Our published ranges: an audit from PKR 35,000, a rebuild from PKR 150,000, a catalog system from PKR 250,000, a booking system from PKR 200,000, and an internal dashboard from PKR 300,000.",
    updatedISO: "2026-11-10",
    updatedLabel: "November 2026",
    keywords: [
      "website cost Pakistan",
      "website price Pakistan",
      "web design price Rawalpindi",
      "how much does a website cost",
    ],
    sections: [
      {
        heading: "What the market actually charges",
        body: [
          "Pakistan does not have a website price. It has a price for whatever work a particular provider is willing to do for that number. Advertised offers in late 2026 cluster into three bands: template or freelancer packages from roughly PKR 20,000; broader business builds advertised from about PKR 80,000 to PKR 250,000; and custom systems, catalogs and dashboards, quoted after scoping, from about PKR 250,000 upward.",
          "Those bands overlap because the words mean different things. \u201cFive pages\u201d can mean a purchased theme with your logo dropped into it, or it can mean planning, original design, writing support, testing on real devices, structured data and a month of aftercare. The price is not the product. The scope is.",
        ],
      },
      {
        heading: "Why two quotes for the same five pages differ tenfold",
        list: [
          "Who does the work — the person who pitched, or a junior who inherited it.",
          "Whether the words exist — copywriting is the most commonly excluded line item.",
          "Whether it is tested on a phone, on mobile data, on an old Android.",
          "Whether the pages are server-rendered, or painted by JavaScript after load.",
          "Whether the hosting and domain are in your name, or the vendor's.",
          "Whether there is a monthly retainer attached, and whether the site survives without it.",
          "Whether anything happens after launch, and who answers when it breaks.",
        ],
      },
      {
        heading: "The three-year number nobody quotes",
        body: [
          "Add the parts that never appear on the invoice: hosting and domain for three years, any mandatory retainer for three years, and the rebuild that usually lands inside that window when the site was built on borrowed machinery.",
          "Then add the inquiries that never arrived. A site that takes ten seconds on mobile data loses most of its visitors by second four. Those customers are real, they were never billed to anyone, and they are the largest line in the calculation.",
        ],
      },
      {
        heading: "What we publish, and why it's still only a range",
        body: [
          "Our prices are on the pricing page in PKR, as ranges, because scope varies. The audit is the exception: it is a fixed piece of work, so it has a fixed range, and its fee is credited against any build afterwards.",
          "The range becomes an exact written quote after the audit. That order is deliberate. A builder who quotes before reading your site is guessing, and you are the one who finds out how wrong the guess was.",
        ],
      },
      {
        heading: "What to ask before you transfer a deposit",
        list: [
          "What exactly is excluded? Get the list in writing.",
          "Who owns the domain, the hosting and the code — on day one, not on completion?",
          "Is there a mandatory monthly fee, and what breaks if I stop paying it?",
          "Can I take the code to another developer without asking you?",
          "Show me one site you built loading on mobile data, with the Wi-Fi off.",
          "What does the total come to over three years?",
        ],
      },
    ],
    table: {
      caption:
        "Advertised Pakistani market bands, late 2026. Ranges describe the market, not any named provider.",
      columns: ["", "Template / lowest", "Business build", "Custom system"],
      rows: [
        ["Advertised from", "≈ PKR 20,000", "≈ PKR 80,000–250,000", "≈ PKR 250,000+"],
        ["Who builds it", "Often one person", "A small team", "A team, scoped in writing"],
        ["Typical delivery", "Days to 2 weeks", "3–6 weeks", "6 weeks+"],
        ["On mobile data", "Often 5–10s", "Varies wildly", "Set as a target, tested"],
        ["You own the code", "If you ask", "Often the vendor", "Contractual"],
        ["Monthly fee", "Sometimes hidden", "Common for updates", "Optional by design"],
      ],
    },
    faqs: [
      {
        q: "Is PKR 20,000 too cheap for a website?",
        a: "It isn't a lie — it's a price for a much smaller scope than buyers assume. The risk is the attachments: a retainer you can't cancel, hosting in the vendor's name, and a rebuild owed within two years. Ask what the three-year total is before deciding it's cheap.",
      },
      {
        q: "Why are your prices higher than the ads?",
        a: "Because the work is different: an audit first, original design, testing on real devices, server-rendered pages, and a named person after launch. If your budget is under PKR 100,000, a good freelancer is the honest recommendation — we say so on the comparison page.",
      },
      {
        q: "Do I pay everything up front?",
        a: "No. 40–50% to start, the balance before launch, by bank transfer. You own the code, design and content on full payment.",
      },
      {
        q: "How long does a build take?",
        a: "Standard sites ship in about seven working days after the scope is signed, with daily progress on a private preview link. Larger systems are scoped with a date before work begins.",
      },
    ],
    related: [
      { label: "Every published price", href: "/pricing" },
      { label: "Compare freelancer, agency and studio", href: "/compare" },
      { label: "Field note: the cheapest website costs the most", href: "/notes/cheapest-website-costs-most" },
    ],
  },
  {
    slug: "website-not-on-google",
    h1: "Why isn't my website showing up on Google?",
    metaTitle: "Why Isn't My Website Showing Up on Google? A 10-Minute Diagnosis",
    description:
      "Not indexed, indexed but invisible, or the wrong system entirely. Four checks that tell you which problem you have — in about ten minutes, with no tools to install.",
    answer:
      "Three different failures get called the same thing: Google has not indexed the site, it has indexed it but ranks it too low to see, or the site is fine and the missing piece is the Google Business Profile. Start with one search — site:yourdomain.com. No results means nothing else matters until the site is indexed. Results but no traffic means you have a ranking problem, which is slower to fix and worth understanding before you spend anything.",
    updatedISO: "2026-11-10",
    updatedLabel: "November 2026",
    keywords: [
      "website not showing on Google",
      "site not indexed",
      "website not ranking Pakistan",
      "Google Business Profile",
    ],
    sections: [
      {
        heading: "Step 1 — the site: test",
        body: [
          "Search site:yourdomain.com. If nothing comes back, Google holds no copy of your pages and nothing else you do matters yet. If you get far fewer pages than you have, parts of the site are excluded.",
          "This one search separates a technical problem from a competition problem, which are fixed in completely different ways.",
        ],
      },
      {
        heading: "Step 2 — can Google read the page at all?",
        body: [
          "Right-click, view source, and search the raw HTML for a sentence you know is on the page. If it isn't there, it was never published — it was painted by JavaScript afterwards, and a crawler that doesn't run that JavaScript sees an empty shell.",
          "We have pulled the raw HTML of real business sites and counted zero words of content. They rank accordingly.",
        ],
        list: [
          "Words missing from the source → rendering problem, not an SEO problem.",
          "A noindex tag in the head → often left behind by a builder or a staging site.",
          "A robots.txt file blocking everything → usually a leftover from launch.",
          "The homepage indexable but service pages not → an internal-linking problem.",
        ],
      },
      {
        heading: "Step 3 — indexed but invisible",
        body: [
          "If site: returns pages, you are in the library. Ranking is a different question. A new domain can be indexed in days and still take months to rank, because position is earned with content depth, internal links, mentions elsewhere, and time.",
          "Check what you are actually competing with before assuming a technical fault. Search the phrase a customer would type, not your business name. If the first page is full of directories and marketplaces, that is your competition — and a website with one page about that service is not going to outrank a category page from a site with a thousand.",
        ],
      },
      {
        heading: "Step 4 — the map box is a different system",
        body: [
          "The map results above the blue links are driven by the Google Business Profile, not the website. Category, location, hours, reviews and consistency decide what appears there.",
          "A verified profile with the right primary category and the same phone number as the website can put you in front of buyers even while the site's rankings are still climbing. In Pakistan, for local service businesses, this is usually the faster win of the two.",
        ],
      },
      {
        heading: "What actually moves it, in order",
        list: [
          "Fix anything blocking the crawler: noindex, robots rules, broken server responses.",
          "Serve the words in the HTML so a crawler gets the page, not a promise of one.",
          "Give each service its own page with real content, instead of one long homepage.",
          "Link those pages from the homepage and from each other, with useful anchor text.",
          "Verify the Business Profile and make every listing match the site exactly.",
          "Then wait, publish, and stop changing the structure every month.",
        ],
      },
    ],
    table: {
      caption: "What you see, what it usually means, and the first thing to check.",
      columns: ["What you see", "What it usually means", "First check"],
      rows: [
        ["Nothing in a site: search", "Never indexed", "Is anything blocking the crawler?"],
        ["The site appears but pages are missing", "Partial indexing", "Internal links to those pages"],
        ["Indexed, but low for your own name", "Authority problem, not technical", "Consistency of name, phone, category"],
        ["Google shows the wrong title", "Templated or duplicated metadata", "Page title and H1"],
        ["No map results for your business", "Profile unverified or incomplete", "Google Business Profile"],
      ],
    },
    faqs: [
      {
        q: "How long does it take to show up on Google?",
        a: "Indexing can happen in days once the site is crawlable and a sitemap is submitted. Ranking for competitive phrases is a months-long effort with no finish line. Anyone promising a position by a date is guessing.",
      },
      {
        q: "Do I need to pay Google Ads to appear?",
        a: "No. Ads buy placement; they don't produce ranking. They're a reasonable tool when you need calls this week, and a bad substitute for a site Google can read.",
      },
      {
        q: "Can a Facebook page rank instead of a website?",
        a: "Pages are indexed but rarely outrank a real site for a business search, and they can't carry the service pages and structured data local search rewards. For anything competitive, no.",
      },
      {
        q: "Will fixing SEO bring customers immediately?",
        a: "Fixing a block can restore visibility in weeks. Winning a competitive term takes longer, and the fastest honest win for most local businesses is the Business Profile plus a readable site.",
      },
    ],
    related: [
      { label: "Field note: Google sees a blank page", href: "/notes/google-sees-a-blank-page" },
      { label: "The free five-point audit", href: "/free-audit" },
      { label: "Website Audit — what it covers", href: "/services/website-audit" },
    ],
  },
  {
    slug: "website-or-facebook-page",
    h1: "Do I need a website if I already have a Facebook page?",
    metaTitle: "Website or Facebook Page for Your Pakistani Business?",
    description:
      "What a Facebook page does well, what it can't do, and the ten-minute test that tells you whether you need a website yet — or whether the page is genuinely enough for now.",
    answer:
      "A Facebook page reaches people who are already inside Facebook. A website is what shows up when a stranger searches Google, works without an account or an app, and is the only piece of your presence nobody else can switch off. Most businesses eventually need both — but a page is not a substitute for a site, and for a very small business running entirely on referrals it can be enough for a while.",
    updatedISO: "2026-11-10",
    updatedLabel: "November 2026",
    keywords: [
      "website vs Facebook page",
      "do I need a website",
      "Facebook page for business Pakistan",
      "small business website",
    ],
    sections: [
      {
        heading: "What a page does well — honestly",
        body: [
          "It is free, it is instant, it reaches people who already follow you, and it lets customers message you without leaving the app they were already holding. For a business whose customers all come from word of mouth and repeat visits, that is a real, working presence.",
          "Pretending otherwise is how agencies sell websites nobody needed.",
        ],
      },
      {
        heading: "What it can't do",
        list: [
          "Rank on Google for what you sell, in the place you sell it.",
          "Be read without an account — some visitors hit a login wall and leave.",
          "Carry a proper service page, prices, structured data and a real enquiry form.",
          "Belong to you: the platform can restrict, downrank or remove it overnight.",
          "Look like yours — every competitor's page uses the same furniture.",
          "Survive a screenshot. A link to a page looks like a link to a page; a link to your site looks like a business.",
        ],
      },
      {
        heading: "The ten-minute test",
        body: [
          "Ask the last ten customers how they found you. If every answer is \u201csomeone told me\u201d, a page is probably enough for now, and a website is a growth decision rather than an emergency.",
          "Then open a private browser window and search the phrase a stranger would use — your service plus your area. If the first page shows directories, marketplaces and competitors with real sites, and you appear nowhere because you don't have one, the gap is already costing you jobs you never hear about.",
        ],
      },
      {
        heading: "The cheapest honest setup",
        body: [
          "You do not need a large build to fix this. You need four things in the same order: a Google Business Profile with the right category, a small site that loads fast on mobile data and states what you do, sell and charge, one WhatsApp number on every screen, and the same name, address and phone in all three places.",
          "That is a weekend of work and a reason to skip the twelve-page brochure nobody reads.",
        ],
      },
    ],
    table: {
      caption: "The same business, two surfaces.",
      columns: ["", "Facebook page", "Website"],
      rows: [
        ["Cost to run", "Free", "Small, ongoing"],
        ["Found by strangers on Google", "Very weak", "This is the job"],
        ["Needs an account to view", "Sometimes", "Never"],
        ["You own the design and data", "No — Meta does", "Yes"],
        ["Service pages and prices", "Awkward", "Yes"],
        ["Platform risk", "Restriction or removal", "None"],
        ["Speed to launch", "Minutes", "Days"],
      ],
    },
    faqs: [
      {
        q: "Can I just use my Facebook page as my website?",
        a: "You can link it as your only presence, but it isn't a substitute. Visitors may need an account, the platform can restrict or remove it, and it can't rank the way a site can.",
      },
      {
        q: "Is a page enough for a very small business?",
        a: "For a one-person business running entirely on referrals and repeat customers, it can be enough for a while. The moment a stranger tries to check you out before calling, the gap starts costing you.",
      },
      {
        q: "Do I still need Facebook if I have a website?",
        a: "Yes, and they should point at each other. Social creates the familiarity; the site is where the decision and the enquiry happen.",
      },
    ],
    related: [
      { label: "Field note: three numbers, one website", href: "/notes/three-numbers-one-website" },
      { label: "Audit your own site in 20 minutes", href: "/guides/audit-your-own-website" },
      { label: "What a rebuild costs", href: "/services/redesign" },
    ],
  },
  {
    slug: "audit-your-own-website",
    h1: "How to audit your own website in 20 minutes",
    metaTitle: "Audit Your Own Website in 20 Minutes — Four Tests",
    description:
      "Four tests any owner can run without a tool, an account or a developer: mobile data, view-source, a site: search, and the stranger's walk. What each failure usually means.",
    answer:
      "Four tests cover most of what a paid audit finds: load the site on mobile data with the Wi-Fi off, view the source and look for your own words, search site:yourdomain.com, and try to enquire the way a stranger would. Twenty minutes, no tools to install, and each failure maps to a real finding.",
    updatedISO: "2026-11-10",
    updatedLabel: "November 2026",
    keywords: [
      "website audit checklist",
      "check my website speed",
      "self audit website",
      "website health check",
    ],
    sections: [
      {
        heading: "Test 1 — the four-second test, on mobile data",
        body: [
          "Turn Wi-Fi off. Open your site on your phone. Start a stopwatch the moment you tap the link and stop it when you can read the first sentence, not when a loading bar appears.",
          "Over three seconds and you are losing a meaningful share of visitors before they read anything. Over eight and most of them are gone. Your office Wi-Fi will never show you this, which is exactly why the test has to be on data.",
        ],
      },
      {
        heading: "Test 2 — view source",
        body: [
          "On a desktop, right-click and choose View Page Source. Press Ctrl+F and search for a phrase you know is on the page — your opening sentence, a price, the city you serve.",
          "If your words aren't in the HTML, Google's crawler doesn't have them either. That is the whole difference between a website and an app nobody installed.",
        ],
      },
      {
        heading: "Test 3 — the site: search and the profile",
        body: [
          "Search site:yourdomain.com and count the pages. Then search the phrase a customer would use — \u201cbakery in Satellite Town\u201d, \u201cAC repair Rawalpindi\u201d — in a private window.",
          "Then check your Google Business Profile: verified, correct primary category, same phone number as the site, and recent photos. That profile drives the map results, which sit above everything else.",
        ],
      },
      {
        heading: "Test 4 — the stranger's walk",
        body: [
          "Try to buy from yourself. Find the price, tap the WhatsApp button, send the message, fill the form, call the number. On a phone, with one hand, in a hurry.",
          "Most sites fail here long before they fail on aesthetics: no price, a form to a dead inbox, a number that belongs to an old SIM. Those are the failures that cost money, and they are invisible from the owner's desk.",
        ],
      },
      {
        heading: "Scoring it",
        body: [
          "Log each test as pass or fail. One failure is a weekend of work. Two or more, or a fail on speed and a fail on source, is the point where a written audit pays for itself — because the fixes interact, and doing them in the wrong order wastes the budget.",
          "If you only want the top five findings rather than the full report, the free mini-audit does exactly that in 24 hours, at no cost and with no obligation.",
        ],
      },
    ],
    table: {
      caption: "The four tests and what a failure usually means.",
      columns: ["Test", "Pass looks like", "If it fails"],
      rows: [
        ["Mobile data load", "Readable in under 3 seconds", "Too many files, widgets or scripts"],
        ["View source", "Your words are in the HTML", "Client-side rendering — Google sees a shell"],
        ["site: search", "All your real pages appear", "Blocked, unindexed, or no sitemap"],
        ["Stranger's walk", "Price found, message sent, reply received", "A conversion path with a hole in it"],
      ],
    },
    faqs: [
      {
        q: "Do I need paid tools to audit a website?",
        a: "No. Mobile data, view-source and a site: search will find the failures that actually cost money. Paid tools are useful for depth, not for the first pass.",
      },
      {
        q: "How often should I run these tests?",
        a: "Monthly, and after anyone touches the site. Most regressions are introduced by an update, a plugin or a 'quick change', not by age.",
      },
      {
        q: "What does the free mini-audit add?",
        a: "Five points in writing within 24 hours — speed on mobile data, Google visibility, mobile experience, conversion path and security — with the evidence behind each one.",
      },
    ],
    related: [
      { label: "The free five-point audit", href: "/free-audit" },
      { label: "Field note: your homepage weighs seventy files", href: "/notes/homepage-weighs-70-files" },
      { label: "What an audit costs", href: "/pricing" },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function guideWordCount(guide: Guide): number {
  const text = [
    guide.h1,
    guide.answer,
    ...guide.sections.flatMap((section) => [
      section.heading,
      ...(section.body ?? []),
      ...(section.list ?? []),
    ]),
    ...guide.faqs.map((faq) => `${faq.q} ${faq.a}`),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function guideReadingMinutes(guide: Guide): number {
  return Math.max(1, Math.round(guideWordCount(guide) / 200));
}
