# HMIOSS Asset Inventory & Gap Report

**Package:** HMIOSS Asset Package  
**Version:** v1.0.0  
**Status:** Draft  
**Canonical Index:** docs/assets-source/package/hmioss-asset-package-v1.md  
**Generated:** 2026-07-10  

## Executive Summary

- Leadership portraits: 10/10 present in governed source folders (originals + approved-masters).
- Leadership slice baseline: production certified on 2026-07-10 as the current Leadership baseline.
- Official registration: ROS certificate source file missing.
- Congratulatory letters: 5/6 target organizations have some source material present; 1/6 target organizations missing; 1 additional unidentified PDF present.
- Institutional Gallery intake: first deferred event (`gallery-event-001`, Genovasi MOU Photos) ingested with 9 original files preserved in the governed source folder.
- Metadata extraction: dates and countries captured only where visible on the document; remaining fields marked Pending Confirmation.
- Implementation: Leadership is complete; Recognition & Credentials remains blocked by source and metadata gaps.

## Governed Source Ingestion

### Leadership (Source Masters)

- Source folders:
  - docs/assets-source/leadership/originals/
  - docs/assets-source/leadership/approved-masters/
- Ingestion result:
  - 10 originals preserved with supplied filenames (including spaces)
  - 10 governed approved-masters created with normalized filenames using searchName (no edits applied)

### Institutional Credentials (Source Masters)

- Source folders:
  - docs/assets-source/recognition/official-registration/
  - docs/assets-source/recognition/congratulatory-letters/
- Ingestion result:
  - All supplied congratulatory-letter files copied and preserved
  - Governed copies created for known letters using normalized filenames
  - ROS registration certificate not present in source folder

### Institutional Gallery (Deferred Source Intake)

- Source folder:
  - docs/assets-source/gallery/originals/genovasi-mou/
- Ingestion result:
  - 9 original event files preserved with supplied filenames
  - Event recorded as `gallery-event-001` for later slice implementation
  - No gallery page or public production assets created in this intake step

## Asset Register Reconciliation (By Section)

### Leadership Portraits

- Present: all 10 originals and all 10 approved-masters are present.
- Pending:
  - zh-CN / zh-TW leadership titles are intentionally blank with translationStatus pending.
  - Some original filenames contain trailing spaces; governed approved-masters are normalized, but originals remain untouched by design.

### Official Registration

- Missing:
  - docs/assets-source/recognition/official-registration/ros-registration-certificate.pdf
- Locked metadata (already provided in requirements, not inferred):
  - Registration number: PPM-013-10-09032026
  - Registration date: 9 March 2026

### Congratulatory Letters

#### Present (with visible metadata extracted)

- Holland-China Business Culture & Education Association
  - Source present (image)
  - Visible date: 2026-05-21
  - Country/territory: Netherlands (visible)
  - Metadata status: verified
- Zhi Gong Arts Institute
  - Source present (image)
  - Visible date: 2026-05-21
  - Country/territory: Netherlands (visible)
  - Metadata status: verified
- China (Macau) Zhi Gong Association
  - Source present (image)
  - Visible date: 2026-05-26
  - Country/territory: Macau (visible)
  - Metadata status: verified
- Thayninga Institute for Strategic Studies
  - Source present (image)
  - Visible date: Pending Confirmation
  - Country/territory: Myanmar (visible)
  - Metadata status: date pending

#### Present (partial metadata; pending confirmation)

- Chinese Youth Entrepreneurs Association
  - Source present (image)
  - Visible date: 2026-05
  - Country/territory: Pending Confirmation (not visible on the document)
  - Metadata status: country pending

#### Missing (no source file yet)

- Taiwan Chamber of Commerce in Orange County
  - Source file missing (expected PDF)
  - Country/territory: Pending Confirmation
  - Visible date: Pending Confirmation

#### Extra / Unidentified

- Unidentified Congratulatory Letter (PDF)
  - Source present: docs/assets-source/recognition/congratulatory-letters/賀函.pdf
  - Identity/date: Pending Confirmation
  - Action: determine which organization this corresponds to (or whether it is an additional letter outside the locked list)

### Institutional Gallery

- Present:
  - `gallery-event-001` recorded for the Genovasi MOU event
  - 9 source originals ingested into `docs/assets-source/gallery/originals/genovasi-mou/`
- Pending:
  - Event date
  - Public event title/caption set
  - Public display order
  - Selected-photo subset for future implementation
- Boundary:
  - Gallery remains a deferred follow-on slice and must not be implemented publicly until Recognition & Credentials reaches its certified baseline

## Production Approved Gaps (Blocking)

- ROS registration certificate PDF is missing in the governed source folder.
- Taiwan Chamber of Commerce in Orange County letter is missing in the governed source folder.
- Unidentified PDF (賀函.pdf) requires identification (organization + date) or explicit exclusion.
- Institutional Gallery event metadata remains incomplete for `gallery-event-001` (event date, captions, display order, selected-photo subset).
- Leadership titles for zh-CN / zh-TW remain pending canonical translation, but English fallback is accepted for the frozen Leadership baseline.
- Existing Recognition-slice locale/test failures remain outside Leadership scope and should be resolved in the Recognition slice, not retrofitted into the frozen Leadership baseline.

## Next Review Gate (Gary + Nat)

- Review the updated canonical package index:
  - docs/assets-source/package/hmioss-asset-package-v1.md
- Confirm:
  - which missing recognition source files will be provided (ROS + TCCOC)
  - whether the unidentified PDF maps to an existing letter or should be excluded
  - the missing public metadata for `gallery-event-001` before the Institutional Gallery slice begins
  - Recognition & Credentials slice readiness once source blockers are cleared
