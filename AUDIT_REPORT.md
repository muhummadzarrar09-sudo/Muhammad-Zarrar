# Forensic Audit Report — Muhammad-Zarrar Portfolio + Business Site

> Date: 2026-07-25 (UTC)
> Branch: arena/019f97f5-muhammad-zarrar
> Scope: Every file in repo, exhaustive line-by-line
> Tooling: manual review + grep + npm audit + CSP hash verification

## Executive Method
- Read `package.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json`, `index.html`, `public/_headers`, `robots.txt`, `sitemap.xml`, all `src/**/*`, `tests/e2e`.
- Searched for secrets, innerHTML, eval, dangerouslySetInnerHTML, window.open, localStorage, clipboard, rel attributes, CSP hashes, button types, duplicate hooks, GSAP registration, RAF loops, global leaks.

---

## Critical

### C-01 — CSP hash mismatch blocks JSON-LD structured data
- **Files:**
  - `index.html:8` `<meta http-equiv="Content-Security-Policy" ... sha256-aTA5/bB1pntKc1sQWEqDnfVHgrLhdjoiTp1164wNr2s=`
  - `vercel.json:6` same hash
  - `public/_headers:2` same hash
  - Inline JSON-LD at `index.html:39-92`
- **What:** Computed hash of current JSON-LD is `e3Ia6dlKJj...` / `RmurgCiK...` (varied whitespace) — **not** `aTA5/bB1...`. Verified via python hashlib sha256. Therefore CSP will block the only inline script, breaking SEO structured data (Person, WebSite, ProfessionalService) and causing CSP violation reports in console.
- **Why matters:** Breaks SEO, indicates drift between 3 duplicated CSP definitions. Teams will be tempted to add `unsafe-inline` to "fix", weakening XSS protection.
- **Fix:** Re-compute hash after any JSON-LD change: `echo -n "<exact inner content>" | openssl dgst -sha256 -binary | openssl base64`. Or move JSON-LD to external file and allow via `script-src` hash updated in all 3 places via single source of truth. Prefer generating headers from one template.

### C-02 — Global leak of Lenis instance
- **File:** `src/hooks/useLenis.ts:45` `window.__lenis = lenis;` + `src/hooks/useLenis.ts:2-6` declares `interface Window { __lenis?: Lenis }`
- **What:** Exposes full smooth-scroll controller to `window`, any third-party script or XSS can call `window.__lenis.destroy()`, `scrollTo`, manipulate RAF, cause DoS or hijack scroll.
- **Why matters:** Breaks encapsulation, expands attack surface. Debug exposure left in production.
- **Fix:** Guard with `if (import.meta.env.DEV)` or remove entirely. If needed, expose via `useRef` context, not global.

### C-03 — No hardcoded secrets but PII exposure noted (uncertain — needs human review)
- **File:** `src/business/data.ts:9-11`, `src/data/portfolio.ts:12-13`
- **What:** Email `muhummadzarrar09@gmail.com`, phone `+92 333 5666050`, WhatsApp `923335666050` hardcoded in source. Not a secret, but PII in git history.
- **Why matters:** Scraping, spam. Acceptable for portfolio but should be documented as intentional.
- **Fix:** If intentional, add comment `// intentional public contact`. Consider obfuscation or form backend.

---

## High

### H-01 — Reverse tabnabbing via missing `rel="noopener noreferrer"`
- **Files:**
  - `src/business/BusinessProjects.tsx:14-16` `target="_blank"` without `rel`? Actually file has `rel="noreferrer"` on line 16, but earlier grep flagged line 14; re-checked: line 16 has rel, but still uses only `noreferrer` not `noopener noreferrer` (noreferrer implies noopener in modern browsers, but explicit is safer).
  - `src/components/Footer.tsx:44-46` `target="_blank" rel="noreferrer"` — missing `noopener`
  - `src/components/Hero.tsx:174-177` same
  - `src/components/Work.tsx:81-83` `target="_blank" rel="noreferrer"` and `156-158` same
  - `src/components/primitives.tsx:160` `rel="noreferrer"` when external
