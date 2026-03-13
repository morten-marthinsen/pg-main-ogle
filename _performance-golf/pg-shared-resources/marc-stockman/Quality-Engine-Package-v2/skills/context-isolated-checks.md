---
name: context-isolated-checks
description: Context-isolated quality checks via subagent verification. Quality passes run in a fresh context window, not contaminated by the reasoning that produced the work. Phase 1, Upgrade 1 of the QE roadmap.
---

# Context-Isolated Quality Checks

**Version:** 1.0 | March 11, 2026
**QE Roadmap:** Phase 1, Upgrade 1
**Principle:** Quality verification must run in a context window that is not contaminated by the reasoning that produced the work being evaluated.

---

## Building Code (Platform-Agnostic)

### The Standard

When the AI verifies its own work, the verification must happen in a fresh context that does not contain the conversation history, reasoning chains, or drafting process that produced the work. The verifier sees only: (1) the deliverable, (2) the success criteria, (3) the quality rules to apply.

### The Failure Mode It Prevents

Context contamination. When quality checks run in the same context as the work, the verifier is influenced by the same reasoning it should independently evaluate. Rich Schefren's foundational insight: "80% of the difference between agents and skills is that a skill is contaminated by the current context. An agent comes in with its own context window." The "Agents of Chaos" paper confirms empirically that agentic self-monitoring degrades under the same conditions that cause the errors being monitored for.

### Evidence

- **Rich Schefren:** "For each arena persona, they get a fresh context window...otherwise they just blend together too much."
- **Tony Flores:** Arena system uses fresh context per persona to prevent blending.
- **OpenDev:** Subagent orchestration where each subagent has a fresh context.
- **Manus:** Multi-agent context isolation as architectural principle.
- **"Agents of Chaos" paper:** Self-monitoring reliability degrades under load.

---

## When to Use Isolated Checks

Not every quality check needs isolation. Use this protocol based on deliverable importance:

| Deliverable Type | In-Context OK? | Isolated Required? |
|-----------------|----------------|-------------------|
| Quick edits, operational file updates | Yes | No |
| Skill files, rule changes | Yes (internal self-check) | Recommended for new skills |
| Reports, analyses, strategic documents | No | Yes — always |
| Permanent files (morning report, architecture docs) | No | Yes — always |
| Anything being sent to someone other than Marc | No | Yes — always |

**Rule of thumb:** If Marc said "forensic deep dive" or the deliverable will be seen by the mastermind group, use isolated checks.

---

## The Isolated Check Protocol

### Step 1: Prepare the Verification Package

Before spawning the isolated verifier, assemble exactly three inputs:

1. **The deliverable** — save to a workspace file if not already saved
2. **The success criteria** — pulled from R-05 definition or Marc's stated requirements
3. **The quality rules** — which specific rules and standards apply to this deliverable

Do NOT include: conversation history, reasoning logs, drafting rationale, or any context about how the work was produced. The verifier should evaluate the work on its own merits.

### Step 2: Spawn Isolated Verifier

Use `run_subagent` with the verification package:

```
run_subagent(
  task_name="QE Isolated Verification",
  subagent_type="general_purpose",
  objective="""
  You are an independent quality verifier. You have NOT seen the conversation
  that produced this deliverable. Your job is to evaluate it with fresh eyes.

  DELIVERABLE: [path to file]
  
  SUCCESS CRITERIA:
  [list each criterion]
  
  QUALITY RULES TO CHECK:
  [list applicable rules — e.g., R-02 live sources, R-05 success criteria, 
   R-20 source verification, etc.]
  
  YOUR TASK:
  1. Read the deliverable
  2. For each success criterion: PASS or FAIL with specific evidence
  3. For each quality rule: PASS, FLAG, or FAIL with specific evidence
  4. List every factual claim that cannot be verified from the document alone
  5. Identify any section that feels thin, hand-wavy, or like it's 
     describing what should be done rather than doing it (R-08 check)
  6. Save your findings to /home/user/workspace/qe-isolated-findings.md
  
  Be adversarial. Your value is in finding problems, not confirming quality.
  """,
  user_description="Running isolated quality verification"
)
```

