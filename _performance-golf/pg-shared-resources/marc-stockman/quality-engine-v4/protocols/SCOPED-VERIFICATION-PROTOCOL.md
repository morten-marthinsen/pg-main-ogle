# Scoped Verification Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** Fresh-context, meaning-level quality checks at critical pipeline handoff points — 4+ verification points with binary questions, evidence requirements, and convergence loops
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

Programmatic validators (Layer 1) catch quantifiable failures: missing files, forbidden statuses, schema violations, threshold clustering. But structural gates verify **existence and quantity**, not **quality**.

The failure mode that remains: output technically passes all numeric gates but the content doesn't serve the project. A key term is present but forced. The voice drifted from the established register. Strategic candidates are grounded in synthesis, not actual source data.

**A fresh context cannot inherit the generating session's degraded patterns.** This is the core value of scoped verification.

---

## THREE-LAYER VERIFICATION MODEL

| Layer | Mechanism | What It Checks | LLM Required? |
|-------|-----------|----------------|---------------|
| **1** | Programmatic validators (hooks) | Quantifiable gates — counts, sizes, field presence, schema, forbidden statuses | No |
| **2** | Scoped verification step (THIS PROTOCOL) | Quality criteria — voice match, differentiation, upstream tracing, semantic alignment | Yes (lightweight, fresh context) |
| **3** | The Competition (Arena) | Creative quality — persuasion, specificity, voice, competitive distance | Yes (already built) |

---

## SCOPED VERIFICATION DESIGN

Each verification step is a **scoped subagent call** that loads ONLY:

1. The **3-5 specific quality criteria** for this handoff (not the whole system)
2. The **output to verify** (the file just produced)
3. The **relevant upstream input** it should reference (key terms, strategy anchors, voice register)
4. **Total context: 15-20KB** — not the full pipeline context

The subagent answers **binary questions with evidence:**

```
"Does this output reference the mechanism naturally, or does it feel forced?" -> Y/N + quote
"Does the voice match the established register?" -> Y/N + specific violations
"Are the strategic candidates grounded in actual research, or synthesized?" -> Y/N + trace
```

---

## VERIFICATION POINTS

Not every handoff gets Layer 2 verification — only the ones where errors compound.

| # | Verification Point | Between | Why Critical | Questions |
|---|-------------------|---------|-------------|-----------|
| **VP-1** | Foundation Boundary | Foundation stages -> Generation stages | Everything downstream builds on foundation decisions | Do all strategic anchors carry through? Are key terms exact? Is voice register established? |
| **VP-2** | Midpoint Integrity | After first half of generation, before second half | Foundation decisions are translating to prose — catch drift before it compounds | Are strategic anchors still present in generated output? Has voice drifted? Are proof elements grounded? |
| **VP-3** | Output Handoff (per-stage) | Between sequential generation stages | Cascading output — degradation compounds through layers | Voice consistency with previous stage? Argument flow at boundary? Key terms preserved? |
| **VP-4** | Pre-Assembly | Before final assembly stage | Last chance to catch problems before final draft | Voice consistency across all sections, argument coherence, proof integration |
| **VP-5** | Editorial Isolation | Final editorial stage | Must run in fresh context to avoid inheriting generation-session patterns | Full quality check in isolated context |

---

## TIER-BASED DEPTH

| Verification Point | Full Tier | Standard Tier | Quick Tier |
|-------------------|-----------|---------------|-----------|
| VP-1: Foundation Boundary | YES | YES | NO |
| VP-2: Midpoint Integrity | YES | YES | NO |
| VP-3: Output Handoff (each) | YES (all) | Midpoint only | NO |
| VP-4: Pre-Assembly | YES | NO | NO |
| VP-5: Editorial Isolation | YES | YES (recommended) | NO |

**Key rule:** Quick tier relies on Layer 1 (programmatic validators) only. Layer 2 verification is skipped entirely.

---

## VERIFICATION STEP FORMAT

### Subagent Prompt Template

```markdown
# Scoped Verification — [Verification Point Name]

## Your Role
You are a quality verifier in a fresh context. You have NOT seen the generation
process. You are checking the output against specific criteria.

## Input Files (loaded)
- Output to verify: [file path]
- Upstream reference: [file path(s)]
- Voice reference: [voice/tone file]

## Questions (answer each Y/N with evidence)

1. [Binary question specific to this verification point]
   -> Y/N
   -> Evidence: [quote from output or specific observation]

2. [Binary question]
   -> Y/N
   -> Evidence: [quote or observation]

3. [Binary question]
   -> Y/N
   -> Evidence: [quote or observation]

## Result
- PASS: All questions answered Y (or all criteria met)
- FLAG: One or more N answers — document which and why
```

### Result File Format

```yaml
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
    materiality: [1-4]  # See Material Change Taxonomy
    description: "[what specifically failed]"
    recommendation: "[what to do about it]"
```

---

## RESULT HANDLING

| Result | What Happens |
|--------|-------------|
| **PASS** | Proceed to next stage. Verification file saved for audit trail. |
| **FLAG (minor)** | Note in execution log. Proceed but monitor in next verification. |
| **FLAG (major)** | Surface to human operator. Human decides: proceed, fix, or re-run. |
| **FLAG (critical)** | Surface to human operator. Recommend re-running the flagged stage. |

**FLAGS surface to human — they don't auto-HALT.** The human decides whether to proceed or fix.

---

## MATERIAL CHANGE TAXONOMY

