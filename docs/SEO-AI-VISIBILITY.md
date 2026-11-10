# SEO & answer-engine visibility — audit, 2026-11-10

The goal this round was narrow: when somebody asks **"how much does a custom
website actually cost in Pakistan?"** — on Google, in an AI Overview, in
ChatGPT or in Perplexity — this site should be quotable, and the number quoted
should be the number we actually charge.

That is not a keyword problem. It is a **machine-readability** problem: an
answer engine cites passages it can extract cleanly, attribute to a source,
and date. So the audit below is about extractability, not word counts.

---

## 1. How to re-run it

```bash
npm run build          # export the site to out/
npm run audit:seo      # the audit (warnings + failures)
npm run check:routes   # hard gate: routes, canonicals, schema parity, prices
npm run check:contrast # hard gate: colour contrast
npm run check          # all four, in order
```

`scripts/audit-seo.mjs` reads the **exported HTML**, not the source, so it
measures what a crawler receives. It checks: title length, description length,
H1 count, duplicate titles/descriptions, canonical presence, JSON-LD types,
images without an `alt` attribute, internal-link count per page, orphan pages,
visible word count, whether any page states real prices, and whether
`llms.txt`/`robots.txt`/`feed.xml` carry what they claim.

---

## 2. What the first run found

| Finding | Count | Why it matters |
|---|---|---|
| Titles over 60 characters | **19 of 30** | The brand suffix (` · Zarrar.Solutions`, 18 chars) was appended to every title, so the query half was clipped in results. Worst: 91 chars. |
| Meta descriptions over 170 characters | **15 of 30** | Cut mid-sentence in snippets. Worst: 209 chars. |
| `/pricing` had **no price structured data** | 1 page | The single most citable page for a cost question published prices only as human prose. AI crawlers had an `FAQPage` and a breadcrumb — no numbers. |
| `llms.txt` stated **no prices at all** | 1 file | An assistant reading the site summary learned the studio exists but not what it charges. |
| `Organization` schema missing contact + identity edges | 1 node | No `email`, `telephone`, `founder.url`, `knowsAbout`, and no `WebSite` node — weaker entity resolution ("who is this source?"). |
| No `max-snippet` / image-preview directives | sitewide | Answer engines were free to take the shortest possible snippet. |
| Images without `alt` **attribute** | 0 (2 decorative `alt=""` per page, correct) | Not a defect — the audit now distinguishes `alt=""` (decorative, valid) from a missing attribute. |

---

## 3. What shipped

### 3.1 One citable answer, on `/pricing`, in HTML

`/pricing` now opens with a question-shaped `<h2>` and a paragraph written to
stand alone when quoted:

> A fully custom website from this studio costs PKR 150,000 for 5–8 pages,
> PKR 300,000 for 8–12 pages, and PKR 500,000 for 12+ pages with custom
> modules. An audit is PKR 35,000–50,000 and is credited toward the build.
> These are published prices, verified November 2026, not a "from" teaser.

Under it, a `<dl>` lists all seven project prices, then the line
`Published prices, verified November 2026` with the project band and a link to
the market-bands guide. The H1 also changed from `In PKR, in writing.` to
`What it costs, in writing.` so the page's strongest heading contains the
query's noun.

### 3.2 `OfferCatalog` + `AggregateOffer` structured data

`src/content/price-list.ts` is now the single machine-readable price table:
seven project offers, five add-ons, a project band, the citable sentence, and
`priceCatalogLd()` which emits a `Service` node with:

- `offers: AggregateOffer` — `lowPrice 35000`, `highPrice 500000`, `offerCount 7`, `PKR`
- `hasOfferCatalog` — one `Offer` per service, each with `price` or a
  `PriceSpecification` min/max, `availability`, and a link to its service page
- `dateModified` on both the service and the catalogue

Service pages already emitted their own `Offer`; they now agree with the
catalogue because both read the same published strings.

**Drift guard:** `check:routes` fails the build if the catalogue quotes a
string the page does not visibly show. The schema cannot quietly disagree with
the page a customer reads.

### 3.3 Titles and descriptions, sitewide

`pageMeta()` now owns the whole title:

- the brand suffix is appended **only when the result stays ≤ 60 characters**
  (a clipped brand is worse than no brand; the domain carries it anyway)
- descriptions are clamped at 158 characters on a word boundary

All 19 long titles and 15 long descriptions were rewritten. Every page is now
≤ 60 / ≤ 158. The audit fails the build above those limits, so the next added
page cannot regress it.

