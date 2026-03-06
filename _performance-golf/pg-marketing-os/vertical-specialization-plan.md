# CopywritingEngine — Vertical Specialization Plan

**Version:** 1.0
**Created:** 2026-02-20
**Author:** Anthony + Claude (deep analysis session)
**Purpose:** Architecture plan for creating niche-specific versions of the CopywritingEngine, starting with Golf (Performance Golf)

---

## The Problem

The current CopywritingEngine is **niche-agnostic**. Specimens, personas, and gold samples come from financial (Stansberry, Makepeace), health (Clemens/Gundry), consumer products (Ogilvy), and general direct response (Halbert, Schwartz, Bencivenga). When writing for a specific vertical like golf:

1. **Specimen contamination** — Financial headlines loaded when generating golf copy. Health mechanisms loaded when explaining golf swing concepts. The probability distributions get pulled toward non-golf patterns.
2. **Persona mismatch** — Ogilvy's Rolls-Royce credibility style doesn't map to golf instruction. His persona rarely wins Arena rounds for these projects. Conversely, there's no persona representing the best voice for this specific niche.
3. **No niche-calibrated samples** — System 1 (0.2.6 curated gold specimens) contains zero golf-specific examples. The LLM has never seen "what a great golf headline looks like" at generation time.
4. **Cross-niche interference** — When all persona specimens are from health/finance/general DR, the copy generated for golf ends up sounding like health copy or financial copy with golf nouns substituted in. The cadence, emotional register, and proof architecture are wrong for the audience.

**Anthony's observation:** "Using all of this copy and these samples from other niches is just mixing things up too much."

---

## The Markets (5 Verticals)

| #   | Vertical                 | Primary Client(s)                       | Example Products                             | Notes                                            |
| --- | ------------------------ | --------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| 1   | **Golf/Sports**          | Performance Golf                        | Training programs, instruction, equipment    | Donnie French as new persona                     |
| 2   | **Health**               | UpWellness, Ionix                       | Supplements, beauty, wellness products       | Clemens stays; strongest specimen base           |
| 3   | **Finance**              | Trader's Edge,                          | Trading, stock investing, crypto             | Makepeace + Schwartz strongest here              |
| 4   | **Personal Development** | Gamma, Roger Love, Dr. B, Rich Schefren | Meditation, voice training, self-improvement | Least covered by current specimens               |
| 5   | **Technology**           | Forbes Wireless                         | Tech products, SaaS-adjacent                 | Limited DR examples; may need different approach |

---

## Architecture Decision: Vertical Profiles, Not Separate Engines

### Option A (Rejected): Fork the Engine Per Vertical
- Create `CopywritingEngine-Golf/`, `CopywritingEngine-Health/`, etc.
- Problem: Maintenance nightmare. Every structural fix (anti-degradation, gates, MC-CHECK) must be applied N times. Version drift guaranteed.

### Option B (Rejected): One Engine, Runtime Niche Selection
- Keep one engine, pass `niche: golf` at runtime, let agents dynamically filter
- Problem: "Dynamically filter" = agent discretion = degradation. The specimens loaded need to be STRUCTURALLY FORCED, not agent-selected.

### Option C (Recommended): Vertical Profiles + Persona Slot System

The engine stays unified. A new **Vertical Profile** system adds three layers:

1. **Vertical Profile file** (`verticals/golf.md`, `verticals/health.md`, etc.) — defines which persona panel to use, which System 1 specimens to load, and vertical-specific taste constraints
2. **Per-vertical specimen libraries** — niche-specific gold specimens for each skill, stored alongside the universal ones
3. **Configurable persona slots** — the 7 Arena positions become configurable. Golf profile might swap Ogilvy for Donnie French. Health profile keeps current panel. Finance might swap Clemens for a finance-specific voice.

**Why this works:**
- ONE engine codebase. All structural fixes apply everywhere.
- Vertical Profile is loaded in Layer 0 alongside Soul.md — a structural gate, not agent discretion
- Per-vertical specimens are curated by Anthony (human taste), not auto-selected by the LLM
- Persona panel becomes a config, not a hardcoded constant
- The ARENA-CORE-PROTOCOL.md, SYNTHESIZER-LAYER.md, MC-CHECK, etc. are all unchanged

---

## Detailed Architecture

### 1. Vertical Profile System

**New directory:** `marketing-os/verticals/`

Each vertical gets a profile file:

```
marketing-os/
  verticals/
    golf.md          # Golf/Sports vertical profile
    health.md        # Health/Supplements vertical profile
    finance.md       # Finance/Trading vertical profile
    personal-dev.md  # Personal Development vertical profile
    technology.md    # Technology vertical profile
```

**Vertical Profile Structure:**

```yaml
# verticals/golf.md

vertical: golf
display_name: "Golf / Sports Instruction"
primary_client: "Performance Golf"

# PERSONA PANEL CONFIGURATION
# Which 7 Arena competitors to use for this vertical
persona_panel:
  slot_1: makepeace       # Flow & Architecture (universal — keeps)
  slot_2: halbert          # Entertainment & Hook (universal — keeps)
  slot_3: schwartz         # Market Sophistication (universal — keeps)
  slot_4: donnie-french    # REPLACES Ogilvy — Golf-native voice
  slot_5: clemens          # Scientific Mechanism (keeps — useful for training mechanisms)
  slot_6: bencivenga       # Proof-First Persuasion (universal — keeps)
  slot_7: architect        # Integration (always keeps)

# SPECIMEN DIRECTORIES
# Where to find niche-specific specimens
specimen_directories:
  system_1_override: "vertical-specimens/golf/system-1/"   # Per-skill gold specimens
  system_2_override: "vertical-specimens/golf/system-2/"   # Persona voice specimens

# VERTICAL-SPECIFIC TASTE CONSTRAINTS
# These get merged into Soul.md at load time
taste_defaults:
  voice_register: "coaching conversation on the range — instructor to serious golfer"
  anti_voice:
    - "clinical/medical tone"
    - "financial urgency"
    - "guru/enlightened tone"
    - "infomercial hype"
  energy_signature: "confident, knowledgeable, fellow-golfer"
  proof_style: "results-first (scores, handicap drops, tour stats)"

# VERTICAL-SPECIFIC ANTI-SLOP
# Words/patterns that don't belong in this vertical
vertical_anti_slop:
  - "revolutionary breakthrough"  # health-coded
  - "hidden toxin"                # health-coded
  - "wealth secret"               # finance-coded
  - "ancient wisdom"              # personal-dev-coded
```

### 2. Per-Vertical Specimen Libraries

**New directory:** `marketing-os/skills/vertical-specimens/`

```
marketing-os/skills/
  vertical-specimens/
    golf/
      system-1/                    # Skill-specific gold specimens (replaces/supplements 0.2.6)
        10-headlines-golf.md       # Best golf instruction headlines (verbatim)
        11-lead-golf.md            # Best golf instruction leads
        12-story-golf.md           # Best golf transformation stories
        13-root-cause-narrative-golf.md
        14-mechanism-narrative-golf.md
        15-product-introduction-golf.md
        16-offer-copy-golf.md
        17-close-golf.md
        18-proof-weaving-golf.md
      system-2/                    # Persona voice specimens specific to golf
        donnie-french/             # NEW persona — Donnie French specimens
          donnie-vsl-1.md
          donnie-vsl-2.md
          donnie-email-sequences.md
          donnie-landing-pages.md
        # Other personas keep their existing specimens but...
        # ...the 0.2.7 loader prioritizes golf-relevant specimens
        # (e.g., Halbert's raw personality applied to sports,
        #  not Halbert's Boron Letters about prison)
    health/
      system-1/
        10-headlines-health.md
        11-lead-health.md
        ... (same structure)
      system-2/
        # Health vertical keeps all current persona specimens
        # Plus curated best-of-health specimens per persona
    finance/
      system-1/
        ... (same structure)
      system-2/
        ...
    personal-dev/
      system-1/
        ...
      system-2/
        ...
```

### 3. Configurable Persona Panel

**Current state:** `ARENA-PERSONA-PANEL.md` has 7 hardcoded personas.

**New state:** `ARENA-PERSONA-PANEL.md` becomes the **master registry** of ALL available personas (could be 8, 9, 10+). The Vertical Profile selects which 7 fill the Arena slots.

**New persona file structure:**

```
marketing-os/skills/
  persona-registry/
    makepeace.md       # Moved from inline in ARENA-PERSONA-PANEL.md
    halbert.md
    schwartz.md
    ogilvy.md          # Still exists — just not selected for golf
    clemens.md
    bencivenga.md
    donnie-french.md   # NEW persona
    architect.md       # Always slot 7
    critic.md          # Always present (adversarial role)
  persona-specimens/
    01-clayton-makepeace/   (existing)
    02-gary-halbert/        (existing)
    03-eugene-schwartz/     (existing)
    04-david-ogilvy/        (existing — still available when selected)
    05-craig-clemens/       (existing)
    06-gary-bencivenga/     (existing)
    07-donnie-french/       (NEW)
```

**ARENA-PERSONA-PANEL.md v3.0** would become a loader that:
1. Reads the active Vertical Profile
2. Loads the 7 persona files specified in `persona_panel`
3. Assembles the panel for Arena execution

### 4. Layer 0 Integration — The Vertical Loader

**New microskill:** `0.0.1-vertical-profile-loader.md`

This becomes the FIRST thing that executes in Layer 0, before any other loading:

```
EXECUTION ORDER (Layer 0):
  0.0.1 — Vertical Profile Loader (NEW — loads vertical config)
  0.1   — Upstream Package Loader (existing)
  0.2   — Vault Intelligence Loader (existing)
  0.2.5 — Pattern Decomposition (existing, where applicable)
  0.2.6 — System 1: Gold Specimens (MODIFIED — loads vertical-specific specimens if they exist, falls back to universal)
  0.2.7 — System 2: Persona Voice Loader (MODIFIED — loads persona panel from vertical config, loads vertical-specific voice specimens)
```

**Vertical Profile Loader Protocol:**

```
0.0.1 VERTICAL PROFILE LOADER:
  1. CHECK: Does the project brief specify a vertical? (golf, health, finance, personal-dev, technology)
  2. IF YES:
     a. LOAD verticals/[vertical].md
     b. EXTRACT persona_panel configuration
     c. EXTRACT specimen_directories paths
     d. EXTRACT taste_defaults (merge into Soul.md)
     e. EXTRACT vertical_anti_slop (add to anti-slop validator)
     f. WRITE loaded config to layer-0-outputs/0.0.1-vertical-profile.md
  3. IF NO:
     a. DEFAULT to current universal configuration (all 6 standard personas + Architect)
     b. WARN: "No vertical specified — using universal specimen library"
  4. DOWNSTREAM IMPACT:
     - 0.2.6 uses specimen_directories.system_1_override if specified
     - 0.2.7 uses persona_panel + specimen_directories.system_2_override
     - Arena loads persona specs from persona-registry/[name].md per panel config
     - Anti-slop validator includes vertical_anti_slop patterns
```

### 5. Modified Specimen Loading (0.2.6 and 0.2.7)

**System 1 (0.2.6) Loading Priority:**

```
FOR EACH SKILL with a 0.2.6 curated-gold-specimens.md:
  1. CHECK: Does vertical-specimens/[vertical]/system-1/[skill]-[vertical].md exist?
  2. IF YES: Load vertical-specific specimens FIRST (primary statistical attractors)
     THEN: Load 1-2 universal specimens as supplementary (if context allows)
  3. IF NO: Fall back to existing universal 0.2.6 file (current behavior)
```

**System 2 (0.2.7) Loading Priority:**

```
FOR EACH PERSONA in the active panel:
  1. CHECK: Does vertical-specimens/[vertical]/system-2/[persona]/ exist?
  2. IF YES: Load from vertical-specific directory (e.g., donnie-french/)
  3. IF NO: Load from universal persona-specimens/[persona]/ (current behavior)
  4. NICHE MATCHING: Even for universal personas, prefer vertical-relevant specimens
     (e.g., for golf: Makepeace's info-product proof style > financial newsletter style;
      Clemens' mechanism simplification > health-specific supplement claims)
```

---

## The Donnie French Persona

### Why Donnie French

- Anthony's primary client is Performance Golf
- Donnie French is a prolific, successful golf instruction copywriter
- His voice is native to the golf instruction market
- Having his actual copy as specimens + his approach as a persona ensures golf copy sounds like golf copy, not like health copy with golf nouns

### Persona Specification (Draft — Anthony to refine)

