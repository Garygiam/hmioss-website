# HMIOSS Asset Package v1

**Package:** HMIOSS Asset Package  
**Version:** v1.0.0  
**Status:** Draft  
**Canonical Route:** `/recognition`  

## Approval Gate

This package must be frozen before any implementation begins.

Implementation slices are blocked until:

- Asset Register is approved
- All referenced source files exist
- Display order and titles are locked
- Package status is marked `Production Approved`

## Approval Checklist

- [ ] Asset Register (Canonical)
- [ ] Approved Source Files
- [ ] Website Presentation Specification
- [ ] Filenames
- [ ] Titles
- [ ] Captions
- [ ] Page Structure
- [ ] Package status marked `Production Approved`

## Asset Status Lifecycle

Assets may move through the following lifecycle:

- Draft
- Submitted
- Verified
- Approved
- Production
- Archived

## Asset Register (Canonical)

### Leadership Portraits

**Status:** Production Certified  
**Scope:** Leadership only. Overall package status remains `Draft`.  
**Technical Verification:** Saac  
**Architecture Review:** Nat  
**Business Approval:** Gary Giam  
**Verification Date:** 2026-07-10  

**Reference Baseline:** Leadership Slice v1.0  
**Commit:** `b4877b2`  
**Package:** `hmioss-asset-package-v1.md`  

Each leadership portrait entry must preserve identity exactly and conform to the approved portrait standard (including body-angle normalization to a 10–15° turn).

| ID | displayName | searchName | title.en | title.ms | title.zh-CN | title.zh-TW | translationStatus | originalFile | approvedMasterFile | sourceStatus | production | assetStatus | version | lastUpdated | approvedBy |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| leadership-001 | Young Shang Yi | young-shang-yi | Chairman | Pengerusi |  |  | pending | docs/assets-source/leadership/originals/Young Shang Yi.png | docs/assets-source/leadership/approved-masters/young-shang-yi.png | present | public/images/leadership/young-shang-yi.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-002 | Dato’ Sri Charles Hwang | charles-hwang | Deputy Chairman | Timbalan Pengerusi |  |  | pending | docs/assets-source/leadership/originals/Dato sri Charles Hwang.png | docs/assets-source/leadership/approved-masters/charles-hwang.png | present | public/images/leadership/dato-sri-charles-hwang.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-003 | Gary Giam | gary-giam | Vice President | Naib Presiden |  |  | pending | docs/assets-source/leadership/originals/Gary Giam .png | docs/assets-source/leadership/approved-masters/gary-giam.png | present | public/images/leadership/gary-giam.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-004 | Dato’ Henry Lee | henry-lee | Vice President | Naib Presiden |  |  | pending | docs/assets-source/leadership/originals/Dato Henry Lee.png | docs/assets-source/leadership/approved-masters/henry-lee.png | present | public/images/leadership/dato-henry-lee.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-005 | Prof. Dr. Vincent Wee Eng Kim | vincent-wee | Secretary General | Setiausaha Agung |  |  | pending | docs/assets-source/leadership/originals/Prof Vincent .png | docs/assets-source/leadership/approved-masters/vincent-wee.png | present | public/images/leadership/prof-vincent-wee-eng-kim.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-006 | James Hwang | james-hwang | Treasurer | Bendahari |  |  | pending | docs/assets-source/leadership/originals/james Hwang.png | docs/assets-source/leadership/approved-masters/james-hwang.png | present | public/images/leadership/james-hwang.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-007 | Datin Sri Shanice Ng | shanice-ng | Director of Strategic Partnerships & Aviation Development | Pengarah |  |  | pending | docs/assets-source/leadership/originals/Datin Sri Shanice.png | docs/assets-source/leadership/approved-masters/shanice-ng.png | present | public/images/leadership/datin-sri-shanice-ng.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-008 | Apple Teo Siew Chyi | apple-teo | Director of External Relations & Resource Development | Pengarah |  |  | pending | docs/assets-source/leadership/originals/Apple.png | docs/assets-source/leadership/approved-masters/apple-teo.png | present | public/images/leadership/apple-teo-siew-chyi.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-009 | Krishnaveni Selvaraju | krishnaveni-selvaraju | Director of Education Recruitment | Pengarah Rekrutmen Pendidikan |  |  | pending | docs/assets-source/leadership/originals/Krishnaveni Selvaraju .png | docs/assets-source/leadership/approved-masters/krishnaveni-selvaraju.png | present | public/images/leadership/krishnaveni-selvaraju.webp | Production | v1.0.0 | 2026-07-10 | |
| leadership-010 | Chooi Mee See | mee-see | Director of Training & Professional Development | Pengarah |  |  | pending | docs/assets-source/leadership/originals/Mee See .png | docs/assets-source/leadership/approved-masters/mee-see.png | present | public/images/leadership/chooi-mee-see.webp | Production | v1.0.0 | 2026-07-10 | |

