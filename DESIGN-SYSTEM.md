# Quill AI — Design System

Design tokens (color, type, space, radius, shadow, motion) and per-component styling specs for the Quill AI landing page, in dark (default) and light themes.

| | |
|---|---|
| Project | Quill AI |
| Document | DESIGN-SYSTEM |
| Status | Approved |
| Owner | Ziad |
| Date | 2026-08-28 |

---

All tokens are defined once in `src/index.css` via Tailwind v4 `@theme` and consumed as utilities. Slash names below map to CSS custom properties by replacing `/` with `-` (e.g. `bg/raised` → `--color-bg-raised`). The `.light` class on `<html>` overrides the dark values; dark is the default, and the user's choice persists to localStorage key `quill-theme` (see DECISIONS.md D6).

## 1. Color

### 1.1 Principles

- **Dark-first.** The deep-space dark palette is the designed default; light mode is a first-class re-skin (white surfaces with lavender tints), not an inversion.
- **One brand gradient.** Violet→blue (`grad/brand`) is the only decorative gradient. It appears on text, the featured pricing border, the Final CTA panel, and filled controls (in its deepened form) — never as a section background.
- **Borders over shadows in dark; shadows over borders in light.** Dark surfaces separate with 1px white-alpha borders; light surfaces separate with soft shadows and near-navy-alpha borders.

### 1.2 Core palette

| Token | Dark (default) | Light | Usage rules |
|---|---|---|---|
| `bg/base` | `#05060F` | `#FFFFFF` | Page background (`body`); text on Final CTA's inverted button |
| `bg/surface` | `#0A0B1A` | `#F7F6FD` | `MobileMenu` overlay panel, editor-mockup chrome bar, alternating section tint (Testimonials, FAQ) |
| `bg/raised` | `rgba(255,255,255,0.04)` | `#FFFFFF` | `GlassCard` fill (feature, testimonial, pricing cards), secondary button fill, eyebrow pill, toggle track |
| `bg/nav-glass` | `rgba(5,6,15,0.72)` | `rgba(255,255,255,0.80)` | Navbar past 8px scroll, always paired with `backdrop-filter: blur(16px)` |
| `text/primary` | `#F4F5FB` | `#10122A` | Headings, card titles, typewriter phrases, active nav link |
| `text/secondary` | `#A9AFC6` | `#454A68` | Subheadlines, card body copy, FAQ answers, quotes, inactive nav links |
| `text/tertiary` | `#7A80A0` | `#6B7091` | Eyebrows, captions, typewriter prefix, footnotes, footer bottom bar, logo wordmarks |
| `border/subtle` | `rgba(255,255,255,0.08)` | `rgba(16,18,42,0.08)` | Default card/control borders, navbar bottom border, FAQ dividers |
| `border/strong` | `rgba(255,255,255,0.16)` | `rgba(16,18,42,0.16)` | Hover state of `border/subtle` (card lift, secondary button hover) |
| `accent/violet` | `#8B5CF6` | `#8B5CF6` | Focus rings, feature-card icons, chevron accents, gradient start |
| `accent/blue` | `#3B82F6` | `#3B82F6` | Gradient end; never used alone as text |
| `success` | `#34D399` | `#059669` | `Check` icons in pricing feature lists |
| `star/amber` | `#FBBF24` | `#F59E0B` | The ★ in the hero `AvatarRow` rating |

### 1.3 Gradients, glows, scrim

| Token | Value | Usage rules |
|---|---|---|
| `grad/brand` | `linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)` | `GradientText`, logo icon tile, Pro card border, Final CTA panel fill. Display use only — never behind text smaller than `display-md` without `scrim/cta` |
| `grad/brand-deep` | `linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)` | Filled controls carrying 14–16px white labels: primary `Button`, "✦ Improve" pill, "Save 20%" badge. Deepened one step so white labels clear 4.5:1 |
| `glow/violet` | `radial-gradient(closest-side, rgba(139,92,246,0.35), transparent 70%)` — light mode alpha `0.18` | Hero blob, upper-left; `filter: blur(80px)` |
| `glow/blue` | `radial-gradient(closest-side, rgba(59,130,246,0.30), transparent 70%)` — light mode alpha `0.15` | Hero blob, lower-right; `filter: blur(80px)` |
| `scrim/cta` | `rgba(5,6,15,0.32)` | Laid over `grad/brand` inside the Final CTA panel (under the 4% noise overlay) so white-at-70% microcopy passes 4.5:1. Theme-invariant |

