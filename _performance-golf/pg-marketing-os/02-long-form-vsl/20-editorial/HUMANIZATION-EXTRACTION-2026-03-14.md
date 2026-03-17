# Humanization Learning Extraction — 2026-03-14

**Extraction Type:** Human Edit Extraction (batch — not interactive revision)
**Source:** HTKT Transformation Academy VSL script, v5 (AI) → v6 (human-edited)
**Editor:** Anthony Flores
**Feedback origin:** Donnie and Ben flagged v5 as "still too many AI-sounding, nonhuman-sounding sentences"
**Total edits cataloged:** 108
**Patterns identified:** 12
**Protocol reference:** FEEDBACK-REVISION-PROTOCOL.md v1.2 (Human Edit Extraction intake mode)
**Self-Learning Protocol reference:** SELF-LEARNING-PROMOTION-PROTOCOL.md v1.0

---

## EXTRACTION CONTEXT

This is NOT a standard revision extraction. In a standard revision, the human gives feedback and Claude revises. Here, the human revised directly — making this the highest-fidelity signal possible, because the human edit IS the ground truth. There is no ambiguity about whether the model "correctly interpreted" the feedback.

The v5 script had been through the full long-form pipeline including Skill 20 (Editorial) with Arena competition, six expert lenses, and the anti-slop final pass (4.3). Despite all of this, the output still sounded AI-generated to experienced reviewers. The 108 edits reveal patterns that the existing anti-slop system cannot detect because they operate at the structural level, not the word level.

**Critical finding:** The existing editorial skill catches word-level AI tells effectively. What it misses are sentence-construction patterns, rhythmic habits, and section-level structural defaults. This is a new category of quality failure that requires a new detection layer.

---

## L1 OBSERVATIONS

### L-HTKT-01 — Overloaded Compound Sentences

- **Level:** L1 (Observation) — immediately promotable to L2 (14 instances in single piece = confirmed pattern)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: sentence word-count + pivot-point detection)
- **Root cause class:** anti-degradation-gap
- **Observation:** AI consistently crams 2-3 distinct ideas into single sentences using em-dash appositives and subordinate clauses. The editorial skill's anti-slop pass (4.3) does not detect sentence-level overloading because it operates at the word/phrase level. 14 instances in a single 5,500-word script = 2.5 per 1000 words — above the slop density threshold.
- **Upgrade target:** `02-long-form-vsl/20-editorial/skills/layer-4/4.3-anti-slop-final-pass.md` (add structural Category 6) AND `02-long-form-vsl/20-editorial/EDITORIAL-ANTI-DEGRADATION.md` (add detection gate)
- **Promotion potential:** HIGH — J1 classification means it can be tested directly. Detection criteria are objective: sentence word count > 30 + logical pivot word present.

### L-HTKT-02 — Tricolon Over-Signposting

- **Level:** L1 → immediately L2 (7 instances in single piece, appeared in 5 different surface forms)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: pattern-match on "Not X. Not Y. Z." structures)
- **Root cause class:** anti-degradation-gap
- **Observation:** The "Not X. Not Y. Z." three-beat parallel negation is the single most recognizable AI structural fingerprint. It appeared in seven forms: classic tricolon, four-beat parallel list, negation-then-positive, echo repetition. The human editor killed every instance. The existing anti-slop validator does not detect this pattern because it's a grammatical structure, not a banned word.
- **Upgrade target:** `02-long-form-vsl/20-editorial/skills/layer-4/4.3-anti-slop-final-pass.md` (add to Category 5: Structural Slop — "tricolon detection") AND `02-long-form-vsl/20-editorial/EDITORIAL-ANTI-DEGRADATION.md`
- **Promotion potential:** HIGH — Most distinctive AI tell at the structural level. J1 testable via regex-like pattern matching on consecutive sentence structures.

