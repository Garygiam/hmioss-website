export type ProgrammeBenefit = {
  title: string;
  summary: string;
};

export type CareerPathwayStep = {
  key: string;
  title: string;
  description: string;
};

export type ProgrammeCtaAction = {
  label: string;
  href: string;
};

export type ProgrammeCta = {
  eyebrow: string;
  title: string;
  description: string;
  actions: ProgrammeCtaAction[];
};

export type ProgrammeFeatureSection = {
  title: string;
  description: string;
  points: string[];
};

export type ProgrammeChecklistSection = {
  title: string;
  description: string;
  items: string[];
};

export const programmeBenefits: ProgrammeBenefit[] = [
  {
    title: "Leadership Formation",
    summary:
      "Build leadership discipline through structured learning, mentorship, and guided responsibility.",
  },
  {
    title: "Education Pathways",
    summary:
      "Combine academic development with practical exposure to institutional, civic, and professional settings.",
  },
  {
    title: "Strategic Thinking",
    summary:
      "Strengthen decision-making, problem-solving, and applied analysis through real-world programme activities.",
  },
  {
    title: "Professional Readiness",
    summary:
      "Prepare for future roles with skills that support security, operations, partnerships, and community service.",
  },
  {
    title: "Community Contribution",
    summary:
      "Translate learning into public impact through service, teamwork, and mission-oriented engagement.",
  },
];

export const careerPathwaySteps: CareerPathwayStep[] = [
  {
    key: "explore",
    title: "Explore The Pathway",
    description:
      "Understand how HMIOSS programmes align leadership development with education and service.",
  },
  {
    key: "enrol",
    title: "Enrol And Learn",
    description:
      "Enter a structured programme journey with guided learning, capability building, and practical exposure.",
  },
  {
    key: "apply",
    title: "Apply Skills In Practice",
    description:
      "Use programme experience in institutional projects, operational settings, and community engagement.",
  },
  {
    key: "advance",
    title: "Advance With Purpose",
    description:
      "Progress into wider leadership, professional, and partnership opportunities with a service mindset.",
  },
];

export const outcomesAndOpportunities = [
  "Leadership Skills",
  "Strategic Communication",
  "Operational Awareness",
  "Community Engagement Experience",
  "Partnership Exposure",
];

export const flagshipProgramme = {
  eyebrow: "Flagship Opportunity",
  title: "Launch Your Leadership Journey",
  strapline:
    "One Academic Qualification. One Professional Qualification. One Integrated Career Pathway.",
  positioning: [
    "Leadership Development",
    "Career Development",
    "Industry Exposure",
    "Academic Qualification",
    "Professional Qualification",
  ],
};

export const flagshipProgrammeOutcomes = [
  "Leadership Skills",
  "Industry Exposure",
  "Mentorship",
  "Professional Recognition",
  "Career Progression",
];

export const flagshipProgrammePathway = [
  {
    key: "student",
    title: "Student",
    description: "Begin with a clear pathway into leadership and opportunity.",
  },
  {
    key: "training",
    title: "Training",
    description:
      "Build capability through integrated academic and professional learning.",
  },
  {
    key: "industryExposure",
    title: "Industry Exposure",
    description: "Gain applied understanding through partner-linked environments.",
  },
  {
    key: "leadershipDevelopment",
    title: "Leadership Development",
    description:
      "Strengthen discipline, responsibility, and real-world readiness.",
  },
  {
    key: "careerOpportunities",
    title: "Career Opportunities",
    description: "Progress into clearer next-step pathways after completion.",
  },
];

export const flagshipProgrammeSections: {
  whyThisProgramme: ProgrammeFeatureSection;
  industryExposure: ProgrammeFeatureSection;
  roleOfHmioss: ProgrammeFeatureSection;
  roleOfGenovasi: ProgrammeFeatureSection;
  entryRequirements: ProgrammeChecklistSection;
} = {
  whyThisProgramme: {
    title: "Why This Programme",
    description:
      "This flagship pathway turns study into a clearer leadership and career opportunity journey.",
    points: [
      "Leadership development with real-world relevance",
      "Career-aligned learning that connects study with opportunity",
      "A dual-credential structure that adds academic and professional value",
    ],
  },
  industryExposure: {
    title: "Industry Exposure",
    description:
      "Students build confidence through structured exposure to real operational and professional environments.",
    points: [
      "Partner-linked environments",
      "Professional awareness",
      "Applied learning context",
    ],
  },
  roleOfHmioss: {
    title: "Role of HMIOSS",
    description:
      "HMIOSS anchors the programme in leadership formation, mentorship, and institutional belonging.",
    points: [
      "Leadership development",
      "Mentorship environment",
      "Institutional identity",
      "Community engagement",
    ],
  },
  roleOfGenovasi: {
    title: "Role of Genovasi",
    description:
      "Genovasi supports the academic pathway with recognised structure, standards, and learning delivery.",
    points: [
      "Academic qualification pathway",
      "Educational structure and standards",
      "Formal learning support",
    ],
  },
  entryRequirements: {
    title: "Entry Requirements",
    description:
      "The programme is designed for motivated applicants who want structured growth and recognised progression.",
    items: [
      "SPM 3 credits or equivalent",
      "Commitment to leadership and learning",
      "Interest in structured development pathways",
    ],
  },
};

export const programmesCta: ProgrammeCta = {
  eyebrow: "Ready To Apply",
  title: "Apply Now",
  description:
    "Start your HMIOSS leadership journey or speak with the team to confirm the right next step for your goals.",
  actions: [
    { label: "Apply Now", href: "/join" },
    { label: "Request Information", href: "/contact" },
    { label: "Speak With Us", href: "/contact" },
  ],
};
