import { describe, expect, it } from "vitest";

import { newsItems } from "@/config/news";

describe("newsItems", () => {
  it("keeps the opening ceremony announcement while falling back to an internal navy panel", () => {
    expect(newsItems[0]).toMatchObject({
      category: "News",
      title: "Opening Ceremony Marks HMIOSS Launch",
      href: "https://www.sinchew.com.my/news/20260526/nation/7536965",
    });

    expect(newsItems[0].summary).toContain(
      "HMIOSS officially announced its establishment in Malaysia",
    );
    expect(newsItems[0].images).toBeUndefined();
    expect(newsItems[0]).toMatchObject({
      fallbackPanelLabel: "HMIOSS",
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
