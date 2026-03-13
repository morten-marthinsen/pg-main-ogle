# Deep Research Brief Template

**Version:** 1.1
**Purpose:** Standardized input format for initiating Deep Research v3 projects (now with Story Elements collection)
**Usage:** Duplicate this file, rename to `[project-name]-brief.md`, fill in all fields, then provide to Master Agent

---

## HOW TO USE THIS TEMPLATE

1. **Duplicate** this file in Obsidian (right-click → "Make a copy" or Cmd/Ctrl+D)
2. **Rename** the duplicate to your project name (e.g., `acme-widget-brief.md`)
3. **Fill in** all required fields (marked with `[REQUIRED]`)
4. **Complete** optional fields where relevant to your project
5. **Provide** the completed brief to the Master Agent to initiate research

---

## SECTION 1: PRODUCT IDENTITY [REQUIRED]

> **Purpose:** Minimal identification only. This tells the research system WHAT we're researching — it does NOT bias the research direction.

```yaml
product:
  name: ""                    # Product or service name
  category: ""                # e.g., "SaaS", "Info Product", "Physical Product", "Service"
  one_sentence: ""            # What it is in one sentence (factual, not marketing)
  price_point: ""             # Approximate price or range

market:
  mode: ""                    # A (existing product with marketing) or B (new/concept)
  industry: ""                # e.g., "Finance", "Health", "B2B Software", "Personal Development"
```

---

## SECTION 2: EXISTING ASSETS [REQUIRED FOR MODE A]

> **Purpose:** Links to what already exists. Raw materials, not interpretation.

```yaml
assets:
  sales_page: ""              # Primary sales page URL (if exists)
  other_urls:                 # Additional relevant URLs
    - ""
    - ""
  documents:                  # Local file paths or Obsidian links (if relevant)
    - ""
```

---

## SECTION 3: BUSINESS CONTEXT [OPTIONAL]

> **Purpose:** Helps the research system understand WHY this research is being done and what decisions it will inform.
>
> **AGENT INSTRUCTION:** This section is for CONTEXT only. It does NOT modify research scope, reduce any requirements, or bias the discovery process. All standard phases, gates, and minimums remain in full effect.

```yaml
context:
  why_now: ""                 # What triggered this research need?

  decisions_pending:          # What decisions will this research inform?
    - ""                      # e.g., "Pricing strategy for launch"
    - ""                      # e.g., "Naming/positioning direction"
    - ""                      # e.g., "Whether to enter this market"
    - ""                      # e.g., "Which segment to target first"

  target_customer: ""         # Who it's currently positioned for (if known)
```

---

## SECTION 4: HYPOTHESES TO VALIDATE [OPTIONAL]

> **Purpose:** Things you suspect but need validated or invalidated by the research. These will be explicitly addressed in the Final Handoff with evidence-based verdicts.
>
> **AGENT INSTRUCTION:** These hypotheses are to be TESTED against the evidence collected during research. They do NOT bias the collection process — all standard quote buckets and minimums still apply. Hypotheses are validated/invalidated AFTER Layer 2.5 synthesis, using the evidence that was collected through the unbiased standard process.

```yaml
hypotheses:
  - statement: ""             # e.g., "Price sensitivity is high in this market"
    rationale: ""             # Why you suspect this

  - statement: ""             # e.g., "The main competitor is weak on customer support"
    rationale: ""

  - statement: ""             # e.g., "Trust is the primary barrier to conversion"
    rationale: ""
```

**Maximum 5 hypotheses.** More than 5 suggests the research scope may be too broad or the hypotheses need consolidation.

---

## SECTION 5: ADDITIONAL QUESTIONS [OPTIONAL]

> **Purpose:** Specific questions you want answered IN ADDITION TO the standard research outputs. These will receive dedicated responses in the Final Handoff.
>
> **AGENT INSTRUCTION:** These questions are ADDITIVE. They do NOT replace or reduce ANY standard research phases. All gates, minimums, and quality standards remain in full effect. Answer these questions IN ADDITION TO completing the full Layer 1-2-2.5-3 process. Questions are answered during Layer 3 synthesis using the comprehensive evidence base collected through the standard process.

