# Requirements — Planned & Pending Items

Status board for everything approved but not yet shipped. When an item below
is built, move it to "Shipped" with the commit reference.

---

## 1. Field Notes (writing section) — SHIPPED 2026-08-21

Built per the spec below: `/notes` + `/notes/[slug]`, static, zero client JS,
Blog/BlogPosting JSON-LD, sitemap entries, `og-notes.png` social card,
footer link. Two posts live, written strictly from real audit patterns and
this site's own measurable reality — no invented clients or numbers.
New posts: add an entry to `src/content/notes.ts` and rebuild; routes,
sitemap, and schema generate automatically.

### Routes
- `/notes` — index page. Reverse-chronological list, no infinite scroll.
- `/notes/[slug]` — one post per route, fully static (SSG), SSR'd HTML.

### Architecture (matches house rules)
- Content lives in `src/content/notes.ts` as typed entries (slug, title,
  date, ~600–1200 words body paragraphs) — no markdown pipeline, no CMS,
  no third-party scripts.
- Server Components only. No client JS on note pages.
- Added to `src/app/sitemap.ts`; breadcrumb JSON-LD on both routes.
- JSON-LD: `Blog` + `BlogPosting` per note; `author` = Muhammad Zarrar;
  `publisher` = the sitewide Organization node.
- Per-note OG image: reuse `/og.png` or generate a variant via
  `scripts/generate-assets.mjs` if a note ever needs its own card.

### Voice & hard rules
- English only. Short sentences. Evidence over adjectives.
- **No invented clients, numbers, or outcomes.** Every figure published
  must come from a real audit the studio performed; anonymize the business
  but never the truth.
- No comments, no reactions, no share-count widgets. If a note earns a
  reply, it happens on WhatsApp — one number, like everything else.

### Post structure (template)
1. `The symptom` — what the owner was feeling ("nobody contacts us").
2. `The finding` — what the audit actually showed, with the number.
3. `The fix` — what was built/changed, and the after-number.
4. `The takeaway` — one sentence the reader can apply without us.

### Suggested first posts (from real audit patterns on the site)
- "The menu with no prices is costing you customers every day."
- "Your website loads in 10 seconds on the connection your customers use."
- "Google sees a blank page: the client-side rendering tax."

---

## 2. Domain swap — PENDING (owner action)

`SITE_URL` in `src/lib/site.ts` is currently
`https://zarrarsolutions.vercel.app`. When the domain is purchased
(candidate: `zarrarsolutions.com`):

1. Edit `SITE_URL` (one line) and rebuild.
2. Attach the domain in the hosting dashboard (Vercel now; Cloudflare Pages
   steps are in README if you migrate).
3. Verify: `curl -sI https://<domain>/sitemap.xml` returns 200 and canonical
   tags point at the new host.

## 3. Founder portrait — PENDING (owner action)

Drop `public/images/portrait.jpg` (min 720×860, portrait) and rebuild.
The About monogram card swaps to the photo automatically
(see `src/app/about/page.tsx`).

## 4. Real audit wins strip — ON HOLD

Owner confirmed no publishable before/after numbers yet. When 2–3 real,
anonymized results exist (e.g. "homepage 10.4s → 1.9s on 4G"), add a compact
"From real audits" proof strip on the home page above the findings section.
Never fabricate.

---

## 5. Field Notes v2 — SHIPPED 2026-11-10

Three new notes (missing prices, three numbers on one site, the website you're
still paying for) plus the publication layer: topic filters, search, reading
time, in-this-note contents, related notes, share row, `/feed.xml` RSS 2.0 and
`/llms.txt`. The two original posts each gained a "Check yours" section so the
archive is consistently actionable. Every post is server-rendered; search and
filters only narrow markup that is already on the page.

---

## 6. Per-note SEO identity — SHIPPED 2026-11-10

Every field note now has its own 1200×630 share card (headline capped at 4–5
words), its own 96×96 tab icon, an `article` OpenGraph block (published time,
section, tags), its own `BlogPosting.image`, and a hashtag set. Art direction
is `src/content/note-social.json`; `check:routes` fails if a note lacks a card
or an icon.

**Also fixed in this pass:** the OG pipeline was silently wrong twice over —
resvg cannot read woff2 (every card rendered in a system sans), and the option
was passed as `fontFiles` instead of `font.fontFiles`. Fonts are now committed
as TTF mirrors in `scripts/fonts/`, instanced at the weights the site uses.
A third bug: `check-contrast.mjs` and `motion/walk.ts` were still carrying the
superseded `#c4c3b6` palette.

