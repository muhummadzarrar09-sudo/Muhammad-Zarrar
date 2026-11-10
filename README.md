# Zarrar.Solutions — Production Website

The production website for **Zarrar.Solutions**, an audit-led digital systems
studio in Rawalpindi, Pakistan. Next.js (App Router) with full static
generation: every page ships as server-rendered HTML (SEO-first), with client
JavaScript only where interactivity demands it (mobile nav, FAQ accordion,
forms, route progress, scroll reveal).

> **Positioning (verbatim, as rendered in the hero):**
> *"We don't just make websites. We audit broken digital flows — and build the
> systems that fix them."*

---

## Live details & the one-line swap

Contact details are wired sitewide from exactly **one** file —
`src/lib/site.ts`:

- WhatsApp (wa.me deep links, digits only): `923335666050`
- WhatsApp (displayed): `+92 333 5666050`
- Email: `muhummadzarrar09@gmail.com`

`SITE_URL` currently points at the Vercel preview host
(`https://zarrarsolutions.vercel.app`). When the purchased domain lands,
edit that **one line** and rebuild — canonicals, OG URLs, `sitemap.xml`,
`robots.txt`, and all JSON-LD read from it.

### Founder portrait (optional drop-in)

Drop a real photo at `public/images/portrait.jpg` (min 720×860, portrait
orientation) and rebuild — the About page monogram card is replaced by the
photo automatically (build-time check in `src/app/about/page.tsx`). No photo?
The monogram card stays, and the site ships honest.

---

## ⚠️ Owner actions — waiting on you

Code is done for these; they need a human with logins. Full instructions and
copy-paste text live in `docs/DIRECTORY-LISTINGS.md`.

| # | Action | Where | Time | Why it matters |
|---|---|---|---|---|
| 1 | **Google Business Profile** — category "Website designer", Rawalpindi + Islamabad | business.google.com | 20 min | The map box is the only local result above organic. Feeds Bing free |
| 2 | **Bing Places** — import from GBP | bingplaces.com | 5 min | Near-zero competition locally |
| 3 | **GoodFirms** — full profile, all fields, portfolio | goodfirms.co | 40 min | 1,078 PK firms listed; buyers shortlist from here |
| 4 | **DesignRush** — listing + 3 portfolio items | designrush.com | 30 min | Ranks by rate, budget, portfolio count |
| 5 | **Clutch** — claim, then wait for a first review | clutch.co | 20 min | Highest trust signal; empty profiles hurt |
| 6 | **LinkedIn company page** — medium bio, pin the audit | linkedin.com | 20 min | Where B2B buyers check you're real |
| 7 | **Domain swap** — one line in `src/lib/site.ts` | this repo | 2 min | Canonicals, sitemap, OG, schema and every `llms.txt` citation follow. Do it **before** the guides earn citations |
| 8 | **Founder portrait** — drop `public/images/portrait.jpg` | this repo | 5 min | About page swaps automatically |
| 9 | **Real case-study numbers** — 2–3 anonymised before/after | — | — | Blocks the proof strip. Nothing gets invented |

**Order matters:** do 1 and 2 first (highest return per minute), then 3–4, then
the rest. Nothing on this list touches code except 7 and 8.

---

## Stack & architecture

- **Next.js 16.4.2 (App Router)** · React 19 · TypeScript · **zero UI libraries**
- **Static export** (`output: "export"`) → plain files in `./out`, deployable
  to Cloudflare Pages with zero server cost
- **Server Components by default.** Client Components only: `mobile-menu`,
  `route-progress`, `reveal`, `faq`, `whatsapp-form`, `register-sw`
- **Self-hosted fonts** via `next/font/local` (Inter variable + Fraunces
  variable from `src/fonts/`) — no Google Fonts CDN, no third-party scripts,
  no trackers, no external APIs
- **PWA**: `manifest` (via `src/app/manifest.ts`), 192/512/maskable icons,
  pass-through service worker (`public/sw.js`) — installable
