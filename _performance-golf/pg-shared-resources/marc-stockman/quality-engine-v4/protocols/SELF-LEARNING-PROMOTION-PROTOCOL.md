# Self-Learning Promotion Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** Transform the learning log from a historical record into an active improvement engine — 10 issue classes, L1-L6 learning levels, pattern detection (2+ same-class = systemic), failure-to-fix-to-rule workflow
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

AI pipelines capture learnings during execution. But most systems don't PROMOTE those learnings into improved behavior. The system fixes what breaks (anti-degradation) but doesn't compound what works.

This protocol closes the loop: observation -> pattern -> tested fix -> promoted rule -> embedded in skill -> trained into system behavior.

---

## LEARNING CLASSIFICATION

Every learning receives one of two classifications:

### J1: Judgment-Free

Objective fix that can be tested and promoted without subjective review.

**Examples:**
- "Research stage needs to search specialized databases for health verticals" -> add to research spec
- "Mechanism scoring should weight visual metaphor higher for certain domains" -> adjust scoring weights
- "Input validators should check for context reservoir before loading the brief" -> implementation change

**Promotion path:** Can be tested directly against known input. KEEP if output quality maintained or improved. Human review optional.

### J2: Judgment-Required

Subjective pattern that needs human taste validation before promotion.

**Examples:**
- "Mechanism names with alliteration perform better" -> needs human evaluation
- "Story sections that open with a scene outperform those that open with a claim" -> needs taste check
- "Longer leads (800+ words) produce better story handoffs" -> needs quality comparison

**Promotion path:** Requires human A/B comparison. KEEP only if human confirms improvement. Human review mandatory.

---

## THE L1-L6 PROGRESSION

| Level | Name | Description | Example |
|-------|------|-------------|---------|
| **L1** | Observation | Raw observation from a single project execution | "The mechanism name felt forced in the narrative" |
| **L2** | Pattern | Observation confirmed across 2+ projects | "Mechanism names with 3+ syllables consistently feel forced in narrative" |
| **L3** | Tested Fix | A specific modification tested on known input | "Changed naming stage to prefer 1-2 syllable mechanism names" |
| **L4** | Promoted Rule | Fix confirmed to improve output, approved by human | "Mechanism naming: prefer 1-2 syllable names (tested, approved)" |
| **L5** | Embedded in Skill | Rule written into the skill's specification | Skill spec updated with naming constraint |
| **L6** | System Behavior | Rule observed in default system behavior across projects | System naturally produces shorter mechanism names without explicit reminder |

---

## THE PROMOTION LOOP

### Step 1: Identify a Learning to Promote

Review the learning log for learnings at L1 or L2 that have promotion potential.

**Selection criteria:**
- Observed in 2+ projects (L2) preferred over single observations (L1)
- Has a clear, testable hypothesis for improvement
- Targets a specific skill or stage (not a vague "system improvement")
- Classified as J1 or J2

### Step 2: Create a Learning Branch

```bash
git checkout -b learning/[learning-id]-[short-description]
# Example: git checkout -b learning/L42-shorter-mechanism-names
```

### Step 3: Modify the Target Skill

Edit the specific file:
- For execution changes: modify the stage specification
- For scoring changes: modify the competition scoring criteria
- For loading changes: modify the input validation section
- For constraint changes: modify the quality rules

### Step 4: Run the Skill on a Known Test Input

Use a previous project's upstream packages as test input. Run the modified skill.

**Compare:**
- Original output (from the previous project, already saved)
- Modified output (from this test run)

### Step 5: Evaluate

| Classification | Evaluator | Criteria |
|---------------|-----------|----------|
| **J1** | Human or automated comparison | Output quality maintained or improved. No regression. |
| **J2** | Human mandatory | Human confirms the change produces better output based on taste/judgment. |

### Step 6: Keep or Discard

| Result | Action |
|--------|--------|
| **KEEP** | Merge branch to main. Update learning level to L4 (or L5 if spec was modified). Log to results tracker. |
| **DISCARD** | Delete branch. Log to results tracker with reason. Learning stays at L2. |

### Step 7: Log Result

Append to `learning-log/promotion-results.tsv`:

```
learning_id	date	branch	target_file	change_description	result	reason	commit_hash
L42	2026-03-07	learning/L42-shorter-mechanism-names	skills/04-mechanism/naming-stage.md	Prefer 1-2 syllable mechanism names	KEEP	Names felt more natural in narrative testing	abc123
```

---

## ISSUE LOGGER — STRUCTURED INCIDENT CAPTURE

Before learnings can be promoted, they must be captured. The Issue Logger is the intake mechanism that feeds the promotion pipeline.

### 10 Issue Classes

| Class | Description | Typical Fix Location |
|-------|-------------|---------------------|
| **factual-error** | Incorrect credential, statistic, date, name, or claim | Fact-change propagation + source data |
| **voice-drift** | Output voice doesn't match the established register | Voice/soul file, specimen loading |
| **structural-regression** | Section structure degraded from prior version | Quality rules, skill specification |
| **missing-input** | Required upstream package absent or incomplete | Input validation, handoff registry |
| **scope-creep** | Output expanded beyond requested scope | Skill specification, phase-stop discipline |
| **specification-gap** | Skill spec doesn't cover an encountered situation | Skill specification update |
| **context-loss** | Model lost track of established decision mid-pipeline | Recitation protocol, constraint ledger |
| **hallucination** | Fabricated data, names, statistics, or claims | Claim verification gates, forbidden patterns |
| **threading-failure** | Key terms/phrases not carried through downstream | Threading audit, assembly verification |
| **other** | Doesn't fit existing classes (may indicate new class needed) | Case-by-case analysis |

### When to Log

Log an issue whenever:
- A skill produces output rated below threshold
- A skill requires extensive human edits (20+)
- A system error occurs (wrong file loaded, broken reference, missing upstream)
- A quality failure is caught by audit, competition, or human review
- The same mistake type appears to have occurred before

### Issue Entry Format

```markdown
### ISSUE-[YYYY-MM-DD]-[sequential-number]

- **Date:** [ISO 8601]
- **Class:** [one of the 10 classes above]
- **Skill:** [skill/stage ID where issue occurred]
- **Project:** [project-code]
- **Severity:** [critical | moderate | minor]
- **Description:** [What went wrong — be specific]
- **Root cause:** [Why it went wrong — best assessment]
- **Pattern match:** [Does this match any previous issue? If yes, cite ISSUE-ID]
- **Proposed prevention:** [What rule or change would prevent recurrence]
- **Learned:** [Yes / No]
- **Memorialized:** [Yes / No — if yes, cite location]
- **Activated:** [Yes / No — if yes, cite enforcement mechanism]
```

### Automatic Pattern Detection

When logging a new issue, scan the issue log for pattern matches:

**Pattern signal:** Same `Class` appears 2+ times within the last 10 issues.

When a pattern signal fires:
1. Print: `PATTERN DETECTED: [class] has occurred [N] times in recent issues. See [ISSUE-IDs].`
2. Draft a proposed rule in the format: "Before [action], always [check] to prevent [class]."
3. Add the proposed rule to the issue entry under `Proposed prevention:`
4. Flag the learning for promotion (advance to L2 in the learning log)

---

## FAILURE-TO-FIX-TO-RULE WORKFLOW

Integrated from concrete operational practice, this workflow ensures every failure gets a structural fix — not just a correction.

### When a Mistake Occurs

1. **Identify** the error category (fabrication, drift, generic language, skipped gate, etc.)
2. **Record** the entry using the structured format:

```yaml
entry_id: "LEARN-YYYY-MM-DD-[seq]"
date: YYYY-MM-DD
session: NNN
category: "fabrication | drift | generic_language | skipped_gate | quality_miss | constraint_violation"
what_happened: |
  [What went wrong — specific, not vague]
root_cause: |
  [Why it happened — the structural gap that allowed it]
structural_fix: |
  [What was changed to prevent recurrence — file, section, specific edit]
prevention: |
  [How this fix prevents the error structurally, not just by instruction]
```

3. **Apply** the structural fix (update specification, add to forbidden patterns, etc.)
4. **Verify** the fix would have prevented the original error
5. **Update** common mistakes documentation if the pattern is recurring

### Example

