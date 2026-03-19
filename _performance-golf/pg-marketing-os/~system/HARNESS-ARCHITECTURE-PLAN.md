# Harness Architecture Plan

> Version: 1.0 | Created: 2026-03-17
> Status: ACTIVE — Implementation in progress

Marketing-OS is an agentic harness for direct-response marketing. This plan transforms it from a human-orchestrated prompt sequence into a self-orchestrating pipeline with audience-informed feedback loops.

---

## Guiding Principles (from Harness Engineering)

1. **The model is a commodity. The harness is the moat.** Value lives in orchestration, feedback loops, and knowledge architecture — not in any single model's capabilities.
2. **Feedback loop quality bounds output quality.** Every feedback gap is a ceiling on copy quality. Close the gap, raise the ceiling.
3. **Progressive disclosure over context flooding.** Small entry points pointing to deeper truth. Never dump everything at once.
4. **Repository as system of record.** If the agent can't read it from the repo, it doesn't exist.
5. **Enforce invariants, not implementations.** Mechanical checks for architecture; autonomy for execution within those boundaries.
6. **Design environments, not prompts.** When something fails, ask "what's missing from the environment?" not "how do I write a better prompt?"

---

## Phase 1: Arena Restructure + Audience Agents — COMPLETE

**Priority: HIGHEST — Implement first**
**Status: DONE (2026-03-17)**
**Impact: Transforms copy quality ceiling by closing the audience feedback loop**

### Problem Statement

The current 3-round Arena is a closed loop between WRITERS. Copywriter personas learn from each other's craft techniques across 3 rounds, but at no point does the audience respond. This produces diminishing returns — the delta between Round 2 and Round 3 is marginal because craft-only feedback saturates quickly.

The Analyst agent (v1.0, 2026-03-14) was bolted on after the Arena core protocol was finalized. It's referenced but not structurally integrated. The core protocol still uses "Learning Brief" language and doesn't include the Analyst step in its flow.

### Solution: 2-Round Arena with Audience Evaluation

Replace 3 rounds of craft-only refinement with 2 rounds separated by audience intelligence.

```
ROUND 1: Raw Generation
  → 7 copywriter personas generate independently
  → Critic evaluates craft (ONE weakness per output)
  → Judge scores on 7 skill-specific criteria

AUDIENCE EVALUATION (NEW)
  → 5-7 audience agent personas evaluate ALL Round 1 outputs
  → First-person reactions across 8 dimensions
  → Audience agents are BLIND to writer identities, scores, critiques

ANALYST SYNTHESIS (UPGRADED)
  → Receives craft analysis + audience reactions
  → Runs 5 comparison frameworks (4 existing + 1 new)
  → Framework 5: Audience Resonance Analysis
  → Produces Analytical Brief with audience-informed technique transfer

ROUND 2: Audience-Informed Generation
  → 7 personas receive Analytical Brief + audience reactions
  → Fresh generation incorporating craft AND audience intelligence
  → Critic + Judge + Audience agents evaluate again
  → Analyst produces final comparative brief

POST-ARENA: Synthesis + Human Selection (enhanced)
  → Architect creates 2-3 hybrids
  → Human receives candidates + audience resonance data
```

### Deliverables

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 1a | Audience Agent Protocol | `~system/protocols/AUDIENCE-AGENT-PROTOCOL.md` | DONE |
| 1b | Audience agent construction microskills | `00-deep-research/01-research/skills/layer-3/3.2-B-audience-agent-constructor.md` | DONE |
| 1c | Audience agent persona output schema | Defined in protocol, output as `audience-agent-personas.json` | DONE |
| 1d | Arena Core Protocol restructure | `~system/protocols/ARENA-CORE-PROTOCOL.md` v3.0 | DONE |
| 1e | Analyst Protocol update (Framework 5) | `~system/protocols/ANALYST-PROTOCOL.md` v2.0 | DONE |
| 1f | Arena Protocol overview update | `~system/ARENA-PROTOCOL.md` v2.0 | DONE |
| 1g | System Core update (Law 4 + forbidden behaviors) | `~system/SYSTEM-CORE.md` | DONE |
| 1h | Audience agent upstream loader | `0.5-audience-agent-loader.md` template + deployment to 11 skills | DONE |
| 1i | Pipeline handoff registry update | `~system/pipeline-handoff-registry.md` | DONE |
| 1j | ARENA-LAYER.md updates | All 29 Arena skill ARENA-LAYER.md files (16 main + 13 branch) | DONE |
| 1k | Skill loading profile updates | `~system/skill-loading-profiles/` — 39 files updated | DONE |
| 1l | ANTI-DEGRADATION.md updates | All 30 Arena-enabled ANTI-DEGRADATION.md files updated | DONE |
| 1m | Stale reference cleanup | ~system/ protocols: 3-round→2-round, Learning Brief→Analytical Brief | DONE |