- **Forms without a backend**: submits open a `wa.me` deep link with the
  URL-encoded message pre-filled — nothing is stored anywhere
- Performance budget honored: only runtime deps are gsap + lenis (home page
  only, dynamically imported — every other route ships framework baseline);
  total client
  JS stays near the framework baseline (~<100KB gzip on core pages); no
  images except generated brand assets; `prefers-reduced-motion` respected

### Design system ("Putty Gallery" · Structured spirit)

`src/app/globals.css` is the single source of truth: putty `#F3E4C7` canvas,
soft ink `#1A1412` type and buttons. **The exact palette, with contrast ratios
and an Instagram carousel recipe, is in [`docs/PALETTE.md`](docs/PALETTE.md).** The clay ZS mark is the only
colour (rust/copper). Fraunces for display + Inter for utility.
**Museum wall: oversized serif, hairline labels, warm clay accent, whisper
glass.** No teal, no orbs, no cold black shadows — elevation is warm-tinted
and runs on a monotonic 4-rung scale.

### Motion

The homepage is a **gallery walk**: scenes are tied to the wheel (scrub, ease
none) — stop scrolling and the motion stops; scroll back and it unwrites.
Lenis carries the scroll; GSAP ScrollTrigger drives the rooms. Motion is
storyboarded as data in `src/motion/wireframes.ts`.

- **Hero converge** (home): the promise dissolves, `<` and `>` fly in along
  mirrored arcs and lock into `</>`, a loading line counts, Lenis takes over.
- **Rooms**: ground color walks room to room; the diagnostic scan pins
  (CSS-sticky, 320vh) with a clay beam sweeping each finding; the pause room
  breathes behind a typewriter card; three plaques hang from nails; "A note"
  types across its hold and signs off with a clay rule.
- **The ink close** (`CtaBand`, 7 page groups): "ember dunes" — a WebGL
  clay-rust wave field (`ogl`, dynamically imported) rising from the bottom
  edge. The site's one sanctioned ambient room: pauses off-screen, still
  frame under reduced motion, masked away from the text.
- **The 404 room**: the headline scatters as particles and gathers once
  (canvas, decorative — the real `h1` stays for crawlers and screen readers).
- **Pointer layer** (`src/motion/pointer.ts`, desktop only): cursor aura
  (difference-blended, native cursor never hidden), magnetic CTAs
  (`[data-magnetic]`), marquee velocity skew, plaque pan, clay spotlight
  (`[data-spotlight]` rows/cards), portrait tilt + glare (`[data-tilt]`).
  Scoped to `(hover) + (pointer: fine)`; skipped under reduced motion.
- **React Bits v3** (all tailored, zero new deps, no new ambient loops):
  eyebrows/labels decode once (`ScrambleText`), CTA headlines sweep copper
  (`ShinyText`), the hero floor is a wheel-cranked seal (ring scrubs 0→300°
  across the pin), primary CTAs orbit a molten star on hover/focus only.
- **React Bits v4** (17 bits, one commit each, same contract): focus-blur
  Reveals, staggered checklists, color-wake + flinching plaque captions,
  word-scrubbed prose, blueprint audit heroes, velocity-fed marquee, clay
  click-ticks, target brackets, hero crosshair, focus veils, pressure
  headlines, a landed RotatingText, the process stepper, the audit card
  deck, and a spring-fill PKR budget slider.
- **Beauty pass** (14 items, one commit each, same contract): editorial
  type, asterism ornaments, exhibit placards, footer jewelry with a live
  PKT clock, rubber stamps, a print stylesheet, reading-room notes,
  blueprint service motifs, one house photo grade, a paper route wipe, a
  jeweled timeline rail, a 10-second self-check quiz, a 46%-lighter
  gallery, and Night at the Museum (persisted, OS-aware, zero-flash).
