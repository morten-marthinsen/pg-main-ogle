# A07-COPY-PRODUCTION-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent A07 Copy Production skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A07-COPY-PRODUCTION-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate one polished ad and consider the job done (minimum 30 variants per campaign), accept word count violations ("close enough" does not exist -- limits are absolute), or generate hook swaps that are all rewrites of the same hook type instead of spanning 4+ categories.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates one polished ad copy and considers the job done (single-variant trap)
- AI generates 3 "hook swaps" that are all rewrites of the same hook type
- AI writes 75-word scripts for 30-second slots (word count violations)
- AI compresses a 20-minute VSL into 30 seconds (DR-in-ad-clothing)
- AI writes hooks that promise content the body doesn't deliver (hook-body disconnect)
- AI generates CTA variants that all use the same psychological lever
- AI reformats scripts for different platforms instead of rewriting them
- AI generates copy without loading persona voice specimens (generic copy)
- AI writes vague visual descriptions like "Show product" instead of specific shots
- AI skips Layer 2.5 quality checks and proceeds to matrix assembly with unvalidated variants

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A07-copy-production/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A07-copy-production/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 2.5 CANNOT execute unless this file exists:**
```
[project]/A07-copy-production/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A07-copy-production/checkpoints/LAYER_2_5_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A07-copy-production/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
gate: GATE_[N]
skill: "A07-copy-production"
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"

verification:
  concepts_with_output: "[integer -- must equal approved concept count]"
  word_count_compliance: "[true/false]"
  variant_minimums_met: "[true/false]"
  quality_checks_passed: "[true/false]"

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Hook swaps per body** | 5 | HALT -- Generate more hook variants |
| **Hook categories represented** | 4 (of A-J) | HALT -- Diversify hook types |
| **CTA variants per concept** | 2 | HALT -- Generate more CTA variants |
| **CTA levers used** | All different | HALT -- Replace duplicate-lever CTAs |
| **Platform adaptations** | 1 per assigned platform | HALT -- Write missing adaptations |
| **Total variants per campaign** | 30 | HALT -- Expand variant matrix |
| **Word count for 6s** | 15 words max | HALT -- Compress to fit limit |
| **Word count for 15s** | 40 words max | HALT -- Compress to fit limit |
| **Word count for 30s** | 75 words max | HALT -- Compress to fit limit |
| **Word count for 60s** | 160 words max | HALT -- Compress to fit limit |
| **Word count for 2-3min** | 450 words max | HALT -- Compress to fit limit |
| **Hook-body coherence LOW ratings** | 0 (all MEDIUM or HIGH) | HALT -- Revise or exclude LOW pairings |
| **Compliance violations unresolved** | 0 | HALT -- Resolve all violations |
| **Visual column specificity** | 100% (no vague shots) | HALT -- Add shot specificity |
| **Persona voice specimens loaded** | 3-5 minimum | HALT -- Load specimens |
| **All modules filled in base copy** | 100% | HALT -- Fill empty modules |

### Word Count Is Physics, Not a Guideline

```
WORD COUNT LIMITS (ABSOLUTE -- NO TOLERANCE):

6 seconds  = 15 words  (based on 150 words/minute speech rate)
15 seconds = 40 words
30 seconds = 75 words
60 seconds = 160 words
2-3 minutes = 450 words

THESE ARE HARD LIMITS DERIVED FROM SPEECH RATE.

"158 words for a 60s slot" = PASS
"162 words for a 60s slot" = FAIL -- compress to 160
"approximately within limits" = DOES NOT EXIST

Word count violations produce unperformable scripts.
No variant passes Gate 2.5 with word count violations.
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "One polished ad is better than 30 variants" | The variant matrix IS the deliverable. Testing requires volume. | HALT -- Generate minimum 30 variants |
| "These hook variants are similar but each is unique" | Hook swaps must be DIFFERENT hook TYPES, not rewrites | HALT -- Diversify hook types across 4+ categories |
| "Word count is approximately within limits" | Limits are ABSOLUTE. 161 words ≠ 160 words. | HALT -- Compress to exact limit |
| "One CTA variant is sufficient for this concept" | Minimum 2 CTAs per concept, different psychological levers | HALT -- Generate second CTA with different lever |
| "The platform adaptation is just reformatted" | Adaptations require SUBSTANTIVE rewrites (3+ differences) | HALT -- Rewrite with hook/tone/CTA changes |
| "We have enough variants for testing" | Minimum 30 variants per campaign is non-negotiable | HALT -- Expand variant matrix |
| "Quality over quantity on variants" | Testing requires volume. Both quality AND quantity required. | HALT -- Generate more variants |
| "I'll load specimens after I draft" | Specimens BEFORE generation, never after | HALT -- Load specimens first |
| "These CTAs are different — one says 'click' and one says 'tap'" | Different words ≠ different levers. Must use different psychology. | HALT -- Use different CTA levers |
| "The hook-body disconnect is minor" | LOW coherence ratings must be revised or excluded, not accepted | HALT -- Revise or exclude |
| "Close enough to word count" | There is no "close enough." The limit is the limit. | HALT -- Compress to exact limit |

