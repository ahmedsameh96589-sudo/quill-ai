# Epic 6 (M6) — Testimonials and pricing

**Goal.** Counter-scrolling social proof, and a pricing block whose numbers animate without ever getting stuck between states.

**Status:** Done · **Spec:** PRD §3.6–3.7

---

## Story 6.1 — `TestimonialsMarquee`

**Acceptance criteria**
1. Desktop: rows of 4 at 48s and 60s in opposite directions; mobile: one row of 8 at 80s.
2. Both rows pause on hover/focus; each testimonial is announced once.
3. Reduced motion renders all eight as a static grid.

**Dev Agent Record**
- Rather than switching row composition in JavaScript, both layouts are in the DOM and swapped with `md:hidden` / `hidden md:flex`. Display-none keeps the inactive layout out of the accessibility tree.
- **Verified:** at 1440 under reduced motion the mobile copy is hidden and the two desktop rows render statically with 4 cards each.

---

## Story 6.2 — `BillingToggle` and `AnimatedPrice`

**Acceptance criteria**
1. `role="radiogroup"` with two radios, `aria-checked`, arrow-key movement, roving tabindex.
2. Knob slides with a `layoutId` spring (stiffness 500, damping 35).
3. Prices slide out up and in from below over 250ms; rapid toggling always settles on the selection.
4. "Save 20%" stays attached to Yearly.

**Dev Agent Record**
- `AnimatePresence mode="popLayout"` keyed on the value gives interruptibility for free — the settle-on-selection criterion is a property of the animation model, not extra code.
- The badge lives inside the Yearly button so it can never drift away from its label.
- **Verified:** Monthly → Yearly moves $20 → $16 and $45 → $36 and swaps captions to "per month, billed yearly"; four rapid toggles in a row still settle on the selected period.

---

## Story 6.3 — `Pricing`

**Acceptance criteria**
1. Three tiers with PRD §3.7 copy; Pro carries a gradient border, badge, `glow-popular`, and scales 1.03 at ≥1024px.
2. Stacks to one column below 1024px.
3. Footnote below the grid.

**Dev Agent Record**
- The Pro gradient border is the double-background technique (`padding-box` + `border-box`). Its inner layer uses the `--card-solid` token from Story 1.2, since a translucent `bg/raised` would let the gradient bleed through the card face.
- **Verified:** `grid-template-columns` is 1 track at 768px and 3 at 1024px; the Pro card's computed `scale` is `1.03` at 1024px.

---

## Review Record (Epic 6)

| Check | Result |
|---|---|
| PRD §3.6 and §3.7 acceptance criteria | Pass |
| Rapid-toggle interruption | Pass — verified with four consecutive clicks |
| Radiogroup semantics | Pass — `aria-checked` flips, roving tabindex |
| Default is Monthly on load | Pass — verified after reload |
