import {
  buildLocalizedPath,
  detectPreferredLocale,
  getAlternateLocalePath,
  normalizeLocale,
  supportedLocales,
} from "@/lib/locale";

describe("locale utilities", () => {
  it("exports the supported locales in launch order", () => {
    expect(supportedLocales).toEqual(["en", "zh-TW", "zh-CN", "ms"]);
  });

  it("normalizes browser languages to supported locales", () => {
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale("zh-HK")).toBe("zh-TW");
    expect(normalizeLocale("zh-TW")).toBe("zh-TW");
    expect(normalizeLocale("zh-SG")).toBe("zh-CN");
    expect(normalizeLocale("ms-MY")).toBe("ms");
    expect(normalizeLocale("fr-FR")).toBe("en");
  });

  it("prefers query string over storage and browser language", () => {
    expect(
      detectPreferredLocale({
        search: "?lang=zh-CN",
        storedLocale: "ms",
        browserLanguage: "en-US",
      }),
    ).toBe("zh-CN");
  });

  it("falls back from storage to browser language to english", () => {
    expect(
      detectPreferredLocale({
        search: "",
        storedLocale: "fr",
        browserLanguage: "ms-MY",
      }),
    ).toBe("ms");

    expect(
      detectPreferredLocale({
        search: "",
        storedLocale: null,
        browserLanguage: "de-DE",
      }),
    ).toBe("en");
  });

  it("builds locale-prefixed paths with a synced lang query", () => {
    expect(buildLocalizedPath("en", "/")).toBe("/en?lang=en");
    expect(buildLocalizedPath("zh-TW", "/programmes")).toBe(
      "/zh-TW/programmes?lang=zh-TW",
    );
    expect(buildLocalizedPath("ms", "/news?tab=latest")).toBe(
      "/ms/news?tab=latest&lang=ms",
    );
  });

  it("preserves the current slug when switching locales", () => {
    expect(getAlternateLocalePath("/en/programmes", "zh-CN")).toBe(
      "/zh-CN/programmes?lang=zh-CN",
    );
    expect(getAlternateLocalePath("/ms/contact?lang=ms", "en")).toBe(
      "/en/contact?lang=en",
    );
  });
});
