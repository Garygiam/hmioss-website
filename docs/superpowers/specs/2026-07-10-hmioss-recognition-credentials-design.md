# HMIOSS Recognition & Credentials Design

**Date:** 2026-07-10

**Project:** International Hung Men Institute of Strategic Studies website

**Scope:** Recognition & Credentials slice specification for a single HMIOSS reference implementation. This is not a GEH standard.

## Reference Implementation Metadata

- `Reference Implementation`: HMIOSS
- `Venture`: HMIOSS
- `Slice`: Recognition & Credentials
- `Reference Baseline Before Slice`: Leadership Slice v1.0
- `Current Certified Baseline`: Leadership Slice — Production Certified
- `Status`: Approved for implementation planning
- `Deferred Follow-On Slice`: Institutional Gallery

## Purpose

This slice implements the public `Recognition & Credentials` page using a generic `Institutional Credential` model that renders only verified public credentials.

The objective is not to expose every known asset, represent missing evidence publicly, or redesign the page whenever new credential types arrive.

The objective is to establish a stable Recognition baseline that:

- uses the verified institutional evidence already available,
- renders credential groups dynamically from governed content,
- hides empty groups automatically,
- keeps missing or unverified assets in governance documentation only, and
- allows later asset additions without restructuring the page.

## Slice Outcome

- `Public page title`: Recognition & Credentials
- `Internal model category`: Institutional Credentials
- `Current slice status target`: Certified Slice Baseline
- `Implementation rule`: build the complete public page architecture now, but populate only verified assets

## Lifecycle For This Slice

Recognition & Credentials proceeds through this approved sequence:

1. `Asset Verification`
2. `Implementation`
3. `Gary Review`
4. `Slice Verification`
5. `Production Verification`
6. `Certified Slice Baseline`

This slice does not include final whole-site launch certification.

## Hard Constraints

- Do not reopen or redesign Leadership unless a production defect or approved business change is identified.
- Do not expose placeholders, empty-state promises, or public "pending verification" markers.
- Do not make missing assets block the page architecture if enough verified assets exist to implement the slice.
- Do not publish unverified assets.
- Do not hardcode the page around two fixed sections that require redesign when new credential types are added.
- Do not introduce reusable abstractions that only serve future GEH standardization.
- Keep HMIOSS concrete-first and implementation-focused.
- Record observations only; defer reusable abstractions to Knowledge Harvest.

## Public Rendering Rules

- The page renders from a generic `Institutional Credential` model.
- Credential groups appear only when they contain at least one verified public credential.
- Verified public credentials appear in their governed display order.
- Missing or unresolved credentials remain invisible on the public page.
- Public content must never reveal internal governance states such as `Draft`, `Submitted`, `Pending Verification`, or file-missing conditions.
- The page structure must remain stable when new credential groups are added later; new groups should slot into the model without forcing a redesign of existing groups.

## Institutional Credential Model

The public page should be driven by a model with two layers:

### Credential Groups

Each group represents a credential family, for example:

- `Official Registration`
- `Congratulatory Letters`
- future verified credential families when available

Each group should define:

- `key`
- `publicTitle`
- `publicDescription`
- `displayOrder`
- `items`

### Credential Items

Each public item should contain only the fields needed for rendering verified evidence, such as:

- `key`
- `groupKey`
- `organizationName` or `displayName`
- `countryTerritory` when verified and intended for public display
- `visibleDate` in governed form
- `documentType`
- `previewSrc` when a public image preview exists
- `documentSrc` when a public document exists
- `imageAlt` or `documentAlt`
- `isVerifiedForPublicDisplay`

The public renderer must filter out any item that is not verified for public display.

## Current Verified-Assets Rule

At implementation time, only verified public assets are rendered.

This means:

- currently verified congratulatory letters may appear,
- unresolved assets such as the missing ROS certificate or missing TCCOC letter do not appear publicly,
- unresolved metadata such as unidentified organization/date must remain in governance documentation only.

The page architecture must still support those credential families so they can be added later without page redesign.