When a verification pass flags an issue, classify it using this 4-category taxonomy before deciding whether to fix it. This prevents two failure modes: (1) wasting convergence loops on cosmetic changes, and (2) dismissing wording changes that DO affect meaning.

| Category | Definition | Always Material? | Examples |
|----------|-----------|-----------------|----------|
| **1. Factual Error** | A claim, credential, spec, name, date, or statistic that is incorrect or contradicts a locked decision | **YES — always material** | Wrong credential, stale guarantee terms, incorrect feature name, fabricated statistic |
| **2. Structural / Logical Flaw** | An argument, sequence, or dependency that is broken | **YES — always material** | Claim without proof, benefit before mechanism, close that re-explains instead of landing |
| **3. Meaning-Affecting Wording** | A word or phrase that changes what the audience understands or decides | **MATERIAL — apply the test** | "may help improve" vs. "improves", passive voice hiding the actor, hedge on a proven claim |
| **4. Cosmetic** | Formatting, punctuation, synonym substitution that doesn't change meaning | **NEVER material** | Oxford comma preference, heading capitalization, paragraph break placement |

### The Materiality Test

For Category 3 (the judgment call):

> **"Would the target audience's understanding or decision change if this were left unfixed?"**

- If YES: material. Fix it in this convergence pass.
- If NO: cosmetic. Log it but don't spend a convergence loop on it.

---

## VALIDATION CONVERGENCE LOOP

Validation repeats until a pass finds zero new issues, with a hard cap of 3 iterations.

### Protocol

```
Pass 1: Run full validation per scoped verification rules
  -> If ZERO issues found: PASS. Proceed to next stage.
  -> If issues found: Fix all issues. Run Pass 2.

Pass 2: Re-run full validation on the fixed output
  -> If ZERO issues found: PASS. Proceed to next stage.
  -> If NEW issues found: Fix all issues. Run Pass 3.
  -> If SAME issues persist: Escalate to human.

Pass 3 (FINAL): Re-run full validation on the fixed output
  -> If ZERO issues found: PASS. Proceed to next stage.
  -> If STILL producing issues: ESCALATE TO HUMAN.
    Do NOT attempt a 4th pass. Three iterations is the maximum.
    Present: all issues found across 3 passes, all fixes attempted,
    and which issues persist.
```

### Convergence Criteria

A pass "converges" when it finds zero issues that weren't already found and addressed in a previous pass. New issues found in Pass 2 that weren't in Pass 1 are genuine cascading problems — not validation noise.

---

## POST-ASSEMBLY CONVERGENCE LOOP

A 4-pass verification step that runs between assembly and editorial. Assembly is the first time all output sections exist in a single file — making it the earliest point where cross-section consistency can be verified holistically.

### The 4 Passes

```
Pass 1 — VERIFY (Fact + Constraint Check):
  Load: assembled output + fact-changes.yaml + constraint-ledger.yaml
  Check:
    - Every fact matches its canonical source
    - No superseded values from fact-changes.yaml appear
    - All active Constraint Ledger entries are honored
    - Materiality classification on each finding (Category 1-4)

Pass 2 — ATTACK (Adversarial Consistency Check):
  Load: assembled output + voice/tone reference
  Check:
    - Cross-section contradictions
    - Voice register consistency across sections
    - Proof point repetition (same evidence used in 3+ sections?)
    - Argument flow at section boundaries

Pass 3 — PRE-MORTEM (Failure Anticipation):
  Load: assembled output + target audience profile
  Questions:
    - "What would a skeptical reader challenge in this?"
    - "Where would a reader lose interest or get confused?"
    - "What claim feels unsupported or forced?"

Pass 4 — REVISE (Final Polish):
  Load: assembled output + all Pass 1-3 findings
  Actions:
    - Apply all remaining fixes from Passes 1-3
    - Verify fixes didn't introduce new issues
    - Confirm materiality: only Category 1-3 fixes applied
  -> Output: verified assembled output ready for editorial
```

### Convergence Rules

- **Max 2 re-runs per pass.** If Pass 1 fails twice, escalate to human.
- **Only Category 1-3 issues block progression.** Category 4 (cosmetic) is logged but doesn't trigger re-runs.
- **Pass 3 (Pre-Mortem) does not loop.** It's a one-shot anticipation check. Findings feed into Pass 4.
- **Total maximum: 10 passes** (with all retries). If 10 passes don't converge, escalate to human.

### Tier Applicability

| Tier | Post-Assembly Loop |
|------|-------------------|
| **Full** | All 4 passes mandatory |
| **Standard** | Pass 1 (Verify) + Pass 2 (Attack) only |
| **Quick** | Skip entirely — relies on editorial to catch issues |

---

## CONSTRAINTS

1. **Narrow scope:** 3-5 questions per verification point. Not a general quality review.
2. **Small context:** 15-20KB total. Only the criteria, the output, and the upstream reference.
3. **Binary decisions:** PASS/FLAG on specific criteria. Not subjective quality scoring.
4. **One level deep:** No verification of the verification. No QC-of-the-QC.
5. **Fast:** 30-60 seconds per check. A quick focused assessment.
6. **Fresh context:** The verifier has NOT seen the generation conversation. This is the entire point.
7. **Evidence required:** Every Y/N answer must cite specific text from the output.

---

## COST CONSIDERATION

Each verification call is a separate API call at 15-20KB context. For a Full-tier project with all verification points:
- Approximately 10 calls across the full pipeline
- Each call starts fresh — well within standard pricing per call
- Cost is marginal per call but adds up; this is why Quick tier skips Layer 2 entirely
