# LP-03: Above-Fold Architecture — Master Agent

> **Version:** 1.0
> **Skill:** LP-03-above-fold-architecture
> **Position:** Phase 2 — First Architecture Skill
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (brief + page type), LP-01 (conversion intelligence)
> **Output:** `above-fold-blueprint.json`

---

## PURPOSE

Engineer the **critical first screen** — the above-fold section that 70–80% of visitors use to decide stay vs. leave within the first 5 seconds.

For **Type A (Long-Form):** Determines headline territory, deck copy direction, hero image strategy, trust signal selection, and hook framework.

For **Type B (Ecomm/PDP):** Determines product title treatment, rating strip placement, hero image strategy, price display architecture, ATC button design brief, trust badge selection, and short description copy.

**The 8-Second Test:** The above-fold section must answer THREE questions before any scrolling:
1. What is this?
2. Who is this for?
3. Why should I care right now?

**Success Criteria:**
- Headline type selected from 7-type taxonomy with justification
- CTA language drafted with 3 emotional appeal variants
- Trust signal strategy defined (which signals, what order, what treatment)
- Hero image creative brief written (what to show and why)
- Above-fold score ≥ 7.0/10 against the 8-point above-fold audit

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate. It does NOT write final copy — it creates the blueprint that LP-07 (Hero Section Writer) executes.

---

## IDENTITY

**This skill IS:**
- The architectural blueprint for the first-screen experience
- The conversion-critical section that determines bounce rate
- The bridge between traffic intent and page promise
- A structural design brief, not final copy
- The highest-leverage single section on any landing page

**This skill is NOT:**
- The headline writing skill (LP-07 writes the final headline)
- The full page structure planner (LP-04 handles that)
- The social proof architect (LP-05 handles that)
- A visual design tool (outputs copy + structure brief only)

---

## STATE MACHINE

