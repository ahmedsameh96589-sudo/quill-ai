import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Phase machine behind both typewriters on the page.
 *
 * Phases run typing → holding → deleting → next phrase. Timers are rescheduled
 * from state on every step, so pausing is simply "stop scheduling": a hidden
 * tab resumes exactly where it left off instead of fast-forwarding.
 *
 * Returns `{ text, done }` so callers (the editor word counter, the caret) can
 * derive from one source of truth instead of running their own timers.
 */
export function useTypewriter(
  phrases,
  {
    typeMs = 45,
    deleteMs = 20,
    holdMs = 1600,
    gapMs = 400,
    loop = true,
    startInView = false,
    ref = null,
  } = {},
) {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ index: 0, count: 0, phase: "typing" });
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(!startInView);

  // Pause while the tab is in the background.
  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // Optional in-view gate (the editor mockup starts at 40% visibility).
  useEffect(() => {
    if (!startInView || active) return undefined;
    const element = ref?.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setActive(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [startInView, active, ref]);

  const phrase = phrases[state.index] ?? "";

  useEffect(() => {
    if (reduce || !active || hidden || state.phase === "done") return undefined;

    let delay;
    let next;

    if (state.phase === "typing") {
      if (state.count < phrase.length) {
        delay = typeMs;
        next = { ...state, count: state.count + 1 };
      } else if (!loop) {
        delay = 0;
        next = { ...state, phase: "done" };
      } else {
        delay = holdMs;
        next = { ...state, phase: "deleting" };
      }
    } else if (state.count > 0) {
      delay = deleteMs;
      next = { ...state, count: state.count - 1 };
    } else {
      delay = gapMs;
      next = { index: (state.index + 1) % phrases.length, count: 0, phase: "typing" };
    }

    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [state, phrase, phrases.length, hidden, active, reduce, typeMs, deleteMs, holdMs, gapMs, loop]);

  if (reduce) {
    return { text: phrases[0] ?? "", done: true };
  }

  return { text: phrase.slice(0, state.count), done: state.phase === "done" };
}
