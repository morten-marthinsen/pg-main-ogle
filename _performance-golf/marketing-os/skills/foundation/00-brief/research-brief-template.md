# Deep Research Brief — [Project Name]

<!--
  RESEARCH BRIEF TEMPLATE v1.0

  This is the input document for Skill 01 (Deep Research).
  It tells the research system WHAT to research and provides starting context.

  HOW TO USE:
  1. Duplicate this file into your project folder:
     ./Copywriting-Business/Clients/[Client]/projects/[Project]/research/[project]-brief.md
  2. Fill in all sections (see instructions below)
  3. Provide the completed brief to the Master Agent to initiate research

  HOW THIS WORKS WITH VOICE PROMPTS:
  When a user gives a long voice prompt describing a new research project, Claude Code
  should use that prompt to fill in this template — then present the completed brief
  back to the user for review and refinement BEFORE kicking off Skill 01 execution.

  The flow is:
    User voice prompt → Claude fills template → User reviews/refines → Approved → Skill 01 begins

  IMPORTANT: Sections 1-2 are REQUIRED. Sections 3-7 are optional but valuable.
  The more context provided, the better the research configuration — but the research
  process itself is NOT biased by this context. All standard gates, minimums, and
  quality standards remain in full effect regardless of what's written here.
-->

**Created:** [Date]
**Status:** DRAFT — Awaiting human approval before execution

---

## SECTION 1: PRODUCT IDENTITY [REQUIRED]

> **Purpose:** Minimal identification only. This tells the research system WHAT we're
> researching — it does NOT bias the research direction.

```yaml
product:
  name: ""                    # Product or campaign name
  category: ""                # e.g., "Digital Training Program", "Physical Product", "SaaS Tool"
  one_sentence: ""            # What it is in 1-2 sentences — factual, not marketing
  price_point: ""             # Approximate price or range

market:
  mode: ""                    # A = existing product with marketing history
                              # B = new product with no marketing
  industry: ""                # e.g., "Health", "Finance", "Personal Development"
```

<!-- FILL-IN GUIDANCE:
  - name: The actual product/campaign name (e.g., "VQ Transformation", "Harmoni Pendant")
  - category: Keep it factual — what TYPE of thing is it?
  - one_sentence: Describe what it does, not what it promises. Factual.
  - price_point: Exact if known, range if not (e.g., "$149-199", "Mid-ticket TBD")
  - mode: A if there's existing marketing to analyze. B if starting from scratch.
  - industry: The broad market category
-->

---

## SECTION 2: EXISTING ASSETS [REQUIRED FOR MODE A]

> **Purpose:** Links to what already exists. Raw materials, not interpretation.

```yaml
assets:
  sales_page: ""              # URL to current sales page (if exists)
  other_urls:                 # Other relevant URLs
    - ""
    - ""
  documents:                  # Local file paths or Obsidian links to existing research, transcripts, etc.
    - ""
    - ""
```

<!-- FILL-IN GUIDANCE:
  - Include ALL existing marketing materials — sales pages, VSL transcripts, ad scripts
  - Include any previous research files, competitor analyses, audience data
  - For Obsidian links use [[filename]] format
  - For Mode B (new product), list any concept docs, product specs, or founder notes
-->

---

## SECTION 3: BUSINESS CONTEXT [OPTIONAL]

> **Purpose:** Helps the research system understand WHY this research is being done
> and what decisions it will inform.
>
> **AGENT INSTRUCTION:** This section is for CONTEXT only. It does NOT modify research
> scope, reduce any requirements, or bias the discovery process. All standard phases,
> gates, and minimums remain in full effect.

```yaml
context:
  why_now: ""                 # Why is this research being done now? What changed?

  decisions_pending:          # What decisions will this research inform?
    - ""
    - ""
    - ""

  target_customer: ""         # Who is the intended audience? Demographics, psychographics,
                              # situation — be as specific as possible
```

<!-- FILL-IN GUIDANCE:
  - why_now: Be honest about the business situation. "Cold traffic isn't converting."
    "We're expanding to a new audience." "The current copy is stale."
  - decisions_pending: What do you need to DECIDE after this research? List the actual
    questions hanging over the project.
  - target_customer: Paint the person. Age, gender, profession, situation, emotional
    state, what they've tried before, what frustrates them.
-->

---

## SECTION 4: HYPOTHESES TO VALIDATE [OPTIONAL, MAX 5]

