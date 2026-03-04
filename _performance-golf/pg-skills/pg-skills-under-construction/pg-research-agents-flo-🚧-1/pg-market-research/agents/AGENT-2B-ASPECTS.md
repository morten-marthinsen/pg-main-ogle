# Agent 2B: Aspect Extractor (NEW)

**Version:** 5.0 — Introduced in ACE Upgrade
**Mission:** Decompose verbatim quotes into specific aspects with sentiment analysis.

---

## Purpose

Transform Agent 2's language database into structured aspect-sentiment data. This enables:
- Understanding WHAT specifically golfers struggle with
- Measuring sentiment intensity per aspect
- Identifying co-occurring aspects (problem clusters)
- Finding gaps (aspects NOT discussed = opportunities)

---

## Input

Agent 2's output:
- 300+ verbatim quotes with Signal Quality Scores
- Focus on SQS 5+ quotes for aspect extraction

---

## Golf-Specific Aspect Categories

### MECHANICAL ASPECTS
| Aspect | Sub-aspects |
|--------|-------------|
| Grip | Grip pressure, grip style, hand position |
| Stance | Width, alignment, ball position |
| Posture | Spine angle, knee flex, weight distribution |
| Alignment | Shoulders, hips, feet, clubface |
| Backswing | Turn, arm position, club path |
| Downswing | Sequence, transition, power |
| Transition | Pause, weight shift, hip initiation |
| Impact | Position, compression, contact |
| Follow-through | Extension, finish position, balance |
| Tempo | Speed, rhythm, timing |

### OUTCOME ASPECTS
| Aspect | Sub-aspects |
|--------|-------------|
| Distance | Driver, irons, total, carry vs. roll |
| Accuracy | Fairways hit, greens in regulation, dispersion |
| Consistency | Shot-to-shot variance, round-to-round |
| Specific shots | Drives, approaches, chips, putts, bunker, punch |

### EXPERIENCE ASPECTS
| Aspect | Sub-aspects |
|--------|-------------|
| Learning curve | Speed, difficulty, confusion |
| Time investment | Practice time, range sessions |
| Practice | Quality, effectiveness, feedback |
| Retention | Memory, muscle memory, loss over time |
| Lessons | Quality, cost, results, retention |
| Instruction quality | Clarity, personalization, results |
| Equipment fitting | Process, results, cost |
| Technology use | Launch monitors, apps, video |

### SOCIAL ASPECTS
| Aspect | Sub-aspects |
|--------|-------------|
| Playing partners | Perception, judgment, comparison |
| Course situations | Pace of play, etiquette, pressure |
| Competition | Tournament, match play, pressure |
| Family/spouse | Reactions, time investment, support |

### EMOTIONAL ASPECTS
| Aspect | Sub-aspects |
|--------|-------------|
| Frustration | Triggers, intensity, recovery |
| Confidence | Building, losing, state-dependent |
| Embarrassment | Situations, intensity, avoidance |
| Joy/satisfaction | Sources, frequency, triggers |

---

## Extraction Process

For each quote with SQS 5+:

### Step 1: Identify Aspects
- What specific aspect(s) is the quote about?
- Use the taxonomy above

### Step 2: Classify Sentiment
Use these sentiment categories:

| Sentiment | Description | Examples |
|-----------|-------------|----------|
| strong_negative | Intense frustration/failure | "NEVER works", "completely ruined" |
| moderate_negative | Disappointment | "didn't help", "still struggling" |
| neutral | Factual statement | "I use a strong grip" |
| moderate_positive | Improvement | "getting better", "helped somewhat" |
| strong_positive | Breakthrough | "finally fixed", "game changer" |
| frustrated_effort | Tried but failed | "worked on forever" |
| confused | Don't understand | "don't know what I'm doing wrong" |
| hopeful | Optimistic | "think this might work" |

### Step 3: Rate Intensity (1-10)
- 1-3: Mild mention
- 4-6: Moderate emphasis
- 7-10: Intense focus, emotional language

### Step 4: Extract Evidence
- The specific words/phrases that indicate this aspect/sentiment

---

## Output Format

