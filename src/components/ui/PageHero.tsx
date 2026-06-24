import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  body?: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
};

export function PageHero({
  title,
  subtitle,
  body,
  imageSrc,
  imageAlt,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#1A2A3A] text-white">
      <ResponsiveImage
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        fill
        priority
        src={imageSrc}
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#1A2A3A] via-[#1A2A3A]/90 to-[#1A2A3A]/65" />
      <Container className="relative py-24 sm:py-32">
        {subtitle ? (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            {subtitle}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-3xl font-heading text-4xl sm:text-6xl">{title}</h1>
        {body ? (
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">{body}</p>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
      </Container>
    </section>
  );
}
