# HMIOSS Phase 2 Opportunity Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the HMIOSS website into a stronger partnership and opportunity platform by making programme recruitment and partnership development the dominant conversion goals while preserving the approved design system and route structure.

**Architecture:** Keep the existing Next.js Pages Router and current visual design. Extend the shared content/config layer for programme and partner opportunity content, update locale bundles for Phase 2 messaging, and reuse the existing section component pattern to add conversion-focused sections on the homepage, `/programmes`, and `/partners`.

**Tech Stack:** Next.js Pages Router, TypeScript, React, next-i18next, Tailwind CSS, Vitest, ESLint

---

## File Structure

### Create

- `src/config/partners.ts`
- `src/config/partners.test.ts`
- `src/tests/pages/phase2-homepage.test.tsx`
- `src/tests/pages/phase2-programmes.test.tsx`
- `src/tests/pages/phase2-partners.test.tsx`

### Modify

- `src/config/programmes.ts`
- `src/pages/[locale]/index.tsx`
- `src/pages/[locale]/programmes.tsx`
- `src/pages/[locale]/partners.tsx`
- `src/components/sections/ProcessTimeline.tsx`
- `src/components/sections/InstitutionalMetrics.tsx`
- `src/components/sections/sections.test.tsx`
- `public/locales/en/home.json`
- `public/locales/zh-TW/home.json`
- `public/locales/zh-CN/home.json`
- `public/locales/ms/home.json`
- `public/locales/en/pages.json`
- `public/locales/zh-TW/pages.json`
- `public/locales/zh-CN/pages.json`
- `public/locales/ms/pages.json`
- `src/tests/pages/home-page.test.tsx`
- `src/tests/pages/programmes-partners-pages.test.tsx`

### Re-run Existing Verification

- `src/config/locale-content.test.ts`
- `src/config/impact.test.ts`
- `src/config/news.test.ts`
- `src/tests/pages/institutional-pages.test.tsx`
- `src/tests/pages/news-join-impact-pages.test.tsx`

---

### Task 1: Extend Shared Programme And Partnership Content Models

**Files:**
- Create: `src/config/partners.ts`
- Create: `src/config/partners.test.ts`
- Modify: `src/config/programmes.ts`

- [ ] **Step 1: Write the failing config tests**

Create `src/config/partners.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { homepagePartnershipCategories, partnerOpportunityCategories } from "@/config/partners";

describe("partners config", () => {
  it("defines the six Phase 2 partnership opportunity categories", () => {
    expect(partnerOpportunityCategories.map((item) => item.key)).toEqual([
      "universities",
      "trainingProviders",
      "industryPartners",
      "defenceSecurityPartners",
      "communityOrganisations",
      "csrPartners",
    ]);
  });

  it("provides a homepage summary layer", () => {
    expect(homepagePartnershipCategories).toHaveLength(6);
  });
});
```

Extend `src/config/impact.test.ts` so the Phase 2 programme model is enforced:

```ts
import {
  flagshipProgramme,
  flagshipProgrammePathway,
  flagshipProgrammeOutcomes,
} from "@/config/programmes";

expect(flagshipProgramme.positioning).toEqual([
  "Leadership Development",
  "Career Development",
  "Industry Exposure",
  "Academic Qualification",
  "Professional Qualification",
]);
expect(flagshipProgrammePathway).toHaveLength(5);
expect(flagshipProgrammeOutcomes).toContain("Mentorship");
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/config/partners.test.ts src/config/impact.test.ts
```

Expected:

- `partners.test.ts` fails because `src/config/partners.ts` does not exist
- `impact.test.ts` fails because the new Phase 2 programme exports do not exist yet

- [ ] **Step 3: Add the minimal shared content structures**

Create `src/config/partners.ts`:

```ts
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
    summary: "Academic collaboration that strengthens talent development and qualification pathways.",
    collaborationModes: ["Academic partnerships", "Talent pipelines"],
    value: "Connect formal education with leadership development and future-ready pathways.",
  },
  {
    key: "trainingProviders",
    title: "Training Providers",
    summary: "Specialist providers that expand applied learning and professional readiness.",
    collaborationModes: ["Co-delivered training", "Capability workshops"],
    value: "Add practical skills and industry-aligned learning experiences.",
  },
  {
    key: "industryPartners",
    title: "Industry Partners",
    summary: "Industry collaborations that improve exposure, employability, and real-world understanding.",
    collaborationModes: ["Internships", "Industry visits"],
    value: "Create career visibility and professional relevance for students.",
  },
  {
    key: "defenceSecurityPartners",
    title: "Defence & Security Partners",
    summary: "Structured partnerships that strengthen discipline, resilience, and operational awareness.",
    collaborationModes: ["Preparedness programmes", "Applied exposure"],
    value: "Support leadership growth through high-discipline environments.",
  },
  {
    key: "communityOrganisations",
    title: "Community Organisations",
    summary: "Community-linked collaborations that turn leadership training into visible public contribution.",
    collaborationModes: ["Service projects", "Community leadership initiatives"],
    value: "Translate education into practical civic impact.",
  },
  {
    key: "csrPartners",
    title: "CSR Partners",
    summary: "CSR-aligned organisations that want to support youth development and leadership pathways.",
    collaborationModes: ["Sponsored programmes", "Impact partnerships"],
    value: "Connect institutional development goals with measurable social outcomes.",
  },
];

export const partnerOpportunityCategories = homepagePartnershipCategories.map((item) => ({
  ...item,
  collaborationModes: [...item.collaborationModes],
}));
```

Update `src/config/programmes.ts` with Phase 2 exports:

```ts
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
  { key: "student", title: "Student", description: "Begin with a clear pathway into leadership and opportunity." },
  { key: "training", title: "Training", description: "Build capability through integrated academic and professional learning." },
  { key: "industryExposure", title: "Industry Exposure", description: "Gain applied understanding through partner-linked environments." },
  { key: "leadershipDevelopment", title: "Leadership Development", description: "Strengthen discipline, responsibility, and real-world readiness." },
  { key: "careerOpportunities", title: "Career Opportunities", description: "Progress into clearer next-step pathways after completion." },
];
```

- [ ] **Step 4: Re-run tests**

Run:

```bash
npm test -- src/config/partners.test.ts src/config/impact.test.ts
```

Expected:

- both files pass

- [ ] **Step 5: Commit**

```bash
git add src/config/programmes.ts src/config/partners.ts src/config/partners.test.ts src/config/impact.test.ts
git commit -m "feat: add phase 2 programme and partnership content models"
```

---

### Task 2: Add Multilingual Phase 2 Messaging

**Files:**
- Modify: `public/locales/en/home.json`
- Modify: `public/locales/zh-TW/home.json`
- Modify: `public/locales/zh-CN/home.json`
- Modify: `public/locales/ms/home.json`
- Modify: `public/locales/en/pages.json`
- Modify: `public/locales/zh-TW/pages.json`
- Modify: `public/locales/zh-CN/pages.json`
- Modify: `public/locales/ms/pages.json`
- Modify: `src/config/locale-content.test.ts`

- [ ] **Step 1: Write the failing locale-content assertions**

Extend `src/config/locale-content.test.ts`:

```ts
expect(en.home.flagship.title).toBe("Launch Your Leadership Journey");
expect(en.home.flagship.pathway).toHaveLength(5);
expect(en.home.partnershipSummary.categories).toHaveLength(6);
expect(en.pages.programmes.primaryCta).toBe("Apply for Programme");
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm test -- src/config/locale-content.test.ts
```

Expected:

- fail because the Phase 2 locale keys do not exist yet

- [ ] **Step 3: Add locale keys for homepage and programmes conversion messaging**

