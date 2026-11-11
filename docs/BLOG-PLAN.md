# Blog plan — the next five posts, and how each one gets written

Written 2026-11-10, after the guides cluster and the SEO/GEO/AEO pass.

The site already owns four **guide** queries (cost, not-on-Google, Facebook
page vs website, self-audit). The blog is not a second copy of those. Each post
below starts from a question the guides *raise* but don't answer, and every
post must link back into `/pricing`, `/guides` and `/free-audit`.

---

## 0. Sitemap check — 2026-11-10

Asked directly, so recorded here.

| Check | Result |
|---|---|
| `GET /sitemap.xml` | 200, `application/xml`, 5,470 bytes |
| XML validity | parses; root `<urlset>`, 30 `<url>` entries |
| Hosts | exactly one (`zarrarsolutions.vercel.app`) — no mixed canonicals |
| Extensionless | no `.html`, no trailing slashes, no `/breif` |
| Every URL resolves | **30/30 return 200** through the preview server |
| `lastmod` | content dates, not the build clock (2026-08-11 → 2026-11-10) |
| `robots.txt` | points at the sitemap; nothing blocked |

`npm run check:routes` asserts all of this on every build, so it cannot rot
silently.

---

## 1. The five questions to search

Search each one **logged out, location set to Pakistan, in an incognito
window** — personalisation will otherwise show you your own history rather than
the real SERP. Screenshot the whole viewport, not just the results list:
the AI Overview / featured answer at the top is the part I need most.

### 1 — "website maintenance cost in Pakistan per month"

**Why this one:** the guides answer what a build costs and never answer what
keeping it alive costs. It is the question that follows the invoice, it has
commercial intent, and the care plan (PKR 20,000–25,000/month) is priced
*above* most of what's published — which is a story, not an apology.

**What today's recon shows:** existing pages quote PKR 2,000–10,000,
5,000–25,000 and 10,000–50,000 per month, mostly undated 2025 content, with no
explanation of what the money buys. Nobody defines the difference between
"hosting and updates" and "someone who answers in 48 hours".

**What to screenshot:** AI Overview (if any), top 3 organic, "People also ask",
and whether Reddit/Quora appear.

---

### 2 — "business not showing on Google Maps Pakistan" (also try "Google Business Profile verification postcard Pakistan")

**Why this one:** it is the highest-intent local query in the set, it maps
exactly onto the owner action still sitting in the README, and the Pakistani
specifics are real: no postcodes, landmark addresses, postcard verification
that never arrives, suspended profiles.

**What today's recon shows:** two Pakistani-targeted posts exist, one dated
29 October 2026 and one 9 November 2026 — fresh, so the topic is live and
being actively contested. Both are broad "why is my business not showing".
Nobody owns the narrow step-by-step for *verification in Pakistan*.

**What to screenshot:** whether an AI Overview appears, the freshness of each
result, and whether the top results are agencies or directories.

---

### 3 — "how long does it take to build a website in Pakistan"

**Why this one:** timing is the second question after price, and the market
sells "7 days". We publish 3–6 weeks. A post that explains *why* the honest
number is longer — and what a 7-day build actually skips — differentiates
without insulting anyone.

**What today's recon shows:** generic, mostly non-Pakistani timelines
(2–4 weeks, 1–2 months) with tables. One page is from 2022 and still ranking,
which means the freshness bar is low and the local angle is wide open.

**What to screenshot:** top 3, their published timeline numbers, and the dates.

---

### 4 — "why is my website slow on mobile data"

**Why this one:** our field notes already contain the measured version of this
(homepage with 70 files, a site that renders client-side). The differentiator
is method: turn Wi-Fi off, throttle, look at what actually blocks.

**What today's recon shows:** crowded and generic — every result says "images
and plugins". All of them are interchangeable, none gives an owner a test they
can run in two minutes on a phone in Rawalpindi.

**What to screenshot:** AI Overview wording, "People also ask", and whether any
result shows real measurements.

---

### 5 — "online store cost in Pakistan" (ecommerce website cost)

**Why this one:** the most commercial query of the five. RetailFlow starts at
PKR 250,000 and nobody who is comparing "PKR 15,000 online store" packages is
going to buy it — but the post can explain what changes at each price, honestly.

**What today's recon shows:** the cost guides in this market recycle the same
"PKR 15,000 to 500,000+" table with no working definition of an online store
versus a catalog with a WhatsApp order flow — which is exactly the distinction
this studio sells.

**What to screenshot:** the AI Overview, whether Pakistani or foreign results
dominate, and any price tables.

---

### The one I left out (and why)

**"WordPress vs custom website."** Great intent, but the honest answer is
"WordPress for most small businesses" — several strong posts already say
exactly that. We would be writing into a crowded SERP to recommend against
ourselves. Better used as a **section inside post #1 or #5** than as its own
page.

---

## 2. What I do with your screenshots

For each question, in order:

1. **Fetch the top three URLs.** Read the whole page, not the snippet.
2. **Extract the anatomy:** word count, H2 outline, whether it has a table, a
   FAQ block, schema types, publish/update date, and what kind of site it is
   (agency / directory / content farm).
3. **Find the gap.** In this market it is almost always one of: no prices, no
   dates, no local specifics, no worked example, or an answer buried under
   900 words of introduction.
4. **Write the brief:** target query cluster, the answer-first paragraph
   (40–60 words), the H2 outline as questions, the table we can win on, the
   FAQ set for `FAQPage`, and the internal links.
5. **Then write the post** in the house voice — English, short sentences,
   evidence over adjectives — and run the same gates as every other page.

## 3. What every post ships with

- Answer-first block under a question-shaped `h2` (the `.guide-answer`
  pattern), then the long version.
- One table somewhere, because tables are what engines quote.
- 3–4 FAQs with `FAQPage` schema mirrored by visible `<h3>` questions.
- `pageLd()` WebPage + breadcrumb, dated with the post's own date.
- Title ≤ 60 characters, description ≤ 158 (enforced by `audit:seo`).
- A 1200×630 share card in `src/content/note-social.json` style.
- Links: at least one to `/pricing`, one to a guide, one to `/free-audit`.
- An entry in the sitemap, the feed, `llms.txt` and the notes index.

## 4. What we will not write

These are ruled out by the Terms ("Claims and proof") and would be enforced by
the build even if I forgot:

- "Top 10 web design companies in Pakistan" — a self-ranked list is exactly
  what the Terms forbid.
- Anything with invented project counts, client names, or results.
- "We tested 47 Pakistani websites" unless we actually do it and keep the
  spreadsheet.
- Review/rating markup, ever.
- Posts that exist only to hold a keyword and link to `/pricing`. If it does
  not answer the question, it does not ship.

## 5. Cadence

One post every **10–14 days**, each updated in place when the numbers move.
Three posts that stay current beat twelve that rot — and `lastmod` now means
something, so a stale page is visible as stale.

## 6. Honest expectation

None of this outranks a directory on a head term like "web development
Pakistan". The winnable ground is **specific + local + priced + dated**, which
is what these five questions are. "SEO score" in a plugin is a checklist, not a
ranking; the things that actually move here are the answer block, the table,
the date, and the internal links.
