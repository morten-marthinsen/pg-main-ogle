# ARENA-LAYER.md — Lead Skill (11-lead)

> **Version:** 2.1
> **Layer Position:** 2.5 (between Layer 2: Lead Construction and Layer 3: Lead Refinement)
> **Type:** Multi-Perspective Generation + Judgment + Human Selection
> **Dependency:** Requires Gate 2 PASS (lead components constructed)
> **Output:** Selected lead candidate for refinement
> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

Generate **E5 Campaign Lead candidates** through 7 competitors (6 legendary copywriter personas + The Architect), each bringing their signature approach to the emotional sale. The lead makes the EMOTIONAL sale, not the logical/proof sale — it's a 45-second elevator pitch for the unique mechanism that ends with the prospect thinking: "This sounds amazing. Now prove it works for me."

**Why Arena for Leads:**
- Leads are the ATTENTION → ENGAGEMENT conversion point
- Different copywriter approaches create radically different emotional arcs
- Halbert's entertainment-first hook differs completely from Ogilvy's credibility-first approach
- Makepeace's flow architecture differs from Schwartz's sophistication calibration
- A single-perspective lead misses opportunities that multi-perspective generation captures
- Human selection ensures the lead matches the campaign's emotional tone

---

## ARENA PERSONAS FOR LEAD GENERATION

### 1. Clayton Makepeace — Flow Architect

**Signature Lead Approach:**
- Opens with irresistible promise + curiosity gap
- Builds through anticipation → delay → payoff rhythm
- Every sentence flows inevitably to the next
- Hook must stop the reader cold, then pull them in

**Lead Generation Focus:**
- Attention lock architecture (how does the opening STOP the reader?)
- Flow engineering (does each sentence pull to the next?)
- Emotional escalation (does the arc build properly?)
- Promise compression (is the core promise crystallized in the hook?)

**Questions This Persona Asks:**
- "Would I stop scrolling for this hook?"
- "Does the lead flow like a waterslide or feel like climbing stairs?"
- "Is the emotional sale achieved by the end?"
- "Does the prospect NEED to know more after reading this?"

---

### 2. Gary Halbert — Entertainment Hook Master

**Signature Lead Approach:**
- Opens with pattern interrupt or curiosity bomb
- Makes the lead FUN to read, not work
- Personal, conversational, slightly irreverent
- Hooks through entertainment, not features

**Lead Generation Focus:**
- Pattern interrupt strength (does the opening SHOCK attention?)
- Readability (is this FUN or does it feel like homework?)
- Personality injection (does the lead have VOICE?)
- "Greased chute" effect (zero friction from start to finish)

**Questions This Persona Asks:**
- "Would I read this for entertainment even if I wasn't the target?"
- "Does this sound like a human talking or a brochure?"
- "Is there a 'hook within the hook' that creates layers of curiosity?"
- "Would I share this opening with a friend?"

---

### 3. Eugene Schwartz — Sophistication Calibrator

**Signature Lead Approach:**
- Calibrates lead type to market sophistication level
- Stage 1-2: Bold claims, direct promise
- Stage 3-4: Mechanism emphasis, new angle
- Stage 5: Story-driven, identity-focused

**Lead Generation Focus:**
- Sophistication match (does the lead match where the market IS?)
- Claim calibration (bold vs. proof-first based on stage)
- Mechanism emphasis (how much mechanism tease vs. promise?)
- Positioning freshness (does this feel NEW to the market?)

**Questions This Persona Asks:**
- "What stage is this market, and does this lead match?"
- "Would this lead work if competitors copied it tomorrow?"
- "Is the mechanism tease calibrated to sophistication level?"
- "Does this feel like something the market has seen before?"

---

### 4. David Ogilvy — Credibility-First Architect

**Signature Lead Approach:**
- Opens with authority signal or institutional proof
- Credibility established BEFORE big claims
- Clarity above cleverness
- Every word earns its place

**Lead Generation Focus:**
- Authority establishment (is credibility front-loaded?)
- Clarity (does every prospect immediately understand the promise?)
- Word economy (is every word essential?)
- Promise specificity (is the benefit concrete and measurable?)

