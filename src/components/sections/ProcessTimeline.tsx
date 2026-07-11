export type ProcessTimelineItem = {
  key: string;
  title: string;
  description: string;
};

type ProcessTimelineProps = {
  items: ProcessTimelineItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ProcessTimeline({
  items,
  eyebrow,
  title,
  description,
}: ProcessTimelineProps) {
  return (
    <div className="grid gap-8">
      {eyebrow || title || description ? (
        <div className="grid gap-3">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
              {eyebrow}
            </p>
          ) : null}
          {title ? <h2 className="font-heading text-3xl text-[#1A2A3A]">{title}</h2> : null}
          {description ? (
            <p className="max-w-3xl text-base leading-8 text-[#4A4A4A]">{description}</p>
          ) : null}
        </div>
      ) : null}

      <ol className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <li
            className="flex h-full flex-col rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-8"
            key={item.key}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-5 max-w-[13ch] text-balance font-heading text-2xl text-[#1A2A3A]">
              {item.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
