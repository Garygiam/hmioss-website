import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { AuthorityStrip } from "@/components/sections/AuthorityStrip";
import { InstitutionalMetrics } from "@/components/sections/InstitutionalMetrics";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { VisionStatement } from "@/components/sections/VisionStatement";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/config/i18n";
import { homepagePartnershipCategories } from "@/config/partners";
import {
  flagshipProgramme,
  flagshipProgrammeOutcomes,
  flagshipProgrammePathway,
} from "@/config/programmes";
import { placeholderImages, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { PageHero } from "@/components/ui/PageHero";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { buildLocalizedPath } from "@/lib/locale";
import { getLocalePageProps } from "@/lib/pageProps";

type HomePageProps = {
  locale: Locale;
};

export default function LocalizedHomePage({ locale }: HomePageProps) {
  const { t } = useTranslation(["home"]);
  const router = useRouter();
  const localeParam = router.query.locale;
  const effectiveLocale =
    typeof localeParam === "string" ? (localeParam as Locale) : locale;
  const heroBody = t("home:hero.value");
  const authorityItems = t("home:authority.items", {
    returnObjects: true,
  }) as string[];
  const pillars = t("home:pillars.items", {
    returnObjects: true,
  }) as { title: string; description: string }[];
  const vision = t("home:vision", {
    returnObjects: true,
  }) as {
    eyebrow: string;
    title: string;
    quote: string;
    body: string;
    cta: string;
  };
  const localizedFlagshipPathway = t("home:flagship.pathway", {
    returnObjects: true,
  }) as { title: string; description: string }[];
  const localizedFlagshipPositioning = t("home:flagship.positioning", {
    returnObjects: true,
  }) as string[];
  const localizedFlagshipOutcomes = t("home:flagship.outcomes", {
    returnObjects: true,
  }) as string[];
  const localizedPartnershipCategories = t("home:partnershipSummary.categories", {
    returnObjects: true,
  }) as { title: string; summary: string }[];
  const metricItems = siteConfig.stats.map((stat) => ({
    value: stat.value,
    label: t(`common:${stat.labelKey}`),
  }));
  const flagshipPathwayItems = flagshipProgrammePathway.map((item, index) => ({
    key: item.key,
    title: localizedFlagshipPathway[index]?.title ?? item.title,
    description: localizedFlagshipPathway[index]?.description ?? item.description,
  }));
  const partnershipSummaryCards = homepagePartnershipCategories.map((category, index) => ({
    key: category.key,
    title: localizedPartnershipCategories[index]?.title ?? category.title,
    summary: localizedPartnershipCategories[index]?.summary ?? category.summary,
  }));

  return (
    <>
      <PageSeo
        description={heroBody}
        locale={effectiveLocale}
        path="/"
        title={`${siteConfig.shortName} | ${t("home:hero.tagline")}`}
      />
      <PageHero
        body={heroBody}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.hero}
        subtitle={t("home:hero.tagline")}
        title={siteConfig.name}
      >
        <Button
          href={buildLocalizedPath(effectiveLocale, "/programmes")}
          variant="primary"
        >
          {t("home:hero.ctaPrimary")}
        </Button>
        <Button
          href={buildLocalizedPath(effectiveLocale, "/partners")}
          variant="secondary"
        >
          {t("home:hero.ctaSecondary")}
        </Button>
      </PageHero>
      <section className="bg-white py-10">
        <Container>
          <AuthorityStrip items={authorityItems} />
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container className="grid gap-10">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl text-[#1A2A3A] sm:text-4xl">
              {t("home:pillars.title")}
            </h2>
            <p className="mt-4 text-base leading-8 text-[#4A4A4A]">
              {t("home:pillars.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-8"
                key={pillar.title}
              >
                <h3 className="font-heading text-2xl text-[#1A2A3A]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={t("home:flagship.eyebrow")}
            title={t("home:flagship.title")}
            description={t("home:flagship.description")}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {(localizedFlagshipPositioning.length > 0
              ? localizedFlagshipPositioning
              : flagshipProgramme.positioning
            ).map((item) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-white px-6 py-5"
                key={item}
              >
                <p className="font-semibold text-[#1A2A3A]">{item}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 rounded-3xl border border-[#E0E0E0] bg-white p-8 lg:grid-cols-[0.5fr_1fr]">
            <div className="grid gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                {t("home:flagship.outcomesTitle")}
              </p>
              <h3 className="font-heading text-2xl text-[#1A2A3A]">
                {t("home:flagship.strapline")}
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {(localizedFlagshipOutcomes.length > 0
                ? localizedFlagshipOutcomes
                : flagshipProgrammeOutcomes
              ).map((outcome) => (
                <div
                  className="rounded-2xl border border-[#1A2A3A]/10 bg-[#F8F7F2] px-5 py-4"
                  key={outcome}
                >
                  <p className="font-semibold text-[#1A2A3A]">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
          <ProcessTimeline
            eyebrow={siteConfig.shortName}
            title={t("home:flagship.pathwayTitle")}
            description={t("home:flagship.strapline")}
            items={flagshipPathwayItems}
          />
          <div className="flex flex-wrap gap-4">
            <Button
              href={buildLocalizedPath(effectiveLocale, "/programmes")}
              variant="primary"
            >
              {t("home:flagship.ctaPrimary")}
            </Button>
            <Button
              href={buildLocalizedPath(effectiveLocale, "/contact")}
              variant="secondary"
            >
              {t("home:flagship.ctaSecondary")}
            </Button>
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-16">
        <Container>
          <InstitutionalMetrics items={metricItems} />
        </Container>
      </section>
      <section className="bg-white py-16">
        <Container>
          <VisionStatement
            body={vision.body}
            ctaHref={buildLocalizedPath(effectiveLocale, "/mission-vision")}
            ctaLabel={vision.cta}
            eyebrow={vision.eyebrow}
            imageAlt={siteConfig.name}
            imageSrc={placeholderImages.story}
            quote={vision.quote}
            title={vision.title}
          />
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={siteConfig.shortName}
              title={t("home:partnershipSummary.title")}
              description={t("home:partnershipSummary.description")}
            />
            <div>
              <Button
                href={buildLocalizedPath(effectiveLocale, "/partners")}
                variant="secondary"
              >
                {t("home:partnershipSummary.cta")}
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {partnershipSummaryCards.map((category) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-white p-8"
                key={category.key}
              >
                <h2 className="font-heading text-2xl text-[#1A2A3A]">
                  {category.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
                  {category.summary}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#1A2A3A] py-18 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              {siteConfig.shortName}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl">
              {t("home:finalCta.title")}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button
              href={buildLocalizedPath(effectiveLocale, "/programmes")}
              variant="primary"
            >
              {t("home:finalCta.primary")}
            </Button>
            <Button
              className="border-white bg-white text-[#1A2A3A]"
              href={buildLocalizedPath(effectiveLocale, "/partners")}
              variant="secondary"
            >
              {t("home:finalCta.secondary")}
            </Button>
            <Button
              className="border-white bg-white text-[#1A2A3A]"
              href={buildLocalizedPath(effectiveLocale, "/contact")}
              variant="secondary"
            >
              {t("home:finalCta.tertiary")}
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

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "home"]);
