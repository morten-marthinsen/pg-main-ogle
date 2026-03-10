# Headline Type Taxonomy

**Version:** 1.0
**Skill:** 10-headlines
**Purpose:** Formal enumeration of all headline types for generation and specimen indexing
**Source:** Synthesized from Makepeace, Carlton, Deustch, Evaldo teachings + TIER1 extraction patterns

---

## LEVEL 1: STRATEGIC CATEGORY

Match headline category to market sophistication level.

```yaml
strategic_categories:
  benefit:
    market_stage: [1, 2, 3]
    description: "Direct promise delivery"
    when_to_use: "Market ready to believe claims, low skepticism"

  emotional:
    market_stage: [3, 4]
    description: "Dominant emotion trigger"
    when_to_use: "Claim saturation, need feeling over logic"

  curiosity:
    market_stage: [4, 5]
    description: "Intrigue/paradox hook"
    when_to_use: "Burnt market screens out obvious promises"

  mechanism:
    market_stage: [3, 4, 5]
    description: "HOW delivery - the method/system"
    when_to_use: "Claims need proof of method, E3+ sophistication"

  authority:
    market_stage: [3, 4, 5]
    description: "WHO credibility - the source"
    when_to_use: "Skeptical audience needs trusted source"
```

---

## LEVEL 2: TEMPLATE TYPES

### A. Promise Templates (Information-seeking prospects)

```yaml
promise_templates:
  how_to:
    formula: "How [target] Can [result]"
    frequency: "very_high"
    example: "How Doctors Stay Well While Treating Sick People All Day"
    pairs_with: ["paradox", "specificity", "mechanism"]

  secrets_reveal:
    formula: "[Authority] Reveals Secret of [benefit]"
    frequency: "high"
    example: "Doctor Reveals Secret of Youthful Skin"
    pairs_with: ["authority", "forbidden", "discovery"]

  warning:
    formula: "WARNING: [threat]"
    frequency: "high"
    example: "WARNING: Your #1 Asset Is Now In Extreme Danger!"
    pairs_with: ["urgency", "fear", "prophecy"]

  who_else:
    formula: "Who Else Wants [benefit]?"
    frequency: "medium"
    example: "Who Else Wants To Make Six Figures From Home?"
    pairs_with: ["social_proof", "desire", "question"]

  now_you_can:
    formula: "Now You Can [previously impossible]"
    frequency: "medium"
    example: "Now You Can Retire Wealthy... Without Saving Another Dime"
    pairs_with: ["breakthrough", "liberation", "paradox"]

  at_last:
    formula: "At Last... [solution to frustration]"
    frequency: "medium"
    example: "At Last... A Diet That Actually Works for Women Over 40"
    pairs_with: ["frustration_relief", "validation", "specificity"]

  discover:
    formula: "Discover [hidden benefit]"
    frequency: "high"
    example: "Discover The Ancient Secret To Perfect Sleep"
    pairs_with: ["curiosity", "hidden_truth", "mechanism"]

  free:
    formula: "Free: [valuable thing]"
    frequency: "medium"
    example: "Free Report: 7 Tax Loopholes Your Accountant Missed"
    pairs_with: ["value", "specificity", "authority"]
```

### B. Provoke Templates (Skeptical/emotional prospects)

```yaml
provoke_templates:
  they_laughed:
    formula: "They Laughed When I [action] But When I [result]..."
    frequency: "medium"
    example: "They Laughed When I Sat Down At The Piano..."
    pairs_with: ["underdog", "transformation", "story"]

  give_me_x_time:
    formula: "Give Me [time] and I'll Give You [result]"
    frequency: "medium"
    example: "Give Me 7 Days And I'll Give You A Flat Stomach"
    pairs_with: ["transaction", "specificity", "guarantee"]

  lazy_way:
    formula: "The Lazy Person's Way to [result]"
    frequency: "low"
    example: "The Lazy Man's Way to Riches"
    pairs_with: ["ease", "contrarian", "greed"]

  easily_achieve:
    formula: "How to Easily [hard thing] in [short time]"
    frequency: "medium"
    example: "How To Easily Drop 20 Pounds In 30 Days"
    pairs_with: ["speed", "ease", "specificity"]

  dont_have_to_be:
    formula: "You Don't Have to Be [qualifier] to [achieve]"
    frequency: "low"
    example: "You Don't Have to Be Rich to Retire Wealthy"
    pairs_with: ["democratization", "hope", "contrarian"]

  shameless:
    formula: "SHAMELESS [villain/action]!"
    frequency: "low"
    example: "SHAMELESS TWO-FACED S.O.B.'s!"
    pairs_with: ["anger", "betrayal", "enemy_expose"]

  forbidden:
    formula: "FORBIDDEN [topic]!"
    frequency: "medium"
    example: "FORBIDDEN CURES!"
    pairs_with: ["suppression", "conspiracy", "authority"]

  betrayal:
    formula: "BETRAYED [emotional trigger]"
    frequency: "low"
    example: "BETRAYED AGAIN!"
    pairs_with: ["anger", "vindication", "enemy"]
```

