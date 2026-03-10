# LP-10: Social Proof Writer — Master Agent

> **Version:** 1.0
> **Skill:** LP-10-social-proof-writer
> **Position:** Phase 3 — Fourth Writing Skill
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (`page-brief.json`), LP-01 (`conversion-intelligence.json`), LP-04 (`section-sequence.json`), LP-05 (`proof-architecture.json`)
> **Output:** `social-proof-copy-package.json` + `SOCIAL-PROOF-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write all **social proof copy** for the landing page — every word that surrounds, introduces, formats, and connects testimonials, reviews, endorsements, before/afters, volume signals, and case studies to the page's persuasion arc.

LP-05 designed the proof architecture: WHAT type goes WHERE at WHAT density. LP-10 writes the COPY that fills those slots. Every `slot_id` in `proof-architecture.json` becomes a writing assignment.

**This skill writes 9 distinct copy types:**

1. **Testimonial Intro Copy** — Section headers that introduce proof blocks ("Here's what [audience type] are saying...")
2. **Testimonial Formatting** — Selecting which testimonials to feature, formatting with name/title/location, bolding key outcomes
3. **Review Section Headers** — "1,561 Reviews — See what our customers say"
4. **Before/After Captions** — Writing the transformation story for each before/after pair
5. **Expert Endorsement Framing** — "Dr. [Name], [Credential]" + context for why this expert matters
6. **Social Proof Transitions** — Copy that bridges INTO a proof section and OUT of it
7. **Volume Signals** — "Join 1,270,268+ customers who..." copywriting
8. **Case Study Introductions** — Framing for detailed success stories
9. **Video Testimonial CTAs** — "Watch [Name]'s story" type copy

**Two fundamentally different executions:**

**Type A output** (Long-Form Sales Page):
- Narrative-woven proof transitions (in/out of proof blocks)
- Story-framed testimonial intros that earn readership
- Expert endorsement framing with credential context
- Before/after captions as transformation mini-stories
- Volume signals embedded in persuasion flow

**Type B output** (Ecomm/PDP):
- Review section headers with star count + volume numbers
- Review cascade filtering copy (by concern, rating, verified)
- Rating strip context copy
- Before/after gallery captions (short, scan-friendly)
- Social proof counter copy ("50,000+ customers served")

**Success Criteria:**
- Every `slot_id` from `proof-architecture.json` has corresponding copy written
- Zero proof slots left without copy (gaps flagged, not silently skipped)
- All testimonials feature SPECIFIC outcomes — "I lost weight" is forbidden; "I lost 23 pounds in 8 weeks" is required
- Proof transitions are FRESH — never use "But don't just take our word for it" literally
- Expert endorsements include credential + relevance context (why THIS expert matters for THIS product)
- Volume signals use exact numbers where available (not rounded generics)
- All copy passes anti-slop scan — zero AI telltales in proof copy
- Social proof copy score >= 7.5/10 on proof copy audit

This agent **writes actual copy**, not blueprints. LP-05 made the architecture decisions — this skill executes them.

---

## IDENTITY

**This skill IS:**
- The execution layer for LP-05's proof architecture
- The writer of all copy that surrounds, introduces, and connects social proof to the page
- The testimonial formatter and selector (from available inventory)
- The transition writer that bridges narrative sections into proof blocks and back out

**This skill is NOT:**
- The proof architect (LP-05 decided what goes where — LP-10 writes the copy for those slots)
- The hero section writer (LP-07 handles headline, deck, lead)
- The trust badge generator (LP-08 handles trust bars, certifications, security signals)
- The CTA copy optimizer (LP-14 handles call-to-action copy)
- The testimonial SOURCER — LP-10 works with proof inventory from LP-05. If proof is marked `requires_sourcing`, LP-10 writes placeholder copy with sourcing flags.

**Upstream:**
- `page-brief.json` (LP-00) — audience profile, voice direction, vertical
- `conversion-intelligence.json` (LP-01) — benchmark data, proof element impact data
- `section-sequence.json` (LP-04) — section order context
- `proof-architecture.json` (LP-05) — THE PRIMARY INPUT: slot-by-slot proof assignments with type, format, quality requirements
- `hero-section-package.json` (LP-07) — threading anchor, promise statement for proof-to-promise alignment

**Downstream:**
- `social-proof-copy-package.json` feeds LP-15 (Assembly) — proof copy placed into final page
- `social-proof-copy-package.json` feeds LP-17 (Conversion Audit) — 20-Point Checklist items 09-12 verification

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + proof inventory + specimens
  -> 0.1: Brief Loader (page-brief, section-sequence, conversion-intelligence)
  -> 0.2: Proof Architecture Loader (proof-architecture.json — THE critical input)
  -> 0.3: Specimen Proof Copy Loader (proof copy specimens by vertical/type)
  | [GATE_0: proof-architecture.json loaded? All slots inventoried? Specimens loaded?]
LAYER_1: Analysis + Planning
  -> 1.1: Proof Slot Analyzer (categorize all slot_ids into writing assignments by copy type)
  -> 1.2: Testimonial Selection Planner (which testimonials for which slots + formatting plan)
  -> 1.3: Transition Strategy Planner (plan IN and OUT transitions for each proof block)
  | [GATE_1: All slots categorized? Testimonial assignments mapped? Transition strategy documented?]
LAYER_2: Generation — Write All Proof Copy
  -> 2.1: Testimonial Intro Writer (proof block section headers)
  -> 2.2: Testimonial Formatter (select, format, bold key outcomes)
  -> 2.3: Review Section Writer (review headers, cascade copy, rating context)
  -> 2.4: Before/After Caption Writer (transformation story per pair)
  -> 2.5: Expert Endorsement Framer (credential + context + endorsement statement)
  -> 2.6: Proof Transition Writer (INTO and OUT OF each proof block)
  -> 2.7: Volume Signal Writer ("Join X+ customers..." copy)
  |
  [NOTE: 2.1-2.7 execute in sequence based on proof slot types present.
   Not all types exist on every page. Skip types with 0 assigned slots.]
  |
  | [GATE_2: Every slot_id has copy? Zero unaddressed slots? All copy complete?]
LAYER_3: Validation
  -> 3.1: Proof Copy Validator (score against 8-point proof copy checklist)
  -> 3.2: Specificity Audit (every testimonial has specific outcomes — zero vague claims)
  -> 3.3: Anti-Slop Scanner (zero AI telltales in all proof copy)
  | [GATE_3: Proof copy score >= 7.5? Specificity audit PASS? Anti-slop PASS?]
LAYER_4: Package Assembly
  -> 4.1: Proof Copy Compiler (assemble social-proof-copy-package.json)
  -> 4.2: Summary Writer (SOCIAL-PROOF-SUMMARY.md)
  -> 4.3: Log Writer (execution-log.md)
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

> **POSITIONAL REINFORCEMENT:** You are loading inputs. Do NOT write copy, plan transitions, or make formatting decisions yet. Layer 0 reads files and confirms they exist. That is all.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load page-brief, section-sequence, conversion-intelligence, hero-section-package | brief-loaded.md |
| 0.2: Proof Architecture Loader | Load proof-architecture.json — extract every slot_id, type, format, quality requirement | proof-slots-loaded.md |
| 0.3: Specimen Proof Copy Loader | Load proof copy patterns from matching specimens by vertical/page type | specimen-proof-copy.md |

**GATE_0:** proof-architecture.json loaded and all slot_ids inventoried. Brief loaded with page type confirmed. At least 2 specimen proof copy patterns loaded. If `proof-architecture.json` missing -> HALT.

### Layer 1: Analysis + Planning

> **POSITIONAL REINFORCEMENT:** You are ANALYZING and PLANNING. Do NOT write any copy yet. Layer 1 categorizes the writing assignments, maps testimonials to slots, and plans transitions. No prose is generated in Layer 1.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Proof Slot Analyzer | Categorize every slot_id into 9 copy types; identify which Layer 2 microskills need to execute | proof-slot-analysis.md |
| 1.2: Testimonial Selection Planner | Map available testimonials to assigned slots; plan formatting (name, title, bolding) | testimonial-plan.md |
| 1.3: Transition Strategy Planner | Plan IN and OUT transitions for each proof block; plan volume signal placement | transition-plan.md |

**GATE_1:** Every slot_id assigned to a copy type. Testimonial-to-slot mapping complete (or `requires_sourcing` flagged). Transition strategy documented for every proof block. If any slot_id is uncategorized -> HALT.

### Layer 2: Generation

> **POSITIONAL REINFORCEMENT:** You are WRITING actual copy. This is the creative execution layer. Write with the voice direction from page-brief.json. Every piece of copy must serve the page's single conversion goal. Write to the audience — not at them.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Testimonial Intro Writer | Write proof block section headers / intro copy | testimonial-intros.md |
| 2.2: Testimonial Formatter | Select, format, and highlight key outcomes in testimonials | formatted-testimonials.md |
| 2.3: Review Section Writer | Write review cascade headers, filtering labels, rating context | review-section-copy.md |
| 2.4: Before/After Caption Writer | Write transformation mini-story for each before/after pair | before-after-captions.md |
| 2.5: Expert Endorsement Framer | Write credential context + endorsement framing per expert | expert-endorsements.md |
| 2.6: Proof Transition Writer | Write IN and OUT transitions for each proof block | proof-transitions.md |
| 2.7: Volume Signal Writer | Write customer count, stat bar, and volume signal copy | volume-signals.md |

**Note:** Only execute Layer 2 microskills where corresponding slot types exist. If proof-architecture.json has zero `before_after` slots, skip 2.4 entirely. Document skipped microskills in execution log.

**GATE_2:** Every slot_id from proof-architecture.json has corresponding copy written (or marked `requires_sourcing` with placeholder copy). Zero unaddressed slots.

### Layer 3: Validation

> **POSITIONAL REINFORCEMENT:** You are VALIDATING the copy. The writing is complete — now test it. Run every check. Do not skip any validation because the copy "looks right."

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Proof Copy Validator | Score all proof copy against 8-point checklist | proof-copy-validation.md |
| 3.2: Specificity Audit | Verify every testimonial contains specific outcomes — zero vague claims | specificity-audit.md |
| 3.3: Anti-Slop Scanner | Zero AI telltales in all proof copy | anti-slop-scan.md |

**GATE_3:** Proof copy score >= 7.5/8 AND specificity audit PASS AND anti-slop scan PASS. If any gate fails -> revise and re-validate.

### Layer 4: Package Assembly

> **POSITIONAL REINFORCEMENT:** You are assembling the final output package. No new decisions. Compile what Layer 2 wrote and Layer 3 validated into the three output files.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Proof Copy Compiler | Assemble social-proof-copy-package.json | social-proof-copy-package.json |
| 4.2: Summary Writer | Write SOCIAL-PROOF-SUMMARY.md | SOCIAL-PROOF-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Loading + extraction | haiku | Mechanical file operations |
| 1.1 | Slot categorization | sonnet | Classification task |
| 1.2 | Testimonial selection planning | sonnet | Mapping + decision task |
| 1.3 | Transition strategy planning | sonnet | Strategic planning |
| 2.1 | Testimonial intro writing | opus | Creative copy writing — high voice sensitivity |
| 2.2 | Testimonial formatting | opus | Requires editorial judgment on what to bold/highlight |
| 2.3 | Review section writing | opus | Copy generation for review headers and context |
| 2.4 | Before/after caption writing | opus | Transformation storytelling — highest creative demand |
| 2.5 | Expert endorsement framing | opus | Requires nuanced credibility copy |
| 2.6 | Proof transition writing | opus | Bridge copy requires page-level narrative awareness |
| 2.7 | Volume signal writing | opus | Persuasive number framing |
| 3.1-3.3 | Validation + audits | sonnet | Systematic checks, not creative generation |
| 4 | Package assembly | haiku | Mechanical assembly |

---

## THE 9 PROOF COPY TYPES

### Type 1: Testimonial Intro Copy
**What it is:** The header/intro text that opens a proof block. Sets the frame for why these testimonials matter.
**Type A example:** "These aren't paid actors. Every person below struggled with [specific problem] before discovering [product]."
**Type B example:** "What 2,847 Verified Buyers Are Saying"
**Rules:** Must be specific to the audience and problem. Must NOT be generic ("Here's what people say"). Must create a frame that amplifies the testimonials below it.

### Type 2: Testimonial Formatting
**What it is:** Selecting which testimonials to feature per slot, formatting with attribution (name, title, location, photo indicator), and bolding the specific outcome sentence.
**Rules:** Every testimonial MUST contain a specific outcome with numbers or timeframes. Bold the most conversion-relevant sentence. Attribution must include at least name + one qualifier (location, title, verified buyer, etc.).

### Type 3: Review Section Headers
**What it is:** Headers for review cascade sections (Type B primarily). Includes the star count, review count, and framing copy.
**Type B example:** "4.8 out of 5 stars from 1,561 Verified Reviews"
**Rules:** Use exact numbers — never round ("over 1,500" is weaker than "1,561"). Include the word "verified" when applicable. Include filtering options copy if cascade allows filtering.

### Type 4: Before/After Captions
**What it is:** Short transformation stories that accompany before/after images. Each caption tells a specific person's story.
**Example:** "Sarah M., 47 — Lost 23 lbs in 12 weeks. 'I'd tried everything. This was the first thing that actually worked for my metabolism after menopause.'"
**Rules:** Specific name (or initial). Specific age or qualifier. Specific outcome with number + timeframe. One-sentence quote from the person. Never write generic captions.

### Type 5: Expert Endorsement Framing
**What it is:** The credential context and introduction for expert endorsements. Why should the reader care about this specific expert?
**Example:** "Dr. Sarah Chen, MD — Board-Certified Endocrinologist, Johns Hopkins Medical School faculty, and researcher behind the landmark 2024 study on magnesium absorption that changed clinical practice."
**Rules:** Full credential chain (degree + institution + relevance). Explain WHY this expert's opinion matters for THIS product. The framing must make the endorsement feel earned, not bought.

### Type 6: Proof Transitions
**What it is:** Bridge copy that transitions the reader INTO a proof section (from narrative) and OUT of a proof section (back to narrative or CTA).
**INTO example:** "I could explain the science all day. But I'd rather let the results speak."
**OUT example:** "And those are just a handful of the stories we hear every week. The question isn't whether [product] works — it's whether you're ready to experience it yourself."
**Rules:** NEVER use "But don't just take our word for it" literally. Write FRESH transition copy for each proof block. IN transitions must create anticipation. OUT transitions must propel toward the next section or CTA.

### Type 7: Volume Signals
**What it is:** Copy that communicates scale/popularity. Customer counts, review counts, purchase counts.
**Examples:** "Join 1,270,268 customers who've already made the switch." / "Rated 4.8/5 by 83,502 real customers."
**Rules:** Use exact numbers where available (specificity = credibility). If only approximate data exists, use "+" notation ("50,000+ customers"). Never fabricate numbers. Frame the number in terms of the reader's decision ("If 50,000 people trust this with their health...").

### Type 8: Case Study Introductions
**What it is:** Framing copy that introduces detailed success stories or case studies.
**Example:** "CASE STUDY: How [Company/Person] achieved [Specific Result] in [Timeframe] — and the one change that made it possible."
**Rules:** Lead with the specific result. Include timeframe. Create a curiosity hook about the method/insight. The intro should make the reader WANT to read the full case study.

### Type 9: Video Testimonial CTAs
**What it is:** Copy that accompanies embedded video testimonials — the text label, pull-quote, and play-button context.
**Example:** "[Play button] Watch Sarah's Story — 'I was skeptical until week 3. Then I couldn't ignore the numbers.'" (2:47)
**Rules:** Include the person's name. Include a pull-quote (the most compelling sentence from the video). Include video duration. The pull-quote should create enough curiosity to click play.

---

## PROOF COPY ANTI-SLOP WORD LIST

The following words/phrases are **FORBIDDEN** in all social proof copy:

```
CATEGORY 1 — Generic Proof Intros:
"But don't just take our word for it" (literal — paraphrases allowed)
"See what our customers are saying"
"Hear from real people"
"Real results from real people"
"Success stories that speak for themselves"

