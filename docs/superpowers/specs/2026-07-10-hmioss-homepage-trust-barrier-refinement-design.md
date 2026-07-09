# HMIOSS Homepage Trust Barrier Refinement Design

**Date:** 2026-07-10

**Project:** International Hung Men Institute of Strategic Studies website

**Scope:** Candidate Discovery specification for a single reference implementation. This is not a GEH standard.

## Purpose

This slice tests whether the current homepage `Trust` barrier can be materially reduced through narrative refinement alone, using only institutional evidence already present in the homepage narrative.

The objective is not to maximize persuasion, completeness, or aesthetic polish.

The objective is to generate clean implementation evidence for one question:

> Can the current Trust barrier be materially reduced using the institutional evidence already present on the homepage?

## Slice Shape

- `Baseline approach`: Trust Narrative Consolidation
- `Barrier under refinement`: Trust
- `Working Hypothesis`: The current Trust barrier can be materially reduced through Trust Narrative Consolidation alone, without introducing new institutional proof assets or changing the homepage sequence.
- `Goal`: Enable the existing homepage trust signals to compound into one coherent institutional trust case using only evidence already present in the homepage narrative.
- `Primary touchpoints`: Hero, AuthorityStrip, Why HMIOSS, and the trust-to-philosophy bridge in Institutional Vision
- `Secondary touchpoints`: only wording, emphasis, and intra-section narrative handoff cues needed to preserve coherence across the full Identity -> Action sequence

## Hard Constraints

- Preserve the current homepage section order as the default implementation.
- Do not reorder sections simply because another flow appears cleaner or more persuasive.
- Do not add new sections.
- Do not introduce proof-asset expansion.
- Do not add Founder assets, Board profiles, leadership photos, LOIs, recognition expansion, or other institutional proof assets.
- Do not redesign the homepage aesthetically.
- Do not optimize for completeness alone.
- Do not expand the slice to solve problems that belong to `HMIOSS — Institutional Proof Expansion`.

## Exception Path

Sequence changes remain inactive unless later evidence shows `Sequencing` outperforms `Philosophy under-clarity`, `Thematic proof`, and `Institutional identity breadth` as the strongest candidate cause of the Trust barrier.

Before any sequence change, all of the following must be demonstrated:

1. Why the current sequence contributes to the Trust barrier.
2. Why competing candidate causes explain the observations less well.
3. Why the proposed sequence change is the minimum change required.

## Candidate Causes Under Evaluation

The Trust barrier is the active slice scope.

The following remain separate candidate causal explanations under evaluation:

- `Sequencing`
- `Philosophy under-clarity`
- `Thematic proof`
- `Institutional identity breadth`

These causes must compete against each other. They are not merged into the slice title or treated as settled conclusions.

## Implementation Boundaries

- `Allowed changes`: homepage copy, section framing, label emphasis, and intra-section narrative handoffs inside the existing homepage structure
- `Primary implementation surface`: `src/pages/[locale]/index.tsx` and `public/locales/*/home.json`
- `Supporting implementation surface`: existing section props and rendering details only where needed to express the approved trust narrative more clearly without changing slice scope
- `Default order`: preserve the current homepage order enforced by `src/tests/pages/phase2-homepage.test.tsx`
- `Out of scope`: new sections, proof expansion, Founder or Board materials, LOIs, Recognition expansion, aesthetic redesign, and persuasion-maximization beyond the Trust barrier objective

## Refinement Units

### Unit 1 — Hero -> Authority Handoff

- `Barrier`: Trust
- `Candidate causes`: Sequencing, Institutional identity breadth
- `Working Hypothesis Under Test`: Strengthening the narrative relationship between Hero and Authority will reduce the Trust barrier without requiring new institutional proof assets.

### Unit 2 — Authority -> Why HMIOSS Handoff

- `Barrier`: Trust
- `Candidate causes`: Philosophy under-clarity, Institutional identity breadth
- `Working Hypothesis Under Test`: Clarifying how the authority layer leads into Why HMIOSS will make the existing trust signals compound more coherently into an institutional trust case.

