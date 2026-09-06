# SESSION HANDOFF — read me first

**For:** the next AI agent (or human) working on this repo.
**From:** the 2026-09-05 session (motion v2 + React Bits integrations + logo lineage).
**Vibe:** the owner ("bro") knows exactly what he wants, moves fast, and tests on real
devices. Match his energy, keep the ledger honest, never break the walk.

---

## 1 · DEPLOYMENT TARGET: CLOUDFLARE PAGES (owner's directive — this is not negotiable)

The site deploys to **Cloudflare Pages** (owner's call: free unmetered bandwidth,
faster edge infra). NOT Vercel — the current `SITE_URL` in `src/lib/site.ts`
still points at the old Vercel preview host and must be swapped when the
custom domain or `*.pages.dev` URL lands (one line; canonicals, OG URLs,
sitemap, robots + JSON-LD all read from it).

Everything is already wired for Cloudflare:

- `next.config.ts` → `output: "export"` — `npm run build` emits pure static
  files to `./out`
- `public/_headers` → security headers + immutable caching for `/_next/static`,
  weekly cache for icons/OG images (Cloudflare Pages applies automatically)
- `package.json` → `"deploy": "npm run build && wrangler pages deploy out"`
- No server features are used: no ISR, no API routes, no image optimizer
  (`images.unoptimized`), forms are `wa.me` deep links — nothing to migrate.

**Deploy recipe:** `npm ci && npm run build && npx wrangler pages deploy out`
(needs `CLOUDFLARE_API_TOKEN` + account, or dashboard drag-and-drop of `./out`).
Then: set the custom domain in the CF dashboard, update `SITE_URL`, rebuild.

## 2 · What this project is

Zarrar.Solutions — audit-led digital systems studio, Rawalpindi PK.
Next.js 15 App Router, React 19, TypeScript, **zero UI libraries**, static
export, SEO-first (server-rendered everything), PWA, self-hosted fonts.
Design system: **"Putty Gallery"** — putty `#c4c3b6` canvas, ink type, clay
(copper/rust) brand color, Fraunces display + Inter body. `globals.css` is
the single CSS source of truth; nothing below the token block may invent raw
hexes, px steps or easings.

## 3 · THE HOUSE RULES (break these and the owner will know)

1. **The homepage is a wheel-tied gallery walk.** Scenes scrub with scroll
   (`src/motion/wireframes.ts` is the storyboard, `play.ts` the player). Stop
   scrolling → motion stops. Scroll back → it unwrites. Timer-driven motion
   is the exception, governed by the **Ambient Quota** (docs/MOTION-RULES §3):
   exactly ONE ambient element per viewport site-wide — currently the
   GradientWaves "ember dunes" in `.cta-full`. The quota is SPENT. Don't add
   another ambient thing without removing one.
2. **Motion tokens only:** `--dur-1..4` (120/200/320/560ms) + `--ease-standard/
   entrance/exit/emphatic`. NN/g window: feedback 100–500ms.
3. **`prefers-reduced-motion` is sacred.** Every effect needs a reduced path
   (skip, still frame, or static). Check `docs/MOTION-RULES.md` for the
   per-effect ledger — keep it updated when you touch motion.
4. **Transform/opacity only.** No layout-property animation. No native-cursor
   hiding. No unmasked moving content behind text (WCAG 1.4.3). Marquee pauses
   on hover/focus (WCAG 2.2.2). Keyboard parity for pointer effects.
5. **Perf budget:** client JS ≈ framework baseline + gsap/lenis (home, dynamic
   import). Audience is on Pakistani 4G mid-range Androids. WebGL: DPR ≤1.5,
   `detail: low`, pause off-screen/hidden tab. Ambient layers must be
   **measured** visible (lum ≈0.15–0.25 over ground) — a first waves pass at
   opacity 0.55 was literally invisible (0.018); we simulate shader math in
   Node before shipping now.
