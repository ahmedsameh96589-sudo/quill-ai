# Quill AI — Technical Plan

Dependencies, architecture, component inventory, data shapes, animation implementation, and build milestones for the Quill AI landing page.

| | |
|---|---|
| Project | Quill AI |
| Document | TECHNICAL-PLAN |
| Status | Approved |
| Owner | Ziad |
| Date | 2026-08-28 |

---

## 1. Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.1.0 | UI runtime |
| `react-dom` | ^19.1.0 | DOM renderer |
| `vite` | ^7.0.0 | Build tool / dev server |
| `@vitejs/plugin-react` | ^4.5.0 | React fast refresh + JSX |
| `tailwindcss` | ^4.1.0 | Styling; tokens via `@theme` |
| `@tailwindcss/vite` | ^4.1.0 | Tailwind v4 Vite plugin |
| `motion` | ^12.23.0 | Framer Motion (import from `"motion/react"`) |
| `lucide-react` | ^0.540.0 | Icon set |

No router (single page). No other runtime dependencies — the typewriter, marquees, and theming are hand-built.

## 2. Folder structure (`src/`)

```
src/
├── main.jsx                      # ReactDOM.createRoot, wraps App in ThemeProvider
├── App.jsx                       # Section composition in PRD order
├── index.css                     # Tailwind v4 import, @theme tokens, marquee keyframes, base styles
├── assets/
│   └── avatars/
│       ├── avatar-01.jpg … avatar-05.jpg    # hero AvatarRow
│       └── avatar-06.jpg … avatar-13.jpg    # testimonials
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── LogoMarquee.jsx
│   │   ├── Features.jsx
│   │   ├── ProductShowcase.jsx
│   │   ├── TestimonialsMarquee.jsx
│   │   ├── Pricing.jsx
│   │   ├── FAQ.jsx
│   │   └── FinalCTA.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── SectionHeading.jsx
│       ├── GradientText.jsx
│       ├── GlassCard.jsx
│       ├── Reveal.jsx
│       ├── Marquee.jsx
│       ├── ThemeToggle.jsx
│       ├── TypewriterText.jsx
│       ├── GlowBlobs.jsx
│       ├── AvatarRow.jsx
│       ├── FeatureCard.jsx
│       ├── EditorMockup.jsx
│       ├── TestimonialCard.jsx
│       ├── PricingCard.jsx
│       ├── BillingToggle.jsx
│       ├── AnimatedPrice.jsx
│       └── AccordionItem.jsx
├── context/
│   └── ThemeContext.jsx          # ThemeProvider + useTheme hook
├── hooks/
│   ├── useTypewriter.js
│   └── useScrolled.js
└── data/
    ├── navLinks.js
    ├── heroPhrases.js
    ├── logos.js
    ├── features.js
    ├── showcaseScript.js
    ├── testimonials.js
    ├── pricing.js
    ├── faqs.js
    └── footerLinks.js
```

`index.html` additionally carries: Google Fonts `<link>` tags (preconnect + Space Grotesk / Inter), the pre-paint theme script (§5), meta description, and OG tags.

## 3. Component inventory

### Layout

| Component | Purpose | Key props |
|---|---|---|
| `Navbar` | Fixed header; glass state past 8px scroll (via `useScrolled`); desktop links; renders `ThemeToggle`, CTA, hamburger | — (reads `navLinks` data) |
| `MobileMenu` | Full-screen overlay with staggered links, scroll lock, focus trap, Escape-to-close | `open: boolean`, `onClose: () => void` |
| `Footer` | Logo + tagline, 4 link columns, socials, bottom bar | — (reads `footerLinks` data) |

### Sections

| Component | Purpose | Key props |
|---|---|---|
| `Hero` | H1 + gradient span, sub, typewriter line, 2 CTAs, `AvatarRow`, `GlowBlobs`; load-time stagger | — |
| `LogoMarquee` | "Powering content teams at" + infinite wordmark marquee | — |
| `Features` | Section heading + 6 `FeatureCard`s in responsive grid | — |
| `ProductShowcase` | Heading + `EditorMockup` | — |
| `TestimonialsMarquee` | Heading + two counter-scrolling `Marquee` rows of `TestimonialCard`s (one row on mobile; static grid under reduced motion) | — |
| `Pricing` | Heading, `BillingToggle` state owner, 3 `PricingCard`s, footnote | — |
| `FAQ` | Heading + 6 `AccordionItem`s; owns `openId` single-open state | — |
| `FinalCTA` | Gradient panel, H2, sub, inverted CTA, microcopy | — |