The Final CTA noise overlay is a data-URI SVG (`feTurbulence`, fractalNoise) at 4% opacity — no image file, no network request.

### 1.4 Verified contrast pairs (WCAG AA)

| Pair | Dark | Light | Requirement |
|---|---|---|---|
| `text/primary` on `bg/base` | 18.5:1 | 17.6:1 | 4.5:1 ✓ |
| `text/secondary` on `bg/base` | 9.3:1 | 8.6:1 | 4.5:1 ✓ |
| `text/tertiary` on `bg/base` | 5.3:1 | 4.8:1 | 4.5:1 ✓ |
| White on `grad/brand-deep` (worst stop `#7C3AED`) | 5.7:1 | 5.7:1 | 4.5:1 ✓ |
| White 100% on `grad/brand` + `scrim/cta` | 7.4:1 | 7.4:1 | 4.5:1 ✓ |
| White 70% on `grad/brand` + `scrim/cta` | 4.6:1 | 4.6:1 | 4.5:1 ✓ |
| `GradientText` (worst stop `#8B5CF6`) on `bg/base` | 4.8:1 | 4.2:1 | 3:1 (display sizes only) ✓ |

Rule: `GradientText` may only be applied at `display-md` and larger. `text/tertiary` is never used below 12px.

## 2. Typography

### 2.1 Fonts

| Role | Family | Weights loaded | Fallback stack |
|---|---|---|---|
| Display | **Space Grotesk** (Google Fonts) | 600, 700 | `"Space Grotesk", ui-sans-serif, system-ui, sans-serif` |
| Body | **Inter** (Google Fonts) | 400, 500, 600 | `"Inter", ui-sans-serif, system-ui, sans-serif` |

Loaded in `index.html` with `preconnect` to `fonts.googleapis.com` / `fonts.gstatic.com` and `display=swap`. No other weights, no italics.

### 2.2 Type scale

Sizes are mobile (375px) / tablet (768px) / desktop (1024px+).

| Token | Font / weight | Size | Line-height | Tracking | Used by |
|---|---|---|---|---|---|
| `display-xl` | Space Grotesk 700 | 40 / 48 / 64px | 1.05 | −0.02em | Hero H1 (only) |
| `display-lg` | Space Grotesk 700 | 32 / 40 / 48px | 1.10 | −0.015em | Final CTA H2 |
| `display-md` | Space Grotesk 600 | 28 / 32 / 36px | 1.15 | −0.01em | Section H2s (Features, Showcase, Testimonials, Pricing, FAQ) |
| `title` | Space Grotesk 600 | 18 / 20 / 20px | 1.35 | 0 | Card H3s: feature titles, pricing tier names, FAQ questions |
| `price` | Space Grotesk 700 | 40 / 44 / 48px | 1.0 | −0.01em | `AnimatedPrice` dollar figures; always `tabular-nums` |
| `wordmark` | Space Grotesk 600 | 16 / 16 / 18px | 1.0 | +0.08em, uppercase | Logo-marquee names (at 80% opacity, 0.9 scale on mobile) |
| `body-lg` | Inter 400 | 18 / 18 / 20px | 1.6 | 0 | Hero sub, section subheadlines, Final CTA sub |
| `body` | Inter 400 | 16 / 16 / 16px | 1.65 | 0 | Feature/card bodies, testimonial quotes, FAQ answers |
| `body-sm` | Inter 400 (500 for links) | 14px | 1.5 | 0 | Nav links, footer links, avatar-row text, price captions, footnotes, microcopy |
| `caption` | Inter 600 | 12px | 1.4 | +0.08em, uppercase | Eyebrows, marquee label, footer column headings |
| `editor` | Inter 400 | 13 / 14 / 15px | 1.7 | 0 | `EditorMockup` prose (its title line uses Space Grotesk 600 at 18/20/22px) |