Update `public/locales/en/home.json` with keys like:

```json
{
  "flagship": {
    "title": "Launch Your Leadership Journey",
    "strapline": "One Academic Qualification. One Professional Qualification. One Integrated Career Pathway.",
    "description": "The Dual Credential Programme connects leadership development, career development, industry exposure, academic qualification, and professional qualification into one flagship pathway.",
    "outcomesTitle": "What This Pathway Builds",
    "pathwayTitle": "Your Opportunity Pathway",
    "pathway": [
      { "title": "Student", "description": "Start with a pathway that leads beyond classroom-only learning." },
      { "title": "Training", "description": "Build capability through integrated academic and professional preparation." },
      { "title": "Industry Exposure", "description": "Gain visibility into real-world environments and expectations." },
      { "title": "Leadership Development", "description": "Grow confidence, discipline, and responsibility through guided progression." },
      { "title": "Career Opportunities", "description": "Move forward with clearer next-step pathways." }
    ],
    "ctaPrimary": "Apply for Programme",
    "ctaSecondary": "Request Information"
  },
  "partnershipSummary": {
    "title": "Partnership Opportunities",
    "description": "HMIOSS welcomes collaboration that strengthens talent development, leadership formation, and real-world opportunity pathways.",
    "cta": "Become a Strategic Partner",
    "categories": [
      { "title": "Universities", "summary": "Academic collaboration and qualification pathways." },
      { "title": "Training Providers", "summary": "Applied capability and professional readiness." },
      { "title": "Industry Partners", "summary": "Exposure, employability, and practical opportunity." },
      { "title": "Defence & Security Partners", "summary": "Discipline, resilience, and structured readiness." },
      { "title": "Community Organisations", "summary": "Leadership applied through public contribution." },
      { "title": "CSR Partners", "summary": "Shared investment in talent and opportunity development." }
    ]
  },
  "finalCta": {
    "title": "Ready to Begin Your Leadership Journey?",
    "primary": "Apply for Programme",
    "secondary": "Become a Strategic Partner",
    "tertiary": "Contact HMIOSS"
  }
}
```

Update `public/locales/*/pages.json` with programme page section labels:

```json
"programmes": {
  "title": "Programmes",
  "subtitle": "Leadership pathways and opportunity development",
  "primaryCta": "Apply for Programme",
  "secondaryCta": "Request Information",
  "tertiaryCta": "Contact HMIOSS"
}
```

Use faithful concise translations in `zh-TW`, `zh-CN`, and `ms`.

- [ ] **Step 4: Re-run tests**

Run:

```bash
npm test -- src/config/locale-content.test.ts
```

Expected:

- pass

- [ ] **Step 5: Commit**

```bash
git add public/locales/en/home.json public/locales/zh-TW/home.json public/locales/zh-CN/home.json public/locales/ms/home.json public/locales/en/pages.json public/locales/zh-TW/pages.json public/locales/zh-CN/pages.json public/locales/ms/pages.json src/config/locale-content.test.ts
git commit -m "feat: add phase 2 multilingual conversion messaging"
```

---

### Task 3: Add The Homepage Flagship Programme And Partnership Conversion Blocks

**Files:**
- Modify: `src/pages/[locale]/index.tsx`
- Create: `src/tests/pages/phase2-homepage.test.tsx`

- [ ] **Step 1: Write the failing homepage test**

Create `src/tests/pages/phase2-homepage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/pages/[locale]/index";

describe("Phase 2 homepage", () => {
  it("renders the flagship programme section before metrics and includes partnership opportunities", () => {
    render(<HomePage locale="en" />);

    expect(screen.getByText("Launch Your Leadership Journey")).toBeInTheDocument();
    expect(screen.getByText("Partnership Opportunities")).toBeInTheDocument();
    expect(screen.getByText("Ready to Begin Your Leadership Journey?")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/tests/pages/phase2-homepage.test.tsx
```

