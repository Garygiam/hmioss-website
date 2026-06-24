# HMIOSS Phase 1 Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the existing HMIOSS website to communicate stronger institutional authority, leadership-first positioning, clearer storytelling, and better conversion without changing the approved design direction.

**Architecture:** Keep the existing locale-prefixed Next.js Pages Router structure and approved design system. Add shared structured content only for high-value institutional domains (`leadership`, `programmes`, `news`, `impact`), extend locale files for multilingual messaging, and layer in reusable section components for authority strips, metrics, vision, timelines, profile cards, and process journeys.

**Tech Stack:** Next.js Pages Router, TypeScript, next-i18next, React, Tailwind CSS, Vitest, ESLint

---

## File Structure

### Create

- `src/components/sections/AuthorityStrip.tsx`
- `src/components/sections/InstitutionalMetrics.tsx`
- `src/components/sections/VisionStatement.tsx`
- `src/components/sections/ProcessTimeline.tsx`
- `src/components/sections/CategoryFilters.tsx`
- `src/components/sections/ProfileCard.tsx`
- `src/config/programmes.ts`
- `src/config/impact.ts`
- `src/config/impact.test.ts`
- `src/pages/[locale]/impact.tsx`
- `public/locales/en/impact.json`
- `public/locales/zh-TW/impact.json`
- `public/locales/zh-CN/impact.json`
- `public/locales/ms/impact.json`

### Modify

- `src/config/site.ts`
- `src/config/leadership.ts`
- `src/config/news.ts`
- `src/config/news.test.ts`
- `src/pages/[locale]/index.tsx`
- `src/pages/[locale]/about.tsx`
- `src/pages/[locale]/mission-vision.tsx`
- `src/pages/[locale]/leadership.tsx`
- `src/pages/[locale]/programmes.tsx`
- `src/pages/[locale]/partners.tsx`
- `src/pages/[locale]/news.tsx`
- `src/pages/[locale]/join.tsx`
- `public/locales/en/home.json`
- `public/locales/zh-TW/home.json`
- `public/locales/zh-CN/home.json`
- `public/locales/ms/home.json`
- `public/locales/en/pages.json`
- `public/locales/zh-TW/pages.json`
- `public/locales/zh-CN/pages.json`
- `public/locales/ms/pages.json`
- `public/locales/en/about.json`
- `public/locales/zh-TW/about.json`
- `public/locales/zh-CN/about.json`
- `public/locales/ms/about.json`
- `public/locales/en/mission.json`
- `public/locales/zh-TW/mission.json`
- `public/locales/zh-CN/mission.json`
- `public/locales/ms/mission.json`
- `next-i18next.config.js`

### Existing Tests To Re-Run

- `src/config/leadership.test.ts`
- `src/config/news.test.ts`
- `src/lib/locale.test.ts`
- `src/lib/validation/contact.test.ts`
- `src/lib/validation/membership.test.ts`

---

### Task 1: Build The Shared Institutional Content Layer

**Files:**
- Create: `src/config/programmes.ts`
- Create: `src/config/impact.ts`
- Create: `src/config/impact.test.ts`
- Modify: `src/config/site.ts`
- Modify: `src/config/leadership.ts`
- Modify: `src/config/news.ts`
- Modify: `src/config/news.test.ts`

- [ ] **Step 1: Write the failing tests for the new institutional content records**

Create `src/config/impact.test.ts` with assertions that prove the new Impact content exists and follows the approved leadership-first positioning:

```ts
import { describe, expect, it } from "vitest";

import { impactHighlights, impactSections } from "@/config/impact";

describe("impact content", () => {
  it("defines credibility-first highlights instead of vanity metrics", () => {
    expect(impactHighlights.map((item) => item.key)).toEqual([
      "leadership",
      "education",
      "research",
      "community",
    ]);
  });

  it("includes institutional proof sections for the Impact page", () => {
    expect(impactSections.map((section) => section.key)).toEqual([
      "members",
      "branches",
      "programmes",
      "partnerships",
      "communityActivities",
      "leadershipDevelopment",
      "events",
    ]);
  });
});
```

