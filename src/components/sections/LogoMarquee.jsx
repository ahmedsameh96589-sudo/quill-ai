import { logos } from "../../data/logos.js";
import { Marquee } from "../ui/Marquee.jsx";
import { Reveal } from "../ui/Reveal.jsx";

export function LogoMarquee() {
  return (
    <section aria-label="Customers" className="py-10 md:py-14">
      <Reveal className="container-page">
        <p className="type-caption text-center text-text-tertiary">Powering content teams at</p>
      </Reveal>

      <div className="mt-8">
        <Marquee duration={32} gapClass="gap-10 md:gap-16">
          {logos.map((logo) => (
            <span
              key={logo.id}
              className="type-wordmark scale-90 whitespace-nowrap text-text-tertiary/80 md:scale-100"
            >
              {logo.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
