# VAULT V3 SCHEMA - Deep Extraction Protocol

## Overview

### What's New in V3

Version 3 represents a paradigm shift from surface-level structural extraction to **deep mechanism intelligence**. While v1/v2 captured what components appeared in copy, v3 captures **why they work, how they work together, and what makes them persuasive**.

**Major Additions:**
- **rsf_framework** - Resonant Surprise Framework capturing the R-S-F persuasion architecture (Relatable Problem → Specific Solution → Freedom Promise)
- **proof_inventory** - Comprehensive proof cataloging with 75-sub-type taxonomy and 5-dimension scoring
- **promise_architecture** - Systematic capture of promise hierarchy, emotional framing, and proof pairings
- **story_architecture** - Complete story beat mapping, emotional arcs, and narrative function
- **root_cause_architecture** - Enhanced villain profiling, three-part reframe structure, countersells
- **narrative_flow** - Section sequencing, pacing rhythms, transition techniques, callbacks
- **13-dimension mechanism scoring** - Objective measurement of mechanism strength across all persuasion vectors
- **E5 mechanism typing** - Classification from E1 (incremental) to E5 (paradigm shift)
- **75-sub-type proof taxonomy** - Precise classification of every proof element

### Why These Additions Matter

**For Market Research:**
- Identify exactly which proof types dominate winning controls
- Measure mechanism sophistication levels across markets
- Map promise ceilings and emotional framing patterns
- Track narrative flow patterns that convert

**For Copywriting:**
- Build proof sequences based on proven patterns
- Calibrate mechanism strength across 13 dimensions
- Architect promises with proper support structures
- Design story beats that match market sophistication

**For Competitive Intelligence:**
- Compare mechanism E-levels across competitors
- Analyze proof variety and density strategies
- Map root cause reframe techniques by niche
- Identify under-utilized proof types and promise angles

### How It Maps to Skills Requirements

| Skill Requirement | V3 Schema Component | Output |
|------------------|---------------------|--------|
| RSF Framework | `rsf_framework` | Problem-Solution-Freedom persuasion scaffold |
| RSF Problem Analysis | `rsf_framework.r_relatable_problem` | Prospect-language problem with emotional amplifiers |
| RSF Solution Analysis | `rsf_framework.s_specific_solution` | Mechanism + proof + differentiators |
| RSF Freedom Mapping | `rsf_framework.f_freedom_promise` | Categorized transformation promises |
| 75-sub-type proof taxonomy | `proof_inventory.elements[].sub_type` | Precise proof classification |
| 13-dimension mechanism scoring | `mechanism.thirteen_dimension_scores` | Objective mechanism strength |
| E5 mechanism typing | `mechanism.e5_mechanism_type` | Sophistication classification |
| Promise architecture | `promise_architecture` | Promise hierarchy + support |
| Story beat mapping | `story_architecture.story_beats` | Complete narrative structure |
| Root cause reframe | `root_cause_architecture.three_part_structure` | Systematic reframe capture |
| Proof sequencing | `proof_inventory.proof_sequence` | Order and pacing patterns |
| Narrative flow mapping | `narrative_flow.section_sequence` | Section-by-section breakdown |

---

## Schema Structure

### 1. swipe_id

**Type:** `string`
**Required:** YES
**Format:** `{company}_{brand}_{product}_{format}_{version}`

```json
"swipe_id": "goldenhippo_gundrymd_totalrestore_vsl_001"
```

**Naming Convention:**
- Lowercase, underscores only
- Company: Parent company or marketer
- Brand: Product brand if different from company
- Product: Specific product name (abbreviated if long)
- Format: vsl, sales_letter, email, ad, webinar, etc.
- Version: 001, 002, etc. for different versions

---

### 2. configuration

**Type:** `object`
**Required:** YES
**Purpose:** Score the presence and intensity of Universal Elements, Drivers, and Structures

```json
"configuration": {
  "elements": {
    "PERFECT_PROMISE": 0-10,
    "MECHANISM": 0-10,
    "ENEMY": 0-10,
    "IDENTITY": 0-10,
    "AUTHORITY": 0-10,
    "DEMONSTRATION": 0-10,
    "DISRUPTION": 0-10
  },
  "drivers": {
    "FEAR_PROTECTION": 0-10,
    "FRUSTRATION_ANGER": 0-10,
    "REVENGE_VINDICATION": 0-10,
    "SHAME_DIGNITY": 0-10,
    "HOPE_POSSIBILITY": 0-10,
    "BELONGING_TRIBE": 0-10,
    "LIBERATION_FREEDOM": 0-10,
    "GREED_OPPORTUNITY": 0-10,
    "CURIOSITY": 0-10
  },
  "structures": {
    "ORIGIN_DISCOVERY": 0-10,
    "TRANSFORMATION": 0-10,
    "REVELATION_INTERVIEW": 0-10,
    "PROPHECY_WARNING": 0-10,
    "EXPOSE_INVESTIGATION": 0-10,
    "COMPILATION_DOSSIER": 0-10,
    "CHALLENGE_INVITATION": 0-10,
    "SOCIAL_PROOF_BANDWAGON": 0-10
  },
  "lead_element": "which element dominates the lead",
  "lead_driver": "which driver dominates the lead",
  "lead_structure": "which structure frames the lead"
}
```

**Scoring Guidelines:**
- **0-2:** Absent or barely present
- **3-4:** Present but weak
- **5-6:** Moderate presence
- **7-8:** Strong presence, core to copy
- **9-10:** Dominant, foundational element

---

### 3. rsf_framework (NEW - CRITICAL)

**Type:** `object`
**Required:** YES
**Purpose:** Capture the Resonant Surprise Framework - the three-pillar persuasion architecture that elite copy uses to move prospects from problem awareness to purchase decision

The RSF Framework captures **how copy creates resonance** (reader feels understood), **delivers surprise** (mechanism/solution feels new), and **promises freedom** (transformation feels achievable). This is the meta-architecture that sits above individual components.

```json
"rsf_framework": {
  "r_relatable_problem": {
    "primary_problem": "the core problem stated in prospect's own language",
    "emotional_amplifiers": [
      "verbatim emotional statements that intensify the problem"
    ],
    "specificity_elements": [
      "specific numbers, statistics, or concrete details that make problem real"
    ],
    "relatability_triggers": [
      "elements that create 'that's me!' recognition"
    ]
  },

  "s_specific_solution": {
    "core_mechanism": "the named mechanism or system that solves the problem",
    "mechanism_proof_points": [
      "specific proof elements that validate the mechanism"
    ],
    "unique_differentiators": [
      "what makes this solution different from everything else"
    ],
    "tactical_breakdown": [
      {
        "breakthrough": "named discovery or technique",
        "mechanism": "how it works",
        "proof": "evidence it works",
        "page": "where to find it (if applicable)"
      }
    ]
  },

  "f_freedom_promise": {
    "primary_transformation": "the main life change promised",
    "specific_outcomes": [
      {
        "category": "outcome category (e.g., 'Heart Disease Freedom')",
        "promises": [
          "specific promise 1",
          "specific promise 2"
        ]
      }
    ],
    "freedom_language": [
      "verbatim phrases that convey liberation/transformation"
    ],
    "timeline_promises": [
      "timeframe-specific outcome claims"
    ]
  }
}
```

**Field Definitions:**

**R - Relatable Problem:**

The "R" captures how copy establishes resonance with the reader's current pain state:

- **primary_problem:** The core problem in prospect's own language - not clinical terminology, but how they describe it to friends
- **emotional_amplifiers:** Verbatim phrases that intensify emotional stakes (fear, frustration, shame, urgency)
- **specificity_elements:** Concrete numbers and statistics that make the problem feel real and urgent
- **relatability_triggers:** Elements that create instant identification ("That's exactly what I'm experiencing!")

**S - Specific Solution:**

The "S" captures the mechanism/solution with enough specificity to feel new and credible:

- **core_mechanism:** The named mechanism, system, or discovery that solves the problem
- **mechanism_proof_points:** Evidence that backs up the mechanism's validity (studies, credentials, results)
- **unique_differentiators:** What makes this solution distinct from all past attempts (the "why this is different" elements)
- **tactical_breakdown:** Specific breakthroughs, techniques, or discoveries with their own mini-proof packages

**F - Freedom Promise:**

The "F" captures the promised transformation and life after the problem is solved:

- **primary_transformation:** The big-picture life change (not just symptom relief, but identity/life shift)
- **specific_outcomes:** Categorized promises with concrete, measurable outcomes
- **freedom_language:** Phrases that convey liberation, possibility, and new life
- **timeline_promises:** When results happen (immediate, 30 days, 90 days, etc.)

**Example:**

```json
"rsf_framework": {
  "r_relatable_problem": {
    "primary_problem": "Loved ones are dying from heart disease, cancer, arthritis, diabetes - and breakthrough cures are being covered up",
    "emotional_amplifiers": [
      "\"Please,\" said Hugh Downs, \"if anyone you love is suffering from heart disease, cancer, arthritis, diabetes - don't miss this!\"",
      "\"Every day, our moms, dads and spouses are dying because the news is getting covered up!\"",
      "\"Our doctors were so concerned and outraged, they DROPPED EVERYTHING TO GO ON TV\""
    ],
    "specificity_elements": [
      "America's #1 killer: heart disease",
      "4th biggest cause of death: medical errors (50 mistakes per hour in hospitals)",
      "Alzheimer's cases doubling every 5 years between ages 65-85",
      "90% of all heart surgery is pointless"
    ],
    "relatability_triggers": [
      "Over 2.2 million readers have already paid for this book",
      "Family members at risk (moms, dads, spouses)",
      "Millions watched Hugh Downs on national TV"
    ]
  },

  "s_specific_solution": {
    "core_mechanism": "498 world-acclaimed doctors (traditional + alternative) working together on historic medical super-project, revealing 2,618+ lifesaving breakthroughs",
    "mechanism_proof_points": [
      "TWO NOBEL PRIZES won by team members",
      "Over 498 doctors from Stanford, Johns Hopkins, Harvard, Yale, MIT, Duke, Mayo Clinic",
      "Featured on Hugh Downs national TV program",
      "563 pages, 2,618 secrets"
    ],
    "unique_differentiators": [
      "Greatest medical team ever assembled in history",
      "Unprecedented collaboration between traditional and alternative doctors",
      "Published breakthroughs being actively covered up by big pharma"
    ],
    "tactical_breakdown": [
      {
        "breakthrough": "TRUE 'BYPASS IN A PILL'",
        "mechanism": "Dr. Ignarro's 'miracle molecule' expands blood vessels, eliminates clots",
        "proof": "Won Nobel Prize, reduces artery plaque by 50%, drops blood pressure 60 points",
        "page": "485"
      },
      {
        "breakthrough": "MEMORY FIXED IN SECONDS",
        "mechanism": "Dissolve Alzheimer's plaques like washing hair with common pill",
        "proof": "Dr. Gary Small UCLA research, compound bonds to plaque",
        "page": "14, 507"
      }
    ]
  },

  "f_freedom_promise": {
    "primary_transformation": "Add 10, 20, or even 40 happy, healthy years to your life - with strength and senses in great shape",
    "specific_outcomes": [
      {
        "category": "Heart Disease Freedom",
        "promises": [
          "Make yourself more than 10 times less likely to die of heart attack",
          "Reduce death risk to as low as 1% even after attack begins",
          "Lower high blood pressure as much as 60 points"
        ]
      },
      {
        "category": "Cancer Freedom",
        "promises": [
          "Cut your cancer risk by up to 90%",
          "Secret super vaccines for people who already have cancer"
        ]
      }
    ],
    "freedom_language": [
      "Never want to die from CANCER",
      "Never have another STROKE or HEART ATTACK",
      "Never fall victim to ALZHEIMER'S, PARKINSON'S or DEMENTIA"
    ],
    "timeline_promises": [
      "Results can begin immediately upon reading",
      "30-day free trial to prove it works"
    ]
  }
}
```