### C. Curiosity Templates (Sophisticated prospects)

```yaml
curiosity_templates:
  handwriting_on_wall:
    formula: "[Cryptic prophecy phrase]"
    frequency: "low"
    example: "The HANDWRITING is on the WALL"
    pairs_with: ["prophecy", "sophisticated", "financial"]

  paradox:
    formula: "[Contradictory benefit claim]"
    frequency: "high"
    example: "714% PROFITS When Interest Rates Rise!"
    pairs_with: ["counterintuitive", "curiosity", "mechanism"]

  skeptical_question:
    formula: "Is This Really [impossible claim]?"
    frequency: "medium"
    example: "Is This The World's First Spot-Reducing Diet?"
    pairs_with: ["question", "skepticism_reduction", "curiosity"]

  counterintuitive:
    formula: "[Opposite of expected truth]"
    frequency: "high"
    example: "Why Your Doctor's Advice Could Be Killing You"
    pairs_with: ["contrarian", "enemy", "revelation"]

  cliffhanger:
    formula: "[Incomplete statement creating gap]"
    frequency: "medium"
    example: "The One Thing Millionaires Never Tell You About..."
    pairs_with: ["curiosity", "insider", "secret"]

  suppressed_question:
    formula: "Why Haven't You Been Told About [secret]?"
    frequency: "medium"
    example: "Why Haven't You Been Told About This $3 Remedy?"
    pairs_with: ["conspiracy", "suppression", "authority"]
```

### D. Mechanism Templates (E3-E5 sophistication)

```yaml
mechanism_templates:
  mechanism_reveal:
    formula: "The [Mechanism Name] That [benefit]"
    frequency: "high"
    example: "The CGF Factor That Rebuilds Cells at the Cellular Level"
    pairs_with: ["naming", "science", "specificity"]

  discovery_narrative:
    formula: "[Authority] discovered [mechanism] that [benefit]"
    frequency: "very_high"
    example: "A doctor was shocked to discover his trusted vitamins were shortchanging his body..."
    pairs_with: ["authority", "story", "revelation"]

  proprietary_system:
    formula: "The [Branded Name] [System/Method/Formula]"
    frequency: "medium"
    example: "The Triple Coil Swing™ That Adds 30 Yards"
    pairs_with: ["naming", "proprietary", "specificity"]

  opposite_technique:
    formula: "[Counterintuitive method]"
    frequency: "medium"
    example: "Do The OPPOSITE Of What Every Golf Pro Says..."
    pairs_with: ["contrarian", "authority_challenge", "curiosity"]
```

---

## LEVEL 3: OPENER/STARTER WORDS

```yaml
opener_categories:
  curiosity_triggers:
    starters: ["How to", "Secret", "Discover", "Warning", "Why", "What"]
    psychological_trigger: "Information gap"

  credibility_builders:
    starters: ["Proven", "Guaranteed", "At Last", "Doctor", "Study", "Research"]
    psychological_trigger: "Trust/authority"

  urgency_drivers:
    starters: ["Now", "Last Chance", "Limited", "Today", "Before [date]", "Finally"]
    psychological_trigger: "Time pressure"

  benefit_amplifiers:
    starters: ["Free", "Bonus", "Save", "Money", "New", "Breakthrough"]
    psychological_trigger: "Value/greed"

  pattern_interrupts:
    starters: ["LIES", "Shameless", "Forbidden", "Shocking", "Exposed", "Banned"]
    psychological_trigger: "Emotion shock"

  question_starters:
    starters: ["Are you...?", "Do you...?", "Is your...?", "What if...?", "Can you...?"]
    psychological_trigger: "Self-diagnosis"

  number_starters:
    starters: ["7 Ways", "3 Secrets", "The #1", "The Single", "5 Steps", "21 Proven"]
    psychological_trigger: "Specificity/completeness"
```

---

## LEVEL 4: HEADLINE FORMAT TYPE

```yaml
format_types:
  statement:
    description: "Declarative claim"
    when_to_use: "Direct benefit delivery, confident positioning"
    example: "Reverse Type 2 Diabetes in 3 Days"

  question:
    description: "Question format"
    when_to_use: "Reduce skepticism, engage reader, sophisticated markets"
    example: "Is This The World's First Spot-Reducing Diet?"

  command:
    description: "Imperative instruction"
    when_to_use: "Urgency, action-oriented, direct response"
    example: "Stop Wasting Money on Vitamins That Don't Work"

  news:
    description: "Announcement format"
    when_to_use: "Timely/topical hook available, breakthrough positioning"
    example: "New Discovery: Scientists Reverse Aging in Mice"

  story:
    description: "Mini-narrative in headline"
    when_to_use: "Discovery/transformation angle, authority + curiosity"
    example: "A doctor was shocked to discover..."
```

