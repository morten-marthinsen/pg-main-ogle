# Email Writer Arena Layer (Layer 2.5)

**Version:** 1.0
**Created:** 2026-02-21
**Position:** Between Layer 2 (Email Generation) and Layer 3 (Validation & Output)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `generative_full_draft` -- Competitors write COMPLETE emails from scratch using upstream packages and structural specimens. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 3-round execution protocol.

---

## PURPOSE

The Arena Layer transforms single-perspective email writing into multi-perspective competition. Seven competitors each generate their complete email for the assigned body type, which are then judged against email-specific criteria to surface the strongest candidate.

**The Problem It Solves:**
- AI tendency toward generic email copy that reads like everyone else's newsletter
- Content-to-pitch ratio violations (emails that are really just ads)
- Weak bridge/transition sections that feel like "now I'm selling"
- Opening hooks that fail to create immediate engagement
- Voice inconsistency within a single email
- CTA copy that is repetitive, vague, or disconnected from content
- Paragraph bloat that kills email readability
- Body type structural non-compliance (email doesn't follow assigned template)

---

## QUALITY STANDARD

```
MINIMUM QUALITY THRESHOLD: 7.5/10 WEIGHTED SCORE

This is NON-NEGOTIABLE. Emails that score below 7.5 will fail to engage
subscribers, damage sender reputation, and erode list trust over time.

Emails are the daily relationship between brand and reader. Every email
must deliver enough value that the reader would enjoy it EVEN WITHOUT
clicking. 7.5+ is mandatory.
```

---

## LAYER POSITION

```
Layer 0: Loading (Blueprint, Specimens, Persona Voices, Validation)
Layer 1: Architecture (Body Type Routing, Template Loading, Content Mapping)
Layer 2: Generation (Opening, Body, Bridge, CTA -- sequential)
    |
    v
+---------------------------------------------------------------------------+
|                         LAYER 2.5: ARENA                                    |
|                                                                             |
|  2.5.1: Multi-Perspective Generation (7 competitor complete emails)       |
|  2.5.2: Judging Round (9 email-specific criteria)                          |
|  2.5.3: Ranking & Rationale (Top candidates with evidence)                |
|  2.5.4: Human Selection Checkpoint (BLOCKING)                              |
+---------------------------------------------------------------------------+
    |
    v
Layer 3: Validation & Output (Quality Scoring, Packaging for E2/E3)
```

---

## ZERO ABBREVIATION MANDATE

```
CRITICAL: COMPLETE EXECUTION REQUIRED

This Arena Layer MUST be executed in its ENTIRETY.
  * All 7 competitor emails MUST be fully generated
  * All 9 criteria MUST be scored for ALL candidates (63 scores total)
  * All evidence MUST be documented -- no "see above" references
  * All scoring rubrics MUST be applied with full justification

ABBREVIATION IS FORBIDDEN. If context is limited, request continuation.
Incomplete Arena execution = SKILL FAILURE.
```

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent with full-draft generation in its own 200K context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE emails from scratch** -- NOT variations of a Layer 2 draft
- Layer 2 draft output = reference material and structural guide, NOT a template
- Upstream packages (campaign blueprint, body type template, specimens) are the primary input
- Competitors are NOT constrained to follow the Layer 2 draft's specific approach
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per output)
- **Targeted revision** (each competitor fixes their identified weakness)
- **3 rounds** of competition with learning briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### Full-Draft Mode Specifics for Email
- Each competitor generates a COMPLETE email (opening + body + bridge + CTA + sign-off) in their voice
- All competitors MUST follow the assigned body type structure (CT/QO/TM/QA/LB/ST/NR)
- The structural template is a CONSTRAINT, not a suggestion -- body type compliance is a judging criterion
- Competitors differentiate through voice, word choice, rhythm, angle selection, and bridge technique -- NOT by changing the email structure
- Ben Settle structural specimens are shared reference material for ALL competitors

### Specimen Loading for Arena

**System 1: Ben Settle Structural Specimens**
- All 7 competitors load the SAME body-type-matched structural specimens from `specimens/[body-type]/`
- These provide the structural pattern DNA for the assigned body type
- Competitors apply their editorial lens to the same structural foundation

**System 2: Persona Voice Specimens**
- Each persona loads their OWN voice specimens from `persona-specimens/`
- Per `0.2.7-persona-voice-loader.md` recommendations for this skill
- System 2 provides voice calibration so each competitor sounds authentically like their writer

**Both systems load simultaneously. System 1 provides structural DNA. System 2 provides stylistic DNA.**

### What Stays Skill-Specific (Below)
- 9 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for email writing
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

