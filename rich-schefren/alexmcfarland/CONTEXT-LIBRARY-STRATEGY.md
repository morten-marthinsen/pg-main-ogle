# Deep Research Context Library Strategy

**Created:** January 18, 2026  
**Purpose:** Define what context is REUSABLE vs. what would CONSTRAIN discovery in the Deep Research system

---

## THE CORE TENSION

**Research Goal:** Discover NEW angles, NEW gaps, NEW opportunities, NEW audiences  
**Context Library Goal:** Don't rebuild what we already know

**The Question:** What context HELPS discovery without CONSTRAINING it?

---

## PART 1: WHAT CONTEXT HELPS DISCOVERY

### ✅ Category 1: METHODOLOGY CONTEXT (Reusable)

**What It Is:**
- How to conduct research (your PRD/Master Agent)
- Quality standards (what "good research" looks like)
- Decision frameworks (when to expand, when to proceed)
- Research patterns that work (what you've learned about researching golf markets)

**Why It Helps:**
- Makes research more efficient (don't rediscover methodology)
- Ensures consistency (same quality standards)
- Enables improvement (learn from past research)

**Example:**
```json
{
  "research_methodology": {
    "context_expansion_patterns": {
      "golf_equipment": {
        "category_to_context": {
          "Wedges": "Short Game",
          "Irons": "Ball Striking",
          "Drivers": "Distance & Accuracy"
        },
        "research_topic_patterns": [
          "Technique problems",
          "Mental/confidence issues",
          "Equipment selection confusion",
          "Competitor comparison needs"
        ]
      }
    },
    "source_type_priorities": {
      "forums": "High (authentic peer voices)",
      "youtube_comments": "High (emotional, unfiltered)",
      "review_sites": "Medium (structured but less emotional)"
    },
    "saturation_indicators": {
      "pattern_repetition_threshold": 5,
      "cluster_ambiguity_rule": "Expand until differentiated"
    }
  }
}
```

**Action:** Extract patterns from your PRD/Master Agent into reusable methodology context.

---

### ✅ Category 2: BRAND PRINCIPLES CONTEXT (Reusable)

**What It Is:**
- What Performance Golf stands for (from brand guidelines)
- What we DON'T do (forbidden patterns, brand boundaries)
- How we think about markets (PG's perspective on golf improvement)
- Brand voice principles (for language extraction, not copy creation)

**Why It Helps:**
- Ensures research aligns with brand (don't discover opportunities we can't execute)
- Guides language extraction (what language fits PG voice)
- Filters opportunities (some discoveries aren't "us")

**Example:**
```json
{
  "brand_principles": {
    "core_values": ["Transformation", "Empowerment", "Accessibility"],
    "enemy": "The Scattered Playbook",
    "weapon": "One Connected System",
    "forbidden_patterns": [
      "Overhype outcomes",
      "Tech jargon",
      "Golf clichés",
      "Perfection promises"
    ],
    "market_perspective": {
      "focus": "Everyday golfers with real lives",
      "avoid": "Pro-focused messaging",
      "promise": "Attainable progress, not fantasy"
    }
  }
}
```

**Action:** Extract from your brand guidelines into structured JSON.

---

### ✅ Category 3: COMPETITIVE INTELLIGENCE CONTEXT (Reusable)

**What It Is:**
- Who we compete with (competitor list)
- What mechanisms exist (exclusion registry - what to avoid)
- Market structure patterns (tiers, positioning, pricing)
- Competitor weaknesses (villain patterns we've seen before)

**Why It Helps:**
- Prevents rediscovering known competitors
- Builds mechanism exclusion registry (don't create what exists)
- Identifies white space patterns (where competitors are weak)
- Speeds up competitive analysis (start with known, discover new)

**Example:**
```json
{
  "competitive_intelligence": {
    "known_competitors": {
      "wedges": ["Cleveland", "Callaway", "Titleist", "TaylorMade", "Ping"],
      "irons": ["Callaway", "TaylorMade", "Titleist", "Ping", "Cobra"],
      "drivers": ["Callaway", "TaylorMade", "Titleist", "Cobra", "Ping"]
    },
    "mechanism_exclusion_registry": {
      "wedge_mechanisms": [
        {
          "name": "CBX Cavity Back",
          "competitor": "Cleveland",
          "articulation": "Cavity back design increases forgiveness on mishits",
          "avoid": "Don't create similar cavity back positioning"
        }
      ]
    },
    "market_structure_patterns": {
      "tier_1": "Premium brands (Titleist, Callaway, TaylorMade)",
      "tier_2": "Value brands (Cleveland, Ping)",
      "tier_3": "Specialty/niche (PG positioning)"
    }
  }
}
```

**Action:** Build from previous research projects - extract competitor data into reusable registry.

---

### ✅ Category 4: MARKET STRUCTURE CONTEXT (Reusable)

**What It Is:**
- Golf market patterns (what you've learned about how golf markets work)
- Awareness level patterns (how golf markets typically progress)
- Source quality patterns (which sources reveal what)
- Research topic patterns (what topics matter for which product categories)

**Why It Helps:**
- Guides context expansion (know what topics to explore)
- Calibrates expectations (know what "normal" looks like)
- Identifies anomalies (when something is NEW vs. typical)

**Example:**
```json
{
  "market_structure": {
    "golf_market_patterns": {
      "awareness_progression": {
        "typical_flow": "Problem Aware → Solution Aware → Product Aware",
        "golf_specific": "Most golfers are Solution Aware (know they need help, don't know which product)"
      },
      "source_quality_patterns": {
        "forum_users": "Highest awareness, most sophisticated objections",
        "youtube_viewers": "Mixed awareness, emotional pain points",
        "review_readers": "Product Aware, comparison shopping"
      },
      "research_topic_patterns": {
        "equipment": ["Technique problems", "Confidence issues", "Selection confusion"],
        "training": ["Practice methods", "Time constraints", "Progress measurement"]
      }
    }
  }
}
```

**Action:** Extract patterns from multiple research projects - what have you learned about golf markets?

---

### ✅ Category 5: EXCLUSION & AVOIDANCE CONTEXT (Reusable)

**What It Is:**
- What we've already done (products, mechanisms, messaging)
- What didn't work (failed angles, rejected opportunities)
- What to avoid (legal, brand, strategic boundaries)

**Why It Helps:**
- Prevents rediscovering what we already know
- Avoids repeating failures
- Respects boundaries (legal, brand, strategic)

**Example:**
```json
{
  "exclusion_registry": {
    "pg_products": {
      "mechanisms_used": [
        "1-Shot Slice Fix",
        "DrawForce Technology",
        "Square Face Technology",
        "Tri-Fusion Technology"
      ],
      "messaging_angles_used": [
        "Fix in 5 minutes",
        "Add 20-30 yards",
        "Tiger's coach method"
      ]
    },
    "failed_opportunities": {
      "reasons": [
        "Market too sophisticated",
        "Competitor too strong",
        "Brand misalignment"
      ]
    },
    "strategic_boundaries": {
      "avoid": ["Pro-focused products", "Complex systems", "Tech jargon positioning"]
    }
  }
}
```

**Action:** Build from product history - what have we done? What didn't work?

---

## PART 2: WHAT CONTEXT CONSTRAINS DISCOVERY

### ❌ Category 1: PREVIOUS AUDIENCE PROFILES (Don't Reuse)

**Why It Constrains:**
- Would bias new research toward known audiences
- Prevents discovering NEW audiences
- Limits opportunity identification

**What To Do Instead:**
- Use as VALIDATION (does new research confirm or challenge?)
- Use as COMPARISON (how is this audience different?)
- Don't use as STARTING POINT (start fresh, compare later)

---

### ❌ Category 2: PREVIOUS PAIN/HOPE BUCKETS (Don't Reuse)

**Why It Constrains:**
- Would bias extraction toward known pain points
- Prevents discovering NEW pain points
- Limits angle identification

**What To Do Instead:**
- Use as VALIDATION (are we seeing the same patterns?)
- Use as COMPARISON (what's new vs. what's consistent?)
- Don't use as FILTER (extract everything, compare later)

---

### ❌ Category 3: PREVIOUS MESSAGING FRAMEWORKS (Don't Reuse)

**Why It Constrains:**
- Would limit new angle discovery
- Prevents finding NEW messaging opportunities
- Biases toward known frameworks

**What To Do Instead:**
- Use as REFERENCE (what worked before?)
- Use as VALIDATION (does new research support this?)
- Don't use as TEMPLATE (discover fresh, compare later)

---

### ❌ Category 4: PREVIOUS OPPORTUNITY LISTS (Don't Reuse)

**Why It Constrains:**
- Would bias toward known opportunities
- Prevents discovering NEW opportunities
- Limits strategic thinking

**What To Do Instead:**
- Use as VALIDATION (are we seeing the same opportunities?)
- Use as COMPARISON (what's new vs. what's consistent?)
- Don't use as STARTING POINT (discover fresh, compare later)

---

## PART 3: THE CONTEXT LIBRARY STRUCTURE

### Recommended Structure

```
pg-deep-research-v2/
├── context-library/
│   ├── methodology/
│   │   ├── research_patterns.json
│   │   ├── quality_standards.json
│   │   └── decision_frameworks.json
│   ├── brand/
│   │   ├── brand_principles.json
│   │   └── brand_boundaries.json
│   ├── competitive/
│   │   ├── competitor_registry.json
│   │   ├── mechanism_exclusion.json
│   │   └── market_structure.json
│   ├── market/
│   │   ├── golf_market_patterns.json
│   │   └── source_quality_patterns.json
│   └── exclusion/
│       ├── pg_product_registry.json
│       ├── failed_opportunities.json
│       └── strategic_boundaries.json
```

---

## PART 4: HOW CONTEXT IS USED IN RESEARCH

### Phase 1: Context Expansion (Reference, Don't Constrain)

**Use Context For:**
- ✅ Guiding topic selection (what topics typically matter?)
- ✅ Identifying source types (which sources reveal what?)
- ✅ Calibrating expectations (what's "normal" for this category?)

**Don't Use Context For:**
- ❌ Filtering topics (don't skip topics because they weren't in previous research)
- ❌ Limiting sources (don't avoid sources because they weren't used before)
- ❌ Biasing extraction (don't look for specific pain points)

**Example:**
```
Context says: "For wedges, chipping technique is typically a high-priority topic"
Research action: Include chipping technique in context expansion
Research action: But ALSO discover what ELSE matters (don't limit to known topics)
```

---

### Phase 2: Source Discovery (Reference, Don't Filter)

**Use Context For:**
- ✅ Prioritizing known high-quality sources
- ✅ Identifying competitor sources (from competitor registry)
- ✅ Calibrating source quality expectations

**Don't Use Context For:**
- ❌ Filtering out new sources
- ❌ Limiting to known platforms
- ❌ Biasing toward known source types

---

### Phase 3: Quote Extraction (Discover Fresh, Compare Later)

**Use Context For:**
- ✅ Validating extraction quality (are we getting the depth we need?)
- ✅ Identifying anomalies (is this pattern NEW or consistent?)

**Don't Use Context For:**
- ❌ Filtering quotes (don't skip quotes because they don't match previous patterns)
- ❌ Biasing buckets (don't force quotes into known categories)
- ❌ Limiting discovery (extract everything, categorize later)

---

### Phase 4: Analysis (Compare, Don't Constrain)

**Use Context For:**
- ✅ Validating findings (do new findings align with known patterns?)
- ✅ Identifying what's NEW (what's different from previous research?)
- ✅ Calibrating confidence (is this finding consistent with market structure?)

**Don't Use Context For:**
- ❌ Limiting analysis (don't skip analysis because it wasn't in previous research)
- ❌ Biasing conclusions (discover fresh, compare later)
- ❌ Filtering opportunities (all opportunities are valid, context helps prioritize)

---

## PART 5: BUILDING THE CONTEXT LIBRARY

### Step 1: Extract from Existing Skills

**From Brand Guidelines:**
- Brand principles
- Forbidden patterns
- Market perspective

**From Previous Research:**
- Competitor lists
- Mechanism patterns
- Market structure insights

**From Product History:**
- PG mechanisms used
- Messaging angles used
- Failed opportunities

---

### Step 2: Structure as JSON

**Format:**
- Structured JSON (not markdown)
- Versioned (track changes)
- Referenced (not embedded in instructions)

**Location:**
- Separate from instructions
- Reusable across projects
- Maintainable (update without changing instructions)

---

### Step 3: Reference in Research Brief

**Research Brief Structure:**
```json
{
  "product": {
    "name": "ONE.1 Wedge",
    "category": "Wedges"
  },
  "context_references": {
    "methodology": "context-library/methodology/research_patterns.json",
    "brand": "context-library/brand/brand_principles.json",
    "competitive": "context-library/competitive/competitor_registry.json",
    "market": "context-library/market/golf_market_patterns.json",
    "exclusion": "context-library/exclusion/pg_product_registry.json"
  },
  "discovery_mode": "fresh" // Always start fresh, use context for guidance
}
```

---

## PART 6: MAINTENANCE PROTOCOL

### After Each Research Project

**Extract Reusable Patterns:**
1. What methodology worked? → Add to methodology context
2. What competitors discovered? → Add to competitive context
3. What market patterns observed? → Add to market context
4. What mechanisms mapped? → Add to exclusion registry

**Don't Extract:**
- ❌ Audience profiles (would constrain future discovery)
- ❌ Pain/hope buckets (would bias future extraction)
- ❌ Messaging frameworks (would limit future angles)
- ❌ Opportunity lists (would bias future discovery)

---

### Quarterly Review

**Validate Context:**
- Is methodology context still accurate?
- Are competitor lists current?
- Are market patterns still valid?
- Is exclusion registry complete?

**Update Context:**
- Add new patterns discovered
- Remove outdated information
- Refine based on learnings

---

## CONCLUSION

**The Context Library for Research Should:**
- ✅ Guide methodology (how to research)
- ✅ Define boundaries (what we don't do)
- ✅ Exclude known mechanisms (what to avoid)
- ✅ Calibrate expectations (what's normal)
- ❌ NOT constrain discovery (what to find)
- ❌ NOT bias extraction (what to look for)
- ❌ NOT limit opportunities (what's possible)

**The Key Principle:**
**Context guides the RESEARCH PROCESS, not the RESEARCH FINDINGS.**

Use context to research better, not to find what you already know.