---

## STRUCTURAL FIX 4: A07-SPECIFIC MC-CHECK

```yaml
COPY-PRODUCTION-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  specimen_verification:
    persona_voice_specimens_loaded: [Y/N]
    loaded_verbatim: [Y/N]
    specimen_count: [integer -- must be 3-5]
    if_any_no: "STOP -- Load persona voice specimens verbatim"

  variant_counts:
    concepts_with_base_copy: [integer]
    hook_swaps_per_concept: [list of integers -- each must be >= 5]
    hook_categories_represented_per_concept: [list -- each must be >= 4]
    cta_variants_per_concept: [list of integers -- each must be >= 2]
    cta_levers_different: [Y/N]
    platform_adaptations_per_concept: [list of integers]
    total_variants: [integer -- must be >= 30]
    if_any_below_minimum: "STOP -- Generate more variants"

  word_count_check:
    all_variants_within_limits: [Y/N]
    over_limit_count: [integer]
    if_any_over: "STOP -- Compress over-limit scripts before proceeding"

  hook_body_coherence:
    total_combinations: [integer]
    high_ratings: [integer]
    medium_ratings: [integer]
    low_ratings: [integer]
    if_low_ratings_exist: "STOP -- Revise or exclude LOW-rated pairings"

  quality_checks:
    compliance_violations: [integer]
    compliance_resolved: [integer]
    visual_specificity_pass: [Y/N]
    tone_consistency_pass: [Y/N]
    if_any_fail: "STOP -- Resolve quality issues"

  rationalization_check:
    am_i_accepting_single_variant_output: [Y/N]
    am_i_accepting_word_count_violations: [Y/N]
    am_i_generating_without_specimens: [Y/N]
    am_i_accepting_hook_body_disconnect: [Y/N]
    am_i_accepting_duplicate_cta_levers: [Y/N]
    am_i_reformatting_instead_of_rewriting_platforms: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_SPECIMENS | HALT_VARIANTS | HALT_WORD_COUNT | HALT_COHERENCE | HALT_QUALITY]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which concepts were completed and which variants were generated is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A07-copy-production/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-2.5-outputs/
  layer-3-outputs/
  layer-4-outputs/
  AD-COPY-FINAL/           # Final copy variant files (organized by platform)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A07-copy-production"
created: "[date]"
last_updated: "[date]"
current_layer: "[0/1/2/2.5/3/4]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

concepts_from_a06:
  - concept_id: "C-001"
    name: "[from A06]"
    status: "[PENDING | BASE_COPY_DONE | VARIANTS_DONE | QUALITY_CHECKED | COMPLETE]"
    base_copy_written: [Y/N]
    hook_swaps: [integer]
    cta_variants: [integer]
    platform_adaptations: [integer]
    total_variants: [integer]
  - concept_id: "C-002"
    name: "[from A06]"
    status: "[PENDING | BASE_COPY_DONE | VARIANTS_DONE | QUALITY_CHECKED | COMPLETE]"
    base_copy_written: [Y/N]
    hook_swaps: [integer]
    cta_variants: [integer]
    platform_adaptations: [integer]
    total_variants: [integer]

variant_counts:
  total: [integer -- must be >= 30]
  target: 90
  status: "[BELOW_MINIMUM | ACCEPTABLE | TARGET_MET]"

gate_status:
  GATE_0: [PASS/FAIL/PENDING]
  GATE_1: [PASS/FAIL/PENDING]
  GATE_2: [PASS/FAIL/PENDING]
  GATE_2_5: [PASS/FAIL/PENDING]
  GATE_3: [PASS/FAIL/PENDING]
  GATE_4: [PASS/FAIL/PENDING]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" -- statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

```
VALID GATE STATUSES (checkpoint files):
  PASS (the ONLY status that allows progression to next layer)

