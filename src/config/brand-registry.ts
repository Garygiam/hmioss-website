import { siteConfig } from "@/config/site";

export type BrandReferenceImplementation = {
  venture: string;
  order: number;
};

export type GovernedBrandRoots = {
  incoming: string;
  masters: string;
  runtime: string;
  favicons: string;
  archive: string;
};

export type BrandAssetDescriptor = {
  normalized: string;
  compatibility: readonly string[];
};

export type BrandImageAsset = BrandAssetDescriptor & {
  alt: string;
  width: number;
  height: number;
};

export type BrandIconAsset = BrandAssetDescriptor & {
  sizes: string;
  type?: "image/png";
};

export type BrandManifestAsset = BrandAssetDescriptor & {
  backgroundColor: string;
  display: "standalone";
  name: string;
  shortName: string;
  themeColor: string;
};

export type BrandSocialImage = BrandImageAsset;

export type BrandSocialAssets = {
  image: BrandSocialImage | null;
};

export type BrandMetadata = {
  description: string;
  homeLinkLabel: string;
  iconAlt: string;
  name: string;
  ownershipStatement: string;
  referencePackageName: string;
  referencePackageVersion: string;
  shortName: string;
  wordmarkAlt: string;
};

export type HmiossBrandAssetKey = "logo" | "logoCompact" | "faviconIco";

type VentureBrandRegistry<VentureName extends string> = {
  venture: VentureName;
  referenceImplementationOrder: number;
  assetArchitecture: {
    roots: GovernedBrandRoots;
  };
  assets: {
    wordmark: {
      light: BrandImageAsset;
      dark: BrandImageAsset;
      compact: BrandImageAsset;
    };
    icon: BrandImageAsset;
    favicons: {
      ico: BrandAssetDescriptor;
      png32: BrandIconAsset;
      png16: BrandIconAsset;
      png48: BrandIconAsset;
      appleTouchIcon: BrandIconAsset;
      android: readonly BrandIconAsset[];
    };
    manifest: BrandManifestAsset;
    social: BrandSocialAssets;
    metadata: BrandMetadata;
  };
};

export const gehBrandIdentitySystem = {
  id: "geh-brand-identity-system",
  name: "GEH Brand Identity System",
  referenceImplementations: [
    {
      venture: "IGC",
      order: 1,
    },
    {
      venture: "HMIOSS",
      order: 2,
    },
  ] as const satisfies readonly BrandReferenceImplementation[],
} as const;

export const gehBrandFactory = {
  id: "geh-brand-asset-factory",
  name: "GEH Brand Asset Factory",
  version: "v1.0.0",
} as const;

const hmiossGovernedRoots: GovernedBrandRoots = {
  incoming: "/brand/incoming/hmioss",
  masters: "/brand/masters/hmioss",
  runtime: "/brand/runtime/hmioss",
  favicons: "/brand/favicons/hmioss",
  archive: "/brand/archive/hmioss",
};

const igcGovernedRoots: GovernedBrandRoots = {
  incoming: "/brand/incoming/igc",
  masters: "/brand/masters/igc",
  runtime: "/brand/runtime/igc",
  favicons: "/brand/favicons/igc",
  archive: "/brand/archive/igc",
};

const hmiossMetadata: BrandMetadata = {
  description: siteConfig.description,
  homeLinkLabel: "HMIOSS home",
  iconAlt: "HMIOSS icon",
  name: siteConfig.name,
  ownershipStatement:
    "The website consumes frozen HMIOSS Brand Asset Package v1.0.0 outputs through the Brand Registry.",
  referencePackageName: "HMIOSS Brand Asset Package",
  referencePackageVersion: "v1.0.0",
  shortName: siteConfig.shortName,
  wordmarkAlt: "HMIOSS wordmark",
};

