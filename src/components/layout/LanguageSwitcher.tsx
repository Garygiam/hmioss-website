import { useTranslation } from "next-i18next";

import { localeDisplayLabels, supportedLocales } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";

export function LanguageSwitcher() {
  const { t } = useTranslation("common");
  const { currentLocale, switchLanguage } = useLanguageSwitcher();

  return (
    <label className="relative inline-flex items-center gap-2 text-sm font-medium text-[#1A2A3A]">
      <span className="sr-only">{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        className="h-10 rounded-full border border-[#E0E0E0] bg-white px-4 pr-10 text-sm font-semibold text-[#1A2A3A] shadow-xs focus:border-[#D4AF37] focus:outline-hidden"
        onChange={(event) => switchLanguage(event.target.value as Locale)}
        value={currentLocale}
      >
        {supportedLocales.map((locale) => (
          <option key={locale} value={locale}>
            {localeDisplayLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