```yaml
additional_questions:
  - ""                        # e.g., "What price points do competitors use?"
  - ""                        # e.g., "How do customers talk about [specific feature]?"
  - ""                        # e.g., "What naming patterns exist in this market?"
  - ""                        # e.g., "What objections appear most frequently?"
```

**No limit on questions**, but each will receive a dedicated evidence-based response in the Final Handoff.

---

## SECTION 6: EXPLORATION EMPHASIS [OPTIONAL, MAX 3]

> **Purpose:** Areas where you want ADDITIONAL depth beyond the standard research. These are BONUS exploration areas, not replacements for standard coverage.
>
> **AGENT INSTRUCTION:** Emphasis areas add DEPTH in specific zones. They do NOT reduce depth elsewhere. All bucket minimums, all quote requirements, all standard coverage remains mandatory. AFTER meeting ALL standard minimums, allocate additional scraping passes and analysis attention to emphasized areas. Maximum 3 emphasis areas to prevent scope diffusion.

```yaml
exploration_emphasis:
  - area: ""                  # e.g., "Pricing conversations and objections"
    why: ""                   # Why this area matters for your project

  - area: ""                  # e.g., "Competitor X specifically"
    why: ""

  - area: ""                  # e.g., "The onboarding/first-use experience"
    why: ""
```

**Maximum 3 emphasis areas.** If you need more, consider which are truly priorities vs. general curiosity.

---

## SECTION 7: CONSTRAINTS [OPTIONAL]

> **Purpose:** Practical limitations on the research execution.

```yaml
constraints:
  budget: 25                  # Scraping budget in $ (default $25)
  timeline: "standard"        # "standard" or "rush"
  platform_restrictions:      # Any platforms to avoid (legal, brand, access reasons)
    - ""
```

---

## SECTION 8: STORY ELEMENTS [RECOMMENDED]

> **Purpose:** Raw material for the campaign story. The AI cannot fabricate discovery narratives, founder journeys, or proof data — this section captures the FACTUAL elements that make stories authentic and honest.
>
> **AGENT INSTRUCTION:** Story elements are collected during Layer 2 story research and output in the FINAL_HANDOFF for downstream use by 10-Story skill. Client-provided elements take precedence over researched elements. Elements tagged as [FACTUAL] must be preserved exactly; [ENHANCE] elements can be narratively improved.

### 8A: Discovery/Origin Narrative

> **Fill in what you KNOW.** Leave blank what you don't know — the research process will attempt to find public information.

```yaml
discovery_narrative:
  # WHO discovered/created this solution?
  discoverer:
    name: ""                      # Full name (or "Prefer not to disclose")
    title: ""                     # e.g., "PhD Researcher", "Former Marine", "Grandmother"
    credentials: ""               # Specific credentials that matter
    can_use_name: true            # Can we use their real name in copy?
    backstory_notes: ""           # Any relevant personal history

  # WHERE did the discovery happen?
  location:
    place: ""                     # e.g., "A research lab in Malaysia", "My grandmother's kitchen"
    geographic_detail: ""         # Any exotic or specific geographic elements
    institution: ""               # University, company, or organization (if applicable)

  # HOW was it discovered?
  circumstances:
    type: ""                      # "accidental" | "deliberate_research" | "personal_desperation" | "inherited_knowledge" | "other"
    description: ""               # What actually happened? (Be specific)
    trigger_event: ""             # What started the search? What problem demanded a solution?
    aha_moment: ""                # The specific moment of realization

  # Physical or exotic elements (these create believability)
  artifacts:
    physical_objects: []          # e.g., "leather pouch", "ancient manuscript", "grandfather's notebook"
    foreign_elements: []          # e.g., foreign words, traditional practices, exotic ingredients
    sensory_details: ""           # What could someone see, smell, taste, touch in this story?
```

### 8B: Founder/Protagonist Journey

> **If the product has a founder story or the campaign will use a protagonist, document their journey here.**

