import type { Faq } from "./services";

/**
 * The FAQ hub.
 *
 * Every question here is one that business owners actually ask — on Reddit
 * (r/smallbusiness, r/web_design), on Quora, in Google's "People also ask",
 * and, most often, in this studio's own WhatsApp. The answers are the same
 * answers given on a call: plain, specific, and free of invented numbers.
 *
 * Rules: no fabricated statistics, no invented clients, no promises about
 * rankings. Where a range is quoted it matches /pricing exactly.
 */

export type FaqGroup = {
  id: string;
  no: string;
  title: string;
  note: string;
  items: Faq[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "money",
    no: "01",
    title: "Money & scope",
    note: "What things cost, and why quotes differ",
    items: [
      {
        q: "How much should a website cost in Pakistan?",
        a: "There is no single honest number, because \u201ca website\u201d is not one product. A five-page site can be a theme with your logo dropped in, or it can be planning, original design, writing support, testing on real devices and a month of aftercare. Here, the published ranges are: an audit from PKR 35,000, a rebuild from PKR 150,000, a catalog system from PKR 250,000, a booking system from PKR 200,000, and an internal dashboard from PKR 300,000. Those are ranges until an audit says what you actually need — after that you get an exact figure in writing.",
      },
      {
        q: "One quote is PKR 40,000 and another is PKR 400,000. Why?",
        a: "Same page count, different work. The cheap quote is usually a template with supplied text and a phone number in the footer. The expensive one usually includes research, original design, copy support, device testing, structured data, and someone accountable after launch. Neither price is automatically right. Ask each side what is excluded, and the gap stops being mysterious.",
      },
      {
        q: "What should be in a written quote before I sign?",
        a: "Seven things: the page or feature list, who writes the words, how many revision rounds, which devices and browsers get tested, who owns the domain, hosting and code, what happens in the first month after launch, and the payment schedule. If a quote cannot answer those, it is a number, not a plan.",
      },
      {
        q: "How does payment work?",
        a: "40\u201350% deposit to start, the balance before launch. Bank transfer; account details arrive with the signed scope. You own the code, design and content on full payment — no rented theme, no hostage hosting. If the scope changes mid-build, the price changes in writing first, not after.",
      },
    ],
  },
  {
    id: "google",
    no: "02",
    title: "Google & visibility",
    note: "Indexed, ranked, or simply invisible",
    items: [
      {
        q: "Why doesn't my website show up on Google?",
        a: "Three different failures get called the same thing. Either Google has not indexed the site, or it has indexed it and ranks it below the fold, or the site is fine and the missing piece is the Google Business Profile. The ten-second test is to search site:yourdomain.com. No results means nothing else matters until the site is indexed. Results but no traffic means you have a ranking problem, which is a slower fight.",
      },
      {
        q: "Google indexed my site but I still don't appear for my own name. Why?",
        a: "Indexing puts you in the library; ranking decides where you sit on the shelf. A new domain can be indexed in days and still take months to rank, because ranking is earned with content depth, internal links, mentions elsewhere, and time. Anyone promising a position by a date is guessing — or selling something.",
      },
      {
        q: "Google shows nothing when it visits my site. How is that possible?",
        a: "If the page is painted by JavaScript after it loads, the crawler that does not run that JavaScript receives an empty shell. In audits we have pulled the raw HTML of sites like this and counted zero words. The test: right-click, view source, and search for a sentence you know is on the page. If it isn't in the HTML, it isn't published.",
      },
      {
        q: "Do I need a Google Business Profile as well as a website?",
        a: "They answer different searches. The map box is driven by the Business Profile: category, location, hours, reviews. The blue links are driven by the website. Most local businesses need both, and they must agree — the same phone number, the same address, the same hours. A profile that contradicts the website is a signal to Google that neither can be trusted.",
      },
      {
        q: "How long until SEO works?",
        a: "Faster for a fix, slower for a climb. Removing an accidental noindex or serving real HTML can move things in weeks. Building authority on a competitive term is a months-long effort with no finish line. We report what changed and what it did; we don't sell a ranking guarantee, because nobody can.",
      },
    ],
  },
  {
    id: "build",
    no: "03",
    title: "Speed & the build",
    note: "Why it feels slow, and what to rebuild",
    items: [
      {
        q: "My site is fast on Wi-Fi and unusable on mobile data. Why?",
        a: "Because your Wi-Fi is not the customer's connection. Page builders ship a theme stylesheet, a runtime, three font CDNs, a slider and a chat widget — seventy-odd files before the first word appears. On 4G outside a shop, that stack takes ten seconds. The number to watch is not the file size, it is how long the page is blank.",
      },
      {
        q: "Do I need a redesign, or just fixes?",
        a: "That is exactly what the audit is for, and the honest answer is sometimes \u201cneither — renew your domain\u201d. A site with good content and bad plumbing gets fixed, not rebuilt. A site built on pirated plugins with no HTML in the source gets rebuilt. Paying for a redesign without a diagnosis is how businesses pay twice for the same mistake.",
      },
      {
        q: "WordPress or custom?",
        a: "WordPress is not the problem. Unmaintained WordPress is. If you are going to update plugins and pay attention, a well-built WordPress site is fine. If nobody in the business will ever touch it, a static site removes the attack surface and the monthly surprises. We build the second kind, and we will tell you when the first kind is the better call.",
      },
      {
        q: "How long does a build take?",
        a: "Standard sites ship in about seven working days after the scope is signed. You watch it happen on a private preview link, with feedback worked in as we go — no big reveal at the end. Larger systems (catalogs, booking, dashboards) are scoped in writing with a date before work starts.",
      },
    ],
  },
  {
    id: "ownership",
    no: "04",
    title: "Ownership, safety & aftercare",
    note: "Who holds the keys",
    items: [
      {
        q: "Who owns the website when it's finished?",
        a: "You do — code, design, content, domain and hosting, on full payment. The domain goes in your name, the hosting is yours, and the code is exportable. If you ever want to leave, you take everything with you. That is a rule here, not a courtesy.",
      },
      {
        q: "Can you fix a site someone else built?",
        a: "Yes, and it is most of what we do. The audit works on any stack — we read the source, test on real mobile data, and check what Google receives. If the existing site is salvageable we say so, because a rebuild you don't need is the most expensive thing we could sell you.",
      },
      {
        q: "What happens after launch?",
        a: "The first month is included: fixes, small changes, and a plain-language note on what we changed and why. After that, a monthly care plan covers hosting, updates, and small changes within 48 hours. No plan is fine too — the site is yours, and it keeps running.",
      },
      {
        q: "What if I just have questions and no budget yet?",
        a: "Send them. The free five-point mini-audit answers most of them in 24 hours with no obligation, and a WhatsApp message costs nothing. We would rather tell you your site is fine than sell you a rebuild.",
      },
    ],
  },
];

/** Flat list for FAQPage structured data. */
export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((group) => group.items);