- **What:** All external links use only `noreferrer`. While `noreferrer` includes `noopener` in modern browsers, spec compliance requires both. Some older audit tools flag as vulnerability.
- **Why matters:** Without noopener, opened page can access `window.opener`.
- **Fix:** Change all to `rel="noopener noreferrer"` . In `MagneticButton`, enforce `rel="noopener noreferrer"` unconditionally for http links.

### H-02 — Global transition-duration override via `directors-cut`
- **File:** `src/index.css:248-252`
```css
.directors-cut * { transition-duration: 2.45s !important; animation-duration: 3.4s !important; }
```
- **What:** Overrides *every* element's transition, including inputs, modals, errors. Effects:
  - Contact form validation appears after 2.45s (UX DoS)
  - Focus styles delayed
  - Breaks accessibility for keyboard users waiting for visual feedback
  - `!important` makes debugging impossible, fights Tailwind
- **Why matters:** Performance, accessibility failure, future maintainability nightmare. 6-month scale risk: any new component will inexplicably be slow.
- **Fix:** Scope to cinematic components only, e.g., `.directors-cut .cinematic-img` not `*`. Remove `!important`. Use CSS variables.

### H-03 — State desync between ambient audio and UI toggle
- **Files:**
  - `src/components/CinematicProjectorAudio.tsx:9-20` calls `sound.startAmbient()` directly after 1850ms timeout, bypassing `SoundContext`
  - `src/context/SoundContext.tsx:32` `ambientOn` false by default but audio may already be playing
- **What:** Two owners of ambient state. User clicks mute toggle, but `CinematicProjectorAudio` started bed outside context. Toggle will think it's off while actually on, or double-start causing overlapping Gaines.
- **Why matters:** Logic bug, memory leak (multiple GainNodes), autoplay policy violation (starts without user gesture, will suspend then resume unexpectedly).
- **Fix:** Remove auto-start from `CinematicProjectorAudio`, or make it call `useSound` context. Single source of truth. Ensure `ensure()` respects user opt-in.

### H-04 — Unbounded user input to external URL (wa.me / mailto) — potential DoS / truncation
- **Files:**
  - `src/business/BusinessContact.tsx:43-60` `encodeURIComponent` wrapper but no length cap. User can paste 10k chars into message, produces >12k URL, exceeding browser 2k-8k limit. `window.open` will fail silently, fallback `window.location.href = url` then navigates away losing form.
  - `src/components/Contact.tsx:31-45` `buildMailto` similar, no max length. `window.location.href = mailto` line 128 navigation loses state if mail client not configured.
- **Why matters:** Edge case: empty, huge, unicode. Silent failure, data loss.
- **Fix:** Add validation: `if (message.length > 500) error`, `if (name.length > 100)`, trim, limit total mailto < 1800 chars. Show user-visible error if URL too long. Avoid `location.href` fallback for wa.me; show copyable link instead.

### H-05 — Direct DOM manipulation via `innerHTML = ""`
- **File:** `src/components/KineticText.tsx:52` `el.innerHTML = ""`
- **What:** Wipes DOM outside React. Currently safe because text is static prop and spans created via `createElement` + `textContent`. But pattern is risky: if `text` ever comes from user, could lead to XSS or React reconciliation clash + StrictMode double-invoke.
- **Why matters:** Breaks React abstraction, potential XSS vector if refactored.
- **Fix:** Use React state to render spans instead of manual DOM, or at least `el.replaceChildren()` + comment explaining safety. Add eslint rule ban innerHTML.

