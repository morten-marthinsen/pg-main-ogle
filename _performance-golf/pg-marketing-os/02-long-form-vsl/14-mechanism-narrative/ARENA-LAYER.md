# ARENA-LAYER.md — 14-mechanism-narrative

**Version:** 2.1
**Parent Skill:** 14-mechanism-narrative
**Position:** Layer 2.5 (between Draft Generation and Refinement)
**Type:** Evaluation & Selection Framework
**Dependency:** ARENA-PERSONA-PANEL.md (master specification)

> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 3-round execution protocol.

---

## PURPOSE

After Layer 2 generates draft mechanism narrative prose, this layer evaluates multiple narrative variations through 7 competitors (6 legendary copywriter personas + The Architect), judges each against mechanism-narrative-specific criteria, ranks candidates, and presents top performers for human selection.

**Position in Pipeline:**
```
Layer 1 (Strategic Classification)
    → Layer 2 (Draft Generation)
    → Layer 2.5 (Arena Evaluation) ← YOU ARE HERE
    → Layer 3 (Refinement & Polish)
    → Layer 4 (Validation & Assembly)
```

**Why This Layer Exists:**
Mechanism narratives create the "aha moment" — where the prospect suddenly understands WHY they've struggled and WHY this solution will work. Multiple narrative approaches can achieve this understanding, but they differ dramatically in:
- Graspability (how easily the prospect comprehends the mechanism)
- Naming memorability (how dramatic and memorable the mechanism introduction is)
- Metaphor anchor quality (how clear the central simplifying image is)
- "Think about it" simplification (how well complex ideas are reduced to simple insights)
- Proof integration (how naturally evidence supports the explanation)

The Arena ensures multiple approaches are generated, evaluated objectively, and the best candidate is selected before refinement resources are invested.

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See ~system/SYSTEM-CORE.md Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent with full-draft generation in its own 200K context. See `~system/protocols/ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: generative_full_draft`:
- **Competitors write COMPLETE pieces from scratch** — NOT variations of a Layer 2 draft
- Layer 2 draft output = reference material and structural guide, NOT a template
- Upstream packages (root cause, mechanism, promise, big idea, structure) are the primary input
- Competitors are NOT constrained to follow the Layer 2 draft's specific approach
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per output)
- **Targeted revision** (each competitor fixes their identified weakness)
- **3 rounds** of competition with learning briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### Full-Draft Mode Specifics
- Each competitor generates their OWN complete version from the upstream strategic packages
- The Layer 2 draft is available as ONE reference among many, not THE template
- Competitors may take radically different approaches (different structure, different emphasis, different tone)
- This produces TRUE creative diversity, not minor variations

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

## MECHANISM NARRATIVE JUDGING CRITERIA

#### Criterion 1: Mechanism Graspability (20%)

**What it measures:** How easily the prospect can understand the mechanism. The "12-year-old test" — can a smart 12-year-old understand how it works? Complexity is the enemy; clarity is the goal.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Mechanism explanation is immediately graspable; reader "gets it" on first read; no re-reading required; complex concept made simple without dumbing down; 12-year-old could explain it to a friend |
| 7-8 | Mechanism clear and understandable; may require brief pause to absorb; essentially graspable; 12-year-old would understand with minimal help |
| 5-6 | Mechanism somewhat clear but some confusion likely; reader may need to re-read sections; some jargon or complexity remains |
| 3-4 | Mechanism confusing; multiple re-reads needed; jargon not explained; 12-year-old would struggle significantly |
| 1-2 | Mechanism incomprehensible; reader gives up; technical language without simplification; fails 12-year-old test completely |

---

#### Criterion 2: Naming Memorability (20%)

**What it measures:** How dramatic, memorable, and quotable the mechanism naming moment is. The name must pass the "water cooler test" — can the prospect explain it to a friend using the name?

**5 Naming Architectures:**
- `metaphorical_rename` — Names based on metaphor (e.g., "Master Switch")
- `proprietary_branded` — Branded proprietary name (e.g., "The T-Factor")
- `scientific_label` — Scientific-sounding name (e.g., "AMPK Activation")
- `villain_contrast` — Named in contrast to villain (e.g., "The Cortisol Solution")
- `historical_origin` — Named for historical/discovery origin (e.g., "The Okinawan Secret")

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Naming moment is dramatic and memorable; buildup creates anticipation; name itself is quotable and explains the mechanism; water cooler test passes easily; reader feels they've learned something nameable |
| 7-8 | Naming moment effective; name is memorable; buildup present; water cooler test passes with minor context needed |
| 5-6 | Name introduced but moment is flat; little buildup; name is forgettable or generic; water cooler test requires significant explanation |
| 3-4 | Naming moment incidental; name is technical or unmemorable; no drama; water cooler test fails |
| 1-2 | No clear naming moment; mechanism has no memorable name; reader couldn't explain to friend |