### L-HTKT-03 — Over-Explaining After Punchlines

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J2 (requires judgment: "was the punchline strong enough to stand alone?")
- **Root cause class:** skill-gap
- **Observation:** AI delivers a strong line then adds 1-3 sentences restating the same idea. The editorial skill's expert lenses (Layer 2) don't evaluate for post-punchline padding. The Makepeace lens evaluates flow but not "does this section stop at the right moment?" The largest single deletion in the edit (six paragraphs from the Permanence Reinforcement section) was entirely redundant re-explanation.
- **Upgrade target:** `02-long-form-vsl/20-editorial/EDITORIAL-AGENT.md` (add "punchline exit" criterion to Makepeace lens evaluation) AND `02-long-form-vsl/20-editorial/source-teachings/03-Humanization-Pattern-Library.md` (already created)
- **Promotion potential:** HIGH — but J2, so requires human evaluation of punchline quality judgments.

### L-HTKT-04 — Missing Spoken Emphasis Markers

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: scan paragraphs for presence of CAPS/italics/bold)
- **Root cause class:** skill-gap
- **Observation:** VSL scripts are spoken aloud, but AI writes flat prose without vocal stress markers. 6 instances where the human added CAPS or italics to signal vocal delivery. No existing microskill checks for emphasis marker density. The editorial skill evaluates copy as written text, not as spoken delivery instructions.
- **Upgrade target:** `02-long-form-vsl/20-editorial/skills/layer-4/4.3-anti-slop-final-pass.md` (add spoken emphasis density check) OR new microskill `4.4-spoken-delivery-pass.md` if 4.3 scope is too narrow
- **Promotion potential:** HIGH — J1 testable. Could be automated: "flag paragraphs with 3+ sentences and zero emphasis markers."

### L-HTKT-05 — Missing Causal Connectors

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: detect consecutive sentences with cause-effect relationship but no connector)
- **Root cause class:** teaching-gap
- **Observation:** AI drops "because," "so," "and yet" between causally related sentences, producing a list of assertions instead of a flowing argument. 6 instances. The Master Reference Document (00-Master-Reference-Document.md) teaches argument structure but doesn't explicitly teach connective tissue. The Schwartz teachings discuss sophistication calibration but not logical flow mechanics.
- **Upgrade target:** `02-long-form-vsl/20-editorial/source-teachings/00-Master-Reference-Document.md` (add section on causal connective tissue in argument construction)
- **Promotion potential:** MEDIUM — J1 testable but harder to automate than word-level detection. Requires sentence-pair analysis.

### L-HTKT-06 — Sanitized Language Where Raw Language Belongs

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J2 (requires judgment: what's the right register for this speaker/audience?)
- **Root cause class:** specimen-gap
- **Observation:** AI chooses corporate-safe language where the speaker's character demands rawness: "rethink" instead of "burn it to the ground," "outstanding" instead of "literally the best in the world." The existing System 2 specimens for the Halbert persona include personality injection, but the editorial Arena doesn't specifically score for register appropriateness relative to the SPEAKER (not just the persona). The golf vertical has 5 System 1 specimens and 0 System 2 specimens — a critical gap identified in the Specimen Vertical Segmentation audit.
- **Upgrade target:** `02-long-form-vsl/20-editorial/EDITORIAL-AGENT.md` (add "register match" criterion to Halbert lens) AND specimen gap: golf-vertical System 2 specimens needed
- **Promotion potential:** MEDIUM — J2 requires human taste validation. Register is inherently subjective and varies by speaker/brand.

### L-HTKT-07 — Vague Referents and Generic Framing

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: detect "what," "it," "things" as sentence subjects when a specific noun is available)
- **Root cause class:** anti-degradation-gap
- **Observation:** AI uses generic pronouns ("what," "it," "things") where specific nouns are available. 6 instances. This is a known LLM tendency but not addressed in the current anti-degradation rules, which focus on banned words, feature name consistency, and proof preservation — not pronoun precision.
- **Upgrade target:** `02-long-form-vsl/20-editorial/EDITORIAL-ANTI-DEGRADATION.md` (add vague referent detection to forbidden behaviors)
- **Promotion potential:** MEDIUM — J1 testable but nuanced. Not every "it" is wrong — only when a specific established noun could replace it.

