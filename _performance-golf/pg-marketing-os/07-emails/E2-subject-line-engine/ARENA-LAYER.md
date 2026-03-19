# Subject Line Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-02-21
**Position:** Between Layer 2 (SL Generation) and Layer 3 (SL Ranking & Output)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `generative_full_draft` -- Competitors each generate 5 subject lines using different formula categories. Layer 2 candidates = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

The Arena Layer transforms single-perspective subject line generation into multi-perspective competition. Seven competitors each generate their 5 best subject lines for the email, which are then judged against SL-specific criteria to surface the strongest candidates.

**The Problem It Solves:**
- AI tendency toward generic, safe subject lines lacking stopping power
- Subject lines disconnected from email body content (alignment failure)
- Curiosity gaps that are too weak (no pull) or too obscure (confusion)
- Formulaic output using the same 2-3 patterns repeatedly
- Word count bloat (exceeding 6-7 word sweet spot)
- Niche-inappropriate tone or vocabulary
- Overused patterns that subscribers recognize and ignore

---

## QUALITY STANDARD

```
+============================================================================+
|  MINIMUM QUALITY THRESHOLD: 8.0/10 WEIGHTED SCORE                          |
|                                                                             |
|  This is NON-NEGOTIABLE. Subject lines that score below 8.0 will fail     |
|  to get emails opened. A brilliant email with a weak SL is never read.    |
|                                                                             |
|  7.0-7.5 is INSUFFICIENT for this skill. Subject lines are the single     |
|  gate between your email and the trash folder. 8.0+ is mandatory.         |
+============================================================================+
```

---

## LAYER POSITION

```
Layer 0: Loading (Email Body + Formula Library + Validation)
Layer 1: Formula Selection (Emotional Triggers, Formula Matching, Niche Calibration)
Layer 2: Generation (Volume Generation + Variation Expansion)
    |
    v
+-----------------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                     |
|                                                                              |
|  2.5.1: Multi-Perspective Generation (7 competitors x 5 SLs each)          |
|  2.5.2: Adversarial Critique (The Critic identifies weakest SL per set)     |
|  2.5.3: Targeted Revision (each competitor fixes weakness)                   |
|  2.5.4: Scoring Round (7 SL-specific criteria)                              |
|  2.5.5: Analytical Brief + Next Round (2 rounds + audience evaluation)       |
|  2.5.6: Post-Arena Synthesis (best SLs across all competitors)              |
|  2.5.7: Human Selection Checkpoint (BLOCKING)                               |
+-----------------------------------------------------------------------------+
    |
    v
Layer 3: Ranking & Output (Final Scoring + Output Packaging)
```

---

## ZERO ABBREVIATION MANDATE

```
+============================================================================+
|  CRITICAL: COMPLETE EXECUTION REQUIRED                                      |
|                                                                             |
|  This Arena Layer MUST be executed in its ENTIRETY.                         |
|  - All 7 competitor SL sets MUST be fully generated (35 SLs per round)     |
|  - All 7 criteria MUST be scored for ALL SL finalists                      |
|  - All evidence MUST be documented -- no "see above" references            |
|  - All scoring rubrics MUST be applied with full justification             |
|                                                                             |
|  ABBREVIATION IS FORBIDDEN. If context is limited, request continuation.   |
|  Incomplete Arena execution = SKILL FAILURE.                               |
+============================================================================+
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent with own context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Each competitor generates 5 subject lines** using different formula categories
- Layer 2 candidates = reference material and quality baseline, NOT template
- Email body from E1 is the primary input -- all SLs must match it
- Competitors are NOT constrained to use the same formulas as Layer 2
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest SL per set)
- **Targeted revision** (each competitor replaces their weakest SL)
- **2 rounds** of competition with analytical briefs between rounds + audience evaluation
- **Post-arena synthesis** selecting best individual SLs across all competitors
- **Human selection** from top 10-15 candidates

### Full-Draft Mode Specifics for Subject Lines
- Each competitor generates 5 SLs, each from a DIFFERENT formula category
- No two competitors may use the exact same 5-formula combination
- This produces formula diversity (up to 35 SLs across potentially 18 categories)
- Competitors may take radically different approaches (different emotional registers, different curiosity strategies)
- The Architect's 5 SLs should target gaps left by other competitors' formula selections

### What Each Competitor Receives
1. **Email body** (VERBATIM from E1)
2. **Email metadata** (body type, content focus, emotional register, key themes)
3. **Formula library** (all 18 categories with specimens)
4. **Selected formula categories** from Layer 1 (as suggestion, not constraint)
5. **Layer 2 candidates** (as reference, not template)
6. **Niche calibration** from Layer 1
7. **Persona specification** from ARENA-PERSONA-PANEL.md

---

## SUBJECT LINE JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Curiosity Gap Strength** | 20% | Does SL create genuine need-to-know? Not too weak (ignorable), not too obscure (confusing) |
| **Emotional Trigger Clarity** | 15% | Is the emotional pull clear and specific? Does it hit one trigger cleanly? |
| **SL-Body Alignment** | 15% | Does SL accurately represent email content? Would reader feel satisfied after opening? |
| **Word Economy** | 15% | Maximum impact per word. 6-7 word sweet spot. Every word earns its place. |
| **Formula Execution** | 10% | Does SL properly execute its assigned formula category? Pattern mastery visible? |
| **Niche Calibration** | 10% | Appropriate vocabulary, tone, and reference set for the target audience? |
| **Originality** | 10% | Avoids cliche/overused patterns? Would subscriber notice this SL among 50 others? |
| **Reuse Potential** | 5% | Could this SL pattern work for future similar emails? Structural transferability? |

### Scoring Protocol

```
FOR each SL candidate:
  FOR each criterion:
    Score 1-10 using rubric below
    Provide SPECIFIC evidence for score (no vague justifications)
    Flag if below minimum (6.0)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest elements (with evidence)
    - Weakest elements (with evidence)
    - Critical gaps (any criterion below 6.0)
    - SL-body alignment score (ALWAYS documented explicitly)
