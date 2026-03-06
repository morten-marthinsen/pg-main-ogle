# Soul.md Protocol — Voice, Taste, and Energy Layer

**Version:** 1.0
**Created:** 2026-02-14
**Purpose:** Define the creation, format, and integration of project-level Soul.md files
**Inspiration:** Sam Woods recommendation + the human reviewer's revision pattern analysis

---

## What Soul.md Is

Soul.md is a **project-level taste constraint document** that captures the voice, tone, energy, and intangible qualities that define how a campaign should FEEL. It sits alongside the brief and research outputs as a mandatory input to all strategic and generative skills.

Soul.md answers: "If this campaign were a person talking, who would that person be and how would they talk?"

**Soul.md is NOT:**
- A style guide (those are technique-level — line length, formatting, etc.)
- A persona definition (those define the Arena competitors)
- A brief (that defines the strategic inputs)
- A template (every project's Soul.md is unique)

**Soul.md IS:**
- A taste layer that constrains generation toward the right FEELING
- A voice reference that maintains consistency across 2000+ lines of copy
- An energy document that defines emotional range and intensity
- A negative space definition — what this campaign should NEVER sound like

---

## When Soul.md Gets Created

### Phase 1: Seed (During Brief Creation — Skill 00)

The brief includes 5 Soul-seeding questions. Answers don't need to be perfect — they're starting points.

**Soul-Seeding Questions (add to brief template):**

1. **Voice Register:** If this campaign were a conversation, where is it happening? (Examples: late-night phone call with a trusted friend / keynote speech at a conference / kitchen table with a mentor / doctor's office consultation / bar after work)

2. **Emotional Range:** What's the emotional floor and ceiling? (Examples: floor = quiet empathy, ceiling = urgent conviction / floor = clinical precision, ceiling = passionate advocacy / floor = playful curiosity, ceiling = serious stakes)

3. **Anti-Voice:** What should this NEVER sound like? (Examples: never salesman-y / never clinical / never aggressive / never preachy / never corporate / never casual)

4. **Energy Signature:** Pick 2-3 words that describe the energy. (Examples: confident + warm + unhurried / urgent + empathetic + precise / conversational + authoritative + generous)

5. **Taste Reference:** Name 1-3 pieces of writing (from any domain) that have the FEEL you want. Can be a book, article, speech, letter, ad, email — anything.

### Phase 2: Expand (During Research — Skill 01)

Research outputs enrich the Soul.md with audience-sourced data:

- **Audience voice samples:** 5-10 verbatim quotes that show how the audience TALKS about this problem (their register, vocabulary, emotional intensity)
- **Emotional landscape:** What emotions dominate the audience's experience? (Not just "frustration" — the specific FLAVOR of frustration)
- **Cultural context:** What cultural moment does this campaign exist in? What's the discourse?

### Phase 3: Finalize (Post-Research, Pre-Strategic Skills)

Before Skills 03-06 run, Soul.md is finalized with:

- **Specimens (positive):** 3-5 short excerpts (50-150 words each) that nail the voice. Can be from previous campaigns, reference material, or the human reviewer's own writing.
- **Anti-specimens (negative):** 3-5 short excerpts that show what to AVOID. These can be engine-generated text that missed the mark.
- **Taste decisions:** Any specific choices from the brief + research that lock in voice direction.

---

## Soul.md Format

```markdown
# Soul.md — [Project Name]

**Created:** [Date]
**Last Updated:** [Date]
**Status:** Seed | Expanded | Finalized

---

## Voice Register

[1-2 sentences describing the conversational setting. WHO is talking to WHOM and WHERE.]

Example: "A mentor who's been where you are, talking to you one-on-one over coffee. Not lecturing — sharing. The kind of person who leans in when they talk and says 'listen' before the important part."

---

## Emotional Range

**Floor:** [The quietest, most restrained emotional state]
**Ceiling:** [The most intense emotional state]
**Default:** [Where the copy lives MOST of the time]

Example:
- Floor: Quiet empathy — "I know what that feels like"
- Ceiling: Urgent conviction — "This matters more than you think"
- Default: Confident warmth — sharing something important with someone you care about

---

## Energy Signature

[2-3 words] + [1-2 sentences expanding]

Example: "Conversational authority. Not trying to impress you. Already knows the answer but takes time to explain it in a way that respects your intelligence."

---

## Anti-Voice (What This Should NEVER Sound Like)

1. [Anti-pattern + brief example]
2. [Anti-pattern + brief example]
3. [Anti-pattern + brief example]

Example:
1. Never salesman-y — no "But wait, there's more!" energy
2. Never academic — no "Studies have demonstrated that..." framing
3. Never aggressive — no "Your competitors are eating your lunch" fear-mongering

---

## Audience Voice Samples

[5-10 verbatim quotes from research showing how the audience talks]

These quotes establish the REGISTER the copy should match. Not the words — the emotional frequency.

> "[Quote 1]" — [Source]
> "[Quote 2]" — [Source]

---

## Cultural Context

[1-2 paragraphs on the cultural moment. What discourse exists? What are people tired of hearing? What hasn't been said yet?]

---

## Positive Specimens (THIS Is the Voice)

### Specimen 1: [Label]
> [50-150 word excerpt that NAILS the voice]

**Why this works:** [1 sentence]

### Specimen 2: [Label]
> [50-150 word excerpt]

**Why this works:** [1 sentence]

### Specimen 3: [Label]
> [50-150 word excerpt]

**Why this works:** [1 sentence]

---

## Anti-Specimens (This Is NOT the Voice)

### Anti-Specimen 1: [Label]
> [50-150 word excerpt that MISSES the mark]

**Why this fails:** [1 sentence]

### Anti-Specimen 2: [Label]
> [50-150 word excerpt]

**Why this fails:** [1 sentence]

---

## Pacing Signature

[How should the copy BREATHE? Describe the rhythm.]

Example: "Varies between long build-up sentences that create anticipation and one-word punches. Uses ellipses for pauses. Standalone emphasis words ('Literally.' / 'Yes. ZERO.'). Sections end with open loops, not neat conclusions."

---

## Taste Decisions

[Any specific locked-in choices from brief/research]

- [Decision 1]
- [Decision 2]
- [Decision 3]

Example:
- First person narrator (Rich IS the voice, not a narrator describing Rich)
- Contemporary 2026 vernacular ("vibe coding," "AI doomers")
- Generous framing for competitors (they haven't had the epiphany, not they're stupid)
```

---

## How Soul.md Gets Used

### Integration Points

| Skill | How Soul.md Is Used |
|-------|-------------------|
| **03 Root Cause** | Constrains expression method selection — framing must match voice register |
| **04 Mechanism** | Constrains naming — mechanism name must fit the energy signature |
| **05 Promise** | Constrains promise language — ceiling/floor define emotional range |
| **06 Big Idea** | Constrains creative wrapper — Big Idea must match voice + cultural context |
| **07 Offer** | Constrains offer framing — value language matches voice register |
| **08 Structure** | Loaded as structural reference for section pacing |
| **10-18 Generative** | PRIMARY constraint — all copy generation must match Soul.md voice |
| **19 Assembly** | Voice consistency check across assembled sections |
| **20 Editorial** | Anti-specimens used as negative examples for editorial revision |

### Loading Protocol

```
AT THE START OF EVERY SKILL EXECUTION (03-20):
  1. CHECK: Does [project]/SOUL.md exist?
  2. IF EXISTS:
     - LOAD Soul.md into context
     - VERIFY status is "Finalized" (warn if still "Seed" or "Expanded")
     - EXTRACT: voice_register, energy_signature, anti_voice, pacing_signature
     - These become ACTIVE CONSTRAINTS for all generation in this skill
  3. IF NOT EXISTS:
     - WARN: "No Soul.md found. Copy generation will lack taste constraints."
     - PROCEED but flag all outputs as "generated without Soul.md"
     - RECOMMEND: Create Soul.md before continuing
```

### Constraint Application

**During Generation (Skills 10-18):**
- Every generated paragraph must be mentally checked against Soul.md voice register
- Anti-voice patterns are treated as FORBIDDEN — if output matches any anti-voice, rewrite
- Pacing signature guides line length, whitespace, and rhythm decisions
- Energy signature constrains emotional intensity (never below floor, never above ceiling without justification)

**During Arena (Layer 2.5):**
- Arena competitors are informed by Soul.md — their entries must respect the voice constraints
- Judge evaluates voice consistency against Soul.md as a scoring dimension
- Synthesizer uses Soul.md as its PRIMARY guiding voice layer for hybrid creation

**During Editorial (Skill 20):**
- Anti-specimens are used as concrete examples of what to revise AWAY from
- Positive specimens are used as targets to revise TOWARD
- Voice consistency across full document measured against Soul.md

---

## Soul.md Lifecycle

```
Brief Creation (Skill 00)
  │
  ├─ 5 Soul-seeding questions answered → SOUL.md created (status: Seed)
  │
  ▼
Research (Skill 01)
  │
  ├─ Audience voice samples added
  ├─ Emotional landscape documented
  ├─ Cultural context captured
  │   → SOUL.md updated (status: Expanded)
  │
  ▼
Pre-Strategic Review (Human)
  │
  ├─ The human reviewer adds positive specimens
  ├─ The human reviewer adds anti-specimens
  ├─ Taste decisions locked in
  │   → SOUL.md finalized (status: Finalized)
  │
  ▼
Skills 03-20
  │
  ├─ Soul.md loaded as mandatory context at every skill
  ├─ All generation constrained by voice/energy/pacing
  ├─ Arena judges include Soul.md compliance in scoring
  │
  ▼
Post-Campaign Learning
  │
  ├─ The human reviewer's edits analyzed against Soul.md predictions
  ├─ Soul.md accuracy assessed (did it capture the taste?)
  └─ Learnings feed into TASTE/ capture system (future)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-14 | Initial protocol creation |
