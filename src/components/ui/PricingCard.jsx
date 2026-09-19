import { Check } from "lucide-react";
import { AnimatedPrice } from "./AnimatedPrice.jsx";
import { Button } from "./Button.jsx";

export function PricingCard({ tier, billing }) {
  const price = billing === "monthly" ? tier.monthly : tier.yearly;
  const caption = tier.caption[billing];

  const shell = tier.popular
    ? "grad-border rounded-lg shadow-[var(--shadow-popular)] lg:scale-[1.03]"
    : "rounded-lg border border-border-subtle bg-bg-raised shadow-card";

  return (
    <div className={`relative flex h-full flex-col p-6 sm:p-8 ${shell}`}>
      {tier.popular ? (
        <span className="type-caption absolute -top-3 left-8 rounded-full grad-brand-deep px-3 py-1 text-[11px] text-white">
          Most popular
        </span>
      ) : null}

      <h3 className="type-title text-text-primary">{tier.name}</h3>
      <p className="type-body-sm mt-1 text-text-tertiary">{tier.tagline}</p>

      <AnimatedPrice value={price} caption={caption} />

      <ul className="mt-6 flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="type-body flex items-start gap-2.5 text-text-secondary">
            <Check size={18} className="mt-1 shrink-0 text-success" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <Button
          variant={tier.popular ? "primary" : "secondary"}
          size="lg"
          className="w-full"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