## EMAIL JUDGING CRITERIA

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Opening Hook Strength** | 15% | Do the first 3 lines create immediate engagement? Would the reader keep reading? |
| **Content-to-Pitch Ratio** | 15% | Is the email 70-80% genuine content and 20-30% pitch? Does it feel like value-first? |
| **Bridge/Transition Smoothness** | 15% | Does the content-to-pitch transition feel natural? No "now I'm selling" jarring shift? |
| **Body Type Structural Compliance** | 10% | Does the email follow the assigned body type template? Are all structural elements present? |
| **Voice Consistency** | 10% | Is the persona voice maintained throughout the entire email? No voice breaks? |
| **Entertainment/Engagement Value** | 10% | Would the reader enjoy this email even without clicking? Is it worth the read on its own? |
| **CTA Clarity and Strength** | 10% | Is the action clear? Is the CTA emotionally compelling, not just "click here"? |
| **Paragraph Brevity** | 5% | Are paragraphs 1-3 sentences? Is the email scannable? No wall-of-text blocks? |
| **Niche Appropriateness** | 10% | Is the language, tone, and content appropriate for the specific niche and audience? |

### Scoring Protocol

```
FOR each candidate:
  FOR each criterion:
    Score 1-10 using rubric below
    Provide SPECIFIC evidence for score (no vague justifications)
    Flag if below minimum (6.0)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest elements (with evidence)
    - Weakest elements (with evidence)
    - Critical gaps (any criterion below 6.0)
```

### Scoring Rubric

**Opening Hook Strength (15%)**
- 9-10: Impossible to stop reading; immediate curiosity or emotional grab; first 3 lines are flawless
- 7-8: Strong opening; would keep reading; compelling start
- 5-6: Adequate opening; might continue; not urgent
- 3-4: Weak opening; easy to delete; blends into inbox noise
- 1-2: Generic/boring; zero engagement; "Dear reader" energy

**Content-to-Pitch Ratio (15%)**
- 9-10: 75-80% pure content, 20-25% pitch; reader gets genuine value; pitch feels earned
- 7-8: 70-75% content; good balance; pitch section proportionate
- 5-6: 60-70% content; pitch creeping in; reader starts to feel sold to
- 3-4: 40-60% content; email feels like a disguised ad; trust eroding
- 1-2: Under 40% content; pure pitch dressed as email; subscriber will unsubscribe

**Bridge/Transition Smoothness (15%)**
- 9-10: Transition is invisible; content flows naturally to pitch; reader doesn't notice the shift
- 7-8: Smooth transition; pivot sentence works; slight awareness of shift but not jarring
- 5-6: Noticeable transition; reader can feel the gear change; awkward but not terrible
- 3-4: Clumsy transition; "by the way..." or "speaking of which..." feels forced
- 1-2: Hard cut; content section ends and pitch section begins; zero bridge; reader feels betrayed

**Body Type Structural Compliance (10%)**
- 9-10: Perfect template adherence; all structural elements present in correct order; body type is unmistakable
- 7-8: Good compliance; all required elements present; minor structural variation
- 5-6: Partial compliance; some elements present but structure loosened
- 3-4: Weak compliance; body type barely recognizable; missing key structural elements
- 1-2: Non-compliant; wrong body type structure; template ignored

**Voice Consistency (10%)**
- 9-10: Voice is perfectly consistent from first word to last; persona is unmistakable; zero breaks
- 7-8: Voice mostly consistent; minor wobbles but persona is clear
- 5-6: Voice inconsistent in places; persona fades in/out; some generic stretches
- 3-4: Voice breaks frequently; persona only in opening; body reverts to generic
- 1-2: No discernible persona voice; generic AI copy throughout

**Entertainment/Engagement Value (10%)**
- 9-10: Email is genuinely enjoyable to read; reader would forward it; stand-alone value
- 7-8: Good read; interesting content; reader doesn't feel time was wasted
- 5-6: Adequate; gets the job done; not memorable
- 3-4: Boring; functional but lifeless; reader skims
- 1-2: Painful to read; reader unsubscribes or marks as spam

**CTA Clarity and Strength (10%)**
- 9-10: CTA is clear, emotionally compelling, and feels like a natural next step; reader wants to click
- 7-8: CTA is clear and motivating; good reason to take action
- 5-6: CTA is present but generic; "click here to learn more" energy
- 3-4: CTA is vague or disconnected from content; reader unsure what to do
- 1-2: CTA is missing, buried, or confusing; no clear action path

