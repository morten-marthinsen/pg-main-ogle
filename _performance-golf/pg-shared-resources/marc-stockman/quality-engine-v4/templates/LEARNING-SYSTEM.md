# Learning System — Template
**Quality Engine v4** | Component: Template
**Purpose:** Hybrid learning system combining a 6-level promotion scale (L1-L6) with a concrete failure-to-fix-to-rule workflow and 10 issue classes
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]. Also copy the failure-fixes.md and patterns.md templates into each agent's `_learning/` directory.

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [Learning Classification](#learning-classification)
- [The L1-L6 Progression](#the-l1-l6-progression)
- [Issue Logger](#issue-logger)
- [Failure-Fix Workflow](#failure-fix-workflow)
- [The Promotion Loop](#the-promotion-loop)
- [Escalation Pipeline](#escalation-pipeline)
- [Learning Ledger Taxonomy](#learning-ledger-taxonomy)

---

## Why This Exists

Most AI systems fix what breaks (anti-degradation) but do not compound what works. This learning system closes the loop:

```
observation -> pattern -> tested fix -> promoted rule -> embedded in skill -> system behavior
```

It combines two proven approaches:
1. **Marketing OS's L1-L6 scale** — a progression from raw observation to embedded system behavior, with judgment classification (J1/J2) and git branch testing
2. **Creative OS's failure-fix workflow** — every mistake gets a structural fix, not just a correction. Specific, traceable, and immediately actionable.

---

## Learning Classification

Every learning receives one of two classifications:

### J1: Judgment-Free

Objective fix that can be tested and promoted without subjective review.

**Examples:**
- "Skill X needs to check for [RESOURCE] before proceeding" -- add to skill spec
- "Scoring should weight [DIMENSION] higher for [DOMAIN]" -- adjust weights
- "Loader should check for [FILE] before loading [FALLBACK]" -- code change

**Promotion path:** Test directly against known input. KEEP if output quality maintained or improved. Human review optional.

### J2: Judgment-Required

Subjective pattern that needs human taste validation before promotion.

**Examples:**
- "[NAMING_PATTERN] produces better results" -- needs human evaluation
- "Sections that open with [TECHNIQUE_A] outperform [TECHNIQUE_B]" -- needs comparison
- "Longer [OUTPUTS] produce better downstream handoffs" -- needs quality review

**Promotion path:** Requires human A/B comparison. KEEP only if human confirms improvement.

---

## The L1-L6 Progression

| Level | Name | Description | Example |
|-------|------|-------------|---------|
| **L1** | Observation | Raw observation from a single execution | "[SPECIFIC_OBSERVATION]" |
| **L2** | Pattern | Observation confirmed across 2+ executions | "[OBSERVATION] confirmed in [N] projects" |
| **L3** | Tested Fix | A specific modification tested on known input | "Changed [SPEC] to [NEW_BEHAVIOR]" |
| **L4** | Promoted Rule | Fix confirmed to improve output, approved by human | "[RULE] (tested, approved)" |
| **L5** | Embedded in Skill | Rule written into the skill's spec or config | Skill file updated with constraint |
| **L6** | System Behavior | Rule observed in default behavior without reminder | System naturally produces correct output |

---

## Issue Logger

### When to Log

Log an issue whenever:
- A skill produces output rated below acceptable quality
- A skill requires excessive human edits (21+ corrections)
- A system error occurs (wrong file loaded, broken reference, missing upstream)
- A quality failure is caught by audit, competition, or human review
- The same mistake type appears to have occurred before

### Issue Entry Format

Append to `outputs/[project-code]/issue-log.md`:

```markdown
### ISSUE-[YYYY-MM-DD]-[sequential-number]

- **Date:** [ISO 8601]
- **Class:** [one of the 10 classes below]
- **Skill/Phase:** [ID where issue occurred]
- **Project:** [project-code]
- **Severity:** [critical | moderate | minor]
- **Description:** [What went wrong -- be specific]
- **Root cause:** [Why it went wrong -- the structural gap]
- **Pattern match:** [Does this match any previous issue? If yes, cite ISSUE-ID]
- **Proposed prevention:** [What rule or change would prevent recurrence]
- **Learned:** [Yes / No]
- **Memorialized:** [Yes / No -- if yes, cite location]
- **Activated:** [Yes / No -- if yes, cite code/hook]
```

### The 10 Issue Classes

| Class | Description | Typical Fix |
|-------|-------------|-------------|
| `factual-error` | Invented statistics, names, quotes, credentials | Add to forbidden fabrication patterns; strengthen verification gate |
| `voice-drift` | Output drifted from established voice/tone | Add voice re-read checkpoint; strengthen voice loading |
| `structural-regression` | A previously fixed problem recurred | Promote rule to structural enforcement (hook/validator) |
| `missing-input` | Required upstream data was not loaded | Add to upstream loader checklist; add input verification |
| `scope-creep` | Output exceeded defined boundaries | Strengthen scope constraints in skill spec |
| `specification-gap` | Skill spec did not cover an edge case | Expand spec to cover the gap |
| `context-loss` | Information was lost due to context pressure | Add compaction detection; recommend session break earlier |
| `hallucination` | Model generated plausible but false information | Add claim verification gate; add to forbidden patterns |
| `threading-failure` | Concepts not properly connected across sections | Add threading check to assembly/editorial phase |
| `other` | Does not fit above categories | Document and evaluate for new class creation |

---

## Failure-Fix Workflow

This is the concrete, per-incident workflow adapted from Creative OS. Every failure gets a structural fix, not just a correction.

### When an Agent Makes a Mistake

1. **Identify** the error category (use the 10 issue classes above)
2. **Record** the entry using the failure-fix template below
3. **Apply** the structural fix (update skill spec, add to forbidden patterns, etc.)
4. **Verify** the fix would have prevented the original error
5. **Update** the agent's Common Mistakes section if the pattern is recurring

### Failure-Fix Entry Template

Store in each agent's `_learning/failure-fixes.md`:

```yaml
entry_id: "LEARN-YYYY-MM-DD-[seq]"
date: YYYY-MM-DD
session: NNN
category: "[one of the 10 issue classes]"
what_happened: |
  [What went wrong -- specific, not vague]
root_cause: |
  [Why it happened -- the structural gap that allowed it]
structural_fix: |
  [What was changed to prevent recurrence -- file, section, specific edit]
prevention: |
  [How this fix prevents the error structurally, not just by instruction]
```

### Patterns Template

Store in each agent's `_learning/patterns.md`:

```markdown
# [AGENT_NAME] Patterns

> Recurring patterns observed across sessions. What works, what does not, and why.

## What Works

<!-- Add patterns here as they emerge -->

## What Does Not Work

<!-- Add anti-patterns here as they emerge -->

## Domain-Specific Insights

<!-- Add domain-specific learnings here -->
```

---

## The Promotion Loop

### Step 1: Identify a Learning to Promote

Review the learning log for learnings at L1 or L2 with promotion potential.

**Selection criteria:**
- Observed in 2+ executions (L2) preferred over single observations (L1)
- Has a clear, testable hypothesis for improvement
- Targets a specific skill or phase (not a vague "system improvement")
- Classified as J1 or J2

### Step 2: Create a Learning Branch

```bash
git checkout -b learning/[learning-id]-[short-description]
```

### Step 3: Modify the Target Skill

Edit the specific file:
- For execution changes: modify the skill spec
- For scoring changes: modify the scoring criteria
- For loading changes: modify the upstream loader
- For constraint changes: modify the anti-degradation rules

### Step 4: Run the Skill on Known Test Input

Use a previous project's upstream packages as test input. Run the modified skill.

**Compare:**
- Original output (from the previous project, already saved)
- Modified output (from this test run)

### Step 5: Validate with Bounded Trial

Test on 3 recent examples -- not just 1:

1. Apply the proposed fix to 3 different past inputs where the issue class occurred
2. Evaluate all 3:
   - J1 (judgment-free): Did output quality maintain or improve in all 3 cases?
   - J2 (judgment-required): Does human confirm improvement in all 3 cases?
3. **Promote only if 3/3 pass.** If 2/3, the rule needs refinement. If 1/3 or 0/3, discard.

### Step 6: Keep or Discard

| Result | Action |
|--------|--------|
| **KEEP** | Merge branch to main. Update learning level to L4 (or L5 if skill spec was modified). Log result. |
| **DISCARD** | Delete branch. Log result with reason. Learning stays at L2. |

### Step 7: Log Result

Append to `learning-log/promotion-results.tsv`:

```
learning_id	date	branch	target_file	change_description	result	reason	commit_hash
```

---

## Escalation Pipeline

When the Issue Logger detects pattern signals, the escalation pipeline determines the response intensity:

| Occurrences | Signal Level | Action |
|-------------|-------------|--------|
| **2x** same class in last 10 issues | Pattern Signal | Flag for attention. Draft proposed rule. Advance to L2. |
| **3x** same class in last 10 issues | Hook Development | Propose a new validator hook. The pattern is persistent enough for structural enforcement. |
| **5x** same class in last 10 issues | Mandatory Engineering Review | Human MUST review. This class is systemic. Present all affected outputs and proposed validators for architectural decision. |

### Escalation Response Format

When an escalation triggers at the 3x level:

```markdown
### ESCALATION: [class] -- Hook Development Recommended

**Pattern:** [class] has occurred [N] times in recent issues.
**Affected issues:** [ISSUE-IDs]
**Proposed hook/validator:**
- **Type:** [new validator | enhancement to existing validator]
- **Detection logic:** [what the hook would check for]
- **Trigger condition:** [when it would fire]
- **Expected prevention rate:** [estimate]

**Status:** AWAITING HUMAN APPROVAL -- do not implement without explicit authorization.
```

---

## Learning Ledger Taxonomy

Every issue tracks three lifecycle columns beyond the base entry:

| Column | Question It Answers | Values |
|--------|-------------------|--------|
| **Learned** | Was the issue observed and understood? | Yes / No |
| **Memorialized** | Was a rule or protocol addition written? | Yes (cite location) / No |
| **Activated** | Was the rule built into structural enforcement? | Yes (cite code) / No |

Issues where Learned=Yes but Memorialized=No are **knowledge gaps**.
Issues where Memorialized=Yes but Activated=No are **enforcement gaps**.
The ledger makes both visible.

---

## File Organization

Each agent should maintain this learning structure:

```
_learning/
  README.md              # This protocol (or a link to the shared one)
  failure-fixes.md       # Specific failures and structural fixes
  patterns.md            # Recurring patterns (what works, what does not)
```

Each project should maintain this learning structure:

```
outputs/[project-code]/
  issue-log.md           # Cumulative incident record
  learning-log/
    observations.md      # L1-L2 raw observations
    promotion-results.tsv # L3-L6 test results
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. Hybrid of Marketing OS L1-L6 promotion scale and Creative OS failure-fix workflow. |