Notes:
- `display-xl` at mobile resolves to 40px — the value the PRD responsive matrix lists for the hero H1. Same token, responsive value.
- One `h1` per page (hero); `h2` per section; `h3` = `title`. Never skip levels.
- All numeric UI (prices, word counter) sets `font-variant-numeric: tabular-nums`.

## 3. Spacing, radius, shadows

### 3.1 Spacing

Base unit 4px; steps used: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

| Layout token | Value |
|---|---|
| Container max-width | 1152px, centered |
| Page gutters | 20 / 32 / 40px (mobile / tablet / desktop) |
| Section vertical padding | 64 / 80 / 96px |
| Navbar height | 64px mobile, 72px desktop |
| Anchor `scroll-margin-top` | 96px |
| Card grid gaps | 16px mobile, 24px tablet+ |
| Card inner padding | 24px (feature, testimonial); 32px (pricing, 24px on mobile) |
| Final CTA panel padding | 24 / 40 / 64px |

### 3.2 Radius

| Token | Value | Assigned to |
|---|---|---|
| `r-sm` | 8px | Editor toolbar icon buttons, code-ish chips |
| `r-md` | 12px | Feature-card icon tiles, FAQ `AccordionItem` containers |
| `r-lg` | 16px | All `GlassCard` surfaces (feature, testimonial, pricing), `EditorMockup` window |
| `r-xl` | 24px | Final CTA gradient panel |
| `r-full` | 9999px | Buttons, eyebrow pill, "✦ Improve" pill, "Save 20%" badge, `BillingToggle`, `ThemeToggle`, avatars |

### 3.3 Shadows & rings

| Token | Dark | Light | Usage |
|---|---|---|---|
| `shadow/card` | `0 8px 24px -12px rgba(0,0,0,0.55)` | `0 8px 24px -16px rgba(16,18,42,0.14)` | Raised cards (light mode leans on this; dark leans on borders) |
| `glow-popular` | `0 0 0 1px rgba(139,92,246,0.40), 0 12px 48px -12px rgba(139,92,246,0.35)` | `0 0 0 1px rgba(139,92,246,0.35), 0 12px 40px -12px rgba(139,92,246,0.25)` | Pro pricing card, `EditorMockup` frame |
| `glow/button` | `0 8px 24px -8px rgba(124,58,237,0.50)` | same | Primary button hover |
| `glow/white` | `0 0 24px rgba(255,255,255,0.35)` | same | Inverted button hover (Final CTA) |
| Focus ring | `outline: 2px solid #8B5CF6; outline-offset: 2px` | same | Every interactive element, both themes, `:focus-visible` only |

## 4. Motion tokens

### 4.1 Durations & easings

