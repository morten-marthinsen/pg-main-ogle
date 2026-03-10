# Foundation Integrity Check — Downstream → Foundation Feedback

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Scoped verification at the midpoint of copy generation checking Foundation decisions against actual prose
**Authority:** Application of SCOPED-VERIFICATION-PROTOCOL.md at VP-2 (Midpoint Integrity)
**Sources:** Mastermind Rec 8, Agents of Chaos — Single Point of Failure finding

---

## Why This Check Exists

Foundation skills (00-09) run ONCE per product. Everything downstream builds on Foundation decisions. If the mechanism doesn't translate to persuasive prose, or the root cause framing doesn't resonate when written as narrative, there's no mechanism to flag this — until now.

Foundation decisions are permanent by design. But they shouldn't be immune to evidence from downstream execution.

---

## When It Fires

**Trigger:** After completing Skills 10-13 (first half of copy), before starting Skill 14 (Mechanism Narrative).

**Tier applicability:**
- **Full:** YES — mandatory
- **Standard:** YES — mandatory
- **Quick:** NO — skipped

---

## What Gets Loaded (Fresh Context — ~20KB)

| File | Purpose | Est. Size |
|------|---------|-----------|
| `mechanism-package.json` | Mechanism name, analogy, E-level | ~3KB |
| `root-cause-package.yaml` | Root cause framing, villain, reframe | ~3KB |
| `promise-package.json` | Big Idea, primary promise | ~2KB |
| `context-reservoir.md` (Section 6 only: Expression Anchoring) | Top performers | ~2KB |
| `lead-assembled-prose.md` | Actual lead prose | ~3KB |
| `story-assembled-prose.md` | Actual story prose | ~3KB |
| `rc-narrative-assembled-prose.md` | Actual root cause narrative prose | ~3KB |
| **Total** | | **~19KB** |

---

## The 4 Binary Questions

### Q1: Mechanism Translation
**"Does the mechanism name translate naturally into prose, or does the narrative require extensive explanation that didn't exist in the mechanism package?"**

- **Y:** The mechanism appears in prose naturally — readers would understand it from context
- **N (FLAG):** The prose either avoids the mechanism name, explains it awkwardly, or requires a paragraph of setup not present in the mechanism package

**Evidence:** Quote the specific passage(s) where the mechanism appears in prose.

### Q2: Root Cause Resonance
**"Does the root cause framing resonate in narrative form, or does it feel forced when written as story?"**

- **Y:** The root cause narrative flows naturally from the story — the villain and reframe work as narrative elements
- **N (FLAG):** The root cause narrative required significant reframing from the original package, or the villain concept doesn't translate to narrative form

**Evidence:** Quote the root cause framing in the package vs. how it appears in prose.

### Q3: Expression Anchoring Holdup
**"Do the expression anchoring top performers hold up in full prose, or do winning expressions feel different embedded in paragraphs vs. standalone?"**

- **Y:** Top expressions appear naturally in prose and maintain their impact
- **N (FLAG):** Winning expressions that scored high in isolation feel awkward, forced, or lose impact when embedded in running copy

**Evidence:** Quote the top 2-3 expression anchors and show how they appear in prose.

### Q4: Foundation Contradictions
**"Are there contradictions between Foundation decisions and what the prose actually says?"**

- **Y (no contradictions):** Prose aligns with Foundation packages — mechanism, root cause, promise, and villain are consistent
- **N (FLAG — contradictions found):** Prose contradicts or significantly reinterprets Foundation decisions

**Evidence:** Cite the specific contradiction with quotes from both Foundation package and prose.

---

## Result Format

```yaml
# foundation-integrity-report.yaml
verification_point: "VP-2: Midpoint Integrity"
tier: "[Full|Standard]"
timestamp: "[ISO 8601]"
skills_verified: ["10-Headline", "11-Lead", "12-Story", "13-RC-Narrative"]

questions:
  - id: "Q1-mechanism-translation"
    result: "[Y|N]"
    evidence: "[quote]"
  - id: "Q2-root-cause-resonance"
    result: "[Y|N]"
    evidence: "[quote]"
  - id: "Q3-expression-anchoring"
    result: "[Y|N]"
    evidence: "[quote]"
  - id: "Q4-foundation-contradictions"
    result: "[Y|N]"
    evidence: "[quote]"

overall_result: "[PASS|FLAG]"
flags:
  - question_id: "[Q1-Q4]"
    severity: "[minor|major|critical]"
    description: "[what failed]"
    recommendation: "[what to do]"
```

**Output location:** `~outputs/[project-code]/foundation-integrity-report.yaml`

---

## If Any FLAG

1. Document the flag(s) in the Context Reservoir update
2. Surface to human operator with evidence
3. Human decides:
   - **Proceed:** The flag is acknowledged but not blocking (e.g., minor expression awkwardness)
   - **Adjust:** Update the Context Reservoir with guidance for Skills 14-17 to compensate
   - **Revise:** Re-run the flagged Foundation package and re-generate Skills 10-13
4. Decision is recorded in the integrity report file

**The human decides — the check does not auto-halt.**

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — midpoint Foundation integrity check with 4 binary questions |
