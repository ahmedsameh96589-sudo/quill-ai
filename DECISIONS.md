# Quill AI — Decision Log

The ten architecture and design decisions behind the Quill AI landing page, each with the options weighed and the consequences accepted.

| | |
|---|---|
| Project | Quill AI |
| Document | DECISIONS |
| Status | Approved |
| Owner | Ziad |
| Date | 2026-08-28 |

---

## Index

| # | Decision | Area |
|---|---|---|
| D1 | Vite 7 + React 19 SPA, no meta-framework | Framework |
| D2 | Tailwind CSS v4 with `@theme` design tokens | Styling |
| D3 | Framer Motion (`motion` package) for orchestrated animation | Animation library |
| D4 | No router — anchor navigation on a single page | Routing |
| D5 | Static data modules in `src/data/`; localStorage for theme only | Data & persistence |
| D6 | Class-based theming, dark default, system preference ignored | Theming |
| D7 | Marquees as duplicated-track CSS keyframes, not JS | Animation technique |
| D8 | Custom `useTypewriter` hook instead of a typing library | Animation technique |
| D9 | Local stock avatars + code-built product mockup, no screenshots | Images |
| D10 | Static deployment on Vercel | Deployment |

---

## D1 — Vite 7 + React 19 SPA, no meta-framework

**Context.** One static marketing page with heavy client-side animation, built as a portfolio piece inside a workspace where every project shares one stack.

**Options considered**
- **Next.js 15** — SSR/SSG, image optimization, but a server-shaped framework for a page with zero routes and zero data fetching.
- **Astro** — great for static marketing sites, but islands architecture fights a page where nearly every section is interactive/animated React.
- **Vite 7 + React 19** — plain SPA, instant dev server, tiny config.

**Decision.** Vite 7 + React 19, client-only.

**Rationale.** The page has no server concerns: no data fetching, no auth, no per-route code splitting worth having. Vite is the workspace convention (recruiters see one consistent stack across all ten repos), builds in seconds, and the React 19 runtime is all the interactivity requires. SEO needs are met by static meta/OG tags in `index.html` — crawlers get the real markup because everything renders from static data on first paint.

**Consequences.** No image pipeline — avatars are hand-cropped/compressed in M3/M6 (per TECHNICAL-PLAN §8). Meta tags are maintained manually in `index.html`. If the project ever grew real content pages, the answer is a new decision, not bolting SSR onto this one.

## D2 — Tailwind CSS v4 with `@theme` design tokens

**Context.** The design system (DESIGN-SYSTEM.md) defines two full color themes, a responsive type scale, and motion tokens that must be consumed consistently by ~28 components.

**Options considered**
- **CSS Modules + hand-rolled custom properties** — full control, but every token utility (spacing, radius, states) gets reinvented.
- **styled-components / CSS-in-JS** — runtime cost and styling logic in JS, both wrong for a page chasing a < 180 KB bundle and Lighthouse ≥ 95.
- **Tailwind CSS v4** — CSS-first `@theme` tokens compile to custom properties and utilities; zero runtime.

**Decision.** Tailwind v4 via `@tailwindcss/vite`, all tokens declared in `@theme` in `src/index.css`.

**Rationale.** v4's `@theme` maps the design system 1:1 into CSS variables (`--color-bg-raised`, `--radius-lg`…), so DESIGN-SYSTEM.md is literally the source file for `index.css`. The `.light` override plus `@custom-variant dark` gives class-based theming with no JS styling cost. Portfolio goal 5 (BRIEF) is exactly this token system.

**Consequences.** JSX carries utility-class density — accepted trade for locality. The few genuinely custom animations (marquee, caret blink, blob drift) live as plain `@keyframes` in `index.css` next to the tokens. Discipline rule from DESIGN-SYSTEM §7 applies: no raw hex, no Tailwind default palette.

## D3 — Framer Motion (`motion` package) for orchestrated animation

**Context.** The PRD specifies scroll-reveal orchestration with stagger, a shared-layout toggle knob, exit-animated price swaps, spring accordions, and an `AnimatePresence` mobile menu.

**Options considered**
- **GSAP** — the strongest timeline tool, but imperative, and reserved for the nova-studio project in this workspace; using it here would blur what each repo demonstrates.
- **CSS only** — handles loops and hovers, but cannot express `layoutId` shared elements, exit animations, or interruptible spring state.
- **react-spring** — springs yes, but no `whileInView`/`AnimatePresence`/`layoutId` equivalents without glue code.
- **Framer Motion** (npm `motion`, imported from `motion/react`) — declarative variants, viewport triggers, layout animation, presence, `useReducedMotion`.

**Decision.** Framer Motion for every state-driven animation; CSS for every continuous one (see D7).

**Rationale.** Each hard requirement maps to a first-class Motion API — `whileInView` + variants (reveals), `layoutId` + spring (billing knob), `AnimatePresence mode="popLayout"` (prices), spring height (accordion) — which is precisely the skill set portfolio goal 1 claims. Interruptibility (PRD §3.7 rapid-toggle AC) comes free from Motion's animation model.

