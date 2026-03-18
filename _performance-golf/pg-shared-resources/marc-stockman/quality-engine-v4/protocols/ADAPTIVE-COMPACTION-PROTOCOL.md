# Adaptive Compaction Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** 5-stage progressive context compression — extend session viability before mandatory session breaks through graceful degradation rather than abrupt cutoff
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

Generation sessions load increasing amounts of upstream context as the pipeline progresses. By late-pipeline stages, cumulative context can approach or exceed model limits. Without compaction, the only response is a hard session break — expensive in human labor and information loss.

Progressive reduction treats context as an engineering resource: each stage preserves less but never hits zero. The system degrades gracefully rather than cliff-falling from "full context" to "session break."

**Core principle:** Progressive degradation rather than abrupt cutoff.

---

## WHEN TO APPLY

Compaction triggers are based on a context zone system. Define zones appropriate to your model's context window. Example for a 200K-token model:

| Zone | Token Range | Compaction Stages Applied |
|------|-------------|--------------------------|
| **GREEN** | 0-60% capacity | None — full context. No compaction. |
| **YELLOW** | 60-75% capacity | Stage 1 |
| **ORANGE** | 75-90% capacity | Stages 1-2 |
| **RED** | 90-95% capacity | Stages 1-4 |
| **CRITICAL** | 95-100% capacity | Stages 1-5 (if still over budget) |

**Compaction is CUMULATIVE** — each stage adds to the previous. Stage 3 assumes Stages 1 and 2 are already applied.

**Compaction is AUTOMATIC** — when the context monitoring system detects a zone transition, it emits a compaction recommendation. The agent MUST apply the recommended stage before continuing.

---

## THE 5 COMPACTION STAGES

### Stage 1: Upstream Package Summarization

**Trigger:** YELLOW zone entry
**Estimated savings:** ~30-40% of upstream package tokens

**Action:** For upstream packages that have ALREADY been fully processed by input validation, replace with their summary equivalents. Keep ONLY the fields actively referenced by the current stage.

**What stays full (NEVER compress):**
- Strategic intelligence / context reservoir — already human-curated to minimal size
- Current stage's immediate upstream package — actively being consumed
- Campaign brief / master coordination document — small and universally referenced

**What gets summarized:**
- Research package -> executive summary + top entries only
- Evidence inventory -> Tier 1 items only (drop Tier 2-3)
- Prior stage packages already consumed -> summary versions
- Competition decision logs from completed stages -> winner + reasoning only

**Decision logic:**

```
IF token_zone >= YELLOW:
  FOR EACH upstream_package IN loaded_packages:
    IF current_stage does NOT directly consume this package:
      REPLACE with summary version
    ELIF current_stage.layer > 1 AND package was fully processed in input validation:
      REPLACE with summary version
    ELSE:
      KEEP full
```

### Stage 2: Prior Output Windowing

**Trigger:** ORANGE zone entry
**Estimated savings:** ~20-30% of prior output tokens