> **Purpose:** Things you suspect but need validated or invalidated by the research.
> These will be explicitly addressed in the Final Handoff with evidence-based verdicts.
>
> **AGENT INSTRUCTION:** These hypotheses are to be TESTED against the evidence collected
> during research. They do NOT bias the collection process — all standard quote buckets
> and minimums still apply. Hypotheses are validated/invalidated AFTER Layer 2.5 synthesis.

```yaml
hypotheses:
  - statement: ""             # What you suspect is true
    rationale: ""             # Why you suspect it

  - statement: ""
    rationale: ""

  - statement: ""
    rationale: ""
```

<!-- FILL-IN GUIDANCE:
  - A hypothesis is something you BELIEVE but need EVIDENCE for
  - Good: "Trust is the primary barrier to conversion" (testable)
  - Bad: "We need better copy" (not a hypothesis, just a wish)
  - Each hypothesis gets a VALIDATED / INVALIDATED / INCONCLUSIVE verdict in the handoff
  - Maximum 5. If you have more, consolidate — too many = unfocused research
-->

---

## SECTION 5: ADDITIONAL QUESTIONS [OPTIONAL]

> **Purpose:** Specific questions you want answered IN ADDITION TO the standard research
> outputs. These will receive dedicated responses in the Final Handoff.
>
> **AGENT INSTRUCTION:** These questions are ADDITIVE. They do NOT replace or reduce
> ANY standard research phases. All gates, minimums, and quality standards remain in
> full effect.

```yaml
additional_questions:
  - ""
  - ""
  - ""
  - ""
```

<!-- FILL-IN GUIDANCE:
  - These are specific things you want to KNOW that the standard research may not
    surface on its own
  - Good: "What price points do competitors use?" / "How do customers describe [specific problem]?"
  - Each question gets a dedicated evidence-based answer in the Final Handoff
  - No limit on questions, but each adds work — be intentional
-->

---

## SECTION 6: EXPLORATION EMPHASIS [OPTIONAL, MAX 3]

> **Purpose:** Areas where you want ADDITIONAL depth beyond the standard research.
> These are BONUS exploration areas, not replacements for standard coverage.
>
> **AGENT INSTRUCTION:** Emphasis areas add DEPTH in specific zones. They do NOT reduce
> depth elsewhere. All bucket minimums, all quote requirements, all standard coverage
> remains mandatory. AFTER meeting ALL standard minimums, allocate additional scraping
> passes and analysis attention to emphasized areas.

```yaml
exploration_emphasis:
  - area: ""                  # What area to go deeper on
    why: ""                   # Why this area matters for the project

  - area: ""
    why: ""

  - area: ""
    why: ""
```

<!-- FILL-IN GUIDANCE:
  - Maximum 3. More than 3 = diffused attention = none get adequate depth.
  - These should be the areas where EXTRA intelligence would most change your decisions
  - Good: "Male emotional drivers around voice and power" (specific, actionable)
  - Bad: "Everything about the market" (not an emphasis, that's the whole research)
-->

---

## SECTION 7: CONSTRAINTS [OPTIONAL]

> **Purpose:** Practical limitations on the research execution.

```yaml
constraints:
  budget: 25                  # Scraping budget in dollars (default $25)
  timeline: "standard"        # "standard" or "rush"
  platform_restrictions:      # Any platforms to avoid or prioritize
    - ""
```

<!-- FILL-IN GUIDANCE:
  - budget: $25 is the default. Increase for broader scraping if needed.
  - timeline: "standard" runs the full process. "rush" is not recommended — it
    doesn't skip steps, it just flags urgency.
  - platform_restrictions: List platforms to avoid (e.g., "no Facebook scraping")
    or prioritize (e.g., "focus on Reddit and YouTube comments")
-->

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
│                                                                               │
│  GATE ENFORCEMENT UNCHANGED: All gates check standard minimums regardless    │
│  of brief content. Hypotheses, questions, and emphasis areas are ADDITIVE.   │
│                                                                               │
│  THE FULL RESEARCH PROCESS RUNS REGARDLESS:                                  │
│  - Layer 1: 1,000+ quotes across ALL 6 buckets (minimums enforced)          │
│  - Layer 2: Complete intelligence analysis (all E5 tools)                    │
│  - Layer 2.5: Full synthesis (25+ pairs each category)                       │
│  - Layer 3: Opportunity scoring and strategic planning                       │
│                                                                               │
│  ALL gates remain in effect. NO shortcuts permitted.                         │
│  Sections 3-6 are ADDITIVE context, not REPLACEMENT directives.             │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

*Template Version 1.0 | Deep Research v3 System*
