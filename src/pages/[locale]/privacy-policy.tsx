import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type PrivacyPageProps = {
  locale: Locale;
};

export default function PrivacyPolicyPage() {
  const { t } = useTranslation(["pages"]);

  return (
    <>
      <PageHero
        body={siteConfig.description}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={siteConfig.shortName}
        title={t("pages:legal.privacy.title")}
      />
      <section className="bg-white py-18">
        <Container className="prose max-w-3xl">
          <p>
            This policy will outline how we collect, use, and protect personal information.
          </p>
        </Container>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getLocaleStaticPaths(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PrivacyPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);