**Consequences.** ~35 KB gzipped accepted inside the 180 KB budget (TECHNICAL-PLAN §8). Continuous marquees/blobs deliberately bypass Motion (D7) so its cost buys orchestration only. Reduced-motion branches use `useReducedMotion()` — no custom media-query hook.

## D4 — No router — anchor navigation on a single page

**Context.** Workspace convention says multi-page projects use react-router-dom v7. Quill AI's PRD defines exactly one page with ten ordered sections.

**Options considered**
- **react-router-dom v7** — adds ~10 KB and route indirection to serve a single route.
- **Hash-based pseudo-pages** — fakes navigation, breaks scroll behavior, and gains nothing.
- **No router** — `<a href="#features">` anchors + CSS smooth scroll.

**Decision.** No router. Nav and footer links target section anchor ids (`#features`, `#showcase`, `#pricing`, `#faq`) with `scroll-margin-top: 96px`.

**Rationale.** A router with one route is pure ceremony. Native anchors are free, SEO-legible, keyboard-accessible, and work with `scroll-behavior: smooth` (instant under reduced motion, per PRD §2). The repo demonstrates restraint as much as skill.

**Consequences.** Footer Company/Resources/Legal links are inert by design (PRD §3.10) — there are no destination pages. Adding any second page later means adopting react-router-dom v7 per workspace convention, not patching anchors.

## D5 — Static data modules in `src/data/`; localStorage for theme only

**Context.** Front-end-only rule: no backend, no database. The page's content — nav links, hero phrases, logos, features, editor script, testimonials, pricing tiers, FAQs, footer columns — has to live somewhere versionable.

**Options considered**
- **Copy hard-coded inline in components** — fastest, but couples copy edits to markup and makes the marquee/grid components non-generic.
- **JSON fetched at runtime** — adds a network waterfall and loading states for data that never changes.
- **Headless CMS** — infrastructure and API keys for a fictional product; violates the workspace's front-end-only rule.
- **ES modules in `src/data/`** — plain exported objects, bundled at build time.

**Decision.** Nine data modules in `src/data/` (shapes fixed in TECHNICAL-PLAN §4); localStorage persists exactly one key: `quill-theme`.

**Rationale.** Modules keep copy diffable in PRs, let components stay presentational (`FeatureCard` maps over `features`), cost zero requests, and can hold live component references (lucide icons) that JSON cannot. Ephemeral UI state (billing period, open FAQ, menu) intentionally resets on reload — persisting it would surprise more than help.

**Consequences.** Copy changes are code commits — fine for a portfolio. All storage access is try/catch-wrapped so private-mode browsers degrade to in-memory theme (PRD §5). No loading or empty states exist anywhere, and none are needed.

## D6 — Class-based theming, dark default, system preference ignored

**Context.** The brand is a deep-space dark UI (`#05060F`) with a supported light mode. Theme choice must survive reload with zero flash of wrong theme (BRIEF success criterion 5).

**Options considered**
- **System-first (`prefers-color-scheme`) with manual override** — "correct" default behavior, but most recruiters skim in light-OS daytime settings and would never see the designed dark identity first.
- **Dark only** — simplest, but forfeits portfolio goal 3 (theming architecture) and the light palette already designed.
- **Class on `<html>`, dark default, explicit toggle, localStorage persistence** — product picks its default; user's choice is remembered.

**Decision.** `<html>` carries `dark` (default) or `light`; `ThemeToggle` flips it; the choice persists to localStorage key `quill-theme` (`"dark"` / `"light"`); a pre-paint inline script in `index.html` applies the stored class before first paint; `prefers-color-scheme` is deliberately ignored. Mechanics in TECHNICAL-PLAN §5.

**Rationale.** Dark is the product's first impression — the gradient, glass, and glow system is designed dark-first, and the landing page is the pitch. An explicit, persisted toggle demonstrates more engineering (pre-paint script, storage fallback, class-based Tailwind variant) than passively mirroring the OS. Unknown stored values coerce to `"dark"` and are overwritten on next toggle (PRD §5 edge case).

**Consequences.** Light-OS users get dark until they toggle — accepted on-brand cost; the toggle is prominent in the navbar at every width. Both palettes must independently pass WCAG AA (verified in DESIGN-SYSTEM §1.4). The Final CTA panel is theme-invariant by spec, so it is tested once.

## D7 — Marquees as duplicated-track CSS keyframes, not JS

**Context.** Two infinite marquees (logos; two counter-scrolling testimonial rows) must run for the lifetime of the page without dropping frames, and must pause on hover/focus and vanish under reduced motion. BRIEF success criterion 9 demands transform/opacity-only continuous animation.

**Options considered**
- **Framer Motion `animate` loop** — burns JS on a decorative effect and complicates pause/reduced-motion.
- **`requestAnimationFrame` translation** — main-thread work every frame, forever; the exact thing the perf budget forbids.
- **CSS `@keyframes` on a duplicated track** — compositor-only, free pause via `animation-play-state`, free disable via one media query.

