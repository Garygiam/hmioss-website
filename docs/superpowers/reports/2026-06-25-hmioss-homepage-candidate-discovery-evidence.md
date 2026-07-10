# HMIOSS Homepage Candidate Discovery Evidence

**Date:** 2026-06-25

**Status:** In Progress

**Boundary:** Candidate Discovery only. Not GEH Core. Not a permanent GEH standard. Not a client-facing diagnostic.

## Evidence Table

| Venture | Biggest Barrier | Fix Applied | Result | Reusable? |
|---|---|---|---|---|
| IGC | Trust | Founder -> Decision Philosophy -> Company Doctor | ✅ | Yes |
| HMIOSS | Trust | Trust Narrative Consolidation | Supports Hypothesis | Not yet |
| Belleco | TBD | - | - | - |
| Celestial Yuan | TBD | - | - | - |

## HMIOSS Current Evidence Pass

### Working Lens

- Human Understanding Layers:
  - Identity
  - Trust
  - Philosophy
  - Method
  - Differentiation
  - Offer
  - Proof
  - Action
- Decision Barrier Analysis:
  1. What decision barrier prevents the visitor from progressing to the next layer?
  2. What existing evidence already reduces this barrier?
  3. Can the barrier be removed without creating new assets?

### Current Biggest Barrier

- **Trust**

### Barrier Description

- The homepage already signals legitimacy, but it does not yet turn those signals into a coherent institutional trust narrative early enough.
- Visitors can see that HMIOSS is strategic, educational, and partnership-oriented, but the institutional credibility case is still under-explained.
- The barrier is not a lack of assets.
- **Leading hypothesis only:** existing evidence may be underperforming because it is distributed across labels, sections, and adjacent pages instead of becoming legible as one trust story.

### Existing Evidence Already Available

- ROS registration is already explicitly present in homepage authority signals.
- Leadership and governance credibility already exist in the approved leadership structure and related page content.
- Partnership credibility already exists in homepage partnership language and the partners page taxonomy.
- Public mission and service orientation already exist in homepage pillars and institutional vision copy.
- International and cross-sector orientation already exist in partnership and institutional language.
- Recognition now exists as a separate page, even though proof expansion is intentionally deferred from this slice.

### Can The Barrier Be Reduced Without New Assets?

- **Yes**

### Additional Trust Test

**Question tested:** Are the existing trust signals compounding into a progressively stronger trust case, or are they acting independently?

**Current answer:** They are acting **more independently than compoundingly**.

**Evidence:**

- The hero establishes institutional seriousness, but the next trust layer (`AuthorityStrip`) mostly adds labels rather than deepening the same claim.
- The authority strip adds legitimacy and institutional cues, but those cues do not clearly mature into a stronger explanatory trust case before the page shifts into the flagship offer.
- The `Why HMIOSS` pillars reinforce institutional tone, but they function more as parallel value cards than as a cumulative trust progression.
- The metrics section occupies a proof-like position, but because the metrics are thematic rather than evidentiary, it does not reliably intensify the earlier trust signals.
- The strongest trust-to-philosophy bridge (`Institutional Vision`) arrives later in the page, after the programme and metrics have already carried much of the narrative weight.

**Interpretation:**

- Current evidence supports the view that the trust signals are not yet compounding into a progressively stronger institutional trust case.
- This is an observation, not yet a permanent conclusion about the architecture.

### Candidate Discovery Note

- `Independent evidence vs. compounding evidence` is now a **candidate discovery question** worth watching across future ventures.
- It should remain Candidate Discovery only unless repeated reference implementations show that this distinction consistently predicts narrative effectiveness.

### Why This Strengthens The Candidate Lens

- The Human Understanding Layers correctly surfaced `Trust` as the current highest-leverage barrier.
- Decision Barrier Analysis clarified that the problem is not “missing content volume.”
- Existing evidence appears sufficient to strengthen trust without expanding the proof asset set.

### What Could Challenge The Candidate Lens Later

- If trust remains the dominant barrier even after existing institutional evidence is narratively reframed, that may indicate the current architecture is missing a layer or mis-ordering one.
- If HMIOSS requires proof-asset expansion before trust can move at all, that would weaken the current hypothesis that trust can be materially improved first through narrative framing alone.

