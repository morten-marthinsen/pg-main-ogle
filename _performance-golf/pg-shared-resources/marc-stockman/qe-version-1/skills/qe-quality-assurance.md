---
name: qe-quality-assurance
version: 1.1
updated: 2026-03-06
author: Marc Stockman
description: Quality Engine Phases 4-6 — Verification (CoVe), Adversarial Critique, Pre-Mortem (FMEA), Uncertainty Calibration, Convergence, Output Contract
scope: Per-query quality pipeline — verify, stress-test, and ship deliverables
trigger: QE pipeline Phase 4-6 execution, verification or stress-testing of any deliverable
---

# Quality Engine — Phases 4-6: Quality Assurance (Verify, Stress-Test, Govern & Ship)

**Version:** 1.1 | March 6, 2026
**Category:** Quality Engine — Phases 4-6
**QE Skills Covered:** Skill 7 (Verification Operator), Skill 8 (Adversarial Critic & Debate), Skill 9 (Pre-Mortem & Risk Analyst), Skill 10 (Uncertainty Calibrator), Skill 11 (Convergence Governor), Skill 12 (Output Contract & Quality Gate)
**Accelerator Integration:** Q5 (Klein pre-mortem + FMEA scoring + Amazon doors — unified with Skill 9), Q3 (visual formatting check absorbed into Skill 12)
**Pipeline Position:** After Phases 2-3 (qe-reasoning-engine) → final output to Marc

---

## Purpose

Phase 4 asks: **Is the draft correct?** (Verify)
Phase 5 asks: **What could go wrong?** (Stress-Test)
Phase 6 asks: **Are we done? Does the output meet the contract?** (Govern & Ship)

These three phases are where quality becomes visible. The reasoning engine produces a draft; this skill makes sure it's right, robust, and ready.

---

## Relationship to Existing Skills

**DEFER TO `self-audit`** when Marc says "self audit." The self-audit skill is a standalone 7-stage protocol Marc triggers after delivery. This skill's procedures (Skills 7-12) are the per-query pipeline that runs BEFORE delivery — they are the quality system that makes the first draft as good as possible so the self-audit finds fewer issues.

How they relate:
- **self-audit Pass 1 (Verification)** ≈ This skill's **Skill 7** — but self-audit runs post-delivery as a check; Skill 7 runs pre-delivery as part of the pipeline
- **self-audit Pass 2 (Adversarial)** ≈ This skill's **Skill 8** — same relationship
- **self-audit Pass 3 (Pre-Mortem)** ≈ This skill's **Skill 9** — same relationship
- **self-audit Pass 4 (Revise)** ≈ This skill's **Skill 11 + 12** convergence and quality gate

The self-audit is the second line of defense. This skill is the first.

**DEFER TO `check-protocol`** when Marc says "check." The check-protocol is an operational compliance audit across all rules. This skill's Skill 12 (Output Contract & Quality Gate) is a narrower deliverable-quality check within the pipeline.

**DEFER TO `source-verification`** for R-20 Tier 1 claim verification procedures. Skill 7's CoVe verification references source-verification's Level 2 protocol for factual claims.

**Integration with Accelerators (per Reconciliation document):**
- **Q5 unified with Skill 9:** Per Reconciliation Section 3.1, Q5 wins on pre-mortem methodology (Klein framing, FMEA S×O×D scoring, Amazon door triggers). Skill 9 contributes the PROCEED/REVISE/ABSTAIN gate. The unified version uses both.
- **Q3 absorbed into Skill 12:** Per Reconciliation Section 3.2, Q3's visual formatting verification is absorbed into Skill 12's quality gate checklist. Q3 retains its broader "always audit" behavioral disposition.

---

## Phase 4: Verify

### Skill 7: Verification Operator

#### Cognitive Job

Systematically verify the draft's claims using domain-appropriate methods. Route internally: factual claims → CoVe (Factored Mode); logical/mathematical claims → reverse verification or independent method.

#### Provenance

Combines Claude Skills 3 + 6, Gemini Skill 4 (factored CoVe emphasis), GPT Skills 9 + 10, Perplexity Skill 3.

#### Procedure

