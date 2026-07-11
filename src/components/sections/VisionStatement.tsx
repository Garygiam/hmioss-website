import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";

type VisionStatementProps = {
  eyebrow: string;
  title: string;
  quote: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function VisionStatement({
  eyebrow,
  title,
  quote,
  body,
  ctaHref,
  ctaLabel,
  imageSrc,
  imageAlt,
}: VisionStatementProps) {
  return (
    <div className="grid gap-8 rounded-[2rem] border border-[#E0E0E0] bg-[#F8F7F2] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
      <div className="grid gap-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
          {eyebrow}
        </p>
        <div className="grid gap-4">
          <h2 className="max-w-2xl font-heading text-3xl text-[#1A2A3A] sm:text-4xl">
            {title}
          </h2>
          <blockquote className="border-l-4 border-[#D4AF37] pl-5 font-heading text-2xl leading-9 text-[#1A2A3A]">
            {quote}
          </blockquote>
          <p className="max-w-2xl text-base leading-8 text-[#4A4A4A]">{body}</p>
        </div>
        <div>
          <Button href={ctaHref} variant="secondary">
            {ctaLabel}
          </Button>
        </div>
      </div>

      {imageSrc ? (
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/30 bg-white">
          <ResponsiveImage
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover"
            height={720}
            sizes="(min-width: 1024px) 40vw, 100vw"
            src={imageSrc}
            width={960}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="min-h-[280px] rounded-[1.75rem] border border-[#D4AF37]/20 bg-[#1A2A3A]"
        />
      )}
    </div>
  );
}
