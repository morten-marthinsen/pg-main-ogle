---
name: email-sequence-assembler
description: >-
  Assemble individually generated emails and selected subject lines into a complete,
  sequenced email campaign with timing, cross-email callbacks, P.S. strategy, and
  campaign-level validation. Use after E1 has written all emails and E2 has generated
  subject lines. Takes discrete pieces and builds the cohesive whole — placing emails
  in blueprint-specified order, matching subject lines, setting send timing, verifying
  body type variety, and adding cross-email narrative threading. Trigger when users
  mention assembling emails, building the sequence, campaign assembly, email sequencing,
  or compiling the campaign. Requires E0 blueprint, E1 drafts, and E2 subject lines.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [CAMPAIGN-LEVEL QUALITY CRITERIA (C1-C5)](#campaign-level-quality-criteria-c1-c5)
- [TIMING TEMPLATES BY CAMPAIGN TYPE](#timing-templates-by-campaign-type)
- [P.S. STRATEGY RULES](#ps-strategy-rules)
- [CROSS-EMAIL CONNECTOR RULES](#cross-email-connector-rules)
- [OUTPUT SCHEMA](#output-schema)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [VERSION HISTORY](#version-history)

---

# SEQUENCE-ASSEMBLER-AGENT.md

> **Version:** 1.2
> **Skill:** E3-email-sequence-assembler
> **Position:** Post-Writer (E1) + Post-Subject-Lines (E2), Pre-Editorial (E4)
> **Type:** Assembly Orchestrator (State Machine)
> **Dependencies:** E0 campaign-blueprint.yaml, E1 individual email drafts, E2 selected subject lines
> **Output:** `assembled-sequence.yaml` + `SEQUENCE-SUMMARY.md`

---

## PURPOSE

Assemble individually generated emails (E1) and selected subject lines (E2) into a complete, sequenced email campaign — with timing, cross-email callbacks, P.S. strategy, and campaign-level validation. This skill takes discrete pieces and builds the cohesive whole.

**Success Criteria:**
- All individual emails loaded and placed in blueprint-specified order
- All selected subject lines matched to their corresponding emails
- Send timing and frequency set based on campaign type
- Body type variety verified across sequence
- Urgency/emotional escalation mapped and validated
- Cross-email callbacks added where continuity benefits the sequence
- P.S. lines added strategically (max 60% of emails)
- Campaign-level quality criteria (C1-C5) validated
- Complete assembled sequence packaged for E4 editorial

This agent is an **assembly orchestrator**. It does NOT generate email body text or subject lines. It compiles, connects, and validates what E1 and E2 already produced.

---

## IDENTITY

**This skill IS:**
- The sequence compiler
- The timing planner
- The variety verifier
- The cross-email connector
- The P.S. strategist
- The campaign-level validator

**This skill is NOT:**
- An email writer (that is E1)
- A subject line generator (that is E2)
- A copy editor (that is E4)
- A campaign architect (that is E0)

**Upstream:** Receives individual email drafts from E1, selected subject lines from E2, campaign blueprint from E0
**Downstream:** Feeds `assembled-sequence.yaml` + `SEQUENCE-SUMMARY.md` to E4 (editorial)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Load email drafts, subject lines, blueprint | haiku | Input loading, no reasoning needed |
| 1 | Timing planning, variety check, escalation mapping | sonnet | Analytical — structural logic, not deep reasoning |
| 2 | Sequence compilation, connector writing, P.S. strategy | sonnet | Assembly + light generation (connectors/P.S. only) |
| 3 | Validation + output packaging | sonnet | Mechanical validation + assembly |

**Note:** Opus is NOT needed for E3. This is assembly work, not generation. Sonnet handles all analytical and light-generation layers.

---

## STATE MACHINE

```
IDLE → LOADING → LOGIC → ASSEMBLY → VALIDATION → COMPLETE
       │          │        │            │
       ▼          ▼        ▼            ▼
    [GATE_0]   [GATE_1]  [GATE_2]    [GATE_3]
    PASS/FAIL  PASS/FAIL PASS/FAIL   PASS/FAIL
```

**No human approval gate.** E3 is assembly — the creative decisions were made in E0 (blueprint), E1 (drafts), and E2 (subject lines). E4 handles editorial review. E3 compiles and validates.

---

## LAYER ARCHITECTURE

### Layer 0: Loading

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - ALL email drafts + ALL subject lines + blueprint must be loaded — any missing piece is a HALT
> - NEVER modify body text from writer output — E3 is assembly, not generation

**Purpose:** Load ALL inputs needed for assembly — every individual email draft from E1, every selected subject line from E2, and the campaign blueprint from E0. Validate that all pieces are present before assembly begins.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-email-draft-loader.md` | Load ALL individual email drafts from E1 output |
| 0.2 | `0.2-subject-line-loader.md` | Load ALL selected subject lines from E2 output |
| 0.3 | `0.3-blueprint-loader.md` | Load campaign blueprint from E0 (sequence order, body types, emotional arc) |

**Execution Order:**
1. 0.1, 0.2, 0.3 can run in parallel (independent loads)
2. After all three load, validate completeness

**Gate 0:** All email drafts loaded (count matches blueprint total_emails), all subject lines loaded (1 per email minimum), blueprint loaded with sequence order and body type assignments. FAIL = any email draft missing OR any subject line missing OR blueprint not loaded.

---

### Layer 1: Sequence Logic

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Variety rules are VERIFIED, not enforced — if violation detected, HALT and flag (do not silently reassign)
> - NEVER reorder emails or reassign body types — blueprint sequence order is authoritative

**Purpose:** Apply sequencing logic — set the send schedule, verify body type variety, and map urgency/emotional escalation across the assembled sequence.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-timing-planner.md` | Set send schedule + frequency based on campaign type |
| 1.2 | `1.2-variety-checker.md` | Verify no same body type back-to-back, 3+ types per 5-email window |
| 1.3 | `1.3-escalation-mapper.md` | Map urgency/emotional escalation across sequence |

**Execution Order:**
1. 1.1 first (timing drives everything)
2. 1.2, 1.3 in parallel after 1.1 (both use the timed sequence)

**Gate 1:** Timing plan complete for all emails. Variety check passes (no consecutive same type, 3+ types per 5-email window). Escalation map complete with urgency levels assigned per email. FAIL = timing incomplete OR variety violation detected OR escalation map missing.

**IMPORTANT:** Variety rules are VERIFIED, not enforced. E0 already assigned body types. If a violation is detected here, it means E0's blueprint had an error — HALT and flag, do not silently reassign.

---

### Layer 2: Assembly

> **Critical Constraints Reminder (Layer 2)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - NEVER modify body text from writer output — only add connectors and P.S. lines
> - P.S. frequency capped at 60% of emails; P.S. never in first email

**Purpose:** Compile the actual sequence — attach subject lines to emails in blueprint order, write cross-email callbacks where needed, and add P.S. lines strategically.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-sequence-compiler.md` | Compile emails in blueprint order with SLs attached |
| 2.2 | `2.2-connector-writer.md` | Write cross-email callbacks/continuity references where needed |
| 2.3 | `2.3-ps-strategy.md` | Add P.S. lines, bonus mentions, cross-sell references (60% frequency cap) |

**Execution Order:**
1. 2.1 first (compile the base sequence)
2. 2.2 after 2.1 (connectors reference the compiled sequence)
3. 2.3 after 2.2 (P.S. strategy considers connectors already added)

**Gate 2:** All emails compiled in order with subject lines attached. Cross-email connectors written where beneficial (minimum 2 for sequences of 5+). P.S. lines added to no more than 60% of emails. No email body text modified beyond connector insertions and P.S. additions. FAIL = emails out of order OR subject lines mismatched OR body text modified beyond connectors/P.S. OR P.S. frequency exceeds 60%.

---

### Layer 3: Validation + Output

> **Critical Constraints Reminder (Layer 3)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Campaign-level criteria C1-C5 ALL must pass — any single failure is a gate FAIL
> - Output must include complete email text in assembled YAML — not file references

**Purpose:** Validate the complete assembled sequence against campaign-level quality criteria (C1-C5 from email-quality-rubric.md) and package for E4 editorial.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-sequence-validator.md` | Validate complete sequence against campaign-level quality criteria (C1-C5) |
| 3.2 | `3.2-output-packager.md` | Package final sequence for E4 editorial and human review |

**Execution Order:**
1. 3.1 first (validation)
2. 3.2 after 3.1 (packaging)

**Gate 3:** All 5 campaign-level criteria validated. assembled-sequence.yaml created with correct schema. SEQUENCE-SUMMARY.md created with all required sections. FAIL = any C1-C5 criterion fails OR output files missing OR schema invalid.

---

## CAMPAIGN-LEVEL QUALITY CRITERIA (C1-C5)

These come from email-quality-rubric.md and apply to the SEQUENCE, not individual emails:

### C1. Body Type Variety
No same type twice in a row. In any 5-email window, at least 3 different body types.

### C2. Emotional Arc
Sequence has clear emotional progression (trust → education → desire → urgency).

### C3. Cross-Email Continuity (Scheherazade Principle)
Later emails reference earlier content AND plant hooks for the next email. Every email should both resolve something from before AND open a loop for what comes next. The reader should feel that stopping the sequence means missing something specific.

**Scheherazade Test:** For emails 1 through N-1, does each email plant at least one forward hook (curiosity, tease, unresolved question, promised reveal) that the next email can reference? For emails 2 through N, does each email callback to something specific from an earlier email?

**Forward Hook Types:**
- **Curiosity Tease:** "Tomorrow I'll show you the part nobody talks about..."
- **Promised Reveal:** "I'll share the exact numbers in my next email."
- **Unresolved Question:** End with a question the next email answers.
- **Cliffhanger:** "But that's only half the story..."
- **P.S. Tease:** "P.S. Tomorrow I'm going to share something about [specific thing]..."

**Pass Condition:** In any sequence of 5+ emails, at least 60% of emails (excluding the final email) contain a forward hook. 100% of emails after the first contain at least one backward reference (callback or connector).

### C4. Urgency Escalation
Launch sequences show clear escalation from no urgency to maximum urgency.

### C5. Subject Line Diversity
Subject lines use at least 3 different formula categories across the sequence.

---

## TIMING TEMPLATES BY CAMPAIGN TYPE

### Product Launch (PL)
```
Day -1: 1 email (pre-launch warning)
Day 1:  1-2 emails (launch)
Day 2:  2 emails
Day 3:  2 emails
Day 4:  2-3 emails
Day 5:  5-8 emails (close day blitz)
```

### Affiliate Launch (AL)
```
Day 1: 1 email (introduction)
Day 2: 1 email (proof/education)
Day 3: 1-2 emails (objections + push)
Day 4: 1-2 emails (urgency)
Day 5: 1-2 emails (last call)
```

### Autoresponder (AR)
```
Day 1: 1 email (welcome)
Day 2: 1 email
Day 3: 1 email
Day 4-7: 1 email/day
Day 8-14: 1 email/day
Day 15-30: 1 email/day (evergreen — no date references)
```

### Daily Relationship (DR)
```
Every day: 1 email
No volume escalation
Ongoing — no end date
```

### Content Series (CP)
```
Day 1: 1 email
Day 2: 1 email
Day 3: 1 email
Day 4: 1 email
Day 5-7: 1 email/day
All content-forward (70%+ content per email)
```

### Blatant Pitch (BP)
```
Day 1: 1 email
Single email — no sequence logic needed
```

### Deadline Urgency (DU)
```
Day 1: 1 email
Single email — no sequence logic needed
```

### Welcome Series (WS)
```
Day 0: 1 email (immediate — deliver lead magnet/discount)
Day 1: Auto-resend Email 1 to non-openers (different SL, same content)
Day 1-2: 1 email (brand story / differentiation)
Day 3-5: 1 email (social proof + product recommendations)
Day 6-7: 1 email (community + final discount reminder)
```

### Cart Abandonment (CA)
```
Hour 1-2: 1 email (cart reminder + value recap)
Day 1: 1 email (social proof for carted products)
Day 2-3: 1 email (objection killer + incentive)
Note: Shorter emails (150-300w). Up to 30% pitch acceptable.
```

### Post-Purchase (PP)
```
Day 0-1: 1 email (welcome + next steps)
Day 3-5: 1 email (usage tips / getting started)
Day 7-10: 1 email (FAQ + community)
Day 12-14: 1 email (optional — review request + cross-sell)
Note: 0-15% pitch max. This is NOT a sales sequence.
```

### Winback (WB)
```
Day 1: 1 email (genuine check-in)
Day 4-7: 1 email (what they've missed + incentive)
Day 10-14: 1 email (final re-engagement or respectful goodbye)
Note: If no engagement after 3 emails → SUPPRESS subscriber.
```

---

## P.S. STRATEGY RULES

### Frequency Cap
- **Maximum 60% of emails** in a sequence can have P.S. lines
- For a 10-email sequence: max 6 emails with P.S.
- For a 5-email sequence: max 3 emails with P.S.

### P.S. Content Types (Select Per Email)
1. **Bonus Mention** — "P.S. I almost forgot — when you grab [product] today, you also get [bonus]..."
2. **Urgency Reminder** — "P.S. This [deadline/offer] expires [when]. After that, [consequence]."
3. **Testimonial Snippet** — "P.S. [Name] just told me: '[short quote]'..."
4. **Cross-Sell/Upsell** — "P.S. If you already have [X], you should know about [Y]..."
5. **Curiosity Tease** — "P.S. Tomorrow I'm going to share something about [teaser]..."

### P.S. Placement Priority
1. **Always include in:** Last 2 emails of launch/affiliate sequences (urgency P.S.)
2. **Never include in:** First email of any sequence (let the email stand alone)
3. **Prioritize for:** Emails with soft CTAs (P.S. gives second CTA opportunity)
4. **Avoid in:** NR (Negative Response) body type emails (tone clash)

---

## CROSS-EMAIL CONNECTOR RULES

### When to Add Connectors
- When email N+1 continues a story started in email N
- When email references proof/data mentioned in an earlier email
- When urgency escalates (connector acknowledges previous mention)
- When body type changes from content-heavy to pitch-heavy (smooth the transition)

### Connector Types
1. **Direct Callback** — "Yesterday I mentioned [specific thing]. Today I want to show you..."
2. **Story Continuation** — "Remember the story about [character/situation]? Well, there's more..."
3. **Proof Stacking** — "I shared [study/testimonial] last time. Here's another one that..."
4. **Urgency Escalation** — "I mentioned [deadline] a couple days ago. Now we're down to..."
5. **Anticipation Fulfillment** — "I promised I'd share [thing] — and here it is..."

### Connector Placement
- Connectors go at the OPENING of the receiving email (first 1-3 lines)
- Connectors are 1-2 sentences maximum
- Connectors MUST reference actual content from the cited email (not vague allusions)

### Forward Hooks (Scheherazade Technique)

Forward hooks are the INVERSE of connectors — instead of referencing the past, they tease the future. Every email (except the last in a sequence) should plant at least one forward hook to pull the reader into the next email.

**Placement:** Forward hooks go in the final 1-3 lines of the email, AFTER the CTA. They can also go in a P.S. line (using P.S. type "curiosity_tease").

**Rules:**
1. Forward hooks must tease SPECIFIC content — not vague "more tomorrow"
2. The next email MUST deliver on the tease (broken promises = trust damage)
3. Forward hooks should match the NEXT email's body type (tease a story if next email is ST, tease a contrarian take if next is CT)
4. In launch sequences, forward hooks escalate urgency alongside content teases

**Examples:**
- Before ST email: "Tomorrow I'll tell you about the guy who made $42K from a single email."
- Before CT email: "Next time, I'm going to say something that might make you uncomfortable."
- Before TM email: "Wait till you hear what happened to Sarah after she tried this for 30 days."
- Before LB email: "I've been compiling a list. Tomorrow I'll share it."

### Where Connectors Are NOT Needed
- Between unrelated daily relationship emails
- Between content series emails that stand alone
- When the blueprint explicitly marks emails as independent

---

## OUTPUT SCHEMA

```yaml
assembled_sequence:
  version: "1.0"
  generated_at: "[ISO timestamp]"
  skill_id: "E3-email-sequence-assembler"

  campaign_meta:
    campaign_name: "[from blueprint]"
    campaign_type: "[from blueprint]"
    total_emails: [integer]
    duration_days: [integer]
    target_audience: "[from blueprint]"

  timing_plan:
    frequency: "[daily|multi-daily|custom]"
    schedule:
      - day: 1
        emails_count: [integer]
        email_positions: [1, 2]
      - day: 2
        emails_count: [integer]
        email_positions: [3, 4]
      # ...

  emails:
    - position: 1
      day: 1
      send_time: "[morning|afternoon|evening]"
      subject_line: "[selected SL from E2]"
      subject_line_formula: "[formula category]"
      body_type: "[CT|QO|TM|QA|LB|ST|NR]"
      function: "[DR|DU|PL|AL|BP|CP|AR]"
      body_text: "[complete email text from E1]"
      connector_added: [true|false]
      connector_text: "[if added, the connector text]"
      connector_references_email: [position number or null]
      ps_added: [true|false]
      ps_type: "[bonus_mention|urgency_reminder|testimonial_snippet|cross_sell|curiosity_tease|null]"
      ps_text: "[if added, the P.S. text]"
      urgency_level: [0-5]
      emotional_target: "[from blueprint]"
      word_count: [integer]
      notes: "[any assembly notes]"

    - position: 2
      # ... same structure

  assembly_metadata:
    connectors_added: [integer]
    ps_added: [integer]
    ps_frequency: "[X]%"
    variety_check:
      consecutive_same_type: [true|false]  # false = PASS
      min_types_per_5_window: [integer]
      nr_count: [integer]
      passes: [true|false]
    escalation_map:
      urgency_progression: "[description]"
      emotional_progression: "[description]"
      validated: [true|false]

  campaign_quality:
    c1_body_type_variety: [PASS|FAIL]
    c2_emotional_arc: [PASS|FAIL]
    c3_cross_email_continuity: [PASS|FAIL]
    c4_urgency_escalation: [PASS|FAIL]
    c5_subject_line_diversity: [PASS|FAIL]
    all_pass: [true|false]

  downstream_handoff:
    e4_ready: [true|false]
    notes_for_editorial: "[any flags for E4]"
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER modify email body text** — That is E4's job. E3 only adds connectors and P.S. lines.
2. **NEVER modify subject lines** — Subject lines are already selected. E3 attaches them, period.
3. **NEVER reorder emails** — Blueprint sequence order is authoritative. E3 does not redesign.
4. **NEVER reassign body types** — E0 assigned them. If a variety violation exists, HALT and flag.
5. **SEQUENTIAL Layer dependency** — Each layer must pass its gate before the next begins.

### Assembly Constraints
6. **Connectors must reference actual content** — No vague "as I mentioned before" without specifics.
7. **P.S. frequency capped at 60%** — Count emails with P.S., divide by total. Must be <= 60%.
8. **P.S. never in first email** — Let the opening email stand alone.
9. **Connectors go in opening lines only** — First 1-3 lines of the receiving email.
10. **Connectors are 1-2 sentences max** — Brief references, not recaps.

### Validation Constraints
11. **All 5 campaign criteria (C1-C5) must pass** — FAIL = return to flag issues.
12. **Output must include complete email text** — Not references to files. Full text in the assembled YAML.
13. **Every email must have exactly one subject line** — No email without SL, no email with multiple SLs.

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Email draft missing for a position | HALT — Cannot assemble incomplete sequence. Request E1 re-generation for missing position. |
| Subject line missing for an email | HALT — Cannot assemble without SLs. Request E2 generation for missing email. |
| Blueprint not found | HALT — Cannot assemble without blueprint. Request E0 execution. |
| Variety violation detected | HALT — Flag blueprint error. Do NOT silently fix. Report to human with violation details. |
| P.S. frequency exceeds 60% | Remove P.S. from lowest-priority emails until within cap. |
| Connector references non-existent content | Rewrite connector to reference actual content from cited email. |
| Escalation map shows no progression | Flag for human review — may indicate blueprint issue or intentional flat sequence. |

---

## SPECIMEN QUICK-REFERENCE

### Good 5-Email Sequence Assembly

```
Email 1 (Day 1, AM): ST — "The day everything changed for Dave"
  SL: "The $42,000 plumber" (SL-THE)
  Urgency: 0 | Emotional: trust/curiosity
  Connector: None (opening email)
  P.S.: None (first email — no P.S.)

Email 2 (Day 1, PM): CT — "Why your financial advisor is wrong"
  SL: "Why your accountant is making you poor" (SL-WHY)
  Urgency: 0 | Emotional: challenge/reframe
  Connector: "This morning I told you about Dave the plumber. Here's WHY he succeeded where MBAs fail..."
  P.S.: None

Email 3 (Day 2, AM): TM — "Three people who did it in 30 days"
  SL: "How a teacher, a nurse, and a Lyft driver each made $10k" (SL-HOW)
  Urgency: 1 | Emotional: social proof/desire
  Connector: "Yesterday I challenged the conventional wisdom. Today, let me show you what happens when people ignore the old rules..."
  P.S.: "P.S. Dave (the plumber from email 1) just sent me an update. He closed another $11,200 last week. I'll share the details tomorrow."

Email 4 (Day 3, AM): QA — "Reader asked: what if I have no experience?"
  SL: "The question I get asked 50 times a day" (SL-THE)
  Urgency: 2 | Emotional: objection handling
  Connector: None (standalone Q&A)
  P.S.: "P.S. The early-bird pricing expires Friday at midnight. After that, the investment goes up by $200."

Email 5 (Day 3, PM): LB — "5 things they all had in common"
  SL: "5 patterns I found in 200 success stories" (SL-NUM)
  Urgency: 4 | Emotional: urgency/action
  Connector: "Over the past few days, I've shared stories, challenged assumptions, and answered your questions. Now let me tie it all together..."
  P.S.: "P.S. After midnight tonight, the bonus training disappears. This is the last time I'm mentioning it."
```

**Why this works:**
- 5 different body types (ST, CT, TM, QA, LB) — no repeats
- 5 different SL formulas — diversity satisfied
- Connectors reference SPECIFIC content from earlier emails (not vague)
- P.S. in 3 of 5 emails (60% — at cap)
- No P.S. in email 1 (rule: never first email)
- Urgency escalates: 0 → 0 → 1 → 2 → 4
- Emotional arc: curiosity → challenge → proof → objection → action

### Anti-Exemplar 1: Consecutive Same Type

```
Email 1: ST — Story about Dave
Email 2: ST — Story about Sarah
Email 3: ST — Story about Mike
```

**Why this fails:** Three consecutive Story types. Reader fatigue. Violates variety rule (never same type twice in a row). Would be caught at Layer 1 variety check → HALT.

### Anti-Exemplar 2: Connector Fatigue

```
Email 3 connector: "As I mentioned yesterday..."
Email 4 connector: "As I mentioned yesterday..."
Email 5 connector: "As I said in my last email..."
```

**Why this fails:** Identical connector pattern. No specific content referenced. "As I mentioned" becomes invisible filler. Connectors must reference SPECIFIC content: name a person, cite a data point, recall a specific claim.

### Anti-Exemplar 3: P.S. Overcap

```
Email 1: P.S. about bonus ← VIOLATION (no P.S. in first email)
Email 2: P.S. about deadline
Email 3: P.S. about testimonial
Email 4: P.S. about cross-sell
Email 5: P.S. about urgency
```

**Why this fails:** P.S. in 5 of 5 emails (100%) — exceeds 60% cap. P.S. in email 1 violates placement rule. When every email has a P.S., the P.S. loses its power as a "bonus attention grab."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-03-02 | Upgraded C3 with Scheherazade Principle (forward hooks), added Forward Hook section to connector rules |
| 1.1 | 2026-02-25 | Added SPECIMEN QUICK-REFERENCE section with good/bad inline examples |
| 1.0 | 2026-02-21 | Initial creation — full 4-layer architecture with 11 microskills |

---

**Skill Status:** COMPLETE — Full 4-layer architecture with 11 microskills