Update `src/config/news.test.ts` so it checks category support for the filtered News page:

```ts
expect(newsItems[0].category).toBe("News");
expect(newsItems[1].category).toBe("Announcements");
expect(newsItems[2].category).toBe("Events");
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/config/impact.test.ts src/config/news.test.ts
```

Expected:

- `impact.test.ts` fails because `src/config/impact.ts` does not exist yet
- `news.test.ts` fails if categories do not match the updated plan

- [ ] **Step 3: Add the minimal shared records**

Create `src/config/impact.ts`:

```ts
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
    summary: "Leadership remains the first institutional priority across programmes, partnerships, and engagement.",
  },
  {
    key: "education",
    label: "Educational Initiatives",
    summary: "Programmes are positioned around talent development, learning pathways, and strategic capability building.",
  },
  {
    key: "research",
    label: "Strategic Research",
    summary: "Research supports institutional dialogue, public understanding, and long-term capability development.",
  },
  {
    key: "community",
    label: "Community Impact",
    summary: "Community and national service are framed as practical outcomes of leadership and education.",
  },
];

export const impactSections: ImpactSection[] = [
  {
    key: "members",
    title: "Members",
    summary: "A growing institutional network connected through leadership and development pathways.",
    points: ["Leadership-oriented membership", "Structured engagement", "Cross-branch institutional identity"],
  },
  {
    key: "branches",
    title: "Branches",
    summary: "A distributed institutional footprint that supports programme reach and network participation.",
    points: ["Regional presence", "Coordination capacity", "Network continuity"],
  },
  {
    key: "programmes",
    title: "Programmes",
    summary: "Programmes support education, capability building, and leadership formation.",
    points: ["Educational initiatives", "Strategic learning", "Practical pathways"],
  },
  {
    key: "partnerships",
    title: "Partnerships",
    summary: "Strategic partnerships strengthen education, defence readiness, and institutional credibility.",
    points: ["Education partners", "Defence collaboration", "Strategic ecosystem"],
  },
  {
    key: "communityActivities",
    title: "Community Activities",
    summary: "Community activities are framed as mission outcomes rather than standalone events.",
    points: ["Service orientation", "Public engagement", "Applied leadership"],
  },
  {
    key: "leadershipDevelopment",
    title: "Leadership Development",
    summary: "Leadership development is the unifying institutional objective across the site.",
    points: ["Talent development", "Capability building", "Leadership pathways"],
  },
  {
    key: "events",
    title: "Events",
    summary: "Events demonstrate institutional activity, community engagement, and partnership momentum.",
    points: ["Forums", "Programmes", "Strategic visits"],
  },
];
```

Update `src/config/news.ts` so the three items use these categories:

```ts
category: "News"
category: "Announcements"
category: "Events"
```

Update `src/config/site.ts` to replace the current stats with credibility-first metric labels and to add the new `Impact` nav entry:

```ts
stats: [
  { value: "Strategic", labelKey: "stats.partnerships" },
  { value: "Leadership", labelKey: "stats.programmes" },
  { value: "Education", labelKey: "stats.education" },
  { value: "Community", labelKey: "stats.community" },
  { value: "Institutional", labelKey: "stats.network" },
],
navItems: [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "missionVision", href: "/mission-vision" },
  { key: "leadership", href: "/leadership" },
  { key: "programmes", href: "/programmes" },
  { key: "partners", href: "/partners" },
  { key: "impact", href: "/impact" },
  { key: "news", href: "/news" },
  { key: "join", href: "/join" },
  { key: "contact", href: "/contact" },
] as const,
```

Extend `src/config/leadership.ts` so each member record includes:

```ts
bio: string;
expertise: string[];
imageSrc: string;
imageAlt: string;
```

Create `src/config/programmes.ts` with:

- `programmeBenefits`
- `careerPathwaySteps`
- `outcomesAndOpportunities`
- CTA metadata