### UI

| Component | Purpose | Key props |
|---|---|---|
| `Button` | All button variants/sizes; renders `<a>` or `<button>` | `variant: "primary" \| "secondary" \| "ghost" \| "inverted"`, `size: "md" \| "lg"`, `href?`, `icon?`, `onClick?` |
| `SectionHeading` | Eyebrow + H2 + sub, centered, wrapped in `Reveal` | `eyebrow: string`, `title: ReactNode`, `subtitle?: string`, `id?: string` |
| `GradientText` | Span with brand gradient `background-clip: text` | `children` |
| `GlassCard` | Glass surface: `bg/raised`, 1px `border/subtle`, radius `r-lg`, hover lift option | `hover?: boolean`, `className?`, `children` |
| `Reveal` | `motion.div` `whileInView` fade + 24px rise; passes stagger to children; respects reduced motion | `delay?: number`, `stagger?: boolean`, `as?: string`, `children` |
| `Marquee` | Generic infinite marquee: duplicated `aria-hidden` track, CSS animation, hover/focus pause, edge masks, reduced-motion static fallback | `duration: number` (s), `reverse?: boolean`, `children` |
| `ThemeToggle` | Sun/Moon icon button; icon cross-fade on switch; calls `useTheme().toggle` | — |
| `TypewriterText` | Renders `useTypewriter` output + blinking caret; fixed-height wrapper | `phrases: string[]`, `prefix?: string`, `loop?: boolean`, `typeMs?`, `deleteMs?`, `holdMs?`, `startInView?: boolean` |
| `GlowBlobs` | Two absolutely-positioned blurred gradient blobs, CSS drift animation, `aria-hidden` | `className?` |
| `AvatarRow` | 5 overlapping avatars + rating/social-proof text | `avatars: string[]`, `text: string` |
| `FeatureCard` | Icon tile + title + body inside `GlassCard` | `icon: LucideIcon`, `title: string`, `description: string` |
| `EditorMockup` | Fake editor: chrome, filename tab, toolbar, self-typing body (via `useTypewriter`, `startInView`, no loop), live word count, status bar | — (reads `showcaseScript` data) |
| `TestimonialCard` | Quote + avatar + name + role/company | `testimonial: Testimonial` |
| `PricingCard` | Tier card: name, tagline, `AnimatedPrice`, feature list with checks, CTA; featured styling for Pro | `tier: PricingTier`, `billing: "monthly" \| "yearly"` |
| `BillingToggle` | Monthly/Yearly `role="radiogroup"`; `layoutId` spring knob; "Save 20%" badge | `billing`, `onChange: (b) => void` |
| `AnimatedPrice` | `AnimatePresence mode="popLayout"` slide/fade between price values; tabular-nums to prevent width shift | `value: number`, `caption: string` |
| `AccordionItem` | Question button + spring height-animated answer panel; full ARIA wiring | `item: Faq`, `open: boolean`, `onToggle: () => void` |

### Context & hooks

| Unit | Purpose | API |
|---|---|---|
| `ThemeProvider` / `useTheme` | Owns theme state; syncs `<html>` class + localStorage | `{ theme: "dark" \| "light", toggle(): void }` |
| `useTypewriter` | Phase machine: typing → holding → deleting → next; `visibilitychange` pause; reduced-motion short-circuit; optional IntersectionObserver start | `useTypewriter(phrases, { typeMs = 45, deleteMs = 20, holdMs = 1600, gapMs = 400, loop = true, startInView = false, ref }) => { text, done }` |
| `useScrolled` | Boolean past a scroll threshold, passive listener + rAF throttle | `useScrolled(threshold = 8) => boolean` |

Reduced-motion detection uses `useReducedMotion()` from `"motion/react"` — no custom hook needed.

## 4. Mock-data shapes (`src/data/`)

