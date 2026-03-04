# HEADLINE EXTRACTION FIELDS — V3 Schema Enhancement

**Date:** 2026-01-31
**Purpose:** Enhanced headline field specification for Headline Skill support
**Applies To:** All Tier 1 extractions (Arsenal re-extraction + RSF enhancement)

---

## ENHANCED HEADLINE SCHEMA

Replace the existing `components.headline` object with this expanded version:

```json
"headline": {
  // === CORE FIELDS (existing) ===
  "main_headline": "Exact headline text, verbatim",
  "subheadline": "Secondary headline or null",
  "deck_copy": "Supporting copy between headline and body, or null",

  // === PATTERN CLASSIFICATION (enhanced) ===
  "pattern_type": "benefit|curiosity|news|question|how_to|command|secret|warning|story_hook|contrarian|prophecy",
  "format_pattern": "question|statement|command|how_to|list|story_hook|news_flash|quote|number_lead",
  "power_words": ["array", "of", "emotionally", "charged", "words"],
  "specificity_elements": ["concrete numbers", "names", "places", "timeframes"],

  // === NEW: Promise Compression ===
  "promise_compression": {
    "core_promise_in_headline": "The essential promise distilled to headline form",
    "promise_type": "outcome|transformation|discovery|avoidance|speed|ease",
    "implicit_vs_explicit": "implicit|explicit",
    "promise_strength": 1-10
  },

  // === NEW: Curiosity Architecture ===
  "curiosity_architecture": {
    "curiosity_gap": "What information is the reader missing that they now need?",
    "gap_type": "mechanism|result|identity|enemy|secret|story",
    "resolution_promise": "instant|within_lead|delayed|never_fully_resolved",
    "tension_level": 1-10
  },

  // === NEW: Schema Analysis (RSF) ===
  "schema_analysis": {
    "expectation_violated": "What conventional headline expectation does this violate?",
    "schema_distance_estimate": 1-10,
    "whitespace_territory": "What messaging territory does this occupy that competitors don't?",
    "conventional_alternative": "What a typical/boring headline would say instead"
  },

  // === NEW: Emotional Engineering ===
  "emotional_engineering": {
    "primary_emotion": "fear|curiosity|hope|anger|shame|greed|pride|urgency",
    "secondary_emotion": "optional secondary emotion or null",
    "emotional_intensity": 1-10,
    "emotional_trajectory": "Where does this emotion lead the reader emotionally?"
  },

  // === NEW: Mechanism Presence ===
  "mechanism_presence": {
    "mechanism_hinted": true|false,
    "mechanism_named": true|false,
    "mechanism_name_in_headline": "The mechanism name if present, or null",
    "tease_level": "none|light|moderate|heavy"
  },

  // === NEW: VSL Adaptation ===
  "vsl_adaptation": {
    "works_above_video": true|false,
    "video_hook_potential": "How this could work as text above a VSL",
    "spoken_version": "How this would sound spoken (for VSL intros)",
    "title_card_version": "Shortened version for video title card"
  },

  // === NEW: Formula Pattern ===
  "formula_pattern": {
    "matches_known_formula": true|false,
    "formula_name": "Name of formula if matches (e.g., 'How To + Benefit', 'Number + Noun')",
    "formula_variation": "How this varies from the standard formula"
  },

  // === NEW: Headline-Lead Connection ===
  "headline_lead_connection": {
    "lead_continuation": "How the lead continues/fulfills the headline promise",
    "gap_resolution_timing": "immediate|after_hook|delayed|gradual",
    "headline_callback_in_lead": "Verbatim text where lead references headline, or null"
  }
}
```

---

## FIELD DEFINITIONS

### Promise Compression

**core_promise_in_headline:** The headline's promise distilled to its essence. What is the reader being promised, explicitly or implicitly?

**promise_type:**
- `outcome` — Promises a specific result ("Lose 20 lbs in 30 days")
- `transformation` — Promises identity/life change ("Become the golfer you always wanted to be")
- `discovery` — Promises new knowledge ("The secret Wall Street doesn't want you to know")
- `avoidance` — Promises escape from pain ("Never suffer joint pain again")
- `speed` — Promises quick results ("In just 7 days")
- `ease` — Promises effortless process ("Without dieting or exercise")

