# Adaptive Context Compaction Protocol

**Version:** 1.0
**Created:** 2026-03-11
**Source:** OpenDev Enhancement 4 (arXiv:2603.05344)
**Purpose:** Progressive context reduction mapped to the 5-zone system — extend session viability before mandatory session breaks

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [When to Apply](#when-to-apply)
- [The 5 Compaction Stages](#the-5-compaction-stages)
- [Compaction Verification Checklist](#compaction-verification-checklist)
- [Tier-Specific Compaction Rules](#tier-specific-compaction-rules)
- [Integration with Token Estimator](#integration-with-token-estimator)
- [Session Impact Estimates](#session-impact-estimates)

---

## WHY THIS EXISTS

Copy generation sessions (4-6) load increasing amounts of upstream context. By Session 5, cumulative context approaches 180K tokens on Sonnet. By Session 6, it can exceed 250K. Without compaction, the only response is a hard session break — expensive in human labor and information loss.

OpenDev's 5-stage progressive reduction treats context as an engineering resource: each stage preserves less but never hits zero. The system degrades gracefully rather than cliff-falling from "full context" to "session break."

**Core principle:** Progressive degradation rather than abrupt cutoff.

---

## WHEN TO APPLY

Compaction triggers are based on the context zone system (SYSTEM-CORE.md):

| Zone | Token Range | Compaction Stages Applied |
|------|-------------|--------------------------|
| **GREEN** | 0-150K | None — full context. No compaction. |
| **YELLOW** | 150K-200K | Stage 1 |
| **ORANGE** | 200K-500K | Stages 1-2 |
| **RED** | 500K-750K | Stages 1-4 |
| **CRITICAL** | 750K-1M | Stages 1-5 (if still over budget) |

**Compaction is CUMULATIVE** — each stage adds to the previous. Stage 3 assumes Stages 1 and 2 are already applied.

**Compaction is AUTOMATIC** — when the token estimator hook detects a zone transition, it emits a compaction recommendation. The agent MUST apply the recommended stage before continuing.

---

## THE 5 COMPACTION STAGES

### Stage 1: Upstream Package Summarization

**Trigger:** YELLOW zone entry (150K+)
**Estimated savings:** ~30-40% of upstream package tokens

**Action:** For upstream packages that have ALREADY been fully processed by Layer 0-1, replace with their Summary Handoff markdown equivalents. Keep ONLY the fields actively referenced by the current skill.

**What stays full (NEVER compress):**
- Context reservoir — it's already human-curated to minimal size
- Current skill's immediate upstream package — actively being consumed
- Campaign brief — small (~2-3KB) and universally referenced

**What gets summarized:**
- Research package → executive summary + top quotes only
- Proof inventory → Tier 1 blocks only (drop Tier 2-3 elements)
- Prior skill packages already consumed → summary handoff versions
- Arena decision logs from completed skills → winner + reasoning only

**Decision logic:**

```
IF token_zone >= YELLOW:
  FOR EACH upstream_package IN loaded_packages:
    IF current_skill does NOT directly consume this package:
      REPLACE with summary_handoff version
    ELIF current_skill.layer > 1 AND package was fully processed in Layer 0:
      REPLACE with summary_handoff version
    ELSE:
      KEEP full
```

### Stage 2: Prior Prose Windowing

**Trigger:** ORANGE zone entry (200K+)
**Estimated savings:** ~20-30% of prior prose tokens

**Action:** For cascading prose files, apply a "window" that preserves voice continuity at section boundaries while dropping middle content from distant sections.

**Window rules:**
- **Immediately prior section:** FULL text (for voice continuity and transition threading)
- **2 sections back:** Opening paragraph + closing paragraph
- **3+ sections back:** Opening paragraph + closing paragraph
- **4+ sections back (if 5+ prior files exist):** Opening sentence + closing sentence only

**Example at Skill 15 (Product Introduction):**

| Prior Prose File | Distance | What to Keep |
|-----------------|----------|-------------|
| Skill 14 (Mechanism Narrative) | 1 back | FULL |
| Skill 13 (Root Cause Narrative) | 2 back | Opening ¶ + closing ¶ |
| Skill 12 (Story) | 3 back | Opening ¶ + closing ¶ |
| Skill 11 (Lead) | 4 back | Opening sentence + closing sentence |

**Decision logic:**

```
IF token_zone >= ORANGE:
  sorted_prose = sort_by_skill_number(loaded_prose_files)
  FOR i, prose IN enumerate(reversed(sorted_prose)):
    IF i == 0:  # Immediately prior
      KEEP full
    ELIF i <= 2:  # 2-3 sections back
      KEEP first_paragraph(prose) + last_paragraph(prose)
      DROP middle paragraphs
    ELSE:  # 4+ sections back
      KEEP first_sentence(prose) + last_sentence(prose)
      DROP everything else
```

### Stage 3: Context Reservoir Triage

**Trigger:** RED zone entry (500K+)
**Estimated savings:** ~15-20% of reservoir tokens

**Action:** Reduce context reservoir to highest-value elements. Part 2 (Strategic Intelligence) is NEVER compressed — that reasoning is irreplaceable.

**Triage rules:**

| Reservoir Section | Full Size | After Triage | What Gets Cut |
|------------------|-----------|-------------|---------------|
| VOC Quotes (Part 1.1) | 25-40 quotes | Top 10 quotes | Lower-ranked quotes by resonance |
| Proof Elements (Part 1.2) | 10-15 elements | Top 5 elements | Tier 2-3 elements, authority proof trimmed to 1 |
| Language Patterns (Part 1.3) | 5-8 patterns | Top 3 patterns | Lower-frequency patterns |
| FSSIT Intelligence (Part 2.1) | 5-8 candidates | ALL kept | — |
| Expectation Schema (Part 2.2) | Full | ALL kept | — |
| Expression Anchoring (Part 2.3) | Full | ALL kept | — |
| Arena Intelligence (Part 2.4) | Full | ALL kept | — |
| Counter-Intuitive Core (Part 2.5) | Full | ALL kept | — |
| Campaign Brief Anchors (Part 2.6) | Full | ALL kept | — |

**Decision logic:**

```
IF token_zone >= RED:
  reservoir.voc_quotes = reservoir.voc_quotes[:10]    # Keep top 10 by resonance
  reservoir.proof_elements = reservoir.proof_elements[:5]  # Keep top 5 by strength
  reservoir.language_patterns = reservoir.language_patterns[:3]  # Keep top 3 by frequency
  # Part 2 stays FULL — NEVER compress strategic intelligence
```

### Stage 4: Execution History Pruning

**Trigger:** RED zone (continued, after Stage 3)
**Estimated savings:** ~10-15% of history tokens

**Action:** Drop completed microskill execution logs and checkpoint YAML content from active context. This data already exists as files — keeping it in context is redundant.

**What gets pruned:**
- Completed layer execution logs (Layers 0 through current_layer - 1)
- Checkpoint YAML content from completed layers
- MC-CHECK records from completed microskills
- Arena round summaries from prior rounds (full outputs already in files)

**What stays:**
- Current layer's execution log
- Current layer's checkpoint (in progress)
- Any pending MC-CHECK results

**Decision logic:**

```
IF token_zone >= RED:
  FOR EACH completed_layer IN [0, 1, ..., current_layer - 1]:
    VERIFY layer outputs exist as files (do NOT prune if files are missing)
    DROP layer execution log from active context
    DROP layer checkpoint YAML from active context
    DROP MC-CHECK records from that layer
```

**Safety gate:** Before pruning any layer's history, VERIFY that all output files for that layer exist on disk. If any file is missing, DO NOT prune that layer — the context is the only remaining record.

### Stage 5: Emergency Micro-Reservoir (Last Resort)

**Trigger:** CRITICAL zone (750K+)
**Estimated savings:** Reduces reservoir to ~1,500 tokens (from ~5,000-8,000)

**Action:** Replace the context reservoir with an emergency micro-version containing only the absolute essentials for copy generation:

```yaml
micro_reservoir:
  top_5_quotes:
    # The 5 highest-resonance VOC quotes
    - "[quote 1]"
    - "[quote 2]"
    - "[quote 3]"
    - "[quote 4]"
    - "[quote 5]"

  campaign_thesis: "[1 sentence — the central argument]"

  mechanism:
    name: "[mechanism name]"
    statement: "[2-sentence mechanism description]"

  root_cause: "[1-sentence root cause expression]"

  counter_intuitive_core: "[2-sentence counter-intuitive truth]"

  # Total: ~1,500 tokens
```

**This stage should almost never fire.** If it does, a session break is STRONGLY recommended immediately after the current skill completes. Stage 5 is survival mode — the system can still generate, but quality will be noticeably degraded.

**If Stage 5 fires and the current skill is a copy generation skill (10-17):**
- Complete the current microskill ONLY
- Write SESSION-HANDOFF.md
- Recommend immediate session break
- The next session starts fresh with full context

---

## COMPACTION VERIFICATION CHECKLIST

After applying ANY compaction stage, verify:

```
[ ] Context reservoir Part 2 (Strategic Intelligence) is INTACT
[ ] Current skill's immediate upstream package is INTACT
[ ] Immediately prior prose file is INTACT (full text)
[ ] Campaign brief is INTACT
[ ] No data needed for the CURRENT microskill was compacted
[ ] Compaction stage noted in execution-log.md
```

**IF ANY CHECK FAILS:** Undo the compaction for the affected component. Compaction must never remove data the current microskill actively needs.

---

## TIER-SPECIFIC COMPACTION RULES

| Tier | Stages Allowed | If Context Exceeds Allowed Stages |
|------|---------------|----------------------------------|
| **Full** | Stages 1-3 only | Stage 4-5 = mandatory session break instead |
| **Standard** | Stages 1-4 | Stage 5 = session break instead |
| **Quick** | All stages (1-5) | Maximize single-session coverage |

**Rationale:** Full tier prioritizes quality over efficiency — aggressive compaction (Stages 4-5) risks losing execution context that Full tier needs for complete verification. Quick tier prioritizes throughput and accepts the quality trade-off.

---

## INTEGRATION WITH TOKEN ESTIMATOR

The `token_estimator.py` hook already tracks cumulative context and classifies zones. Extend to emit compaction recommendations at zone transitions.

**Compaction recommendation format:**

```json
{
  "type": "compaction_recommendation",
  "zone": "YELLOW",
  "stage": 1,
  "action": "Summarize upstream packages not directly consumed by current skill",
  "estimated_savings_tokens": 15000,
  "tier": "Standard",
  "max_allowed_stage": 4
}
```

**Hook integration points:**
- `token_estimator.py` detects zone transition → emits compaction recommendation
- Agent receives recommendation in PostToolUse feedback
- Agent applies the recommended compaction stage
- Agent notes compaction in execution-log.md
- Agent continues execution with reduced context

---

## SESSION IMPACT ESTIMATES

| Session | Skills | Before Compaction | After Stage 1-2 | Savings | Zone After |
|---------|--------|------------------|-----------------|---------|-----------|
| 4 (Copy first half) | 10-13 | ~80-120K | ~65-95K | ~15-25K | GREEN |
| 5 (Copy second half) | 14-17 | ~120-180K | ~85-130K | ~35-50K | GREEN→YELLOW |
| 6 (Assembly/Editorial) | 18-20 | ~150-250K | ~100-170K | ~50-80K | YELLOW→ORANGE |

**Session 5 is the biggest beneficiary** — compaction can keep it in GREEN zone on Sonnet, eliminating the YELLOW→ORANGE transition entirely. This means:
- No cost boundary warnings
- No doubled MC-CHECK frequency
- No synthesis-from-memory risk from context pressure
- More available context for the actual generation work

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-11 | Initial creation. 5-stage progressive compaction mapped to marketing-os zone system. From OpenDev Enhancement 4. |
