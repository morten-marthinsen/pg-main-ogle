# EMAIL-STRATEGIST-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-21
**Purpose:** STRUCTURAL enforcement to prevent email strategist process breakdown
**Authority:** This document has EQUAL authority to EMAIL-ENGINE-CLAUDE.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: EMAIL-STRATEGIST-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip upstream package loading, auto-approve bypassing human blueprint approval, or design urgency-heavy campaigns when content-forward is required.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI designs campaign without loading available upstream packages
- AI assigns same body type consecutively
- AI skips human blueprint approval
- AI designs urgency-heavy campaigns when content-forward is needed
- AI creates launch sequences without volume escalation
- AI maps too few assets to emails, creating "thin" content plans

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/E0-email-strategist/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/E0-email-strategist/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/E0-email-strategist/checkpoints/LAYER_2_COMPLETE.yaml
[project]/E0-email-strategist/BLUEPRINT_APPROVED.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "E0-email-strategist"
status: COMPLETE
timestamp: "[ISO 8601]"
mode: "[A|B]"

verification:
  context_loaded: true
  minimum_assets: [number]
  campaign_type_selected: "[type]"

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Upstream packages (Mode A)** | 5 of 8 | HALT — Request missing skill execution |
| **Brief fields (Mode B)** | Product + Audience + Goal | HALT — Request additional brief info |
| **Content assets identified** | 5 | HALT — Recommend content-building first |
| **Body type variety** | Never consecutive | HALT — Reassign body types |
| **Human blueprint approval** | BLOCKING | HALT — Cannot proceed to E1 |
| **Urgency justification** | Required for all DU/PL/AL | HALT — Justify or remove urgency |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "3 packages is enough" (Mode A) | 5 of 8 is the minimum | HALT — Load more packages |
| "Same type twice is fine for variety" | NEVER consecutive same type | HALT — Reassign |
| "Human will probably approve" | BLOCKING gate, not advisory | HALT — Get approval |
| "Urgency from email 1" | First 2/3 is content-forward | HALT — Redesign |
| "NR is fun, use it more" | Max 1 per 7 emails | HALT — Reduce NR count |
| "I don't need a template" | Campaign type MUST map to template | HALT — Load template |

---

## STRUCTURAL FIX 4: VARIETY RULE ENFORCEMENT

```yaml
variety_check:
  consecutive_types:
    rule: "No same body type in positions N and N+1"
    check: "FOR i in range(len(emails)-1): emails[i].body_type != emails[i+1].body_type"
    if_violation: "HALT — swap body type at position N+1"

  window_diversity:
    rule: "In any 5-email window, at least 3 different body types"
    check: "FOR i in range(len(emails)-4): len(set(emails[i:i+5].body_type)) >= 3"
    if_violation: "HALT — diversify body types in window"

  nr_limit:
    rule: "Maximum 1 NR per 7 emails"
    check: "count(NR) / total_emails <= 1/7"
    if_violation: "HALT — reduce NR count"
```

---

## STRUCTURAL FIX 5: E0-SPECIFIC MC-CHECK

```yaml
E0-MC-CHECK:
  timestamp: "[current time]"

  context_verification:
    mode: "[A|B]"
    packages_loaded: [number] (Mode A)
    brief_complete: [Y/N] (Mode B)
    if_insufficient: "STOP — Load missing context"

  design_verification:
    campaign_type_selected: [Y/N]
    template_loaded: [Y/N]
    body_type_variety_passes: [Y/N]
    urgency_justified: [Y/N]
    emotional_arc_planned: [Y/N]
    if_any_no: "STOP — Complete missing design element"

  human_approval_verification:
    at_gate_2: [Y/N]
    approval_received: [Y/N]
    if_at_gate_2_and_no_approval: "STOP — Human approval is BLOCKING"

  rationalization_check:
    am_i_skipping_packages: [Y/N]
    am_i_allowing_consecutive_types: [Y/N]
    am_i_auto_approving: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT]
```

---

## STRUCTURAL FIX 6: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create:**

```
[project]/E0-email-strategist/
├── PROJECT-STATE.md
├── PROGRESS-LOG.md
├── checkpoints/
├── execution-log.md
├── campaign-blueprint.yaml     # PRIMARY OUTPUT
└── CAMPAIGN-BLUEPRINT-SUMMARY.md  # Human-readable handoff
```

