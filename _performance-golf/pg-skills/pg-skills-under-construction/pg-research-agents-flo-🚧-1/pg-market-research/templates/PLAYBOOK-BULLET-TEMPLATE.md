# Playbook Bullet Template
## ACE (Agentic Context Engineering) Standard Format

---

## Bullet Structure

Every playbook bullet must follow this format:

```
[{section_prefix}-{number}] helpful={n} harmful={n} ::
{content with specific, actionable guidance}
```

### Section Prefixes

| Section | Prefix | Purpose |
|---------|--------|---------|
| Strategies and Hard Rules | `shr` | Core campaign strategies |
| Code Snippets | `code` | Reusable code templates |
| Troubleshooting | `ts` | Common issues and fixes |
| APIs and Schemas | `api` | Integration configurations |
| Domain Knowledge | `dom` | Golf market intelligence |
| Verification Checklist | `vc` | Quality gates |
| Source Quality | `sqi` | Platform-specific insights |
| Emotion Patterns | `emo` | Emotional intelligence |
| Competitive Intelligence | `ci` | Competitor insights |

---

## Example Bullets by Section

### Strategies and Hard Rules (shr-)

```markdown
[shr-00001] helpful=12 harmful=2 ::
When targeting beginner golfers (25+ handicap), always extract language about
'embarrassment' and 'social shame' first. These emotions have driven 7 of 9
successful campaigns in 2024. Look for specific phrases: 'can't play with my
boss,' 'holding up the group,' 'won't play with friends anymore.'
Evidence: PG-2024-003, PG-2024-007 had 40%+ CVR lift using embarrassment leads.
```

### Domain Knowledge (dom-)

```markdown
[dom-00003] helpful=8 harmful=0 ::
The phrase "I've taken so many lessons" appears in 73% of GolfWRX frustration
threads. Follow-up posts reveal the root issue: conflicting advice between
instructors, not lesson quality itself. This creates an opening for "one
coherent system" positioning that outperforms "better instructor" messaging.
Evidence: 47 threads analyzed Q4 2024; top 3 campaigns used "coherent system" hook.
```

### Emotion Patterns (emo-)

```markdown
[emo-00005] helpful=6 harmful=1 ::
EMBARRASSMENT > FRUSTRATION for cold traffic hooks in golf. Embarrassment
creates urgency (external pressure from others watching), while frustration
feels internal and less time-sensitive. Test hook format: "Stop being the
golfer who [embarrassing situation]" outperformed "Fix your [frustrating
problem]" by 2.3x in headline tests.
Evidence: A/B test PG-2024-009, 12,000 impressions per variant.
```

### Source Quality (sqi-)

```markdown
[sqi-00002] helpful=5 harmful=0 ::
TikTok comments have 2x higher emotional intensity than Reddit r/golf.
However, TikTok skews younger (25-35) while Reddit skews older (40-55).
When extracting for Performance Golf ICP (45-65, $100K+), weight Reddit
quotes 1.5x in final synthesis.
Evidence: Demographic analysis PG-2024-006; age verification via platform data.
```

### Competitive Intelligence (ci-)

```markdown
[ci-00004] helpful=4 harmful=1 ::
Me and My Golf's highest-performing Facebook ads consistently use the
"practice doesn't make perfect" hook. Running since March 2024 (10+ months).
However, saturation is high - direct copies now underperform. Angle
variation: "What 10,000 balls taught me (and why it's wrong)" performs
better by positioning against their specific mechanism.
Evidence: Facebook Ad Library scrape November 2024; A/B test PG-2024-011.
```

---

## Quality Requirements

### Minimum Requirements
- [ ] Content length: 50+ characters
- [ ] At least 2 specificity markers (numbers, quotes, specific examples)
- [ ] Evidence field populated with campaign ID or source
- [ ] Actionable guidance (not just observation)

### Specificity Markers (Required: 2+)
- Numbers: "73%", "47 threads", "2.3x"
- Dollar amounts: "$100K+"
- Specific phrases in quotes: "can't play with my boss"
- Time references: "March 2024", "10+ months"
- Campaign IDs: "PG-2024-003"
- Platform names: "GolfWRX", "TikTok", "Reddit r/golf"

### Red Flags (Avoid)
- Vague language: "sometimes", "usually", "might"
- No evidence: Missing campaign ID or source
- Too short: Less than 50 characters
- Generic advice: Could apply to any market
- No specificity: Missing numbers, quotes, or examples

---

## Evidence Field Format

```markdown
Evidence: {Campaign ID(s)} - {Specific result or source}
```

Examples:
- `Evidence: PG-2024-003, PG-2024-007 had 40%+ CVR lift using embarrassment leads.`
- `Evidence: Facebook Ad Library scrape November 2024; A/B test PG-2024-011.`
- `Evidence: 47 threads analyzed Q4 2024; top 3 campaigns used "coherent system" hook.`
- `Evidence: Demographic analysis PG-2024-006; age verification via platform data.`

---

## Adding New Bullets

When proposing a new bullet via the Curator agent:

```json
{
  "type": "ADD",
  "section": "domain_knowledge",
  "content": "[Full bullet content with specifics]",
  "evidence": "[Campaign ID and specific supporting data]"
}
```

---

## Updating Existing Bullets

When updating a bullet via the Curator agent:

```json
{
  "type": "UPDATE",
  "bullet_id": "dom-00003",
  "new_content": "[Updated bullet content - must preserve or increase specificity]",
  "reason": "[Why this update improves the bullet]"
}
```

**Critical**: Updates must NOT reduce specificity. New content should be >= 80% length of original.

---

## Bullet Lifecycle

```
NEW BULLET
    │
    ▼
[helpful=0 harmful=0]  ← Initial state
    │
    ▼ (Campaign uses bullet)
[helpful++ OR harmful++]  ← Reflector evaluates
    │
    ▼ (Multiple campaigns)
[helpful=12 harmful=2]  ← Proven bullet
    │
    ▼ (If harmful > helpful)
FLAGGED FOR REVIEW  ← Curator considers update/archive
```

---

*Template Version 1.0 — ACE Enhanced Edition*
