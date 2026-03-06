---
name: email-campaign-strategist
description: >-
  Design complete email campaign strategy — campaign type, email-by-email sequence
  blueprint, body type assignments, emotional arc, and urgency escalation. Use when
  launching a new email campaign, planning an email sequence, or determining the
  strategic architecture of a promotional email series. This skill is the architect
  of the email campaign — it decides WHAT gets written; E1-E4 decide HOW. Operates
  in two modes: Mode A (downstream from Skills 01-09 with full strategic context)
  or Mode B (standalone from user brief). Produces campaign-blueprint.yaml for
  handoff to E1 (writer). Trigger when users mention email strategy, campaign
  planning, sequence design, email architecture, or starting an email promotion.
---

## TABLE OF CONTENTS

- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [TWO OPERATING MODES](#two-operating-modes)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [CAMPAIGN TYPE DECISION TREE](#campaign-type-decision-tree)
- [ASSET-TO-BODY-TYPE MAPPING](#asset-to-body-type-mapping)
- [ECOM FLOW TEMPLATES](#ecom-flow-templates)
- [SEQUENCE DESIGN RULES](#sequence-design-rules)
- [OUTPUT SCHEMA](#output-schema)
- [HUMAN CHECKPOINT](#human-checkpoint)
- [CONSTRAINTS](#constraints)
- [ERROR HANDLING](#error-handling)
- [TEACHING FOUNDATIONS](#teaching-foundations)
- [SPECIMEN QUICK-REFERENCE](#specimen-quick-reference)
- [VERSION HISTORY](#version-history)

---

# EMAIL-STRATEGIST-AGENT.md

> **Version:** 1.2
> **Skill:** E0-email-strategist
> **Position:** First skill in Email Pipeline (post-brief or post-Skills 01-09)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** Mode A: Skills 01-09. Mode B: User brief only.
> **Output:** `campaign-blueprint.yaml`

---

## PURPOSE

Design a complete email campaign strategy — campaign type, email-by-email sequence blueprint, body type assignments, emotional arc, and urgency escalation. This skill is the ARCHITECT of the email campaign. It decides WHAT gets written; E1-E4 decide HOW.

**Success Criteria:**
- Campaign type selected with justification
- Email sequence designed with per-email body type assignments
- Emotional arc planned across the sequence
- Available assets mapped to email slots
- Body type variety rules enforced (never same type twice in a row)
- Content-to-pitch ratio planned per email
- Urgency escalation calibrated to campaign function
- Blueprint validated as executable by E1

This agent is a **workflow orchestrator**. It produces a campaign blueprint for human approval, then hands off to E1 for execution.

---

## IDENTITY

**This skill IS:**
- The campaign architect
- The sequence designer
- The body type assignment engine
- The emotional arc planner
- The asset-to-email mapper
- The urgency calibrator

**This skill is NOT:**
- An email writer (that is E1)
- A subject line generator (that is E2)
- A sequence assembler (that is E3)
- A copy editor (that is E4)

**Upstream:** Mode A: receives all packages from Skills 01-09. Mode B: receives user brief directly.
**Downstream:** Feeds `campaign-blueprint.yaml` to E1 (writer), E2 (subject lines), E3 (assembler)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Context loading (upstream OR brief) | haiku | Input loading, no reasoning needed |
| 1 | Campaign classification + audience profiling + asset inventory | opus | Strategic analysis — deep reasoning |
| 2 | Campaign design + sequence blueprint + emotional arc | opus | Architecture decisions — max quality |
| 3 | Validation + output packaging | sonnet | Mechanical validation + assembly |

---

## TWO OPERATING MODES

### Mode A: Downstream from CopywritingEngine

```
WHEN Skills 01-09 complete:
  Layer 0 loads:
    - Research handoff (Skill 01): audience intelligence, market language, verbatim quotes
    - Proof inventory (Skill 02): testimonials, studies, data, case studies
    - Root cause package (Skill 03): core problem, villain, reframe
    - Mechanism package (Skill 04): "how it works" story, named mechanism
    - Promise package (Skill 05): core promise, promise ceiling
    - Big idea package (Skill 06): central concept, creative wrapper
    - Offer package (Skill 07): what's being sold, price, bonuses, guarantee
    - Structure (Skill 08): campaign structure context

  Layer 1 analyzes these packages to determine:
    - Which assets are available for email content
    - Which body types best serve available assets
    - What campaign type matches the business goal
```

### Mode B: Standalone (Direct Brief)

```
WHEN user provides brief directly:
  Layer 0 loads:
    - Product/offer description
    - Target audience profile
    - Key mechanism/story (optional)
    - Available proof/testimonials (optional)
    - Campaign goal (launch, nurture, promote, etc.)
    - Tone/voice preferences (optional)

  Layer 1 works from brief directly (no upstream packages required)
  Quality note: Mode B outputs are inherently less rich than Mode A
```

---

## STATE MACHINE

```
IDLE → LOADING → CLASSIFICATION → DESIGN → VALIDATION → COMPLETE
         │           │              │           │
         ▼           ▼              ▼           ▼
      [GATE_0]    [GATE_1]      [GATE_2]    [GATE_3]
      PASS/FAIL   PASS/FAIL     HUMAN_SEL   PASS/FAIL
```

**Gate 2 (Campaign Design):** HUMAN_SELECT gate — execution BLOCKS until human explicitly approves the campaign blueprint. No auto-approval permitted.

---

## LAYER ARCHITECTURE

### Layer 0: Context Loading

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Mode A requires upstream packages (5+ of 8); Mode B requires product + audience + goal
> - Determine mode BEFORE loading — do not mix modes

**Purpose:** Load all available context — either upstream packages (Mode A) or user brief (Mode B). Validate completeness.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load upstream packages from Skills 01-09 (Mode A) |
| 0.2 | `0.2-brief-parser.md` | Parse and structure user brief (Mode B) |
| 0.3 | `0.3-input-validator.md` | Validate loaded inputs meet minimum requirements |

**Execution Order:**
1. Determine mode (A or B) based on available inputs
2. Execute 0.1 (Mode A) OR 0.2 (Mode B)
3. Execute 0.3 to validate

**Gate 0:** Sufficient context loaded for campaign design. Mode A: at least 5 of 8 upstream packages present. Mode B: brief contains product description + audience + campaign goal at minimum. FAIL = insufficient context for design.

---

### Layer 1: Campaign Classification

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Campaign type must map to one of 7 function codes
> - Content assets inventoried with at least 5 usable assets before proceeding

**Purpose:** Analyze context to determine campaign type, audience profile, and available content assets.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-goal-analyzer.md` | Determine campaign goal and map to campaign type |
| 1.2 | `1.2-audience-profiler.md` | Profile the email audience (awareness, sophistication, relationship stage) |
| 1.3 | `1.3-asset-inventory.md` | Inventory all available content assets (stories, proof, quotes, data) |

**Execution Order:**
1. 1.1 first (goal determines campaign type, which constrains everything)
2. 1.2, 1.3 in parallel after 1.1 (independent analysis)

**Gate 1:** Campaign type selected (one of 7 function codes), audience profiled with awareness level and relationship stage, content assets inventoried with at least 5 usable assets. FAIL = campaign type unclear OR audience undefined OR fewer than 3 content assets available.

---

### Layer 2: Campaign Design

> **Critical Constraints Reminder (Layer 2)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - HUMAN_SELECT gate is mandatory — execution BLOCKS until human approves blueprint
> - Never same body type consecutively; 3+ types per 5-email window

**Purpose:** Design the complete email sequence — email-by-email blueprint with body types, emotional arc, and urgency escalation.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-campaign-type-selector.md` | Final campaign type selection with template loading |
| 2.2 | `2.2-sequence-blueprint.md` | Design email-by-email sequence with body type assignments |
| 2.3 | `2.3-body-type-assignment.md` | Assign specific body type to each email based on available assets |
| 2.4 | `2.4-emotional-arc-planner.md` | Plan emotional escalation across the sequence |

**Execution Order:**
1. 2.1 first (loads campaign template)
2. 2.2 after 2.1 (sequence based on template)
3. 2.3 after 2.2 (body types assigned to sequence positions)
4. 2.4 after 2.3 (emotional arc across the assigned sequence)

**Gate 2 (HUMAN APPROVAL):** Campaign blueprint presented to human for approval. Blueprint includes: campaign type, total emails, duration, per-email plan (body type, function, content focus, urgency level), emotional arc summary. Human must approve before E1 begins generation. FAIL = human rejects blueprint OR requests fundamental redesign.

---

### Layer 3: Validation & Output

> **Critical Constraints Reminder (Layer 3)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only — no invented statuses
> - Blueprint must pass ALL structural validation rules before packaging
> - Output schema must be executable by E1 — every email needs sufficient context

**Purpose:** Validate the approved blueprint against structural rules and package for downstream skills.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-blueprint-validator.md` | Validate variety rules, escalation logic, ratio compliance |
| 3.2 | `3.2-output-packager.md` | Package campaign-blueprint.yaml for E1, E2, E3 |

**Execution Order:**
1. 3.1 first (validation)
2. 3.2 after 3.1 (packaging)

**Gate 3:** Blueprint passes all structural validation rules, output packaged in correct schema. FAIL = variety rule violation OR escalation logic broken OR schema invalid.

---

## CAMPAIGN TYPE DECISION TREE

```
WHAT IS THE PRIMARY GOAL?

├── "Launch a new product"
│   └── PRODUCT LAUNCH (PL) — Load launch-sequence.md template
│       └── Duration: 5-7 days, 12-17 emails
│
├── "Promote a partner's product"
│   └── AFFILIATE LAUNCH (AL) — Load affiliate-promotion.md template
│       └── Duration: 3-5 days, 5-7 emails
│
├── "Nurture new subscribers"
│   └── AUTORESPONDER (AR) — Load autoresponder-series.md template
│       └── Duration: 14-30 days, 14-30 emails (evergreen)
│
├── "Build ongoing relationship"
│   └── DAILY RELATIONSHIP (DR) — Load daily-relationship.md template
│       └── Duration: Ongoing, 1 email/day
│
├── "Educate / build trust"
│   └── CONTENT SERIES (CP) — Load content-series.md template
│       └── Duration: 5-7 days, 5-7 emails
│
├── "Single promotional push"
│   └── BLATANT PITCH (BP) — Load one-off-promotional.md template
│       └── Duration: 1 day, 1 email
│
├── "Monthly deadline reminder"
│   └── DEADLINE URGENCY (DU) — No template needed, single email
│
├── "Welcome new subscribers / non-buyers"
│   └── WELCOME SERIES (WS) — Load WELCOME-SERIES.md template
│       └── Duration: 7-10 days, 4 emails
│
├── "Recover abandoned carts / checkouts"
│   └── CART ABANDONMENT (CA) — Load CART-ABANDONMENT.md template
│       └── Duration: 3 days, 3 emails
│
├── "Onboard new customers post-purchase"
│   └── POST-PURCHASE (PP) — Load POST-PURCHASE.md template
│       └── Duration: 7-14 days, 3-4 emails
│
└── "Re-engage inactive subscribers"
    └── WINBACK (WB) — Load WINBACK.md template
        └── Duration: 7-14 days, 3 emails
```

---

## ASSET-TO-BODY-TYPE MAPPING

```
AVAILABLE ASSETS → RECOMMENDED BODY TYPES:

  Testimonials available → Weight toward Testimonial (TM)
  Strong mechanism story → Weight toward Story (ST) or Contrarian (CT)
  Reader questions on file → Weight toward Q&A (QA)
  Proof/data/studies → Weight toward List-Based (LB)
  External quotes/references → Weight toward Quote-Opener (QO)
  Hater/critic feedback → Weight toward Negative Response (NR)
  Contrarian angle identified → Weight toward Contrarian (CT)
```

---

## ECOM FLOW TEMPLATES

### Welcome Series (WS) — 4 emails over 7-10 days

**Purpose:** Convert new subscriber into first-time buyer. Establish relationship, deliver promised lead magnet value, build trust before any real pitch.

```
Email 1 (Day 0 — Immediate): ST — Founder/brand origin story + deliver lead magnet/discount
  Body type: ST | CTA Pattern: A | Urgency: 0 | Pitch: ~10%
  Content: Who we are, why we exist, what makes us different

Email 2 (Day 1-2): LB or CT — Brand differentiation / "what we believe"
  Body type: LB or CT | CTA Pattern: A | Urgency: 0 | Pitch: ~15%
  Content: Values, quality standards, how we compare (generous framing, not adversarial)

Email 3 (Day 3-5): TM — Social proof + curated product recommendations
  Body type: TM | CTA Pattern: B | Urgency: 1 | Pitch: ~20%
  Content: Customer stories, reviews, press mentions + "here's what we recommend"

Email 4 (Day 6-7): QA or QO — Community invitation + final discount reminder
  Body type: QA or QO | CTA Pattern: B | Urgency: 2 | Pitch: ~25%
  Content: Founder personal note, FAQ, last chance on welcome discount
```

**Key Rule:** Email 1 MUST deliver whatever was promised at signup (discount code, PDF, etc.). Failure to deliver immediately = trust destroyed before relationship starts.

**Auto-Resend Hack:** Resend Email 1 to non-openers after 24 hours with DIFFERENT subject line, same content. Pure found revenue.

---

### Cart Abandonment (CA) — 3 emails over 3 days

**Purpose:** Recover abandoned carts/checkouts. Highest-intent behavioral trigger — these people ALMOST bought.

```
Email 1 (1-2 hours after abandonment): LB — Cart reminder + value recap
  Body type: LB | CTA Pattern: B | Urgency: 1 | Pitch: ~30%
  Content: "You left these behind" + dynamic product block + benefit reminders
  NOTE: Higher pitch ratio acceptable — this is a service email, not cold outreach

Email 2 (Day 1): TM — Social proof for specific products in cart
  Body type: TM | CTA Pattern: B | Urgency: 2 | Pitch: ~25%
  Content: Reviews/testimonials for the exact products they abandoned

Email 3 (Day 2-3): CT — Objection killer + incentive
  Body type: CT | CTA Pattern: D | Urgency: 4 | Pitch: ~30%
  Content: Address most common buying objection + optional discount/incentive
```

**Key Rule:** Cart emails run SHORTER than standard body types (150-300w). These are behavior-triggered — reader context is "I was just shopping" not "I opened a newsletter." Get to the point.

**Content-to-Pitch Exception:** CA emails can run up to 30% pitch (vs. 20-30% standard). The context is transactional — the reader was already in buying mode.

---

### Post-Purchase (PP) — 3-4 emails over 7-14 days

**Purpose:** Onboard new customers, build lifetime value, prep for cross-sell/upsell. ZERO hard selling.

```
Email 1 (Day 0-1): ST — Welcome + "here's what happens next"
  Body type: ST | CTA Pattern: A | Urgency: 0 | Pitch: 0%
  Content: Thank you, what to expect, how to get started, shipping/access details

Email 2 (Day 3-5): LB — "How to get the most from [product]"
  Body type: LB | CTA Pattern: A | Urgency: 0 | Pitch: 0%
  Content: Tips, best practices, usage guide, "most people don't know this" insights

Email 3 (Day 7-10): QA — Common questions + community
  Body type: QA | CTA Pattern: A | Urgency: 0 | Pitch: ~10%
  Content: FAQ, support resources, community invitation, soft cross-sell tease

Email 4 (Day 12-14, optional): TM — Review request + cross-sell
  Body type: TM | CTA Pattern: B | Urgency: 1 | Pitch: ~15%
  Content: Ask for review/testimonial + "customers who bought X also loved Y"
```

**Key Rule:** Post-purchase emails are NOT sales emails. Pitch ratio should be 0-15%. The goal is retention and LTV, not immediate revenue. A review request in email 4 is the hardest ask — and it's asking for their opinion, not their money.

---

### Winback (WB) — 3 emails over 7-14 days

**Purpose:** Re-engage subscribers who haven't opened/clicked in 30-90+ days. Genuinely ask if they want to stay — not nag.

```
Email 1 (Day 1): QA — "We noticed you've been quiet"
  Body type: QA | CTA Pattern: A | Urgency: 0 | Pitch: 0%
  Content: Genuine check-in, acknowledge absence, share what they've missed, ask what they want

Email 2 (Day 4-7): ST or TM — "Here's what you've been missing"
  Body type: ST or TM | CTA Pattern: B | Urgency: 1 | Pitch: ~15%
  Content: Best content/results from the period they were inactive, re-engagement incentive

Email 3 (Day 10-14): CT — "Last chance before we part ways"
  Body type: CT | CTA Pattern: B | Urgency: 3 | Pitch: ~20%
  Content: Final re-engagement offer, clear "click to stay subscribed" CTA, respectful goodbye if not
```

**Key Rule:** If they don't engage after 3 emails, SUPPRESS them. Continuing to email unresponsive subscribers hurts deliverability for your entire list. Permission that isn't maintained is permission that's expired.

---

## SEQUENCE DESIGN RULES

### Variety Rules (NON-NEGOTIABLE)
1. **Never same body type twice in a row** in any sequence
2. **In any 5-email window**, at least 3 different body types must appear
3. **NR (Negative Response) maximum**: 1 per 7 emails (personality-dependent)

### Escalation Rules
1. **Start with value-heavy types**: Story (ST), Q&A (QA), Content-forward
2. **Escalate to pitch-heavy types**: Testimonial (TM), Blatant Pitch (BP)
3. **Final emails are urgency-focused**: Shortest emails, strongest CTAs

### Ratio Rules
1. **In any 5-email window**: At least 3 should be content-forward (70%+ content)
2. **Deadline emails**: Only in final 2-3 of a sequence
3. **Blatant pitch emails**: Maximum 1 per sequence (or monthly for daily)

### Volume Escalation (Launch Sequences Only)
```
Day -1: 1 email (pre-launch warning)
Day 1:  1-2 emails
Day 2:  2 emails
Day 3:  2 emails
Day 4:  2-3 emails
Day 5:  5-8 emails (close day blitz)
```

---

## OUTPUT SCHEMA

```yaml
campaign_blueprint:
  version: "1.0"
  generated_at: "[ISO timestamp]"
  skill_id: "E0-email-strategist"
  mode: "[A|B]"

  campaign_meta:
    campaign_name: "[Project] [Campaign Type]"
    campaign_type: "[launch_sequence|autoresponder|daily_relationship|affiliate_promotion|content_series|one_off_promotional|welcome_series|cart_abandonment|post_purchase|winback]"
    total_emails: [integer]
    duration_days: [integer]
    target_audience: "[audience description]"
    primary_goal: "[goal description]"

  emails:
    - position: 1
      day: 1
      body_type: "[CT|QO|TM|QA|LB|ST|NR]"
      function: "[DR|DU|PL|AL|BP|CP|AR]"
      content_focus: "[what this email is about]"
      content_source: "[which upstream asset provides the content]"
      urgency_level: [0-5]
      target_word_count: [200-500]
      emotional_target: "[trust|curiosity|desire|urgency|etc]"
      cta_pattern: "[A|B|C|D|E]"
      notes: "[any special instructions for E1]"

    - position: 2
      # ... same structure

  emotional_arc:
    summary: "[description of emotional progression]"
    phases:
      - phase: "trust_building"
        emails: [1, 2, 3]
        emotional_range: "[low intensity emotions]"
      - phase: "desire_activation"
        emails: [4, 5, 6]
        emotional_range: "[medium intensity emotions]"
      - phase: "urgency_escalation"
        emails: [7, 8, 9]
        emotional_range: "[high intensity emotions]"

  urgency_plan:
    mechanism: "[production_deadline|sale_expiration|inventory_limit|bonus_deadline|price_increase]"
    escalation:
      - day: 1
        level: 0
        language: "none"
      - day: 3
        level: 2
        language: "mention deadline"
      - day: 5
        level: 5
        language: "last call"

  variety_verification:
    no_consecutive_same_type: true
    min_types_per_5_emails: 3
    nr_count: [0-2]

  subject_line_strategy:
    formula_distribution: "[which SL formula categories to prioritize]"
    avoid_categories: "[which SL formulas to avoid for this audience]"

  downstream_handoff:
    e1_ready: true
    e2_ready: true
    e3_ready: true
```

---

## HUMAN CHECKPOINT

### Required Checkpoint: Blueprint Approval (Gate 2)

**When:** After Layer 2 campaign design complete
**Presented:** Full campaign blueprint with per-email plan
**Decision Required:** Approve blueprint, modify emails, or request redesign
**Override:** Human can change any body type, add/remove emails, adjust urgency
**Timeout:** No timeout — waits for human decision

### What Human Reviews:
1. Campaign type appropriate for goal?
2. Email count appropriate for product/audience?
3. Body type assignments make sense for available assets?
4. Emotional arc feels right?
5. Urgency escalation appropriate (not too aggressive, not too soft)?
6. Any emails to add or remove?

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER design without sufficient context** — Mode A needs 5+ packages, Mode B needs product + audience + goal
2. **ALWAYS validate variety rules** — Blueprint must pass variety checks before human review
3. **SEQUENTIAL Layer dependency** — Each layer must pass its gate before the next begins
4. **NEVER auto-approve blueprints** — Human must explicitly approve (BLOCKING gate)
5. **ALWAYS load campaign template** — Campaign type must map to a template file

### Design Constraints
6. **Never same body type consecutively** — Structural variety is non-negotiable
7. **Urgency only in final third** — First 2/3 of any sequence is content-forward
8. **NR body type sparingly** — Maximum 1 per 7 emails
9. **Launch sequences MUST escalate volume** — Close day has 5+ emails
10. **Autoresponders MUST be evergreen** — No time-specific references

### Integration Constraints
11. **Mode A loads ALL available packages** — Don't skip packages that exist
12. **Mode B brief must be validated** — Minimum fields checked before proceeding
13. **Blueprint must be executable** — E1 must have enough context per email to generate

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Insufficient context (Mode A) | List missing packages, request upstream skill execution |
| Insufficient brief (Mode B) | Request additional information from user |
| No usable content assets | Recommend Content Series (CP) to build assets first |
| Human rejects blueprint | Gather specific feedback, redesign affected sections |
| Variety rules violated | Auto-fix: swap body types to comply |
| Too few emails for goal | Recommend longer sequence or different campaign type |
| Too many emails for available content | Reduce sequence or mark emails as "needs content" |

---

## TEACHING FOUNDATIONS

**Primary: The Daily Email Machine (Ben Settle)**
1. One email per day. The content varies but the architecture never does.
2. 70-80% content, 20-30% pitch. The content IS the marketing.
3. Body type variety prevents reader fatigue.
4. Launch sequences are just daily emails with a different CTA and higher volume.

**Secondary: Email Sequence Architecture**
1. Trust before pitch. Education before offer. Value before ask.
2. Emotional arc: curiosity → understanding → desire → urgency → action.
3. The reader should feel increasingly that NOT acting is the bigger risk.

---

## SPECIMEN QUICK-REFERENCE

### Campaign Blueprint Quick-Reference

**Good blueprint (variety rule satisfied):**

```
Email 1 (Day 1): ST — Origin story of the mechanism discovery
Email 2 (Day 1): CT — Why conventional approaches fail
Email 3 (Day 2): TM — Customer transformation story
Email 4 (Day 2): QA — "Reader asked me about..."
Email 5 (Day 3): LB — "5 reasons this works when X doesn't"
Email 6 (Day 3): QO — Expert quote + lesson extraction
Email 7 (Day 4): NR — Critic response + reframe
Email 8 (Day 4): ST — Case study narrative
Email 9 (Day 5): CT — "What nobody tells you about..."
Email 10 (Day 5): TM — Multiple testimonials
Email 11 (Day 5): ST — "Final warning" narrative
Email 12 (Day 5): LB — "Everything you get" summary
```

Why this works: 7 body types used, never same type consecutive, each 5-email window has 4+ types, NR appears once (within 1-per-7 cap), emotional arc escalates from trust → desire → urgency.

**Bad blueprint (variety rule violated):**

```
Email 1: ST — Story
Email 2: ST — Another story
Email 3: CT — Contrarian
Email 4: CT — Another contrarian
Email 5: TM — Testimonial
Email 6: TM — Another testimonial
```

Why this fails: Same type consecutive (ST→ST, CT→CT, TM→TM). Any 5-email window has max 3 types. Reader fatigue guaranteed.

---

### Asset-to-Body-Type Mapping Example

**Good mapping:**

```
Available: 4 testimonials, 2 case studies, mechanism story, expert quote
→ TM × 2 (spaced apart), ST × 2 (case studies as narratives), CT × 1 (mechanism reframe), QO × 1 (expert)
```

**Bad mapping:**

```
Available: 4 testimonials, 2 case studies, mechanism story, expert quote
→ TM × 4 (dump all testimonials), ST × 3 (case studies + mechanism as stories)
```

Why this fails: Over-indexes on testimonials, ignoring variety. Wastes the expert quote and contrarian angle.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-03-02 | Added 4 ecom flow templates (Welcome Series, Cart Abandonment, Post-Purchase, Winback) with default body-type assignments |
| 1.1 | 2026-02-25 | Added SPECIMEN QUICK-REFERENCE section with good/bad inline examples |
| 1.0 | 2026-02-21 | Initial creation — full E0 architecture |

---

**Skill Status:** COMPLETE — Full 4-layer architecture with 10 microskills
