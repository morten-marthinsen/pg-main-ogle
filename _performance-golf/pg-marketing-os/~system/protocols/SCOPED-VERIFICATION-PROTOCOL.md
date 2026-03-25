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

Layer 1 (programmatic hooks in `.hooks/`) catches quantifiable failures: missing files, forbidden statuses, schema violations, threshold clustering. But structural gates verify **existence and quantity**, not **quality**.

The failure mode that remains: output technically passes all numeric gates but the content doesn't serve the campaign. The mechanism name is present but forced. The voice drifted from Soul.md. The FSSIT candidates are grounded in synthesis, not actual quotes.

**A fresh context cannot inherit the generating session's degraded patterns.** This is the core value of Layer 2.

---

## Three-Layer Verification Model

| Layer | Mechanism | What It Checks | LLM Required? |
|-------|-----------|----------------|---------------|
| **1** | Programmatic hooks (`.hooks/`) | Quantifiable gates — counts, sizes, field presence, schema, forbidden statuses | No |
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

## Material Change Taxonomy

**Added in v1.2.** When a verification pass flags an issue, the verifier must classify it using this 4-category taxonomy before the operator decides whether to fix it. This prevents two failure modes: (1) wasting convergence loops on cosmetic changes that don't affect meaning, and (2) dismissing wording changes that DO affect meaning.

### Categories

| Category | Definition | Always Material? | Examples |
|----------|-----------|-----------------|----------|
| **1. Factual Error** | A claim, credential, spec, name, date, statistic, or guarantee that is incorrect, outdated, or contradicts a locked decision | **YES — always material** | Wrong credential years, stale guarantee terms, incorrect feature name, fabricated statistic |
| **2. Structural / Logical Flaw** | An argument, sequence, or dependency that is broken — missing proof for a claim, circular reasoning, cause-effect reversal, missing step in a process | **YES — always material** | Claim without proof, benefit stated before mechanism is explained, close that re-explains instead of landing emotion |
| **3. Meaning-Affecting Wording** | A word or phrase choice that changes what the audience understands or decides — register mismatch, softened language that weakens a claim, added qualifier that introduces doubt | **MATERIAL — apply the test** | "may help improve" vs. "improves", passive voice hiding the actor, hedge words on a proven claim |
| **4. Cosmetic** | Formatting, punctuation, whitespace, synonym substitution that doesn't change meaning, style preferences not tied to voice governance | **NEVER material** | Oxford comma preference, heading capitalization, paragraph break placement, "golf ball" vs. "ball" in context where meaning is clear |

### The Materiality Test

For Category 3 (the judgment call):

> **"Would the target audience's understanding or decision change if this were left unfixed?"**

- If YES → material. Fix it in this convergence pass.
- If NO → cosmetic. Log it but don't spend a convergence loop on it.

### How This Integrates

1. **During verification passes:** Every FLAG must include a materiality classification (1-4). The operator uses this to prioritize fixes.
2. **During convergence loops:** Only Category 1, 2, and material Category 3 issues count toward convergence. A pass that finds only Category 4 issues is a PASS.
3. **In the Constraint Ledger:** Fact changes (Category 1) trigger the Fact Change Propagation Protocol. Structural changes (Category 2) may require re-running the generating skill.
4. **In result files:** Add `materiality: [1-4]` to each flag entry in the verification YAML.

### Updated Flag Format

```yaml
flags:
  - question_id: 2
    severity: "major"
    materiality: 1  # factual error
    description: "McGinley credential listed as '25+ years' — canonical value is '30+ years'"
    recommendation: "Update to canonical value per fact-changes.yaml FC-001"
```

---

## Cost Consideration

Each verification call is a separate API call at 15-20KB context. For a Full-tier campaign with all verification points:
- ~6 prose handoff checks + 2 integrity checks + 1 pre-assembly + 1 editorial = ~10 calls
- ~150-200KB total additional token spend across the full campaign
- Each call starts fresh — well within standard pricing per call
- Cost is marginal per call but adds up; this is why Quick tier skips Layer 2 entirely

---

## Validation Convergence Loop

Layer 3 validation repeats until a pass finds zero new issues, with a hard cap of 3 iterations.

### Why This Exists

Single-pass validation catches obvious issues but misses cascading problems — fixing one issue may introduce or reveal another. Without iteration, validation gives a false sense of completeness.

### Protocol

```
Layer 3 Validation — Convergence Loop:

  Pass 1: Run full validation per SCOPED-VERIFICATION-PROTOCOL rules
    → If ZERO issues found: PASS. Proceed to Layer 4.
    → If issues found: Fix all issues. Run Pass 2.

  Pass 2: Re-run full validation on the fixed output
    → If ZERO issues found: PASS. Proceed to Layer 4.
    → If NEW issues found: Fix all issues. Run Pass 3.
    → If SAME issues persist: Escalate to human.

  Pass 3 (FINAL): Re-run full validation on the fixed output
    → If ZERO issues found: PASS. Proceed to Layer 4.
    → If STILL producing issues: ESCALATE TO HUMAN.
      Do NOT attempt a 4th pass. Three iterations is the maximum.
      Present: all issues found across 3 passes, all fixes attempted,
      and which issues persist.
```

