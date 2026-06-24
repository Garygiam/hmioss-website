export const supportedLocales = ["en", "zh-TW", "zh-CN", "ms"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-TW": "Traditional Chinese",
  "zh-CN": "Simplified Chinese",
  ms: "Bahasa Malaysia",
};

export const localeDisplayLabels: Record<Locale, string> = {
  en: "English",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  ms: "Bahasa Malaysia",
};