- **Mamacita icons + type** (12 commits, same contract): one 24-grid icon
  primitive, wayfinding arrows that lean on hover, a clay-ring back-to-top,
  mail + pin contact glyphs, wax-seal promise checks, stamp-press and
  blueprint-draw entrances, a 6rem hero display scale, hand-drawn scribble
  underlines on six headlines, Usual-vs-Here verdict marks, a stamped 404,
  per-phase pipeline glyphs, and a clay text selection.
- **Diagnostic visuals** (7 commits, same contract): a museum figure system
  (blueprint panels, severity tags, grade rings), a waterfall diagram for
  the 70-files post, crawler-vs-visitor frames for the blank-page post,
  exhibited schematics on all five service pages, a sample finding report
  on free-audit, a builder spec sheet on about, and a 404 that files its
  own failing grade. Proof, not purple.
- **Scroll timeline**: the native scrollbar is hidden and replaced by a
  right-edge rail — progress fill plus diamond markers per section
  (`section[data-tl]`), keyboard-focusable, click-to-jump.
- Route changes: 2px teal progress bar; inner-page heroes rise in staggered.
- Section entry: IntersectionObserver fade/slide (reversible).
- **Accessibility**: `prefers-reduced-motion` skips Lenis, every scene and
  the whole pointer layer; the marquee pauses on hover/focus (WCAG 2.2.2).
- **Docs**: `docs/COMPETITOR-NOTES.md` (how the local market hooks buyers,
  sourced) · `docs/DIRECTORY-LISTINGS.md` (profile copy + the listing
  checklist) · `docs/PALETTE.md` (tokens, contrast, carousel recipe) ·
  `docs/ANIMATION-INVENTORY.md` (every animation, audited) ·
  `docs/MOTION-RULES.md` (NN/g / Material 3 / WCAG / HIG compliance ledger) ·
  `docs/motion-wireframes.md` (the storyboard).
- GSAP + Lenis are dynamically imported so only pages that need them load
  them.

### Field Notes — the publication layer

`/notes` and `/notes/[slug]` are the only editorial surface on the site, so
they are built like a small publication rather than a blog afterthought:

- **Content model** — `src/content/notes.ts`. One typed entry per note
  (title, date, topics, sections, takeaway, optional figure). Adding an entry
  updates the index, the feed, the sitemap and the related-note chains
  automatically. No CMS, no markdown pipeline, no client JS on a post.
- **Topics + search** — four topics (Conversion, Speed, Visibility, Trust)
  and a text filter, both client-side over rows that are already in the HTML.
  With JavaScript off, every note is still listed and readable.
- **Reading time + word count** — computed from the note body (200 wpm), shown
  on the index and post, and published as `BlogPosting.wordCount` /
  `timeRequired`.
- **In this note** — sticky contents plate on desktop, wrapped strip on
  mobile. Anchored headings carry `scroll-margin-top` so the floating pill
  never covers what you jumped to.
- **Related notes** — matched on shared topics, newest first, never padding.
- **Share** — a WhatsApp deep link with the note's title and URL pre-filled,
  plus email and a link back to the archive.
- **Feed** — `/feed.xml` (RSS 2.0, static, generated at build) advertised in
  the head of every page and linked from the footer.
- **Per-note identity** — every post has its own 1200×630 share card (a
  headline of four or five words, never more), its own 96×96 tab icon, its own
  `article` OpenGraph block with publish date and tags, and its own hashtag
  set rendered discreetly under the share row. Art direction lives in
  `src/content/note-social.json`; `npm run check:routes` fails if a note ships
  without a card or an icon.
- **The estimator** (`/pricing`) — five needs, three sizes, five add-ons, and
  a live PKR range built only from prices the site already publishes. The
  default result is server-rendered, so it reads with JS off; the estimate
  travels to WhatsApp in the pre-filled message.
- **`/compare`** — freelancer vs agency vs this studio, with the rows where
  each option is the wrong choice (including ours). Price bands are stated as
  advertised market ranges, never as claims about a named company.
- **`/faq`** — seventeen questions collected from where owners actually ask them
  (Reddit, Quora, Google's "People also ask", and this studio's WhatsApp),
  answered plainly, with `FAQPage` schema.

