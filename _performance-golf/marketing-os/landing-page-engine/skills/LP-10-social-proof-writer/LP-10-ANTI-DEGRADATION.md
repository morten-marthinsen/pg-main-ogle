# LP-10: Social Proof Writer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-10-social-proof-writer
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-10 has seven specific failure modes — all related to the fact that proof copy LOOKS simple but is deceptively hard to write well. Models default to generic, safe proof framing that destroys the credibility social proof is supposed to build:

1. **Generic Intro Syndrome:** AI writes "See what our customers are saying" or "Real results from real people" instead of audience-specific, problem-specific proof intros. Generic intros signal that the proof section is filler — the reader skims past instead of engaging. Every intro must reference the specific audience, specific problem, or specific outcome type.

2. **Vague Testimonial Acceptance:** AI accepts "I feel so much better!" or "Great product!" as valid testimonials. These carry near-zero persuasive weight. Every testimonial MUST contain a specific outcome — a number, timeframe, measurable result, or named transformation. "I lost 23 pounds in 8 weeks" converts. "I lost weight" does not.

3. **Transition Template Recycling:** AI uses the same transition copy for multiple proof blocks ("But don't just take our word for it..." repeated 3 times on the same page). Each proof block needs a UNIQUE transition that reflects what came before and what comes after. Repeated transitions signal lazy copy and reduce trust.

4. **Credential Inflation:** AI writes "world-renowned expert" or "leading doctor" without verifiable credentials. Expert endorsement framing must include the FULL credential chain — degree, institution, specific relevance to the product. Vague authority claims damage credibility more than no expert endorsement at all.

5. **Volume Number Rounding:** AI rounds "1,561 reviews" to "over 1,500 reviews" for "cleaner copy." Exact numbers are MORE credible than rounded numbers. Specificity signals truth. Rounding signals estimation (or fabrication).

6. **Slot Abandonment:** AI writes copy for the obvious slots (testimonial block, review cascade) but silently skips less obvious slots (stat bar copy, rating strip context, video testimonial CTAs). Every slot_id in proof-architecture.json is a writing assignment — zero can be skipped.

7. **Fabricated Specificity:** AI invents specific outcomes ("lost 23 pounds in 8 weeks") for testimonials marked `requires_sourcing`. When proof inventory is missing, LP-10 must write placeholder copy that clearly flags the gap — not fabricate convincing-sounding numbers. Fabricated specificity is fraud, not copywriting.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-loaded.md` | Layer 1 |
| After Layer 0 | `proof-slots-loaded.md` — with all slot_ids inventoried | Layer 1 |
| After Layer 0 | `specimen-proof-copy.md` | Layer 1 |
| After Layer 1 | `proof-slot-analysis.md` — every slot categorized | Layer 2 |
| After Layer 1 | `testimonial-plan.md` — testimonial-to-slot mapping | Layer 2 |
| After Layer 1 | `transition-plan.md` — transition strategy per block | Layer 2 |
| After Layer 2 | All applicable Layer 2 output files | Layer 3 |
| After Layer 3 | `proof-copy-validation.md` — score >= 7.5/8 | Layer 4 |
| After Layer 3 | `specificity-audit.md` — PASS | Layer 4 |
| After Layer 3 | `anti-slop-scan.md` — PASS | Layer 4 |
| Output | `social-proof-copy-package.json` | All downstream |
| Output | `SOCIAL-PROOF-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF `proof-architecture.json` DOES NOT EXIST -> LP-10 CANNOT BEGIN. PERIOD.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Proof slots addressed | 100% of slot_ids from proof-architecture.json | HALT — address missing slots |
| Testimonial specificity | Every testimonial has specific outcome (number/timeframe/measurable) | HALT — rewrite vague testimonials |
| Unique transitions | Each proof block has unique IN and OUT transitions | HALT — rewrite duplicates |
| Volume signal numbers | Exact numbers where data exists | HALT — replace rounded numbers with exact |
| Expert credentials | Full credential chain per expert | HALT — add missing credentials |
| Proof copy score | >= 7.5/8 on proof copy checklist | HALT — revise until met |
| AI telltales | 0 in all proof copy | HALT — remove every instance |
| Fabricated specifics | 0 invented outcomes for `requires_sourcing` slots | HALT — replace with flagged placeholders |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The testimonial sounds genuine enough without specific numbers" | Vague testimonials carry near-zero persuasive weight. Specificity IS the mechanism of trust. No specific outcome = rewrite or flag. |
| "I'll reuse this transition — it works well" | Each proof block needs a unique transition. Repeated transitions signal template copy and reduce engagement with proof sections. |
| "World-renowned is common language for experts" | Common language ≠ accurate language. "World-renowned" without verification is credential inflation. Use the actual credential chain. |
| "Rounding to 1,500 is cleaner than 1,561" | Clean ≠ credible. Exact numbers signal real data. Rounded numbers signal estimates. 1,561 converts better than "over 1,500." |
| "This slot is minor — I'll skip the video testimonial CTA" | Every slot_id is a writing assignment. No slot is minor enough to skip. If it's in proof-architecture.json, it gets copy. |
| "I'll generate a realistic-sounding testimonial since none was provided" | Fabricating testimonials is fraud. `requires_sourcing` slots get placeholder copy with sourcing flags. Nothing else. |
| "The proof section doesn't need a transition — it flows naturally" | Natural flow is the RESULT of good transitions. Proof blocks without transitions feel jarring. Write the transition. |
| "The generic intro is fine — the testimonials below it are strong" | Strong testimonials under a weak intro underperform. The intro frames the reader's expectations. Generic frame = generic perception. |

