---
name: issue-logger
description: Structured capture of issues, mistakes, and corrections. The system's learning intake mechanism.
author: marc
version: 1.3
---

# Issue Logger

**Version:** 1.3 | March 11, 2026
**Category:** Operational (Learning Infrastructure)
**Implements:** R-06 (Issue Log), feeds D-12 (Self-Learning Environment)

---

## Purpose

Every mistake, correction, and quality failure is a learning opportunity — but only if it's captured in a structured, traceable format. This skill defines how issues enter the system, how they're classified, and how they flow into the rule-improvement pipeline.

**The problem this solves:** Without structured capture, mistakes are acknowledged in conversation but forgotten by the next session. The same errors repeat because there's no persistent record connecting what happened to what should change. This skill is the intake mechanism for the self-learning loop.

---

## When This Fires

**Auto-trigger conditions:**

| Trigger | Source | Example |
|---------|--------|---------|
| Marc corrects the AI | Conversation | "No, that's wrong" / "I said X not Y" / "You missed..." |
| Marc reveals a gap via question | Conversation | Marc asks about system state and the answer reveals a violation or gap. The fact that Marc had to prompt the discovery IS the issue. Example: "Has everything been updated?" → answer reveals stale files. |
| R-24 Correction Checkpoint | R-24 (Milestone Persistence) | After fixing any problem Marc surfaced, R-24 requires issue-logger classification before moving on. This is the intake point for the Correction Checkpoint hard gate. |
| Audit finding (material) | `audit` Pass 1-3 | Any finding that produces a change in Pass 4 |
| Audit Pre-Flight finding | `audit` PF-1 through PF-4 | Any operational hygiene issue flagged during Pre-Flight |
| Regression FAIL | `deliverable-regression-check` | Any dimension receiving a FAIL verdict |
| Self-caught error | Any context | AI realizes mid-work it made a mistake |
| L1 J2 classification | `qe-quality-assurance` or post-action reflection | A post-action reflection finding classified as J2 (actual error, not judgment call) |

