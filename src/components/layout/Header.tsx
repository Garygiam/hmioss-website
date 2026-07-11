import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { hmiossBrandRegistry } from "@/config/brand-registry";
import { supportedLocales } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { buildLocalizedPath } from "@/lib/locale";

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const localeParam = router.query.locale;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locale =
    typeof localeParam === "string" && supportedLocales.includes(localeParam as Locale)
      ? (localeParam as Locale)
      : "en";
  const headerWordmark = hmiossBrandRegistry.assets.wordmark.light;
  const currentPath = normalizePath(router.asPath.split("?")[0] || "/");

  return (
    <header className="sticky top-0 z-40 border-b border-[#E0E0E0] bg-white/90 backdrop-blur-sm">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          aria-label={hmiossBrandRegistry.assets.metadata.homeLinkLabel}
          className="flex shrink-0 items-center text-[#1A2A3A] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:outline-none"
          href={buildLocalizedPath(locale, "/")}
        >
          <BrandLogo
            asset={headerWordmark}
            className="h-auto w-[144px] min-w-0 sm:w-[168px] md:w-[190px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#1A2A3A] lg:flex">
          {siteConfig.navItems.map((item) => (
            (() => {
              const localizedHref = buildLocalizedPath(locale, item.href);
              const isCurrentPage = normalizePath(localizedHref.split("?")[0] || "/") === currentPath;

              return (
                <Link
                  key={item.key}
                  aria-current={isCurrentPage ? "page" : undefined}
                  className={`transition-colors hover:text-[#C41E3A] ${
                    isCurrentPage ? "text-[#C41E3A]" : ""
                  }`}
                  href={localizedHref}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })()
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37] text-[#1A2A3A] transition-colors hover:bg-[#F7F1DD] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
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
                (() => {
                  const localizedHref = buildLocalizedPath(locale, item.href);
                  const isCurrentPage = normalizePath(localizedHref.split("?")[0] || "/") === currentPath;

                  return (
                    <Link
                      key={item.key}
                      aria-current={isCurrentPage ? "page" : undefined}
                      className={`transition-colors hover:text-[#C41E3A] ${
                        isCurrentPage ? "text-[#C41E3A]" : ""
                      }`}
                      href={localizedHref}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  );
                })()
              ))}
            </nav>
            <LanguageSwitcher />
          </Container>
        </div>
      ) : null}
    </header>
  );
}
