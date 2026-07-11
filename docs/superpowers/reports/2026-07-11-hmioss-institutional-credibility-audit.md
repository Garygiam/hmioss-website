# HMIOSS Institutional Credibility Stabilization QA Report

- Status: `QA complete in isolated worktree`
- Deployment status: `Not deployed`
- Worktree: `.worktrees/cred-stabilization`
- Baseline commit: `e8b40bc6dbd0b6356681166c769ca1c749ae5fe3`
- Preview URL: `http://localhost:3005`

## Fixed Defects In This Worktree

- Homepage hero no longer depends on remote AI imagery; public placeholder surfaces now fall back to plain HMIOSS navy.
- Opening Ceremony now uses an internal navy fallback panel instead of a broken external image.
- Recognition translations load through the registered `recognition` namespace.
- Recognition public delivery now includes five verified letters:
  - Chinese Youth Entrepreneurs Association
  - Holland-China Business Culture & Education Association
  - Zhi Gong Arts Institute
  - China (Macau) Zhi Gong Association
  - Thayninga Institute for Strategic Studies
- Taiwan remains on hold.
- The unidentified PDF and WhatsApp-named file remain private.
- GA4 `G-9C9WT5DET0` is installed once globally via `next/script`.

## Verification

- Full tests: `PASS` (`145/145`)
- Lint: `PASS`
- Production build: `PASS`
- Production preview: `PASS`
- Local recognition asset delivery:
  - `200 OK` for all five approved public runtime files
- Local recognition privacy holds:
  - `404 Not Found` for Taiwan hold asset path
  - `404 Not Found` for the unidentified PDF path
  - `404 Not Found` for the WhatsApp-named file path
- Browser QA evidence captured:
  - desktop home
  - desktop recognition
  - desktop leadership
  - desktop news
  - narrow join
- GA4 verification:
  - one runtime installation in `src/pages/_app.tsx`
  - `googletagmanager` request observed in preview
  - `google-analytics.com/g/collect` page-view requests observed after preview navigation

## Before And After Evidence

### 1. Homepage Hero Stabilization

