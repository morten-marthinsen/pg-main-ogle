# LP-13: Urgency/Scarcity Stack — Master Agent

> **Version:** 1.0
> **Skill:** LP-13-urgency-scarcity
> **Position:** Phase 3 — Writing Skill (runs after LP-11 Offer/Pricing)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (`page-brief.json`), LP-06 (`offer-cta-architecture.json`), LP-04 (`section-sequence.json`)
> **Output:** `urgency-package.json` + `URGENCY-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write **justified urgency and scarcity copy** — the copy elements that give the visitor a reason to act NOW rather than later. Every urgency claim must be backed by a real, verifiable reason. Fabricated urgency destroys trust and kills long-term conversion.

This skill produces two categories of copy:

1. **Urgency copy:** Countdown explanations, deadline language, time-sensitive framing
2. **Scarcity support copy:** Stock level indicators, availability windows, batch manufacturing explanations, enrollment limit justifications

**The CRITICAL rule:** Every urgency/scarcity claim MUST be justified. If a claim cannot be traced to a real constraint (supply, time, price schedule, capacity), it does not belong on the page.

**Two fundamentally different executions:**

**Type A output** (Long-Form Sales Page):
- Urgency section headline + supporting copy (50-300 words)
- Natural urgency woven into narrative (cost-of-delay framing)
- Scarcity justification paragraph(s) explaining WHY supply/time/price is limited
- Urgency callbacks for close section and P.S.
- Maximum 2 urgency types per page

**Type B output** (Ecomm/PDP):
- Countdown timer context copy (3-15 words + explanation sentence)
- Stock level indicator copy (3-10 words)
- Sale-end / price-deadline badges (3-8 words each)
- Availability window copy (1-2 sentences)
- Structural urgency elements for product card, cart, and checkout
- Maximum 2 urgency types per page

**Success Criteria:**
- Every urgency claim has an explicit justification documented
- Maximum 2 urgency types selected per page (more = distrust)
- Justification audit passes (no fabricated claims)
- Urgency copy placed AFTER value is established (LP-11 runs first)
- Zero AI telltales in all urgency copy
- Urgency score >= 7.0/10 on validation audit

This agent **writes urgency/scarcity copy**, not architecture. LP-06 designed the urgency strategy — this skill executes it.

---

## IDENTITY

**This skill IS:**
- The execution layer for LP-06's urgency/scarcity strategy
- The writer of justified urgency copy that gives visitors a reason to act now
- The scarcity justification system — the copy that EXPLAINS why scarcity exists
- The guard against fabricated urgency (the most common trust-killer in landing pages)

**This skill is NOT:**
- The offer/CTA architect (LP-06 handled urgency strategy decisions)
- The CTA copy writer (LP-14 handles button text and CTA framing)
- The pricing section writer (LP-11 handles price presentation)
- The close section writer (LP-15 Assembly integrates urgency callbacks into the close)

**Upstream:** `page-brief.json` (LP-00), `offer-cta-architecture.json` (LP-06), `section-sequence.json` (LP-04), `offer-pricing-package.json` (LP-11 — for value context)
**Downstream:** `urgency-package.json` feeds LP-14 (CTA Optimizer) for urgency-aware CTA copy, LP-15 (Assembly) for section placement and P.S. urgency callbacks.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + specimens
  -> 0.1: Brief loader (page-brief, offer-cta-architecture, section-sequence)
  -> 0.2: Urgency data loader (extract urgency inputs from LP-06 + LP-00)
  -> 0.3: Specimen urgency loader (real urgency/scarcity patterns from specimens)
  | [GATE_0: Required inputs present? Urgency type(s) identified?]
LAYER_1: Classification + planning
  -> 1.1: Urgency type classifier (select 1-2 types from 6-type taxonomy)
  -> 1.2: Scarcity justification planner (document the real reason for each claim)
  -> 1.3: Placement strategy planner (where urgency appears on page)
  | [GATE_1: Types selected (max 2)? Each type has documented justification? Placement mapped?]
LAYER_2: Generation
  -> 2.1: Countdown copy writer (time-based urgency copy)
  -> 2.2: Stock level writer (supply scarcity copy)
  -> 2.3: Price deadline writer (price-based urgency copy)
  -> 2.4: Availability window writer (capacity/enrollment urgency copy)
  -> 2.5: Urgency support writer (justification paragraphs + natural urgency + callbacks)
  | [GATE_2: Selected urgency type(s) have complete copy? Support copy justifies every claim?]
LAYER_3: Validation
  -> 3.1: Urgency validator (score against 8-point audit)
  -> 3.2: Justification audit (every claim traced to real constraint)
  | [GATE_3: Urgency score >= 7.0? Justification audit PASS? Zero fabricated claims?]
LAYER_4: Package assembly
  -> 4.1: urgency-package.json compiler
  -> 4.2: URGENCY-SUMMARY.md writer
  -> 4.3: execution-log.md writer
  |
COMPLETE
```

