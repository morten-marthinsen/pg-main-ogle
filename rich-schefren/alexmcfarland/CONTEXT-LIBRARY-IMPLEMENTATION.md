# Context Library Implementation Guide

**Created:** January 18, 2026  
**Purpose:** Practical steps to build the Deep Research context library from existing PG context

---

## THE STRATEGIC QUESTION

**You have:**
- Brand guidelines
- Hundreds of products
- Performance data
- Previous research
- Multiple skills with context

**You need:**
- What context HELPS discovery (guides research)
- What context CONSTRAINS discovery (limits findings)

**The Answer:** Extract METHODOLOGY, BRAND, COMPETITIVE, MARKET STRUCTURE, and EXCLUSION context. Don't extract AUDIENCE, PAIN/HOPE, MESSAGING, or OPPORTUNITY context.

---

## PART 1: WHAT TO EXTRACT FROM EXISTING CONTEXT

### ✅ Extract 1: Brand Principles (From Brand Guidelines)

**Source:** `pg-brand-guidelines/SKILL.md`

**Extract:**
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
      "Perfection promises",
      "Pro-focused messaging"
    ],
    "market_perspective": {
      "focus": "Everyday golfers with real lives",
      "promise": "Attainable progress, not fantasy",
      "voice": "Encouraging without rah-rah, confident without dismissive"
    },
    "signature_phrases": [
      "Love your game",
      "Your path to playing better golf",
      "Make progress permanent"
    ]
  }
}
```

**Why:** Guides research to discover opportunities that align with PG brand (don't discover opportunities we can't execute).

**Action:** Extract from brand guidelines, structure as JSON.

---

### ✅ Extract 2: Competitor Registry (From Previous Research)

**Source:** Previous research projects, competitive analysis

**Extract:**
```json
{
  "competitive_intelligence": {
    "known_competitors": {
      "wedges": [
        {
          "name": "Cleveland",
          "products": ["CBX4", "Smart Sole", "RTX"],
          "positioning": "Forgiveness-focused",
          "mechanisms": ["Cavity Back Design", "Smart Sole Technology"]
        },
        {
          "name": "Callaway",
          "products": ["JAWS", "Mack Daddy"],
          "positioning": "Tour-proven performance",
          "mechanisms": ["JAWS Groove Technology", "X-Grind"]
        }
      ],
      "irons": [...],
      "drivers": [...]
    },
    "market_tiers": {
      "tier_1": ["Titleist", "Callaway", "TaylorMade"],
      "tier_2": ["Cleveland", "Ping", "Cobra"],
      "tier_3": ["Specialty/Niche (PG positioning)"]
    }
  }
}
```

**Why:** Speeds up competitive analysis (start with known, discover new). Prevents rediscovering known competitors.

**Action:** Review previous research projects, extract competitor data into registry.

---

### ✅ Extract 3: Mechanism Exclusion Registry (From Product History)

**Source:** Your product catalog, previous research

**Extract:**
```json
{
  "mechanism_exclusion_registry": {
    "pg_mechanisms_used": [
      {
        "name": "1-Shot Slice Fix",
        "product": "OSSF",
        "articulation": "Counter-slice sequence that closes clubface relative to path",
        "category": "Training/Digital"
      },
      {
        "name": "DrawForce Technology",
        "product": "DrawForce",
        "articulation": "Automatic draw trainer that forces inside-out path",
        "category": "Training Aid/Physical"
      },
      {
        "name": "Square Face Technology",
        "product": "SF1 Driver",
        "articulation": "Square-to-path sequence eliminates slice",
        "category": "Equipment/Physical"
      }
    ],
    "competitor_mechanisms_mapped": [
      {
        "name": "CBX Cavity Back",
        "competitor": "Cleveland",
        "articulation": "Cavity back design increases forgiveness on mishits",
        "category": "Wedges",
        "avoid": "Don't create similar cavity back positioning for wedges"
      }
    ]
  }
}
```

**Why:** Prevents creating mechanisms that already exist. Builds exclusion registry for mechanism creation agent.

**Action:** Extract from product catalog, previous research mechanism mappings.

---

### ✅ Extract 4: Research Methodology Patterns (From PRD/Master Agent)

**Source:** `RESEARCH-PRD.md`, `MASTER-AGENT.md`

**Extract:**
```json
{
  "research_methodology": {
    "context_expansion_patterns": {
      "golf_equipment": {
        "category_to_context": {
          "Wedges": "Short Game",
          "Irons": "Ball Striking",
          "Drivers": "Distance & Accuracy",
          "Golf Balls": "Ball Performance / Scoring"
        },
        "research_topic_patterns": [
          "Technique problems and frustrations",
          "Mental/confidence issues",
          "Equipment selection confusion",
          "Competitor comparison needs",
          "Practice method challenges"
        ]
      }
    },
    "source_type_priorities": {
      "forums": {
        "priority": "high",
        "rationale": "Authentic peer voices, detailed discussions",
        "awareness_caveat": "Forum users are typically Most Aware or Product Aware - not general market"
      },
      "youtube_comments": {
        "priority": "high",
        "rationale": "Emotional, unfiltered pain points",
        "awareness_caveat": "Mixed awareness levels"
      },
      "review_sites": {
        "priority": "medium",
        "rationale": "Structured but less emotional"
      }
    },
    "saturation_indicators": {
      "pattern_repetition_threshold": 5,
      "cluster_ambiguity_rule": "Expand until differentiated or validated as single phenomenon"
    },
    "quality_standards": {
      "minimum_quotes": 1000,
      "bucket_minimums": {
        "pain": 300,
        "hope": 250,
        "root_cause": 200,
        "solutions_tried": 150
      }
    }
  }
}
```

**Why:** Makes research more efficient (don't rediscover methodology). Ensures consistency.

**Action:** Extract patterns from PRD/Master Agent into reusable methodology context.

---

### ✅ Extract 5: Golf Market Structure Patterns (From Multiple Research Projects)

**Source:** Aggregate learnings from all previous research

**Extract:**
```json
{
  "market_structure": {
    "golf_market_patterns": {
      "awareness_progression": {
        "typical_flow": "Problem Aware → Solution Aware → Product Aware",
        "golf_specific": "Most golfers are Solution Aware (know they need help, don't know which product)",
        "forum_users": "Typically Most Aware or Product Aware (not general market)"
      },
      "source_quality_patterns": {
        "forum_users": {
          "awareness_level": "Most Aware / Product Aware",
          "sophistication": "High - know competitor products, mechanisms, promises",
          "use_for": "Advanced objections, mechanism credibility, technical proof",
          "don't_use_for": "General market copy, basic desires, entry-point messaging"
        },
        "youtube_viewers": {
          "awareness_level": "Mixed",
          "sophistication": "Medium",
          "use_for": "Emotional triggers, basic desires, awareness level language"
        }
      },
      "research_topic_patterns": {
        "equipment": {
          "primary_topics": [
            "Technique problems",
            "Confidence issues",
            "Selection confusion",
            "Performance frustration"
          ],
          "emotional_topics": [
            "Anxiety",
            "Embarrassment",
            "Frustration",
            "Hope for improvement"
          ]
        }
      }
    }
  }
}
```

**Why:** Guides context expansion (know what topics to explore). Calibrates expectations.

**Action:** Review all previous research projects, extract patterns about golf market structure.

---

### ✅ Extract 6: PG Product Registry (From Product Catalog)

**Source:** Your product history, performance data

**Extract:**
```json
{
  "pg_product_registry": {
    "products": [
      {
        "name": "OSSF",
        "category": "Digital Training",
        "mechanism": "1-Shot Slice Fix",
        "messaging_angles_used": [
          "Fix in 5 minutes",
          "Tiger's coach method",
          "70,000 lessons"
        ],
        "outcomes_promised": ["20-30 yards", "Eliminate slice", "5 minutes"],
        "authority": "Hank Haney"
      }
    ],
    "messaging_patterns_used": [
      "Time-bound results (5 minutes, 10 clicks)",
      "Authority markers (Tiger's coach, PGA pro)",
      "Specific outcomes (20-30 yards, eliminate slice)",
      "Social proof volume (70K lessons, 50K golfers)"
    ],
    "failed_opportunities": [
      {
        "opportunity": "Pro-focused driver positioning",
        "reason": "Brand misalignment - PG focuses on everyday golfers",
        "learned": "Avoid pro-focused positioning"
      }
    ]
  }
}
```

**Why:** Prevents rediscovering what we've already done. Identifies what didn't work.

**Action:** Extract from product catalog, performance data, previous research.

---

## PART 2: WHAT NOT TO EXTRACT

### ❌ Don't Extract: Previous Audience Profiles

**Why:** Would bias new research toward known audiences, prevents discovering NEW audiences.

**What To Do Instead:**
- Discover fresh audience profiles in each research project
- Compare new profiles to previous profiles (validation)
- Document what's NEW vs. what's consistent

---

### ❌ Don't Extract: Previous Pain/Hope Buckets

**Why:** Would bias extraction toward known pain points, prevents discovering NEW pain points.

**What To Do Instead:**
- Extract fresh pain/hope buckets in each research project
- Compare new buckets to previous buckets (validation)
- Document what's NEW vs. what's consistent

---

### ❌ Don't Extract: Previous Messaging Frameworks

**Why:** Would limit new angle discovery, prevents finding NEW messaging opportunities.

**What To Do Instead:**
- Discover fresh messaging frameworks in each research project
- Compare new frameworks to previous frameworks (validation)
- Document what's NEW vs. what's consistent

---

### ❌ Don't Extract: Previous Opportunity Lists

**Why:** Would bias toward known opportunities, prevents discovering NEW opportunities.

**What To Do Instead:**
- Discover fresh opportunities in each research project
- Compare new opportunities to previous opportunities (validation)
- Document what's NEW vs. what's consistent

---

## PART 3: IMPLEMENTATION STEPS

### Step 1: Create Context Library Structure

```
pg-deep-research-v2/
├── context-library/
│   ├── methodology/
│   │   └── research_patterns.json
│   ├── brand/
│   │   └── brand_principles.json
│   ├── competitive/
│   │   ├── competitor_registry.json
│   │   └── mechanism_exclusion.json
│   ├── market/
│   │   └── golf_market_patterns.json
│   └── exclusion/
│       └── pg_product_registry.json
```

---

### Step 2: Extract from Existing Context (Priority Order)

**Week 1:**
1. Extract brand principles from `pg-brand-guidelines/SKILL.md`
2. Extract research methodology patterns from `RESEARCH-PRD.md`
3. Create initial competitor registry (from known competitors)

**Week 2:**
4. Extract mechanism exclusion registry (from product catalog)
5. Extract PG product registry (from product history)
6. Create initial market structure patterns (from previous research)

**Week 3:**
7. Review all previous research projects
8. Extract competitive intelligence patterns
9. Refine market structure patterns

---

### Step 3: Structure as JSON

**Format:**
- Clean JSON (no markdown)
- Versioned (track changes)
- Referenced (not embedded)

**Example Structure:**
```json
{
  "context_version": "1.0",
  "last_updated": "2026-01-18",
  "brand_principles": {...},
  "competitive_intelligence": {...},
  "research_methodology": {...}
}
```

---

### Step 4: Reference in Research Brief

**Update Research Brief Format:**
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
  "discovery_mode": "fresh"
}
```

