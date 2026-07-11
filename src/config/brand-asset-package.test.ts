import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(__dirname, "../..");

const governedPackageFiles = [
  "public/brand/masters/hmioss/v1.0.0/hmioss-master-source.pdf",
  "public/brand/masters/hmioss/v1.0.0/wordmark-light.png",
  "public/brand/masters/hmioss/v1.0.0/wordmark-dark.png",
  "public/brand/masters/hmioss/v1.0.0/extended-lockup.png",
  "public/brand/masters/hmioss/v1.0.0/icon.png",
  "public/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png",
  "public/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png",
  "public/brand/runtime/hmioss/v1.0.0/logo/extended-lockup.png",
  "public/brand/runtime/hmioss/v1.0.0/logo/icon.png",
  "public/brand/favicons/hmioss/v1.0.0/favicon.ico",
  "public/brand/favicons/hmioss/v1.0.0/favicon-32x32.png",
  "public/brand/favicons/hmioss/v1.0.0/favicon-16x16.png",
  "public/brand/favicons/hmioss/v1.0.0/favicon-48x48.png",
  "public/brand/favicons/hmioss/v1.0.0/apple-touch-icon.png",
  "public/brand/favicons/hmioss/v1.0.0/android-chrome-192x192.png",
  "public/brand/favicons/hmioss/v1.0.0/android-chrome-512x512.png",
  "public/brand/manifests/hmioss/v1.0.0/site.webmanifest",
  "public/brand/archive/hmioss/alternative-identity/v1.0.0/telescope-lockup-full.png",
  "public/brand/archive/hmioss/alternative-identity/v1.0.0/telescope-mark-light.png",
  "public/brand/archive/hmioss/alternative-identity/v1.0.0/telescope-lockup-dark-plate.png",
] as const;

const compatibilityEntryPoints = [
  "public/favicon.ico",
  "public/favicon-32x32.png",
  "public/favicon-16x16.png",
  "public/apple-touch-icon.png",
  "public/android-chrome-192x192.png",
  "public/android-chrome-512x512.png",
  "public/site.webmanifest",
] as const;

const evidenceFiles = {
  lineage:
    "docs/superpowers/reports/2026-07-11-hmioss-brand-asset-package-v1.0.0-lineage.md",
  qa: "docs/superpowers/reports/2026-07-11-hmioss-brand-asset-package-v1.0.0-qa.md",
  knowledgeHarvest: "docs/superpowers/reports/2026-07-11-hmioss-brand-knowledge-harvest.md",
  applePreview:
    "docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-apple-touch-rounded-preview.png",
  contactSheet:
    "docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-contact-sheet.png",
  measurements:
    "docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-qa-measurements.json",
} as const;

function readProjectFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf-8");
}

function getProjectPath(relativePath: string) {
  return path.join(projectRoot, relativePath);
}

describe("HMIOSS brand asset package v1.0.0", () => {
  it("publishes the governed package outputs and root compatibility entrypoints", () => {
    for (const relativePath of [...governedPackageFiles, ...compatibilityEntryPoints]) {
      expect(fs.existsSync(path.join(projectRoot, relativePath)), relativePath).toBe(true);
    }
  });

  it("ships a static site.webmanifest that points only to HMIOSS governed icons", () => {
    const manifest = JSON.parse(readProjectFile("public/site.webmanifest")) as {
      name: string;
      short_name: string;
      display: string;
      background_color: string;
      theme_color: string;
      icons: Array<{ src: string; sizes: string; type: string }>;
    };

    expect(manifest.name).toBe("International Hung Men Institute of Strategic Studies");
    expect(manifest.short_name).toBe("HMIOSS");
    expect(manifest.display).toBe("standalone");
    expect(manifest.background_color).toBe("#FFFFFF");
    expect(manifest.theme_color).toBe("#0B1F4D");
    expect(manifest.icons).toEqual([
      {
        src: "/brand/favicons/hmioss/v1.0.0/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/favicons/hmioss/v1.0.0/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ]);
  });

  it("publishes tightly trimmed runtime wordmarks and a compact multi-resolution favicon package", async () => {
    const [wordmarkLight, wordmarkDark, applePreview, contactSheet] = await Promise.all([
      sharp(getProjectPath("public/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png")).metadata(),
      sharp(getProjectPath("public/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png")).metadata(),
      sharp(getProjectPath(evidenceFiles.applePreview)).metadata(),
      sharp(getProjectPath(evidenceFiles.contactSheet)).metadata(),
    ]);

    expect(wordmarkLight.width).toBe(821);
    expect(wordmarkLight.height).toBe(153);
    expect(wordmarkLight.hasAlpha).toBe(true);

    expect(wordmarkDark.width).toBe(821);
    expect(wordmarkDark.height).toBe(153);
    expect(wordmarkDark.hasAlpha).toBe(true);

    expect(fs.statSync(getProjectPath("public/brand/favicons/hmioss/v1.0.0/favicon.ico")).size).toBeLessThan(20_000);
    expect(fs.statSync(getProjectPath("public/favicon.ico")).size).toBeLessThan(20_000);

    expect(applePreview.width).toBe(240);
    expect(applePreview.height).toBe(240);
    expect(contactSheet.width).toBe(1840);
    expect(contactSheet.height).toBe(1480);
  });

  it("records lineage, QA evidence, and knowledge harvest for the package", () => {
    const lineage = readProjectFile(evidenceFiles.lineage);
    const qa = readProjectFile(evidenceFiles.qa);
    const knowledgeHarvest = readProjectFile(evidenceFiles.knowledgeHarvest);
    const measurements = readProjectFile(evidenceFiles.measurements);

    expect(lineage).toContain("Brand Asset Package v1.0.0");
    expect(lineage).toContain("Phase 1 accepted baseline");
    expect(lineage).toContain("Transparency");
    expect(lineage).toContain("Background Suitability");

    for (const relativePath of governedPackageFiles) {
      expect(lineage).toContain(path.basename(relativePath));
    }

    expect(qa).toContain("Asset QA Report");
    expect(qa).toContain("PASS");
    expect(qa).toContain("No consumer files changed");
    expect(qa).toContain("No IGC assets generated");
    expect(qa).toContain("rounded-square preview");
    expect(qa).toContain("Contact sheet");

    expect(knowledgeHarvest).toContain("HMIOSS Brand Knowledge Harvest");
    expect(knowledgeHarvest).toContain("No consumer wiring");
    expect(knowledgeHarvest).toContain("Phase 2 only");
    expect(knowledgeHarvest).toContain("plate-based wordmark exports");
    expect(knowledgeHarvest).toContain("821x153");

    expect(measurements).toContain("\"dimensions\": \"821x153\"");
    expect(measurements).toContain("\"safeInset\": 18");
    expect(measurements).toContain("\"width\": 120");
  });

  it("keeps the package scoped to HMIOSS and does not generate IGC assets", () => {
    const igcPaths = [
      "public/brand/masters/igc/v1.0.0",
      "public/brand/runtime/igc/v1.0.0",
      "public/brand/favicons/igc/v1.0.0",
      "public/brand/manifests/igc/v1.0.0",
    ];

    for (const relativePath of igcPaths) {
      expect(fs.existsSync(path.join(projectRoot, relativePath)), relativePath).toBe(false);
    }
  });
});
