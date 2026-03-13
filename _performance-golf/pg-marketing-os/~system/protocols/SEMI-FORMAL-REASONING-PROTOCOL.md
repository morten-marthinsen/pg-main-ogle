# SEMI-FORMAL-REASONING-PROTOCOL.md

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Enforce structured reasoning with counterexample requirements for all analytical conclusions. Prevents pattern-matching shortcuts and premature confidence.
**Authority:** This protocol has EQUAL authority to ~system/SYSTEM-CORE.md.
**Research basis:** Agentic Code Reasoning — Semi-formal reasoning templates with counterexample requirements

---

## TABLE OF CONTENTS

- [When This Protocol Applies](#when-this-protocol-applies)
- [1. Semi-Formal Reasoning Template](#1-semi-formal-reasoning-template)
- [2. Steel Man Gate](#2-steel-man-gate)
- [3. Forbidden Reasoning Patterns](#3-forbidden-reasoning-patterns)

---

## When This Protocol Applies

This protocol applies to **any skill microskill that produces an analytical conclusion**, including but not limited to:

| Skill | Analytical Conclusions |
|-------|----------------------|
| 03 Root Cause | Root cause selection, hidden layer discovery, truth validation |
| 04 Mechanism | Mechanism type selection, emphasis strategy, scorecard validation |
| 05 Promise | Proof ceiling calibration, Schwartz stage verification |
| 06 Big Idea | Schema distance calibration, FSSIT validation, defensibility scoring |
| Arena (all) | Winner selection, Learning Brief technique identification |

**This protocol does NOT apply to:** Pure generation tasks (writing copy, generating candidates), mechanical validation (file existence checks, threshold comparisons), or data loading.

---

## 1. Semi-Formal Reasoning Template

When producing an analytical conclusion, the output MUST follow this structure:

```markdown
## PREMISES
[List explicit facts/evidence that inform this analysis. Each premise must be sourced — cite the specific file, research finding, proof element, or upstream package it comes from.]

- P1: [fact] — Source: [file/section]
- P2: [fact] — Source: [file/section]
- P3: [fact] — Source: [file/section]
- [additional premises as needed]

## EVIDENCE CHAIN
[Trace the logical path from premises to conclusion. Each step must reference a specific premise by number.]

1. From P1 and P2, we can establish that [intermediate conclusion]
2. Combined with P3, this means [further inference]
3. Therefore [conclusion follows]

## CONCLUSION
[State the conclusion derived from the evidence chain. Must be specific and falsifiable.]

## COUNTEREXAMPLE CHECK
[If the opposite conclusion were true, what evidence would we expect to find? Examine whether that evidence exists.]

- If [opposite conclusion] were true, we would expect to see: [specific evidence]
- Status of that evidence: [exists / does not exist / partially exists]
- Why the counterexample fails OR why it raises legitimate concern: [explanation]

## CONFIDENCE ASSESSMENT
- Level: [High / Medium / Low]
- Reasoning: [Why this confidence level — based on evidence quality, not chain length]
- Key uncertainty: [The single biggest factor that could change this conclusion]
```

### Template Usage Rules

1. **Every premise must be sourced.** "It seems likely" is not a premise. "Research FINAL_HANDOFF.md section 4.2 shows that 73% of survey respondents reported X" is a premise.
2. **Evidence chains cannot skip steps.** Each inference must follow from named premises. "Obviously" and "clearly" are banned connectors.
3. **Counterexample checks are MANDATORY.** An analysis without a counterexample check is incomplete and CANNOT be used for downstream decisions.
4. **Confidence is based on evidence quality, not chain length.** A short chain with strong evidence scores High. A long chain with weak evidence scores Low.

---

## 2. Steel Man Gate

**Trigger:** Before accepting any winner at Arena exits and competitive gates (mechanism selection, root cause selection, Big Idea selection, promise selection, Arena Round 3 final ranking).

### Steel Man Procedure

Before the selected winner is finalized:

```markdown
## STEEL MAN GATE

### Winner Under Review
[Name/ID of the proposed winner]

### Strongest Argument AGAINST This Winner
[Articulate the most compelling case for why this winner should NOT be selected. This must be a genuine argument, not a straw man. Consider:]
- What does this winner sacrifice compared to the runner-up?
- What audience segment would this winner fail to reach?
- What competitive vulnerability does this winner create?
- What proof gap exists for this winner's claims?

### Evidence That Would Invalidate the Winner
[Identify specific, concrete evidence that — if it existed — would disqualify this winner]

### Why the Counterargument Fails
[Explain specifically why the argument against fails, with evidence]

### Steel Man Result
- Counterargument defeated: [Y/N]
- If N: FLAG FOR HUMAN REVIEW — do not auto-select
- If Y: Winner confirmed with documented reasoning
```

### Steel Man Gate Rules

1. **The counterargument must be genuine.** "There is no argument against this winner" is ALWAYS wrong and triggers HALT.
2. **If the counterargument CANNOT be defeated:** The winner is flagged for human review. The system does NOT auto-select. Present both the winner and the counterargument to the human.
3. **The Steel Man Gate applies to FINAL selections only.** It does not apply to intermediate rankings within rounds.
4. **Time pressure does not exempt the Steel Man Gate.** If context is limited, the Steel Man Gate is the LAST thing cut — it is higher priority than additional generation rounds.

---

## 3. Forbidden Reasoning Patterns

These patterns are degradation signals. If detected, HALT and re-execute the analysis.

### Pattern 1: Name-Based Pattern Matching
**What it looks like:** "This is a root cause analysis, so the answer should focus on hidden causes" — reasoning from the skill name rather than the evidence.
**Fix:** Trace reasoning from actual premises, not from task labels.

### Pattern 2: First-Plausible-Explanation Acceptance
**What it looks like:** Finding one explanation that fits and stopping without testing alternatives.
**Fix:** The Counterexample Check forces consideration of at least one alternative. If no alternative was considered, the analysis is incomplete.

### Pattern 3: Confidence Through Chain Length
**What it looks like:** "After analyzing 7 dimensions across 3 layers with 13 scoring criteria, we can confidently conclude..." — using the length/complexity of the process as evidence of correctness.
**Fix:** Confidence assessment must cite evidence quality. Process length is irrelevant to conclusion validity.

### Pattern 4: Dismissal Without Justification
**What it looks like:** "The subtle differences between candidates A and B are not significant" — dismissing distinctions without explaining why they don't matter.
**Fix:** Every dismissed difference must include explicit justification for why it doesn't affect the conclusion. If justification cannot be provided, the difference IS significant.

### Pattern 5: Anchoring to First Output
**What it looks like:** Evaluating all subsequent candidates relative to the first one generated, rather than against criteria.
**Fix:** All candidates must be scored against the same criteria independently. Cross-candidate comparisons happen AFTER independent scoring.

### Detection Protocol

```yaml
reasoning_quality_check:
  premises_sourced: [Y/N]
  evidence_chain_traceable: [Y/N]
  counterexample_included: [Y/N]
  confidence_based_on_evidence: [Y/N]
  forbidden_patterns_detected: [list or NONE]

  IF any_no OR forbidden_patterns_detected != NONE:
    HALT — "Reasoning quality check failed. Re-execute analysis."
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Semi-Formal Reasoning Template, Steel Man Gate, 5 Forbidden Reasoning Patterns. Research basis: Agentic Code Reasoning (semi-formal templates + counterexample requirements). |
