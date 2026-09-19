import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks } from "../../data/navLinks.js";
import { Button } from "../ui/Button.jsx";

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const reduce = useReducedMotion();

  // Scroll lock, Escape to close, and a focus trap for as long as the panel is open.
  useEffect(() => {
    if (!open) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector(FOCUSABLE)?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const listVariants = {
    hidden: {},
    show: { transition: reduce ? { duration: 0 } : { delayChildren: 0.05, staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg-surface px-5 pt-20 pb-10 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.nav
            className="flex flex-col gap-5"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                variants={itemVariants}
                className="font-display text-[28px] font-semibold text-text-primary"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>

          <div className="mt-auto pt-10">
            <Button variant="primary" size="lg" className="w-full" onClick={onClose}>
              Start free
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
