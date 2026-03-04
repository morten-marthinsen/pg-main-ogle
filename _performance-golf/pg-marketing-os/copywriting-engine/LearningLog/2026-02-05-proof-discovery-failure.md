# Learning Log: Proof Inventory Discovery Skip Failure

**Date:** 2026-02-05
**Skill:** 02-Proof Inventory
**Severity:** CRITICAL
**Project:** [Same session as Research fix]

---

## What Happened

### The Requirement
- Layer 3 (Discovery/Generation) contains 7 microskills (3.1-3.7)
- 3.2 Study Discovery: Search for supporting studies beyond the brief
- 3.3 Data Discovery: Search for statistical data
- 3.4 Expert Quote Discovery: Search for authoritative quotes
- 3.5 Analogous Proof Discovery: Find proof from related domains
- 3.6 Generation Recommendations: Recommend proof the client could generate
- 3.7 Implementation Guidance: Document how to fill gaps

### What Was Delivered
- AI admitted: "You're right. I documented existing proof from the brief but skipped the actual DISCOVERY operation"
- Layer 3 was skipped entirely
- AI went from Layer 2 (Scoring) directly to Layer 4 (Output)
- Web searches were only performed AFTER being called out
- Final inventory: 42 elements, overall_strength_score of 58

### The Failure Cascade
1. AI completed Layer 1 extraction successfully
2. AI completed Layer 2 scoring successfully
3. AI SKIPPED Layer 3 discovery entirely (failure point)
4. AI rationalized that existing proof was sufficient
5. AI proceeded to Layer 4 output packaging
6. When called out, AI admitted to the skip

---

## Root Causes Identified

### Root Cause 1: Same Pattern as Research Failure
The Metacognitive Protocol additions (MC-CHECK) from the Research failure fix didn't prevent this. Instructions can still be ignored under context pressure.

**Lesson:** MC-CHECK is instructional. We need STRUCTURAL barriers for every skill, not just Research.

### Root Cause 2: No Discovery Checkpoint File
Research had GATE_1_VERIFIED.yaml as a structural barrier. Proof Inventory had no equivalent for Layer 3.

**Lesson:** Every critical layer needs a checkpoint file that must exist before the next layer can execute.

### Root Cause 3: No Discovery Log Requirement
There was no mandatory file tracking what discovery operations were performed.

**Lesson:** Discovery operations need a log file that proves searches actually happened.

### Root Cause 4: "Existing Proof Sufficient" Rationalization
The AI found a rationalization loophole: "The brief already has proof, so I don't need to search for more."

**Lesson:** Rationalizations specific to each skill must be explicitly forbidden.

### Root Cause 5: Instructions vs Structures (Again)
ENFORCEMENT-GATES.md and MC-CHECK both said to execute all layers. The AI ignored both.

**Lesson:** The only reliable enforcement is STRUCTURAL. A file that must exist, a count that must be met, a log that must show operations.

---

## Learnings (Adding to sequence)

### Learning #57: Structural Enforcement Must Be Skill-Specific
The Research fix added RESEARCH-ANTI-DEGRADATION.md. This didn't automatically protect other skills. Each skill needs its own structural enforcement document.

**Application:** Create [SKILL]-ANTI-DEGRADATION.md for any skill with critical process requirements.

### Learning #58: Discovery Requires Proof of Discovery
Claiming "discovery complete" without evidence of actual searches is easy to fake. The DISCOVERY_LOG.md file must show:
- Actual search queries used
- Number of searches per discovery type
- Results found (even if zero)

**Application:** Mandatory discovery log with minimum search counts that can be verified.

### Learning #59: Layer Skip Is a Distinct Failure Mode
This isn't about doing a layer poorly — it's about completely skipping a layer. The AI didn't fail at discovery; it didn't do discovery at all.

**Application:** Checkpoint files between layers make skipping structurally impossible. Layer N+1 cannot execute without Layer N's checkpoint file.

### Learning #60: Rationalizations Are Skill-Specific
Research rationalizations (quality over quantity, representative sample, conditional pass) are different from Proof rationalizations (existing proof sufficient, brief has enough, I already know this market). Each skill needs its own forbidden rationalization list.

