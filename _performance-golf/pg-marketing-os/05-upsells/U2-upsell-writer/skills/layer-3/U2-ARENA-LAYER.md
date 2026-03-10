# U2-ARENA-LAYER.md — 1-Click Upsell Writer (U2)

> **Version:** 1.0
> **Layer Position:** 2.5 (between Layer 2: CAIRO Draft Generation and Layer 4: Validation)
> **Type:** Multi-Perspective Generation + Judgment + Human Selection
> **Dependency:** Requires GATE_2 PASS (CAIRO draft complete, all 5 sections present, word count valid)
> **Output:** Selected upsell page candidate for validation
> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE upsell pages from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 3-round execution protocol.

---

## PURPOSE

Generate **1-click upsell page candidates** through 7 competitors, each bringing a differentiated approach to post-purchase upsell copy. The upsell page extends the buyer's front-end purchase decision using CAIRO structure — it does NOT sell from scratch. Every competitor must honor the 5 Laws of Upsell while differentiating on HOW they extend the buying decision.

**Why Arena for Upsells:**
- The same CAIRO structure can be executed with radically different emphasis (congruence-heavy vs story-heavy vs proof-heavy vs urgency-driven)
- Post-purchase tone is a spectrum — different competitors calibrate warmth vs directness vs showmanship differently
- The Amplify and Reason sections especially benefit from multiple creative approaches
- 55% of specimens use standard congratulate openers, but the remaining 45% prove alternative approaches can outperform
- Human selection ensures the upsell matches the brand voice and emotional continuity from the front-end

---

## ARENA COMPETITORS FOR UPSELL GENERATION

### 1. The Congruence Purist

**Approach:** Maximum front-end extension, minimal new selling. Every sentence reinforces the purchase they just made. The upsell feels like a natural extension of the checkout flow, not a new sales conversation.

**Upsell Generation Focus:**
- Mechanism name appears 3-5 times across the page
- Root cause language echoed in Congratulate AND Amplify sections
- Promise extended with precise logical bridge ("You just got X. Y makes X work 2x faster because...")
- Tone is warm, celebratory, almost understated — the product sells itself through congruence
- Minimal new claims — everything derives from what FE already established

**Signature Moves:**
- Opens Congratulate with the EXACT promise language from FE ("You just secured the [exact FE promise]...")
- Amplify section dimensionalizes FE benefits (not upsell benefits)
- Reason section explains upsell as a "discovery we made while developing [FE product name]"
- Offer section positions upsell as "the complete version" of what they already bought

**Weakness to Watch:** Can feel too understated — may score low on Intrigue if the extension is TOO seamless and doesn't create enough desire for the upsell itself.

---

### 2. The Story Extender

**Approach:** Narrative bridge from front-end story to new product. Uses a short, compelling story in the Reason section that connects emotionally to the FE purchase and creates a "second chapter" feeling.

**Upsell Generation Focus:**
- Congratulate section names the FE story elements (the discovery, the person, the moment)
- Amplify section future paces using NARRATIVE (not just benefit bullets)
- Intrigue section teases a story continuation ("But what I haven't told you yet...")
- Reason section is the centerpiece — a 200-400 word story that emotionally justifies the upsell
- Story must feel like the "next chapter," not a new book

**Signature Moves:**
- Callbacks to FE story elements (characters, settings, turning points)
- The Reason section reads like a natural continuation of whatever story/narrative the FE used
- Discovery-origin story: "When we first developed [mechanism], we noticed something unexpected..."
- Emotional anchoring: the story creates a feeling, then the offer capitalizes on that feeling

**Weakness to Watch:** Can overweight the Reason section (>400w) at the expense of the Offer. Story-driven upsells can also drift into new territory that breaks congruence if the story introduces new problems or mechanisms.

---

### 3. The Proof Stacker

**Approach:** Lead with the 1-2 proof elements. Social proof, authority endorsement, or specific results positioned early and prominently. Let the evidence do the selling while maintaining post-purchase warmth.

**Upsell Generation Focus:**
- Congratulate section includes a proof element ("Join over 14,000 people who've already...")
- Amplify section uses specific results as future pacing anchors ("Our users report X within Y days")
- Intrigue section teases insider data or study results
- Proof is WOVEN, not stacked — appears as natural supporting evidence, not a testimonial block
- Maximum 2 proof elements, but positioned for maximum impact

**Signature Moves:**
- Opens with social proof number in Congratulate ("You just joined 14,000+ [avatar] who...")
- Specific percentage or result in Amplify ("87% of users report [benefit] within [timeframe]")
- The Reason section uses proof AS the reason: "The data made it obvious we had to offer this"
- Testimonial quote (1 max) in Offer section as conversion element

