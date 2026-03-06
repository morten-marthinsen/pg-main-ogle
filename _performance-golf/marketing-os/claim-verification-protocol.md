# CLAIM VERIFICATION PROTOCOL

**Version:** 1.0
**Created:** 2026-02-06
**Purpose:** SYSTEM-WIDE enforcement to prevent fabricated claims in copywriting output
**Authority:** This document has EQUAL authority to all ANTI-DEGRADATION files
**Applies To:** ALL narrative skills (10-17), Assembly (19), Editorial (20)

---

## WHY THIS PROTOCOL EXISTS

**Catastrophic Failure Pattern Discovered (Ultra Liver 2026-02-05):**

The Ultra Liver campaign passed Editorial with an A- (91%) grade despite containing:
- "Harvard researchers found that chronic bile stagnation can progress... in as little as 5 years" — **FABRICATED**
- Incorrect journal attribution ("Amino Acids" instead of "Clinical and Experimental Pharmacology and Physiology")
- Potential misattribution of statistics to wrong sources

**Root Cause Analysis:**

1. **Proof Inventory (Skill 02)** correctly extracts and validates proof from sources
2. **Narrative Skills (11-17)** write copy without mandatory verification against proof inventory
3. **LLM hallucinates** plausible-sounding claims that aren't in source data
4. **No structural gate** enforces "every claim must trace to proof inventory"
5. **Editorial (Skill 20)** evaluated quality but didn't verify claim sourcing

**Result:** Copy that contains fabricated research claims, wrong attributions, and invented statistics that damage credibility and could expose the brand to legal liability.

---

## THE NON-NEGOTIABLE RULE

> **EVERY quantified claim, statistic, percentage, study citation, expert attribution, or specific fact in any copywriting output MUST be traceable to a specific proof element in the proof inventory OR flagged as [NEEDS_VERIFICATION].**

---

## CLAIM CATEGORIES REQUIRING VERIFICATION

### TIER 1: MANDATORY VERIFICATION (Zero Tolerance)

| Claim Type | Example | Verification Requirement |
|------------|---------|-------------------------|
| **Statistics** | "61% increase" | Must have proof_id |
| **Percentages** | "38% of Americans" | Must have proof_id |
| **Study Citations** | "Published in [Journal]" | Must have proof_id + exact source |
| **Expert Attributions** | "Harvard researchers" | Must have proof_id + exact source |
| **Institutional Claims** | "AASLD recommends" | Must have proof_id + exact source |
| **Timeframes** | "in just 3 days" | Must have proof_id |
| **Patient/Subject Counts** | "883 patients" | Must have proof_id |

### TIER 2: STRONG VERIFICATION (Flag if Uncertain)

| Claim Type | Example | Verification Requirement |
|------------|---------|-------------------------|
| **General Medical Facts** | "Your liver detoxifies in 3 phases" | Should have supporting source |
| **Mechanism Claims** | "bile carries toxins out" | Should trace to mechanism research |
| **Outcome Projections** | "could progress to serious concern" | Must have source or be removed |

### TIER 3: COPY LANGUAGE (Acceptable Without Proof)

| Claim Type | Example | Notes |
|------------|---------|-------|
| **Rhetorical Questions** | "Have you ever wondered?" | Opinion/engagement |
| **Prospect Experiences** | "The bloating that won't go away" | Market research backed |
| **Promise Framing** | "What if you could finally..." | Framing, not fact |

---

## VERIFICATION GATE STRUCTURE

### For Every Narrative Skill (11-17)

```yaml
CLAIM_VERIFICATION_GATE:
  timestamp: "[ISO 8601]"
  skill: "[skill name]"

  claims_audit:
    total_claims_found: [number]

    verified_claims:
      - claim_text: "[exact claim]"
        proof_id: "[ID from proof inventory]"
        source: "[exact source citation]"
        verification_status: "VERIFIED"

    unverified_claims:
      - claim_text: "[exact claim]"
        attempted_source: "[what was searched]"
        verification_status: "NOT_FOUND"
        action: "[REMOVE | FLAG_FOR_HUMAN | REWORD]"

    fabrication_check:
      statistics_verified: [count / total]
      percentages_verified: [count / total]
      study_citations_verified: [count / total]
      expert_attributions_verified: [count / total]

  gate_result:
    IF unverified_claims.count > 0 AND action != "REMOVE":
      HALT — "Unverified claims must be removed or flagged"

    IF fabrication_check.any < 100%:
      HALT — "All Tier 1 claims must be 100% verified"
```

### For Assembly (Skill 19)

```yaml
ASSEMBLY_CLAIM_GATE:
  pre_assembly_verification:
    all_sections_passed_claim_gate: [Y/N]

  post_assembly_verification:
    new_claims_introduced: [count]  # Should be 0
    if_new_claims > 0:
      HALT — "Assembly cannot introduce new claims"
```

