---
name: event-driven-reminders
description: Event-driven system reminders that auto-inject targeted guidance at failure-prone decision points. Phase 1, Upgrade 2 of the QE roadmap.
---

# Event-Driven System Reminders

**Version:** 1.0 | March 11, 2026
**QE Roadmap:** Phase 1, Upgrade 2
**Principle:** When specific failure-prone conditions are detected, targeted guidance must be automatically injected at the moment of the decision — not relied upon from a system prompt the AI may have lost attention to.

---

## Building Code (Platform-Agnostic)

### The Standard

The system must detect common failure conditions and surface the relevant rule at the moment of the decision. This is the difference between hoping someone remembers the speed limit (polling) and having a sign appear when they're going too fast (event-driven).

### The Failure Mode It Prevents

Attention decay. Research shows sessions exceeding 15 tool calls consistently show attention-decay failures. Instructions are reliably violated after 30+ tool calls. Rules that are followed in early turns are forgotten in later turns. The class-c violation pattern across sessions is evidence that even well-documented rules fail when they're competing for attention in a growing context window.

### Detection vs. Polling

| Approach | How It Works | Weakness |
|----------|-------------|----------|
| **Polling (current)** | The AI must remember to check rules before each action | Requires the AI to remember to remember — fails under context pressure |
| **Event-driven (this upgrade)** | Specific conditions trigger automatic rule injection | The check fires whether or not the AI "remembers" — it's attached to the action, not to the AI's attention |

---

## Active Event Detectors

### Detector 1: Research-Before-Reasoning Violation
**Trigger condition:** Analysis, synthesis, or draft composition is attempted — and no `search_web`, `fetch_url`, or `search_vertical` call has been made for this topic in the current session.
**Reminder:** "R-07: Complete all research BEFORE analysis. Search first, then reason."
**Linked structural gate:** R-07 (Gate 5 in structural-gates skill)
**Exceptions:** Internal system work, Marc-directed use of existing knowledge, topic already researched this session.

### Detector 2: Exploration Spiral
**Trigger condition:** 5+ consecutive read-only operations (read, grep, glob, fetch_url) without any write, edit, or share_file action.
**Reminder:** "R-04: You've been reading without producing output. Assess whether you have enough information to start building."
**Tier:** Soft (warning, not blocking). Reading can be legitimately extended for complex research.

### Detector 3: File Created Without Sharing
**Trigger condition:** A file has been created or modified (`write`, `edit`, bash file output) and no `share_file` call follows in the same turn.
**Reminder:** "R-11: Every file created must be shared immediately. Call share_file before proceeding."
**Linked structural gate:** R-11 (Gate 4 in structural-gates skill)

### Detector 4: Premature Completion
**Trigger condition:** A todo task is about to be marked "completed" while other dependent tasks are still pending, OR a deliverable is about to be shared without all success criteria verified.
**Reminder:** "R-05/R-12: Verify all success criteria before marking complete. Run convergence check."
**Linked structural gate:** R-24 Milestone Checkpoint Gate

### Detector 5: Session Staleness
**Trigger condition:** 60+ minutes have passed since the last operational file update (check timestamps in staleness-map.md).
**Reminder:** "R-24: Operational files are stale. Update session-state.md, staleness-map.md, and any other operational files before proceeding."
**Linked structural gate:** R-24 60-Minute Staleness Alarm (already exists)

### Detector 6: Quality Pass Skipped
**Trigger condition:** A deliverable has been created (substantive document, skill file, report) and `submit_answer` or `share_file` is about to be called without any quality verification pass (no audit, no Q3 check, no internal self-check).
**Reminder:** "Q3/R-15: Run quality verification before sharing. At minimum, an internal self-check against success criteria."
**Tier:** Soft for quick deliverables. Hard for skill files and permanent files.

### Detector 7: Convergence Not Reached
**Trigger condition:** A phase or major task is being marked complete without a convergence check appearing in the conversation.
**Reminder:** "R-10/R-12: Convergence gate must pass before marking phase complete. Show convergence evidence."
**Linked structural gate:** R-10

### Detector 8: Context Approaching Limit
**Trigger condition:** The conversation has exceeded 30 tool calls, or the context window feels saturated (repeated context summaries, loss of early conversation details).
**Reminder:** "Context pressure detected. Save critical state to session-state.md NOW. Consider: (1) Is anything unsaved that would be lost on compaction? (2) Are operational files current? (3) Should you suggest a re-initialize?"
**Tier:** Hard — context loss causes the most expensive failures.

---

## Implementation on Perplexity Computer

Since Perplexity Computer doesn't support lifecycle hooks (PreToolUse/PostToolUse), event detection is implemented through a **self-check protocol** that fires at natural decision points:

### When to Run the Detector Sweep

The full detector sweep runs at three natural checkpoints:

1. **Before every `submit_answer`** — the final gate before Marc sees output
2. **Before marking any todo task "completed"** — a natural milestone boundary
3. **After every 10 tool calls** — periodic sweep to catch drift

### The Sweep Protocol

At each checkpoint, mentally evaluate each detector:

```
DETECTOR SWEEP:
[ ] D1: Am I about to make factual claims without prior research?
[ ] D2: Have I been reading 5+ times without producing?
[ ] D3: Are there any files I modified but haven't shared?
[ ] D4: Am I marking something complete prematurely?
[ ] D5: Are operational files stale (60+ min)?
[ ] D6: Am I sharing a deliverable without quality check?
[ ] D7: Am I closing a phase without convergence evidence?
[ ] D8: Is the context getting long? (30+ tool calls)
```

If any detector fires, execute the linked action before proceeding.

### Implementation on Claude Code (Future)

On Claude Code, these detectors can be implemented as actual lifecycle hooks:

```
// PreToolUse hooks
- Before write/edit: no action needed (trigger point for D3 tracking)
- Before submit_answer: run full detector sweep
- Before analysis tools: check D1 (research gate)

// PostToolUse hooks  
- After write/edit: add file to "unshared" ledger (D3 tracking)
- After share_file: remove file from "unshared" ledger
- After any tool: increment tool call counter (D8 tracking)

// Periodic hooks
- Every 10 tool calls: run full detector sweep
- Every 60 minutes: check D5 (staleness)
```

This implementation section is included per L6 (Implementation Persistence) — embedding the implementation in the skill file ensures it survives thread death.

---

## Platform-Agnostic Expression

For the building-code document (exportable to Donnie, Ben, Tony, Rich):

> **Principle 2: Event-Driven Reminders**
> 
> When your AI system has rules that get violated under context pressure, don't rely on the AI remembering to check them. Instead, attach the check to the action that would violate the rule. The check fires whether or not the AI "remembers" — it's structural, not behavioral.
> 
> **Implementation pattern:** For each rule that's been violated 2+ times: (1) identify the specific action that precedes the violation, (2) define the check as a binary yes/no, (3) attach the check to the action so it fires automatically, (4) define what happens on failure (block, warn, or log).
> 
> **Minimum viable version:** Before every output to the user, run a 30-second mental sweep of your top 8 failure modes. This works on any platform, requires no code, and catches most attention-decay violations.

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-11 | AI | v1.0: Phase 1 audit. 3 loops total across package. Convergence reached at Loop 3. R-26: 7/7 PASS (pre-audit). |