**Weakness to Watch:** Can feel clinical or impersonal if proof overwhelms the warmth. Post-purchase upsells need WARMTH first, proof second. Also risky if proof elements are weak — heavy proof framing + weak evidence = credibility damage.

---

### 4. The Urgency Driver

**Approach:** Scarcity, supply chain, stock-out framing — but calibrated for post-purchase context. NOT fake countdown timers. Legitimate, congruent urgency: "We can only hold this pricing while you're on this page" or "Limited supply of the physical component."

**Upsell Generation Focus:**
- Congratulate section establishes value and exclusivity of what they just bought
- Amplify section emphasizes SPEED of results (urgency through desire, not fear)
- Intrigue section uses legitimate scarcity: supply constraints, manufacturing batches, coaching capacity
- Reason section explains WHY the special pricing/availability exists (Cialdini "because")
- Offer section includes explicit page-only or session-only framing

**Signature Moves:**
- "This page is the only place you'll see this offer at this price" (page-only positioning)
- Supply-based scarcity for physical products ("We only manufactured 500 units in this batch")
- Capacity-based scarcity for service products ("Our coaching team can only take 50 new clients")
- Time-calibrated: urgency through DESIRE ("Get results in 7 days instead of 30") not FEAR

**Weakness to Watch:** Urgency in post-purchase context is a razor's edge. Too much = feels like a high-pressure sales page (Law 1 violation). Must be LEGITIMATE urgency grounded in real constraints, not manufactured fear. Tone Shift score will suffer if urgency overrides warmth.

---

### 5. The Value Calculator

**Approach:** Mathematical breakdown of savings, ROI, and cost-per-day. Turns the decision into a MATH problem where the answer is obvious. "This costs $0.90/day and saves you $X/month."

**Upsell Generation Focus:**
- Congratulate section references the FE investment in dollar terms
- Amplify section dimensionalizes results in QUANTIFIABLE terms (dollars saved, hours recovered, measurable outcomes)
- Intrigue section introduces the value equation: "There's a way to get 3x the value from what you just bought for pennies on the dollar"
- Reason section builds the ROI case with specific numbers
- Offer section is the masterpiece: multi-layer price anchoring, per-day breakdown, value stack math, savings calculation

**Signature Moves:**
- Dollar-dimensionalized benefits: "Save $43/month on [related expense]" or "Recover 5 hours/week"
- Side-by-side comparison: "What you'd pay separately vs what you pay today"
- Per-unit economics: "$0.90/day" or "$2.24 per round of golf" or "$0.15 per serving"
- Value stack with individual pricing: each bonus priced, totaled, contrasted against offer price
- "You're already spending $X on [related thing]. This replaces that for $Y/month less."

**Weakness to Watch:** Can feel transactional and cold if the math overwhelms the emotion. Needs strong Congratulate and Amplify sections to establish warmth before the calculator turns on. Risk of sounding like a spreadsheet, not a celebration.

---

### 6. The Problem Revealer

**Approach:** "There's one more thing..." — introduces an adjacent problem that the FE purchase doesn't fully solve. NOT a new problem (that breaks congruence) but a DIMENSION of the existing problem they didn't know about.

**Upsell Generation Focus:**
- Congratulate section validates FE purchase enthusiastically, then pivots: "But there's something most people don't realize..."
- Amplify section future paces FE benefits BUT introduces the gap: "The only thing that could slow you down is..."
- Intrigue section is the centerpiece: the reveal of the adjacent dimension
- Reason section explains why FE product was designed to solve the MAIN problem, and this solves the secondary dimension
- Must maintain congruence: same root cause, same mechanism family, just a different FACET

**Signature Moves:**
- "Here's a FACT that most [avatar] don't know..." (Donnie French pattern)
- Reveals an adjacent problem that feels like insider knowledge, not a new sales pitch
- Positions upsell as "the missing piece" — not a new purchase but the COMPLETION of the first one
- "We almost included this in [FE product] but realized it deserved its own focus"

**Weakness to Watch:** Highest congruence risk of all 7 competitors. The "new dimension" can easily drift into a genuinely new problem (congruence break). Must be tightly mapped to the SAME root cause and mechanism family. If it feels like a new pitch, it fails.

---

### 7. The Speed Optimizer

**Approach:** "Get results faster/better" — pure acceleration framing. The FE product works. The upsell makes it work FASTER. Every word is about time compression and result amplification.

