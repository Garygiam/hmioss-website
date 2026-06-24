import { describe, expect, it } from "vitest";

import { membershipSchema } from "@/lib/validation/membership";

describe("membershipSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = membershipSchema.parse({
      fullName: "Test User",
      email: "test@example.com",
      phone: "+60123456789",
      idNumber: "A1234567",
      reason: "I want to contribute to the institute.",
      membershipType: "individual",
    });

    expect(parsed.membershipType).toBe("individual");
  });

  it("rejects missing reason", () => {
    const result = membershipSchema.safeParse({
      fullName: "Test User",
      email: "test@example.com",
      phone: "+60123456789",
      idNumber: "A1234567",
      reason: "",
      membershipType: "corporate",
    });

    expect(result.success).toBe(false);
  });
});