```
IDLE → TRIGGERED
  ↓
LAYER_0: Load upstream (brief, page type, conversion intelligence)
  ↓ [GATE_0: Required inputs present?]
LAYER_1: Page type analysis + above-fold pattern selection
  ↓ [GATE_1: Pattern selected with evidence?]
LAYER_2: Element design + copy direction
  → 2.1: Headline type selector
  → 2.2: Deck copy direction
  → 2.3: Hero image creative brief
  → 2.4: Trust signal architecture
  → 2.5: CTA language direction
  → 2.6: Price display architecture (Type B only)
  ↓ [GATE_2: All elements designed?]
LAYER_3: Above-fold audit + optimization
  → 3.1: 8-second test simulation
  → 3.2: Above-fold 8-point audit
  → 3.3: Anti-slop check
  ↓ [GATE_3: Score ≥ 7.0?]
LAYER_4: Package assembly
  → 4.1: above-fold-blueprint.json
  → 4.2: ABOVE-FOLD-SUMMARY.md
  → 4.3: execution-log.md
  ↓
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Input Loader | Load LP-00 brief, LP-01 intelligence | input-verification.md |
| 0.2: Specimen Loader | Load above-fold specimens by page type + vertical | specimen-load.md |
| 0.3: Pattern Library Loader | Load Type A/B above-fold pattern library | pattern-library.md |

### Layer 1: Pattern Selection

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Traffic Source Analyzer | Identify traffic temperature (cold/warm/hot) | traffic-analysis.md |
| 1.2: Awareness Stage Mapper | Map Schwartz awareness stage for headline approach | awareness-map.md |
| 1.3: Above-Fold Pattern Selector | Select best above-fold pattern from library | pattern-selection.md |

**GATE_1:** Pattern selected AND justified against traffic temp + awareness stage

### Layer 2: Element Design

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Headline Type Selector | Select from 7-type taxonomy with scoring | headline-type.md |
| 2.2: Deck Copy Direction | Specify promise expansion strategy | deck-direction.md |
| 2.3: Hero Image Brief | Write creative brief for hero visual | hero-image-brief.md |
| 2.4: Trust Signal Architecture | Select, sequence, and brief trust signals | trust-architecture.md |
| 2.5: CTA Language Direction | Draft 3+ CTA variants with emotional appeal map | cta-direction.md |
| 2.6: Price Display Architecture | (Type B only) Price block structure | price-display.md |

**GATE_2:** All required elements have output files. Type B requires 2.6. Type A does not.

### Layer 3: Audit

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: 8-Second Test | Simulate first-time visitor — answer 3 questions | eight-second-test.md |
| 3.2: Above-Fold Audit | Score against 8-point checklist | above-fold-audit.md |
| 3.3: Anti-Slop Check | Verify zero generic AI language in copy directions | anti-slop-check.md |

**GATE_3:** Above-fold audit score ≥ 7.0/10 AND anti-slop check passes AND 8-second test answers all 3 questions

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Blueprint Compiler | Assemble above-fold-blueprint.json | above-fold-blueprint.json |
| 4.2: Summary Writer | Write ABOVE-FOLD-SUMMARY.md | ABOVE-FOLD-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## HEADLINE TYPE TAXONOMY

Every above-fold headline falls into one of 7 types. The type determines the deck copy strategy and lead approach.

| Type | Definition | Use When | Awareness Stage |
|------|-----------|----------|-----------------|
| **T1: Direct Benefit** | "Lose 30 lbs in 90 Days Without Giving Up Your Favorite Foods" | High awareness, warm traffic, proven claim | Solution-Aware+ |
| **T2: Curiosity/Revelation** | "Harvard Study Reveals the #1 Reason Women Over 40 Struggle to Lose Weight" | Cold/warm traffic, secret/reason framing | Unaware to Problem-Aware |
| **T3: Problem-First** | "If You've Tried Every Diet and Still Can't Lose Weight, Read This" | Problem-aware audience, agitation-first | Problem-Aware |
| **T4: Warning/Alert** | "WARNING: The Popular 'Health Food' That's Secretly Sabotaging Your Metabolism" | Cold traffic, pattern interrupt | Unaware to Problem-Aware |
| **T5: Question** | "Are You Making This Dangerous Blood Sugar Mistake?" | Self-identification, curiosity gap | Problem-Aware |
| **T6: How-To/Discovery** | "How a Retired Research Chemist Discovered the Real Cause of Joint Pain at 63" | Story-first, mechanism curiosity | Problem-Aware |
| **T7: Number-Specific** | "57,432 Women Have Used This to Lose Their First 10 Pounds — Here's How" | Social proof-first, skeptic appeal | Solution-Aware |

### Deck Copy Strategy by Headline Type

| Headline Type | Deck Copy Direction |
|--------------|---------------------|
| T1 Direct Benefit | Mechanism hint + specificity addons ("...even if you've tried everything") |
| T2 Curiosity | Expand the curiosity gap, hint at the villain |
| T3 Problem-First | Validate the struggle, promise the revelation |
| T4 Warning | Agitate the danger, promise the solution |
| T5 Question | Answer the question PARTIALLY, promise full answer below |
| T6 How-To | Set up the story, establish the expert/Yoda |
| T7 Number-Specific | Expand the social proof, make it relevant to THIS reader |

---

## ABOVE-FOLD 8-POINT AUDIT

Score each point 0 (fail) or 1 (pass):

**Identity & Promise (2 points)**
1. Is the core product/offer identifiable in under 3 seconds?
2. Does the headline make a specific, credible promise (not generic)?

**Audience & Self-Selection (2 points)**
3. Does the above-fold section self-select the right audience?
4. Would the WRONG audience immediately recognize this isn't for them?

**Trust & Credibility (2 points)**
5. Is there at least ONE trust signal visible above the fold?
6. Is the trust signal specific (named publication, specific statistic) not generic?

**Conversion Ready (2 points)**
7. Is the primary CTA visible on first screen (desktop minimum; mobile required)?
8. Is the visual hierarchy clear — does the eye travel: Headline → Image/Trust → CTA?

**Scoring:**
- 8/8: Exceptional
- 6-7/8: Good — proceed
- 4-5/8: Needs revision before LP-07 execution
- Below 4: Structural rethink required

---

## TYPE B SPECIFIC: PRICE DISPLAY ARCHITECTURE

### Price Block Element Order

For ecomm PDPs, the price block appears above the fold and must follow this hierarchy:

```
VARIANT PRICE (context):
  ~~$79.99~~ $59.99 [SAVE $20 (25%)]
              ↑         ↑
        Bold accent   Small badge
          color       or inline

