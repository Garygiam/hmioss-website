import type { Locale } from "@/config/i18n";
import { siteConfig } from "@/config/site";

export function getAbsoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getCanonicalPath(locale: Locale, path: string) {
  const cleanPath = path === "/" ? "" : path;
  return `/${locale}${cleanPath}`;
}

export function getAlternateLanguageUrls(path: string) {
  return Object.fromEntries(
    siteConfig.locales.map((locale) => [
      locale,
      getAbsoluteUrl(getCanonicalPath(locale, path)),
    ]),
  );
}

export function getPageSeo({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const canonical = getAbsoluteUrl(getCanonicalPath(locale, path));

  return {
    title,
    description,
    canonical,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.shortName,
      locale,
      type: "website" as const,
    },
    additionalLinkTags: Object.entries(getAlternateLanguageUrls(path)).map(
      ([hrefLang, href]) => ({
        rel: "alternate",
        hrefLang,
        href,
      }),
    ),
  };
}