**Note on Layer 2 microskill selection:** NOT all Layer 2 microskills run. Only the microskills matching the selected urgency type(s) from Layer 1 execute. If Layer 1 selects "time-based" and "supply scarcity," then 2.1, 2.2, and 2.5 run. 2.3 and 2.4 do NOT run. Microskill 2.5 (urgency support writer) ALWAYS runs — it produces the justification copy and callbacks regardless of type.

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load page-brief, offer-cta-architecture, section-sequence | packages-loaded.md |
| 0.2: Urgency Data Loader | Extract urgency-relevant data from LP-06 output + page brief | urgency-data.md |
| 0.3: Specimen Urgency Loader | Load real urgency/scarcity patterns from specimen files | specimens-loaded.md |

**GATE_0:** All three upstream packages loaded. Urgency data extracted (even if `no_urgency_in_brief`). Specimens loaded with at least 2 urgency pattern examples.

### Layer 1: Classification + Planning

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Urgency Type Classifier | Select 1-2 types from the 6-type taxonomy based on offer + brief data | urgency-types-selected.md |
| 1.2: Scarcity Justification Planner | Document the real, verifiable reason behind each urgency/scarcity claim | justification-plan.md |
| 1.3: Placement Strategy Planner | Map where urgency elements appear on the page (section IDs from LP-04) | placement-strategy.md |

**GATE_1:** 1-2 urgency types selected (never more than 2). Each type has a documented justification with a real constraint. Placement mapped to specific section IDs from section-sequence.json. If NO justifiable urgency exists, output `no-justified-urgency.md` and skip to Layer 4 (package will contain `urgency_present: false`).

### Layer 2: Generation

| Microskill | Purpose | Output | Runs When |
|-----------|---------|--------|-----------|
| 2.1: Countdown Copy Writer | Write time-based urgency copy (deadlines, enrollment windows, seasonal) | countdown-copy.md | Type 2 or Type 5 selected |
| 2.2: Stock Level Writer | Write supply scarcity copy (batch limits, stock indicators, ingredient sourcing) | stock-level-copy.md | Type 1 selected |
| 2.3: Price Deadline Writer | Write price-based urgency copy (introductory pricing, scheduled increases) | price-deadline-copy.md | Type 3 selected |
| 2.4: Availability Window Writer | Write capacity urgency copy (limited spots, cohort-based, waitlist) | availability-copy.md | Type 4 selected |
| 2.5: Urgency Support Writer | Write justification paragraphs, natural urgency framing, close/P.S. callbacks | urgency-support-copy.md | ALWAYS runs |

**GATE_2:** Every selected urgency type has complete copy. Support copy (2.5) justifies every claim made in 2.1-2.4. Natural urgency framing written (if applicable). Callbacks for close/P.S. written.

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Urgency Validator | Score urgency copy against 8-point audit | urgency-audit.md |
| 3.2: Justification Audit | Trace every urgency claim to a real constraint — zero fabricated claims | justification-audit.md |

**GATE_3:** Urgency audit score >= 7.0/10 AND justification audit PASS (zero fabricated claims) AND zero AI telltales AND urgency types <= 2.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Urgency Compiler | Assemble urgency-package.json | urgency-package.json |
| 4.2: Summary Writer | Write URGENCY-SUMMARY.md | URGENCY-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading + extraction | haiku | Mechanical file operations |
| 1.1 | Urgency type classification | sonnet | Decision + classification against taxonomy |
| 1.2 | Justification planning | sonnet | Analytical — tracing claims to real constraints |
| 1.3 | Placement strategy | sonnet | Structural mapping against section sequence |
| 2.1-2.4 | Urgency copy generation | opus | Persuasive copy that must feel genuine, not salesy |
| 2.5 | Urgency support + callbacks | opus | Justification paragraphs require nuanced, credible writing |
| 3.1 | Urgency audit | sonnet | Scoring against checklist |
| 3.2 | Justification audit | sonnet | Systematic verification — binary pass/fail |
| 4 | Package assembly | haiku | Mechanical assembly |

