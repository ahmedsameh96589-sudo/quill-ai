const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,border-color,color] " +
  "duration-[var(--dur-base)] ease-out active:scale-[0.98]";

const SIZES = {
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-7 text-base",
};

const VARIANTS = {
  primary: "grad-brand-deep text-white hover:-translate-y-px hover:shadow-[var(--shadow-button)]",
  secondary:
    "bg-bg-raised text-text-primary border border-border-subtle hover:border-border-strong " +
    "hover:bg-[color-mix(in_srgb,var(--color-bg-raised)_90%,var(--color-text-primary))]",
  ghost: "text-text-secondary hover:text-text-primary",
  inverted: "bg-white text-[#05060F] hover:scale-[1.03] hover:shadow-[var(--shadow-white)]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  icon: Icon,
  className = "",
  children,
  ...rest
}) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
