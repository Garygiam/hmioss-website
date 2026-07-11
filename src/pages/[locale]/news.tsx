import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import {
  CategoryFilters,
  type CategoryFilter,
} from "@/components/sections/CategoryFilters";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { newsItems } from "@/config/news";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type NewsPageProps = {
  locale: Locale;
};

export default function NewsPage({ locale }: NewsPageProps) {
  const { t } = useTranslation(["pages"]);
  const router = useRouter();
  const localeParam = router.query.locale;
  const effectiveLocale =
    typeof localeParam === "string" ? (localeParam as Locale) : locale ?? defaultLocale;
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const sectionDescription = t("pages:news.sectionDescription");
  const categories = [
    { value: "All", label: t("pages:news.filters.all") },
    { value: "News", label: t("pages:news.filters.news") },
    { value: "Events", label: t("pages:news.filters.events") },
    {
      value: "Announcements",
      label: t("pages:news.filters.announcements"),
    },
  ] as const;
  const visibleItems =
    activeCategory === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <PageSeo
        description={sectionDescription}
        locale={effectiveLocale}
        path="/news"
        title={`${t("pages:news.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={siteConfig.description}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("pages:news.subtitle")}
        title={t("pages:news.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("pages:news.sectionTitle")}
            description={sectionDescription}
          />
          <CategoryFilters
            activeCategory={activeCategory}
            categories={categories}
            onChange={setActiveCategory}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10" key={item.title}>
                {item.images?.length ? (
                  <div className="mb-6 grid gap-4">
                    {item.images.map((image) => (
                      <div
                        className={
                          image.variant === "primary"
                            ? "relative aspect-[16/10] overflow-hidden rounded-2xl"
                            : "relative ml-auto w-4/5 aspect-[4/3] overflow-hidden rounded-2xl"
                        }
                        key={`${item.title}-${image.variant}`}
                      >
                        <ResponsiveImage
                          alt={image.alt}
                          className={
                            image.variant === "primary"
                              ? "object-cover"
                              : "object-cover object-[center_30%]"
                          }
                          fill
                          sizes={image.variant === "primary" ? "(min-width: 1024px) 30vw, 100vw" : "(min-width: 1024px) 24vw, 80vw"}
                          src={image.src}
                        />
                      </div>
                    ))}
                  </div>
                ) : item.fallbackPanelLabel ? (
                  <div className="mb-6">
                    <div
                      aria-label={`${item.title} fallback`}
                      className="flex aspect-[16/10] items-end overflow-hidden rounded-2xl bg-[#1A2A3A] p-6"
                    >
                      <p className="text-lg font-heading tracking-[0.18em] text-white">
                        {item.fallbackPanelLabel}
                      </p>
                    </div>
                  </div>
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                  {item.category}
                </p>
                <h2 className="mt-4 font-heading text-xl text-[#1A2A3A]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">{item.summary}</p>
                {item.href ? (
                  <Link
                    className="mt-5 inline-flex text-sm font-semibold text-[#1A2A3A] transition-colors hover:text-[#C41E3A]"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.linkLabel ?? t("pages:news.readMore")}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getLocaleStaticPaths(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<NewsPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);
