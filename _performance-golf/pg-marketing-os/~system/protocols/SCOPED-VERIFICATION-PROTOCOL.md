# Scoped Verification Protocol — Layer 2 Verification Architecture

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Define the Layer 2 verification pattern — fresh-context, meaning-level checks at critical pipeline handoff points
**Authority:** EQUAL to ~system/SYSTEM-CORE.md
**Sources:** Verification Architecture analysis, Agents of Chaos (arXiv:2602.20021), Manus "Context Engineering for AI Agents"

---

## TABLE OF CONTENTS

- [Why Layer 2 Exists](#why-layer-2-exists)
- [Three-Layer Verification Model](#three-layer-verification-model)
- [Scoped Verification Design](#scoped-verification-design)
- [Verification Points](#verification-points)
- [Tier-Based Depth](#tier-based-depth)
- [Verification Step Format](#verification-step-format)
- [Result Handling](#result-handling)
- [Constraints](#constraints)

---

## Why Layer 2 Exists

Layer 1 (programmatic hooks in `.claude/hooks/`) catches quantifiable failures: missing files, forbidden statuses, schema violations, threshold clustering. But structural gates verify **existence and quantity**, not **quality**.

The failure mode that remains: output technically passes all numeric gates but the content doesn't serve the campaign. The mechanism name is present but forced. The voice drifted from Soul.md. The FSSIT candidates are grounded in synthesis, not actual quotes.

**A fresh context cannot inherit the generating session's degraded patterns.** This is the core value of Layer 2.

---

## Three-Layer Verification Model

| Layer | Mechanism | What It Checks | LLM Required? |
|-------|-----------|----------------|---------------|
| **1** | Programmatic hooks (`.claude/hooks/`) | Quantifiable gates — counts, sizes, field presence, schema, forbidden statuses | No |
| **2** | Scoped verification step (THIS PROTOCOL) | Quality criteria — voice match, differentiation, upstream tracing, semantic alignment | Yes (lightweight, fresh context) |
| **3** | The Arena (existing) | Creative quality — persuasion, specificity, voice, competitive distance | Yes (already built) |

---

## Scoped Verification Design

Each verification step is a **scoped subagent call** that loads ONLY:

1. The **3-5 specific quality criteria** for this handoff (not the whole system)
2. The **output to verify** (the file just produced)
3. The **relevant upstream input** it should reference (mechanism name, root cause, Soul.md voice register)
4. **Total context: 15-20KB** — not 120KB

The subagent answers **binary questions with evidence:**

```
"Does this output reference the mechanism from the upstream package naturally, or does it feel forced?" → Y/N + quote
"Does the voice match Soul.md?" → Y/N + specific violations
"Are the FSSIT candidates grounded in actual research quotes, or synthesized?" → Y/N + trace
```

---

## Verification Points

Not every handoff gets Layer 2 verification — only the ones where errors compound.

| # | Verification Point | Between | Why Critical | Questions |
|---|-------------------|---------|-------------|-----------|
| **VP-1** | Foundation Boundary | Session 3 → Session 4 (Skill 09 → Skill 10) | Everything downstream builds on Foundation decisions | See FOUNDATION-INTEGRITY-CHECK.md |
| **VP-2** | Midpoint Integrity | After Skills 11-13, before Skill 14 | Foundation decisions are translating to prose — catch drift before second half | See FOUNDATION-INTEGRITY-CHECK.md |
| **VP-3** | Prose Handoff (per-skill) | Skills 11→12, 12→13, 13→14, 14→15, 15→16, 16→17 | Cascading prose — degradation compounds through 7 layers | See PROSE-QUALITY-VERIFICATION.md |
| **VP-4** | Pre-Assembly | Before Skill 19 | Last chance to catch problems before final draft | Voice consistency, argument coherence, proof integration |
| **VP-5** | Editorial Isolation | Skill 20 | Must run in fresh context per Agents of Chaos findings | See ~system/SESSION-ARCHITECTURE.md editorial isolation guidance |

---

## Tier-Based Depth

Verification depth adjusts based on the declared effort tier (see `TASK-TRIAGE-PROTOCOL.md`).

| Verification Point | Full Tier | Standard Tier | Quick Tier |
|-------------------|-----------|---------------|-----------|
| VP-1: Foundation Boundary | YES | YES | NO |
| VP-2: Midpoint Integrity | YES | YES | NO |
| VP-3: Prose Handoff (each) | YES (all 6) | Midpoint only (after Skill 13) | NO |
| VP-4: Pre-Assembly | YES | NO | NO |
| VP-5: Editorial Isolation | YES | YES (recommended) | NO |

**Key rule:** Quick tier relies on Layer 1 (programmatic hooks) only. Layer 2 verification is skipped entirely.

---

## Verification Step Format

### Subagent Prompt Template

```markdown
# Scoped Verification — [Verification Point Name]

## Your Role
You are a quality verifier in a fresh context. You have NOT seen the generation process. You are checking the output against specific criteria.

## Input Files (loaded)
- Output to verify: [file path]
- Upstream reference: [file path(s)]
- Voice reference: [Soul.md or relevant voice file]

## Questions (answer each Y/N with evidence)

1. [Binary question specific to this verification point]
   → Y/N
   → Evidence: [quote from output or specific observation]

2. [Binary question]
   → Y/N
   → Evidence: [quote or observation]

3. [Binary question]
   → Y/N
   → Evidence: [quote or observation]

## Result
- PASS: All questions answered Y (or all criteria met)
- FLAG: One or more N answers — document which and why
```

### Result File Format

```yaml
# verification-[point]-[timestamp].yaml
verification_point: "[VP-1 through VP-5]"
tier: "[Full|Standard|Quick]"
timestamp: "[ISO 8601]"
context_loaded_kb: [number]

questions:
  - id: 1
    question: "[text]"
    result: "[Y|N]"
    evidence: "[quote or observation]"
  - id: 2
    question: "[text]"
    result: "[Y|N]"
    evidence: "[quote or observation]"

overall_result: "[PASS|FLAG]"
flags:
  - question_id: [number]
    severity: "[minor|major|critical]"
    description: "[what specifically failed]"
    recommendation: "[what to do about it]"
```

---

## Result Handling

| Result | What Happens |
|--------|-------------|
| **PASS** | Proceed to next skill. Verification file saved for audit trail. |
| **FLAG (minor)** | Note in execution log. Proceed but monitor in next verification. |
| **FLAG (major)** | Surface to human operator. Human decides: proceed, fix, or re-run. |
| **FLAG (critical)** | Surface to human operator. Recommend re-running the flagged skill before proceeding. |

**FLAGS surface to human — they don't auto-HALT.** The human decides whether to proceed or fix. This preserves the human gate principle that makes the context reservoir effective.

---

## Constraints

1. **Narrow scope:** 3-5 questions per verification point. Not a general quality review.
2. **Small context:** 15-20KB total. Only the criteria, the output, and the upstream reference.
3. **Binary decisions:** PASS/FLAG on specific criteria. Not subjective quality scoring.
4. **One level deep:** No verification of the verification. No QC-of-the-QC.
5. **Fast:** 30-60 seconds per check. This is a quick focused assessment.
6. **Fresh context:** The verifier has NOT seen the generation conversation. This is the entire point.
7. **Evidence required:** Every Y/N answer must cite specific text from the output.

---

## Cost Consideration

Each verification call is a separate API call at 15-20KB context. For a Full-tier campaign with all verification points:
- ~6 prose handoff checks + 2 integrity checks + 1 pre-assembly + 1 editorial = ~10 calls
- ~150-200KB total additional token spend across the full campaign
- Each call starts fresh — well within standard pricing per call
- Cost is marginal per call but adds up; this is why Quick tier skips Layer 2 entirely

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — Layer 2 verification architecture with 5 verification points, tier-based depth, binary question format |