VALID DECISION STATUSES (validation layer):
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "word count is approximately right"
  "hook categories are close enough"
  "these CTA variants are different enough"
  "compliance violations are minor"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing base copy or variant files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/A07-copy-production/layer-1-outputs/[base-copy-files]
     - [project]/A07-copy-production/layer-2-outputs/[variant-files]
     - [project]/A07-copy-production/AD-COPY-FINAL/[platform]/[variant-files]
     - [project]/[wrong path]/[stale files]
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol -- BEFORE any A07 execution:**

```
SESSION STARTUP:
  1. READ this file (A07-COPY-PRODUCTION-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A07-COPY-PRODUCTION-AGENT.md -- agent architecture and constraints
  3. READ AD-ENGINE-CLAUDE.md -- The 5 Laws, variant architecture, word count enforcement
  4. READ AD-SCRIPT-STRUCTURES.md -- frameworks, word count tables, AV format
  5. IF resuming: READ PROJECT-STATE.md for current layer
  6. IF resuming: READ checkpoint files to verify layer completion
  7. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  8. ONLY THEN begin execution

NEVER begin copy production without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-campaign-brief-loader | layer-0-outputs/0.1-campaign-brief-loader.md | 1KB |
| 0 | 0.2-arena-results-loader | layer-0-outputs/0.2-arena-results-loader.md | 2KB |
| 0 | 0.3-script-architecture-loader | layer-0-outputs/0.3-script-architecture-loader.md | 2KB |
| 0 | 0.4-visual-direction-loader | layer-0-outputs/0.4-visual-direction-loader.md | 1KB |
| 0 | 0.5-format-strategy-loader | layer-0-outputs/0.5-format-strategy-loader.md | 1KB |
| 0 | 0.6-hook-matrix-loader | layer-0-outputs/0.6-hook-matrix-loader.md | 1KB |
| 0 | 0.7-persona-voice-loader | layer-0-outputs/0.7-persona-voice-loader.md | 2KB |
| 1 | 1.1-concept-brief-extraction | layer-1-outputs/1.1-concept-brief-extraction.md | 2KB |
| 1 | 1.2-base-copy-concept-1 | layer-1-outputs/1.2-base-copy-concept-1.md | 5KB |
| 1 | 1.3-base-copy-concept-2 | layer-1-outputs/1.3-base-copy-concept-2.md | 5KB |
| 1 | 1.4-base-copy-concept-3 | layer-1-outputs/1.4-base-copy-concept-3.md | 5KB |
| 1 | 1.5-base-copy-validator | layer-1-outputs/1.5-base-copy-validator.md | 3KB |
| 2 | 2.1-hook-swap-generation | layer-2-outputs/2.1-hook-swap-generation.md | 5KB |
| 2 | 2.2-cta-variant-generation | layer-2-outputs/2.2-cta-variant-generation.md | 3KB |
| 2 | 2.3-platform-adaptation | layer-2-outputs/2.3-platform-adaptation.md | 5KB |
| 2 | 2.4-variant-inventory | layer-2-outputs/2.4-variant-inventory.md | 3KB |
| 2.5 | 2.5.1-word-count-verification | layer-2.5-outputs/2.5.1-word-count-verification.md | 3KB |
| 2.5 | 2.5.2-hook-body-coherence-check | layer-2.5-outputs/2.5.2-hook-body-coherence-check.md | 3KB |
| 2.5 | 2.5.3-compliance-scan | layer-2.5-outputs/2.5.3-compliance-scan.md | 3KB |
| 2.5 | 2.5.4-tone-consistency-check | layer-2.5-outputs/2.5.4-tone-consistency-check.md | 2KB |
| 3 | 3.1-variant-id-assignment | layer-3-outputs/3.1-variant-id-assignment.md | 2KB |
| 3 | 3.2-per-variant-file-creation | layer-3-outputs/3.2-per-variant-file-creation.md | 3KB |
| 3 | 3.3-variant-matrix-summary | layer-3-outputs/3.3-variant-matrix-summary.md | 5KB |

**ADDITIONAL OUTPUT:** AD-COPY-FINAL/ directory with individual variant files organized by platform (created in Layer 3, microskill 3.2).

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. Executing microskills without reading their .md spec files
2. Producing summary output without per-microskill files
3. Checkpoint YAML without microskill output file listing
4. Output files below minimum size thresholds
5. Output files missing required section headers from spec

---

## VARIANT GENERATION ENFORCEMENT (THE CORE DELIVERABLE)

### The Single-Variant Trap

**The operational reality:**
- 3 concepts x 5 hooks x 2 CTAs = 30 variants MINIMUM
- 3 concepts x 10 hooks x 3 CTAs = 90 variants TARGET
- Single-variant output is a PROTOCOL VIOLATION

**Why variants are the product:**
- Testing requires volume
- One hook can outperform another by 300%
- CTAs using different psychological levers produce different conversion rates
- Platform adaptations capture platform-specific user behavior
- The variant matrix is the deliverable, not a single polished ad

### Hook Swap Enforcement

```
HOOK SWAP REQUIREMENTS:

MINIMUM per concept: 5 hook swaps
TARGET per concept: 10 hook swaps

EACH hook swap MUST:
  1. Use a DIFFERENT hook TYPE from AD-HOOK-TAXONOMY.md
  2. Span at least 4 different hook CATEGORIES (A-J)
  3. Lead coherently into the existing body
  4. Meet the word count budget for the hook module
  5. Be classified by taxonomy type and category

"Different hooks" = DIFFERENT TYPES, not rewritten versions of the same type.

Hook Swap 1: A3 (Surprising Fact) -- "Did you know..."
Hook Swap 2: A3 (Surprising Fact) -- "You won't believe..."
Hook Swap 3: A3 (Surprising Fact) -- "Here's a shocking fact..."

THESE ARE NOT 3 DIFFERENT HOOKS. These are 3 rewrites of the SAME type.

CORRECT diversity:
Hook Swap 1: A3 (Surprising Fact)
Hook Swap 2: B1 (Direct Address)
Hook Swap 3: C2 (Problem Amplification)
Hook Swap 4: D4 (Expert Authority)
Hook Swap 5: F1 (Before/After)

IF hook swaps don't span 4+ categories: GATE CLOSED -- generate more diverse hooks.
```

### CTA Variant Enforcement

```
CTA VARIANT REQUIREMENTS:

MINIMUM per concept: 2 CTA variants
TARGET per concept: 3 CTA variants

EACH CTA variant MUST:
  1. Use a DIFFERENT psychological lever from the CTA Lever Taxonomy
  2. Be classified by lever type
  3. Match platform-native CTA conventions
  4. Meet the word count budget for the CTA module
  5. Flow naturally from the body/proof module

CTA LEVER TAXONOMY:
  - Urgency (time pressure)
  - Risk Reversal (remove anxiety)
  - Low-Friction (reduce commitment)
  - Social Proof (bandwagon)
  - Curiosity Continuation (open loop)
  - Direct Command (simple instruction)
  - Value Restatement (remind of value)

"Different CTAs" = DIFFERENT LEVERS, not different words for the same lever.

CTA Variant 1: "Click now"
CTA Variant 2: "Tap now"
CTA Variant 3: "Order now"

THESE ARE NOT 3 DIFFERENT CTAs. These all use the same lever (Direct Command).

CORRECT diversity:
CTA Variant 1: Direct Command -- "Tap the link below"
CTA Variant 2: Risk Reversal -- "Try it for 60 days. Full refund if you're not thrilled."
CTA Variant 3: Curiosity Continuation -- "See what your results could look like"

IF CTA variants use the same lever: GATE CLOSED -- replace duplicates with different levers.
```

### Platform Adaptation Enforcement

```
PLATFORM ADAPTATION REQUIREMENTS:

REQUIRED: 1 adaptation per assigned platform from A03

EACH platform adaptation MUST demonstrate at least 3 SUBSTANTIVE DIFFERENCES:

1. HOOK APPROACH:
   - TikTok: Pattern interrupt in frame 1, raw/immediate
   - YouTube: Value before 5s skip, structured
   - Meta: Sound-off capable, text overlay carries hook
   - Google: Search intent aligned, keyword-conscious

2. TONE REGISTER:
   - TikTok: Conversational, peer-to-peer, UGC-native
   - YouTube: Polished, authoritative
   - Meta: Visual-forward, concise
   - Google: Professional, benefit-led

3. CTA FORMAT:
   - TikTok: "Link in bio" / swipe-up
   - YouTube: "Click the link below" / end screen
   - Meta: CTA button + text
   - Google: Headline CTA, description CTA, sitelinks

PLATFORM ADAPTATIONS ARE REWRITES, NOT REFORMATS.

WRONG: Same script with aspect ratio change
RIGHT: Substantive rewrite with hook/tone/CTA differences