## Baseline Asset Gate

Every credential in this slice must be classified as one of:

- `Required for Recognition v1`
- `Deferred to a later version`
- `Rejected / not publishable`

This gate prevents `verified-assets-only` from degrading into "publish whatever happens to be available."

Implementation may begin before every required asset arrives, but the slice must not become `Production Certified` until all `Required for Recognition v1` credentials are present and verified for public display.

### Current Recognition v1 Classification

- `ROS registration certificate` -> `Required for Recognition v1`
- `Verified congratulatory letters already supplied` -> `Required for Recognition v1`
- `TCCOC letter` -> `Gary decision required: Required for Recognition v1 or Deferred to a later version`
- `Unidentified 賀函.pdf` -> `Rejected / not publishable until identified and verified`

### Certification Implication

The Recognition page may be implemented using the currently verified public credentials, but the slice cannot be certified while any credential still classified as `Required for Recognition v1` remains missing or unverified.

## Page Structure

The page should present:

1. a Recognition & Credentials hero and introduction,
2. a dynamically rendered list of non-empty credential groups,
3. within each group, institutional cards or evidence blocks based on the verified public credential model.

The renderer must not assume that all groups will always exist.

For example:

- if `Official Registration` has no verified public item, the group stays hidden,
- if `Congratulatory Letters` has verified items, that group renders,
- if a future credential type becomes verified later, it can appear through the same group renderer without redesigning the page shell.

## Implementation Surface

- `Primary config surface`: `src/config/recognition.ts`
- `Primary page surface`: `src/pages/[locale]/recognition.tsx`
- `Primary test surface`: `src/config/recognition.test.ts`
- `Supporting page tests`: `src/tests/pages/institutional-pages.test.tsx`
- `Locale content surface`: `public/locales/*/recognition.json`
- `Governance source of truth`: `docs/assets-source/package/hmioss-asset-package-v1.md`
- `Governance blocker log`: `docs/assets-source/package/leadership-recognition-v1-inventory-gap-report.md`

## Verification Expectations

### Asset Verification

Before each credential item is rendered publicly, verify:

- source file exists,
- public asset path is governed,
- required public metadata is confirmed,
- the item is approved for public display.

### Slice Verification

The Recognition slice is considered technically verified when:

- the dynamic credential-group model is in place,
- only verified assets are rendered publicly,
- empty groups are hidden,
- tests for config and page rendering pass,
- lint passes,
- build passes,
- no Leadership regressions are introduced.

### Production Verification

The slice is considered production verified when:

- the Recognition page renders correctly in production,
- only verified evidence is visible,
- document and image links resolve successfully,
- locale behavior matches the approved baseline for this slice,
- no out-of-scope changes were introduced to Leadership or unrelated areas.

### Certified Slice Baseline

The slice becomes the certified Recognition baseline only after:

- implementation is complete,
- Gary Review is complete,
- slice verification passes,
- production verification passes,
- every credential classified as `Required for Recognition v1` is present and verified for public display.

## Deferred Follow-On Slice

After Recognition & Credentials reaches `Certified Slice Baseline`, open a separate `Institutional Gallery` slice for the Genovasi MOU photos.

That later slice must:

- go through its own asset-ingestion and implementation cycle,
- leave Leadership and Recognition unchanged unless an actual production defect is discovered,
- become its own certified slice baseline before final whole-site launch work.

This Recognition specification does not design the Institutional Gallery beyond recording it as the next deferred slice.

## Final Whole-Site Certification Context

After the certified baselines exist for:

- Leadership
- Recognition & Credentials
- Institutional Gallery

run one final whole-site sequence:

1. `Launch QA`
2. `Production Certification`
3. `Go / No-Go`
4. `Public Launch / Announcement`

## Known Limitations

- This slice does not resolve missing credential sources by itself.
- This slice does not conclude that the current verified evidence set is complete.
- This slice does not promote any reusable credential system into GEH Core.
- This slice does not cover Institutional Gallery implementation details.
