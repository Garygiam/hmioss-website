import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18NextConfig from "../../next-i18next.config.js";
import { defaultLocale, supportedLocales } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export async function getLocalePageProps(
  localeParam: string | string[] | undefined,
  namespaces: string[],
) {
  const locale =
    typeof localeParam === "string" && supportedLocales.includes(localeParam as Locale)
      ? (localeParam as Locale)
      : defaultLocale;

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, namespaces, nextI18NextConfig)),
    },
  };
}