IF platform adaptation lacks 3 substantive differences: GATE CLOSED -- rewrite the adaptation.
```

---

## WORD COUNT ENFORCEMENT (ABSOLUTE LIMITS)

### Why Word Count Is Physics

```
SPEECH RATE: 150 words per minute (industry standard for voiceover)

DERIVATION:
  6 seconds  = 6/60 * 150 = 15 words
  15 seconds = 15/60 * 150 = 37.5 words → 40 words (rounded up for natural phrasing)
  30 seconds = 30/60 * 150 = 75 words
  60 seconds = 60/60 * 150 = 150 words → 160 words (allows for natural pauses)
  2-3 minutes = 2.5 * 150 = 375 words → 450 words (allows for emphasis/pauses)

These are HARD LIMITS.
Exceeding them produces scripts that cannot be performed at natural speaking rate.
```

### Word Count Verification Protocol (Layer 2.5.1)

```
FOR EVERY VARIANT:

1. Count words in AUDIO column ONLY (visual column does not contribute to spoken time)
2. Compare to hard limit for target ad length
3. Produce WORD COUNT COMPLIANCE TABLE with PASS/FAIL per variant
4. ANY variant with FAIL status is returned to Layer 2 for compression

WORD COUNT COMPLIANCE TABLE FORMAT:

| VAR ID | CONCEPT | TYPE | PLATFORM | LIMIT | ACTUAL | STATUS |
|--------|---------|------|----------|-------|--------|--------|
| V-001  | C-001   | base | Meta     | 160   | 152    | PASS   |
| V-002  | C-001   | hook_1 | Meta   | 160   | 158    | PASS   |
| V-003  | C-001   | hook_2 | Meta   | 160   | 167    | FAIL   |

IF ANY FAIL: GATE_2_5 CLOSED -- return FAIL variants to Layer 2 for compression.

NO TOLERANCE. 161 words for a 60s slot = FAIL.
"approximately within limits" DOES NOT EXIST.
```

---

## HOOK-BODY COHERENCE ENFORCEMENT (LAYER 2.5.2)

### The Problem

Hooks and bodies are generated separately for modular testing. This creates the risk of hook-body disconnect: hooks that promise content the body does not deliver.

### The Fix

**MANDATORY hook-body coherence check for every hook-body combination.**

```
HOOK-BODY COHERENCE MATRIX:

For each hook variant + body combination:
  1. Identify what the hook PROMISES
  2. Identify what the body DELIVERS
  3. Rate coherence: HIGH / MEDIUM / LOW
  4. Document issue if LOW

COHERENCE RATINGS:

HIGH: Hook promise is fully delivered by the body. Setup flows naturally from hook.
MEDIUM: Minor mismatch (e.g., timeframe claim slightly different) but acceptable.
LOW: Hook promises content the body doesn't deliver. Disconnect is jarring.

EXAMPLE OF LOW:
  Hook: "The 3 foods destroying your gut"
  Body: Discusses energy levels and metabolism (no gut health, no 3 foods)
  Rating: LOW -- Hook promises 3 specific foods, body doesn't deliver

ENFORCEMENT:
  - LOW-rated combinations MUST be revised or excluded from the variant matrix
  - MEDIUM-rated combinations are acceptable but flagged for human review
  - HIGH-rated combinations proceed to matrix assembly

IF any LOW-rated combinations exist AND are not revised/excluded: GATE_2_5 CLOSED.
```

---

## VISUAL COLUMN SPECIFICITY ENFORCEMENT

### The Problem

AI generates vague visual descriptions like "Show product" or "B-roll of nature" instead of specific shot instructions.

### The Fix

**Every row in the visual column MUST specify:**
1. Shot type (CU/MS/WS/etc.)
2. Subject (what's in frame)
3. Action (what's happening)
4. Duration (seconds)
5. Text overlay content (if any)
6. Transition (cut/dissolve/swipe)

```
VAGUE (PROTOCOL VIOLATION):
| VISUAL | AUDIO |
|--------|-------|
| Show product | "Discover the secret..." |

SPECIFIC (ACCEPTABLE):
| VISUAL | AUDIO |
|--------|-------|
| CU -- Subject holding product bottle, looking at camera. Text overlay: "The 3-Second Morning Habit". Duration: 3s. Cut. | "Discover the 3-second morning habit that changed everything..." |

VISUAL SPECIFICITY CHECK (Layer 1.5):
  - Every visual column row must have shot type + subject + action
  - "Show product" = PROTOCOL VIOLATION
  - "B-roll of nature" = PROTOCOL VIOLATION
  - Generic descriptions = PROTOCOL VIOLATION

