import { defaultLocale, supportedLocales } from "@/config/i18n";

import type { Locale } from "@/config/i18n";

export { supportedLocales } from "@/config/i18n";

type DetectPreferredLocaleInput = {
  search: string;
  storedLocale: string | null;
  browserLanguage: string | null;
};

export function normalizeLocale(value: string | null | undefined): Locale {
  if (!value) {
    return defaultLocale;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized.startsWith("zh")) {
    if (
      normalized.includes("tw") ||
      normalized.includes("hk") ||
      normalized.includes("hant")
    ) {
      return "zh-TW";
    }

    return "zh-CN";
  }

  if (normalized.startsWith("ms") || normalized.startsWith("malay")) {
    return "ms";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return defaultLocale;
}

export function detectPreferredLocale({
  search,
  storedLocale,
  browserLanguage,
}: DetectPreferredLocaleInput): Locale {
  const params = new URLSearchParams(search);
  const queryLocale = params.get("lang");

  if (queryLocale && supportedLocales.includes(queryLocale as Locale)) {
    return queryLocale as Locale;
  }

  if (storedLocale) {
    const matchedStoredLocale = supportedLocales.find(
      (candidate) => candidate.toLowerCase() === storedLocale.toLowerCase(),
    );

    if (matchedStoredLocale) {
      return matchedStoredLocale;
    }
  }

  return normalizeLocale(browserLanguage);
}

export function buildLocalizedPath(locale: Locale, path: string): string {
  const rawPath = path.startsWith("/") ? path : `/${path}`;
  const [pathname, query = ""] = rawPath.split("?");
  const trimmedPathname = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  const params = new URLSearchParams(query);

  params.set("lang", locale);

  const queryString = params.toString();
  return `/${locale}${trimmedPathname}${queryString ? `?${queryString}` : ""}`;
}

export function getAlternateLocalePath(
  currentPath: string,
  nextLocale: Locale,
): string {
  const rawPath = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const [pathname, query = ""] = rawPath.split("?");
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && supportedLocales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  const nextPathname = segments.length > 0 ? `/${segments.join("/")}` : "/";
  const params = new URLSearchParams(query);

  params.set("lang", nextLocale);

  return buildLocalizedPath(
    nextLocale,
    `${nextPathname}${params.toString() ? `?${params.toString()}` : ""}`,
  );
}
