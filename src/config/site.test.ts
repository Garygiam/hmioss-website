import { createRequire } from "node:module";

import { describe, expect, it } from "vitest";

import { placeholderImages, siteConfig } from "@/config/site";

const require = createRequire(import.meta.url);
const nextSitemapConfig = require("../../next-sitemap.config.js") as {
  siteUrl: string;
};

describe("site imagery", () => {
  it("removes public placeholder and generated imagery from production surfaces", () => {
    expect(placeholderImages.hero).toBeUndefined();
    expect(placeholderImages.story).toBeUndefined();
    expect(placeholderImages.graduation).toBeUndefined();
    expect(placeholderImages.defence).toBeUndefined();
  });

  it("uses the approved production domain and public contact details while keeping socials disabled", () => {
    expect(siteConfig.url).toBe("https://www.hmioss.org");
    expect(siteConfig.email).toBe("hello@hmioss.org");
    expect(siteConfig.phone).toBe("+603-5878 6029");
    expect(siteConfig.socialLinks).toEqual([]);
  });

  it("keeps sitemap URLs aligned with the canonical production domain", () => {
    expect(nextSitemapConfig.siteUrl).toBe("https://www.hmioss.org");
  });
});