**Why RSF Framework Matters:**

The RSF framework captures the **meta-architecture** of persuasion that operates above individual components:

1. **Pattern Recognition:** Identify how elite controls create problem-solution-promise flow
2. **Gap Analysis:** Find where copy is weak (vague problem, generic solution, weak promise)
3. **Generation Guidance:** Use RSF as scaffold for building new copy
4. **Quality Scoring:** Measure RSF completeness and strength across all three pillars

**RSF Interaction with Other Components:**

| RSF Element | Primary Component Connection |
|-------------|------------------------------|
| R (Problem) | root_cause_architecture, villain_profile, lead |
| S (Solution) | mechanism, proof_inventory, story_architecture |
| F (Freedom) | promise_architecture, offer, close |

---

### 4. components

The heart of the extraction. Each component captures a different persuasion layer.

---

#### 3.1 headline

**Type:** `object`
**Required:** YES

```json
"headline": {
  "main_headline": "exact headline text",
  "subheadline": "exact subheadline text or null",
  "deck_copy": "additional deck copy or null",
  "pattern_type": "benefit|curiosity|news|question|how_to|command|secret|warning",
  "power_words": ["array", "of", "power", "words"],
  "specificity_elements": ["specific numbers, names, claims"]
}
```

**Field Definitions:**

- **main_headline:** The primary headline. If video/audio, use opening statement or title card.
- **subheadline:** Secondary headline clarifying or extending main headline.
- **deck_copy:** Supporting copy between headline and body (common in advertorials).
- **pattern_type:** Primary headline structure pattern.
- **power_words:** Emotionally charged words (shocking, breakthrough, dangerous, secret, etc.).
- **specificity_elements:** Concrete details that add credibility (numbers, names, places, timeframes).

**Example:**
```json
"headline": {
  "main_headline": "It Doesn't Matter That 20 Doctors Have Told You It's All In Your Head. I Got News For You. It's Actually All In Your Gut.",
  "subheadline": "Cardiologist Steven Gundry says he's solved the weight loss mystery",
  "deck_copy": null,
  "pattern_type": "benefit",
  "power_words": ["mystery", "solved"],
  "specificity_elements": ["20 Doctors", "Steven Gundry", "Cardiologist"]
}
```

---

#### 3.2 lead (ENHANCED)

**Type:** `object`
**Required:** YES
**Purpose:** Capture the complete opening section and its persuasion mechanics

```json
"lead": {
  "full_text": "complete opening text, verbatim from source",
  "type": "story|question|statistic|declaration|promise|enemy_intro|shocking_claim",
  "hook_sentence": "the very first sentence that grabs attention",
  "opening_device": "pattern_interrupt|curiosity_gap|enemy_intro|story_hook|shocking_stat|authority_flex|problem_agitation",
  "transition_to_body": "exact text or description of how lead connects to body",
  "emotional_progression": "fear_to_hope|pain_to_promise|confusion_to_clarity|frustration_to_vindication|shame_to_dignity",
  "word_count": 0
}
```

**Field Definitions:**

- **full_text:** Complete verbatim opening (first 100-300 words typically, or first major section).
- **type:** Primary lead structure.
- **hook_sentence:** The first sentence. Often the most important sentence in entire promo.
- **opening_device:** The specific persuasion technique used to open.
- **transition_to_body:** How does the lead hand off to the body? Quote it or describe it.
- **emotional_progression:** What emotional journey does the lead take reader on?
- **word_count:** Length of the lead section.

**Example:**
```json
"lead": {
  "full_text": "It doesn't matter that 20 doctors have told you it's all in your head. I got news for you. It's actually all in your gut. I used to be 70 pounds overweight, and I was running 30 miles a week. I was going to the gym one hour every day, and eating a healthy, low fat vegetarian diet, and no matter what I did, I couldn't lose weight.",
  "type": "story",
  "hook_sentence": "It doesn't matter that 20 doctors have told you it's all in your head.",
  "opening_device": "pattern_interrupt",
  "transition_to_body": "Transitions into mechanism explanation by establishing credibility paradox (doing everything right, still failing)",
  "emotional_progression": "frustration_to_vindication",
  "word_count": 68
}
```

---

#### 3.3 promise_architecture (NEW - CRITICAL)

**Type:** `object`
**Required:** YES
**Purpose:** Systematically capture the promise hierarchy, emotional framing, and proof support structure

```json
"promise_architecture": {
  "primary_promise": {
    "statement": "the main transformational promise, verbatim or summarized",
    "type": "outcome|speed|ease|certainty|magnitude|uniqueness",
    "emotional_frame": "hope|relief|excitement|vindication|dignity|freedom|belonging",
    "specificity_level": "vague|moderate|specific|hyper_specific",
    "campaign_thesis": "the overarching belief/worldview being sold alongside product"
  },
  "supporting_promises": [
    {
      "promise": "secondary promise text",
      "type": "outcome|speed|ease|certainty",
      "order": 1
    }
  ],
  "promise_ceiling": "maximum realistic outcome claimed (e.g., 'lose 50 pounds', 'eliminate all joint pain', 'reverse diabetes')",
  "promise_floor": "minimum outcome promised or implied",
  "proof_pairings": [
    "which proof_inventory elements directly support primary promise"
  ],
  "promise_repetition": "how many times core promise is restated",
  "failure_reframe": "how past failures are repositioned (e.g., 'not your fault', 'you had wrong information')"
}
```

**Field Definitions:**

- **primary_promise.statement:** The big promise. What is the ultimate transformation offered?
- **primary_promise.type:** What dimension of benefit is emphasized?
  - **outcome:** The result itself (lose weight, clear skin, more energy)
  - **speed:** How fast it happens (30 days, overnight, immediately)
  - **ease:** How easy it is (effortless, automatic, no willpower needed)
  - **certainty:** How guaranteed it is (proven, scientifically validated, foolproof)
  - **magnitude:** How big the change (dramatic, complete reversal, total transformation)
  - **uniqueness:** How different it is (first time, only solution, breakthrough)

- **emotional_frame:** The primary emotion the promise activates
- **specificity_level:** How concrete vs. vague the promise is
  - **vague:** "Feel better", "improve health"
  - **moderate:** "Lose weight", "reduce pain"
  - **specific:** "Lose 10-30 pounds in 90 days"
  - **hyper_specific:** "Lose exactly 1.2 pounds per week for 12 weeks by repairing gut lining"

- **campaign_thesis:** The bigger belief system. Not just "this product works" but "this is how the world actually works."
  - Example: "Your gut health controls everything about your weight, mood, and energy. Fix your gut, fix your life."

- **supporting_promises:** Secondary benefits, bonuses, side effects
- **promise_ceiling/floor:** The range of outcomes promised
- **proof_pairings:** Which proof elements (by proof_id) directly support the primary promise
- **promise_repetition:** Track how many times the core promise is restated (powerful pattern in controls)
- **failure_reframe:** Critical copy element - how are past failures repositioned to protect belief?

**Example:**
```json
"promise_architecture": {
  "primary_promise": {
    "statement": "Repair your gut lining and unlock effortless weight loss, boundless energy, mental clarity, and relief from mysterious symptoms doctors couldn't explain",
    "type": "outcome",
    "emotional_frame": "vindication",
    "specificity_level": "specific",
    "campaign_thesis": "Everything you think is wrong with you - weight gain, fatigue, brain fog, pain - is actually just leaky gut. You weren't crazy. You weren't lazy. You just had holes in your gut that let toxins flood your body. Seal the holes, end the symptoms."
  },
  "supporting_promises": [
    {"promise": "Lose stubborn weight without extreme dieting", "type": "ease", "order": 1},
    {"promise": "Eliminate brain fog and regain mental sharpness", "type": "outcome", "order": 2},
    {"promise": "Reduce joint pain and inflammation", "type": "outcome", "order": 3},
    {"promise": "Improve skin conditions", "type": "outcome", "order": 4}
  ],
  "promise_ceiling": "Complete reversal of leaky gut symptoms, significant weight loss (30+ pounds), elimination of chronic issues",
  "promise_floor": "Noticeable improvement in energy and digestion within weeks",
  "proof_pairings": ["proof_001", "proof_005", "proof_012"],
  "promise_repetition": 7,
  "failure_reframe": "It's not your fault. You were doing everything right (running 30 miles/week, gym daily, healthy diet). But you were eating 'healthy' foods full of lectins that were destroying your gut. You couldn't win because you had the wrong information."
}
```

---

#### 3.4 root_cause_architecture (ENHANCED - CRITICAL)

**Type:** `object`
**Required:** YES (if root cause reframe is present)
**Purpose:** Capture the complete root cause reframe structure - the "what they think vs. what it really is" that powers market sophistication stage 3-5 copy

```json
"root_cause_architecture": {
  "three_part_structure": {
    "what_they_think": "conventional wisdom, surface problem, what they've been told",
    "what_it_really_is": "true root cause revealed - the mechanism",
    "why_nothing_worked": "failure reframe - why past solutions failed (and why it's not their fault)"
  },
  "villain_profile": {
    "villain_type": "industry|food_industry|pharma|government|misinformation|time|genetics|corporate_greed|medical_establishment",
    "villain_name": "specific entity if named (e.g., 'Big Pharma', 'FDA', 'processed food industry')",
    "villain_role": "blocker|profiteer|deceiver|oppressor|gatekeeper",
    "villain_motivation": "why the villain perpetuates the problem",
    "villain_evidence": "proof offered that villain exists/is guilty"
  },
  "expression_method": "metaphor|analogy|story|scientific_explanation|conspiracy_reveal|data_presentation",
  "key_metaphors": ["list of metaphors used to explain root cause"],
  "reframe_technique": "not_your_fault|opposite_of_truth|hidden_truth|conspiracy|david_vs_goliath|suppressed_science",
  "countersells": [
    "what past solution is pre-handled and how",
    "what objection is neutralized and how"
  ],
  "emphasis_level": "light|moderate|heavy|foundation",
  "placement": "lead|early_body|mid_body|throughout",
  "repetition_pattern": "stated once|restated multiple times|woven throughout"
}
```

**Field Definitions:**

- **three_part_structure:** The classic reframe sequence
  - **what_they_think:** "You think it's calories in/calories out"
  - **what_it_really_is:** "It's actually leaky gut caused by lectins"
  - **why_nothing_worked:** "Diets failed because they didn't address gut lining damage"

- **villain_profile:** Who or what is the enemy?
  - **villain_type:** Category of enemy
  - **villain_name:** Specific name if given
  - **villain_role:** What does the villain DO?
  - **villain_motivation:** WHY does the villain perpetuate the problem? (Usually profit or power)
  - **villain_evidence:** What proof is offered that the villain is real/guilty?

