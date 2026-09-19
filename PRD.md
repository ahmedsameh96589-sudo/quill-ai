# Quill AI — Product Requirements Document

Section-by-section requirements, final copy, motion specs, and acceptance criteria for the Quill AI single-page landing site.

| | |
|---|---|
| Project | Quill AI |
| Document | PRD |
| Status | Approved |
| Owner | Ziad |
| Date | 2026-08-28 |

---

## 1. Page map

One page, no router. Sections render in this exact order (approved — do not add or remove):

| # | Section | Component | Anchor id |
|---|---|---|---|
| 1 | Navbar | `Navbar` | — (fixed) |
| 2 | Hero | `Hero` | `top` |
| 3 | Logo marquee | `LogoMarquee` | — |
| 4 | Features | `Features` | `features` |
| 5 | Product showcase | `ProductShowcase` | `showcase` |
| 6 | Testimonials marquee | `TestimonialsMarquee` | `testimonials` |
| 7 | Pricing | `Pricing` | `pricing` |
| 8 | FAQ | `FAQ` | `faq` |
| 9 | Final CTA | `FinalCTA` | — |
| 10 | Footer | `Footer` | — |

## 2. Global requirements

- **Theme.** Dark is the default. Light mode toggles via `ThemeToggle` and persists to localStorage key `quill-theme` (values `"dark"` / `"light"`). An inline script in `index.html` applies the stored theme to `<html>` before first paint — zero flash of wrong theme. All colors reference tokens in DESIGN-SYSTEM.md.
- **Reveal pattern.** Every section's content animates in with the shared `Reveal` wrapper: Framer Motion `whileInView`, fade + 24px rise, staggered children (0.08s), `viewport={{ once: true, margin: "-80px" }}`.
- **Reduced motion.** With `prefers-reduced-motion: reduce`: reveals become instant (opacity only, 0 duration), both marquees stop and render as static rows, typewriter renders full text immediately, glow blobs stop drifting, accordion and toggle switch to 150ms fades.
- **Layout.** Content container max-width 1152px, centered; gutters 20px (mobile) / 32px (tablet) / 40px (desktop). Section vertical padding 64/80/96px by breakpoint.
- **Semantics.** `<header>` (Navbar), `<main>` (sections 2–9, each a `<section>` with `aria-labelledby` its heading), `<footer>`. One `<h1>` on the page (hero).
- **Anchors.** Nav links smooth-scroll to section anchors with `scroll-margin-top: 96px` to clear the sticky navbar; instant jump under reduced motion.

## 3. Sections

### 3.1 Navbar

**Content**
- Logo: `Feather` icon (lucide) in brand gradient + wordmark "Quill" in Space Grotesk 600.
- Links (desktop, center): Features → `#features`, Showcase → `#showcase`, Pricing → `#pricing`, FAQ → `#faq`.
- Right cluster: `ThemeToggle` (Sun/Moon icon button, `aria-label="Switch to light theme"` / `"Switch to dark theme"`), primary button **"Start free"**.
- Mobile (< 768px): logo left; theme toggle + hamburger (`Menu` icon, `aria-expanded`, `aria-controls="mobile-menu"`) right; links and CTA move into `MobileMenu`.

**Behavior & motion**
- Sticky (`position: fixed`, full width, height 72px desktop / 64px mobile).
- At `scrollY ≤ 8`: transparent background, no border. Past 8px (via `useScrolled` hook): glass state — `rgba(5,6,15,0.72)` background (light mode `rgba(255,255,255,0.80)`), `backdrop-filter: blur(16px)`, 1px bottom border `border/subtle`. Transition 250ms.
- `MobileMenu`: full-screen overlay panel (`bg/surface`), links stagger in (0.06s, fade + 16px rise) via `AnimatePresence`; hamburger icon cross-fades to `X`. Body scroll locks while open. Closes on link tap, `Escape`, or backdrop press. Focus moves into the panel on open and returns to the hamburger on close.

