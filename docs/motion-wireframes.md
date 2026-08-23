# Motion wireframes

Source of truth: `src/motion/wireframes.ts`, `src/motion/walk.ts`, `src/motion/exhibit.ts`, plus the scene modules below.

The homepage is a gallery walk. Motion is tied to the wheel (`scrub`, ease none). If you stop, it stops. Scroll back and the room undoes.

`prefers-reduced-motion: reduce` skips Lenis and every scene.

## The walk

| Rule | Feel |
| --- | --- |
| Wheel-tied | Nothing plays on a timer |
| Soft rooms | Canvas dissolves behind **opaque** walls. Rooms never fade as a layer |
| Doorway | ~160vh corridor — old room still readable at ~40% |
| Rewind | Scroll up unwrites type, eases the card out, releases the pin |
| Hero | Glass sign split left/right. Type swooshes back; halves lock into one |
| Pause | Pin ~280vh (shorter on the phone). Type with the scroll |
| Manifesto | Still a long pin. Lines write and unwrite |
| Phone | Same walk, shorter pins, slightly faster scrub |
| Scope | Every route |

## Home

| id | Feel |
| --- | --- |
| `hero-enter` | Arrival, once per visit: the promise rises out of masks, the sign halves slide in from the wings (`hero.ts`) |
| `hero-leave` | The sentence thins as the walk begins |
| `walk-*` | Whole frame dissolves room to room |
| `recognize` | Tuesday rises with the wheel |
| `exhibit-pin` | Painting holds. Card, then letters, on the wheel (ken-burns exactly as designed — untouched) |
| `plaque-*` | Three circular plaques hang from the nails |
| `contrast` | Usual vs here |
| `next-steps` | After you send it |
| `manifesto-write` | Folio holds. Letters write only after this room hits the top |
| `brief-last` | The last room |
| `lines-*` | `.sec-title` / `.room-title` split into masked lines that rise with the wheel and sink back on rewind (`lines.ts`, SplitText) |
| marquee | The wall label drifts at reading speed; the wheel's velocity swells, slows, or reverses it, then it settles (`marquee.ts`) |
| `parallax-*` | Any element with `data-parallax="0.04"` drifts ±that fraction of its height, scrubbed (`parallax.ts`) — currently the plaque grid only; the exhibit ken-burns stays untouched, so no canvas drift |

## Every route

`page-leave` — title is already there; it thins as the rest of the page walks in.

`page-hero-lines` — the inner-page h1 splits into masked lines and rises once on arrival, breadcrumb/eyebrow/lede settling after it (`lines.ts`).

`rv` — the IntersectionObserver reveal (`components/reveal.tsx`) toggles both directions; the original opacity + rise transition, untouched.

## Smooth-scroll plumbing

- One anchor offset everywhere (`ANCHOR_OFFSET = -84` in `engine.ts`, mirrored by `scroll-margin-top: 84px` in CSS): hash landings clear the 68px sticky header.
- Cross-route hash (`/#brief` from an inner page), reloads with a hash, and `hashchange` all glide through Lenis after the route boots.
- Same-route nav links (`SmartLink`) glide to top instead of going dead; the footer's Back-to-top button rides the same channel (`motion:scrollTo` CustomEvent).