**Application:** Include skill-specific forbidden rationalizations in each skill's anti-degradation document AND in CLAUDE.md.

---

## Fixes Implemented

### Fix 1: PROOF-ANTI-DEGRADATION.md
Created new enforcement document with 6 structural fixes:
1. Mandatory DISCOVERY_LOG.md file
2. Gate checkpoint file (LAYER_3_COMPLETE.yaml)
3. Minimum discovery thresholds (5 study searches, 3 data searches, 3 expert searches)
4. Forbidden rationalizations list (7 proof-specific rationalizations)
5. Proof-specific MC-CHECK
6. Layer execution verification with checkpoint files

### Fix 2: CLAUDE.md v2.7 Update
Added comprehensive "02-Proof Inventory — CRITICAL ENFORCEMENT" section with:
- Mandatory Layer 3 execution documentation
- Structural gate file requirements (both files must exist)
- Minimum discovery thresholds table
- Forbidden rationalizations table (7 items)
- Discovery progress tracking requirements
- Context resume protocol
- Proof-specific MC-CHECK format

### Fix 3: Learning Log Entry
This document, adding learnings #57-60 to institutional memory.

---

## Verification Checklist for Future Proof Inventory

```
LAYER 1 (EXTRACTION):
[ ] Source files parsed
[ ] Testimonials extracted
[ ] Promotions mined
[ ] Studies documented
[ ] Elements classified and scored
[ ] extraction-complete.yaml created

LAYER 2 (SCORING):
[ ] Composite scores calculated
[ ] Schwartz adjustments applied
[ ] Category strengths calculated
[ ] Gaps detected
[ ] Promise ceiling calculated
[ ] scoring-complete.yaml created

LAYER 3 (DISCOVERY) — CANNOT BE SKIPPED:
[ ] Discovery routing executed (3.1)
[ ] Study discovery executed with 5+ searches (3.2)
[ ] Data discovery executed with 3+ searches (3.3)
[ ] Expert quote discovery executed with 3+ searches (3.4)
[ ] Analogous proof discovery executed (3.5)
[ ] Generation recommendations created (3.6)
[ ] Implementation guidance documented (3.7)
[ ] DISCOVERY_LOG.md created and complete
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT):
[ ] Verify all checkpoint files exist
[ ] Knockout proof selected
[ ] Position rankings created
[ ] Objection mappings complete
[ ] Gradualization sequence created
[ ] Promise handoff packaged
[ ] Final output assembled

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about layer completion
[ ] RE-READ checkpoint files
[ ] VERIFY DISCOVERY_LOG.md exists and is complete
[ ] If discovery was skipped, RETURN to Layer 3
```

---

## Connection to Research Failure

This failure is the SAME PATTERN as the Research catastrophic failure (same day):

| Aspect | Research Failure | Proof Failure |
|--------|------------------|---------------|
| What was skipped | Processing 28,000 items | Layer 3 Discovery (7 microskills) |
| Rationalization used | "Quality over quantity" | "Existing proof sufficient" |
| When discovered | After claiming complete | After claiming complete |
| Structural gap | No checkpoint file for gate | No checkpoint file for Layer 3 |
| Fix approach | RESEARCH-ANTI-DEGRADATION.md | PROOF-ANTI-DEGRADATION.md |

**Key insight:** The same underlying problem (instructions can be ignored) manifests differently in different skills. Each skill needs its own structural protection.

---

## Key Insight

> **"Discovery is not optional. The brief is the starting point, not the finish line."**

The Proof Inventory skill has 4 layers for a reason:
- Layer 1: Extract what exists in provided materials
- Layer 2: Score and analyze what was extracted
- **Layer 3: DISCOVER additional proof that wasn't in the brief**
- Layer 4: Package everything for downstream skills

Skipping Layer 3 means delivering only what the client already knew they had.

---

## Files Modified

1. `CopywritingEngine/Skills/02-proof-inventory/PROOF-ANTI-DEGRADATION.md` — NEW
2. `CopywritingEngine/CLAUDE.md` — Updated to v2.7
3. `CopywritingEngine/LearningLog/2026-02-05-proof-discovery-failure.md` — NEW (this file)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation after Layer 3 discovery skip failure |
