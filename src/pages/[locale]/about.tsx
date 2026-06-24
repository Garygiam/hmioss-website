import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Container } from "@/components/ui/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type AboutPageProps = {
  locale: Locale;
};

type TimelineItem = {
  period: string;
  title: string;
  description: string;
};

type FocusArea = {
  title: string;
  description: string;
};

export default function AboutPage({ locale }: AboutPageProps) {
  const { t } = useTranslation(["pages", "about"]);
  const timelineItemsValue = t("about:timeline.items", {
    returnObjects: true,
    defaultValue: [],
  });
  const timelineItems = Array.isArray(timelineItemsValue)
    ? (timelineItemsValue as TimelineItem[])
    : [];
  const focusAreasValue = t("about:focusAreas.items", {
    returnObjects: true,
    defaultValue: [],
  });
  const focusAreas = Array.isArray(focusAreasValue)
    ? (focusAreasValue as FocusArea[])
    : [];

  return (
    <>
      <PageSeo
        description={t("about:keyMessage")}
        locale={locale}
        path="/about"
        title={`${t("pages:about.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={t("about:intro")}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("pages:about.subtitle")}
        title={t("pages:about.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
            <SectionHeading
              eyebrow={siteConfig.shortName}
              title={t("pages:about.title")}
              description={t("about:storyExcerpt")}
            />
          </div>
          <div className="rounded-3xl border border-[#D4AF37]/60 bg-white p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              {t("about:timelineTitle")}
            </p>
            <h2 className="mt-6 font-heading text-2xl text-[#1A2A3A]">
              {t("about:timeline.title")}
            </h2>
            <div className="mt-8 grid gap-4">
              {timelineItems.map((item, index) => (
                <div
                  className="rounded-3xl border border-[#1A2A3A]/10 bg-[#F8F7F2] p-6"
                  key={`${item.period}-${item.title}`}
                >
                  <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{item.period}</span>
                  </p>
                  <h3 className="mt-4 font-heading text-xl text-[#1A2A3A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container>
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("about:focusAreas.title")}
            description={t("about:keyMessage")}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {focusAreas.map((area) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-white p-8"
                key={area.title}
              >
                <h3 className="font-heading text-xl text-[#1A2A3A]">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">
                  {area.description}
                </p>
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

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages", "about"]);