## 7. FAQ hub — SHIPPED 2026-11-10

`/faq`: seventeen questions grouped into money & scope, Google & visibility,
speed & the build, and ownership & aftercare — drawn from the questions owners
actually post on r/smallbusiness, r/web_design, Quora and Google's "People also
ask", answered in the studio's own voice with `FAQPage` schema. Zero-JS
`<details>` accordions, so the answers are in the HTML and crawlable.

## 8. Motion economy — SHIPPED 2026-11-10

The opening converge pin was 2.2 screens and the manifesto 2.15 — between them,
over four screens of thumb-travel before the proof. Hero pin is now 1.35
(1.05 on phones), manifesto 160% (120% on phones). Timeline is scrubbed, so
nothing re-times; the visitor simply gets there sooner.

**Rejected on purpose:** turning the opening chevron into a full-screen
"loading screen". This site sells *"the HTML arrives as the page, not as a
promise of a page"* — a spinner that delays the first word contradicts the one
thing we audit other people's sites for. A branded intro belongs on route
transitions (already present), not in front of the LCP.

---

## 9. Competitive response — SHIPPED 2026-11-10

Research pass in `docs/COMPETITOR-NOTES.md`. The market's two hooks are
self-published "top software houses in [city]" listicles (usually with the
publisher first) and low price anchors (PKR 20,000 packages + retainers).

Shipped against both:

1. **Field note: "Seven questions before you hire a builder"** — opens by
   explaining the listicle trick, then gives seven questions that actually
   predict outcomes. The one move no competitor in this market can copy.
2. **Field note: "The cheapest website costs the most"** — reframes the
   PKR 20,000 anchor into a three-year total-cost number.
3. **`/compare`** — freelancer vs agency vs studio, including the rows where
   each is the wrong choice. No competitor publishes a table that undercuts
   its own column.

Deliberately **not** done: a self-ranked "top software houses" list, hourly
pricing, a "free website" offer, or any undisclosed ranking.

---

## 10. Cost estimator + directory pack — SHIPPED 2026-11-10

**Estimator** on `/pricing`: five needs, three sizes, five add-ons, live PKR
range. Every figure comes from `src/content/estimate.ts`, which mirrors the
published prices; `check:routes` now fails if the estimator or the pricing
page loses one of the five service prices. Default result is server-rendered.
The estimate is carried into the WhatsApp message so the first reply can be
specific.

**Directory pack** in `docs/DIRECTORY-LISTINGS.md`: four bio lengths, taglines,
category choices, pricing-field guidance, an honest portfolio table, and a
platform-by-platform checklist (Google Business Profile → Bing → GoodFirms →
DesignRush → Clutch → LinkedIn). Owner action, not code.

---

## 11. Guides cluster — SHIPPED 2026-11-10

Four long-answer pages under `/guides`, one per question that precedes a
WhatsApp message:

| Route | Query it owns |
|---|---|
| `/guides/website-cost-pakistan` | How much does a website cost in Pakistan? |
| `/guides/website-not-on-google` | Why isn't my website showing up on Google? |
| `/guides/website-or-facebook-page` | Do I need a website if I already have a Facebook page? |
| `/guides/audit-your-own-website` | How to audit your own website in 20 minutes |

Each page: answer-first `.guide-answer` block, 4–5 sections, a comparison or
price-band table where a table is genuinely clearer than prose, 3–4 FAQs with
`FAQPage` schema mirrored by the visible `<details>`, computed reading time,
and `related[]` links into Field Notes, `/pricing`, `/compare`, `/free-audit`
and the service pages. Plus `Article` + `FAQPage` + `BreadcrumbList` JSON-LD,
its own 1200×630 share card, and an entry in the sitemap, footer, `llms.txt`
and the FAQ hub's "The long answers" block.

The split is deliberate: **Field Notes are evidence, Guides are the how-to.**
The FAQ answers in a paragraph and routes to the guide. One question, one
canonical page — no two URLs competing for the same query.

Rule enforced in code: every price in a guide must already be published on
`/pricing`. `npm run check:routes` (now 30 direct routes) fails if a guide
loses its answer block, its share card, or has FAQ schema that disagrees with
the questions printed on the page.

---