---

#### Criterion 3: Metaphor Anchor Quality (15%)

**What it measures:** How clear, graspable, and effective the central metaphor is. Every mechanism must have ONE anchoring metaphor that makes the concept immediately understandable. This is Simplification Technique 2 (single_metaphor_anchor).

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Central metaphor is perfect — immediately graspable, vivid, and memorable; reader's mental model clicks into place; metaphor carries through explanation; "AMPK is like a light switch" clarity |
| 7-8 | Metaphor is clear and effective; reader understands the concept through the metaphor; minor opportunities to strengthen |
| 5-6 | Metaphor present but weak or unclear; partially helps understanding; doesn't fully anchor the concept |
| 3-4 | Metaphor confusing or mixed; multiple competing metaphors dilute understanding; doesn't simplify |
| 1-2 | No clear metaphor or metaphor makes explanation more confusing; abstract concept remains abstract |

---

#### Criterion 4: Simplification Effectiveness (15%)

**What it measures:** How well the 6 simplification techniques are applied to make the mechanism graspable without dumbing it down.

**6 Simplification Techniques:**
- `binary_reduction` — On/off, open/shut framing
- `single_metaphor_anchor` — One graspable image (covered in Criterion 3)
- `layered_analogy_chain` — Build from simple to complex
- `just_think_shortcut` — "Just think about it this way..."
- `relatable_body_knowledge` — What reader already knows about their body
- `numbered_system` — Named formula or system

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Multiple simplification techniques expertly layered; "Think about it" moment present and powerful; reader goes from confused to crystal clear; techniques complement each other |
| 7-8 | Good simplification technique usage; "Think about it" moment present; reader achieves clarity; 1-2 techniques well-applied |
| 5-6 | Some simplification attempted but inconsistent; may over-simplify or under-simplify; "Think about it" moment weak or missing |
| 3-4 | Minimal simplification; mechanism remains complex; techniques not applied effectively |
| 1-2 | No simplification techniques applied; mechanism presented in raw technical form; reader lost |

---

#### Criterion 5: "Aha Moment" Clarity (10%)

**What it measures:** Whether there is a clear, identifiable moment where understanding clicks — where the prospect suddenly "gets it." This is the emotional payoff of the explanation.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Clear, powerful "aha moment"; reader can point to exact sentence/paragraph where understanding clicked; emotional response of realization; "Oh, THAT'S why..." feeling |
| 7-8 | "Aha moment" present and identifiable; understanding clicks; emotional response achieved; slightly less dramatic than ideal |
| 5-6 | Understanding develops gradually but no clear "aha moment"; reader gets it eventually but without emotional click |
| 3-4 | Unclear if reader ever fully understands; no identifiable moment of realization |
| 1-2 | No "aha moment"; reader ends explanation confused; no emotional payoff |

---

#### Criterion 6: Proof Integration (10%)

**What it measures:** How naturally proof elements (institutional references, studies, data, expert validation) are woven into the mechanism explanation. Proof must feel like part of the explanation, not bolted on.

**6 Proof Integration Strategies:**
- `institutional_stacking` — Layer institutional credibility (Harvard, Mayo Clinic, etc.)
- `escalating_proof_ladder` — Build from small proof to large
- `self_proving_mechanism` — Mechanism proves itself through logic
- `personal_transformation_anchor` — Use personal story as proof
- `competitor_debunking_proof` — Prove by showing why others fail
- `visual_demonstration` — Show the mechanism working

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Proof woven seamlessly into explanation; reader absorbs proof while learning mechanism; institutional references feel natural; no "proof dump" sections |
| 7-8 | Proof integrated well; most proof feels natural; 1-2 moments where proof could flow better |
| 5-6 | Proof present but occasionally feels inserted; some "now let me prove this" sections that interrupt flow |
| 3-4 | Proof bolted on; appears as lists or citations outside narrative flow; interrupts explanation |
| 1-2 | No proof integration or proof feels completely disconnected from mechanism explanation |

---

#### Criterion 7: Product Bridge Smoothness (10%)

**What it measures:** How smoothly the mechanism narrative transitions to the product introduction. The bridge must feel natural and inevitable — not like a pitch shift.

**4 Bridge Patterns:**
- `mechanism_is_product` — Mechanism and product are inseparable
- `formula_activates_mechanism` — Product formula activates the mechanism
- `information_teaches_mechanism` — Product teaches how to use mechanism
- `proof_first_bridge` — Proof of mechanism leads naturally to product

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Bridge is seamless; reader feels naturally led from understanding mechanism to wanting product; no "now I'm selling" shift; bridge sentence is natural transition |
| 7-8 | Bridge smooth; transition clear; minor opportunity to strengthen flow; reader doesn't feel jarred |
| 5-6 | Bridge present but somewhat abrupt; reader notices the shift from education to product; passable but not elegant |
| 3-4 | Bridge feels forced; clear "now I'm going to sell you something" moment; rapport breaks |
| 1-2 | No bridge or bridge completely fails; jarring shift from mechanism to product; reader feels manipulated |

