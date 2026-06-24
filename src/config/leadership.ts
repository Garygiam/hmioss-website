export type LeadershipMember = {
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  imageSrc: string;
  imageAlt: string;
};

export type LeadershipGroup = {
  key: "president" | "deputyPresidents" | "secretaryGeneral" | "directors";
  eyebrow: string;
  title: string;
  description: string;
  members: LeadershipMember[];
};

function createPortraitImage(prompt: string) {
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=portrait_4_3`;
}

export const leadershipGroups: LeadershipGroup[] = [
  {
    key: "president",
    eyebrow: "Tier 1",
    title: "President",
    description: "Strategic and institutional leadership for the institute.",
    members: [
      {
        name: "Young Shang Yi",
        title: "President / Founder",
        bio: "Provides founding vision for HMIOSS with a focus on leadership development, institutional credibility, and long-term strategic partnerships.",
        expertise: [
          "Institution Building",
          "Leadership Development",
          "Strategic Partnerships",
        ],
        imageSrc: createPortraitImage(
          "formal studio portrait of an asian institutional founder in a navy suit, confident expression, premium editorial photography, neutral background",
        ),
        imageAlt: "Portrait of Young Shang Yi, President and Founder of HMIOSS",
      },
    ],
  },
  {
    key: "deputyPresidents",
    eyebrow: "Tier 2",
    title: "Deputy Presidents",
    description: "Executive support for governance, strategy, and institutional stewardship.",
    members: [
      {
        name: "Datuk Henry Lee",
        title: "Deputy President",
        bio: "Supports institutional strategy and executive stewardship to align HMIOSS priorities with long-term leadership outcomes and governance discipline.",
        expertise: [
          "Institutional Strategy",
          "Strategic Planning",
          "Governance Stewardship",
        ],
        imageSrc: createPortraitImage(
          "formal portrait of a distinguished malaysian deputy president in a navy business suit, authoritative editorial lighting, premium institutional photography",
        ),
        imageAlt: "Portrait of Datuk Henry Lee, Deputy President of HMIOSS",
      },
      {
        name: "Gary Giam",
        title: "Deputy President",
        bio: "Supports executive coordination, strategic planning, and programme execution to translate HMIOSS priorities into sustained institutional action.",
        expertise: ["Strategic Planning", "Programme Execution", "Institutional Operations"],
        imageSrc: createPortraitImage(
          "formal portrait of a malaysian deputy president in a navy business suit, professional editorial lighting, credible institutional photography",
        ),
        imageAlt: "Portrait of Gary Giam, Deputy President of HMIOSS",
      },
    ],
  },
  {
    key: "secretaryGeneral",
    eyebrow: "Tier 3",
    title: "Secretary-General",
    description: "Governance administration and institutional coordination for the leadership council.",
    members: [
      {
        name: "Prof. Dr. Vincent Wee Eng Kim",
        title: "Secretary-General",
        bio: "Oversees governance administration, institutional coordination, and disciplined execution across leadership priorities and official correspondence.",
        expertise: ["Governance Administration", "Institutional Coordination", "Strategic Execution"],
        imageSrc: createPortraitImage(
          "formal portrait of an asian secretary-general in a suit, scholarly and credible, premium institutional editorial photography, neutral background",
        ),
        imageAlt: "Portrait of Prof. Dr. Vincent Wee Eng Kim, Secretary-General of HMIOSS",
      },
    ],
  },
  {
    key: "directors",
    eyebrow: "Tier 3",
    title: "Directors",
    description: "Functional leaders responsible for programmes, strategy, research, and partnerships.",
    members: [
      {
        name: "Mee See Chooi",
        title: "Director of Research & Publications",
        bio: "Guides research themes and publication priorities that strengthen public understanding, institutional dialogue, and knowledge development.",
        expertise: [
          "Research Leadership",
          "Publications",
          "Knowledge Development",
        ],
        imageSrc: createPortraitImage(
          "formal portrait of an asian research director in professional attire, refined institutional editorial style, soft studio light",
        ),
        imageAlt: "Portrait of Mee See Chooi, Director of Research and Publications",
      },
      {
        name: "Datin Sri Shanice Ng",
        title: "Director of External Affairs & Partnerships",
        bio: "Leads partner engagement and external relations that expand HMIOSS visibility, trust, and collaboration across strategic communities.",
        expertise: [
          "External Affairs",
          "Partnership Development",
          "Stakeholder Engagement",
        ],
        imageSrc: createPortraitImage(
          "formal portrait of an asian external affairs director in elegant business attire, premium editorial photography, confident professional pose",
        ),
        imageAlt:
          "Portrait of Datin Sri Shanice Ng, Director of External Affairs and Partnerships",
      },
    ],
  },
];
