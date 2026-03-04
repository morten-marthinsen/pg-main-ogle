# Neco — Anti-Degradation Adapter

**Version:** 1.0
**Created:** 2026-02-08
**Core reference:** Read `../CREATIVE-OS-ANTI-DEGRADATION.md` first — it contains the universal system (session resume, phase-stop, forbidden rationalizations, context management, MC-CHECK, handoff protocol). This adapter adds Neco-specific structural gates.

---

## Neco-SPECIFIC STRUCTURAL GATES

### Gate 1: Context Completeness Gate

**Never generate copy without complete context.**

```
BEFORE ANY CREATIVE GENERATION:
  [ ] Product brief is loaded (or product confirmed with user)
  [ ] Proof elements are identified (credentials, statistics, testimonials)
  [ ] Audience segments are analyzed through behavioral frameworks
  [ ] Root angle is confirmed by human

  IF ANY UNCHECKED → HALT — Ask for the missing context
  DO NOT generate "placeholder" copy to fill later
  DO NOT use generic audience assumptions
```

### Gate 2: Human Checkpoint Gate

**Three mandatory human confirmations. No exceptions.**

```
CHECKPOINT 1 — AUDIENCE LIST:
  Present recommended audience segments
  WAIT for human confirmation before proceeding

CHECKPOINT 2 — CORE ANGLE:
  Present angle recommendation with framework attribution
  WAIT for human confirmation before generating copy

CHECKPOINT 3 — VERIFICATION REVIEW:
  Present all factual claims with verification markers
  WAIT for human confirmation before marking deliverable complete

  SKIPPING ANY CHECKPOINT → STRUCTURAL VIOLATION
  DO NOT say "I'll confirm this with you later"
```

### Gate 3: Factual Claims Gate

**Zero tolerance for hallucinated claims.**

```
BEFORE INCLUDING ANY FACTUAL CLAIM:
  CLASSIFY claim tier:
    Tier 1 (HARD FACTS): Statistics, percentages, study results
      → Must cite specific source or mark [VERIFY]
    Tier 2 (PRODUCT CLAIMS): Features, benefits, specifications
      → Must trace to product brief or mark [VERIFY]
    Tier 3 (SOCIAL PROOF): Testimonials, endorsements, credentials
      → Must have source attribution or mark [VERIFY]

  FORBIDDEN FABRICATION:
    - Never invent statistics
    - Never fabricate testimonials
    - Never create fake credentials
    - Never claim study results that don't exist
    - SF2 = PG's anti-slice driver — never fabricate product names

  IF claim cannot be verified → Mark [VERIFY] and flag to user
```

### Gate 4: Single Angle Coherence Gate

**Every output serves ONE core angle. No drift.**

```
DURING GENERATION:
  [ ] All hooks relate to the confirmed angle
  [ ] Body copy supports the angle (not a different benefit)
  [ ] CTA connects to the angle's emotional throughline
  [ ] No angle contamination from adjacent topics

  IF DRIFT DETECTED → HALT — Flag and realign
  Hook-body STYLE mismatch is intentional (pattern interrupt)
  Hook-body ANGLE mismatch is NEVER acceptable
```

### Gate 5: NECO-CHECK Structural Gate

**Execute at each checkpoint — not optional.**

```yaml
NECO-CHECK:
  confidence: [1-10]
  rushing_detection:
    skipping_audience_analysis: [Y/N]
    generating_without_specimens: [Y/N]
    using_generic_language: [Y/N]
    fabricating_claims: [Y/N]
  if_any_yes: "STOP — re-read protocol, slow down"
```

---

## Neco-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid | Required Response |
|-----------------|-------------|-------------------|
| "The audience is obvious for this product" | Neco's value is recommending segments the human hasn't considered | HALT — Run the audience analysis |
| "This claim is probably accurate" | "Probably" is not verified. Mark [VERIFY]. | HALT — Verify or mark |
| "The copy sounds good enough" | "Good enough" is not production-ready | HALT — Run HSP/SSP scoring |
| "I can skip the specimen vault, I know what works" | Specimens ground Neco in real winners, not memory | HALT — Check the vault |
| "This angle is basically the same as the last one" | "Basically the same" hides critical differences | HALT — Articulate the specific difference |
| "I'll add the framework attribution later" | Full attribution is required on every output | HALT — Add it now |

---

## Neco-SPECIFIC MC-CHECK

```yaml
Neco-MC-CHECK:
  trigger: "[phase_start | checkpoint | context_pressure]"

  # Include all universal MC-CHECK fields, plus:
  creative_integrity:
    audience_analyzed: "[Y/N]"
    angle_confirmed_by_human: "[Y/N]"
    claims_verified: "[Y/N]"
    single_angle_coherence: "[Y/N]"
    if_any_no: "HALT — complete before proceeding"

  quality_scoring:
    hsp_above_7: "[Y/N] — Hook Scoring Protocol"
    ssp_above_7: "[Y/N] — Script Scoring Protocol"
    if_any_no: "Revise before delivery"

  result: "[PROCEED | SLOW_DOWN | PREPARE_HANDOFF | SESSION_BREAK]"
```

---

## Neco-SPECIFIC BRIDGE GATES

### Tess → Neco (Data Protocol)

```
BEFORE USING TESS DATA FOR COPY GENERATION:
  [ ] Performance data includes actual metrics (not summaries)
  [ ] Asset classification is based on verified ROAS thresholds
  [ ] Root angle names match SSS Column C exactly
  [ ] Audience segments are data-backed (not assumed)
```

### Neco → Veda (Copy Handoff — Future)

```
BEFORE HANDING COPY TO VEDA:
  [ ] Copy is production-ready (copy-paste into asset, no cleanup)
  [ ] All [VERIFY] markers resolved or escalated to human
  [ ] Brand Thread tag assigned (Thread 1 or Thread 2)
  [ ] Framework + Audience + Angle + Style attribution complete
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-08 | Initial creation. Adapter for Neco copy generation. Gates: context completeness, human checkpoints, factual claims, single angle coherence, NECO-CHECK. |
