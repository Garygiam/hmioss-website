import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  institutionalCredentialGroups,
  publicInstitutionalCredentialGroups,
} from "@/config/recognition";

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(__dirname, "../..");
const nextI18NextConfig = require("../../next-i18next.config.js") as {
  ns: string[];
};

describe("recognition public asset policy", () => {
  it("registers the recognition namespace for the page router build", () => {
    expect(nextI18NextConfig.ns).toContain("recognition");
  });

  it("keeps only the approved public institutional letters in governed order", () => {
    expect(publicInstitutionalCredentialGroups.map((group) => group.key)).toEqual([
      "congratulatoryLetters",
    ]);

    expect(publicInstitutionalCredentialGroups[0].items.map((item) => item.key)).toEqual([
      "chinese-youth-entrepreneurs-association",
      "holland-china-business-culture-education-association",
      "zhi-gong-arts-institute",
      "china-macau-zhi-gong-association",
      "thayninga-institute-for-strategic-studies",
    ]);
  });

  it("keeps Taiwan, unidentified, and WhatsApp-named assets out of the public set", () => {
    const publicKeys = publicInstitutionalCredentialGroups.flatMap((group) =>
      group.items.map((item) => item.key),
    );

    expect(publicKeys).not.toContain("tccoc-letter");
    expect(publicKeys).not.toContain("unidentified-congratulatory-letter");
    expect(publicKeys.some((key) => key.toLowerCase().includes("whatsapp"))).toBe(false);
  });

  it("uses the approved country metadata for every public congratulatory letter", () => {
    const publicLetterCountries = Object.fromEntries(
      publicInstitutionalCredentialGroups
        .flatMap((group) => group.items)
        .map((item) => [item.key, item.countryTerritory]),
    );

    expect(publicLetterCountries).toMatchObject({
      "chinese-youth-entrepreneurs-association": "Taiwan",
      "holland-china-business-culture-education-association": "Netherlands",
      "zhi-gong-arts-institute": "Netherlands",
      "china-macau-zhi-gong-association": "Macau SAR, China",
      "thayninga-institute-for-strategic-studies": "Myanmar",
    });
  });

  it("ships a public runtime file for every approved public letter", () => {
    const approvedDocumentSources = publicInstitutionalCredentialGroups.flatMap((group) =>
      group.items.map((item) => item.documentSrc).filter((value): value is string => Boolean(value)),
    );

    for (const documentSrc of approvedDocumentSources) {
      expect(
        fs.existsSync(path.join(projectRoot, "public", documentSrc.replace(/^\//, ""))),
        documentSrc,
      ).toBe(true);
    }
  });

  it("keeps deferred and rejected source records in governance only", () => {
    const allItems = institutionalCredentialGroups.flatMap((group) => group.items);

    expect(allItems.find((item) => item.key === "tccoc-letter")?.visibility).toBe("internal-only");
    expect(allItems.find((item) => item.key === "unidentified-congratulatory-letter")?.visibility).toBe(
      "internal-only",
    );
    expect(
      fs.existsSync(
        path.join(
          projectRoot,
          "public/recognition/congratulatory-letters/WhatsApp Image 2026-07-07 at 07.59.36.jpeg",
        ),
      ),
    ).toBe(false);
    expect(
      fs.existsSync(
        path.join(projectRoot, "public/recognition/congratulatory-letters/賀函.pdf"),
      ),
    ).toBe(false);
  });
});