```

### Scoring Rubric

**Curiosity Gap Strength (20%)**
- 9-10: Irresistible gap. Reader MUST open email. Perfectly calibrated tension.
- 7-8: Strong curiosity. Reader wants to know. Clear gap with resolution promise.
- 5-6: Some curiosity. Mildly interesting. Gap exists but doesn't compel.
- 3-4: Little curiosity. Reader can live without knowing. No real pull.
- 1-2: Zero curiosity. No gap. Or gap so obscure it creates confusion, not interest.

**Emotional Trigger Clarity (15%)**
- 9-10: Single emotional trigger hit cleanly. Reader feels something specific (fear, desire, outrage, delight).
- 7-8: Emotional trigger present and mostly clear. One dominant emotion identifiable.
- 5-6: Some emotional signal but diffuse. Multiple triggers competing, none dominant.
- 3-4: Weak emotional signal. Reader feels neutral.
- 1-2: Zero emotional pull. Could be a corporate memo subject line.

**SL-Body Alignment (15%)**
- 9-10: SL perfectly represents email content. Reader expectation fully met upon opening.
- 7-8: SL closely matches. Minor inference gap, but content delivers on implied promise.
- 5-6: SL is related but imprecise. Reader might feel slightly misled.
- 3-4: SL is loosely connected. Reader questions the connection after reading.
- 1-2: SL is misleading or unrelated. Trust-destroying. Clickbait territory.

**Word Economy (15%)**
- 9-10: Every word essential. 6-7 words with maximum density. Nothing removable.
- 7-8: Strong economy. 5-8 words. Tight but one word could potentially be cut.
- 5-6: Acceptable length. 8-10 words. Some filler or redundancy.
- 3-4: Bloated. 10+ words. Multiple words add nothing.
- 1-2: Sentence, not subject line. Way too long. Reads like a headline, not an SL.

**Formula Execution (10%)**
- 9-10: Formula pattern mastered. Textbook execution with creative twist.
- 7-8: Strong formula alignment. Pattern recognizable and well-executed.
- 5-6: Formula attempted but loose. Pattern elements present but not sharp.
- 3-4: Formula barely recognizable. Wrong pattern for the content.
- 1-2: No recognizable formula. Random word assembly.

**Niche Calibration (10%)**
- 9-10: Reader feels "this is for me." Language, tone, references perfectly matched.
- 7-8: Appropriate with minor calibration needs. No cross-niche contamination.
- 5-6: Generally appropriate but some language feels off for the audience.
- 3-4: Noticeable mismatch. Health language in finance email, etc.
- 1-2: Wrong niche entirely. Would alienate the target reader.

**Originality (10%)**
- 9-10: Never seen this exact approach. Fresh take that stands out. Subscriber would notice.
- 7-8: Familiar pattern with fresh execution. Not derivative.
- 5-6: Competent but predictable. Reader has seen similar SLs many times.
- 3-4: Generic. Could have been generated by any email tool.
- 1-2: Cliche. "You won't believe" / "This changes everything" territory.

**Reuse Potential (5%)**
- 9-10: Pattern could generate 10+ variations for future emails. Structural gold.
- 7-8: Pattern has clear reuse path. Could work for 3-5 future emails.
- 5-6: Some reuse potential but limited to very similar content.
- 3-4: One-time use. Pattern too specific to reuse.
- 1-2: Dead end. Cannot be adapted or reused.

### Critique-Specific Guidance

**What The Critic should particularly target in SL Arena:**
- SLs that tell too much (no curiosity gap -- the reader already knows what's in the email)
- SLs that promise something the email doesn't deliver (alignment failure)
- SLs over 8 words (word economy violation)
- SLs using overused patterns ("You won't believe," "The truth about," etc.)
- SLs with multiple competing emotional triggers (trigger clarity failure)
- SLs that would work for ANY email (too generic, not content-matched)
- SLs with niche-inappropriate language

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| SLs generated per competitor | 5 | Each competitor produces 5 SLs |
| Total SLs per round | 35 | 7 competitors x 5 SLs |
| All criteria scored | 8 per finalist | 8 criteria per SL |
| Top SL score | >= 8.0 | Weighted total |
| No critical gaps | None below 6.0 | Per-criterion review |
| SL-body alignment | All >= 7.0 | Explicit alignment check per SL |
| Word count compliance | All <= 10 words | Word count check |
| Formula diversity | 5+ categories across all competitors | Category tracking |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF total SLs < 35 per round:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 8.0:
  Option A: Return to Layer 1-2 for new formula selection
  Option B: Present to human with warning ("Below optimal threshold")

IF SL-body alignment < 7.0:
  REJECT the SL -- it cannot be presented regardless of other scores

IF word count > 10:
  FLAG for trimming OR replacement

IF formula diversity < 5 categories:
  Request competitors use additional categories in next round

IF no human selection:
  BLOCK -- cannot proceed without human input
```

