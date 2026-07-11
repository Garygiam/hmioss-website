# HMIOSS Brand Asset Package v1.0.0 Asset QA Report

## Outcome

- PASS: Governed masters, runtime assets, favicon/app-icon package, manifest package, and compatibility entrypoints exist.
- PASS: `public/brand/runtime/hmioss/v1.0.0/logo/wordmark-light.png` and `public/brand/runtime/hmioss/v1.0.0/logo/wordmark-dark.png` are tightly trimmed transparent runtime derivatives at `821x153`.
- PASS: `public/brand/favicons/hmioss/v1.0.0/favicon.ico` and `public/favicon.ico` were rebuilt as a compact multi-resolution icon bundle with `16x16`, `32x32`, and `48x48` entries.
- PASS: Apple touch icon QA evidence includes a rounded-square preview and safe-area clearance verification.
- PASS: Contact sheet evidence exists for both wordmarks, favicon sizes, Apple preview, and Android previews.
- PASS: `public/site.webmanifest` is static and references only governed HMIOSS Android icons.
- PASS: Lineage evidence records dimensions, sizes, Transparency, and Background Suitability for every governed output.
- PASS: No IGC assets generated.
- PASS: No consumer files changed in `src/components/**`, `src/pages/**`, `src/lib/**`, or runtime consumer surfaces like Header, Footer, mobile nav, `_document`, and SEO.

## Measurements

- Wordmark light published size: `821x153`, `10472` bytes.
- Wordmark dark published size: `821x153`, `10982` bytes.
- Compact favicon package: `favicon-16x16.png` `669` bytes, `favicon-32x32.png` `1447` bytes, `favicon-48x48.png` `2357` bytes, `favicon.ico` `5172` bytes.
- Apple touch icon: `180x180`, `10159` bytes, with the gold mark measured at `120x120` and `12 px` minimum clearance inside the `18 px` safe inset.
- Android icons: `192x192` at `10796` bytes and `512x512` at `40480` bytes.

## Visual Evidence

- Rounded-square preview: `docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-apple-touch-rounded-preview.png`
- Contact sheet: `docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-contact-sheet.png`
- Measurement log: `docs/superpowers/reports/assets/2026-07-11-hmioss-brand-asset-package-v1.0.0-qa-measurements.json`

## Validation Tests

- `npm test -- src/config/brand-asset-package.test.ts`
- Verifies governed output existence.
- Verifies trimmed runtime wordmark geometry.
- Verifies compact multi-resolution favicon coverage and evidence artifact dimensions.
- Verifies root compatibility entrypoints.
- Verifies static `site.webmanifest` content.
- Verifies lineage, QA evidence, and knowledge-harvest documents exist.
- Verifies no IGC package directories were generated.

## Package Coverage

- Governed package files validated: 20
- Compatibility entrypoints validated: 7

## Freeze

- Production-ready independent Brand Asset Package v1.0.0 is frozen at the file/package level pending later consumer wiring in a separate slice.
- The final correction pass changes asset package internals and QA evidence only; all website consumers remain unchanged.