---

## LEVEL 5: TIER1 VAULT PATTERN TYPES

These classifications appear in TIER1 extraction reports and should be used for vault intelligence matching.

```yaml
vault_pattern_types:
  benefit:
    description: "Direct outcome promise"
    example_swipe: "Reverse Type 2 Diabetes in 3 Days"

  benefit_with_discovery:
    description: "Benefit + discovery narrative combined"
    example_swipe: "A doctor was shocked to discover..."

  question:
    description: "Skeptical/curiosity question format"
    example_swipe: "Is This The World's First...?"

  warning:
    description: "Threat/danger alert"
    example_swipe: "WARNING: Your #1 Asset..."

  story_origin:
    description: "Origin narrative compressed into headline"
    example_swipe: "A bald-headed barber helped save my hair"

  miracle_question:
    description: "Impossible benefit posed as question"
    example_swipe: "Can This Tiny Pill Really...?"

  solution_positioning:
    description: "Solution to named problem"
    example_swipe: "The Answer to Chronic Fatigue"

  cultural_authority:
    description: "Geographic/cultural credibility"
    example_swipe: "Japan's #1 Health Secret"

  deadline_transformation:
    description: "Time-bound transformation promise"
    example_swipe: "In Just 7 Days You'll..."

  prospect_parlance:
    description: "Reader's own voice/confession style"
    example_swipe: "I Panicked When I Saw..."

  curiosity_question:
    description: "Pure curiosity without explicit benefit"
    example_swipe: "What Do These 5 Things Have In Common?"

  suppressed_information:
    description: "Hidden/forbidden knowledge angle"
    example_swipe: "Why Haven't You Been Told...?"

  trend_announcement:
    description: "News/movement hook"
    example_swipe: "The New Movement Sweeping..."

  replacement_promise:
    description: "Alternative to existing solution"
    example_swipe: "Better Than Statin Drugs"

  price_specific:
    description: "Price-anchored offer headline"
    example_swipe: "Just $37 Gets You..."
```

---

## LEVEL 6: PRE-HEAD TYPES

```yaml
prehead_types:
  urgency:
    formula: "Before [date], you have ONE chance to..."
    purpose: "Time pressure before main headline"

  credentialize:
    formula: "[Expert name]—who correctly predicted..."
    purpose: "Authority establishment before bold claim"

  controversy:
    formula: "[Position A] says X. [Position B] says Y. Here's the data..."
    purpose: "Set up conflict, position as arbiter"

  promise:
    formula: "Discover how to [benefit]..."
    purpose: "Deliver benefit when headline is mystery/curiosity"

  play_up_claim:
    formula: "Arguably the greatest [claim] in [timeframe]"
    purpose: "Amplify magnitude of main claim"

  transaction:
    formula: "Give me [time/effort], I'll give you [result]"
    purpose: "Fair exchange framing"

  condition:
    formula: "If you [qualifier], then..."
    purpose: "Target specific prospect segment"

  call_out:
    formula: "ATTENTION [audience]: Prepare to..."
    purpose: "Flag specific audience"
```

---

## SPECIMEN PRIORITY

Types requiring verbatim specimens, prioritized by frequency and impact:

### CRITICAL (Need 2-3 specimens each)
1. `how_to`
2. `warning`
3. `discovery_narrative`
4. `question` (skeptical/miracle)
5. `paradox`
6. `mechanism_reveal`

### IMPORTANT (Need 1-2 specimens each)
7. `secrets_reveal`
8. `they_laughed`
9. `forbidden`
10. `shameless/betrayal`
11. `counterintuitive`
12. `prospect_parlance`
13. `benefit_with_discovery`

### SECONDARY (Need 1 specimen each)
14. `who_else`
15. `now_you_can`
16. `lazy_way`
17. `give_me_x_time`
18. `story_origin`
19. `suppressed_question`
20. `cultural_authority`

---

## USAGE IN GENERATION

When generating headlines:

1. **Diagnose market sophistication** (Stage 1-5)
2. **Select strategic category** (Benefit/Emotional/Curiosity/Mechanism/Authority)
3. **Choose 2-3 template types** from appropriate category
4. **Select opener words** that match psychological trigger needed
5. **Determine format type** (statement/question/command/news/story)
6. **Apply 6 Maxims** for optimization
7. **Add pre-head** if credibility/urgency needed
8. **Reference specimens** for the selected template type

---

**Taxonomy Status:** COMPLETE
**Next Step:** Populate with verbatim specimens from TIER1 vault
