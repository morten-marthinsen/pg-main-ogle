# Self-Learning Promotion Protocol — From Observation to System Improvement

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Transform the learning log from a historical record into an active improvement engine. Promote successful patterns into upgraded skill behavior.
**Sources:** Marc Stockman Quality Engine gap analysis, Karpathy autoresearch pattern

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [Learning Classification](#learning-classification)
- [The L1-L6 Progression](#the-l1-l6-progression)
- [The Promotion Loop](#the-promotion-loop)
- [Git Branch Workflow](#git-branch-workflow)
- [Results Tracking](#results-tracking)
- [What Is PARKED](#what-is-parked)

---

## Why This Exists

Marketing-OS captures 70+ learnings in the learning log. But the system doesn't PROMOTE them into skill behavior. The system fixes what breaks (anti-degradation) but doesn't compound what works.

This protocol closes the loop: observation → pattern → tested fix → promoted rule → embedded in skill → trained into system behavior.

---

## Learning Classification

Every learning receives one of two classifications:

### J1: Judgment-Free

Objective fix that can be tested and promoted without subjective review.

**Examples:**
- "Research skill needs to search PubMed for health verticals" → add to research skill spec
- "Mechanism scoring should weight visual_metaphor higher for golf" → adjust scoring weights
- "Upstream loaders should check for context reservoir before loading campaign brief" → code change

**Promotion path:** Can be tested directly against known input. KEEP if output quality maintained or improved. Human review optional.

### J2: Judgment-Required

Subjective pattern that needs human taste validation before promotion.

**Examples:**
- "Mechanism names with alliteration perform better" → needs human evaluation
- "Story sections that open with a scene outperform those that open with a claim" → needs taste check
- "Longer leads (800+ words) produce better story handoffs" → needs quality comparison

**Promotion path:** Requires human A/B comparison. KEEP only if human confirms improvement. Human review mandatory.

---

## The L1-L6 Progression

| Level | Name | Description | Example |
|-------|------|-------------|---------|
| **L1** | Observation | Raw observation from a campaign execution | "The mechanism name felt forced in the narrative" |
| **L2** | Pattern | Observation confirmed across 2+ campaigns | "Mechanism names with 3+ syllables consistently feel forced in narrative" |
| **L3** | Tested Fix | A specific modification tested on known input | "Changed microskill 4.2.3 to prefer 1-2 syllable mechanism names" |
| **L4** | Promoted Rule | Fix confirmed to improve output, approved by human | "Mechanism naming: prefer 1-2 syllable names (tested, approved)" |
| **L5** | Embedded in Skill | Rule written into the skill's AGENT.md or microskill spec | AGENT.md updated with naming constraint |
| **L6** | System Behavior | Rule observed in default system behavior across campaigns | System naturally produces shorter mechanism names without explicit reminder |

---

## The Promotion Loop

### Step 1: Identify a Learning to Promote

Review the learning log (`learning-log/`) for learnings at L1 or L2 that have promotion potential.

**Selection criteria:**
- Observed in 2+ campaigns (L2) preferred over single observations (L1)
- Has a clear, testable hypothesis for improvement
- Targets a specific skill or microskill (not a vague "system improvement")
- Classified as J1 or J2

### Step 2: Create a Learning Branch

```bash
git checkout -b learning/[learning-id]-[short-description]
# Example: git checkout -b learning/L42-shorter-mechanism-names
```

### Step 3: Modify the Target Skill

Edit the specific file:
- For execution changes: modify the microskill `.md` spec
- For scoring changes: modify the skill's ARENA-LAYER scoring criteria
- For loading changes: modify the skill's AGENT.md upstream loader section
- For constraint changes: modify the skill's ANTI-DEGRADATION.md

**Commit the change with a description:**
```bash
git commit -m "learning/L42: Prefer 1-2 syllable mechanism names in microskill 4.2.3"
```

### Step 4: Run the Skill on a Known Test Input

Use a previous campaign's upstream packages as test input. Run the modified skill.

**Compare:**
- Original output (from the previous campaign, already saved)
- Modified output (from this test run)

### Step 5: Evaluate

| Classification | Evaluator | Criteria |
|---------------|-----------|----------|
| **J1** | Human or automated comparison | Output quality maintained or improved. No regression. |
| **J2** | Human mandatory | Human confirms the change produces better output based on taste/judgment. |

### Step 6: Keep or Discard

| Result | Action |
|--------|--------|
| **KEEP** | Merge branch to main. Update learning level to L4 (or L5 if AGENT.md was modified). Log to `results.tsv`. |
| **DISCARD** | Reset branch. Log to `results.tsv` with reason. Learning stays at L2. |

```bash
# KEEP:
git checkout main
git merge learning/L42-shorter-mechanism-names

# DISCARD:
git checkout main
git branch -d learning/L42-shorter-mechanism-names
```

### Step 7: Log Result

Append to `learning-log/promotion-results.tsv`:
```
learning_id	date	branch	target_file	change_description	result	reason	commit_hash
L42	2026-03-07	learning/L42-shorter-mechanism-names	skills/04-mechanism/microskills/4.2.3-naming-candidates.md	Prefer 1-2 syllable mechanism names	KEEP	Names felt more natural in narrative testing	abc123
```

---

## Git Branch Workflow

```
main ────────────────────────────────────────────────────→
       \                                        /
        learning/L42-shorter-mechanism-names ──→ KEEP (merge)

main ────────────────────────────────────────────────────→
       \                              X
        learning/L43-longer-leads ──→ DISCARD (delete branch)
```

**IMPORTANT for this vault:** Do NOT use `git checkout` to switch branches while Obsidian is running — Obsidian sees file removals as note changes and creates duplicates. Use `git worktree` instead:

```bash
git worktree add /tmp/learning-test learning/L42-shorter-mechanism-names
# Work in /tmp/learning-test, NOT in the vault directory
# When done:
git worktree remove /tmp/learning-test
```

---

## Results Tracking

### promotion-results.tsv

Central results log at `learning-log/promotion-results.tsv`. Tab-separated values:

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

### Learning Level Updates

When a learning is promoted:
- Update its entry in the learning log with the new level (L3, L4, L5)
- Add a reference to the promotion-results.tsv entry
- If L5 (embedded in skill), note which file was modified

---

## What Is PARKED

### Automated Scoring Metrics

The promotion loop currently relies on human evaluation for Step 5. Automated scoring metrics are PARKED because:

- **Diversity** has a sweet spot (repeating patterns within diversity, not pure randomness)
- **Mechanism threading count** — higher just trains repetition
- **FSSIT keyword count** — sweet spot exists but is objectively hard to quantify
- **Specificity** — insanely specific = too heavy, too general = too light

Until scoring is solved, the loop runs with human evaluation. This is slower (can't run autonomously overnight) but accurate.

**When to revisit:** After 3+ campaigns through the upgraded system, generating enough data to calibrate metrics against actual human quality assessments.

---

## Issue Logger — Structured Incident Capture

Before learnings can be promoted, they must be captured. The Issue Logger is the intake mechanism that feeds the promotion pipeline.

### When to Log

Log an issue whenever:
- A skill produces output rated < 5
- A skill requires 21+ human edits
- A system error occurs (wrong file loaded, broken reference, missing upstream)
- A quality failure is caught by audit, Arena, or human review
- The same mistake type appears to have occurred before (even if you're not sure)

### Issue Entry Format

Append to `~outputs/issue-log.md`:

```markdown
### ISSUE-[YYYY-MM-DD]-[sequential-number]

- **Date:** [ISO 8601]
- **Class:** [one of: factual-error | voice-drift | structural-regression | missing-input | scope-creep | specification-gap | context-loss | hallucination | threading-failure | other]
- **Skill:** [skill ID where issue occurred]
- **Project:** [project-code]
- **Severity:** [critical | moderate | minor]
- **Description:** [What went wrong — be specific]
- **Root cause:** [Why it went wrong — best assessment]
- **Pattern match:** [Does this match any previous issue? If yes, cite ISSUE-ID]
- **Proposed prevention:** [What rule or change would prevent recurrence]
- **Learned:** [Yes / No]
- **Memorialized:** [Yes / No — if yes, cite location]
- **Activated:** [Yes / No — if yes, cite code]
```

### Automatic Pattern Detection

When logging a new issue, scan `~outputs/issue-log.md` for pattern matches:

**Pattern signal:** Same `Class` appears 2+ times within the last 10 issues.

When a pattern signal fires:
1. Print: `PATTERN DETECTED: [class] has occurred [N] times in recent issues. See [ISSUE-IDs].`
2. Draft a proposed rule in the format: "Before [action], always [check] to prevent [class]."
3. Add the proposed rule to the issue entry under `Proposed prevention:`
4. Flag the learning for promotion (advance to L2 in the learning log)

This transforms the issue log from a historical record into an active pattern detector.

---

## Integration with QE-Style Bounded Trial

When a proposed rule reaches L3 (Tested Fix), validate with a bounded trial:

1. **Test on 3 recent examples** — not just 1. Apply the proposed fix to 3 different past inputs where the issue class occurred.
2. **Evaluate all 3:**
   - J1 (judgment-free): Did output quality maintain or improve in all 3 cases?
   - J2 (judgment-required): Does human confirm improvement in all 3 cases?
3. **Promote only if 3/3 pass.** If 2/3, the rule needs refinement. If 1/3 or 0/3, discard.

This is stricter than a single-example test and prevents confirmation bias.

---

## Class-c Escalation Pipeline

When the Issue Logger detects pattern signals, the escalation pipeline determines the response intensity:

| Occurrences | Signal Level | Action |
|-------------|-------------|--------|
| **2x** same class in last 10 issues | Pattern Signal | Flag for attention. Draft proposed rule. Advance to L2. |
| **3x** same class in last 10 issues | Hook Development | Propose a new validator hook or enhancement to an existing validator. The pattern has proven persistent enough to warrant structural enforcement. |
| **5x** same class in last 10 issues | Mandatory Engineering Review | Human MUST review. This class is systemic. The issue log, all affected outputs, and proposed validators are presented for architectural decision. |

**The escalation pipeline creates an explicit path from behavioral rule to structural enforcement.** A one-time issue gets a rule. A persistent issue gets a hook. A systemic issue gets human engineering.

### Escalation Response Format

When an escalation triggers at the 3x level:

```markdown
### ESCALATION: [class] — Hook Development Recommended

**Pattern:** [class] has occurred [N] times in recent issues.
**Affected issues:** [ISSUE-IDs]
**Proposed hook/validator:**
- **Type:** [new validator | enhancement to existing validator]
- **Detection logic:** [what the hook would check for]
- **Trigger condition:** [when it would fire]
- **Expected prevention rate:** [estimate based on pattern analysis]

**Status:** AWAITING HUMAN APPROVAL — do not implement without explicit authorization.
```

---

## Learning Ledger Taxonomy

Every issue in the Issue Logger tracks three columns beyond the base entry format, creating a complete lifecycle view:

| Column | Question It Answers | Values |
|--------|-------------------|--------|
| **Learned** | Was the issue observed and understood? | Yes / No |
| **Memorialized** | Was a rule, protocol addition, or ANTI-DEGRADATION entry written? | Yes (cite location) / No |
| **Activated** | Was the rule built into structural enforcement (hook, validator, gate)? | Yes (cite code) / No |

### Lifecycle Example

```
Issue: voice-drift in Skill 14 (Mechanism Narrative) — 3 occurrences

Learned:     Yes — identified as failure to re-read Soul.md before generation
Memorialized: Yes — added to 02-long-form-vsl/14-mechanism-narrative/ANTI-DEGRADATION.md
Activated:    Yes — reminder_detector.py Detector 1 fires on synthesis-from-memory
```

Issues where Learned=Yes but Memorialized=No are knowledge gaps. Issues where Memorialized=Yes but Activated=No are enforcement gaps. The ledger makes both visible.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — J1/J2 classification, L1-L6 progression, git branch promotion workflow, results tracking |
| 1.1 | 2026-03-12 | Added Issue Logger with structured incident capture, automatic pattern detection, QE-style bounded trial (3-example validation), class-c escalation pipeline (2x/3x/5x), and learning ledger taxonomy (Learned/Memorialized/Activated) |