```yaml
entry_id: "LEARN-2026-02-08-001"
date: 2026-02-08
session: 009
category: "fabrication"
what_happened: |
  During planning, the system referred to a product name that does not exist.
  The name was fabricated — it appears nowhere in project files.
root_cause: |
  No structural check on product names. The system generated a plausible-sounding
  name without verifying against source data.
structural_fix: |
  Added to claim verification check: "Product names not in verified source data
  trigger HALT at verification gate."
prevention: |
  Claim verification now treats product names as mandatory-verify. Any product
  reference not traceable to source data triggers HALT.
```

---

## CLASS-C ESCALATION PIPELINE

When the Issue Logger detects pattern signals, the escalation pipeline determines the response intensity:

| Occurrences | Signal Level | Action |
|-------------|-------------|--------|
| **2x** same class in last 10 issues | Pattern Signal | Flag for attention. Draft proposed rule. Advance to L2. |
| **3x** same class in last 10 issues | Hook Development | Propose a new validator or enhancement to an existing validator. The pattern has proven persistent enough to warrant structural enforcement. |
| **5x** same class in last 10 issues | Mandatory Engineering Review | Human MUST review. This class is systemic. All affected outputs and proposed validators are presented for architectural decision. |

### Escalation Response Format

When an escalation triggers at the 3x level:

```markdown
### ESCALATION: [class] — Structural Enforcement Recommended

**Pattern:** [class] has occurred [N] times in recent issues.
**Affected issues:** [ISSUE-IDs]
**Proposed enforcement:**
- **Type:** [new validator | enhancement to existing validator]
- **Detection logic:** [what the enforcement would check for]
- **Trigger condition:** [when it would fire]
- **Expected prevention rate:** [estimate based on pattern analysis]

**Status:** AWAITING HUMAN APPROVAL — do not implement without explicit authorization.
```

---

## BOUNDED TRIAL VALIDATION

When a proposed rule reaches L3 (Tested Fix), validate with a bounded trial:

1. **Test on 3 recent examples** — not just 1. Apply the proposed fix to 3 different past inputs where the issue class occurred.
2. **Evaluate all 3:**
   - J1 (judgment-free): Did output quality maintain or improve in all 3 cases?
   - J2 (judgment-required): Does human confirm improvement in all 3 cases?
3. **Promote only if 3/3 pass.** If 2/3, the rule needs refinement. If 1/3 or 0/3, discard.

This is stricter than a single-example test and prevents confirmation bias.

---

## LEARNING LEDGER TAXONOMY

Every issue tracks three lifecycle columns beyond the base entry:

| Column | Question It Answers | Values |
|--------|-------------------|--------|
| **Learned** | Was the issue observed and understood? | Yes / No |
| **Memorialized** | Was a rule, protocol addition, or quality rule entry written? | Yes (cite location) / No |
| **Activated** | Was the rule built into structural enforcement (validator, gate)? | Yes (cite mechanism) / No |

### Lifecycle Example

```
Issue: voice-drift in mechanism narrative — 3 occurrences

Learned:      Yes — identified as failure to re-read voice file before generation
Memorialized: Yes — added to quality rules for mechanism narrative stage
Activated:    Yes — validator fires on synthesis-from-memory detection
```

Issues where Learned=Yes but Memorialized=No are knowledge gaps. Issues where Memorialized=Yes but Activated=No are enforcement gaps. The ledger makes both visible.

---

## RESULTS TRACKING

### promotion-results.tsv

Central results log. Tab-separated values:

| Column | Description |
|--------|-------------|
| `learning_id` | Learning log ID (e.g., L42) |
| `date` | Date of test |
| `branch` | Git branch name |
| `target_file` | File modified |
| `change_description` | What was changed |
| `result` | KEEP or DISCARD |
| `reason` | Why kept or discarded |
| `commit_hash` | Merge commit hash (if KEEP) |

---

## WHAT IS PARKED

### Automated Scoring Metrics

The promotion loop currently relies on human evaluation. Automated scoring metrics are PARKED because many quality dimensions have sweet spots that are hard to quantify objectively:
- **Diversity** has a sweet spot (repeating patterns within diversity, not pure randomness)
- **Threading count** — higher just trains repetition
- **Keyword density** — sweet spot exists but is hard to quantify
- **Specificity** — too specific = too heavy, too general = too light

Until scoring is solved, the loop runs with human evaluation. This is slower but accurate.

**When to revisit:** After 3+ projects through the upgraded system, generating enough data to calibrate metrics against actual human quality assessments.