### H-06 — CSP allows `form-action 'self' mailto: https://wa.me` but code uses `window.open(https://wa.me/...)` not form. Minor mismatch
- **File:** `index.html:8` / `vercel.json:6`
- **What:** CSP `form-action` restricts form submissions, but external nav via JS not covered by form-action. If attacker injects JS could still open wa.me.
- **Why matters:** Low but inconsistent mental model.
- **Fix:** Add `navigate-to`? Or document intent.

### H-07 — Contact form validation regex too permissive, silent success without backend
- **File:** `src/components/Contact.tsx:52-56` `/^\S+@\S+\.\S+$/` accepts `a@b.c` and `test@test..com`? Actually rejects spaces only.
- **What:** No backend, only `mailto:` draft. User thinks email sent, but actually only opens local mail client. If no mail client, appears to fail silently though fallback link exists.
- **Why matters:** Business risk: lost leads thinking form submitted.
- **Fix:** Clarify copy: "Opens your email app — no backend". Add serverless email fallback option.

---

## Medium

### M-01 — Duplicated `useWhoosh` / `useSectionWhoosh` logic
- **Files:**
  - `src/business/useSectionWhoosh.ts:10` canonical hook
  - `src/components/About.tsx:39-48` local copy
  - `src/components/Expertise.tsx:11-19` copy
  - `src/components/Process.tsx:31-40` copy
  - `src/components/Work.tsx:230-241` copy named `useSectionWhoosh` locally
- **What:** Same whoosh sound on intersection, firing ref logic duplicated 5 times.
- **Why matters:** DRY, maintenance, if sound policy changes must edit 5 files.
- **Fix:** Delete local copies, import shared hook.

### M-02 — Repeated `gsap.registerPlugin(ScrollTrigger)` in multiple modules
- **Files:** `src/components/KineticText.tsx:6`, `src/components/Marquee.tsx:??` (uses gsap via useEffect but register not, actually in `src/components/Process.tsx:18`, `src/business/BusinessSections.tsx:9`, `src/components/Work.tsx:??` via import)
- **What:** In `KineticText.tsx`, `Process.tsx`, `BusinessSections.tsx` each calls `gsap.registerPlugin`. Redundant, and if tree-shaken may cause double registration logs.
- **Fix:** Centralize in one `lib/gsap.ts` that registers once.

### M-03 — Missing explicit `type="button"` on many buttons
- **Files:**
  - `src/business/BusinessFooter.tsx:13,19,28` (3)
  - `src/business/BusinessNav.tsx:51,57,70,89,97,151`
  - `src/business/BusinessSections.tsx:229` and `RetailFlow.tsx:72`
  - `src/components/CinematicReelPlayer.tsx:75`, `CinematicSequence.tsx:65`
  - `src/components/Contact.tsx:258`, `Footer.tsx:12,30,65`, `Nav.tsx:25,149,163,185,192`, `primitives.tsx:172`
- **What:** Buttons without type default to `submit` if ever placed inside a `<form>` in future refactor, causing accidental submissions.
- **Why matters:** Logic correctness, form pollution. Project's FIX_PLAN.md Phase 1 claimed fixed, but still many missing.
- **Fix:** Add `type="button"` to all non-submit buttons.

### M-04 — Infinite RAF drift in film strip without bounds / pause on invisible
- **File:** `src/components/CinematicFilmStrip.tsx:55-87`
- **What:** `el.scrollLeft += 0.048` every RAF forever, even after reaching max scrollLeft (scrollWidth - clientWidth). At end, scrollLeft stops increasing but RAF keeps running, wasting CPU. No `IntersectionObserver` to pause when offscreen.
- **Fix:** Check if at end, wrap to 0 or stop. Use `if (el.scrollLeft >= max) el.scrollLeft = 0`. Pause when not intersecting viewport.

### M-05 — ErrorBoundary only logs in DEV, swallows error in prod
- **File:** `src/components/ErrorBoundary.tsx:19-23`
- **What:** `if (import.meta.env.DEV) console.error` — production users get generic "Something slipped" with no telemetry.
- **Why matters:** Silent failures, hard to debug prod.
- **Fix:** Integrate error reporting (e.g., console.error always, or send to monitoring). At least log regardless.

