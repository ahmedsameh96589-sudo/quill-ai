import { GlassCard } from "./GlassCard.jsx";

export function TestimonialCard({ testimonial }) {
  return (
    <GlassCard className="flex h-full w-[300px] shrink-0 flex-col justify-between p-6 md:w-[360px]">
      <p className="type-body text-text-primary">{testimonial.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          width={40}
          height={40}
          loading="lazy"
          alt=""
          aria-hidden="true"
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="type-body-sm font-semibold text-text-primary">{testimonial.name}</p>
          <p className="type-body-sm text-text-tertiary">
            {testimonial.role} — {testimonial.company}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
