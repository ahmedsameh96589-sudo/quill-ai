import { Reveal, RevealItem } from "./Reveal.jsx";

export function SectionHeading({ eyebrow, title, subtitle, id, className = "" }) {
  return (
    <Reveal stagger className={`mx-auto max-w-2xl text-center ${className}`}>
      <RevealItem as="p" className="type-caption text-text-tertiary">
        {eyebrow}
      </RevealItem>
      <RevealItem as="h2" id={id} className="type-display-md mt-3 text-text-primary">
        {title}
      </RevealItem>
      {subtitle ? (
        <RevealItem as="p" className="type-body-lg mt-4 text-text-secondary">
          {subtitle}
        </RevealItem>
      ) : null}
    </Reveal>
  );
}
