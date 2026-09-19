export function AvatarRow({ avatars, text }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <div className="flex items-center">
        {avatars.map((src, index) => (
          <img
            key={src}
            src={src}
            width={36}
            height={36}
            alt=""
            aria-hidden="true"
            className={`size-9 rounded-full object-cover ring-2 ring-bg-base ${index > 0 ? "-ml-2.5" : ""}`}
          />
        ))}
      </div>
      <p className="type-body-sm text-text-secondary">
        <span className="text-star-amber">★</span> {text}
      </p>
    </div>
  );
}