### Step 3: Integrate Findings

After the isolated verifier completes:

1. Read `qe-isolated-findings.md`
2. For each FAIL: fix the issue in the deliverable
3. For each FLAG: evaluate whether it's material — fix if yes, document if no
4. For each unverifiable claim: verify via live search or mark as assumed
5. If any FAILs were found: run the isolated check again on the revised version
6. Document the isolated check results in the audit log

### Step 4: Convergence

The isolated check follows the same convergence principle as the audit:
- If the verifier found material issues → fix → re-run isolated check
- If the verifier found zero material issues → deliverable is clean
- Maximum 3 isolation rounds (per Upgrade 4: Max Retries). If still failing after 3 rounds, escalate to Marc with findings.

---

## Implementation on Perplexity Computer

Perplexity Computer's `run_subagent` provides native context isolation. The subagent starts with a fresh context containing only what you pass in the objective.

**Key implementation details:**
- Save the deliverable to a workspace file first (subagents read files, not conversation context)
- Keep the objective under 2000 characters — put detailed criteria in the deliverable file or a separate criteria file
- Use `preload_skills` to pass relevant skills (e.g., `source-verification` for R-20 checks)
- The subagent saves findings to a workspace file that the parent reads

**Cost/latency note:** Each isolated check spawns a subagent, which takes 30-60 seconds and costs credits. Per D-08, budget is not a constraint. Per R-04, the quality improvement justifies the overhead for important deliverables.

### Implementation on Claude Code (Future)

On Claude Code, context isolation maps to spawning a sub-agent with `new Agent()` or using the task tool with a fresh context. The principle is identical — the verifier only sees the deliverable, criteria, and rules.

---

## Platform-Agnostic Expression

For the building-code document (exportable to Donnie, Ben, Tony, Rich):

> **Principle 1: Context-Isolated Quality Checks**
> 
> Never let your AI verify its own work in the same conversation that produced it. The verifier is contaminated by the same reasoning it's supposed to evaluate. Instead, spawn a fresh agent (or start a new conversation) that sees only: (1) the deliverable, (2) what "good" looks like, (3) what to check for. Nothing else.
> 
> **Implementation pattern:** Save the work to a file. Start a new agent/conversation. Give it the file, the success criteria, and the quality checklist. Ask it to be adversarial — its value is in finding problems, not confirming quality. If it finds issues, fix them and re-run. Repeat until clean.
> 
> **Minimum viable version:** Copy your output into a new chat window and ask: "What's wrong with this? Be harsh." Even this basic version catches issues that in-context review misses, because the new context doesn't carry the reasoning that produced the output.

---

## Integration with Existing Skills

- **audit skill:** The audit's convergence loop (Passes 1-4) currently runs in-context. For high-importance deliverables, Passes 1-2 (Verification + Adversarial) can be delegated to an isolated subagent while Passes 3-4 (Pre-Mortem + Revise) remain in-context. This is a hybrid approach — isolate the checks most susceptible to context contamination.
- **qe-quality-assurance:** Phase 4 (Verification/CoVe) and Phase 5 (Adversarial Critique) are candidates for isolation. Phase 6 (Pre-Mortem) benefits from in-context knowledge and should stay in the main conversation.
- **structural-gates:** The isolated check is itself a structural gate — it fires before sharing important deliverables. It can be added to the Gate Inventory as a soft gate (recommended, not blocking) for standard deliverables and a hard gate for permanent files and external-facing documents.

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-11 | AI | v1.0: Phase 1 audit. 3 loops total across package. Convergence reached at Loop 3. R-26: 8/8 PASS (pre-audit). |