- Before: live production homepage still renders a remote hero image surface and retains public-facing placeholder behavior. Evidence:
  - [hmioss-live-before-home.png](file:///var/folders/7_/mwzjydvd3l75ldwp7430_hlm0000gn/T/trae/screenshots/hmioss-live-before-home.png)
  - live snapshot shows an `img` with alt `International Hung Men Institute of Strategic Studies` in the hero
- After: isolated preview removes the hero image dependency and uses plain HMIOSS navy. Evidence:
  - [hmioss-cred-desktop-home.png](file:///var/folders/7_/mwzjydvd3l75ldwp7430_hlm0000gn/T/trae/screenshots/hmioss-cred-desktop-home.png)
  - preview snapshot for `http://localhost:3005/en` shows no hero image node

### 2. Opening Ceremony Card Fallback

- Before: live production still renders the external Opening Ceremony image dependency. Evidence:
  - live snapshot for `https://www.hmioss.org/en/news` shows `img` alt `Guests officiate the HMIOSS opening ceremony`
  - external source host remains `cdn.sinchew.com.my`
- After: isolated preview replaces the card image with a dark-navy fallback panel labeled `HMIOSS`. Evidence:
  - [hmioss-cred-desktop-news.png](file:///var/folders/7_/mwzjydvd3l75ldwp7430_hlm0000gn/T/trae/screenshots/hmioss-cred-desktop-news.png)
  - preview snapshot for `http://localhost:3005/en/news` shows no card image node for the Opening Ceremony item

### 3. Recognition Translation Repair

- Before: live production renders raw i18n keys. Evidence:
  - live snapshot for `https://www.hmioss.org/en/recognition` shows `hero.subtitle`, `sectionTitle`, `sectionDescription`, `groups.congratulatoryLetters.viewCredential`, and `labels.date`
- After: isolated preview renders translated headings and `View Letter` labels. Evidence:
  - [hmioss-cred-desktop-recognition.png](file:///var/folders/7_/mwzjydvd3l75ldwp7430_hlm0000gn/T/trae/screenshots/hmioss-cred-desktop-recognition.png)
  - preview snapshot for `http://localhost:3005/en/recognition` shows translated content and five `View Letter` links

### 4. Recognition Letter Delivery Repair

- Before: live production currently returns `404` for the four already-public recognition letter URLs. Evidence:
  - `chinese-youth-entrepreneurs-association-2026-05.jpg` → `HTTP/2 404`
  - `holland-china-business-culture-education-association-2026-05-21.jpg` → `HTTP/2 404`
  - `zhi-gong-arts-institute-2026-05-21.jpg` → `HTTP/2 404`
  - `china-macau-zhi-gong-association-2026-05-26.jpg` → `HTTP/2 404`
- After: isolated preview returns `200 OK` for all five approved public files, including Myanmar / Thayninga. Evidence:
  - local `curl -I` checks returned `HTTP/1.1 200 OK` for all five approved public files

### 5. Myanmar / Thayninga Publication

- Before: no public runtime file was available on the live site.
- After: isolated preview includes `thayninga-institute-for-strategic-studies.jpeg` in the governed public set and renders it on the Recognition page. Evidence:
  - preview snapshot for `http://localhost:3005/en/recognition` includes `Thayninga Institute for Strategic Studies`
  - local `curl -I` returned `HTTP/1.1 200 OK`

### 6. Held And Private Recognition Assets

- Decision preserved:
  - Taiwan remains on hold
  - unidentified `賀函.pdf` remains private
  - WhatsApp-named source remains private
- Evidence:
  - local `curl -I` returned `HTTP/1.1 404 Not Found` for `tccoc-letter-2026-05.pdf`
  - local `curl -I` returned `HTTP/1.1 404 Not Found` for `賀函.pdf`
  - local `curl -I` returned `HTTP/1.1 404 Not Found` for `WhatsApp Image 2026-07-07 at 07.59.36.jpeg`

### 7. Leadership Portrait Framing

- Before: live production uses the previous portrait framing and hero placeholder surface. Evidence:
  - live snapshot for `https://www.hmioss.org/en/leadership` shows the placeholder hero image and prior card framing surface
- After: isolated preview removes the placeholder hero image and shifts portraits to a taller, top-aligned frame. Evidence:
  - [hmioss-cred-desktop-leadership.png](file:///var/folders/7_/mwzjydvd3l75ldwp7430_hlm0000gn/T/trae/screenshots/hmioss-cred-desktop-leadership.png)

### 8. Join Timeline Wrapping

- Before: live production still uses the placeholder hero image and the original timeline card layout. Evidence:
  - live snapshot for `https://www.hmioss.org/en/join` shows the placeholder hero image and the original headings
- After: isolated preview removes the placeholder hero image and applies balanced timeline headings with `text-balance`. Evidence:
  - [hmioss-cred-narrow-join.png](file:///var/folders/7_/mwzjydvd3l75ldwp7430_hlm0000gn/T/trae/screenshots/hmioss-cred-narrow-join.png)
  - component tests confirm `Onboarding & Orientation` and `Participate & Grow` render with `text-balance`

### 9. Placeholder Illustration And Gradient Cleanup

- Before: live production still uses placeholder imagery across homepage, news, recognition, leadership, and join hero surfaces.
- After: isolated preview removes public placeholder image usage from the approved stabilization surfaces and relies on plain HMIOSS navy where no approved image exists.

### 10. GA4 Global Installation

- Before: audit confirmed no GA4 or Google tag implementation in the runtime codebase.
- After: isolated preview loads GA4 once globally via `next/script`. Evidence:
  - runtime source: `src/pages/_app.tsx`
  - preview network log shows `https://www.googletagmanager.com/gtag/js?id=G-9C9WT5DET0`
  - preview network log shows `https://www.google-analytics.com/g/collect...en=page_view` after navigation

## Accessibility And Scope Notes

- Recognition letters open in a new tab and retain approved ordering.
- No Taiwan, unidentified, or WhatsApp-named recognition asset was made public.
- No Brand Registry architecture change was made.
- No frozen Brand Asset Package file was modified.

## Approval Gate

- Ready for Gary and Nat review before any deployment.
- No changes were applied to the frozen Brand Asset Package or Brand Registry architecture.