```js
// navLinks.js
export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// heroPhrases.js
export const heroPhrases = [
  "Subject: Your invoice just got smarter",
  "Meet Halo — the desk lamp that learns your rhythm.",
  "5 pricing-page mistakes costing you signups",
  "Bonjour Paris — votre campagne est prête.",
];

// logos.js
export const logos = [
  { id: "northray", name: "Northray" },
  { id: "lumina", name: "Lumina" },
  { id: "hexaform", name: "Hexaform" },
  { id: "bloomtail", name: "Bloomtail" },
  { id: "driftline", name: "Driftline" },
  { id: "papermoon", name: "Papermoon" },
  { id: "cobalt-labs", name: "Cobalt Labs" },
  { id: "vantage", name: "Vantage" },
];

// features.js
import { FileText, Mail, Megaphone, Languages, Wand2, SearchCheck } from "lucide-react";
export const features = [
  {
    id: "blog-posts",
    icon: FileText,                       // lucide component reference
    title: "Blog posts",
    description: "Outlines, drafts, and final polish for long-form. Quill keeps structure tight and citations where you left them.",
  },
  // … 5 more: marketing-emails (Mail), ad-copy (Megaphone),
  // translation (Languages), tone-rewriting (Wand2), seo-briefs (SearchCheck)
];

// showcaseScript.js
export const showcaseScript = {
  filename: "cold-email-guide.md",
  blocks: [
    { style: "title", text: "The 5-Minute Cold Email" },
    { style: "body",  text: "Most cold emails die in the first line. Yours won't." },
    { style: "body",  text: "Start with the reader's problem, not your product. Name the outcome they want, show one proof point, then ask a question that's easy to say yes to." },
  ],
};

// testimonials.js
import avatar06 from "../assets/avatars/avatar-06.jpg";
export const testimonials = [
  {
    id: 1,
    quote: "We cut blog production from three days to four hours. Drafts land in our voice, not a robot's.",
    name: "Amara Osei",
    role: "Head of Content",
    company: "Lumina",
    avatar: avatar06,
  },
  // … 7 more (ids 2–8), avatars avatar-07 … avatar-13, copy per PRD §3.6
];

// pricing.js
export const tiers = [
  {
    id: "free",
    name: "Free",
    tagline: "For trying Quill on real work.",
    monthly: 0,
    yearly: 0,                             // per-month price when billed yearly
    caption: { monthly: "free forever", yearly: "free forever" },
    features: ["2,000 words per month", "1 brand voice", "Blog posts & emails", "Community support"],
    cta: "Start free",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For solo writers and founders.",
    monthly: 20,
    yearly: 16,
    caption: { monthly: "per month", yearly: "per month, billed yearly" },
    features: ["Unlimited words", "5 brand voices", "All six content types", "Tone rewriting", "30+ languages", "Priority support"],
    cta: "Go Pro",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    tagline: "For marketing teams shipping daily.",
    monthly: 45,
    yearly: 36,
    caption: { monthly: "per month", yearly: "per month, billed yearly" },
    features: ["Everything in Pro", "10 seats included", "Shared style guide", "SEO brief workflows", "Approval flows", "Dedicated success manager"],
    cta: "Start a team trial",
    popular: false,
  },
];

// faqs.js
export const faqs = [
  {
    id: "brand-voice",
    question: "How does Quill learn my brand voice?",
    answer: "Paste three samples of past writing into a voice profile. Quill extracts tone, cadence, and vocabulary, then applies them to every draft. Free includes one profile; Pro includes five.",
  },
  // … 5 more: originality, commercial-use, languages, word-limit, cancel — copy per PRD §3.8
];

// footerLinks.js
export const footerColumns = [
  { heading: "Product",   links: [{ label: "Features", href: "#features" }, { label: "Showcase", href: "#showcase" }, { label: "Pricing", href: "#pricing" }, { label: "FAQ", href: "#faq" }] },
  { heading: "Company",   links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Careers", href: "#" }, { label: "Press", href: "#" }] },
  { heading: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Templates", href: "#" }, { label: "Changelog", href: "#" }, { label: "Status", href: "#" }] },
  { heading: "Legal",     links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Security", href: "#" }] },
];
```

