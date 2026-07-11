import type { Locale } from "@/config/i18n";
import { buildLocalizedPath } from "@/lib/locale";

export type InstitutionalHistoryEventType =
  | "Partnership"
  | "Programme"
  | "Leadership"
  | "Recognition"
  | "Academic"
  | "Community";

export type InstitutionalHistoryPublishStatus = "draft" | "published";

export type InstitutionalHistoryLinkStatus = "linked" | "metadata-only";

export type LocalizedText = Record<Locale, string>;

export type InstitutionalHistoryReference = {
  entityId: string;
  entityType: "partner" | "programme" | "leader" | "recognition" | "event";
  labelByLocale: LocalizedText;
  linkStatus: InstitutionalHistoryLinkStatus;
};

export type InstitutionalHistoryGalleryAsset = {
  assetId: string;
  imageSrc: string;
  thumbnailSrc: string;
  captionByLocale: LocalizedText;
  altByLocale: LocalizedText;
  photographer?: string;
  displayOrder: number;
  publishStatus: InstitutionalHistoryPublishStatus;
};

export type InstitutionalHistoryEvent = {
  id: string;
  slug: string;
  title: string;
  primaryEventType: InstitutionalHistoryEventType;
  date: string;
  location?: string;
  summary: LocalizedText;
  outcomes: LocalizedText[];
  partners: InstitutionalHistoryReference[];
  programmes: InstitutionalHistoryReference[];
  recognitions: InstitutionalHistoryReference[];
  leaders: InstitutionalHistoryReference[];
  gallery: InstitutionalHistoryGalleryAsset[];
  relatedEvents: InstitutionalHistoryReference[];
  coverImage: InstitutionalHistoryGalleryAsset;
  displayOrder: number;
  publishStatus: InstitutionalHistoryPublishStatus;
  isFeatured: boolean;
};

const genovasiGallery: InstitutionalHistoryGalleryAsset[] = [
  {
    assetId: "genovasi-mou-001",
    imageSrc: "/images/history/genovasi-university-mou-signing/genovasi-mou-001.jpg",
    thumbnailSrc:
      "/images/history/genovasi-university-mou-signing/thumbnails/genovasi-mou-001.jpg",
    captionByLocale: {
      en: "HMIOSS and Genovasi representatives formalize the partnership agreement.",
      ms: "Wakil HMIOSS dan Genovasi memformalkan perjanjian kerjasama.",
      "zh-CN": "HMIOSS 与 Genovasi 代表正式签署合作协议。",
      "zh-TW": "HMIOSS 與 Genovasi 代表正式簽署合作協議。",
    },
    altByLocale: {
      en: "HMIOSS and Genovasi representatives during the MOU signing ceremony",
      ms: "Wakil HMIOSS dan Genovasi semasa majlis menandatangani MOU",
      "zh-CN": "HMIOSS 与 Genovasi 代表在 MOU 签署仪式上",
      "zh-TW": "HMIOSS 與 Genovasi 代表於 MOU 簽署儀式上",
    },
    displayOrder: 1,
    publishStatus: "published",
  },
  {
    assetId: "genovasi-mou-002",
    imageSrc: "/images/history/genovasi-university-mou-signing/genovasi-mou-002.jpg",
    thumbnailSrc:
      "/images/history/genovasi-university-mou-signing/thumbnails/genovasi-mou-002.jpg",
    captionByLocale: {
      en: "Institutional leaders meet during the partnership milestone.",
      ms: "Pemimpin institusi bertemu semasa pencapaian kerjasama ini.",
      "zh-CN": "机构领导在此次合作里程碑活动中会面。",
      "zh-TW": "機構領導於此次合作里程碑活動中會面。",
    },
    altByLocale: {
      en: "Institutional leaders gathered at the Genovasi partnership event",
      ms: "Pemimpin institusi berkumpul pada acara kerjasama Genovasi",
      "zh-CN": "机构领导出席 Genovasi 合作活动",
      "zh-TW": "機構領導出席 Genovasi 合作活動",
    },
    displayOrder: 2,
    publishStatus: "published",
  },
  {
    assetId: "genovasi-mou-003",
    imageSrc: "/images/history/genovasi-university-mou-signing/genovasi-mou-003.jpg",
    thumbnailSrc:
      "/images/history/genovasi-university-mou-signing/thumbnails/genovasi-mou-003.jpg",
    captionByLocale: {
      en: "A supporting moment from the formal signing sequence.",
      ms: "Momen sokongan daripada urutan penandatanganan rasmi.",
      "zh-CN": "正式签署流程中的辅助画面。",
      "zh-TW": "正式簽署流程中的輔助畫面。",
    },
    altByLocale: {
      en: "Supporting moment from the Genovasi MOU signing sequence",
      ms: "Momen sokongan daripada urutan menandatangani MOU Genovasi",
      "zh-CN": "Genovasi MOU 签署流程中的辅助画面",
      "zh-TW": "Genovasi MOU 簽署流程中的輔助畫面",
    },
    displayOrder: 3,
    publishStatus: "published",
  },
  {
    assetId: "genovasi-mou-004",
    imageSrc: "/images/history/genovasi-university-mou-signing/genovasi-mou-004.jpg",
    thumbnailSrc:
      "/images/history/genovasi-university-mou-signing/thumbnails/genovasi-mou-004.jpg",
    captionByLocale: {
      en: "Closing moment documenting the institutional partnership event.",
      ms: "Momen penutup yang mendokumentasikan acara kerjasama institusi ini.",
      "zh-CN": "记录此次机构合作活动的收尾画面。",
      "zh-TW": "記錄此次機構合作活動的收尾畫面。",
    },
    altByLocale: {
      en: "Closing moment from the HMIOSS and Genovasi institutional event",
      ms: "Momen penutup daripada acara institusi HMIOSS dan Genovasi",
      "zh-CN": "HMIOSS 与 Genovasi 机构活动的收尾画面",
      "zh-TW": "HMIOSS 與 Genovasi 機構活動的收尾畫面",
    },
    displayOrder: 4,
    publishStatus: "published",
  },
];