IF visual specificity check fails: GATE_1 CLOSED -- add visual specificity to all base copies.
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A07-COPY-PRODUCTION-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A07-COPY-PRODUCTION-AGENT.md read
[ ] AD-ENGINE-CLAUDE.md read
[ ] AD-SCRIPT-STRUCTURES.md read
[ ] AD-HOOK-TAXONOMY.md loaded
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (A06, A04, A05, A03, A02, Skill 09, vertical profile)

LAYER 0 (LOADING):
[ ] A06 AD-ARENA-RESULTS.md loaded (approved concepts)
[ ] A04 SCRIPT-PACKAGE.md loaded (script architectures)
[ ] A05 VISUAL-DIRECTION-PACKAGE.md loaded (visual treatments)
[ ] A03 FORMAT-STRATEGY.md loaded (platform assignments)
[ ] A02 HOOK-ANGLE-MATRIX.md loaded (hook taxonomy context)
[ ] Campaign Brief loaded (Skill 09)
[ ] Vertical profile loaded (compliance constraints)
[ ] Soul.md loaded if exists (voice constraints)
[ ] Persona voice specimens loaded (3-5 verbatim)
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (BASE COPY GENERATION):
[ ] Per-concept mini-briefs extracted
[ ] Base copy written for every approved concept
[ ] All modules filled ([HOOK]+[SETUP]+[MECHANISM]+[PROOF]+[CTA])
[ ] AV format correct (VISUAL | AUDIO two-column)
[ ] Word count within limits for every base copy
[ ] Visual column specific (no vague shots)
[ ] Framework compliance validated
[ ] Voice consistency validated
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (VARIANT GENERATION):
[ ] Hook swaps generated (minimum 5 per body)
[ ] Hook swaps span 4+ hook categories
[ ] Hook swaps classified by taxonomy type
[ ] CTA variants generated (minimum 2 per concept)
[ ] CTA variants use DIFFERENT psychological levers
[ ] CTA variants classified by lever type
[ ] Platform adaptations generated (1 per assigned platform)
[ ] Platform adaptations have 3+ substantive differences
[ ] Variant inventory cataloged
[ ] Total variants >= 30
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (QUALITY CHECK -- MANDATORY, CANNOT BE SKIPPED):
[ ] Word count verification for ALL variants
[ ] All word count PASS (zero FAIL variants)
[ ] Hook-body coherence check for all combinations
[ ] All coherence ratings MEDIUM or HIGH (zero LOW ratings)
[ ] Compliance scan for all variants
[ ] All compliance violations resolved
[ ] Tone consistency check for all concepts
[ ] All concepts pass tone consistency
[ ] LAYER_2_5_COMPLETE.yaml created

LAYER 3 (MATRIX ASSEMBLY):
[ ] Unique variant IDs assigned to every variant
[ ] Individual variant files created in AD-COPY-FINAL/
[ ] Files organized by platform
[ ] Variant matrix summary created
[ ] Test priority recommendations included
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] COPY-PRODUCTION-PACKAGE.md created
[ ] execution-log.md complete
[ ] All per-microskill output files exist
[ ] All checkpoint files exist
[ ] PROJECT-STATE.md updated with completion
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with skill completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY specimens were loaded (check execution log)
[ ] VERIFY variant minimums met (check variant inventory)
[ ] VERIFY word count compliance (check compliance table)
[ ] VERIFY hook-body coherence (check coherence matrix)
[ ] If specimens skipped, RETURN to Layer 0
[ ] If variant minimums not met, RETURN to Layer 2
[ ] If word count violations exist, RETURN to Layer 2
[ ] If hook-body disconnects exist, RETURN to Layer 2.5
```

---

## KEY INSIGHT

> **"Variants are the product, not a single polished ad. The variant matrix is the deliverable. Word count is physics, not a guideline. Hook-body coherence is mandatory, not optional. Testing requires volume — 30+ variants minimum."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (23 microskills + AD-COPY-FINAL directory), implementation checklist. Full A07 anti-degradation architecture including variant generation enforcement (hook swap diversity, CTA lever differentiation, platform adaptation substantive differences), word count enforcement (absolute limits with no tolerance), hook-body coherence enforcement (LOW ratings must be revised/excluded), visual column specificity enforcement (no vague shots), compliance scan integration, tone consistency checks. Variant minimum 30 per campaign, hook categories 4+, CTA levers all different, platform adaptations 3+ substantive differences. |
