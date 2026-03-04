# Improvement Agent Reference Index

## Pattern Detection Thresholds

| Pattern Type | Min Occurrences | Min Consistency |
|--------------|-----------------|-----------------|
| Expert underperformance | 5 | 70% |
| Context correlation | 7 | 65% |
| Synthesis pattern | 4 | 75% |
| Override pattern | 3 | 80% |

## Confidence Levels

- < 0.7: Possible pattern (log only)
- 0.7-0.9: Likely pattern (research recommended)
- > 0.9: Strong pattern (action recommended)

## Update Classification

### Auto-Apply (Minor)
- Wording adjustments
- Example additions
- Threshold tweaks (<10%)
- Reference updates

### Approval Required (Major)
- New frameworks
- Removed frameworks
- Threshold changes >10%
- Approach changes
- Multi-skill changes

## Data Locations

| Data | Path |
|------|------|
| Win Records | `~/.claude/webinar-arena/win-records/` |
| Learning Ledger | `~/.claude/webinar-arena/ledger.md` |
| Learning Requests | `~/.claude/webinar-arena/learning-requests/` |
| Agent Log | `~/.claude/webinar-arena/improvement-agent-log.md` |

## Research Priority Matrix

| Gap Size | Pattern Confidence | Priority |
|----------|-------------------|----------|
| >30% | >0.9 | HIGH |
| 20-30% | >0.8 | HIGH |
| 20-30% | 0.7-0.8 | MEDIUM |
| 10-20% | Any | MEDIUM |
| <10% | Any | LOW |
