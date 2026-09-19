# Epic 4 (M4) — Marquee engine, logos, features

**Goal.** One generic marquee that serves every infinite row on the page, plus the six-card feature grid.

**Status:** Done · **Spec:** PRD §3.3–3.4, DECISIONS D7

---

## Story 4.1 — Generic `Marquee`

**Acceptance criteria**
1. Children rendered twice; the duplicate track is `aria-hidden="true"`.
2. `translateX(0 → -50%)` CSS keyframe with a per-instance duration; `reverse` flips direction.
3. Pauses on `:hover` and `:focus-within`; 48px edge fade masks.
4. Reduced motion stops the animation and renders a static wrapped row.

**Dev Agent Record**
- The seamless loop is a geometry guarantee: the track is two identical copies, so shifting by exactly 50% lands the second copy where the first began. No JavaScript runs per frame.
- Reduced motion needed one addition beyond stopping the animation — the duplicate copy is hidden with `.marquee-copy[data-duplicate="true"] { display: none }` so a static grid shows each item exactly once, and the remaining copy is allowed to wrap.
- **Verified:** every duplicate track carries `aria-hidden="true"`; under emulated reduced motion `animation-name` is `none` and the duplicate's `display` is `none`.

---

## Story 4.2 — `LogoMarquee`

**Acceptance criteria**
1. Caption label, eight fictional wordmarks as styled text (no images), 32s.
2. Screen readers announce each name once.
3. Reduced motion shows all eight statically.

**Dev Agent Record**
- Wordmarks are `.type-wordmark` text at 80% `text/tertiary`, scaled 0.9 below `md` per the responsive matrix.
- **Verified:** eight visible wordmarks under reduced motion.

---

## Story 4.3 — `Features`

**Acceptance criteria**
1. Six cards with the PRD §3.4 icons and copy.
2. 1 / 2 / 3 columns at mobile / tablet / desktop.
3. Cards stagger in once on `whileInView`; hover lifts 4px and brightens the border.

**Dev Agent Record**
- Card hover is a CSS transition on `GlassCard`, not a motion prop — reveals are the only thing Framer Motion drives here.
- **Verified:** `grid-template-columns` resolves to 2 tracks at 768px and 3 at 1024px; single column at 375px with no clipped text.

---

## Review Record (Epic 4)

| Check | Result |
|---|---|
| One marquee component serves logos and both testimonial rows | Pass |
| Zero per-frame JavaScript | Pass — CSS keyframes only |
| Duplicate tracks hidden from assistive tech | Pass |
| Responsive column counts match PRD §4 | Pass |
