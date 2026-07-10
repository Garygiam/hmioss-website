type AuthorityStripProps = {
  items: string[];
  eyebrow?: string;
  title?: string;
  summary?: string;
};

export function AuthorityStrip({
  items,
  eyebrow,
  title,
  summary,
}: AuthorityStripProps) {
  return (
    <div className="grid gap-6 rounded-3xl border border-[#D4AF37]/30 bg-white p-8">
      {eyebrow || title || summary ? (
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-3 font-heading text-2xl text-[#1A2A3A] sm:text-3xl">{title}</h2>
          ) : null}
          {summary ? (
            <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{summary}</p>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A2A3A]"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