**Questions This Persona Asks:**
- "Does this lead establish WHY I should believe immediately?"
- "Would a skeptic give this lead a chance?"
- "Is every word carrying weight, or is there fat to trim?"
- "Is the promise specific enough to be memorable?"

---

### 5. Craig Clemens — Vagueness Calibrator

**Signature Lead Approach:**
- Problems are deliberately VAGUE so prospect fills in their experience
- Results are SPECIFIC and vivid
- Emotional resonance over logical description
- Prospect sees THEMSELVES in the lead

**Lead Generation Focus:**
- Problem vagueness (does the prospect fill in their own pain?)
- Result specificity (are outcomes vivid and concrete?)
- Self-identification (does the prospect say "that's ME"?)
- Emotional projection (does the lead trigger personal memories?)

**Questions This Persona Asks:**
- "Is the problem description vague enough for self-projection?"
- "Are the results specific enough to be believable and desirable?"
- "Would three different prospects fill in three different personal stories?"
- "Does the lead let the reader do the emotional work?"

---

### 6. Gary Bencivenga — Proof-Ready Architect

**Signature Lead Approach:**
- Lead teases proof without delivering it
- Creates anticipation for evidence
- Mechanism named and positioned as NEW
- Every claim in the lead is PROVABLE downstream

**Lead Generation Focus:**
- Proof tease (does the lead promise evidence is coming?)
- Claim defensibility (can every claim in the lead be proven later?)
- Mechanism positioning (is the mechanism framed as the reason to believe?)
- Anticipation architecture (does the prospect WANT to see the proof?)

**Questions This Persona Asks:**
- "Does this lead make promises I can actually PROVE later?"
- "Is the prospect anticipating evidence by the end of the lead?"
- "Does the mechanism feel like the KEY to making this work?"
- "Would a skeptic keep reading to see the proof?"

---

## EXECUTION PROTOCOL

**See `~system/protocols/ARENA-CORE-PROTOCOL.md` for the complete 2-round + audience evaluation execution protocol.**

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
- **2 rounds** of competition with audience evaluation + analytical briefs between rounds
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

## LEAD JUDGING CRITERIA

| Criterion | Weight | Scoring Focus |
|-----------|--------|---------------|
| Hook Strength | 20% | Pattern interrupt power, attention capture, curiosity creation |
| Four E5 Element Completeness | 20% | All 4 present + effectively communicated with mechanism connection |
| Emotional Sale Achievement | 15% | Does lead end at "this sounds amazing, prove it works"? |
| Open Loop Quality | 15% | Strategic placement, strength of tease, closure location planned |
| Georgi Compliance | 10% | All DO items present, zero DON'T violations |
| Clemens Calibration | 10% | Problems vague, results specific, self-identification achieved |
| Conversational Flow | 10% | Sounds spoken not written, natural voice, greased chute effect |

**Scoring Rubric (Per Criterion):**

#### Hook Strength (20%)
| Score | Description |
|-------|-------------|
| 9-10 | Would stop ANY scrolling reader — irresistible pattern interrupt + curiosity bomb |
| 7-8 | Strong hook that captures attention — prospect WANTS to read more |
| 5-6 | Functional hook that identifies topic — prospect MIGHT continue |
| 3-4 | Weak hook — generic opening, could be for any product |
| 1-2 | No hook — product/feature dump from the start |

#### Four E5 Element Completeness (20%)
| Score | Description |
|-------|-------------|
| 9-10 | All 4 elements present, each powerfully connected to mechanism, seamlessly integrated |
| 7-8 | All 4 elements present with mechanism connections, minor integration issues |
| 5-6 | 3-4 elements present but one or more feels forced or disconnected |
| 3-4 | 2 elements missing or present but generic (not mechanism-connected) |
| 1-2 | E5 framework not followed — lead is feature dump or generic promise |

#### Emotional Sale Achievement (15%)
| Score | Description |
|-------|-------------|
| 9-10 | Prospect EMOTIONALLY sold — "This sounds amazing, prove it works for me" achieved |
| 7-8 | Strong emotional engagement — prospect curious and hopeful |
| 5-6 | Some emotional engagement but ends at "interesting" not "amazing" |
| 3-4 | Primarily logical — information delivered but no emotional arc |
| 1-2 | No emotional sale — dry, corporate, or over-explained |

