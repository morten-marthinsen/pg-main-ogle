# Session Architecture & Model Assignment

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Define how the pipeline splits across sessions and which model runs each phase

---

## TABLE OF CONTENTS

- [Model Split](#model-split)
- [Session Groups](#session-groups)
- [Context Loading by Session](#context-loading-by-session)
- [Session Transitions](#session-transitions)
- [Future State](#future-state)

---

## MODEL SPLIT

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

### Session 5: Copy Generation — Second Half
**Model:** Sonnet 4.5 (1M context)
**Skills:** 14 (Mechanism Narrative), 15 (Product Introduction), 16 (Offer Copy), 17 (Close)
**Load:** All upstream packages + context reservoir + ALL prior section prose from Session 4
**Outputs:** mechanism-narrative-package.json + prose, product-intro-package.json + prose, offer-copy-package.json + prose, close-package.json + prose
**Human Checkpoint:** Review full draft after Skill 17

### Session 6: Assembly & Editorial
**Model:** Sonnet 4.5 (1M context)
**Skills:** 18 (Proof Weaving), 19 (Campaign Assembly), 20 (Editorial)
**Load:** ALL section packages + ALL prose files + context reservoir
**Outputs:** assembled-draft.md, editorial-report.json, final draft
**Human Checkpoint:** Final editorial review — the assembled draft goes to human for final approval

---

## CONTEXT LOADING BY SESSION

### What Each Session Loads

| Session | Upstream Packages | Context Reservoir | Prior Prose | Est. Token Load |
|---------|------------------|-------------------|-------------|-----------------|
| 1 | None | No | No | ~5K (skill instructions only) |
| 2 | Research outputs | No | No | ~15-25K |
| 3 | Sessions 1-2 outputs | No | No | ~30-45K |
| Reservoir | All foundation outputs | Creating it | No | ~50-65K |
| 4 | Foundation packages | Yes | Cascading | ~80-120K |
| 5 | Foundation + Session 4 | Yes | All from Session 4 | ~120-180K |
| 6 | Everything | Yes | Everything | ~150-250K |

**Note:** Sessions 4-6 run on Sonnet (1M context), so even the heaviest loads are well within limits. With Opus (200K), Sessions 1-3 are also comfortable.

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

### What Does NOT Travel

- The full conversation context (session memory)
- Extended thinking chains
- Intermediate drafts that were revised within a session
- Real-time human feedback given during a session

This is why the context reservoir matters: it captures the REASONING that would otherwise be lost when sessions end.

### Session Start Protocol

At the start of each session:
1. Load the skill instruction file(s) for the session's skills
2. Load all required upstream packages per the upstream loader
3. Load the context reservoir (Sessions 4+)
4. Load prior section prose (Sessions 4+)
5. Confirm all required inputs are present before generating

---

## FUTURE STATE

### When Context Windows Expand Further

As model context windows grow (2M, 5M, 10M), the session architecture can simplify:

**Near-term (1-2M tokens):** Sessions 4-5 could merge into a single session. All copy generation (Skills 10-17) runs sequentially in one context, with the model seeing everything it's written so far.

**Medium-term (5M+ tokens):** The entire pipeline (Skills 00-20) could run in a single session. No session boundaries, no information loss, no context reservoir needed. The model maintains full context from research through final editorial.

**The context reservoir is designed to be obsoleted.** When context windows are large enough to hold everything, the reservoir becomes unnecessary — its contents would simply be in the active context. Until then, it bridges the gap.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Six-session architecture with Opus/Sonnet model split, cascading prose pattern, and context reservoir integration. |
