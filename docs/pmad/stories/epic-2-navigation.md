# Epic 2 (M2) — Navigation shell

**Goal.** A sticky navbar that turns to glass on scroll, a theme toggle, and a fully keyboard-operable mobile menu.

**Status:** Done · **Spec:** PRD §3.1, DESIGN-SYSTEM §5.1–5.3

---

## Story 2.1 — UI primitives

`Button`, `GlassCard`, `GradientText`, `Reveal`/`RevealItem`, `SectionHeading`.

**Acceptance criteria**
1. Four button variants and two sizes per DESIGN-SYSTEM §5.1; renders `<a>` when given `href`.
2. `Reveal` implements fade + 24px rise, `whileInView`, `once: true`, `margin: -80px`, 600ms ease-out-expo.
3. Reduced motion collapses reveals to instant opacity — implemented once here, not per section.

**Dev Agent Record**
- `Reveal` takes a `stagger` prop. When staggering, the wrapper stays visually inert and only orchestrates its `RevealItem` children, so a parent fade never masks the children's own fades. Without it the wrapper animates itself.
- `immediate` swaps `whileInView` for `animate` — that one prop is what makes the hero load-in reuse the same component as every scroll reveal.
- **Issue found and fixed during Epic 8 review:** `Button` puts its own `inline-flex` in the base class, so a caller passing `hidden` loses the cascade. Documented in `Button`'s call site in `Navbar`; callers wrap instead of passing display utilities.

---

## Story 2.2 — Navbar with glass-on-scroll

**Acceptance criteria**
1. Fixed, 64px mobile / 72px desktop, transparent at the top.
2. Past 8px: `bg/nav-glass` + `blur(16px)` + 1px bottom border, 250ms transition.
3. Anchor links smooth-scroll with 96px `scroll-margin-top`.

**Dev Agent Record**
- `useScrolled(8)` uses a passive listener throttled through `requestAnimationFrame`; the glass state is a plain CSS class swap, so nothing animates from JavaScript.
- Smooth scrolling is native (`scroll-behavior: smooth` plus `scroll-margin-top: 96px` on `section[id]`), and the reduced-motion query flips it to `auto`.
- **Verified:** desktop nav links hidden below 768px, hamburger hidden above it.

---

## Story 2.3 — MobileMenu

**Acceptance criteria**
1. Full-screen `bg/surface` panel, links stagger in at 0.06s, hamburger cross-fades to an X.
2. Body scroll locks while open.
3. Focus moves into the panel on open, is trapped while open, and returns to the hamburger on close.
4. Closes on link tap, Escape, or backdrop press.

**Dev Agent Record**
- One effect owns the whole open lifecycle: scroll lock, initial focus, the Tab cycle, and Escape — so there is exactly one place where the panel can leak state on unmount.
- **Issue found and fixed:** the hamburger and theme icons both rendered at full opacity on first paint, because a `motion` component with `animate` but no `initial` treats the DOM's current style as the start. Both now pass `initial={false}`.
- **Verified at 375px:** opening sets `aria-expanded="true"`, locks `body` overflow, and moves focus to the first link ("Features"); Escape removes the panel, restores `body` overflow, and returns focus to the hamburger.

---

## Review Record (Epic 2)

| Check | Result |
|---|---|
| PRD §3.1 acceptance criteria | Pass |
| Keyboard: open, trap, Escape, focus return | Pass — verified in browser |
| No JS-driven animation for the glass state | Pass — CSS transition only |
| Icon cross-fade without first-paint flash | Pass after the `initial={false}` fix |