#### Open Loop Quality (15%)
| Score | Description |
|-------|-------------|
| 9-10 | 3+ powerful loops, each creating urgency to continue, closure locations planned |
| 7-8 | 2 strong loops with clear closure strategy, maintains attention pull |
| 5-6 | 1-2 loops present but weak tease strength or vague closure planning |
| 3-4 | Loops mentioned but don't create genuine desire to continue |
| 1-2 | No open loops — lead is self-contained with no forward pull |

#### Georgi Compliance (10%)
| Score | Description |
|-------|-------------|
| 9-10 | All 7 DO items present, zero DON'T violations, master-level execution |
| 7-8 | All DO items present, zero DON'T violations, solid execution |
| 5-6 | Most DO items present, zero DON'T violations |
| 3-4 | Some DO items missing OR minor DON'T violation present |
| 1-2 | Multiple DON'T violations — mechanism explained, story over-told, etc. |

#### Clemens Calibration (10%)
| Score | Description |
|-------|-------------|
| 9-10 | Problems appropriately vague (prospect fills in), results vividly specific |
| 7-8 | Good balance — problems allow self-identification, results concrete |
| 5-6 | Minor calibration issues — problems slightly too specific OR results slightly vague |
| 3-4 | Calibration inverted — specific problems, vague results |
| 1-2 | No Clemens principle applied — either all vague or all specific |

#### Conversational Flow (10%)
| Score | Description |
|-------|-------------|
| 9-10 | Sounds like someone TALKING — natural, human, would work read aloud |
| 7-8 | Strong conversational quality — minimal "written" feel |
| 5-6 | Mixed — some parts natural, some parts feel scripted |
| 3-4 | Mostly "written" — corporate voice, formal structure |
| 1-2 | Completely "written" — no human voice, brochure language |

### Critique-Specific Guidance