- **expression_method:** HOW is the root cause explained?
- **key_metaphors:** Specific metaphors used (e.g., "Secret Service agents locking arms")
- **reframe_technique:** The persuasion pattern used to shift belief
- **countersells:** What past solutions or beliefs are neutralized?
  - Format: `"Low-fat diets don't work because dietary fat isn't the problem - lectins are"`

- **emphasis_level:** How central is this to the copy?
  - **light:** Mentioned but not dwelled on
  - **moderate:** Significant section devoted to it
  - **heavy:** Major focus, multiple sections
  - **foundation:** The entire copy is built on this reframe

- **placement:** Where does it appear?
- **repetition_pattern:** How often is it reinforced?

**Example:**
```json
"root_cause_architecture": {
  "three_part_structure": {
    "what_they_think": "Weight gain is about calories in/calories out, lack of exercise, or lack of willpower. Chronic symptoms are separate issues requiring different specialists.",
    "what_it_really_is": "Leaky gut caused by lectins (proteins in supposedly 'healthy' foods like whole grains, tomatoes, beans) breaking through your one-cell-thick gut lining, allowing endotoxins to flood your body and trigger weight gain, inflammation, brain fog, and dozens of other symptoms.",
    "why_nothing_worked": "Every diet, every exercise program failed because they didn't address the holes in your gut lining. You could run 30 miles a week and eat vegetarian and still gain 70 pounds because lectins kept creating new holes faster than your body could heal them. It's like trying to bail water out of a boat while someone keeps drilling new holes."
  },
  "villain_profile": {
    "villain_type": "food_industry",
    "villain_name": "Big Agriculture / Whole Grain Industry",
    "villain_role": "deceiver",
    "villain_motivation": "Since 1950, they've pushed whole wheat and 'healthy' grains as health foods to sell more product, ignoring that these lectin-rich foods are destroying our guts. Obesity tripled and diabetes skyrocketed 800% in the same period.",
    "villain_evidence": "Correlation between rise of whole wheat consumption (post-1950) and explosion of obesity/diabetes rates. Historical data showing these weren't problems before grains dominated diet."
  },
  "expression_method": "metaphor",
  "key_metaphors": [
    "Gut lining is one cell thick - like Secret Service agents locking arms to protect you",
    "Lectins are experts at breaking through those cells",
    "Endotoxins (microscopic pieces of bacteria/poop) storm through the holes",
    "Your brain stays on 'threat level red'",
    "GI tract equals a tennis court in square footage, yet razor thin"
  ],
  "reframe_technique": "not_your_fault",
  "countersells": [
    "Low-fat vegetarian diets don't work because they're typically high in lectin-rich foods (beans, grains, tomatoes)",
    "Exercise alone can't overcome leaky gut - you could run 30 miles/week and still gain weight",
    "It's not about willpower - it's about biology (leaky gut triggering your body to store fat as defense mechanism)"
  ],
  "emphasis_level": "foundation",
  "placement": "throughout",
  "repetition_pattern": "woven throughout"
}
```

---

#### 3.5 mechanism (ENHANCED - CRITICAL)

**Type:** `object`
**Required:** YES
**Purpose:** Capture the mechanism in extreme detail with objective scoring across 13 dimensions and E-level classification

```json
"mechanism": {
  "name": "mechanism name as marketed",
  "type": "biochemical|physiological|psychological|technological|financial|spiritual|systematic|behavioral",
  "naming_pattern": "scientific|proprietary|metaphorical|descriptive|branded",
  "explanation_text": "full verbatim explanation of how the mechanism works",
  "credibility_anchors": [
    "authority elements that back the mechanism (credentials, studies, institutions)"
  ],
  "uniqueness_claim": "why this mechanism is different/new/better than alternatives",

  "thirteen_dimension_scores": {
    "novelty": 0-10,
    "specificity": 0-10,
    "credibility": 0-10,
    "simplicity": 0-10,
    "emotional_resonance": 0-10,
    "enemy_clarity": 0-10,
    "visual_metaphor": 0-10,
    "proof_density": 0-10,
    "transformation_speed": 0-10,
    "effort_required": 0-10,
    "universality": 0-10,
    "scientific_backing": 0-10,
    "proprietary_feel": 0-10
  },

  "e5_mechanism_type": {
    "type": "E1_incremental|E2_new_application|E3_reframe|E4_proprietary|E5_paradigm_shift",
    "explanation": "detailed explanation of why it fits this E-level",
    "market_sophistication_fit": "which stage of market sophistication this mechanism targets"
  },

  "emphasis_in_copy": "light|moderate|heavy|dominant",
  "placement_density": "where mechanism appears and how often",
  "key_analogies": ["analogies/metaphors used to explain mechanism"],
  "visual_elements": ["charts, diagrams, animations used to demonstrate mechanism"],
  "mechanism_villain_pairing": "how mechanism relates to villain/enemy"
}
```

**Field Definitions:**

**Basic Identification:**
- **name:** What it's called (e.g., "Leaky Gut", "The Gut-Brain Axis", "Autophagy Activation")
- **type:** What category of mechanism
- **naming_pattern:** How is it named?
  - **scientific:** Uses scientific terminology (autophagy, mitochondrial biogenesis)
  - **proprietary:** Branded name (Total Restore Formula, Gundry Protocol)
  - **metaphorical:** Named via metaphor (Fat-Burning Furnace, Metabolic Switch)
  - **descriptive:** Plain description (Gut Lining Repair, Blood Sugar Regulation)

- **explanation_text:** VERBATIM full explanation from copy
- **credibility_anchors:** What backs it up? (Dr. credentials, university studies, peer-reviewed research)
- **uniqueness_claim:** Why is THIS different from what they've tried before?

**13-Dimension Scoring:**

Score each dimension 0-10 based on OBJECTIVE EVIDENCE in the copy:

1. **novelty** (0-10): How new/fresh does this mechanism feel?
   - 0-2: Common knowledge, nothing new
   - 3-4: Familiar concept with slight twist
   - 5-6: Recognized concept presented in new way
   - 7-8: Unfamiliar mechanism to most prospects
   - 9-10: Completely novel, "I've never heard this before"

2. **specificity** (0-10): How detailed and concrete is the mechanism?
   - 0-2: Vague ("boosts metabolism")
   - 3-4: General category ("improves gut health")
   - 5-6: Named mechanism ("reduces inflammation")
   - 7-8: Specific biological process ("lectins break through tight junctions in intestinal lining")
   - 9-10: Hyper-specific with numbers, pathways, molecules named ("lectins bind to N-acetylglucosamine residues causing zonulin release")

3. **credibility** (0-10): How believable is the mechanism?
   - 0-2: Sounds like pseudoscience, no backing
   - 3-4: Plausible but unsupported
   - 5-6: Some supporting evidence
   - 7-8: Strong credentials/studies backing it
   - 9-10: Overwhelming proof (multiple studies, top institutions, proven track record)

4. **simplicity** (0-10): How easy is it to understand?
   - 0-2: Extremely complex, confusing
   - 3-4: Requires effort to understand
   - 5-6: Understandable with attention
   - 7-8: Easy to grasp, clear explanation
   - 9-10: "A 5th grader could understand this"

5. **emotional_resonance** (0-10): How emotionally compelling is the mechanism?
   - 0-2: Dry, clinical, boring
   - 3-4: Mildly interesting
   - 5-6: Engaging, holds attention
   - 7-8: Emotionally evocative (fear, hope, anger, vindication)
   - 9-10: Deeply emotional, visceral reaction ("Oh my god, this is happening inside me?!")

6. **enemy_clarity** (0-10): How clearly does mechanism identify an enemy?
   - 0-2: No enemy, just positive action
   - 3-4: Vague enemy (bad habits, toxins)
   - 5-6: General enemy (processed food, stress)
   - 7-8: Specific enemy named (lectins, gluten, sugar)
   - 9-10: Villain with name, face, motivation (Big Pharma hiding the cure)

7. **visual_metaphor** (0-10): How visual/imaginable is the mechanism?
   - 0-2: Abstract, can't picture it
   - 3-4: Vaguely imaginable
   - 5-6: Some visual elements
   - 7-8: Strong visual metaphors ("like a tennis court one cell thick")
   - 9-10: Cinematic imagery, can see it happening ("endotoxins storming through holes in your gut")

8. **proof_density** (0-10): How much proof supports the mechanism?
   - 0-2: No proof offered
   - 3-4: Minimal proof (one study or credential)
   - 5-6: Moderate proof (several studies, some testimonials)
   - 7-8: Heavy proof (multiple studies, testimonials, demonstrations)
   - 9-10: Overwhelming proof (meta-analysis, dozens of testimonials, before/after, clinical data)

9. **transformation_speed** (0-10): How quickly does mechanism promise results?
   - 0-2: Vague timeline or very long (years)
   - 3-4: Long timeline (6-12 months)
   - 5-6: Moderate timeline (3-6 months)
   - 7-8: Fast timeline (weeks to 2 months)
   - 9-10: Immediate or near-immediate (days to 2 weeks)

10. **effort_required** (0-10): How easy is it to activate the mechanism? (INVERSE: higher score = LESS effort)
    - 0-2: Extreme effort (complete life overhaul)
    - 3-4: Significant effort (major lifestyle changes)
    - 5-6: Moderate effort (some changes needed)
    - 7-8: Minimal effort (take a pill, avoid a few foods)
    - 9-10: Zero effort (automatic, passive, body does it naturally once triggered)

11. **universality** (0-10): How broadly applicable is this mechanism?
    - 0-2: Only works for small subset of people
    - 3-4: Works for some people
    - 5-6: Works for many people
    - 7-8: Works for most people
    - 9-10: Works for virtually everyone ("if you have a gut, this affects you")

12. **scientific_backing** (0-10): How much legitimate science supports this?
    - 0-2: No science, pseudoscience, or debunked theories
    - 3-4: Minimal scientific support
    - 5-6: Some published research
    - 7-8: Significant published research, peer-reviewed studies
    - 9-10: Overwhelming scientific consensus, textbook biology

13. **proprietary_feel** (0-10): How unique/exclusive does this feel?
    - 0-2: Common knowledge, public domain
    - 3-4: Familiar information
    - 5-6: Somewhat unique angle
    - 7-8: Proprietary-seeming approach or formulation
    - 9-10: "This is secret knowledge only this person/company has"

**E5 Mechanism Typing:**

Classify the mechanism sophistication using Schwartz's market sophistication model:

- **E1_incremental:** Existing mechanism, minor improvement
  - Example: "Our probiotic has 10 billion CFUs instead of 5 billion"
  - Market stage: Early (Stage 1-2)

- **E2_new_application:** Known mechanism applied to new problem/market
  - Example: "We're using this immune-boosting ingredient for weight loss"
  - Market stage: Growing (Stage 2-3)

- **E3_reframe:** Existing mechanism explained differently or with new villain
  - Example: "It's not about calories - it's about lectins damaging your gut"
  - Market stage: Mature (Stage 3-4)

- **E4_proprietary:** Branded/proprietary mechanism or unique combination
  - Example: "Our exclusive 3-prong Total Restore formula"
  - Market stage: Sophisticated (Stage 4)

- **E5_paradigm_shift:** Completely new mechanism or radical worldview shift
  - Example: "Forget everything you know about gut health - it's actually about the gut-brain-immune axis controlled by microbial metabolites"
  - Market stage: Very sophisticated (Stage 5)