### Convergence Criteria

A pass "converges" when it finds zero issues that weren't already found and addressed in a previous pass. New issues found in Pass 2 that weren't in Pass 1 are genuine cascading problems — not validation noise.

### Escalation Format

When 3 passes fail to converge:

```markdown
## Validation Convergence Failure — Escalation

**Skill:** [skill ID]
**Passes completed:** 3
**Issues per pass:**
- Pass 1: [N] issues ([list])
- Pass 2: [N] issues ([list — note which are new vs. recurring])
- Pass 3: [N] issues ([list — note which are new vs. recurring])

**Persistent issues:** [issues that appeared in 2+ passes despite fixes]
**Assessment:** [why these issues resist automated fixing]

**Recommendation:** [human review of the persistent issues]
```

---

## Post-Assembly Convergence Loop

**Added in v1.2.** A 4-pass verification step that runs between LP-15 PDP Assembly and PDP-17 (Editorial). Assembly is the first time all copy sections exist in a single file — making it the earliest point where cross-section consistency, argument flow, and fact propagation can be verified holistically.

### Why This Exists

Individual section copy (PDP-07) is verified in isolation. Assembly (LP-15 PDP path) concatenates sections into a complete page. But concatenation introduces failure modes that per-section verification cannot catch: contradictory claims across sections, inconsistent voice register, repeated proof points, stale facts that propagated from upstream packages, and argument flow breaks at section boundaries.

Without a post-assembly check, these issues reach Editorial (PDP-17), where the Arena competitors inherit them and the editorial pass tries to fix structural problems with surface-level polish.

### The 4 Passes

```
Post-Assembly Convergence Loop (between LP-15 PDP Assembly and PDP-17 Editorial):

  Pass 1 — VERIFY (Fact + Constraint Check):
    Load: assembled page + fact-changes.yaml + constraint-ledger.yaml
    Check:
      - Every fact in the assembled page matches its canonical source
      - No superseded values from fact-changes.yaml appear
      - All Constraint Ledger entries with status "active" are honored
      - Materiality classification on each finding (Category 1-4)
    → If ZERO Category 1-3 issues: proceed to Pass 2
    → If issues found: fix, then re-run Pass 1 (max 2 attempts)

  Pass 2 — ATTACK (Adversarial Consistency Check):
    Load: assembled page + Soul.md
    Check:
      - Cross-section contradictions (does Section 5 claim something Section 3 disproves?)
      - Voice register consistency (does the tone shift between sections?)
      - Proof point repetition (is the same statistic or credential used in 3+ sections?)
      - Argument flow at section boundaries (does each section's close set up the next section's open?)
    → If ZERO material issues: proceed to Pass 3
    → If issues found: fix, then re-run Pass 2 (max 2 attempts)

  Pass 3 — PRE-MORTEM (Failure Anticipation):
    Load: assembled page + target audience profile
    Questions:
      - "What would a skeptical reader challenge in this page?"
      - "Where would a reader lose interest or get confused?"
      - "What claim feels unsupported or forced?"
    → If ZERO material issues: proceed to Pass 4
    → If issues found: fix, then proceed to Pass 4

  Pass 4 — REVISE (Final Polish):
    Load: assembled page + all Pass 1-3 findings
    Actions:
      - Apply all remaining fixes from Passes 1-3
      - Verify fixes didn't introduce new issues
      - Confirm materiality: only Category 1-3 fixes applied
    → Output: verified assembled page ready for PDP-17 Editorial
```

### Convergence Rules

- **Max 2 re-runs per pass.** If Pass 1 fails twice, escalate to human.
- **Only Category 1-3 issues block progression.** Category 4 (cosmetic) is logged but doesn't trigger re-runs.
- **Pass 3 (Pre-Mortem) does not loop.** It's a one-shot anticipation check. Findings feed into Pass 4.
- **Total maximum: 10 passes** (2 attempts × Pass 1 + 2 attempts × Pass 2 + 1 × Pass 3 + 1 × Pass 4 = 6 nominal, 10 with all retries). If 10 passes don't converge, escalate to human.

### Tier Applicability

| Tier | Post-Assembly Loop |
|------|-------------------|
| **Full** | All 4 passes mandatory |
| **Standard** | Pass 1 (Verify) + Pass 2 (Attack) only |
| **Quick** | Skip entirely — relies on PDP-17 editorial to catch issues |

### Dependencies

- **Requires Material Change Taxonomy** (this protocol, v1.2) for issue classification
- **Requires Fact Change Propagation Protocol** for Pass 1 fact verification
- **Requires Constraint Ledger** for Pass 1 constraint checking

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — Layer 2 verification architecture with 5 verification points, tier-based depth, binary question format |
| 1.1 | 2026-03-12 | Added Validation Convergence Loop — iterative Layer 3 validation with 3-pass maximum and human escalation |
| 1.2 | 2026-03-15 | Added Material Change Taxonomy (4-category classification with materiality test) and Post-Assembly Convergence Loop (4-pass Verify → Attack → Pre-Mortem → Revise between LP-15 PDP Assembly and PDP-17 Editorial) |