### Institutional Credentials (Recognition & Credentials)

#### Official Registration

| ID | displayName | category | caption.en | caption.ms | caption.zh-CN | caption.zh-TW | translationStatus | sourceFile | sourceStatus | production | assetStatus | version | lastUpdated | approvedBy |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| institutional-credentials-001 | ROS Registration Certificate | Official Registration | Registered with the Registrar of Societies Malaysia. | Berdaftar dengan Jabatan Pendaftaran Pertubuhan Malaysia. |  |  | pending | docs/assets-source/recognition/official-registration/ros-registration-certificate.pdf | missing | public/documents/recognition/official-registration/ros-registration-certificate.pdf | Draft | v1.0.0 | 2026-07-10 | |

#### Congratulatory Letters

| ID | organizationName | searchName | countryTerritory | visibleDate | documentType | sourceOriginal | sourceGoverned | sourceStatus | production | assetStatus | version | lastUpdated | approvedBy | metadataStatus |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| institutional-credentials-101 | Chinese Youth Entrepreneurs Association | cyea | Pending Confirmation | 2026-05 | Congratulatory Letter | docs/assets-source/recognition/congratulatory-letters/chinese-youth-entrepreneurs-association-2026-05.jpg | docs/assets-source/recognition/congratulatory-letters/chinese-youth-entrepreneurs-association.jpg | present | public/documents/recognition/congratulatory-letters/chinese-youth-entrepreneurs-association.pdf | Submitted | v1.0.0 | 2026-07-10 | | country pending |
| institutional-credentials-102 | Holland-China Business Culture & Education Association | hcbcea | Netherlands | 2026-05-21 | Congratulatory Letter | docs/assets-source/recognition/congratulatory-letters/holland-china-business-culture-education-association-2026-05-21.jpg | docs/assets-source/recognition/congratulatory-letters/holland-china-business-culture-education-association.jpg | present | public/documents/recognition/congratulatory-letters/holland-china-business-culture-education-association.pdf | Submitted | v1.0.0 | 2026-07-10 | | verified |
| institutional-credentials-103 | Zhi Gong Arts Institute | zhi-gong-arts-institute | Netherlands | 2026-05-21 | Congratulatory Letter | docs/assets-source/recognition/congratulatory-letters/zhi-gong-arts-institute-2026-05-21.jpg | docs/assets-source/recognition/congratulatory-letters/zhi-gong-arts-institute.jpg | present | public/documents/recognition/congratulatory-letters/zhi-gong-arts-institute.pdf | Submitted | v1.0.0 | 2026-07-10 | | verified |
| institutional-credentials-104 | China (Macau) Zhi Gong Association | macau-zhi-gong-association | Macau | 2026-05-26 | Congratulatory Letter | docs/assets-source/recognition/congratulatory-letters/china-macau-zhi-gong-association-2026-05-26.jpg | docs/assets-source/recognition/congratulatory-letters/macau-zhi-gong-association.jpg | present | public/documents/recognition/congratulatory-letters/macau-zhi-gong-association.pdf | Submitted | v1.0.0 | 2026-07-10 | | verified |
| institutional-credentials-105 | Thayninga Institute for Strategic Studies | thayninga-institute-for-strategic-studies | Myanmar | Pending Confirmation | Congratulatory Letter | docs/assets-source/recognition/congratulatory-letters/WhatsApp Image 2026-07-07 at 07.59.36.jpeg | docs/assets-source/recognition/congratulatory-letters/thayninga-institute-for-strategic-studies.jpeg | present | public/documents/recognition/congratulatory-letters/thayninga-institute-for-strategic-studies.pdf | Submitted | v1.0.0 | 2026-07-10 | | date pending |
| institutional-credentials-106 | Taiwan Chamber of Commerce in Orange County | tccoc | Pending Confirmation | Pending Confirmation | Congratulatory Letter | Pending Confirmation | Pending Confirmation | missing | public/documents/recognition/congratulatory-letters/tccoc-congratulatory-letter.pdf | Draft | v1.0.0 | 2026-07-10 | | file missing |
| institutional-credentials-107 | Unidentified Congratulatory Letter (PDF) | unidentified-congratulatory-letter | Pending Confirmation | Pending Confirmation | Congratulatory Letter | docs/assets-source/recognition/congratulatory-letters/賀函.pdf | docs/assets-source/recognition/congratulatory-letters/unidentified-congratulatory-letter.pdf | present | Pending Confirmation | Submitted | v1.0.0 | 2026-07-10 | | identify organization/date |