### L-HTKT-08 — Speaker Emotion Over Audience Emotion

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J2 (requires judgment: whose emotion serves the argument better?)
- **Root cause class:** teaching-gap
- **Observation:** AI defaults to first-person emotional declarations instead of audience-facing empathy. 4 instances. The existing teachings cover persuasion structure (Schwartz sophistication, Halbert entertainment) but don't explicitly teach the principle of "meet the audience where they are" vs. "project the speaker's feelings." This is a core persuasion principle that should be in the Master Reference Document.
- **Upgrade target:** `02-long-form-vsl/20-editorial/source-teachings/00-Master-Reference-Document.md` (add section: "Audience Emotion vs. Speaker Emotion — the empathy hierarchy in persuasion copy")
- **Promotion potential:** HIGH — This is a fundamental persuasion principle that would improve all copy, not just editorial passes.

### L-HTKT-09 — Redundant Re-Teaching

- **Level:** L1 → immediately L2 (4 instances, but highest impact per instance — 6 full paragraphs deleted in one cut)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: detect concept re-explanation by matching technical terms used in 2+ sections)
- **Root cause class:** skill-gap
- **Observation:** AI re-explains concepts already taught earlier in the piece. The editorial skill has a Full-Read Coherence Gate (1.5) and Repetition Detection Patterns (Fix 9) that detect repeated statistics and false callbacks — but they don't detect conceptual re-teaching where the same idea is expressed in different words. The Ultra Liver failure documented repeated mechanism explanations, but the fix (Fix 9) targets statistical repetition, not conceptual repetition.
- **Upgrade target:** `02-long-form-vsl/20-editorial/skills/layer-1/1.5-full-read-coherence.md` (add "conceptual re-teaching detection" to the 7 repetition patterns)
- **Promotion potential:** HIGH — J1 testable. Extends existing Fix 9 infrastructure. The 1.5 coherence gate already detects some forms of repetition; this adds a new detection category.

### L-HTKT-10 — Unnecessary Forward-Promises

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J1 (testable: detect sentences whose only function is to announce upcoming content)
- **Root cause class:** anti-degradation-gap
- **Observation:** AI adds "You'll understand why in just a second" and "Here's what I mean" transition phrases that carry no information. 3 instances. These are a form of filler, but they're not in the existing anti-slop lexicon because they're structurally valid sentences — they just don't earn their place. The anti-slop validator (4.3) checks for filler WORDS but not filler SENTENCES.
- **Upgrade target:** `02-long-form-vsl/20-editorial/skills/layer-4/4.3-anti-slop-final-pass.md` (add Category 2 expansion: filler sentences, not just filler words/phrases)
- **Promotion potential:** MEDIUM — J1 testable but requires sentence-function analysis, which is more complex than word-level detection.

### L-HTKT-11 — Missed Callbacks and Credibility Loops

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J2 (requires judgment: which credibility elements should callback and where?)
- **Root cause class:** skill-gap
- **Observation:** AI introduces credibility elements (Dr. Troy, Scottie Scheffler, Swingfix AI) in the first half but fails to reference them in the second half or close. 3 instances. The editorial skill evaluates threading (Layer 2, criterion 7) but "threading" in the current spec means narrative continuity — not credibility asset management. No current microskill maps credibility assets and checks for callbacks.
- **Upgrade target:** `02-long-form-vsl/20-editorial/EDITORIAL-AGENT.md` (add "credibility callback audit" to Layer 5 validation) OR new microskill in Layer 5
- **Promotion potential:** MEDIUM — J2 requires judgment on which callbacks strengthen vs. clutter the close.

### L-HTKT-12 — Inconsistent Register / Metaphor Mixing