**1. Extract verifiable claims** from the draft. For each claim, classify:
- **Factual claim** → Route to CoVe Factored Mode
- **Logical/mathematical claim** → Route to Reverse Verification
- **Mixed** → Apply both methods

**2. CoVe Factored Mode** (for factual claims):

Per Gemini's emphasis and Dhuliawala et al. (2023):
1. Extract the claim as a standalone question
2. Generate a verification question independent of the draft
3. Answer the verification question with maximum independence from the draft
4. Compare the independent answer to the original claim
5. If they conflict: flag for revision

**Adversarial claim framing** (to mitigate confirmation bias in single-context-window):
- For each claim, also generate its negation
- Evaluate both the claim and its negation
- This introduces structural adversarial pressure against sycophantic confirmation

**3. Reverse Verification** (for logical/mathematical claims):

Per Claude Skill 6:
- Solve the problem by a different method, or work backward from the conclusion
- If the independent solution matches: claim verified
- If it doesn't: flag for investigation

**4. Consistency Check** (Thorough mode only):

Per GPT Skill 10 (Self-Consistency, Wang et al. 2022):
- Generate 3 independent solution attempts for critical claims
- Compare results
- If 2+ agree: claim likely correct
- If all 3 disagree: flag as uncertain

**5. Produce verification table:**

```
VERIFICATION TABLE:
| # | Claim | Type | Method | Result | Action |
|---|-------|------|--------|--------|--------|
| 1 | [claim] | Factual | CoVe Factored | Verified | None |
| 2 | [claim] | Logical | Reverse | Contradicted | Revise |
| 3 | [claim] | Factual | CoVe Factored | Unverified | Flag |
```

#### Effort Scaling

- **Fast:** 2-3 spot-checks on highest-risk claims only
- **Standard:** Full CoVe on 5 claims + domain-appropriate verification for logical/math claims
- **Thorough:** CoVe on 8+ claims + consistency check (3 independent solutions) + deep verification on all HIGH-sensitivity assumptions from Phase 1

#### Known Limitation (Verification Isolation)

In a single-context-window architecture, true factored isolation cannot be fully achieved because the draft remains in the attention window. The adversarial claim framing (negation testing) partially mitigates this. For highest-stakes claims (medical, legal, financial), external multi-model verification remains the gold standard.

---

## Phase 5: Stress-Test

### Skill 8: Adversarial Critic & Debate

#### Cognitive Job

Attack the verified draft to find weaknesses, biases, missing perspectives, and edge cases.

#### Provenance

Claude Skill 5 + Skill 9, Gemini Skill 5, GPT Skills 11 + 12, Perplexity Skill 4.

#### Procedure

**Standard mode — Single Skeptic Pass:**

Attack the draft across 5 dimensions:
1. **Factual accuracy** — Are any claims wrong or unverifiable?
2. **Logical validity** — Do conclusions follow from premises?
3. **Completeness** — What's missing that should be there?
4. **Robustness** — Would this answer change if conditions or assumptions shifted?
5. **Bias** — What perspectives are missing or underrepresented?

Produce ranked issue list (max 5-7 issues by severity). For each: state the issue, provide a concrete fix.

**Thorough mode — Multi-Persona Debate:**

