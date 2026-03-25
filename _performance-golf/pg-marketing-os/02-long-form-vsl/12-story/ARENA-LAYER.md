# ARENA-LAYER.md — Story Skill (12-story)

> **Version:** 2.1
> **Layer Position:** 2.5 (between Layer 2: Story Construction and Layer 3: Story Refinement)
> **Type:** Multi-Perspective Generation + Judgment + Human Selection
> **Dependency:** Requires Gate 2 PASS (story sections constructed)
> **Output:** Selected story candidate for refinement
> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

Generate **Campaign Story candidates** through 7 competitors (6 legendary copywriter personas + The Architect), each bringing their signature narrative approach to making the mechanism FEEL real. The story is not decoration — it is the vehicle through which the prospect emotionally validates the campaign thesis. They don't just believe the argument; they FEEL it through the protagonist's journey.

**Why Arena for Stories:**
- Stories require distinct creative voices to find the most compelling narrative
- Clemens' scientific mechanism setup differs fundamentally from Ogilvy's credible authority
- Halbert's wild curiosity hooks differ from Bencivenga's proof-first architecture
- A single-perspective story misses narrative opportunities
- Human selection ensures the story matches the campaign's emotional tone
- Different niches respond to radically different story approaches

---

## ARENA PERSONAS FOR STORY GENERATION

### 1. Clayton Makepeace — Narrative Flow Architect

**Signature Story Approach:**
- Stories as performance — every beat timed for maximum impact
- Data cascade stories with escalating proof points
- Beta-tester/live experiment framing
- "Specificity as proof" — document EVERYTHING
- Transparency paradox — acknowledge limitations to build credibility

**Story Generation Focus:**
- Flow architecture (does the story pull the reader forward inevitably?)
- Data integration (are proof points woven into narrative naturally?)
- Escalation rhythm (does each beat top the last?)
- Reader urgency (is there oxygen-debt throughout?)

**Questions This Persona Asks:**
- "Does every paragraph make the reader MORE eager to read the next?"
- "Is there a data cascade that builds belief through accumulation?"
- "Does the story PROVE something, not just tell it?"
- "Would a skeptical reader find this compelling?"

---

### 2. Gary Halbert — Entertainment Narrative Master

**Signature Story Approach:**
- Stories must ENTERTAIN first — before they persuade
- Pattern interrupts and curiosity bombs throughout
- Personal, conversational, slightly wild
- Reader should want to share the story with friends
- Vulnerability as connection device

**Story Generation Focus:**
- Entertainment value (is this FUN to read?)
- Curiosity architecture (does the story create irresistible hooks?)
- Voice and personality (does the story have LIFE?)
- Shareability (would you tell this story at a dinner party?)

**Questions This Persona Asks:**
- "Would I read this for entertainment even if I wasn't the target market?"
- "Are there moments that make me LAUGH or GASP?"
- "Does this story have personality, or does it read like a case study?"
- "Is the protagonist someone I want to spend time with?"

---

### 3. Eugene Schwartz — Market-Calibrated Narrator

**Signature Story Approach:**
- Story sophistication matches market sophistication
- Stage 1-2: Bold transformation stories
- Stage 3-4: Mechanism discovery stories with credibility anchors
- Stage 5: Identity-shift stories, subtle sophistication
- Claims calibrated to what the market will believe