**Upsell Generation Focus:**
- Congratulate section emphasizes the FE timeline: "You'll start seeing results within [FE timeframe]"
- Amplify section introduces the acceleration: "But what if you could see those results in HALF the time?"
- Intrigue section teases the speed differential: "Our fastest responders all have one thing in common..."
- Reason section tells a short story about why speed matters (compound effect, momentum, consistency)
- Offer section frames upsell as a time multiplier, not a new product

**Signature Moves:**
- Time-based framing: "30 days → 14 days" or "3 months → 6 weeks"
- "Our fastest responders" social proof — segmenting by speed, not just results
- "2x" or "3x" multiplier language — upsell as an accelerant, not an add-on
- Time-savings calculation in Offer: "Save 16 days of waiting" or "Results in half the time"

**Weakness to Watch:** Can feel like a speed claim without substance if the Reason section doesn't explain HOW the acceleration works. Also risks implying the FE product is slow — must frame as "great gets better," not "slow gets fast." Amplify section must celebrate FE speed BEFORE introducing acceleration.

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each competitor runs as a separate teammate agent with full-draft generation in its own 200K context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE upsell pages from scratch** — NOT variations of the Layer 2 draft
- Layer 2 CAIRO draft = reference material and structural guide, NOT a template
- Upstream inputs (U0 handoff, mechanism package, congruence map, proof inventory, CAIRO structure selection) are the primary inputs
- Competitors are NOT constrained to follow the Layer 2 draft's specific approach
- **7 competitors** generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per output)
- **Targeted revision** (each competitor fixes their identified weakness)
- **3 rounds** of competition with learning briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### Input Requirements from Upstream Layers

Each competitor receives:
- U0 handoff spec (product, position, pricing, congruence thread, narrative arc)
- Mechanism package (mechanism name, explanation, proof framework)
- Layer 1.1 congruence map (exact FE language for mechanism, root cause, promise)
- Layer 1.2 position analysis (buyer psychological state, sequence position)
- Layer 1.3 proof inventory (1-2 selected proof elements)
- Layer 1.4 structure selection (CAIRO variant, proportions, opening pattern)
- Layer 2 CAIRO draft (reference only — NOT a template)
- Persona voice specimens (per 0.2.7 loader)
- Soul.md (if available)

### Position-Aware Instructions

**Position 1 (First upsell after purchase):**
- Standard congratulate opening recommended (55% of specimens validate this pattern)
- Buyer trust is HIGH, momentum is HIGH, patience is MODERATE
- Full CAIRO structure with balanced proportions
- Strongest proof element goes here (buyer hasn't seen upsell proof yet)

**Position 2+ (Second or later upsell):**
- Warning/confession opener OPTION available (US-09, US-12, US-17 specimen pattern)
- Buyer trust still high but patience is LOWER — get to the point faster
- Compressed CAIRO: shorter Amplify, shorter Reason, more direct Offer
- Consider opening with Intrigue instead of Congratulate (pattern disruption after standard first upsell)
- Word count target: lower half of 500-2000 range (500-1200w)

### Warning/Confession Opener Option (Position 2+ Only)

For Position 2+, competitors MAY use a warning/confession opener instead of standard congratulate:

```
"I need to be honest with you about something..."
"Before you go to your download page, I have a confession..."
"I almost didn't show you this page..."
```

This pattern disrupts the buyer's expectation (they've already seen one congratulate-style upsell) and recaptures attention through novelty. Only effective at Position 2+ because the buyer needs to have seen the standard pattern first for the disruption to register.

---

## UPSELL JUDGING CRITERIA

| Criterion | Weight | Scoring Focus |
|-----------|--------|---------------|
| Congruence | 40% | Front-end mechanism referenced by name, root cause language preserved verbatim, promise extended (not replaced), language register matches FE |
| Extension Logic | 30% | How naturally the upsell extends the front-end decision. Does it feel like one decision continued or a new sales pitch? Logical bridge quality. |
| Tone Shift | 20% | Post-purchase warmth vs pre-purchase selling. Celebration + logic + extension, NOT conviction + urgency + persuasion. Respect for the buyer. |
| Proof Quality | 10% | 1-2 proof elements effectively positioned. Not a proof cascade. Evidence woven into CAIRO structure, not stacked. |

### Scoring Rubric (Per Criterion)

#### Congruence (40%)

