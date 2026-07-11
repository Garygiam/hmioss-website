import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
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

function renderReference(reference: InstitutionalHistoryReference, locale: Locale) {
  const href = resolveInstitutionalReferenceHref(reference, locale);

  if (href) {
    return (
      <Link
        className="text-sm font-semibold text-[#1A2A3A] transition-colors hover:text-[#C41E3A]"
        href={href}
      >
        {reference.labelByLocale[locale]}
      </Link>
    );
  }

  return <span className="text-sm text-[#4A4A4A]">{reference.labelByLocale[locale]}</span>;
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

  return (
    <>
      <PageSeo
        description={event.summary[locale]}
        locale={locale}
        path={`/institutional-history/${event.slug}`}
        title={`${event.title} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={event.summary[locale]}
        imageAlt={event.coverImage.altByLocale[locale]}
        imageSrc={event.coverImage.imageSrc}
        subtitle={event.primaryEventType}
        title={event.title}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("institutional-history:event.summaryTitle")}
            description={event.summary[locale]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
              <h2 className="font-heading text-2xl text-[#1A2A3A]">
                {t("institutional-history:event.outcomesTitle")}
              </h2>
              <ul className="mt-5 grid gap-3 text-base leading-8 text-[#4A4A4A]">
                {event.outcomes.map((outcome) => (
                  <li key={outcome[locale]}>{outcome[locale]}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
              <h2 className="font-heading text-2xl text-[#1A2A3A]">
                {t("institutional-history:event.partnerTitle")}
              </h2>
              <div className="mt-5 grid gap-3">
                {event.partners.map((partner) => (
                  <div key={partner.entityId}>{renderReference(partner, locale)}</div>
                ))}
              </div>
            </div>
          </div>

          {event.programmes.length > 0 ? (
            <section className="grid gap-4">
              <h2 className="font-heading text-2xl text-[#1A2A3A]">
                {t("institutional-history:event.programmeTitle")}
              </h2>
              <div className="grid gap-3">
                {event.programmes.map((programme) => (
                  <div key={programme.entityId}>{renderReference(programme, locale)}</div>
                ))}
              </div>
            </section>
          ) : null}

          {event.leaders.length > 0 ? (
            <section className="grid gap-4">
              <h2 className="font-heading text-2xl text-[#1A2A3A]">
                {t("institutional-history:event.leadershipTitle")}
              </h2>
              <div className="grid gap-3">
                {event.leaders.map((leader) => (
                  <div key={leader.entityId}>{renderReference(leader, locale)}</div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="grid gap-6">
            <h2 className="font-heading text-2xl text-[#1A2A3A]">
              {t("institutional-history:event.galleryTitle")}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {event.gallery.map((asset) => (
                <article
                  className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-8"
                  key={asset.assetId}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <ResponsiveImage
                      alt={asset.altByLocale[locale]}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      src={asset.imageSrc}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
                    {asset.captionByLocale[locale]}
                  </p>
                </article>
              ))}
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
