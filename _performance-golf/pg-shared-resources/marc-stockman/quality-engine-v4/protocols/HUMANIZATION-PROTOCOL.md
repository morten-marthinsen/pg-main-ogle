# Humanization Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** Detect and eliminate structural AI patterns through a 3-layer model, 12 anti-patterns, and a continuous learning system fed by human edit extraction
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

After the full pipeline — research, strategy, competition, editorial with multiple expert lenses, anti-slop pass — output still sounds AI-generated to experienced human reviewers. The problem is not in the **words.** It is in the **structures.** Sentence construction, rhythmic habits, emotional pacing, and section-level defaults that are invisible at the word level but immediately recognizable to a human ear.

The existing anti-slop system catches what AI *says.* This protocol catches how AI *builds sentences and paragraphs.*

**The critical finding:** Analysis of 100+ human edits on a single 5,500-word script revealed 12 structural AI anti-patterns. No section had fewer than 2 patterns. The highest-density section had 5. These patterns survived a full editorial competition with adversarial critique. They are systemic, not isolated — and they affect ALL generation skills, not just editorial.

**The fix:** A living humanization system that:
1. Extracts structural patterns from every human edit
2. Accumulates patterns in a growing library
3. Enforces patterns at generation time across all pipeline segments
4. Scores humanization as a universal quality metric
5. Gets better with every project because the library grows

---

## THE 3-LAYER HUMANIZATION MODEL

| Layer | What It Catches | Enforcement Mechanism |
|-------|----------------|----------------------|
| **Layer 1: Word-Level** | Banned words, filler phrases, cliches, corporate jargon | Anti-slop lexicon + anti-slop final pass (see ANTI-SLOP-LEXICON.md) |
| **Layer 2: Structural** | Sentence construction patterns, rhythmic habits, section-level defaults, compound overloading, tricolon signposting, redundant re-teaching | Humanization Pattern Library + structural pass at generation time (this protocol) |
| **Layer 3: Voice** | Register drift, persona inconsistency, speaker emotion vs. audience emotion, sanitized language where raw belongs | Specimen systems, voice/tone constraints (see SPECIMEN-GUIDE.md) |

**The gap this protocol fills:** Layer 1 (word-level) and Layer 3 (voice-level) have established enforcement mechanisms. Layer 2 did not exist until this protocol. It is the structural skeleton of how AI constructs prose — between vocabulary cleaning and voice calibration.

---

## THE 12 AI ANTI-PATTERNS

These are the founding patterns extracted from human edit analysis. The library grows with every project.

| # | Pattern | Severity | Classification | Detection Method |
|---|---------|----------|---------------|-----------------|
| 1 | **Overloaded Compound Sentences** | CRITICAL | J1 (objective) | Word count > 30 + logical pivot mid-sentence |
| 2 | **Tricolon Over-Signposting** | CRITICAL | J1 (objective) | "Not X. Not Y. Z." rhetorical structures |
| 3 | **Over-Explaining After Punchlines** | HIGH | J2 (judgment) | Post-punchline restatement or elaboration |
| 4 | **Missing Spoken Emphasis Markers** | HIGH | J1 (objective) | Paragraphs without CAPS, italics, or dashes for emphasis |
| 5 | **Missing Causal Connectors** | MEDIUM | J1 (objective) | Consecutive causal sentences without "because/so/yet" |
| 6 | **Sanitized Language** | MEDIUM | J2 (judgment) | Corporate-safe phrasing where raw/direct language belongs |
| 7 | **Vague Referents** | MEDIUM | J1 (objective) | "what/it/things" as subjects when a specific noun is available |
| 8 | **Speaker Emotion Over Audience** | HIGH | J2 (judgment) | First-person emotion where audience empathy belongs |
| 9 | **Redundant Re-Teaching** | HIGH | J1 (objective) | Concept re-explanation in different words within same piece |
| 10 | **Unnecessary Forward-Promises** | MEDIUM | J1 (objective) | Filler sentences announcing upcoming content instead of delivering it |
| 11 | **Missed Callbacks** | MEDIUM | J2 (judgment) | Credibility elements introduced but never referenced again |
| 12 | **Register/Metaphor Mixing** | MEDIUM | J2 (judgment) | Scientific + metaphorical framing for same concept in same section |