---

## SPECIFICITY AUDIT REQUIREMENTS

`specificity-audit.md` must check every testimonial and proof element:

```markdown
# Specificity Audit — [Product Name]

## Testimonials Audited: [count]

### Testimonial 1 — [Attribution: Name, Location]
**Specific outcome found:** [Y/N]
**Outcome statement:** "[exact quote with the specific outcome]"
**Specificity type:** [number | timeframe | measurable_result | named_transformation]
**Score:** [1-10 — 1 = "I love it", 10 = "I lost 23 lbs in 8 weeks after 4 years of trying every diet"]

### Testimonial 2
[Same format — repeat for every testimonial]

## Testimonials Failing Specificity (Score < 6):
[List each failing testimonial with suggested improvement]
[or: "All testimonials meet specificity threshold"]

## Volume Signals Audited: [count]
| Signal | Number Used | Source | Exact or Rounded |
|--------|------------|--------|-----------------|
[For each volume signal]

## Expert Endorsements Audited: [count]
| Expert | Credential Chain Complete | Institution Named | Relevance Stated |
|--------|------------------------|-------------------|-----------------|
[For each expert]

## Audit Result: [PASS — all testimonials >= 6, all numbers exact, all credentials complete | FAIL — details]
```

**PASS requires:**
- Every testimonial specificity score >= 6/10
- All volume signals use exact numbers (or `requires_verification` flag if data unavailable)
- All expert endorsements have complete credential chains

---

## TRANSITION UNIQUENESS CHECK

Before passing GATE_3, verify no transitions are duplicated:

```yaml
TRANSITION-UNIQUENESS-CHECK:
  total_proof_blocks: "[count]"
  total_transition_in_copies: "[count — must equal proof_blocks]"
  total_transition_out_copies: "[count — must equal proof_blocks]"

  duplicate_in_transitions: "[list any duplicates — must be empty]"
  duplicate_out_transitions: "[list any duplicates — must be empty]"

  banned_phrase_check:
    "but don't just take our word for it": "[FOUND | CLEAR]"
    "see what our customers are saying": "[FOUND | CLEAR]"
    "hear from real people": "[FOUND | CLEAR]"
    "real results from real people": "[FOUND | CLEAR]"
    "success stories that speak for themselves": "[FOUND | CLEAR]"

  IF any duplicates found: HALT — rewrite duplicate transitions
  IF any banned phrases found: HALT — replace with fresh copy
```