### For Editorial (Skill 20)

```yaml
EDITORIAL_CLAIM_GATE:
  claim_sourcing_audit:
    total_tier1_claims: [count]
    tier1_claims_verified: [count]
    tier1_verification_rate: [percentage]

    IF tier1_verification_rate < 100%:
      HALT — "All Tier 1 claims must be verified before Editorial approval"

    unverified_claims_list:
      - claim: "[text]"
        location: "[section, line]"
        action_required: "[REMOVE | CORRECT | VERIFY_EXTERNALLY]"
```

---

## FORBIDDEN BEHAVIORS

### LLM Fabrication Patterns to Block

| Pattern | Example | Why It's Dangerous |
|---------|---------|-------------------|
| **Plausible Institution** | "Harvard researchers" | Implies credibility without source |
| **Round Numbers** | "15 million Americans" | Often fabricated for impact |
| **Specific Timeframes** | "in as little as 5 years" | Often invented for urgency |
| **Journal Attribution** | "published in [Journal]" | Wrong journal damages credibility |
| **Expert Quotes** | "Dr. [Name] says" | May not exist or be misquoted |

### Detection Signals

- Any "Harvard/Yale/Johns Hopkins" claim without proof_id
- Any specific percentage without proof_id
- Any "study shows" without citation
- Any timeframe claim ("X days/weeks/years") without proof_id
- Any patient count without proof_id

---

## IMPLEMENTATION REQUIREMENTS

### Mandatory for All Narrative Skills

1. **Before generating any claim:** Check proof inventory
2. **If claim not found:** Do NOT invent it
3. **If unsure:** Flag as [NEEDS_VERIFICATION]
4. **After draft:** Run CLAIM_VERIFICATION_GATE
5. **Gate must pass** before proceeding to next layer

### Mandatory Output Format

All drafts must include a CLAIM_VERIFICATION_APPENDIX:

```yaml
claim_verification_appendix:
  total_tier1_claims: [number]
  verified_claims:
    - claim: "[text]"
      proof_id: "[ID]"
      source: "[citation]"
  flagged_claims:
    - claim: "[text]"
      reason: "[why flagged]"
      recommended_action: "[action]"

  verification_rate: [percentage]
  gate_status: [PASS | FAIL | NEEDS_HUMAN_REVIEW]
```

---

## INTEGRATION WITH EXISTING ANTI-DEGRADATION

### Add to Each Skill's Anti-Degradation File

```yaml
STRUCTURAL FIX [N]: CLAIM VERIFICATION GATE

claim_verification:
  all_tier1_claims_verified: [Y/N]
  unverified_claims_removed_or_flagged: [Y/N]
  claim_verification_appendix_present: [Y/N]

  IF any == N:
    HALT — "Claim verification failed"
```

### Priority Skills for Implementation

1. **17-close** — Urgency claims prone to fabrication
2. **13-root-cause-narrative** — Medical/scientific claims
3. **14-mechanism-narrative** — Study citations
4. **11-lead** — Statistics and problem amplification
5. **20-editorial** — Final verification gate

---

## DOCUMENTED FAILURE: Ultra Liver 2026-02-05

### Fabricated Claim

**Text:** "Harvard researchers found that chronic bile stagnation can progress from simple discomfort to serious liver concerns in as little as 5 years."

**Location:** Close section, line 553-554

**Problem:** This claim does not exist in the proof inventory. Harvard is cited elsewhere for NASH transplant data (PROOF-026), not bile stagnation progression timelines.

**How It Passed:**
- Narrative skill generated plausible-sounding claim
- No verification gate existed
- Editorial evaluated "quality" not "accuracy"
- Human reviewer didn't catch it

**Fix Applied:** Replaced with verified claim: "Harvard researchers published in JAMA identified fatty liver disease as the fastest-growing reason for liver transplants in the United States."

### Incorrect Attribution

**Text:** "Research published in the journal Amino Acids found that taurine supplementation increased bile flow by up to 61%"

**Problem:** The proof inventory cites "Clinical and Experimental Pharmacology and Physiology (2016)", not "Amino Acids"

**Fix Applied:** Corrected journal name to "Clinical and Experimental Pharmacology and Physiology"

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-06 | Initial creation after Ultra Liver fabrication failure analysis. Establishes system-wide claim verification requirements for all narrative skills. |

---

## KEY INSIGHT

> **"LLMs are excellent at generating plausible-sounding claims. They are terrible at knowing whether those claims are true. Every quantified claim must trace to a proof_id or be removed."**

---

**Protocol Status:** ACTIVE — MANDATORY for all narrative skills
