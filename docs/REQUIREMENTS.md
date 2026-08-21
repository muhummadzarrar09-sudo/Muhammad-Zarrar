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

## Shipped

- 2026-08-21 — Full site v1: 9 routes + 5 service pages, PWA, SEO suite,
  per-page OG cards, legal pages, care-plan SLA (48h small changes),
  bank-transfer payment term, WhatsApp + email wired.
- 2026-08-21 — Sprint 3: Field Notes live (/notes, 2 posts, BlogPosting
  schema), per-service OG cards (12 total), humans.txt, security headers
  for Vercel (vercel.json) and Cloudflare Pages (public/_headers).