**Does NOT fire for:**
- L1 J1 findings (judgment calls — defensible decisions that could have gone either way). These are noted for pattern tracking but don't enter the issue pipeline.
- Minor style preferences (unless the same preference is violated 3+ times, at which point the pattern itself becomes an issue).
- Pure clarification questions from Marc where the answer does NOT reveal a violation or gap (those aren't errors). Note: if the answer DOES reveal a gap, it triggers "Marc reveals a gap via question" above.

---

## Issue Entry Format

Every issue is captured in `session-learning-log.md` using this structure:

```markdown
| # | Date | What Happened | Why | Fix | Preventive Rule | Classification | Promoted? |
```

**Field definitions:**

| Field | What Goes Here |
|-------|---------------|
| # | Sequential issue number for this session |
| Date | Date of occurrence (YYYY-MM-DD) |
| What Happened | Factual description of the error or failure. What was produced vs. what should have been produced. No rationalization. |
| Why | Root cause analysis. Why did this happen? Trace to the specific gap — missing rule, rule not applied, wrong assumption, stale context, etc. |
| Fix | What was done to correct the immediate problem. |
| Preventive Rule | Which existing rule should have prevented this? If none exists, note "gap — no covering rule." |
| Classification | **Standardized tag format (MANDATORY).** Use exactly: `class-a: R-XX`, `class-b: R-XX`, `class-c: R-XX`, or `class-d: [description]`. This tag enables mechanical pattern detection — grep for `class-c: R-24` to count violations of R-24, for example. Never omit or vary the format. |
| Promoted? | Has this been promoted to a rule change? Values: NO / PENDING / YES (with rule ID) |

---

## Classification Protocol

After capturing the issue, classify it to determine next steps:

```
1. Is this covered by an existing rule?
   → Yes, rule was violated → class-(a): Execution discipline gap.
     Action: Log it. If same rule violated 2+ times in same session, 
     escalate to Marc.
   
   → Yes, but rule is ambiguous → class-(b): Rule needs clarification.
     Action: Log it. Draft a rule patch with clearer language. 
     Present to Marc for approval.
   
   → Yes, but rule didn't prevent it → class-(c): Rule is insufficient.
     Action: Log it. Analyze why the rule failed to prevent this specific 
     case. Draft a rule enhancement. Present to Marc for approval.
     **Cross-session escalation (3+ threshold):** After logging, check 
     memory for prior class-(c) occurrences of the same rule. If 3+ 
     total across sessions, escalate to structural enforcement proposal 
     (per audit Pass 6 Step 5). The pattern indicates the behavioral 
     rule is systematically failing and needs mechanical enforcement.

2. Is this NOT covered by any existing rule?
   → class-(d): Net-new gap.
     Action: Log it. Evaluate whether this is a one-off or a pattern.
     - One-off: Log and monitor. Note in the Preventive Rule field: 
       "gap — monitoring for pattern."
     - Pattern (2+ occurrences): Draft a new rule or sub-check. 
       Present to Marc for approval.
```

---

## Promotion Pipeline

When an issue is flagged for promotion (class b, c, or d with pattern):

1. **Draft the change** — Write the specific rule text, identifying exactly where it fits (new rule, existing rule amendment, or accelerator sub-check).
   **Pre-build novelty check (MANDATORY):** Before drafting a new rule or mechanism, verify it doesn't functionally duplicate an existing one. Grep for related keywords across `marc-ops-framework`, active skills, and the Rules-and-Decisions-Log. If an existing rule covers the same scenario, propose an amendment to that rule instead of creating a new one. This prevents system bloat as the rule count grows. Provenance: ASI-ARCH paper (arXiv 2507.18074) novelty/sanity check pattern — verify genuine novelty before investing resources.
2. **Present to Marc** — Per D-02 and D-10, all rule changes require Marc's approval. Present the issue, the classification, and the proposed change.
3. **On approval:** Apply the change to the relevant skill file. Update `session-learning-log.md` Promoted? field to "YES (rule ID)".
4. **Hand off to `qe-system-maintenance`** — For L2 processing (bounded trial mechanism, pattern verification, and rule integrity audit).

---

## Cross-Skill Integration

| Skill | Integration Point |
|-------|-------------------|
| `audit` | Pass 6 (System Learning) uses this skill's entry format for issues discovered during audit, and reads the issue log to identify patterns across issues. Uses standardized class-c tags for mechanical pattern counting. |
| `marc-ops-framework` | R-24 Correction Checkpoint triggers this skill after any Marc-surfaced problem is fixed. Cross-referenced hard gate: R-24 says "log using issue-logger format" → this skill provides the format and classification. |
| `deliverable-regression-check` | FAIL verdicts feed directly into this skill as regression issues. |
| `qe-quality-assurance` | L1 J2 classifications trigger this skill. |
| `qe-system-maintenance` | Receives PROMOTE recommendations from this skill for L2 processing. |
| `creative-bypass` | "Never rationalize lesser outcomes" — when logging, describe what happened factually, never justify the error. |

---

## Operational Notes

- **Real-time logging:** Issues are logged when identified, not batched. Per Marc's standing preference, don't wait until the end of a session.
- **File location:** Issues are captured in `/workspace/session-learning-log.md` for the current session. Cross-session patterns are tracked in memory.
- **Memory persistence:** After logging an issue, store the pattern (not the specific instance) in memory if it reveals something durable about the system's failure modes.
- **Honesty standard:** Per Marc's preference for honesty over reassurance, describe what actually went wrong without softening the language. "I missed X" not "X could have been more thorough."

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-10 | AI | v1.1: Class-c cross-session escalation added. Immediate convergence. |
| Audit | PASSED | 2026-03-10 | AI | v1.2: Expanded triggers, standardized tagging, Classification column. Convergence reached. |