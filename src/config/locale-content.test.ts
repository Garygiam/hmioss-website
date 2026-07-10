import { createRequire } from "node:module";

import { describe, expect, it } from "vitest";

import { impactHighlights, impactSections } from "@/config/impact";

import enAbout from "../../public/locales/en/about.json";
import enCommon from "../../public/locales/en/common.json";
import enHome from "../../public/locales/en/home.json";
import enImpact from "../../public/locales/en/impact.json";
import enPages from "../../public/locales/en/pages.json";
import enRecognition from "../../public/locales/en/recognition.json";
import msAbout from "../../public/locales/ms/about.json";
import msCommon from "../../public/locales/ms/common.json";
import msHome from "../../public/locales/ms/home.json";
import msImpact from "../../public/locales/ms/impact.json";
import msPages from "../../public/locales/ms/pages.json";
import msRecognition from "../../public/locales/ms/recognition.json";
import zhCnAbout from "../../public/locales/zh-CN/about.json";
import zhCnCommon from "../../public/locales/zh-CN/common.json";
import zhCnHome from "../../public/locales/zh-CN/home.json";
import zhCnImpact from "../../public/locales/zh-CN/impact.json";
import zhCnPages from "../../public/locales/zh-CN/pages.json";
import zhCnRecognition from "../../public/locales/zh-CN/recognition.json";
import zhTwAbout from "../../public/locales/zh-TW/about.json";
import zhTwCommon from "../../public/locales/zh-TW/common.json";
import zhTwHome from "../../public/locales/zh-TW/home.json";
import zhTwImpact from "../../public/locales/zh-TW/impact.json";
import zhTwPages from "../../public/locales/zh-TW/pages.json";
import zhTwRecognition from "../../public/locales/zh-TW/recognition.json";

import enMission from "../../public/locales/en/mission.json";
import msMission from "../../public/locales/ms/mission.json";
import zhCnMission from "../../public/locales/zh-CN/mission.json";
import zhTwMission from "../../public/locales/zh-TW/mission.json";

const require = createRequire(import.meta.url);
const nextI18NextConfig = require("../../next-i18next.config.js") as {
  ns: string[];
};

const localeBundles = {
  en: {
    about: enAbout,
    common: enCommon,
    home: enHome,
    impact: enImpact,
    mission: enMission,
    pages: enPages,
    recognition: enRecognition,
  },
  ms: {
    about: msAbout,
    common: msCommon,
    home: msHome,
    impact: msImpact,
    mission: msMission,
    pages: msPages,
    recognition: msRecognition,
  },
  "zh-CN": {
    about: zhCnAbout,
    common: zhCnCommon,
    home: zhCnHome,
    impact: zhCnImpact,
    mission: zhCnMission,
    pages: zhCnPages,
    recognition: zhCnRecognition,
  },
  "zh-TW": {
    about: zhTwAbout,
    common: zhTwCommon,
    home: zhTwHome,
    impact: zhTwImpact,
    mission: zhTwMission,
    pages: zhTwPages,
    recognition: zhTwRecognition,
  },
} as const;

const phaseOneStatKeys = [
  "partnerships",
  "programmes",
  "education",
  "community",
  "network",
] as const;

