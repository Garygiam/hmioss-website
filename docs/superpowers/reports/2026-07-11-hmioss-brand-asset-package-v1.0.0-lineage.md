# HMIOSS Brand Asset Package v1.0.0 Lineage

## Scope

- Phase 2 only.
- Phase 1 accepted baseline: `public/brand/v1/masters/*`.
- Final QA correction pass trims runtime wordmarks, rebuilds the favicon package, and adds QA evidence only.
- No consumer wiring, no visible behavior changes, and no IGC asset generation.

## Lineage Flow

```text
Phase 1 accepted baseline (public/brand/v1/masters/*)
-> governed masters (public/brand/masters/hmioss/v1.0.0/*)
-> extracted transparent wordmarks + governed runtime assets (public/brand/runtime/hmioss/v1.0.0/logo/*)
-> compact favicon/app-icon package (public/brand/favicons/hmioss/v1.0.0/*)
-> manifest package (public/brand/manifests/hmioss/v1.0.0/site.webmanifest)
-> compatibility entrypoints (public/favicon*, public/apple-touch-icon.png, public/android-chrome-*.png, public/site.webmanifest)
-> QA evidence artifacts (docs/superpowers/reports/assets/*)
```

## Measured Wordmark Bounding Boxes

| Source Master | Edge Background | Measured Non-Transparent Box | Published Runtime Derivative |
| --- | --- | --- | --- |
| `public/brand/masters/hmioss/v1.0.0/wordmark-light.png` | White plate | 821x153 | `public/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png` |
| `public/brand/masters/hmioss/v1.0.0/wordmark-dark.png` | Navy plate | 821x153 | `public/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png` |

## Governed Inventory

| File | Lineage | Dimensions | Size | Transparency | Background Suitability |
| --- | --- | --- | --- | --- | --- |
| `public/brand/masters/hmioss/v1.0.0/hmioss-master-source.pdf` | `public/brand/v1/masters/hmioss-master-source.pdf` | - | 1229276 bytes | n/a | Governance source only; not a runtime surface. |
| `public/brand/masters/hmioss/v1.0.0/wordmark-light.png` | `public/brand/v1/masters/hmioss-wordmark-light.png` | 967x967 | 22527 bytes | Transparent alpha | Transparent mark for dark surfaces, photography, and dark UI backgrounds. |
| `public/brand/masters/hmioss/v1.0.0/wordmark-dark.png` | `public/brand/v1/masters/hmioss-wordmark-dark.png` | 967x967 | 23875 bytes | Transparent alpha | Transparent mark for light and neutral surfaces. |
| `public/brand/masters/hmioss/v1.0.0/extended-lockup.png` | `public/brand/v1/masters/hmioss-extended-lockup.png` | 1235x601 | 32301 bytes | Transparent alpha | Transparent lockup for documentation and institutional presentations; not a compact icon. |
| `public/brand/masters/hmioss/v1.0.0/icon.png` | `public/brand/v1/masters/hmioss-icon.png` | 637x637 | 19967 bytes | Transparent alpha | Transparent square mark for compact/icon surfaces on light or dark backgrounds. |
| `public/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png` | `public/brand/masters/hmioss/v1.0.0/wordmark-light.png` after white-plate extraction and trim | 821x153 | 10472 bytes | Transparent alpha | Header-ready transparent mark for light and neutral UI surfaces. |
| `public/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png` | `public/brand/masters/hmioss/v1.0.0/wordmark-dark.png` after navy-plate extraction and trim | 821x153 | 10982 bytes | Transparent alpha | Header-ready transparent mark for dark surfaces and photography. |
| `public/brand/runtime/hmioss/v1.0.0/logo/extended-lockup.png` | `public/brand/masters/hmioss/v1.0.0/extended-lockup.png` | 1024x498 | 113741 bytes | Transparent alpha | Transparent lockup for documentation and institutional presentations; not a compact icon. |
| `public/brand/runtime/hmioss/v1.0.0/logo/icon.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 512x512 | 42459 bytes | Transparent alpha | Transparent square mark for compact/icon surfaces on light or dark backgrounds. |
| `public/brand/favicons/hmioss/v1.0.0/favicon.ico` | `public/brand/favicons/hmioss/v1.0.0/favicon-16x16.png + public/brand/favicons/hmioss/v1.0.0/favicon-32x32.png + public/brand/favicons/hmioss/v1.0.0/favicon-48x48.png` | 16x16 + 32x32 + 48x48 | 5172 bytes | Transparent alpha | Compact multi-resolution legacy browser favicon package. |
| `public/brand/favicons/hmioss/v1.0.0/favicon-32x32.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 32x32 | 1447 bytes | Transparent alpha | Tab/favicon use at standard browser sizes. |
| `public/brand/favicons/hmioss/v1.0.0/favicon-16x16.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 16x16 | 669 bytes | Transparent alpha | Tab/favicon use at tiny browser sizes. |
| `public/brand/favicons/hmioss/v1.0.0/favicon-48x48.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 48x48 | 2357 bytes | Transparent alpha | Higher-density favicon source for the compact `.ico` bundle. |
| `public/brand/favicons/hmioss/v1.0.0/apple-touch-icon.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 180x180 | 10159 bytes | Transparent alpha | Apple bookmark/home-screen icon verified with rounded-square preview and 12 px safe-area clearance around the gold mark. |
| `public/brand/favicons/hmioss/v1.0.0/android-chrome-192x192.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 192x192 | 10796 bytes | Transparent alpha | Android/PWA icon entry sized for launcher and install prompts. |
| `public/brand/favicons/hmioss/v1.0.0/android-chrome-512x512.png` | `public/brand/masters/hmioss/v1.0.0/icon.png` | 512x512 | 40480 bytes | Transparent alpha | High-resolution Android/PWA icon entry. |
| `public/brand/manifests/hmioss/v1.0.0/site.webmanifest` | `public/brand/favicons/hmioss/v1.0.0/android-chrome-192x192.png + public/brand/favicons/hmioss/v1.0.0/android-chrome-512x512.png` | - | 477 bytes | n/a | Manifest metadata only; references governed HMIOSS icons. |
| `public/brand/archive/hmioss/alternative-identity/v1.0.0/telescope-lockup-full.png` | `public/brand/_incoming/HMIOSS.png` | 4820x3103 | 262083 bytes | Transparent alpha | Archive-only alternative identity direction; excluded from runtime deployment. |
| `public/brand/archive/hmioss/alternative-identity/v1.0.0/telescope-mark-light.png` | `public/brand/_incoming/HMIOSS White logo.png` | 1873x1208 | 126735 bytes | Transparent alpha | Archive-only alternative identity direction; excluded from runtime deployment. |
| `public/brand/archive/hmioss/alternative-identity/v1.0.0/telescope-lockup-dark-plate.png` | `public/brand/_incoming/HMIOSS white 1.png` | 2000x1318 | 492261 bytes | Transparent alpha | Archive-only alternative identity direction; excluded from runtime deployment. |

