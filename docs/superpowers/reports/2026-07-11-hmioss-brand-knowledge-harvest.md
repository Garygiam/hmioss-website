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
