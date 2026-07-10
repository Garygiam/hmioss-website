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

export const leadershipGroups: LeadershipGroup[] = [
  {
    key: "president",
    eyebrow: "Tier 1",
    title: "Chairman",
    description: "Strategic and institutional leadership for the institute.",
    members: [
      {
        name: "Young Shang Yi",
        title: "Chairman",
        bio: "Provides strategic direction and institutional leadership for HMIOSS development and long-term partnership growth.",
        expertise: [
          "Institution Building",
          "Leadership Development",
          "Strategic Partnerships",
        ],
        imageSrc: "/images/leadership/young-shang-yi.webp",
        imageAlt: "Portrait of Young Shang Yi, Chairman of HMIOSS",
      },
    ],
  },
  {
    key: "deputyPresidents",
    eyebrow: "Tier 2",
    title: "Deputy Chairman and Vice Presidents",
    description: "Executive leadership supporting governance, strategy, and institutional delivery.",
    members: [
      {
        name: "Dato’ Sri Charles Hwang",
        title: "Deputy Chairman",
        bio: "Supports institutional governance and strategic alignment to strengthen long-term leadership outcomes.",
        expertise: [
          "Institutional Strategy",
          "Governance Stewardship",
          "Executive Coordination",
        ],
        imageSrc: "/images/leadership/dato-sri-charles-hwang.webp",
        imageAlt: "Portrait of Dato’ Sri Charles Hwang, Deputy Chairman of HMIOSS",
      },
      {
        name: "Gary Giam",
        title: "Vice President",
        bio: "Supports strategic planning and programme execution to translate institutional priorities into sustained action.",
        expertise: ["Strategic Planning", "Programme Execution", "Institutional Operations"],
        imageSrc: "/images/leadership/gary-giam.webp",
        imageAlt: "Portrait of Gary Giam, Vice President of HMIOSS",
      },
      {
        name: "Dato’ Henry Lee",
        title: "Vice President",
        bio: "Supports executive stewardship and institutional strategy with a focus on disciplined governance execution.",
        expertise: [
          "Institutional Strategy",
          "Strategic Planning",
          "Governance Stewardship",
        ],
        imageSrc: "/images/leadership/dato-henry-lee.webp",
        imageAlt: "Portrait of Dato’ Henry Lee, Vice President of HMIOSS",
      },
    ],
  },
  {
    key: "secretaryGeneral",
    eyebrow: "Tier 3",
    title: "Secretary General and Treasurer",
    description: "Core governance administration and financial stewardship for the leadership council.",
    members: [
      {
        name: "Prof. Dr. Vincent Wee Eng Kim",
        title: "Secretary General",
        bio: "Oversees governance administration, institutional coordination, and disciplined execution across leadership priorities.",
        expertise: ["Governance Administration", "Institutional Coordination", "Strategic Execution"],
        imageSrc: "/images/leadership/prof-vincent-wee-eng-kim.webp",
        imageAlt: "Portrait of Prof. Dr. Vincent Wee Eng Kim, Secretary General of HMIOSS",
      },
      {
        name: "James Hwang",
        title: "Treasurer",
        bio: "Leads treasury governance and financial discipline to support sustainable institutional operations.",
        expertise: ["Financial Oversight", "Treasury Governance", "Institutional Stewardship"],
        imageSrc: "/images/leadership/james-hwang.webp",
        imageAlt: "Portrait of James Hwang, Treasurer of HMIOSS",
      },
    ],
  },
  {
    key: "directors",
    eyebrow: "Tier 4",
    title: "Directors",
    description: "Functional leaders responsible for programmes, partnerships, and education advancement.",
    members: [
      {
        name: "Datin Sri Shanice Ng",
        title: "Director",
        bio: "Leads external engagement and strategic collaboration to strengthen institutional partnerships and trust.",
        expertise: [
          "External Affairs",
          "Partnership Development",
          "Stakeholder Engagement",
        ],
        imageSrc: "/images/leadership/datin-sri-shanice-ng.webp",
        imageAlt: "Portrait of Datin Sri Shanice Ng, Director of HMIOSS",
      },
      {
        name: "Apple Teo Siew Chyi",
        title: "Director",
        bio: "Supports institutional programme leadership and operations to improve delivery outcomes and engagement quality.",
        expertise: [
          "Programme Leadership",
          "Operational Delivery",
          "Community Engagement",
        ],
        imageSrc: "/images/leadership/apple-teo-siew-chyi.webp",
        imageAlt: "Portrait of Apple Teo Siew Chyi, Director of HMIOSS",
      },
      {
        name: "Krishnaveni Selvaraju",
        title: "Director of Education Recruitment",
        bio: "Leads education recruitment strategy to expand institutional talent pathways and programme participation.",
        expertise: [
          "Education Recruitment",
          "Talent Pathways",
          "Stakeholder Development",
        ],
        imageSrc: "/images/leadership/krishnaveni-selvaraju.webp",
        imageAlt: "Portrait of Krishnaveni Selvaraju, Director of Education Recruitment of HMIOSS",
      },
      {
        name: "Chooi Mee See",
        title: "Director",
        bio: "Supports institutional initiatives through director-level coordination, planning, and cross-functional collaboration.",
        expertise: [
          "Institutional Coordination",
          "Strategic Planning",
          "Cross-Functional Delivery",
        ],
        imageSrc: "/images/leadership/chooi-mee-see.webp",
        imageAlt: "Portrait of Chooi Mee See, Director of HMIOSS",
      },
    ],
  },
];
