import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
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
  const featuredEventMetadata = featuredInstitutionalEvent
    ? [
        {
          label: t("institutional-history:featured.dateLabel"),
          value: featuredInstitutionalEvent.date,
        },
        {
          label: t("institutional-history:featured.partnerLabel"),
          value: featuredInstitutionalEvent.partners[0]?.labelByLocale[locale],
        },
        {
          label: t("institutional-history:featured.locationLabel"),
          value: featuredInstitutionalEvent.location,
        },
      ].filter((item): item is { label: string; value: string } => Boolean(item.value))
    : [];

  return (
    <>
      <PageSeo
        description={t("pages:institutionalHistory.subtitle")}
        locale={locale}
        path="/institutional-history"
        title={`${t("pages:institutionalHistory.title")} | ${siteConfig.shortName}`}
      />
      <section className="relative overflow-hidden bg-[#101A25] text-white">
        <ResponsiveImage
          alt={featuredInstitutionalEvent?.coverImage.altByLocale[locale] ?? siteConfig.name}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14] grayscale"
          fill
          loading="eager"
          priority
          sizes="100vw"
          src={featuredInstitutionalEvent?.coverImage.imageSrc ?? "/images/institutional-vision.svg"}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#122033] via-[#101A25]/98 to-[#101A25]" />
        <Container className="relative grid gap-16 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-32">
          <div className="grid gap-8">
            <div className="grid gap-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-white/58">
                {t("institutional-history:hero.eyebrow")}
              </p>
              <h1 className="max-w-4xl font-heading text-5xl leading-none text-white sm:text-7xl lg:text-[5.5rem]">
                {t("pages:institutionalHistory.title")}
              </h1>
              <p className="max-w-3xl text-lg leading-9 text-white/72 sm:text-xl">
                {t("institutional-history:hero.subtitle")}
              </p>
            </div>

            {featuredInstitutionalEvent ? (
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68">
                  {t("institutional-history:featured.eyebrow")}
                </span>
                <span className="rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68">
                  {featuredInstitutionalEvent.primaryEventType}
                </span>
                <span className="rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68">
                  {featuredInstitutionalEvent.date}
                </span>
              </div>
            ) : null}
          </div>

          {featuredInstitutionalEvent ? (
            <div className="grid gap-5 border-l border-white/10 pl-0 lg:pl-10">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-white/48">
                {siteConfig.shortName}
              </p>
              <div className="grid gap-4">
                <p className="font-heading text-2xl text-white sm:text-3xl">
                  {featuredInstitutionalEvent.title}
                </p>
                <p className="max-w-xl text-sm leading-8 text-white/66">
                  {featuredInstitutionalEvent.summary[locale]}
                </p>
              </div>
            </div>
          ) : null}
        </Container>
      </section>
      <section className="bg-linear-to-b from-[#F6F5F2] via-white to-[#F8F7F4] py-18 sm:py-24">
        <Container className="grid gap-18">
          {featuredInstitutionalEvent ? (
            <article className="group relative overflow-hidden rounded-[2.4rem] border border-[#D7D3CA] bg-white shadow-[0_24px_90px_rgba(16,26,37,0.08)]">
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[360px] overflow-hidden lg:min-h-[620px]">
                  <ResponsiveImage
                    alt={featuredInstitutionalEvent.coverImage.altByLocale[locale]}
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    fill
                    loading="eager"
                    priority
                    sizes="(min-width: 1024px) 54vw, 100vw"
                    src={featuredInstitutionalEvent.coverImage.imageSrc}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#101A25]/54 via-[#101A25]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                    <div className="inline-flex max-w-sm flex-wrap gap-3 rounded-[1.75rem] border border-white/12 bg-[#101A25]/42 px-5 py-4 backdrop-blur-sm">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/74">
                        {t("institutional-history:featured.partnerLabel")}
                      </span>
                      <span className="text-sm leading-7 text-white">
                        {featuredInstitutionalEvent.partners[0]?.labelByLocale[locale]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-10 p-8 sm:p-10 lg:p-14">
                  <div className="flex flex-wrap gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#5D6671]">
                    <span className="rounded-full border border-[#D9D5CC] px-4 py-2">
                      {t("institutional-history:featured.eyebrow")}
                    </span>
                    <span className="rounded-full border border-[#D9D5CC] px-4 py-2">
                      {featuredInstitutionalEvent.primaryEventType}
                    </span>
                  </div>

                  <div className="grid gap-5 border-y border-[#E7E3DB] py-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A8591]">
                      {featuredInstitutionalEvent.date}
                    </p>
                    <h2 className="max-w-3xl font-heading text-4xl leading-tight text-[#111D2B] sm:text-5xl">
                      {featuredInstitutionalEvent.title}
                    </h2>
                    <p className="max-w-2xl text-base leading-8 text-[#3D4854]">
                      {featuredInstitutionalEvent.summary[locale]}
                    </p>
                  </div>

                  <dl className="grid gap-4 border-b border-[#E7E3DB] pb-8">
                    {featuredEventMetadata.map((item) => (
                      <div className="grid gap-2 border-l border-[#E7E3DB] pl-4 first:border-l-0 first:pl-0" key={item.label}>
                        <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#7A8591]">
                          {item.label}
                        </dt>
                        <dd className="text-sm leading-7 text-[#111D2B]">{item.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex flex-wrap items-center gap-5">
                    <Link
                      className="inline-flex items-center rounded-full bg-[#101A25] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1A2A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101A25] focus-visible:ring-offset-2"
                      href={`/${locale}/institutional-history/${featuredInstitutionalEvent.slug}`}
                    >
                      {t("institutional-history:featured.viewEvent")}
                    </Link>
                    <p className="text-sm text-[#697582]">
                      {t("institutional-history:timeline.title")}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-12 xl:grid-cols-[0.28fr_1fr] xl:items-start">
            <div className="grid gap-6 xl:sticky xl:top-10">
              <SectionHeading
                eyebrow={siteConfig.shortName}
                title={t("institutional-history:timeline.title")}
                description={t("institutional-history:timeline.description")}
              />
              <div className="hidden h-px bg-[#D9D5CC] xl:block" />
            </div>

            <div className="grid gap-18" id="timeline">
              {institutionalEventTimeline.map((group) => (
                <section
                  className="grid gap-8 md:grid-cols-[160px_1fr]"
                  key={group.year}
                >
                  <div className="flex items-start pt-2">
                    <div className="grid gap-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A8591]">
                        {siteConfig.shortName}
                      </p>
                      <div className="inline-flex rounded-full border border-[#D9D5CC] bg-white px-6 py-4 shadow-[0_14px_35px_rgba(16,26,37,0.05)]">
                        <h2 className="font-heading text-3xl text-[#111D2B]">{group.year}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {group.events.map((event) => (
                      <article
                        className="group overflow-hidden rounded-[2rem] border border-[#E2DED6] bg-white shadow-[0_22px_65px_rgba(16,26,37,0.07)] transition-all duration-300 hover:-translate-y-1"
                        key={event.id}
                      >
                        <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                          <div className="relative aspect-[16/11] overflow-hidden lg:h-full lg:aspect-auto">
                            <ResponsiveImage
                              alt={event.coverImage.altByLocale[locale]}
                              className="object-cover transition duration-700 group-hover:scale-[1.02]"
                              fill
                              sizes="(min-width: 1024px) 30vw, 100vw"
                              src={event.coverImage.imageSrc}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#101A25]/52 via-transparent to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5">
                              <span className="inline-flex rounded-full border border-white/18 bg-[#101A25]/34 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                                {event.primaryEventType}
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-7 p-7 sm:p-9 lg:p-10">
                            <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#7A8591]">
                              <span>{event.date}</span>
                              {event.location ? (
                                <>
                                  <span aria-hidden="true">&middot;</span>
                                  <span>{event.location}</span>
                                </>
                              ) : null}
                            </div>

                            <div className="grid gap-4 border-y border-[#E7E3DB] py-6">
                              <p className="font-heading text-3xl leading-tight text-[#111D2B]">
                                {event.title}
                              </p>
                              <p className="max-w-3xl text-base leading-8 text-[#3D4854]">
                                {event.summary[locale]}
                              </p>
                            </div>

                            {event.partners[0] ? (
                              <div className="grid gap-2">
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#7A8591]">
                                  {t("institutional-history:featured.partnerLabel")}
                                </p>
                                <p className="text-sm leading-7 text-[#111D2B]">
                                  {event.partners[0].labelByLocale[locale]}
                                </p>
                              </div>
                            ) : null}

                            <div className="flex flex-wrap items-center gap-5">
                              <Link
                                className="inline-flex items-center text-sm font-semibold text-[#111D2B] underline decoration-[#7A8591] decoration-1 underline-offset-6 transition-colors duration-300 hover:text-[#355070] hover:decoration-[#355070] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355070] focus-visible:ring-offset-2"
                                href={`/${locale}/institutional-history/${event.slug}`}
                              >
                                {t("institutional-history:featured.viewEvent")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <section className="overflow-hidden rounded-[2.4rem] border border-[#D9D5CC] bg-[#101A25] text-white shadow-[0_22px_65px_rgba(16,26,37,0.12)]">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
              <div className="grid gap-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-white/46">
                  {siteConfig.shortName}
                </p>
                <h2 className="max-w-3xl font-heading text-3xl sm:text-4xl">
                  {t("institutional-history:timeline.title")}
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/68">
                  {t("pages:institutionalHistory.subtitle")}
                </p>
              </div>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#101A25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101A25]"
                href={`/${locale}/institutional-history`}
              >
                {t("institutional-history:timeline.title")}
              </Link>
            </div>
          </section>
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