Expected:

- fail because the new sections do not exist yet

- [ ] **Step 3: Implement the homepage sections in the approved order**

Update `src/pages/[locale]/index.tsx`:

- insert `Launch Your Leadership Journey` immediately after `Why HMIOSS`
- render the Phase 2 outcome-led positioning
- render the 5-step pathway using `ProcessTimeline`
- move metrics below the flagship block if needed to preserve the required order
- add a homepage summary `Partnership Opportunities` section
- add the final CTA block with three buttons

Representative structure:

```tsx
<section className="bg-[#F8F7F2] py-18">
  <Container className="grid gap-10">
    <SectionHeading
      eyebrow={siteConfig.shortName}
      title={t("home:flagship.title")}
      description={t("home:flagship.description")}
    />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {flagshipProgramme.positioning.map((item) => (
        <div className="rounded-3xl border border-[#E0E0E0] bg-white px-6 py-5" key={item}>
          <p className="font-semibold text-[#1A2A3A]">{item}</p>
        </div>
      ))}
    </div>
    <ProcessTimeline
      eyebrow={siteConfig.shortName}
      title={t("home:flagship.pathwayTitle")}
      description={t("home:flagship.strapline")}
      items={flagshipProgrammePathway}
    />
    <div className="flex flex-wrap gap-4">
      <Button href={buildLocalizedPath(effectiveLocale, "/programmes")} variant="primary">
        {t("home:flagship.ctaPrimary")}
      </Button>
      <Button href={buildLocalizedPath(effectiveLocale, "/contact")} variant="secondary">
        {t("home:flagship.ctaSecondary")}
      </Button>
    </div>
  </Container>
</section>
```

Add the partnership summary and final CTA block below the existing proof / vision sections.

- [ ] **Step 4: Re-run tests and lint**

Run:

```bash
npm test -- src/tests/pages/phase2-homepage.test.tsx src/tests/pages/home-page.test.tsx
npx eslint 'src/pages/[locale]/index.tsx' src/tests/pages/phase2-homepage.test.tsx
```

Expected:

- both test files pass
- no lint errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/index.tsx src/tests/pages/phase2-homepage.test.tsx src/tests/pages/home-page.test.tsx
git commit -m "feat: add phase 2 homepage opportunity and partner conversion sections"
```

---

### Task 4: Turn `/programmes` Into The Flagship Conversion Page

**Files:**
- Modify: `src/pages/[locale]/programmes.tsx`
- Create: `src/tests/pages/phase2-programmes.test.tsx`
- Modify: `src/config/programmes.ts`

- [ ] **Step 1: Write the failing programmes page test**

Create `src/tests/pages/phase2-programmes.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProgrammesPage from "@/pages/[locale]/programmes";

