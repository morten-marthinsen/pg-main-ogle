---
name: issue-logger
version: 1.1
updated: 2026-03-06
author: Marc Stockman
description: Structured capture of issues, mistakes, and corrections — the system's learning intake mechanism
scope: Issue capture, classification, and routing to remediation skills
trigger: Marc corrections, self-audit findings, check violations, regression FAILs, self-caught errors
---

# Issue Logger

**Version:** 1.1 | March 6, 2026
**Scope:** Structured capture of issues, mistakes, and corrections. The system's learning intake mechanism.
**Rule Source:** R-06 (Issue Log), L2 (Same-Turn Lesson Promotion)
**Frustration Addressed:** #8 — AI doesn't log issues or learn from mistakes

---

## When This Skill Fires

**Auto-triggers (no command needed):**
- Marc corrects you ("no, that's wrong", "I said X not Y", "fix this", "that's not what I asked")
- Marc expresses frustration with output quality or process
- Self-audit catches an issue during any pass (Pass 1 through Pass 6)
- Check-protocol finds a rule violation
- A deliverable fails regression check (any FAIL verdict)
- You catch your own mistake before Marc does

**Does NOT fire on:**
- Routine feedback that isn't a correction ("make it shorter", "add a section on X")
- Preference clarifications that don't indicate a mistake ("I prefer bullets over paragraphs")
- First-attempt requests (no prior version to have gotten wrong)
- L1 J1 findings (judgment calls — defensible decisions that could have gone either way). Only J2 findings (actual errors) from L1 reflection feed into this skill. J1 items are noted for pattern tracking in the reflection log but don't trigger issue logging.

---

## Defer-To Clauses

| Skill | Relationship |
|-------|-------------|
| `self-audit` | Self-audit Pass 6 (System Learning) calls this skill's capture format when issues are found. Self-audit owns the full quality loop; this skill owns the structured capture format. |
| `check-protocol` | CHECK may discover violations. When it does, each violation should be logged using this skill's entry format. |
| `qe-system-maintenance` | QE-SM owns L2 (Same-Turn Lesson Promotion) bounded trial mechanics and L5 (Periodic System Optimization). This skill CAPTURES issues and RECOMMENDS promotion. QE-SM EXECUTES the promotion process (trial period, evaluation, permanent adoption). |
| `deliverable-regression-check` | Regression check may produce FAIL verdicts. Each FAIL is an issue that should be logged here. |
| `marc-ops-framework` | The framework defines R-06 at a high level. This skill is the detailed implementation. |

**Boundary:** This skill captures and classifies. It does not execute fixes, run audits, or promote rules. Those are the jobs of other skills. Think of this as the intake form — other skills are the response team.

---

## Issue Entry Format

Every issue gets logged as a structured entry. Use this exact format:

```markdown
### Issue #[sequential number] — [short title]
**Timestamp:** [date and time]
**Source:** [how it was caught: Marc correction | self-audit Pass N | check Step N | regression check Dim N | self-caught]
**Severity:** [CRITICAL | HIGH | MEDIUM | LOW]

**What happened:**
[Factual description of the error, omission, or failure. No justifications.]

**Why it happened:**
[Root cause analysis. Be honest. Common causes:]
- Training data reliance (R-07 violation)
- Skipped step (process gap)
- Context drift (lost track of objective)
- Stale information (didn't re-verify)
- Assumption not surfaced (took something for granted)
- Scope creep (answered a different question)
- Prior version not checked (R-17 violation)

**Immediate fix:**
[What was done to correct the specific instance]

**Preventive rule:**
[What rule, if followed, would prevent this class of error]
- If an existing rule covers this: cite the rule and note it was violated
- If no existing rule covers this: propose a new rule

**Promotion recommendation:**
[PROMOTE | MONITOR | NO ACTION]
- PROMOTE: This is a pattern (2+ occurrences) or high-severity — recommend immediate rule promotion via L2
- MONITOR: First occurrence, medium severity — log it but watch for recurrence
- NO ACTION: One-off situational error unlikely to recur
```

