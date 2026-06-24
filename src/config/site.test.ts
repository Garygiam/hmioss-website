import { describe, expect, it } from "vitest";

import { placeholderImages } from "@/config/site";

describe("site imagery", () => {
  it("uses a deployment-safe shared story image", () => {
    expect(placeholderImages.story).toMatch(/^\/.+/);
    expect(placeholderImages.story).not.toContain("coresg-normal.trae.ai");
    expect(placeholderImages.story).not.toContain("text_to_image");
  });
});
