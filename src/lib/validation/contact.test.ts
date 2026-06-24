import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/validation/contact";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactSchema.parse({
      name: "Test User",
      email: "test@example.com",
      subject: "Hello",
      message: "This is a message.",
    });

    expect(parsed.email).toBe("test@example.com");
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "not-an-email",
      subject: "Hello",
      message: "This is a message.",
    });

    expect(result.success).toBe(false);
  });
});

