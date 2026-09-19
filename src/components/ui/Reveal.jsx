import { motion, useReducedMotion } from "motion/react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-80px" };

/**
 * Shared scroll-reveal wrapper: fade + 24px rise.
 *
 * With `stagger`, the wrapper itself stays visually inert and only orchestrates
 * its `RevealItem` children so their individual fades are not masked by a
 * parent fade. Reduced motion collapses every variant to an instant opacity.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  immediate = false,
  as = "div",
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const variants = stagger
    ? {
        hidden: {},
        show: {
          transition: reduce
            ? { duration: 0 }
            : { delayChildren: delay, staggerChildren: 0.08 },
        },
      }
    : {
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT_EXPO, delay },
        },
      };

  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: VIEWPORT };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={variants}
      {...trigger}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** A staggered child of `Reveal stagger`. Inherits the parent's animation state. */
export function RevealItem({ children, className, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <MotionTag className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
}