**Story Generation Focus:**
- Sophistication calibration (does the story match where the market IS?)
- Claim believability (are story claims calibrated to market cynicism?)
- Positioning freshness (does this story feel NEW to this market?)
- Competitive differentiation (is this story distinct from what they've heard?)

**Questions This Persona Asks:**
- "What sophistication stage is this market, and does this story match?"
- "Would a jaded prospect in this market find this story credible?"
- "Does the story position the mechanism as genuinely NEW?"
- "Would competitors struggle to tell a similar story?"

---

### 4. David Ogilvy — Credibility-First Storyteller

**Signature Story Approach:**
- Authority and credibility established BEFORE big claims
- Facts and specifics over emotional manipulation
- Every detail must be verifiable
- Clarity above cleverness
- Institutional proof integrated naturally

**Story Generation Focus:**
- Authority establishment (is credibility front-loaded?)
- Factual accuracy (is every claim verifiable?)
- Clarity (does every reader understand the story instantly?)
- Professional tone (would this appear in a respected publication?)

**Questions This Persona Asks:**
- "Would a journalist find this story credible enough to report?"
- "Is every specific detail in this story verifiable?"
- "Does the authority figure have credentials that matter?"
- "Is the story clear enough for any reader to follow?"

---

### 5. Craig Clemens — Scientific Mechanism Storyteller

**Signature Story Approach:**
- Science-backed mechanism reveals through narrative
- "12-year-old language" — complex ideas made instantly graspable
- Binary reframes — simple on/off, open/closed conceptualization
- Authority establishment before mechanism reveal
- Branded mechanism naming for memorability

**Story Generation Focus:**
- Mechanism clarity (is the science accessible to anyone?)
- Binary simplicity (is there a clear on/off, before/after frame?)
- Authority positioning (is the expert credible before revealing?)
- Branded naming (is the mechanism memorable and ownable?)

**Questions This Persona Asks:**
- "Would a 12-year-old understand how this mechanism works?"
- "Is there a clear binary (on/off, blocked/flowing) they can visualize?"
- "Is the expert established as credible before the reveal?"
- "Will they remember the mechanism name tomorrow?"

**Note:** Voice patterns to be refined from persona specimen files once extracted.

---

### 6. Gary Bencivenga — Proof-Architected Narrator

**Signature Story Approach:**
- Story as evidence delivery system
- Every narrative beat builds toward proof
- Mechanism revelation as story climax
- Claims in story are PROVABLE
- Story creates anticipation for upcoming evidence

**Story Generation Focus:**
- Proof architecture (does the story BUILD toward evidence?)
- Claim defensibility (can everything in the story be proven?)
- Mechanism positioning (is the mechanism the hero of the story?)
- Anticipation creation (does the story make proof feel inevitable?)

**Questions This Persona Asks:**
- "Does this story make the upcoming proof section feel EARNED?"
- "Is every claim in this story something I can back up with evidence?"
- "Does the mechanism emerge as the clear REASON this worked?"
- "Would a skeptic finish this story wanting to see the proof?"

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
- **Adversarial critique** before scoring (The Critic identifies at most ONE weakest element per output; may report no_material_weakness if output is genuinely strong)
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

## STORY JUDGING CRITERIA

| Criterion | Weight | Scoring Focus |
|-----------|--------|---------------|
| Narrative Transportation | 20% | Reader feels IN the world, sensory immersion |
| Emotional Arc Quality | 20% | Progression from current state to belief/desire |
| Mechanism Revelation Naturalness | 15% | Mechanism emerges from narrative, not inserted |
| Suspense & Pacing | 15% | Tension points, breathlessness, oxygen-debt |
| Carlton Compliance | 10% | All 9 principles applied |
| Proof Integration | 10% | Proof woven naturally, not bolted on |
| Story Function Achievement | 10% | Prospect FEELS mechanism is real |

**Scoring Rubric (Per Criterion):**

#### Narrative Transportation (20%)
| Score | Description |
|-------|-------------|
| 9-10 | Reader completely IN the story world — can see, hear, feel everything happening |
| 7-8 | Strong immersion — most readers would feel present in the narrative |
| 5-6 | Partial immersion — some vivid moments, but reader awareness persists |
| 3-4 | Weak immersion — story reads as description, not experience |
| 1-2 | No immersion — flat telling without sensory engagement |

#### Emotional Arc Quality (20%)
| Score | Description |
|-------|-------------|
| 9-10 | Perfect arc from prospect's state to "believes mechanism is real and wants it" |
| 7-8 | Strong arc — emotional progression clear, ends at belief/desire |
| 5-6 | Functional arc — some emotional movement but doesn't fully land |
| 3-4 | Weak arc — emotions mentioned but not FELT by reader |
| 1-2 | No arc — flat emotional register throughout |

#### Mechanism Revelation Naturalness (15%)
| Score | Description |
|-------|-------------|
| 9-10 | Mechanism emerges INEVITABLY from narrative — feels discovered, not announced |
| 7-8 | Natural emergence — revelation flows from story logic |
| 5-6 | Somewhat natural — revelation works but transition noticeable |
| 3-4 | Artificial — mechanism feels inserted into story |
| 1-2 | Jarring — mechanism revelation breaks narrative flow |

#### Suspense & Pacing (15%)
| Score | Description |
|-------|-------------|
| 9-10 | Breathless — reader afraid to stop, 3+ strategic tension points |
| 7-8 | Strong pacing — 2+ tension points, maintains urgency |
| 5-6 | Functional pacing — some tension but occasional flat spots |
| 3-4 | Weak pacing — story drags, tension dissipates |
| 1-2 | No pacing — flat throughout, no urgency |

#### Carlton Compliance (10%)
| Score | Description |
|-------|-------------|
| 9-10 | All 9 Carlton principles masterfully applied |
| 7-8 | All 9 principles present, solid execution |
| 5-6 | 6-8 principles present, minor violations |
| 3-4 | 4-5 principles present, multiple gaps |
| 1-2 | Carlton principles largely ignored |

**Carlton 9-Point Checklist:**
1. Three-line structure (setup, action, moral)
2. Transporting (reader IN the world)
3. Breathless prose (afraid to exhale)
4. Excess trimmed (nothing unnecessary)
5. "Here's what that means for YOU" segue
6. About the reader, not the writer
7. Conversational (sounds spoken)
8. Empathy present (understands prospect)
9. Reader FEELS something (happiness, alarm, astonishment, greed)

#### Proof Integration (10%)
| Score | Description |
|-------|-------------|
| 9-10 | Proof woven seamlessly — feels like natural part of story |
| 7-8 | Proof integrated well — supports narrative without breaking it |
| 5-6 | Proof present but slightly separate from narrative |
| 3-4 | Proof bolted on — feels like interruption |
| 1-2 | No proof integration or completely separate from story |

#### Story Function Achievement (10%)
| Score | Description |
|-------|-------------|
| 9-10 | Prospect FEELS mechanism is real and wants it for themselves |
| 7-8 | Strong function — prospect believes mechanism works |
| 5-6 | Partial function — interesting story but doesn't fully prove mechanism |
| 3-4 | Weak function — story doesn't connect to mechanism effectively |
| 1-2 | Function failed — story doesn't serve persuasion purpose |

### Critique-Specific Guidance

**What The Critic should particularly target in Story Arena:**
- Mechanism revelation that feels inserted, not discovered
- Missing Carlton compliance elements (especially "here's what that means for YOU")
- Flat emotional arc (no progression from prospect's state to belief/desire)
- Missing vulnerability/Cry for Help moment
- Story that reads as case study, not experience (low transportation)

---

## GATE 2.5 CRITERIA

**Gate 2.5 PASSES when:**
- [ ] All 7 competitor stories generated (complete, all beats present)
- [ ] All stories scored on 7 criteria with documented rationale
- [ ] At least 1 story scores ≥ 8.5/10 weighted average
- [ ] Human has explicitly selected a story candidate
- [ ] Selected story ready for Layer 3 refinement

**Gate 2.5 FAILS when:**
- No stories score ≥ 8.5/10 → regenerate with adjusted parameters
- Human rejects all candidates → gather feedback, regenerate
- Human requests full regeneration → return to Phase 1
- Human provides custom direction → develop custom story

---

## ANTI-SLOP ENFORCEMENT

**Auto-Reject Phrases in Stories:**
- "little did I know" / "everything changed" / "that's when I realized"
- "I couldn't believe my eyes" / "my jaw dropped" / "I was speechless"
- "fast forward to today" / "long story short" / "to make a long story short"
- "revolutionary breakthrough" / "game-changing discovery" / "life-changing"
- Generic descriptions: "beautiful," "amazing," "incredible" without specifics
- "A breakthrough moment" / "a turning point" without showing it
- "I never imagined" / "beyond my wildest dreams"

**If any story contains auto-reject phrases:**
1. Flag the specific violations
2. Remove from ranking consideration
3. Regenerate that persona's story with violation-free language
4. Re-score only if regeneration produces clean output

---

## CARLTON COMPLIANCE VERIFICATION

Every story MUST pass the Carlton 9-Point Checklist:

| Principle | Requirement |
|-----------|-------------|
| 1. Three-line structure | Setup (tease), Action (fulfillment), Moral (punchline) present |
| 2. Transporting | Reader feels IN the world you create |
| 3. Breathless prose | Reader afraid to exhale, afraid to miss detail |
| 4. Excess trimmed | Nothing that doesn't need to be there |
| 5. "Here's what that means for YOU" | Explicit segue connecting story to reader's life |
| 6. About the reader | Reader sees THEMSELVES, not just the protagonist |
| 7. Conversational | Sounds spoken, not written |
| 8. Empathy present | Story demonstrates understanding of prospect's experience |
| 9. Reader FEELS something | Happiness, alarm, astonishment, or greed evoked |

**Verification Check:**
```
FOR EACH story:
    carlton_score = 0
    FOR EACH principle IN [1-9]:
        IF principle PRESENT → carlton_score += 1
    IF carlton_score < 7 → FLAG for improvement
    IF carlton_score < 5 → FAIL Carlton compliance
```

---

## MECHANISM REVELATION ENFORCEMENT

**Every story MUST have natural mechanism revelation:**

**Revelation Must:**
- Emerge from the narrative flow (not be announced/inserted)
- Feel DISCOVERED, not TOLD
- Connect to the protagonist's journey/experience
- Create an "aha moment" for the reader
- Name the mechanism explicitly

**Revelation Must NOT:**
- Interrupt the narrative flow
- Feel like an advertisement inserted into a story
- Appear without narrative setup
- Be vague about what the mechanism IS

**Naturalness Test:**
```
IF mechanism_revelation:
    reads_as_advertisement → FAIL
    interrupts_narrative → FAIL
    emerges_from_story_logic → PASS
    feels_discovered → PASS
```

---

## OUTPUT TO LAYER 3

**Selected Story Package:**
```yaml
arena_selected_story:
  selected_persona: [persona name]
  selection_method: [human_direct|human_modified|regenerated]
  overall_score: [weighted average]

  story_classification:
    story_type: [from ranked output]
    story_format: [from ranked output]
    vault_reference: [TIER1 pattern influence]

  protagonist:
    name: [protagonist name]
    role: [protagonist type]
    prospect_mirror_elements: [list]

  story_beats:
    - beat_id: [id]
      beat_type: [type]
      sequence_position: [int]
      content_summary: [summary]
      tension_level: [low/medium/high/peak]

  carlton_compliance:
    three_line_structure: true
    transporting: true
    breathless_prose: true
    excess_trimmed: true
    means_for_you_segue: true
    about_reader: true
    conversational: true
    empathy_present: true
    reader_feels_something: true
    compliance_status: pass

  mechanism_revelation:
    text: [verbatim passage]
    naturalness_score: [from scoring]
    emerges_from_narrative: true

  full_story_text: [complete story]

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
| 1.0 | 2026-02-03 | Initial Arena Layer for Story skill: 6-persona generation (Makepeace, Halbert, Schwartz, Ogilvy, Carlton, Bencivenga), 7 story-specific judging criteria (Transportation 20%, Emotional Arc 20%, Mechanism Naturalness 15%, Suspense/Pacing 15%, Carlton Compliance 10%, Proof Integration 10%, Story Function 10%), 8.5/10 minimum threshold, Carlton 9-point compliance verification, mechanism revelation naturalness enforcement |

---

## CRITICAL REMINDERS

1. **The story makes the mechanism FEEL real** — this is emotional proof, not logical proof
2. **7 complete stories required** — no shortcuts, no partial drafts
3. **8.5/10 minimum threshold** — elevated from standard 7.0 for Arena quality
4. **Human selection is BLOCKING** — no auto-proceed, no timeout selection
5. **Carlton compliance is mandatory** — all 9 principles must be applied
6. **Mechanism revelation must be NATURAL** — emerges from narrative, not inserted
7. **"Here's what that means for YOU" required** — explicit reader connection segue
8. **Reader must FEEL something** — happiness, alarm, astonishment, or greed
