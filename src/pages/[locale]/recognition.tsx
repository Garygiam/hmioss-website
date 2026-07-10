import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { publicInstitutionalCredentialGroups } from "@/config/recognition";
import type { Locale } from "@/config/i18n";
import { placeholderImages, siteConfig } from "@/config/site";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type RecognitionPageProps = {
  locale: Locale;
};

function formatCredentialDate(locale: Locale, value: string) {
  if (/^\d{4}-\d{2}$/.test(value)) {
    return value;
  }

  const [year, month, day] = value.split("-").map((part) => Number(part));

  if (!year || !month || !day) {
    return value;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  const intlLocale = locale === "ms" ? "ms-MY" : locale === "en" ? "en-MY" : locale;
  const options: Intl.DateTimeFormatOptions =
    locale === "zh-CN" || locale === "zh-TW"
      ? { year: "numeric", month: "2-digit", day: "2-digit" }
      : { year: "numeric", month: "long", day: "2-digit" };

  return new Intl.DateTimeFormat(intlLocale, options).format(date);
}

function getCredentialActionKey(groupKey: string) {
  return `recognition:groups.${groupKey}.viewCredential`;
}

export default function RecognitionPage({ locale }: RecognitionPageProps) {
  const { t } = useTranslation(["pages", "recognition"]);

  return (
    <>
      <PageSeo
        description={t("recognition:hero.subtitle")}
        locale={locale}
        path="/recognition"
        title={`${t("pages:recognition.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={t("recognition:hero.subtitle")}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("recognition:hero.eyebrow")}
        title={t("pages:recognition.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("recognition:sectionTitle")}
            description={t("recognition:sectionDescription")}
          />

          {publicInstitutionalCredentialGroups.map((group) => (
            <section className="grid gap-8" key={group.key}>
              <SectionHeading
                eyebrow={t(`recognition:groups.${group.key}.eyebrow`)}
                title={t(`recognition:groups.${group.key}.title`)}
                description={t(`recognition:groups.${group.key}.description`)}
              />

              <div className="grid gap-6 lg:grid-cols-2">
                {group.items.map((credential) => (
                  <article
                    className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10"
                    key={credential.credentialId}
                  >
                    {credential.previewSrc ? (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                        <ResponsiveImage
                          alt={credential.imageAlt}
                          className="object-cover"
                          fill
                          sizes="(min-width: 1024px) 45vw, 100vw"
                          src={credential.previewSrc}
                        />
                      </div>
                    ) : null}

                    <h2 className="mt-7 font-heading text-2xl text-[#1A2A3A]">
                      {credential.displayName}
                    </h2>

                    <div className="mt-4 grid gap-2 text-sm text-[#4A4A4A]">
                      {credential.countryTerritory ? (
                        <p>
                          {t("recognition:labels.country")}: {credential.countryTerritory}
                        </p>
                      ) : null}
                      {credential.visibleDate ? (
                        <p>
                          {t("recognition:labels.date")}:{" "}
                          {formatCredentialDate(locale, credential.visibleDate)}
                        </p>
                      ) : null}
                      <p>
                        {t("recognition:labels.documentType")}: {credential.credentialType}
                      </p>
                    </div>

                    {credential.documentSrc ? (
                      <Link
                        className="mt-5 inline-flex text-sm font-semibold text-[#1A2A3A] transition-colors hover:text-[#C41E3A]"
                        href={credential.documentSrc}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {t(getCredentialActionKey(group.key))}
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </Container>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getLocaleStaticPaths(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<RecognitionPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages", "recognition"]);
