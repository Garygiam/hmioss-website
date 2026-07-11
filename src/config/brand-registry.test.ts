import { describe, expect, it } from "vitest";

import {
  brandRegistry,
  gehBrandFactory,
  gehBrandIdentitySystem,
  getBrandAssetPath,
  getNormalizedBrandAssetPath,
  hmiossBrandRegistry,
} from "@/config/brand-registry";

describe("GEH brand registry", () => {
  it("treats IGC as the first reference implementation and HMIOSS as the second", () => {
    expect(
      gehBrandIdentitySystem.referenceImplementations.map(({ venture, order }) => ({
        venture,
        order,
      })),
    ).toEqual([
      { venture: "IGC", order: 1 },
      { venture: "HMIOSS", order: 2 },
    ]);

    expect(brandRegistry.igc.referenceImplementationOrder).toBe(1);
    expect(brandRegistry.hmioss.referenceImplementationOrder).toBe(2);
  });

  it("declares the GEH Brand Identity System and Brand Asset Factory", () => {
    expect(gehBrandIdentitySystem.name).toBe("GEH Brand Identity System");
    expect(gehBrandFactory.name).toBe("GEH Brand Asset Factory");
    expect(gehBrandFactory.version).toBe("v1.0.0");
  });

  it("defines the governed asset architecture for HMIOSS", () => {
    expect(brandRegistry.igc.assetArchitecture.roots).toEqual({
      incoming: "/brand/incoming/igc",
      masters: "/brand/masters/igc",
      runtime: "/brand/runtime/igc",
      favicons: "/brand/favicons/igc",
      archive: "/brand/archive/igc",
    });

    expect(brandRegistry.hmioss.assetArchitecture.roots).toEqual({
      incoming: "/brand/incoming/hmioss",
      masters: "/brand/masters/hmioss",
      runtime: "/brand/runtime/hmioss",
      favicons: "/brand/favicons/hmioss",
      archive: "/brand/archive/hmioss",
    });
  });

  it("publishes HMIOSS assets through an asset-oriented registry surface", () => {
    expect(hmiossBrandRegistry.assets.wordmark.light.normalized).toBe(
      "/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png",
    );
    expect(hmiossBrandRegistry.assets.wordmark.dark.normalized).toBe(
      "/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png",
    );
    expect(hmiossBrandRegistry.assets.wordmark.compact.normalized).toBe(
      "/brand/runtime/hmioss/v1.0.0/logo/icon.png",
    );
    expect(hmiossBrandRegistry.assets.icon.normalized).toBe("/brand/runtime/hmioss/v1.0.0/logo/icon.png");

    expect(hmiossBrandRegistry.assets.favicons.ico.normalized).toBe("/brand/favicons/hmioss/v1.0.0/favicon.ico");
    expect(hmiossBrandRegistry.assets.favicons.appleTouchIcon.normalized).toBe(
      "/brand/favicons/hmioss/v1.0.0/apple-touch-icon.png",
    );
    expect(hmiossBrandRegistry.assets.manifest.normalized).toBe(
      "/brand/manifests/hmioss/v1.0.0/site.webmanifest",
    );
    expect(hmiossBrandRegistry.assets.social.image).toBeNull();
    expect(hmiossBrandRegistry.assets.metadata.referencePackageVersion).toBe("v1.0.0");
  });

  it("keeps compatibility entrypoints alongside normalized package outputs", () => {
    expect(getBrandAssetPath("hmioss", "logo")).toBe("/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png");
    expect(getNormalizedBrandAssetPath("hmioss", "logo")).toBe(
      "/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png",
    );

    expect(hmiossBrandRegistry.assets.wordmark.light.compatibility).toContain(
      "/brand/v1/web/hmioss-wordmark-light-256.png",
    );
    expect(hmiossBrandRegistry.assets.wordmark.light.normalized).toContain("/brand/runtime/hmioss/");
    expect(hmiossBrandRegistry.assets.wordmark.light.normalized).not.toContain("/incoming/");

    expect(getBrandAssetPath("hmioss", "faviconIco")).toBe("/favicon.ico");
    expect(getNormalizedBrandAssetPath("hmioss", "faviconIco")).toBe(
      "/brand/favicons/hmioss/v1.0.0/favicon.ico",
    );
    expect(hmiossBrandRegistry.assets.manifest.compatibility).toContain("/site.webmanifest");
  });
});
