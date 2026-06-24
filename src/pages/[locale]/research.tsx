import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type ResearchPageProps = {
  locale: Locale;
};

export default function ResearchPage() {
  const { t } = useTranslation(["pages"]);

  return (
    <>
      <PageHero
        body={siteConfig.description}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("pages:research.subtitle")}
        title={t("pages:research.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title="Research Areas"
            description="Protective operations, risk management, community strategy, and national security."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              "Protective operations & risk management",
              "Community strategy & empowerment",
              "National security modelling",
              "Strategic education frameworks",
            ].map((area) => (
              <div
                className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10"
                key={area}
              >
                <p className="font-heading text-xl text-[#1A2A3A]">{area}</p>
                <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">
                  Publications and reports will be released here.
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

export const getStaticProps: GetStaticProps<ResearchPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);