### Institutional Gallery (Deferred Follow-On Slice)

| Event ID | eventName | sourceFolder | sourceStatus | verificationStatus | sliceStatus | fileCount | currentGaps |
|---|---|---|---|---|---|---|---|
| gallery-event-001 | Genovasi MOU Photos | docs/assets-source/gallery/originals/genovasi-mou/ | present | Verified event intake | Deferred | 9 | event date, public captions, public display order, selected-photo subset |

## Website Presentation Specification

### Leadership

Order and titles are locked by this section.

1. Young Shang Yi — Chairman
2. Dato’ Sri Charles Hwang — Deputy Chairman
3. Gary Giam — Vice President
4. Dato’ Henry Lee — Vice President
5. Prof. Dr. Vincent Wee Eng Kim — Secretary General
6. James Hwang — Treasurer
7. Datin Sri Shanice Ng — Director of Strategic Partnerships & Aviation Development
8. Apple Teo Siew Chyi — Director of External Relations & Resource Development
9. Krishnaveni Selvaraju — Director of Education Recruitment
10. Chooi Mee See — Director of Training & Professional Development

### Recognition & Credentials

Order and structure are locked by this section.

1. Official Registration
2. Congratulatory Letters

Congratulatory Letters order:

1. Chinese Youth Entrepreneurs Association
2. Holland-China Business Culture & Education Association
3. Zhi Gong Arts Institute
4. China (Macau) Zhi Gong Association
5. Thayninga Institute for Strategic Studies
6. Taiwan Chamber of Commerce in Orange County
7. Future additions…

### Institutional Gallery

Deferred follow-on slice only. The first verified gallery event is `gallery-event-001` (`Genovasi MOU Photos`), recorded for later implementation after Recognition & Credentials reaches its certified baseline.

## Implementation Slices (Locked)

1. Leadership — Production Certified
2. Recognition & Credentials — Active implementation slice
3. Institutional Gallery — Deferred follow-on slice after Recognition & Credentials certification

## Production Approval

When and only when Gary approves:

- Asset Register
- Source Files
- Display Order
- Titles
- Captions
- Filenames
- Page Structure

Update package status to:

**Status:** Production Approved
