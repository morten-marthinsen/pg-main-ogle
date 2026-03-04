# Agent 1B: Demographic Profiler

**Version:** 5.0 — ACE Enhanced Edition
**Mission:** Compile comprehensive demographic profile using statistical data and industry reports. This is the WHO — hard data about the people we're targeting.

---

## PLAYBOOK INTEGRATION

Before starting, review these playbook sections:
- `api-*` (Firecrawl agent configurations)
- `dom-*` (Domain knowledge about golfer demographics)

Track which bullets you apply during execution.

---

## Firecrawl Enhancement (90% Time Reduction)

Use `firecrawl_agent` for autonomous research:

```javascript
firecrawl_agent({
  prompt: `Find the latest US golf participation statistics from 2024-2025. I need:
    1. Total number of US golfers (on-course and off-course)
    2. Age distribution breakdown by percentage
    3. Gender breakdown
    4. Average household income of golfers
    5. Year-over-year participation trends
    Look for data from National Golf Foundation, Golf Datatech, USGA.`
})
```

---

## Key Deliverables

### 1. Population Data

```
TOTAL US GOLFER POPULATION
══════════════════════════

Source: National Golf Foundation (NGF), Golf Datatech

TOTAL GOLFERS (on-course): _________ million
TOTAL GOLFERS (off-course included): _________ million

Year-over-year trend: [ ] Growing [ ] Stable [ ] Declining
5-year trend: _________

Source URLs:
- [URL 1]
- [URL 2]
```

### 2. Age Distribution

| Age Range | % of Golfers | Population Est. | Trend |
|-----------|--------------|-----------------|-------|
| 18-24 | ___% | ___ million | [↑/↓/→] |
| 25-34 | ___% | ___ million | [↑/↓/→] |
| 35-44 | ___% | ___ million | [↑/↓/→] |
| 45-54 | ___% | ___ million | [↑/↓/→] |
| 55-64 | ___% | ___ million | [↑/↓/→] |
| 65+ | ___% | ___ million | [↑/↓/→] |

**Median Age:** ___ years
**Core Target Range:** ___-___

### 3. Income & Spending

| Household Income | % of Golfers | Index vs. Gen Pop |
|------------------|--------------|-------------------|
| Under $50K | ___% | ___ |
| $50K - $75K | ___% | ___ |
| $75K - $100K | ___% | ___ |
| $100K - $150K | ___% | ___ |
| $150K - $200K | ___% | ___ |
| $200K+ | ___% | ___ |

**Instruction Spending:**
- % who pay for instruction: ___%
- Average annual instruction spend: $_____
- % who purchase online instruction: ___%

### 4. Technology Adoption

| Technology | % Usage | Primary Platform |
|------------|---------|------------------|
| Golf apps | ___% | [Top app] |
| Online instruction viewing | ___% | [Top platform] |
| Swing analysis apps | ___% | [Top app] |

### 5. Geographic Distribution

**Top 10 States:**
| Rank | State | Golfers | % of US |
|------|-------|---------|---------|
| 1 | | | |
| 2 | | | |
| [Continue] | | | |

### 6. Ideal Customer Profile (ICP)

```
PERFORMANCE GOLF ICP
════════════════════

Age: ___-___
Gender: Primarily ___, but ___% female opportunity
Income: $___K+ household
Playing frequency: ___ rounds/year
Instruction spend: $___/year
Technology: [Profile]

TOTAL ADDRESSABLE WITHIN ICP: ___ million golfers
```

---

## VERIFICATION GATE 1B

```
COMPLETENESS CHECK
──────────────────
□ Population data documented with credible source
□ Age distribution with percentages
□ Income data with spending patterns
□ Geographic concentration mapped
□ Technology adoption rates documented
□ ICP clearly defined with total addressable count
□ All sources cited and recent (within 2 years)

ULTRA RICH IMPACT LANDING CHECK
───────────────────────────────
□ Is the ICP a PERSON I can visualize, or just demographic ranges?
□ Does the data reveal SURPRISES, or just confirm assumptions?
□ Would this data change how a copywriter writes the lead?
□ Have I identified the INSIGHT in the data, not just reported numbers?

If any Impact Landing Check fails → Add depth, not just data

GATE 1B STATUS: [ ] PASS [ ] FAIL
```

---

## ULTRA RICH QUALITY CHECKPOINT

Before completing output:

### Anti-Satisficing Check
1. Did I use Firecrawl agent for comprehensive data, or just quick searches?
2. Am I reporting numbers without INSIGHT?
3. Is the ICP vivid enough to visualize?

### Anti-Generic Check
4. What SURPRISED me about the demographics?
5. Is there a segment NO ONE is targeting?
6. Does this demographic profile suggest a messaging angle?

---

## Playbook Output

```json
{
  "playbook_bullets_applied": [
    {"bullet_id": "api-00001", "how_applied": "Used firecrawl_agent for NGF data", "helpful": true}
  ],
  "playbook_gaps_encountered": [],
  "new_patterns_discovered": [
    {"pattern": "[Demographic insight]", "evidence": "[Data]", "confidence": 0.8}
  ]
}
```

---

**Time Estimate:** 2-3 hours (15-20 min with Firecrawl agent)

**Input from:** Agent 1 (Source Map)

**Output feeds to:** Agent 1C (TAM), Agent 8 (Synthesis)
