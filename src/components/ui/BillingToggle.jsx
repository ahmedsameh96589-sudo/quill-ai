import { motion, useReducedMotion } from "motion/react";

const OPTIONS = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export function BillingToggle({ billing, onChange }) {
  const reduce = useReducedMotion();

  const onKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    onChange(billing === "monthly" ? "yearly" : "monthly");
  };

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      onKeyDown={onKeyDown}
      className="mx-auto flex h-11 w-fit items-center gap-1 rounded-full border border-border-subtle bg-bg-raised p-1"
    >
      {OPTIONS.map((option) => {
        const checked = billing === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={
              "type-body-sm relative inline-flex h-full items-center gap-2 rounded-full px-4 font-semibold transition-colors duration-[var(--dur-fast)] " +
              (checked ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary")
            }
          >
            {checked ? (
              <motion.span
                layoutId="billing-knob"
                aria-hidden="true"
                transition={
                  reduce ? { duration: 0.15 } : { type: "spring", stiffness: 500, damping: 35 }
                }
                className="absolute inset-0 -z-10 rounded-full bg-white/10 shadow-none light:bg-white light:shadow-card"
              />
            ) : null}
            <span className="relative">{option.label}</span>
            {option.id === "yearly" ? (
              <span className="rounded-full grad-brand-deep px-2 py-0.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase">
                Save 20%
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