---

## THE 6 JUSTIFIED URGENCY TYPES

### Type 1: Supply Scarcity
**What it is:** Limited production, ingredient sourcing constraints, batch manufacturing
**Justification required:** WHY is supply limited? Batch size, sourcing constraint, manufacturing schedule
**Example justification:** "We manufacture in small batches of 5,000 bottles to ensure freshness. Once this batch sells out, the next won't be ready for 6-8 weeks."
**Best for:** Supplements, physical products with genuine manufacturing constraints

### Type 2: Time-Based
**What it is:** Seasonal offer, launch window, enrollment period, bonus deadline
**Justification required:** WHY does the deadline exist? What happens when it passes?
**Example justification:** "This introductory launch pricing ends Friday at midnight EST. After that, the price moves to $97 — we're not running this offer again."
**Best for:** Info products, course launches, seasonal campaigns

### Type 3: Price-Based
**What it is:** Introductory pricing, price increase scheduled, early-bird discount
**Justification required:** WHY is the price going up? Real cost increase, launch period ending, demand pricing
**Example justification:** "This $67 introductory price is available during launch week only. Our standard price will be $97 starting next Monday — permanently."
**Best for:** Product launches, SaaS introductory offers, bundled discounts

### Type 4: Availability Window
**What it is:** Limited spots, cohort-based enrollment, waitlist
**Justification required:** WHY is capacity limited? Direct feedback model, coaching ratio, platform limits
**Example justification:** "We cap each cohort at 200 students because every participant gets direct feedback from our coaching team. Once this cohort fills, the next opening is in March."
**Best for:** Coaching, courses, membership programs, services

### Type 5: Bonus Deadline
**What it is:** Free bonuses expire, bonus stack limited
**Justification required:** WHY do the bonuses expire? Partner agreement, licensing, seasonal relevance
**Example justification:** "The 3 bonus trainings are available through Friday because our guest experts donated their time for launch week only."
**Best for:** Info products, supplement bundles with limited bonus inventory

### Type 6: Natural Urgency
**What it is:** Cost of delay — every day without the solution = more damage, lost opportunity, competitors acting
**Justification required:** What SPECIFICALLY gets worse with delay? Must be concrete, not vague
**Example justification:** "Every night of poor sleep compounds. Research shows chronic sleep deprivation increases cortisol by 37% within 14 days — and that cortisol drives the weight gain you're trying to stop."
**Best for:** Health (progressive conditions), financial (market windows), competitive (first-mover)

---

## TYPE A vs TYPE B URGENCY

### Type A (Long-Form Sales Page)

Urgency is **narrative-driven**. It builds throughout the page and intensifies near the close.

**Urgency section structure (50-300 words):**
- Section headline (urgency-framed, not generic)
- 1-2 paragraphs of justification copy (WHY the urgency exists)
- Specific deadline or constraint statement
- Consequence of inaction (what happens if they wait)
- Transition to close/CTA

**Natural urgency** is woven into earlier sections:
- Root cause narrative: "Every day this continues, the damage compounds..."
- Mechanism section: "The longer you wait, the harder it becomes to..."
- Story: "She wishes she had started sooner — those 6 months cost her..."

**P.S. urgency callback:** 1-2 sentences restating the urgency in the P.S. section

### Type B (Ecomm/PDP)

Urgency is **structural** — brief, scan-friendly, placed at decision points.

**Urgency elements:**
- Countdown timer context: "Sale ends in [timer]. Price returns to $XX after."
- Stock level indicator: "Only 47 left in stock" (if real)
- Price deadline badge: "Launch Price — Ends Sunday"
- Availability window: "Limited Edition — [Scent/Color] available through [Date]"
- Cart urgency: "Items in your cart are not reserved"

**Placement:**
- Product card: Stock level OR price deadline badge
- Above ATC button: Countdown timer context OR availability window
- Cart/Checkout: Cart urgency line
- Multiple locations allowed for Type B (unlike Type A where urgency lives in one section)

---