## 12. SEO + answer-engine pass — SHIPPED 2026-11-10

Full write-up: `docs/SEO-AI-VISIBILITY.md`. New gate: `npm run audit:seo`
(`npm run check` runs build + routes + seo + contrast).

**Found on the first run:** 19 of 30 titles over 60 characters (brand suffix
was appended to every title, worst 91), 15 descriptions over 170, `/pricing`
published prices in prose only with no structured data, `llms.txt` stated no
prices, and the entity graph had no contact edges.

**Shipped:**

- `src/content/price-list.ts` — the published prices as one machine-readable
  table (7 project offers, 5 add-ons, band, the citable sentence) feeding the
  page, the JSON-LD and `llms.txt`.
- `/pricing` — question-shaped `<h2>`, a self-contained cost paragraph, a
  `<dl>` of every project price, a visible "verified November 2026" line, and
  `Service` + `OfferCatalog` + `AggregateOffer` (`35000`–`500000`, `PKR`).
  H1 changed to "What it costs, in writing." so the strongest heading carries
  the query noun. `check:routes` fails if the catalogue quotes a string the
  page does not show.
- `pageMeta()` — brand suffix only when the title stays ≤ 60 characters;
  descriptions clamped at 158. Every page rewritten to fit; `audit:seo` fails
  above those limits.
- Root JSON-LD — `WebSite` added; `Organization`/`ProfessionalService` gained
  `email`, `telephone`, `founder@id`, `areaServed`, `knowsAbout`, `slogan`,
  `currenciesAccepted`, `paymentAccepted`, `openingHours`.
- `llms.txt` — cost paragraph, full price list, add-ons, and a "How to cite
  this site" block (canonical sources, verification date, and an explicit
  "no rankings, no reviews, no invented clients" line).
- `robots` metadata sitewide: `max-snippet:-1, max-image-preview:large`.

**Second pass (same day):** breadcrumbs + page nodes + anchor text.

- `pageLd()` replaced `breadcrumbLd()`: one `@graph` of **WebPage +
  BreadcrumbList** per route, with `dateModified`, `isPartOf`, `publisher`,
  and `speakable` on `/`, `/pricing` and every guide. Notes and guides pass
  their own date. `/about` is an `AboutPage` plus a full `Person` node sharing
  the Organization's `@id`.
- `/brief` was the only route without a visible trail (it opens with a
  full-screen form); it now has a slim breadcrumb above the room. **29/29
  subpages** show one, **30/30** routes have a dated page node.
- FAQ questions on `/faq` and in guides are now `<h3>` inside `<summary>`
  rather than `<span>`: `h1 → h2 → question` is a real outline.
- `audit:seo` gained four gates: visible breadcrumb, `BreadcrumbList`, a
  `#webpage` node with `dateModified`, and FAQ-entry/heading parity. It also
  **fails on `aggregateRating` / `ratingValue` / `reviewCount`** — the
  no-fabricated-proof rule is now enforced in code, matching the new
  "Claims and proof" clause in the Terms.
- Contextual anchor text into `/pricing` and the cost guide from the home page,
  `/compare` and all five service pages (previously 96 of ~101 anchors to
  `/pricing` were just the word "Pricing" in nav and footer).
- Sitemap `lastModified` now comes from content dates (`CONTENT_UPDATED`,
  note/guide dates) instead of the build timestamp.

**Content split, deliberate:** `/pricing` answers *our* price;
`/guides/website-cost-pakistan` answers the *market* band; `/faq` gives the
paragraph and routes. One canonical passage per query.

Still blocked on the owner: domain swap (citations currently point at a
`vercel.app` host), Google Business Profile, and `sameAs` profiles — the schema
fields exist but there are no real URLs to point at, and inventing them would
be worse than omitting them.

---

## 13. Terms "Limitations" + blog plan — SHIPPED 2026-11-10

**Terms.** "What we're responsible for" and "Claims and proof" merged into a
single **Limitations** section: no guaranteed rankings or sales, no control
over third-party platforms, no invented proof (clients, counts, review scores,
self-ranked lists), every number checkable, and no liability for losses outside
the work. The honest disclosures live in one place instead of being scattered
through the page.

**Sitemap verified end to end:** 200, valid XML, root `<urlset>`, 30 entries,
one host, no `.html`, no trailing slashes, **30/30 resolve**, `lastmod` from
content dates. `check:routes` asserts this every build.

