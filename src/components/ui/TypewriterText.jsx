import { useTypewriter } from "../../hooks/useTypewriter.js";

export function Caret({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-current ${className}`}
    />
  );
}

/**
 * Cycling typewriter line. The longest phrase is rendered invisibly in the same
 * grid cell so the line reserves its final height and nothing below it shifts.
 */
export function TypewriterText({ phrases, prefix = "", className = "", ...options }) {
  const { text } = useTypewriter(phrases, options);
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`grid ${className}`}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {prefix}
        {longest}
      </span>
      <span className="col-start-1 row-start-1">
        {prefix ? <span className="text-text-tertiary">{prefix}</span> : null}
        <span className="text-text-primary">{text}</span>
        <Caret className="text-accent-violet" />
      </span>
    </span>
  );
}
