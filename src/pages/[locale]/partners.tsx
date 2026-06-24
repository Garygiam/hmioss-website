import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Container } from "@/components/ui/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { partnerOpportunityCategories } from "@/config/partners";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type PartnersPageProps = {
  locale: Locale;
};

export default function PartnersPage({ locale }: PartnersPageProps) {
  const { t } = useTranslation(["pages"]);
  const router = useRouter();
  const localeParam = router.query.locale;
  const effectiveLocale =
    typeof localeParam === "string" ? (localeParam as Locale) : locale ?? defaultLocale;
  const phaseTwo = t("pages:partners.phase2", {
    returnObjects: true,
  }) as {
    heroBody: string;
    rationale: {
      title: string;
      description: string;
    };
    opportunities: {
      title: string;
      description: string;
      cardEyebrow: string;
    };
    categories: {
      key: string;
      title: string;
      summary: string;
      collaborationModes: string[];
      value: string;
    }[];
  };
  const heroBody = phaseTwo.heroBody;
  const categories =
    phaseTwo.categories.length > 0 ? phaseTwo.categories : partnerOpportunityCategories;

  return (
    <>
      <PageSeo
        description={heroBody}
        locale={effectiveLocale}
        path="/partners"
        title={`${t("pages:partners.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={heroBody}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("pages:partners.subtitle")}
        title={t("pages:partners.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.rationale.title}
            description={phaseTwo.rationale.description}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10"
                key={category.key}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                  HMIOSS
                </p>
                <h2 className="mt-4 font-heading text-2xl text-[#1A2A3A]">{category.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
                  {category.summary}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={phaseTwo.opportunities.title}
            description={phaseTwo.opportunities.description}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {categories.map((category) => (
              <section
                className="rounded-3xl border border-[#E0E0E0] bg-white p-10"
                key={category.key}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                  {phaseTwo.opportunities.cardEyebrow}
                </p>
                <h2 className="mt-4 font-heading text-3xl text-[#1A2A3A]">{category.title}</h2>
                <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{category.summary}</p>
                <div className="mt-6 grid gap-3">
                  {category.collaborationModes.map((mode) => (
                    <div
                      className="rounded-2xl border border-[#1A2A3A]/10 bg-[#F8F7F2] px-5 py-4"
                      key={mode}
                    >
                      <p className="font-semibold text-[#1A2A3A]">{mode}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-[#4A4A4A]">{category.value}</p>
              </section>
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

export const getStaticProps: GetStaticProps<PartnersPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);
