import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

import {
  featuredInstitutionalEvent,
  institutionalEventTimeline,
  institutionalEvents,
  publishedInstitutionalEvents,
  resolveInstitutionalReferenceHref,
} from "@/config/institutional-history";

function getImageDimensions(filePath: string) {
  const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", filePath], {
    encoding: "utf-8",
  });
  const width = Number(output.match(/pixelWidth:\s+(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s+(\d+)/)?.[1]);

  return { width, height };
}

describe("institutionalEvents", () => {
  it("defines the approved HMIOSS event baseline with one featured event", () => {
    expect(institutionalEvents.map((event) => event.id)).toEqual([
      "event-2026-genovasi-university-mou-signing",
    ]);

    expect(featuredInstitutionalEvent?.id).toBe(
      "event-2026-genovasi-university-mou-signing",
    );
    expect(featuredInstitutionalEvent?.slug).toBe("genovasi-university-mou-signing");
    expect(featuredInstitutionalEvent?.primaryEventType).toBe("Partnership");
  });

  it("keeps every v1 event on a single primary event type", () => {
    expect(
      institutionalEvents.every((event) =>
        [
          "Partnership",
          "Programme",
          "Leadership",
          "Recognition",
          "Academic",
          "Community",
        ].includes(event.primaryEventType),
      ),
    ).toBe(true);
  });

  it("builds a public year-grouped timeline without empty years", () => {
    expect(institutionalEventTimeline).toEqual([
      {
        year: 2026,
        events: [
          expect.objectContaining({
            id: "event-2026-genovasi-university-mou-signing",
            slug: "genovasi-university-mou-signing",
          }),
        ],
      },
    ]);
  });

  it("limits the public gallery to curated selected assets only", () => {
    expect(
      publishedInstitutionalEvents[0].gallery.map((asset) => asset.assetId),
    ).toEqual([
      "genovasi-mou-001",
      "genovasi-mou-002",
      "genovasi-mou-003",
      "genovasi-mou-004",
    ]);
  });

  it("stores stable related-entity identifiers for conditional linking", () => {
    expect(publishedInstitutionalEvents[0].partners[0]).toMatchObject({
      entityId: "partner-genovasi-university",
      entityType: "partner",
      linkStatus: "linked",
    });
    expect(publishedInstitutionalEvents[0].leaders[0]).toMatchObject({
      entityId: "leader-gary-giam",
      entityType: "leader",
      linkStatus: "metadata-only",
    });
  });

  it("resolves linked entity references to locale-aware canonical routes at render time", () => {
    expect(
      resolveInstitutionalReferenceHref(publishedInstitutionalEvents[0].partners[0], "en"),
    ).toBe("/en/partners?lang=en");
    expect(
      resolveInstitutionalReferenceHref(publishedInstitutionalEvents[0].programmes[0], "ms"),
    ).toBe("/ms/programmes?lang=ms");
    expect(
      resolveInstitutionalReferenceHref(publishedInstitutionalEvents[0].leaders[0], "en"),
    ).toBeNull();
  });

  it("points every published gallery asset to a real public image and thumbnail file", () => {
    const projectRoot = path.resolve(__dirname, "../..");

    for (const event of publishedInstitutionalEvents) {
      for (const asset of event.gallery) {
        expect(
          fs.existsSync(path.join(projectRoot, "public", asset.imageSrc.replace(/^\//, ""))),
        ).toBe(true);
        expect(
          fs.existsSync(
            path.join(projectRoot, "public", asset.thumbnailSrc.replace(/^\//, "")),
          ),
        ).toBe(true);
      }
    }
  });

  it("records current derivative dimensions and file sizes for mains and thumbnails", () => {
    const projectRoot = path.resolve(__dirname, "../..");
    const governanceNote = fs.readFileSync(
      path.join(
        projectRoot,
        "docs/assets-source/history/events/genovasi-university-mou-signing.md",
      ),
      "utf-8",
    );

    for (const asset of publishedInstitutionalEvents[0].gallery) {
      const mainPath = path.join(projectRoot, "public", asset.imageSrc.replace(/^\//, ""));
      const thumbnailPath = path.join(
        projectRoot,
        "public",
        asset.thumbnailSrc.replace(/^\//, ""),
      );
      const mainDimensions = getImageDimensions(mainPath);
      const thumbnailDimensions = getImageDimensions(thumbnailPath);
      const mainSize = fs.statSync(mainPath).size;
      const thumbnailSize = fs.statSync(thumbnailPath).size;

      expect(governanceNote).toContain(
        `${path.basename(mainPath)} | main | ${mainDimensions.width}x${mainDimensions.height} | ${mainSize} bytes`,
      );
      expect(governanceNote).toContain(
        `${path.basename(thumbnailPath)} | thumbnail | ${thumbnailDimensions.width}x${thumbnailDimensions.height} | ${thumbnailSize} bytes`,
      );
    }
  });
});