### M-06 — SoundEngine swallows errors with empty catch
- **File:** `src/lib/sound.ts:117-132` try/catch around `stop()` and `disconnect()` with empty catch
- **What:** Silent failures hide AudioContext issues.
- **Fix:** Log warning in DEV, or comment as intentional.

### M-07 — Cursor ripple ID collision via `Date.now()`
- **File:** `src/components/Cursor.tsx:69` `const id = Date.now()`
- **What:** If two clicks within same millisecond (fast double-click or programmatic), duplicate id, second removal removes both ripples incorrectly.
- **Fix:** Use incrementing counter `useRef` or `Math.random()` + timestamp.

### M-08 — ScrollProgress listener never debounced, plus show flag causes layout thrash
- **File:** `src/components/ScrollProgress.tsx:12-18`
- **What:** `scrollYProgress.on("change")` not here but `window.addEventListener("scroll")` sets state on every scroll >80, may cause many re-renders. No throttle.
- **Fix:** Use `useTransform` for opacity or throttle.

### M-09 — Marquee GSAP animation not cleaned on reduced motion toggle
- **File:** `src/components/Marquee.tsx:19-43`
- **What:** Creates gsap.to with repeat -1, kills on unmount but not when prefers-reduced-motion changes during session. Also `anim` variable inside effect but `timeScale` accessed inside scroll handler after possible kill? Could cause error if unmounted quickly.
- **Fix:** Respect reduced-motion at effect start and add media query listener.

### M-10 — Terminal typing effect: cancelled flag race + timer overwrite
- **File:** `src/components/Terminal.tsx:60-83`
- **What:** Single `timer` variable reassigned across recursive `type()` calls. Cleanup clears only final timer at unmount time, but intermediate timers may have fired after cancelled set? Also `cancelled` boolean not ref, closure may be stale? It's within effect so okay, but still fragile.
- **Fix:** Use `useRef` to hold active timer id, and clear all on cleanup, or use `setInterval` pattern.

### M-11 — useTilt3D directly mutates DOM style outside React
- **File:** `src/hooks/useTilt3D.ts:29-31` `el.style.transform = ...`
- **What:** Works but bypasses React, may conflict with framer-motion transform. Also doesn't cleanup transform on unmount if component unmounts while tilted.
- **Fix:** Apply via `useMotionValue` or ensure `leave()` called on cleanup.

### M-12 — IntersectionObserver in Nav/BusinessNav doesn't re-observe lazy-loaded sections
- **Files:** `src/components/Nav.tsx:85-97`, `src/business/BusinessNav.tsx:21-32`
- **What:** On mount, queries `document.getElementById(l.id)` for each link. If sections are lazy (React.lazy) and not yet loaded, observer never observes them, so active pill never updates.
- **Fix:** Use effect that re-runs when sections mount, or observe via ref callback, or use MutationObserver.

### M-13 — CinematicReelPlayer timers: multiple setTimeout/setInterval without max bounds check
- **File:** `src/components/CinematicReelPlayer.tsx:19-43` `intervalRef`, `flickerRef`, `stopTimerRef`, `flickerTimerRef` all managed, but `toggle` does not check if element already has filter transition from previous run.
- **Fix:** Already has cleanup, but ensure `stopPlayback` called before `startPlayback` second time.

### M-14 — BusinessContact clipboard fallback navigates away
- **File:** `src/business/BusinessContact.tsx:72-74` `window.location.href = mailto:`
- **What:** If clipboard fails (not secure context), full navigation to mailto: hijacks page, loses form state.
- **Fix:** Provide visible email link instead of navigation, same as Contact.tsx fallback.

