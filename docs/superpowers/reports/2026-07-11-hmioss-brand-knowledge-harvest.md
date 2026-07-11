# HMIOSS Brand Knowledge Harvest

## Scope

- Phase 2 only.
- No consumer wiring.
- Independent Brand Asset Package v1.0.0 prepared ahead of any Header, Footer, SEO, `_document`, or runtime-consumer adoption.
- Final QA correction pass preserves the same runtime paths and keeps all website consumers unchanged.

## What Worked

- Treating the accepted Phase 1 masters as the governed source baseline made Phase 2 packaging deterministic.
- Publishing the package under `public/brand/masters`, `runtime`, `favicons`, and `manifests` creates a reusable venture-scoped handoff without changing site behavior.
- Root compatibility files can be published as copies of governed outputs without introducing consumer coupling.
- Extracting transparent wordmarks from the plate-based wordmark exports produced header-ready runtime derivatives without requesting a redesign or changing consumer code.
- Locking the final runtime wordmarks at `821x153` makes the geometry explicit instead of inheriting square-padded plates.

## What Failed

- The broader implementation plan mixed packaging work with consumer wiring; this slice required a strict allowlist reduction to stay isolated.
- The accepted wordmark masters were plate-based wordmark exports rather than already-trimmed transparent assets, so naive runtime resizing preserved large square canvases and failed header QA.
- `png-to-ico` produced a bloated `.ico`; Pillow generated the compact multi-resolution bundle successfully.

## Favicon And Manifest Notes

- `favicon.ico` is best generated from explicitly curated `16x16`, `32x32`, and `48x48` PNG sources when compact multi-resolution output is required.
- `site.webmanifest` remains static in this slice and references governed HMIOSS Android icons only.
- Rounded-square previewing caught safe-area alignment details that are easy to miss when reviewing the Apple touch icon as a raw square PNG.

## Governance Lessons

- Archive-only alternative identity assets should remain documented for lineage but excluded from runtime by default.
- No IGC assets should be introduced while freezing the HMIOSS reference package.
- The package can be validated independently before any runtime consumer changes are proposed.
- QA evidence is stronger when it includes a contact sheet plus machine-readable measurements, not only prose.
- Keep the correction pass asset-only: no consumer wiring, no path changes, no runtime regressions.
- `.sprint3-link` is workspace hygiene debt, not Brand Asset evidence. Exclude it from Launch QA and Production Verification evidence collection, and clean it later in a separate workspace-hygiene slice.

## Recommended Next Step

- If a future slice wires consumers, do it separately with explicit visual review and without changing this frozen package unless a governed version bump is required.

## Institutional Credibility Lessons

- When approved institutional photography is unavailable, plain brand-color surfaces are safer than remote AI images, placeholder illustrations, or borrowed event imagery.
- Recognition evidence should be governed like credibility assets: each public record needs an approved source file, a tracked runtime file, and an explicit public/private decision.
- A missing i18n namespace can surface as raw production keys even when locale JSON exists; verify both namespace registration and runtime asset delivery together.
- GA4 can be installed safely in the Pages Router through one global `next/script` pair, then verified by observing a single `googletagmanager` load and `g/collect` page-view requests in browser network logs.

## Institutional Credibility Stabilization Harvest

### What Was Fixed

- Replaced the homepage's remote AI-dependent hero surface with plain HMIOSS navy.
- Replaced the broken Opening Ceremony card image with an approved dark-navy fallback panel.
- Restored the `recognition` i18n namespace so raw keys no longer render.
- Restored public delivery for the four verified recognition letters and added the approved Myanmar / Thayninga letter.
- Kept Taiwan, the unidentified PDF, and the WhatsApp-named source private by policy and test coverage.
- Corrected leadership portrait framing and Join timeline heading balance.
- Installed GA4 once globally and verified page-view requests during preview navigation.

### Reusable Standard

- `Institutional credibility stabilization` should be treated as a governed patch type separate from brand redesign or content invention.
- When approved public imagery is missing, use a plain certified brand-color block rather than an external dependency, generated image, or unrelated event photo.
- Recognition assets require a three-part contract:
  - approved source evidence
  - tracked public runtime file
  - explicit public/private governance decision
- Preview QA must include both `200/404` machine checks for governed assets and browser validation for rendered labels and links.

### Promote Into Website Factory

- A reusable `plain brand-surface fallback` pattern for hero and card media slots.
- A reusable `public recognition asset policy` with tests that enforce approved-public versus private-held files.
- A reusable `i18n namespace verification` checklist for any new route namespace added to the Pages Router.
- A reusable `single-install GA4 shell pattern` for Pages Router sites using `next/script`.
- A reusable `Institutional Credibility Audit` gate covering placeholder media, recognition evidence, and trust-reducing visual debt.

### Engineering And Governance Lessons

- Isolated worktrees plus TDD are the safest default for production-credibility patches because they prevent unrelated workspace drift from contaminating release candidates.
- Full-suite verification can surface legitimate adjacent gaps that still fall within scope; in this case, recognition nav locale labels were a necessary route-level completion, not unrelated locale work.
- Browser-tool noise should be separated from site regressions when validating analytics and asset delivery.
- Build once, compound forever only works if useful patch patterns are harvested back into the factory instead of remaining HMIOSS-only fixes.
