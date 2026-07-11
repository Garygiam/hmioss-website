import type { Locale } from "@/config/i18n";
import { hmiossBrandRegistry } from "@/config/brand-registry";
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
      siteName: hmiossBrandRegistry.assets.metadata.shortName,
      locale,
      type: "website" as const,
      images: hmiossBrandRegistry.assets.social.image
        ? [
            {
              url: getAbsoluteUrl(hmiossBrandRegistry.assets.social.image.normalized),
              width: hmiossBrandRegistry.assets.social.image.width,
              height: hmiossBrandRegistry.assets.social.image.height,
              alt: hmiossBrandRegistry.assets.social.image.alt,
            },
          ]
        : undefined,
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
