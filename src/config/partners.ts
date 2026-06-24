export type PartnershipOpportunityCategory = {
  key:
    | "universities"
    | "trainingProviders"
    | "industryPartners"
    | "defenceSecurityPartners"
    | "communityOrganisations"
    | "csrPartners";
  title: string;
  summary: string;
  collaborationModes: string[];
  value: string;
};

export const homepagePartnershipCategories: PartnershipOpportunityCategory[] = [
  {
    key: "universities",
    title: "Universities",
    summary:
      "Academic collaboration that strengthens talent development and qualification pathways.",
    collaborationModes: ["Academic partnerships", "Talent pipelines"],
    value:
      "Connect formal education with leadership development and future-ready pathways.",
  },
  {
    key: "trainingProviders",
    title: "Training Providers",
    summary:
      "Specialist providers that expand applied learning and professional readiness.",
    collaborationModes: ["Co-delivered training", "Capability workshops"],
    value: "Add practical skills and industry-aligned learning experiences.",
  },
  {
    key: "industryPartners",
    title: "Industry Partners",
    summary:
      "Industry collaborations that improve exposure, employability, and real-world understanding.",
    collaborationModes: ["Internships", "Industry visits"],
    value: "Create career visibility and professional relevance for students.",
  },
  {
    key: "defenceSecurityPartners",
    title: "Defence & Security Partners",
    summary:
      "Structured partnerships that strengthen discipline, resilience, and operational awareness.",
    collaborationModes: ["Preparedness programmes", "Applied exposure"],
    value: "Support leadership growth through high-discipline environments.",
  },
  {
    key: "communityOrganisations",
    title: "Community Organisations",
    summary:
      "Community-linked collaborations that turn leadership training into visible public contribution.",
    collaborationModes: ["Service projects", "Community leadership initiatives"],
    value: "Translate education into practical civic impact.",
  },
  {
    key: "csrPartners",
    title: "CSR Partners",
    summary:
      "CSR-aligned organisations that want to support youth development and leadership pathways.",
    collaborationModes: ["Sponsored programmes", "Impact partnerships"],
    value:
      "Connect institutional development goals with measurable social outcomes.",
  },
];

export const partnerOpportunityCategories = homepagePartnershipCategories.map(
  (item) => ({
    ...item,
    collaborationModes: [...item.collaborationModes],
  }),
);