### 3.4 Entity graph

The root JSON-LD now emits `Organization` + `WebSite` + `ProfessionalService`
with `email`, `telephone`, `founder` (`@id` → `/about#person`), `areaServed`,
`knowsAbout`, `slogan`, `currenciesAccepted`, `paymentAccepted`,
`openingHours` and `priceRange`. An engine answering "who are these people and
what do they do" has a resolved entity instead of a name string.

### 3.5 `llms.txt` as a citable brief

It now carries, in order: the one-paragraph cost answer, the full published
price list, the add-ons, and a **"How to cite this site"** block with the
studio's identity, the canonical sources (`/pricing` for our prices,
`/guides/website-cost-pakistan` for market bands), the verification date, and
the rule that the page wins any disagreement.

It also states plainly: *no rankings, no review scores, no paid placements, no
invented clients or project counts.* That sentence is deliberate — it is the
difference between a source an assistant can trust and one it should discount.

### 3.6 Snippet permissions

`robots` metadata is now `index, follow, max-snippet:-1,
max-image-preview:large, max-video-preview:-1` — answer engines may quote a
full paragraph rather than a truncated one.

### 3.7 One dated page node per route, and a breadcrumb that matches it

`pageLd()` (in `src/lib/seo.ts`) replaced the old breadcrumb-only helper. Every
route now emits a `@graph` of **WebPage + BreadcrumbList**, where:

- the **last crumb is the page**, so the trail and the page node cannot
  disagree about the URL
- the page node carries `dateModified`, `inLanguage`, `isPartOf` (→ `#website`)
  and `publisher` (→ `#org`)
- notes and guides pass their own date instead of the site-wide one, so a note
  written in October does not claim to have changed in November
- `/about` emits an `AboutPage` with a full `Person` node (`worksFor`,
  `knowsAbout`, `email`, `areaServed`) sharing the `@id` the Organization
  already points at
- `/`, `/pricing` and every guide carry a `speakable` spec naming the CSS
  selector of the answer paragraph

Visible breadcrumbs were already on 29 routes; `/brief` was the exception
because it opens with a full-screen form instead of `PageHero`. It now has a
slim trail above the room. **29/29 subpages show a trail, 30/30 have a dated
page node** — both asserted by `audit:seo`.

### 3.8 FAQ questions are headings now

`<summary><span>Question</span></summary>` gives an extractor a string with no
structural meaning. Every FAQ entry on `/faq` and in the guides is now
`<summary><h3>Question</h3></summary>`, which produces a real outline:
`h1` → group `h2` → question `h3`. The `FAQPage` schema still mirrors them
one-to-one, and `audit:seo` fails if the printed entries and the question
headings ever disagree in number.

Service pages and `/pricing` already used the `FaqAccordion` component, which
was heading-based — that is why the audit shows 11 routes with `FAQPage` but
only some needed fixing.

### 3.9 The no-fabrication rule is now a build gate

`src/app/terms/page.tsx` gained a **"Claims and proof"** clause: no invented
clients, no invented project counts, no purchased review scores, no self-ranked
"top 10" lists, and no review markup — *because there are no reviews yet to
mark up*.

That last part is enforced: `audit:seo` fails the build if any exported page
contains `aggregateRating`, `ratingValue` or `reviewCount`. A future edit
cannot quietly add star ratings to win a rich result.

### 3.10 Anchor text that says what the destination is

The audit counted anchors pointing at `/pricing`: **96 were the word
"Pricing"** (nav and footer) and five were descriptive. Nav labels tell an
engine nothing about the page they point to. Added:

- home → "what a website costs in Pakistan, in PKR"
- five service pages → "Every published price", "what the market charges"
- `/compare` → "What a website costs in Pakistan"
- five service pages → the cost guide, descriptively

The cost page now has a real internal anchor profile instead of a menu link.

### 3.11 Sitemap `lastmod` tells the truth