**Decision.** A generic `Marquee` component renders its children twice (second copy `aria-hidden="true"`), animates `translateX(0 → -50%)` with a per-instance `--duration`, pauses on `:hover`/`:focus-within`, and swaps to a static row/grid under `prefers-reduced-motion`.

**Rationale.** Zero per-frame JS; the seamless loop is a geometry guarantee (track = 2× content, shift by 50%); accessibility falls out of CSS. One component serves logos (32s), testimonial rows (48s/60s reverse), and the mobile single row (80s).

**Consequences.** Marquee children must be non-interactive/non-focusable (PRD §5) so keyboard users are never scrolled away mid-focus; screen readers hear each item once because the duplicate track is hidden. `will-change: transform` on the tracks only. Duplication doubles those DOM nodes — trivial at 8 logos / 8 cards.

## D8 — Custom `useTypewriter` hook instead of a typing library

**Context.** Two different typewriter behaviors ship: the hero cycles four phrases forever (type/hold/delete/gap), and the editor mockup types a three-block script once, starting at 40% in-view, feeding a live word counter. Both must pause on hidden tabs, never shift layout, and short-circuit under reduced motion.

**Options considered**
- **typed.js / react-type-animation** — cover basic cycling, but not IntersectionObserver-gated start, `visibilitychange` pause-and-resume, or exposing state a word counter can derive from — wrappers and workarounds either way.
- **CSS `steps()` typing trick** — only works for one fixed-width monospace line; four variable-length phrases with deletion phases are out of reach.
- **Custom hook** — a small phase machine (typing → holding → deleting → next) over `setTimeout`.

**Decision.** One hand-built `useTypewriter(phrases, options)` hook (API in TECHNICAL-PLAN §3) consumed by `TypewriterText` (hero: 45/20/1600/400ms, loop) and `EditorMockup` (28ms, once, `startInView`).

**Rationale.** Every hard requirement is a first-class option instead of a patch, and BRIEF portfolio goal 2 names this hook as a headline skill — outsourcing it would gut the point of the project. Returning `{ text, done }` lets the word counter and persistent caret derive from state instead of duplicating timers.

**Consequences.** Timer hygiene is owned code: cleanup on unmount, pause/resume on `visibilitychange` (PRD §3.2 AC: no garbled fast-forward). Reduced motion returns the full first phrase with `done: true` immediately. Fixed-height wrappers are part of the contract to hold CLS < 0.02.

## D9 — Local stock avatars + code-built product mockup, no screenshots

**Context.** The page needs 13 human faces (hero social proof + 8 testimonials) and a convincing product visual. Workspace rule: free stock photos downloaded into `src/assets/`, never hotlinked.

**Options considered**
- **Hotlinked Unsplash CDN URLs** — violates the workspace rule, adds third-party DNS to the critical path, risks images disappearing.
- **Illustration or 3D asset packs** — clashes with the glass/gradient art direction and reads template-bought.
- **Static screenshot of a fake editor** — heavy, blurry on retina, wrong in one of the two themes.
- **Local photos for people + DOM-built `EditorMockup` for product** — small, sharp, theme-aware.

**Decision.** 13 curated Unsplash/Pexels headshots (`avatar-01…13.jpg`, 200×200, q80, < 30 KB each) in `src/assets/avatars/`; the product is rendered entirely in code as `EditorMockup`; fictional company "logos" are typography, not images.

**Rationale.** Faces are the one thing code can't fake credibly, and photos of real people make the testimonials land; everything else drawn with tokens stays crisp at any DPR, weighs ~0 KB, adapts to both themes, and showcases UI craft (BRIEF goal 7). Casting and treatment rules live in DESIGN-SYSTEM §6.

**Consequences.** A manual sourcing/cropping step lands in M3 and M6; licenses must be download-free tiers only. Testimonial avatars lazy-load; hero avatars load eagerly with explicit dimensions. Total image payload stays under ~400 KB, protecting the LCP < 2.5s target.

## D10 — Static deployment on Vercel

**Context.** The finished page must be publicly reachable for recruiters, hit Lighthouse ≥ 95 on the production URL, and deploy with zero server infrastructure.

**Options considered**
- **GitHub Pages** — free, but no preview deploys per branch and clumsier headers/redirect control.
- **Netlify** — equivalent capability, but the rest of the workspace standardizes on Vercel; one dashboard beats two.
- **Cloudflare Pages** — strong CDN, same fragmentation objection.
- **Vercel** — zero-config Vite detection, per-commit preview URLs, immutable asset caching on its CDN.

**Decision.** Vercel, static output (`vite build` → `dist/`), connected to the project's GitHub repo once implementation starts.

**Rationale.** Preview deployments are wired into the process — TECHNICAL-PLAN §7 gates every milestone from M2 onward on a Vercel preview check, and BRIEF's success criteria are explicitly measured on the Vercel production URL. Hashed-asset immutable caching and brotli come free, which the 180 KB / LCP budgets assume.

**Consequences.** The static-only constraint is structural: nothing server-side can creep in without breaking deploys (a feature, given D5). No SPA rewrite rules are needed — one route, no client router (D4). Domain remains the default `*.vercel.app` unless a portfolio domain is added later; that choice affects nothing in this pack.
