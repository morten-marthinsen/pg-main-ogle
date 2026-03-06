# Persona Voice Loading Protocol — System 2

**Version:** 2.0
**Created:** 2026-02-15
**Updated:** 2026-02-20
**Purpose:** Shared protocol for loading persona-specific verbatim copy specimens during Arena execution (System 2 voice calibration)
**Referenced by:** Each skill's `0.2.7-persona-voice-loader.md` microskill file

---

## Why System 2 Exists

The Arena system uses a dual-system architecture for specimen loading:

- **System 1** (0.2.6-curated-gold-specimens.md): Type-indexed STRUCTURAL PATTERNS — what to build. All 7 competitors load the SAME type-matched specimens.
- **System 2** (this protocol + persona-specimens/): VOICE CALIBRATION — actual copy written by the legendary copywriter each persona represents. Each competitor loads THEIR OWN writer's specimens.

**Without System 2:** Arena competitors generate from DESCRIPTIONS of writing styles — "Halbert is entertaining and uses raw personality." This produces a surface-level imitation.

**With System 2:** Competitors generate from EXAMPLES of actual token sequences — 25 chapters of Halbert's Boron Letters, 4 Makepeace controls, 10 Schwartz ads. These specimens reshape probability distributions toward each writer's authentic voice, vocabulary, rhythm, sentence structure, and persuasion patterns.

**The quality difference is categorical.** Description-based voice = costume. Specimen-based voice = DNA.

---

## Specimen Library (Current Inventory)

| # | Persona | Directory | Files | Content Summary |
|---|---------|-----------|-------|-----------------|
| 1 | **Makepeace** | `persona-specimens/01-clayton-makepeace/` | 4 | 4 full controls: Speed Profits (financial), Shameless Sobs (health), 17-Cent Life Saver (health), Stock Market Lambs (financial) |
| 2 | **Halbert** | `persona-specimens/02-gary-halbert/` | 27 | 25 Boron Letters (personal/instructional) + 2 newsletters (teaching) |
| 3 | **Schwartz** | `persona-specimens/03-eugene-schwartz/` | 14 | 10 ads with full OCR body copy + "I Write With My Ears" process essay + 204 headline compendium + interview |
| 4 | **Ogilvy** | `persona-specimens/04-david-ogilvy/` | 30 | 29 ads with full OCR body copy + 1 partial. Rolls-Royce, Hathaway, Zippo, Dove, Guinness, How-To series |
| 5 | **Clemens** | `persona-specimens/05-craig-clemens/` | 4 | 3 Gundry VSL transcripts (Bio Complete 3, Total Restore, Vital Reds) + mechanism analysis |
| 6 | **Bencivenga** | `persona-specimens/06-gary-bencivenga/` | 22 | 17 Marketing Maxims + homepage sales letter + holiday message + 3 promo sales letters (Kurobuta Ham, Olive Oil Club, 100 Seminar DVD Course) |
| 7 | **The Architect** | N/A | 0 | Synthesizes from all 6 — no dedicated specimens |

**Total: 101 specimen files across 6 personas.**

---

## Loading Protocol

### When to Load

System 2 specimens are loaded during **Layer 0** (Foundation), specifically in the `0.2.7-persona-voice-loader.md` microskill. They are loaded ONCE and held in context for Arena execution.

### How Many to Load

| Arena Mode | Specimens per Persona | Rationale |
|-----------|----------------------|-----------|
| `strategic` | 2-3 | Teaching/philosophy specimens. Lower token cost since strategic output is shorter. |
| `generative_full_draft` | 2-3 | Selling voice specimens matched to campaign niche. Quality-critical — this is where voice matters most. |
| `editorial_revision` | 1-2 | Mix of teaching + selling for voice reference during revision. |

**Minimum: 2 specimens per persona (12 total across 6 personas).**
**The Architect loads 0 voice specimens — it synthesizes from the other 6.**

### Selection Priority by Arena Mode

#### Strategic Mode (Skills 03-08)

Strategic skills generate concepts, frameworks, and analytical outputs. Load specimens that show each writer's THINKING, not just their selling.

| Persona | Priority Specimens | Why |
|---------|-------------------|-----|
| **Makepeace** | Speed Profits OR Shameless Sobs (match niche) + one other | Makepeace's controls show persuasion ARCHITECTURE — how he structures arguments |
| **Halbert** | Boron Letters ch01-05 (marketing fundamentals) + starving-crowd newsletter | Halbert's strategic thinking about audiences, positioning, market selection |
| **Schwartz** | `schwartz-i-write-with-my-ears.md` + 1 niche-matched ad | Schwartz's process essay shows how he THINKS about markets + sophistication |
| **Ogilvy** | 1-2 ads matching campaign type | Ogilvy's research methodology visible in his ad construction |
| **Clemens** | Bio Complete 3 VSL + mechanism analysis | Clemens' mechanism-first strategic approach |
| **Bencivenga** | `bencivenga-maxim-12.md` (Persuasion Equation) + 1-2 strategy-relevant maxims | Bencivenga's framework thinking — the Persuasion Equation IS strategic |

#### Generative Full-Draft Mode (Skills 10-18)

Generative skills write actual copy. Load specimens that show each writer's SELLING VOICE — the exact vocabulary, rhythm, sentence patterns, and persuasion techniques they use.

| Persona | Priority Specimens | Why |
|---------|-------------------|-----|
| **Makepeace** | 2 controls matching campaign niche (financial vs health) | Makepeace's flow, transitions, persuasion momentum in actual copy |
| **Halbert** | 2-3 Boron Letters (ch06-15 for persuasion techniques) + killer-headlines newsletter | Halbert's raw personality, entertainment, hook power |
| **Schwartz** | 2 ads matching campaign niche + 204-headline-compendium (if headlines skill) | Schwartz's sophisticated market calibration in action |
| **Ogilvy** | 2-3 ads matching campaign type and niche | Ogilvy's research-dense, credibility-first writing style |
| **Clemens** | Bio Complete 3 VSL (always) + niche-matched VSL | Clemens' mechanism simplification, binary reframes, conversational science |
| **Bencivenga** | `bencivenga-maxim-12.md` + 1-2 promo sales letters matching offer type | Bencivenga's proof architecture and persuasion equation in selling mode |

#### Editorial Revision Mode (Skill 20)

Editorial revision requires voice reference to evaluate whether copy SOUNDS like it should. Load a mix.

| Persona | Priority Specimens | Why |
|---------|-------------------|-----|
| **Makepeace** | 1 control (niche-matched) | Flow and architecture reference for revision |
| **Halbert** | 1-2 Boron Letters | Personality and entertainment calibration |
| **Schwartz** | 1 ad + process essay | Sophistication calibration + process reference |
| **Ogilvy** | 1-2 ads | Credibility and clarity standard |
| **Clemens** | Bio Complete 3 VSL | Mechanism clarity standard |
| **Bencivenga** | `bencivenga-maxim-12.md` + 1 maxim | Proof-first revision lens |

---

## Niche Matching Guide

When the protocol says "match niche," use this guide:

| Campaign Niche | Makepeace | Schwartz | Ogilvy | Clemens | Bencivenga |
|---------------|-----------|----------|--------|---------|------------|
| **Health/Supplement** | Shameless Sobs, 17-Cent Life Saver | burn-disease, miracle-diet-arthritis, swedish-miracle, british-miracle | Dove, Guinness (food/body) | Bio Complete 3, Total Restore, Vital Reds | Kurobuta Ham, Olive Oil (food products) |
| **Financial/Investment** | Speed Profits, Stock Market Lambs | half-a-million, boardroom-reports | Shell, How-To series | N/A (use Bio Complete 3 as default) | 100-seminar-letter (high-ticket info) |
| **Info Product/Education** | Speed Profits (info-style proof story) | N/A (use process essay) | How-To series | N/A (use Bio Complete 3) | 100-seminar-letter, homepage-sales-letter |
| **Beauty/Anti-Aging** | 17-Cent Life Saver | models-stay-young, miracle-drug-reverses-aging | Dove, Hathaway (elegance) | Vital Reds | Olive Oil (natural products) |
| **Consumer Product** | N/A (use health controls) | food-best-medicine | Rolls-Royce, Zippo, Dove | N/A | Kurobuta Ham, Olive Oil |
| **Golf/Sports** | Speed Profits (info product flow) | Process essay (sophistication theory) | N/A (use Donnie French) | Bio Complete 3 (mechanism architecture) | 100-seminar-letter (high-ticket info) |

---

## Vertical-Aware Loading Protocol (v2.0)

When a Vertical Profile is active (loaded by `0.0.1-vertical-profile-loader.md`), specimen loading follows this priority:

### Step 1: Determine Active Persona Panel

```
IF vertical profile active:
  → Read persona_panel from verticals/[vertical].md
  → Load persona specs from persona-registry/[name].md
  → Panel may differ from default (e.g., Golf uses Donnie French instead of Ogilvy)
ELSE:
  → Use default panel: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, Architect
```

### Step 2: Locate Specimen Sources

```
FOR EACH persona in active panel:
  1. CHECK: Does vertical-specimens/[vertical]/system-2/[persona]/ exist?
     → YES: Load from vertical-specific directory (PRIMARY source)
     → NO: Load from universal persona-specimens/[persona]/ (FALLBACK)

  2. WITHIN the source directory, apply niche matching:
     → Use the Niche Matching Guide above for universal specimens
     → For vertical-specific specimens, ALL files are pre-curated for relevance
```

### Step 3: Vertical-Specific Persona Loading

For personas that ONLY exist in certain verticals (e.g., Donnie French for golf):

```
IF persona has ONLY vertical-specific specimens:
  → Load ALL available specimens (they are already curated for this vertical)
  → No niche matching needed (all specimens are niche-matched by definition)
  → Minimum threshold still applies: 2 specimens per persona
```

### Example: Golf Vertical Loading

```
Golf vertical persona panel: Makepeace, Halbert, Schwartz, Donnie French, Clemens, Bencivenga, Architect

Loading order:
  Makepeace  → persona-specimens/01-clayton-makepeace/ (niche-match: info product specimens)
  Halbert    → persona-specimens/02-gary-halbert/ (niche-match: personality/hook specimens)
  Schwartz   → persona-specimens/03-eugene-schwartz/ (niche-match: process essay + info ads)
  Donnie     → vertical-specimens/golf/system-2/donnie-french/ (ALL specimens — golf-native)
  Clemens    → persona-specimens/05-craig-clemens/ (niche-match: mechanism architecture)
  Bencivenga → persona-specimens/06-gary-bencivenga/ (niche-match: high-ticket info proof)
  Architect  → No specimens (synthesizes from all 6)
```

---

## Output Requirements

Every `0.2.7-persona-voice-loader.md` execution produces a verification file:

**Output path:** `[project]/[skill-id]-[skill-name]/layer-0-outputs/0.2.7-persona-voice-loader.md`

**Required format:**

