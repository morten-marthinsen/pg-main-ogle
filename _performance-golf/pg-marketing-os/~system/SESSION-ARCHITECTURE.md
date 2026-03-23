# Session Architecture & Model Assignment

**Version:** 1.1
**Created:** 2026-03-06
**Updated:** 2026-03-12
**Purpose:** Define how the pipeline splits across sessions and which model runs each phase

---

## TABLE OF CONTENTS

- [Model Split](#model-split)
- [Session Groups](#session-groups)
- [Context Loading by Session](#context-loading-by-session)
- [Session Transitions](#session-transitions)
- [Tier-Adjusted Session Architecture](#tier-adjusted-session-architecture)
- [Future State](#future-state)

---

## MODEL SPLIT

**Full model routing specification:** `~system/MODEL-ROUTING.md` — defines 6 cognitive roles (Strategy, Generation, Critique, Validation, Planning, Visual) with per-layer, per-skill, and per-Arena-role model assignments.

The summary below covers the primary session-level model split. For per-layer and per-subagent routing, see MODEL-ROUTING.md.

### Opus 4.6 — Strategy & Foundation (Skills 00-09)

**Context Window:** 200K tokens
**Strengths:** Deep reasoning, analytical precision, strategic synthesis
**Use For:**
- Research analysis and quote classification (Skill 01)
- Proof inventory scoring and gap analysis (Skill 02)
- Root cause arena — reframe selection, expression anchoring (Skill 03)
- Mechanism arena — E-level classification, scorecard evaluation (Skill 04)
- Big Idea generation — RSF scoring, schema distance calculation (Skill 05)
- Offer architecture (Skill 06)
- Persona development (Skill 07)
- Structure engineering (Skill 08)
- Campaign brief synthesis (Skill 09)

**Why Opus:** Foundation skills require deep analytical reasoning — scoring 7 mechanism candidates across 9 dimensions, calculating expectation schema staleness, evaluating FSSIT resonance. These are REASONING tasks, not generation tasks. Opus's analytical depth produces better strategic outputs.

### Sonnet 4.5 — Copy Generation (Skills 10-20)

**Context Window:** 1M tokens
**Strengths:** Fluid writing, large context capacity, fast generation
**Use For:**
- Headline engineering (Skill 10)
- Lead writing (Skill 11)
- Story writing (Skill 12)
- Root cause narrative (Skill 13)
- Mechanism narrative (Skill 14)
- Product introduction (Skill 15)
- Offer copy (Skill 16)
- Close writing (Skill 17)
- Proof weaving (Skill 18)
- Campaign assembly (Skill 19)
- Editorial (Skill 20)

**Why Sonnet:** Copy generation benefits from the 1M context window. With Sonnet, you can load ALL upstream packages + the context reservoir + all prior section prose + the full skill instruction set — everything fits. No compression needed. The writer sees EVERYTHING.

### Either Model — Branch Engines

For Ads (A01-A12), Email (E0-E4), Organic (S01-S24), and Upsell (U0-U5):
- Use **Sonnet** for generation-heavy tasks (writing ad copy, email sequences)
- Use **Opus** for strategic tasks (audience segmentation, campaign planning)
- Default to Sonnet unless the task is primarily analytical

---

## SESSION GROUPS

### Session 1: Research & Analysis
**Model:** Opus 4.6
**Skills:** 01 (Research)
**Duration:** Single session — research is self-contained
**Outputs:** research-package.json, classified-quotes.json, story-elements-research.md
**Human Checkpoint:** Review research completeness before proceeding

### Session 2: Strategic Foundation
**Model:** Opus 4.6
**Skills:** 02 (Proof Inventory), 03 (Root Cause), 04 (Mechanism), 05 (Promise/Big Idea)
**Load:** Research outputs from Session 1
**Outputs:** proof-inventory-output.json, root-cause-package.yaml, mechanism-package.json, promise-package.json, all reasoning captures
**Human Checkpoints:**
- After Skill 03: Review root cause selection + villain
- After Skill 04: Review mechanism winner + analogy
- After Skill 05: Review Big Idea / promise

### Session 3: Architecture & Brief
**Model:** Opus 4.6
**Skills:** 06 (Offer), 07 (Persona), 08 (Structure), 09 (Campaign Brief)
**Load:** All outputs from Sessions 1-2
**Outputs:** offer-package.json, persona-package.json, structure-package.json, campaign-brief-package.json
**Human Checkpoint:** Review campaign brief — this is the LAST strategic checkpoint before copy generation

### Between Sessions 3 and 4: CREATE CONTEXT RESERVOIR
**Model:** Opus 4.6 (with extended thinking)
**Action:** Build the context reservoir from all foundation outputs + reasoning captures
**Output:** context-reservoir.md
**Human Review:** Operator reviews and curates the reservoir — this is the most important human touchpoint in the entire pipeline

### Session 4: Copy Generation — First Half
**Model:** Sonnet 4.5 (1M context)
**Skills:** 10 (Headline), 11 (Lead), 12 (Story), 13 (Root Cause Narrative)
**Load:** All upstream packages + context reservoir + prior section prose (cascading)
**Outputs:** headline-package.json, lead-package.json + prose, story-package.json + prose, root-cause-narrative-package.json + prose
**Human Checkpoints:**
- After Skill 10: Review headline candidates
- After Skill 12: Review story draft
**Recitation:** After Skill 12 — MIDPOINT active recitation (Standard + Full tiers). Write `recitation-midpoint.md` with 5 strategic anchors verbatim from source packages. Drift check required before Skill 13.

### Between Sessions 4 and 5: FOUNDATION INTEGRITY CHECK
**Model:** Any (fresh context, ~20KB)
**Action:** Run Foundation Integrity Check — scoped verification comparing Foundation packages against actual prose from Skills 10-13
**Output:** `foundation-integrity-report.yaml`
**Human Review:** If any FLAG, human decides: proceed, adjust Context Reservoir, or revise Foundation packages
**Tier:** Full and Standard — mandatory. Quick — skipped.
**Protocol:** `~system/protocols/FOUNDATION-INTEGRITY-CHECK.md`

### Session 5: Copy Generation — Second Half
**Model:** Sonnet 4.5 (1M context)
**Skills:** 14 (Mechanism Narrative), 15 (Product Introduction), 16 (Offer Copy), 17 (Close)
**Load:** All upstream packages + context reservoir + ALL prior section prose from Session 4
**Outputs:** mechanism-narrative-package.json + prose, product-intro-package.json + prose, offer-copy-package.json + prose, close-package.json + prose
**Human Checkpoint:** Review full draft after Skill 17
**Recitation:** After Skill 15 — 75% active recitation (Full tier only). Write `recitation-75pct.md` with 5 strategic anchors. Drift check required before Skill 16.

### Session 6: Assembly & Editorial
**Model:** Sonnet 4.5 (1M context)
**Skills:** 18 (Proof Weaving), 19 (Campaign Assembly), 20 (Editorial)
**Load:** ALL section packages + ALL prose files + context reservoir
**Outputs:** assembled-draft.md, editorial-report.json, final draft
**Human Checkpoint:** Final editorial review — the assembled draft goes to human for final approval
**Pre-Assembly verification:** Before Skill 19, run Layer 2 scoped verification (VP-4) checking voice consistency, argument coherence, and proof integration across all prose files (Full tier only).

**Fresh Context for Editorial:** Where possible, run Skill 20 (Editorial) in a NEW session rather than the same session that ran Skills 18-19. Load: the assembled draft, the Campaign Brief, the Context Reservoir, and Soul.md. Do NOT load the generation session's conversation history. A fresh editorial context catches problems that an in-session editorial misses because it hasn't inherited the generation session's assumptions. (Source: Agents of Chaos — cross-agent propagation finding, Mastermind Rec 7)

**Tier guidance for editorial isolation:**
- **Full:** Mandatory — run Skill 20 in a separate fresh session
- **Standard:** Recommended — run in a separate session when practical
- **Quick:** Optional — in-session editorial is acceptable

---

## CONTEXT LOADING BY SESSION

### What Each Session Loads

| Session | Upstream Packages | Context Reservoir | Prior Prose | Est. Token Load | Zone |
|---------|------------------|-------------------|-------------|-----------------|------|
| 1 | None | No | No | ~5K (skill instructions only) | GREEN |
| 2 | Research outputs | No | No | ~15-25K | GREEN |
| 3 | Sessions 1-2 outputs | No | No | ~30-45K | GREEN |
| Reservoir | All foundation outputs | Creating it | No | ~50-65K | GREEN |
| 4 | Foundation packages | Yes | Cascading | ~80-120K | GREEN |
| 5 | Foundation + Session 4 | Yes | All from Session 4 | ~120-180K | GREEN→YELLOW |
| 6 | Everything | Yes | Everything | ~150-250K | YELLOW→ORANGE |

**Zone interpretation:** Sessions 1-4 stay comfortably in GREEN. Session 5 may enter YELLOW (150K+ triggers cost awareness). Session 6 may enter ORANGE (200K+ on Opus means premium pricing or switch to Sonnet). All copy sessions run on Sonnet (1M window), so capacity is not a concern — but cost zones still apply.

**Token estimator hook** tracks actual usage and provides real-time zone alerts. The estimates above are baselines — actual loads vary by project complexity and upstream package sizes.

**Adaptive Compaction:** When context pressure rises, apply progressive compaction per `~system/protocols/ADAPTIVE-COMPACTION-PROTOCOL.md`. Stage 1-2 compaction can keep Session 5 in GREEN zone (saving ~35-50K tokens). Session 6 benefits from ~50-80K savings.

**Pre-Flight Planning:** For Skills 14-17 (where upstream context is largest), use the Pre-Flight Planning subagent per `~system/protocols/SKILL-PREFLIGHT-PROTOCOL.md` to distill upstream packages into a focused Execution Brief. Reduces executor context load by 30-50%. For Skills 10-13, Dynamic Context Framing provides section-specific reservoir reordering without compression.

### The Cascading Prose Pattern

In Sessions 4-5, each skill loads the prose from its immediate predecessor:
```
Skill 11 (Lead) → writes lead prose → saves lead-assembled-prose.md
Skill 12 (Story) → loads lead prose → writes story prose → saves story-assembled-prose.md
Skill 13 (Root Cause) → loads story prose → writes RC prose → saves rc-assembled-prose.md
Skill 14 (Mechanism) → loads RC prose → writes mech prose → saves mech-assembled-prose.md
... and so on
```

This ensures each section reads what came before and maintains voice continuity.

---

## SESSION TRANSITIONS

### What Travels Between Sessions

Between any two sessions, the following persist via the output folder:
1. **Structured packages** (`.json` / `.yaml`) — metadata, scores, handoff data
2. **Assembled prose** (`.md`) — actual written copy
3. **Context reservoir** (`context-reservoir.md`) — curated analytical intelligence
4. **Reasoning captures** (`reasoning-captures/`) — selection rationale
5. **Issue log** (`~outputs/issue-log.md`) — cumulative incident record across all sessions
6. **Learning log** — captured learnings with L-level classification (L1-L6)

### What Does NOT Travel

- The full conversation context (session memory)
- Extended thinking chains
- Intermediate drafts that were revised within a session
- Real-time human feedback given during a session

This is why the context reservoir matters: it captures the REASONING that would otherwise be lost when sessions end.

### Cross-Session Learning Accumulation

The issue log and learning log accumulate across all sessions in a campaign. At session start, check `~outputs/issue-log.md` for:
- **Same-class patterns** (2+ incidents of the same class in the last 10 entries) — these signal systemic problems that need protocol-level fixes, not just one-off corrections
- **Skill-specific issues** — if the skill you're about to execute has prior issues logged, load those entries and address them proactively
- **Context-loss incidents** — if prior sessions logged compaction or context loss, be extra vigilant about re-reading upstream packages

**Full protocol:** `~system/protocols/SELF-LEARNING-PROMOTION-PROTOCOL.md`

### Compaction Detection

The token estimator hook monitors for **context compression artifacts** across Read operations. When a file returns >30% less content than a previous read (files >1KB), the system alerts:

```
COMPACTION DETECTED: [filename] returned X% less content than previous read.
```

**Response protocol:**
1. Save a milestone checkpoint of current state
2. Re-read critical upstream packages to verify accessibility
3. Verify context reservoir integrity (Part 2 is NEVER compressed)
4. If in ORANGE zone or above, recommend session break

**Automated detector:** `.hooks/validators/token_estimator.py --record-read`

### Session Start Protocol

At the start of each session:
1. Load the skill instruction file(s) for the session's skills
2. Load all required upstream packages per the upstream loader
3. Load the context reservoir (Sessions 4+)
4. Load prior section prose (Sessions 4+)
5. Check `~outputs/issue-log.md` for prior issues affecting current skills
6. Confirm all required inputs are present before generating

---

## TIER-ADJUSTED SESSION ARCHITECTURE

The session architecture adapts based on the declared effort tier (see `~system/protocols/TASK-TRIAGE-PROTOCOL.md`).

### Full Tier (6-7 Sessions)

Uses the standard 6-session architecture documented above, plus an optional 7th session for extended editorial or additional Arena rounds.

### Standard Tier (4-5 Sessions — DEFAULT)

| Session | Skills | Notes |
|---------|--------|-------|
| 1 | 01 (Research) | Same as Full |
| 2 | 02 → 05 + 06 → 09 | Foundation + Architecture combined into one session |
| Context Reservoir | Build context reservoir | Same as Full |
| 3 | 10 → 13 | Copy first half — Arena reduced to 1 round, 3 competitors |
| 4 | 14 → 17 | Copy second half |
| 5 | 18 → 19 → 20 | Assembly + editorial |

### Quick Tier (2-3 Sessions)

| Session | Skills | Notes |
|---------|--------|-------|
| 1 | 01 → 09 | All foundation in one session (compressed, no Arena) |
| 2 | 10 → 17 | All copy generation (direct generation, no Arena) |
| 3 | 18 → 20 | Assembly + editorial (optional — can combine with Session 2) |

**No context reservoir for Quick tier** — foundation packages feed directly into copy skills within the same extended session.

---

## FUTURE STATE

### When Context Windows Expand Further

As model context windows grow (2M, 5M, 10M), the session architecture can simplify:

**Near-term (1-2M tokens):** Sessions 4-5 could merge into a single session. All copy generation (Skills 10-17) runs sequentially in one context, with the model seeing everything it's written so far.

**Medium-term (5M+ tokens):** The entire pipeline (Skills 00-20) could run in a single session. No session boundaries, no information loss, no context reservoir needed. The model maintains full context from research through final editorial.

**The context reservoir is designed to be obsoleted.** When context windows are large enough to hold everything, the reservoir becomes unnecessary — its contents would simply be in the active context. Until then, it bridges the gap.

### Campaign-Level Learning Extraction

After completing a full campaign (all 6 sessions), the issue log and learning log contain a complete record of every incident and learning across the pipeline. This data feeds three improvement cycles:

1. **Immediate fixes** (J1 learnings, L1-L2): Judgment-free corrections that can be tested and promoted directly via `~system/protocols/SELF-LEARNING-PROMOTION-PROTOCOL.md`
2. **Taste validation** (J2 learnings): Human-reviewed changes to voice, expression patterns, or copy conventions
3. **Systematic improvement** (AutoResearch loop): When 5+ L2 learnings accumulate across 2-3 campaigns, run a structured improvement session per `~system/protocols/AUTORESEARCH-LOOP-PROTOCOL.md`

**The session architecture produces the data; the self-learning protocols consume it.**

---

## AGENT INITIALIZATION BY PERSUASION PROFILE

When initializing agents for different roles, apply the appropriate persuasion profile:

```yaml
agent_initialization_profiles:
  execution_agent:
    skill_type: discipline
    persuasion: authority + commitment + social_proof
    avoid: liking, reciprocity
    framing: "You MUST complete all steps. Skipping produces errors requiring full rewrite."

  critique_agent:
    skill_type: collaborative
    persuasion: unity + commitment
    avoid: authority, liking
    framing: "We are identifying genuine weaknesses together. Your job is honest assessment."

  planning_agent:
    skill_type: technique
    persuasion: commitment + moderate_authority
    avoid: heavy_authority, liking
    framing: "State your plan before executing. Follow the stated order."

  data_agent:
    skill_type: reference
    persuasion: clarity_only
    avoid: all_persuasion
    framing: "Precise structure. Clear formatting. No persuasion overhead."
```

Each agent receives ONLY its role-appropriate framing at initialization. Execution agents get authority language. Critique agents get unity language. Data agents get zero persuasion overhead.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Six-session architecture with Opus/Sonnet model split, cascading prose pattern, and context reservoir integration. |
| 1.1 | 2026-03-12 | Added cross-session learning accumulation, compaction detection, issue log integration, campaign-level learning extraction. |