**Acceptance criteria**
- Given the page has just loaded and scroll is at top, when the user scrolls down 100px, then the navbar background becomes glass-blurred with a bottom border within 250ms, and reverts when scrolled back to top.
- Given dark theme is active, when the user clicks the theme toggle, then the whole page switches to light tokens, `quill-theme` is set to `"light"`, and after a reload the page first-paints in light mode with no dark flash.
- Given the viewport is 375px wide and the mobile menu is closed, when the user taps the hamburger, then the overlay opens with staggered links, the icon animates to an X, background scroll is locked, and pressing `Escape` closes it and restores focus to the hamburger.
- Given the mobile menu is open, when the user taps "Pricing", then the menu closes and the page smooth-scrolls to the Pricing section.

### 3.2 Hero

**Content (final copy)**
- Eyebrow pill: "New · Tone rewriting is live" (caption style, gradient dot prefix).
- H1 (display-xl, Space Grotesk): "Turn a two-line brief into **publish-ready copy.**" — the phrase "publish-ready copy." rendered by `GradientText` (violet→blue).
- Subheadline (body-lg, `text/secondary`): "Quill drafts blog posts, emails, and ads in your brand voice — so you ship in minutes, not days."
- Typewriter line (`TypewriterText`, powered by `useTypewriter`): static prefix "Quill is writing: " in `text/tertiary`, then rotating phrases in `text/primary` with a blinking caret:
  1. "Subject: Your invoice just got smarter"
  2. "Meet Halo — the desk lamp that learns your rhythm."
  3. "5 pricing-page mistakes costing you signups"
  4. "Bonjour Paris — votre campagne est prête."
- CTAs: primary lg button **"Start writing free"**; secondary lg button **"See Quill in action"** with `Play` icon — smooth-scrolls to `#showcase`.
- Social proof (`AvatarRow`): 5 overlapping avatar photos (avatar-01…05), then "★ 4.9 · Loved by 12,000+ writers and teams" (body-sm; star in `star/amber`).
- Background (`GlowBlobs`): two blurred radial blobs — violet (`glow/violet`) upper-left, blue (`glow/blue`) lower-right — drifting slowly (18s ease-in-out alternate), `aria-hidden`, `pointer-events: none`.

**Motion**
- On load (not scroll-triggered): eyebrow, H1, sub, typewriter line, CTAs, avatar row stagger in top-to-bottom (0.08s stagger, 600ms, ease-out-expo).
- Typewriter: 45ms/char typing, holds 1600ms, deletes at 20ms/char, 400ms gap, loops through the 4 phrases forever. Pauses when the tab is hidden. The line reserves a fixed height (no layout shift between phrases).

**Acceptance criteria**
- Given the page loads, when the hero appears, then hero elements stagger in and the typewriter begins typing phrase 1 within 800ms.
- Given the typewriter finishes a phrase, when 1600ms elapse, then it deletes and types the next phrase, cycling through all 4 and looping.
- Given the browser tab is hidden mid-phrase, when the user returns, then typing resumes from where it paused (no garbled fast-forward).
- Given `prefers-reduced-motion: reduce`, when the hero renders, then phrase 1 appears complete and static with no caret blink.
- Given any viewport ≥ 375px, when phrases of different lengths cycle, then surrounding content does not shift vertically.

### 3.3 Logo marquee

**Content**
- Label above track (caption, `text/tertiary`, centered): "POWERING CONTENT TEAMS AT"
- 8 fictional wordmarks rendered as text (Space Grotesk 600, uppercase, 0.08em tracking, `text/tertiary` at 80% opacity): Northray, Lumina, Hexaform, Bloomtail, Driftline, Papermoon, Cobalt Labs, Vantage.

**Motion**
- Single-row infinite marquee via the shared `Marquee` component: track duplicated once, CSS keyframe `translateX(0 → -50%)`, 32s linear infinite. Duplicate track is `aria-hidden="true"`.
- Pauses on hover and on `focus-within`. Edge fade masks (48px `mask-image` gradient) both sides.
- Reduced motion: animation off; first 8 logos render as a static wrapped row.

**Acceptance criteria**
- Given the section is visible, when the marquee runs, then scrolling is continuous with no visible seam at the loop point.
- Given a screen reader traverses the section, when it reads the track, then each logo name is announced exactly once.
- Given `prefers-reduced-motion: reduce`, when the section renders, then no movement occurs and all 8 names are visible.

