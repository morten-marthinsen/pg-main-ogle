# CopywritingEngine — ~system/SPECIMEN-GUIDE.md

**Version:** 1.0 (decomposed from CLAUDE.md v4.0)
**Created:** 2026-02-25
**Purpose:** Dual-System Specimen architecture, Persona Voice Loading, TIER1 references. Load for generation skills ONLY.
**Parent:** Read `~system/SYSTEM-CORE.md` first (always loaded). Read `~system/ARENA-PROTOCOL.md` if skill has Arena.

---

## DUAL-SYSTEM SPECIMEN ARCHITECTURE

The Arena Layer uses a dual-system architecture for specimen loading:

### SYSTEM 1: Type-Indexed Structural Pattern Loading (ACTIVE)

Each skill's `0.2.6-curated-gold-specimens.md` file contains Gold specimens indexed by TYPE (issue type, story type, proof type, etc.), NOT by persona. All 7 competitors load the SAME type-matched specimens:

```
LOADING PROTOCOL:
1. IDENTIFY issue type OR generation goal
2. LOAD verbatim specimens from 0.2.6-curated-gold-specimens.md matching that TYPE
3. ALL 7 COMPETITORS use the SAME specimens as structural pattern reference
4. HOLD specimens in active context during generation
5. Each competitor applies their EDITORIAL LENS to the same structural foundation
```

### SYSTEM 2: Persona Voice Loading (ACTIVE — Implemented 2026-02-15)

Each persona loads ACTUAL COPY from their specific writer as voice calibration specimens.

**Specimen Library:**

| Persona | Specimens Directory | File Count | Content |
|---------|-------------------|------------|---------|
| **Makepeace** | `persona-specimens/01-clayton-makepeace/` | 4 files | 4 full controls (Speed Profits, Shameless Sobs, 17-Cent Life Saver, Stock Market Lambs) |
| **Halbert** | `persona-specimens/02-gary-halbert/` | 27 files | 25 Boron Letters + 2 newsletters |
| **Schwartz** | `persona-specimens/03-eugene-schwartz/` | 14 files | 10 ads (full OCR body copy) + process essay + 204 headlines + interview |
| **Ogilvy** | `persona-specimens/04-david-ogilvy/` | 30 files | 29 ads (full OCR body copy) + 1 partial |
| **Clemens** | `persona-specimens/05-craig-clemens/` | 4 files | 3 Gundry VSL transcripts + 1 mechanism analysis |
| **Bencivenga** | `persona-specimens/06-gary-bencivenga/` | 22 files | 17 Marketing Maxims + homepage + holiday message + 3 promo sales letters |

**Shared Protocol:** `~system/protocols/PERSONA-VOICE-LOADING-PROTOCOL.md`

**Per-Skill Microskills:** Each of the 16 Arena skills has a `0.2.7-persona-voice-loader.md` microskill with skill-specific specimen recommendations.

### System 2 Loading Protocol (Arena Execution)

```
FOR EACH persona agent in Arena:
  1. LOAD persona specification from ARENA-PERSONA-PANEL.md
  2. READ skill-specific 0.2.7-persona-voice-loader.md for specimen recommendations
  3. LOAD 2-3 persona-specific specimens from persona-specimens/[persona]/
     - Select specimens per 0.2.7 recommendations (skill-specific, niche-matched)
     - For Makepeace: match financial vs. health voice to campaign niche
     - For Halbert: Boron Letters for instructional/persuasion, newsletters for teaching
     - For Schwartz: match ad niche to campaign niche
     - For Ogilvy: match campaign type (product, how-to, recruitment, etc.)
     - For Clemens: always load Bio Complete 3 (flagship) + niche-matched VSL
     - For Bencivenga: load Persuasion Equation (maxim-12) + 2 task-relevant maxims/promos
  4. HOLD specimens in active context alongside System 1 structural specimens
  5. Persona generates using BOTH structural patterns (System 1) AND voice calibration (System 2)
```

### Dual-System Interaction

- **System 1** (0.2.6 files) provides STRUCTURAL PATTERNS — what to build
- **System 2** (persona-specimens/) provides VOICE CALIBRATION — how to sound
- Both load simultaneously

**Key Distinction:** Gold specimens in 0.2.6 files are written by various copywriters. System 2 specimens are written by THE ACTUAL PERSONA — ensuring authentic voice.

---

## VERTICAL-SPECIFIC SPECIMEN LOADING

### Configurable Persona Panel

The Arena's 7 competitor slots are configured by the vertical profile:

```
DEFAULT:  Makepeace | Halbert | Schwartz | Ogilvy   | Clemens | Bencivenga | Architect
GOLF:     Makepeace | Halbert | Schwartz | Donnie French | Clemens | Bencivenga | Architect
```

- **Slot 7 (Architect):** ALWAYS present — non-configurable
- **The Critic:** ALWAYS present — non-configurable

### Specimen Loading Priority

```
FOR EACH SKILL:
  System 1 (0.2.6):
    1. CHECK: vertical-specimens/[vertical]/system-1/[skill]-[vertical].md exists?
    2. YES → Load vertical-specific specimens (primary)
    3. NO → Fall back to universal 0.2.6 file

  System 2 (0.2.7):
    1. CHECK: vertical-specimens/[vertical]/system-2/[persona]/ exists?
    2. YES → Load from vertical-specific directory
    3. NO → Load from universal persona-specimens/ with niche matching
```

---

## TIER1 EXPRESSION REFERENCE SYSTEM

### What TIER1 Is

The TIER1 Extraction Vault contains 395+ files of structured extraction data from elite direct response controls. These are conversion-validated — they worked in the real market.

**Location:** `tier1-extractions/final_merged/[vertical]/`

### How TIER1 Integrates

1. **Expression Anchoring (Skills 03, 04, 06):** TIER1 patterns score expression candidates against conversion-validated patterns
2. **Specimen Loading (All generative skills):** TIER1 provides statistical attractor specimens indexed by type
3. **Assembly Transitions (Skill 19):** 8 TIER1 transition techniques
4. **Proof Density (Skill 18):** TIER1 benchmarks for proof density by section

### TIER1 Loading Microskill (0.2.8)

Skills 03, 04, and 06 each have a `0.2.8-tier1-expression-reference.md` Layer 0 microskill that:
- Reads TIER1 extraction JSON files filtered by current project vertical
- Extracts skill-specific expression patterns
- Outputs `tier1_expression_reference.json` as queryable index

---

## SPECIMEN FORBIDDEN BEHAVIORS

1. ❌ Generating ANY content without loading appropriate specimens (System 1 AND System 2)
2. ❌ Summarizing specimens instead of using VERBATIM text
3. ❌ Loading specimens from wrong vertical (cross-vertical contamination)
4. ❌ Using default persona panel when vertical profile specifies different
5. ❌ Skipping 0.2.7 persona voice loader microskill
6. ❌ Holding specimens in summary form instead of active verbatim context