describe("phase 1 locale messaging", () => {
  it("registers the impact namespace for the page router", () => {
    expect(nextI18NextConfig.ns).toContain("impact");
  });

  it("registers the recognition namespace for the page router", () => {
    expect(nextI18NextConfig.ns).toContain("recognition");
  });

  it("keeps the impact content counts stable for locale alignment", () => {
    expect(impactHighlights).toHaveLength(4);
    expect(impactSections).toHaveLength(7);
  });

  it.each(Object.entries(localeBundles))(
    "%s adds impact navigation and credibility metric labels",
    (_locale, bundle) => {
      expect(bundle.common.nav.impact).toEqual(expect.any(String));
      expect(bundle.common.nav.recognition).toEqual(expect.any(String));

      for (const key of phaseOneStatKeys) {
        expect(bundle.common.stats[key]).toEqual(expect.any(String));
      }
    },
  );

  it.each(Object.entries(localeBundles))(
    "%s extends home messaging with authority, pillars, and institutional vision content",
    (_locale, bundle) => {
      expect(bundle.home.authority.eyebrow).toEqual(expect.any(String));
      expect(bundle.home.authority.title).toEqual(expect.any(String));
      expect(bundle.home.authority.summary).toEqual(expect.any(String));
      expect(bundle.home.authority.items).toHaveLength(5);
      expect(bundle.home.metrics.eyebrow).toEqual(expect.any(String));
      expect(bundle.home.metrics.title).toEqual(expect.any(String));
      expect(bundle.home.metrics.description).toEqual(expect.any(String));
      expect(bundle.home.metrics.items).toHaveLength(5);
      expect(bundle.home.pillars.title).toEqual(expect.any(String));
      expect(bundle.home.pillars.items.length).toBeGreaterThanOrEqual(3);
      expect(bundle.home.vision.eyebrow).toEqual(expect.any(String));
      expect(bundle.home.vision.quote).toEqual(expect.any(String));
      expect(bundle.home.vision.cta).toEqual(expect.any(String));
    },
  );

  it.each(Object.entries(localeBundles))(
    "%s includes page metadata for the new impact route",
    (_locale, bundle) => {
      expect(bundle.pages.impact.title).toEqual(expect.any(String));
      expect(bundle.pages.impact.subtitle).toEqual(expect.any(String));
    },
  );

  it.each(Object.entries(localeBundles))(
    "%s includes page metadata for the recognition route",
    (_locale, bundle) => {
      expect(bundle.pages.recognition.title).toEqual(expect.any(String));
      expect(bundle.pages.recognition.subtitle).toEqual(expect.any(String));
      expect(bundle.recognition.sectionTitle).toEqual(expect.any(String));
      expect(bundle.recognition.sectionDescription).toEqual(expect.any(String));
      expect(bundle.recognition.groups.officialRegistration.title).toEqual(expect.any(String));
      expect(bundle.recognition.groups.officialRegistration.description).toEqual(expect.any(String));
      expect(bundle.recognition.groups.officialRegistration.viewCredential).toEqual(expect.any(String));
      expect(bundle.recognition.groups.congratulatoryLetters.title).toEqual(expect.any(String));
      expect(bundle.recognition.groups.congratulatoryLetters.description).toEqual(expect.any(String));
      expect(bundle.recognition.groups.congratulatoryLetters.viewCredential).toEqual(expect.any(String));
      expect(bundle.recognition.labels.date).toEqual(expect.any(String));
      expect(bundle.recognition.labels.country).toEqual(expect.any(String));
      expect(bundle.recognition.labels.documentType).toEqual(expect.any(String));
    },
  );

  it.each(Object.entries(localeBundles))(
    "%s includes structured about timeline and focus area copy",
    (_locale, bundle) => {
      expect(bundle.about.timeline.items.length).toBeGreaterThanOrEqual(3);
      expect(bundle.about.focusAreas.title).toEqual(expect.any(String));
      expect(bundle.about.focusAreas.items.length).toBeGreaterThanOrEqual(3);
    },
  );

  it.each(Object.entries(localeBundles))(
    "%s includes strategic priorities for the mission page",
    (_locale, bundle) => {
      expect(bundle.mission.prioritiesTitle).toEqual(expect.any(String));
      expect(bundle.mission.priorities.length).toBeGreaterThanOrEqual(3);
    },
  );

  it.each(Object.entries(localeBundles))(
    "%s aligns impact locale keys with the shared impact content model",
    (_locale, bundle) => {
      expect(Object.keys(bundle.impact.highlights)).toEqual(
        impactHighlights.map((item) => item.key),
      );
      expect(Object.keys(bundle.impact.sections)).toEqual(
        impactSections.map((section) => section.key),
      );
      expect(bundle.impact.cta.primary).toEqual(expect.any(String));
      expect(bundle.impact.cta.secondary).toEqual(expect.any(String));
    },
  );

  it("adds the planned English Phase 2 flagship programme copy", () => {
    expect(localeBundles.en.home.flagship.title).toBe(
      "Launch Your Leadership Journey",
    );
    expect(localeBundles.en.home.flagship.pathway).toHaveLength(5);
    expect(localeBundles.en.home.partnershipSummary.categories).toHaveLength(6);
    expect(localeBundles.en.pages.programmes.primaryCta).toBe(
      "Apply for Programme",
    );
  });

  it.each(Object.entries(localeBundles))(
    "%s includes Phase 2 homepage and programmes conversion messaging",
    (_locale, bundle) => {
      expect(bundle.home.flagship.eyebrow).toEqual(expect.any(String));
      expect(bundle.home.flagship.strapline).toEqual(expect.any(String));
      expect(bundle.home.flagship.description).toEqual(expect.any(String));
      expect(bundle.home.flagship.outcomesTitle).toEqual(expect.any(String));
      expect(bundle.home.flagship.positioning).toHaveLength(5);
      expect(bundle.home.flagship.outcomes).toHaveLength(5);
      expect(bundle.home.flagship.pathwayTitle).toEqual(expect.any(String));
      expect(bundle.home.flagship.pathway).toHaveLength(5);
      expect(bundle.home.flagship.ctaPrimary).toEqual(expect.any(String));
      expect(bundle.home.flagship.ctaSecondary).toEqual(expect.any(String));

      expect(bundle.home.partnershipSummary.title).toEqual(expect.any(String));
      expect(bundle.home.partnershipSummary.description).toEqual(
        expect.any(String),
      );
      expect(bundle.home.partnershipSummary.cta).toEqual(expect.any(String));
      expect(bundle.home.partnershipSummary.categories).toHaveLength(6);

      expect(bundle.home.finalCta.title).toEqual(expect.any(String));
      expect(bundle.home.finalCta.primary).toEqual(expect.any(String));
      expect(bundle.home.finalCta.secondary).toEqual(expect.any(String));
      expect(bundle.home.finalCta.tertiary).toEqual(expect.any(String));

      expect(bundle.pages.programmes.primaryCta).toEqual(expect.any(String));
      expect(bundle.pages.programmes.secondaryCta).toEqual(expect.any(String));
      expect(bundle.pages.programmes.tertiaryCta).toEqual(expect.any(String));
      expect(bundle.pages.programmes.phase2.heroBody).toEqual(expect.any(String));
      expect(bundle.pages.programmes.phase2.heroHighlights).toHaveLength(4);
      expect(bundle.pages.programmes.phase2.positioning).toHaveLength(5);
      expect(bundle.pages.programmes.phase2.pathway.title).toEqual(expect.any(String));
      expect(bundle.pages.programmes.phase2.pathway.items).toHaveLength(5);
      expect(bundle.pages.programmes.phase2.outcomesEyebrow).toEqual(expect.any(String));
      expect(bundle.pages.programmes.phase2.outcomes).toHaveLength(5);
      expect(bundle.pages.programmes.phase2.cta.eyebrow).toEqual(expect.any(String));
      expect(bundle.pages.programmes.phase2.cta.title).toEqual(expect.any(String));
      expect(bundle.pages.programmes.phase2.cta.description).toEqual(expect.any(String));

      expect(bundle.pages.partners.phase2.heroBody).toEqual(expect.any(String));
      expect(bundle.pages.partners.phase2.rationale.title).toEqual(expect.any(String));
      expect(bundle.pages.partners.phase2.opportunities.title).toEqual(expect.any(String));
      expect(bundle.pages.partners.phase2.categories).toHaveLength(6);
    },
  );
});
