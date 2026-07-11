import { describe, expect, it } from "vitest";

import { hmiossBrandRegistry } from "@/config/brand-registry";
import { getPageSeo } from "@/lib/seo";

describe("getPageSeo", () => {
  it("uses registry metadata and keeps social sharing disabled without an approved asset", () => {
    const seo = getPageSeo({
      locale: "en",
      path: "/",
      title: "Home",
      description: "Institutional homepage",
    });

    expect(seo.openGraph.siteName).toBe(hmiossBrandRegistry.assets.metadata.shortName);
    expect(seo.openGraph.images).toBeUndefined();
    expect(seo.canonical).toBe("https://www.hmioss.org/en");
    expect(seo.openGraph.url).toBe("https://www.hmioss.org/en");
    expect(seo.additionalLinkTags).toHaveLength(4);
  });
});