MULTI-PACK SELECTOR (optional but high-AOV):
  ◉ Buy 3 Get 1 Free — $44.99/bottle (Best Value)
  ○ Buy 2 — $49.99/bottle (Save 20%)
  ○ Buy 1 — $59.99/bottle

SUBSCRIPTION OPTION (if applicable):
  □ Subscribe & Save 20% ($47.99/month)

SAVINGS MESSAGING:
  "You save $60 with the 3-pack"
```

### Price Display Rules

1. **ALWAYS show original price struck through** — establishes anchor
2. **ALWAYS show savings as both % and dollar amount** — different buyers prefer different formats
3. **NEVER show price without established value first** (on long-form)
4. **For Type B:** Price CAN appear above fold because images/rating = value signal
5. **Bundle options** increase AOV by 35–60% when presented with per-unit savings

---

## TRUST SIGNAL SELECTION FRAMEWORK

### Trust Signal Types by Persuasiveness (Health/Supplement Context)

| Rank | Signal Type | Example | When to Use |
|------|------------|---------|-------------|
| 1 | Clinical study citation | "In a double-blind study, 87% of participants..." | If clinical data exists |
| 2 | Medical authority | "Developed with Dr. [Name], MD, Harvard Medical School" | If credentialed creator |
| 3 | Named media coverage | "As featured in Forbes, CNN, Dr. Oz Show" | If legitimate coverage |
| 4 | Third-party testing | "Third-Party Tested · GMP Certified · NSF Approved" | Always include for supplements |
| 5 | Volume social proof | "47,328 customers served" or "★★★★★ 4.8 (2,847 reviews)" | Once 50+ reviews exist |
| 6 | Money-back guarantee badge | "[90-Day] [Branded Guarantee Name]" | Always include |
| 7 | Security/payment badges | "🔒 Secured by SSL · Powered by Stripe" | E-commerce only |

### Above-Fold Trust Signal Selection Rules

**Type A (Long-Form):**
- Select 2–3 signals max for trust bar
- Prioritize: media coverage + certification + authority
- Position: Immediately below headline OR as horizontal bar above headline

**Type B (Ecomm):**
- Rating strip: Always immediately below product title
- Trust badge row: Below ATC button
- Select: 3–4 specific badges (guarantee + shipping + certification + security)
- Never: Generic "100% Satisfaction" without specific details

---

## FORBIDDEN BEHAVIORS

1. ❌ Selecting headline type without referencing awareness stage from LP-01
2. ❌ Skipping the 8-second test — this is the entire purpose of the skill
3. ❌ Generic trust signals ("High Quality," "Satisfaction Guaranteed") — must be SPECIFIC
4. ❌ Price display without anchor/comparison (Type B)
5. ❌ CTA direction with only one emotional appeal — minimum 3 variants required
6. ❌ Hero image brief that says "product photo" — must specify context, emotion, subject
7. ❌ Above-fold blueprint proceeding to LP-07 with score below 7.0
8. ❌ Generic AI telltales in copy directions (revolutionary, game-changing, transform, unlock)
9. ❌ Treating Type A and Type B identically — they have fundamentally different above-fold requirements
10. ❌ Missing trust signals for a health/supplement product — category requires trust before purchase