### 3.4 Features

**Content (final copy)**
- Eyebrow: "WHAT QUILL WRITES" · H2 (display-md): "One brief. Six kinds of copy." · Sub (body-lg): "Every format your content calendar demands — drafted, polished, and on-brand."
- 6 `FeatureCard`s (glass cards, icon in gradient-tinted rounded square, title, body):

| Icon (lucide) | Title | Body copy |
|---|---|---|
| `FileText` | Blog posts | Outlines, drafts, and final polish for long-form. Quill keeps structure tight and citations where you left them. |
| `Mail` | Marketing emails | Launch sequences, newsletters, and win-backs — with subject lines that earn the open. |
| `Megaphone` | Ad copy | Scroll-stopping headlines in every size Google, Meta, and LinkedIn allow. Variants included. |
| `Languages` | Translation | Ship the same story in 30+ languages. Idioms carry over — and so does your voice. |
| `Wand2` | Tone rewriting | One slider from boardroom-formal to launch-day-loud. Same message, any register. |
| `SearchCheck` | SEO briefs | Keyword-mapped briefs with headings, entities, and the questions readers actually ask. |

**Motion**
- Heading block reveals first; cards stagger in (0.08s) on `whileInView`.
- Card hover (pointer devices): rise 4px, border brightens `border/subtle → border/strong`, 250ms.

**Acceptance criteria**
- Given the user scrolls to Features, when the section enters the viewport (−80px margin), then the heading reveals followed by the six cards staggering in exactly once (no replay on re-scroll).
- Given a desktop pointer, when a card is hovered, then it lifts 4px with a brighter border and settles back on leave.
- Given a 375px viewport, when Features renders, then cards stack in one column with no clipped text.

### 3.5 Product showcase

**Content (final copy)**
- Eyebrow: "THE EDITOR" · H2: "Watch Quill draft in real time." · Sub: "A focused editor with AI one keystroke away — no tab-hopping, no prompt engineering."
- `EditorMockup` — a fake editor window built in code (no screenshots):
  - Window chrome: three traffic-light dots, filename tab "cold-email-guide.md".
  - Toolbar (icon buttons, visual-only, `aria-hidden` group labeled decorative): `Bold`, `Italic`, `Heading1`, `List`, `Link`, then a gradient pill button "✦ Improve".
  - Body text self-types via `useTypewriter` (loop off, 28ms/char), styled as rendered prose:
    - Line 1 (title style): "The 5-Minute Cold Email"
    - Line 2: "Most cold emails die in the first line. Yours won't."
    - Line 3: "Start with the reader's problem, not your product. Name the outcome they want, show one proof point, then ask a question that's easy to say yes to."
  - Blinking caret persists at the end after typing completes.
  - Status bar footer: left "Draft · saved just now", right word counter that counts up live with the typed text (ending at "41 words" for the full script).

**Motion**
- The mockup frame reveals with `whileInView` (fade + rise + slight scale 0.97→1). Typing starts when the mockup is ≥ 40% in view and runs once per page load; the block reserves final height so the page never shifts while typing.
- The mockup carries a soft violet glow (`glow-popular` shadow token).

**Acceptance criteria**
- Given the user scrolls the mockup 40% into view, when it appears, then typing starts within 300ms and completes all three paragraphs without user input, and the word counter matches the visible words.
- Given the user scrolls away mid-typing and returns, then typing has continued or completed — it never restarts.
- Given `prefers-reduced-motion: reduce`, when the mockup renders, then the full text and final word count show immediately with a static caret.
- Given keyboard navigation, when tabbing through the page, then the decorative toolbar buttons are not focusable (they are presentation-only).

### 3.6 Testimonials marquee

**Content (final copy)**
- Eyebrow: "TESTIMONIALS" · H2: "Don't take our word for it." · Sub: "Twelve thousand writers ship with Quill. A few of them, in their own words."
- 8 `TestimonialCard`s (glass card: quote, avatar photo, name, role — company). Companies match the logo marquee list:

| Name | Role, company | Quote |
|---|---|---|
| Amara Osei | Head of Content, Lumina | "We cut blog production from three days to four hours. Drafts land in our voice, not a robot's." |
| Daniel Reyes | Growth Lead, Northray | "Quill's ad variants beat our agency copy in the first A/B test. I stopped being surprised the fourth time." |
| Ines Kovač | Founder, Papermoon | "I brief Quill on my phone over coffee and edit a finished draft by nine. It's the closest thing to a second me." |
| Tom Whitfield | Email Marketing Manager, Driftline | "Open rates are up 22% since we started shipping Quill's subject lines. The win-back sequence paid for the year." |
| Yuki Tanaka | Localization Lead, Hexaform | "The Japanese translations read like they were written in Japanese. Our reviewers barely touch them anymore." |
| Sofia Marchetti | Content Strategist, Bloomtail | "Tone rewriting is the feature I didn't know I needed. One draft becomes an exec memo and a launch tweet." |
| Marcus Bell | SEO Manager, Cobalt Labs | "The SEO briefs are better than the ones I used to write. Structured, entity-aware, ready in a minute." |
| Priya Raman | Product Marketer, Vantage | "Six launches this quarter, one writer: me. Quill is the rest of the team." |

**Motion**
- Two marquee rows (cards 1–4 and 5–8): row A scrolls right→left at 48s, row B left→right at 60s, both linear infinite via the shared `Marquee` component with duplicated `aria-hidden` tracks.
- Both rows pause on hover / focus-within. Edge fade masks match the logo marquee.
- Mobile (< 768px): single row (all 8 cards, 80s) to keep card text readable at ~300px card width.
- Reduced motion: marquee off; cards render as a static 1/2-column grid (breakpoint-dependent) showing all 8.

**Acceptance criteria**
- Given a desktop viewport, when the section is visible, then two rows drift in opposite directions with no seam and pause while hovered.
- Given a screen reader, when the section is read, then each of the 8 testimonials is announced exactly once.
- Given `prefers-reduced-motion: reduce`, then all 8 cards are statically visible in a grid.

### 3.7 Pricing

**Content (final copy)**
- Eyebrow: "PRICING" · H2: "Simple plans. Serious output." · Sub: "Start free. Upgrade when the words start working."
- `BillingToggle`: segmented control "Monthly | Yearly" with an attached badge "Save 20%" (gradient pill) next to the Yearly label. Default: Monthly.
- 3 `PricingCard`s:

| | Free | Pro (Most popular) | Team |
|---|---|---|---|
| Tagline | For trying Quill on real work. | For solo writers and founders. | For marketing teams shipping daily. |
| Monthly price | $0 | $20 | $45 |
| Yearly price (per month) | $0 | $16 | $36 |
| Price caption | free forever | per month | per month |
| Features | 2,000 words per month · 1 brand voice · Blog posts & emails · Community support | Unlimited words · 5 brand voices · All six content types · Tone rewriting · 30+ languages · Priority support | Everything in Pro · 10 seats included · Shared style guide · SEO brief workflows · Approval flows · Dedicated success manager |
| CTA label | Start free | Go Pro | Start a team trial |

- Feature rows use `Check` icons in `success`. Pro card: gradient border, "Most popular" badge, `glow-popular` shadow, primary CTA; Free and Team use secondary CTAs.
- Footnote under the grid (body-sm, `text/tertiary`): "Prices in USD. Yearly plans are billed as one payment."

**Motion**
- Toggle knob slides between segments with a `layoutId` spring (`spring-toggle`).
- On toggle, each non-zero price animates: outgoing number slides up 12px and fades, incoming slides in from below via `AnimatePresence` in `AnimatedPrice` (250ms, ease-out-expo). Yearly also swaps the caption to "per month, billed yearly".
- Cards stagger in on `whileInView`; Pro card scales 1.03 at ≥ 1024px to read as featured.

