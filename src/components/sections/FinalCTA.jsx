import { Button } from "../ui/Button.jsx";
import { Reveal, RevealItem } from "../ui/Reveal.jsx";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-heading" className="section-y">
      <div className="container-page">
        <Reveal stagger>
          <div
            className="relative overflow-hidden rounded-xl px-6 py-12 text-center sm:px-10 sm:py-14 lg:px-16 lg:py-20"
            style={{ backgroundImage: "var(--grad-brand)" }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: "var(--scrim-cta)" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: NOISE }}
            />

            <div className="relative">
              <RevealItem
                as="h2"
                id="final-cta-heading"
                className="type-display-lg mx-auto max-w-3xl text-white"
              >
                Your next 1,000 words are already drafted.
              </RevealItem>

              <RevealItem as="p" className="type-body-lg mx-auto mt-4 max-w-xl text-white/80">
                Join 12,000+ writers who brief Quill in the morning and publish by lunch.
              </RevealItem>

              <RevealItem className="mt-8">
                <Button variant="inverted" size="lg">
                  Start writing free
                </Button>
              </RevealItem>

              <RevealItem as="p" className="type-body-sm mt-4 text-white/70">
                Free plan forever · No credit card required
              </RevealItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
