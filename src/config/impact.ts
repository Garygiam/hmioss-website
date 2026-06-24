export type ImpactHighlight = {
  key: "leadership" | "education" | "research" | "community";
  label: string;
  summary: string;
};

export type ImpactSection = {
  key:
    | "members"
    | "branches"
    | "programmes"
    | "partnerships"
    | "communityActivities"
    | "leadershipDevelopment"
    | "events";
  title: string;
  summary: string;
  points: string[];
};

export const impactHighlights: ImpactHighlight[] = [
  {
    key: "leadership",
    label: "Leadership Development",
    summary:
      "Leadership remains the first institutional priority across programmes, partnerships, and engagement.",
  },
  {
    key: "education",
    label: "Educational Initiatives",
    summary:
      "Programmes are positioned around talent development, learning pathways, and strategic capability building.",
  },
  {
    key: "research",
    label: "Strategic Research",
    summary:
      "Research supports institutional dialogue, public understanding, and long-term capability development.",
  },
  {
    key: "community",
    label: "Community Impact",
    summary:
      "Community and national service are framed as practical outcomes of leadership and education.",
  },
];

export const impactSections: ImpactSection[] = [
  {
    key: "members",
    title: "Members",
    summary:
      "A growing institutional network connected through leadership and development pathways.",
    points: [
      "Leadership-oriented membership",
      "Structured engagement",
      "Cross-branch institutional identity",
    ],
  },
  {
    key: "branches",
    title: "Branches",
    summary:
      "A distributed institutional footprint that supports programme reach and network participation.",
    points: ["Regional presence", "Coordination capacity", "Network continuity"],
  },
  {
    key: "programmes",
    title: "Programmes",
    summary:
      "Programmes support education, capability building, and leadership formation.",
    points: ["Educational initiatives", "Strategic learning", "Practical pathways"],
  },
  {
    key: "partnerships",
    title: "Partnerships",
    summary:
      "Strategic partnerships strengthen education, defence readiness, and institutional credibility.",
    points: ["Education partners", "Defence collaboration", "Strategic ecosystem"],
  },
  {
    key: "communityActivities",
    title: "Community Activities",
    summary:
      "Community activities are framed as mission outcomes rather than standalone events.",
    points: ["Service orientation", "Public engagement", "Applied leadership"],
  },
  {
    key: "leadershipDevelopment",
    title: "Leadership Development",
    summary:
      "Leadership development is the unifying institutional objective across the site.",
    points: ["Talent development", "Capability building", "Leadership pathways"],
  },
  {
    key: "events",
    title: "Events",
    summary:
      "Events demonstrate institutional activity, community engagement, and partnership momentum.",
    points: ["Forums", "Programmes", "Strategic visits"],
  },
];
