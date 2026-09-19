import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Slides the outgoing price up and the incoming price in from below. Keyed on
 * the value, so rapid toggling interrupts cleanly and always settles on the
 * selected billing period.
 */
export function AnimatedPrice({ value, caption }) {
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="mt-5 flex items-baseline gap-2">
      <span className="type-price relative inline-flex overflow-hidden text-text-primary">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={reduce ? { opacity: 1 } : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={transition}
            className="inline-block"
          >
            ${value}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="type-body-sm text-text-tertiary">{caption}</span>
    </div>
  );
}
