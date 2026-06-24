import { describe, expect, it } from "vitest";

import { leadershipGroups } from "@/config/leadership";

describe("leadershipGroups", () => {
  it("defines the approved three-tier leadership hierarchy", () => {
    expect(leadershipGroups).toHaveLength(4);

    expect(leadershipGroups[0]).toMatchObject({
      key: "president",
      title: "President",
      members: [{ name: "Young Shang Yi", title: "President / Founder" }],
    });

    expect(leadershipGroups[1]).toMatchObject({
      key: "deputyPresidents",
      title: "Deputy Presidents",
      members: [
        { name: "Datuk Henry Lee", title: "Deputy President" },
        { name: "Gary Giam", title: "Deputy President" },
      ],
    });

    expect(leadershipGroups[2]).toMatchObject({
      key: "secretaryGeneral",
      title: "Secretary-General",
      members: [{ name: "Prof. Dr. Vincent Wee Eng Kim", title: "Secretary-General" }],
    });

    expect(leadershipGroups[3]).toMatchObject({
      key: "directors",
      title: "Directors",
      members: [
        { name: "Mee See Chooi" },
        { name: "Datin Sri Shanice Ng" },
      ],
    });
  });

  it("includes richer profile data for leadership credibility surfaces", () => {
    expect(leadershipGroups[0].members[0]).toMatchObject({
      name: "Young Shang Yi",
      title: "President / Founder",
    });
    expect(leadershipGroups[0].members[0].bio.length).toBeGreaterThan(20);
    expect(leadershipGroups[0].members[0].expertise.length).toBeGreaterThan(0);
    expect(leadershipGroups[0].members[0].imageSrc).toContain(
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image",
    );
    expect(leadershipGroups[0].members[0].imageAlt).toContain("Young Shang Yi");
  });

  it("avoids dual-role confusion by excluding deputies and secretary-general from directors", () => {
    const directors = leadershipGroups.find((group) => group.key === "directors");
    expect(directors).toBeDefined();

    const directorNames = (directors?.members ?? []).map((member) => member.name);
    expect(directorNames).not.toContain("Datuk Henry Lee");
    expect(directorNames).not.toContain("Gary Giam");
    expect(directorNames).not.toContain("Prof. Dr. Vincent Wee Eng Kim");
  });
});