## URGENCY COMPATIBILITY MATRIX

Not all urgency types can coexist on the same page. Some combinations create trust-destroying contradictions.

| Combination | Compatible? | Notes |
|------------|------------|-------|
| Supply + Time | Yes (if independent) | "Batch is limited AND this price ends Friday" — works if both are independently justified |
| Supply + Price | Caution | "Low stock AND price going up" can feel like manufactured pressure |
| Time + Price | Yes (natural) | "Launch pricing ends Friday" = time-based AND price-based (same constraint, two angles) |
| Time + Bonus | Yes (natural) | "Bonuses expire Friday" = time + bonus (same deadline, different element) |
| Supply + Availability | No | "Limited stock AND limited spots" = contradictory signals for physical vs. access |
| Natural + Any | Yes | Natural urgency (cost of delay) complements any structural urgency type |
| 3+ types | Never | Max 2 urgency types per page. 3+ = distrust, pressure-selling signal |

---

## ANTI-SLOP WORD LIST (URGENCY-SPECIFIC)

The following words/phrases are **FORBIDDEN** in all urgency/scarcity copy:

```
CATEGORY 1 -- Fabricated Urgency Signals:
act now, don't miss out, hurry, last chance [without real deadline],
limited time offer [without specifying end], order now before it's too late,
this won't last, once it's gone it's gone [without real supply limit],
time is running out [without countdown]

CATEGORY 2 -- Pressure Selling Language:
you'd be crazy not to, you can't afford to wait, what are you waiting for,
don't let this slip away, you'll regret it, this is your only chance,
now or never

CATEGORY 3 -- Unverifiable Claims:
selling fast, almost sold out [without real inventory data],
thousands are buying right now, everyone is signing up,
42 people are viewing this right now [when fabricated]

CATEGORY 4 -- AI Telltales:
unlock, leverage, game-changing, revolutionary, groundbreaking,
transformative, unprecedented, cutting-edge, next-level,
don't miss this incredible opportunity

CATEGORY 5 -- Generic Deadline Language:
for a limited time, while supplies last [without batch data],
offer expires soon [without specific date], limited availability
[without specific capacity number]
```

---

## 8-POINT URGENCY AUDIT

Score each point 0 (fail) or 1 (pass). Minimum 7.0/10 to proceed (scoring: each point worth 1.25, scaled to 10).

**Justification Quality (3 points)**
1. Every urgency claim has an explicit, documented justification
2. Each justification references a real constraint (manufacturing, capacity, schedule, cost)
3. Justification copy would survive a skeptic asking "Why?" three times

**Copy Quality (3 points)**
4. Urgency copy is specific (named deadlines, exact numbers, concrete consequences)
5. Zero AI telltales or generic urgency language from the forbidden list
6. Urgency copy matches the page's voice direction (not more aggressive than the rest)

**Structural Quality (2 points)**
7. Maximum 2 urgency types used (more = distrust)
8. Urgency appears AFTER value is established (not before offer/pricing section)

**Scoring:**
- 8/8 = 10.0 (excellent)
- 7/8 = 8.75 (good — proceed)
- 6/8 = 7.5 (minimum — proceed with notes)
- 5/8 = 6.25 (FAIL — revise)
- Below 5 = rebuild urgency approach

---

## urgency-package.json SCHEMA