### Guides — the long answers

Four canonical pages, one per question a buyer actually types before they
message anyone:

| Route | Query |
|---|---|
| `/guides/website-cost-pakistan` | How much does a website cost in Pakistan? |
| `/guides/website-not-on-google` | Why isn't my website showing up on Google? |
| `/guides/website-or-facebook-page` | Do I need a website if I already have a Facebook page? |
| `/guides/audit-your-own-website` | How to audit your own website in 20 minutes |

- **One question, one page.** Field Notes are the evidence; Guides are the
  how-to. The FAQ hub answers in a paragraph and links here for the long
  version, so nothing competes with itself for the same query.
- **Answer first.** Every guide opens with a `.guide-answer` block that
  answers the question in two sentences, then earns the rest of the page.
- **Content model** — `src/content/guides.ts`. Sections, an optional table,
  3–4 FAQs (`FAQPage` schema per guide, mirrored by the visible `<details>`),
  and `related[]` links into notes, `/pricing`, `/compare` and the service
  pages. Reading time is computed, not typed.
- **Prices are quoted, never invented.** Every figure in a guide already
  exists on `/pricing`; the index page says so, and `npm run check:routes`
  fails if a guide loses its answer block, its share card, or its FAQ schema.
- **Per-guide identity** — 1200×630 share cards from
  `src/content/guide-social.json` (four or five words each), plus
  `Article` + `FAQPage` + breadcrumb JSON-LD.

### SEO

Unique title/description per page; OpenGraph + Twitter cards with the branded
`public/og.png`; JSON-LD sitewide (Organization + ProfessionalService),
`Service` + `FAQPage` on service pages, `BreadcrumbList` on subpages;
`sitemap.xml` + `robots.txt` generated by `src/app/sitemap.ts` /
`src/app/robots.ts`; the sitemap includes every exported page, service detail,
and field note. Canonical URLs from `metadataBase`; semantic HTML with a
single `h1` per page. `/feed.xml` is an RSS 2.0 feed of the field notes, and
`/llms.txt` is a plain-text map of the site for answer engines — both static,
both generated from the same content files the pages render.

### Answer engines (being the source, not the summary)

The audit is in `docs/SEO-AI-VISIBILITY.md`. What it enforces:

- **One citable answer per question.** `/pricing` opens with a question-shaped
  `<h2>` and a self-contained paragraph: *a fully custom website is
  PKR 150,000 (5–8 pages), PKR 300,000 (8–12), PKR 500,000 (12+ with custom
  modules); an audit is PKR 35,000–50,000, credited to the build.* Under it,
  every project price as a `<dl>`, and a visible "verified November 2026" date.
  `/guides/website-cost-pakistan` owns the *market* bands instead, so two pages
  never answer the same question with the same sentences.
- **Prices as structured data.** `src/content/price-list.ts` emits an
  `OfferCatalog` + `AggregateOffer` (`lowPrice 35000`, `highPrice 500000`,
  `PKR`) and one `Offer` per service. `check:routes` fails if the catalogue
  quotes a string the page does not visibly show.
- **Titles that fit.** `pageMeta()` appends the brand only when the title stays
  ≤ 60 characters, and clamps descriptions at 158. Both limits are enforced by
  `npm run audit:seo`, so a new page cannot regress them.
- **A resolved entity.** Organization + WebSite + ProfessionalService with
  `email`, `telephone`, `founder`, `knowsAbout`, `priceRange`, `areaServed`.
- **`llms.txt` as a brief**, not a link dump: the cost paragraph, the full
  price list, and a "How to cite this site" block with canonical sources and
  the verification date.
- **`max-snippet:-1`** sitewide, so an engine may quote a whole paragraph.

No rankings, reviews or invented clients anywhere — the only trust signal on
offer is that the numbers are real and checkable.

---

