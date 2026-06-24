type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`.trim()}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl text-[#1A2A3A] sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{description}</p>
      ) : null}
    </div>
  );
}
