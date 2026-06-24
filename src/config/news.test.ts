import { describe, expect, it } from "vitest";

import { newsItems } from "@/config/news";

describe("newsItems", () => {
  it("includes the opening ceremony announcement with source coverage", () => {
    expect(newsItems[0]).toMatchObject({
      category: "News",
      title: "Opening Ceremony Marks HMIOSS Launch",
      href: "https://www.sinchew.com.my/news/20260526/nation/7536965",
    });

    expect(newsItems[0].summary).toContain(
      "HMIOSS officially announced its establishment in Malaysia",
    );
    expect(newsItems[0].images).toHaveLength(1);
    expect(newsItems[0].images?.[0]).toMatchObject({
      src: "https://cdn.sinchew.com.my/wp-content/uploads/2026/05/e69687e5918aefbc9ae6b4aae997a8e7ad96e795a5e7a094e7a9b6e999a2.jpg",
      alt: "Guests officiate the HMIOSS opening ceremony",
      variant: "primary",
    });
  });

  it("supports the planned news filter categories", () => {
    expect(newsItems.map((item) => item.category)).toEqual([
      "News",
      "Announcements",
      "Events",
    ]);
  });
});