### Pattern Entry Format

Every pattern in the library follows this structure:

```markdown
### PATTERN [N]: [NAME]

**Severity:** CRITICAL | HIGH | MEDIUM
**Frequency:** [N] instances across [M] projects
**Detection difficulty:** Easy | Medium | Hard
**Classification:** J1 (objective, testable) | J2 (requires judgment)
**First observed:** [Project, date]
**Confirmed across:** [List of projects where pattern appeared]

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

---

## HUMAN EDIT EXTRACTION PROCEDURE

This is the primary intake mechanism that feeds the pattern library. Every time a human edits AI-generated output, this procedure runs.

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
  - Is this a word-level fix? (typo, banned word replacement, phrasing)
    -> LOG but don't pattern-analyze
  - Is this a structural fix? (sentence split, section rewrite, rhythm change, emotional pacing)
    -> PATTERN ANALYZE
  - Is this a voice fix? (register shift, persona injection, audience targeting)
    -> LOG as specimen candidate

STEP 3: PATTERN ANALYSIS (Structural Edits Only)
  For each structural edit:
  a. Does it match an EXISTING pattern in the library? -> INCREMENT frequency count
  b. Does it represent a NEW pattern not yet in the library? -> CREATE L1 observation
  c. What is the root cause class?
     (quality-rule-gap | skill-gap | teaching-gap | specimen-gap)

STEP 4: CROSS-EDIT PATTERN DETECTION
  - Group edits by pattern type
  - Calculate density: patterns per 1,000 words
  - Identify compound patterns (2+ patterns co-occurring in same section)
  - Identify section density (which sections trigger the most patterns)

STEP 5: LIBRARY UPDATE
  For EXISTING patterns with new instances:
  - Update frequency count
  - Add new before/after examples if they illustrate a new surface form
  - Update "Confirmed across" list with current project

  For NEW patterns:
  - Create L1 observation in learning log
  - If 3+ instances in single extraction -> immediately L2
  - Draft pattern entry for the library (pending human approval for J2 patterns)
  - J1 patterns with 5+ instances -> draft for immediate library addition

STEP 6: OUTPUT
  Produce extraction report with:
  - Total edit count and breakdown (word-level / structural / voice)
  - Existing pattern matches with updated frequencies
  - New pattern candidates with L1 observations
  - Issue-log entries for any critical/high-severity findings
  - Specimen candidates (voice-level edits) for potential specimen population
  - Updated pattern library diff (what changed)
```

### Extraction Report Template

```markdown
# Humanization Learning Extraction — [Date]

**Extraction Type:** Human Edit Extraction
**Source:** [Project name, version A to version B]
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
[Voice-level edits that could become specimens]
```

---

## CROSS-PIPELINE APPLICATION

The 12 structural patterns (and all future patterns) are NOT specific to one pipeline segment. They affect every skill that generates prose. Enforcement intensity varies by output type.

### Application Matrix

| Output Type | Enforcement Level | Which Patterns | When |
|-------------|------------------|----------------|------|
| **Long-form (2000+ words)** | FULL — all patterns, structural pass mandatory | All | Post-generation, pre-output |
| **E-commerce / product pages** | FULL — all applicable patterns | All except P4 (emphasis markers less relevant for scan-read) | Post-generation section review |
| **Landing pages** | MODERATE — section-level patterns | P1, P2, P3, P9, P10 | During section assembly |
| **Short-form sales (upsells, bumps)** | FULL — short-form is MORE susceptible | All | Post-generation review |
| **Transactional (checkout, forms)** | MODERATE — shorter copy | P1, P2, P7, P9 | Post-generation review |
| **Email** | FULL | All | Post-generation review |
| **Advertising** | HIGH — ad copy is extremely pattern-sensitive | All except P9 (too short for re-teaching) | Competition scoring + post-generation |
| **Advertorials** | FULL — editorial format requires full enforcement | All | Post-generation equivalent |
| **Social/organic** | MODERATE — platform-native content has its own patterns | P1, P2, P3, P6, P7, P8 | Post-generation review |

