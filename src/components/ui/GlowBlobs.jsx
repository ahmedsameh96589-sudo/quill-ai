export function GlowBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="blob absolute -top-32 -left-24 size-[520px] rounded-full"
        style={{ backgroundImage: "var(--glow-violet)" }}
      />
      <div
        className="blob absolute -right-24 -bottom-40 size-[560px] rounded-full"
        style={{ backgroundImage: "var(--glow-blue)", animationDelay: "-9s" }}
      />
    </div>
  );
}
