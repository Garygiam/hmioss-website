export type RecognitionCredentialGroupKey = "officialRegistration" | "congratulatoryLetters";

export type RecognitionCredentialType = "certificate" | "congratulatory-letter";

export type RecognitionV1Classification = "required" | "deferred" | "rejected";

export type RecognitionCredentialStatus = "verified" | "missing" | "pending" | "rejected";

export type RecognitionCredentialVisibility = "public" | "internal-only";

export type InstitutionalCredential = {
  credentialId: string;
  key: string;
  groupKey: RecognitionCredentialGroupKey;
  credentialType: RecognitionCredentialType;
  displayName: string;
  countryTerritory?: string;
  visibleDate?: string;
  previewSrc?: string;
  documentSrc?: string;
  imageAlt: string;
  status: RecognitionCredentialStatus;
  visibility: RecognitionCredentialVisibility;
  v1Classification: RecognitionV1Classification;
};

export type InstitutionalCredentialGroup = {
  key: RecognitionCredentialGroupKey;
  items: InstitutionalCredential[];
};

export type CongratulatoryLetter = {
  key: string;
  organization: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
};

const congratulatoryLettersBasePath = "/recognition/congratulatory-letters";
const officialRegistrationBasePath = "/documents/recognition/official-registration";

const institutionalCredentials: InstitutionalCredential[] = [
  {
    credentialId: "ROS-001",
    key: "ros-registration-certificate",
    groupKey: "officialRegistration",
    credentialType: "certificate",
    displayName: "ROS Registration Certificate",
    documentSrc: `${officialRegistrationBasePath}/ros-registration-certificate.pdf`,
    imageAlt: "ROS Registration Certificate for HMIOSS",
    status: "missing",
    visibility: "internal-only",
    v1Classification: "required",
  },
  {
    credentialId: "LETTER-001",
    key: "chinese-youth-entrepreneurs-association",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "Chinese Youth Entrepreneurs Association",
    visibleDate: "2026-05",
    previewSrc: `${congratulatoryLettersBasePath}/chinese-youth-entrepreneurs-association-2026-05.jpg`,
    documentSrc: `${congratulatoryLettersBasePath}/chinese-youth-entrepreneurs-association-2026-05.jpg`,
    imageAlt: "Congratulatory letter from Chinese Youth Entrepreneurs Association",
    status: "verified",
    visibility: "public",
    v1Classification: "required",
  },
  {
    credentialId: "LETTER-002",
    key: "holland-china-business-culture-education-association",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "Holland-China Business Culture & Education Association",
    visibleDate: "2026-05-21",
    countryTerritory: "Netherlands",
    previewSrc: `${congratulatoryLettersBasePath}/holland-china-business-culture-education-association-2026-05-21.jpg`,
    documentSrc: `${congratulatoryLettersBasePath}/holland-china-business-culture-education-association-2026-05-21.jpg`,
    imageAlt:
      "Congratulatory letter from Holland-China Business Culture & Education Association",
    status: "verified",
    visibility: "public",
    v1Classification: "required",
  },
  {
    credentialId: "LETTER-003",
    key: "zhi-gong-arts-institute",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "Zhi Gong Arts Institute",
    visibleDate: "2026-05-21",
    previewSrc: `${congratulatoryLettersBasePath}/zhi-gong-arts-institute-2026-05-21.jpg`,
    documentSrc: `${congratulatoryLettersBasePath}/zhi-gong-arts-institute-2026-05-21.jpg`,
    imageAlt: "Congratulatory letter from Zhi Gong Arts Institute",
    status: "verified",
    visibility: "public",
    v1Classification: "required",
  },
  {
    credentialId: "LETTER-004",
    key: "china-macau-zhi-gong-association",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "China (Macau) Zhi Gong Association",
    visibleDate: "2026-05-26",
    countryTerritory: "Macau",
    previewSrc: `${congratulatoryLettersBasePath}/china-macau-zhi-gong-association-2026-05-26.jpg`,
    documentSrc: `${congratulatoryLettersBasePath}/china-macau-zhi-gong-association-2026-05-26.jpg`,
    imageAlt: "Congratulatory letter from China (Macau) Zhi Gong Association",
    status: "verified",
    visibility: "public",
    v1Classification: "required",
  },
  {
    credentialId: "LETTER-007",
    key: "thayninga-institute-for-strategic-studies",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "Thayninga Institute for Strategic Studies",
    countryTerritory: "Myanmar",
    previewSrc: `${congratulatoryLettersBasePath}/thayninga-institute-for-strategic-studies.jpeg`,
    documentSrc: `${congratulatoryLettersBasePath}/thayninga-institute-for-strategic-studies.jpeg`,
    imageAlt: "Congratulatory letter from Thayninga Institute for Strategic Studies",
    status: "verified",
    visibility: "public",
    v1Classification: "required",
  },
  {
    credentialId: "LETTER-005",
    key: "tccoc-letter",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "Taiwan Chamber of Commerce in Orange County",
    imageAlt: "Congratulatory letter from Taiwan Chamber of Commerce in Orange County",
    status: "pending",
    visibility: "internal-only",
    v1Classification: "deferred",
  },
  {
    credentialId: "LETTER-006",
    key: "unidentified-congratulatory-letter",
    groupKey: "congratulatoryLetters",
    credentialType: "congratulatory-letter",
    displayName: "Unidentified congratulatory letter",
    imageAlt: "Unidentified congratulatory letter pending verification",
    status: "rejected",
    visibility: "internal-only",
    v1Classification: "rejected",
  },
];

