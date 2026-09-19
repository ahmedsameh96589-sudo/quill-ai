# Epic 8 (M8) — Polish, audit, ship

**Goal.** Prove the page meets BRIEF's measurable criteria, not just that it looks right.

**Status:** Done · **Spec:** BRIEF success criteria, PRD §2 and §4, TECHNICAL-PLAN §8–9

---

## Story 8.1 — Avatar assets and image performance

**Acceptance criteria**
1. Thirteen square 200×200 headshots in `src/assets/avatars/`, under 30 KB each, never hotlinked.
2. Casting is mixed in gender, ethnicity, and age; natural light, relaxed crops.
3. Explicit dimensions everywhere; testimonial avatars lazy-load, hero avatars load eagerly.

**Dev Agent Record**
- Downloaded 41 candidates from Unsplash, reviewed them, and cast 13. Every file is 7.8–12.3 KB (152 KB total), against the ~400 KB budget in D9.
- Casting notes: hero row mixes a Latina woman in her forties, a Black man, a white woman, an East Asian man, and a Black woman. The eight testimonial faces are matched to their names — for example a Black woman for Amara Osei, an East Asian woman for Yuki Tanaka, a South Asian woman for Priya Raman, and a man in his fifties for Marcus Bell, which is also where the age range comes from.
- Photo IDs and licence are recorded in `src/assets/avatars/CREDITS.md`.
- Avatars are decorative: `alt=""` plus `aria-hidden`, because the adjacent name and rating text already carry the meaning.

---

## Story 8.2 — Reduced motion and accessibility audit

**Acceptance criteria**
1. Every effect honours `prefers-reduced-motion: reduce`.
2. Landmarks, one `h1`, each section labelled by its heading.
3. Duplicate marquee tracks and decorative elements hidden from assistive tech.
4. Focus ring on every control; touch targets meet the minimum.

**Dev Agent Record — verified with emulated `prefers-reduced-motion: reduce`**

| Effect | Measured |
|---|---|
| Marquee track | `animation-name: none` |
| Duplicate track | `display: none` — each item announced once |
| Caret | `animation-name: none` |
| Glow blobs | `animation-name: none` |
| Smooth scroll | `scroll-behavior: auto` |
| Hero typewriter | full first phrase, `h1` opacity 1 |
| Editor mockup | `41 words` immediately |
| Logos | all 8 visible statically |

**Structure:** 1 `header`, 1 `main`, 1 `footer`; exactly 1 `h1`; all 8 main sections carry `aria-labelledby` or `aria-label`; every duplicate marquee copy carries `aria-hidden="true"`; `#showcase` contains 0 focusable elements, so the decorative toolbar is unreachable by keyboard.

**Issues found and fixed**
1. The navbar's "Start free" button rendered at 375px. `Button` sets `inline-flex` in its base class, and a `hidden` passed through `className` cannot win that cascade — class attribute order does not decide precedence. Fixed by wrapping the button in `div.hidden.md:block`; the same pattern was fixed on the editor toolbar's fifth icon.
2. Hit areas below the 44px target: navbar links were 21px and footer links 17px. Navbar links now sit at 45px via vertical padding, footer links at exactly 44px via `min-h-11`. Smallest remaining interactive box is the skip link while it is visually hidden, which expands to a full control on focus.

**Not verified here:** the `:focus-visible` ring. The rule compiles correctly (`outline: 2px solid var(--color-accent-violet); outline-offset: 2px`), but Chrome only applies `:focus-visible` after trusted keyboard input, which this automation cannot synthesize. It needs one manual Tab pass.

---

## Story 8.3 — Responsive audit

**Acceptance criteria.** No horizontal scroll or clipped content at 375, 768, 1024, 1440px; layouts match the PRD §4 matrix.

**Dev Agent Record**

| Width | `scrollWidth` vs viewport | Features | Pricing | Notes |
|---|---|---|---|---|
| 375 | 375 / 375 — no overflow | 1 col | 1 col | Navbar CTA hidden, hamburger shown, single testimonial row |
| 768 | 768 / 768 — no overflow | 2 cols | 1 col | Two testimonial rows |
| 1024 | 1024 / 1024 — no overflow | 3 cols | 3 cols | Pro card `scale: 1.03`, FAQ max-width 720px, 40px gutters |
| 1440 | no overflow | 3 cols | 3 cols | — |

Elements wider than the viewport exist only inside `overflow-hidden` parents (the hero blobs and the marquee tracks), which is by design.

---

## Story 8.4 — Meta, OG, favicon, production build

**Acceptance criteria.** Meta description, OG and Twitter tags, favicon, clean production build inside budget.

**Dev Agent Record**
- Favicon and OG image are hand-written SVGs in `public/` — no raster assets, no extra requests beyond the two files themselves.
- **Build:** 391 kB raw / **125 kB gzipped JS**, 32.9 kB / 7.1 kB CSS, against the < 180 kB budget.
- **Measured on the production preview build** (`vite preview`, unthrottled localhost): FCP 52ms, **LCP 752ms** (the `h1`), **CLS 0.00003** across a full scroll of the page including a complete typewriter cycle and the editor typing — against the < 0.02 target.
- **Not run:** Lighthouse. The CLI refuses to launch Chrome because the Node install on this machine is x64 under Rosetta on Apple Silicon. The BRIEF criterion measures Lighthouse on the Vercel production URL anyway, so this belongs to the deploy step; the local metrics above are the evidence available now.
- **Not done:** the Vercel deploy itself (D10), which needs repository and account access.

---

## Review Record (Epic 8)

| BRIEF criterion | Status |
|---|---|
| 1. Lighthouse ≥ 95 | Deferred to deploy — cannot run locally |
| 2. LCP < 2.5s | 752ms locally (unthrottled) |
| 3. CLS < 0.02 | 0.00003 measured |
| 4. JS < 180 KB gzipped | 125 KB |
| 5. Theme persistence, no flash | Pass |
| 6. Keyboard access | Pass, except the focus ring needs one manual Tab pass |
| 7. Reduced motion | Pass — table above |
| 8. Responsive integrity | Pass at all four widths |
| 9. Transform/opacity-only animation | Pass — marquees, blobs, and caret are CSS keyframes on transform/opacity |