```yaml
founder_journey:
  # The personal WHY
  personal_struggle:
    problem_faced: ""             # What problem did they personally experience?
    emotional_impact: ""          # How did it affect them emotionally?
    who_else_affected: ""         # Family members, loved ones impacted?

  # The low point
  vulnerability_moment:
    lowest_moment: ""             # What was rock bottom?
    what_almost_stopped_them: ""  # What obstacle almost ended the journey?
    specific_incident: ""         # A specific scene/incident (if available)

  # The breakthrough
  turning_point:
    what_changed: ""              # What breakthrough occurred?
    first_success: ""             # First time it worked — what happened?
    reaction: ""                  # How did they feel/react?

  # Can we tell this story?
  permissions:
    can_share_publicly: true      # Is this story approved for marketing use?
    names_to_change: []           # Any names that need pseudonyms?
    details_to_omit: []           # Anything that must NOT be included?
```

### 8C: Proof Elements

> **Documented results, testimonials with stories (not just quotes), and quantified data.**

```yaml
proof_elements:
  # Testimonials with STORIES (not just soundbites)
  testimonial_stories:
    - name: ""                    # Customer name (or "John D." if anonymous)
      can_use_name: true
      before_state: ""            # Their situation before
      transformation: ""          # What changed for them
      specific_results: ""        # Quantified if possible
      emotional_quote: ""         # Their words about the experience
      story_notes: ""             # Any additional story details

    - name: ""
      can_use_name: true
      before_state: ""
      transformation: ""
      specific_results: ""
      emotional_quote: ""
      story_notes: ""

  # Quantified data
  data_points:
    total_customers: ""           # How many people have used this?
    success_metrics: ""           # Success rate, average results, etc.
    timeframes: ""                # How long to see results?
    study_references: []          # Any clinical studies, trials, surveys?

  # Before/After documentation
  transformations:
    documented_cases: ""          # How many documented before/after cases exist?
    proof_formats: []             # "photos" | "measurements" | "testimonials" | "video" | "data"
    access_to_proof: ""           # Can we access/use this proof in copy?
```

### 8D: Expert/Authority Figures (The "Yoda")

> **If there's an expert who validates the solution (other than the discoverer), document them here.**

```yaml
authority_figures:
  - name: ""
    title: ""                     # e.g., "Harvard Researcher", "Former NASA Scientist"
    credentials: ""               # Specific credentials
    relationship: ""              # How are they connected to the product/discovery?
    endorsement: ""               # What do they say about it?
    can_use_name: true
    can_use_quotes: true
    institution: ""               # Their institution (if relevant)
```

### 8E: Existing Brand Story Assets

> **If the brand already has story elements in use, document them here so research can build on (not contradict) them.**

```yaml
existing_story_assets:
  current_origin_story: ""        # Does the brand already tell a discovery/origin story?
  story_url: ""                   # Link to where the story is currently told
  story_consistency_required: true # Must new copy be consistent with existing story?
  story_elements_to_preserve: []  # Specific elements that MUST remain
  story_elements_to_evolve: []    # Elements that can be enhanced/changed
```

### 8F: Story Type Preferences [OPTIONAL]

> **If you have a preference for story type, indicate here. Otherwise, the research process will recommend based on available material.**

```yaml
story_preferences:
  preferred_type: ""              # "discovery" | "proof" | "warning" | "transformation" | "underdog" | "no_preference"
  rationale: ""                   # Why this preference?
  types_to_avoid: []              # Any story types that don't fit the brand?
```

---

## BRIEF PROCESSING REMINDER