**What The Critic should particularly target in Lead Arena:**
- Missing E5 elements (New/Different, Simple/Easy, Works Quickly, Predictable/Reliable)
- Lead that explains the mechanism (Georgi DON'T violation)
- Lead that tells the discovery story (Georgi DON'T violation)
- Weak hook (doesn't stop the scroll in first sentence)
- No open loops (nothing pulling reader forward to body copy)

---

## GATE 2.5 CRITERIA

**Gate 2.5 PASSES when:**
- [ ] All 7 competitor leads generated (complete, 350-800 words each)
- [ ] All leads scored on 7 criteria with documented rationale
- [ ] At least 1 lead scores ≥ 8.5/10 weighted average
- [ ] Human has explicitly selected a lead candidate
- [ ] Selected lead ready for Layer 3 refinement

**Gate 2.5 FAILS when:**
- No leads score ≥ 8.5/10 → regenerate with adjusted parameters
- Human rejects all candidates → gather feedback, regenerate
- Human requests full regeneration → return to Phase 1
- Human provides custom direction → develop custom lead

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases in Leads:**
- "unlock the secret" / "discover the hidden" / "transform your life"
- "revolutionary breakthrough" / "game-changing" / "cutting-edge"
- "what if I told you" / "imagine if you could" / "picture this"
- "comprehensive solution" / "holistic approach" / "synergistic"
- Generic mechanism references: "this breakthrough," "this discovery," "this secret" (must NAME it)
- Generic speed claims: "fast results," "quick improvements" (must be SPECIFIC)

**If any lead contains auto-reject phrases:**
1. Flag the specific violations
2. Remove from ranking consideration
3. Regenerate that persona's lead with violation-free language
4. Re-score only if regeneration produces clean output

---

## E5 ELEMENT ENFORCEMENT

**Every lead MUST communicate all 4 E5 elements:**

### New and Different
- Must communicate the mechanism is NEW (not same old approach)
- Must connect to specific mechanism feature
- Example: "This has nothing to do with [common approaches]"

### Simple and Easy
- Must communicate mechanism is SIMPLE to implement
- Must address complexity objection
- Example: "Just one simple adjustment" / "No complicated routines"

### Works Quickly
- Must communicate speed of results
- Must be SPECIFIC (not "fast" — actual timeframe)
- Example: "See results on your very first [attempt]" / "Within 7 days"

### Predictable and Reliable
- Must communicate reliability/safety
- Must address "but will it work for ME?" objection
- Example: "Works regardless of [limiting factor]" / "Thousands of [avatar] have already..."

**Verification Check:**
```
FOR EACH lead:
    IF new_different NOT present → FAIL
    IF simple_easy NOT present → FAIL
    IF works_quickly NOT present → FAIL
    IF predictable_reliable NOT present → FAIL
    IF any element NOT connected to mechanism → FAIL
    ELSE → PASS
```

---

## GEORGI COMPLIANCE VERIFICATION

**DO Checklist (all 7 must be present):**
1. [ ] Call out problems
2. [ ] Promise solution
3. [ ] Hint at mechanism
4. [ ] Hint at counter-intuitive information
5. [ ] Brief credibility mention
6. [ ] Tease discovery story
7. [ ] Address skepticism

**DON'T Checklist (all must be FALSE):**
1. [ ] Explains how mechanism works in detail → VIOLATION
2. [ ] Explains why old solutions fail in detail → VIOLATION
3. [ ] Goes deep into discovery story → VIOLATION
4. [ ] Explains what the product is → VIOLATION

**If any DON'T violation detected:**
- Lead automatically scores ≤ 5/10 on Georgi Compliance
- Violation flagged for human awareness
- Regeneration recommended

---

## OUTPUT TO LAYER 3

**Selected Lead Package:**
```yaml
arena_selected_lead:
  selected_persona: [persona name]
  selection_method: [human_direct|human_modified|regenerated]
  overall_score: [weighted average]

  lead_classification:
    lead_type: [from ranked output]
    opening_device: [from ranked output]
    vault_reference: [TIER1 pattern influence]

  hook:
    sentence: [verbatim hook]
    word_count: [count]
    attention_score: [from scoring]

  four_e5_elements:
    new_and_different:
      present: true
      text: [verbatim passage]
      mechanism_connection: [how it connects]
    simple_and_easy:
      present: true
      text: [verbatim passage]
      mechanism_connection: [how it connects]
    works_quickly:
      present: true
      text: [verbatim passage]
      mechanism_connection: [how it connects]
    predictable_and_reliable:
      present: true
      text: [verbatim passage]
      mechanism_connection: [how it connects]

  open_loops:
    - loop_id: "OL-001"
      text: [verbatim]
      loop_type: [type]
      closure_location: [where closed]
    - loop_id: "OL-002"
      text: [verbatim]
      loop_type: [type]
      closure_location: [where closed]

  georgi_compliance:
    do_checklist: [all 7 verified]
    dont_checklist: [all FALSE]
    compliance_status: pass

  clemens_calibration:
    problem_vagueness: pass
    result_specificity: pass
    calibration_status: pass

  full_lead_text: [complete 350-800 word lead]

  refinement_priorities:
    - [specific enhancement from opportunities]
    - [specific enhancement from opportunities]

  human_selection_notes: [any notes from human during selection]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: generative_full_draft (competitors write complete pieces from scratch, not variations of Layer 2 draft). Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer for Lead skill: 6-persona generation (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga), 7 lead-specific judging criteria (Hook Strength 20%, E5 Completeness 20%, Emotional Sale 15%, Open Loop Quality 15%, Georgi Compliance 10%, Clemens Calibration 10%, Conversational Flow 10%), 8.5/10 minimum threshold, E5 element enforcement, Georgi compliance verification |

---

## CRITICAL REMINDERS

1. **The lead makes the EMOTIONAL sale, not the logical sale** — every persona must achieve "this sounds amazing, prove it works"
2. **7 complete leads required** — no shortcuts, no partial drafts, no "similar to" references
3. **8.5/10 minimum threshold** — elevated from standard 7.0 for Arena quality
4. **Human selection is BLOCKING** — no auto-proceed, no timeout selection
5. **All 4 E5 elements mandatory** — lead fails if any element missing
6. **Georgi DON'T violations = auto-fail** — zero tolerance for explaining mechanism or telling discovery story
7. **Name the mechanism** — generic references ("this breakthrough") are auto-reject
