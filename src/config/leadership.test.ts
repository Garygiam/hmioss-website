import { describe, expect, it } from "vitest";

import { leadershipGroups } from "@/config/leadership";

const approvedLeadershipPackage = [
  {
    name: "Young Shang Yi",
    title: "Chairman",
    imageSrc: "/images/leadership/young-shang-yi.webp",
  },
  {
    name: "Dato’ Sri Charles Hwang",
    title: "Deputy Chairman",
    imageSrc: "/images/leadership/dato-sri-charles-hwang.webp",
  },
  {
    name: "Gary Giam",
    title: "Vice President",
    imageSrc: "/images/leadership/gary-giam.webp",
  },
  {
    name: "Dato’ Henry Lee",
    title: "Vice President",
    imageSrc: "/images/leadership/dato-henry-lee.webp",
  },
  {
    name: "Prof. Dr. Vincent Wee Eng Kim",
    title: "Secretary General",
    imageSrc: "/images/leadership/prof-vincent-wee-eng-kim.webp",
  },
  {
    name: "James Hwang",
    title: "Treasurer",
    imageSrc: "/images/leadership/james-hwang.webp",
  },
  {
    name: "Datin Sri Shanice Ng",
    title: "Director",
    imageSrc: "/images/leadership/datin-sri-shanice-ng.webp",
  },
  {
    name: "Apple Teo Siew Chyi",
    title: "Director",
    imageSrc: "/images/leadership/apple-teo-siew-chyi.webp",
  },
  {
    name: "Krishnaveni Selvaraju",
    title: "Director of Education Recruitment",
    imageSrc: "/images/leadership/krishnaveni-selvaraju.webp",
  },
  {
    name: "Chooi Mee See",
    title: "Director",
    imageSrc: "/images/leadership/chooi-mee-see.webp",
  },
] as const;

const flattenedLeadershipMembers = leadershipGroups.flatMap((group) => group.members);

describe("leadershipGroups", () => {
  it("locks the canonical 10-person leadership asset package in approved order", () => {
    expect(flattenedLeadershipMembers).toHaveLength(approvedLeadershipPackage.length);
    expect(
      flattenedLeadershipMembers.map(({ name, title, imageSrc }) => ({
        name,
        title,
        imageSrc,
      })),
    ).toEqual(approvedLeadershipPackage);
  });

  it("uses the approved production portrait for Dato’ Sri Charles Hwang", () => {
    expect(leadershipGroups[1].members[0]).toMatchObject({
      name: "Dato’ Sri Charles Hwang",
      title: "Deputy Chairman",
      imageSrc: "/images/leadership/dato-sri-charles-hwang.webp",
    });
  });

  it("uses the approved production portrait for James Hwang", () => {
    expect(flattenedLeadershipMembers[5]).toMatchObject({
      name: "James Hwang",
      title: "Treasurer",
      imageSrc: "/images/leadership/james-hwang.webp",
    });
  });

  it("retains supporting profile content for every approved member", () => {
    for (const member of flattenedLeadershipMembers) {
      expect(member.bio.length).toBeGreaterThan(20);
      expect(member.expertise.length).toBeGreaterThan(0);
      expect(member.imageAlt).toContain(member.name);
    }
  });
});
