# Marketing-OS Operations Manual

**Version:** 1.0
**Created:** 2026-03-06
**Audience:** Anyone running campaigns through the marketing-os pipeline — no prior system knowledge required

---

## TABLE OF CONTENTS

- [Part 1: System Overview](#part-1-system-overview)
- [Part 2: Starting a Project](#part-2-starting-a-project)
- [Part 3: Running Foundation Skills](#part-3-running-foundation-skills)
- [Part 4: Building the Context Reservoir](#part-4-building-the-context-reservoir)
- [Part 5: Running Copy Skills](#part-5-running-copy-skills)
- [Part 6: Branching to Other Engines](#part-6-branching-to-other-engines)
- [Part 7: Session Management](#part-7-session-management)
- [Part 8: Specific Scenarios](#part-8-specific-scenarios)
- [Part 9: Edge Cases & Troubleshooting](#part-9-edge-cases--troubleshooting)
- [Part 10: Quick Reference](#part-10-quick-reference)
- [Part 11: Verification Architecture](#part-11-verification-architecture)
- [Part 12: Automated Validation System (Layer 1)](#part-12-automated-validation-system-layer-1)

---

## PART 1: SYSTEM OVERVIEW

### What Marketing-OS Is

Marketing-OS is a system of 67 specialized skills that guide AI through every step of creating direct response marketing campaigns — from initial market research through final copy editing. Each skill has precise instructions, quality gates, and handoff protocols.

### The Engines

| Engine | Skills | What It Produces |
|--------|--------|-----------------|
| **Foundation** | 00-09 | Research, proof inventory, root cause, mechanism, promise, offer architecture, persona, structure, campaign brief |
| **Long-Form** | 10-20 | Headlines, lead, story, root cause narrative, mechanism narrative, product intro, offer copy, close, proof weaving, assembly, editorial |
| **Ad Engine** | A01-A12 | Ad concepts, hooks, scripts, creative briefs |
| **Email Engine** | E0-E4 | Email sequences, subject lines, body copy |
| **Organic Engine** | S01-S24 | Social posts, content calendar, organic copy |
| **Upsell Engine** | U0-U5 | Upsell sequences, cross-sell copy |

### The Pipeline Flow

```
FOUNDATION (Skills 00-09) — runs ONCE per product/offer
    ↓
    Creates: research, proof, root cause, mechanism, promise, structure, brief
    ↓
    Human creates CONTEXT RESERVOIR
    ↓
LONG-FORM (Skills 10-20) — produces the main campaign copy
    ↓
BRANCH → Ads (A01-A12) — uses foundation outputs for ad creative
BRANCH → Email (E0-E4) — uses foundation outputs for email sequences
BRANCH → Organic (S01-S24) — uses foundation outputs for social content
BRANCH → Upsell (U0-U5) — uses foundation outputs for upsell sequences
```

**Key insight:** Foundation runs ONCE. Everything branches from it. If you're working on ads for an existing product that already has foundation work done, you start from the branch — not from scratch.

### The Two Models

| Model | Used For | Why |
|-------|----------|-----|
| **Opus 4.6** | Foundation skills (00-09) | Deep analytical reasoning — scoring mechanisms, evaluating root causes, calculating expectation schemas |
| **Sonnet 4.5** | Copy generation (10-20) and branches | Fluid writing + 1M context window — can hold all upstream data and prior prose simultaneously |

---

## PART 1.5: CHOOSING YOUR EFFORT TIER

Before starting a project, decide which effort tier to use. The tier controls how deeply the system explores options — but quality thresholds are the same across all tiers.

### The Three Tiers

| Tier | Best For | Arena | Sessions | Cost |
|------|----------|-------|----------|------|
| **Full** | Flagship launches, high-stakes campaigns | 2 rounds + audience evaluation, 7 competitors | 6-7 | ~$50-100 |
| **Standard** | Regular client work (DEFAULT) | 1 round, 3 competitors | 4-5 | ~$10-30 |
| **Quick** | Internal drafts, explorations | No Arena | 2-3 | ~$2-10 |

### Decision Guide

| If you need... | Choose... |
|----------------|-----------|
| Maximum quality, budget is flexible | **Full** |
| Good quality, reasonable cost | **Standard** (default) |
| A quick draft or proof-of-concept | **Quick** |
| Not sure | **Standard** — it's the default for a reason |

### How to Set the Tier

Tell the agent at the start of the session: `"Tier: Full"` or `"Tier: Quick"`. If you don't say anything, Standard is used.

### Can I Change Tiers Mid-Project?

- **Upgrade** (Quick → Standard → Full): Yes, anytime
- **Downgrade** (Full → Standard → Quick): Only before the Arena phase starts

**Full protocol:** `~system/protocols/TASK-TRIAGE-PROTOCOL.md`

---

## PART 2: STARTING A PROJECT

### Step 1: Assign a Project Code

Every project gets a short code. This code becomes the folder name for all outputs.

**Format:** 2-4 uppercase letters + optional number

**Examples:**
- `RS1` — Roger's Swing (campaign 1)
- `SPD` — Speed Distance
- `SF2` — Straight Flight (campaign 2)

### Step 2: Create the Output Folder

```
~outputs/[project-code]/
```

All skill outputs for this project go here. The folder structure is documented in `~system/OUTPUT-STRUCTURE.md`.

### Step 3: Gather Raw Inputs

Before running any skills, collect:
- **Product/offer information** — what are we selling?
- **Existing research** — customer reviews, forum posts, survey data, competitor analysis
- **Proof assets** — testimonials, studies, credentials, data points
- **Brand guidelines** — voice, tone, constraints
- **Existing copy** (if any) — swipe files, past campaigns, winning ads

### Step 4: Determine Your Starting Point

| If you have... | Start at... |
|----------------|-------------|
| Nothing — new product, no prior work | Skill 01 (Research) |
| Research done, need strategy | Skill 02 (Proof Inventory) |
| Foundation complete, need copy | Skill 10 (Headline) — load foundation outputs |
| Foundation complete, need ads | A01 (Ad Engine) — load foundation outputs |
| Foundation complete, need emails | E0 (Email Engine) — load foundation outputs |
| Foundation complete, need organic | S01 (Organic Engine) — load foundation outputs |
| Existing campaign, need upsell | U0 (Upsell Engine) — load foundation + campaign outputs |

---

## PART 3: RUNNING FOUNDATION SKILLS

### Session 1: Research

**Model:** Opus 4.6
**Skill:** 01 (Research)
**Input:** Raw research materials, product information, market data
**Time:** This is typically the longest single skill — thorough research is foundational

**What happens:**
1. Deep research analyzes the market, audience, and competitive landscape
2. Classifies 1,000+ data points into structured buckets (pain, desire, failed solutions, etc.)
3. Generates FSSIT analysis (audience's unspoken feelings)
4. Maps expectation schema (what the audience is numb to)
5. Produces story elements research for later use

**Human checkpoint:** Review research completeness. Is anything missing? Any market angle overlooked?

**Output:** `research-package.json`, `classified-quotes.json`, `story-elements-research.md`

### Session 2: Strategy

**Model:** Opus 4.6
**Skills:** 02 → 03 → 04 → 05 (run sequentially in one session)

**Skill 02 — Proof Inventory:**
Catalogs every proof element available. Scores each one. Identifies gaps. Calculates the maximum promise level the proof can support.

**Skill 03 — Root Cause:**
Identifies the root cause of the audience's problem. Runs an arena process with 7 competitors to select the strongest root cause + reframe technique + villain. The expression anchoring protocol tests which phrasings resonate most.

**Skill 04 — Mechanism:**
Develops the mechanism that solves the root cause. Runs an arena process to select the strongest mechanism with scoring across 9 dimensions (visual metaphor, simplicity, provability, etc.).

**Skill 05 — Promise / Big Idea:**
Generates the Big Idea and primary promise. Scores candidates on Resonance, Surprise, and Fascination (RSF). Calculates schema distance — how far the idea sits from audience expectations.

**Human checkpoints:**
- After Skill 03: "Is this the right root cause? Right villain? Right reframe?"
- After Skill 04: "Is this the right mechanism? Does the analogy work?"
- After Skill 05: "Is this the right Big Idea? Is the promise defensible?"

### Session 3: Architecture

**Model:** Opus 4.6
**Skills:** 06 → 07 → 08 → 09 (run sequentially in one session)

**Skill 06 — Offer Architecture:**
Designs the offer structure — pricing, bonuses, guarantee, scarcity, urgency.

**Skill 07 — Persona:**
Develops the writing persona/voice for the campaign.

**Skill 08 — Structure:**
Engineers the campaign structure — section sequence, word budgets, argument flow, CPB chunks.

**Skill 09 — Campaign Brief:**
Synthesizes everything from Skills 01-08 into a single strategic document. This is the integration point — the brief is the "north star" for all copy generation.

**Human checkpoint:** Review the campaign brief carefully. This is your LAST chance to adjust strategy before copy starts.

---

## PART 4: BUILDING THE CONTEXT RESERVOIR

### What It Is

The context reservoir is a human-curated document (~15-17KB) that captures the most valuable intelligence from foundation skills. It preserves the raw material and analytical reasoning that handoff packages compress away.

### When to Build It

After ALL foundation skills (00-09) are complete. Before any copy skills start.

### How to Build It

1. Open a new session with Opus 4.6 (use extended thinking)
2. Load all foundation outputs
3. Ask Claude to help extract and organize:
   - **25-40 best voice-of-customer quotes** with source attribution
   - **10-15 strongest proof elements** with FULL details
   - **Customer language patterns** — how they talk about the problem and desired outcome
   - **Top FSSIT candidates** with resonance scores and reasoning
   - **Expectation schema summary** — what the audience is numb to
   - **Expression anchoring top performers** — which phrases penetrate
   - **Arena selection reasoning** — why the mechanism, root cause, and big idea won
   - **Counter-intuitive core** — the central surprising truth
   - **Campaign brief strategic anchors** — thesis, tone, avatar, sophistication level
4. Review and curate — remove anything that doesn't directly help copy generation
5. Save as `~outputs/[project-code]/context-reservoir.md`

### Template

See `~system/protocols/CONTEXT-RESERVOIR-TEMPLATE.md` for the full template and field definitions.

---

## PART 5: RUNNING COPY SKILLS

### Session 4: First Half of Copy

**Model:** Sonnet 4.5 (1M context)
**Skills:** 10 → 11 → 12 → 13

At the start of this session, load:
- All foundation packages from `~outputs/[project-code]/`
- The context reservoir
- The skill instruction files

**Skill 10 — Headlines:**
Generates headline candidates. Human selects the winner.

**Skill 11 — Lead:**
Writes the opening section. Loads headline, mechanism, promise, root cause, proof, structure, AND the campaign brief + context reservoir.

**Skill 12 — Story:**
Writes the story section. Loads the lead's actual prose (the full written text, not just metadata) to maintain voice continuity.

**Skill 13 — Root Cause Narrative:**
Writes the root cause narrative. Loads the story's actual prose to avoid repeating metaphors or re-explaining concepts.

**Recitation checkpoint:** After Skill 12 (Story), the system performs an active recitation — re-reading 5 strategic anchors (root angle, mechanism name, voice register, FSSIT candidates, headline anchor) from source packages and writing them verbatim to `recitation-midpoint.md`. This catches strategic drift before the second half of copy generation. For Full tier projects, a second recitation happens after Skill 15. See `~system/protocols/ACTIVE-RECITATION-PROTOCOL.md`.

**Important:** Each skill saves TWO files:
1. `[section]-package.json` — structured metadata and handoff data
2. `[section]-assembled-prose.md` — the actual written copy

The prose file is what the NEXT skill reads for voice continuity.

### Session 5: Second Half of Copy

**Model:** Sonnet 4.5 (1M context)
**Skills:** 14 → 15 → 16 → 17

At the start of this session, load:
- Everything from Session 4 (foundation packages + context reservoir + ALL prose files)
- The prose files from Session 4 (lead, story, root cause narrative)

**Skill 14 — Mechanism Narrative:**
Writes the mechanism explanation. Loads root cause narrative prose to avoid re-explaining the root cause (the Ultra Liver fix).

**Skill 15 — Product Introduction:**
Introduces the product. Loads mechanism narrative prose to ASSUME the reader understands the mechanism (not re-explain it).

**Skill 16 — Offer Copy:**
Writes the offer presentation. Loads product introduction prose for continuity.

**Skill 17 — Close:**
Writes the final close, CTAs, P.S. sections. Loads offer copy prose to avoid repeating CTAs.

### Session 6: Assembly & Editorial

**Model:** Sonnet 4.5 (1M context)
**Skills:** 18 → 19 → 20

**Skill 18 — Proof Weaving:**
Weaves proof elements strategically throughout the assembled draft.

**Skill 19 — Campaign Assembly:**
Combines all sections into a unified document. Writes transition language. Runs the deduplication audit (3.5) to catch any repeated content across sections.

**Skill 20 — Editorial:**
Six-lens editorial review (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Kennedy). Includes the full-read coherence audit (1.5) to catch macro-level issues that individual lenses miss.

**Human checkpoint:** Final review of the assembled, edited draft.

---

## PART 6: BRANCHING TO OTHER ENGINES

### The Branch Point

After foundation skills (00-09) are complete, you can branch to ANY engine — not just long-form copy. The foundation outputs feed all engines equally.

```
Foundation (00-09)
    ├── Long-Form (10-20) — main campaign copy
    ├── Ads (A01-A12) — ad creative
    ├── Email (E0-E4) — email sequences
    ├── Organic (S01-S24) — social content
    └── Upsell (U0-U5) — upsell sequences
```

### Branching to Ads

**When:** You have foundation work done and need ad creative.
**Load:** Foundation packages + context reservoir
**Skills:** A01 (Strategy) → A02 (Hooks) → A03 (Scripts) → ... → A12 (Creative Brief)
**Model:** Sonnet 4.5 for copy generation, Opus for strategic ad planning

### Branching to Email

**When:** You have foundation work and need an email sequence.
**Load:** Foundation packages + context reservoir + any long-form copy (if it exists)
**Skills:** E0 (Strategy) → E1 (Sequence Planning) → E2 (Subject Lines) → E3 (Body Copy) → E4 (Optimization)

### Branching to Organic

**When:** You need social content based on the campaign's strategic foundation.
**Load:** Foundation packages + context reservoir
**Skills:** S01 through S24 (content calendar, post types, platform-specific copy)

### Branching to Upsell

**When:** You have a completed front-end campaign and need upsell/cross-sell sequences.
**Load:** Foundation packages + context reservoir + long-form campaign output
**Skills:** U0 (Strategy) → U1-U5 (sequence copy)

### Running Multiple Branches in Parallel

You can run Ads, Email, and Organic simultaneously — they all draw from the same foundation outputs. Just make sure each branch has its own session and loads the foundation packages independently.

---

## PART 7: SESSION MANAGEMENT

### Key Principles

1. **Each session starts fresh.** Claude doesn't remember previous sessions. Everything must be loaded explicitly via files.

2. **Output files are the connective tissue.** What travels between sessions is what's saved in `~outputs/[project-code]/`.

3. **The context reservoir bridges the gap.** It carries the analytical intelligence that would otherwise be lost between sessions.

4. **Prior section prose prevents the "stitched" feeling.** Each copy skill reads the actual written copy from its predecessor.

### Starting a New Session

```
1. Identify which skills you're running
2. Determine which model to use (see ~system/SESSION-ARCHITECTURE.md)
3. Load the skill instruction files
4. Load all required upstream packages from ~outputs/[project-code]/
5. Load the context reservoir (for copy sessions)
6. Load prior section prose (if continuing copy generation)
7. Confirm all inputs are present
8. Run the skill(s)
9. Save outputs to ~outputs/[project-code]/
```

### When Sessions End Mid-Skill

If a session runs out of context or needs to be interrupted:
1. Save whatever outputs have been generated so far
2. Note where you stopped (which skill, which layer/microskill)
3. Start a new session
4. Load all the same inputs plus any outputs from the interrupted session
5. Tell Claude where you left off and what still needs to be done

### Parallel Sessions

You can run parallel sessions for independent work:
- Session A: Long-form copy (Skills 10-17)
- Session B: Ad engine (A01-A12) — uses same foundation, different generation
- Session C: Email engine (E0-E4) — same

These don't conflict because they read from the same foundation outputs but write to different output subdirectories.

---

## PART 8: SPECIFIC SCENARIOS

### Scenario 1: Jojo Needs Campaign Ideas for an Existing Project

**Context:** Jojo works on organic content. A project already has foundation work done (research, mechanism, root cause, etc.). He needs to build campaign ideas from this existing foundation.

**Steps:**
1. Find the project code (e.g., `RS1`)
2. Check `~outputs/RS1/` — confirm foundation packages exist (research-package.json, mechanism-package.json, etc.)
3. Load the context reservoir (`~outputs/RS1/context-reservoir.md`) if it exists
4. If no context reservoir exists, load the campaign brief (`~outputs/RS1/campaign-brief-package.json`) — it's the strategic summary
5. Start a Sonnet session and load:
   - The campaign brief
   - The context reservoir (if available)
   - The organic skill files (S01+)
6. Run the organic engine skills, starting from S01

**What Jojo needs to know:** He doesn't need to re-run research or strategy. Those are done. He's branching from existing foundation work into the organic engine.

### Scenario 2: Ads Team Needs Final Handoffs for Creative-OS

**Context:** The ads team needs creative briefs and ad copy based on a completed campaign. They need the right handoff documents to feed into their creative workflow.

**Steps:**
1. Find the project code
2. Check what exists in `~outputs/[code]/`:
   - Foundation packages (research, mechanism, root cause, promise, structure)
   - Context reservoir
   - Long-form copy (if the main campaign has been written)
3. Start a Sonnet session and load:
   - Foundation packages
   - Context reservoir
   - The assembled draft (if long-form copy is complete)
4. Run Ad Engine skills A01 → A12
5. Output goes to `~outputs/[code]/08-ads/`

**Key files the ads team needs:**
- `campaign-brief-package.json` — strategic direction
- `mechanism-package.json` — the mechanism name and analogy
- `context-reservoir.md` — audience quotes, proof elements, what resonates
- `assembled-draft.md` — the main campaign copy (for reference/consistency)

### Scenario 3: Jenni Comes In Cold — Needs Full Context

**Context:** Jenni is joining a project mid-stream with no prior context. She needs to understand what's been done and pick up where it left off.

**Steps:**
1. Find the project code
2. Open the output folder: `~outputs/[code]/`
3. Read these files IN ORDER for full context:
   - `campaign-brief-package.json` — the strategic summary (what we're doing and why)
   - `context-reservoir.md` — the curated intelligence (audience psychology, proof, reasoning)
   - `assembled-draft.md` — the written copy (if it exists)
4. Check what's complete:
   - All foundation packages present? → Foundation is done
   - Prose files present for Skills 11-17? → Copy generation is done (or partially done)
   - Assembly/editorial files present? → Campaign is in final review
5. Determine what needs to happen next:
   - If foundation is done but no copy: Start at Skill 10 (Headline)
   - If copy is partially done: Pick up at the next incomplete skill
   - If copy is done but no ads/email: Branch to the needed engine
   - If everything is done: Final human review

**What Jenni needs to know:** The campaign brief is the single best document for getting oriented. It synthesizes everything from research through structure into one strategic document. Start there.

### Scenario 4: Running a Campaign From Start to Finish

**Context:** New product, no existing work. Running the complete pipeline.

**Steps:**
1. Assign project code (e.g., `ULV` for Ultra Liver)
2. Create `~outputs/ULV/`
3. Gather raw inputs (product info, research, proof assets)
4. **Session 1** (Opus): Run Skill 01 (Research)
5. **Session 2** (Opus): Run Skills 02 → 03 → 04 → 05
6. **Session 3** (Opus): Run Skills 06 → 07 → 08 → 09
7. **Build context reservoir** (Opus + extended thinking)
8. **Session 4** (Sonnet): Run Skills 10 → 11 → 12 → 13
9. **Session 5** (Sonnet): Run Skills 14 → 15 → 16 → 17
10. **Session 6** (Sonnet): Run Skills 18 → 19 → 20
11. Final human review of assembled draft

**Total sessions:** 7 (including reservoir build)
**Total human checkpoints:** ~8-10 (research review, root cause, mechanism, big idea, brief, headline, story, final draft)

---

## PART 9: EDGE CASES & TROUBLESHOOTING

### "The draft feels like separate documents stitched together"

**Cause:** Copy skills didn't load prior section prose. Each section was written in isolation.
**Fix:** Ensure each skill loads the `[section]-assembled-prose.md` from its predecessor. This was fixed in the v1.1 upstream loader updates (2026-03-06).

### "The same concept is explained three times"

**Cause:** Root cause, mechanism, and product intro each independently explain the mechanism.
**Fix:** The deduplication audit (Skill 19, microskill 3.5) catches this. But prevention is better: each copy skill loads prior prose and is instructed to ASSUME the reader absorbed previous sections.

### "The copy doesn't sound like the audience"

**Cause:** Copy skills are working from compressed summaries instead of actual VOC quotes.
**Fix:** Load the context reservoir. Part 1 contains 25-40 actual customer quotes with their exact language. The copy should echo these phrases.

### "I can't find the outputs"

**Check:** Are they in `~outputs/[project-code]/`? If the project predates the standardized structure, they may be in skill-specific directories (e.g., `04-mechanism/outputs/`). The upstream loaders check both paths.

### "The foundation work is done but I can't find the context reservoir"

**Action:** Build it. Load all foundation outputs in an Opus session with extended thinking and follow the creation protocol in `~system/protocols/CONTEXT-RESERVOIR-TEMPLATE.md`. This takes ~30-60 minutes but dramatically improves copy quality.

### "I want to change the mechanism after copy is already written"

**Impact:** Changing the mechanism means re-running Skills 04 through 20. Everything downstream depends on it.
**Better approach:** If the copy is weak because of the mechanism, consider whether the issue is the mechanism itself or how it was explained. Editorial (Skill 20) can often fix narrative issues without re-running the pipeline.

### "I need to run just one section again (e.g., re-do the story)"

**Steps:**
1. Load the context reservoir + all foundation packages
2. Load the lead prose (what comes before the story)
3. Re-run Skill 12 (Story)
4. Save the new story prose
5. Check: does the new story's ending still connect to the root cause narrative? If not, re-run Skill 13 too.
6. Re-run Campaign Assembly (Skill 19) to re-integrate

### "How do I know which skill to run?"

**See:** `~system/skill-index/[XX]-[name].md` — has a per-skill reference with what each skill does, what it requires, and what it produces. Also see the SKILL.md file in each skill directory for a quick description.

---

## PART 10: QUICK REFERENCE

### File Reference

| File | What It Is | When to Read |
|------|-----------|--------------|
| `~system/OPERATIONS-MANUAL.md` | This file — complete guide to running the system | When starting or onboarding |
| `~system/SESSION-ARCHITECTURE.md` | Session groups, model assignments, context loading | When planning session structure |
| `~system/OUTPUT-STRUCTURE.md` | Folder structure and project codes | When saving or finding outputs |
| `~system/skill-index/[XX]-[name].md` | Per-skill protocols and requirements | When running a specific skill |
| `~system/SYSTEM-CORE.md` | Core system rules (always loaded) | At session start |
| `~system/ARENA-PROTOCOL.md` | Arena process documentation | When running arena skills (03, 04, 05) |
| `~system/pipeline-handoff-registry.md` | What flows between skills | When debugging handoff issues |
| `~system/protocols/CONTEXT-RESERVOIR-TEMPLATE.md` | Context reservoir creation guide | When building the reservoir |
| `~system/protocols/ANALYTICAL-REASONING-CAPTURE.md` | How reasoning is captured at gates | When reviewing arena decisions |

### Skill Quick Reference

| Skill | Name | What It Produces | Required Before |
|-------|------|-----------------|-----------------|
| 01 | Research | Research package, classified quotes | 02, 03, 04, 05 |
| 02 | Proof Inventory | Scored proof elements, gap analysis | 03, 18 |
| 03 | Root Cause | Root cause + villain + reframe | 04, 13 |
| 04 | Mechanism | Named mechanism + analogy + scorecard | 05, 14 |
| 05 | Promise | Big Idea + primary promise + RSF scores | 06, 10 |
| 06 | Offer | Offer architecture + pricing | 15, 16 |
| 07 | Persona | Writing persona/voice | 08 |
| 08 | Structure | Section sequence + word budgets | 09, all copy skills |
| 09 | Campaign Brief | Strategic synthesis of 01-08 | All copy skills |
| 10 | Headline | Headline candidates | 11 |
| 11 | Lead | Opening section | 12 |
| 12 | Story | Story section | 13 |
| 13 | Root Cause Narrative | Root cause narrative | 14 |
| 14 | Mechanism Narrative | Mechanism explanation | 15 |
| 15 | Product Introduction | Product reveal | 16 |
| 16 | Offer Copy | Offer presentation | 17 |
| 17 | Close | Close + CTAs + P.S. | 18, 19 |
| 18 | Proof Weaving | Proof integration | 19 |
| 19 | Campaign Assembly | Unified draft | 20 |
| 20 | Editorial | Final editorial review | Done |

### Model Quick Reference

| Task Type | Model | Context Window |
|-----------|-------|----------------|
| Research & analysis | Opus 4.6 | 200K |
| Strategy & selection (arenas) | Opus 4.6 | 200K |
| Context reservoir creation | Opus 4.6 | 200K |
| Copy generation | Sonnet 4.5 | 1M |
| Assembly & editorial | Sonnet 4.5 | 1M |
| Ad/email/organic generation | Sonnet 4.5 | 1M |

### Output Folder Quick Reference

```
~outputs/[project-code]/
  ├── [foundation packages].json/.yaml
  ├── reasoning-captures/
  ├── context-reservoir.md
  ├── [copy packages].json + [prose].md
  ├── assembled-draft.md
  ├── 08-ads/
  ├── 07-emails/
  ├── 10-organic/
  └── upsell/
```

---

## PART 11: VERIFICATION ARCHITECTURE

### Layer 2: Scoped Verification (Meaning-Level Checks)

In addition to the automated validation hooks (Layer 1), Marketing-OS includes a Layer 2 verification system that checks **meaning**, not just structure. At critical handoff points, a fresh-context verification step loads only the output and 3-5 specific criteria, then answers binary questions with evidence.

**Key verification points:**
- **Foundation Integrity Check** — After Skills 10-13, before Skill 14. Checks whether Foundation decisions (mechanism, root cause, promise) are translating well into prose.
- **Prose Quality Verification** — At each prose handoff (Skills 11-17). Checks root angle service, voice consistency, and expression anchoring.
- **Pre-Assembly Check** — Before Skill 19. Checks coherence across all sections.
- **Editorial Isolation** — Skill 20 runs in a fresh session to avoid inheriting the generation session's assumptions.

**Tier depth:** Full = all checks. Standard = Foundation Integrity + midpoint prose check. Quick = none (Layer 1 hooks only).

**When flags appear:** Layer 2 produces PASS or FLAG results. FLAGS surface to you (the human operator) for decision — they don't auto-halt. You decide whether to proceed, adjust, or re-run.

**Protocols:** `~system/protocols/SCOPED-VERIFICATION-PROTOCOL.md`, `FOUNDATION-INTEGRITY-CHECK.md`, `PROSE-QUALITY-VERIFICATION.md`

---

## PART 12: AUTOMATED VALIDATION SYSTEM (Layer 1)

### What It Is

Marketing-OS includes an automated validation system built on Claude Code hooks. When the agent writes any file, validators fire automatically and inject feedback into the agent's context. **No human action is required.**

### What Gets Validated

| Validator | Checks | Fires When |
|-----------|--------|-----------|
| **Gate Validator** | Forbidden checkpoint statuses (CONDITIONAL_PASS, PARTIAL_PASS, etc.) | Checkpoint YAML written |
| **Output Validator** | Minimum file sizes, naming conventions, 3-output completeness | Output file written |
| **Checkpoint Validator** | Required fields, ISO 8601 timestamps, chain ordering | Checkpoint YAML written |
| **Schema Validator** | Required fields per ~system/pipeline-handoff-registry.md, arena_selection_verified | Package file written |
| **Proportionality Check** | Threshold clustering (scores suspiciously close to minimums) | Scored package written |
| **Token Estimator** | Cumulative context load, cost zone classification | Any file written |

### How It Works

1. Agent writes a file using Write or Edit
2. PostToolUse hook fires `dispatch-validator.sh`
3. Dispatcher routes to appropriate validator(s) based on file path patterns
4. Validator returns structured feedback
5. Agent sees the feedback and can self-correct

### The Stop Hook

When the agent tries to finish, a final comprehensive validation runs. If critical failures are found (missing mandatory outputs, forbidden gate statuses), the Stop hook **blocks the agent from completing** (exit code 2). The agent must fix the issues before it can stop.

### What You Should Know

- **You don't need to do anything.** Hooks fire automatically.
- **The agent will tell you** if validation catches an issue. You'll see it in the agent's output.
- **You can spot-check manually** by running validators directly: `python3 .hooks/validators/gate_validator.py <file>`
- **Hook documentation** lives in `.hooks/README.md`

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Complete operations manual covering system overview, project setup, foundation skills, context reservoir, copy skills, branching to other engines, session management, specific scenarios (Jojo, ads team, Jenni), edge cases, and quick reference. |