---

## SLOT COVERAGE VERIFICATION

Before Layer 4 assembly, verify 100% slot coverage:

```yaml
SLOT-COVERAGE-CHECK:
  total_slots_in_proof_architecture: "[count from proof-architecture.json]"
  total_slots_with_copy: "[count from Layer 2 outputs]"
  slots_written: "[count]"
  slots_with_sourcing_placeholder: "[count]"
  slots_missing_entirely: "[count — MUST be 0]"

  missing_slot_ids: "[list — must be empty]"

  coverage_percentage: "[must be 100%]"

  IF coverage < 100%: HALT — write copy for missing slots before assembly
```

---

## ANTI-SLOP SCAN REQUIREMENTS

`anti-slop-scan.md` must scan ALL proof copy elements:

```markdown
# Anti-Slop Scan — Social Proof Copy — [Product Name]

## Elements Scanned
- [ ] All testimonial intros
- [ ] All formatted testimonials
- [ ] All review section headers
- [ ] All before/after captions
- [ ] All expert endorsement frames
- [ ] All proof transitions (IN and OUT)
- [ ] All volume signals
- [ ] All case study intros
- [ ] All video testimonial CTAs

## Category 1 — Generic Proof Intros Found
[List each instance — or: "None found"]

## Category 2 — Vague Testimonial Language Found
[List each instance — or: "None found"]

## Category 3 — AI Telltales Found
[List each instance — or: "None found"]

## Category 4 — Fake Urgency in Proof Found
[List each instance — or: "None found"]

## Category 5 — Credential Inflation Found
[List each instance — or: "None found"]

## Total Forbidden Elements Found: [count]

## Scan Result: [PASS — zero forbidden elements | FAIL — list remaining issues]

## Required Revisions (if FAIL)
| Element | Location | Issue | Replacement |
|---------|----------|-------|-------------|
[For each violation]
```

**A single instance of a forbidden word/phrase = FAIL. Revise before assembly.**

---

## THREE-FILE OUTPUT REQUIREMENT

LP-10 is NOT complete until all three exist:

```
[ ] social-proof-copy-package.json — EXISTS
[ ] social-proof-copy-package.json — Contains copy for every slot_id from proof-architecture.json
[ ] social-proof-copy-package.json — Proof copy score >= 7.5/8
[ ] social-proof-copy-package.json — Specificity audit PASS
[ ] social-proof-copy-package.json — Anti-slop scan PASS
[ ] SOCIAL-PROOF-SUMMARY.md — EXISTS
[ ] SOCIAL-PROOF-SUMMARY.md — Contains slot coverage count, proof types written, score, transition count, flagged gaps
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows which Layer 2 microskills executed and which were skipped (with reason)

IF ANY CHECKBOX UNCHECKED -> LP-10 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-10-MC-CHECK:
  trigger: "[before_generation | before_validation | before_output]"

  pre_generation:
    proof_architecture_loaded: "[Y/N]"
    all_slot_ids_inventoried: "[Y/N]"
    specimens_loaded: "[Y/N]"
    slot_analysis_complete: "[Y/N]"
    testimonial_plan_complete: "[Y/N]"
    transition_plan_complete: "[Y/N]"

  pre_validation:
    all_applicable_layer_2_outputs_exist: "[Y/N]"
    slot_coverage_check: "[100% | X% — if <100%: HALT]"

  pre_output:
    proof_copy_score: "[X.X/8 — must be >= 7.5]"
    specificity_audit: "[PASS | FAIL]"
    anti_slop_scan: "[PASS | FAIL]"
    all_gates_pass: "[Y/N]"

  rushing_detection:
    skipping_proof_architecture_load: "[Y/N]"
    using_generic_proof_intros: "[Y/N]"
    reusing_transition_copy: "[Y/N]"
    accepting_vague_testimonials: "[Y/N]"
    rounding_volume_numbers: "[Y/N]"
    fabricating_testimonial_outcomes: "[Y/N]"

  IF any rushing = Y: STOP — execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```
