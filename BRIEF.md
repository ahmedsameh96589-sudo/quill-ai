# Quill AI — Product Brief

Planning brief for Quill AI: a single-page SaaS landing site for a fictional AI writing assistant, built as a front-end portfolio piece.

| | |
|---|---|
| Project | Quill AI |
| Document | BRIEF |
| Status | Approved |
| Owner | Ziad |
| Date | 2026-08-28 |

---

## Product one-liner

Quill AI turns a two-line brief into publish-ready copy — blog posts, emails, ads, translations, and SEO briefs — in your brand voice, in seconds.

## Elevator pitch

Content teams don't have a writing problem. They have a throughput problem. The calendar says four blog posts, two email sequences, and twelve ad variants this month; the team says one overworked writer and a founder who "helps" on weekends. Generic AI tools made this worse, not better — they produce fluent filler that takes longer to fix than to write.

Quill is different because it starts from a brief, not a blank prompt. You tell it what you're announcing, who it's for, and what you want the reader to do. Quill drafts in your voice — learned from three samples of your past writing — and outputs in the exact format the channel needs: a structured long-form post, a subject-line-tested email, platform-sized ad variants, an idiomatic translation, a register-shifted rewrite, or a keyword-mapped SEO brief. Brief it over coffee, edit a finished draft by nine, publish by lunch.

Twelve thousand writers and marketing teams already ship with Quill. The pitch in one sentence: stop prompting, start briefing.

## Target users (of the fictional product)

| Segment | Pain | What Quill gives them |
|---|---|---|
| Solo founders & indie hackers | No writer on staff; marketing copy blocks every launch | Launch emails and ad variants from a two-line brief |
| Content marketers on small teams | Calendar demands 10x what one writer can draft | First drafts in house voice; they edit instead of write |
| Freelance writers & micro-agencies | Billing by deliverable, drowning in first-draft grunt work | More clients served at the same quality bar |
| Growth & localization leads | Shipping one message across 30+ markets and registers | Idiomatic translation and one-click tone rewriting |

## Portfolio goals

Exactly what this project demonstrates to a recruiter reviewing the repo:

1. **Advanced Framer Motion** — orchestrated `whileInView` reveals with stagger, `layout`/`layoutId` shared-element toggle, spring-physics accordion, `AnimatePresence` price transitions.
2. **Custom hook engineering** — a `useTypewriter` hook with typing/deleting/holding phases, tab-visibility pause, and `prefers-reduced-motion` fallback; reused across two sections with different configs.
3. **Theming architecture** — dark-default class-based theming, a pre-paint inline script to prevent flash-of-wrong-theme, persistence to `localStorage` key `quill-theme`, graceful fallback when storage is blocked.
4. **Performant CSS animation** — infinite logo and testimonial marquees built with transform-only CSS keyframes (no JS per frame), hover/focus pause, `aria-hidden` duplicate tracks.
5. **Tailwind CSS v4 token system** — full design tokens (color, type, radius, motion) defined via `@theme`, consumed consistently in both themes.
6. **Responsive + accessibility rigor** — 375px-up layouts, semantic landmarks, fully keyboard-operable menu/toggle/accordion, honored `prefers-reduced-motion` everywhere.
7. **High-polish dark UI craft** — glassmorphism, gradient systems, glow effects, and a believable in-page product mockup built entirely in code.

## Scope

### In scope

- One static page, ten sections in fixed order: Navbar, Hero, Logo marquee, Features, Product showcase, Testimonials marquee, Pricing, FAQ, Final CTA, Footer.
- Dark theme default with persisted light-mode toggle (`quill-theme`).
- Custom `useTypewriter` hook powering the hero headline animation and the self-typing editor mockup.
- Animated mobile hamburger menu.
- Monthly/Yearly pricing toggle with animated prices and a save-20% badge.
- Six-item FAQ accordion with spring physics.
- Full responsive behavior 375px → desktop; static deployment on Vercel.

### Explicitly out of scope

- Any real AI generation, API calls, or backend of any kind.
- Authentication, signup flows, or working forms (CTAs are visual endpoints).
- Additional pages or routing (no blog, no docs, no legal pages).
- CMS integration, analytics, cookie banners, i18n of the site UI.
- Payment processing — pricing is display-only.

## Measurable success criteria

| # | Criterion | Target |
|---|---|---|
| 1 | Lighthouse (Vercel production, mobile) | ≥ 95 in Performance, Accessibility, Best Practices, SEO |
| 2 | Largest Contentful Paint (throttled mobile) | < 2.5s |
| 3 | Cumulative Layout Shift | < 0.02 (typewriter and price animations reserve space) |
| 4 | JS bundle (gzipped, excluding fonts) | < 180 KB |
| 5 | Theme persistence | Toggle survives reload and new tab; zero flash of wrong theme |
| 6 | Keyboard access | Menu, theme toggle, billing toggle, accordion, and all CTAs operable by keyboard with visible focus |
| 7 | Reduced motion | With `prefers-reduced-motion: reduce`, no marquee movement, no typewriter, no parallax blobs — content fully readable |
| 8 | Responsive integrity | No horizontal scroll or clipped content at 375, 768, 1024, 1440px |
| 9 | Animation performance | Marquees and reveals run transform/opacity only — no layout thrash in DevTools performance trace |