**Acceptance criteria**
- Given Monthly is selected, when the user activates the Yearly segment, then Pro animates $20 → $16 and Team $45 → $36, the knob springs across, and the "Save 20%" badge remains attached to Yearly.
- Given rapid repeated toggling, when animations interrupt, then prices always settle on the value matching the selected segment (interruptible, never stuck between states).
- Given keyboard focus on the toggle, when the user presses `Enter`/`Space` (or arrow keys between segments), then the billing period switches and the state is announced (`role="radiogroup"` semantics with `aria-checked`).
- Given a 375px viewport, when Pricing renders, then cards stack Free → Pro → Team in one column and price digits do not overflow.

### 3.8 FAQ

**Content (final copy)**
- Eyebrow: "FAQ" · H2: "Questions, answered." · Sub: "Everything else — ask us at hello@quill.ai." *(display copy of the fictional product; not a working link target requirement)*
- 6 `AccordionItem`s, all collapsed on load, single-open behavior (opening one closes another):

1. **How does Quill learn my brand voice?** — Paste three samples of past writing into a voice profile. Quill extracts tone, cadence, and vocabulary, then applies them to every draft. Free includes one profile; Pro includes five.
2. **Is the output original?** — Every draft is generated fresh from your brief — nothing is pulled from a template library or copied from the web. Teams routinely run Quill drafts through plagiarism checkers; they pass.
3. **Can I use what Quill writes commercially?** — Yes. You own the output on every plan, including Free, with full commercial rights and no attribution required.
4. **Which languages does translation support?** — 34 languages, including Spanish, French, German, Portuguese, Japanese, Korean, Arabic, and Hindi. Tone and idiom carry across — not just the words.
5. **What happens when I hit the Free plan's word limit?** — Drafting pauses until the first of next month, or upgrade to Pro for unlimited words. Nothing you've written is ever locked or deleted.
6. **Can I cancel or switch plans anytime?** — Yes — switch or cancel in one click from your billing page. Yearly plans are refunded pro-rata within the first 30 days.

**Motion**
- Answer panel expands/collapses with spring physics (`spring-accordion`: height auto-animation + opacity). Chevron rotates 180° in sync.
- Reduced motion: 150ms fade, no height spring.

**Acceptance criteria**
- Given all items are collapsed, when the user clicks question 2, then its answer springs open (slight overshoot, then settle) and the chevron rotates.
- Given question 2 is open, when the user clicks question 5, then 2 collapses and 5 opens; only one item is ever open.
- Given keyboard focus on a question button, when the user presses `Enter` or `Space`, then it toggles; `aria-expanded` and `aria-controls` reflect state, and the answer region has `role="region"` with `aria-labelledby`.
- Given question 1 is open, when the user clicks question 1 again, then it collapses (toggle behavior).

### 3.9 Final CTA

**Content (final copy)**
- Full-bleed-width rounded panel (radius `r-xl`) filled with the brand gradient (violet→blue, 135°), subtle grain/noise overlay at 4% opacity, white text.
- H2 (display-lg, white): "Your next 1,000 words are already drafted."
- Sub (body-lg, white at 80%): "Join 12,000+ writers who brief Quill in the morning and publish by lunch."
- Button: inverted lg button **"Start writing free"** (white background, `#05060F` text).
- Microcopy under the button (body-sm, white at 70%): "Free plan forever · No credit card required"

**Motion**
- Panel reveals with `whileInView` fade + rise; heading, sub, button stagger. Button hover: scale 1.03 + soft white glow, 150ms.

**Acceptance criteria**
- Given the user scrolls to the section, when it enters the viewport, then the panel and its contents reveal once with stagger.
- Given light mode, when the section renders, then the gradient panel and white text are unchanged (this section is theme-invariant) and contrast of text on gradient meets WCAG AA.

### 3.10 Footer

**Content (final copy)**
- Top row: logo (Feather icon + "Quill") and tagline underneath: "Publish-ready copy from a two-line brief."
- Link columns (headings in caption style):
  - **Product**: Features (`#features`), Showcase (`#showcase`), Pricing (`#pricing`), FAQ (`#faq`) — smooth-scroll anchors.
  - **Company**: About, Blog, Careers, Press — inert links (`href="#"`, `onClick` prevented; fictional destinations).
  - **Resources**: Docs, Templates, Changelog, Status — inert links.
  - **Legal**: Privacy, Terms, Security — inert links.
