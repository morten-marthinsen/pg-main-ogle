# Specimen Guide
**Quality Engine v4** | Component: Protocol
**Purpose:** Golden examples framework — dual-system specimen architecture (structural patterns + voice calibration), admission criteria, type-indexed loading
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

AI models generate better output when primed with high-quality examples. But naive few-shotting creates problems: the model copies surface features rather than underlying patterns, or it mimics one example's voice while ignoring structural variety.

The Specimen Guide defines a dual-system architecture that separates WHAT to build (structural patterns) from HOW to sound (voice calibration), loads specimens by type rather than randomly, and enforces admission criteria that ensure only conversion-validated or expert-vetted examples enter the vault.

---

## DUAL-SYSTEM SPECIMEN ARCHITECTURE

### SYSTEM 1: Type-Indexed Structural Pattern Loading

Each skill maintains a curated set of gold specimens indexed by TYPE (issue type, output type, structural pattern, etc.), NOT by voice or persona. All competition perspectives load the SAME type-matched specimens.

```
LOADING PROTOCOL:
1. IDENTIFY the output type or generation goal
2. LOAD verbatim specimens matching that TYPE from the curated specimen file
3. ALL perspectives use the SAME specimens as structural pattern reference
4. HOLD specimens in active context during generation
5. Each perspective applies their EDITORIAL LENS to the same structural foundation
```

**What System 1 provides:** Structural patterns — what to build. The skeleton, the architecture, the proven structural approaches for this type of output.

**Example categories for a copywriting pipeline:**
- Lead specimens indexed by lead type (story, proclamation, prediction, secret)
- Headline specimens indexed by emotional hook type (curiosity, benefit, news, fear)
- Proof specimens indexed by proof structure (statistical, testimonial, demonstration, authority)
- Close specimens indexed by close strategy (urgency, emotional, logical, summary)

### SYSTEM 2: Voice Calibration Specimens

Each competition perspective loads ACTUAL output from their representative voice as calibration specimens. This is separate from System 1 — it provides voice texture, not structural patterns.

**What System 2 provides:** Voice calibration — how to sound. The rhythm, word choice, emotional register, and tonal signature of each perspective.

### Loading Protocol (Competition Execution)

```
FOR EACH perspective in competition:
  1. LOAD perspective specification (philosophy, approach, judging lens)
  2. READ skill-specific voice loader for specimen recommendations
  3. LOAD 2-3 perspective-specific specimens from voice specimen library
     - Select specimens per loader recommendations (skill-specific, domain-matched)
     - Match specimen domain to project domain where possible
  4. HOLD specimens in active context alongside System 1 structural specimens
  5. Perspective generates using BOTH structural patterns (System 1)
     AND voice calibration (System 2)
```

### Dual-System Interaction

| System | Source | Provides | Loaded By |
|--------|--------|----------|-----------|
| System 1 | Curated gold specimens (per-skill) | STRUCTURAL PATTERNS — what to build | All perspectives (same specimens) |
| System 2 | Voice specimen library (per-perspective) | VOICE CALIBRATION — how to sound | Each perspective (unique specimens) |

**Key Distinction:** System 1 specimens may be written by various authors. System 2 specimens are written by (or representative of) THE SPECIFIC PERSPECTIVE — ensuring authentic voice differentiation.

---

## SPECIMEN ADMISSION CRITERIA

Not every example qualifies as a specimen. The vault has admission standards.

### Tier 1: Conversion-Validated Specimens

The highest tier. These are examples that have been tested in the real market and produced measurable results.

**Admission criteria:**
- Deployed in production (real audience, real market)
- Measurable performance data (conversion rate, engagement, revenue)
- Performance exceeds category average
- Complete text preserved (no summaries, no excerpts unless the excerpt IS the unit)

**Examples:** Winning ad copy, high-converting landing pages, successful email sequences, proven sales letters.

### Tier 2: Expert-Vetted Specimens

Examples validated by domain experts but without direct conversion data.

**Admission criteria:**
- Created by recognized domain expert OR reviewed and approved by one
- Demonstrates specific technique or pattern clearly
- Complete and representative (not a cherry-picked fragment)

**Examples:** Teaching examples from master practitioners, award-winning work, expert-curated case studies.

### Tier 3: Pattern-Demonstrating Specimens

Examples that clearly demonstrate a specific structural pattern, even without conversion data or expert vetting.

**Admission criteria:**
- Clearly demonstrates one or more named patterns from the pattern library
- Structurally complete (the pattern is visible in full context)
- Annotated with the pattern it demonstrates
- Reviewed for accuracy (the pattern is correctly exemplified, not coincidental)

### The Vault Admission Test

Before admitting any specimen, apply this heuristic:

> "If this specimen were the ONLY example an AI had before generating a high-stakes deliverable, would it steer the output in the right direction?"

- **YES:** Admit to vault
- **MAYBE:** Admit with annotation noting limitations
- **NO:** Reject — mediocre specimens are worse than no specimens because they calibrate the model to mediocrity

---

## TYPE-INDEXED SPECIMEN LOADING

### Why Type-Indexing Matters

