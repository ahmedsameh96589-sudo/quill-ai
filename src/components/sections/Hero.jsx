import { Play } from "lucide-react";
import { heroAvatars } from "../../data/heroAvatars.js";
import { heroPhrases } from "../../data/heroPhrases.js";
import { AvatarRow } from "../ui/AvatarRow.jsx";
import { Button } from "../ui/Button.jsx";
import { GlowBlobs } from "../ui/GlowBlobs.jsx";
import { GradientText } from "../ui/GradientText.jsx";
import { Reveal, RevealItem } from "../ui/Reveal.jsx";
import { TypewriterText } from "../ui/TypewriterText.jsx";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <GlowBlobs />

      <Reveal immediate stagger className="container-page relative text-center">
        <RevealItem>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-raised px-4 py-1.5 text-xs font-semibold tracking-[0.02em] text-text-secondary">
            <span className="size-1.5 rounded-full grad-brand" aria-hidden="true" />
            New · Tone rewriting is live
          </span>
        </RevealItem>

        <RevealItem
          as="h1"
          id="hero-heading"
          className="type-display-xl mx-auto mt-6 max-w-4xl text-text-primary"
        >
          Turn a two-line brief into <GradientText>publish-ready copy.</GradientText>
        </RevealItem>

        <RevealItem as="p" className="type-body-lg mx-auto mt-5 max-w-2xl text-text-secondary">
          Quill drafts blog posts, emails, and ads in your brand voice — so you ship in minutes,
          not days.
        </RevealItem>

        <RevealItem className="mt-8 flex justify-center">
          <TypewriterText
            phrases={heroPhrases}
            prefix="Quill is writing: "
            className="type-body text-left"
          />
        </RevealItem>

        <RevealItem className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button variant="primary" size="lg">
            Start writing free
          </Button>
          <Button variant="secondary" size="lg" href="#showcase" icon={Play}>
            See Quill in action
          </Button>
        </RevealItem>

        <RevealItem className="mt-8">
          <AvatarRow avatars={heroAvatars} text="4.9 · Loved by 12,000+ writers and teams" />
        </RevealItem>
      </Reveal>
    </section>
  );
}