```markdown
# 0.2.7: Persona Voice Loader (System 2)

## Execution Context
- Skill: [parent skill name]
- Arena Mode: [strategic | generative_full_draft | editorial_revision]
- Campaign Niche: [from upstream brief]
- Vertical: [golf | health | finance | personal-dev | technology | UNIVERSAL]
- Timestamp: [execution time]
- Protocol version: 2.0

## Specimens Loaded Per Persona

### 1. Makepeace
- File: [filename] ([size]) — Selected because: [reason]
- File: [filename] ([size]) — Selected because: [reason]

### 2. Halbert
- File: [filename] ([size]) — Selected because: [reason]
- File: [filename] ([size]) — Selected because: [reason]

### 3. Schwartz
- File: [filename] ([size]) — Selected because: [reason]
- File: [filename] ([size]) — Selected because: [reason]

### 4. Ogilvy
- File: [filename] ([size]) — Selected because: [reason]
- File: [filename] ([size]) — Selected because: [reason]

### 5. Clemens
- File: [filename] ([size]) — Selected because: [reason]
- File: [filename] ([size]) — Selected because: [reason]

### 6. Bencivenga
- File: [filename] ([size]) — Selected because: [reason]
- File: [filename] ([size]) — Selected because: [reason]

### 7. The Architect
- No voice specimens (synthesizes from all 6 personas)

## Verification
- Total personas loaded: 6/6
- Total specimen files loaded: [count]
- Minimum per persona (2): [PASS/FAIL]
- All specimens read VERBATIM: [Y/N]
- Niche matching applied: [Y/N]

## Quality Metrics
- Schema compliance: [Y/N]
- Minimum thresholds met: [Y/N]
```

**Minimum output file size:** 1KB

---

## Gate 0 Enhancement

When `0.2.7-persona-voice-loader.md` exists in a skill's Layer 0, Gate 0 validation MUST include:

```
GATE 0 REQUIREMENTS (with System 2):
[ ] All upstream packages loaded (0.1)
[ ] Vault intelligence loaded (0.2)
[ ] System 1 specimens loaded (0.2.6 — type-indexed structural patterns)
[ ] System 2 specimens loaded (0.2.7 — persona voice calibration)
[ ] All 6 personas have at least 2 loaded specimen files
[ ] 0.2.7 output file exists with verification section showing 6/6

IF System 2 is incomplete:
  → LOG WARNING: "System 2 loading incomplete — Arena output will lack voice differentiation"
  → PROCEED (System 2 enhances quality but does not block execution)
  → This is NOT a HALT condition — it degrades quality, not correctness
```

---

## Integration with Agent Teams

When Arena executes via Agent Teams (separate Claude instance per persona):

```
TEAM LEAD builds persona prompt package:
  1. Persona spec from ARENA-PERSONA-PANEL.md
  2. System 1 specimens from 0.2.6 (shared across all personas)
  3. System 2 specimens from persona-specimens/[persona]/ (UNIQUE per persona)
  4. Upstream packages (root cause, mechanism, promise, etc.)
  5. Skill instructions and criteria

Each persona teammate receives:
  - Their OWN System 2 specimens (2-3 files from their writer)
  - The SAME System 1 specimens (shared structural patterns)
  - Full upstream context
```

When Arena executes in single-context mode:
```
Each persona generation phase:
  1. Load persona spec
  2. Load System 2 specimens for THAT persona (not all 6 at once)
  3. Generate
  4. Compress System 2 specimens before loading next persona's
```

---

## Forbidden Behaviors

1. Running Arena without executing 0.2.7 persona voice loading
2. Loading persona specimens and SUMMARIZING them (must be VERBATIM)
3. Loading the SAME specimens for all 6 personas (each loads THEIR writer's work)
4. Loading specimens that don't match the campaign niche when niche-matched options exist
5. Skipping The Architect's specimen loading step (it loads 0, but the "0 loaded" must be verified)
6. Loading System 2 specimens WITHOUT System 1 specimens (both systems work together)
7. Claiming System 2 is loaded without producing the 0.2.7 output verification file

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-02-20 | VERTICAL-AWARE LOADING: Added Vertical-Aware Loading Protocol section (3-step process: determine panel, locate specimens, vertical-specific loading). Added Golf row to Niche Matching Guide. Added vertical field to output format. Updated protocol version to 2.0. Persona panel now configurable per vertical via persona-registry/ and verticals/ system. |
| 1.0 | 2026-02-15 | Initial creation. 101 specimen files across 6 personas. Per-mode selection matrices. Niche matching guide. Gate 0 enhancement. Agent Teams integration. |