describe("Phase 2 programmes page", () => {
  it("renders the flagship conversion sections instead of a brochure-like summary", () => {
    render(<ProgrammesPage locale="en" />);

    expect(screen.getByText("Why This Programme")).toBeInTheDocument();
    expect(screen.getByText("Career Pathways")).toBeInTheDocument();
    expect(screen.getByText("Industry Exposure")).toBeInTheDocument();
    expect(screen.getByText("Role of HMIOSS")).toBeInTheDocument();
    expect(screen.getByText("Role of Genovasi")).toBeInTheDocument();
    expect(screen.getByText("Entry Requirements")).toBeInTheDocument();
    expect(screen.getByText("Apply Now")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/tests/pages/phase2-programmes.test.tsx
```

Expected:

- fail because the new section headings do not exist yet

- [ ] **Step 3: Rebuild `/programmes` around opportunity and conversion**

Update `src/pages/[locale]/programmes.tsx` so the section order becomes:

1. Hero with flagship leadership/opportunity positioning
2. Why This Programme
3. Career Pathways
4. Industry Exposure
5. Role of HMIOSS
6. Role of Genovasi
7. Entry Requirements
8. Apply Now

Update `src/config/programmes.ts` to provide section data:

```ts
export const flagshipProgrammeSections = {
  whyThisProgramme: {
    title: "Why This Programme",
    points: [
      "Leadership development with real-world relevance",
      "Career-aligned learning that connects study with opportunity",
      "A dual-credential structure that adds academic and professional value",
    ],
  },
  industryExposure: {
    title: "Industry Exposure",
    points: [
      "Partner-linked environments",
      "Professional awareness",
      "Applied learning context",
    ],
  },
  roleOfHmioss: {
    title: "Role of HMIOSS",
    points: [
      "Leadership development",
      "Mentorship environment",
      "Institutional identity",
      "Community engagement",
    ],
  },
  roleOfGenovasi: {
    title: "Role of Genovasi",
    points: [
      "Academic qualification pathway",
      "Educational structure and standards",
      "Formal learning support",
    ],
  },
  entryRequirements: {
    title: "Entry Requirements",
    items: ["SPM 3 credits or equivalent", "Commitment to leadership and learning", "Interest in structured development pathways"],
  },
};
```

Use a clear final CTA block:

```tsx
<Button href={buildLocalizedPath(effectiveLocale, "/join")} variant="primary">
  {t("pages:programmes.primaryCta")}
</Button>
<Button href={buildLocalizedPath(effectiveLocale, "/contact")} variant="secondary">
  {t("pages:programmes.secondaryCta")}
</Button>
<Button href={buildLocalizedPath(effectiveLocale, "/contact")} variant="secondary">
  {t("pages:programmes.tertiaryCta")}
</Button>
```

- [ ] **Step 4: Re-run tests, lint, and build**

Run:

```bash
npm test -- src/tests/pages/phase2-programmes.test.tsx src/tests/pages/programmes-partners-pages.test.tsx
npx eslint 'src/pages/[locale]/programmes.tsx' src/tests/pages/phase2-programmes.test.tsx src/config/programmes.ts
npm run build
```

Expected:

- tests pass
- lint passes
- build passes

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/programmes.tsx src/tests/pages/phase2-programmes.test.tsx src/config/programmes.ts src/tests/pages/programmes-partners-pages.test.tsx
git commit -m "feat: turn programmes page into flagship conversion landing"
```

---

### Task 5: Add Full Partnership Opportunities To The Partners Page

**Files:**
- Modify: `src/pages/[locale]/partners.tsx`
- Create: `src/tests/pages/phase2-partners.test.tsx`
- Modify: `src/config/partners.ts`

- [ ] **Step 1: Write the failing partners page test**

Create `src/tests/pages/phase2-partners.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PartnersPage from "@/pages/[locale]/partners";

describe("Phase 2 partners page", () => {
  it("renders the full partnership opportunity categories", () => {
    render(<PartnersPage locale="en" />);

    expect(screen.getByText("Universities")).toBeInTheDocument();
    expect(screen.getByText("Training Providers")).toBeInTheDocument();
    expect(screen.getByText("Industry Partners")).toBeInTheDocument();
    expect(screen.getByText("Defence & Security Partners")).toBeInTheDocument();
    expect(screen.getByText("Community Organisations")).toBeInTheDocument();
    expect(screen.getByText("CSR Partners")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/tests/pages/phase2-partners.test.tsx
```

Expected:

- fail because the current page only has the Phase 1 categories

- [ ] **Step 3: Implement the full partnership opportunity layer**

Update `src/pages/[locale]/partners.tsx`:

- keep the existing credibility and rationale shell where useful
- add a new `Partner With HMIOSS` / full opportunity section
- render the 6 approved categories from `src/config/partners.ts`
- for each category show:
  - title
  - collaboration summary
  - collaboration modes
  - value statement

Representative section:

```tsx
<section className="bg-[#F8F7F2] py-18">
  <Container className="grid gap-6 lg:grid-cols-2">
    {partnerOpportunityCategories.map((category) => (
      <div className="rounded-3xl border border-[#E0E0E0] bg-white p-10" key={category.key}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
          Partnership Opportunity
        </p>
        <h2 className="mt-4 font-heading text-3xl text-[#1A2A3A]">{category.title}</h2>
        <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{category.summary}</p>
        <div className="mt-6 grid gap-3">
          {category.collaborationModes.map((mode) => (
            <div className="rounded-2xl border border-[#1A2A3A]/10 bg-[#F8F7F2] px-5 py-4" key={mode}>
              <p className="font-semibold text-[#1A2A3A]">{mode}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-[#4A4A4A]">{category.value}</p>
      </div>
    ))}
  </Container>
</section>
```

- [ ] **Step 4: Re-run tests and lint**

Run:

```bash
npm test -- src/tests/pages/phase2-partners.test.tsx src/tests/pages/programmes-partners-pages.test.tsx src/config/partners.test.ts
npx eslint 'src/pages/[locale]/partners.tsx' src/tests/pages/phase2-partners.test.tsx src/config/partners.ts src/config/partners.test.ts
```

Expected:

- all tests pass
- lint passes

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/partners.tsx src/tests/pages/phase2-partners.test.tsx src/config/partners.ts src/config/partners.test.ts src/tests/pages/programmes-partners-pages.test.tsx
git commit -m "feat: add full phase 2 partnership opportunity sections"
```

---

### Task 6: Final Verification, Visual Review Checklist, And Handoff Summary

**Files:**
- Modify: `src/pages/[locale]/index.tsx`
- Modify: `src/pages/[locale]/programmes.tsx`
- Modify: `src/pages/[locale]/partners.tsx`
- Modify: `docs/superpowers/plans/2026-06-24-hmioss-phase-2-opportunity-platform.md` (optional notes only if execution needs plan clarifications)

- [ ] **Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected:

- all test suites pass

- [ ] **Step 2: Run lint and build**

Run:

```bash
npm run lint
npm run build
```

Expected:

- lint passes
- build passes

- [ ] **Step 3: Verify the main Phase 2 routes**

Run against the local server:

```bash
curl -I http://localhost:3003/en
curl -I http://localhost:3003/en/programmes
curl -I http://localhost:3003/en/partners
```

Expected:

- each returns `200 OK`

Check the rendered HTML:

```bash
curl -s http://localhost:3003/en | grep -E "Launch Your Leadership Journey|Partnership Opportunities|Ready to Begin Your Leadership Journey"
curl -s http://localhost:3003/en/programmes | grep -E "Why This Programme|Career Pathways|Industry Exposure|Role of HMIOSS|Role of Genovasi|Entry Requirements|Apply Now"
curl -s http://localhost:3003/en/partners | grep -E "Universities|Training Providers|Industry Partners|Defence & Security Partners|Community Organisations|CSR Partners"
```

Expected:

- all key strings are present in the rendered HTML

- [ ] **Step 4: Prepare the visual review checklist and page-by-page summary**

The final handoff must include:

```md
Visual review checklist
- Homepage: Launch Your Leadership Journey appears after Why HMIOSS and before metrics
- Homepage: Partnership Opportunities summary is visible
- Homepage: final CTA block includes three buttons
- Programmes: page reads as flagship landing page, not brochure
- Programmes: all seven Phase 2 sections appear in order
- Partners: all six partnership opportunity categories appear
- Messaging: recurring leadership-and-education narrative appears on homepage, programmes, partners, and impact

Page-by-page summary
- Homepage: conversion-first flagship and partnership summary
- Programmes: flagship landing page with opportunity-led structure
- Partners: full partnership development page
```

- [ ] **Step 5: Commit**

```bash
git add src public docs
git commit -m "feat: complete phase 2 opportunity platform enhancements"
```