**`docs/BLOG-PLAN.md`** — the five questions worth a post, what to screenshot
from each SERP, the anatomy-extraction workflow (fetch top 3 → word count,
H2 outline, table?, FAQ?, schema, date, site type → find the gap → brief), the
post template, the cadence (one per 10–14 days), and the list of posts we will
not write because the Terms forbid them.

---

## Recommended next (in priority order)

Each of these is on-brand, static, and needs no new dependency. Ordered by
value per hour of work.

1. **Case studies / "before → after" proof** — still gated on real numbers
   (see §1). The single biggest trust asset missing from the site.
2. **A real audit-sample page** — a redacted, reproduced finding report.
   `/free-audit` already sketches one; a full specimen converts better than a
   promise.
3. **Guides → screenshot evidence** — the guides argue from code and reflect
   real audit patterns; two or three redacted screenshots per guide (a
   `site:` result, a view-source `<div id="root">`) would make the argument
   visible. Needs an image pipeline for figures first.
4. **Notes topics as their own routes** (`/notes/topic/speed`) — only when the
   archive passes ~12 notes. Below that, filters are enough and topic pages
   would be thin.
5. **Newsletter** — deliberately deferred. There is no backend by design, and
   RSS + WhatsApp covers the same job without a third party holding the list.
6. **Notes → service cross-links** — each note ends by pointing at the service
   that fixes it (audit vs redesign vs storefront), not just at the audit CTA.

---

## Shipped

- 2026-08-21 — Full site v1: 9 routes + 5 service pages, PWA, SEO suite,
  per-page OG cards, legal pages, care-plan SLA (48h small changes),
  bank-transfer payment term, WhatsApp + email wired.
- 2026-08-21 — Sprint 3: Field Notes live (/notes, 2 posts, BlogPosting
  schema), per-service OG cards (12 total), humans.txt, security headers
  for Vercel (vercel.json) and Cloudflare Pages (public/_headers).
- 2026-11-10 — Cost estimator on /pricing + directory listings pack
  (docs/DIRECTORY-LISTINGS.md) with a drift guard in check:routes.
- 2026-11-10 — Competitive response: `/compare`, two buyer-intent field
  notes, competitor teardown doc, pricing-page cross-link.
- 2026-11-10 — Field Notes v3: per-note share cards + tab icons (4–5 word
  headlines), `article` OG metadata, hashtags, `/faq` hub with FAQPage schema,
  palette documentation (`docs/PALETTE.md`) and a 1080×1350 palette card,
  contrast gate re-pointed at the live palette, OG font pipeline fixed
  (TTF mirrors + correct resvg options), motion pins trimmed.
- 2026-11-10 — Field Notes v2: 3 new posts + "Check yours" on both originals,
  topics + search, reading time/word count, in-this-note contents, related
  notes, share row, `/feed.xml`, `/llms.txt`, Notes in the primary nav,
  feed link in the footer, richer `BlogPosting` schema, and route-check
  guards for the feed, the index markup and llms.txt.
- 2026-11-10 — Guides cluster: 4 long-answer pages with answer-first
  blocks, 3–4 FAQs each (`FAQPage` per guide), per-guide share cards,
  `Article` + breadcrumb schema, FAQ-hub cross-links. `check:routes` → 30
  routes and now asserts guide answer block / card / FAQ parity.
- 2026-11-10 — SEO + answer-engine pass: price catalogue with
  `OfferCatalog`/`AggregateOffer`, citable cost answer on `/pricing`, titles
  ≤ 60 and descriptions ≤ 158 sitewide via `pageMeta()`, `WebSite` + richer
  entity graph, `llms.txt` price list + citation block, `max-snippet:-1`, and
  a new `npm run audit:seo` gate. See `docs/SEO-AI-VISIBILITY.md`.
- 2026-11-10 — Breadcrumbs + GEO/AEO second pass: `pageLd()` WebPage +
  BreadcrumbList graph on all 30 routes, `/brief` trail, FAQ questions as
  headings, contextual price anchors, honest sitemap `lastmod`, and audit
  gates for breadcrumbs, page nodes, FAQ parity and fabricated ratings.
- 2026-11-10 — Terms consolidated under **Limitations**; sitemap
  verified (30/30 resolve, valid XML, honest lastmod); `docs/BLOG-PLAN.md`
  with the next five questions, the SERP-screenshot workflow and the
  will-not-write list.