export const institutionalCredentialGroups: InstitutionalCredentialGroup[] = [
  {
    key: "officialRegistration",
    items: institutionalCredentials.filter((item) => item.groupKey === "officialRegistration"),
  },
  {
    key: "congratulatoryLetters",
    items: institutionalCredentials.filter((item) => item.groupKey === "congratulatoryLetters"),
  },
];

export const publicInstitutionalCredentialGroups = institutionalCredentialGroups
  .map((group) => ({
    ...group,
    items: group.items.filter((item) => item.status === "verified" && item.visibility === "public"),
  }))
  .filter((group) => group.items.length > 0);

// Preserve the current page contract until Task 3 replaces the page renderer.
export const congratulatoryLetters: CongratulatoryLetter[] = [
  {
    key: "zhi-gong-arts-institute",
    organization: "Zhi Gong Arts Institute",
    date: "2026-05-21",
    imageSrc: `${congratulatoryLettersBasePath}/zhi-gong-arts-institute-2026-05-21.jpg`,
    imageAlt: "Congratulatory letter from Zhi Gong Arts Institute",
  },
  {
    key: "china-macau-zhi-gong-association",
    organization: "China (Macau) Zhi Gong Association",
    date: "2026-05-26",
    imageSrc: `${congratulatoryLettersBasePath}/china-macau-zhi-gong-association-2026-05-26.jpg`,
    imageAlt: "Congratulatory letter from China (Macau) Zhi Gong Association",
  },
  {
    key: "chinese-youth-entrepreneurs-association",
    organization: "Chinese Youth Entrepreneurs Association",
    date: "2026-05",
    imageSrc: `${congratulatoryLettersBasePath}/chinese-youth-entrepreneurs-association-2026-05.jpg`,
    imageAlt: "Congratulatory letter from Chinese Youth Entrepreneurs Association",
  },
  {
    key: "holland-china-business-culture-education-association",
    organization: "Holland-China Business Culture & Education Association",
    date: "2026-05-21",
    imageSrc: `${congratulatoryLettersBasePath}/holland-china-business-culture-education-association-2026-05-21.jpg`,
    imageAlt:
      "Congratulatory letter from Holland-China Business Culture & Education Association",
  },
  {
    key: "thayninga-institute-for-strategic-studies",
    organization: "Thayninga Institute for Strategic Studies",
    date: "Pending confirmation",
    imageSrc: `${congratulatoryLettersBasePath}/thayninga-institute-for-strategic-studies.jpeg`,
    imageAlt: "Congratulatory letter from Thayninga Institute for Strategic Studies",
  },
];