**implicit_vs_explicit:**
- `explicit` — Promise stated directly ("Gain 30 yards off the tee")
- `implicit` — Promise implied through curiosity/intrigue ("The 3-second swing fix Tiger's coach uses")

**promise_strength:** 1-10 rating of how compelling/specific the promise is

### Curiosity Architecture

**curiosity_gap:** The specific information gap created. What does the reader now NEED to know?

**gap_type:**
- `mechanism` — "What IS this thing that works so well?"
- `result` — "What results did they get?"
- `identity` — "Who is this person/expert?"
- `enemy` — "What's been holding me back?"
- `secret` — "What's the hidden information?"
- `story` — "What happened next?"

**resolution_promise:**
- `instant` — Gap resolved in first sentence of lead
- `within_lead` — Gap resolved by end of lead
- `delayed` — Gap resolved later in body
- `never_fully_resolved` — Gap keeps reader through entire piece

**tension_level:** 1-10 rating of how urgent the need to resolve the gap feels

### Schema Analysis (RSF Integration)

**expectation_violated:** What would a reader expect to see in this niche? How does this headline defy that expectation?

**schema_distance_estimate:**
- 1-3: Conventional — sounds like everything else in niche
- 4-5: Moderate — "That's interesting..."
- 6-7: Strong — "Wait, what? Tell me more!"
- 8-9: Significant — "That's surprising..."
- 10: Extreme — may confuse before it engages

**whitespace_territory:** The unique positioning this headline occupies that competitors don't. What makes it different from the saturated messaging landscape?

**conventional_alternative:** What a typical, formula-following competitor headline would say. This helps identify the schema violation by contrast.

### Emotional Engineering

**primary_emotion:** The dominant emotion the headline triggers

**emotional_intensity:** 1-10 rating of how strongly the emotion is triggered

**emotional_trajectory:** Where does this emotion lead? Does fear lead to hope? Does curiosity lead to desire?

### Mechanism Presence

**mechanism_hinted:** Is the mechanism referenced at all, even obliquely?

**mechanism_named:** Is the actual mechanism name stated in the headline?

**tease_level:**
- `none` — No mechanism reference
- `light` — Vague reference ("a new discovery")
- `moderate` — Category reference ("a plant compound from the Amazon")
- `heavy` — Near-complete mechanism tease ("The NIA-114 peptide complex")

### VSL Adaptation

**works_above_video:** Would this headline work as text above a video player?

**video_hook_potential:** How the headline concept could adapt to VSL format

**spoken_version:** How this would sound if read aloud in the first 5 seconds of a VSL

**title_card_version:** A shortened version (50-70 chars) for video title cards

### Formula Pattern

**matches_known_formula:** Does this follow a recognized headline formula?

**formula_name:** Examples:
- "How To + Benefit"
- "Number + Noun That + Benefit"
- "Question + Implied Answer"
- "They Laughed When + But Then"
- "Warning: + Threat"
- "The Secret of + Desired Outcome"
- "Metaphor Comparison" (Better Than Botox)
- "News Hijack + Pivot"
- "Confession + Resolution"

**formula_variation:** How does this vary from the standard formula? What makes it fresh?

### Headline-Lead Connection

**lead_continuation:** How does the lead pick up where the headline left off? Does it answer the question? Continue the story? Amplify the promise?

**gap_resolution_timing:**
- `immediate` — First sentence resolves headline promise/question
- `after_hook` — Resolution comes after hook sentence
- `delayed` — Resolution is postponed to build tension
- `gradual` — Resolution unfolds progressively through lead

**headline_callback_in_lead:** If the lead explicitly references the headline (echoes words, answers the question), capture that verbatim text.

---

## EXTRACTION GUIDELINES

### Priority: CRITICAL

The headline is the #1 determinant of whether someone engages with copy. Extract with full attention.

### For Print/Sales Letters/Magalogs
- Main headline is typically the largest text
- Subheadline often appears directly below in smaller font
- Deck copy may appear between headline and body