**Action:** For cascading output files (where each stage's output feeds the next), apply a "window" that preserves continuity at boundaries while dropping middle content from distant stages.

**Window rules:**
- **Immediately prior stage:** FULL text (for voice continuity and transition threading)
- **2 stages back:** Opening paragraph + closing paragraph
- **3 stages back:** Opening paragraph + closing paragraph
- **4+ stages back:** Opening sentence + closing sentence only

**Example at Stage 15 (5th generation stage):**

| Prior Output | Distance | What to Keep |
|-------------|----------|-------------|
| Stage 14 output | 1 back | FULL |
| Stage 13 output | 2 back | Opening paragraph + closing paragraph |
| Stage 12 output | 3 back | Opening paragraph + closing paragraph |
| Stage 11 output | 4 back | Opening sentence + closing sentence |

**Decision logic:**

```
IF token_zone >= ORANGE:
  sorted_outputs = sort_by_stage_number(loaded_output_files)
  FOR i, output IN enumerate(reversed(sorted_outputs)):
    IF i == 0:  # Immediately prior
      KEEP full
    ELIF i <= 2:  # 2-3 stages back
      KEEP first_paragraph(output) + last_paragraph(output)
      DROP middle paragraphs
    ELSE:  # 4+ stages back
      KEEP first_sentence(output) + last_sentence(output)
      DROP everything else
```

### Stage 3: Context Reservoir Triage

**Trigger:** RED zone entry
**Estimated savings:** ~15-20% of reservoir tokens

**Action:** Reduce context reservoir to highest-value elements. Strategic intelligence sections are NEVER compressed — that reasoning is irreplaceable.

**Triage rules:**

| Reservoir Section | After Triage | What Gets Cut |
|------------------|-------------|---------------|
| Audience quotes (raw data) | Top 10 entries | Lower-ranked entries by relevance |
| Evidence elements | Top 5 elements | Tier 2-3 elements |
| Language patterns | Top 3 patterns | Lower-frequency patterns |
| Strategic intelligence | ALL kept | NEVER compress |
| Expression anchoring | ALL kept | NEVER compress |
| Competition intelligence | ALL kept | NEVER compress |
| Core brief anchors | ALL kept | NEVER compress |

**Decision logic:**

```
IF token_zone >= RED:
  reservoir.audience_quotes = reservoir.audience_quotes[:10]
  reservoir.evidence_elements = reservoir.evidence_elements[:5]
  reservoir.language_patterns = reservoir.language_patterns[:3]
  # Strategic sections stay FULL — NEVER compress
```

### Stage 4: Execution History Pruning

**Trigger:** RED zone (continued, after Stage 3)
**Estimated savings:** ~10-15% of history tokens

**Action:** Drop completed execution logs and checkpoint content from active context. This data already exists as files — keeping it in context is redundant.

**What gets pruned:**
- Completed layer execution logs (all layers before current)
- Checkpoint content from completed layers
- Quality check records from completed stages
- Competition round summaries from prior rounds (full outputs already saved to files)

**What stays:**
- Current layer's execution log
- Current layer's checkpoint (in progress)
- Any pending quality check results

**Safety gate:** Before pruning any layer's history, VERIFY that all output files for that layer exist on disk. If any file is missing, DO NOT prune that layer — the context is the only remaining record.

### Stage 5: Emergency Micro-Reservoir (Last Resort)

**Trigger:** CRITICAL zone
**Estimated savings:** Reduces reservoir to ~1,500 tokens

**Action:** Replace the context reservoir with an emergency micro-version containing only the absolute essentials for generation:

```yaml
micro_reservoir:
  top_5_quotes:
    - "[quote 1]"
    - "[quote 2]"
    - "[quote 3]"
    - "[quote 4]"
    - "[quote 5]"

  central_thesis: "[1 sentence — the central argument]"

  mechanism:
    name: "[mechanism name]"
    statement: "[2-sentence mechanism description]"

  root_cause: "[1-sentence root cause expression]"

  counter_intuitive_core: "[2-sentence counter-intuitive truth]"

  # Total: ~1,500 tokens
```

**This stage should almost never fire.** If it does, a session break is STRONGLY recommended immediately after the current stage completes. Stage 5 is survival mode — the system can still generate, but quality will be noticeably degraded.

**If Stage 5 fires during a generation stage:**
- Complete the current micro-task ONLY
- Write session handoff document
- Recommend immediate session break
- The next session starts fresh with full context

---

## COMPACTION VERIFICATION CHECKLIST

After applying ANY compaction stage, verify:

```
[ ] Strategic intelligence / context reservoir Part 2 is INTACT
[ ] Current stage's immediate upstream package is INTACT
[ ] Immediately prior output file is INTACT (full text)
[ ] Campaign brief / master coordination document is INTACT
[ ] No data needed for the CURRENT task was compacted
[ ] Compaction stage noted in execution log
```

**IF ANY CHECK FAILS:** Undo the compaction for the affected component. Compaction must never remove data the current task actively needs.

---

## TIER-SPECIFIC COMPACTION RULES

| Tier | Stages Allowed | If Context Exceeds Allowed Stages |
|------|---------------|----------------------------------|
| **Full** | Stages 1-3 only | Stage 4-5 = mandatory session break instead |
| **Standard** | Stages 1-4 | Stage 5 = session break instead |
| **Quick** | All stages (1-5) | Maximize single-session coverage |

**Rationale:** Full tier prioritizes quality over efficiency — aggressive compaction (Stages 4-5) risks losing execution context that Full tier needs for complete verification. Quick tier prioritizes throughput and accepts the quality trade-off.

---

## INTEGRATION WITH CONTEXT MONITORING

The context monitoring system tracks cumulative token usage and classifies zones. Extend it to emit compaction recommendations at zone transitions.

**Compaction recommendation format:**

```json
{
  "type": "compaction_recommendation",
  "zone": "YELLOW",
  "stage": 1,
  "action": "Summarize upstream packages not directly consumed by current stage",
  "estimated_savings_tokens": 15000,
  "tier": "Standard",
  "max_allowed_stage": 4
}
```

**Integration points:**
- Context monitor detects zone transition -> emits compaction recommendation
- Agent receives recommendation
- Agent applies the recommended compaction stage
- Agent notes compaction in execution log
- Agent continues execution with reduced context

---

## SESSION IMPACT ESTIMATES

For a typical 20-stage pipeline with 6 sessions:

| Session | Stages | Before Compaction | After Stage 1-2 | Savings |
|---------|--------|------------------|-----------------|---------|
| 4 (Generation first half) | 10-13 | ~80-120K | ~65-95K | ~15-25K |
| 5 (Generation second half) | 14-17 | ~120-180K | ~85-130K | ~35-50K |
| 6 (Assembly/Editorial) | 18-20 | ~150-250K | ~100-170K | ~50-80K |

**Session 5 is the biggest beneficiary** — compaction can keep it below critical thresholds, eliminating costly zone transitions and preserving more context for actual generation work.