### Per-Quote Output:
```json
{
  "quote_id": "q-00147",
  "quote": "I've worked on my grip forever but still can't hit a straight drive. It's so frustrating watching my playing partners stripe it down the middle while I'm in the woods AGAIN.",
  "sqs": 8,
  "aspects": [
    {
      "aspect": "grip",
      "category": "mechanical",
      "sentiment": "frustrated_effort",
      "intensity": 7,
      "evidence": "worked on...forever"
    },
    {
      "aspect": "drives",
      "category": "outcome",
      "sentiment": "strong_negative",
      "intensity": 9,
      "evidence": "can't hit a straight drive", "AGAIN"
    },
    {
      "aspect": "playing_partners",
      "category": "social",
      "sentiment": "comparison_shame",
      "intensity": 8,
      "evidence": "watching my playing partners stripe it"
    }
  ]
}
```

### Aggregated Output:

#### Top 10 Mechanical Aspects by Frustration Intensity
```
| Rank | Aspect | Avg Intensity | Quote Count | Sample |
|------|--------|---------------|-------------|--------|
| 1 | grip | 7.2 | 45 | "grip pressure..." |
| 2 | transition | 6.8 | 32 | "can't feel the..." |
...
```

#### Top 10 Outcome Aspects by Negative Sentiment Volume
```
| Rank | Aspect | Neg Quotes | Total | % Negative | Sample |
|------|--------|------------|-------|------------|--------|
| 1 | drives | 87 | 112 | 78% | "still slicing..." |
| 2 | consistency | 65 | 89 | 73% | "one good shot..." |
...
```

#### Aspect Correlation Matrix
Which aspects co-occur in the same quotes?

```
               grip  stance  backswing  drives  consistency
grip            -     0.23    0.45      0.67      0.34
stance         0.23    -      0.31      0.28      0.19
backswing      0.45   0.31     -        0.52      0.48
drives         0.67   0.28    0.52       -        0.71
consistency    0.34   0.19    0.48      0.71       -
```

**Insight:** High correlation between grip + drives = common problem cluster

#### Gap Analysis
What aspects are ABSENT from discussion?

```
EXPECTED BUT NOT FOUND:
- Equipment fitting (mentioned only 3 times)
- Technology use (mentioned only 5 times)
- Tempo (mentioned only 8 times)

INSIGHT: These may be underserved angles
```

---

## VERIFICATION GATE 2B

```
ASPECT COVERAGE CHECK
─────────────────────
□ Minimum 200 quotes processed
□ All 5 aspect categories represented
□ At least 3 aspects with intensity >7
□ Correlation matrix generated
□ Gap analysis completed

QUALITY CHECK
─────────────
□ Each aspect has clear taxonomy mapping
□ Sentiment classifications are consistent
□ Intensity ratings have evidence
□ Co-occurrence patterns identified
□ Absent aspects documented

ULTRA RICH IMPACT LANDING CHECK
───────────────────────────────
□ Does the aspect breakdown reveal ACTIONABLE copy angles?
□ Are the high-intensity aspects SURPRISING or just confirming?
□ Does the correlation matrix show non-obvious problem clusters?
□ Are the gaps REAL opportunities or just data limitations?

GATE 2B STATUS: [ ] PASS [ ] FAIL
```

---

## ULTRA RICH QUALITY CHECKPOINT

Before completing output:

### Anti-Satisficing Check
1. Did I apply the full taxonomy or take shortcuts?
2. Am I missing intensity in my ratings (defaulting to 5s)?
3. Did I find non-obvious aspect correlations?

### Anti-Generic Check
4. Would a competitor find the same aspect patterns?
5. What surprised me about aspect distribution?
6. Which gaps are genuine opportunities vs. data artifacts?

---

## Playbook Output

```json
{
  "playbook_bullets_applied": [
    {"bullet_id": "dom-00002", "how_applied": "Used full aspect taxonomy", "helpful": true}
  ],
  "playbook_gaps_encountered": [
    {"situation": "Found new aspect not in taxonomy", "what_I_did": "Classified as closest match", "suggested_addition": "[New aspect definition]"}
  ],
  "new_patterns_discovered": [
    {"pattern": "Grip + drives co-occur at 0.67", "evidence": "Correlation analysis", "confidence": 0.9}
  ]
}
```

---

**Time Estimate:** 2-3 hours

**Output feeds to:** Agent 3 (Emotional Depth Diver), Agent 8B (Knowledge Graph Builder)
