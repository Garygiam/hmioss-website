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

type MissionVisionPageProps = {
  locale: Locale;
};

type PriorityItem = {
  title: string;
  description: string;
};

export default function MissionVisionPage({ locale }: MissionVisionPageProps) {
  const { t } = useTranslation(["pages", "mission"]);
  const bulletsValue = t("mission:missionBullets", {
    returnObjects: true,
    defaultValue: [],
  });
  const bullets = Array.isArray(bulletsValue) ? (bulletsValue as string[]) : [];
  const prioritiesValue = t("mission:priorities", {
    returnObjects: true,
    defaultValue: [],
  });
  const priorities = Array.isArray(prioritiesValue)
    ? (prioritiesValue as PriorityItem[])
    : [];

  return (
    <>
      <PageSeo
        description={t("mission:coreValuesText")}
        locale={locale}
        path="/mission-vision"
        title={`${t("pages:missionVision.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={siteConfig.description}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.graduation}
        subtitle={t("pages:missionVision.subtitle")}
        title={t("pages:missionVision.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
              <SectionHeading title={t("mission:missionTitle")} />
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#2C2C2C]">
                {bullets.map((bullet) => (
                  <li className="flex gap-3" key={bullet}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C41E3A]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8">
              <div className="rounded-3xl border border-[#1A2A3A]/20 bg-white p-10">
                <SectionHeading title={t("mission:visionTitle")} />
                <p className="mt-6 text-sm leading-7 text-[#4A4A4A]">
                  {t("mission:visionText")}
                </p>
              </div>
              <div className="rounded-3xl border border-[#D4AF37]/60 bg-white p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                  {t("mission:coreValuesTitle")}
                </p>
                <p className="mt-6 font-heading text-2xl text-[#1A2A3A]">
                  {t("mission:coreValuesText")}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#E0E0E0] bg-[#F8F7F2] p-10">
            <SectionHeading
              eyebrow={siteConfig.shortName}
              title={t("mission:prioritiesTitle")}
              description={t("mission:visionText")}
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {priorities.map((priority) => (
                <div
                  className="rounded-3xl border border-[#E0E0E0] bg-white p-8"
                  key={priority.title}
                >
                  <h3 className="font-heading text-xl text-[#1A2A3A]">
                    {priority.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">
                    {priority.description}
                  </p>
                </div>
              ))}
            </div>
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

export const getStaticProps: GetStaticProps<MissionVisionPageProps> = async ({
  params,
}) => getLocalePageProps(params?.locale, ["common", "pages", "mission"]);
