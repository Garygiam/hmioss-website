import { useMemo } from "react";
import { useRouter } from "next/router";

import { defaultLocale, supportedLocales } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { getAlternateLocalePath } from "@/lib/locale";

export const localeStorageKey = "hmioss:locale";

export function useLanguageSwitcher() {
  const router = useRouter();

  const currentLocale = useMemo<Locale>(() => {
    const value = router.query.locale;
    if (typeof value === "string" && supportedLocales.includes(value as Locale)) {
      return value as Locale;
    }
    return defaultLocale;
  }, [router.query.locale]);

  const switchLanguage = (nextLocale: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localeStorageKey, nextLocale);
    }

    const target = getAlternateLocalePath(router.asPath, nextLocale);
    void router.push(target);
  };

  return {
    currentLocale,
    switchLanguage,
    storageKey: localeStorageKey,
  };
}