### Unit 3 — Proof-Like Thematic Signals

- `Barrier`: Trust
- `Candidate causes`: Thematic proof
- `Working Hypothesis Under Test`: Clarifying the narrative role of the existing proof-like signals will strengthen the trust case without introducing new proof assets.

### Unit 4 — Trust -> Philosophy Bridge

- `Barrier`: Trust
- `Candidate causes`: Philosophy under-clarity, with Sequencing retained as a competing explanation
- `Working Hypothesis Under Test`: Strengthening the bridge into Institutional Vision will reduce the Trust barrier by making the move from credibility to institutional worldview more continuous within the current sequence.

## Cause Evaluation Model

For each candidate cause, record:

- `Candidate Cause`
- `Supporting Evidence`
- `Competing Explanation`
- `Disproof Condition`
- `Confidence`

Decision rule:

- Prefer the explanation that best accounts for the current evidence while continuing to test competing explanations until confidence is sufficient.
- Keep alternative causes alive until the evidence is strong enough to eliminate them.
- Allow confidence to rise or fall as new reference implementations are tested.

## Verification Model

Every proposed refinement must explicitly identify:

- `The visitor barrier it reduces`
- `The candidate cause it addresses`
- `The evidence that will be used to judge whether it succeeded`

Every implemented refinement must also be logged with:

- `Supporting Evidence`
- `Competing Explanation`
- `Disproof Condition`
- `Confidence`

### Outcome Categories

Record one outcome for each implemented refinement and for the slice as a whole:

- `Supports Hypothesis` — Trust barrier appears materially reduced through narrative refinement alone
- `Weakens Hypothesis` — little or no measurable reduction in the Trust barrier despite narrative refinement
- `No Observable Change` — the refinement does not create a clear observable change in the Trust barrier

## Production Verification

Production verification is complete only when all of the following pass:

### 1. Narrative Review

- The homepage still passes the full Human Understanding Layers review:
  - Identity
  - Trust
  - Philosophy
  - Method
  - Differentiation
  - Offer
  - Proof
  - Action
- No refinement weakens another layer or introduces a new narrative barrier.

### 2. Technical Verification

- Automated tests pass.
- Lint passes.
- Production build passes.
- Production deployment is successful.
- No material regressions are introduced.

### 3. Evidence Review

Conduct a documented before-vs-after assessment answering only these questions:

- Has the Trust barrier been materially reduced?
- Which candidate cause(s) did the implemented refinement address?
- Did the observed outcome support or weaken the current hypothesis?
- Were any new barriers discovered?
- Should confidence in the current explanation increase, decrease, or remain unchanged?

## Slice Success Criterion

The slice is complete when:

- Production verification passes.
- The homepage narrative remains coherent across the full Identity -> Action pass.
- The Trust barrier is assessed as materially reduced.
- No out-of-scope assets or structural changes were introduced.

## Slice Failure Criterion

The slice is considered unsuccessful if:

- Production verification passes but the Trust barrier is not materially reduced; or
- Reducing the Trust barrier requires out-of-scope proof assets or homepage sequence changes.

In either case, record the outcome as evidence and do not expand the slice. The result informs the later `HMIOSS — Institutional Proof Expansion` slice.

## Unexpected Discoveries

Record any observations that:

- do not fit the current Human Understanding Layers
- suggest a previously unknown visitor barrier
- reveal a stronger competing explanation

These observations are evidence only.

They do not modify the current methodology.

## Expected Output Of This Reference Implementation

This slice must produce one of two evidence outcomes:

1. Narrative refinement alone materially reduces the Trust barrier, which strengthens confidence in Trust Narrative Consolidation.
2. Narrative refinement alone does not materially reduce the Trust barrier, which weakens the current hypothesis and increases the importance of the later Institutional Proof Expansion slice.

Either result is valid if it is supported by production verification and documented evidence review.
