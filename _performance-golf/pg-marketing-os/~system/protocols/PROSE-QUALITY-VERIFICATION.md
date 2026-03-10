# Prose Quality Verification — Cascading Prose Handoff Checks

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Apply Layer 2 scoped verification at each prose handoff in Skills 11-17 to catch degradation before it compounds
**Authority:** Application of SCOPED-VERIFICATION-PROTOCOL.md at VP-3 (Prose Handoff)
**Sources:** Mastermind Rec 1, Agents of Chaos — False Completion Propagation

---

## Prose Quality Gate (Skills 11-17)

Before any copy skill reads the previous skill's assembled prose, verify prose quality — not just file existence and size. Check:
1. Does the prose serve the confirmed root angle?
2. Does it use language from the expression anchoring top performers?
3. Does it maintain the voice established in Soul.md?

If any dimension flags, address BEFORE the downstream skill builds on it. Layer 2 scoped verification handles this automatically for Full and Standard tiers.

---

## Why This Check Exists

The cascading prose pattern is the highest-risk architectural feature. Every skill trusts the previous skill's prose as ground truth. The handoff registry checks field presence and file size — NOT prose quality.

A 650-word lead that hits the size threshold but uses weak language, misses the FSSIT anchor, or drifts from the mechanism passes every Layer 1 gate. The Agents of Chaos study proved this exact pattern: agents building on other agents' false reports, with degradation compounding through every layer.

**This check catches prose-level degradation at each step instead of at assembly (Skill 19).**

---

## The Prose Cascade

```
Skill 11 (Lead) → lead-assembled-prose.md
    ↓ [VP-3 check]
Skill 12 (Story) → story-assembled-prose.md
    ↓ [VP-3 check]
Skill 13 (Root Cause) → rc-narrative-assembled-prose.md
    ↓ [VP-3 check + VP-2 Foundation Integrity]
Skill 14 (Mechanism) → mech-narrative-assembled-prose.md
    ↓ [VP-3 check]
Skill 15 (Product Intro) → product-intro-assembled-prose.md
    ↓ [VP-3 check]
Skill 16 (Offer) → offer-assembled-prose.md
    ↓ [VP-3 check]
Skill 17 (Close) → close-assembled-prose.md
```

---

## Tier-Based Depth

| Tier | Which Handoffs Get Checked |
|------|---------------------------|
| **Full** | All 6 handoffs (after every prose skill) |
| **Standard** | Midpoint only (after Skill 13, before Skill 14) |
| **Quick** | None (Layer 1 programmatic checks only) |

---

## What Gets Loaded Per Check (~15KB)

| File | Purpose | Est. Size |
|------|---------|-----------|
| The prose file just produced | Output to verify | ~2-5KB |
| The previous skill's prose file | Upstream continuity reference | ~2-5KB |
| `Soul.md` (voice register section only) | Voice consistency anchor | ~1KB |
| Foundation anchors (mechanism name, root cause, promise) | Drift detection | ~2KB |
| The 3 binary questions | Verification criteria | ~1KB |
| **Total** | | **~10-15KB** |

---

## The 3 Binary Questions (Per Handoff)

### Q1: Root Angle Service
**"Does this prose serve the confirmed root angle, or has it drifted to a related but different angle?"**

- **Y:** The prose reinforces the root cause/mechanism/promise from Foundation
- **N (FLAG):** The prose has shifted to a tangential angle, softened the root cause, or introduced a new framing not in Foundation packages

**Evidence:** Quote the passage and compare to the root angle from the root-cause-package.

### Q2: Voice Consistency
**"Does the voice match the Soul.md register established in the lead, or has it shifted?"**

- **Y:** Voice register, energy signature, and anti-voice patterns are consistent with Soul.md and upstream prose
- **N (FLAG):** The voice has shifted — became more formal, more generic, lost the specific energy signature, or violated an anti-voice pattern

**Evidence:** Quote a passage that demonstrates the voice shift vs. a passage from upstream prose.

### Q3: Expression Anchoring
**"Does the prose use language from the expression anchoring top performers, or has it defaulted to generic category language?"**

- **Y:** Expression anchors appear naturally — the prose uses the specific phrasings that scored highest
- **N (FLAG):** The prose has defaulted to generic DR copy language (e.g., "breakthrough discovery," "revolutionary method") instead of the campaign's specific expressions

**Evidence:** List which expression anchors appear vs. which are missing.

---

## Per-Handoff Specific Additions

Beyond the 3 universal questions, each handoff has ONE additional skill-specific question:

| Handoff | Additional Question |
|---------|-------------------|
| 11→12 (Lead→Story) | "Does the story pick up the emotional thread from the lead's hook, or does it restart the emotional arc?" |
| 12→13 (Story→RC Narrative) | "Does the root cause narrative build on the story's situation, or does it feel like a separate document?" |
| 13→14 (RC→Mechanism) | "Does the mechanism narrative flow from the root cause as a natural solution, or does it feel like an info dump?" |
| 14→15 (Mechanism→Product) | "Does the product introduction ASSUME the reader understands the mechanism, or does it re-explain it?" |
| 15→16 (Product→Offer) | "Does the offer copy build on the product's value framing, or does it switch to a pure sales register?" |
| 16→17 (Offer→Close) | "Does the close maintain urgency from the offer without repeating CTAs or arguments already made?" |

---

## Result Format

```yaml
# prose-quality-[skill-number]-[timestamp].yaml
verification_point: "VP-3: Prose Handoff"
handoff: "[skill-N]→[skill-N+1]"
tier: "[Full|Standard]"
timestamp: "[ISO 8601]"

questions:
  - id: "Q1-root-angle"
    result: "[Y|N]"
    evidence: "[quote]"
  - id: "Q2-voice-consistency"
    result: "[Y|N]"
    evidence: "[quote]"
  - id: "Q3-expression-anchoring"
    result: "[Y|N]"
    evidence: "[quote]"
  - id: "Q4-skill-specific"
    question: "[the handoff-specific question]"
    result: "[Y|N]"
    evidence: "[quote]"

overall_result: "[PASS|FLAG]"
flags:
  - question_id: "[Q1-Q4]"
    severity: "[minor|major|critical]"
    description: "[what failed]"
    recommendation: "[what to do]"
```

**Output location:** `~outputs/[project-code]/verification/prose-quality-[skill-number].yaml`

---

## Result Handling

| Result | Action |
|--------|--------|
| **PASS** | Proceed to next skill. File saved for audit trail. |
| **FLAG (minor — single Q)** | Note in execution log. Proceed but monitor in next check. |
| **FLAG (major — 2+ Qs)** | Surface to human. Recommend re-running the flagged skill with corrective guidance. |
| **FLAG (critical — voice + angle drift)** | Surface to human. Recommend returning to Active Recitation before continuing. |

---

## Scope Management

This check is **FAST and NARROW:**
- 3-4 binary questions per handoff
- ~15KB context
- 30-60 seconds per check
- NOT a full editorial review
- NOT subjective quality scoring
- Binary PASS/FLAG only

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — per-handoff prose quality verification with 3 universal + 1 skill-specific question per check |