- [ ] **Step 4: Run tests to verify the content layer passes**

Run:

```bash
npm test -- src/config/impact.test.ts src/config/news.test.ts src/config/leadership.test.ts
```

Expected:

- all three test files pass

- [ ] **Step 5: Commit**

```bash
git add src/config/site.ts src/config/leadership.ts src/config/news.ts src/config/news.test.ts src/config/programmes.ts src/config/impact.ts src/config/impact.test.ts
git commit -m "feat: add shared institutional content structures"
```

---

### Task 2: Add Reusable Institutional Section Components

**Files:**
- Create: `src/components/sections/AuthorityStrip.tsx`
- Create: `src/components/sections/InstitutionalMetrics.tsx`
- Create: `src/components/sections/VisionStatement.tsx`
- Create: `src/components/sections/ProcessTimeline.tsx`
- Create: `src/components/sections/CategoryFilters.tsx`
- Create: `src/components/sections/ProfileCard.tsx`

- [ ] **Step 1: Write the failing component smoke test**

Add a light smoke test to `src/config/impact.test.ts` by importing a representative shape used by the components:

```ts
expect(impactSections[0].points.length).toBeGreaterThan(0);
expect(impactHighlights[0].label).toBe("Leadership Development");
```

This ensures the component inputs exist before the components are built.

- [ ] **Step 2: Run the test to verify it fails if shapes are missing**

Run:

```bash
npm test -- src/config/impact.test.ts
```

Expected:

- fail only if the shape was not created correctly in Task 1

- [ ] **Step 3: Create the reusable components**

Create `src/components/sections/AuthorityStrip.tsx`:

```tsx
type AuthorityStripProps = {
  items: string[];
};

export function AuthorityStrip({ items }: AuthorityStripProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[#D4AF37]/30 bg-white p-6 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A2A3A]"
          key={item}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
```

Create `src/components/sections/InstitutionalMetrics.tsx`:

```tsx
type InstitutionalMetric = {
  value: string;
  label: string;
  description?: string;
};

type InstitutionalMetricsProps = {
  items: InstitutionalMetric[];
};

export function InstitutionalMetrics({ items }: InstitutionalMetricsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div className="rounded-2xl border border-[#E0E0E0] bg-[#F5F5F5] p-6" key={item.label}>
          <p className="font-heading text-2xl text-[#1A2A3A]">{item.value}</p>
          <p className="mt-2 text-sm font-semibold text-[#4A4A4A]">{item.label}</p>
          {item.description ? (
            <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">{item.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
```

Create `src/components/sections/VisionStatement.tsx` with props that support both `Founder’s Vision` and `Institutional Vision`:

```tsx
type VisionStatementProps = {
  eyebrow: string;
  title: string;
  quote: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
};
```

Create `src/components/sections/ProcessTimeline.tsx` to render ordered steps for the Join page and the Programmes pathway.

Create `src/components/sections/CategoryFilters.tsx` to render `All`, `News`, `Events`, and `Announcements` chips.

Create `src/components/sections/ProfileCard.tsx` to render:

- portrait
- title
- bio
- expertise tags

- [ ] **Step 4: Run lint to verify the components compile cleanly**

Run:

```bash
npx eslint src/components/sections/*.tsx
```

Expected:

- no lint errors

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/*.tsx
git commit -m "feat: add reusable institutional section components"
```

---

### Task 3: Extend Multilingual Content For Phase 1 Messaging

**Files:**
- Modify: `public/locales/en/home.json`
- Modify: `public/locales/zh-TW/home.json`
- Modify: `public/locales/zh-CN/home.json`
- Modify: `public/locales/ms/home.json`
- Modify: `public/locales/en/pages.json`
- Modify: `public/locales/zh-TW/pages.json`
- Modify: `public/locales/zh-CN/pages.json`
- Modify: `public/locales/ms/pages.json`
- Modify: `public/locales/en/about.json`
- Modify: `public/locales/zh-TW/about.json`
- Modify: `public/locales/zh-CN/about.json`
- Modify: `public/locales/ms/about.json`
- Modify: `public/locales/en/mission.json`
- Modify: `public/locales/zh-TW/mission.json`
- Modify: `public/locales/zh-CN/mission.json`
- Modify: `public/locales/ms/mission.json`
- Create: `public/locales/en/impact.json`
- Create: `public/locales/zh-TW/impact.json`
- Create: `public/locales/zh-CN/impact.json`
- Create: `public/locales/ms/impact.json`
- Modify: `next-i18next.config.js`

- [ ] **Step 1: Add the failing translation namespace check**

Extend `src/config/impact.test.ts` with a basic key-alignment assertion by checking the planned number of highlight keys:

```ts
expect(impactHighlights).toHaveLength(4);
expect(impactSections).toHaveLength(7);
```

This ensures the locale files you add later have a stable target structure.

- [ ] **Step 2: Run tests to verify the content assumptions still hold**

Run:

```bash
npm test -- src/config/impact.test.ts
```

Expected:

- pass if Task 1 was completed correctly

- [ ] **Step 3: Extend locale files with approved Phase 1 copy**

Update `public/locales/en/home.json` with keys like:

```json
{
  "hero": {
    "tagline": "Legacy of Honor. Future of Strategy.",
    "value": "HMIOSS develops future leaders through education, strategic thinking, research, national service and international collaboration."
  },
  "authority": {
    "items": [
      "ROS Registered",
      "Strategic Education Institution",
      "International Hung Men Network",
      "Leadership Development Focus",
      "Strategic Partnerships"
    ]
  },
  "pillars": {
    "title": "Why HMIOSS"
  },
  "vision": {
    "eyebrow": "Institutional Vision",
    "title": "Developing leaders with capability, perspective, and service orientation",
    "quote": "Education builds capability. Leadership builds nations. HMIOSS exists to develop both.",
    "cta": "Learn More About Our Mission"
  }
}
```

Update `public/locales/en/pages.json` to add:

```json
"impact": {
  "title": "Impact",
  "subtitle": "Institutional outcomes and proof"
}
```

Also add `nav.impact` to `public/locales/*/common.json`.

Create `public/locales/*/impact.json` with translated section titles for:

- highlights
- sections
- CTA copy if needed

Extend `public/locales/*/about.json` and `public/locales/*/mission.json` with:

- timeline labels
- focus area labels
- strategic priorities labels

Update `next-i18next.config.js` to include:

```js
ns: ["common", "home", "pages", "seo", "about", "mission", "impact"]
```

- [ ] **Step 4: Run lint and a focused build-safe check**

Run:

```bash
npx eslint next-i18next.config.js
npm test -- src/config/impact.test.ts src/config/news.test.ts
```

Expected:

- tests pass
- if eslint is excluded for `next-i18next.config.js`, confirm other files remain clean

- [ ] **Step 5: Commit**

```bash
git add public/locales/en/*.json public/locales/zh-TW/*.json public/locales/zh-CN/*.json public/locales/ms/*.json next-i18next.config.js
git commit -m "feat: add multilingual phase 1 institutional messaging"
```

---

### Task 4: Enhance The Homepage With Authority, Pillars, Metrics, And Vision

**Files:**
- Modify: `src/pages/[locale]/index.tsx`
- Modify: `src/config/site.ts`
- Use: `src/components/sections/AuthorityStrip.tsx`
- Use: `src/components/sections/InstitutionalMetrics.tsx`
- Use: `src/components/sections/VisionStatement.tsx`

- [ ] **Step 1: Write the failing homepage behavior test**

Add a minimal data assertion to an existing config test by checking the credibility metrics count in `src/config/impact.test.ts`:

```ts
expect(impactHighlights[0].key).toBe("leadership");
```

This guards the leadership-first ordering the homepage will depend on.

- [ ] **Step 2: Run the test to confirm the ordering is enforced**

Run:

```bash
npm test -- src/config/impact.test.ts
```

Expected:

- pass only when the leadership-first ordering is intact

- [ ] **Step 3: Implement the homepage sections**

Update `src/pages/[locale]/index.tsx` to:

- replace `description={t("home:hero.value")}` with the stronger leadership-first line
- add `AuthorityStrip` directly below the hero
- replace the current raw stats map with `InstitutionalMetrics`
- add a `Why HMIOSS` card grid
- add a reusable `VisionStatement` section that can render either founder or institutional content

Representative structure:

```tsx
<PageHero ... />
<section className="bg-white py-10">
  <Container>
    <AuthorityStrip items={t("home:authority.items", { returnObjects: true }) as string[]} />
  </Container>
</section>
<section className="bg-white py-16">
  <Container className="grid gap-6 lg:grid-cols-4">{/* pillar cards */}</Container>