## Compatibility Entry Points

| File | Derived From | Dimensions | Size | Transparency | Background Suitability |
| --- | --- | --- | --- | --- | --- |
| `public/favicon.ico` | `public/brand/favicons/hmioss/v1.0.0/favicon.ico` | 16x16 + 32x32 + 48x48 | 5172 bytes | Transparent alpha | Compact multi-resolution legacy browser favicon package. |
| `public/favicon-32x32.png` | `public/brand/favicons/hmioss/v1.0.0/favicon-32x32.png` | 32x32 | 1447 bytes | Transparent alpha | Tab/favicon use at standard browser sizes. |
| `public/favicon-16x16.png` | `public/brand/favicons/hmioss/v1.0.0/favicon-16x16.png` | 16x16 | 669 bytes | Transparent alpha | Tab/favicon use at tiny browser sizes. |
| `public/apple-touch-icon.png` | `public/brand/favicons/hmioss/v1.0.0/apple-touch-icon.png` | 180x180 | 10159 bytes | Transparent alpha | Apple bookmark/home-screen icon with transparent edges preserved. |
| `public/android-chrome-192x192.png` | `public/brand/favicons/hmioss/v1.0.0/android-chrome-192x192.png` | 192x192 | 10796 bytes | Transparent alpha | Android/PWA icon entry sized for launcher and install prompts. |
| `public/android-chrome-512x512.png` | `public/brand/favicons/hmioss/v1.0.0/android-chrome-512x512.png` | 512x512 | 40480 bytes | Transparent alpha | High-resolution Android/PWA icon entry. |
| `public/site.webmanifest` | `public/brand/manifests/hmioss/v1.0.0/site.webmanifest` | - | 477 bytes | n/a | Manifest metadata only; references governed HMIOSS icons. |

## QA Evidence Artifacts

| File | Purpose |
| --- | --- |
| `docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-apple-touch-rounded-preview.png` | Rounded-square Apple preview with the safe-area guide drawn inside the icon mask. |
| `docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-contact-sheet.png` | Contact sheet for wordmarks, favicon sizes, Apple preview, and Android icon previews. |
| `docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-qa-measurements.json` | Machine-readable measurements for the final correction pass. |

## Exclusions

- No IGC assets were generated or published in this package.
- Alternative telescope-mark files are archived for lineage only and are excluded from runtime deployment.