```yaml
persona:
  name: "Donnie French"
  slot: 4  # Replaces Ogilvy in Golf vertical
  specialty: "Golf Instruction DTC / Entertainment + Education"
  core_strength: "Conversational authority, golfer-to-golfer relatability, visual storytelling of golf scenarios"
  primary_focus: "Making instruction feel like a breakthrough tip from your buddy who just dropped 10 strokes"

  philosophy: |
    TBD — Anthony to provide based on deep familiarity with Donnie's work

  signature_approaches:
    - TBD (from analysis of Donnie's controls, VSLs, emails)

  when_generating:
    - TBD

  judging_lens:
    - TBD

  system_2_specimens:
    directory: "persona-specimens/07-donnie-french/"
    # Anthony to curate: best VSLs, emails, landing pages, video scripts
```

### What Anthony Needs to Provide for Donnie French

1. **3-5 best Donnie French VSL transcripts or sales pages** (verbatim text)
2. **5-10 best Donnie French email sequences or individual emails** (verbatim)
3. **2-3 landing pages or advertorials** (verbatim copy)
4. **Anthony's assessment of Donnie's philosophy and approach** (to build persona spec)
5. **What makes Donnie's copy WORK for golf** — the specific qualities that separate it from generic DR

---

## Weekend Implementation Plan (Friday Night → Sunday)

### Phase 1: Foundation (Friday Night — ~2 hours)

**Tasks (Claude-led, Anthony approves):**

| # | Task | Who | Est. Time |
|---|------|-----|-----------|
| 1.1 | Create `verticals/` directory + `golf.md` profile (draft) | Claude | 15 min |
| 1.2 | Create `vertical-specimens/golf/system-1/` directory structure | Claude | 10 min |
| 1.3 | Create `vertical-specimens/golf/system-2/donnie-french/` directory | Claude | 5 min |
| 1.4 | Create `persona-registry/` directory, extract existing personas from ARENA-PERSONA-PANEL.md into individual files | Claude | 30 min |
| 1.5 | Create `0.0.1-vertical-profile-loader.md` microskill spec | Claude | 20 min |
| 1.6 | Modify loading protocol in 0.2.6 and 0.2.7 to check for vertical overrides | Claude | 30 min |
| 1.7 | Update ARENA-PERSONA-PANEL.md v3.0 to load from persona-registry + vertical config | Claude | 20 min |

### Phase 2: Golf Specimen Curation (Saturday — Anthony-heavy, ~4-6 hours)

This is the HIGH-VALUE, HUMAN-REQUIRED work. Anthony curates the best examples.

| # | Task | Who | Est. Time |
|---|------|-----|-----------|
| 2.1 | **Donnie French specimens** — Collect 3-5 best VSL transcripts/sales pages | Anthony | 1-2 hrs |
| 2.2 | **Donnie French persona** — Write philosophy, approach, judging lens | Anthony + Claude | 30 min |
| 2.3 | **Golf headlines specimens** — Curate 5-10 best golf instruction headlines (verbatim from controls) | Anthony | 45 min |
| 2.4 | **Golf leads specimens** — Curate 3-5 best golf instruction leads | Anthony | 45 min |
| 2.5 | **Golf story specimens** — Curate 2-3 best golf transformation stories | Anthony | 30 min |
| 2.6 | **Golf mechanism narrative specimens** — Curate 2-3 best golf swing/technique mechanism explanations | Anthony | 30 min |
| 2.7 | **Golf close specimens** — Curate 2-3 best golf instruction closes/CTAs | Anthony | 20 min |
| 2.8 | **Golf proof specimens** — Curate best testimonials, score improvements, stats | Anthony | 20 min |
| 2.9 | Persist all curated specimens to vertical-specimens/golf/ | Claude | 30 min per batch |

### Phase 3: Engine Integration (Saturday evening / Sunday morning — ~3 hours)

| # | Task | Who | Est. Time |
|---|------|-----|-----------|
| 3.1 | Wire Donnie French persona into persona-registry | Claude | 30 min |
| 3.2 | Write golf-specific 0.2.6 specimen files (per-skill) from Anthony's curated samples | Claude | 1 hr |
| 3.3 | Write golf-specific 0.2.7 loader recommendations for each skill | Claude | 45 min |
| 3.4 | Update all 16 AGENT.md files to reference vertical profile loader | Claude | 45 min |
| 3.5 | Update CLAUDE.md v3.7 with Vertical Profile Protocol section | Claude | 30 min |