## Run locally

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:3000
npm run build      # type-check + static export → ./out
npm run check:routes # verify every sitemap URL, canonical, static route, schema + price parity
npm run audit:seo    # titles, descriptions, H1s, orphans, schema, prices, llms.txt
npm run check        # build + all three gates (routes, seo, contrast)
npm run preview    # serve ./out with clean URLs + redirects → http://localhost:4173
```

Regenerate brand assets (icons + OG image) after editing
`scripts/generate-assets.mjs`. The rasteriser (resvg) reads **TTF only** — the
site ships woff2, so `scripts/fonts/*.ttf` are committed mirrors, instanced at
the weights the site uses (`npm run fonts:ttf` rebuilds them; needs
`pip install fonttools brotli`). Pointing resvg at the woff2 files fails
silently and renders the fallback system sans, which is exactly what happened
before this was caught.

```bash
npm run assets        # regenerate OG + note cards + note icons
npm run assets:palette # regenerate palette/zarrar-palette-2026.png
npm run fonts:ttf     # rebuild the TTF mirrors the rasteriser needs
npm run check:contrast # WCAG gate for the live palette
```

---

## Deploy to Cloudflare Pages

`wrangler.jsonc` already points the deploy at `out/`.

### Direct links and clean URLs

Next's static export uses `trailingSlash: false`, so pages are written as
files such as `out/brief.html` and `out/services/website-audit.html`. Vercel
needs `cleanUrls: true` to serve those files at `/brief` and
`/services/website-audit`; this is set in `vercel.json`. Cloudflare Pages
resolves extensionless paths to matching `.html` files automatically. This
keeps direct visits, refreshes, and shared sub-route links working without a
catch-all SPA rewrite; unknown routes still receive the real 404 page.

The common typo `/breif` permanently redirects to the canonical `/brief` on
both hosts (`vercel.json` and `public/_redirects`). It is intentionally not
listed in the sitemap. After a build, `npm run check:routes` checks that every
exported page has a sitemap entry and matching canonical URL, and that both
hosts have the required clean-URL/redirect configuration.

### Option A — dashboard (recommended)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** `Next.js` (or `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Save & Deploy. First deploy builds the site; every push to `main` redeploys.
5. **Custom domain later:** Pages project → **Custom domains** → add
   `zarrar.solutions` → follow the DNS instructions (the platform serves
   clean URLs, so `/services/website-audit` resolves to the exported HTML).
6. Update `SITE_URL` in `src/lib/site.ts` to the live domain and redeploy so
   canonicals, OG URLs, sitemap, and JSON-LD all point at the right place.

### Option B — Wrangler CLI

```bash
npm install -D wrangler
npx wrangler login
npm run build
npx wrangler pages deploy out --project-name zarrar-solutions
```

The same `out/` directory also deploys to Vercel (framework: Other; build
`npm run build`; output `out`) or any static host (Netlify, S3+CDN).

---

## Project structure

```
src/
  app/                  # one folder per route; static export at build time
    page.tsx            # /
    services/           # /services and /services/[slug] (5 services)
    faq/                # /faq — the question hub, with FAQPage schema
    compare/            # /compare — the honest three-way comparison
    guides/             # /guides + 4 long-answer guides
    pricing/ process/ about/ free-audit/ contact/
    layout.tsx          # fonts, metadata, JSON-LD, header/footer, PWA
    manifest.ts robots.ts sitemap.ts not-found.tsx
  components/           # Server Components by default; client where needed
  content/              # all copy & data (services, findings, process…)
  lib/                  # site constants (placeholders live here), SEO helpers
  fonts/                # self-hosted woff2 (Inter variable, Fraunces variable)
public/                 # icons, og.png, sw.js
scripts/                # asset generator + zero-dep static preview server
```

## Fonts

Inter variable + Fraunces variable (latin subsets) are vendored as woff2 files
from the Fontsource project (SIL Open Font License). Sources kept as
`devDependencies` for provenance: `@fontsource-variable/inter`,
`@fontsource/playfair-display`.

---

© 2026 Zarrar.Solutions. Built to the same standard we audit against.
