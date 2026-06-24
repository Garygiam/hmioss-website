import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { supportedLocales } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { buildLocalizedPath } from "@/lib/locale";

export function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const localeParam = router.query.locale;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locale =
    typeof localeParam === "string" && supportedLocales.includes(localeParam as Locale)
      ? (localeParam as Locale)
      : "en";

  return (
    <header className="sticky top-0 z-40 border-b border-[#E0E0E0] bg-white/90 backdrop-blur-sm">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          className="flex items-center gap-3 text-[#1A2A3A]"
          href={buildLocalizedPath(locale, "/")}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37] text-xs font-semibold tracking-[0.25em]">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#1A2A3A] lg:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.key}
              className="transition-colors hover:text-[#C41E3A]"
              href={buildLocalizedPath(locale, item.href)}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex">
            <LanguageSwitcher />
          </div>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37] text-[#1A2A3A] transition-colors hover:bg-[#F7F1DD] lg:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {isMobileMenuOpen ? "\u00D7" : "\u2630"}
            </span>
          </button>
        </div>
      </Container>
      {isMobileMenuOpen ? (
        <div className="border-t border-[#E0E0E0] lg:hidden">
          <Container className="flex flex-col gap-5 py-5">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-4 text-base font-semibold text-[#1A2A3A]"
              id="mobile-navigation"
            >
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.key}
                  className="transition-colors hover:text-[#C41E3A]"
                  href={buildLocalizedPath(locale, item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher />
          </Container>
        </div>
      ) : null}
    </header>
  );
}
