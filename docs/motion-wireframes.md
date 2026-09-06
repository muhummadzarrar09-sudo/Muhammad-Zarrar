# Motion wireframes

Source of truth: `src/motion/wireframes.ts`, `src/motion/walk.ts`, `src/motion/exhibit.ts`, `src/motion/plaques.ts`.

The homepage is a gallery walk. Motion is tied to the wheel (`scrub`, ease none). If you stop, it stops. Scroll back and the room undoes.

`prefers-reduced-motion: reduce` skips Lenis and every scene.

## The walk

| Rule | Feel |
| --- | --- |
| Wheel-tied | Nothing plays on a timer |
| Soft rooms | Canvas dissolves behind **opaque** walls. Rooms never fade as a layer |
| Doorway | ~160vh corridor — old room still readable at ~40% |
| Rewind | Scroll up unwrites type, eases the card out, releases the pin |
| Hero | A bare `<` and `>` frame the promise. The type dissolves, the marks meet as `</>`, a minimal loading line completes, and Lenis carries the visitor into the next room |
| Pause | Pin ~280vh (shorter on the phone). Type with the scroll |
| Manifesto | Still a long pin. Lines write and unwrite |
| Phone | Same walk, shorter pins, slightly faster scrub |
| Scope | Every route |

## Home

| id | Feel |
| --- | --- |
| `hero-leave` | The sentence thins as the walk begins |
| `walk-*` | Whole frame dissolves room to room |
| `recognize` | The room pins (CSS-sticky stage, 360vh). Intro on the left, rail between, findings cycle one-by-one on the right. Each card crossfades in and is scanned by the clay beam; ticks fill, the counter counts, the rail settles to clay when the scan completes. Scroll back unwrites the whole diagnosis |
| `exhibit-pin` | Painting holds. Card, then letters, on the wheel |
| `plaque-room` | Three circular plaques settle from visible nails and rewind with the wheel |
| `contrast` | Usual vs here |
| `next-steps` | After you send it |
| `manifesto-write` | Folio holds. Letters write only after this room hits the top |
| `brief-last` | The last room |

## Every route

`page-leave` — title is already there; it thins as the rest of the page walks in.
