# Randomness Injection Configuration

**Created:** 2026-01-23
**Last Updated:** 2026-01-23
**Status:** Active

---

## Purpose

Prevent the Arena from converging on local maxima by periodically introducing randomness into synthesis combinations. This is the "explore" complement to the system's "exploit" optimization.

---

## Randomness Parameters

### Injection Rate

- **Current Rate:** 15%
- **Range:** 5% - 30%
- **Meaning:** X% of synthesis combinations include random elements

### Random Element Types

| Type | Description | Weight |
|------|-------------|--------|
| Unexpected Expert | Include low-performing expert in synthesis | 40% |
| Inverted Weight | Swap primary/secondary expert in synthesis | 25% |
| Framework Swap | Use framework from unexpected expert | 20% |
| Combination Novelty | Force untested expert combination | 15% |

### Statistical Thresholds

To prevent false positive "winners" from random variations:

| Metric | Threshold | Purpose |
|--------|-----------|---------|
| Min competitions for pattern | 5 | Avoid noise in small samples |
| Confidence for action | 80% | High bar for permanent changes |
| Win streak for significance | 3 | Random win ≠ pattern |

---

## Injection Rules

### When to Inject

1. **Standard rate:** Apply injection rate to all synthesis requests
2. **Boost rate:** Increase 10% when diversity score <50%
3. **Reduce rate:** Decrease 5% when Win rate dropping

### When NOT to Inject

1. User explicitly requests specific synthesis
2. Final production draft (user can override)
3. Time-critical competition (no room for experimentation)

### Injection Process

```
1. Generate standard synthesis recommendation
2. Roll random: if < injection_rate, inject randomness
3. Select random element type based on weights
4. Apply random modification
5. Flag draft as "randomness-injected" for tracking
6. Track outcome for learning
```

---

## Tracking

### Randomness Experiment Log

| Date | Competition | Injection Type | Result | Learning |
|------|-------------|----------------|--------|----------|
| *No data yet* | | | | |

### Performance by Injection Type

| Type | Attempts | Wins | Win Rate | vs Standard |
|------|----------|------|----------|-------------|
| Unexpected Expert | 0 | 0 | N/A | N/A |
| Inverted Weight | 0 | 0 | N/A | N/A |
| Framework Swap | 0 | 0 | N/A | N/A |
| Combination Novelty | 0 | 0 | N/A | N/A |
| **Standard (no injection)** | 0 | 0 | N/A | baseline |

---

## Adaptive Rate Adjustment

### Rate Increase Triggers

- Diversity score <50% for 5+ competitions
- Same expert wins 5+ consecutive competitions
- Synthesis combinations becoming repetitive

### Rate Decrease Triggers

- Randomness-injected drafts losing consistently (>70% loss rate)
- User overrides randomness frequently
- Overall win rate declining

### Adjustment Limits

- Minimum rate: 5% (never fully disable)
- Maximum rate: 30% (don't make it chaos)
- Adjustment step: 5% per review

---

## Multiple Testing Correction

When evaluating randomness results, apply correction for multiple comparisons:

### Bonferroni Correction

```
Adjusted significance = 0.05 / number_of_comparisons
```

For 4 injection types: p < 0.0125 required for significance

### Practical Application

Don't declare "Injection Type X works better" until:
- At least 20 observations for that type
- Statistical significance with correction
- Pattern holds across different contexts

---

## Commands

### `/arena-randomness`

View and configure randomness injection.

**Options:**
- `--status` - Show current configuration
- `--rate=[X]` - Set injection rate (5-30)
- `--disable` - Temporarily disable (set rate to 0)
- `--boost` - Temporarily boost rate +10%
- `--stats` - Show performance statistics

---

## Integration

### Inputs
- Synthesis requests from Synthesist
- Competition context
- Diversity score from Dashboard
- Historical performance data

### Outputs
- Modified synthesis recommendations
- Randomness flags on drafts
- Performance tracking data
- Rate adjustment recommendations

---

*Part of Webinar Arena v2.0*
*PRD-14: Randomness Injection Engine*
