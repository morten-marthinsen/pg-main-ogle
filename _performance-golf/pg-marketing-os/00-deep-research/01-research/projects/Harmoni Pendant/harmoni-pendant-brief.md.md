# Deep Research Brief Template

**Version:** 1.0
**Purpose:** Standardized input format for initiating Deep Research v3 projects
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
  name: ""                    # Harmoni Pendant
  category: ""                # Physical product
  one_sentence: ""            # It's a pendant that helps mitigate EMF disruption to the body through biofield coherence, which can be measured in HRV (heart-rate variability)
  price_point: ""             # $149-199

market:
  mode: ""                    # A (existing product with current marketing
  industry: ""                # Wellness (EMF mitigation)
```

---

## SECTION 2: EXISTING ASSETS [REQUIRED FOR MODE A]

> **Purpose:** Links to what already exists. Raw materials, not interpretation.

```yaml
assets:
  sales_page: ""              # (https://www.harmonipendant.com/pages/holiday-harmoni)
  other_urls:                 # (https://www.harmonipendant.com/)
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
  why_now: ""                 # The page hasn't been updated in years, the marketing is a bit stale, cold traffic doesn't really work, affiliate revenue is solid, but overall, the marketing is a bit stale and we need to upgrade

  decisions_pending:          # What decisions will this research inform?
    - ""                      # e.g., what kinds of angles could help this convert better on paid traffic 
    - ""                      # e.g., is there a better offer structure for conversion
    - ""                      # e.g., what are competitors doing better that we might be able to adopt
    - ""                      # e.g., who are some good potential influencer or affiliate partners 

  target_customer: ""         # Women, 35-55, stressed out, concerned about EMF exposure, perhaps tired or struggles with health issue that can't be well diagnosed and worries EMF stress could be a factor 
```

---

## SECTION 4: HYPOTHESES TO VALIDATE [OPTIONAL]

> **Purpose:** Things you suspect but need validated or invalidated by the research. These will be explicitly addressed in the Final Handoff with evidence-based verdicts.
>
> **AGENT INSTRUCTION:** These hypotheses are to be TESTED against the evidence collected during research. They do NOT bias the collection process — all standard quote buckets and minimums still apply. Hypotheses are validated/invalidated AFTER Layer 2.5 synthesis, using the evidence that was collected through the unbiased standard process.

```yaml
hypotheses:
  - statement: ""             # "maybe we need better offer/page structure"
    rationale: ""             # haven't tested much 

  - statement: ""             # "the page needs new elements for better conversion" 
    rationale: ""

  - statement: ""             # "Trust is the primary barrier to conversion"
    rationale: ""              Market might be more skeptical than we realize 
```

**Maximum 5 hypotheses.** More than 5 suggests the research scope may be too broad or the hypotheses need consolidation.

---

## SECTION 5: ADDITIONAL QUESTIONS [OPTIONAL]

> **Purpose:** Specific questions you want answered IN ADDITION TO the standard research outputs. These will receive dedicated responses in the Final Handoff.
>
> **AGENT INSTRUCTION:** These questions are ADDITIVE. They do NOT replace or reduce ANY standard research phases. All gates, minimums, and quality standards remain in full effect. Answer these questions IN ADDITION TO completing the full Layer 1-2-2.5-3 process. Questions are answered during Layer 3 synthesis using the comprehensive evidence base collected through the standard process.

```yaml
additional_questions:
  - ""                        # "What price points do competitors use?"
  - ""                        # "How do customers talk about [specific feature]?"
  - ""                        # "how could we better position this product for an audience like Dr Joe Dispenza's?"
  - ""                        # "What objections appear most frequently?"
```

**No limit on questions**, but each will receive a dedicated evidence-based response in the Final Handoff.

---

## SECTION 6: EXPLORATION EMPHASIS [OPTIONAL, MAX 3]

> **Purpose:** Areas where you want ADDITIONAL depth beyond the standard research. These are BONUS exploration areas, not replacements for standard coverage.
>
> **AGENT INSTRUCTION:** Emphasis areas add DEPTH in specific zones. They do NOT reduce depth elsewhere. All bucket minimums, all quote requirements, all standard coverage remains mandatory. AFTER meeting ALL standard minimums, allocate additional scraping passes and analysis attention to emphasized areas. Maximum 3 emphasis areas to prevent scope diffusion.

```yaml
exploration_emphasis:
  - area: ""                  # "improved offer structure or presentation""
    why: ""                   # Could be easiest way to move needle

  - area: ""                  # "best possible channel for growth with a product like this"
		    why: "" We may not be tapping into it" 

  - area: ""                  # "emotions of the market that we can better integrate into our messaging""
    why: ""
```

**Maximum 3 emphasis areas.** If you need more, consider which are truly priorities vs. general curiosity.

---

## SECTION 7: CONSTRAINTS [OPTIONAL]

> **Purpose:** Practical limitations on the research execution.

```yaml
constraints:
  budget: 25                  # Scraping budget in $25
  timeline: "standard"        # "standard" 
  platform_restrictions:      # no
    - ""
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
```

---

*Template Version 1.0 | Deep Research v3 System*