**Other Fields:**
- **emphasis_in_copy:** How much does the copy focus on mechanism?
- **placement_density:** Where and how often is mechanism discussed?
- **key_analogies:** What comparisons make it understandable?
- **visual_elements:** What diagrams, charts, animations are used?
- **mechanism_villain_pairing:** How does mechanism relate to the enemy?

**Example:**
```json
"mechanism": {
  "name": "Leaky Gut / Lectins",
  "type": "biochemical",
  "naming_pattern": "scientific",
  "explanation_text": "Your digestive tract lining is one cell thick - like Secret Service agents locking arms to protect you. But lectins (tiny proteins in 'healthy' foods like whole grains, tomatoes, eggplants) are experts at breaking through those cells and creating holes in your gut lining. Once you have leaky gut, endotoxins (microscopic pieces of bacteria/poop) storm through the holes and invade your entire body - causing weight gain, fatigue, brain fog, joint pain, skin issues, and more. Your brain perceives this as constant attack, staying on 'threat level red' until glial cells wear down and brain cells die. The square footage of your GI tract equals a tennis court, yet it's razor thin - one cell thick.",
  "credibility_anchors": [
    "Dr. Steven Gundry - Yale graduate, Medical College of Georgia MD",
    "16 years professor of surgery at Loma Linda",
    "Performed more infant/pediatric heart transplants than any doctor in world",
    "Inventor of Gundry Retrograde Cardioplegic device"
  ],
  "uniqueness_claim": "First formula combining 16 gut hero ingredients that doesn't just soothe but actually REPAIRS damaged gut lining. Three-prong defense: 1) Repair gut walls, 2) Absorb dangerous lectins, 3) Rebalance friendly bacteria. Contains breakthrough Pepsin GI (zinc + L-carnosine) clinically proven to help body seal and restore holes.",

  "thirteen_dimension_scores": {
    "novelty": 7,
    "specificity": 8,
    "credibility": 9,
    "simplicity": 8,
    "emotional_resonance": 9,
    "enemy_clarity": 9,
    "visual_metaphor": 10,
    "proof_density": 8,
    "transformation_speed": 7,
    "effort_required": 9,
    "universality": 9,
    "scientific_backing": 7,
    "proprietary_feel": 6
  },

  "e5_mechanism_type": {
    "type": "E3_reframe",
    "explanation": "Leaky gut itself isn't new to medical literature, but framing it as THE root cause of weight gain (not just digestive issues) and identifying lectins in 'healthy' foods as the villain is a reframe. It takes known science (intestinal permeability) and reframes the problem (it's not calories, it's gut damage) and villain (not junk food, but 'health foods' like whole wheat).",
    "market_sophistication_fit": "Stage 3-4: Market knows about gut health and probiotics, but this reframes the specific mechanism (lectins creating holes) and identifies counter-intuitive villain (whole grains, tomatoes - foods they thought were healthy)"
  },

  "emphasis_in_copy": "dominant",
  "placement_density": "Introduced in lead, explained in detail in body, referenced throughout, visual metaphors woven into entire promo",
  "key_analogies": [
    "Gut lining = Secret Service agents locking arms",
    "Lectins = experts at breaking through cells",
    "Endotoxins = microscopic pieces of bacteria/poop storming through",
    "Brain on threat level red",
    "Tennis court surface area but razor thin"
  ],
  "visual_elements": [
    "Diagram showing one-cell-thick gut lining",
    "Animation of lectins breaking through tight junctions",
    "Before/after images of damaged vs. repaired gut lining"
  ],
  "mechanism_villain_pairing": "Mechanism (leaky gut) is CAUSED BY villain (lectins in whole grains pushed by Big Agriculture since 1950). Perfect pairing - mechanism explains HOW you're being harmed, villain explains WHO is harming you and WHY."
}
```

---

#### 3.6 proof_inventory (NEW - CRITICAL)

**Type:** `object`
**Required:** YES
**Purpose:** Comprehensive cataloging of every proof element with precise classification, scoring, and sequencing

This is one of the most important v3 additions. Controls are built on proof architecture. We need to capture EVERY proof element and classify it precisely.

```json
"proof_inventory": {
  "elements": [
    {
      "proof_id": "unique_id (e.g., proof_001, proof_002)",
      "category": "credentials|studies|testimonials|demonstration|celebrity|logic|social_proof",
      "sub_type": "one of 75 sub-types (see taxonomy below)",
      "content_summary": "what this specific proof element says",
      "verbatim_quote": "exact quote if applicable",
      "placement": "lead|early_body|mid_body|late_body|close",
      "supports_element": "promise|mechanism|root_cause|offer|risk_reversal",

      "five_dimension_scores": {
        "authority_weight": 0-10,
        "specificity": 0-10,
        "emotional_impact": 0-10,
        "believability": 0-10,
        "relevance_to_promise": 0-10
      }
    }
  ],

  "proof_sequence": "narrative description of how proof unfolds throughout copy",
  "proof_pacing": "front_loaded|evenly_distributed|back_loaded|wave_pattern",

  "density_by_section": {
    "lead": "sparse|moderate|heavy",
    "early_body": "sparse|moderate|heavy",
    "mid_body": "sparse|moderate|heavy",
    "late_body": "sparse|moderate|heavy",
    "close": "sparse|moderate|heavy"
  },

  "strongest_proof_type": "which category carries most weight in this copy",
  "proof_variety_score": 0-10,
  "total_proof_count": 0,

  "proof_by_category_count": {
    "credentials": 0,
    "studies": 0,
    "testimonials": 0,
    "demonstration": 0,
    "celebrity": 0,
    "logic": 0,
    "social_proof": 0
  }
}
```

**Field Definitions:**

**Individual Proof Elements:**

- **proof_id:** Unique identifier for cross-referencing
- **category:** High-level classification (7 categories)
- **sub_type:** Precise classification using 75-sub-type taxonomy (see below)
- **content_summary:** What does this proof say? Be specific.
- **verbatim_quote:** If there's a specific quote, capture it exactly
- **placement:** Where in the copy does this appear?
- **supports_element:** What is this proof backing up?

**Five-Dimension Scoring:**

