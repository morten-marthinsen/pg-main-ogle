# ARENA-LAYER.md — 13-root-cause-narrative

**Version:** 2.1
**Parent Skill:** 13-root-cause-narrative
**Position:** Layer 2.5 (between Draft Generation and Refinement)
**Type:** Evaluation & Selection Framework
**Dependency:** ARENA-PERSONA-PANEL.md (master specification)

> **Arena Mode:** `generative_full_draft` — Competitors write COMPLETE pieces from scratch using upstream packages. Layer 2 draft = reference material, not template. See `~system/protocols/ARENA-CORE-PROTOCOL.md` for 2-round + audience evaluation execution protocol.

---

## PURPOSE

After Layer 2 generates draft root cause narrative prose, this layer evaluates multiple narrative variations through 7 competitors (6 legendary copywriter personas + The Architect), judges each against root-cause-narrative-specific criteria, ranks candidates, and presents top performers for human selection.

**Position in Pipeline:**
```
Layer 1 (Strategic Classification)
    → Layer 2 (Draft Generation)
    → Layer 2.5 (Arena Evaluation) ← YOU ARE HERE
    → Layer 3 (Refinement & Polish)
    → Layer 4 (Validation & Assembly)
```

**Why This Layer Exists:**
Root cause narratives are worldview-shifting prose — they must shatter the prospect's false beliefs and externalize blame to create conceptual space for the mechanism. Multiple narrative approaches can achieve this shift, but they differ dramatically in:
- Three-part structure clarity (how powerfully what_they_think / what_it_really_is / why_nothing_worked lands)
- Blame externalization (how completely the prospect is absolved)
- Counter-intuitive impact (how surprising the revelation feels)
- Villain portrayal (how specific and memorable the antagonist)
- Evidence integration (how natural proof feels within the narrative)

The Arena ensures multiple approaches are generated, evaluated objectively, and the best candidate is selected before refinement resources are invested.

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

## ROOT CAUSE NARRATIVE JUDGING CRITERIA

#### Criterion 1: Three-Part Structure Clarity (20%)

**What it measures:** How powerfully and clearly the three-part structure (what_they_think / what_it_really_is / why_nothing_worked) is communicated. The prospect must understand all three components and feel the shift.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | All three parts land with precision and power; prospect's false belief is articulated so clearly they nod in recognition; the real root cause is counter-intuitive and surprising; the failure explanation creates "aha" moment that explains all past disappointments |
| 7-8 | Three-part structure clear and complete; each part contributes to worldview shift; minor opportunities for sharpening the contrast between false belief and truth |
| 5-6 | Three parts present but one component is weaker than others; the shift feels incomplete or the false belief isn't articulated specifically enough |
| 3-4 | Two parts clear, one part muddled or missing; the worldview shift is partial |
| 1-2 | Three-part structure unclear or collapsed; prospect's false belief not articulated; root cause revelation lacks impact |

---

#### Criterion 2: Blame Externalization (20%)

**What it measures:** How completely the prospect is absolved of responsibility. Root cause MUST be external — the prospect was DECEIVED, BLOCKED, or MISLED. This is Rule 1: the most important rule.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Blame is 100% external; prospect is positioned as victim of forces beyond their control; language explicitly states "it's not your fault" or equivalent; emotional relief palpable |
| 7-8 | Blame externalized effectively; prospect absolved; minor language could strengthen "not your fault" framing |
| 5-6 | Blame mostly external but some responsibility leaks to prospect ("if only you had known earlier..."); partial absolution |
| 3-4 | Blame ambiguously distributed; prospect may feel partially at fault; externalization incomplete |
| 1-2 | Blame internalized to prospect (explicitly or implicitly); prospect feels responsible for past failures; RULE 1 VIOLATION |

**CRITICAL:** Any score below 7 on this criterion is a BLOCKING failure. Blame MUST be external.

---

#### Criterion 3: Counter-Intuitive Impact (15%)

**What it measures:** How surprising and unexpected the root cause revelation feels. The root cause must challenge the prospect's existing mental model — if it confirms what they already think, it has no persuasive power. This is Rule 6.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Root cause revelation creates genuine surprise; the prospect's model is inverted ("I thought X caused the problem, but it's actually Y making X worse"); counter-intuitive element is memorable and quotable |
| 7-8 | Root cause is surprising and non-obvious; creates meaningful "I never thought of it that way" moment; reframe is effective |
| 5-6 | Some counter-intuitive element present but muted; revelation confirms partially held suspicions rather than inverting model |
| 3-4 | Root cause revelation is expected or predictable; confirms existing beliefs rather than challenging them |
| 1-2 | No counter-intuitive element; root cause is obvious; no worldview shift triggered |

