import { ResponsiveImage } from "@/components/media/ResponsiveImage";

type ProfileCardProps = {
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  imageSrc: string;
  imageAlt: string;
};

export function ProfileCard({
  name,
  title,
  bio,
  expertise,
  imageSrc,
  imageAlt,
}: ProfileCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5]">
      <div className="relative aspect-[4/5] border-b border-[#E0E0E0] bg-white">
        <ResponsiveImage
          alt={imageAlt}
          className="h-full w-full object-cover object-top"
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
          src={imageSrc}
        />
      </div>
      <div className="grid gap-4 p-8">
        <div className="grid gap-2">
          <p className="font-heading text-2xl text-[#1A2A3A]">{name}</p>
          <p className="text-sm font-semibold text-[#4A4A4A]">{title}</p>
        </div>
        <p className="text-sm leading-7 text-[#4A4A4A]">{bio}</p>
        <div className="flex flex-wrap gap-2">
          {expertise.map((item) => (
            <span
              className="rounded-full border border-[#D4AF37]/40 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A2A3A]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