| Score | Description |
|-------|-------------|
| 9-10 | Mechanism named 3+ times. Root cause language verbatim. Promise extension feels inevitable — "of course this is the next step." Language register indistinguishable from FE. Buyer would not know these were written separately. |
| 7-8 | Mechanism named 2+ times. Root cause language present with minor variation. Promise clearly extended. Language register consistent. Feels like the same brand/voice. |
| 5-6 | Mechanism named once. Root cause language paraphrased. Promise present but extension logic requires a mental leap. Some register shift detectable. |
| 3-4 | Mechanism named generically ("this system"). Root cause reframed. Promise feels like a new promise, not an extension. Register shift obvious. |
| 1-2 | No mechanism reference. New root cause. New promise. Feels like a different company wrote this page. Complete congruence break. |

#### Extension Logic (30%)

| Score | Description |
|-------|-------------|
| 9-10 | The upsell feels like ONE decision extended: "You decided to fix X. This makes X work faster/better/more completely." The logical bridge is seamless. Buyer thinks "of course" not "wait, what?" |
| 7-8 | Strong logical bridge. Upsell clearly extends the FE decision. Minor moments where the connection requires a small inferential step. |
| 5-6 | Logical bridge present but visible — buyer can see the connection but it doesn't feel effortless. Some sections feel like selling, not extending. |
| 3-4 | Weak bridge. Upsell feels like a related but separate purchase decision. Buyer must make TWO decisions, not extend one. |
| 1-2 | No bridge. Upsell is a completely separate pitch. Might as well be a different product from a different funnel. |

#### Tone Shift (20%)

| Score | Description |
|-------|-------------|
| 9-10 | Pure post-purchase warmth. Congratulatory, logical, extension-framed. Buyer feels celebrated, not pitched. Clean binary choice with zero manipulation. Reads like a trusted advisor suggesting one more thing, not a salesperson closing. |
| 7-8 | Strong post-purchase tone. Mostly warmth and logic. Minor moments of selling energy that don't dominate. Binary choice clean. |
| 5-6 | Mixed tone. Some sections feel post-purchase, others feel like front-end selling. Urgency creeps in. Binary choice mostly clean. |
| 3-4 | Primarily pre-purchase tone. PAS structure emerging. Urgency or fear present. Binary choice may include subtle manipulation. |
| 1-2 | Full sales page tone. Problem-agitation-solution structure. Fear-based urgency. Guilt-trip CTA. Buyer feels ambushed, not celebrated. |

#### Proof Quality (10%)

| Score | Description |
|-------|-------------|
| 9-10 | Exactly 1-2 proof elements, perfectly positioned within CAIRO structure. Proof feels organic, not bolted on. Supports the extension logic without dominating. Social proof number or authority endorsement used strategically. |
| 7-8 | 1-2 proof elements, well-positioned. Minor awkwardness in integration. Proof supports the argument effectively. |
| 5-6 | 1-2 proof elements present but positioning is suboptimal — feels separate from CAIRO flow. Or proof is generic ("thousands of happy customers") rather than specific. |
| 3-4 | 3+ proof elements (cascade — too many for upsell context). Or no proof elements at all. |
| 1-2 | Full proof cascade (testimonial block, study citations, authority stacking) — front-end sales page proof pattern applied to upsell. Or claims made with zero supporting evidence. |

---

## ANTI-SLOP ENFORCEMENT (U2-SPECIFIC)

**Auto-Reject Phrases in Upsell Copy:**
- "revolutionary breakthrough" / "game-changing" / "cutting-edge" / "state-of-the-art"
- "unlock the secret" / "discover the hidden truth" / "the secret they don't want you to know"
- "imagine struggling with" / "picture your frustration" / "are you tired of" (pre-purchase PAS language)
- "this changes everything" / "you'll never look back" / "life will never be the same"
- "limited time only" / "act now before it's too late" / "don't miss this" (fear-based urgency — unless legitimate supply constraint documented)
- "comprehensive solution" / "holistic approach" / "synergistic blend"
- Generic mechanism references: "this system," "this breakthrough," "this method," "this discovery" (must use exact mechanism name)
- "No, I don't want to [desirable outcome]" (guilt-trip CTA)

**If any upsell page contains auto-reject phrases:**
1. Flag the specific violations
2. Count violations (1-2 = revise those phrases; 3+ = regenerate from scratch)
3. Replacement must maintain the same function without slop language
4. Re-score only if clean

---

## CRITIQUE-SPECIFIC GUIDANCE

**What The Critic should particularly target in U2 Arena:**

1. **PAS Structure Leaking In:** Any section that reads like problem → agitation → solution rather than congratulate → amplify → intrigue → reason → offer. The most common failure mode — the model defaults to sales page structure.

