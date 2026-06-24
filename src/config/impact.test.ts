import { describe, expect, it } from "vitest";

import { impactHighlights, impactSections } from "@/config/impact";
import {
  flagshipProgramme,
  flagshipProgrammeOutcomes,
  flagshipProgrammePathway,
  outcomesAndOpportunities,
  programmeBenefits,
} from "@/config/programmes";

describe("impact content", () => {
  it("defines credibility-first highlights instead of vanity metrics", () => {
    expect(impactHighlights.map((item) => item.key)).toEqual([
      "leadership",
      "education",
      "research",
      "community",
    ]);
  });

  it("includes institutional proof sections for the Impact page", () => {
    expect(impactSections.map((section) => section.key)).toEqual([
      "members",
      "branches",
      "programmes",
      "partnerships",
      "communityActivities",
      "leadershipDevelopment",
      "events",
    ]);
  });

  it("provides stable data shapes for the reusable section components", () => {
    expect(impactSections[0].points.length).toBeGreaterThan(0);
    expect(impactHighlights[0].label).toBe("Leadership Development");
  });

  it("keeps stable highlight and section counts for locale alignment", () => {
    expect(impactHighlights).toHaveLength(4);
    expect(impactSections).toHaveLength(7);
  });
});

describe("programme content", () => {
  it("provides the planned programme value and opportunity records", () => {
    expect(programmeBenefits).toHaveLength(5);
    expect(outcomesAndOpportunities).toContain("Leadership Skills");
  });

  it("exposes the Phase 2 flagship programme model", () => {
    expect(flagshipProgramme.positioning).toEqual([
      "Leadership Development",
      "Career Development",
      "Industry Exposure",
      "Academic Qualification",
      "Professional Qualification",
    ]);
    expect(flagshipProgrammePathway).toHaveLength(5);
    expect(flagshipProgrammeOutcomes).toContain("Mentorship");
  });
});