---

## Severity Classification

| Severity | Criteria | Examples |
|----------|----------|---------|
| CRITICAL | Factually wrong output delivered to Marc. Wrong data drove a recommendation. | Incorrect pricing in a vendor comparison. Wrong API capabilities in a technical recommendation. |
| HIGH | Significant quality failure. Structural regression. Major step skipped. | Lost images in PDF. Skipped entire self-audit pass. Delivered without R-07 research gate. |
| MEDIUM | Moderate quality gap. Minor step skipped. Formatting issue. | Missed one citation. Table formatting broken. Forgot R-11 share_file. |
| LOW | Cosmetic issue. Minor wording. Non-material omission. | Typo in filename. Slightly wrong date format. |

---

## Where Issues Get Logged

**Primary file:** `/home/user/workspace/session-learning-log.md`

If the file doesn't exist, create it with this header:

```markdown
# Session Learning Log
**Purpose:** Structured record of issues, corrections, and lessons learned.
**Updated by:** issue-logger skill (R-06 implementation)

---
```

Then append each new issue entry.

**If the file exists:** Append new entries at the end. Never overwrite existing entries.

---

## Post-Capture Actions

After logging an issue, take these steps:

### Step 1: Apply the immediate fix
Fix the specific problem that triggered the issue. This is the responsibility of whatever skill or process is active — not this skill. This skill just ensures the fix is documented.

### Step 2: Check for patterns
Search the session-learning-log for similar issues:
- Same root cause appearing 2+ times → elevate promotion recommendation to PROMOTE
- Same rule violated 2+ times → flag the rule as potentially insufficient (may need strengthening, not just enforcement)
- Same frustration category recurring → flag for Marc's attention

### Step 3: Hand off to qe-system-maintenance (if PROMOTE)
If the promotion recommendation is PROMOTE:
1. Note in the log entry: "Handed to qe-system-maintenance for L2 processing"
2. When `qe-system-maintenance` is loaded, it will pick up PROMOTE-flagged entries and run the bounded trial mechanism

### Step 4: Acknowledge to Marc
When an issue is caught and logged (especially if Marc caught it):
- Acknowledge the error directly — no minimizing, no deflecting
- State the immediate fix
- State the preventive measure
- Do NOT over-apologize or produce lengthy mea culpas — Marc values action over apology

Example:
> "You're right — I used training data for that pricing claim instead of doing a live search. Fixed: re-searched and updated with verified pricing from [source]. This is an R-07 violation, logged as Issue #4. The pattern has occurred twice now, so I'm flagging it for rule strengthening."

---

## Batch Logging

When self-audit or check-protocol surfaces multiple issues at once, log them all in a single batch but as separate numbered entries. Add a batch header:

```markdown
## Batch: [source] — [date]
**Context:** [what triggered the batch — e.g., "Self-audit Pass 1 on Quality_Engine_Explainer.md"]
**Issues found:** [count]

[Individual issue entries follow]
```

---

## Integration with Memory

When an issue is classified as PROMOTE and successfully promoted to a rule:
- Use `memory_update` to store the new rule or rule modification
- Format: "Remember that [rule description] was added/modified because [root cause pattern]"
- This ensures the learning persists across sessions, not just within the current workspace

---

## What This Skill Does NOT Do

To keep boundaries clean:
- Does NOT run audits (self-audit does that)
- Does NOT check compliance (check-protocol does that)
- Does NOT compare file versions (deliverable-regression-check does that)
- Does NOT execute the L2 bounded trial mechanism (qe-system-maintenance does that)
- Does NOT decide whether a rule should become permanent (that's Marc's call, facilitated by qe-system-maintenance)

This skill is the intake. It captures, classifies, and routes. Other skills act.

---

*This skill implements R-06 (Issue Log) as a first-class protocol. Every mistake is an opportunity to make the system better — but only if it's captured, classified, and routed to the right process. The goal is zero repeat failures: every issue logged here should result in either a new rule, a strengthened rule, or an explicit decision that the risk is acceptable.*