2. **Congruence Breaks:** Scan for new mechanism names, paraphrased root cause language, promises that REPLACE rather than EXTEND the FE promise. The Congruence criterion is 40% — this is the most important thing to get right.

3. **Tone Violations:** Flag any pre-purchase selling language. Fear-based urgency. "Imagine your problem." Guilt-trip CTAs. The post-purchase tone is a binary: either the buyer feels CELEBRATED or they feel PITCHED. There is no middle ground.

4. **Missing CAIRO Sections:** Particularly watch for collapsed Intrigue (merged into Amplify or Reason) and rushed Congratulate (< 30 words or purely perfunctory). All 5 sections must be distinct and functional.

5. **Over-Proving:** More than 2 proof elements. Testimonial blocks. Study citations. Authority stacking. The buyer already trusts you — heavy proof signals you don't trust their trust.

6. **Word Count Drift:** Flag if approaching 2000-word ceiling or if individual sections exceed proportions (Congratulate > 100w, Amplify > 300w, Intrigue > 150w, Reason > 400w, Offer > 300w).

---

## GATE 2.5 CRITERIA

**Gate 2.5 PASSES when:**
- [ ] All 7 competitor upsell pages generated (complete, 500-2000 words each)
- [ ] All pages follow CAIRO structure with 5 identifiable sections
- [ ] All pages scored on 4 criteria with documented rationale
- [ ] At least 1 page scores >= 8.0/10 weighted average
- [ ] Human has explicitly selected an upsell page candidate
- [ ] Selected page ready for Layer 4 validation

**Gate 2.5 FAILS when:**
- No pages score >= 8.0/10 -> follow all-below-threshold protocol per ~system/protocols/ARENA-CORE-PROTOCOL.md
- Human rejects all candidates -> gather feedback, regenerate with new direction
- Human requests full regeneration -> return to Layer 2
- Human provides custom direction -> develop custom upsell page

---

## OUTPUT TO LAYER 4

**Selected Upsell Page Package:**

```yaml
arena_selected_upsell:
  selected_competitor: "[competitor name]"
  selection_type: "[pure | hybrid]"
  selection_method: "[human_direct | human_modified | regenerated]"
  overall_score: "[weighted average]"

  scores:
    congruence: "[score]"
    extension_logic: "[score]"
    tone_shift: "[score]"
    proof_quality: "[score]"

  cairo_structure:
    congratulate:
      word_count: "[count]"
      mechanism_named: "[yes/no]"
      loop_opened: "[yes/no]"
    amplify:
      word_count: "[count]"
      future_pacing_method: "[five senses / narrative / quantified]"
    intrigue:
      word_count: "[count]"
      intrigue_type: "[insider / confession / reveal / scarcity]"
    reason:
      word_count: "[count]"
      story_type: "[discovery / data / customer / founder]"
    offer:
      word_count: "[count]"
      bonuses_count: "[0-3]"
      price_anchor_present: "[yes/no]"
      per_day_breakdown: "[yes/no]"
      guarantee_present: "[yes/no]"
      binary_choice_clean: "[yes/no]"

  congruence_thread:
    mechanism_name_count: "[times mechanism name appears]"
    root_cause_verbatim: "[yes/no]"
    promise_extended: "[yes/no]"
    register_consistent: "[yes/no]"

  full_upsell_text: "[complete 500-2000 word upsell page]"

  human_selection_notes: "[any notes from human during selection]"
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-26 | Initial creation — 7 upsell-specific competitors, 4 weighted scoring criteria with rubrics, position-aware instructions, anti-slop enforcement, critique guidance, CAIRO validation |

---

## CRITICAL REMINDERS

1. **The upsell is NOT a sales page** — every competitor must honor this. PAS structure = automatic score penalty.
2. **Congruence is 40% of the score** — it dominates. A beautifully written upsell that breaks congruence LOSES to an adequate upsell with perfect congruence.
3. **7 complete upsell pages required** — no shortcuts, no partial drafts, no "similar to" references.
4. **8.0/10 minimum threshold** — below this, follow all-below-threshold protocol.
5. **Human selection is BLOCKING** — no auto-proceed, no timeout selection.
6. **All 5 CAIRO sections mandatory** — pages missing sections fail structural validation.
7. **Name the mechanism** — generic references ("this system") are auto-reject.
8. **Post-purchase tone or nothing** — warmth, logic, extension. Not conviction, urgency, persuasion.
9. **Maximum 2 proof elements** — this is a post-purchase page. Heavy proof signals distrust.
10. **Clean binary choice** — "Yes, Add To Order" / "No thanks." No guilt. No manipulation.
