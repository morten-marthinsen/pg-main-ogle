# Email Engine — EMAIL-ENGINE.md

**Version:** 1.1
**Created:** 2026-02-21
**Updated:** 2026-03-02
**Purpose:** Institutional memory and execution constraints for Email Engine sessions. This is the master instruction file for the Email Engine subsystem of the CopywritingEngine.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: EMAIL-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-email-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [TWO OPERATING MODES](#two-operating-modes)
- [UPSTREAM PACKAGE CONTRACT (Mode A)](#upstream-package-contract-mode-a)
- [CLASSIFICATION TAXONOMY](#classification-taxonomy)
- [E0: EMAIL CAMPAIGN STRATEGIST](#e0-email-campaign-strategist)
- [E1: EMAIL WRITER](#e1-email-writer)
- [E2: SUBJECT LINE ENGINE](#e2-subject-line-engine)
- [E3: EMAIL SEQUENCE ASSEMBLER](#e3-email-sequence-assembler)
- [E4: EMAIL EDITORIAL](#e4-email-editorial)
- [ARENA INTEGRATION (Email Engine Specifics)](#arena-integration-email-engine-specifics)
- [CONTENT-TO-PITCH RATIO: DETAILED ENFORCEMENT](#content-to-pitch-ratio-detailed-enforcement)
- [SPECIMEN ARCHITECTURE](#specimen-architecture)
- [SHARED LIBRARIES](#shared-libraries)
- [CAMPAIGN TEMPLATES](#campaign-templates)
- [OUTPUT PATH CONVENTION](#output-path-convention)
- [MANDATORY OUTPUT PROTOCOL (ALL EMAIL SKILLS)](#mandatory-output-protocol-all-email-skills)
- [MC-CHECK PROTOCOL (Email-Specific Enhancements)](#mc-check-protocol-email-specific-enhancements)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [FORBIDDEN BEHAVIORS (Email Engine — Complete List)](#forbidden-behaviors-email-engine--complete-list)
- [ANTI-SLOP ENFORCEMENT (Email-Specific)](#anti-slop-enforcement-email-specific)
- [SESSION MANAGEMENT](#session-management)
- [CONTEXT LOAD MANAGEMENT (Email-Specific)](#context-load-management-email-specific)
- [INTEGRATION WITH MAIN COPYWRITINGENGINE](#integration-with-main-copywritingengine)
- [LEARNING CAPTURE (Email-Specific)](#learning-capture-email-specific)
- [VERSION HISTORY](#version-history)
- [APPENDIX: QUICK REFERENCE CARD](#appendix-quick-reference-card)

---

## THE 5 LAWS (Never Scroll Past This)

1. **Every email follows a structural template.** Ben Settle's 7 body types are the DNA. Generation without loading type-matched specimens = protocol violation.
2. **Subject lines are a separate skill.** Never generate emails and subject lines in the same pass. E2 (Subject Line Engine) runs AFTER E1 (Email Writer) because SLs must match the WRITTEN email, not a plan.
3. **70-80% content, 20-30% pitch.** The content-to-pitch ratio is sacred. Even launch emails are primarily content with a different CTA — NOT sales letters in email form.
4. **Variety is structural, not optional.** Never same body type twice in a row. The sequence blueprint (E0) assigns body types; E1 executes them.
5. **The bridge is everything.** The transition from content to pitch is the highest-skill moment in every email. Bridge specimens must be loaded and studied before generation.

---

## CRITICAL: READ THIS FIRST

This file exists because **email is the most common degradation vector in LLM-generated copy.** The failures are predictable:

1. **Emails become miniature sales letters** — pitch-heavy, content-light, indistinguishable from promo copy
2. **Subject lines are generated from outlines, not finished emails** — creating SL/body mismatch
3. **Every email in a sequence sounds the same** — no body type variety, no structural variation
4. **Bridges are abrupt or nonexistent** — content ends, pitch begins, reader disengages
5. **Email voice drifts toward "copywriter"** — loses the personal, one-to-one conversational register

**This file is the fix.** Before executing ANY Email Engine skill, read the relevant sections below.

---

## THE CORE PROBLEM: EMAIL-SPECIFIC DEGRADATION PATTERNS

Email copy degrades differently from long-form copy. The specific patterns:

### Pattern 1: The Pitch Creep
Content-to-pitch ratio starts at 70/30 and drifts to 40/60 by email #5 in a sequence. Each email becomes more "salesy" because the model conflates urgency with pitch density. **The fix:** Pitch ratio is enforced per-email, not averaged across the sequence. Every email must independently pass the 70/30 threshold.

### Pattern 2: The Monotone Sequence
Without structural body type enforcement, the model defaults to the same format for every email — typically a hybrid of Story + List that becomes a generic "content email" shape. **The fix:** E0 assigns body types to each slot in the sequence. E1 MUST execute the assigned type. No substitution without explicit human approval.

### Pattern 3: The Bridge Gap
The model generates strong content, then abruptly transitions to "Speaking of X, here's the link." Bridges are the hardest micro-skill in email writing. **The fix:** Bridge specimens are loaded from transition-phrase-library.md before every E1 execution. The bridge is evaluated as its own criterion in the Arena.

### Pattern 4: The Subject Line Hallucination
Subject lines generated before or alongside the email body promise content the email doesn't deliver. "The 3 hidden signs your metabolism is broken" as a subject line for an email that mentions metabolism once in passing. **The fix:** E2 runs AFTER E1, reading the FINISHED email before generating SL candidates.

### Anti-Degradation Protocol (Email-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Making the pitch section longer → STOP. Count words. Enforce 70/30.
- Writing two emails with same structure → STOP. Check body type assignment.
- Skipping bridge specimens → STOP. Load transition-phrase-library.md.
- Generating SLs from a plan/outline → STOP. E2 reads FINISHED emails only.
- Losing conversational register → STOP. Re-read voice specimens.
- Using "imagine" or "picture this" in an email → STOP. That's long-form copy language.

IF CONTEXT IS LARGE:
- This does NOT excuse pitch creep
- This does NOT excuse skipping bridge specimens
- This does NOT excuse body type repetition
- Request continuation rather than compressing email quality
```

---

## ARCHITECTURE OVERVIEW

The Email Engine is a 5-skill pipeline that generates email campaigns — either downstream from CopywritingEngine Skills 01-09 (Mode A) or standalone from a brief (Mode B).

### Skill Pipeline

```
E0: Email Campaign Strategist
  → Analyzes context, recommends campaign type + email sequence
  → Outputs campaign blueprint YAML

E1: Email Writer
  → Generates individual emails (7 body type modes)
  → Arena-powered (7 competitors, 2 rounds + audience evaluation)
  → System 1: Ben Settle structural specimens. System 2: Persona voice specimens.

E2: Subject Line Engine
  → Generates subject lines for FINISHED emails (18 formula categories)
  → Arena-powered
  → 20-50 candidates → Arena scoring → Top 10

E3: Email Sequence Assembler
  → Assembles individual emails into cohesive campaign
  → Cross-email callbacks, variety enforcement, PS strategy

E4: Email Editorial
  → Quality review and revision
  → Structural audit, voice consistency, pitch ratio, SL-body alignment
```

### Dependency Chain

```
E0 (Strategist) → E1 (Writer, per email) → E2 (Subject Lines, per email) → E3 (Assembler) → E4 (Editorial)
                                                                                                      ↓
                                                                                               CAMPAIGN COMPLETE
```

**E1 and E2 are per-email skills.** For a 7-email launch sequence, E1 runs 7 times and E2 runs 7 times. E3 assembles the 7 finished emails + 7 subject lines into the campaign.

### Shared Infrastructure

The Email Engine inherits from the CopywritingEngine:

| Component | File | What It Provides |
|-----------|------|-----------------|
| **Arena Protocol** | `~system/protocols/ARENA-CORE-PROTOCOL.md` | 7-competitor, 2-round + audience evaluation competition framework |
| **Persona Panel** | `~system/protocols/ARENA-PERSONA-PANEL.md` | 6 persona specifications + The Architect + The Critic |
| **Synthesizer** | `SYNTHESIZER-LAYER.md` | Post-arena phrase-level hybrid creation |
| **Soul.md Protocol** | `skills/SOUL-MD-PROTOCOL.md` | Project-level taste constraints |
| **Persona Voice Loading** | `~system/protocols/PERSONA-VOICE-LOADING-PROTOCOL.md` | System 2 specimen loading |
| **Taste Capture** | `~system/protocols/TASTE-CAPTURE-PROTOCOL.md` | Structured edit learning |
| **Learning Capture** | `~system/protocols/LEARNING-CAPTURE-PROTOCOL.md` | Continuous improvement loop |
| **MC-CHECK** | `~system/SYSTEM-CORE.md` | Metacognitive checkpoint protocol |
| **Vertical Profiles** | `~system/verticals/` | Niche-specific configuration |

---

## TWO OPERATING MODES

### Mode A: Downstream from CopywritingEngine (Full Pipeline)

Skills 01-09 already complete. The Email Engine receives the full intelligence package and builds a campaign from it.

```
CopywritingEngine Skills 01-09 (COMPLETE)
    ↓
E0 loads all upstream packages
    ↓
E0 recommends campaign type + sequence blueprint
    ↓
E1 generates each email (per body type assignment)
    ↓
E2 generates subject lines (per finished email)
    ↓
E3 assembles into campaign
    ↓
E4 editorial review
    ↓
CAMPAIGN COMPLETE
```

**Mode A Advantages:**
- Full audience intelligence from Research (Skill 01)
- Complete proof inventory (Skill 02)
- Root cause, mechanism, promise, big idea already developed (Skills 03-06)
- Offer architecture ready (Skill 07)
- Campaign structure context from Skill 08
- All upstream packages provide rich material for email content

### Mode B: Standalone (Direct Brief)

No upstream CopywritingEngine work exists. The Email Engine works from a brief provided directly.

```
User provides brief:
  - Product/offer description
  - Target audience
  - Key mechanism/story (if available)
  - Available proof (testimonials, data, case studies)
  - Campaign goal (launch, relationship, autoresponder, etc.)
  - Tone/voice references (if available)
    ↓
E0 works from brief directly (expanded analysis since no upstream)
    ↓
Same E1-E4 pipeline
```

**Mode B Constraints:**
- E0 must do MORE work — cannot rely on upstream intelligence
- E0 Layer 1 becomes a mini-research phase (audience language extraction from brief)
- Content depth is limited by brief quality — the brief IS the intelligence package
- Soul.md may not exist — E0 creates a lightweight voice constraint from brief signals

**Mode Detection is AUTOMATIC:**
```
AT E0 START:
  CHECK: Does [project]/01-research/FINAL_HANDOFF.md exist?
  IF YES → Mode A (load upstream packages)
  IF NO  → Mode B (work from brief)
  LOG: "Email Engine operating in Mode [A/B]"
```

---

## UPSTREAM PACKAGE CONTRACT (Mode A)

When downstream from CopywritingEngine, E0 expects and loads these packages:

| Source Skill | Package File | What E0 Extracts |
|-------------|-------------|-----------------|
| **01-Research** | `FINAL_HANDOFF.md` | Audience intelligence, market language, pain/hope quotes, awareness level, sophistication analysis |
| **02-Proof Inventory** | `FINAL_HANDOFF.md` | Testimonials, data points, case studies, proof strength score, promise ceiling |
| **03-Root Cause** | `root-cause-package.yaml` | Core problem framing, what-they-think vs what's-real, why-nothing-worked |
| **04-Mechanism** | `mechanism-package.json` | How-it-works story, mechanism name, binary reframe, scientific backing |
| **05-Promise** | `promise-output.json` | Core promise, calibration to proof, time/magnitude/specificity |
| **06-Big Idea** | `big-idea-package.yaml` | Central concept, FSSIT anchor, creative wrapper |
| **07-Offer** | `offer-package.json` | What's being sold, price architecture, bonus stack, guarantee, urgency mechanism |
| **08-Structure** | `structure-package.json` | Campaign structure context, section flow, key transitions |
| **Soul.md** | `SOUL.md` | Voice register, energy signature, anti-voice patterns, pacing |

### Upstream Loading Verification

```
E0 LAYER 0 — UPSTREAM LOADER:
  FOR EACH package in contract:
    CHECK: File exists?
    IF YES: Load and extract key fields
    IF NO:  Log as missing, assess impact

  AFTER ALL:
    IF mode A AND 0 packages loaded → HALT (something is wrong)
    IF mode A AND <3 packages loaded → WARN (limited intelligence)
    IF mode A AND all packages loaded → PROCEED (full intelligence)
```

---

## CLASSIFICATION TAXONOMY

Emails are classified along THREE independent dimensions. Every email has exactly one assignment per dimension.

### Dimension 1: Email Body Type (HOW the email is structured)

The 7 body types are the structural DNA of the Email Engine. They define HOW the email is built — its internal architecture, the shape of the content, and how the reader experiences the message.

| Type | Code | Key Structural Element | Opening Pattern | Content Shape | Bridge Pattern |
|------|------|----------------------|----------------|--------------|---------------|
| **Contrarian** | CT | Bold claim that opposes conventional wisdom → stack-and-dismiss argument → bridge | Start with the bold claim (1-2 sentences). No setup. No "today I want to talk about." Drop the reader into the disagreement. | 3-5 paragraphs building the contrarian case. Each paragraph adds one supporting argument. End each with a mini-cliffhanger or provocative extension. | "Which is exactly why [product] does the opposite..." or "And that's the principle behind..." |
| **Quote-Opener** | QO | Formatted quote block → riff → lesson extraction → bridge | Blockquoted (or italicized) quote with attribution. Then 1-2 sentences of personal reaction/riff. | The riff IS the content. React to the quote, expand it, connect it to the reader's situation. Extract a lesson or principle. 3-6 paragraphs. | "That's the same principle that makes [product] work..." |
| **Testimonial** | TM | Attribution → testimonial text → brief reaction → CTA | Name (or anonymized) + context, then the testimonial. Keep it raw and unpolished — real testimonials sound real. | Brief reaction to the testimonial (1-3 sentences). DO NOT restate or analyze the testimonial at length. Let the testimonial speak for itself. | Minimal bridge — testimonials are inherently proof. "If you want results like [Name]..." |
| **Q&A / Reader Response** | QA | Attribution → reader's question → extended answer → bridge | "Got this email from [Name/reader]:" followed by the question. | The answer IS the content. Treat it like teaching — generous, specific, practical. 4-8 paragraphs. The reader who asked benefits, but so does everyone reading. | "And if you want the complete system for doing this..." |
| **List-Based** | LB | Setup → numbered or bulleted list → wrap-up → CTA | 1-3 sentences of setup. Why this list matters. What it will do for them. | The list itself (3-7 items typically). Each item is 1-3 sentences. Lists should teach or surprise — not just catalog features. | Wrap-up paragraph that ties the list to the product/offer. |
| **Story** | ST | Story opener → narrative arc → lesson extraction → bridge | Drop into the story in media res or with a vivid scene-setting detail. No "Let me tell you a story about..." | Full narrative arc: character + conflict + resolution (or cliffhanger). 5-10 paragraphs. The story must be INTERESTING — not just a delivery mechanism for the lesson. | Extract the lesson in 1-2 sentences, then bridge: "That's exactly what happens when..." |
| **Negative Response** | NR | Troll/hater display → demolition → lesson extraction → bridge | Display the negative comment/email (blockquoted, with attitude). | Demolish the argument while entertaining the reader. The demolition teaches a lesson — it's not just dunking. 4-7 paragraphs. Turn the hater into a teaching moment. | "Which is one of the reasons [product] works so well — it's built on [principle], not [hater's assumption]..." |

### Body Type Selection Constraints

```
HARD RULES:
  - NEVER same body type twice in a row in any sequence
  - Launch sequences: Day 1 MUST be ST or CT (high engagement)
  - Launch sequences: Final day MUST NOT be QA or TM (low urgency types)
  - Autoresponders: Distribute all 7 types across the series
  - Daily relationship: Rotate through at least 4 of 7 types per week
```

### Dimension 2: Campaign Function (WHAT the email is trying to accomplish)

| Function | Code | Description | Typical Sequence Length | Pitch Intensity |
|----------|------|-------------|----------------------|-----------------|
| **Daily Relationship** | DR | Regular email with soft pitch — the default mode. Building relationship, demonstrating expertise, keeping the reader engaged. | Ongoing (daily or near-daily) | Low (link + 1-2 sentences) |
| **Deadline Urgency** | DU | Same structure as DR but with genuine time pressure. Cart close, enrollment deadline, limited availability. | 1-3 emails near deadline | Medium (urgency language + DR pitch) |
| **Product Launch** | PL | Multi-day sequence introducing a new product/offer. Builds from content-heavy early emails to pitch-heavier close emails. | 5-17 emails over 3-7 days | Escalating (20% → 30%) |
| **Affiliate Launch** | AL | Multi-day sequence promoting a partner's product. Same structure as PL but framed as personal recommendation, not internal product. | 3-7 emails over 3-5 days | Escalating (20% → 30%) |
| **Blatant Pitch** | BP | Transparent hard sell where the meta-awareness IS the entertainment. "I'm going to pitch you today. Hard. Because this deserves it." | Single email | High (but self-aware) |
| **Content/Podcast** | CP | Pure value or content promotion. Driving traffic to content, building authority, no product pitch. | Single email or series | None to minimal |
| **Autoresponder** | AR | Evergreen emails resent to new subscribers. Must be time-independent — no "last Tuesday" or "this week." | 14-30 emails, automated | Low (consistent soft pitch) |
| **Welcome Series** | WS | New subscriber onboarding. Deliver lead magnet, establish brand, build trust before pitching. Behavior-triggered (signup). | 4 emails over 7-10 days | None → Low |
| **Cart Abandonment** | CA | Recover abandoned carts/checkouts. Highest-intent behavioral trigger. Shorter emails (150-300w). | 3 emails over 3 days | Medium → High |
| **Post-Purchase** | PP | New customer onboarding. Build LTV, not immediate revenue. Zero hard selling — tips, community, cross-sell tease only. | 3-4 emails over 7-14 days | None (0-15%) |
| **Winback** | WB | Re-engage inactive subscribers (30-90+ days). Genuine check-in, not nagging. Suppress if no response after 3 emails. | 3 emails over 7-14 days | None → Low |

### Dimension 3: Subject Line Formula (HOW it grabs attention)

18 categories derived from Ben Settle's email subject line patterns. Distribution percentages reflect observed frequency in high-performing email marketers' output.

| Category | Code | Example Pattern | Frequency |
|----------|------|----------------|-----------|
| **"The [X]"** | SL-THE | "The metabolism myth", "The 3am problem" | 15.5% |
| **"How to [Y]"** | SL-HOW | "How to fix your sleep in 48 hours" | 14.6% |
| **"Why [Z]"** | SL-WHY | "Why your doctor is wrong about cholesterol" | 8.8% |
| **Curiosity/Secret** | SL-CUR | "What nobody told you about intermittent fasting" | 6.0% |
| **Edgy/Profane** | SL-EDG | "The BS supplement industry secret" | 5.7% |
| **Number/List** | SL-NUM | "7 signs your thyroid is struggling" | 2.9% |
| **Confession/Admission** | SL-CON | "I was wrong about keto" | 2.4% |
| **Command/Imperative** | SL-CMD | "Stop eating this immediately" | 2.3% |
| **Name-Drop** | SL-NAM | "What Dr. Gundry told me last week" | 2.2% |
| **Provocation/Identity** | SL-PRV | "You're probably making this mistake" | 1.9% |
| **Question** | SL-QUE | "Is your gut leaking?" | 1.8% |
| **Announcement** | SL-ANN | "Big news about [Product]" | 1.6% |
| **Story Tease** | SL-STR | "The farmer who reversed his diabetes" | 1.4% |
| **Contrarian** | SL-CTR | "Exercise is making you fat" | 1.2% |
| **Social Proof** | SL-SOC | "23,847 people can't be wrong" | 1.1% |
| **Time Pressure** | SL-TIM | "Last chance (midnight tonight)" | 1.0% |
| **Personalized** | SL-PER | "[Name], quick question" | 0.8% |
| **Blank/Minimal** | SL-BLK | "." or "re:" or "hey" | 0.5% |

### Subject Line Selection Constraints

```
HARD RULES:
  - NEVER same SL formula twice in a row
  - Launch sequences: Day 1 MUST use SL-CUR or SL-STR (high open rate types)
  - Final deadline email: MUST use SL-TIM
  - SL-BLK: Maximum 1 per 30-email window (overuse kills deliverability)
  - SL-EDG: Maximum 2 per 10-email window
  - Word count sweet spot: 6-7 words. Permitted range: 3-12 words.
  - Subject line MUST match email body content — verified by E2 alignment check
```

---

## E0: EMAIL CAMPAIGN STRATEGIST

### Purpose
E0 analyzes available context (upstream packages in Mode A, brief in Mode B) and produces a campaign blueprint — the master plan that tells E1 what to write and in what order.

### Layer Architecture

| Layer | Name | Key Microskills | Model |
|-------|------|----------------|-------|
| **0** | Foundation | 0.1 Mode Detection + Upstream/Brief Loader, 0.2 Soul.md Loader, 0.3 Vertical Profile Loader | haiku |
| **1** | Context Analysis | 1.1 Audience Intelligence Extraction, 1.2 Proof Inventory Scan, 1.3 Content Reservoir Mapping, 1.4 Competitive Email Landscape | opus |
| **2** | Campaign Design | 2.1 Campaign Type Recommendation, 2.2 Sequence Blueprint Generation, 2.3 Body Type Assignment, 2.4 Content-to-Pitch Calibration, 2.5 Urgency Architecture | opus |
| **3** | Validation + Output | 3.1 Blueprint Validation (variety check, escalation check, ratio check), 3.2 Campaign Blueprint YAML Output, 3.3 Strategist Summary Handoff | sonnet |

### E0 Primary Output: Campaign Blueprint YAML

```yaml
# campaign-blueprint.yaml
campaign:
  name: "[campaign name]"
  mode: "[A or B]"
  function: "[DR|DU|PL|AL|BP|CP|AR]"
  total_emails: [integer]
  duration_days: [integer]

  soul_md_loaded: [true/false]
  vertical: "[golf|health|finance|personal-dev|technology|none]"

  content_reservoir:
    stories: [count available]
    proof_elements: [count available]
    mechanism_angles: [count available]
    root_cause_angles: [count available]
    educational_topics: [count available]

  sequence:
    - email_number: 1
      day: 1
      send_time: "[morning|afternoon|evening]"
      body_type: "[CT|QO|TM|QA|LB|ST|NR]"
      function: "[DR|DU|PL|AL|BP|CP|AR]"
      content_focus: "[brief description of email content angle]"
      pitch_intensity: "[low|medium|high]"
      content_ratio: "[80/20|75/25|70/30]"
      key_proof_elements: "[list proof to weave in]"
      bridge_strategy: "[brief bridge approach]"

    - email_number: 2
      # ... same structure

  escalation_pattern:
    day_1: "[email count]"
    day_2: "[email count]"
    # ...

  variety_audit:
    body_types_used: "[list]"
    consecutive_duplicates: 0  # MUST be 0
    types_missing: "[list — warning if >3 missing]"

  urgency_architecture:
    mechanism: "[cart close|enrollment|limited spots|price increase|none]"
    first_mention_email: [integer]
    escalation_emails: "[list of email numbers]"
    final_deadline_email: [integer]
```

### E0 Validation Gates

```
GATE: Campaign Blueprint Validation
  [ ] No consecutive body type duplicates
  [ ] Launch sequences have escalation pattern
  [ ] Content ratios within 70-80 / 20-30 range for all emails
  [ ] Autoresponder emails contain ZERO time-specific references
  [ ] At least 4 of 7 body types used in any sequence > 7 emails
  [ ] Day 1 of launch uses ST or CT body type
  [ ] Final deadline email has DU function code
  [ ] Total emails appropriate for campaign type (PL: 5-17, AL: 3-7, AR: 14-30)

  IF ANY UNCHECKED → REVISE BLUEPRINT BEFORE E1 EXECUTION
```

### Content Reservoir Mapping (Mode A vs Mode B)

**Mode A:** Content reservoir is RICH — upstream packages provide stories, proof, mechanism angles, root cause frames, educational content across 8 skill outputs.

```
MODE A CONTENT SOURCES:
  - Research FINAL_HANDOFF.md → pain/hope quotes, awareness language, market sophistication
  - Proof Inventory → testimonials, data, studies, case studies
  - Root Cause Package → "what they think" angles, "what's real" angles, "why nothing worked"
  - Mechanism Package → how-it-works story, binary reframe, scientific backing
  - Promise Package → promise angles, calibrated claims
  - Big Idea Package → central concept, FSSIT anchor
  - Offer Package → bonus angles, guarantee angles, value framing
  - Structure Package → campaign narrative arc
```

**Mode B:** Content reservoir is LIMITED — brief provides the only source material.

```
MODE B CONTENT EXTRACTION:
  1. Parse brief for all stories, testimonials, data points
  2. Extract mechanism description (even if informal)
  3. Identify proof elements available
  4. Map audience language from brief descriptions
  5. Assess content depth: DEEP (rich brief) | MODERATE | SHALLOW (minimal brief)

  IF SHALLOW:
    - WARN: "Brief provides limited content. Sequence length should be shorter."
    - Recommend maximum 7 emails for launches, 14 for autoresponders
    - Each email must lean heavier on body-type structure to compensate
```

---

## E1: EMAIL WRITER

### Purpose
E1 generates individual emails according to the body type, function, and content focus assigned by E0's campaign blueprint.

### Layer Architecture

| Layer | Name | Key Microskills | Model |
|-------|------|----------------|-------|
| **0** | Foundation | 0.1 Blueprint Loader (reads campaign-blueprint.yaml for THIS email's assignment), 0.2 Soul.md Loader, 0.3 Specimen Loader (System 1: body-type specimens, System 2: persona voice specimens), 0.4 Bridge Specimen Loader (transition-phrase-library.md) | haiku |
| **1** | Classification + Planning | 1.1 Body Type Structural Template Selection, 1.2 Content Angle Identification, 1.3 Bridge Strategy Selection, 1.4 Pitch Architecture (CTA + ratio) | sonnet |
| **2 (Arena)** | Generation | 7 competitors generate full email draft per body type assignment, 2 rounds + audience evaluation mandatory | opus |
| **3** | Validation + Output | 3.1 Content-to-Pitch Ratio Verification, 3.2 Bridge Quality Assessment, 3.3 Body Type Compliance Check, 3.4 Anti-Slop Scan, 3.5 Email Output File | sonnet |

### E1 Specimen Loading Protocol (MANDATORY)

**System 1: Body-Type Structural Specimens**

Before generating ANY email, the model MUST load type-matched specimens from the `specimens/` directory.

```
LOADING PROTOCOL:
  1. READ campaign blueprint → Identify body type for THIS email (CT|QO|TM|QA|LB|ST|NR)
  2. LOAD specimens from specimens/[body-type]/
     - specimens/contrarian/ → for CT emails
     - specimens/quote-opener/ → for QO emails
     - specimens/testimonial/ → for TM emails
     - specimens/qa-response/ → for QA emails
     - specimens/list-based/ → for LB emails
     - specimens/story/ → for ST emails
     - specimens/negative-response/ → for NR emails
  3. HOLD specimens in active context during generation
  4. DO NOT summarize specimens — use VERBATIM text
  5. ALL 7 Arena competitors reference the SAME structural specimens

  IF specimens directory is empty for this body type:
    → WARN: "No structural specimens loaded for [type]. Generation will lack pattern DNA."
    → PROCEED but flag output as "generated without System 1 specimens"
    → This is a QUALITY DEGRADATION, not a HALT condition
```

**System 2: Persona Voice Specimens**

Each Arena competitor loads specimens from their actual copywriter (inherited from CopywritingEngine persona-specimens/).

```
LOADING PROTOCOL:
  1. Per PERSONA-VOICE-LOADING-PROTOCOL.md
  2. For EMAIL generation, prioritize:
     - Makepeace: Health/financial email specimens if available, else full controls for flow DNA
     - Halbert: Boron Letters for conversational register (closest to email voice)
     - Schwartz: Headlines specimen for subject line influence on openings
     - Ogilvy: Body copy ads for credibility weaving
     - Clemens: VSL transcripts for mechanism simplification
     - Bencivenga: Marketing Maxims for proof-first structure
  3. HOLD alongside System 1 specimens
```

**Bridge Specimens (MANDATORY)**

```
LOADING PROTOCOL:
  1. READ shared/transition-phrase-library.md
  2. HOLD bridge phrases in active context
  3. Every competitor MUST use or adapt bridge phrases (not invent from scratch)
  4. Bridge quality is a scored criterion in Arena
```

### E1 Arena Integration

**Mode:** `generative_full_draft`
**Competitors:** 7 (standard panel from ARENA-PERSONA-PANEL.md, or vertical-configured panel)
**Rounds:** 2 + audience evaluation mandatory

**Email-Specific Arena Judging Criteria (7 criteria, weighted):**

| Criterion | Weight | What It Measures |
|-----------|--------|-----------------|
| **Opening Hook** | 20% | Do the first 3 lines compel continued reading? Is the reader immediately engaged? No throat-clearing, no "Today I want to talk about..." |
| **Content-to-Pitch Ratio** | 15% | Is the email 70-80% genuine content and 20-30% pitch? Does the content provide standalone value? |
| **Bridge Quality** | 20% | Is the transition from content to pitch smooth, natural, and entertaining? Does it feel like a natural extension of the content rather than a gear-shift? |
| **Voice Consistency** | 15% | Does the email maintain a consistent one-to-one conversational register? Does it sound like a person writing to another person, not a copywriter writing to an audience? |
| **Body Type Compliance** | 10% | Does the email follow the structural pattern of its assigned body type? Are the key structural elements present and properly executed? |
| **Engagement Value** | 10% | Would the reader feel they got value even if they don't click? Is the email worth reading on its own merits? |
| **CTA Strength** | 10% | Is the CTA clear, specific, and compelling within its 3-sentence maximum? Does it give a reason to click NOW? |

**Email-Specific Critic Focus:**

The Critic evaluates each competitor's email with special attention to:
- Bridge quality (most common failure point)
- Pitch creep (ratio violations)
- Voice register breaks (shifting from conversational to "copywriter")
- Body type drift (starting as one type, finishing as another)

### E1 Content-to-Pitch Ratio Enforcement

```
RATIO CALCULATION:
  total_words = count all words in email body (excluding SL, greeting, sign-off)
  pitch_words = count words from bridge phrase to end of CTA
  content_words = total_words - pitch_words

  content_ratio = content_words / total_words
  pitch_ratio = pitch_words / total_words

ENFORCEMENT:
  IF pitch_ratio > 0.30 → HALT. Reduce pitch section.
  IF pitch_ratio < 0.15 → WARN. Pitch may be too weak for function.
  IF content_ratio < 0.70 → HALT. Add more content value.

PITCH SECTION BOUNDARIES:
  - Bridge phrase = START of pitch section
  - Sign-off = END of pitch section (PS is outside main ratio calculation)
  - CTA = MAX 3 sentences
  - Sign-off = Name only (no title, no credentials)
  - PS = Optional. If present, max 2 sentences. Adds one extra angle.
```

### E1 Output Format

```
PLAIN TEXT (default):
  - One sentence per line (Ben Settle style)
  - Short paragraphs (max 3 sentences, usually 1-2)
  - No HTML formatting
  - No images or media embeds in body
  - Blank line between paragraphs
  - Quote blocks use ">" prefix or italics markers
  - Lists use plain dashes or numbers

HTML (optional flag per campaign):
  - Same structural formatting
  - Minimal HTML: <p>, <br>, <em>, <strong>, <blockquote>, <ul>/<ol>/<li>
  - NO fancy templates, colors, fonts, or layout elements
  - Email clients strip most CSS — keep it simple
```

### E1 Per-Email Output File

Each email produces its own output file:

```
[project]/email-campaign/emails/email-[N]-[body-type].md

# Email [N]: [Content Focus Title]
## Metadata
- Body Type: [CT|QO|TM|QA|LB|ST|NR]
- Function: [DR|DU|PL|AL|BP|CP|AR]
- Day: [N] of [total]
- Content Ratio: [X]% content / [Y]% pitch
- Word Count: [total]
- Bridge Strategy: [description]
- Specimens Loaded: [System 1: Y/N, System 2: Y/N, Bridge: Y/N]

## Email Body
[Full email text]

## Arena Results
- Winner: [persona name] (Round 2 (FINAL) score: [X])
- Selected: [pure winner / hybrid [letter]]
- Key strength: [1-2 sentences]
```

---

## E2: SUBJECT LINE ENGINE

### Purpose
E2 generates subject lines for FINISHED emails. It reads the completed email body from E1 and generates candidates that accurately match the email's content.

### Critical Constraint: E2 Runs AFTER E1

```
E2 CANNOT EXECUTE until:
  [ ] E1 output file exists for the target email
  [ ] E1 email body is COMPLETE (not a draft, not an outline)
  [ ] E1 Arena results are finalized (winner selected)

IF E1 output does not exist → HALT. E2 cannot generate SLs for unwritten emails.
```

### Layer Architecture

| Layer | Name | Key Microskills | Model |
|-------|------|----------------|-------|
| **0** | Foundation | 0.1 Email Body Loader (reads FINISHED email from E1), 0.2 SL Specimen Loader (specimens/subject-lines/), 0.3 SL Formula Distribution Check | haiku |
| **1** | Analysis | 1.1 Email Content Extraction (key themes, hook potential, curiosity gaps), 1.2 SL Formula Matching (which of 18 formulas fit THIS email's content), 1.3 Niche Calibration | opus |
| **2 (Arena)** | Generation | 7 competitors each generate 5 SL candidates → 35 total → scoring → Top 10 | opus |
| **3** | Validation + Output | 3.1 SL-Body Alignment Check, 3.2 Word Count Verification, 3.3 Formula Distribution Audit, 3.4 Top 10 Ranking | sonnet |

### E2 Arena Integration

**Mode:** `generative_full_draft`
**Competitors:** 7 (standard panel)
**Rounds:** 2 + audience evaluation mandatory

**Each competitor generates 5 SL candidates per round.** This produces 35 candidates per round, 70 total across 2 rounds. Final scoring selects Top 10.

**Subject Line-Specific Judging Criteria (7 criteria, weighted):**

| Criterion | Weight | What It Measures |
|-----------|--------|-----------------|
| **Curiosity Gap** | 25% | Does the SL create an information gap the reader MUST close? Does it promise value without revealing the payoff? |
| **Emotional Trigger** | 20% | Does the SL activate an emotion (curiosity, fear, desire, anger, surprise)? Is the emotional hook calibrated to the niche? |
| **Body-Match** | 20% | Does the SL accurately represent what the email delivers? Would a reader who opens based on the SL feel satisfied by the content? |
| **Word Economy** | 10% | Is the SL in the 6-7 word sweet spot? If longer, does every word earn its place? |
| **Niche Calibration** | 10% | Does the SL use language appropriate to the audience? Would the target audience recognize this as relevant to them? |
| **Reuse Potential** | 5% | Could this SL formula be adapted for future emails? (Higher for evergreen formulas, lower for one-off tricks) |
| **Open Rate Prediction** | 10% | Estimated relative open rate compared to baseline. Based on formula type, word count, emotional intensity. |

### E2 SL-Body Alignment Check (MANDATORY)

```
FOR EACH subject line candidate:
  1. IDENTIFY the primary claim/promise/tease in the SL
  2. SEARCH the email body for corresponding content
  3. SCORE alignment:
     - STRONG: SL promise is directly addressed in email body
     - MODERATE: SL theme is present but not the primary focus
     - WEAK: SL implies content the email doesn't deliver
     - MISMATCH: SL has no relationship to email body

  IF alignment = WEAK or MISMATCH → DISCARD candidate
  IF alignment = MODERATE → FLAG but keep (human decides)
  ONLY STRONG alignment candidates advance to Top 10
```

### E2 Output File

```
[project]/email-campaign/subject-lines/sl-email-[N].md

# Subject Lines: Email [N]
## Email Summary
- Body Type: [code]
- Content Focus: [from blueprint]
- Key Themes: [extracted from email body]

## Top 10 Subject Lines (Ranked)
1. "[SL text]" — Formula: [code], Words: [N], Alignment: STRONG, Score: [X]
2. "[SL text]" — Formula: [code], Words: [N], Alignment: STRONG, Score: [X]
...
10. "[SL text]" — Formula: [code], Words: [N], Alignment: STRONG, Score: [X]

## Arena Results
- Round 2 (FINAL) best performer: [persona]
- Hybrid SLs created: [Y/N]
- Total candidates evaluated: [N]
- Candidates discarded (alignment): [N]

## Recommended
Primary: "[SL text]"
Alternate: "[SL text]"
Rationale: [2-3 sentences]
```

---

## E3: EMAIL SEQUENCE ASSEMBLER

### Purpose
E3 assembles individual emails (from E1) and subject lines (from E2) into a cohesive campaign. It ensures cross-email consistency, manages callbacks and narrative threads, and produces the final campaign package.

### Layer Architecture

| Layer | Name | Key Microskills | Model |
|-------|------|----------------|-------|
| **0** | Foundation | 0.1 Campaign Blueprint Loader, 0.2 All Email Output Loader (E1 outputs), 0.3 All SL Output Loader (E2 outputs) | haiku |
| **1** | Assembly | 1.1 Sequence Ordering, 1.2 Cross-Email Callback Insertion, 1.3 PS Strategy Assignment, 1.4 Narrative Thread Verification | sonnet |
| **2** | Quality Audit | 2.1 Variety Enforcement (body type distribution), 2.2 Pitch Escalation Check (for launch sequences), 2.3 Voice Consistency Across Sequence, 2.4 Time Reference Audit (for AR campaigns) | opus |
| **3** | Output | 3.1 Campaign Package Assembly, 3.2 Campaign Summary Handoff | sonnet |

### Cross-Email Callbacks

```
CALLBACK RULES:
  - Email [N] can reference Email [N-1] or [N-2] ONLY (recent memory window)
  - Callbacks use phrases like: "Yesterday I mentioned...", "Remember the [X] I told you about?", "That thing about [Y]?"
  - Callbacks must NOT require the reader to have read the previous email (standalone principle)
  - Callbacks add FLAVOR, not DEPENDENCIES
  - Maximum 1 callback per email
  - Autoresponder callbacks must reference content, not dates
```

### PS Strategy

```
PS RULES:
  - PS is OPTIONAL — not every email needs one
  - Maximum frequency: 60% of emails in a sequence (overuse dulls impact)
  - PS types:
    a. "Urgency reminder" — deadline, limited spots, price increase
    b. "Testimonial drop" — brief proof element
    c. "Bonus reveal" — additional value mention
    d. "Curiosity loop" — tease tomorrow's email
    e. "Personal aside" — humanizing detail
  - PS maximum: 2 sentences
  - NEVER use PS as a second CTA (one CTA per email, period)
```

### E3 Narrative Thread Verification

For multi-email sequences, E3 verifies narrative coherence:

```
VERIFICATION:
  FOR launch sequences (PL, AL):
    - Day 1-2: Problem/story focus (low pitch)
    - Day 3-4: Mechanism/solution focus (medium pitch)
    - Day 5+: Offer/urgency focus (escalating pitch)
    - VERIFY: Pitch intensity matches escalation pattern
    - VERIFY: Mechanism/product is NOT introduced before Day 2

  FOR autoresponder sequences (AR):
    - No narrative dependency between emails
    - Each email is fully standalone
    - Topics rotate across content reservoir
    - VERIFY: Zero time-specific references ("last week", "tomorrow", "today only")

  FOR daily relationship (DR):
    - No required reading order
    - Each email standalone
    - Variety across body types within any 7-email window
```

### E3 Output: Campaign Package

```
[project]/email-campaign/CAMPAIGN-PACKAGE.md

# [Campaign Name] — Complete Email Campaign
## Campaign Overview
- Mode: [A/B]
- Function: [code]
- Total Emails: [N]
- Duration: [N] days
- Body Types Used: [list with counts]

## Full Sequence
### Email 1 — Day [N]
Subject Line: "[selected SL]"
Alt Subject Line: "[alternate SL]"
Body Type: [code]
[Full email text]
---
### Email 2 — Day [N]
...
[continues for all emails]

## Campaign Metrics
- Average content ratio: [X]%
- Body type variety score: [X/7]
- Pitch escalation pattern: [verified/warning]
- Cross-email callbacks: [count]
- PS usage: [count]/[total] ([X]%)
```

---

## E4: EMAIL EDITORIAL

### Purpose
E4 is the quality review and revision layer. It audits the assembled campaign for structural compliance, voice consistency, pitch ratio violations, SL-body alignment, and overall quality.

### Layer Architecture

| Layer | Name | Key Microskills | Model |
|-------|------|----------------|-------|
| **0** | Foundation | 0.1 Campaign Package Loader, 0.2 Soul.md Loader, 0.3 Anti-Slop Pattern Loader | haiku |
| **1** | Audit | 1.1 Structural Compliance Audit (body types, variety, escalation), 1.2 Voice Consistency Audit (register, tone, one-to-one feel), 1.3 Pitch Ratio Audit (per-email and sequence-level), 1.4 SL-Body Alignment Audit, 1.5 Anti-Slop Scan, 1.6 Bridge Quality Audit | opus |
| **2** | Issue Clustering | 2.1 Issue Severity Classification (P1: structural violation, P2: voice break, P3: polish), 2.2 Issue Clustering by Type | opus |
| **3 (Arena)** | Revision | Per-issue Arena (7 competitors propose fixes, 2 rounds + audience evaluation for P1-P2, optional for P3+) | opus |
| **4** | Final Output | 4.1 Revised Campaign Package, 4.2 Editorial Summary, 4.3 Before/After Comparison | sonnet |

### E4 Audit Criteria

```
STRUCTURAL COMPLIANCE:
  [ ] No consecutive body type duplicates
  [ ] Body type distribution uses 4+ of 7 types (sequences > 7 emails)
  [ ] Launch sequences follow escalation pattern
  [ ] Autoresponder emails have ZERO time references
  [ ] CTA maximum 3 sentences per email
  [ ] Paragraph maximum 3 sentences per email
  [ ] PS maximum 2 sentences where present
  [ ] PS frequency <= 60% of sequence

VOICE CONSISTENCY:
  [ ] Conversational register maintained (not "copywriter" voice)
  [ ] One-to-one tone (not one-to-many broadcasting)
  [ ] Consistent personality across sequence (same "person" writing)
  [ ] Soul.md voice constraints respected
  [ ] Anti-voice patterns absent

PITCH RATIO:
  [ ] Every email independently passes 70-80 / 20-30 check
  [ ] No email exceeds 30% pitch
  [ ] Launch sequence shows escalation (not random pitch intensities)

SL-BODY ALIGNMENT:
  [ ] Every SL has STRONG alignment with its email body
  [ ] No SL promises content the email doesn't deliver
  [ ] SL formula variety across sequence

ANTI-SLOP:
  [ ] Zero AI telltale words (revolutionary, game-changing, unlock, harness, etc.)
  [ ] Zero corporate filler (comprehensive, robust, innovative, etc.)
  [ ] Zero copywriting cliches (imagine if you could, picture this, what if I told you, etc.)
  [ ] Zero hedge words in claims (might, could potentially, perhaps, etc.)
  [ ] Zero empty intensifiers (literally, absolutely, incredibly, etc.)

BRIDGE QUALITY:
  [ ] Every email has a distinct bridge (not abrupt transition)
  [ ] Bridge feels natural within the email's content flow
  [ ] Bridge is not a formulaic "Speaking of X..." every time
  [ ] Bridge variety across sequence
```

### E4 Issue Severity Classification

| Priority | Description | Arena Treatment |
|----------|-------------|----------------|
| **P1: Structural Violation** | Body type duplicate, ratio violation, missing bridge, SL mismatch | Full 2-round + audience evaluation Arena MANDATORY |
| **P2: Voice Break** | Register shift, copywriter voice intrusion, personality inconsistency | Full 2-round + audience evaluation Arena MANDATORY |
| **P3: Polish** | Word choice, pacing, paragraph structure, minor clarity | Arena optional (human confirms quick-fix or full Arena) |
| **P4: Enhancement** | Opportunity to strengthen, not a flaw | Log only, human decides |

---

## ARENA INTEGRATION (Email Engine Specifics)

### Email Writer Arena (E1)

**Inherits from:** `~system/protocols/ARENA-CORE-PROTOCOL.md`

The E1 Arena runs for EACH email in the sequence. A 7-email launch produces 7 separate Arena runs.

**Arena Flow per Email:**

```
ROUND 1:
  1A: 7 Competitors each generate full email per body type assignment
      - Each loads: body-type specimens (System 1) + persona voice (System 2) + bridge specimens
  1B: Critic identifies ONE weakness per email (focus: bridge, ratio, voice, body type compliance)
  1C: Targeted revision
  1D: Scoring against 7 email-specific criteria
  1E: Ranking
  1F: Analytical Brief (what worked: hook approach, bridge technique, content value)

ROUND 2 (FINAL):
  2A: Analytical Brief distributed
  2B: 7 Re-generate incorporating learnings
  [Same 1B-1F flow → FINAL scoring]

AUDIENCE EVALUATION:
  Audience persona panel evaluates Round 2 (FINAL) emails for resonance

POST-ARENA (Layer 2.6):
  Synthesizer decomposes all 7 Round 2 (FINAL) emails → 2-3 phrase-level hybrids

HUMAN SELECTION (BLOCKING):
  7 pure Round 2 (FINAL) emails + 2-3 hybrids = 9-10 candidates
```

### Subject Line Arena (E2)

**Inherits from:** `~system/protocols/ARENA-CORE-PROTOCOL.md`

The E2 Arena produces high-volume candidates that are filtered by alignment and scored.

**Arena Flow per Email's SLs:**

```
ROUND 1:
  1A: 7 Competitors each generate 5 SL candidates (35 total)
  1B: Critic identifies weakest SL per competitor
  1C: Targeted revision (replace weakest SL)
  1D: Scoring against 7 SL-specific criteria
  1E: Top 10 ranking from 35 candidates
  1F: Analytical Brief

ROUND 2 (FINAL):
  2A: Analytical Brief + Top 10 from R1 distributed
  2B: 7 Generate FINAL 5 each (35 candidates)
  2C-2F: Same flow → FINAL Top 10

AUDIENCE EVALUATION:
  Audience persona panel evaluates Round 2 (FINAL) SLs for resonance

POST-ARENA:
  Synthesizer may create hybrid SLs (combining elements from different formulas)

HUMAN SELECTION:
  Top 10 + hybrids presented → Human selects primary + alternate
```

### Arena Context Management (Email-Specific)

Because E1 and E2 Arenas run PER EMAIL, context management is critical:

```
BETWEEN EMAILS (E1):
  - Previous email's Arena results: COMPRESS to winner + key learnings
  - Current email gets FULL context window
  - DO NOT carry all 7 competitors' full outputs from previous email

BETWEEN EMAILS (E2):
  - Previous email's SL results: COMPRESS to selected SLs only
  - Current email's SLs get FULL context window

SESSION MANAGEMENT:
  - For sequences > 5 emails: Plan session breaks
  - Emails 1-3 in Session 1, 4-7 in Session 2, etc.
  - Each session resumes from campaign-blueprint.yaml + completed email files
```

---

## CONTENT-TO-PITCH RATIO: DETAILED ENFORCEMENT

This is the single most important quality metric in email copy. It separates emails people want to read from emails people want to unsubscribe from.

### What Counts as Content

```
CONTENT includes:
  - Stories (personal, reader, historical, case study)
  - Educational material (explanations, principles, lessons)
  - Quotes (with riffs and commentary)
  - Questions (reader Q&A, rhetorical)
  - Lists of tips, insights, or surprising facts
  - Contrarian arguments and their supporting logic
  - Testimonial display (the testimonial itself)
  - Negative response display and demolition
  - ANY text that provides standalone value without the product
```

### What Counts as Pitch

```
PITCH includes:
  - Product mention by name
  - Feature descriptions
  - Benefit claims tied to the product
  - Price mentions
  - Guarantee mentions
  - Link/URL references
  - CTA sentences
  - Urgency language tied to the offer
  - "Get yours at [link]" type sentences
  - Bonus descriptions
  - Social proof tied to the product ("10,000 customers")
```

### The Bridge Zone

```
BRIDGE is the TRANSITION between content and pitch. It belongs to NEITHER category
for ratio calculation purposes — it's the seam.

Bridge characteristics:
  - 1-3 sentences maximum
  - Connects the content lesson to the product naturally
  - Should feel like a logical extension, not a gear-shift
  - Examples:
    "And that's the exact principle behind [Product]..."
    "Which is why, when I designed [Product], the first thing I..."
    "That [lesson] is baked into every [Product]..."
    "If that resonates, you'll appreciate what [Product] does..."

  Bridge DOES count toward pitch for ratio purposes
  (to prevent gaming the ratio with long bridge sections)
```

### Ratio by Campaign Function

| Function | Target Content % | Target Pitch % | Notes |
|----------|-----------------|----------------|-------|
| DR (Daily Relationship) | 80% | 20% | Soft pitch, link mention, done |
| DU (Deadline Urgency) | 70% | 30% | Same as DR but urgency language in pitch section |
| PL Early (Day 1-2) | 80% | 20% | Content-heavy, building engagement |
| PL Mid (Day 3-5) | 75% | 25% | Introducing product, building case |
| PL Late (Day 6+) | 70% | 30% | Maximum pitch intensity — still majority content |
| AL (Affiliate) | 75% | 25% | Personal recommendation framing |
| BP (Blatant Pitch) | 70% | 30% | Meta-awareness as content: "I'm going to pitch you hard today" |
| CP (Content/Podcast) | 95% | 5% | Almost no pitch — maybe a single link |
| AR (Autoresponder) | 80% | 20% | Consistent soft pitch across series |

**Even at MAXIMUM pitch intensity (30%), the email is still primarily content.** This is the principle. Emails are NOT sales letters. They are content vehicles with a pitch attached.

---

## SPECIMEN ARCHITECTURE

### System 1: Structural Specimens (Body-Type Indexed)

Location: `email/specimens/`

```
specimens/
  contrarian/          # CT body type specimens
  quote-opener/        # QO body type specimens
  testimonial/         # TM body type specimens
  qa-response/         # QA body type specimens
  list-based/          # LB body type specimens
  story/               # ST body type specimens
  negative-response/   # NR body type specimens
  subject-lines/       # SL formula specimens
  launch-sequence/     # Full launch sequence specimens (for E0 + E3)
```

**Target: 15-20 curated specimens per body type.** These are real emails from elite email marketers (Ben Settle primary, with additions from Matt Furey, Dan Kennedy, Andre Chaperon, and others).

**Specimen Requirements:**
- Full email text (not summaries, not excerpts)
- Body type classification verified
- Bridge phrase highlighted or annotated
- Content-to-pitch ratio calculated
- Source attribution

### System 2: Persona Voice Specimens (Inherited)

Location: `~system/persona-specimens/` (shared with main CopywritingEngine)

Same 101 specimen files across 6 personas. For email generation, specimen selection prioritizes conversational register:
- **Halbert's Boron Letters** are the closest analog to email voice (personal, one-to-one, conversational)
- **Bencivenga's Marketing Maxims** provide email-length content with implicit pitch
- **Ogilvy's body copy** provides credibility weaving at email scale

---

## SHARED LIBRARIES

### transition-phrase-library.md

Location: `email/shared/transition-phrase-library.md`

30+ bridge phrases organized by transition type:

```
PRINCIPLE-TO-PRODUCT:
  "And that's the exact principle behind..."
  "Which is why [Product] was designed to..."
  "That [lesson] is built into the DNA of..."
  "[Principle] is the foundation of everything [Product] does..."
  "If you've been nodding along, you'll understand why..."

STORY-TO-PRODUCT:
  "That experience is what led me to create..."
  "And that's when I realized [Product] needed to..."
  "The same thing happens when you use [Product]..."
  "[Character]'s story is exactly why..."
  "That shift? It's what [Product] gives you..."

PROBLEM-TO-SOLUTION:
  "Which is exactly the problem [Product] solves..."
  "And that's what makes [Product] different from everything else..."
  "If you're tired of [problem], here's the fix..."
  "That [problem] is why I spent [time] building..."
  "The good news? You don't have to keep [suffering]..."

CONTRARIAN-TO-PRODUCT:
  "Which is why [Product] does the opposite..."
  "That [conventional wisdom] is exactly what [Product] was built to fight..."
  "Instead of [conventional approach], [Product]..."
  "And that's the counterintuitive truth behind..."

TESTIMONIAL-TO-CTA:
  "If you want results like [Name]..."
  "[Name]'s story isn't unique. [N] others have..."
  "Ready to be the next [Name]?"

GENERAL:
  "Here's where it gets relevant to you..."
  "Now, I wouldn't bring this up if..."
  "And this is where [Product] enters the picture..."
  "So what does this mean for you?"
```

### cta-pattern-library.md

Location: `email/shared/cta-pattern-library.md`

5 CTA patterns (max 3 sentences each):

```
PATTERN 1: DIRECT LINK
  "[Product] does exactly this. Get it here: [link]"
  (1 sentence. Simple. For DR and CP functions.)

PATTERN 2: REASON + LINK
  "If [content lesson] resonated, [Product] is the implementation.
   Everything I just described is built in. Here: [link]"
  (2 sentences. Connects content to product. For DR and PL-early.)

PATTERN 3: SCARCITY + LINK
  "[N] spots left. Price goes up [deadline].
   If you've been considering it, now: [link]"
  (2 sentences. For DU and PL-late.)

PATTERN 4: BLATANT + LINK
  "I'm not going to be subtle. This is the best [category] product I've ever made.
   You should buy it. [link]"
  (2 sentences. Self-aware directness. For BP.)

PATTERN 5: CURIOSITY + LINK
  "I put together a page that explains the whole [mechanism/concept].
   Whether you buy or not, the information is worth reading: [link]"
  (2 sentences. Low-pressure. For AL and CP.)
```

### urgency-mechanism-library.md

Location: `email/shared/urgency-mechanism-library.md`

Deadline language patterns for DU and PL-late functions:

```
LEGITIMATE URGENCY MECHANISMS:
  - Cart close (specific date/time)
  - Enrollment window (cohort-based)
  - Limited inventory (physical products)
  - Price increase (specific date/amount)
  - Bonus expiration (specific bonus removed on date)
  - Early-bird pricing (first N buyers)

URGENCY LANGUAGE (natural, not hype):
  - "This closes [day] at midnight. No extensions."
  - "After [day], price goes from [X] to [Y]."
  - "[N] spots. When they're gone, enrollment closes until [date]."
  - "The [bonus] comes off the page [day]."
  - "I won't be offering this again at this price."

FORBIDDEN URGENCY:
  - Fake scarcity ("only 3 left" for digital products)
  - Perpetual countdown timers
  - "Buy now or regret it forever"
  - Urgency without specifics ("hurry", "limited time")
  - Urgency in autoresponder emails (time-specific = forbidden in AR)
```

### niche-adaptation-guide.md

Location: `email/shared/niche-adaptation-guide.md`

Tone calibration by vertical:

```
HEALTH/SUPPLEMENTS:
  - More educational, less confrontational
  - Compliance-aware: no "cure", "treat", "prevent" language
  - Mechanism detail is a feature, not a bug
  - Testimonials need disclaimers: "individual results may vary"
  - Subject lines can be more direct (audience actively seeking solutions)

GOLF/SPORTS:
  - More casual, buddy-to-buddy register
  - Performance-focused language
  - Story-heavy (golf stories are inherently entertaining)
  - Contrarian works well ("everything your pro told you is wrong")
  - Avoid guru language

FINANCE/TRADING:
  - More authoritative, less casual
  - Compliance-aware: no "guaranteed returns", "risk-free", "get rich"
  - Data-heavy content (numbers and specifics build credibility)
  - Fear/greed balance (don't lean too hard into either)
  - Contrarian is natural (markets reward contrarian thinking)

PERSONAL DEVELOPMENT:
  - Most conversational of all verticals
  - Story-dominant (transformation narratives)
  - Identity-focused language ("the kind of person who...")
  - Avoid preachy/guru tone
  - Vulnerability and confession work well

TECHNOLOGY:
  - Problem-solution framework dominates
  - Demo/proof-of-concept content
  - Less emotional, more rational
  - "Before/after" screenshots and data preferred
  - Shorter emails acceptable (tech audience = time-poor)
```

### email-quality-rubric.md

Location: `email/shared/email-quality-rubric.md`

Scoring criteria for all Email Engine outputs:

```
INDIVIDUAL EMAIL SCORE (10-point scale):
  Opening Hook (0-10):        Do the first 3 lines compel reading?
  Content Value (0-10):       Would reader feel rewarded even without clicking?
  Body Type Execution (0-10): Does it follow structural DNA of assigned type?
  Bridge Quality (0-10):      Natural, smooth, entertaining transition?
  CTA Strength (0-10):        Clear, specific, compelling within 3-sentence max?
  Voice Consistency (0-10):   One-to-one conversational throughout?
  Pitch Ratio (0-10):         70-80/20-30 range? (Auto-fail if >30% pitch)

  COMPOSITE = weighted average per Arena criteria weights

SUBJECT LINE SCORE (10-point scale):
  Curiosity Gap (0-10):       Information gap that must be closed?
  Emotional Trigger (0-10):   Activates emotion appropriate to niche?
  Body Match (0-10):          Accurately represents email content?
  Word Economy (0-10):        6-7 words ideal, every word earns its place?
  Open Rate Prediction (0-10): Estimated relative open rate?

  COMPOSITE = weighted average per E2 Arena criteria weights

CAMPAIGN SCORE (10-point scale):
  Sequence Coherence (0-10):  Narrative progression makes sense?
  Body Type Variety (0-10):   Structural variety across sequence?
  Pitch Escalation (0-10):    Launch sequences escalate properly?
  Voice Consistency (0-10):   Same "person" across all emails?
  SL Variety (0-10):          Formula variety across sequence?

  COMPOSITE = simple average

QUALITY THRESHOLDS:
  Individual email: >= 8.0 to pass
  Subject line set: >= 8.0 to pass
  Campaign overall: >= 8.0 to pass
  Voice consistency (any level): >= 7.0 (deal-breaker if below)
  Pitch ratio: Auto-fail if any email exceeds 30%
```

---

## CAMPAIGN TEMPLATES

### launch-sequence.md

Location: `email/templates/launch-sequence.md`

```
LAUNCH SEQUENCE TEMPLATE:
  Duration: 3-7 days
  Email Count: 5-17 (based on offer complexity and list warmth)

  STRUCTURE (7-email standard):
    Day 1 (1 email):  ST or CT — Story/Contrarian opener, 80/20 ratio
    Day 2 (1 email):  QO or QA — Teaching email, 80/20 ratio
    Day 3 (2 emails): LB + TM — List of benefits + Testimonial, 75/25 ratio
    Day 4 (2 emails): ST + NR — Story deepener + Objection handling, 75/25 ratio
    Day 5 (2 emails): CT + QA — Contrarian close + FAQ, 70/30 ratio
    Day 6 (3 emails): BP + TM + DU — Blatant pitch + Proof + Final deadline, 70/30 ratio
    Day 7 (7 emails): Cart close day — multiple urgency emails, 70/30 ratio

  ESCALATION PATTERN:
    Day 1: 1 email
    Day 2: 1 email
    Day 3: 2 emails
    Day 4: 2 emails
    Day 5: 2 emails
    Day 6: 3 emails
    Day 7: 6-7 emails (cart close day, spaced throughout day)

  RULES:
    - Product NOT mentioned by name until Day 2 minimum
    - First email is PURE content with soft bridge
    - Escalation in both email count AND pitch intensity
    - Final day = "event" (multiple emails create urgency through volume)
    - Post-close email (Day 8): "Cart closed" + recap + waitlist
```

### autoresponder-series.md

Location: `email/templates/autoresponder-series.md`

```
AUTORESPONDER TEMPLATE:
  Duration: Evergreen (no time-specific references ANYWHERE)
  Email Count: 14-30

  STRUCTURE:
    Emails 1-3:   Welcome + value delivery + soft positioning
    Emails 4-7:   Mixed body types, educational focus, 80/20 ratio
    Emails 8-14:  Deeper content, case studies, mechanism education
    Emails 15-21: Advanced topics, community stories, proof-heavy
    Emails 22-30: Continued value, varied angles, consistent soft pitch

  RULES:
    - ZERO time-specific references ("last week", "tomorrow", "today")
    - ZERO seasonal references ("this holiday season", "as summer approaches")
    - ZERO news references ("with what's happening in the world")
    - Every email fully standalone (no required reading order beyond email 1-3)
    - All 7 body types used, distributed evenly
    - Consistent 80/20 ratio throughout (no escalation — evergreen = steady state)
    - Can be entered at any point (subscriber joins, starts at email 1)
    - Email 1 is ALWAYS welcome/value (not a pitch)
```

### daily-relationship.md

Location: `email/templates/daily-relationship.md`

```
DAILY RELATIONSHIP TEMPLATE:
  Duration: Ongoing (indefinite)
  Frequency: Daily or near-daily

  STRUCTURE:
    No fixed sequence — each email is standalone
    Body types rotate naturally (minimum 4 of 7 types per week)
    80/20 ratio default

  RULES:
    - Each email must provide standalone value
    - Soft pitch only — link + 1-2 sentences
    - Personality and voice are the primary retention mechanism
    - Reader should WANT to open every day
    - No "mini sales letters" disguised as daily emails
    - Variety in body type is what keeps it interesting
    - Can reference current events (these are NOT evergreen)
```

### affiliate-promotion.md

Location: `email/templates/affiliate-promotion.md`

```
AFFILIATE PROMOTION TEMPLATE:
  Duration: 3-5 days
  Email Count: 3-7

  STRUCTURE (5-email standard):
    Email 1: ST — Personal story of discovering/using the product, 80/20 ratio
    Email 2: QO or CT — Why this product stands out, 75/25 ratio
    Email 3: TM or QA — Social proof or reader question about it, 75/25 ratio
    Email 4: LB — Specific benefits list, 70/30 ratio
    Email 5: DU — Deadline/special offer, 70/30 ratio

  RULES:
    - Frame as PERSONAL RECOMMENDATION, not internal product
    - "I reached out to [creator] and got a special deal for my readers"
    - Must genuinely believe in the product (or don't promote it)
    - Disclosure: Mention affiliate relationship naturally, not with legal boilerplate
    - DO NOT use the same language as the product creator's own emails
    - Add personal angle/experience that the creator can't provide
```

### content-series.md

Location: `email/templates/content-series.md`

```
CONTENT SERIES TEMPLATE:
  Duration: 3-7 days
  Email Count: 3-7
  Function: CP (Content/Podcast promotion)

  STRUCTURE:
    Each email promotes one piece of content (blog post, podcast, video)
    95/5 ratio — almost no pitch, just value + content link

  RULES:
    - The email IS NOT a summary of the content — it's a TEASE
    - Give enough to hook, not enough to satisfy
    - Each email can stand alone as valuable even without clicking
    - Mix body types: ST for storytelling content, LB for listicle content, etc.
    - CTA is simply the content link (no product pitch)
```

### one-off-promotional.md

Location: `email/templates/one-off-promotional.md`

```
ONE-OFF PROMOTIONAL TEMPLATE:
  Duration: Single email
  Function: BP (Blatant Pitch)

  STRUCTURE:
    One email, transparent pitch, self-aware tone
    Body type: Usually CT or ST
    70/30 ratio (maximum pitch intensity, still majority content)

  RULES:
    - Self-awareness IS the entertainment: "I'm going to sell you something today"
    - Content section builds genuine case, not just hype
    - Bridge is explicit: "OK, here's the pitch..."
    - CTA is direct and unapologetic
    - Used sparingly (max 1 per month in DR cadence)
```

---

## OUTPUT PATH CONVENTION

All Email Engine outputs go OUTSIDE the skill folders, following the CopywritingEngine convention:

```
./
  outputs/
    [project-name]/
      email-campaign/
        E0-strategist/
          campaign-blueprint.yaml
          execution-log.md
          STRATEGIST-SUMMARY.md
        emails/
          email-01-[body-type].md
          email-02-[body-type].md
          ...
        subject-lines/
          sl-email-01.md
          sl-email-02.md
          ...
        E3-assembly/
          CAMPAIGN-PACKAGE.md
          assembly-log.md
        E4-editorial/
          EDITORIAL-AUDIT.md
          REVISED-CAMPAIGN-PACKAGE.md
          editorial-log.md
        arena/
          E1-arena-email-01.md
          E1-arena-email-02.md
          E2-arena-email-01.md
          ...
        checkpoints/
          E0_COMPLETE.yaml
          E1_EMAIL_01_COMPLETE.yaml
          E1_EMAIL_02_COMPLETE.yaml
          ...
          E2_EMAIL_01_COMPLETE.yaml
          ...
          E3_COMPLETE.yaml
          E4_COMPLETE.yaml
        PROJECT-STATE.md
        PROGRESS-LOG.md
```

---

## MANDATORY OUTPUT PROTOCOL (ALL EMAIL SKILLS)

**Every Email Engine skill produces THREE outputs:**

| Output Type | Format | Purpose |
|-------------|--------|---------|
| **Primary Output** | YAML/MD (per skill) | Structured data for downstream skills |
| **Summary Handoff** | Markdown | Human-readable review document |
| **Execution Log** | Markdown | Verification that all microskills ran |

### Output Verification Checklist

Before claiming ANY email skill is complete:

```
[ ] Primary output file EXISTS in project email-campaign folder
[ ] Primary output contains ALL required schema sections
[ ] Summary markdown file EXISTS
[ ] Execution log EXISTS showing ALL microskills checked
[ ] All specimens were loaded (logged in execution log)
[ ] Content-to-pitch ratio verified for every email
[ ] Body type compliance verified for every email
```

**IF ANY CHECKBOX IS UNCHECKED → SKILL IS NOT COMPLETE**

---

## MC-CHECK PROTOCOL (Email-Specific Enhancements)

Inherits full MC-CHECK from `~system/SYSTEM-CORE.md`. Adds email-specific checks:

### EMAIL-MC-CHECK (Every email generation)

```yaml
EMAIL-MC-CHECK:
  trigger: "[email_generation | sl_generation | assembly | editorial]"

  specimen_verification:
    system_1_loaded: "[Y/N] — body type specimens"
    system_2_loaded: "[Y/N] — persona voice specimens"
    bridge_loaded: "[Y/N] — transition phrase library"
    if_any_no: "HALT — load specimens before generation"

  ratio_check:
    content_percentage: "[X]%"
    pitch_percentage: "[Y]%"
    if_pitch_above_30: "HALT — reduce pitch section"

  body_type_check:
    assigned_type: "[code]"
    structural_elements_present: "[Y/N]"
    previous_email_type: "[code]"
    consecutive_duplicate: "[Y/N]"
    if_duplicate: "HALT — reassign body type per E0 blueprint"

  voice_check:
    conversational_register: "[Y/N]"
    one_to_one_tone: "[Y/N]"
    copywriter_voice_detected: "[Y/N]"
    if_copywriter_detected: "SLOW_DOWN — re-read voice specimens, revise"

  sl_alignment_check:
    sl_generated_from_finished_email: "[Y/N]"
    sl_matches_email_content: "[Y/N]"
    if_any_no: "HALT — E2 reads finished emails only"

  result: "[PROCEED | PAUSE | HALT]"
```

### EMAIL-MC-CHECK-LITE (Between Arena rounds)

```
EMAIL-MC-CHECK-LITE:
- Ratio: [X/Y] — In range? [Y/N]
- Body type: Correct structural elements? [Y/N]
- Voice: Conversational register? [Y/N]
- Bridge: Present and smooth? [Y/N]
- Action: [PROCEED | SLOW_DOWN | STOP]
```

---

## MODEL ASSIGNMENT TABLE (Binding)

| Phase | Model | Rationale |
|-------|-------|-----------|
| **E0 Layer 0** (infrastructure) | haiku | Mechanical loading and mode detection |
| **E0 Layers 1-2** (analysis + design) | opus | Strategic campaign design requires deep analysis |
| **E0 Layer 3** (output packaging) | sonnet | Structured output assembly |
| **E1 Layer 0** (infrastructure) | haiku | Specimen loading, blueprint reading |
| **E1 Layer 1** (classification) | sonnet | Template selection and planning |
| **E1 Layer 2 (Arena)** | opus | ALL generation and competition |
| **E1 Layer 3** (validation) | sonnet | Ratio verification, compliance checks |
| **E2 Layer 0** (infrastructure) | haiku | Email body loading, specimen loading |
| **E2 Layer 1** (analysis) | opus | Content extraction and formula matching |
| **E2 Layer 2 (Arena)** | opus | ALL SL generation and competition |
| **E2 Layer 3** (validation) | sonnet | Alignment checks, ranking |
| **E3 Layers 0-1** (loading + assembly) | sonnet | Assembly is mechanical, not generative |
| **E3 Layer 2** (quality audit) | opus | Cross-sequence analysis requires depth |
| **E3 Layer 3** (output) | sonnet | Package formatting |
| **E4 Layer 0** (infrastructure) | haiku | Loading campaign package |
| **E4 Layers 1-3** (audit + revision) | opus | All editorial analysis and Arena revision |
| **E4 Layer 4** (output) | sonnet | Final package formatting |

---

## FORBIDDEN BEHAVIORS (Email Engine — Complete List)

### Generation Violations
1. Generating email body and subject line in the same pass
2. Same body type twice in a row in any sequence
3. Content-to-pitch ratio below 70/30 (pitch exceeding 30%)
4. Bridge phrases not loaded from transition-phrase-library.md before generation
5. CTA longer than 3 sentences
6. Paragraphs longer than 3 sentences
7. Generating without type-matched structural specimens loaded
8. Launch sequences without escalation pattern
9. Subject lines that don't match email body content
10. Autoresponder emails that contain time-specific references

### Structural Violations
11. Skipping E0 (starting at E1 without campaign blueprint)
12. Running E2 before E1 is complete for that email
13. Running E3 before all E1 + E2 outputs exist
14. Running fewer than 2 Arena rounds + audience evaluation for E1 or E2
15. Skipping any of the 7 Arena competitors
16. Proceeding without human selection after Arena
17. Skipping E4 editorial review

### Voice Violations
18. Using "copywriter" voice instead of conversational register
19. Using one-to-many broadcast tone instead of one-to-one
20. Using long-form copy openers in emails ("Imagine if you could...", "Picture this...")
21. Personality inconsistency across sequence (different "person" writing each email)
22. Violating Soul.md anti-voice patterns
23. Using "Dear [Name]" or formal salutation

### Quality Violations
24. Claiming skill completion without all output files
25. Holding outputs in conversation context without writing to files
26. Skipping content-to-pitch ratio verification
27. Skipping SL-body alignment check
28. Creating checkpoint YAML without verifying all microskill outputs
29. Execution log entries without specimen-loading confirmation
30. Combining multiple email outputs into a single file

### Rationalization Violations (IMMEDIATE HALT)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The pitch is only slightly over 30%" | 30% is a HARD ceiling. Numbers are exact. |
| "The body type is close enough to the assignment" | Body types are structural DNA. Close enough = wrong type. |
| "Subject lines can be generated alongside the email" | Law 2 exists because SL/body mismatch is the #1 SL failure mode. |
| "This email doesn't need a bridge" | Every email has a bridge. No exceptions. |
| "The sequence doesn't need all 7 body types" | Variety is structural, not optional (Law 4). |
| "One Arena round produced great results" | 2 rounds + audience evaluation mandatory. Round 1 = baseline, not peak. |
| "The autoresponder can mention 'this week' loosely" | ZERO time references in AR. Absolute zero. |

---

## ANTI-SLOP ENFORCEMENT (Email-Specific)

Inherits the full anti-slop list from `~system/SYSTEM-CORE.md`. Adds email-specific patterns:

### Email-Specific Poison Words

| Category | Words to NEVER Use in Emails |
|----------|---------------------------|
| **Long-form Copy Intrusions** | imagine if you could, picture this, what if I told you, let me paint a picture, close your eyes and, in a world where |
| **Broadcast Voice** | dear valued subscriber, I wanted to reach out, I hope this email finds you, as always, we appreciate your loyalty, thank you for being part of our community |
| **AI Email Telltales** | exciting update, thrilled to announce, delighted to share, I'm passionate about, on this incredible journey, let's dive in, without further ado |
| **Fake Casual** | hey there friend, just wanted to drop a quick note, thought you might enjoy, hope you're having an amazing day, just between us |
| **Hype Language** | mind-blowing, life-changing, earth-shattering, jaw-dropping, once-in-a-lifetime, never-before-seen |

### Email Voice Register

The correct register for email is: **casual authority.** Think smart friend writing to smart friend, not salesman writing to prospect, not corporation writing to customer, not guru writing to disciple.

```
WRONG: "Dear Valued Reader, I'm thrilled to share an exciting update about our revolutionary product..."
WRONG: "What if I told you there was a hidden secret that could transform your entire life?"
WRONG: "Hey friend! Hope you're having an AMAZING day! Quick question for you..."

RIGHT: "Got an interesting email yesterday from a reader who..."
RIGHT: "There's a study from Stanford that nobody in this industry talks about."
RIGHT: "I was wrong about something. Here's what happened."
```

---

## SESSION MANAGEMENT

### Email Campaign Session Planning

Email campaigns involve multiple Arena runs. Plan sessions accordingly:

```
SESSION PLANNING:
  E0 (Strategist): 1 session (lightweight, no Arena)

  E1 (Writer):
    - Emails per session: 2-3 (each email = full 2-round + audience evaluation Arena)
    - 7-email launch: 3 sessions minimum
    - 14-email autoresponder: 5-7 sessions minimum

  E2 (Subject Lines):
    - Can batch: 3-5 emails' SLs per session
    - Each SL Arena is lighter than E1 Arena (5 SLs per competitor vs full email)

  E3 (Assembler): 1 session (no Arena, assembly only)

  E4 (Editorial): 1-2 sessions (depends on issue count)
```

### Session Handoff for Email Campaigns

```
# Email Campaign Session Handoff
Generated: [timestamp]

## Resume Instructions
1. Read campaign-blueprint.yaml
2. Check completed email output files
3. Check completed SL output files
4. Resume at next unwritten email

## Campaign Position
- Campaign: [name]
- Mode: [A/B]
- Total Emails: [N]
- Emails Written (E1): [list by number]
- SLs Generated (E2): [list by number]
- Next Email to Write: [N]

## Key Decisions
- Arena selections made: [list]
- Human feedback received: [summary]
- Soul.md constraints active: [Y/N]

## Do Not Re-Execute
- [list completed files with paths]
```

---

## CONTEXT LOAD MANAGEMENT (Email-Specific)

Email Arena runs are context-intensive. Monitor closely:

```
CONTEXT ZONES:
  GREEN (0-50%):   Normal E1/E2 Arena execution
  YELLOW (50-75%): Complete current email's Arena, compress, plan break
  RED (75-90%):    Finish current Arena round ONLY, generate handoff
  CRITICAL (>90%): HALT mid-round, save state, mandatory session break

COMPRESSION BETWEEN EMAILS:
  After completing an email's full Arena + selection:
    KEEP: Selected email text, Arena winner info, key learnings
    COMPRESS: All 7 competitor outputs → winner name + score only
    DROP: Intermediate round outputs, critique details, non-winner full texts

  This compression is MANDATORY between emails to preserve context for the next Arena run.
```

---

## INTEGRATION WITH MAIN COPYWRITINGENGINE

### When to Use Email Engine vs Main Pipeline

```
MAIN PIPELINE (Skills 01-20):
  Use for sales pages, VSLs, long-form promos, product description pages,
  campaign briefs, and any long-form direct response asset.

EMAIL ENGINE (E0-E4):
  Use for email campaigns — launch sequences, autoresponders, daily emails,
  affiliate promotions, content series, and any email-based communication.

COMBINED WORKFLOW:
  Skills 01-09 → Campaign Brief → BOTH Sales Page (Skills 10-20) AND Email Campaign (E0-E4)
  This is the most common production workflow: research and strategy feed both channels.
```

### Shared Quality Standards

The Email Engine maintains the same quality standards as the main CopywritingEngine:

- Gates are PASS or FAIL (no conditional pass, no partial pass)
- 2-round + audience evaluation Arena, no exceptions
- Every microskill produces its own file
- MC-CHECK at every layer entry and gate
- Write to files immediately (conversation context is ephemeral)
- Numbers are exact (70% means 70%, not "approximately 70%")

---

## LEARNING CAPTURE (Email-Specific)

### Email Taste Capture

After every human edit session on email outputs:

```
CAPTURE:
  1. COMPARE original email with the human reviewer's revised version
  2. For EACH change:
     a. Record before/after text VERBATIM
     b. Classify: bridge_quality | opening_hook | pitch_ratio | voice_register | word_choice | removal
     c. Assess generalizability (cross-project vs project-specific)
  3. WRITE to [project]/email-campaign/TASTE-EDITS.yaml
  4. LOG to learning-log/email-learning.json
```

### Email-Specific Learning Dimensions

| Dimension | What to Capture |
|-----------|----------------|
| **Bridge Preferences** | Which bridge phrases the human reviewer keeps vs rewrites. Which transitions feel natural to them. |
| **Opening Preferences** | First-line patterns they favor. How they start CT vs ST vs QO emails. |
| **Pitch Language** | How they phrase CTAs. Link presentation style. Urgency tone. |
| **Voice Calibration** | Register adjustments (too formal → more casual, too casual → more authority). |
| **Ratio Adjustments** | Do they tend to cut pitch or add content? Where do they draw the line? |
| **SL Preferences** | Which SL formulas they select most often. Word count preferences. |

---

### SSR Pre-Screen Validation

After E4 (Editorial) completes, SSR pre-screening runs per `~system/protocols/SSR-PRESCREEN-PROTOCOL.md`. A synthetic consumer panel (75-100 personas) evaluates the final output and produces a GO / REVISE / KILL recommendation with segment-stratified diagnostics. The SSR report is included in the output package. Trigger microskill: `E4-email-editorial/skills/layer-3/3.3-ssr-prescreen-trigger.md`

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-03-20 | Added SSR pre-screen validation reference (E4 (Editorial) terminal gate) |
| 1.0 | 2026-02-21 | Initial creation — full Email Engine architecture. 5 skills (E0-E4), two operating modes, 7 body types, 18 SL formulas, Arena integration, specimen architecture, shared libraries, campaign templates, forbidden behaviors, anti-slop enforcement, session management, MC-CHECK enhancements, model assignment table, learning capture protocol. |

---

## APPENDIX: QUICK REFERENCE CARD

```
THE 5 LAWS:
  1. Load specimens before generating (body type + voice + bridge)
  2. Subject lines AFTER email body (E2 after E1)
  3. 70-80% content / 20-30% pitch (sacred ratio)
  4. Never same body type twice in a row (variety is structural)
  5. The bridge is everything (transition = highest skill moment)

BODY TYPES:  CT | QO | TM | QA | LB | ST | NR
FUNCTIONS:   DR | DU | PL | AL | BP | CP | AR
SL FORMULAS: 18 categories (top 3: SL-THE, SL-HOW, SL-WHY)

PIPELINE: E0 → E1 (per email) → E2 (per email) → E3 → E4

ARENA: 7 competitors, 2 rounds + audience evaluation, per email (E1) and per SL set (E2)

QUALITY: >= 8.0 overall, >= 7.0 voice, auto-fail if pitch > 30%

MODES: A (downstream from CE 01-09) or B (standalone from brief)
```