---

#### Criterion 4: Villain Portrayal (15%)

**What it measures:** How specific, memorable, and emotionally resonant the villain is. Generic villains ("the industry") have no persuasive power. The villain must be NAMED, have MOTIVES, and be emotionally TARGET-able. This is Rule 5.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Villain is specific named entity (pharma company, specific organization, identifiable biological process); motive clearly established (profit, suppression, self-protection); villain evokes genuine emotional response (outrage, betrayal, righteous anger) |
| 7-8 | Villain named and specific; motive implied or partially stated; emotional response triggered; minor opportunities for stronger portrayal |
| 5-6 | Villain present but somewhat generic ("drug companies" instead of specific company); motive vague; emotional response muted |
| 3-4 | Villain generic ("the industry," "conventional medicine"); no clear motive; no emotional targeting |
| 1-2 | No villain or villain is the prospect themselves; no external target for blame |

---

#### Criterion 5: Evidence Integration (10%)

**What it measures:** How naturally proof elements are woven into the narrative. Evidence must feel like part of the story, not citations bolted on. Evidence patterns include: villain's own data, paradox proof, specific numbers, institutional name-drops, geographic/historical proof, visual demonstration, person-as-proof.

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Evidence woven seamlessly into narrative flow; proof elements feel like natural parts of the story; multiple evidence patterns used organically; reader absorbs proof without feeling "sold to" |
| 7-8 | Evidence integrated well; most proof feels natural; 1-2 moments where evidence could be more seamlessly incorporated |
| 5-6 | Evidence present but occasionally feels inserted rather than woven; some "citation" moments that break narrative flow |
| 3-4 | Evidence bolted on; appears as lists, citations, or asides rather than narrative elements |
| 1-2 | No evidence integration or evidence feels completely artificial; prose interrupted by proof |

---

#### Criterion 6: Reframe Stack Depth (10%)

**What it measures:** Whether multiple reframe techniques are layered for compound worldview shift. Single reframes are weak; stacked reframes create irresistible perspective changes. Minimum 2 reframes required.

**Reframe Taxonomy:**
- `not_your_fault` (35% of TIER1) — Directly absolves prospect
- `conspiracy` (25%) — Hidden forces working against prospect
- `hidden_truth` (15%) — Information deliberately obscured
- `opposite_of_truth` (10%) — What they told you is inverted
- `suppressed_science` (10%) — Valid research hidden from public
- `conspiracy_expose` (5%) — Reveals the conspiracy mechanism

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | 3+ reframe techniques stacked effectively; each reframe builds on the previous; compound worldview shift is overwhelming; prospect cannot maintain previous beliefs |
| 7-8 | 2 reframe techniques stacked well; worldview shift is strong and multi-dimensional |
| 5-6 | 2 reframes present but not well-integrated; feel like separate arguments rather than stacked perspective shifts |
| 3-4 | Single reframe only; worldview shift is one-dimensional |
| 1-2 | No clear reframe technique applied; narrative states facts without shifting perspective |

---

#### Criterion 7: Countersell Effectiveness (10%)

**What it measures:** How effectively the root cause narrative kills competitor solutions. Countersells must weaponize the root cause against alternatives — showing why diets fail, why medications mask symptoms, why exercise isn't enough. This is Rule 10.

**Countersell Patterns:**
- `treats_symptoms` — Competitor addresses symptoms, not root cause
- `makes_worse` — Competitor actually exacerbates the problem
- `wrong_enemy` — Competitor targets the wrong cause
- `dangerous` — Competitor has side effects or risks

**Scoring Rubric:**

| Score | Description |
|-------|-------------|
| 9-10 | Multiple competitor categories killed through root cause lens; countersells feel inevitable given the root cause; prospect understands why ALL past approaches failed; at least 2-3 competitor categories addressed |
| 7-8 | Countersells present and effective; at least 2 competitor categories addressed; logic is clear and compelling |
| 5-6 | Countersells present but narrow; only 1 competitor category addressed or arguments are generic rather than root-cause-specific |
| 3-4 | Weak countersells; competitors mentioned but not killed through root cause lens |
| 1-2 | No countersells or countersells that don't connect to root cause |

---

### Critique-Specific Guidance

**What The Critic should particularly target in Root Cause Narrative Arena:**
- Blame internalized to reader (must be EXTERNAL)
- Three-part structure incomplete (what_they_think / what_real / why_nothing_worked)
- Authority not established before root cause reveal
- Generic villain ("the industry") instead of specific named entity
- Evidence appearing as citations/lists instead of woven into narrative

---

## INTEGRATION REQUIREMENTS

