import { testimonials } from "../../data/testimonials.js";
import { Marquee } from "../ui/Marquee.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { TestimonialCard } from "../ui/TestimonialCard.jsx";

const rowA = testimonials.slice(0, 4);
const rowB = testimonials.slice(4);

const cards = (items) =>
  items.map((testimonial) => (
    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
  ));

export function TestimonialsMarquee() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-y bg-bg-surface"
    >
      <div className="container-page">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Testimonials"
          title="Don't take our word for it."
          subtitle="Twelve thousand writers ship with Quill. A few of them, in their own words."
        />
      </div>

      {/* Mobile: one slow row carrying all eight cards. */}
      <div className="mt-12 md:hidden">
        <Marquee duration={80} gapClass="gap-4">
          {cards(testimonials)}
        </Marquee>
      </div>

      {/* Tablet and up: two rows drifting in opposite directions. */}
      <div className="mt-12 hidden flex-col gap-6 md:flex">
        <Marquee duration={48} gapClass="gap-6">
          {cards(rowA)}
        </Marquee>
        <Marquee duration={60} reverse gapClass="gap-6">
          {cards(rowB)}
        </Marquee>
      </div>
    </section>
  );
}
