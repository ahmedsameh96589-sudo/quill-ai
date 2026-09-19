# Quill AI — PMAD Backlog

Epics and stories for the Quill AI landing page. Epics map 1:1 to the build milestones in TECHNICAL-PLAN.md §7. Each story carries acceptance criteria traced to PRD.md, a task list, a Dev Agent Record, and a Review Record.

| | |
|---|---|
| Project | Quill AI |
| Method | PMAD (epic → story → implement → self-review → gate) |
| Implementer | Cursor agent |
| Reviewer / PM | Claude (external review pass) |
| Date started | 2026-09-19 |

## Roles

- **Implementer (Cursor).** Picks the next story in order, implements it, runs verification, fills the Dev Agent Record, and self-reviews against the story's acceptance criteria before moving on.
- **Reviewer / PM (Claude).** Reviews completed epics against BRIEF/PRD/DESIGN-SYSTEM/TECHNICAL-PLAN and records findings in each epic's Review Record.

## Story status vocabulary

`Draft` → `Approved` → `In Progress` → `Review` → `Done`

## Definition of Done (every story)

1. Implemented against the spec documents — no invented copy, no invented tokens.
2. `npm run build` passes with no errors or new warnings.
3. Every acceptance criterion in the story is verified and the evidence noted in the Dev Agent Record.
4. Reduced-motion and keyboard paths handled where the story touches motion or interaction.
5. Committed to `main` with a message naming the story id.

Full stories, Dev Agent Records, and Review Records live in `docs/pmad/stories/`, one file per epic.

## Epic index

| Epic | Milestone | Title | Stories | Status |
|---|---|---|---|---|
| E1 | M1 | Foundation, tokens, theming | 1.1 – 1.4 | Done |
| E2 | M2 | Navigation shell | 2.1 – 2.3 | Done |
| E3 | M3 | Hero and the typewriter engine | 3.1 – 3.4 | Done |
| E4 | M4 | Marquee engine, logos, features | 4.1 – 4.3 | Done |
| E5 | M5 | Product showcase | 5.1 | Done |
| E6 | M6 | Testimonials and pricing | 6.1 – 6.3 | Done |
| E7 | M7 | FAQ, final CTA, footer | 7.1 – 7.3 | Done |
| E8 | M8 | Polish, audit, ship | 8.1 – 8.4 | Done |

## Story index

| Story | Title | Spec source | Status |
|---|---|---|---|
| 1.1 | Vite + React + Tailwind v4 scaffold | TECH §1, §2 | Done |
| 1.2 | Design tokens in `@theme` | DESIGN-SYSTEM §1–4 | Done |
| 1.3 | Theme provider, toggle contract, pre-paint script | TECH §5, D6 | Done |
| 1.4 | Data modules and section placeholders in PRD order | TECH §4, PRD §1 | Done |
| 2.1 | `Button`, `GlassCard`, `GradientText`, `Reveal`, `SectionHeading` primitives | DESIGN-SYSTEM §5 | Done |
| 2.2 | Navbar with glass-on-scroll and `useScrolled` | PRD §3.1 | Done |
| 2.3 | `MobileMenu` with stagger, scroll lock, focus trap, Escape | PRD §3.1 | Done |
| 3.1 | `useTypewriter` phase machine | TECH §3, D8 | Done |
| 3.2 | `TypewriterText` with reserved height and caret | PRD §3.2 | Done |
| 3.3 | `GlowBlobs` and `AvatarRow` | PRD §3.2 | Done |
| 3.4 | Hero composition and load-in stagger | PRD §3.2 | Done |
| 4.1 | Generic `Marquee` component | D7 | Done |
| 4.2 | `LogoMarquee` section | PRD §3.3 | Done |
| 4.3 | `Features` grid with 6 cards | PRD §3.4 | Done |
| 5.1 | `EditorMockup` and `ProductShowcase` | PRD §3.5 | Done |
| 6.1 | `TestimonialsMarquee` with counter-scrolling rows | PRD §3.6 | Done |
| 6.2 | `BillingToggle` and `AnimatedPrice` | PRD §3.7 | Done |
| 6.3 | `Pricing` section with 3 tiers | PRD §3.7 | Done |
| 7.1 | `FAQ` spring accordion | PRD §3.8 | Done |
| 7.2 | `FinalCTA` gradient panel | PRD §3.9 | Done |
| 7.3 | `Footer` | PRD §3.10 | Done |
| 8.1 | Avatar assets and image performance | D9, TECH §8 | Done |
| 8.2 | Reduced-motion and accessibility audit | PRD §2, TECH §9 | Done |
| 8.3 | Responsive audit at 375/768/1024/1440 | PRD §4 | Done |
| 8.4 | Meta, OG, favicon, production build | TECH §7 M8 | Done |
