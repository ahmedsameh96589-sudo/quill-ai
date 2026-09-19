/**
 * Infinite marquee: the track holds two identical copies of `children`, so a
 * `translateX(-50%)` keyframe loops seamlessly by geometry. The animation is
 * pure CSS (see `.marquee-track` in index.css) — no per-frame JavaScript — and
 * the duplicate copy is hidden from assistive tech.
 */
export function Marquee({ duration, reverse = false, gapClass = "gap-10", className = "", children }) {
  const copy = (duplicate) => (
    <div
      className={`marquee-copy flex shrink-0 items-stretch ${gapClass}`}
      data-duplicate={duplicate ? "true" : "false"}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {children}
    </div>
  );

  return (
    <div className={`marquee-viewport overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${gapClass}`}
        data-reverse={reverse ? "true" : "false"}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
