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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — J1/J2 classification, L1-L6 progression, git branch promotion workflow, results tracking |
