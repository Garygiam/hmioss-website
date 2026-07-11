import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  institutionalEvents,
  publishedInstitutionalEvents,
  resolveInstitutionalReferenceHref,
  type InstitutionalHistoryReference,
} from "@/config/institutional-history";
import type { Locale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type InstitutionalHistoryEventPageProps = {
  locale: Locale;
  slug: string;
};

function renderReferenceGroup(
  title: string,
  references: InstitutionalHistoryReference[],
  locale: Locale,
) {
  if (references.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[1.9rem] border border-[#E3DED6] bg-white p-7 shadow-[0_18px_45px_rgba(16,26,37,0.06)] sm:p-8">
      <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#7A8591]">{title}</h2>
      <div className="mt-5 grid gap-3">
        {references.map((reference) => (
          <div
            className="rounded-[1.2rem] border border-[#E8E2D9] bg-[#F8F7F4] px-4 py-4"
            key={reference.entityId}
          >
            {renderReference(reference, locale)}
          </div>
        ))}
      </div>
    </section>
  );
}

function renderReference(reference: InstitutionalHistoryReference, locale: Locale) {
  const href = resolveInstitutionalReferenceHref(reference, locale);

  if (href) {
    return (
      <Link
        className="text-sm font-semibold text-[#111D2B] transition-colors duration-300 hover:text-[#355070]"
        href={href}
      >
        {reference.labelByLocale[locale]}
      </Link>
    );
  }

  return <span className="text-sm text-[#3D4854]">{reference.labelByLocale[locale]}</span>;
}

export default function InstitutionalHistoryEventPage({
  locale,
  slug,
}: InstitutionalHistoryEventPageProps) {
  const { t } = useTranslation(["pages", "institutional-history"]);
  const event = publishedInstitutionalEvents.find((item) => item.slug === slug);

  if (!event) {
    return null;
  }

  const eventMetadata = [
    {
      label: t("institutional-history:featured.dateLabel"),
      value: event.date,
    },
    {
      label: t("institutional-history:featured.locationLabel"),
      value: event.location,
    },
    {
      label: t("institutional-history:featured.partnerLabel"),
      value: event.partners[0]?.labelByLocale[locale],
    },
    {
      label: t("institutional-history:event.programmeTitle"),
      value: event.programmes[0]?.labelByLocale[locale],
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <>
      <PageSeo
        description={event.summary[locale]}
        locale={locale}
        path={`/institutional-history/${event.slug}`}
        title={`${event.title} | ${siteConfig.shortName}`}
      />
      <section className="relative overflow-hidden bg-[#101A25] text-white">
        <ResponsiveImage
          alt={event.coverImage.altByLocale[locale]}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.16] grayscale"
          fill
          loading="eager"
          priority
          sizes="100vw"
          src={event.coverImage.imageSrc}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#122033] via-[#101A25]/98 to-[#101A25]" />
        <Container className="relative grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-32">
          <div className="grid gap-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-white/56">
              {event.primaryEventType}
            </p>
            <h1 className="max-w-4xl font-heading text-4xl leading-tight text-white sm:text-6xl lg:text-[4.8rem]">
              {event.title}
            </h1>
            <p className="max-w-3xl text-lg leading-9 text-white/72">{event.summary[locale]}</p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68">
                {event.date}
              </span>
              {event.location ? (
                <span className="rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/68">
                  {event.location}
                </span>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 border-l border-white/10 pl-0 lg:pl-10">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-white/46">
              {siteConfig.shortName}
            </p>
            <Link
              className="inline-flex items-center text-sm font-semibold text-white/86 underline decoration-white/32 decoration-1 underline-offset-6 transition-colors duration-300 hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101A25]"
              href={`/${locale}/institutional-history`}
            >
              {t("pages:institutionalHistory.title")}
            </Link>
          </div>
        </Container>
      </section>
      <section className="bg-linear-to-b from-[#F6F5F2] via-white to-white py-18 sm:py-24">
        <Container className="grid gap-8 xl:grid-cols-[0.96fr_1.04fr] xl:items-start">
          <aside className="rounded-[2.2rem] border border-[#D9D5CC] bg-white p-8 shadow-[0_24px_90px_rgba(16,26,37,0.08)] sm:p-10 xl:sticky xl:top-10">
            <div className="grid gap-8">
              <div className="grid gap-4 border-b border-[#E7E3DB] pb-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#7A8591]">
                  {siteConfig.shortName}
                </p>
                <h2 className="font-heading text-3xl text-[#111D2B]">
                  {t("pages:institutionalHistory.title")}
                </h2>
              </div>

              <dl className="grid gap-5">
                {eventMetadata.map((item) => (
                  <div className="grid gap-2 border-b border-[#ECE7DF] pb-5 last:border-b-0 last:pb-0" key={item.label}>
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A8591]">
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-7 text-[#111D2B]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className="grid gap-8">
            <article className="rounded-[2.2rem] border border-[#E3DED6] bg-white p-8 shadow-[0_20px_65px_rgba(16,26,37,0.06)] sm:p-10">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#7A8591]">
                {t("institutional-history:event.summaryTitle")}
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-[#3D4854]">
                {event.summary[locale]}
              </p>
            </article>

            <article className="rounded-[2.2rem] border border-[#E3DED6] bg-[#F8F7F4] p-8 shadow-[0_18px_45px_rgba(16,26,37,0.05)] sm:p-10">
              <h2 className="font-heading text-3xl text-[#111D2B]">
                {t("institutional-history:event.outcomesTitle")}
              </h2>
              <ul className="mt-8 grid gap-5 text-base leading-8 text-[#3D4854]">
                {event.outcomes.map((outcome) => (
                  <li className="flex gap-3" key={outcome[locale]}>
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#355070]" />
                    <span>{outcome[locale]}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid gap-6 lg:grid-cols-3">
              {renderReferenceGroup(
                t("institutional-history:event.partnerTitle"),
                event.partners,
                locale,
              )}
              {renderReferenceGroup(
                t("institutional-history:event.programmeTitle"),
                event.programmes,
                locale,
              )}
              {renderReferenceGroup(
                t("institutional-history:event.leadershipTitle"),
                event.leaders,
                locale,
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-18 sm:py-24">
        <Container className="grid gap-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={siteConfig.shortName}
              title={t("institutional-history:event.galleryTitle")}
              description={event.summary[locale]}
            />
            <Link
              className="inline-flex items-center text-sm font-semibold text-[#111D2B] underline decoration-[#7A8591] decoration-1 underline-offset-6 transition-colors duration-300 hover:text-[#355070] hover:decoration-[#355070] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355070] focus-visible:ring-offset-2"
              href={`/${locale}/institutional-history`}
            >
              {t("institutional-history:timeline.title")}
            </Link>
          </div>

          <article className="overflow-hidden rounded-[2.4rem] border border-[#E3DED6] bg-[#101A25] shadow-[0_22px_75px_rgba(16,26,37,0.12)]">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[340px] overflow-hidden lg:min-h-[620px]">
                <ResponsiveImage
                  alt={event.gallery[0].altByLocale[locale]}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  src={event.gallery[0].imageSrc}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#101A25]/48 via-transparent to-transparent" />
              </div>
              <div className="grid gap-6 p-8 text-white sm:p-10 lg:p-12">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.4em] text-white/48">
                  {siteConfig.shortName}
                </p>
                <h2 className="font-heading text-3xl leading-tight">
                  {event.gallery[0].captionByLocale[locale]}
                </h2>
                <p className="max-w-xl text-sm leading-8 text-white/68">
                  {event.gallery[0].altByLocale[locale]}
                </p>
              </div>
            </div>
          </article>

          <div className="grid gap-6 lg:grid-cols-3">
            {event.gallery.slice(1).map((asset, index) => (
              <article
                className="group overflow-hidden rounded-[1.9rem] border border-[#E3DED6] bg-white shadow-[0_18px_45px_rgba(16,26,37,0.06)] transition-all duration-300 hover:-translate-y-1"
                key={asset.assetId}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ResponsiveImage
                    alt={asset.altByLocale[locale]}
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    src={asset.imageSrc}
                  />
                </div>
                <div className="grid gap-3 p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A8591]">
                    {String(index + 2).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-7 text-[#111D2B]">{asset.captionByLocale[locale]}</p>
                </div>
              </article>
            ))}
          </div>

          <section className="overflow-hidden rounded-[2.4rem] border border-[#D9D5CC] bg-[#101A25] text-white shadow-[0_22px_65px_rgba(16,26,37,0.12)]">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
              <div className="grid gap-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-white/46">
                  {siteConfig.shortName}
                </p>
                <h2 className="max-w-3xl font-heading text-3xl sm:text-4xl">
                  {t("pages:institutionalHistory.title")}
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
  paths: getLocaleStaticPaths().flatMap(({ params }) =>
    institutionalEvents.map((event) => ({
      params: {
        locale: params.locale,
        slug: event.slug,
      },
    })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<InstitutionalHistoryEventPageProps> = async ({
  params,
}) => {
  const localePageProps = await getLocalePageProps(params?.locale, [
    "common",
    "pages",
    "institutional-history",
  ]);

  return {
    props: {
      ...localePageProps.props,
      slug: typeof params?.slug === "string" ? params.slug : "",
    },
  };
};