1. **authority_weight** (0-10): How authoritative is the source?
   - 0-2: Anonymous, no credentials
   - 3-4: Some credentials but weak
   - 5-6: Solid credentials (expert, doctor, researcher)
   - 7-8: Top-tier credentials (renowned expert, prestigious institution)
   - 9-10: Unimpeachable authority (world's leading expert, Nobel laureate, top medical school)

2. **specificity** (0-10): How specific and concrete is the proof?
   - 0-2: Vague ("studies show", "people report")
   - 3-4: General ("clinical studies", "patients improved")
   - 5-6: Moderately specific ("University of X study", "72% of patients")
   - 7-8: Highly specific ("Double-blind RCT at Johns Hopkins, n=342, 83% improvement")
   - 9-10: Hyper-specific with exact numbers, dates, names, journal citations

3. **emotional_impact** (0-10): How emotionally moving is the proof?
   - 0-2: Dry, clinical, no emotion
   - 3-4: Mildly interesting
   - 5-6: Engaging, relatable
   - 7-8: Emotionally compelling (story resonates, creates hope/fear)
   - 9-10: Deeply emotional, visceral ("I cried reading this testimonial")

4. **believability** (0-10): How credible/believable is this proof?
   - 0-2: Sounds fake, too good to be true
   - 3-4: Questionable, raises doubts
   - 5-6: Plausible, no red flags
   - 7-8: Credible, well-supported
   - 9-10: Unquestionably believable (multiple corroborating sources, video evidence, peer-reviewed)

5. **relevance_to_promise** (0-10): How directly does this support the core promise?
   - 0-2: Tangentially related at best
   - 3-4: Loosely related
   - 5-6: Moderately relevant
   - 7-8: Directly supports promise
   - 9-10: Perfect proof for exact promise ("Promise was lose 30 lbs, testimonial is 'I lost 32 lbs'")

**Aggregate Metrics:**

- **proof_sequence:** Narrative description of how proof builds throughout copy
- **proof_pacing:** Overall distribution pattern
- **density_by_section:** How much proof in each section
- **strongest_proof_type:** Which category dominates
- **proof_variety_score:** 0-10 score for diversity of proof types
  - 0-2: Only one type of proof used
  - 3-4: Two types used
  - 5-6: Three types used
  - 7-8: Four-five types used
  - 9-10: Six-seven types used, well-balanced

---

### 75-Sub-Type Proof Taxonomy

**Category 1: CREDENTIALS (10 sub-types)**

1. **medical_doctor_degree:** MD credential mentioned
2. **phd_researcher:** PhD in relevant field
3. **professor_academic:** University professor/academic position
4. **clinical_researcher:** Conducts clinical research
5. **institutional_affiliation:** Affiliated with prestigious institution (Harvard, Mayo Clinic, etc.)
6. **awards_honors:** Awards, honors, recognitions received
7. **publications_author:** Published books, journal articles
8. **patents_inventions:** Holds patents or invented medical devices/procedures
9. **years_experience:** Specific years of experience cited (20+ years, decades, etc.)
10. **specialty_board_certification:** Board certified in specialty

**Category 2: STUDIES (15 sub-types)**

11. **randomized_controlled_trial:** RCT specifically mentioned
12. **double_blind_study:** Double-blind methodology cited
13. **meta_analysis:** Meta-analysis or systematic review
14. **university_study:** Study conducted at named university
15. **journal_citation:** Published in peer-reviewed journal (named)
16. **clinical_trial:** Clinical trial results
17. **lab_results:** Laboratory test results
18. **statistical_data:** Statistical evidence (percentages, p-values)
19. **longitudinal_study:** Long-term study tracking outcomes over time
20. **placebo_controlled:** Placebo-controlled trial
21. **human_subjects_study:** Study conducted on humans (vs. animals/in-vitro)
22. **large_sample_size:** Study with large n (100+ subjects)
23. **recent_study:** Recent study (within last 5 years emphasized)
24. **multiple_studies:** Multiple studies cited supporting same claim
25. **study_replication:** Study replicated with same results

**Category 3: TESTIMONIALS (20 sub-types)**

26. **before_after_physical:** Before/after photos or physical transformation
27. **before_after_numbers:** Specific numbers (weight, blood pressure, etc.)
28. **emotional_transformation:** Focus on emotional/psychological change
29. **specific_outcome_claim:** Concrete specific outcome ("lost 47 pounds")
30. **timeframe_specified:** Specific timeframe mentioned ("in just 6 weeks")
31. **skeptic_converted:** "I was skeptical but..." testimonial
32. **last_resort_success:** "Nothing worked until this" testimonial
33. **rapid_results:** Emphasizes speed of results
34. **unexpected_benefits:** Got results they didn't expect
35. **life_changing_declaration:** "Changed my life", "saved my life" language
36. **professional_endorsement:** Testimonial from another professional
37. **celebrity_testimonial:** Celebrity or public figure testimonial
38. **verified_purchaser:** Explicitly verified as real customer
39. **video_testimonial:** Video format testimonial
40. **multiple_symptoms_resolved:** Multiple problems solved by one solution
41. **family_impact:** Impact on family, relationships
42. **financial_impact:** Saved money, could work again, etc.
43. **detailed_story:** Extended narrative testimonial with story arc
44. **aggregated_testimonials:** "Thousands of customers report..." summary
45. **medical_professional_testimonial:** Testimonial from doctor/nurse using product

**Category 4: DEMONSTRATION (10 sub-types)**

46. **live_demonstration:** Live demo or experiment shown
47. **video_proof:** Video evidence of mechanism or results
48. **photo_evidence:** Photographic proof
49. **chart_graph_visual:** Charts, graphs showing data
50. **comparison_test:** Side-by-side comparison (before/after, product vs. control)
51. **ingredient_showcase:** Showing ingredients, formulation process
52. **mechanism_animation:** Animated explanation of how it works
53. **real_time_results:** Results shown in real-time during presentation
54. **x_ray_scan_medical_imaging:** Medical imaging showing internal changes
55. **challenge_accepted:** "Try this and see for yourself" demonstration

**Category 5: CELEBRITY (5 sub-types)**

56. **celebrity_user:** Celebrity uses/endorses product
57. **expert_interviewer:** Credible interviewer/host (Oprah, Dr. Oz format)
58. **authority_figure_endorsement:** Government official, military leader endorses
59. **media_personality:** TV/radio personality endorses
60. **industry_leader:** Business leader or industry authority endorses

**Category 6: LOGIC (8 sub-types)**

61. **deductive_reasoning:** Logical deduction (if A then B, A is true, therefore B)
62. **if_then_logic:** If-then statements proving conclusion
63. **elimination_logic:** Process of elimination proving solution
64. **common_sense_appeal:** "It just makes sense" logic
65. **mathematical_proof:** Mathematical calculation proving point
66. **mechanism_explanation_as_proof:** The explanation itself is proof
67. **historical_precedent:** Historical examples proving principle
68. **evolutionary_biology:** Evolutionary logic (our ancestors didn't have this problem)

**Category 7: SOCIAL PROOF (7 sub-types)**

69. **number_of_users:** "10,000 customers", "millions of people"
70. **bestseller_status:** "Bestselling", "#1 product"
71. **waitlist_scarcity:** "10,000 people on waitlist"
72. **media_mentions:** Featured on TV, news, magazines
73. **industry_adoption:** Other doctors/professionals now using this
74. **geographic_spread:** "In 47 countries", "across America"
75. **time_tested:** "For 10 years", "since 2005", longevity as proof

---

**Example Proof Inventory Entry:**

```json
{
  "proof_id": "proof_001",
  "category": "credentials",
  "sub_type": "medical_doctor_degree",
  "content_summary": "Dr. Steven Gundry is an MD who graduated from Yale with honors and Medical College of Georgia",
  "verbatim_quote": "I'm Dr. Steven Gundry. I graduated from Yale University with honors, received my MD from the Medical College of Georgia",
  "placement": "lead",
  "supports_element": "mechanism",
  "five_dimension_scores": {
    "authority_weight": 8,
    "specificity": 7,
    "emotional_impact": 3,
    "believability": 9,
    "relevance_to_promise": 7
  }
},
{
  "proof_id": "proof_002",
  "category": "credentials",
  "sub_type": "professor_academic",
  "content_summary": "16 years as professor of surgery at Loma Linda, world-famous medical center",
  "verbatim_quote": "I was a professor and chairman of cardiothoracic surgery at Loma Linda University for 16 years",
  "placement": "lead",
  "supports_element": "authority",
  "five_dimension_scores": {
    "authority_weight": 9,
    "specificity": 8,
    "emotional_impact": 4,
    "believability": 9,
    "relevance_to_promise": 6
  }
},
{
  "proof_id": "proof_003",
  "category": "credentials",
  "sub_type": "patents_inventions",
  "content_summary": "Invented the Gundry Retrograde Cardioplegic device used in heart surgery",
  "verbatim_quote": "I'm the inventor of devices that are used in heart surgery, including the Gundry Retrograde Cardioplegic Cannula",
  "placement": "lead",
  "supports_element": "authority",
  "five_dimension_scores": {
    "authority_weight": 9,
    "specificity": 9,
    "emotional_impact": 5,
    "believability": 10,
    "relevance_to_promise": 5
  }
}
```

---

#### 3.7 story_architecture (NEW - CRITICAL)

**Type:** `object`
**Required:** IF story is present (not all copy uses story)
**Purpose:** Map complete story structure, beats, emotional arc, and persuasion function

```json
"story_architecture": {
  "story_type": "origin|transformation|discovery|patient_case|personal_struggle|hero_journey|david_vs_goliath|revelation",
  "protagonist": "doctor|patient|researcher|everyman|authority|rebel",
  "protagonist_name": "name if given",

  "story_beats": [
    {
      "beat": "setup",
      "summary": "What is the normal world? Who is the character before transformation?",
      "key_details": ["specific details from this beat"]
    },
    {
      "beat": "inciting_incident",
      "summary": "What disrupts the status quo?",
      "key_details": []
    },
    {
      "beat": "struggle",
      "summary": "What obstacles/failures occur?",
      "key_details": []
    },
    {
      "beat": "discovery",
      "summary": "What breakthrough or revelation happens?",
      "key_details": []
    },
    {
      "beat": "transformation",
      "summary": "What changes as a result?",
      "key_details": []
    },
    {
      "beat": "new_reality",
      "summary": "What is life like now after transformation?",
      "key_details": []
    }
  ],

  "emotional_arc": "despair_to_hope|confusion_to_clarity|suffering_to_relief|shame_to_dignity|powerless_to_empowered",
  "key_characters": ["list all characters who appear in story"],
  "lesson_or_moral": "what the story proves or teaches",
  "persuasion_function": "what role does this story play? (build authority|create identification|prove mechanism|demonstrate transformation|neutralize objection)",

  "placement": "lead_story|body_case_study|woven_throughout|featured_section",
  "story_length": "brief_anecdote|moderate_story|extended_narrative",
  "full_story_text": "complete verbatim story if extractable",

  "story_callbacks": "Is this story referenced again later? How?",
  "emotional_peak": "What is the most emotional moment in the story?"
}
```

**Field Definitions:**

- **story_type:** Primary story pattern
  - **origin:** How the doctor/product came to be
  - **transformation:** Patient/person transformed by solution
  - **discovery:** How the breakthrough was discovered
  - **patient_case:** Specific patient case study
  - **personal_struggle:** The authority's own struggle
  - **hero_journey:** Classic hero's journey structure
  - **david_vs_goliath:** Underdog vs. powerful enemy
  - **revelation:** Sudden revelation/epiphany moment

- **protagonist:** Who is the main character?
- **story_beats:** Map the narrative structure
  - Not all stories have all beats - capture what's present
  - Be specific in summaries

- **emotional_arc:** What emotional journey does the story take us on?
- **key_characters:** Who appears? (protagonist, antagonist, supporting characters)
- **lesson_or_moral:** What does this story prove?
- **persuasion_function:** WHY is this story in the copy? What job does it do?

**Example:**
```json
"story_architecture": {
  "story_type": "personal_struggle",
  "protagonist": "doctor",
  "protagonist_name": "Dr. Steven Gundry",

  "story_beats": [
    {
      "beat": "setup",
      "summary": "Dr. Gundry was 70 pounds overweight despite being a top heart surgeon and doing everything 'right'",
      "key_details": [
        "Running 30 miles per week",
        "Going to gym 1 hour every day",
        "Eating healthy low-fat vegetarian diet",
        "Still couldn't lose weight"
      ]
    },
    {
      "beat": "struggle",
      "summary": "Despite all his medical knowledge and extreme discipline, nothing worked. The paradox of doctor who saves others but can't fix himself.",
      "key_details": [
        "Knew more about human body than 99.9% of people",
        "Had unlimited willpower (running 30 miles/week proves this)",
        "Still failing, feeling hopeless"
      ]
    },
    {
      "beat": "discovery",
      "summary": "Discovered leaky gut and lectins were sabotaging everything. The 'healthy' whole wheat vegetarian diet was the problem, not the solution.",
      "key_details": [
        "Realized lectins in whole grains, beans, tomatoes were creating holes in gut lining",
        "Endotoxins flooding body, triggering weight gain as defense mechanism",
        "Everything he'd been taught about healthy eating was backwards"
      ]
    },
    {
      "beat": "transformation",
      "summary": "Lost 70 pounds, resolved health issues, and now helps thousands of patients do the same",
      "key_details": [
        "Developed Total Restore formula",
        "Wrote bestselling books",
        "Transformed from failing patient to leading authority"
      ]
    },
    {
      "beat": "new_reality",
      "summary": "Now lives with sustained weight loss, boundless energy, and mission to help others escape the same trap",
      "key_details": [
        "Maintains healthy weight effortlessly",
        "Built entire practice around gut health",
        "Helping thousands reverse same issues"
      ]
    }
  ],

  "emotional_arc": "shame_to_dignity",
  "key_characters": ["Dr. Gundry"],
  "lesson_or_moral": "Even top doctors can't overcome biology with willpower. If it's not working, you don't need more discipline - you need different information. The problem isn't you, it's leaky gut caused by foods you thought were healthy.",
  "persuasion_function": "Build authority (he's a top surgeon), create identification (if HE struggled, prospects can relate), prove mechanism (his own transformation validates the leaky gut/lectin theory), neutralize objection (can't be lack of willpower - he ran 30 miles/week!)",

  "placement": "lead_story",
  "story_length": "moderate_story",
  "full_story_text": "I used to be 70 pounds overweight, and I was running 30 miles a week. I was going to the gym one hour every day, and eating a healthy, low fat vegetarian diet, and no matter what I did, I couldn't lose weight. I'm a doctor. I'm a heart surgeon. I know more about the human body than 99.9% of people on this planet. And I couldn't figure out why I was gaining weight instead of losing it...",

  "story_callbacks": "Referenced throughout copy when discussing willpower, discipline, healthy eating myths. Used to pre-handle 'I've tried everything' objection.",
  "emotional_peak": "The moment of hopeless frustration - 'I'm a heart surgeon and I couldn't even fix myself' - creates maximum identification and hope (if he figured it out, so can I)"
}
```

---

#### 3.8 narrative_flow (NEW - CRITICAL)

**Type:** `object`
**Required:** YES
**Purpose:** Map the complete persuasion sequence - how the copy unfolds section by section

This captures the ARCHITECTURE of the copy - the order, pacing, and flow of persuasion elements.

```json
"narrative_flow": {
  "section_sequence": [
    {
      "section_name": "hook",
      "purpose": "grab attention, pattern interrupt",
      "dominant_element": "promise|enemy|story|statistic|shocking_claim",
      "key_content": "brief summary of what this section contains",
      "approx_duration_pct": 5,
      "proof_density": "sparse|moderate|heavy"
    },
    {
      "section_name": "problem_agitation",
      "purpose": "amplify pain, establish stakes",
      "dominant_element": "enemy|root_cause|failed_solutions|pain_points",
      "key_content": "",
      "approx_duration_pct": 15,
      "proof_density": "moderate"
    },
    {
      "section_name": "authority_building",
      "purpose": "establish credibility to be believed",
      "dominant_element": "credentials|story|demonstration",
      "key_content": "",
      "approx_duration_pct": 10,
      "proof_density": "heavy"
    },
    {
      "section_name": "mechanism_reveal",
      "purpose": "explain the true root cause and how solution works",
      "dominant_element": "mechanism|root_cause|villain",
      "key_content": "",
      "approx_duration_pct": 20,
      "proof_density": "moderate"
    },
    {
      "section_name": "proof_parade",
      "purpose": "validate mechanism with studies, testimonials, demonstrations",
      "dominant_element": "studies|testimonials|demonstrations",
      "key_content": "",
      "approx_duration_pct": 20,
      "proof_density": "heavy"
    },
    {
      "section_name": "offer_reveal",
      "purpose": "present solution/product",
      "dominant_element": "offer|uniqueness|value_stack",
      "key_content": "",
      "approx_duration_pct": 15,
      "proof_density": "moderate"
    },
    {
      "section_name": "close",
      "purpose": "final push to action",
      "dominant_element": "urgency|guarantee|future_pacing|cta",
      "key_content": "",
      "approx_duration_pct": 15,
      "proof_density": "moderate"
    }
  ],

  "transition_techniques": [
    "how sections connect - specific transition phrases or devices used"
  ],

  "pacing_rhythm": "slow_build|rapid_fire|wave_pattern|linear_escalation",
  "pacing_notes": "description of pacing strategy",

  "repetition_patterns": [
    "key phrases or concepts repeated throughout - list them"
  ],

  "callbacks": [
    "elements referenced multiple times - what and where"
  ],

  "section_count": 0,
  "total_word_count_estimate": 0
}
```

**Field Definitions:**

- **section_sequence:** The complete flow of sections
  - **section_name:** What is this section called/what does it do?
  - **purpose:** What persuasion job does this section accomplish?
  - **dominant_element:** What element drives this section?
  - **key_content:** Brief summary of content
  - **approx_duration_pct:** Roughly what % of total copy is this section?
  - **proof_density:** How much proof in this section?

- **transition_techniques:** How does copy move from section to section?
  - Examples: "But here's what I discovered...", "Now let me show you...", "Before I reveal...", "First, you need to understand..."

- **pacing_rhythm:** Overall rhythm pattern
  - **slow_build:** Gradually builds intensity
  - **rapid_fire:** Quick hits, fast pace
  - **wave_pattern:** Builds, releases, builds again
  - **linear_escalation:** Steady climb to peak

- **repetition_patterns:** What gets repeated?
  - Core promises, villain names, mechanism terms, emotional phrases
  - Example: "It's all in your gut" repeated 7 times throughout

- **callbacks:** What earlier elements are referenced later?
  - Example: "Remember what I told you about lectins in the beginning? Well now you understand WHY..."

**Example:**
```json
"narrative_flow": {
  "section_sequence": [
    {
      "section_name": "hook",
      "purpose": "Pattern interrupt and authority establishment",
      "dominant_element": "shocking_claim",
      "key_content": "20 doctors told you it's in your head, but it's actually all in your gut - Dr. Gundry was 70lbs overweight despite extreme exercise/diet",
      "approx_duration_pct": 5,
      "proof_density": "sparse"
    },
    {
      "section_name": "credibility_building",
      "purpose": "Establish Gundry's authority to be believed",
      "dominant_element": "credentials",
      "key_content": "Yale grad, MD, 16 years professor at Loma Linda, performed more infant heart transplants than anyone, inventor of heart surgery device",
      "approx_duration_pct": 8,
      "proof_density": "heavy"
    },
    {
      "section_name": "problem_agitation",
      "purpose": "Amplify frustration and create identification",
      "dominant_element": "failed_solutions",
      "key_content": "You've tried everything - diets, exercise, willpower - nothing works. It's not your fault. You had wrong information.",
      "approx_duration_pct": 12,
      "proof_density": "moderate"
    },
    {
      "section_name": "mechanism_reveal",
      "purpose": "Reveal true root cause (leaky gut/lectins) with vivid visual metaphors",
      "dominant_element": "mechanism",
      "key_content": "Gut lining one cell thick like Secret Service agents. Lectins break through creating holes. Endotoxins storm through causing weight gain, inflammation, brain fog.",
      "approx_duration_pct": 25,
      "proof_density": "moderate"
    },
    {
      "section_name": "villain_identification",
      "purpose": "Name the enemy and create enemy backstory",
      "dominant_element": "enemy",
      "key_content": "Lectins in 'healthy' foods (whole grains, tomatoes, beans). Big Agriculture pushed these since 1950. Obesity tripled, diabetes up 800% in same period.",
      "approx_duration_pct": 10,
      "proof_density": "moderate"
    },
    {
      "section_name": "proof_parade",
      "purpose": "Validate mechanism with studies and testimonials",
      "dominant_element": "studies",
      "key_content": "Clinical studies on gut lining repair, Pepsin GI 92% improvement, patient testimonials with specific results",
      "approx_duration_pct": 15,
      "proof_density": "heavy"
    },
    {
      "section_name": "solution_reveal",
      "purpose": "Introduce Total Restore as unique solution",
      "dominant_element": "offer",
      "key_content": "First and ONLY formula with 16 gut hero ingredients. Three-prong defense. Breakthrough Pepsin GI ingredient.",
      "approx_duration_pct": 12,
      "proof_density": "moderate"
    },
    {
      "section_name": "offer_details",
      "purpose": "Present pricing, guarantee, bonuses",
      "dominant_element": "value_stack",
      "key_content": "Pricing options, 90-day guarantee, bonus reports",
      "approx_duration_pct": 8,
      "proof_density": "sparse"
    },
    {
      "section_name": "close",
      "purpose": "Future pacing and final CTA",
      "dominant_element": "future_pacing",
      "key_content": "Imagine 90 days from now - the weight gone, energy back, finally free. No-risk guarantee. Order now.",
      "approx_duration_pct": 5,
      "proof_density": "moderate"
    }
  ],

  "transition_techniques": [
    "But here's what I discovered... (transitions from problem to mechanism)",
    "Now let me show you the proof... (transitions from mechanism to evidence)",
    "So what does this mean for you? (transitions from science to application)",
    "Here's the good news... (transitions from problem to solution)"
  ],

  "pacing_rhythm": "slow_build",
  "pacing_notes": "Opens with quick hook, then slows down to build authority and explain mechanism in detail. Speeds up again during proof parade. Slows for offer. Final push at close.",

  "repetition_patterns": [
    "It's all in your gut (repeated 7 times)",
    "Leaky gut (repeated 15+ times)",
    "Lectins (repeated 20+ times)",
    "One cell thick (repeated 4 times)",
    "Not your fault (repeated 5 times)"
  ],

  "callbacks": [
    "Dr. Gundry's 70-pound weight loss story - mentioned in hook, referenced in mechanism section, referenced again in close",
    "Secret Service agents metaphor - introduced in mechanism, referenced again in proof section",
    "1950 timeline - mentioned when introducing villain, referenced again when discussing obesity/diabetes statistics"
  ],

  "section_count": 9,
  "total_word_count_estimate": 3500
}
```

---

#### 3.9 offer (ENHANCED)

**Type:** `object`
**Required:** YES
**Purpose:** Complete offer architecture including value stack, pricing psychology, and risk reversal

```json
"offer": {
  "main_product": "product name",
  "positioning": "solution|transformation|system|secret|formula|protocol|breakthrough",

  "value_stack_sequence": [
    {
      "item": "main product",
      "item_description": "what it is",
      "value_stated": "$297 or whatever anchor price is shown",
      "order": 1
    },
    {
      "item": "bonus 1 name",
      "item_description": "what it is",
      "value_stated": "$97",
      "order": 2
    }
  ],

  "total_stated_value": "$XXX",

  "price_psychology": {
    "anchor_price": "high price shown first (if any)",
    "actual_price": "discounted/real price",
    "discount_frame": "percentage|dollar_amount|comparison|time_limited",
    "payment_options": ["one_pay", "2_pay", "3_pay", "subscription"],
    "price_per_day": "if broken down to daily cost",
    "price_justification": "how price is explained/defended",
    "comparison_anchors": ["what price is compared to - e.g., 'less than a cup of coffee per day'"]
  },

  "offer_flow": "simple|tiered|upsell_sequence|bundle|continuity",

  "urgency_scarcity": {
    "type": "time_limited|quantity_limited|bonus_expiring|price_increasing|none",
    "language": "exact urgency language used",
    "deadline_specified": "specific deadline or vague",
    "scarcity_proof": "how scarcity is proven (timer, inventory count, etc.)"
  },

  "guarantee": {
    "type": "money_back|results_guarantee|satisfaction_guarantee|double_guarantee",
    "duration": "30_day|60_day|90_day|1_year|lifetime",
    "language": "exact guarantee language",
    "risk_reversal_strength": "weak|moderate|strong|extreme",
    "conditions": "any conditions or fine print"
  },

  "bonuses": [
    {
      "bonus_name": "",
      "bonus_description": "",
      "stated_value": "",
      "bonus_type": "report|video|coaching|tool|resource"
    }
  ],

  "unique_mechanism_claim": "how offer is positioned as unique/proprietary"
}
```

**Field Definitions:**

- **main_product:** Product name
- **positioning:** How is it framed? Solution, system, formula, breakthrough?

- **value_stack_sequence:** ORDER MATTERS - capture the sequence of how value is built
  - Each item in order presented
  - Stated value for each
  - This builds to total value before price reveal

- **price_psychology:** Complete pricing strategy
  - **anchor_price:** High price shown first (if any) to make real price feel like deal
  - **actual_price:** The real price
  - **discount_frame:** How is discount presented?
  - **payment_options:** What payment structures offered?
  - **price_per_day:** Break down to tiny daily amount
  - **price_justification:** Why it's worth the price
  - **comparison_anchors:** What is price compared to?

- **offer_flow:** Structure of offer
  - **simple:** One product, one price
  - **tiered:** Multiple pricing tiers
  - **upsell_sequence:** Front-end offer → upsells
  - **bundle:** Multiple products bundled
  - **continuity:** Subscription/recurring

- **urgency_scarcity:** Time/quantity pressure
- **guarantee:** Risk reversal structure
  - **risk_reversal_strength:** How strong is the guarantee?
    - **weak:** Standard 30-day money back
    - **moderate:** 60-90 day money back
    - **strong:** 90-day + keep bonuses
    - **extreme:** Double-your-money-back, lifetime guarantee, "I'll pay you if it doesn't work"

**Example:**
```json
"offer": {
  "main_product": "Gundry MD Total Restore",
  "positioning": "formula",

  "value_stack_sequence": [
    {
      "item": "Total Restore 90-day supply",
      "item_description": "Three month supply of Total Restore gut lining repair formula",
      "value_stated": "$297",
      "order": 1
    },
    {
      "item": "The Leaky Gut Food List",
      "item_description": "Complete list of lectin-containing foods to avoid and gut-healing foods to eat",
      "value_stated": "$47",
      "order": 2
    },
    {
      "item": "Gut Health Recipe Collection",
      "item_description": "50 lectin-free recipes",
      "value_stated": "$37",
      "order": 3
    }
  ],

  "total_stated_value": "$381",

  "price_psychology": {
    "anchor_price": "$297",
    "actual_price": "$69.95 per bottle (3 bottles for $209.85)",
    "discount_frame": "dollar_amount",
    "payment_options": ["one_pay"],
    "price_per_day": "$2.33 per day",
    "price_justification": "Less than a cup of coffee per day to repair your gut and transform your health. Compare to cost of failed diets, gym memberships you don't use, doctor visits for symptoms.",
    "comparison_anchors": [
      "Less than a cup of coffee",
      "Less than one doctor visit copay",
      "Fraction of cost of failed diet programs"
    ]
  },

  "offer_flow": "simple",

  "urgency_scarcity": {
    "type": "quantity_limited",
    "language": "Due to high demand and limited supply of Pepsin GI ingredient, we can only produce limited batches. Current inventory is selling fast.",
    "deadline_specified": "vague",
    "scarcity_proof": "inventory claim (not proven with countdown)"
  },

  "guarantee": {
    "type": "money_back",
    "duration": "90_day",
    "language": "Try Total Restore for 90 days. If you don't see dramatic improvement in your gut health, energy, and weight - if you're not absolutely thrilled with your results - simply return the bottles (even if they're empty) for a full refund. No questions asked.",
    "risk_reversal_strength": "moderate",
    "conditions": "None stated"
  },

  "bonuses": [
    {
      "bonus_name": "The Leaky Gut Food List",
      "bonus_description": "Complete list of lectin-containing foods to avoid and gut-healing foods to eat",
      "stated_value": "$47",
      "bonus_type": "report"
    },
    {
      "bonus_name": "Gut Health Recipe Collection",
      "bonus_description": "50 lectin-free recipes",
      "stated_value": "$37",
      "bonus_type": "report"
    }
  ],

  "unique_mechanism_claim": "First and ONLY formula combining 16 gut hero ingredients with breakthrough Pepsin GI clinically proven to repair gut lining. Three-prong defense system no other product offers."
}
```

---

#### 3.10 close (ENHANCED)

**Type:** `object`
**Required:** YES
**Purpose:** Capture the complete closing sequence and final push strategy

```json
"close": {
  "type": "emotional|logical|urgency|fear_of_loss|future_pacing",
  "cta_text": "exact button text or order language",

  "sequence": [
    {
      "element": "summarize_transformation",
      "text": "verbatim or summary of this element"
    },
    {
      "element": "future_pacing",
      "text": ""
    },
    {
      "element": "risk_reversal",
      "text": ""
    },
    {
      "element": "urgency",
      "text": ""
    },
    {
      "element": "final_cta",
      "text": ""
    }
  ],

  "emotional_escalation": "calm_to_urgent|logical_to_emotional|fear_to_hope|present_to_future",

  "future_pacing_text": "verbatim future pacing language (imagine yourself 30 days from now...)",

  "final_objection_handling": "last objections addressed before CTA",

  "final_push": "last argument/reason to act now before CTA",

  "risk_reversal_restatement": "how guarantee is restated in close",

  "close_length": "brief|moderate|extended",
  "word_count": 0
}
```

**Field Definitions:**

- **type:** Primary close strategy
- **cta_text:** Exact call-to-action wording
- **sequence:** The ORDER of close elements matters - map it
- **emotional_escalation:** How does emotion build to CTA?
- **future_pacing_text:** Critical element - capture exact language
- **final_objection_handling:** What last objections are neutralized?
- **final_push:** The last reason to act NOW
- **risk_reversal_restatement:** Guarantee mentioned again?

**Example:**
```json
"close": {
  "type": "future_pacing",
  "cta_text": "Click the button below to claim your discounted supply of Total Restore now",

  "sequence": [
    {
      "element": "summarize_transformation",
      "text": "You've seen the science. You understand that leaky gut is the real root cause. You know that lectins in 'healthy' foods are creating holes in your gut lining."
    },
    {
      "element": "future_pacing",
      "text": "Imagine 90 days from now. You wake up with energy you haven't felt in years. You look in the mirror and see the weight melting away - not from willpower or starvation, but because your body is finally healing. Your brain fog lifts. Your joints stop aching. You feel like YOU again."
    },
    {
      "element": "risk_reversal",
      "text": "And remember - you have a full 90 days to try Total Restore completely risk-free. If you don't absolutely love your results, return it for a full refund. You literally cannot lose."
    },
    {
      "element": "urgency",
      "text": "But you need to act now. Due to limited supply of our breakthrough Pepsin GI ingredient, this batch won't last long. And frankly, every day you wait is another day of lectins damaging your gut lining."
    },
    {
      "element": "final_cta",
      "text": "Click the button below right now to claim your discounted supply of Total Restore and start healing your gut today."
    }
  ],

  "emotional_escalation": "logical_to_emotional",

  "future_pacing_text": "Imagine 90 days from now. You wake up with energy you haven't felt in years. You look in the mirror and see the weight melting away - not from willpower or starvation, but because your body is finally healing. Your brain fog lifts. Your joints stop aching. You feel like YOU again.",

  "final_objection_handling": "Addresses 'is this worth it?' by emphasizing zero risk with 90-day guarantee. Addresses 'I can wait' with urgency about limited supply and ongoing gut damage.",

  "final_push": "Every day you wait is another day of lectins damaging your gut lining - creates urgency by emphasizing cost of inaction",

  "risk_reversal_restatement": "Full 90-day guarantee restated - 'you literally cannot lose'",

  "close_length": "moderate",
  "word_count": 187
}
```

---

### 4. metadata (ENHANCED)

**Type:** `object`
**Required:** YES
**Purpose:** Track source, quality, classification, and extraction details

```json
"metadata": {
  "source_collection": "CA Pro|TFA|Boardroom|Vault|Other",
  "source_weight": 1.0-3.0,
  "original_source": "original source name",
  "raw_swipe_file": "filename of source document",
  "processed_file": "filename of this JSON",

  "niche": "health|finance|relationships|business|spirituality|other",
  "sub_niche": "specific sub-niche if applicable",
  "format": "VSL|sales_letter|advertorial|email_sequence|webinar|ad|landing_page",
  "era": "pre-2010|2010-2015|2015-2020|2020+",

  "big_idea_type": "ENEMY_NAMING|MECHANISM_REVEAL|PROMISE_BREAKTHROUGH|IDENTITY_SHIFT|ORIGIN_STORY|other",
  "big_idea_name": "name of the big idea if it has one",
  "central_concept": "1-3 sentence summary of the core persuasion concept",

  "market_sophistication_stage": "1_first_claim|2_product_promise|3_mechanism|4_proprietary_mechanism|5_experience_identification",

  "quality_score": 0-100,
  "extraction_confidence": 0-100,

  "tier": 1 or 2,
  "extraction_version": "v3",
  "extraction_date": "YYYY-MM-DD",
  "extractor_notes": "any important context, caveats, or notes about this extraction"
}
```

**Field Definitions:**

- **source_collection:** Where did this come from?
- **source_weight:** 1.0 = ordinary, 2.0 = proven control, 3.0 = legendary control
- **original_source:** Specific source name
- **raw_swipe_file:** Original filename
- **processed_file:** This JSON filename

- **niche:** Primary market
- **sub_niche:** More specific (e.g., health → gut health, weight loss, anti-aging)
- **format:** Media format
- **era:** Time period (copy techniques evolve over time)

- **big_idea_type:** Primary Big Idea pattern
- **big_idea_name:** If the Big Idea has a name (The Leaky Gut Solution, The Metabolic Switch, etc.)
- **central_concept:** One-paragraph summary of the entire persuasion concept

- **market_sophistication_stage:** Schwartz stage 1-5

- **quality_score:** Subjective quality rating (how good is this copy?)
- **extraction_confidence:** How confident are you in the extraction accuracy?

- **tier:** 1 or 2 (vault tier system)
- **extraction_version:** v3
- **extraction_date:** When extracted
- **extractor_notes:** Any important notes

**Example:**
```json
"metadata": {
  "source_collection": "CA Pro",
  "source_weight": 2.0,
  "original_source": "CA Pro",
  "raw_swipe_file": "The-New-Gut-Fix.docx.md",
  "processed_file": "goldenhippo_gundrymd_totalrestore_vsl_001.json",

  "niche": "health",
  "sub_niche": "gut_health_weight_loss",
  "format": "VSL",
  "era": "2020+",

  "big_idea_type": "ENEMY_NAMING",
  "big_idea_name": "The Leaky Gut / Lectin Solution",
  "central_concept": "It doesn't matter that 20 doctors told you it's in your head - it's actually all in your gut. You could be doing everything right (running 30 miles/week, gym daily, healthy low-fat vegetarian diet) and still gain 70 pounds like Dr. Gundry did. Why? Leaky gut. Lectins (tiny proteins in 'health foods' like whole grains, tomatoes, eggplants) break through your razor-thin gut lining (one cell thick), creating holes. Then endotoxins (microscopic bacteria pieces) storm through, invading your body causing weight gain, fatigue, brain fog, joint pain, skin issues. Your brain stays on threat level red until glial cells wear down and brain cells die. Since 1950, obesity tripled and diabetes skyrocketed 800% - same time whole wheat 'health foods' and lectin-rich foods exploded. Total Restore is the world's first formula with 16 gut hero ingredients including breakthrough Pepsin GI (clinically proven 92% improvement) that doesn't just soothe but actually REPAIRS gut holes using three-prong defense.",

  "market_sophistication_stage": "4_proprietary_mechanism",

  "quality_score": 95,
  "extraction_confidence": 85,

  "tier": 2,
  "extraction_version": "v3",
  "extraction_date": "2026-01-26",
  "extractor_notes": "Exceptional example of mechanism-driven VSL with heavy visual metaphors. Dr. Gundry's personal story creates powerful identification. Lectin enemy is counter-intuitive (healthy foods as villain) which creates breakthrough feeling. Three-prong defense positioning differentiates from simple probiotics."
}
```

---

## Extraction Guidelines

### Priority Levels

**TIER 1: CRITICAL - Must Extract (Required for all v3 extractions)**

1. **proof_inventory** - Every proof element must be captured and classified
   - Use 75-sub-type taxonomy precisely
   - Score all five dimensions objectively
   - Track sequence and density
   - This is THE most time-consuming but most valuable extraction

2. **promise_architecture** - Complete promise hierarchy
   - Primary promise with all attributes
   - Supporting promises
   - Promise ceiling/floor
   - Proof pairings (which proof backs which promise)
   - Failure reframe

3. **mechanism (13-dimension)** - Full mechanism scoring
   - All 13 dimensions scored 0-10 objectively
   - E5 typing with explanation
   - Complete explanation text verbatim
   - Key analogies/metaphors

4. **root_cause_architecture** - Complete three-part reframe
   - What they think / what it really is / why nothing worked
   - Villain profile (all attributes)
   - Countersells
   - Expression methods

**TIER 2: HIGH PRIORITY - Should Extract (Skip only if truly absent)**

5. **story_architecture** - If any story present, map completely
   - All story beats
   - Emotional arc
   - Persuasion function
   - Full story text

6. **narrative_flow** - Section-by-section mapping
   - Complete sequence
   - Transitions
   - Pacing rhythm
   - Repetition patterns
   - Callbacks

7. **offer (enhanced)** - Complete offer structure
   - Value stack sequence (order matters)
   - Price psychology
   - Risk reversal strength
   - Urgency/scarcity

8. **close (enhanced)** - Complete closing sequence
   - Element order
   - Future pacing verbatim
   - Emotional escalation

**TIER 3: MEDIUM PRIORITY - Extract if clearly present**

9. Enhanced lead, headline, configuration scores

---

### Quality Standards

**proof_inventory Standards:**

- **Completeness:** Capture EVERY proof element. If there are 23 testimonials, catalog all 23.
- **Precision:** Use exact sub-type from 75-taxonomy. Don't default to generic types.
- **Objectivity:** Five-dimension scores must be based on evidence, not impressions.
  - Don't score testimonial 10/10 on believability just because it sounds good
  - Score based on: Is it verified? Is it specific? Are there details that make it credible?
- **Sequencing:** Track ORDER - proof sequence matters enormously
- **Verbatim quotes:** For key testimonials, capture exact quote

**Example Quality Check:**
```
BAD:
{
  "proof_id": "proof_001",
  "category": "testimonials",
  "sub_type": "testimonial",
  "content_summary": "Someone lost weight",
  "five_dimension_scores": {"authority_weight": 5, "specificity": 5, ...}
}

GOOD:
{
  "proof_id": "proof_001",
  "category": "testimonials",
  "sub_type": "before_after_numbers",
  "content_summary": "Susan M. from Ohio lost 47 pounds in 12 weeks, dropped 3 dress sizes, and eliminated joint pain that had plagued her for 8 years",
  "verbatim_quote": "I lost 47 pounds in just 12 weeks! I went from a size 16 to a size 10, and the joint pain I'd suffered with for 8 years is completely gone. I feel 20 years younger!",
  "placement": "mid_body",
  "supports_element": "promise",
  "five_dimension_scores": {
    "authority_weight": 3,
    "specificity": 9,
    "emotional_impact": 8,
    "believability": 7,
    "relevance_to_promise": 10
  }
}
```

**13-Dimension Mechanism Scoring Standards:**

- **Objective measurement:** Score based on what's IN THE COPY, not your opinion of the mechanism
- **Evidence-based:** Each score should have evidence
  - novelty: 8 → Why? "Market hasn't heard about lectins causing leaky gut before"
  - specificity: 8 → Why? "Names specific proteins (lectins), specific process (breaking tight junctions), specific consequence (endotoxins flooding body)"

- **Calibration:** Use the full 0-10 range
  - Don't cluster everything at 7-8
  - If mechanism is vague, score specificity at 2-4
  - If mechanism is revolutionary, score novelty at 9-10

**E5 Mechanism Typing Standards:**

- **Explanation required:** Don't just label it - explain WHY
- **Market context:** Consider market sophistication
  - Same mechanism can be E1 in one market, E3 in another
- **Honest assessment:** Don't inflate sophistication
  - Most mechanisms are E2-E3
  - E5 is rare (true paradigm shift)

**Root Cause Architecture Standards:**

- **Three-part structure must be complete:** All three parts filled in
- **Villain must be specific:** Don't just say "industry" - say "Big Agriculture whole grain lobby"
- **Countersells must be explicit:** List specific past solutions that are neutralized and HOW

**Story Architecture Standards:**

- **Beat mapping must be thorough:** Don't skip beats that are present
- **Full story text for key stories:** If it's a major story (like Gundry's personal story), capture it completely
- **Persuasion function must be identified:** Every story has a job - what is it?

**Narrative Flow Standards:**

- **Section boundaries must be clear:** Where does one section end and next begin?
- **Transitions must be specific:** Quote actual transition language when possible
- **Percentage estimates should sum to ~100%:** If your sections add to 150%, you've double-counted

---

### Extraction Process Recommendations

**Step 1: First Pass - Structural Mapping (30 minutes)**
- Read through entire piece
- Identify major sections
- Note where key elements appear (mechanism, proof, story, offer, close)
- Map narrative_flow structure

**Step 2: Second Pass - Proof Inventory (60-90 minutes)**
- This is the longest part
- Go section by section
- Catalog EVERY proof element
- Classify using 75-taxonomy
- Score five dimensions
- Track sequence

**Step 3: Third Pass - Deep Element Extraction (45-60 minutes)**
- Extract promise_architecture
- Score mechanism 13-dimensions
- Map root_cause_architecture
- Map story_architecture (if present)
- Extract offer and close sequences

**Step 4: Fourth Pass - Refinement (30 minutes)**
- Fill in metadata
- Add configuration scores
- Review for completeness
- Add extractor_notes with insights

**Total Time Estimate: 3-4 hours for Tier 2 swipe**

---

### Extraction Tips

**For proof_inventory:**
- Use a spreadsheet first, then convert to JSON
- Create running list as you go through copy
- Mark each proof in source document as you catalog it (so you don't miss any)
- For heavy proof pieces, expect 40-80 proof elements

**For mechanism scoring:**
- Score each dimension independently
- Write brief justification for each score (even if not in final JSON)
- Compare to other mechanisms in vault to calibrate
- Remember: Score reflects strength in THIS COPY, not objective truth about mechanism

**For story_architecture:**
- Listen for "setup → struggle → discovery → transformation" pattern
- Not all stories have all beats - map what's there
- Protagonist can shift (might start with patient, shift to doctor)
- Key question: "What job is this story doing in the persuasion?"

**For root_cause_architecture:**
- Three-part structure is THE key pattern
- Villain should be named as specifically as possible
- Reframe technique: How is belief being shifted?
- Emphasis level: How foundational is this to the copy?

**For narrative_flow:**
- Think in terms of "acts" or "movements"
- Track dominant element per section
- Note when proof density spikes (often corresponds to mechanism reveal or offer)
- Callbacks are powerful - track them explicitly

---

## Example Use Cases

### Use Case 1: Building Proof Sequence for New Promo

**Query:** "Show me all health VSLs where proof_density in lead is 'heavy' and strongest_proof_type is 'credentials'"

**Result:** Find patterns where authority is front-loaded

**Application:** Building new health promo where we want to establish authority immediately

---

### Use Case 2: Mechanism Sophistication Analysis

**Query:** "Show all mechanisms with novelty > 7 AND simplicity > 7 in weight loss sub-niche"

**Result:** Identify mechanisms that are both novel AND easy to understand (rare combination)

**Application:** Looking for "sweet spot" mechanisms - new but not confusing

---

### Use Case 3: Promise Ceiling Benchmarking

**Query:** "What's the promise_ceiling range for gut health offers with quality_score > 90?"

**Result:** "Complete gut lining repair", "Reverse leaky gut", "Eliminate all inflammatory symptoms"

**Application:** Calibrate promise ceiling for new gut health offer - don't overpromise or underpromise

---

### Use Case 4: Root Cause Reframe Patterns

**Query:** "Show all root_cause_architecture where reframe_technique is 'not_your_fault' and emphasis_level is 'foundation'"

**Result:** Find promos where "it's not your fault" reframe is the foundation

**Application:** Learn how to structure not-your-fault reframe as foundation vs. supporting element

---

### Use Case 5: Story Beat Mapping

**Query:** "Show all story_architecture where story_type is 'personal_struggle' and protagonist is 'doctor'"

**Result:** Find pattern of doctor-struggles-then-discovers stories

**Application:** Template for writing authority origin story

---

## Version History

- **v1:** Basic structural extraction (headline, lead, mechanism name, proof types, offer, close)
- **v2:** Enhanced with configuration scoring, root_cause, basic proof tracking
- **v3:** Deep extraction protocol with proof_inventory (75-taxonomy), 13-dimension mechanism scoring, E5 typing, promise_architecture, story_architecture, narrative_flow, enhanced offer/close
- **v3.1 (2026-02-03):** Added RSF (Resonant Surprise Framework) - the meta-architecture capturing R (Relatable Problem), S (Specific Solution), F (Freedom Promise) as top-level extraction component. RSF provides the persuasion scaffold that integrates root_cause, mechanism, and promise_architecture into unified flow analysis.

---

## Appendix: Quick Reference

### 75-Sub-Type Taxonomy Quick List

**Credentials (1-10):**
1. medical_doctor_degree
2. phd_researcher
3. professor_academic
4. clinical_researcher
5. institutional_affiliation
6. awards_honors
7. publications_author
8. patents_inventions
9. years_experience
10. specialty_board_certification

**Studies (11-25):**
11. randomized_controlled_trial
12. double_blind_study
13. meta_analysis
14. university_study
15. journal_citation
16. clinical_trial
17. lab_results
18. statistical_data
19. longitudinal_study
20. placebo_controlled
21. human_subjects_study
22. large_sample_size
23. recent_study
24. multiple_studies
25. study_replication

**Testimonials (26-45):**
26. before_after_physical
27. before_after_numbers
28. emotional_transformation
29. specific_outcome_claim
30. timeframe_specified
31. skeptic_converted
32. last_resort_success
33. rapid_results
34. unexpected_benefits
35. life_changing_declaration
36. professional_endorsement
37. celebrity_testimonial
38. verified_purchaser
39. video_testimonial
40. multiple_symptoms_resolved
41. family_impact
42. financial_impact
43. detailed_story
44. aggregated_testimonials
45. medical_professional_testimonial

**Demonstration (46-55):**
46. live_demonstration
47. video_proof
48. photo_evidence
49. chart_graph_visual
50. comparison_test
51. ingredient_showcase
52. mechanism_animation
53. real_time_results
54. x_ray_scan_medical_imaging
55. challenge_accepted

**Celebrity (56-60):**
56. celebrity_user
57. expert_interviewer
58. authority_figure_endorsement
59. media_personality
60. industry_leader

**Logic (61-68):**
61. deductive_reasoning
62. if_then_logic
63. elimination_logic
64. common_sense_appeal
65. mathematical_proof
66. mechanism_explanation_as_proof
67. historical_precedent
68. evolutionary_biology

**Social Proof (69-75):**
69. number_of_users
70. bestseller_status
71. waitlist_scarcity
72. media_mentions
73. industry_adoption
74. geographic_spread
75. time_tested

---

### 13-Dimension Mechanism Scoring Quick Reference

1. **novelty** - How new/fresh?
2. **specificity** - How detailed/concrete?
3. **credibility** - How believable?
4. **simplicity** - How easy to understand?
5. **emotional_resonance** - How emotionally compelling?
6. **enemy_clarity** - How clearly does it identify enemy?
7. **visual_metaphor** - How visual/imaginable?
8. **proof_density** - How much proof supports it?
9. **transformation_speed** - How quickly does it promise results?
10. **effort_required** - How easy to activate? (INVERSE: higher = less effort)
11. **universality** - How broadly applicable?
12. **scientific_backing** - How much legitimate science?
13. **proprietary_feel** - How unique/exclusive?

---

### E5 Mechanism Type Quick Reference

- **E1:** Incremental improvement to existing mechanism
- **E2:** New application of known mechanism
- **E3:** Reframe of existing mechanism with new villain/explanation
- **E4:** Proprietary/branded mechanism or unique combination
- **E5:** Paradigm shift, completely new worldview

---

## Final Notes

This v3 schema represents a **massive upgrade** in extraction depth and intelligence value. While v1/v2 told us "this promo uses testimonials and has a mechanism," v3 tells us:

- Exactly which 75 sub-types of proof are used and in what sequence
- How strong the mechanism is across 13 objective dimensions
- What level of market sophistication the mechanism targets (E1-E5)
- Complete promise hierarchy and support structure
- Full story beat mapping with persuasion function
- Section-by-section narrative flow with transitions and callbacks
- Enhanced offer and close sequencing

This transforms the vault from a **reference library** into a **copywriting intelligence system**.

The time investment is significant (3-4 hours per Tier 2 extraction vs. 45-60 minutes for v2), but the intelligence value is exponentially higher.

**When to use v3 vs. v2:**
- **v3:** Tier 2 swipes, controls, pieces you want to study deeply
- **v2:** Tier 1 swipes, quick reference pieces, volume extraction

Start with 10-15 high-quality v3 extractions to build pattern recognition, then expand the vault systematically.

---

**END SCHEMA DOCUMENTATION**