---

### Step 5: Update Master Agent to Use Context

**In Context Expansion (Step 1.0):**
- Reference methodology context (what topics typically matter?)
- Reference brand context (what aligns with PG?)
- Reference competitive context (who do we compete with?)
- Reference market context (what's normal for this category?)

**But:**
- Don't limit to known topics (discover new topics)
- Don't filter by brand (discover everything, filter later)
- Don't skip new competitors (discover all, compare to known)

---

## PART 4: MAINTENANCE PROTOCOL

### After Each Research Project

**Extract Reusable Patterns:**
1. **Methodology:** What research patterns worked? → Add to methodology context
2. **Competitive:** What new competitors discovered? → Add to competitor registry
3. **Market:** What market patterns observed? → Add to market structure
4. **Exclusion:** What mechanisms mapped? → Add to exclusion registry

**Don't Extract:**
- ❌ Audience profiles
- ❌ Pain/hope buckets
- ❌ Messaging frameworks
- ❌ Opportunity lists

---

### Quarterly Review

**Validate:**
- Is methodology context still accurate?
- Are competitor lists current?
- Are market patterns still valid?
- Is exclusion registry complete?

**Update:**
- Add new patterns discovered
- Remove outdated information
- Refine based on learnings

---

## CONCLUSION

**The Context Library Should:**
- ✅ Guide HOW to research (methodology)
- ✅ Define WHAT we don't do (brand boundaries)
- ✅ Exclude WHAT exists (mechanisms, competitors)
- ✅ Calibrate EXPECTATIONS (what's normal)
- ❌ NOT constrain WHAT to find (audiences, pain points, opportunities)

**The Key Principle:**
**Context guides the RESEARCH PROCESS, not the RESEARCH FINDINGS.**

Use context to research better, not to find what you already know.
