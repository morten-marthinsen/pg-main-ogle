---
name: subject-line-engine
description: >-
  Generate high-performing email subject lines from 18 formula categories derived
  from analysis of 2,684 Ben Settle emails. Use AFTER email bodies are written by
  E1 — subject lines must match the WRITTEN email, not a planned or hypothetical
  one. Produces multiple subject line candidates per email, scores them against 7
  SL-specific criteria, and presents the top 5-10 for human selection. Targets
  6-7 word sweet spot from corpus analysis. Trigger when users mention subject
  lines, email subjects, SL testing, open rate optimization, or writing subject
  lines for existing email drafts. Requires E1 email draft output.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [TWO OPERATING MODES](#two-operating-modes)
- [THE 18 SUBJECT LINE FORMULA CATEGORIES](#the-18-subject-line-formula-categories)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [FORMULA SPECIMEN LOADING PROTOCOL](#formula-specimen-loading-protocol)
- [SL-BODY ALIGNMENT CHECK](#sl-body-alignment-check)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [VERSION HISTORY](#version-history)

---

# SUBJECT-LINE-AGENT.md

> **Version:** 1.1
> **Skill:** E2-subject-line-engine
> **Position:** Post-Writer (E1), Pre-Assembly (E3)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** E1 email draft (CRITICAL -- SL must match WRITTEN email, not planned email)
> **Output:** subject-line-package.yaml (top 5-10 SLs per email)

---

## PURPOSE

Generate subject lines for individual emails AFTER the email body has been written by E1. Each subject line is generated from one of 18 formula categories derived from deep analysis of 2,684 Ben Settle emails. This skill produces multiple SL candidates per email, scores them against 7 SL-specific criteria, and presents the top 5-10 for human selection.

**Success Criteria:**
- SL matches the WRITTEN email body (not a planned or hypothetical email)
- SL creates genuine curiosity gap that compels opening
- SL uses 6-7 words (sweet spot from corpus analysis)
- SL properly executes its assigned formula category
- SL is calibrated for the target niche/audience
- At least 20 candidates generated before selection
- At least 5 formula categories used per email
- Arena-validated quality (3 rounds, 7 competitors)
- Achieves >= 8.0 weighted quality score

**CRITICAL CONSTRAINT:** E2 runs AFTER E1 because subject lines must match the WRITTEN email, not a planned email. The body determines the SL, not the other way around. SL-body alignment is checked at every gate.

---

## IDENTITY

**This skill IS:**
- The subject line generator
- The formula category executor
- The curiosity gap architect
- The SL-body alignment enforcer
- The per-email SL quality producer

**This skill is NOT:**
- An email writer (that is E1)
- A campaign strategist (that is E0)
- A sequence assembler (that is E3)
- A copy editor (that is E4)
- A standalone headline generator (headlines are Skill 10)

**Upstream:** Receives individual email draft from E1 (COMPLETE, Arena-selected email body)
**Downstream:** Feeds subject-line-package.yaml to E3 (assembly) and E4 (editorial)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Email loading + formula library loading + validation | haiku | Input loading, no reasoning |
| 1 | Formula selection + emotional trigger matching + niche calibration | sonnet | Classification + matching |
| 2 | Volume generation (20-50 candidates) + variation expansion | opus | Creative generation -- max quality |
| 2.5 | Arena (7 competitors x 3 rounds) | opus | Maximum quality generation |
| 2.6 | Synthesizer (2-3 hybrids) | opus | Phrase-level hybrid creation |
| 3 | Ranking + scoring + output packaging | sonnet | Mechanical scoring + assembly |

---

## TWO OPERATING MODES

### Mode A: Per-Email (Standard)

Execute E2 for a single email immediately after E1 completes that email.

```
E1 completes email #3 → E2 generates SLs for email #3 → human selects → E1 starts email #4
```

**When to use:** Sequential email production, when each email needs SL approval before moving on.

### Mode B: Batch (After Multiple E1 Drafts)

Execute E2 for multiple emails after E1 has completed several drafts.

```
E1 completes emails #1-#5 → E2 generates SLs for all 5 → human selects for each → proceed to E3
```

**When to use:** When E1 has been run for multiple emails and SLs are being generated as a batch pass. Batch mode adds an additional constraint: SL diversity across the sequence (no same formula category used 3+ times consecutively).

**Batch Mode Additional Checks:**
- Track formula categories used across all emails in the batch
- Flag if any formula category is used for more than 3 emails in the batch
- Ensure at least 3 different formula categories are represented per 5-email window
- Present SLs in sequence context (show adjacent SLs for diversity review)

---

## THE 18 SUBJECT LINE FORMULA CATEGORIES

Derived from analysis of 2,684 Ben Settle emails:

| Code | Category | Corpus % | Core Pattern |
|------|----------|----------|--------------|
| SL-THE | "The [X]" | 15.5% | Definite article creates authority/mystery |
| SL-HOW | "How to [Y]" | 14.6% | 4 sub-formulas: profit from, without, unexpected target, person achieved |
| SL-WHY | "Why [Z]" | 8.8% | 3 sub-formulas: why I, why group fails, why X is bad |
| SL-CUR | Curiosity/Secret | 6.0% | Secrets of, secret of the, secret way |
| SL-EDG | Edgy/Profane | 5.7% | Tonal overlay across all categories |
| SL-NUM | Number/List | 2.9% | Numbers + edgy descriptors |
| SL-CON | Confession/Admission | 2.4% | "I [shocking thing]" |
| SL-CMD | Command/Imperative | 2.3% | "Don't [X]" / "Stop [X]" |
| SL-NAM | Name-Drop | 2.2% | Borrowed authority from known figures |
| SL-PRV | Provocation/Identity | 1.9% | "You're [comparison]" / "Are you [A] or [B]?" |
| SL-POP | Pop Culture Twist | <2% | Familiar reference with unexpected application |
| SL-BPM | Blatant Pitch Meta | <2% | Transparent selling with self-aware humor |
| SL-VS | VS/Cage Match | <2% | "[A] vs [B]" framing |
| SL-PAR | Paradox/Oxymoron | <2% | Contradictory pairing that creates curiosity |
| SL-PRF | Proof/Testimonial | <2% | Social proof in subject line |
| SL-URG | Urgency/Last Call | <2% | Deadline/scarcity trigger |
| SL-SIM | Simile/"Stick Out Like" | <2% | Unexpected comparison |
| SL-ATK | Anatomy/Attack Of | <2% | "[Anatomy of X]" / "[Attack of the X]" |

### Sub-Formula Detail

**SL-HOW (4 sub-formulas):**
1. "How to profit from [unexpected thing]"
2. "How to [benefit] without [sacrifice]"
3. "How to [benefit] even if [unexpected target]"
4. "How [specific person] achieved [specific result]"

**SL-WHY (3 sub-formulas):**
1. "Why I [controversial action]"
2. "Why [group] fails at [thing]"
3. "Why [popular thing] is [negative assessment]"

### Formula Category Notes

- **SL-EDG** is a tonal OVERLAY, not a standalone category. It applies to any formula category (e.g., an edgy SL-HOW, an edgy SL-THE).
- **SL-BPM** should be used sparingly (max 1 per 7 emails in a sequence).
- **SL-URG** is reserved for deadline/scarcity emails only. Using it on non-urgent emails destroys trust.
- **SL-PRF** requires actual proof/testimonial data to be available.

---

## STATE MACHINE

```
IDLE --> LOADING --> SELECTION --> GENERATION --> ARENA --> RANKING --> COMPLETE
          |            |             |              |          |
          v            v             v              v          v
       [GATE_0]    [GATE_1]      [GATE_2]      [GATE_2.5]  [GATE_3]
       PASS/FAIL   PASS/FAIL    PASS/FAIL     HUMAN_SEL    PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Loading

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - SL must NOT be written before email body — E2 runs AFTER E1
> - Load the WRITTEN email body verbatim — SLs must match what was actually written

**Purpose:** Load the WRITTEN email body from E1, load formula category specifications, validate all inputs present and ready.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-email-context-loader.md` | Load the WRITTEN email body from E1 output |
| 0.2 | `0.2-formula-library-loader.md` | Load formula specs for all 18 categories |
| 0.3 | `0.3-input-validator.md` | Validate email loaded, formulas available, ready for generation |

**Execution Order:**
1. 0.1 first (loads the email that SLs must match)
2. 0.2 in parallel with 0.1 (independent loading)
3. 0.3 after both complete (validates everything is ready)

**Gate 0:** Email body loaded verbatim, all 18 formula categories available, email metadata extracted (body type, content focus, emotional register, key themes). FAIL = email body missing OR formula library not loaded OR email metadata not extracted.

---

### Layer 1: Formula Selection

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Select 5-8 formula categories — fewer than 5 is a gate FAIL
> - Niche calibration is mandatory — some formulas do not work in some niches

**Purpose:** Analyze the email content and select the best-fit formula categories for SL generation.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-emotional-trigger-selector.md` | Which emotional triggers fit this email content? |
| 1.2 | `1.2-formula-matcher.md` | Which SL formulas match the email content best? Select 5-8 formulas. |
| 1.3 | `1.3-niche-calibrator.md` | Calibrate formula selection for audience (some formulas don't work in some niches) |

**Execution Order:**
1. 1.1 first (identifies emotional triggers in the email)
2. 1.2 after 1.1 (matches formulas to triggers + content)
3. 1.3 after 1.2 (calibrates selection for niche/audience)

**Gate 1:** 5-8 formula categories selected with rationale, emotional triggers identified, niche calibration applied. FAIL = fewer than 5 categories selected OR emotional triggers not identified OR niche calibration not applied.

---

### Layer 2: Generation

> **Critical Constraints Reminder (Layer 2)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Minimum 20 candidates before any selection or ranking
> - SL-body alignment checked for every candidate — below 7.0 is REJECTED

**Purpose:** Generate a high volume of SL candidates across selected formulas, then expand the best into variants.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-volume-generator.md` | Generate 20-50 SL candidates across selected formulas |
| 2.2 | `2.2-variation-expander.md` | Expand top 10 candidates into 2-3 variants each |

**Execution Order:**
1. 2.1 first (generates initial candidate pool)
2. 2.2 after 2.1 (expands the strongest candidates)

**Gate 2:** At least 20 unique SL candidates generated, at least 5 formula categories represented, all candidates are 10 words or fewer, no candidate violates SL-body alignment. FAIL = fewer than 20 candidates OR fewer than 5 categories used OR word count violations OR alignment violations.

---

### Layer 2.5: Arena (7 Competitors, 3 Rounds)

> **Critical Constraints Reminder (Layer 2.5)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Arena is MANDATORY — 3 rounds, 7 competitors, human selection required
> - Layer 2 candidates are reference material, NOT templates for competitors

**Purpose:** Generate 7 competing subject line sets through the Arena protocol, with adversarial critique and learning between rounds.

**Specification File:** `ARENA-LAYER.md`

**Execution Protocol:**
- See `~system/protocols/ARENA-CORE-PROTOCOL.md` for full 3-round execution protocol
- Mode: `generative_full_draft` -- each competitor generates 5 SLs using different formula categories
- Layer 2 candidates = reference material, NOT template
- 7 competitors (6 personas + The Architect) each generate their 5 best SLs
- SL-specific judging criteria (see ARENA-LAYER.md)
- Each round produces 35 candidates (7 competitors x 5 SLs each)
- Post-Arena: Synthesizer selects best individual SLs across all competitors
- Human selects from top 10-15 candidates

**Gate 2.5:** Human has selected top 5-10 subject lines. FAIL = no human selection.

---

### Layer 3: Selection & Output

> **Critical Constraints Reminder (Layer 3)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - All finalists must score >= 8.0 — no exceptions
> - SL-body alignment verified for EVERY finalist — misaligned SLs destroy trust

**Purpose:** Score all finalists against SL-specific criteria, rank them, and package for human selection and downstream consumption.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-sl-ranker.md` | Rank all candidates. Score against 7 SL-specific criteria. |
| 3.2 | `3.2-output-packager.md` | Package top 5-10 SLs for human selection and E3/E4 handoff |

**Execution Order:**
1. 3.1 first (scoring and ranking)
2. 3.2 after 3.1 (packaging)

**Gate 3:** Top 5-10 SLs scored and ranked, all score >= 8.0, SL-body alignment verified for all finalists, output packaged for E3. FAIL = top SL scores below 8.0 OR alignment violation in any finalist.

---

## FORMULA SPECIMEN LOADING PROTOCOL

**BEFORE ANY SL GENERATION:**

```
1. READ specimens/subject-lines/FORMULA-INDEX.md
2. IDENTIFY selected formula categories from Layer 1
3. LOAD 5-10 specimen SLs per selected formula category
4. HOLD specimens in active context during generation
5. DO NOT summarize specimens -- use VERBATIM text
```

**Formula Category to Specimen Directory:**

| Formula Code | Specimen Directory |
|-------------|-------------------|
| SL-THE | `specimens/subject-lines/the-formula/` |
| SL-HOW | `specimens/subject-lines/how-to-formula/` |
| SL-WHY | `specimens/subject-lines/why-formula/` |
| SL-CUR | `specimens/subject-lines/curiosity-formula/` |
| SL-EDG | `specimens/subject-lines/edgy-formula/` |
| SL-NUM | `specimens/subject-lines/number-list-formula/` |
| SL-CON | `specimens/subject-lines/confession-formula/` |
| SL-CMD | `specimens/subject-lines/command-formula/` |
| SL-NAM | `specimens/subject-lines/name-drop-formula/` |
| SL-PRV | `specimens/subject-lines/provocation-formula/` |
| SL-POP | `specimens/subject-lines/pop-culture-formula/` |
| SL-BPM | `specimens/subject-lines/blatant-pitch-formula/` |
| SL-VS | `specimens/subject-lines/vs-cage-match-formula/` |
| SL-PAR | `specimens/subject-lines/paradox-formula/` |
| SL-PRF | `specimens/subject-lines/proof-formula/` |
| SL-URG | `specimens/subject-lines/urgency-formula/` |
| SL-SIM | `specimens/subject-lines/simile-formula/` |
| SL-ATK | `specimens/subject-lines/anatomy-attack-formula/` |

---

## SL-BODY ALIGNMENT CHECK

**This is the single most critical quality check in E2.** A subject line that does not match the email body destroys trust and trains subscribers to ignore future emails.

```
SL-BODY ALIGNMENT PROTOCOL:

FOR each SL candidate:
  1. EXTRACT the implicit promise or curiosity in the SL
  2. VERIFY the email body DELIVERS on that promise
  3. CHECK: Does the email body contain the topic/angle the SL implies?
  4. CHECK: Would a reader who opened based on this SL feel SATISFIED by the email?
  5. CHECK: Is the SL accurately representing the email content (not misleading)?

  SCORING:
    10: SL perfectly represents email content. Reader expectation fully met.
    8-9: SL closely matches email. Minor inference gap, but content delivers.
    6-7: SL is related to email but imprecise. Reader might feel slightly misled.
    4-5: SL is loosely connected. Reader would question the connection.
    1-3: SL is misleading or unrelated. Trust-destroying.

  MINIMUM: 7.0 -- any SL below 7.0 alignment is REJECTED regardless of other scores.
```

---

## CONSTRAINTS

### Execution Constraints
1. **E2 runs AFTER E1** -- Never generate SLs before the email body is written
2. **SL-body alignment is mandatory** -- Every candidate checked against email content
3. **All 18 formula categories must be available** -- At least 5 used per email
4. **Arena is MANDATORY** -- 3 rounds, 7 competitors, human selection
5. **Minimum 20 candidates** -- Before any selection or ranking

### Word Count Constraints
6. **Sweet spot: 6-7 words** -- Highest open rates in corpus analysis
7. **Maximum: 10 words** -- Any SL over 10 words is flagged for review
8. **Minimum: 3 words** -- Ultra-short SLs must be exceptionally strong to qualify
9. **Preview text consideration** -- SL should work with AND without preview text visible

### Formula Constraints
10. **SL-EDG is overlay only** -- Must be combined with a base formula category
11. **SL-BPM max 1 per 7 emails** -- Overuse kills meta-humor effectiveness
12. **SL-URG for deadline emails only** -- Non-urgent emails never use urgency formulas
13. **SL-PRF requires real proof** -- Cannot fabricate testimonial-style SLs
14. **Same category max 2 consecutive** -- Never use same formula 3+ times in a row

### Anti-Slop Constraints
15. **ZERO clickbait** -- "You won't believe" / "This changes everything" / "Shocking" banned
16. **ZERO AI telltales** -- "Unlock" / "Discover the secret" / "Transform" banned
17. **ZERO vague qualifiers** -- "Amazing" / "Incredible" / "Revolutionary" banned
18. **ZERO empty urgency** -- "Act now!" / "Don't miss out!" without real deadline banned
19. **ZERO emoji in subject lines** -- Never

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Email body not available | HALT -- Request E1 execution for this email |
| Formula library not loaded | HALT -- Verify formula specimen directories exist |
| Fewer than 20 candidates generated | Continue generation -- add more formula categories |
| SL-body alignment below 7.0 | Reject candidate -- generate replacement |
| All candidates below 8.0 | Return to Layer 2 with expanded formula selection |
| Same formula 3+ times in batch | Replace with alternative formula category |
| Human rejects all candidates | Gather feedback, regenerate with new formula categories |
| Word count over 10 | Trim or replace -- never submit over-length SLs |

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-email-context-loader | layer-0-outputs/0.1-email-context-loader.md | 1KB |
| 0 | 0.2-formula-library-loader | layer-0-outputs/0.2-formula-library-loader.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-emotional-trigger-selector | layer-1-outputs/1.1-emotional-trigger-selector.md | 2KB |
| 1 | 1.2-formula-matcher | layer-1-outputs/1.2-formula-matcher.md | 3KB |
| 1 | 1.3-niche-calibrator | layer-1-outputs/1.3-niche-calibrator.md | 2KB |
| 2 | 2.1-volume-generator | layer-2-outputs/2.1-volume-generator.md | 5KB |
| 2 | 2.2-variation-expander | layer-2-outputs/2.2-variation-expander.md | 3KB |
| 3 | 3.1-sl-ranker | layer-3-outputs/3.1-sl-ranker.md | 5KB |
| 3 | 3.2-output-packager | layer-3-outputs/3.2-output-packager.md | 3KB |

---

## SPECIMEN QUICK-REFERENCE

### SL-HOW Formula — Good vs Bad

**Good:** `How a plumber made $42k in a weekend`

Why: Specific (plumber, $42k, weekend). Creates curiosity. 8 words. Reader thinks: "If a plumber can do it..."

**Bad:** `How to achieve financial success quickly`

Why: Vague. No specificity. "Financial success" and "quickly" are empty. Reader thinks: "spam."

---

### SL-THE Formula — Good vs Bad

**Good:** `The $42,000 plumber`

Why: 4 words. Incongruity creates curiosity (plumbers + $42k = unexpected). Definite article implies "you should know about this."

**Bad:** `The amazing secret to wealth building`

Why: "Amazing" is a banned qualifier. "Secret" is an AI telltale. "Wealth building" is vague.

---

### SL-CUR (Curiosity) — Good vs Bad

**Good:** `The weird reason clean eating makes you fat`

Why: "Weird" creates curiosity. Paradox (clean eating → fat) demands resolution. 9 words.

**Bad:** `Discover the shocking truth about your diet`

Why: "Discover" is AI telltale. "Shocking truth" is clickbait. "Your diet" is vague. Would get filtered as spam.

---

### SL-WHY Formula — Good vs Bad

**Good:** `Why your accountant is making you poor`

Why: Specific authority figure (accountant). Paradox (trusted advisor → harm). Challenges assumption.

**Bad:** `Why most people fail at investing`

Why: "Most people fail" is a cliche. No specificity. No unexpected angle. Reads like every financial newsletter ever.

---

### SL-Body Misalignment Anti-Exemplar

```
Subject Line: "The weird thing that happened at the gym yesterday"
Email Body: [2-page pitch about a supplement with zero gym story]
```

Why this is a P2 issue: Reader opened expecting a story about a gym incident. Email delivers a product pitch. Reader feels deceived. Trust damaged. Will hesitate to open future emails.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-25 | Added SPECIMEN QUICK-REFERENCE section with good/bad inline examples |
| 1.0 | 2026-02-21 | Initial creation -- full E2 architecture with 18 formula categories, dual operating modes, SL-body alignment protocol |

---

**Skill Status:** COMPLETE -- Full layer architecture with Arena integration
