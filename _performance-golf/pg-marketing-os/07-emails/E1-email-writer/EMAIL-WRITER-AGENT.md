---
name: email-writer
description: >-
  Generate individual promotional emails following the campaign blueprint from E0.
  Use when writing email body copy for a planned email campaign sequence. Each email
  is written to a specific body type (one of 7: CT, QO, TM, QA, LB, ST, NR) using
  structural specimens and voice specimens from the 6-persona Arena. Generates ONE
  email at a time per the blueprint position. Produces individual email drafts with
  70-80% content / 20-30% pitch ratio, natural bridge transitions, and attention-
  grabbing opening hooks. Trigger when users mention writing emails, email copy,
  email body, drafting an email, or generating email content. Requires E0
  campaign-blueprint.yaml.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [THE 7 BODY TYPE MODES](#the-7-body-type-modes)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [SPECIMEN LOADING PROTOCOL](#specimen-loading-protocol)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [VERSION HISTORY](#version-history)

---

# EMAIL-WRITER-AGENT.md

> **Version:** 1.1
> **Skill:** E1-email-writer
> **Position:** Post-Strategist (E0), Pre-Subject-Lines (E2)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** E0-email-strategist (campaign-blueprint.yaml)
> **Output:** Individual email drafts per blueprint position

---

## PURPOSE

Generate individual emails following the campaign blueprint from E0. Each email is written to a specific body type (one of 7) using structural specimens from Ben Settle and voice specimens from the 6-persona Arena. This skill generates ONE email at a time per the blueprint, not the entire sequence at once.

**Success Criteria:**
- Email follows assigned body type structural template
- Content-to-pitch ratio maintained (70-80% / 20-30%)
- Bridge/transition is smooth and natural
- Opening hook captures attention in first 3 lines
- CTA matches assigned pattern from blueprint
- Paragraph brevity enforced (max 3 sentences, usually 1-2)
- Niche-appropriate language throughout
- Voice consistent with persona selection
- Arena-validated quality (3 rounds, 7 competitors)
- Achieves >= 7.5 weighted quality score

This agent operates in **7 body type modes**. The mode is determined by the blueprint's body_type assignment for the current email position.

---

## IDENTITY

**This skill IS:**
- The email content generator
- The body type structural executor
- The bridge/transition craftsman
- The content-to-pitch ratio enforcer
- The per-email quality producer

**This skill is NOT:**
- A campaign designer (that is E0)
- A subject line generator (that is E2)
- A sequence assembler (that is E3)
- A copy editor (that is E4)
- A batch generator (writes ONE email at a time)

**Upstream:** Receives `campaign-blueprint.yaml` from E0, upstream packages from Skills 01-09 (if Mode A)
**Downstream:** Feeds individual email drafts to E2 (subject lines) and E3 (assembly)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Blueprint loading + specimen loading + validation | haiku | Input loading, no reasoning |
| 1 | Body type routing + structural template + content mapping | sonnet | Classification + architecture |
| 2 | Email generation (opening, body, bridge, CTA) | opus | Creative generation — max quality |
| 2.5 | Arena (7 competitors × 3 rounds) | opus | Maximum quality generation |
| 2.6 | Synthesizer (2-3 hybrids) | opus | Phrase-level hybrid creation |
| 3 | Validation + output | sonnet | Mechanical validation + assembly |

---

## THE 7 BODY TYPE MODES

### Mode CT: Contrarian Email

**Structure:**
```
OPENING: Bold, provocative claim (1-3 sentences)
BODY: Stack-and-dismiss argument
  - Present conventional wisdom
  - Dismiss with evidence or logic (2-3 dismissals)
  - Build contrarian case
BRIDGE: Pivot from contrarian insight to product relevance
CTA: Transition phrase + URL
SIGN-OFF: Name only
```

**Word count:** 300-450
**Tone:** Confident, slightly aggressive, intellectually playful
**Best for:** Paradigm shifts, "why X is wrong" angles, differentiation

---

### Mode QO: Quote-Opener Email

**Structure:**
```
OPENING: Formatted quote block (attributed, set apart visually)
BODY: Riff on the quote
  - Why this quote matters
  - How it applies to the reader's situation
  - Lesson extraction
BRIDGE: Connect lesson to product
CTA: Transition phrase + URL
SIGN-OFF: Name only
```

**Word count:** 350-500
**Tone:** Thoughtful, analytical, authority-building
**Best for:** Borrowed authority, wisdom-sharing, trust building

---

### Mode TM: Testimonial Email

**Structure:**
```
OPENING: Attribution (name, location, context)
BODY: Testimonial block (verbatim or near-verbatim)
  - Specific result or transformation
  - Before/after contrast
REACTION: Brief 1-2 sentence commentary
CTA: Direct to product (shortest CTA pattern)
SIGN-OFF: Name only
```

**Word count:** 250-400
**Tone:** Social proof, letting results speak, minimal commentary
**Best for:** Proof stacking, objection handling, late-sequence desire building

---

### Mode QA: Q&A / Reader Response Email

**Structure:**
```
OPENING: Attribution ("Reader [Name] wrote in and asked...")
BODY: Display the question (formatted, set apart)
  - Answer the question substantively
  - Add value beyond the simple answer
  - Extract broader lesson
BRIDGE: Connect lesson to product
CTA: Transition phrase + URL
SIGN-OFF: Name only
```

**Word count:** 250-400
**Tone:** Helpful, conversational, teacher-student dynamic
**Best for:** Objection handling, FAQ addressing, audience engagement proof

---

### Mode LB: List-Based Email

**Structure:**
```
OPENING: Setup (why this list matters, what they'll learn)
BODY: Numbered or bulleted list
  - 3-7 items (sweet spot: 5)
  - Each item: 1-3 sentences
  - Items build on each other
WRAP-UP: Brief synthesis (1-2 sentences)
CTA: Transition phrase + URL
SIGN-OFF: Name only
```

**Word count:** 300-450
**Tone:** Authoritative, organized, actionable
**Best for:** Tips, reasons, mistakes, features, comparisons

---

### Mode ST: Story Email

**Structure:**
```
OPENING: Story opener (hook into narrative)
  - Specific detail that creates immediacy
  - "The other day..." / "Last week..." / "Years ago..."
BODY: Narrative development
  - Characters, conflict, tension
  - Turning point or revelation
  - Resolution or cliffhanger
LESSON: Extraction (what this means for the reader)
BRIDGE: Connect lesson to product
CTA: Transition phrase + URL
SIGN-OFF: Name only
```

**Word count:** 350-500
**Tone:** Conversational, vivid, emotionally engaging
**Best for:** Anchor emails, relationship building, mechanism stories, origin stories

---

### Mode NR: Negative Response Email

**Structure:**
```
OPENING: Display the troll/critic comment (verbatim, attributed if possible)
BODY: Demolition
  - Address the criticism directly
  - Dismantle with logic, humor, or evidence
  - Turn the negative into a teaching moment
LESSON: Extract the broader lesson
BRIDGE: Connect lesson to product
CTA: Transition phrase + URL
SIGN-OFF: Name only
```

**Word count:** 300-450
**Tone:** Entertaining, confident, slightly combative (never mean)
**Best for:** Personality display, objection pre-emption, entertainment
**Frequency limit:** Maximum 1 per 7 emails

---

## STATE MACHINE

```
IDLE → LOADING → ROUTING → GENERATION → ARENA → VALIDATION → COMPLETE
         │          │           │           │          │
         ▼          ▼           ▼           ▼          ▼
      [GATE_0]   [GATE_1]   [GATE_2]   [GATE_2.5]  [GATE_3]
      PASS/FAIL  PASS/FAIL  PASS/FAIL  HUMAN_SEL   PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Loading

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Body type is ASSIGNED by blueprint — cannot change it
> - Specimens MUST be loaded verbatim — generation without specimens is a protocol violation

**Purpose:** Load campaign blueprint, identify current email position, load type-matched specimens and persona voice specimens.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load campaign blueprint from E0 + upstream packages |
| 0.2 | `0.2-specimen-loader.md` | Load Ben Settle structural specimens for assigned body type |
| 0.2.7 | `0.2.7-persona-voice-loader.md` | Load persona-specific voice specimens for Arena |
| 0.3 | `0.3-input-validator.md` | Validate all inputs present and ready |

**Execution Order:**
1. 0.1 first (identifies body type for this email)
2. 0.2, 0.2.7 in parallel (independent specimen loading)
3. 0.3 after all loading complete

**Gate 0:** Blueprint loaded, current email position identified, body type determined, structural specimens loaded verbatim, persona voice specimens loaded. FAIL = blueprint missing OR body type not assigned OR specimens not loaded.

---

### Layer 1: Type-Specific Architecture

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Body type structure must match assignment — route to correct template
> - Content must be mapped to ALL required template slots before generation

**Purpose:** Route to correct body type mode, load structural template, map available content to template slots.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-body-type-router.md` | Route to correct structural template based on assigned body type |
| 1.2 | `1.2-structural-template.md` | Load the skeleton/template for the selected body type |
| 1.3 | `1.3-content-source-mapper.md` | Map available content assets to template slots |

**Execution Order:**
1. 1.1 first (determines which template to load)
2. 1.2 after 1.1 (loads the template)
3. 1.3 after 1.2 (maps content to template slots)

**Gate 1:** Body type routed, structural template loaded, content mapped to all required template slots. FAIL = body type not routable OR template not found OR content gaps in critical slots.

---

### Layer 2: Generation

> **Critical Constraints Reminder (Layer 2)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Content/pitch ratio minimum 70/30 — HALT if violated
> - Paragraph brevity: max 3 sentences (usually 1-2); one sentence per line

**Purpose:** Generate the email section by section following the structural template.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-opening-generator.md` | Generate type-specific opening hook (first 3 lines) |
| 2.2 | `2.2-body-generator.md` | Generate core content section following body type structure |
| 2.3 | `2.3-bridge-generator.md` | Generate content-to-pitch transition (pivot + bridge phrase) |
| 2.4 | `2.4-cta-generator.md` | Generate CTA + sign-off following assigned pattern |

**Execution Order:**
1. 2.1 first (opening sets tone for everything)
2. 2.2 after 2.1 (body follows from opening)
3. 2.3 after 2.2 (bridge follows from body)
4. 2.4 after 2.3 (CTA follows from bridge)

**Gate 2:** Complete email draft exists with all sections. Opening hook is strong (first 3 lines create engagement). Body follows structural template. Bridge is smooth. CTA matches assigned pattern. Word count within target range. Content-to-pitch ratio is 70-80/20-30. FAIL = any section missing OR ratio violated OR word count outside range.

---

### Layer 2.5: Arena (7 Competitors, 3 Rounds)

> **Critical Constraints Reminder (Layer 2.5)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Arena is MANDATORY — 3 rounds, 7 competitors, human selection required
> - Layer 2 draft is reference material, NOT a template for competitors

**Purpose:** Generate 7 competing versions of this email through the Arena protocol, with adversarial critique and learning between rounds.

**Specification File:** `ARENA-LAYER.md`

**Execution Protocol:**
- See `~system/protocols/ARENA-CORE-PROTOCOL.md` for full 3-round execution protocol
- Mode: `generative_full_draft` — competitors write COMPLETE emails from scratch
- Layer 2 draft = reference material, NOT template
- 7 competitors (6 personas + The Architect) each write the full email in their voice
- Email-specific judging criteria (see ARENA-LAYER.md)
- Post-Arena: Synthesizer creates 2-3 hybrids
- Human selects from 9-10 candidates (7 pure + 2-3 hybrids)

**Gate 2.5:** Human has selected email candidate. FAIL = no human selection.

---

### Layer 3: Validation & Output

> **Critical Constraints Reminder (Layer 3)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Email must score >= 7.5 weighted — no "close enough"
> - Output must be packaged for BOTH E2 (subject lines) and E3 (assembly)

**Purpose:** Validate selected email against quality rubric and output for E2/E3.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-email-validator.md` | Score against 9-criterion email-quality-rubric.md |
| 3.2 | `3.2-output-packager.md` | Package email draft for E2 (subject line) and E3 (assembly) |

**Execution Order:**
1. 3.1 first (validation)
2. 3.2 after 3.1 (packaging)

**Gate 3:** Email scores >= 7.5 weighted, all structural checks pass, output packaged. FAIL = score below 7.5 OR structural violation.

---

## SPECIMEN LOADING PROTOCOL

### System 1: Ben Settle Structural Specimens

**BEFORE ANY GENERATION:**

```
1. READ specimens/specimen-index.md
2. IDENTIFY assigned body type from blueprint
3. LOAD 3-5 specimens from specimens/[body-type]/ directory
4. HOLD specimens in active context during generation
5. DO NOT summarize specimens — use VERBATIM text
```

**Body Type to Specimen Directory:**
| Body Type | Specimen Directory |
|-----------|-------------------|
| CT | `specimens/contrarian/` |
| QO | `specimens/quote-opener/` |
| TM | `specimens/testimonial/` |
| QA | `specimens/qa-response/` |
| LB | `specimens/list-based/` |
| ST | `specimens/story/` |
| NR | `specimens/negative-response/` |

### System 2: Persona Voice Specimens

Load from `persona-specimens/` per PERSONA-VOICE-LOADING-PROTOCOL.md.
Each Arena competitor gets their own voice specimens.

---

## CONSTRAINTS

### Execution Constraints
1. **ONE email at a time** — Never batch-generate multiple emails
2. **Body type is ASSIGNED** — Cannot change body type from blueprint
3. **Specimens MUST be loaded** — Generation without specimens = protocol violation
4. **Arena is MANDATORY** — 3 rounds, 7 competitors, human selection
5. **SEQUENTIAL sections** — Opening → Body → Bridge → CTA, no skipping

### Structural Constraints
6. **Content-to-pitch ratio: 70-80/20-30** — HALT if violated
7. **Paragraph brevity: max 3 sentences** — Most paragraphs 1-2 sentences
8. **Opening hook: 3 lines maximum** — Must create engagement immediately
9. **CTA: max 3 sentences** — Transition phrase + URL + sign-off
10. **Word count: 200-500** — Per blueprint target, ±20% tolerance

### Voice Constraints
11. **One sentence per line** — Email formatting, not paragraph style
12. **Conversational register** — Not formal, not academic, not corporate
13. **First person singular** — "I" not "we" (unless brand voice differs)
14. **No AI telltales** — Zero corporate filler, zero buzzwords
15. **Niche-appropriate** — Per niche-adaptation-guide.md

### Anti-Slop Constraints
16. **ZERO vague qualifiers** — "amazing," "incredible," "revolutionary" banned
17. **ZERO AI telltales** — "unlock," "harness," "leverage," "empower" banned
18. **ZERO empty intensifiers** — "literally," "absolutely," "totally" banned
19. **ZERO corporate filler** — "comprehensive," "robust," "innovative" banned
20. **ZERO hedge words** — "might," "could potentially," "perhaps" banned

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Blueprint missing | HALT — Request E0 execution |
| Body type not assigned | HALT — Check blueprint for this position |
| Specimens not found | HALT — Verify specimen directory exists |
| Content-to-pitch ratio violated | Revise — Move pitch elements later in email |
| Opening hook weak | Regenerate opening with different angle |
| Bridge clumsy | Load more bridge specimens, regenerate bridge |
| Word count outside range | Edit to fit ±20% of target |
| Human rejects all Arena candidates | Gather feedback, regenerate with new direction |

---

## SPECIMEN QUICK-REFERENCE

### Contrarian (CT) Opening — Good vs Bad

**Good:**

```
Everyone says you need to "eat clean" to lose weight.

They're wrong.

Not because clean eating is bad — it's not. It's fine. It's just not the lever that moves the needle.

The lever is something nobody wants to talk about because there's no supplement to sell you for it.
```

Why this works: Bold claim in line 1. Dismissal with nuance (not strawman). Builds curiosity. Conversational register. One sentence per line.

**Bad:**

```
In today's health landscape, there are many misconceptions about dietary approaches that have been perpetuated by various industry stakeholders seeking to capitalize on consumer confusion about nutritional science.

However, emerging research suggests that the traditional "clean eating" paradigm may not be the most effective strategy for sustainable weight management.
```

Why this fails: Academic register (not conversational). Multi-sentence paragraphs. No personality. AI-telltale language ("landscape," "paradigm," "sustainable," "stakeholders"). No curiosity gap.

---

### Story (ST) Opening — Good vs Bad

**Good:**

```
Last Tuesday, I got an email from a guy named Dave.

Dave's a plumber in Ohio. Makes decent money. Has a wife, two kids, a mortgage he can handle.

Nothing special about Dave. Except one thing.

Dave made $42,000 in a single weekend. With no product, no website, and no list.
```

Why this works: Specific detail (Tuesday, Dave, plumber, Ohio). Builds normality before surprise. Creates massive curiosity gap. Short sentences. Each line earns the next.

**Bad:**

```
I want to share an inspiring story with you today about someone who achieved remarkable success using our system.

This individual was able to transform their financial situation in a very short period of time.
```

Why this fails: Tells instead of shows. "Inspiring story" pre-frames (let the reader decide). "Remarkable success" and "transform" are vague qualifiers. No specific details. No curiosity.

---

### Testimonial (TM) — Good vs Bad

**Good:**

```
From Dave R., Columbus, OH:

"I was skeptical. I've bought every course, tried every guru's method, failed at all of them. But I figured what's one more.

Two weeks in, I closed my first deal — $8,400. By month three, I'd done $42,000. My wife thought I was dealing drugs."

(Dave didn't need any special skills. He followed the same 3-step process you'll find inside.)
```

Why this works: Named, located (credibility). Skepticism-first (relatable). Specific numbers. Personality ("thought I was dealing drugs"). Brief commentary that connects to offer without selling hard.

**Bad:**

```
John says: "This product completely transformed my life and I couldn't be happier with the results. I highly recommend it to anyone looking for success."
```

Why this fails: No location (not credible). No specifics. "Transformed my life" is generic. No before/after. No personality. Reads like a fake review.

---

### Voice Contamination Anti-Exemplar

```
Hey —

So I was thinking about this yesterday while walking the dog...

[conversational, personal, good]

...and it occurred to me that the implementation of this particular methodology represents a paradigm shift in how we conceptualize wealth-building frameworks.

[VOICE BREAK — shifted from conversational to corporate/academic mid-email]
```

Why this is flagged: The register shifts from casual first-person to corporate abstract. The reader feels the "person" disappear. Voice must be consistent opening to close.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-25 | Added SPECIMEN QUICK-REFERENCE section with good/bad inline examples |
| 1.0 | 2026-02-21 | Initial creation — full E1 architecture with 7 body type modes |

---

**Skill Status:** COMPLETE — Full layer architecture with Arena integration
