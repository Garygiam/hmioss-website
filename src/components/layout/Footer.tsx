import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Container } from "@/components/ui/Container";
import { supportedLocales } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { buildLocalizedPath } from "@/lib/locale";

export function Footer() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const localeParam = router.query.locale;

  const locale =
    typeof localeParam === "string" && supportedLocales.includes(localeParam as Locale)
      ? (localeParam as Locale)
      : "en";

  return (
    <footer className="border-t border-[#E0E0E0] bg-[#F5F5F5]">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-heading text-2xl text-[#1A2A3A]">{siteConfig.shortName}</p>
          <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">{siteConfig.address}</p>
          <p className="mt-3 text-sm text-[#4A4A4A]">
            {siteConfig.phone} · {siteConfig.email}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A2A3A]">
            {t("footer.quickLinks")}
          </p>
          <ul className="mt-4 grid gap-2 text-sm font-medium text-[#1A2A3A]">
            {siteConfig.navItems.map((item) => (
              <li key={item.key}>
                <Link
                  className="transition-colors hover:text-[#C41E3A]"
                  href={buildLocalizedPath(locale, item.href)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A2A3A]">
            {t("footer.legal")}
          </p>
          <ul className="mt-4 grid gap-2 text-sm font-medium text-[#1A2A3A]">
            <li>
              <Link
                className="transition-colors hover:text-[#C41E3A]"
                href={buildLocalizedPath(locale, "/privacy-policy")}
              >
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-[#C41E3A]"
                href={buildLocalizedPath(locale, "/terms-of-service")}
              >
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs text-[#4A4A4A]">
            © 2026 {siteConfig.name}. {t("footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
