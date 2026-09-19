import { useState } from "react";
import { tiers } from "../../data/pricing.js";
import { BillingToggle } from "../ui/BillingToggle.jsx";
import { PricingCard } from "../ui/PricingCard.jsx";
import { Reveal, RevealItem } from "../ui/Reveal.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="section-y">
      <div className="container-page">
        <SectionHeading
          id="pricing-heading"
          eyebrow="Pricing"
          title="Simple plans. Serious output."
          subtitle="Start free. Upgrade when the words start working."
        />

        <Reveal className="mt-8">
          <BillingToggle billing={billing} onChange={setBilling} />
        </Reveal>

        <Reveal
          stagger
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-6"
        >
          {tiers.map((tier) => (
            <RevealItem key={tier.id} className="h-full">
              <PricingCard tier={tier} billing={billing} />
            </RevealItem>
          ))}
        </Reveal>

        <p className="type-body-sm mt-8 text-center text-text-tertiary">
          Prices in USD. Yearly plans are billed as one payment.
        </p>
      </div>
    </section>
  );
}