## 5. State & persistence

| State | Owner | Persistence |
|---|---|---|
| `theme` (`"dark"` \| `"light"`) | `ThemeProvider` | localStorage key **`quill-theme`** |
| `mobileMenuOpen` | `Navbar` | none |
| `scrolled` | `useScrolled` inside `Navbar` | none |
| `billing` (`"monthly"` \| `"yearly"`) | `Pricing` | none (resets on reload by design) |
| `openId` (FAQ, `string \| null`) | `FAQ` | none |
| Typewriter phase/text | `useTypewriter` internal | none |

**Theming mechanics**
- `<html>` carries class `dark` (default) or `light`; Tailwind v4 dark variant configured as `@custom-variant dark (&:where(.dark, .dark *))`.
- Pre-paint inline script in `index.html` `<head>`:

```html
<script>
  try {
    var t = localStorage.getItem("quill-theme");
    document.documentElement.classList.add(t === "light" ? "light" : "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
</script>
```

- `ThemeProvider` reads the applied class on mount (single source of truth), `toggle()` swaps the class and writes `quill-theme` inside try/catch. Unknown stored values are treated as `"dark"`. System `prefers-color-scheme` is deliberately ignored — dark is the product default (see DECISIONS.md D6).

## 6. Animation implementation notes

| Effect | Implementation |
|---|---|
| Section reveals | `Reveal`: `motion.div` with `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}`; container variant with `staggerChildren: 0.08` for grids |
| Hero load-in | Same variants but `animate` instead of `whileInView` (fires on mount) |
| Navbar glass | Plain CSS transition on background/backdrop-filter/border, class swapped by `useScrolled` |
| Mobile menu | `AnimatePresence` around the overlay; panel `initial={{ opacity: 0 }}`; links as staggered variants (`y: 16 → 0`, 0.06s stagger); hamburger↔X via two icons cross-faded with `animate` opacity/rotate |
| Typewriter (hero + editor) | `useTypewriter`: `setTimeout` chain driven by a phase reducer; clears timers on unmount; `document.visibilitychange` pauses/resumes; `useReducedMotion()` returns the full first phrase and `done: true` immediately; editor instance starts via IntersectionObserver at 0.4 threshold, `loop: false` |
| Caret blink | CSS `@keyframes caret-blink` (steps(1), 1.1s); suppressed under reduced motion |
| Marquees (logos + testimonials) | `Marquee` renders two copies of children in a flex track; CSS `@keyframes marquee { to { transform: translateX(-50%) } }`, `animation: marquee var(--duration) linear infinite`, `reverse` flips direction; `:hover`/`:focus-within` sets `animation-play-state: paused`; `@media (prefers-reduced-motion: reduce)` disables the animation and unhides the static fallback layout |
| Glow blobs | Two divs with radial-gradient backgrounds + `filter: blur(80px)`; CSS `@keyframes blob-drift` (translate/scale, 18s ease-in-out infinite alternate); GPU-friendly (transform only after initial blur) |
| Billing toggle knob | `motion.span` with `layoutId="billing-knob"` inside the active segment; `transition={{ type: "spring", stiffness: 500, damping: 35 }}` |
| Price change | `AnimatePresence mode="popLayout"` keyed on `${tier.id}-${billing}`; exit `{ y: -12, opacity: 0 }`, enter from `{ y: 12, opacity: 0 }`, 0.25s ease-out-expo; `font-variant-numeric: tabular-nums` keeps card width stable |
| Accordion | `AnimatePresence` + `motion.div` animating `height: 0 ↔ "auto"` and opacity with `transition={{ type: "spring", stiffness: 300, damping: 32 }}`; chevron `motion` rotate 0↔180°; reduced motion switches to `{ duration: 0.15 }` tween |
| Card hovers / CTA hovers | CSS transitions only (transform + border-color + box-shadow, 150–250ms) — no JS |

## 7. Build milestones