- **Level:** L1 (Observation)
- **Source:** HTKT Transformation Academy v5→v6 extraction
- **Classification:** J2 (requires judgment: what's the "correct" register for a given concept?)
- **Root cause class:** teaching-gap
- **Observation:** AI switches between scientific and metaphorical framing for the same concept ("short-term memory encoding" vs. "playing brain runs the old software"). 3 instances. The existing teachings don't address register consistency for technical concepts. The Schwartz lens evaluates sophistication calibration (matching awareness level) but not register consistency within a single argument thread.
- **Upgrade target:** `02-long-form-vsl/20-editorial/source-teachings/00-Master-Reference-Document.md` (add section: "Register Consistency — commit to scientific or metaphorical framing per concept, not both")
- **Promotion potential:** MEDIUM — J2 because "correct register" depends on audience sophistication level and speaker character.

---

## ROOT CAUSE CLASSIFICATION SUMMARY

| Root Cause Class | Count | Learnings | Interpretation |
|-----------------|-------|-----------|----------------|
| **anti-degradation-gap** | 4 | L-HTKT-01, 02, 07, 10 | The anti-degradation system enforces word-level constraints but has NO structural enforcement layer. This is the primary systemic gap. |
| **skill-gap** | 4 | L-HTKT-03, 04, 09, 11 | The editorial skill's microskills don't evaluate for structural humanization. Lenses evaluate their own criteria in isolation, missing structural AI patterns. |
| **teaching-gap** | 3 | L-HTKT-05, 08, 12 | The source teachings cover copywriting principles but don't explicitly teach structural humanization — causal connective tissue, audience-vs-speaker emotion, register consistency. |
| **specimen-gap** | 1 | L-HTKT-06 | The golf vertical has 5 System 1 specimens and 0 System 2 specimens. No specimens demonstrate "raw human voice" vs. "polished AI voice." |

**Primary systemic gap:** Anti-degradation system has no structural detection layer. The word-level anti-slop pass is necessary but not sufficient. A structural humanization pass is needed as a separate cognitive operation.

---

## PATTERN DETECTION RESULTS

### Cross-Pattern Analysis

The 12 patterns are not independent. Several interact to create compound AI signatures:

1. **Tricolon (P2) + Compound Sentence (P1):** When a tricolon appears INSIDE a compound sentence, the AI fingerprint density is at its highest. Found in 3 sections of the Transformation Academy script.

2. **Re-Teaching (P9) + Speaker Emotion (P8):** Self-congratulatory restaters that both re-explain a concept AND project the speaker's feelings. The Permanence Reinforcement section contained both: re-explained science + "I'd rather go broke building something that works." This compound pattern produced the largest single deletion (6 paragraphs).

3. **Over-Explaining (P3) + Tricolon (P2):** The worst possible sequence — mechanical emphasis followed by redundant restatement. Found in 2 sections.

### Same-Section Density

| Section | Patterns Detected | Density |
|---------|------------------|---------|
| Permanence Reinforcement | P1, P2, P3, P8, P9 | 5 patterns — CRITICAL |
| Intro/Lead | P1, P2, P7 | 3 patterns |
| The Problem | P2, P6, P8 | 3 patterns |
| Brixton's Story | P1, P3, P6 | 3 patterns |
| The Solution | P1, P2, P5 | 3 patterns |
| Phase 1 Description | P1, P4, P10 | 3 patterns |
| Phase 2 Description | P1, P2, P7 | 3 patterns |
| Phase 3 Description | P1, P5, P9 | 3 patterns |
| The Close | P3, P7, P11 | 3 patterns |

**Finding:** No section had fewer than 2 structural patterns. This confirms the problem is systemic, not isolated.

---

## ISSUE LOG ENTRIES

Per FEEDBACK-REVISION-PROTOCOL v1.1 escalation triggers: "3+ revisions to the same section" and "Same root cause class appears in 2+ revisions" both fire at the batch level.

### ISSUE-2026-03-14-001: Structural AI Pattern Layer Missing from Anti-Degradation

- **Date:** 2026-03-14
- **Class:** specification-gap
- **Skill:** 20-editorial (anti-slop validator, Layer 4.3)
- **Project:** HTKT Transformation Academy
- **Severity:** critical
- **Description:** The editorial skill's anti-slop system operates exclusively at the word/phrase level. 12 structural AI patterns (sentence construction, rhythmic habits, section-level defaults) pass through undetected. 108 human edits required to correct patterns the system cannot see.
- **Root cause:** The anti-slop validator (4.3) was designed for word-level detection (Categories 1-5). No equivalent exists for structural patterns. Category 5 (Structural Slop) covers sentence-starter repetition and paragraph monotony but not the 12 deeper patterns identified in this extraction.
- **Pattern match:** Related to Ultra Liver failure (2026-02-05/06) where repetition passed undetected — but that failure led to Fix 9 (repetition detection in Layer 1.5), which catches statistical repetition, not structural AI patterns. Different failure mode, same root cause: detection operates at too granular a level.
- **Proposed prevention:** Add structural humanization pass as Layer 4.4 (between anti-slop and final polish) using the 12-pattern library as detection criteria. OR extend 4.3 with a structural Category 6. The pass must be a SEPARATE cognitive operation from word-level detection — cannot be combined.
- **Learned:** Yes
- **Memorialized:** Yes — `03-Humanization-Pattern-Library.md` created in source-teachings
- **Activated:** No — not yet embedded in microskill execution flow

### ISSUE-2026-03-14-002: Golf Vertical Specimen Gap Contributes to Register/Voice Failures

- **Date:** 2026-03-14
- **Class:** specification-gap
- **Skill:** 20-editorial (specimen loading, Layer 0)
- **Project:** HTKT Transformation Academy
- **Severity:** moderate
- **Description:** The golf vertical has 5 System 1 specimens and 0 System 2 specimens (per Specimen Vertical Segmentation audit). Without System 2 specimens calibrated to the golf brand voice (Brixton Albert / Performance Golf), the Arena competitors generate copy in generic health-vertical voice patterns, which the editorial pass then fails to humanize because it has no golf-specific voice reference.
- **Root cause:** System 2 persona specimens are populated for health and finance verticals but not golf. The Donnie French persona directory exists but is empty.
- **Pattern match:** First occurrence for golf vertical. However, the specimen vertical segmentation audit already flagged this gap — it was known but not yet addressed.
- **Proposed prevention:** Populate golf-vertical System 2 specimens using Transformation Academy v6 as source material (it now represents human-edited, voice-calibrated copy). Create Brixton Albert / Performance Golf persona specimens from existing successful PG content.
- **Learned:** Yes
- **Memorialized:** Yes — `04-VSL-Humanization-Specimens.md` (System 1 humanization specimens — created in PR #12)
- **Activated:** Partial — System 1 specimens populated (PR #12, 2026-03-15). System 2 persona specimens (Brixton Albert / Performance Golf) remain unpopulated. The Arena register/voice gap described in this issue requires System 2 specimens specifically.

### ISSUE-2026-03-14-003: Teaching Gap — Audience Empathy vs. Speaker Emotion

- **Date:** 2026-03-14
- **Class:** specification-gap
- **Skill:** 20-editorial (source teachings, Layer 0.3)
- **Project:** HTKT Transformation Academy
- **Severity:** moderate
- **Description:** The source teachings (Master Reference Document, Schwartz, Halbert) teach argument structure and persuasion mechanics but don't explicitly teach the principle that audience emotion outranks speaker emotion in persuasion copy. 4 instances where AI defaulted to first-person emotional declarations instead of audience-facing empathy.
- **Root cause:** Teaching gap — the principle "meet the audience where they are" is implicit in Schwartz's sophistication matching but never stated explicitly as a structural rule for emotional beats.
- **Pattern match:** First occurrence. But likely to recur across all copy engines — this is a fundamental persuasion principle, not an editorial-specific issue.
- **Proposed prevention:** Add explicit section to Master Reference Document on audience-vs-speaker emotion hierarchy. Should also be added to the Arena judging criteria (e.g., Halbert lens should evaluate "does this emotional beat serve the audience or the speaker?").
- **Learned:** Yes
- **Memorialized:** Yes — Pattern 8 in Humanization Pattern Library
- **Activated:** No — not yet in Master Reference Document or Arena criteria

---

## UPGRADE TARGET MAP

| Priority | Target File | Change Required | Learning(s) | Classification |
|----------|------------|-----------------|-------------|----------------|
| 1 | `20-editorial/skills/layer-4/4.3-anti-slop-final-pass.md` | Add structural Category 6 (or new 4.4 microskill) with 12-pattern detection | L-HTKT-01, 02, 04, 07, 10 | J1 |
| 2 | `20-editorial/EDITORIAL-ANTI-DEGRADATION.md` | Add structural humanization gate + forbidden structural behaviors | L-HTKT-01, 02, 07, 10 | J1 |
| 3 | `20-editorial/EDITORIAL-AGENT.md` | Add structural humanization scoring to Arena criteria; add punchline-exit and credibility-callback evaluations to expert lenses | L-HTKT-03, 06, 11 | J2 |
| 4 | `20-editorial/source-teachings/00-Master-Reference-Document.md` | Add sections on causal connective tissue, audience-vs-speaker emotion, register consistency | L-HTKT-05, 08, 12 | J2 |
| 5 | `20-editorial/skills/layer-1/1.5-full-read-coherence.md` | Add conceptual re-teaching detection to repetition patterns | L-HTKT-09 | J1 |
| 6 | System 2 specimen population (golf vertical) | Create Brixton Albert / PG persona specimens from v6 and existing PG content | L-HTKT-06 | J2 |

---

## RECOMMENDED PROMOTION PATH

### Immediate (L1 → L3 testable now):

**L-HTKT-01 (Compound Sentences)** and **L-HTKT-02 (Tricolon)** should be promoted directly to L3 because:
- They are J1 (objective, testable)
- They already have 14 and 7 instances respectively (far exceeds the L2 "2+ campaigns" threshold — and while these are from a single piece, the density is so high that the pattern is unambiguous)
- Detection criteria are mechanically implementable
- The Humanization Pattern Library already provides the codified rules

**Promotion test:** Run the existing 4.3 anti-slop pass on the v5 script with structural Category 6 added. Count detections. Compare to human edit locations. If detection accuracy > 80%, promote to L4.

### Near-term (L2 → L3 after next campaign):

**L-HTKT-09 (Re-Teaching)** and **L-HTKT-04 (Emphasis Markers)** should be L2-confirmed after the next long-form VSL production. If the same patterns appear, promote to L3 testing.

### Deferred (J2 — need human evaluation):

**L-HTKT-03, 06, 08, 11, 12** are J2 and require human taste validation before promotion. The Humanization Pattern Library provides the reference material for human evaluation, but the actual promotion decision requires A/B comparison of editorial output with and without these constraints.

---

## CONNECTION TO FEEDBACK-REVISION PROTOCOL

This extraction demonstrates a new intake mode for the Learning Extraction pipeline: **Human Edit Extraction**. Unlike the standard mode (human gives feedback → Claude revises → Claude extracts learning), this mode processes diffs between AI output and human-edited output directly.

**Advantages of this mode:**
1. No ambiguity about whether the model "correctly interpreted" the feedback
2. The human edit IS the ground truth — no interpretation needed
3. Produces higher-fidelity pattern data because every change is intentional
4. Can process 100+ edits in a single extraction vs. one-at-a-time revision feedback

**Recommendation:** Add "Human Edit Extraction" as a recognized intake mode in FEEDBACK-REVISION-PROTOCOL.md v1.2, with the procedure:
1. Human edits AI output directly (saves as new version)
2. Claude diffs the two versions
3. Claude catalogs every edit and classifies into structural patterns
4. Claude runs root cause classification on each pattern
5. Claude generates L1 observations, checks for L2 patterns, creates issue-log entries
6. Output: pattern library + taste preferences + learning log entries + specimen candidates

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-14 | Initial extraction from HTKT Transformation Academy v5→v6 human edit. 12 L1 observations, 3 issue-log entries, 6 upgrade targets mapped. |
