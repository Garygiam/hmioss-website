import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type ContactPageProps = {
  locale: Locale;
};

export default function ContactPage() {
  const { t } = useTranslation(["pages"]);

  return (
    <>
      <PageHero
        body={siteConfig.description}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("pages:contact.subtitle")}
        title={t("pages:contact.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-10">
            <SectionHeading title="Headquarters" />
            <div className="mt-6 grid gap-2 text-sm leading-7 text-[#4A4A4A]">
              <p>{siteConfig.address}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.email}</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl border border-[#E0E0E0] bg-white p-10">
              <SectionHeading title="Send a Message" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white">
              <iframe
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Lot%20111%20Tingkat%202%20Seksyen%207%20Kajang%20Selangor%20Malaysia&output=embed"
                title="HMIOSS map"
              />
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

export const getStaticProps: GetStaticProps<ContactPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);
