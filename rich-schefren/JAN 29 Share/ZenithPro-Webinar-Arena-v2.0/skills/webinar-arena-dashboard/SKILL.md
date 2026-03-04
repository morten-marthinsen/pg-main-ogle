---
name: webinar-arena-dashboard
description: System Health Dashboard for Webinar Arena v2.0. Provides at-a-glance visibility into Arena health, expert performance, learning velocity, and system status.
version: 1.0.0
author: Rich Schefren
triggers:
  - /arena-health
  - /arena-dashboard
  - arena health
  - arena status
---

# Webinar Arena System Health Dashboard

## Purpose

Provide instant visibility into the health and performance of the Webinar Arena system. This is the "Dutch electric meter in the hallway" - making system state visible without effort changes behavior.

## Commands

### `/arena-health`

Display comprehensive system health dashboard.

**Options:**
- `--compact` - Show summary only
- `--expert=[name]` - Focus on specific expert
- `--period=[7d|30d|90d|all]` - Time period for metrics (default: 30d)

## Dashboard Display

When invoked, display the following dashboard:

```
╔══════════════════════════════════════════════════════════════════╗
║                 WEBINAR ARENA SYSTEM HEALTH                      ║
║                    [Date] | [Time Period]                        ║
╠══════════════════════════════════════════════════════════════════╣
║ OVERALL STATUS: [GREEN/YELLOW/RED]                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ EXPERT WIN RATES (Last [N] Competitions)                         ║
║ ─────────────────────────────────────────                        ║
║ Fladlien:  ████████░░ 80% (8/10)  [Trend: ↗️]                    ║
║ Brunson:   ██████░░░░ 60% (6/10)  [Trend: →]                     ║
║ Cage:      █████░░░░░ 50% (5/10)  [Trend: ↘️]                    ║
║ Kern:      ███████░░░ 70% (7/10)  [Trend: ↗️]                    ║
║ Joon:      ████░░░░░░ 40% (4/10)  [Trend: →]                     ║
║ Kennedy:   ██████░░░░ 60% (6/10)  [Trend: →]                     ║
║ Synthesis: █████████░ 90% (9/10)  [Trend: ↗️]                    ║
║                                                                  ║
║ LEARNING VELOCITY                                                ║
║ ─────────────────────────────────────────                        ║
║ Patterns Detected:     [N] this period ([+/-N] vs last)          ║
║ Skill Updates Applied: [N] this period ([+/-N] vs last)          ║
║ Research Completed:    [N] this period ([+/-N] vs last)          ║
║                                                                  ║
║ FEEDBACK LOOP STATUS                                             ║
║ ─────────────────────────────────────────                        ║
║ Outcomes Reported:     [N] / [N] competitions ([X]%)             ║
║ Judge Accuracy:        [X]% (calibration: [date])                ║
║ Critique Effectiveness: [X]% improvement rate                    ║
║                                                                  ║
║ DIVERSITY SCORE: [X]% (target: >60%)                             ║
║ ─────────────────────────────────────────                        ║
║ [Bar showing distribution across experts]                        ║
║                                                                  ║
║ PENDING ACTIONS                                                  ║
║ ─────────────────────────────────────────                        ║
║ [N] skill updates awaiting approval                              ║
║ [N] outcomes pending report                                      ║
║ [N] research requests queued                                     ║
║                                                                  ║
║ WILD CARD STATUS                                                 ║
║ ─────────────────────────────────────────                        ║
║ Total Experiments: [N] | Wins: [N] | Win Rate: [X]%              ║
║ Breakthroughs Extracted: [N]                                     ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

## Health Status Logic

### Overall Status

| Status | Condition |
|--------|-----------|
| GREEN | All metrics healthy, no pending actions overdue |
| YELLOW | Some metrics below target OR pending actions >7 days |
| RED | Critical metrics failing OR system errors detected |

### Metric Thresholds

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Diversity Score | >60% | 40-60% | <40% |
| Outcome Reporting Rate | >50% | 25-50% | <25% |
| Judge Accuracy | >70% | 50-70% | <50% |
| Critique Effectiveness | >70% | 50-70% | <50% |
| Pending Actions Age | <7 days | 7-14 days | >14 days |

## Data Sources

The dashboard reads from:

1. **Win Records** (`~/.claude/webinar-arena/win-records/`)
   - Per-expert win/loss records
   - Competition history

2. **Learning Ledger** (`~/.claude/webinar-arena/ledger.md`)
   - Pattern detection events
   - Skill update events

3. **Outcomes** (`~/.claude/webinar-arena/outcomes/`)
   - Reported outcomes
   - Judge accuracy calculations

4. **Calibration** (`~/.claude/webinar-arena/calibration.md`)
   - Judge calibration data
   - Accuracy trends

5. **Critique Effectiveness** (`~/.claude/webinar-arena/critique-effectiveness.md`)
   - Critique improvement rates

6. **Wild Cards** (`~/.claude/webinar-arena/wild-cards/`)
   - Wild Card experiment log

## Trend Calculation

Trends compare current period to previous period:
- ↗️ Improving: >10% increase
- → Stable: Within ±10%
- ↘️ Declining: >10% decrease

## Diversity Score

Measures how evenly wins are distributed across experts:

```
Diversity = 1 - (sum of squared win proportions)
```

- 100% = perfectly even distribution
- 0% = single expert wins everything
- Target: >60%

Low diversity triggers alert: system may be over-optimized for one approach.

## Implementation Notes

### Reading Win Records

```python
# Pseudocode for reading win records
win_records = {}
for expert in ['fladlien', 'brunson', 'cage', 'kern', 'joon', 'kennedy', 'synthesis']:
    file = f"~/.claude/webinar-arena/win-records/{expert}.md"
    if exists(file):
        win_records[expert] = parse_win_record(file)
```

### Calculating Learning Velocity

Count events in Learning Ledger matching:
- `## PATTERN_DETECTED` entries
- `## UPDATE_APPLIED` entries
- `## RESEARCH_COMPLETE` entries

### Pending Actions Detection

Check for:
- Skill updates in `learning-requests/` with status "proposed"
- Competitions without corresponding outcomes in `outcomes/`
- Research requests in queue

## Error Handling

| Error | Display |
|-------|---------|
| Win records missing | "No competition data yet. Run an Arena competition to start." |
| Partial data | Show available metrics, note "[Metric] unavailable - no data" |
| File read error | Show last known good state with timestamp |

---

*Part of Webinar Arena v2.0*
*PRD-01: System Health Dashboard*