- Social icon buttons (lucide `Twitter`, `Github`, `Linkedin`, each with `aria-label`) — inert.
- Bottom bar: "© 2026 Quill AI, Inc. All rights reserved." left; "Made with Quill, obviously." right (body-sm, `text/tertiary`).

**Behavior**
- No reveal animation (footer is instant). Hover on links: `text/secondary → text/primary`, 150ms.

**Acceptance criteria**
- Given any viewport, when the user clicks a Product column link, then the page smooth-scrolls to that section.
- Given a Company/Resources/Legal link, when clicked, then the page does not navigate or jump to top.

## 4. Responsive behavior matrix

Breakpoints: **mobile** 375–767px, **tablet** 768–1023px, **desktop** 1024px+.

| Section | Mobile (375px) | Tablet (768px) | Desktop (1024px+) |
|---|---|---|---|
| Navbar | 64px bar; logo + theme toggle + hamburger; links/CTA in full-screen `MobileMenu` | Same as desktop, links may tighten spacing | 72px bar; inline links center, toggle + CTA right |
| Hero | Single column, centered text; H1 at 40px (display-xl mobile value); CTAs stack full-width; avatar row wraps below | Centered, H1 48px; CTAs inline | H1 64px; CTAs inline; blobs at full size |
| Logo marquee | Single row marquee, 0.9 scale wordmarks | Single row | Single row, larger gaps |
| Features | 1 column | 2 columns | 3 columns × 2 rows |
| Product showcase | Mockup full-width, toolbar collapses to 4 icons + Improve, 13px editor text | Mockup at 90% width centered | Mockup max 880px centered; heading above |
| Testimonials | 1 marquee row, cards ~300px wide | 2 rows | 2 counter-scrolling rows, cards 360px |
| Pricing | Cards stack in 1 column (Free → Pro → Team); Pro emphasis via badge only (no scale) | 1 column (cards stay stacked until 1024px) | 3 columns, Pro scaled 1.03 |
| FAQ | Full-width list | Max 640px centered | Max 720px centered |
| Final CTA | Panel with 24px inner padding, H2 at 32px | Panel 40px padding | Panel 64px padding, H2 48px |
| Footer | Logo block, then link columns in a 2-column grid, bottom bar stacks | 4 columns + logo above | Logo left, 4 columns right, bottom bar inline |

## 5. Edge cases & empty states

This page has no user-generated or remote data — all content ships from `src/data/` modules — so classic empty states do not apply. The edge cases that do:

| Case | Required behavior |
|---|---|
| `localStorage` unavailable (private mode / blocked) | Theme defaults to dark; toggle still works for the session in memory; no thrown errors (all storage access wrapped in try/catch) |
| Stored `quill-theme` has an unexpected value | Treat as `"dark"`, overwrite on next toggle |
| `prefers-reduced-motion: reduce` | Behaviors in §2 Global; every AC above lists its reduced variant where relevant |
| Tab hidden during typewriter | Timers pause on `visibilitychange`; resume cleanly on return |
| Rapid pricing-toggle clicks | Animations interruptible; final state always matches selection |
| Very long translated/zoomed text (browser zoom 200%) | Cards grow vertically; no clipped or overlapping text |
| Keyboard-only user | Full flow operable: skip-to-content link as first focusable element, visible focus rings on every interactive element |
| Marquee under keyboard focus | Cards/logos are non-interactive (not focusable); marquee still pauses on `focus-within` for any future interactive child |
| 375px width | No horizontal scrollbar; blobs clipped by `overflow-hidden` on the hero |

## 6. Non-goals

- No real text generation, streaming, or API integration — the typewriter is scripted.
- No working forms, auth, or checkout; CTA buttons are visual endpoints (no-op or anchor scroll).
- No additional routes/pages; no CMS; no blog.
- No analytics, tracking, or cookie consent UI.
- No i18n of the site chrome (the translation feature is product fiction).
- No SSR/SSG framework — plain Vite static build.
