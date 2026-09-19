import { GlassCard } from "./GlassCard.jsx";

export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <GlassCard hover className="h-full p-6">
      <span
        className="grid size-12 place-items-center rounded-md"
        style={{ backgroundColor: "var(--tile-violet)" }}
      >
        <Icon size={24} className="text-accent-violet" aria-hidden="true" />
      </span>
      <h3 className="type-title mt-5 text-text-primary">{title}</h3>
      <p className="type-body mt-2 text-text-secondary">{description}</p>
    </GlassCard>
  );
}