</section>
<section className="bg-[#F8F7F2] py-16">
  <Container>
    <InstitutionalMetrics items={metricItems} />
  </Container>
</section>
<section className="bg-white py-18">
  <Container>
    <VisionStatement ... />
  </Container>
</section>
```

- [ ] **Step 4: Run lint and preview the homepage**

Run:

```bash
npx eslint 'src/pages/[locale]/index.tsx' src/components/sections/*.tsx src/config/site.ts
```

Then verify visually on:

```bash
http://localhost:3003/en
```

Expected:

- homepage answers who HMIOSS is, why it matters, and why to engage
- no visual redesign

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/index.tsx src/components/sections/*.tsx src/config/site.ts
git commit -m "feat: strengthen homepage authority and positioning"
```

---

### Task 5: Upgrade About And Mission Pages

**Files:**
- Modify: `src/pages/[locale]/about.tsx`
- Modify: `src/pages/[locale]/mission-vision.tsx`

- [ ] **Step 1: Write the failing content-shape assertions**

Use the existing locale-backed content assumptions by checking that the new structural categories exist in tests:

```ts
expect(impactHighlights.map((item) => item.key)).toContain("research");
expect(impactHighlights.map((item) => item.key)).toContain("community");
```

- [ ] **Step 2: Run the tests**

Run:

```bash
npm test -- src/config/impact.test.ts
```

Expected:

- pass before UI implementation

- [ ] **Step 3: Implement the upgraded page sections**

Update `src/pages/[locale]/about.tsx` to:

- replace the simple timeline block with a modern timeline grid
- add a `Core Focus Areas` card section
- keep the current approved story section styling

Update `src/pages/[locale]/mission-vision.tsx` to:

- preserve the current shell
- add a `Strategic Priorities` card grid below mission/vision
- keep leadership and education framing first in copy order

Representative markup for a focus card:

```tsx
<div className="rounded-3xl border border-[#E0E0E0] bg-[#F5F5F5] p-8">
  <p className="font-heading text-xl text-[#1A2A3A]">{title}</p>
  <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">{description}</p>
</div>
```

- [ ] **Step 4: Run lint**

Run:

```bash
npx eslint 'src/pages/[locale]/about.tsx' 'src/pages/[locale]/mission-vision.tsx'
```

Expected:

- no lint errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/about.tsx src/pages/[locale]/mission-vision.tsx
git commit -m "feat: enrich about and mission pages with strategic structure"
```

---

### Task 6: Turn The Board Page Into A Leadership Credibility Surface

**Files:**
- Modify: `src/config/leadership.ts`
- Modify: `src/pages/[locale]/leadership.tsx`
- Use: `src/components/sections/ProfileCard.tsx`
- Test: `src/config/leadership.test.ts`

- [ ] **Step 1: Write the failing leadership test for bios and expertise**

Extend `src/config/leadership.test.ts`:

```ts
expect(leadershipGroups[0].members[0]).toMatchObject({
  name: "Young Shang Yi",
  title: "President / Founder",
});
expect(leadershipGroups[0].members[0].bio.length).toBeGreaterThan(20);
expect(leadershipGroups[0].members[0].expertise.length).toBeGreaterThan(0);
```

- [ ] **Step 2: Run the leadership test and verify it fails**

Run:

```bash
npm test -- src/config/leadership.test.ts
```

Expected:

- fail because `bio` and `expertise` are not populated yet

- [ ] **Step 3: Implement the richer leadership profiles**

Update `src/config/leadership.ts` so each member has:

- `bio`
- `expertise`
- `imageSrc`
- `imageAlt`

Update `src/pages/[locale]/leadership.tsx` to render `ProfileCard` instead of the minimal card.

Representative card usage:

```tsx
<ProfileCard
  name={member.name}
  title={member.title}
  bio={member.bio}
  expertise={member.expertise}
  imageAlt={member.imageAlt}
  imageSrc={member.imageSrc}
/>
```

- [ ] **Step 4: Re-run tests and lint**

Run:

```bash
npm test -- src/config/leadership.test.ts
npx eslint src/config/leadership.ts 'src/pages/[locale]/leadership.tsx' src/components/sections/ProfileCard.tsx
```

Expected:

- leadership test passes
- no lint errors

- [ ] **Step 5: Commit**

```bash
git add src/config/leadership.ts src/config/leadership.test.ts src/pages/[locale]/leadership.tsx src/components/sections/ProfileCard.tsx
git commit -m "feat: strengthen board page with institutional leadership profiles"
```

---

### Task 7: Rebuild Programmes And Partners For Value And Positioning

**Files:**
- Modify: `src/pages/[locale]/programmes.tsx`
- Modify: `src/pages/[locale]/partners.tsx`
- Use: `src/config/programmes.ts`
- Use: `src/components/sections/ProcessTimeline.tsx`

- [ ] **Step 1: Write the failing programme data test**

Add a basic programme shape test in a new `src/config/impact.test.ts` assertion block:

```ts
import { programmeBenefits, outcomesAndOpportunities } from "@/config/programmes";

expect(programmeBenefits).toHaveLength(5);
expect(outcomesAndOpportunities).toContain("Leadership Skills");
```

- [ ] **Step 2: Run the test to verify the programme config is required**

Run:

```bash
npm test -- src/config/impact.test.ts
```

Expected:

- fail until `src/config/programmes.ts` exports the required values

- [ ] **Step 3: Implement both pages**

Update `src/pages/[locale]/programmes.tsx` to include:

- programme overview
- `Why Join This Programme`
- `ProcessTimeline` for the career pathway
- `Outcomes & Opportunities`
- CTA section with:
  - `Apply Now`
  - `Request Information`
  - `Speak With Us`

Update `src/pages/[locale]/partners.tsx` to include:

- `Why Strategic Partnerships Matter`
- categorized partner sections:
  - `Education Partners`
  - `Defence Partners`
  - `Strategic Partners`
  - `Community Partners`

- [ ] **Step 4: Re-run the tests, lint, and visually verify**

Run:

```bash
npm test -- src/config/impact.test.ts
npx eslint 'src/pages/[locale]/programmes.tsx' 'src/pages/[locale]/partners.tsx' src/config/programmes.ts
```

Verify:

```bash
http://localhost:3003/en/programmes
http://localhost:3003/en/partners
```

Expected:

- programmes now communicates value, outcomes, and pathways
- partners now communicates institutional rationale, not just names

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/programmes.tsx src/pages/[locale]/partners.tsx src/config/programmes.ts
git commit -m "feat: strengthen programmes and partnerships positioning"
```

---

### Task 8: Upgrade News, Join, And Add The New Impact Page

**Files:**
- Modify: `src/pages/[locale]/news.tsx`
- Modify: `src/pages/[locale]/join.tsx`
- Create: `src/pages/[locale]/impact.tsx`
- Use: `src/config/news.ts`
- Use: `src/config/impact.ts`
- Use: `src/components/sections/CategoryFilters.tsx`
- Use: `src/components/sections/ProcessTimeline.tsx`

- [ ] **Step 1: Write the failing test coverage**

Extend `src/config/news.test.ts`:

```ts
expect(newsItems.map((item) => item.category)).toEqual([
  "News",
  "Announcements",
  "Events",
]);
```

Keep `src/config/impact.test.ts` as the guard for the new page content.

- [ ] **Step 2: Run the tests and verify they fail if the categories are wrong**

Run:

```bash
npm test -- src/config/news.test.ts src/config/impact.test.ts
```

Expected:

- both pass only when the data matches the plan

- [ ] **Step 3: Implement the three page upgrades**

Update `src/pages/[locale]/news.tsx`:

- add `CategoryFilters`
- use local state to filter by `All`, `News`, `Events`, `Announcements`
- preserve the current card language

Example:

```tsx
const [activeCategory, setActiveCategory] = useState<"All" | "News" | "Events" | "Announcements">("All");
const visibleItems =
  activeCategory === "All"
    ? newsItems
    : newsItems.filter((item) => item.category === activeCategory);
```

Update `src/pages/[locale]/join.tsx`:

- keep the form
- add a `Membership Journey` timeline above or beside the form
- add an FAQ section below the primary conversion area

Create `src/pages/[locale]/impact.tsx`:

- `PageSeo`
- `PageHero`
- highlights section from `impactHighlights`
- grouped proof sections from `impactSections`

Use the same card language as the rest of the site.

- [ ] **Step 4: Re-run tests, lint, and preview**

Run:

```bash
npm test -- src/config/news.test.ts src/config/impact.test.ts
npx eslint 'src/pages/[locale]/news.tsx' 'src/pages/[locale]/join.tsx' 'src/pages/[locale]/impact.tsx'
```

Verify:

```bash
http://localhost:3003/en/news
http://localhost:3003/en/join
http://localhost:3003/en/impact
```

Expected:

- News filters work
- Join feels like a guided conversion page
- Impact reads like institutional proof

- [ ] **Step 5: Commit**

```bash
git add src/pages/[locale]/news.tsx src/pages/[locale]/join.tsx src/pages/[locale]/impact.tsx src/config/impact.ts src/config/news.ts
git commit -m "feat: add impact page and improve news and join flows"
```

---

### Task 9: Final Verification, SEO Pass, And Navigation Check

**Files:**
- Modify: `src/pages/[locale]/index.tsx`
- Modify: `src/pages/[locale]/impact.tsx`
- Modify: `src/pages/[locale]/about.tsx`
- Modify: `src/pages/[locale]/mission-vision.tsx`
- Modify: `src/pages/[locale]/leadership.tsx`
- Modify: `src/pages/[locale]/programmes.tsx`
- Modify: `src/pages/[locale]/partners.tsx`
- Modify: `src/pages/[locale]/news.tsx`
- Modify: `src/pages/[locale]/join.tsx`
- Modify: `public/locales/*/*.json`

- [ ] **Step 1: Do a full test run**

Run:

```bash
npm test
```

Expected:

- all Vitest suites pass

- [ ] **Step 2: Do a full lint run**

Run:

```bash
npm run lint
```

Expected:

- no lint errors

- [ ] **Step 3: Do a production build**

Run:

```bash
npm run build
```

Expected:

- build completes successfully
- localized pages render without namespace or translation errors

- [ ] **Step 4: Manual verification checklist**

Verify these URLs:

```bash
http://localhost:3003/en
http://localhost:3003/en/about
http://localhost:3003/en/mission-vision
http://localhost:3003/en/leadership
http://localhost:3003/en/programmes
http://localhost:3003/en/partners
http://localhost:3003/en/news
http://localhost:3003/en/join
http://localhost:3003/en/impact
```

Confirm:

- homepage reads leadership-first
- no section feels like a redesign
- board page feels more credible
- programmes communicates value and outcomes
- join is conversion-friendly
- impact feels like proof, not vanity
- navigation includes `Impact`

- [ ] **Step 5: Commit**

```bash
git add src public next-i18next.config.js
git commit -m "feat: complete hmioss phase 1 institutional enhancements"
```