Every static route used to be stamped with the **build time**, so a CSS tweak
claimed all 30 pages had changed. `lastModified` now comes from
`CONTENT_UPDATED` (or the note/guide's own date). A crawler that learns
`lastmod` is meaningless stops reading it — which is exactly what happened
before.

---

## 4. SEO vs GEO vs AEO — what each one actually needed here

Three acronyms, three different jobs. The table is the short version of why
the changes above look the way they do.

| | Question it answers | What it needed on this site |
|---|---|---|
| **SEO** | Can a crawler find, read and rank the page? | Titles ≤ 60, descriptions ≤ 158, one `h1`, canonical, sitemap, internal links, no orphan routes, honest `lastmod`. |
| **AEO** (answer engines) | Can a machine lift *one clean answer* out of the page? | Question-shaped `h2`s, an answer-first paragraph, `<h3>` per FAQ question, `FAQPage` that matches the visible questions, `<dl>` of prices, dates attached to every claim. |
| **GEO** (generative engines) | Would a model *cite* this source? | A resolved entity (`Organization` + `WebSite` + `Person` with contact edges), machine-readable prices (`OfferCatalog` / `AggregateOffer`), `llms.txt` with the facts and a citation block, `max-snippet:-1`, and a policy that no proof is fabricated. |

The overlap is the point: a page can rank and still be unciteable (prose
prices), or be citeable and still unreadable (schema without visible text).
Every claim in the structured data here also exists in the HTML a customer
reads, and `check:routes` fails if the two diverge.

---

## 5. The content split (and why there is no duplicate-answer risk)

| Page | Owns | Answers |
|---|---|---|
| `/pricing` | **our** prices | "What does a fully custom website cost *here*?" |
| `/guides/website-cost-pakistan` | the **market** | "What does a website cost in Pakistan?" (PKR 20k template → 500k+ custom) |
| `/faq` | the short version | One paragraph per question, routing to the guide |
| `/services/*` | scope of each offer | "What is in a PKR 250,000 catalog build?" |

Two URLs never answer the same question with the same sentences, so an engine
has one canonical passage per query instead of three competing ones.

---

## 6. Blocked — owner actions that raise ceiling, not floor

These are in `README.md` under **Owner actions**. None of them is code:

1. **Domain swap** (`src/lib/site.ts`) — canonicals, `llms.txt`, JSON-LD and
   every citation currently point at a `vercel.app` host. A citation to a
   preview URL is worth less than one to a real domain, and the swap after
   citations accumulate means starting the authority over. Do it before the
   guides get traction.
2. **Google Business Profile + Bing Places** — the entity that local "near me"
   answers use. Without it, the studio is a website, not a place.
3. **`sameAs` links** (LinkedIn, GoodFirms, DesignRush, Clutch) — the
   `Organization` graph has fields ready but no real profiles to point at.
   Inventing URLs would be worse than omitting them.
4. **Real case-study numbers** — the guides argue from code patterns. Two or
   three redacted screenshots (a `site:` result, a view-source `<div
   id="root">`) would make the argument visible. Needs an image pipeline.

---

## 7. Rules for anything added later

1. Title ≤ 60 characters, brand only if it fits. `pageMeta()` enforces.
2. Description ≤ 158 characters, one sentence of substance. `pageMeta()` clamps.
3. Exactly one `<h1>`; question-shaped `<h2>`s on any page that answers one.
4. If a page states a price, it must come from `src/content/price-list.ts`
   (project) or `SERVICES`/`ADDONS`. Never type a new number into JSX.
5. Every page carries a date — `dateModified`, `updatedISO`, or a visible
   "verified November 2026" line. Answer engines discount undated prices.
   `pageLd()` does this for you; pass `updated` when the content has its own
   date.
8. A page that is not `/` shows a breadcrumb and emits `BreadcrumbList`.
9. FAQ questions are `<h3>` inside `<summary>` (or `FaqAccordion`), never a
   bare `<span>`.
10. Anchor text describes the destination. "Pricing" in the nav is fine;
    "what a website costs in Pakistan" in body copy is the point.
6. No `aggregateRating`, no invented reviews, no "top 10" self-listing. The
   only trust signal available here is that the numbers are real and checkable.
7. Run `npm run check` before committing. It is the difference between a claim
   and a guard.

---

## 8. Measuring it at home (no third-party tools)

- **Google indexed?** `site:zarrarsolutions.vercel.app` — after the domain
  swap, `site:yourdomain.pk`.
- **Rich results?** Search Console → Enhancements, or
  `search.google.com/test/rich-results` on `/pricing` and one guide.
- **Schema valid?** `validator.schema.org` on `/pricing` (Service +
  OfferCatalog + AggregateOffer + FAQPage).
- **Can an engine read the answer with JS off?** View source on `/pricing`.
  The paragraph, the `<dl>`, and the JSON-LD are all in the HTML, not painted
  by script.
- **What an assistant sees?** Open `/llms.txt`. If the cost paragraph is not in
  the first 40 lines, that is a bug.