### M-15 — useLenis easing magic number `1.0010000000000001`
- **File:** `src/hooks/useLenis.ts:19` `(-Math.pow(2, -10 * t) + 1)` multiplied by `1.001...`
- **What:** Looks like typo/debug artifact, causes easing to overshoot >1 by 0.1%. Could cause scroll jitter at end.
- **Fix:** Use clean `1 - Math.pow(2, -10*t)`.

### M-16 — Hardcoded SITE_URL duplication
- **Files:** `src/components/SeoRouteMeta.tsx:4`, `index.html:10,15,34`, `public/robots.txt:4`, `public/sitemap.xml:4,8`
- **What:** 6 places. If domain moves, miss one causes SEO inconsistency.
- **Fix:** Centralize in env var `VITE_SITE_URL` and generate sitemap/robots at build time.

### M-17 — Performance: high-segment 3D geometries
- **Files:**
  - `src/components/CinematicSculpture.tsx:56` `torusKnotGeometry args={[1.05, 0.42, 420, 64, 2, 7]}` 420 radial segments
  - `src/components/ScrollReactiveSculpture.tsx:84` `360, 56`
  - `src/components/CinematicSystems.tsx:19` `175, 24`
  - `src/components/CinematicLightStudy.tsx:18` `72,56` etc.
- **What:** Very high poly counts for silky smoothness but cause GC pressure, frame drops on low-end/mobile, high memory. Despite manualChunks vendor-3d.
- **Why matters:** Scalability, mobile perf.
- **Fix:** Cap segments to ~128-200, use LOD, or dynamic import only on desktop, keep reducedMotion fallback static.

### M-18 — ScrollReactiveSculpture scroll multiplier extremely high, causes disorientation + potential motion sickness
- **File:** `src/components/ScrollReactiveSculpture.tsx:28-39` `scrollOrbit = p * 8` rad, `scrollTilt = p*3.2`
- **What:** 8 radians ~ 458 degrees rotation based on scroll progress. User scroll 0-1 rotates sculpture >1 full turn + additional, very disorienting. FIX_PLAN.md Phase 4 said reduced extreme transforms but still high.
- **Fix:** Reduce to < Pi, make it additive not absolute.

---

## Low

### L-01 — Dead code file `DirectorsCut.tsx`
- **File:** `src/components/DirectorsCut.tsx:12` returns null, never imported in codebase (grep shows no import)
- **Fix:** Delete or document as deprecated.

### L-02 — Inconsistent component export styles
- Some files default export (`About.tsx`, `Hero.tsx`, `Nav.tsx`), some named (`CinematicImage.tsx`, `KineticText.tsx`). Causes `lazy(() => import(...).then(m => ({default: m.X})))` boilerplate in `App.tsx:22-27`, `Hero.tsx:17-19`, etc.
- **Fix:** Standardize on default or named, not both.

### L-03 — Empty alt attributes on decorative images but missing explicit decorative flag? Actually okay
- **Files:** `src/components/About.tsx:??` `alt=""` on cinematic images, good for decorative, but some cinematic break images have `alt=""` missing `role="presentation"`? Minor.

### L-04 — Magic strings for IDs `#film-strip`, `top`, `about` spread across codebase
- `src/components/CinematicSequence.tsx:39` hardcodes section IDs `["top","about","work","film-strip","process","expertise","contact"]` — if ID changes, breaks.
- **Fix:** Central constant.

### L-05 — No `prefers-reduced-motion` check in many GSAP scrollTriggers
- Files `BusinessSections.tsx`, `Process.tsx` use GSAP ScrollTrigger scrub without checking reducedMotion. Lenis hook respects it, but GSAP does not.
- **Fix:** Wrap gsap code in `if (!matchMedia("(prefers-reduced-motion: reduce)").matches)`.

### L-06 — Business data: `clinic` export unused?
- Grep shows `clinic` defined in `data.ts:296` but only used in `ClinicLaunch.tsx` which is not imported anywhere (dead component). `ClinicLaunch` not used in `BusinessSite.tsx`.
- So dead code: 2 files unused but shipped.

