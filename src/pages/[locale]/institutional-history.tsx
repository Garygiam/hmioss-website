import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  featuredInstitutionalEvent,
  institutionalEventTimeline,
} from "@/config/institutional-history";
import type { Locale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type InstitutionalHistoryPageProps = {
  locale: Locale;
};

export default function InstitutionalHistoryPage({
  locale,
}: InstitutionalHistoryPageProps) {
  const { t } = useTranslation(["pages", "institutional-history"]);

  return (
    <>
      <PageSeo
        description={t("pages:institutionalHistory.subtitle")}
        locale={locale}
        path="/institutional-history"
        title={`${t("pages:institutionalHistory.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={t("institutional-history:hero.subtitle")}
        imageAlt={featuredInstitutionalEvent?.coverImage.altByLocale[locale] ?? siteConfig.name}
        imageSrc={featuredInstitutionalEvent?.coverImage.imageSrc ?? "/images/institutional-vision.svg"}
        subtitle={t("institutional-history:hero.eyebrow")}
        title={t("pages:institutionalHistory.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12">
          {featuredInstitutionalEvent ? (
            <article className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                {t("institutional-history:featured.eyebrow")}
              </p>
              <h2 className="mt-4 font-heading text-3xl text-[#1A2A3A]">
                {featuredInstitutionalEvent.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#4A4A4A]">
                {featuredInstitutionalEvent.summary[locale]}
              </p>
              <div className="mt-5 grid gap-2 text-sm text-[#4A4A4A]">
                <p>
                  {t("institutional-history:featured.dateLabel")}:{" "}
                  {featuredInstitutionalEvent.date}
                </p>
                <p>
                  {t("institutional-history:featured.partnerLabel")}:{" "}
                  {featuredInstitutionalEvent.partners[0]?.labelByLocale[locale]}
                </p>
              </div>
              <Link
                className="mt-6 inline-flex text-sm font-semibold text-[#1A2A3A] transition-colors hover:text-[#C41E3A]"
                href={`/${locale}/institutional-history/${featuredInstitutionalEvent.slug}`}
              >
                {t("institutional-history:featured.viewEvent")}
              </Link>
            </article>
          ) : null}

          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("institutional-history:timeline.title")}
            description={t("institutional-history:timeline.description")}
          />

          <div className="grid gap-10">
            {institutionalEventTimeline.map((group) => (
              <section className="grid gap-5" key={group.year}>
                <h2 className="font-heading text-3xl text-[#1A2A3A]">{group.year}</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  {group.events.map((event) => (
                    <article
                      className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10"
                      key={event.id}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                        {event.primaryEventType}
                      </p>
                      <p className="mt-4 font-heading text-2xl text-[#1A2A3A]">
                        {event.title}
                      </p>
                      <p className="mt-4 text-base leading-8 text-[#4A4A4A]">
                        {event.summary[locale]}
                      </p>
                      <Link
                        className="mt-5 inline-flex text-sm font-semibold text-[#1A2A3A] transition-colors hover:text-[#C41E3A]"
                        href={`/${locale}/institutional-history/${event.slug}`}
                      >
                        {t("institutional-history:featured.viewEvent")}
                      </Link>
                    </article>
                  ))}
                </div>
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

export const getStaticProps: GetStaticProps<InstitutionalHistoryPageProps> = async ({
  params,
}) => getLocalePageProps(params?.locale, ["common", "pages", "institutional-history"]);