---

## ANTI-SLOP ENFORCEMENT

Subject lines have ZERO TOLERANCE for slop. This list applies to ALL Arena generation:

**Auto-Reject Phrases:**
- you won't believe, this changes everything, mind-blowing
- unlock, discover the secret, transform your life
- amazing, incredible, unbelievable, revolutionary
- game-changing, breakthrough, cutting-edge
- one weird trick, doctors hate, shocking truth
- don't miss out, act now, limited time (without real deadline)

**Replacement Required:**
Every rejected phrase MUST be replaced with specific, concrete language before candidate can be scored.

**Email-Specific Slop:**
- Generic urgency without real deadline
- "Open this email" or "Read this" (meta-commands)
- "Important message" or "Quick update" (corporate email language)
- Excessive punctuation (!!!, ???, !!!)
- ALL CAPS for entire subject line
- Emoji in subject lines (NEVER)

---

## INTEGRATION WITH EMAIL BODY

The SL Arena has a unique constraint: **every SL must match the written email body from E1.**

### SL-Body Alignment Enforcement

```
FOR each competitor's 5 SLs:
  BEFORE scoring:
    Verify each SL against the E1 email body
    Extract the implicit promise/curiosity in the SL
    Confirm the email body DELIVERS on that promise

  DURING scoring:
    SL-Body Alignment is weighted at 15% (criterion 3)
    Any SL below 7.0 alignment is auto-rejected

  AFTER scoring:
    Document alignment evidence for every finalist SL
    Present alignment reasoning to human alongside scores

ANY SL with alignment below 7.0 is REJECTED regardless of other scores
```

### Email Context Loading for Arena Competitors

Each competitor receives:
```
EMAIL CONTEXT PACKAGE:
  1. Full email body text (verbatim from E1)
  2. Email body type (CT/QO/TM/QA/LB/ST/NR)
  3. Email content focus (from blueprint)
  4. Key themes extracted (3-5 themes)
  5. Emotional register of the email
  6. Opening hook summary (first 3 lines)
  7. Bridge/CTA summary
  8. Target audience profile
```

---

## POST-ARENA SYNTHESIS (SL-Specific)

Unlike full-draft skills where the Synthesizer creates hybrid outputs, SL synthesis works differently:

**SL Synthesis Protocol:**
1. Collect all Round 2 (FINAL) SLs from all 7 competitors (35 total)
2. Score each individually against 8 criteria
3. Rank by weighted score
4. Select top 10-15 for human presentation
5. Group by formula category for easy comparison
6. Present with scores, formula labels, and alignment evidence

**No "hybrid SLs" are created.** Subject lines are too short for phrase-level recombination. Instead, synthesis = best individual selection across all competitors.

---

## HUMAN SELECTION CHECKPOINT

**Arena Layer is BLOCKING** -- Cannot proceed to Layer 3 until:

```
[ ] All 7 competitors generated across all 2 rounds + audience evaluation
[ ] Adversarial critique completed each round
[ ] All SL candidates scored against 8 criteria
[ ] Top 10-15 candidates presented with rationale
[ ] Formula categories labeled for each candidate
[ ] SL-body alignment documented for each candidate
[ ] Human selection received (top 5-10 SLs selected)
```

### HUMAN_SELECTION.yaml Format

```yaml
# Created ONLY when human makes selection
email_id: "[identifier]"
sls_selected:
  - rank: 1
    text: "[exact SL text]"
    formula: "[formula code]"
    weighted_score: [number]
    alignment_score: [number]
  - rank: 2
    text: "[exact SL text]"
    formula: "[formula code]"
    weighted_score: [number]
    alignment_score: [number]
  # ... up to 10
selected_by: "human"
timestamp: "[ISO 8601]"
alternatives_presented: [number]
selection_rationale: "[if provided]"
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-21 | Initial creation -- 8-criterion SL-specific judging, SL-body alignment enforcement, formula diversity tracking, post-arena selection protocol, 8.0 minimum threshold |
