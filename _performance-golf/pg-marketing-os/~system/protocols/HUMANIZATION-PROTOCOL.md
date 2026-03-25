# Humanization Protocol — Structural AI Pattern Detection and Continuous Improvement

**Version:** 1.1
**Created:** 2026-03-15
**Updated:** 2026-03-15
**Purpose:** Detect and eliminate structural AI patterns that survive word-level anti-slop enforcement. This protocol defines how human edits feed a living pattern library that makes the system progressively less AI-sounding with every campaign.
**Authority:** This protocol has EQUAL authority to EXECUTION-GUARDRAILS.md and ENGINE-CORE.md. All generation skills must enforce humanization constraints.
**Source:** HTKT Transformation Academy v5→v6 human edit extraction (108 edits, 12 structural patterns identified)

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [The 3-Layer Humanization Model](#the-3-layer-humanization-model)
- [The Pattern Library — Living Document](#the-pattern-library--living-document)
- [Human Edit Extraction Procedure](#human-edit-extraction-procedure)
- [Cross-Engine Application](#cross-engine-application)
- [Generation-Time Enforcement](#generation-time-enforcement)
- [Post-Generation Structural Pass](#post-generation-structural-pass)
- [Humanization Scoring](#humanization-scoring)
- [Integration with Existing Protocols](#integration-with-existing-protocols)
- [Pattern Library Growth Mechanism](#pattern-library-growth-mechanism)

---

## WHY THIS EXISTS

After the full marketing-OS pipeline — research, strategy, Arena competition, editorial with six expert lenses, anti-slop final pass — copy still sounds AI-generated to experienced human reviewers. The problem is not in the **words.** It is in the **structures.** Sentence construction, rhythmic habits, emotional pacing, and section-level defaults that are invisible at the word level but immediately recognizable to a human ear.

The existing anti-slop system catches what AI *says.* This protocol catches how AI *builds sentences and paragraphs.*

**The critical finding:** 108 human edits on a single 5,500-word script revealed 12 structural AI anti-patterns. No section had fewer than 2 patterns. The highest-density section had 5. These patterns survived a full editorial Arena with adversarial critique. They are systemic, not isolated — and they affect ALL generation skills, not just editorial.

**The fix:** A living humanization system that:
1. Extracts structural patterns from every human edit
2. Accumulates patterns in a growing library
3. Enforces patterns at generation time across all engines
4. Scores humanization as a universal quality metric
5. Gets better with every campaign because the library grows

---

## THE 3-LAYER HUMANIZATION MODEL

| Layer | What It Catches | Enforcement Mechanism | Where It Lives |
|-------|----------------|----------------------|----------------|
| **Layer 1: Word-Level** | Banned words, filler phrases, cliches, corporate jargon | Anti-slop lexicon + 4.3 Anti-Slop Final Pass | Per-engine ANTI-DEGRADATION.md + anti-slop validator |
| **Layer 2: Structural** | Sentence construction patterns, rhythmic habits, section-level defaults, compound overloading, tricolon signposting, redundant re-teaching | Humanization Pattern Library + structural pass at generation time | This protocol + Pattern Library |
| **Layer 3: Voice** | Register drift, persona inconsistency, speaker emotion vs. audience emotion, sanitized language where raw belongs | System 1 + System 2 specimens, voice/soul constraints | SPECIMEN-GUIDE.md + per-engine soul files |

**The gap this protocol fills:** Layer 1 has been enforced since v1.0. Layer 3 has been enforced since Arena/Synthesizer v2.0. Layer 2 did not exist until now. It is the layer between word-level cleaning and voice-level calibration — the structural skeleton of how AI constructs prose.

---

## THE PATTERN LIBRARY — LIVING DOCUMENT

### Canonical Location

The system-level pattern library is:
```
02-long-form-vsl/20-editorial/source-teachings/03-Humanization-Pattern-Library.md
```

This is the canonical, authoritative source for all structural AI anti-patterns across marketing-OS. It currently contains 12 patterns from the founding extraction (HTKT Transformation Academy v5→v6). It will grow with every human edit.

**Why it lives in the editorial engine:** The editorial skill is where humanization enforcement is most granular (Layer 4.3/4.4 microskills, expert lenses, Arena scoring). The pattern library is a teaching document — it belongs with the skill that has the deepest humanization execution. Other engines reference it, they don't duplicate it.

### Humanization Specimen Library

The specimen library provides POSITIVE examples (what human writing looks like) alongside the pattern library's NEGATIVE examples (what AI writing looks like):

```
~system/humanization-specimens/
  MANIFEST.md                            # Master index, version history
  0.3.H-humanization-loader-TEMPLATE.md  # Loader template for all copy-gen skills

  tier-1-controls/by-function/           # Pre-AI human copy indexed by function
  tier-1-controls/by-anti-pattern/       # Cross-reference by anti-pattern
  client-work-diffs/                     # Before/after specimens from human edits
  engine-packs/                          # Pre-curated 2-3KB selections per engine
```

**Per-Skill Loader:** `0.3.H-humanization-loader.md` deployed in each copy-gen skill's `skills/layer-0/`. Loads:
1. Pattern priming (~100 tokens) — Top 5 structural rules to AVOID
2. Engine pack (~2.5KB verbatim) — 2-3 pre-curated human passages for that engine type
3. Total context cost: 3KB max

**Specimen Sources:**
- **Client Work Diffs:** Before/after specimens from human edits on AI output. Currently 10 specimens from HTKT v5→v6.
- **Tier 1 Controls:** Pre-AI human copy from master copywriters (Phase 2 — pending extraction sessions).

### Pattern Entry Format

Every pattern in the library follows this structure:

```markdown
### PATTERN [N]: [NAME]

**Severity:** CRITICAL | HIGH | MEDIUM
**Frequency:** [N] instances across [M] campaigns
**Detection difficulty:** Easy | Medium | Hard
**Classification:** J1 (objective, testable) | J2 (requires judgment)
**First observed:** [Campaign, date]
**Confirmed across:** [List of campaigns where pattern appeared]

**Description:** [What the pattern is and why it sounds AI-generated]

**Detection Criteria:**
- [Specific, testable conditions that identify this pattern]

**Before/After Examples:**
> **AI:** [The AI-generated version]
> **Human:** [The human-edited version]

**Codified Rule:** [The rule that prevents this pattern]

**Replacement Strategy:**
1. [Step-by-step fix procedure]
```

### Current Inventory (v1.0 — 12 Patterns)

| # | Pattern | Severity | Class | Detection |
|---|---------|----------|-------|-----------|
| 1 | Overloaded Compound Sentences | CRITICAL | J1 | Word count > 30 + logical pivot |
| 2 | Tricolon Over-Signposting | CRITICAL | J1 | "Not X. Not Y. Z." structures |
| 3 | Over-Explaining After Punchlines | HIGH | J2 | Post-punchline restatement |
| 4 | Missing Spoken Emphasis Markers | HIGH | J1 | Paragraphs without CAPS/italics |
| 5 | Missing Causal Connectors | MEDIUM | J1 | Consecutive causal sentences without "because/so/yet" |
| 6 | Sanitized Language | MEDIUM | J2 | Corporate-safe where raw belongs |
| 7 | Vague Referents | MEDIUM | J1 | "what/it/things" as subjects |
| 8 | Speaker Emotion Over Audience | HIGH | J2 | First-person emotion vs. audience empathy |
| 9 | Redundant Re-Teaching | HIGH | J1 | Concept re-explanation in different words |
| 10 | Unnecessary Forward-Promises | MEDIUM | J1 | Filler sentences announcing upcoming content |
| 11 | Missed Callbacks | MEDIUM | J2 | Credibility elements introduced but never referenced again |
| 12 | Register/Metaphor Mixing | MEDIUM | J2 | Scientific + metaphorical framing for same concept |

---

## HUMAN EDIT EXTRACTION PROCEDURE

This is the primary intake mechanism that feeds the pattern library. Every time a human edits AI-generated copy, this procedure runs.

### When to Run

Run Human Edit Extraction whenever:
- A human edits AI output directly (saves a new version)
- Client feedback results in human-made changes (not AI-revised changes)
- A human reviewer marks sections as "AI-sounding" and rewrites them
- Any batch of 5+ human edits occurs on a single output

### The 6-Step Procedure

```
STEP 1: DIFF
  - Obtain both versions: AI output (pre-edit) and human-edited output (post-edit)
  - Generate a line-by-line diff
  - Catalog every individual edit (insertion, deletion, replacement, rewrite)

STEP 2: CLASSIFY EACH EDIT
  For each edit:
  - Is this a word-level fix? (typo, banned word replacement, phrasing) → LOG but don't pattern-analyze
  - Is this a structural fix? (sentence split, section rewrite, rhythm change, emotional pacing) → PATTERN ANALYZE
  - Is this a voice fix? (register shift, persona injection, audience targeting) → LOG as specimen candidate

STEP 3: PATTERN ANALYSIS (Structural Edits Only)
  For each structural edit:
  a. Does it match an EXISTING pattern in the library? → INCREMENT frequency count
  b. Does it represent a NEW pattern not yet in the library? → CREATE L1 observation
  c. What is the root cause class? (anti-degradation-gap | skill-gap | teaching-gap | specimen-gap)

STEP 4: CROSS-EDIT PATTERN DETECTION
  - Group edits by pattern type
  - Calculate density: patterns per 1,000 words
  - Identify compound patterns (2+ patterns co-occurring in same section)
  - Identify section density (which sections trigger the most patterns)

STEP 5: LIBRARY UPDATE
  For EXISTING patterns with new instances:
  - Update frequency count
  - Add new before/after examples if they illustrate a new surface form
  - Update "Confirmed across" list with current campaign

  For NEW patterns:
  - Create L1 observation in learning log
  - If 3+ instances in single extraction → immediately L2
  - Draft pattern entry for the library (pending human approval for J2 patterns)
  - J1 patterns with 5+ instances → draft for immediate library addition

STEP 6: OUTPUT
  Produce extraction report with:
  - Total edit count and breakdown (word-level / structural / voice)
  - Existing pattern matches with updated frequencies
  - New pattern candidates with L1 observations
  - Issue-log entries for any critical/high-severity findings
  - Specimen candidates (voice-level edits) for potential System 1/2 population
  - Updated pattern library diff (what changed)
```

### Extraction Report Template

Save to: `~outputs/[project-code]/humanization-extraction-[date].md`

```markdown
# Humanization Learning Extraction — [Date]

**Extraction Type:** Human Edit Extraction
**Source:** [Project name, version A → version B]
**Editor:** [Who made the edits]
**Total edits cataloged:** [N]
**Patterns matched:** [N existing] | **New patterns:** [N]

## EDIT CLASSIFICATION
- Word-level fixes: [N] ([%])
- Structural fixes: [N] ([%])
- Voice fixes: [N] ([%])

## EXISTING PATTERN MATCHES
[Table of existing patterns that fired, with new instance count]

## NEW PATTERN CANDIDATES
[L1 observations for patterns not yet in the library]

## LIBRARY UPDATES APPLIED
[Diff of what changed in the pattern library]

## ISSUE LOG ENTRIES
[Any new issue-log entries generated]

## SPECIMEN CANDIDATES
[Voice-level edits that could become System 1/2 specimens]
```

---

## CROSS-ENGINE APPLICATION

The 12 structural patterns (and all future patterns) are NOT editorial-specific. They affect every skill that generates prose. The enforcement intensity varies by engine type.

### Engine Application Matrix

| Engine | Enforcement Level | Which Patterns | When |
|--------|------------------|----------------|------|
| **02-long-form-vsl** | FULL — all 12 patterns, structural pass mandatory | All | Layer 4 (post-generation, pre-output) |
| **04-page-builder (LP)** | MODERATE — section-level patterns | P1, P2, P3, P9, P10 (sentence and section patterns) | During section assembly |
| **04-page-builder (PDP)** | FULL — all applicable patterns | All except P4 (emphasis markers less relevant for scan-read copy) | Post-generation section review |
| **05-upsells** | FULL — short-form is MORE susceptible | All | Post-generation review |
| **06-checkout** | MODERATE — transactional copy is shorter | P1, P2, P7, P9 | Post-generation review |
| **07-emails** | FULL | All | Post-generation review |
| **08-ads** | HIGH — ad copy is extremely pattern-sensitive | All except P9 (ads are too short for re-teaching) | Arena scoring + post-generation |
| **09-advertorials** | FULL — long-form editorial requires full enforcement | All | Layer 4 equivalent |
| **10-organic** | MODERATE — platform-native content has its own patterns | P1, P2, P3, P6, P7, P8 | Post-generation review |

### Pattern Applicability by Copy Length

| Copy Length | Primary Risk Patterns | Why |
|-------------|----------------------|-----|
| **< 200 words** (ads, CTAs) | P2 (tricolon), P6 (sanitized language), P7 (vague referents) | Short copy amplifies structural patterns — every sentence is visible |
| **200-1000 words** (emails, upsells, sections) | P1, P2, P3, P7, P10 | Medium copy has enough length for compound patterns but not enough to hide them |
| **1000+ words** (VSL, advertorials, long-form) | ALL patterns | Long copy accumulates patterns — density becomes obvious to readers |

---

## GENERATION-TIME ENFORCEMENT

### Pre-Generation Priming

Before generating ANY prose output, the generating model should be primed with the top 5 most frequent patterns from the library. This is a loading step, not a generation step.

```yaml
humanization_priming:
  instruction: "Before generating, review these structural AI patterns to AVOID:"
  patterns:
    - "Do NOT cram 2+ ideas into one sentence. One idea, one sentence. Split at logical pivots."
    - "Do NOT use tricolon structures (Not X. Not Y. Z.). Vary your emphasis patterns."
    - "Do NOT over-explain after punchlines. Let strong lines stand alone."
    - "Do NOT use vague referents (it, what, things) when a specific noun is available."
    - "Do NOT re-teach concepts already established earlier in the piece."
  source: "HUMANIZATION-PROTOCOL.md — top 5 patterns by frequency"
```

**Why pre-generation priming works:** It's cheaper to prevent patterns than to detect and fix them post-generation. The priming adds ~100 tokens to the generation prompt but eliminates the most common structural patterns at the source.

### Anti-Pattern Density Threshold

Any generated section exceeding **2 structural patterns per 500 words** triggers an automatic re-generation with explicit pattern avoidance instructions. This threshold was calibrated from the founding extraction: the worst sections in the HTKT script had 5 patterns per ~600 words.

---

## POST-GENERATION STRUCTURAL PASS

After generation and before output, a structural humanization pass reviews the output against the full pattern library.

### Pass Procedure

```
FOR each section in generated output:
  1. Read section aloud mentally — flag anything that sounds "written by AI"
  2. Check against ALL patterns in the library:
     - J1 patterns: apply detection criteria mechanically
     - J2 patterns: apply judgment against before/after examples
  3. For each detected pattern:
     - Apply the replacement strategy from the library
     - Log the detection (pattern ID, section, original text, replacement)
  4. After all patterns resolved, re-read the section for flow coherence

OUTPUT: structural_pass_log with:
  - patterns_detected: [count]
  - patterns_resolved: [count]
  - density_before: [patterns per 1000 words]
  - density_after: [patterns per 1000 words]
  - sections_flagged: [list]
```

### Separation of Concerns

The structural humanization pass is a **SEPARATE cognitive operation** from:
- Word-level anti-slop (which checks vocabulary)
- Voice calibration (which checks persona consistency)
- Copy quality evaluation (which checks persuasion effectiveness)

Do NOT combine humanization checking with other quality passes. Cognitive multitasking degrades detection accuracy. Run the structural pass as its own step.

---

## HUMANIZATION SCORING

### Humanization Score (H-Score)

A 1-10 scale measuring how human the output sounds at the structural level.

| Score | Description | Action |
|-------|-------------|--------|
| 9-10 | Indistinguishable from human writing at structural level | PASS — no patterns detected |
| 7-8 | Minor structural patterns present but not distracting | PASS — log for tracking |
| 5-6 | Multiple patterns present, experienced reader would flag | REVISE — apply replacement strategies |
| 3-4 | Dense structural patterns, sounds obviously AI | REGENERATE with explicit pattern avoidance |
| 1-2 | Pervasive AI structures, no human editing occurred | REGENERATE from scratch |

### Minimum Thresholds

| Context | Minimum H-Score | Consequence of Failure |
|---------|-----------------|----------------------|
| Arena competition | 7.0 | Disqualification — output cannot win Arena with H-Score < 7 |
| Final output (client delivery) | 8.0 | Mandatory structural revision before delivery |
| Draft/internal | 6.0 | Flag for review, proceed with warning |

### Arena Integration

Structural humanization is evaluated under the existing **Anti-Pattern Enforcement** criterion (formerly "Slop Elimination"), keeping the Arena at 7 criteria with no weight rebalancing needed.

- **Criterion:** Anti-Pattern Enforcement (10% weight — unchanged)
- **Scope widened:** Word-level slop detection (existing) + structural AI pattern detection (new)
- **Evaluator:** Critic (Opus) — evaluates both word-level and structural patterns
- **Minimum threshold:** 7.0 — outputs below this are disqualified regardless of other scores
- **Why not an 8th criterion:** The 7-criterion Arena is calibrated and hardcoded across 120+ files. Adding an 8th would require gate file rewrites, weight rebalancing, and risk silent enforcement failures. Widening the existing criterion absorbs structural patterns naturally with zero architecture disruption.

---

## INTEGRATION WITH EXISTING PROTOCOLS

### Self-Learning Promotion Protocol

Human Edit Extraction produces L1 observations that feed directly into the L1-L6 progression:
- L1: New pattern observation from a single extraction
- L2: Pattern confirmed across 2+ extractions (or 5+ instances in single extraction)
- L3: Pattern added to library with detection criteria and replacement strategy (tested fix)
- L4: Human confirms the pattern entry improves output quality (promoted rule)
- L5: Pattern embedded in generation-time priming and post-generation structural pass (embedded in skill)
- L6: System naturally avoids the pattern without explicit reminder (system behavior)

### Feedback-Revision Protocol

Level 2+ revisions must run the structural humanization pass on revised sections. The pass uses the full pattern library as its reference.

**Human Edit Extraction** is a recognized intake mode in the Feedback-Revision Protocol (v1.2). When a human edits AI output directly instead of giving revision feedback, the extraction procedure defined in this protocol runs automatically.

### Arena (ARENA-CORE-PROTOCOL)

The Analyst Agent's Analytical Brief includes humanization observations when structural patterns are detected across competing outputs. danger_signals flagged for structural AI patterns flow into the Issue Logger via the existing automatic intake.

### Issue Logger

Humanization patterns detected at critical density (3+ patterns per 500 words) generate automatic issue-log entries with class `specification-gap` and severity based on density:
- 3-4 patterns/500 words → moderate
- 5+ patterns/500 words → critical

---

## PATTERN LIBRARY GROWTH MECHANISM

### How the Library Grows

```
Campaign N: Human edits AI output
    ↓
Human Edit Extraction runs (this protocol, Step 1-6)
    ↓
Existing patterns: frequency updated, new examples added
New patterns: L1 observation created
    ↓
If new pattern has 5+ instances → L2 automatic
If new pattern is J1 → L3 testable immediately
    ↓
Self-Learning Promotion Protocol evaluates (bounded trial)
    ↓
Promoted patterns → added to library
    ↓
Campaign N+1: Generation-time priming includes new patterns
    ↓
Pattern density decreases because library grew
    ↓
Fewer human edits needed for structural humanization
    ↓
Repeat
```

### Growth Governance

- **J1 patterns** (objective, testable) can be added to the library after passing the bounded trial (3 examples, all pass)
- **J2 patterns** (judgment-required) need explicit human approval before library addition
- **Pattern removal:** If a pattern has not been detected in 5+ consecutive campaigns, flag it for possible retirement. Do NOT auto-remove — human must confirm.
- **Pattern merging:** If two patterns are discovered to be surface forms of the same root cause, merge them into a single pattern with both detection criteria sets.

### Versioning

The pattern library uses semantic versioning:
- **Minor increment** (1.1, 1.2): New patterns added, existing patterns updated
- **Major increment** (2.0): Structural reorganization, pattern categories redefined

Every library update is logged in the pattern library's version history with:
- Which patterns were added/updated
- Source campaign
- Number of human edits that informed the update

---

## MANDATORY ENFORCEMENT CHECKLIST

For every skill that generates prose:

```
[ ] Pattern library loaded at Layer 0 (or equivalent)
[ ] 0.3.H humanization loader loaded at Layer 0 (engine-specific pack)
[ ] Generation-time priming applied (top 5 patterns)
[ ] Post-generation structural pass executed
[ ] H-Score calculated and logged
[ ] Any H-Score < threshold triggers revision/regeneration
[ ] All pattern detections logged in structural_pass_log
```

For every human edit extraction:

```
[ ] Both versions obtained (AI and human-edited)
[ ] All edits cataloged and classified
[ ] Existing pattern matches logged with frequency update
[ ] New pattern candidates created as L1 observations
[ ] Issue-log entries generated for critical findings
[ ] Pattern library updated (frequency counts, new examples)
[ ] Extraction report saved to ~outputs/[project-code]/
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-15 | Initial creation. 3-layer humanization model, Human Edit Extraction procedure (6-step), cross-engine application matrix, generation-time priming, post-generation structural pass, H-Score (1-10), Arena integration, Self-Learning/Feedback-Revision/Issue Logger wiring, pattern library growth mechanism with governance. Founding extraction: 12 patterns from HTKT Transformation Academy v5→v6 (108 human edits). |
| 1.1 | 2026-03-15 | Added specimen library paths and loader references. Linked to `~system/humanization-specimens/` directory structure, 0.3.H loader template, engine packs, and mandatory enforcement checklist update. |