Instantiate 2-3 hostile personas (per Gemini's agent design):
- **Pragmatist** — "Will this actually work in practice?"
- **Red-Teamer** — "How can this fail or be exploited?"
- **Systems Architect** — "Does this scale and integrate cleanly?"

Run 2 rounds of debate. Moderator synthesizes findings.

#### Effort Scaling

- **Fast:** Skip entirely
- **Standard:** Single skeptic pass, 5 issues max, patched draft
- **Thorough:** Multi-persona debate, 2 rounds, moderated synthesis

---

### Skill 9: Pre-Mortem & Risk Analyst (Unified with Q5)

#### Cognitive Job

Assume the answer has been deployed and failed. Identify root causes, categorize failure modes, assess with quantitative scoring, propose mitigations, and make a gate decision.

#### Provenance

**UNIFIED per Reconciliation Section 3.1:** Q5's Klein framing + FMEA scoring + Amazon door triggers + Skill 9's PROCEED/REVISE/ABSTAIN gate. Q5 won on methodology; Skill 9 contributed the decision gate.

#### Procedure

**1. Klein Pre-Mortem** (from Q5 Part A):
"Assume this deliverable has been deployed and it failed. What went wrong?"
Use prospective hindsight framing (Klein 1989) — research shows this improves risk identification by ~30% over standard "what could go wrong" questioning.

**2. Root Cause Identification:**
Identify 3-5 root causes. Focus on technical/logical/semantic failure mechanics, not generic business risks.

**3. FMEA Scoring** (from Q5 Part B):
For each root cause, score on three dimensions (1-5 scale each):

| Dimension | 1 (Low) | 3 (Medium) | 5 (High) |
|-----------|---------|------------|----------|
| **Severity** | Minor inconvenience | Significant rework | Material harm (financial, legal, reputational) |
| **Occurrence** | Very unlikely | Possible under certain conditions | Likely under normal conditions |
| **Detection** | Would be caught immediately | Might go unnoticed initially | Could persist undetected |

**Risk Priority Number (RPN)** = Severity × Occurrence × Detection (range: 1-125)

| RPN Range | Classification | Action |
|-----------|---------------|--------|
| < 27 | Green | Accept risk, document only |
| 27-63 | Yellow | Mitigation required before delivery |
| > 63 | Red | Full mitigation + failure planning required |

**4. Amazon Door Framework** (from Q5 Part C):
For Red items: Is this a one-way door (irreversible) or two-way door (reversible)?
- **One-way door:** Requires rollback plan before proceeding
- **Two-way door:** Proceed with monitoring plan

**5. Gate Decision** (from Skill 9):
Based on FMEA results:
- **PROCEED** — No Red items, Yellow items mitigated
- **REVISE** — Red items exist but are addressable through revision
- **ABSTAIN** — Risk exceeds what can be mitigated; recommend Marc not use this output as-is

#### Effort Scaling

- **Fast:** Skip entirely
- **Standard:** Klein pre-mortem + top 3 root causes + simplified scoring (High/Medium/Low instead of 1-5) + gate decision
- **Thorough:** Full Klein pre-mortem + 5 root causes + full FMEA S×O×D scoring + door framework + failure planning for Red items + gate decision

---

## Phase 6: Govern & Ship

### Confidence Ledger (Cross-Skill Coordination)

Skills 10, 11, and 12 all perform evaluative work on the same draft. To prevent additive over-hedging (where each skill independently adds uncertainty language), they share a **Confidence Ledger**:

- Skill 5 (Reasoning Engine) writes initial confidence ratings for each conclusion
- Skill 7 (Verification) updates ratings based on verification results
- Skill 10 reads the ledger and may only downgrade confidence with a stated reason — it does NOT re-litigate claims already verified as HIGH confidence by Skill 7
- Skill 11 reads the ledger to assess materiality
- Skill 12 adds uncertainty language only for claims rated LOW confidence in the final ledger

This prevents the governance cluster from compounding qualifications independently.

---

### Skill 10: Uncertainty Calibrator

#### Cognitive Job

Align expressed confidence with actual reliability. Convert low-confidence factual claims into qualified statements, alternatives, or explicit unknowns.

#### Procedure

For each critical claim in the draft:
1. Read Confidence Ledger rating (from Skill 7 verification)
2. Check if current language matches actual confidence level
3. If mismatch: adjust language

| Confidence | Language Pattern |
|-----------|----------------|
| HIGH | State directly, no hedging |
| MEDIUM | "Based on available evidence..." / "Current data suggests..." |
| LOW | "This could not be reliably confirmed..." / Explicit unknown + what would increase confidence |

**Refusal protocol:** When information is insufficient to support a claim, refuse partially — state what you can confirm, what you cannot, and what Marc would need to verify independently.

#### Effort Scaling

- **Fast:** Skip entirely
- **Standard:** All critical claims calibrated
- **Thorough:** Full claim-confidence table produced

---

### Skill 11: Convergence Governor

#### Cognitive Job

Decide whether to iterate or stop. Enforce hard iteration caps.

#### Procedure

**1. Assess remaining issues:**
- **Material** = affects correctness, safety, or major usefulness. → ONE_MORE_PASS
- **Non-material** = wording tweaks, minor reordering, cosmetic. → STOP

**2. Check iteration budget:**

| Mode | Max Additional Passes | Loop-Back Path |
|------|----------------------|----------------|
| Fast | 0 (no iteration) | N/A |
| Standard | 1 | Skill 7 (re-verify) → Skill 8 (re-critique) → Skill 10 → Skill 11 |
| Thorough | 3 | Same path, up to 3 times |

The loop does NOT restart from Phase 1 or Phase 2 — it re-runs verification-and-governance only.

**3. Decision:**
- **STOP** — Output is ready for Quality Gate
- **ONE_MORE_PASS** — Specify which issues to address and which skills to re-run

#### Integration with Q3

Q3's behavioral disposition ("always audit your work") is the mandate. Skill 11's material-improvement criterion and effort-mode caps are the specific implementation. Q3's min-2/max-5 pass counts are superseded by Skill 11's mode-aware caps per Reconciliation Section 3.2.

---

### Skill 12: Output Contract & Quality Gate

#### Cognitive Job

Final check that output matches the contract. Deliver.

#### Procedure

**Quality Gate Checklist:**

- [ ] **Format compliance** — Matches requested format from Phase 1
- [ ] **Objective alignment** — Answers the anchored objective from Phase 1
- [ ] **Success criteria** — Each criterion from Phase 1 is individually verified (per R-05)
- [ ] **Constraint satisfaction** — Each constraint from the ledger is checked off
- [ ] **Uncertainty disclosure** — LOW confidence claims have appropriate language (from Skill 10)
- [ ] **Citation mapping** — When sources present: every factual claim has a citation, Tier 1 claims have Level 2 citations (per R-20)
- [ ] **Completeness audit** — No sections missing, no subgoals unaddressed
- [ ] **Visual formatting** — (per Q3) If deliverable contains visual elements: fonts readable without zooming, no text wrapping/truncation/overflow, no color contrast issues
- [ ] **R-18 Context Anchor** — Final answer opens with one-line context anchor
- [ ] **R-19 Next Step** — Final answer ends with "What's Next" section
- [ ] **Framing review** — Output describes what things ARE, not what they changed from. No "Why the Pivot" framing, no "previously we did X, now we do Y" unless Marc explicitly asked for a comparison. (Section 5 standing preference)

**Minimal edits only** at this stage — no deep reasoning reopening. If major issues found, route back to Skill 11 for convergence decision.

#### Effort Scaling

- **Fast:** Checklist only (format, objective, success criteria)
- **Standard:** Full checklist including citation mapping and completeness audit
- **Thorough:** Full checklist + inline quality scoring before delivery

---

## Phase 4-6 Integration Flow

```
Draft arrives from Phase 2-3 (qe-reasoning-engine)
    ↓
PHASE 4: VERIFY
Skill 7: Verification Operator
    → Extract claims → CoVe/Reverse/Consistency → Verification table → Revised draft
    ↓
PHASE 5: STRESS-TEST [standard + thorough only]
Skill 8: Adversarial Critic & Debate
    → Single skeptic (standard) or multi-persona debate (thorough) → Patched draft
    ↓
Skill 9: Pre-Mortem & Risk Analyst (unified with Q5)
    → Klein pre-mortem → FMEA scoring → Door framework → Gate decision
    ↓
If ABSTAIN: Stop. Surface to Marc with explanation.
If REVISE: Apply revisions, re-enter at Skill 7.
If PROCEED: Continue to Phase 6.
    ↓
PHASE 6: GOVERN & SHIP
Skill 10: Uncertainty Calibrator
    → Read Confidence Ledger → Calibrate language → Refusal protocol where needed
    ↓
Skill 11: Convergence Governor
    → Material vs. non-material assessment → STOP or ONE_MORE_PASS
    ↓
If ONE_MORE_PASS: Loop back to Skill 7 (within iteration budget)
If STOP: Continue to Skill 12.
    ↓
Skill 12: Output Contract & Quality Gate
    → Full checklist → R-18 anchor → R-19 next steps → DELIVER
```

---

*Quality Engine Phases 4-6 of 6. Receives from qe-reasoning-engine (Phases 2-3). Delivers final output to Marc. Post-delivery: self-audit and check-protocol available as second-line quality checks.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |