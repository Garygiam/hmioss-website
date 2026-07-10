# HMIOSS Homepage Trust Barrier Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the HMIOSS homepage `Trust` barrier through Trust Narrative Consolidation alone while preserving the current homepage structure and excluding new proof assets.

**Architecture:** Keep the current homepage section order intact and strengthen the trust narrative inside the existing `Hero`, `AuthorityStrip`, `Why HMIOSS`, `InstitutionalMetrics`, and `Institutional Vision` surfaces. Implement the slice with test-first changes, localized content updates, and a documented evidence review that records whether narrative refinement alone materially reduced the Trust barrier.

**Tech Stack:** Next.js Pages Router, React 19, TypeScript, next-i18next, Vitest, ESLint

**Status:** Frozen — Production Verified Baseline

---

## File Map

- Modify: `src/components/sections/AuthorityStrip.tsx`
  - Extend the existing trust layer component so it can render a short framing wrapper above the existing authority labels.
- Modify: `src/pages/[locale]/index.tsx`
  - Keep the current section order, wire the stronger authority framing, and add localized context around the existing metrics section.
- Modify: `src/components/sections/sections.test.tsx`
  - Add component coverage for the richer authority strip contract.
- Modify: `src/tests/pages/phase2-homepage.test.tsx`
  - Preserve section order and assert the new trust-consolidation narrative cues on the homepage.
- Modify: `src/config/locale-content.test.ts`
  - Enforce the new `authority` and `metrics` locale structure across all supported languages.
- Modify: `public/locales/en/home.json`
  - Add the English trust-consolidation copy for authority framing and metric descriptions.
- Modify: `public/locales/ms/home.json`
  - Add the Malay trust-consolidation copy for authority framing and metric descriptions.
- Modify: `public/locales/zh-CN/home.json`
  - Add the Simplified Chinese trust-consolidation copy for authority framing and metric descriptions.
- Modify: `public/locales/zh-TW/home.json`
  - Add the Traditional Chinese trust-consolidation copy for authority framing and metric descriptions.
- Modify: `docs/superpowers/reports/2026-06-25-hmioss-homepage-candidate-discovery-evidence.md`
  - Record the before-vs-after evidence review after implementation and production verification.

### Task 1: Add Failing Tests For Trust Narrative Consolidation

**Files:**
- Modify: `src/components/sections/sections.test.tsx`
- Modify: `src/tests/pages/phase2-homepage.test.tsx`
- Modify: `src/config/locale-content.test.ts`

- [ ] **Step 1: Add a failing component test for the richer authority framing**

```tsx
it("renders authority framing above the existing credibility labels", () => {
  render(
    <AuthorityStrip
      eyebrow="Institutional Trust"
      items={[
        "ROS Registered",
        "Strategic Education Institution",
        "Leadership Development Focus",
      ]}
      summary="These signals matter together: HMIOSS is formally registered, leadership-focused, internationally connected, and partnership-oriented."
      title="An institution built on registration, strategic focus, and cross-border collaboration"
    />,
  );

  expect(screen.getByText("Institutional Trust")).toBeInTheDocument();
  expect(
    screen.getByText(
      "An institution built on registration, strategic focus, and cross-border collaboration",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "These signals matter together: HMIOSS is formally registered, leadership-focused, internationally connected, and partnership-oriented.",
    ),
  ).toBeInTheDocument();
  expect(screen.getByText("ROS Registered")).toBeInTheDocument();
});
```

- [ ] **Step 2: Add a failing homepage test for the new trust narrative cues without changing section order**

```tsx
it("renders trust narrative consolidation copy while preserving the approved homepage order", () => {
  mockLocale = "en";
  mockHomeBundle = enHome;

  render(<HomePage locale="en" />);

  const whyHmiossHeading = screen.getByRole("heading", { name: enHome.pillars.title });
  const flagshipHeading = screen.getByRole("heading", { name: enHome.flagship.title });
  const metricsHeading = screen.getByRole("heading", { name: enHome.metrics.title });

  expect(
    screen.getByText(
      "HMIOSS is a ROS-registered strategic education institution that develops future leaders through education, strategic thinking, research, national service, and international collaboration.",
    ),
  ).toBeInTheDocument();
  expect(screen.getByText(enHome.authority.title)).toBeInTheDocument();
  expect(screen.getByText(enHome.authority.summary)).toBeInTheDocument();
  expect(screen.getByText(enHome.metrics.description)).toBeInTheDocument();
  expect(
    whyHmiossHeading.compareDocumentPosition(flagshipHeading) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(
    flagshipHeading.compareDocumentPosition(metricsHeading) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});
```

- [ ] **Step 3: Add failing locale contract assertions for the new authority and metrics content**

```ts
expect(bundle.home.authority.eyebrow).toEqual(expect.any(String));
expect(bundle.home.authority.title).toEqual(expect.any(String));
expect(bundle.home.authority.summary).toEqual(expect.any(String));
expect(bundle.home.authority.items).toHaveLength(5);

expect(bundle.home.metrics.eyebrow).toEqual(expect.any(String));
expect(bundle.home.metrics.title).toEqual(expect.any(String));
expect(bundle.home.metrics.description).toEqual(expect.any(String));
expect(bundle.home.metrics.items).toHaveLength(5);
```

- [ ] **Step 4: Run the targeted tests to verify they fail**

Run:

```bash
npm test -- src/components/sections/sections.test.tsx src/tests/pages/phase2-homepage.test.tsx src/config/locale-content.test.ts
```

Expected:

```text
FAIL  src/components/sections/sections.test.tsx
FAIL  src/tests/pages/phase2-homepage.test.tsx
FAIL  src/config/locale-content.test.ts
```

- [ ] **Step 5: Commit the red test checkpoint**

```bash
git add src/components/sections/sections.test.tsx src/tests/pages/phase2-homepage.test.tsx src/config/locale-content.test.ts
git commit -m "test(homepage): lock trust narrative consolidation expectations"
```

### Task 2: Implement Authority Framing And Homepage Wiring

**Files:**
- Modify: `src/components/sections/AuthorityStrip.tsx`
- Modify: `src/pages/[locale]/index.tsx`
- Modify: `public/locales/en/home.json`

- [ ] **Step 1: Implement the richer AuthorityStrip contract**

```tsx
type AuthorityStripProps = {
  items: string[];
  eyebrow?: string;
  title?: string;
  summary?: string;
};

export function AuthorityStrip({ items, eyebrow, title, summary }: AuthorityStripProps) {
  return (
    <div className="grid gap-6 rounded-3xl border border-[#D4AF37]/30 bg-white p-8">
      {eyebrow || title || summary ? (
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-3 font-heading text-2xl text-[#1A2A3A] sm:text-3xl">{title}</h2>
          ) : null}
          {summary ? (
            <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{summary}</p>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A2A3A]"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire the authority object and metrics context into the homepage without changing section order**

```tsx
const authority = t("home:authority", {
  returnObjects: true,
}) as {
  eyebrow: string;
  title: string;
  summary: string;
  items: string[];
};
const metrics = t("home:metrics", {
  returnObjects: true,
}) as {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

const heroBody =
  t("home:hero.value");

const metricItems = siteConfig.stats.map((stat, index) => ({
  value: stat.value,
  label: t(`common:${stat.labelKey}`),
  description: metrics.items[index],
}));
```

```tsx
<AuthorityStrip
  eyebrow={authority.eyebrow}
  items={authority.items}
  summary={authority.summary}
  title={authority.title}
/>
```

```tsx
<section className="bg-[#F8F7F2] py-16">
  <Container className="grid gap-10">
    <SectionHeading
      eyebrow={metrics.eyebrow}
      title={metrics.title}
      description={metrics.description}
    />
    <InstitutionalMetrics items={metricItems} />
  </Container>
</section>
```

- [ ] **Step 3: Replace the English homepage trust copy with the consolidated narrative**

```json
{
  "hero": {
    "tagline": "Legacy of Honor. Future of Strategy.",
    "value": "HMIOSS is a ROS-registered strategic education institution that develops future leaders through education, strategic thinking, research, national service, and international collaboration.",
    "ctaPrimary": "Explore Our Programmes",
    "ctaSecondary": "Partner With Us"
  },
  "authority": {
    "eyebrow": "Institutional Trust",
    "title": "An institution built on registration, strategic focus, and cross-border collaboration",
    "summary": "These signals matter together: HMIOSS is formally registered, leadership-focused, internationally connected, and partnership-oriented.",
    "items": [
      "ROS Registered",
      "Strategic Education Institution",
      "International Hung Men Network",
      "Leadership Development Focus",
      "Strategic Partnerships"
    ]
  },
  "metrics": {
    "eyebrow": "Institutional Priorities",
    "title": "How HMIOSS turns institutional legitimacy into continuous work",
    "description": "The same institutional case continues through five reinforcing priorities: strategy, leadership, education, community contribution, and network strength.",
    "items": [
      "Strategy keeps education, partnerships, and service aligned with long-term institutional judgment.",
      "Leadership development remains the institute's first formation priority.",
      "Education gives HMIOSS a structured pathway for building capability.",
      "Community contribution turns institutional intent into visible public service.",
      "Institutional network strength connects members to wider collaboration and opportunity."
    ]
  }
}
```

- [ ] **Step 4: Run the targeted tests to verify the homepage wiring now passes**

Run:

```bash
npm test -- src/components/sections/sections.test.tsx src/tests/pages/phase2-homepage.test.tsx src/config/locale-content.test.ts
```

Expected:

```text
PASS  src/components/sections/sections.test.tsx
PASS  src/tests/pages/phase2-homepage.test.tsx
FAIL  src/config/locale-content.test.ts
```

- [ ] **Step 5: Commit the authority and metrics wiring**

```bash
git add src/components/sections/AuthorityStrip.tsx src/pages/[locale]/index.tsx public/locales/en/home.json
git commit -m "feat(homepage): consolidate trust framing on the homepage"
```

### Task 3: Localize The Trust Narrative Consolidation Across All Supported Homepages

**Files:**
- Modify: `public/locales/ms/home.json`
- Modify: `public/locales/zh-CN/home.json`
- Modify: `public/locales/zh-TW/home.json`
- Modify: `src/config/locale-content.test.ts`

- [ ] **Step 1: Add the Malay trust-consolidation copy**

```json
{
  "hero": {
    "value": "HMIOSS ialah institusi pendidikan strategik berdaftar ROS yang membangunkan pemimpin masa depan melalui pendidikan, pemikiran strategik, penyelidikan, khidmat negara, dan kerjasama antarabangsa."
  },
  "authority": {
    "eyebrow": "Kepercayaan Institusi",
    "title": "Institusi yang dibina atas pendaftaran rasmi, fokus strategik, dan kerjasama rentas sempadan",
    "summary": "Isyarat ini membawa maksud secara bersama: HMIOSS berdaftar secara rasmi, berfokus pada kepimpinan, terhubung di peringkat antarabangsa, dan berorientasikan perkongsian."
  },
  "metrics": {
    "eyebrow": "Keutamaan Institusi",
    "title": "Bagaimana HMIOSS meneruskan legitimasi institusi melalui kerja yang berterusan",
    "description": "Kes institusi yang sama diteruskan melalui lima keutamaan yang saling menguatkan: strategi, kepimpinan, pendidikan, sumbangan komuniti, dan kekuatan rangkaian.",
    "items": [
      "Strategi memastikan pendidikan, perkongsian, dan khidmat kekal selaras dengan pertimbangan institusi jangka panjang.",
      "Pembangunan kepimpinan kekal sebagai keutamaan pembentukan utama institusi.",
      "Pendidikan memberi HMIOSS laluan berstruktur untuk membina keupayaan.",
      "Sumbangan komuniti menukar niat institusi kepada khidmat awam yang nyata.",
      "Kekuatan rangkaian institusi menghubungkan ahli dengan kerjasama dan peluang yang lebih luas."
    ]
  }
}
```

- [ ] **Step 2: Add the Simplified Chinese trust-consolidation copy**

```json
{
  "hero": {
    "value": "HMIOSS 是一所经 ROS 正式注册的战略教育机构，通过教育、战略思维、研究、国家服务与国际合作培育未来领导者。"
  },
  "authority": {
    "eyebrow": "机构信任",
    "title": "建立在正式注册、战略定位与跨境合作之上的机构",
    "summary": "这些信号必须放在一起理解：HMIOSS 具备正式注册、领导力导向、国际连接与合作伙伴定位。"
  },
  "metrics": {
    "eyebrow": "机构重点",
    "title": "HMIOSS 如何把机构公信力持续转化为实际工作",
    "description": "同一个机构信任案例，通过五个相互强化的重点持续展开：战略、领导力、教育、社区贡献与网络实力。",
    "items": [
      "战略让教育、合作与服务始终与长期机构判断保持一致。",
      "领导力培养始终是机构最优先的形成任务。",
      "教育为 HMIOSS 提供了建设能力的结构化路径。",
      "社区贡献把机构意图转化为可见的公共服务。",
      "机构网络实力让成员连接到更广泛的合作与机会。"
    ]
  }
}
```

- [ ] **Step 3: Add the Traditional Chinese trust-consolidation copy and finalize the locale contract test**

```json
{
  "hero": {
    "value": "HMIOSS 是一所經 ROS 正式註冊的戰略教育機構，透過教育、戰略思維、研究、國家服務與國際合作培育未來領導者。"
  },
  "authority": {
    "eyebrow": "機構信任",
    "title": "建立在正式註冊、戰略定位與跨境合作之上的機構",
    "summary": "這些訊號必須一起理解：HMIOSS 具備正式註冊、領導力導向、國際連結與合作夥伴定位。"
  },
  "metrics": {
    "eyebrow": "機構重點",
    "title": "HMIOSS 如何把機構公信力持續轉化為實際工作",
    "description": "同一個機構信任案例，透過五個相互強化的重點持續展開：戰略、領導力、教育、社群貢獻與網絡實力。",
    "items": [
      "戰略讓教育、合作與服務始終與長期機構判斷保持一致。",
      "領導力培育始終是機構最優先的形成任務。",
      "教育為 HMIOSS 提供了建設能力的結構化路徑。",
      "社群貢獻把機構意圖轉化為可見的公共服務。",
      "機構網絡實力讓成員連結到更廣泛的合作與機會。"
    ]
  }
}
```

Run:

```bash
npm test -- src/config/locale-content.test.ts src/tests/pages/phase2-homepage.test.tsx
```

Expected:

```text
PASS  src/config/locale-content.test.ts
PASS  src/tests/pages/phase2-homepage.test.tsx
```

- [ ] **Step 4: Run the full automated verification suite**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

```text
Test Files  ... passed
✔ No ESLint warnings or errors
✓ Compiled successfully
```

- [ ] **Step 5: Commit the localized trust-consolidation copy**

```bash
git add public/locales/ms/home.json public/locales/zh-CN/home.json public/locales/zh-TW/home.json src/config/locale-content.test.ts
git commit -m "feat(i18n): localize homepage trust consolidation copy"
```

### Task 4: Run Production Verification And Record Evidence

**Files:**
- Modify: `docs/superpowers/reports/2026-06-25-hmioss-homepage-candidate-discovery-evidence.md`

- [ ] **Step 1: Perform the full narrative review against the implemented homepage**

Record a short pass inside the evidence report covering:

```md
## Production Verification — Trust Narrative Consolidation

### Narrative Review

- Identity:
- Trust:
- Philosophy:
- Method:
- Differentiation:
- Offer:
- Proof:
- Action:
```

Only keep statements that are specific to the implemented homepage and whether any layer was weakened.

- [ ] **Step 2: Record the before-vs-after evidence review**

Append these exact questions and answer them with concrete post-implementation observations:

```md
### Evidence Review

- Has the Trust barrier been materially reduced?
- Which candidate cause(s) did the implemented refinement address?
- Did the observed outcome support or weaken the current hypothesis?
- Were any new barriers discovered?
- Should confidence in the current explanation increase, decrease, or remain unchanged?
```

Then add one of these exact outcome labels:

```md
**Outcome:** Supports Hypothesis
```

or

```md
**Outcome:** Weakens Hypothesis
```

or

```md
**Outcome:** No Observable Change
```

- [ ] **Step 3: Capture unexpected discoveries without changing methodology**

If implementation reveals an anomaly, add:

```md
### Unexpected Discoveries

- Observation:
- Why it does not fit the current model:
- Whether it suggests a new barrier or stronger competing explanation:
```

Only include this section if an actual anomaly is observed.

- [ ] **Step 4: Push the verified implementation to the production branch and confirm deployment success**

Run:

```bash
git push origin HEAD
```

Expected:

```text
Enumerating objects: ...
To <remote>
   <old>..<new>  HEAD -> <branch>
```

Then verify the hosting platform reports a successful production deployment for the pushed commit and that the live homepage reflects the trust-consolidation changes without regressions.

- [ ] **Step 5: Commit the evidence review and freeze checkpoint**

```bash
git add docs/superpowers/reports/2026-06-25-hmioss-homepage-candidate-discovery-evidence.md
git commit -m "docs(homepage): record trust refinement verification"
```

## Self-Review

- Spec coverage: this plan covers trust-consolidation implementation, locale updates, local technical verification, production deployment confirmation, and the required evidence review without expanding into proof assets or new sections.
- Placeholder scan: no `TBD`, `TODO`, or deferred implementation steps remain; the only external dependency is the repo's existing production hosting flow, which is exercised through `git push origin HEAD` and explicit deployment verification.
- Type consistency: the plan uses `authority.eyebrow`, `authority.title`, `authority.summary`, `authority.items`, `metrics.eyebrow`, `metrics.title`, `metrics.description`, and `metrics.items` consistently across component, page, locale, and test updates.