### Audience Agent Persona Schema

```json
{
  "project_code": "string",
  "construction_date": "ISO 8601",
  "research_source": "path to FINAL_HANDOFF.md",
  "tier": "full|standard",
  "personas": [
    {
      "id": "AA-01",
      "name": "Segment Name",
      "segment_source": "Layer 2 segment reference ID",
      "demographics": {
        "age_range": "string",
        "gender": "string",
        "income_range": "string",
        "family_structure": "string",
        "location_type": "string"
      },
      "psychographics": {
        "values": ["string"],
        "lifestyle_description": "string",
        "identity_markers": ["string"],
        "media_consumption": ["string"]
      },
      "emotional_state": {
        "primary_fear": { "description": "string", "intensity": "1-10", "source_quote_id": "P-XXX" },
        "primary_frustration": { "description": "string", "intensity": "1-10", "source_quote_id": "P-XXX" },
        "primary_hope": { "description": "string", "intensity": "1-10", "source_quote_id": "H-XXX" },
        "secondary_emotions": [{ "emotion": "string", "intensity": "1-10" }]
      },
      "belief_system": {
        "why_beliefs": [{ "belief": "string", "alignable": "boolean", "strength": "1-10" }],
        "what_beliefs": [{ "belief": "string", "alignable": "boolean", "strength": "1-10" }],
        "who_beliefs": [{ "belief": "string", "alignable": "boolean", "strength": "1-10" }],
        "how_beliefs": [{ "belief": "string", "alignable": "boolean", "strength": "1-10" }]
      },
      "voice_profile": {
        "vocabulary_samples": ["verbatim VOC quotes — 10-15 per persona"],
        "metaphors_used": ["string"],
        "speech_patterns": "description of how they talk",
        "sophistication_markers": ["string"],
        "skepticism_triggers": ["string"],
        "trust_signals": ["string"]
      },
      "purchase_history": {
        "solutions_tried": [{ "solution": "string", "outcome": "failed|partial|abandoned", "emotional_residue": "string" }],
        "spending_willingness": "string",
        "purchase_triggers": ["string"],
        "purchase_barriers": ["string"]
      },
      "identity_tensions": [
        { "current_identity": "string", "desired_identity": "string", "strength": "1-10" }
      ],
      "fssit_conditions": {
        "experiential_conditions": ["Conditions that CREATE latent emotions — described WITHOUT naming the emotion"],
        "recognition_triggers": ["Situations where latent emotions surface as behavior or deflection"]
      },
      "sophistication": {
        "schwartz_stage": "1-5",
        "awareness_description": "what they know about the problem/solutions",
        "market_exposure": "what marketing they have seen and how they responded"
      },
      "first_person_voice": "2-3 sentences in the persona's own voice — how they would introduce themselves and their situation"
    }
  ]
}
```

### Audience Agent Evaluation Dimensions

Each audience agent evaluates copy in FIRST PERSON across 8 dimensions:

1. **Attention** — "Does this stop me? Would I read past the first line?"
2. **Recognition** — "Does this describe MY experience? My problem?"
3. **Credibility** — "Do I believe this? Or does this sound like every other ad?"
4. **Engagement** — "Would I keep reading? Where did I lose interest?"
5. **Emotional Resonance** — "Does this make me FEEL something? What?"
6. **Objection Surfacing** — "What questions or doubts does this raise for me?"
7. **Purchase Intent** — "Am I closer to wanting this? Why or why not?"
8. **Authenticity** — "Does this feel like it was written for me specifically?"

Output: ~500-word first-person reaction per audience agent per copy variant.

### Tier Application

| Tier | Audience Agents | Arena Rounds | Analyst Runs |
|------|-----------------|--------------|--------------|
| Full | 5-7 (all research segments) | 2 + audience eval between | 2 (after each round) |
| Standard | 3 (top 3 segments) | 1 + audience eval + 1 | 1 (after audience eval) |
| Quick | 0 (no Arena) | 0 | 0 |

