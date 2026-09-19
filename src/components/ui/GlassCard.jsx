export function GlassCard({ hover = false, className = "", children, ...rest }) {
  return (
    <div
      className={
        "rounded-lg border border-border-subtle bg-bg-raised shadow-card " +
        (hover
          ? "transition-[transform,border-color] duration-[var(--dur-base)] ease-out hover:-translate-y-1 hover:border-border-strong "
          : "") +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}
