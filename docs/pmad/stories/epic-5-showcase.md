# Epic 5 (M5) — Product showcase

**Goal.** A believable editor, built entirely in DOM and tokens, that types its own draft once when it scrolls into view.

**Status:** Done · **Spec:** PRD §3.5, DECISIONS D9

---

## Story 5.1 — `EditorMockup` and `ProductShowcase`

**Acceptance criteria**
1. Window chrome with three traffic dots and the filename tab; decorative toolbar plus the "✦ Improve" pill.
2. Body types at 28ms/char starting at 40% in view, runs once, never restarts.
3. Word counter tracks the typed text and ends at 41 words.
4. Height is reserved so the section never shifts while typing.
5. Toolbar buttons are not focusable.
6. Reduced motion renders the full text, final count, and a static caret immediately.

**Dev Agent Record**
- The three script blocks are joined with `\n` and typed as one string, then split back out for rendering. That keeps a single hook instance driving the caret position, the per-block styling, and the word count from the same `text` value.
- The word counter is derived (`text.trim().split(/\s+/)`) rather than tracked — there is no second source of truth to drift.
- Height is reserved the same way as the hero line: the full script is rendered invisibly in the same grid cell.
- Toolbar items are `<span>`s inside an `aria-hidden` group rather than disabled buttons, so they are unreachable by keyboard by construction.
- The frame's own reveal adds a 0.97 → 1 scale on top of the shared fade + rise.
- **Verified:** the counter reads exactly `41 words` at completion, and reads `41 words` immediately under emulated reduced motion; `#showcase` contains zero focusable elements.

---

## Review Record (Epic 5)

| Check | Result |
|---|---|
| Six PRD §3.5 acceptance criteria | Pass |
| No screenshots — product is drawn in code | Pass |
| CLS: block reserves final height | Pass — invisible sizer verified |
| Typing starts in view and never restarts | Pass — observer disconnects after first intersection |
