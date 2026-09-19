import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function AccordionItem({ item, open, onToggle }) {
  const reduce = useReducedMotion();
  const transition = reduce
    ? { duration: 0.15 }
    : { type: "spring", stiffness: 300, damping: 32 };

  const buttonId = `faq-button-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div
      className={
        "rounded-md border border-border-subtle transition-colors duration-[var(--dur-fast)] " +
        (open ? "bg-bg-raised" : "")
      }
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="type-title flex w-full items-center justify-between gap-4 p-5 text-left text-[16px] text-text-primary sm:text-[18px]"
        >
          {item.question}
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduce ? { duration: 0.15 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 text-text-tertiary"
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="overflow-hidden"
          >
            <p className="type-body px-5 pb-5 text-text-secondary">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