### Token Budget (Full Tier, Generative Mode)

| Component | Current 3-Round | New 2-Round + Audience |
|-----------|-----------------|------------------------|
| Round 1: 7 persona generation | ~35KB | ~35KB |
| Round 1: Critic + Judge | ~10KB | ~10KB |
| Audience evaluation (5 agents × 7 variants) | — | ~17.5KB |
| Analyst synthesis | ~2KB | ~5KB |
| Round 2: 7 persona generation | ~35KB | ~35KB |
| Round 2: Critic + Judge | ~10KB | ~10KB |
| Round 2 audience evaluation | — | ~17.5KB |
| Round 2 Analyst | — | ~5KB |
| Round 3: 7 persona generation | ~35KB | — |
| Round 3: Critic + Judge | ~10KB | — |
| Synthesis | ~10KB | ~10KB |
| **Total** | **~147KB** | **~145KB** |

Comparable budget. Dramatically richer feedback signal.

### Model Routing

| Role | Model | Rationale |
|------|-------|-----------|
| Copywriter personas (strategic 03-08) | Opus 4.6 | Strategy requires deepest reasoning |
| Copywriter personas (generative 10-18) | Sonnet 4.5 | Copy generation at scale |
| Critic | Opus 4.6 | Adversarial evaluation requires depth |
| Judge | Opus 4.6 | Scoring consistency |
| Audience agents | Sonnet 4.5 | Persona simulation — rich but evaluative |
| Analyst | Opus 4.6 | Causal analysis across all data sources |
| Synthesizer | Opus 4.6 | Cross-persona integration |

---

## Phase 2: Project State Infrastructure — COMPLETE

**Priority: HIGH — Cheapest harness win**
**Status: DONE (2026-03-17)**
**Impact: Eliminates "lost state between sessions" and "declare victory too early" failures**

### Problem Statement

Currently the human manages all session state. There is no persistent machine-readable record of what skills have been completed, what outputs exist, or what state the project is in. Each session starts from scratch with the human manually loading the next skill.

### Solution

**2a. Project Progress File** — `~outputs/[project-code]/project-progress.json`

JSON (not Markdown) file tracking:
- Per-skill completion status: `pending | in_progress | completed | failed`
- Output validation status per completed skill
- Current session number
- Last active skill and timestamp
- Gate approval records (which gates passed, when, by whom)
- Tier designation
- Audience agent persona status

**2b. Startup Sequence Protocol** — `~system/protocols/STARTUP-SEQUENCE.md`

Every session begins with a 5-step sequence before any skill execution:
1. `pwd` — confirm working directory
2. Read `project-progress.json` — understand current state
3. Read git log (last 20 commits) — understand recent work
4. Validate existing output packages against handoff registry
5. Identify next skill in pipeline and load its Layer 0

**2c. Session End Protocol** — `~system/protocols/SESSION-END.md`

Every session ends with:
1. Update `project-progress.json` with session results
2. Git commit with descriptive message
3. Verify clean state (no broken outputs, all files committed)

### Deliverables

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 2a | Project progress JSON schema + template | `~system/templates/project-progress-template.json` | DONE |
| 2b | Startup sequence protocol | `~system/protocols/STARTUP-SEQUENCE.md` | DONE |
| 2c | Session end protocol | `~system/protocols/SESSION-END.md` | DONE |
| 2d | Update SYSTEM-CORE.md with startup/end requirements | `~system/SYSTEM-CORE.md` v1.2 | DONE |
| 2e | Update PROTOCOL-MANIFEST.md | Priority 8-9 bands added | DONE |
| 2f | Update PROTOCOL-INDEX.md | Session Management Protocols section | DONE |

---

## Phase 3: Pipeline DAG + Initializer — COMPLETE

**Priority: HIGH — Makes orchestration machine-readable**
**Status: DONE (2026-03-18)**
**Impact: Enables automated skill sequencing and parallel execution**

### Solution

**3a. Pipeline DAG** — `~system/pipeline-dag.json`

JSON (not Markdown) directed acyclic graph covering all 93 skills:
- 93 nodes with unique IDs (aligned with project-progress-template.json)
- Dependency edges — minimal blocking dependencies per skill for execution ordering
- 10 parallel execution groups (branch launch, VSL+proof, e-comm write, LP elements, upsell write, checkout write, ad production, organic production, organic distribution, organic influencer)
- 11 human gates (8 main pipeline + 2 ad engine + 1 organic)
- Model routing (Opus for strategy/analysis, Sonnet for copy generation)
- Tier configuration (Full/Standard/Quick — affects execution depth, not pipeline width)
- Engine metadata (10 engines with entry/exit points)
- Cross-engine optional dependencies documented separately from hard edges
- Foundation integrity check trigger point