CATEGORY 2 — Vague Testimonial Language:
"Great product!" (as a standalone)
"Love it!"
"Changed my life" (without specifics of HOW)
"Amazing results" (without specifying WHAT results)
"I feel so much better" (without specifying what changed)
"Best purchase ever"

CATEGORY 3 — AI Telltales in Proof Copy:
transformative, game-changing, revolutionary, groundbreaking,
unprecedented, life-changing (without specifics), unlock,
empower, journey (metaphorical), holistic, synergy

CATEGORY 4 — Fake Urgency in Proof:
"These results won't last forever"
"Hurry before spots run out" (in a proof section)
"Limited testimonials available"

CATEGORY 5 — Credential Inflation:
"World-renowned" (without verification)
"Leading expert" (without named institution)
"Top doctor" (without ranking source)
"Acclaimed researcher" (without specific publications)
```

---

## SOCIAL-PROOF-COPY-PACKAGE.JSON SCHEMA

```json
{
  "schema_version": "1.0",
  "skill": "LP-10-social-proof-writer",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",

  "proof_copy_by_slot": [
    {
      "slot_id": "[from proof-architecture.json — e.g., section_5_proof_1]",
      "section_name": "[section name from proof-architecture.json]",
      "copy_type": "[testimonial_intro | testimonial_format | review_header | before_after_caption | expert_endorsement | proof_transition_in | proof_transition_out | volume_signal | case_study_intro | video_testimonial_cta]",
      "copy_text": "[the actual written copy]",
      "word_count": "[number]",
      "specificity_score": "[1-10 — based on specific outcomes/numbers present]",
      "source_status": "[written | requires_sourcing — placeholder copy provided]",
      "formatting_notes": "[bold phrases, attribution format, image placement notes]"
    }
  ],

  "transition_pairs": [
    {
      "proof_block_id": "[proof block identifier]",
      "section_name": "[section name]",
      "transition_in": {
        "copy": "[transition INTO the proof block]",
        "word_count": "[number]"
      },
      "transition_out": {
        "copy": "[transition OUT of the proof block]",
        "word_count": "[number]",
        "next_section_bridge": "[what comes after this proof block]"
      }
    }
  ],

  "volume_signals": [
    {
      "placement": "[above_fold | social_proof_strip | proof_block | stat_bar]",
      "copy": "[volume signal copy]",
      "number_source": "[exact | approximate | requires_verification]"
    }
  ],

  "validation": {
    "proof_copy_score": "[X.X/8]",
    "specificity_audit": "[PASS | FAIL]",
    "anti_slop_scan": "[PASS | FAIL]",
    "slots_addressed": "[count]",
    "slots_total": "[count from proof-architecture.json]",
    "slots_requiring_sourcing": "[count]",
    "all_gates_passed": "[true | false]"
  },

  "downstream_handoffs": {
    "lp_15_assembly": "Load social-proof-copy-package.json proof_copy_by_slot — each slot_id maps to a section in the assembled page",
    "lp_17_conversion_audit": "Load validation block for 20-Point Checklist items 09-12 verification"
  }
}
```

---

## 8-POINT PROOF COPY CHECKLIST

Score each point 0 (fail) or 1 (pass). Minimum 7.5/8 to proceed (round up: 6/8 = 7.5 fails, 7/8 = passes).

**Specificity (2 points)**
1. Every testimonial contains a specific outcome with number, timeframe, or measurable result
2. Volume signals use exact numbers (not rounded generics)

**Voice Alignment (2 points)**
3. Proof copy tone matches page-brief.json voice direction
4. Testimonial intros match the page's narrative register (conversational for Type A, scannable for Type B)

**Transition Quality (2 points)**
5. Every proof block has a unique IN transition (no repeated phrases across blocks)
6. OUT transitions propel toward the next section (not dead-end the reader)

**Completeness (2 points)**
7. Every slot_id from proof-architecture.json has corresponding copy
8. Zero AI telltales in any proof copy element

---

## FORBIDDEN BEHAVIORS

1. Skipping proof-architecture.json load — LP-10 CANNOT function without LP-05's output. Every slot_id is a writing assignment.
2. Writing generic testimonial intros — "See what our customers are saying" is forbidden. Each intro must be specific to the audience, problem, and proof type.
3. Using "But don't just take our word for it" literally — write fresh transition copy for EVERY proof block.
4. Accepting vague testimonials — "I feel so much better" without specifics is a failure. Every testimonial must contain a measurable outcome.
5. Rounding volume numbers — "1,561 reviews" is more credible than "over 1,500 reviews." Use exact numbers where available.
6. Skipping transition copy — proof blocks that appear without narrative transitions feel jarring and reduce trust.
7. Writing expert endorsements without credential context — "Dr. Smith recommends it" is insufficient. Full credential chain + relevance required.
8. Auto-filling placeholder testimonials with fabricated outcomes — if proof is marked `requires_sourcing`, write placeholder copy that flags the gap. Do NOT invent specific numbers.
9. Proof copy audit score below 7.5 — revise until score is met.
10. Executing Layer 2 microskills for slot types that don't exist in proof-architecture.json — check slot analysis first, skip irrelevant microskills.
11. Using identical transition copy for multiple proof blocks — each transition must be unique.
12. Writing case study intros without a curiosity hook — the intro must create a reason to read the full case study.
13. Any AI telltales from the anti-slop word list — immediate revision required.
