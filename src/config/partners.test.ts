import { describe, expect, it } from "vitest";

import {
  homepagePartnershipCategories,
  partnerOpportunityCategories,
} from "@/config/partners";

describe("partners config", () => {
  it("defines the six Phase 2 partnership opportunity categories", () => {
    expect(partnerOpportunityCategories.map((item) => item.key)).toEqual([
      "universities",
      "trainingProviders",
      "industryPartners",
      "defenceSecurityPartners",
      "communityOrganisations",
      "csrPartners",
    ]);
  });

  it("provides a homepage summary layer", () => {
    expect(homepagePartnershipCategories).toHaveLength(6);
  });
});
