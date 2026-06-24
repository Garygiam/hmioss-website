import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PageSeo } from "@/components/seo/PageSeo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { placeholderImages, siteConfig } from "@/config/site";
import {
  flagshipProgramme,
  flagshipProgrammeOutcomes,
  flagshipProgrammePathway,
  flagshipProgrammeSections,
} from "@/config/programmes";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { buildLocalizedPath } from "@/lib/locale";
import { getLocalePageProps } from "@/lib/pageProps";

type ProgrammesPageProps = {
  locale: Locale;
};

export default function ProgrammesPage({ locale }: ProgrammesPageProps) {
  const { t } = useTranslation(["pages"]);
  const router = useRouter();
  const localeParam = router.query.locale;
  const effectiveLocale =
    typeof localeParam === "string" ? (localeParam as Locale) : locale ?? defaultLocale;
  const phaseTwo = t("pages:programmes.phase2", {
    returnObjects: true,
  }) as {
    heroEyebrow: string;
    heroTitle: string;
    heroBody: string;
    heroStrapline: string;
    heroHighlights: string[];
    positioning: string[];
    pathway: {
      title: string;
      description: string;
      items: { title: string; description: string }[];
    };
    sections: {
      whyThisProgramme: {
        title: string;
        description: string;
        points: string[];
      };
      industryExposure: {
        title: string;
        description: string;
        points: string[];
      };
      roleOfHmioss: {
        title: string;
        description: string;
        points: string[];
      };
      roleOfGenovasi: {
        title: string;
        description: string;
        points: string[];
      };
      entryRequirements: {
        title: string;
        description: string;
        items: string[];
      };
    };
    outcomesEyebrow: string;
    outcomes: string[];
    cta: {
      eyebrow: string;
      title: string;
      description: string;
    };
  };
  const heroBody = phaseTwo.heroBody;
  const heroHighlights =
    phaseTwo.heroHighlights.length > 0
      ? phaseTwo.heroHighlights
      : [
          "Dual academic and professional credential structure",
          flagshipProgrammeSections.entryRequirements.items[0],
          "Mentorship-led growth with real-world exposure",
          "Clearer progression into career opportunities",
        ];
  const localizedPathwayItems =
    phaseTwo.pathway.items.length > 0
      ? flagshipProgrammePathway.map((item, index) => ({
          key: item.key,
          title: phaseTwo.pathway.items[index]?.title ?? item.title,
          description: phaseTwo.pathway.items[index]?.description ?? item.description,
        }))
      : flagshipProgrammePathway;
  const positioningItems =
    phaseTwo.positioning.length > 0 ? phaseTwo.positioning : flagshipProgramme.positioning;
  const outcomeItems =
    phaseTwo.outcomes.length > 0 ? phaseTwo.outcomes : flagshipProgrammeOutcomes;

  return (
    <>
      <PageSeo
        description={heroBody}
        locale={effectiveLocale}
        path="/programmes"
        title={`${t("pages:programmes.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={heroBody}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.graduation}
        subtitle={phaseTwo.heroEyebrow}
        title={phaseTwo.heroTitle}
      >
        <Button href={buildLocalizedPath(effectiveLocale, "/join")} variant="primary">
          {t("pages:programmes.primaryCta")}
        </Button>
        <Button href={buildLocalizedPath(effectiveLocale, "/contact")} variant="secondary">
          {t("pages:programmes.secondaryCta")}
        </Button>
      </PageHero>
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.sections.whyThisProgramme.title}
            description={phaseTwo.sections.whyThisProgramme.description}
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6 rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
              <p className="font-heading text-3xl text-[#1A2A3A]">
                {phaseTwo.heroStrapline}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {heroHighlights.map((highlight) => (
                  <div
                    className="rounded-2xl border border-[#1A2A3A]/10 bg-white px-5 py-4"
                    key={highlight}
                  >
                    <p className="font-semibold text-[#1A2A3A]">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {phaseTwo.sections.whyThisProgramme.points.map((point) => (
                <div
                  className="rounded-3xl border border-[#E0E0E0] bg-white p-8"
                  key={point}
                >
                  <p className="font-heading text-2xl text-[#1A2A3A]">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {positioningItems.map((item) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-[#F8F7F2] px-6 py-5"
                key={item}
              >
                <p className="font-semibold text-[#1A2A3A]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-18">
        <Container>
          <ProcessTimeline
            description={phaseTwo.pathway.description}
            eyebrow={siteConfig.shortName}
            items={localizedPathwayItems}
            title={phaseTwo.pathway.title}
          />
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.sections.industryExposure.title}
            description={phaseTwo.sections.industryExposure.description}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {phaseTwo.sections.industryExposure.points.map((point) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-white p-8"
                key={point}
              >
                <p className="font-heading text-2xl text-[#1A2A3A]">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.sections.roleOfHmioss.title}
            description={phaseTwo.sections.roleOfHmioss.description}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {phaseTwo.sections.roleOfHmioss.points.map((point) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-[#F8F7F2] p-8"
                key={point}
              >
                <p className="font-heading text-2xl text-[#1A2A3A]">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.sections.roleOfGenovasi.title}
            description={phaseTwo.sections.roleOfGenovasi.description}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {phaseTwo.sections.roleOfGenovasi.points.map((point) => (
              <div className="rounded-3xl border border-[#E0E0E0] bg-white p-8" key={point}>
                <p className="font-heading text-2xl text-[#1A2A3A]">{point}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.sections.entryRequirements.title}
            description={phaseTwo.sections.entryRequirements.description}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {phaseTwo.sections.entryRequirements.items.map((item) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-[#F8F7F2] p-8"
                key={item}
              >
                <p className="font-semibold text-[#1A2A3A]">{item}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10 lg:grid-cols-[0.6fr_1fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
              {phaseTwo.outcomesEyebrow}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {outcomeItems.map((outcome) => (
                <div
                  className="rounded-2xl border border-[#1A2A3A]/10 bg-white px-5 py-4"
                  key={outcome}
                >
                  <p className="font-semibold text-[#1A2A3A]">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#1A2A3A] py-18 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              {phaseTwo.cta.eyebrow}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl">{phaseTwo.cta.title}</h2>
            <p className="max-w-3xl text-base leading-8 text-white/80">
              {phaseTwo.cta.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href={buildLocalizedPath(effectiveLocale, "/join")} variant="primary">
              {t("pages:programmes.primaryCta")}
            </Button>
            <Button
              className="border-white bg-white text-[#1A2A3A]"
              href={buildLocalizedPath(effectiveLocale, "/contact")}
              variant="secondary"
            >
              {t("pages:programmes.secondaryCta")}
            </Button>
            <Button
              className="border-white bg-white text-[#1A2A3A]"
              href={buildLocalizedPath(effectiveLocale, "/contact")}
              variant="secondary"
            >
              {t("pages:programmes.tertiaryCta")}
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

export const getStaticProps: GetStaticProps<ProgrammesPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);