### Inputs Required from Layer 2
- Initial 7-phase narrative draft (problem agitation through mechanism bridge)
- Three-part structure confirmed from human checkpoint
- Communication type classification from Layer 1
- Framing patterns selected from Layer 1
- Emotional arc design from Layer 1
- Countersell architecture from Layer 1

### Outputs to Layer 3
- Selected root cause narrative (full 7-phase prose)
- Arena scores and rationale
- Human selection documented
- Specific refinement recommendations based on judging notes

### Connection to ARENA-PERSONA-PANEL.md
This layer inherits:
- 7-competitor generation framework
- Persona lens definitions
- Anti-slop enforcement
- Human checkpoint protocol
- Scoring methodology

Root-cause-narrative-specific elements:
- 7 judging criteria (Three-Part Clarity, Blame Externalization, Counter-Intuitive Impact, Villain Portrayal, Evidence Integration, Reframe Stack Depth, Countersell Effectiveness)
- Criterion weights optimized for root cause narrative quality
- Root-cause-specific scoring rubrics
- 10 Critical Rules compliance verification
- Countersell pattern validation

---

## CONSTRAINTS

1. **NEVER skip human selection** — This checkpoint is BLOCKING
2. **NEVER proceed with blame internalized** — Any candidate scoring < 7 on Blame Externalization is disqualified (Rule 1 violation)
3. **NEVER proceed without anchor phrase** — Every candidate must have memorable anchor phrase (Rule 8)
4. **NEVER proceed with generic villain** — Villain must be specific named entity (Rule 5)
5. **NEVER generate root cause variations without three-part structure** — All three components are mandatory
6. **ALWAYS verify authority before reveal** — Credibility must precede counter-intuitive claim (Rule 9)
7. **ALWAYS stack minimum 2 reframes** — Single reframes are insufficient
8. **ALWAYS include countersells** — Root cause must kill competitor solutions (Rule 10)

---

## CRITICAL RULES COMPLIANCE CHECK

Before any candidate can be ranked, verify against the 10 Critical Rules:

| Rule | Requirement | Validation |
|------|-------------|------------|
| 1 | Root cause MUST be EXTERNAL (never the reader's fault) | Check Blame Externalization score >= 7 |
| 2 | Root cause MUST explain ALL past failures | Check failure explanation phase |
| 3 | Root cause MUST be more specific than the false belief | Check specificity in revelation |
| 4 | Root cause MUST create clear path to solution | Check mechanism bridge |
| 5 | Root cause MUST pair with a villain | Check Villain Portrayal score >= 6 |
| 6 | Root cause MUST be counter-intuitive | Check Counter-Intuitive Impact score >= 6 |
| 7 | Root cause MUST be woven throughout (not just one section) | Check threading presence |
| 8 | Root cause MUST have memorable anchor phrase | Check anchor phrase presence |
| 9 | Authority MUST be established before root cause reveal | Check phase ordering |
| 10 | Root cause MUST kill competitor solutions (countersells) | Check Countersell Effectiveness score >= 6 |

**Any rule violation = candidate disqualification**

---

## FAILURE MODES

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| All candidates internalize blame | CRITICAL | Criterion 2 scores | Regenerate with explicit "not your fault" framing mandate |
| No counter-intuitive element across candidates | HIGH | Criterion 3 scores | Regenerate with reframe inversion direction |
| Generic villains across candidates | HIGH | Criterion 4 scores | Regenerate with specific villain requirement |
| Single reframe only | MEDIUM | Criterion 6 scores | Regenerate with stacked reframe mandate |
| Missing countersells | MEDIUM | Criterion 7 scores | Regenerate with countersell architecture |
| Human timeout | MEDIUM | No response after reminder | Send checkpoint reminder, wait |
| All candidates below threshold | MEDIUM | Weighted scores | Diagnose lowest criteria, regenerate with targeted guidance |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ~system/protocols/ARENA-CORE-PROTOCOL.md v2.0 and ~system/SYSTEM-CORE.md. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: generative_full_draft (competitors write complete pieces from scratch, not variations of Layer 2 draft). Replaced Phase 1-4 execution protocol with reference to ~system/protocols/ARENA-CORE-PROTOCOL.md (2-round + audience evaluation mandatory competition, adversarial critique-revise, 7 competitors including The Architect, analytical briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.0 | 2026-02-03 | Initial Arena Layer for root cause narrative with 7 judging criteria (Three-Part Structure Clarity 20%, Blame Externalization 20%, Counter-Intuitive Impact 15%, Villain Portrayal 15%, Evidence Integration 10%, Reframe Stack Depth 10%, Countersell Effectiveness 10%), 10 Critical Rules compliance verification, 6-persona generation, BLOCKING human selection checkpoint |