---

## STRUCTURAL FIX 7: BINARY GATE ENFORCEMENT

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  "good enough" / "acceptable for now"
```

---

## STRUCTURAL FIX 8: STALE ARTIFACT CLEANUP

```
BEFORE writing campaign-blueprint.yaml:
  1. SEARCH for existing files at ALL possible locations
  2. DELETE stale artifacts from previous attempts
  3. LOG deletion in PROGRESS-LOG.md
  4. ONLY THEN write new output files
```

---

## STRUCTURAL FIX 9: ANTI-DEGRADATION MANDATORY READ

```
SESSION STARTUP:
  1. READ this file (EMAIL-STRATEGIST-ANTI-DEGRADATION.md) — MANDATORY
  2. READ EMAIL-STRATEGIST-AGENT.md
  3. IF resuming: READ PROJECT-STATE.md
  4. IF resuming: READ checkpoint files
  5. CREATE infrastructure if not exists
  6. ONLY THEN begin execution
```

---

## Per-Microskill Output Protocol

Every microskill execution MUST produce a dedicated output file.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-brief-parser | layer-0-outputs/0.2-brief-parser.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-goal-analyzer | layer-1-outputs/1.1-goal-analyzer.md | 3KB |
| 1 | 1.2-audience-profiler | layer-1-outputs/1.2-audience-profiler.md | 3KB |
| 1 | 1.3-asset-inventory | layer-1-outputs/1.3-asset-inventory.md | 3KB |
| 2 | 2.1-campaign-type-selector | layer-2-outputs/2.1-campaign-type-selector.md | 3KB |
| 2 | 2.2-sequence-blueprint | layer-2-outputs/2.2-sequence-blueprint.md | 5KB |
| 2 | 2.3-body-type-assignment | layer-2-outputs/2.3-body-type-assignment.md | 3KB |
| 2 | 2.4-emotional-arc-planner | layer-2-outputs/2.4-emotional-arc-planner.md | 3KB |
| 3 | 3.1-blueprint-validator | layer-3-outputs/3.1-blueprint-validator.md | 2KB |
| 3 | 3.2-output-packager | layer-3-outputs/3.2-output-packager.md | 5KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] EMAIL-STRATEGIST-ANTI-DEGRADATION.md read (THIS FILE)
[ ] EMAIL-STRATEGIST-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] PROGRESS-LOG.md created
[ ] checkpoints/ directory created

LAYER 0 (CONTEXT LOADING):
[ ] Mode determined (A or B)
[ ] Mode A: upstream packages loaded (5+ of 8)
[ ] Mode B: brief parsed and structured
[ ] Inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (CLASSIFICATION):
[ ] Campaign goal analyzed
[ ] Audience profiled
[ ] Content assets inventoried (5+ assets)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (DESIGN):
[ ] Campaign template loaded
[ ] Sequence designed email-by-email
[ ] Body types assigned (variety rules pass)
[ ] Emotional arc planned
[ ] BLUEPRINT presented to human (BLOCKING)
[ ] Human approval received
[ ] BLUEPRINT_APPROVED.yaml created
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (VALIDATION + OUTPUT):
[ ] Blueprint validated against structural rules
[ ] campaign-blueprint.yaml created
[ ] CAMPAIGN-BLUEPRINT-SUMMARY.md created
[ ] LAYER_3_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full timeline
[ ] All output files verified
```

---

## KEY INSIGHT

> **"The strategist designs the campaign. The writer writes the emails. If the blueprint is wrong, no amount of great writing saves it."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-21 | Initial creation — full structural enforcement |

---

**Status:** COMPLETE

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Automated Response | Human Escalation Threshold |
|-------------|-----------------|-------------------|---------------------------|
| Invalid mode selection | Mode A without upstream packages / Mode B without brief | HALT — validate mode prerequisites | Immediately |
| Campaign type mismatch | Selected type doesn't match objective | HALT — re-evaluate decision tree | After 2 re-evaluations |
| Body type monotony | Same body type assigned to > 40% of emails | HALT — redistribute per variety rules | If campaign requires intentional repetition |
| Missing HUMAN_SELECT gate | Proceeding without human strategy approval | HALT — present strategy for approval | Immediately |
| Incomplete emotional arc | Sequence missing emotional progression | HALT — map and fill arc gaps | Never — always completable |
