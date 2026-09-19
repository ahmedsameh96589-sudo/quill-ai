import { features } from "../../data/features.js";
import { FeatureCard } from "../ui/FeatureCard.jsx";
import { Reveal, RevealItem } from "../ui/Reveal.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="section-y">
      <div className="container-page">
        <SectionHeading
          id="features-heading"
          eyebrow="What Quill writes"
          title="One brief. Six kinds of copy."
          subtitle="Every format your content calendar demands — drafted, polished, and on-brand."
        />

        <Reveal
          stagger
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <RevealItem key={feature.id}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