| Token | Value | Used for |
|---|---|---|
| `dur/fast` | 150ms | Link/text color hovers, inverted-CTA scale, icon cross-fades, reduced-motion accordion fade |
| `dur/base` | 250ms | Navbar glass transition, card hover lift, price slide, chevron rotate |
| `dur/reveal` | 600ms | `Reveal` fade + 24px rise |
| `ease/out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | All reveals, hero load-in, price transitions |
| `ease/linear` | `linear` | Marquees only |
| `ease/in-out` | `ease-in-out` | Blob drift only |

### 4.2 Springs (Framer Motion)

| Token | Value | Used for |
|---|---|---|
| `spring-toggle` | `{ type: "spring", stiffness: 500, damping: 35 }` | `BillingToggle` `layoutId` knob |
| `spring-accordion` | `{ type: "spring", stiffness: 300, damping: 32 }` | `AccordionItem` height + opacity |

### 4.3 Staggers

| Token | Value | Used for |
|---|---|---|
| `stagger/reveal` | 0.08s | Section reveals, hero load-in, card grids |
| `stagger/menu` | 0.06s | `MobileMenu` links |

### 4.4 Ambient loops (CSS keyframes, compositor-only)

| Animation | Value |
|---|---|
| Logo marquee | `translateX(0 → -50%)`, 32s linear infinite |
| Testimonial row A / row B | 48s / 60s, opposite directions; single mobile row 80s |
| Marquee pause | `animation-play-state: paused` on `:hover` and `:focus-within` |
| Blob drift | translate/scale keyframes, 18s ease-in-out infinite alternate |
| Caret blink | `steps(1)`, 1.1s infinite |

### 4.5 Typewriter cadence

| Instance | Type | Delete | Hold | Gap | Loop |
|---|---|---|---|---|---|
| Hero (`TypewriterText`) | 45ms/char | 20ms/char | 1600ms | 400ms | yes (4 phrases) |
| Editor (`EditorMockup`) | 28ms/char | — | — | — | no (once, in-view start) |

### 4.6 Reduced motion

With `prefers-reduced-motion: reduce` (single source of truth: `useReducedMotion()` + one CSS media query): reveals collapse to opacity-only at 0 duration; marquees stop and render static rows/grids; typewriters print full text instantly with a static caret; blobs freeze; accordion and toggle fall back to 150ms fades; smooth scroll becomes instant. No exceptions per component.

## 5. Component specs

### 5.1 Buttons

Shape `r-full`; label Inter 600; icon 18px with 8px gap; press state `scale(0.98)`; all transitions `dur/fast`–`dur/base`; focus ring per §3.3. Sizes: `md` — 40px height, 0 20px padding, 14px label; `lg` — 52px height, 0 28px padding, 16px label.

| Variant | Fill | Text | Border | Hover |
|---|---|---|---|---|
| `primary` | `grad/brand-deep` | `#FFFFFF` | none | `translateY(-1px)` + `glow/button` |
| `secondary` | `bg/raised` | `text/primary` | 1px `border/subtle` | border → `border/strong`, fill lightens one step |
| `ghost` | none | `text/secondary` | none | text → `text/primary` (low-emphasis inline actions) |
| `inverted` | `#FFFFFF` | `#05060F` | none | `scale(1.03)` + `glow/white` (Final CTA panel only) |

Placement: primary — navbar "Start free", hero "Start writing free", Pro card "Go Pro"; secondary — hero "See Quill in action", Free/Team card CTAs; inverted — Final CTA "Start writing free". No disabled states ship (no forms).

### 5.2 Cards

- **`GlassCard` (base):** `bg/raised` fill, 1px `border/subtle`, `r-lg`, `shadow/card` (light mode), `backdrop-filter: blur(12px)` only where a card overlaps the hero blobs. Hover variant: `translateY(-4px)`, border → `border/strong`, `dur/base`.
- **`FeatureCard`:** GlassCard + 24px padding; 48px icon tile (`r-md`, fill `rgba(139,92,246,0.15)` dark / `rgba(139,92,246,0.10)` light, icon 24px `accent/violet`); `title` heading; `body` copy in `text/secondary`.
- **`TestimonialCard`:** GlassCard + 24px padding; fixed width ~300px mobile / 360px desktop; quote in `body` `text/primary`; footer row: 40px round avatar, name `body-sm` 600 `text/primary`, "Role — Company" `body-sm` `text/tertiary`.
- **`PricingCard`:** GlassCard + 32px padding; tier name `title`; tagline `body-sm` `text/tertiary`; `price` + caption `body-sm`; feature rows `body` with 18px `success` checks. **Pro:** 1px `grad/brand` border (gradient border via padding-box/border-box double background), `glow-popular`, "Most popular" badge (`grad/brand-deep` pill, caption style, white), `scale(1.03)` at ≥1024px.
- **`EditorMockup`:** `r-lg` window on `bg/surface` chrome; three 12px traffic dots (`#FF5F57`, `#FEBC2E`, `#28C840`, `aria-hidden`); filename tab `body-sm` `text/tertiary`; toolbar icons 18px `text/tertiary` in `r-sm` hover tiles (visual-only, not focusable); "✦ Improve" pill (`grad/brand-deep`, white, caption-size 600); prose in `editor` style; status bar `body-sm` `text/tertiary` with live tabular-nums word count; frame carries `glow-popular`.
- **Final CTA panel:** `r-xl`, `grad/brand` fill + `scrim/cta` + 4% noise; white text per §1.4; theme-invariant.

### 5.3 Navigation