Random specimen loading creates noise. If the task is writing a story-based lead and the loaded specimen is a proclamation-based lead, the structural pattern is wrong even if the voice is right.

Type-indexed loading ensures the structural pattern matches the current task.

### Index Structure

```
specimens/
  by-function/
    leads/
      story-leads.md           # Specimens of story-based leads
      proclamation-leads.md    # Specimens of proclamation-based leads
      prediction-leads.md      # Specimens of prediction-based leads
      secret-leads.md          # Specimens of secret-based leads
    headlines/
      curiosity-headlines.md   # Specimens indexed by hook type
      benefit-headlines.md
      news-headlines.md
    proof/
      statistical-proof.md     # Specimens indexed by proof type
      testimonial-proof.md
      demonstration-proof.md
    closes/
      urgency-closes.md        # Specimens indexed by close strategy
      emotional-closes.md
      logical-closes.md
  by-perspective/
    perspective-01/            # Voice specimens for Perspective 1
    perspective-02/            # Voice specimens for Perspective 2
    perspective-03/            # Voice specimens for Perspective 3
  by-anti-pattern/
    overloaded-compounds/      # Before/after specimens for anti-pattern 1
    tricolon-signposting/      # Before/after specimens for anti-pattern 2
```

### Loading Priority

```
FOR EACH SKILL:
  System 1 (structural):
    1. CHECK: domain-specific specimens exist for this skill?
    2. YES -> Load domain-specific specimens (primary)
    3. NO -> Fall back to universal specimens
    4. MATCH specimen type to current task type

  System 2 (voice):
    1. CHECK: domain-specific voice specimens exist for this perspective?
    2. YES -> Load from domain-specific directory
    3. NO -> Load from universal voice specimens with domain-relevant selection
```

---

## DOMAIN-SPECIFIC SPECIMEN CONFIGURATION

Different domains may require different perspective configurations and specimen sources.

### Configurable Perspective Panel

The competition's perspective slots can be configured by domain:

```yaml
# Default configuration
default_panel:
  slot_1: "The Structuralist"
  slot_2: "The Provocateur"
  slot_3: "The Strategist"
  slot_4: "The Scholar"
  slot_5: "The Specialist"
  slot_6: "The Analyst"
  slot_7: "The Architect"  # ALWAYS present — non-configurable

# Domain override example
health_domain_panel:
  slot_4: "The Practitioner"  # Domain expert replaces general Scholar
  # All other slots unchanged

finance_domain_panel:
  slot_5: "The Regulatory Specialist"  # Compliance-aware replaces general Specialist
  # All other slots unchanged
```

### Domain Specimen Directories

```yaml
system_1_override: "domain-specimens/[domain]/system-1/"
system_2_override: "domain-specimens/[domain]/system-2/"
```

When a domain-specific System 1 file exists for a skill, it REPLACES the universal file as the primary structural reference. Universal specimens may supplement if context allows.

---

## HUMANIZATION SPECIMEN INTEGRATION

The Humanization Protocol (see HUMANIZATION-PROTOCOL.md) maintains its own specimen library that complements the dual-system architecture:

| Specimen Type | Source | Purpose |
|---------------|--------|---------|
| **Client work diffs** | Before/after from human edits on AI output | Shows what humans change — negative examples become positive references |
| **Pre-AI controls** | Human-written output from before AI involvement | Pure human voice reference — the gold standard |
| **Pipeline segment packs** | Pre-curated 2-3KB selections per pipeline segment | Efficient loading for generation-time priming (fits in ~100 token budget) |

These specimens provide POSITIVE examples of human writing alongside the Humanization Pattern Library's NEGATIVE examples of AI writing patterns.

---

## SPECIMEN FORBIDDEN BEHAVIORS

1. Generating ANY content without loading appropriate specimens (System 1 AND System 2)
2. Summarizing specimens instead of using VERBATIM text in active context
3. Loading specimens from the wrong domain (cross-domain contamination)
4. Using the default perspective panel when a domain profile specifies a different configuration
5. Skipping the voice loader step for any perspective
6. Holding specimens in summary form instead of active verbatim context
7. Admitting specimens that fail the vault admission test
8. Loading specimens that don't match the current task type (structural type mismatch)

---

## BUILDING YOUR SPECIMEN VAULT

### Phase 1: Collect Conversion-Validated Work
Gather your best-performing real-world output. Index by type. Preserve complete text. Record the performance metrics that qualify each specimen.

### Phase 2: Extract Expert Examples
Identify teaching examples from domain masters. Get expert review where possible. Annotate with the specific patterns each specimen demonstrates.

### Phase 3: Build Anti-Pattern Specimens
From human edit extractions (HUMANIZATION-PROTOCOL.md), build before/after specimen pairs indexed by the anti-pattern they address.

### Phase 4: Create Pipeline Segment Packs
For each pipeline segment, curate a 2-3KB selection of the most representative specimens. These are the default loading for that segment — small enough to fit in generation-time priming.

### Phase 5: Maintain and Grow
With every project, the Human Edit Extraction procedure identifies new specimen candidates. Voice-level edits become System 2 candidates. Structural corrections become anti-pattern specimens. The vault grows organically with every human touch.