---

### Critique-Specific Guidance

**What The Critic should particularly target in Mechanism Narrative Arena:**
- Mechanism explanation failing 12-year-old comprehension test
- Flat naming moment (no anticipation → reveal structure)
- Missing metaphor anchor (no graspable image)
- Missing "Think about it" simplification moment
- Hedge words in mechanism explanation (may, could, potentially, might)

---

## INTEGRATION REQUIREMENTS

### Inputs Required from Layer 2
- Initial 5-phase mechanism narrative draft
- Mechanism confirmed from human checkpoint
- Narrative type classification from Layer 1
- Framing patterns selected from Layer 1
- Emotional arc design from Layer 1
- E-level strategy from Layer 1
- Root cause handoff integration

### Outputs to Layer 3
- Selected mechanism narrative (full 5-phase prose)
- Arena scores and rationale
- Human selection documented
- Specific refinement recommendations based on judging notes
- Metaphor anchor locked for threading
- Product bridge sentence for Skill 15 handoff

### Connection to ARENA-PERSONA-PANEL.md
This layer inherits:
- 7-competitor generation framework
- Persona lens definitions
- Anti-slop enforcement
- Human checkpoint protocol
- Scoring methodology

Mechanism-narrative-specific elements:
- 7 judging criteria (Graspability, Naming Memorability, Metaphor Anchor, Simplification Effectiveness, "Aha Moment" Clarity, Proof Integration, Product Bridge Smoothness)
- Criterion weights optimized for mechanism narrative quality
- Mechanism-specific scoring rubrics
- E-level alignment verification
- 12-year-old comprehension test application

---

## CONSTRAINTS

1. **NEVER skip human selection** — This checkpoint is BLOCKING
2. **NEVER proceed without metaphor anchor** — Every candidate must have clear central metaphor
3. **NEVER proceed without naming moment** — Mechanism must be dramatically introduced
4. **NEVER proceed without "think about it" simplification** — Complex ideas must be reduced
5. **NEVER proceed without product bridge** — Transition to Skill 15 is mandatory
6. **ALWAYS verify E-level alignment** — Explanation depth must match E-level strategy
7. **ALWAYS verify emotional arc continuity** — Must continue from root cause handoff state
8. **ALWAYS verify 12-year-old comprehension** — Mechanism must pass graspability test

---

## E-LEVEL ALIGNMENT VERIFICATION

Before any candidate can be ranked, verify E-level strategy compliance:

| E-Level | Narrative Strategy | Verification |
|---------|-------------------|--------------|
| E2 | Amplify claims — focus on WHAT it does, not deep HOW | Check explanation is outcome-focused, not process-deep |
| E3 | Reframe emphasis — repositioning more than education | Check reframing present, education moderate |
| E4 | Maximum explanation depth — full mechanism education | Check comprehensive explanation with all techniques |
| E5 | Paradigm shift — challenge existing mental models | Check worldview-shifting explanation, not incremental |

**E-level mismatch = candidate flag for adjustment**

---

## FAILURE MODES

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| All candidates fail 12-year-old test | CRITICAL | Criterion 1 scores | Regenerate with stronger simplification mandate |
| No dramatic naming moments | HIGH | Criterion 2 scores | Regenerate with naming architecture focus |
| No clear metaphor anchors | HIGH | Criterion 3 scores | Regenerate with metaphor-first approach |
| Missing "think about it" moments | MEDIUM | Criterion 4 scores | Regenerate with simplification technique mandate |
| No identifiable "aha moments" | MEDIUM | Criterion 5 scores | Regenerate with emotional payoff focus |
| Proof bolted on across candidates | MEDIUM | Criterion 6 scores | Regenerate with proof integration strategy |
| Product bridges feel like pitch shifts | HIGH | Criterion 7 scores | Regenerate with bridge pattern focus |
| Human timeout | MEDIUM | No response after reminder | Send checkpoint reminder, wait |
| All candidates below threshold | MEDIUM | Weighted scores | Diagnose lowest criteria, regenerate with targeted guidance |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: generative_full_draft (competitors write complete pieces from scratch, not variations of Layer 2 draft). Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (3-round mandatory competition, adversarial critique-revise, 7 competitors including The Architect, learning briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer for mechanism narrative with 7 judging criteria (Mechanism Graspability 20%, Naming Memorability 20%, Metaphor Anchor Quality 15%, Simplification Effectiveness 15%, "Aha Moment" Clarity 10%, Proof Integration 10%, Product Bridge Smoothness 10%), E-level alignment verification, 12-year-old comprehension test, 6-persona generation, BLOCKING human selection checkpoint |
