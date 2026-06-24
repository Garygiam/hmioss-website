import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/i18n";
import { impactHighlights, impactSections } from "@/config/impact";
import { placeholderImages, siteConfig } from "@/config/site";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { buildLocalizedPath } from "@/lib/locale";
import { getLocalePageProps } from "@/lib/pageProps";

type ImpactPageProps = {
  locale: Locale;
};

export default function ImpactPage({ locale }: ImpactPageProps) {
  const { t } = useTranslation(["pages", "impact"]);
  const router = useRouter();
  const localeParam = router.query.locale;
  const effectiveLocale =
    typeof localeParam === "string" ? (localeParam as Locale) : locale;
  const localizedHighlights = impactHighlights.map((item) => ({
    key: item.key,
    label: t(`impact:highlights.${item.key}.label`),
    summary: t(`impact:highlights.${item.key}.summary`),
  }));
  const localizedSections = impactSections.map((section) => {
    const translatedPoints = t(`impact:sections.${section.key}.points`, {
      returnObjects: true,
      defaultValue: section.points,
    });

    return {
      key: section.key,
      title: t(`impact:sections.${section.key}.title`),
      summary: t(`impact:sections.${section.key}.summary`),
      points: Array.isArray(translatedPoints)
        ? (translatedPoints as string[])
        : section.points,
    };
  });

  return (
    <>
      <PageSeo
        description={t("impact:hero.subtitle")}
        locale={effectiveLocale}
        path="/impact"
        title={`${t("pages:impact.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={t("impact:hero.subtitle")}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("impact:hero.eyebrow")}
        title={t("pages:impact.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("impact:highlightsTitle")}
            description={t("impact:hero.subtitle")}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {localizedHighlights.map((item) => (
              <article
                className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-8"
                key={item.key}
              >
                <h2 className="font-heading text-2xl text-[#1A2A3A]">{item.label}</h2>
                <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">{item.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("impact:sectionsTitle")}
            description={t("pages:impact.subtitle")}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {localizedSections.map((section) => (
              <article
                className="rounded-3xl border border-[#E0E0E0] bg-white p-10"
                key={section.key}
              >
                <h2 className="font-heading text-3xl text-[#1A2A3A]">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{section.summary}</p>
                <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#2C2C2C]">
                  {section.points.map((point) => (
                    <li className="flex gap-3" key={point}>
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C41E3A]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#1A2A3A] py-18 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              {t("impact:hero.eyebrow")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl">{t("impact:cta.title")}</h2>
            <p className="max-w-3xl text-base leading-8 text-white/80">
              {t("impact:cta.body")}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href={buildLocalizedPath(effectiveLocale, "/contact")}>
              {t("impact:cta.primary")}
            </Button>
            <Button
              className="border-white bg-white text-[#1A2A3A]"
              href={buildLocalizedPath(effectiveLocale, "/programmes")}
              variant="secondary"
            >
              {t("impact:cta.secondary")}
            </Button>
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

export const getStaticProps: GetStaticProps<ImpactPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages", "impact"]);