## Production Verification — Trust Narrative Consolidation

### Narrative Review

- Identity: The hero now states that HMIOSS is a ROS-registered strategic education institution, making the institutional identity legible before the visitor reaches the programme offer.
- Trust: The authority strip now frames the existing labels as one institutional trust case, and the metrics section now extends that case instead of reading as standalone thematic cards.
- Philosophy: The homepage now signals a clearer institutional worldview around leadership, strategy, education, service, and collaboration, but the strongest philosophy bridge still lands later in the Institutional Vision section.
- Method: The page better explains how legitimacy continues into work through the five institutional priorities, but it still relies on later sections to complete the operational picture.
- Differentiation: The trust refinement increases seriousness and institutional distinctness, though differentiation still remains more implied than explicitly argued.
- Offer: The flagship programme remains in the approved position and still benefits from a stronger institutional case above it rather than carrying as much trust weight by itself.
- Proof: The metrics wrapper improves proof interpretation without adding new assets, but the proof layer remains partly thematic because the section still uses institutional priorities rather than harder external validation.
- Action: The existing calls to action remain intact and now sit on top of a more credible pre-action narrative; no action layer was weakened.

### Evidence Review

- Has the Trust barrier been materially reduced? Yes, to a meaningful but incomplete degree. The implemented homepage now states ROS registration in the hero, frames the authority strip as a cumulative trust layer, and explains the metrics block as a continuation of institutional legitimacy on both local runtime and the live homepage after deployment.
- Which candidate cause(s) did the implemented refinement address? The implemented refinement primarily addressed thematic proof and partially addressed philosophy under-clarity by making the institutional case more explicit without changing section order. It did not directly test sequencing because the approved homepage order was preserved.
- Did the observed outcome support or weaken the current hypothesis? It supported the current hypothesis. Existing trust signals perform better when they are reframed as one institutional narrative, which increases confidence that trust fragmentation, not missing proof volume alone, is a real cause of the barrier.
- Were any new barriers discovered? No new visitor barrier was discovered. Sequencing remains the strongest competing explanation because the flagship offer still appears before the metrics and before the strongest trust-to-philosophy bridge in Institutional Vision.
- Should confidence in the current explanation increase, decrease, or remain unchanged? Confidence should increase modestly. The current explanation now has implementation evidence, but confidence should remain below high because sequencing still plausibly explains the remaining loss of narrative compounding.
- Visitor barrier: Trust.
- Candidate cause under test: Trust fragmentation through thematic proof and under-explained institutional framing, with sequencing retained as a competing explanation.
- Supporting evidence: `npm test`, `npm run lint`, and `npm run build` all passed; the local runtime at `http://localhost:3003/en` rendered the new trust copy; `git push origin HEAD` succeeded for commit `b18a662`; the live homepage at `https://www.hmioss.org/en` now shows the new hero, authority, and metrics trust-consolidation copy.
- Competing explanation: Sequencing remains active because the flagship programme still sits before the metrics section and before Institutional Vision, which means the strongest trust-to-philosophy bridge still arrives late.
- Disproof condition: If the section-order-preserving trust narrative continues to leave visitors dependent on later programme and vision sections to form an institutional trust judgment, or if future evidence shows sequencing changes explain more barrier reduction than narrative consolidation alone, this explanation should weaken.
- Confidence: Moderate, increased from speculative to implementation-supported.
- Changed files: `docs/superpowers/reports/2026-06-25-hmioss-homepage-candidate-discovery-evidence.md`.
- Verification results: Local automated verification passed (`npm test`, `npm run lint`, `npm run build`); local runtime verification passed at `http://localhost:3003/en`; production push passed (`git push origin HEAD`); live production verification passed after deployment propagation on `https://www.hmioss.org/en`.

**Outcome:** Supports Hypothesis

### Unexpected Discoveries

- Observation: Immediately after the successful push, the live Vercel homepage still served the pre-refinement variant for a short interval before the trust-consolidation copy appeared.
- Why it does not fit the current model: This is an operational deployment-timing issue rather than a visitor-understanding or homepage-layer explanation.
- Whether it suggests a new barrier or stronger competing explanation: It does not suggest a new visitor barrier. It does suggest that future production verification should explicitly account for deployment propagation delay before drawing a conclusion from the live site.
