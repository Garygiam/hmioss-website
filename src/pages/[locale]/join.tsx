import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { MembershipForm } from "@/components/forms/MembershipForm";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Container } from "@/components/ui/Container";
import { PageSeo } from "@/components/seo/PageSeo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { defaultLocale } from "@/config/i18n";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type JoinPageProps = {
  locale: Locale;
};

type JourneyItem = {
  key: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export default function JoinPage({ locale }: JoinPageProps) {
  const { t } = useTranslation(["pages"]);
  const router = useRouter();
  const localeParam = router.query.locale;
  const effectiveLocale =
    typeof localeParam === "string" ? (localeParam as Locale) : locale ?? defaultLocale;
  const intro = t("pages:join.intro");
  const journeyItemsValue = t("pages:join.journey.items", {
    returnObjects: true,
    defaultValue: [],
  });
  const journeyItems = Array.isArray(journeyItemsValue)
    ? (journeyItemsValue as JourneyItem[])
    : [];
  const faqItemsValue = t("pages:join.faq.items", {
    returnObjects: true,
    defaultValue: [],
  });
  const faqItems = Array.isArray(faqItemsValue) ? (faqItemsValue as FaqItem[]) : [];

  return (
    <>
      <PageSeo
        description={intro}
        locale={effectiveLocale}
        path="/join"
        title={`${t("pages:join.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={intro}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.graduation}
        subtitle={t("pages:join.subtitle")}
        title={t("pages:join.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-10">
            <SectionHeading
              eyebrow={siteConfig.shortName}
              title={t("pages:join.conversionTitle")}
              description={t("pages:join.conversionDescription")}
            />
            <ProcessTimeline
              description={t("pages:join.journey.description")}
              eyebrow={t("pages:join.journey.eyebrow")}
              items={journeyItems}
              title={t("pages:join.journey.title")}
            />
          </div>
          <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
            <MembershipForm />
          </div>
        </Container>
      </section>
      <section className="bg-[#F8F7F2] py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={siteConfig.shortName}
            title={t("pages:join.faq.title")}
            description={t("pages:join.faq.description")}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {faqItems.map((item) => (
              <article
                className="rounded-3xl border border-[#E0E0E0] bg-white p-8"
                key={item.question}
              >
                <h2 className="font-heading text-2xl text-[#1A2A3A]">{item.question}</h2>
                <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">{item.answer}</p>
              </article>
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

export const getStaticProps: GetStaticProps<JoinPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);