- **Navbar:** transparent at top; past 8px scroll: `bg/nav-glass` + `blur(16px)` + 1px bottom `border/subtle`, `dur/base` transition. Logo: 32px `r-md` tile filled `grad/brand` with white `Feather` 18px + "Quill" wordmark (Space Grotesk 600, 20px, `text/primary`). Links `body-sm` 500 `text/secondary` → `text/primary` on hover/focus (`dur/fast`), 32px gaps.
- **`MobileMenu`:** full-screen `bg/surface` panel (no radius); links Space Grotesk 600 at 28px, 20px vertical rhythm; CTA `primary lg` full-width at bottom; hamburger ↔ `X` cross-fade `dur/fast`.
- **Footer:** on `bg/base`, top 1px `border/subtle`; column headings `caption` `text/tertiary`; links `body-sm` `text/secondary` → `text/primary`; social icon buttons 40px `r-full` with 1px `border/subtle`, 18px icons.

### 5.4 Controls

- **`ThemeToggle`:** 40px icon button, `r-full`, 1px `border/subtle`, `bg/raised`; `Sun`/`Moon` 18px `text/secondary`; icons cross-fade + rotate 90° over `dur/fast`.
- **`BillingToggle`:** 44px track, `r-full`, `bg/raised` + 1px `border/subtle`, 4px inner padding; segment labels `body-sm` 600 (`text/tertiary` inactive → `text/primary` active); knob = `layoutId` pill, fill `rgba(255,255,255,0.10)` dark / `#FFFFFF` + `shadow/card` light, `spring-toggle`; "Save 20%" badge — `grad/brand-deep` pill, white, `caption` at 11px, attached right of "Yearly".
- **`AccordionItem`:** `r-md` container, 1px `border/subtle`, `bg/raised` when open; question button `title` at 16/18px, full-width, 20px padding, 44px+ hit area; `ChevronDown` 20px `text/tertiary` rotating 180°; answer `body` `text/secondary` with 20px padding, `spring-accordion`.
- **Eyebrow pill (hero):** `r-full`, `bg/raised`, 1px `border/subtle`, `caption` at 12px non-uppercase-sentence case allowed here ("New · Tone rewriting is live"), 6px `grad/brand` dot prefix.
- **Text inputs:** none ship — the page has no forms by scope (BRIEF). The controls above are the complete interactive surface.

## 6. Imagery & art direction

- **Photography = avatars only.** 13 square headshots (`avatar-01.jpg` … `avatar-13.jpg`), free stock from Unsplash or Pexels, downloaded into `src/assets/avatars/` — never hotlinked. 200×200px, JPG quality 80, < 30 KB each, explicit `width`/`height` attributes.
- **Casting direction:** believable working writers/marketers — mixed gender, ethnicity, and age (20s–50s); natural light; soft neutral backgrounds (no studio white, no heavy bokeh); relaxed head-and-shoulders crops; no lookalikes of public figures.
- **Everything else is drawn in code.** The product is represented by the `EditorMockup` (DOM + tokens, no screenshots), and atmosphere comes from `glow/violet` / `glow/blue` blobs, `grad/brand`, and glass surfaces. No illustration packs, no 3D renders, no icons beyond lucide.
- **Logos are typography.** The 8 fictional wordmarks render as styled text (`wordmark` token) — no logo image files.

## 7. Do / Do not

| Do | Do not |
|---|---|
| Reference every color through a token; define each in both themes | Hard-code hex values in components or use Tailwind default palette colors |
| Use `grad/brand-deep` behind 14–16px white labels | Put small white text on raw `grad/brand` without `scrim/cta` |
| Animate transform and opacity only for anything continuous | Animate `filter: blur`, box-shadow spread, or layout properties per frame |
| Reserve height for typewriter lines and use `tabular-nums` for prices | Let cycling text or price swaps shift surrounding layout |
| Route every reduced-motion fallback through `Reveal`, `Marquee`, `useTypewriter`, and the two spring transitions | Sprinkle per-component `prefers-reduced-motion` one-offs |
| Keep Space Grotesk for display/wordmarks and Inter for everything else | Introduce a third typeface or unloaded weights |
| Use `:focus-visible` rings (2px `accent/violet`, 2px offset) on every control | Remove outlines or restyle focus per component |
| Keep glass blur static (navbar, cards over blobs) | Stack `backdrop-filter` layers or blur large scrolling regions |