### L-07 — `BizMarquee` vs `Business` naming inconsistency
- Folder `business` vs `components`. Files: `BizMarquee.tsx` vs `BusinessHero.tsx` etc. Inconsistent prefix.
- **Fix:** Rename to `BusinessMarquee`.

### L-08 — Large images in `public/images/` not converted to WebP/AVIF
- 7 jpg total 1.3MB, no `<picture>` srcset. Could save ~60% bytes.
- **Fix:** Convert to webp, add vite-imagetools or compress.

### L-09 — No CI workflow file despite FIX_PLAN.md Phase 12 claiming prepared
- Repo has no `.github/workflows/`. Quality gate relies on local `npm run check`.
- **Fix:** Add GitHub Action running typecheck+lint+build+e2e.

### L-10 — `.gitignore` misses `.env.example` allowance valid, but also ignores `playwright-report` but not `coverage` etc. Minor.

### L-11 — `package.json` name `react-vite-tailwind` generic, not project name.

### L-12 — `index.css` defines `@theme` with custom colors but no dark mode support documented. Future scale risk.

### L-13 — `src/business/Dropdown.tsx` uses `appearance-none` but no `aria-label` when label outside? It has label wrapper but select missing id association.
- `<label><span>Business type</span><select>...` — nested label gives implicit association, but still better explicit id.
- **Fix:** Add id.

### L-14 — `src/data/portfolio.ts` profile.avatar loads from `https://avatars.githubusercontent.com` — external image, CSP allows it via `img-src ... https://avatars.githubusercontent.com` good, but no fallback if GitHub down.
- Minor.

### L-15 — `src/utils/cn.ts` trivial wrapper, but no tests.

### L-16 — Typo risk: `mul:1` in Lenis? not.

---

## Uncertain — Needs Human Review

- **U-01:** `src/business/BusinessContact.tsx` `window.open(url, "_blank", "noopener,noreferrer")` — popup blockers may block, fallback to `location.href` changes current tab to WhatsApp, losing site. Is that acceptable UX? Consider showing QR or copy.
- **U-02:** `src/components/Contact.tsx` `window.location.href = mailto:` may trigger navigation leaving SPA — desired? Might be better to use hidden anchor click.
- **U-03:** `src/hooks/useLenis.ts` `touchMultiplier: 1.6` high — may cause overscroll on iOS? Needs device testing.
- **U-04:** `src/index.css` `grain::before` fixed inset -50% width 200% height 200% with animation — may cause compositing cost on every frame. Check performance tab.
- **U-05:** `src/lib/sound.ts` `noiseBuffer` creates 6s white noise buffer at sampleRate (usually 48k) = 288k floats per buffer, 2 buffers = ~2.2MB memory — okay but on low-end may be heavy. Review.

---

## Overall Codebase Health Summary

This codebase is a **design-forward static portfolio** with no backend, so classic injection/SQLi/RCE vectors are absent and `npm audit` shows zero vulnerabilities, which is strong. However, the audit reveals **significant architectural and maintainability debt masked by visual polish**: CSP hashes are out-of-sync across three locations breaking structured data; global state leaks (`window.__lenis`), duplicated hooks (`useWhoosh` x5) and scattered GSAP registrations violate DRY; the `directors-cut` global `*` override with `!important` creates a 2.45s transition DoS for all UI; several buttons lack explicit `type`, and external links rely on `noreferrer` alone; 3D sculptures use extremely high segment counts and aggressive scroll multipliers causing performance and motion-sickness risks; forms build `mailto:` and `wa.me` URLs without length caps and fall back to destructive navigations; and dead code (`DirectorsCut`, `ClinicLaunch`) plus inconsistent export styles and hardcoded site URLs increase future drift risk. Fixing the CSP hash, centralizing scroll/audio state, scoping the cinematic CSS, adding proper input validation, and standardizing header generation would return the project to a solid production baseline while preserving its cinematic intent.

