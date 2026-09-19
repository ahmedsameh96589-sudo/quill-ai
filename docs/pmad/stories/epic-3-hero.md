# Epic 3 (M3) — Hero and the typewriter engine

**Goal.** The page's first impression, and the custom hook that BRIEF goal 2 names as a headline skill.

**Status:** Done · **Spec:** PRD §3.2, DECISIONS D8, DESIGN-SYSTEM §4.5

---

## Story 3.1 — `useTypewriter` phase machine

**Acceptance criteria**
1. Phases run typing → holding → deleting → next; options for `typeMs`, `deleteMs`, `holdMs`, `gapMs`, `loop`, `startInView`, `ref`.
2. Timers pause on `visibilitychange` and resume where they stopped — no fast-forward.
3. Reduced motion returns the full first phrase with `done: true` immediately.
4. Returns `{ text, done }` so consumers derive state instead of duplicating timers.

**Dev Agent Record**
- Each step schedules exactly one `setTimeout` from the current state and clears it on cleanup. Pausing is therefore just "stop scheduling" — `hidden` is a state the effect depends on, so returning to the tab re-enters the machine at the same character index. That is the whole mechanism behind the no-garbled-fast-forward criterion.
- The in-view gate is an `IntersectionObserver` at `threshold: 0.4` that disconnects after first intersection, so the editor types once per page load and never restarts.
- **Verified:** hero cycles all four phrases; the editor types once.

---

## Story 3.2 — `TypewriterText` with reserved height

**Acceptance criteria**
1. Blinking caret; prefix in `text/tertiary`, phrase in `text/primary`.
2. Cycling phrases of different lengths do not shift surrounding content.

**Dev Agent Record**
- The longest phrase is rendered invisibly in the same CSS grid cell as the live text, which reserves both height and width from first paint. The sizer is `aria-hidden`.
- **Verified at 375px:** the line wraps to two rows and the reserved sizer holds that height, so the CTAs below never move.

---

## Story 3.3 — `GlowBlobs` and `AvatarRow`

**Acceptance criteria**
1. Two blurred radial blobs, violet upper-left and blue lower-right, drifting 18s ease-in-out alternate, `aria-hidden`, `pointer-events: none`.
2. Five overlapping avatars plus the rating line, star in `star/amber`.

**Dev Agent Record**
- Blur is a static filter; only `translate`/`scale` animate, so the effect stays on the compositor. The second blob carries a negative animation delay so the two never move in lockstep.
- Avatars are decorative (`alt=""`, `aria-hidden`) — the rating text carries the meaning. Hero avatars load eagerly with explicit dimensions.
- **Verified:** blobs are clipped by the hero's `overflow-hidden`; no horizontal scrollbar at 375px.

---

## Story 3.4 — Hero composition

**Acceptance criteria**
1. Final copy from PRD §3.2, gradient on "publish-ready copy.".
2. Load-time stagger, top to bottom, 0.08s.
3. Exactly one `h1` on the page.

**Dev Agent Record**
- Uses `<Reveal immediate stagger>` — the same component as every scroll section, switched to `animate`.
- **Verified:** one `h1`; hero renders correctly at 375 and 1440.

---

## Review Record (Epic 3)

| Check | Result |
|---|---|
| Hook covers all four PRD §3.2 criteria | Pass |
| Zero layout shift across phrase changes | Pass — reserved sizer |
| Reduced motion: static first phrase, no caret blink | Pass — verified with emulated media |
| Continuous animation is transform/opacity only | Pass |