export const institutionalEvents: InstitutionalHistoryEvent[] = [
  {
    id: "event-2026-genovasi-university-mou-signing",
    slug: "genovasi-university-mou-signing",
    title: "Genovasi University MOU Signing",
    primaryEventType: "Partnership",
    date: "2026-07-10",
    location: "Kuala Lumpur",
    summary: {
      en: "HMIOSS formalized a partnership milestone with Genovasi University as part of its growing institutional development.",
      ms: "HMIOSS memformalkan pencapaian kerjasama dengan Genovasi University sebagai sebahagian daripada perkembangan institusinya.",
      "zh-CN": "HMIOSS 与 Genovasi University 正式达成合作里程碑，体现其持续发展的机构建设方向。",
      "zh-TW": "HMIOSS 與 Genovasi University 正式達成合作里程碑，體現其持續發展的機構建設方向。",
    },
    outcomes: [
      {
        en: "Documents the institutional partnership between HMIOSS and Genovasi University.",
        ms: "Mendokumentasikan kerjasama institusi antara HMIOSS dan Genovasi University.",
        "zh-CN": "记录 HMIOSS 与 Genovasi University 之间的机构合作关系。",
        "zh-TW": "記錄 HMIOSS 與 Genovasi University 之間的機構合作關係。",
      },
      {
        en: "Connects partnership development with the Dual Credential Programme pathway.",
        ms: "Menghubungkan pembangunan kerjasama dengan laluan Dual Credential Programme.",
        "zh-CN": "将合作发展与 Dual Credential Programme 路径连接起来。",
        "zh-TW": "將合作發展與 Dual Credential Programme 路徑連結起來。",
      },
    ],
    partners: [
      {
        entityId: "partner-genovasi-university",
        entityType: "partner",
        labelByLocale: {
          en: "Genovasi University",
          ms: "Genovasi University",
          "zh-CN": "Genovasi University",
          "zh-TW": "Genovasi University",
        },
        linkStatus: "linked",
      },
    ],
    programmes: [
      {
        entityId: "programme-dual-credential",
        entityType: "programme",
        labelByLocale: {
          en: "Dual Credential Programme",
          ms: "Program Dual Credential",
          "zh-CN": "双证课程",
          "zh-TW": "雙證課程",
        },
        linkStatus: "linked",
      },
    ],
    recognitions: [],
    leaders: [
      {
        entityId: "leader-gary-giam",
        entityType: "leader",
        labelByLocale: {
          en: "Gary Giam",
          ms: "Gary Giam",
          "zh-CN": "Gary Giam",
          "zh-TW": "Gary Giam",
        },
        linkStatus: "metadata-only",
      },
    ],
    gallery: genovasiGallery,
    relatedEvents: [],
    coverImage: genovasiGallery[0],
    displayOrder: 1,
    publishStatus: "published",
    isFeatured: true,
  },
];

export const publishedInstitutionalEvents = institutionalEvents
  .filter((event) => event.publishStatus === "published")
  .sort(
    (left, right) =>
      right.date.localeCompare(left.date) || left.displayOrder - right.displayOrder,
  );

export const featuredInstitutionalEvent =
  publishedInstitutionalEvents.find((event) => event.isFeatured) ?? null;

const canonicalInstitutionalReferenceRoutes: Record<
  InstitutionalHistoryReference["entityType"],
  string | null
> = {
  partner: "/partners",
  programme: "/programmes",
  leader: "/leadership",
  recognition: "/recognition",
  event: "/institutional-history",
};

export function resolveInstitutionalReferenceHref(
  reference: InstitutionalHistoryReference,
  locale: Locale,
): string | null {
  if (reference.linkStatus !== "linked") {
    return null;
  }

  const canonicalPath = canonicalInstitutionalReferenceRoutes[reference.entityType];

  if (!canonicalPath) {
    return null;
  }

  return buildLocalizedPath(locale, canonicalPath);
}

export const institutionalEventTimeline = Array.from(
  publishedInstitutionalEvents.reduce((map, event) => {
    const year = Number(event.date.slice(0, 4));
    const existing = map.get(year) ?? [];

    existing.push(event);
    map.set(year, existing);

    return map;
  }, new Map<number, InstitutionalHistoryEvent[]>()),
)
  .sort((left, right) => right[0] - left[0])
  .map(([year, events]) => ({
    year,
    events: events.sort(
      (left, right) =>
        right.date.localeCompare(left.date) || left.displayOrder - right.displayOrder,
    ),
  }));