### Phase 4: Validation (Sunday — ~2 hours)

| # | Task | Who | Est. Time |
|---|------|-----|-----------|
| 4.1 | Dry-run: Load golf vertical profile for a hypothetical PG project, verify all specimens load correctly | Claude | 30 min |
| 4.2 | Test: Generate 3 golf headlines using golf vertical — compare quality to non-vertical output | Anthony + Claude | 45 min |
| 4.3 | Test: Run a mini-Arena (1 round, 7 competitors with Donnie French in slot 4) on a golf headline task | Anthony + Claude | 45 min |
| 4.4 | Anthony review: Does the golf output sound more "golf" and less "health copy with golf words"? | Anthony | 15 min |

---

## What Changes vs. What Stays

### UNCHANGED (zero modifications needed)
- ARENA-CORE-PROTOCOL.md (3-round, critique-revise, learning briefs)
- SYNTHESIZER-LAYER.md (phrase-level hybrids)
- MC-CHECK Protocol (all checkpoints)
- Anti-Degradation System (all 20 skills)
- Per-Microskill Output Protocol
- Model Assignment Tables
- Enforcement Gates
- Learning Capture Protocol
- Taste Capture Protocol
- Context Zones
- All 20 AGENT.md files (except Layer 0 table addition)

### MODIFIED (surgical changes)
- ARENA-PERSONA-PANEL.md → v3.0 (configurable panel from registry + vertical)
- 0.2.6 loading protocol → check for vertical override first
- 0.2.7 loading protocol → check for vertical override first
- PERSONA-VOICE-LOADING-PROTOCOL.md → add vertical-aware selection
- CLAUDE.md → v3.7 (add Vertical Profile Protocol section)
- All 16 AGENT.md Layer 0 tables → add 0.0.1 row
- All 16 per-skill 0.2.7 files → add vertical-aware selection logic

### NEW (created from scratch)
- `verticals/` directory + profile files
- `vertical-specimens/` directory + per-vertical specimens
- `persona-registry/` directory + individual persona files
- `0.0.1-vertical-profile-loader.md` microskill (in each skill)
- Donnie French persona specification
- Donnie French System 2 specimens

---

## Future Verticals (After Golf Proves the Pattern)

Once golf is working and producing better PG copy:

1. **Health** — Easiest to populate (Clemens specimens already strong, most existing gold specimens are health-adjacent). Primary task: curate per-skill specimens that are purely health.
2. **Finance** — Makepeace + Stansberry specimens already exist. May want a finance-specific persona (Stansberry? Dan Kennedy for biz-op?).
3. **Personal Development** — Weakest current specimen base. Will need significant curation. Consider: Tony Robbins copy, Mindvalley copy, meditation/wellness copy.
4. **Technology** — Unique challenge. Limited traditional DR examples. May need adapted framework for tech/SaaS B2C.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Donnie French specimens insufficient (can't find enough verbatim copy) | Medium | High | Start with what Anthony has access to; supplement with Performance Golf's own controls |
| Vertical override breaks existing non-vertical projects | Low | High | Fallback to universal is the default — vertical is opt-in |
| Persona registry adds complexity without proportional gain | Low | Medium | Registry is just file reorganization — the content is unchanged |
| Weekend timeline too aggressive | Medium | Medium | Phase 2 (curation) is the bottleneck and is human-dependent; adjust scope if needed |
| Cross-vertical specimens still bleed through | Low | Medium | Vertical profile is structural forcing, not suggestion — override takes priority |

---

## Decision Points for Anthony

Before starting implementation:

1. **Confirm Ogilvy → Donnie French swap for golf** — Is Ogilvy the right persona to drop? (He rarely wins Arena rounds; his specimens are general consumer, not instruction)
2. **Confirm Donnie French as the golf persona** — Is there a better golf-native voice? Someone whose copy Anthony has studied more?
3. **Specimen access** — Does Anthony have access to enough Donnie French verbatim copy to create meaningful specimens (minimum 5-10 pieces)?
4. **Weekend scope** — Start with just golf (Phase 1-4 above), or also scaffold health/finance profiles?
5. **Persona registry extraction** — OK to move personas from inline in ARENA-PERSONA-PANEL.md to individual files in persona-registry/?

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-20 | Initial plan based on Anthony's vision for vertical-specific engine versions |