| M | Scope | Definition of done |
|---|---|---|
| M1 | Scaffold & tokens | Vite 7 + React 19 + Tailwind v4 + motion + lucide installed; `@theme` tokens from DESIGN-SYSTEM.md in `index.css`; Google Fonts wired with preconnect; pre-paint theme script in `index.html`; `ThemeProvider` toggles class + persists `quill-theme`; empty section placeholders render in PRD order |
| M2 | Navbar & menus | Sticky navbar with glass-on-scroll; anchor smooth-scroll with `scroll-margin-top`; `ThemeToggle` functional in both themes; `MobileMenu` opens/closes with stagger, scroll lock, Escape, focus return; passes keyboard walkthrough |
| M3 | Hero | Full hero copy + gradient headline; `useTypewriter` complete with pause/reduced-motion; `TypewriterText` cycles 4 phrases with zero layout shift; `GlowBlobs` drifting; `AvatarRow` with 5 downloaded avatars; load-in stagger |
| M4 | Logo marquee & Features | `Marquee` component (seamless loop, pause, masks, reduced-motion fallback) proven on logos; Features grid with 6 cards, `Reveal` stagger, hover lift; responsive at all 3 breakpoints |
| M5 | Product showcase | `EditorMockup` with chrome, toolbar, in-view self-typing, live word count, status bar; types once, never restarts; reduced-motion static render; height reserved (CLS check in DevTools = 0 for this section) |
| M6 | Testimonials & Pricing | Two counter-scrolling testimonial rows (one on mobile, grid under reduced motion); `BillingToggle` with spring knob + Save 20% badge; `AnimatedPrice` transitions correct under rapid toggling; radiogroup keyboard semantics |
| M7 | FAQ, Final CTA, Footer | Spring accordion with single-open behavior and full ARIA; gradient Final CTA panel; footer columns with working anchor links and inert externals |
| M8 | Polish, audit, deploy | `prefers-reduced-motion` verified across every effect; 375/768/1024/1440px pass with no overflow; Lighthouse ≥ 95 across categories on Vercel preview; meta/OG tags + favicon; production deploy on Vercel with clean build |

Milestones ship sequentially; each ends with a commit on `main` and a Vercel preview check from M2 onward.

## 8. Performance notes

- **Fonts**: Google Fonts via `<link rel="preconnect">` to `fonts.googleapis.com` and `fonts.gstatic.com`, stylesheet with `display=swap`; only weights used are requested (Space Grotesk 600/700, Inter 400/500/600).
- **Images**: 13 avatar JPGs cropped square at 200×200, quality 80, each < 30 KB; `loading="lazy"` on testimonial avatars (below the fold), eager on hero row; explicit `width`/`height` everywhere.
- **Animation cost**: all continuous animation is transform/opacity (compositor-only); blur lives on static elements (blobs, navbar) — never animated; marquee tracks get `will-change: transform`.
- **Bundle**: lucide icons imported individually (tree-shaken); no barrel re-exports in `components/`; motion features used via standard `motion/react` import; target < 180 KB gzipped JS.
- **CLS discipline**: typewriter wrappers and `AnimatedPrice` use fixed heights / tabular-nums; fonts use `size-adjust`-friendly fallback stack to limit swap shift.

## 9. Accessibility notes

- Landmarks: `header` / `main` / `footer`; each section labelled by its heading id; skip-to-content link first in DOM.
- Heading order: single `h1` (hero), `h2` per section, `h3` for card titles — no skips.
- Interactive elements are native (`button`, `a`); minimum touch target 44×44px.
- `MobileMenu`: focus trap, `aria-modal="true"`, `aria-expanded`/`aria-controls` on the trigger, Escape closes.
- `BillingToggle`: `role="radiogroup"` with two `role="radio"` segments, arrow-key movement, `aria-checked`.
- `AccordionItem`: trigger is a `button` with `aria-expanded` + `aria-controls`; panel `role="region"` + `aria-labelledby`.
- Marquee duplicate tracks `aria-hidden="true"`; decorative icons and blobs `aria-hidden="true"`.
- Color contrast: all text token pairs meet WCAG AA in both themes (verified values in DESIGN-SYSTEM.md); focus ring 2px `accent/violet` with 2px offset visible on both backgrounds.
- Reduced motion honored globally per PRD §2 — implemented once in `Reveal`, `Marquee`, `useTypewriter`, and the accordion/toggle transitions, not per callsite.