6. **React Bits intake framework** (owner approved): *Is it input-driven or
   one-shot? Does it survive Jazz 4G? Does it replace semantic content? Does
   putty recognize it?* Two fails = propose a better home or decline.
   Every integration gets tailored: house palette, tokens, reduced motion,
   a11y patch. Never ship upstream defaults (they're neon and they idle).

## 4 · What's here (the map)

- `src/motion/` — engine.ts (Lenis+GSAP boot/cleanup), pointer.ts (cursor
  aura, magnetic CTAs `[data-magnetic]`, marquee skew, plaque pan), hero.ts,
  recognize.ts, exhibit.ts, plaques.ts, manifesto.ts, walk.ts, wireframes.ts,
  play.ts
- `src/components/` — border-glow.tsx (3 form cards), particle-text.tsx (404
  only; parks its rAF loop), gradient-waves.tsx (ink close only), reveal.tsx,
  scroll-timeline.tsx, route-progress.tsx, pinned-manifesto.tsx, etc.
- `docs/` — ANIMATION-INVENTORY.md (every animation, audited),
  MOTION-RULES.md (compliance ledger + Ambient Quota), motion-wireframes.md,
  DESIGN-AUDIT.md, REQUIREMENTS.md
- `logo_replacement.md` — logo lineage (read before touching any logo file)
- `scripts/` — generate-assets.mjs (OG cards — reads the transparent logo
  cut; rerun after any logo change), render_svg.mjs, check-contrast.mjs,
  preview.mjs (serves ./out on :4173)

## 5 · Logo lineage (settled — don't regress it)

- `public/images/source-logo.png` — THE master (owner's original 500×500,
  black ground; landed via GitHub web upload after the chat pipeline ate it
  **five times** — chat attachments of this file DO NOT reach the sandbox;
  use GitHub web UI for binaries)
- `public/images/logo-mark-transparent-original.png` — pixel-perfect
  background removal (border flood-fill T=10, soft edge 48; interior black
  outlines preserved). Used: About card, 404, ALL OG images (via
  generate-assets.mjs data-URI), icon-512 (on #050505)
- `public/images/logo-mark.svg` — flat vector re-cut. **Deliberately** used
  at small sizes (header/footer 34px, favicon, icon-192) because the
  original blobs below ~64px. Small = flat cut, big = original. Keep it that way.

## 6 · Sandbox quirks that WILL bite the next agent

- **`node_modules` is wiped between turns** (snapshot excludes it) → run
  `npm ci` before any build. `sharp` may need a separate `npm i sharp` for
  asset work.
- **Git history occasionally rolls back to base while files survive.**
  Symptom: `git log` shows only old commits, `git status` shows everything
  modified, `git push` rejected. Recovery: `git add -A && git fetch origin
  <branch> && git reset --soft FETCH_HEAD && git commit` (re-commit only the
  delta on the true remote tip). Happened twice this session; harmless if
  you don't panic.
- **Long-running servers:** use the process tools; `npm run preview` serves
  `./out` on 0.0.0.0:4173.
- Playwright/chromium downloads fail in this sandbox (CDN blocked). To "see"
  WebGL/canvas output, **simulate the shader math numerically in Node** —
  it caught the invisible-dunes bug.

## 7 · Parked work (owner-approved backlog, do not improvise)

1. **Case-study deck** — pinned horizontal gallery room (fake-pin pattern
   ready). BLOCKED: owner has no case studies yet (privacy policy — he'll
   gather them; be patient, don't nag… much).
2. **GradientWaves Phase 2** — footer "dusk dunes" sitewide + top-flipped
   404 sky. Owner wanted Phase 1 felt first. NOTE: ambient quota math —
   footer variant would replace/merge with the close-room holder per page.
3. **Odometer counters** — for real audit metrics. `src/components/
   teardown.tsx` exists but is UNREFERENCED — wire it when numbers are real.
4. **Domain swap** → `SITE_URL` in `src/lib/site.ts` (one line) once the
   domain lands, then rebuild + redeploy.
5. Footer curtain reveal (needs layout audit across routes), view-timeline
   expansion, text-decode kickers — Tier 2/3 in ANIMATION-INVENTORY §7.

## 8 · Verify your work, every time

`npm ci && npm run build` (must export all ~20 routes clean) → check `out/`
for your changes → `npm run preview` → actually look. Update the three docs
(inventory, rules ledger, wireframes) when motion changes. Commit small,
messages that explain *why*. PR #25 was merged 2026-09-05 with the full v2
motion system (12+ commits) — `git log` is the changelog.

*The walk is wheel-tied. The ledger is honest. The clay mark is everywhere.
Carry it forward.* 🏺

## 9 · POST-MORTEM: the hollow-merge incident (2026-09-05/06)

The snapshot rollback gremlin struck between turns and rolled the git index
back to base while HEAD *claimed* the full history. Committing the handoff
on that state produced a branch tip that **silently reverted the entire
PR** (13 commits → 2-file diff). The PR "merged" green and main lost the
whole session. Detected only because the file count of the merge was
actually checked (compare base→merge = 2 files = impossible).

**Rule for every merge, no exceptions:**
1. After the final commit before a PR merge, run
   `git diff --stat <base>..HEAD | tail -1` and sanity-check the number.
2. After merging, verify via API that NEW files actually exist on main
   (`gh api repos/<owner>/<repo>/contents/<path>?ref=main`) — not locally.
3. If a rollback is suspected: `git reset --hard <last-known-good>` (the
   object survives in local git even when refs roll back), re-stage
   deliberately, and re-verify trees with `git ls-tree`, never trust
   commit messages.
4. `gh pr merge` DELETES the head branch by default — the session branch
   must be re-pushed (`git push -u origin <branch>`) to keep working.