### Pattern Risk by Copy Length

| Copy Length | Primary Risk Patterns | Why |
|-------------|----------------------|-----|
| **< 200 words** (ads, CTAs) | P2, P6, P7 | Short copy amplifies structural patterns — every sentence is visible |
| **200-1000 words** (emails, sections) | P1, P2, P3, P7, P10 | Medium copy has enough length for compound patterns but not enough to hide them |
| **1000+ words** (long-form, advertorials) | ALL patterns | Long copy accumulates patterns — density becomes obvious to readers |

---

## GENERATION-TIME ENFORCEMENT

### Pre-Generation Priming

Before generating ANY prose output, prime the model with the top 5 most frequent patterns to AVOID:

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

**Why pre-generation priming works:** It's cheaper to prevent patterns than to detect and fix them post-generation. The priming adds ~100 tokens to the prompt but eliminates the most common structural patterns at the source.

### Anti-Pattern Density Threshold

Any generated section exceeding **2 structural patterns per 500 words** triggers an automatic re-generation with explicit pattern avoidance instructions.

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

**Separation of Concerns:** The structural humanization pass is a SEPARATE cognitive operation from word-level anti-slop, voice calibration, and quality evaluation. Do NOT combine humanization checking with other quality passes. Run the structural pass as its own step.

---

## HUMANIZATION SCORING

### H-Score (1-10)

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
| Competition (Arena) | 7.0 | Disqualification — output cannot win with H-Score < 7 |
| Final output (client delivery) | 8.0 | Mandatory structural revision before delivery |
| Draft/internal | 6.0 | Flag for review, proceed with warning |

### Competition Integration

Structural humanization is evaluated under the existing anti-pattern enforcement criterion in the competition scoring, keeping the total number of criteria unchanged:
- Scope widened from word-level slop only to word-level + structural patterns
- Minimum threshold: 7.0 — outputs below this are disqualified regardless of other scores

---

## PATTERN LIBRARY GROWTH MECHANISM

### How the Library Grows

```
Project N: Human edits AI output
    |
Human Edit Extraction runs (this protocol, Steps 1-6)
    |
Existing patterns: frequency updated, new examples added
New patterns: L1 observation created
    |
If new pattern has 5+ instances -> L2 automatic
If new pattern is J1 -> L3 testable immediately
    |
Self-Learning Promotion Protocol evaluates (bounded trial)
    |
Promoted patterns -> added to library
    |
Project N+1: Generation-time priming includes new patterns
    |
Pattern density decreases because library grew
    |
Fewer human edits needed for structural humanization
    |
Repeat
```

### Growth Governance

- **J1 patterns** (objective, testable) can be added to the library after passing the bounded trial (3 examples, all pass)
- **J2 patterns** (judgment-required) need explicit human approval before library addition
- **Pattern removal:** If a pattern has not been detected in 5+ consecutive projects, flag it for possible retirement. Do NOT auto-remove — human must confirm.
- **Pattern merging:** If two patterns are discovered to be surface forms of the same root cause, merge them into a single pattern with both detection criteria sets.

### Versioning

The pattern library uses semantic versioning:
- **Minor increment** (1.1, 1.2): New patterns added, existing patterns updated
- **Major increment** (2.0): Structural reorganization, pattern categories redefined

---

## INTEGRATION WITH EXISTING PROTOCOLS

| Protocol | Integration Point |
|----------|------------------|
| **Self-Learning Promotion** | Human Edit Extraction produces L1 observations that feed the L1-L6 progression |
| **Feedback-Revision** | Level 2+ revisions must run the structural pass. Human Edit Extraction is a recognized intake mode. |
| **Competition (Arena)** | Structural patterns are evaluated under the anti-pattern enforcement criterion |
| **Issue Logger** | Patterns at critical density (3+ per 500 words) generate automatic issue-log entries |

---

## MANDATORY ENFORCEMENT CHECKLIST

For every skill that generates prose:

```
[ ] Pattern library loaded at input validation (or equivalent)
[ ] Humanization loader loaded (pipeline-segment-specific pack)
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
[ ] Extraction report saved to project outputs
```