### For VSLs
- Main headline is text above video player OR first title card
- "Subheadline" may be the first spoken hook
- Deck copy is often the descriptive text below the video

### For Advertorials
- Main headline is the article headline
- Subheadline is often a subtitle or byline
- Deck copy may be the article intro paragraph styled differently

### Edge Cases
- If no clear headline exists, use the first attention-grabbing statement
- If multiple headlines exist (A/B tests), extract the primary/most prominent
- Note in `extraction_notes` if headline identification was ambiguous

---

## SCORING RUBRIC

When extracting, rate headline quality on these dimensions:

| Dimension | Weight | Criteria |
|-----------|--------|----------|
| Clarity | 15% | Is the promise/hook immediately clear? |
| Curiosity | 20% | Does it create a gap the reader needs closed? |
| Specificity | 15% | Does it use concrete details vs. vague claims? |
| Emotional Impact | 20% | Does it trigger a visceral emotional response? |
| Schema Distance | 15% | Does it violate expectations in a compelling way? |
| Lead Connection | 15% | Does it set up a lead that delivers? |

**Overall Headline Score:** Weighted average of dimensions (1-10)

---

## EXAMPLE: FULLY EXTRACTED HEADLINE

**Source:** "Better Than Botox" (StriVectin)

```json
"headline": {
  "main_headline": "Better Than Botox?",
  "subheadline": "A cream developed for stretch marks may reduce wrinkles better than a $300 injection",
  "deck_copy": null,

  "pattern_type": "curiosity",
  "format_pattern": "question",
  "power_words": ["Better", "Botox"],
  "specificity_elements": ["$300 injection", "stretch marks", "wrinkles"],

  "promise_compression": {
    "core_promise_in_headline": "Anti-wrinkle results superior to Botox",
    "promise_type": "outcome",
    "implicit_vs_explicit": "implicit",
    "promise_strength": 9
  },

  "curiosity_architecture": {
    "curiosity_gap": "What cream is this? How can a stretch mark cream beat Botox?",
    "gap_type": "mechanism",
    "resolution_promise": "within_lead",
    "tension_level": 8
  },

  "schema_analysis": {
    "expectation_violated": "Skin creams are expected to be weak compared to medical procedures. Stretch mark creams are a different category entirely.",
    "schema_distance_estimate": 7,
    "whitespace_territory": "Accidental discovery from adjacent product category beating premium medical procedure",
    "conventional_alternative": "New Anti-Wrinkle Cream Clinically Proven to Reduce Fine Lines"
  },

  "emotional_engineering": {
    "primary_emotion": "curiosity",
    "secondary_emotion": "hope",
    "emotional_intensity": 8,
    "emotional_trajectory": "Curiosity → Skeptical interest → Hope that this could work for them"
  },

  "mechanism_presence": {
    "mechanism_hinted": true,
    "mechanism_named": false,
    "mechanism_name_in_headline": null,
    "tease_level": "light"
  },

  "vsl_adaptation": {
    "works_above_video": true,
    "video_hook_potential": "Strong - question format works well above video",
    "spoken_version": "What if there was something... better than Botox?",
    "title_card_version": "Better Than Botox?"
  },

  "formula_pattern": {
    "matches_known_formula": true,
    "formula_name": "Metaphor Comparison",
    "formula_variation": "Uses question mark to soften the claim while still planting it"
  },

  "headline_lead_connection": {
    "lead_continuation": "Lead explains the accidental discovery of women 'borrowing' stretch mark cream",
    "gap_resolution_timing": "after_hook",
    "headline_callback_in_lead": "worked better on wrinkles than anything they'd ever tried - including $300+ Botox injections"
  }
}
```

---

## INTEGRATION WITH EXTRACTION WORKFLOW

1. **Arsenal Re-Extraction:** Extract ALL headline fields from original source markdown
2. **RSF Enhancement:** Add `schema_analysis` to existing extractions
3. **Quality Check:** Verify `curiosity_architecture` and `promise_compression` populated
4. **Vault Intelligence:** Build headline patterns for Headline Skill consumption

---

**Document Status:** Ready for implementation
**Next Step:** Integrate into extraction protocol for both tracks