```json
{
  "schema_version": "1.0",
  "skill": "LP-13-urgency-scarcity",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",

  "urgency_present": true,
  "urgency_types_selected": [
    {
      "type_number": "[1-6]",
      "type_name": "[Supply Scarcity | Time-Based | Price-Based | Availability Window | Bonus Deadline | Natural Urgency]",
      "justification": "[1-2 sentence real reason this urgency exists]",
      "justification_source": "[brief data | LP-06 architecture | client input | product constraint]"
    }
  ],
  "urgency_type_count": "[1 or 2]",

  "type_a_urgency": {
    "section_headline": "[urgency section headline text]",
    "urgency_body_copy": "[full urgency section body copy]",
    "word_count": "[number]",
    "natural_urgency_callbacks": [
      {
        "target_section": "[section_id from LP-04]",
        "callback_text": "[1-2 sentences of natural urgency to weave into that section]"
      }
    ],
    "ps_urgency_callback": "[1-2 sentences for P.S. section]",
    "close_urgency_line": "[1 sentence urgency restatement for close section]"
  },

  "type_b_urgency": {
    "countdown_timer_context": {
      "timer_label": "[3-15 word label above/below countdown]",
      "explanation": "[1 sentence explaining what happens when countdown ends]",
      "placement": "[above_atc | product_card | banner]"
    },
    "stock_level_indicator": {
      "copy": "[e.g., 'Only 47 left in stock']",
      "placement": "[product_card | above_atc | cart]"
    },
    "price_deadline_badge": {
      "copy": "[e.g., 'Launch Price -- Ends Sunday']",
      "placement": "[product_card | price_display]"
    },
    "availability_window": {
      "copy": "[1-2 sentences about availability constraint]",
      "placement": "[product_card | above_description]"
    },
    "cart_urgency": {
      "copy": "[1 sentence cart-level urgency]",
      "placement": "cart"
    }
  },

  "urgency_support_copy": {
    "justification_paragraph": "[full paragraph explaining WHY the urgency/scarcity exists]",
    "consequence_of_delay": "[1-2 sentences on what happens if they wait]",
    "word_count": "[number]"
  },

  "validation": {
    "urgency_audit_score": "[X.X/10]",
    "justification_audit": "PASS",
    "fabricated_claims": 0,
    "urgency_type_count": "[1 or 2]",
    "anti_slop": "PASS",
    "all_gates_passed": true
  },

  "downstream_handoffs": {
    "lp_14_cta": "Urgency type + deadline/constraint for urgency-aware CTA button text and surrounding copy",
    "lp_15_assembly": "Urgency section placement, natural urgency callbacks for weaving, P.S. urgency line, close urgency line"
  }
}
```

---

## URGENCY-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] -- Urgency/Scarcity Summary

## Page Type: [Type A | Type B | Hybrid]

## Urgency Types Selected
1. [Type name] -- Justification: [1 sentence]
2. [Type name] -- Justification: [1 sentence]
[or: "1 type selected" / "No justified urgency -- urgency_present: false"]

## Urgency Copy

### Type A Section Copy
Headline: "[text]"
Body: [word count] words
Natural urgency callbacks: [count] sections
P.S. callback: [Y/N]

### Type B Elements
Countdown context: "[text]"
Stock level: "[text]"
Price deadline: "[text]"
Availability: "[text]"
Cart urgency: "[text]"
[Mark N/A for unselected types]

### Urgency Support Copy
Justification paragraph: [word count] words
Consequence of delay: "[text]"

## Validation
Urgency audit score: [X.X/10]
Justification audit: [PASS]
Fabricated claims: [0]
Anti-slop: [PASS]

## Downstream Handoffs
LP-14 (CTA Optimizer): Urgency type + constraint for CTA framing
LP-15 (Assembly): Section placement + callbacks + P.S. line
```

---

## FORBIDDEN BEHAVIORS

1. **Fabricated urgency** -- NEVER write urgency copy that cannot be traced to a real constraint. "Only 5 left!" when inventory is unlimited is a disqualifying violation.
2. **More than 2 urgency types** -- Max 2 per page. 3+ urgency signals = distrust. This is non-negotiable.
3. **Urgency before value** -- Urgency copy must appear AFTER the offer/pricing section. Pressure without established value = pressure selling.
4. **Generic countdown language** -- "Limited time offer" without a specific end date/time is forbidden. Countdowns must specify what happens when they end.
5. **Resetting countdowns** -- Never write copy that implies a countdown timer that resets per visitor. Deadlines are real or absent.
6. **Fake social proof urgency** -- "42 people viewing this right now" when fabricated. If real-time data exists, fine. If not, forbidden.
7. **Contradictory urgency signals** -- "Limited supply" + "Limited spots" on the same page = contradictory (physical product vs. access). Check compatibility matrix.
8. **Urgency without specificity** -- "Price going up soon" is forbidden. "Price increases to $97 on Monday, March 10th" is required.
9. **Skipping specimen loading** -- Specimens required before generation to avoid generic urgency patterns.
10. **Any AI telltale** from the forbidden word list -- immediate revision required.
11. **Urgency copy that is more aggressive than the rest of the page** -- urgency must match the established voice direction. A calm, authority-driven page cannot suddenly scream "ACT NOW!"
12. **Skipping the justification audit** -- Every claim must be traced. No exceptions.
