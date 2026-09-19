# Epic 7 (M7) — FAQ, final CTA, footer

**Goal.** Close the page: a spring accordion, the gradient CTA panel, and a footer whose anchors work and whose fictional links stay put.

**Status:** Done · **Spec:** PRD §3.8–3.10

---

## Story 7.1 — `FAQ` accordion

**Acceptance criteria**
1. Six items, all collapsed on load, single-open behaviour, re-click collapses.
2. Spring height + opacity (stiffness 300, damping 32); chevron rotates 180° in sync.
3. Trigger is a `button` with `aria-expanded`/`aria-controls`; panel is `role="region"` with `aria-labelledby`.
4. Reduced motion falls back to a 150ms fade.

**Dev Agent Record**
- `FAQ` owns a single `openId`, so single-open is structural rather than a rule each item has to respect.
- **Verified:** opening Q2 then Q5 leaves only Q5 expanded; clicking Q5 again collapses everything; the panel resolves to `role="region"` labelled by its own trigger id.

---

## Story 7.2 — `FinalCTA`

**Acceptance criteria**
1. Rounded gradient panel with the scrim and a 4% noise overlay, white text, theme-invariant.
2. Heading, sub, button, microcopy reveal with stagger; button hover scales 1.03 with a white glow.
3. Text on the gradient meets WCAG AA.

**Dev Agent Record**
- The noise is an inline `feTurbulence` data URI — no image file and no network request, as DESIGN-SYSTEM §1.3 requires.
- The scrim sits under the noise and above the gradient; it is what lets white-at-70% microcopy clear 4.5:1.
- **Verified:** the panel renders identically in both themes.

---

## Story 7.3 — `Footer`

**Acceptance criteria**
1. Logo, tagline, four link columns, three social buttons with labels, bottom bar.
2. Product column anchors scroll to their sections; Company/Resources/Legal links do not navigate.
3. No reveal animation.

**Dev Agent Record**
- Inert links keep `href="#"` for focusability and call `preventDefault` only when the href is literally `#`, so the real anchors in the Product column pass straight through the same handler.
- **Verified:** every social button has an `aria-label`; footer link hit areas are 44px tall after the Epic 8 audit.

---

## Review Record (Epic 7)

| Check | Result |
|---|---|
| Accordion ARIA and single-open | Pass — verified in browser |
| CTA panel theme-invariant, AA contrast | Pass |
| Inert links do not navigate or jump | Pass |
