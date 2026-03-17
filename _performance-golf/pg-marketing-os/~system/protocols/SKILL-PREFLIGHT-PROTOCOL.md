# Skill Pre-Flight Planning Protocol

**Version:** 1.0
**Created:** 2026-03-11
**Source:** OpenDev Enhancement 6 — Dual-Agent Planning/Execution Separation (arXiv:2603.05344)
**Purpose:** Distill upstream context into a focused Execution Brief before copy generation, reducing executor context load by 30-50%

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [When to Use](#when-to-use)
- [The Pre-Flight Subagent](#the-pre-flight-subagent)
- [Execution Brief Template](#execution-brief-template)
- [How the Executor Uses the Brief](#how-the-executor-uses-the-brief)
- [Pre-Flight Output Validation](#pre-flight-output-validation)
- [Fallback: No Pre-Flight](#fallback-no-pre-flight)
- [Cost-Benefit Analysis](#cost-benefit-analysis)

---

## WHY THIS EXISTS

By Skill 15-16, the copy generation model loads 8+ upstream packages plus the context reservoir plus 5+ prior prose files. The model spends ~20% of its context budget just ingesting material before it generates anything. Much of this ingested material is not directly relevant to the current section.

OpenDev's dual-mode operation separates planning (read-only analysis) from execution (read-write generation). A Planner subagent reads everything and produces a focused brief; the Executor generates from the brief instead of raw upstream packages.

**Core principle:** Planning and execution are different cognitive tasks that benefit from different toolsets and reasoning modes.

---

## WHEN TO USE

### Pre-flight planning RUNS for:

- **Copy generation skills (10-17)** — where upstream context is large and growing
- **Skills loading 4+ upstream packages** — complexity warrants distillation
- **Sessions in YELLOW zone or above** — context pressure makes distillation critical
- **Full and Standard tiers** — where quality justifies the planning overhead

### Pre-flight planning is SKIPPED for:

- **Foundation skills (00-09)** — upstream context is small, no distillation needed
- **Quick tier** — skip pre-flight to save time, accept quality trade-off
- **Skills loading fewer than 4 upstream packages** — not enough complexity to justify
- **Skills 18-20 (Assembly/Editorial)** — these need full raw access to all prose files

### Layer Position

Pre-flight runs as **Layer 0.5** — after Layer 0 (upstream loading and validation) but before Layer 1 (classification/analysis):

```
Layer 0:   Load upstream packages, validate all inputs present
            ↓
Layer 0.5: Pre-Flight Planning (optional — runs if criteria met)
            ↓
Layer 1:   Classification/Analysis using Execution Brief
            ↓
Layer 2:   Generation/Drafting
```

---

## THE PRE-FLIGHT SUBAGENT

### Role

Read all upstream packages, context reservoir, and prior prose. Produce an "Execution Brief" that distills what matters most for THIS specific skill.

### Model

**Haiku 4.5** — Planning cognitive role (see MODEL-ROUTING.md). Pre-flight is analytical distillation, not creative generation. Haiku's speed and cost make it ideal.

### Tools Allowed

```
ALLOWED:  Read, Glob, Grep
DENIED:   Write, Edit, Bash, WebSearch, WebFetch, Task
```

**The planner READS. The executor WRITES.** This separation prevents the planner from accidentally producing output files that bypass the generation pipeline.

**Exception:** The planner writes ONE file — the Execution Brief itself. This is its sole output.

### Subagent Prompt Template

```markdown
You are a Pre-Flight Planner for marketing-os Skill [XX] ([SKILL_NAME]).

Your job: Read all upstream context and produce an Execution Brief that tells
the copy generator exactly what to focus on for this section.

## Read These Files (in order):

1. [skill-path]/SKILL.md — understand what this skill produces
2. Campaign brief: ~outputs/[project]/09-campaign-brief/campaign-brief-package.json
3. Context reservoir: ~outputs/[project]/context-reservoir.md
4. Prior assembled prose (ALL prior sections):
   [list all prior prose file paths]
5. Upstream packages (ALL consumed packages):
   [list all upstream package file paths]
6. Current skill's ANTI-DEGRADATION.md

## Produce an Execution Brief with these 6 sections:

### 1. Section Mission (2-3 sentences)
What this section must accomplish within the larger promotion.
What the reader has already experienced (from prior prose).
What emotional state they should be in when this section ends.

### 2. Top 5 Proof Elements for This Section
From the proof inventory and context reservoir, identify the 5 most
relevant proof elements for THIS section specifically. Include:
- Full proof statement (not just the name)
- Why it's relevant to THIS section (not to the promotion generally)
- Recommended deployment (inline narrative, standalone block, transitional evidence)

### 3. Voice Anchors (5-8 quotes)
From the context reservoir VOC quotes, select the 5-8 most relevant
for this section's emotional territory. These are the voice targets.
Include exact quote text and source attribution.

### 4. Threading Requirements
- Mechanism name: must appear [N] times naturally in this section
- Root cause anchor: how to reference it in this section context
- Prior section callbacks: specific threads from prior sections to continue
- Campaign thesis: how it manifests in this section

### 5. Danger Zones
- What this section type commonly gets wrong (from ANTI-DEGRADATION.md)
- Which FSSIT candidates are most relevant here
- Which staleness zones to avoid (from expectation schema)
- Voice drift risks specific to this section

### 6. Token Budget Recommendation
Based on the upstream context size, recommend:
- Which upstream packages can be loaded by the executor in summary form
- Which MUST be loaded in full (for the executor to generate from)
- Estimated total token load for the executor

Write the Execution Brief to:
~outputs/[project]/[skill-id]-[skill-name]/preflight-brief.md
```

---

## EXECUTION BRIEF TEMPLATE

The Execution Brief follows this structure:

```markdown
# Execution Brief — Skill [XX]: [SKILL_NAME]

**Generated:** [timestamp]
**Project:** [project-name]
**Planner Model:** Haiku 4.5

---

## 1. Section Mission

[2-3 sentences: what this section must accomplish, what the reader has
experienced, target emotional state at section end]

---

## 2. Top 5 Proof Elements

| # | Proof Element | Type | Relevance to This Section | Recommended Deployment |
|---|--------------|------|--------------------------|----------------------|
| 1 | [full statement] | [study/testimonial/etc.] | [why HERE] | [inline/block/transitional] |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... |

---

## 3. Voice Anchors

| # | Quote | Source | Emotional Territory |
|---|-------|--------|-------------------|
| 1 | "[exact quote]" | [source] | [what emotion this captures] |
| 2 | ... | ... | ... |
| ... (5-8 total) | ... | ... | ... |

---

## 4. Threading Requirements

- **Mechanism name:** [name] — target [N] natural appearances
- **Root cause anchor:** [how to reference in this section]
- **Prior section callbacks:**
  - From [prior section]: [specific thread to continue]
  - From [prior section]: [specific thread to continue]
- **Campaign thesis manifestation:** [how thesis shows up here]

---

## 5. Danger Zones

- **Common failure for this section type:** [from ANTI-DEGRADATION.md]
- **Relevant FSSIT candidates:** [list with scores]
- **Staleness zones to avoid:** [from expectation schema]
- **Voice drift risk:** [specific risk for this section]

---

## 6. Token Budget Recommendation

| Upstream Package | Load Mode | Tokens (est.) | Reason |
|-----------------|-----------|--------------|--------|
| Context reservoir | FULL | ~5,000 | Always full — human-curated, irreplaceable |
| Immediately prior prose | FULL | ~3,000-8,000 | Voice continuity requires full text |
| [package name] | SUMMARY | ~500 | Already consumed in Layer 0, not needed for generation |
| [package name] | FULL | ~2,000 | Contains data directly referenced in this section |
| ... | ... | ... | ... |

**Estimated executor context load:** ~[N]K tokens
**Estimated savings vs. loading all raw packages:** ~[N]K tokens ([X]% reduction)
```

---

## HOW THE EXECUTOR USES THE BRIEF

The copy generation model (Sonnet 4.5) receives:

1. **The Execution Brief** (~3-5KB) — focused, section-specific intelligence
2. **Full text of immediately prior prose** — for voice continuity
3. **Context reservoir** (full — NEVER compressed for the executor)
4. **Current skill spec + microskill specs** — generation instructions
5. **Campaign brief** (full — small, universally referenced)

**The executor does NOT load raw upstream packages if the Pre-Flight Brief covers them.** The Brief replaces:
- Research package → Brief's proof elements + voice anchors
- Prior handoff packages → Brief's threading requirements
- FSSIT output → Brief's danger zones
- Arena decision logs → Brief's section mission context

**What the Brief CANNOT replace (executor still loads these):**
- Context reservoir — irreplaceable, always loaded full
- Immediately prior prose — needed for voice continuity
- Current skill SKILL.md and microskill specs — generation instructions
- Campaign brief — universally referenced

---

## PRE-FLIGHT OUTPUT VALIDATION

The Execution Brief must pass these checks before the executor proceeds:

```
[ ] All 6 sections present (Mission, Proof, Voice, Threading, Danger, Budget)
[ ] At least 5 proof elements with full statements (not just names)
[ ] At least 5 VOC quotes with exact text (not paraphrased)
[ ] Mechanism name appears in Threading Requirements
[ ] At least 2 danger zones identified
[ ] Token budget recommendation present with per-package breakdown
```

**IF ANY SECTION IS MISSING:** The executor loads raw upstream packages instead (fallback mode). A partial Brief is worse than no Brief — it creates false confidence about coverage.

---

## FALLBACK: NO PRE-FLIGHT

If pre-flight is skipped (Quick tier, few upstream packages, foundation skills), the executor loads raw upstream packages directly as it does today. No changes to the existing pipeline.

Pre-flight is an OPTIMIZATION, not a requirement. The pipeline functions identically without it — just with higher context load for the executor.

---

## COST-BENEFIT ANALYSIS

| Metric | Without Pre-Flight | With Pre-Flight |
|--------|-------------------|-----------------|
| Executor context load | ~80-120K | ~40-70K |
| Time to first generation | Faster (no planning phase) | +2-3 min (Haiku planning subagent) |
| Generation quality | Good (executor may miss key proof) | Better (proof pre-selected for relevance) |
| Session break risk | Higher (fills context faster) | Lower (executor context is smaller) |
| Cost per skill | Lower (no planner call) | Slightly higher (+Haiku call, but Haiku is cheap) |

**Pre-flight is most valuable for Skills 14-17** where upstream context is largest and the cascading prose pattern has accumulated the most prior sections.

| Skill | Upstream Packages | Prior Prose Files | Pre-Flight Value |
|-------|------------------|-------------------|-----------------|
| 10 (Headlines) | 3-4 | 0 | Low — few packages |
| 11 (Lead) | 4-5 | 0 | Medium — moderate packages |
| 12 (Story) | 5 | 1 | Medium |
| 13 (Root Cause Narrative) | 5 | 2 | Medium-High |
| 14 (Mechanism Narrative) | 6 | 3 | **High** |
| 15 (Product Introduction) | 6 | 4 | **High** |
| 16 (Offer Copy) | 7 | 5 | **Very High** |
| 17 (Close) | 7 | 6 | **Very High** |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-11 | Initial creation. Pre-Flight Planning with Haiku subagent, Execution Brief template, validation checklist, fallback mode. From OpenDev Enhancement 6. |