export const brandRegistry = {
  igc: {
    venture: "IGC",
    referenceImplementationOrder: 1,
    assetArchitecture: {
      roots: igcGovernedRoots,
    },
    assets: {
      wordmark: {
        light: {
          normalized: "/brand/runtime/igc/v1.0.0/logo/wordmark-light.png",
          compatibility: [],
          alt: "IGC wordmark",
          width: 821,
          height: 153,
        },
        dark: {
          normalized: "/brand/runtime/igc/v1.0.0/logo/wordmark-dark.png",
          compatibility: [],
          alt: "IGC wordmark",
          width: 821,
          height: 153,
        },
        compact: {
          normalized: "/brand/runtime/igc/v1.0.0/logo/icon.png",
          compatibility: [],
          alt: "IGC compact mark",
          width: 512,
          height: 512,
        },
      },
      icon: {
        normalized: "/brand/runtime/igc/v1.0.0/logo/icon.png",
        compatibility: [],
        alt: "IGC icon",
        width: 512,
        height: 512,
      },
      favicons: {
        ico: {
          normalized: "/brand/favicons/igc/v1.0.0/favicon.ico",
          compatibility: [],
        },
        png32: {
          normalized: "/brand/favicons/igc/v1.0.0/favicon-32x32.png",
          compatibility: [],
          sizes: "32x32",
          type: "image/png",
        },
        png16: {
          normalized: "/brand/favicons/igc/v1.0.0/favicon-16x16.png",
          compatibility: [],
          sizes: "16x16",
          type: "image/png",
        },
        png48: {
          normalized: "/brand/favicons/igc/v1.0.0/favicon-48x48.png",
          compatibility: [],
          sizes: "48x48",
          type: "image/png",
        },
        appleTouchIcon: {
          normalized: "/brand/favicons/igc/v1.0.0/apple-touch-icon.png",
          compatibility: [],
          sizes: "180x180",
          type: "image/png",
        },
        android: [
          {
            normalized: "/brand/favicons/igc/v1.0.0/android-chrome-192x192.png",
            compatibility: [],
            sizes: "192x192",
            type: "image/png",
          },
          {
            normalized: "/brand/favicons/igc/v1.0.0/android-chrome-512x512.png",
            compatibility: [],
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      manifest: {
        normalized: "/brand/manifests/igc/v1.0.0/site.webmanifest",
        compatibility: [],
        backgroundColor: "#FFFFFF",
        display: "standalone",
        name: "IGC",
        shortName: "IGC",
        themeColor: "#0B1F4D",
      },
      social: {
        image: null as BrandSocialImage | null,
      },
      metadata: {
        description: "IGC brand metadata placeholder",
        homeLinkLabel: "IGC home",
        iconAlt: "IGC icon",
        name: "IGC",
        ownershipStatement: "The website consumes IGC brand assets through the Brand Registry.",
        referencePackageName: "IGC Brand Asset Package",
        referencePackageVersion: "v1.0.0",
        shortName: "IGC",
        wordmarkAlt: "IGC wordmark",
      },
    },
  } satisfies VentureBrandRegistry<"IGC">,
  hmioss: {
    venture: "HMIOSS",
    referenceImplementationOrder: 2,
    assetArchitecture: {
      roots: hmiossGovernedRoots,
    },
    assets: {
      // Historical naming note for the frozen Brand Asset Package v1.0.0:
      // - `wordmark.light` is the runtime asset selected for light and neutral surfaces.
      // - `wordmark.dark` is the runtime asset selected for dark surfaces.
      // These names are inherited from the governed package lineage and must not be
      // renamed during Phase 3 integration. If a defect is found later, fix it through
      // a controlled package patch release rather than by renaming frozen package files.
      wordmark: {
        light: {
          normalized: "/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png",
          compatibility: ["/brand/v1/web/hmioss-wordmark-light-256.png"],
          alt: hmiossMetadata.wordmarkAlt,
          width: 821,
          height: 153,
        },
        dark: {
          normalized: "/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png",
          compatibility: ["/brand/v1/web/hmioss-wordmark-dark-256.png"],
          alt: hmiossMetadata.wordmarkAlt,
          width: 821,
          height: 153,
        },
        compact: {
          normalized: "/brand/runtime/hmioss/v1.0.0/logo/icon.png",
          compatibility: ["/brand/v1/web/hmioss-icon-64.png"],
          alt: "HMIOSS compact mark",
          width: 512,
          height: 512,
        },
      },
      icon: {
        normalized: "/brand/runtime/hmioss/v1.0.0/logo/icon.png",
        compatibility: ["/brand/v1/web/hmioss-icon-64.png"],
        alt: hmiossMetadata.iconAlt,
        width: 512,
        height: 512,
      },
      favicons: {
        ico: {
          normalized: "/brand/favicons/hmioss/v1.0.0/favicon.ico",
          compatibility: ["/favicon.ico"],
        },
        png32: {
          normalized: "/brand/favicons/hmioss/v1.0.0/favicon-32x32.png",
          compatibility: ["/favicon-32x32.png"],
          sizes: "32x32",
          type: "image/png",
        },
        png16: {
          normalized: "/brand/favicons/hmioss/v1.0.0/favicon-16x16.png",
          compatibility: ["/favicon-16x16.png"],
          sizes: "16x16",
          type: "image/png",
        },
        png48: {
          normalized: "/brand/favicons/hmioss/v1.0.0/favicon-48x48.png",
          compatibility: [],
          sizes: "48x48",
          type: "image/png",
        },
        appleTouchIcon: {
          normalized: "/brand/favicons/hmioss/v1.0.0/apple-touch-icon.png",
          compatibility: ["/apple-touch-icon.png"],
          sizes: "180x180",
          type: "image/png",
        },
        android: [
          {
            normalized: "/brand/favicons/hmioss/v1.0.0/android-chrome-192x192.png",
            compatibility: ["/android-chrome-192x192.png"],
            sizes: "192x192",
            type: "image/png",
          },
          {
            normalized: "/brand/favicons/hmioss/v1.0.0/android-chrome-512x512.png",
            compatibility: ["/android-chrome-512x512.png"],
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      manifest: {
        normalized: "/brand/manifests/hmioss/v1.0.0/site.webmanifest",
        compatibility: ["/site.webmanifest"],
        backgroundColor: "#FFFFFF",
        display: "standalone",
        name: siteConfig.name,
        shortName: siteConfig.shortName,
        themeColor: "#0B1F4D",
      },
      social: {
        image: null as BrandSocialImage | null,
      },
      metadata: hmiossMetadata,
    },
  } satisfies VentureBrandRegistry<"HMIOSS">,
} as const;

export type BrandRegistry = typeof brandRegistry;
export type BrandRegistryVentureKey = keyof BrandRegistry;

function getLegacyBrandAssetDescriptor(
  venture: BrandRegistryVentureKey,
  asset: keyof BrandRegistry[BrandRegistryVentureKey]["assets"] | HmiossBrandAssetKey,
): BrandAssetDescriptor {
  if (asset === "logo") {
    return brandRegistry[venture].assets.wordmark.light;
  }

  if (asset === "logoCompact") {
    return brandRegistry[venture].assets.wordmark.compact;
  }

  if (asset === "faviconIco") {
    return brandRegistry[venture].assets.favicons.ico;
  }

  return brandRegistry[venture].assets.favicons.ico;
}

export function getCompatibilityBrandAssetPath(descriptor: BrandAssetDescriptor): string {
  return descriptor.compatibility[0] ?? descriptor.normalized;
}

export function getBrandAssetPath(
  venture: BrandRegistryVentureKey,
  asset: HmiossBrandAssetKey,
): string {
  const descriptor = getLegacyBrandAssetDescriptor(venture, asset);

  if (asset === "faviconIco") {
    return getCompatibilityBrandAssetPath(descriptor);
  }

  return descriptor.normalized;
}

export function getNormalizedBrandAssetPath(
  venture: BrandRegistryVentureKey,
  asset: HmiossBrandAssetKey,
): string {
  return getLegacyBrandAssetDescriptor(venture, asset).normalized;
}

export const hmiossBrandRegistry = brandRegistry.hmioss;
