import { useTranslation } from "next-i18next";
import type { GetStaticPaths, GetStaticProps } from "next";

import { ProfileCard } from "@/components/sections/ProfileCard";
import { PageSeo } from "@/components/seo/PageSeo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadershipGroups } from "@/config/leadership";
import { placeholderImages, siteConfig } from "@/config/site";
import type { Locale } from "@/config/i18n";
import { getLocaleStaticPaths } from "@/lib/getLocaleStaticPaths";
import { getLocalePageProps } from "@/lib/pageProps";

type LeadershipPageProps = {
  locale: Locale;
};

export default function LeadershipPage({ locale }: LeadershipPageProps) {
  const { t } = useTranslation(["pages"]);
  const heroBody = siteConfig.description;
  const leadershipIntro = t("pages:leadership.section", {
    returnObjects: true,
  }) as { eyebrow: string; title: string; description: string };

  return (
    <>
      <PageSeo
        description={t("pages:leadership.subtitle")}
        locale={locale}
        path="/leadership"
        title={`${t("pages:leadership.title")} | ${siteConfig.shortName}`}
      />
      <PageHero
        body={heroBody}
        imageAlt={siteConfig.name}
        imageSrc={placeholderImages.story}
        subtitle={t("pages:leadership.subtitle")}
        title={t("pages:leadership.title")}
      />
      <section className="bg-white py-18">
        <Container className="grid gap-10">
          <SectionHeading
            eyebrow={leadershipIntro.eyebrow}
            title={leadershipIntro.title}
            description={leadershipIntro.description}
          />

          <div className="grid gap-12">
            {leadershipGroups.map((group) => (
              <section className="grid gap-6" key={group.key}>
                <div className="grid gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                    {group.eyebrow}
                  </p>
                  <h2 className="font-heading text-3xl text-[#1A2A3A]">{group.title}</h2>
                  <p className="max-w-3xl text-base text-[#4A4A4A]">{group.description}</p>
                </div>

                <div
                  className={[
                    "grid gap-6",
                    group.key === "president"
                      ? "mx-auto max-w-xl"
                      : group.key === "deputyPresidents"
                        ? "md:grid-cols-2"
                        : group.key === "secretaryGeneral"
                          ? "mx-auto max-w-xl"
                        : "md:grid-cols-2 xl:grid-cols-4",
                  ].join(" ")}
                >
                  {group.members.map((member) => (
                    <ProfileCard
                      key={member.name}
                      bio={member.bio}
                      expertise={member.expertise}
                      imageAlt={member.imageAlt}
                      imageSrc={member.imageSrc}
                      name={member.name}
                      title={member.title}
                    />
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

export const getStaticProps: GetStaticProps<LeadershipPageProps> = async ({ params }) =>
  getLocalePageProps(params?.locale, ["common", "pages"]);