**3b. Initializer Protocol** — `~system/protocols/INITIALIZER-PROTOCOL.md`

First session of any project (6 steps):
1. Gather project inputs (code, name, client, tier, active engines)
2. Select active engines from menu with common configurations
3. Create `~outputs/[project-code]/` directory structure (only active engine subdirs)
4. Generate `project-progress.json` from pipeline-dag.json + template (inactive engines set to `skipped`)
5. Initial git commit
6. Begin Skill 00 execution

Also covers: engine activation after initialization, Organic Mode B standalone initialization, failure modes.

### Deliverables

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 3a | Pipeline DAG | `~system/pipeline-dag.json` | DONE |
| 3b | Initializer protocol | `~system/protocols/INITIALIZER-PROTOCOL.md` | DONE |
| 3c | PROTOCOL-INDEX.md update | Session Management section | DONE |
| 3d | PROTOCOL-MANIFEST.md update | Priority 7 band added | DONE |

---

## Phase 4: Session Orchestrator — COMPLETE

**Priority: MEDIUM — Bridges manual loading to automated sequencing**
**Status: DONE (2026-03-18)**
**Impact: System pulls human in at gates instead of human pushing forward**

### Problem Statement

Currently the human must manually: identify the next skill, load its SKILL.md, load upstream packages, and initiate execution. The orchestrator automates this navigation.

### Solution

A session orchestration protocol implementing a continuous execution loop:

1. **RESOLVE** — algorithm walks DAG nodes against progress file to find all eligible skills (deps met, no gate blocking, engine active)
2. **PRESENT** — shows eligible skills to human (single skill, same-engine parallel, cross-engine branch unlock)
3. **LOAD** — reads skill loading profile → loads SKILL.md + protocols_required + upstream packages + conditional resources
4. **EXECUTE** — agent follows SKILL.md (orchestrator doesn't interfere with execution)
5. **COMPLETE** — updates progress file immediately, verifies outputs
6. **GATE CHECK** — if gate_after exists, presents gate checkpoint with PASS/FAIL/REVISE outcomes
7. **CONTEXT CHECK** — evaluates zone (GREEN→continue, YELLOW→caution, ORANGE/RED→recommend session end)
8. **LOOP** — back to RESOLVE or trigger Session End Protocol

Gate checkpoint procedure built into orchestrator (no separate gate protocol files needed — gate definitions live in pipeline-dag.json). Handles 6 special cases: email per-email loop, organic Mode B, foundation integrity check, proof-weaving parallel path, mid-session engine switch, and skill re-execution after failure.

### Deliverables

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 4a | Session orchestrator protocol | `~system/protocols/SESSION-ORCHESTRATOR.md` | DONE |
| 4b | Gate checkpoint procedure | Built into SESSION-ORCHESTRATOR.md (Step 6) | DONE |
| 4c | PROTOCOL-INDEX.md update | Orchestration Protocols section | DONE |
| 4d | PROTOCOL-MANIFEST.md update | Priority 8 band updated | DONE |

---

## Phase 5: Parallel Branch Engine Execution — COMPLETE

**Priority: MEDIUM — Multiplies throughput after Campaign Brief**
**Status: DONE (2026-03-18)**
**Impact: 8 branch engines can execute simultaneously instead of sequentially**

### Problem Statement

After Skill 09 (Campaign Brief), 8 branch engines become eligible. Currently they execute one at a time across multiple sessions. With git worktree isolation, they could run in parallel.

### Solution

After Campaign Brief completion:
1. Orchestrator identifies all branch engines with met dependencies
2. Each branch engine gets its own git worktree: `git worktree add /tmp/mos-[project-code]-[engine-id] main`
3. Each branch engine agent loads: Campaign Brief + Context Reservoir + engine-specific skills
4. Agents execute independently in parallel
5. Each agent commits to its worktree branch
6. Merges happen after human review of each engine's outputs

Key design decisions:
- **Primary engine stays on main** (default: VSL — longest critical path, most gates). Other engines get worktrees.
- **Engine-status.json per engine** instead of modifying shared project-progress.json. Eliminates merge conflicts.
- **Three execution modes:** multi-agent parallel (full), staggered parallel (practical default), sequential fallback.
- **Scoped orchestrator loop** — each engine agent runs RESOLVE→EXECUTE→COMPLETE only for its engine's skills.
- **Merge after human review** — each engine merges independently, progress reconciled on main.

### Parallel Groups

```
After Skill 09 completes:
  ├── 02-long-form-vsl (Skills 10-17, sequential — prose cascades)
  ├── 03-e-comm (EC-01 through EC-04, sequential)
  ├── 04-page-builder (LP-07 through LP-14, sequential)
  ├── 05-upsells (U1-U3, sequential)
  ├── 06-checkout (CK-01, CK-02, sequential)
  ├── 07-emails (E1-E2, sequential)
  ├── 08-ads (A01-A07, sequential)
  ├── 09-advertorials (ADV-01 through ADV-03, sequential)
  └── 10-organic (S08-S13, sequential)
```

Within each engine: skills run sequentially. Across engines: fully parallel.

### Deliverables

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 5a | Parallel execution protocol | `~system/protocols/PARALLEL-ENGINE-PROTOCOL.md` | DONE |
| 5b | Worktree management spec | Included in parallel protocol | DONE |
| 5c | Merge and conflict resolution spec | Included in parallel protocol | DONE |
| 5d | Progress template update | `~system/templates/project-progress-template.json` — parallel_execution section | DONE |
| 5e | PROTOCOL-INDEX.md update | Session Management section v1.5 | DONE |
| 5f | PROTOCOL-MANIFEST.md update | Priority 8 band updated | DONE |

---

## Phase 6: End-to-End Verification Agents — COMPLETE

**Priority: MEDIUM-LOW — Extends audience agents to full-piece evaluation**
**Status: DONE (2026-03-18)**
**Impact: Catches continuity breaks, emotional arc failures, drop-off points across ALL engines**

### Solution

After assembly skills complete and before editorial skills execute (across ALL engines, not just VSL):
1. "Reader agents" (audience agent personas in Reader Mode) read the FULL assembled piece as a continuous customer experience
2. Report: drop-off points, emotional arc breaks, objection gaps, voice drift, pacing failures, threading issues
3. "Continuity checker" validates voice register, expression anchoring, naming consistency, narrative threading, tone escalation, proof distribution
4. Results feed into each engine's editorial skill (Skill 20, EC-06, U5, CK-03, E4, ADV-05) as additional Layer 0 input
5. P1 issues from E2E verification MUST receive Arena treatment in editorial

Key design decisions:
- **Runs inside editorial Layer 0**, not as a separate DAG node — no pipeline changes needed
- **Reader Mode** extends audience agents with 8 continuous-experience dimensions (vs. 8 per-variant Arena dimensions)
- **Continuity Checker** is analytical (Opus), not persona-based — cross-references assembled piece against Foundation outputs
- **All engines covered**: VSL, E-Comm, Upsells, Checkout, Emails, Advertorials, Ads (variant sampling)
- **Multi-piece support**: Email sequences read as cumulative journey, upsell sequences read as post-purchase flow
- **Tier application**: Full (all engines, 5-7 readers), Standard (VSL + 1 engine, 3 readers), Quick (none)

### Deliverables

| # | Deliverable | File | Status |
|---|-------------|------|--------|
| 6a | E2E verification protocol | `~system/protocols/E2E-VERIFICATION-PROTOCOL.md` | DONE |
| 6b | Reader agent spec (audience protocol addendum) | `~system/protocols/AUDIENCE-AGENT-PROTOCOL.md` v1.1 — Reader Mode section | DONE |
| 6c | PROTOCOL-INDEX.md update | Verification Protocols section v1.6 | DONE |
| 6d | PROTOCOL-MANIFEST.md update | Priority 91 band added | DONE |

---

## Phase 7: Full Runtime

**Priority: LOW — Long-term vision**
**Impact: Transforms marketing-OS from protocol-driven to runtime-driven**

### Solution

Convert protocols into software runtime:
- Persistent memory across sessions (project state + cross-campaign learnings)
- Scheduled execution (automated skill sequences between human gates)
- Cross-campaign pattern library (what worked in Campaign A applies to Campaign B)
- Self-Learning Promotion Protocol automated (L2 → L3 → L4 pipeline)
- Dashboard for human oversight (project progress, quality metrics, audience resonance data)
- API layer for integration with external tools (analytics, A/B testing platforms)

### Deliverables

Deferred to future planning. Depends on Phases 1-6 being operational.

---

## Implementation Order

```
Phase 1 (Arena + Audience) ← START HERE, highest impact
  ├── 1a: AUDIENCE-AGENT-PROTOCOL.md
  ├── 1b: Construction microskills
  ├── 1c: Persona output schema (in protocol)
  ├── 1d: ARENA-CORE-PROTOCOL.md v3.0
  ├── 1e: ANALYST-PROTOCOL.md v2.0
  ├── 1f: ARENA-PROTOCOL.md v2.0
  ├── 1g: SYSTEM-CORE.md updates
  ├── 1h: Upstream loader template + deployment
  ├── 1i: Pipeline handoff registry
  ├── 1j: ARENA-LAYER.md updates (16 skills)
  ├── 1k: Skill loading profiles
  └── 1l: ANTI-DEGRADATION updates

Phase 2 (Project State) ← Can begin in parallel with Phase 1
  ├── 2a: project-progress.json schema
  ├── 2b: STARTUP-SEQUENCE.md
  ├── 2c: SESSION-END.md
  └── 2d: SYSTEM-CORE.md integration

Phase 3 (Pipeline DAG + Initializer) ← COMPLETE (2026-03-18)
  ├── 3a: pipeline-dag.json ✓
  ├── 3b: INITIALIZER-PROTOCOL.md ✓
  ├── 3c: PROTOCOL-INDEX.md updated ✓
  └── 3d: PROTOCOL-MANIFEST.md updated ✓

Phase 4 (Session Orchestrator) ← COMPLETE (2026-03-18)
  ├── 4a: SESSION-ORCHESTRATOR.md ✓
  ├── 4b: Gate checkpoint procedure (built into 4a) ✓
  ├── 4c: PROTOCOL-INDEX.md updated ✓
  └── 4d: PROTOCOL-MANIFEST.md updated ✓

Phase 5 (Parallel Engines) ← COMPLETE (2026-03-18)
  ├── 5a: PARALLEL-ENGINE-PROTOCOL.md ✓
  ├── 5b: Worktree management (in 5a) ✓
  ├── 5c: Merge/conflict resolution (in 5a) ✓
  ├── 5d: project-progress-template.json updated ✓
  ├── 5e: PROTOCOL-INDEX.md updated ✓
  └── 5f: PROTOCOL-MANIFEST.md updated ✓

Phase 6 (E2E Verification) ← COMPLETE (2026-03-18)
  ├── 6a: E2E-VERIFICATION-PROTOCOL.md ✓
  ├── 6b: AUDIENCE-AGENT-PROTOCOL.md v1.1 (Reader Mode) ✓
  ├── 6c: PROTOCOL-INDEX.md updated ✓
  └── 6d: PROTOCOL-MANIFEST.md updated ✓

Phase 7 (Runtime) ← After all above are operational
  └── Future planning
```

---

## Dependencies

- Phase 1 blocks: Phase 6 (E2E verification extends audience agents)
- Phase 2 blocks: Phase 3 (DAG references progress file schema)
- Phase 3 blocks: Phase 4 (orchestrator reads DAG)
- Phase 4 blocks: Phase 5 (parallel execution uses orchestrator patterns)
- Phases 1 and 2 can run in PARALLEL (no dependencies between them)

---

## Acceptance Criteria (Phase 1)

Phase 1 is complete when:
- [x] Audience agent protocol is written and reviewed
- [x] Audience agent construction microskills exist in research pipeline
- [x] `audience-agent-personas.json` schema is defined and documented
- [x] ARENA-CORE-PROTOCOL.md v3.0 implements 2-round + audience model
- [x] ANALYST-PROTOCOL.md v2.0 includes Framework 5 (Audience Resonance)
- [x] ARENA-PROTOCOL.md overview reflects new architecture
- [x] SYSTEM-CORE.md Law 4 updated, forbidden behaviors updated
- [x] Audience agent upstream loader template exists
- [x] Loader deployed to all 11 Arena skill layer-0 directories
- [x] Pipeline handoff registry includes `audience-agent-personas.json`
- [x] All 16 ARENA-LAYER.md files updated for 2-round model
- [x] Skill loading profiles updated to reference audience agent protocol
- [x] ANTI-DEGRADATION checklists updated for new Arena structure
- [x] One test run completed on existing project data to validate
