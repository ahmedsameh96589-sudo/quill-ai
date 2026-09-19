# Quill AI

![Quill AI social preview](./public/og-image.svg)

Quill AI is a polished, single-page SaaS landing page for a fictional AI writing assistant. It is built as a front-end portfolio project focused on motion, accessibility, responsive design, and reusable React architecture.

## Highlights

- Ten responsive sections spanning navigation, product storytelling, social proof, pricing, FAQ, and conversion content.
- Custom `useTypewriter` hook with typing, holding, deleting, visibility-pause, and reduced-motion behavior.
- Dark-first theme with a persisted light mode and a pre-paint script that prevents theme flash.
- CSS-driven logo and testimonial marquees with no per-frame JavaScript.
- Framer Motion reveals, pricing transitions, mobile navigation, and accordion interactions.
- Tailwind CSS v4 design tokens shared across both themes.
- Keyboard-friendly controls, semantic landmarks, and `prefers-reduced-motion` fallbacks.

## Tech stack

- React 19
- Vite 7
- Tailwind CSS v4
- Motion for React
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

To verify the production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    layout/      Navigation and footer
    sections/    Page sections
    ui/          Reusable UI primitives
  context/       Theme state
  data/          Static page content
  hooks/         Custom interaction hooks
  assets/        Local avatar assets
docs/pmad/       Epics, stories, and implementation records
```

## Planning documentation

The repository includes the complete planning pack used to define the project:

- [`BRIEF.md`](./BRIEF.md) — product context, scope, portfolio goals, and success criteria.
- [`PRD.md`](./PRD.md) — copy, behavior, motion specifications, and acceptance criteria.
- [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) — visual tokens and component specifications.
- [`TECHNICAL-PLAN.md`](./TECHNICAL-PLAN.md) — architecture, component inventory, and milestones.
- [`DECISIONS.md`](./DECISIONS.md) — architecture decision records and trade-offs.
- [`docs/pmad/`](./docs/pmad/) — epics, stories, development records, and review notes.

## Performance snapshot

- Production JavaScript bundle: approximately **125 KB gzip**.
- Production build: passing.
- Responsive overflow checks: passing at 375, 768, 1024, and 1440px.
- Final Lighthouse validation is intentionally deferred until production deployment.

## Scope

Quill AI is a static portfolio experience. Product actions, authentication, payments, and AI generation are intentionally out of scope.

## Credits

Avatar sources and licensing notes are listed in [`src/assets/avatars/CREDITS.md`](./src/assets/avatars/CREDITS.md).