> This section is for the Master Agent — do not modify.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  BRIEF PROCESSING RULES (FOR MASTER AGENT)                                    │
│                                                                               │
│  1. SECTIONS 1-2 (Identity/Assets) → Use for market configuration only       │
│  2. SECTION 3 (Business Context) → Log for final handoff. Do NOT use to      │
│     filter or prioritize research phases.                                    │
│  3. SECTION 4 (Hypotheses) → Create validation checklist. Test AFTER         │
│     Layer 2.5 synthesis using collected evidence. Do NOT bias collection.    │
│  4. SECTION 5 (Additional Questions) → Create question checklist. Answer     │
│     during Layer 3 synthesis. Do NOT let questions bias Layer 1 scraping.    │
│  5. SECTION 6 (Exploration Emphasis) → After meeting ALL standard minimums,  │
│     allocate additional scraping passes to emphasized areas. Emphasis is     │
│     BONUS depth, not replacement depth.                                      │
│  6. SECTION 8 (Story Elements) → Execute 2.7-A-story-elements-researcher     │
│     during Layer 2. Client-provided elements are [FACTUAL] and preserved.    │
│     Researched elements are [RESEARCHED] and tagged with source confidence.  │
│     Output story-elements section in FINAL_HANDOFF for 10-Story consumption. │
│                                                                               │
│  GATE ENFORCEMENT UNCHANGED: All gates check standard minimums regardless    │
│  of brief content. Hypotheses, questions, and emphasis areas are ADDITIVE.   │
│                                                                               │
│  THE FULL RESEARCH PROCESS RUNS REGARDLESS:                                  │
│  - Layer 1: 1,000+ quotes across ALL 6 buckets (minimums enforced)          │
│  - Layer 2: Complete intelligence analysis (all E5 tools)                    │
│  - Layer 2.7: Story elements research (NEW — supplements brief Section 8)    │
│  - Layer 2.5: Full synthesis (25+ pairs each category)                       │
│  - Layer 3: Opportunity scoring and strategic planning                       │
│                                                                               │
│  ALL gates remain in effect. NO shortcuts permitted.                         │
│  Sections 3-6, 8 are ADDITIVE context, not REPLACEMENT directives.          │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## EXAMPLE: COMPLETED BRIEF

```yaml
# SECTION 1: PRODUCT IDENTITY
product:
  name: "TradeMaster Pro"
  category: "SaaS"
  one_sentence: "Algorithmic trading platform for retail traders"
  price_point: "$97/month or $797/year"

market:
  mode: "A"
  industry: "Finance / Trading Education"

# SECTION 2: EXISTING ASSETS
assets:
  sales_page: "https://trademasterpro.com"
  other_urls:
    - "https://trademasterpro.com/testimonials"
    - "https://www.youtube.com/@TradeMasterPro"
  documents:
    - "[[TradeMaster Product Spec.pdf]]"

# SECTION 3: BUSINESS CONTEXT
context:
  why_now: "Launching premium tier in Q2, need to understand willingness to pay and feature priorities"
  decisions_pending:
    - "Premium tier pricing ($197 vs $297 vs $397)"
    - "Which features to gate behind premium"
    - "Messaging angle for premium positioning"
  target_customer: "Active retail traders with $10K+ accounts seeking systematic approaches"

# SECTION 4: HYPOTHESES TO VALIDATE
hypotheses:
  - statement: "Traders are more frustrated with execution than with strategy"
    rationale: "Support tickets suggest execution issues dominate complaints"
  - statement: "Backtesting features would justify premium pricing"
    rationale: "Competitor analysis shows backtesting as common premium gate"
  - statement: "Trust in 'AI' claims has declined in the trading space"
    rationale: "Seeing more skeptical comments about AI trading tools"

# SECTION 5: ADDITIONAL QUESTIONS
additional_questions:
  - "What specific features do competitors gate behind premium tiers?"
  - "How do traders evaluate 'value' in trading tools - by results or by time saved?"
  - "What proof/credibility elements matter most to this audience?"

# SECTION 6: EXPLORATION EMPHASIS
exploration_emphasis:
  - area: "Premium tier pricing and value perception"
    why: "Directly informs the Q2 pricing decision"
  - area: "Backtesting and strategy validation workflows"
    why: "Potential flagship feature for premium tier"

# SECTION 7: CONSTRAINTS
constraints:
  budget: 35
  timeline: "standard"
  platform_restrictions:
    - "TradingView" # Legal concern - avoid scraping
```

---

*Template Version 1.0 | Deep Research v3 System*