**Paragraph Brevity (5%)**
- 9-10: Every paragraph is 1-2 sentences; perfectly scannable; email breathes
- 7-8: Most paragraphs 1-2 sentences; occasional 3-sentence paragraph; good rhythm
- 5-6: Some paragraphs running 3-4 sentences; pacing slows in places
- 3-4: Multiple paragraphs over 4 sentences; wall-of-text sections
- 1-2: Dense paragraphs throughout; no white space; email feels like an essay

**Niche Appropriateness (10%)**
- 9-10: Language, references, examples perfectly matched to niche; insider knowledge evident; reader feels understood
- 7-8: Good niche fit; appropriate language and examples; reader recognizes their world
- 5-6: Generic but not wrong; could apply to many niches; lacks specificity
- 3-4: Off-niche language or references; reader notices disconnect
- 1-2: Wrong niche entirely; cross-contamination from other verticals; reader confused

### Critique-Specific Guidance

**What The Critic should particularly target in Email Writer Arena:**
- Opening hooks that bury the lead or take too long to engage
- Bridge sections that feel like gear-shifting ("Speaking of which..." / "By the way...")
- Content-to-pitch ratio violations (emails that are really just ads with a wrapper)
- Body type structural drift (email starts as one type but morphs into generic)
- Voice breaks where persona disappears and generic copy takes over
- CTA disconnected from the content preceding it
- Paragraphs that run too long for email format (readers scan on mobile)
- Niche-inappropriate language or examples (cross-vertical contamination)

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor |
| All criteria scored | 9 per candidate | 7 x 9 = 63 scores |
| Top candidate score | >= 7.5 | Weighted total |
| No critical gaps | None below 6.0 | Per-criterion review |
| Content-to-pitch ratio | All within 70-80/20-30 | Ratio calculated per candidate |
| Body type compliant | All follow assigned template | Structural check per candidate |
| Word count | All within target +/-20% | Word count per candidate |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 7.5:
  Option A: Return to Layer 2 for different approach
  Option B: Present to human with warning ("Below optimal threshold")

IF critical gaps exist:
  Flag gaps in presentation to human
  Human decides whether to proceed or iterate

IF content-to-pitch ratio violated:
  BLOCK -- ratio compliance is non-negotiable
  Revise to bring within 70-80/20-30 range

IF body type non-compliant:
  BLOCK -- body type is assigned by blueprint
  Regenerate following correct structural template

IF no human selection:
  BLOCK -- cannot proceed without human input
```

---

## BODY TYPE CONSTRAINT IN ARENA

The Headline Arena allows creative freedom in approach. **The Email Arena constrains structure.** All 7 competitors MUST follow the assigned body type template:

| Body Type | Structural Requirements All Competitors Must Follow |
|-----------|-----------------------------------------------------|
| CT (Contrarian) | Bold claim opening + stack-and-dismiss body + contrarian insight bridge |
| QO (Quote-Opener) | Formatted quote block opening + riff-on-quote body + lesson bridge |
| TM (Testimonial) | Attribution opening + verbatim testimonial body + brief commentary |
| QA (Q&A) | Reader question opening + substantive answer body + lesson bridge |
| LB (List-Based) | Setup opening + numbered/bulleted list body (3-7 items) + synthesis bridge |
| ST (Story) | Story hook opening + narrative body + lesson extraction + bridge |
| NR (Negative Response) | Troll display opening + demolition body + lesson extraction + bridge |

**Competitors differentiate through VOICE and ANGLE, not STRUCTURE.** A Makepeace contrarian email and a Halbert contrarian email both follow the CT template but sound completely different.

---

## ANTI-SLOP ENFORCEMENT

Emails have ZERO TOLERANCE for slop words. This list applies to ALL Arena generation:

**Auto-Reject Phrases:**
- revolutionary, game-changing, breakthrough, cutting-edge
- unlock, discover the secret, transform your life
- amazing, incredible, unbelievable, mind-blowing
- you won't believe, one weird trick
- harness, leverage, empower, unleash
- dive deep, journey, optimize, streamline

**Email-Specific Auto-Reject Phrases:**
- "I wanted to reach out..." (dead opening)
- "In this email..." (meta-reference breaks immersion)
- "As you know..." (presumptuous and filler)
- "I hope this finds you well" (corporate email, not DR email)
- "Without further ado..." (cliche transition)
- "But wait, there's more!" (infomercial energy in email)
- "Act now before it's too late" (generic urgency without justification)

**Replacement Required:**
Every rejected phrase MUST be replaced with specific, concrete language before candidate can be scored.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-21 | Initial creation -- 9-criterion email-specific judging, body type structural constraint, dual-system specimen loading, email-specific anti-slop, 7.5 minimum threshold |
