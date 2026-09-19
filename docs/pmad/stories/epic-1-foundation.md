# Epic 1 (M1) — Foundation, tokens, theming

**Goal.** A Vite + React 19 + Tailwind v4 app whose design tokens, theming, and content data all come from the spec documents, ready for sections to be dropped in.

**Status:** Done · **Spec:** TECHNICAL-PLAN §1–5, DESIGN-SYSTEM §1–4, DECISIONS D1/D2/D5/D6

---

## Story 1.1 — Vite + React + Tailwind v4 scaffold

As the implementer, I want the exact dependency set from TECHNICAL-PLAN §1 installed and building, so later stories never fight the toolchain.

**Acceptance criteria**
1. `react`/`react-dom` 19, `vite` 7, `@vitejs/plugin-react` 4, `tailwindcss` + `@tailwindcss/vite` 4, `motion` 12, `lucide-react` — no other runtime dependencies.
2. `npm run build` succeeds.
3. Folder structure matches TECHNICAL-PLAN §2.

**Dev Agent Record**
- `package.json`, `vite.config.js` (react + tailwind plugins), `.gitignore` written by hand rather than `create-vite`, because the repo already held the four spec documents.
- `npm install` added 83 packages, 0 vulnerabilities. Vite 7.3.6.
- First build: 223 kB / 69.65 kB gzipped (React only) — well inside the 180 kB budget.
- **Verified:** build exit 0.

---

## Story 1.2 — Design tokens in `@theme`

As a developer, I want every colour, radius, shadow, type step, and motion value to exist as a token, so no component ever hard-codes a hex.

**Acceptance criteria**
1. All DESIGN-SYSTEM §1–4 tokens declared once in `src/index.css`.
2. `.light` overrides every theme-dependent value; dark is the default.
3. The responsive type scale resolves to the mobile/tablet/desktop sizes in §2.2.
4. Marquee, caret, and blob keyframes live next to the tokens; one reduced-motion media query covers them all.

**Dev Agent Record**
- Colour, font, radius, shadow, and easing tokens go in `@theme` so Tailwind generates utilities (`bg-bg-base`, `text-text-primary`, `border-border-subtle`). Gradients, glows, scrim, and durations go in a plain `:root` block — they are consumed directly, not as utilities, and are not Tailwind namespaces.
- The type scale is expressed as `.type-*` component classes with breakpoint media queries, because a Tailwind `--text-*` token cannot hold three responsive values.
- Added two tokens the spec implies but does not name: `--tile-violet` (feature-card icon tile, 15% dark / 10% light) and `--card-solid` (the opaque equivalent of `bg/raised` over `bg/base`, needed as the inner layer of the Pro card's gradient border).
- **Verified:** compiled CSS contains `.bg-bg-base{background-color:var(--color-bg-base)}` and both `--color-bg-raised` declarations (dark `#ffffff0a`, light `#fff`).

---

## Story 1.3 — Theme provider, toggle contract, pre-paint script

**Acceptance criteria**
1. Inline script in `index.html` applies the stored class before first paint; unknown values coerce to dark.
2. `ThemeProvider` reads the applied class as its source of truth and persists to `quill-theme` inside try/catch.
3. `prefers-color-scheme` is ignored (D6).

**Dev Agent Record**
- `readAppliedTheme()` reads `document.documentElement.classList` rather than storage, so the provider can never disagree with what the user already sees.
- Storage writes are wrapped; a blocked `localStorage` degrades to an in-memory toggle for the session.
- **Verified in browser:** toggle flips `<html>` `dark` → `light`, writes `quill-theme=light`, updates the button's `aria-label`; after a reload the class is `light` on first paint with the stored value intact.

---

## Story 1.4 — Data modules and section order

**Acceptance criteria**
1. Nine data modules in `src/data/` matching the shapes in TECHNICAL-PLAN §4.
2. All page copy comes from data or the spec — nothing invented.
3. `App.jsx` composes the ten sections in PRD §1 order.

**Dev Agent Record**
- Added a tenth module, `heroAvatars.js`, so the hero's five images are imported the same way the testimonials' eight are, instead of being inlined in the section.
- **Verified:** the rendered page reads in PRD order — Navbar, Hero, LogoMarquee, Features, ProductShowcase, TestimonialsMarquee, Pricing, FAQ, FinalCTA, Footer.

---

## Review Record (Epic 1)

| Check | Result |
|---|---|
| Tokens traceable to DESIGN-SYSTEM | Pass — two derived tokens documented above |
| Dark default, light override, no flash | Pass — verified across a reload |
| Dependency list matches TECHNICAL-PLAN §1 | Pass — no extras |
| Build | Pass |
