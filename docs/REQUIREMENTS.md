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

## Recommended next (in priority order)

Each of these is on-brand, static, and needs no new dependency. Ordered by
value per hour of work.

1. **Case studies / "before → after" proof** — still gated on real numbers
   (see item 4). The single biggest trust asset missing from the site.
2. **Per-note OpenGraph cards** — `og-notes.png` is reused by every post, so
   shares look identical. `scripts/generate-assets.mjs` already has the type
   and colour system; ~40 lines adds a card per note, keyed by slug.
3. **`/faq` hub with `FAQPage` schema** — the service FAQs exist as data in
   `src/content/services.ts`; a consolidated page answers the questions people
   actually search ("how much does a website cost in Pakistan") and gives
   Google one canonical answer instead of five partial ones. Keep the FAQ
   schema off the service pages if it moves, to avoid duplicates.
4. **A real audit-sample page** — a redacted, reproduced finding report.
   Free-audit already sketches one; a full specimen converts better than a
   promise.
5. **Notes topics as their own routes** (`/notes/topic/speed`) — only when the
   archive passes ~12 notes. Below that, filters are enough and topic pages
   would be thin.
6. **Newsletter** — deliberately deferred. There is no backend by design, and
   RSS + WhatsApp covers the same job without a third party holding the list.
7. **Notes → service cross-links** — each note ends by pointing at the service
   that fixes it (audit vs redesign vs storefront), not just at the audit CTA.

---

## Shipped

- 2026-08-21 — Full site v1: 9 routes + 5 service pages, PWA, SEO suite,
  per-page OG cards, legal pages, care-plan SLA (48h small changes),
  bank-transfer payment term, WhatsApp + email wired.
- 2026-08-21 — Sprint 3: Field Notes live (/notes, 2 posts, BlogPosting
  schema), per-service OG cards (12 total), humans.txt, security headers
  for Vercel (vercel.json) and Cloudflare Pages (public/_headers).
- 2026-11-10 — Field Notes v2: 3 new posts + "Check yours" on both originals,
  topics + search, reading time/word count, in-this-note contents, related
  notes, share row, `/feed.xml`, `/llms.txt`, Notes in the primary nav,
  feed link in the footer, richer `BlogPosting` schema, and route-check
  guards for the feed, the index markup and llms.txt.
