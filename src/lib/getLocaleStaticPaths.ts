import { supportedLocales } from "@/config/i18n";

export function getLocaleStaticPaths() {
  return supportedLocales.map((locale) => ({
    params: { locale },
  }));
}
