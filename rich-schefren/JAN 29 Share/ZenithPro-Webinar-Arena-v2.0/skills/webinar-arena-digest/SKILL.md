---
name: webinar-arena-digest
description: Weekly Digest Generator for Webinar Arena v2.0. Compiles all Arena activity into a weekly summary that surfaces what happened without requiring active querying.
version: 1.0.0
author: Rich Schefren
triggers:
  - /arena-digest
  - weekly digest
  - arena summary
---

# Weekly Digest Generator

## Purpose

Compile all autonomous learning and system activity into a weekly summary. This is the "newspaper you read" to see what happened without digging through logs.

## Commands

### `/arena-digest`

Display current week's digest.

**Options:**
- `--week=[YYYY-MM-DD]` - Display historical digest for specific week
- `--generate` - Force regenerate current digest
- `--email` - Format for email delivery (future feature)

## Digest Structure

```
╔══════════════════════════════════════════════════════════════════╗
║            WEBINAR ARENA WEEKLY DIGEST                           ║
║         Week of: [Start Date] - [End Date]                       ║
║         Generated: [Timestamp]                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ EXECUTIVE SUMMARY                                                ║
║ ─────────────────                                                ║
║ [STATUS ICON] System Status: [GREEN/YELLOW/RED]                  ║
║ [TREND ICON] Trend: [Improving/Stable/Declining]                 ║
║                                                                  ║
║ This week, the Arena ran [N] competitions, applied [N] skill     ║
║ updates, and completed [N] research cycles. [Summary statement]. ║
║                                                                  ║
║ Key Highlight: [Most important thing that happened]              ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ COMPETITIONS ([N] this week)                                     ║
║ ─────────────────────────────                                    ║
║ | Competition | Winner | Judge Accuracy | Outcome |              ║
║ |-------------|--------|----------------|---------|              ║
║ | [Name]      | [Who]  | [Check/X]      | [Status]|              ║
║                                                                  ║
║ Win Distribution:                                                ║
║ - [Expert]: [N] wins                                             ║
║ - [Expert]: [N] wins                                             ║
║                                                                  ║
║ Override: [Description if any]                                   ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ SKILL EVOLUTION                                                  ║
║ ─────────────────                                                ║
║ Updates Applied ([N]):                                           ║
║ 1. [Expert]: [Update description]                                ║
║                                                                  ║
║ Updates Proposed ([N] pending approval):                         ║
║ 1. [Expert]: [Update] - /arena-approve [id]                      ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ RESEARCH ACTIVITY                                                ║
║ ─────────────────                                                ║
║ Completed: [N]                                                   ║
║ In Progress: [N]                                                 ║
║ Queued: [N]                                                      ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ WILD CARD EXPERIMENTS                                            ║
║ ─────────────────────                                            ║
║ [If any Wild Card won, highlight as BREAKTHROUGH]                ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ PATTERNS DETECTED ([N])                                          ║
║ ──────────────────────                                           ║
║ 1. [Pattern description]                                         ║
║    Implication: [What to do about it]                            ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ JUDGE CALIBRATION                                                ║
║ ─────────────────                                                ║
║ Weekly Accuracy: [X]% ([N]/[N] correct)                          ║
║ Cumulative Accuracy: [X]% ([+/-]% from last week)                ║
║ Bias Alerts: [Any or None]                                       ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ SYSTEM HEALTH                                                    ║
║ ──────────────                                                   ║
║ | Metric | This Week | Last Week | Trend |                       ║
║ |--------|-----------|-----------|-------|                       ║
║ | Competitions | [N] | [N] | [→↗↘] |                             ║
║ | Outcomes Reported | [N] | [N] | [→↗↘] |                        ║
║ | Learning Velocity | [N] | [N] | [→↗↘] |                        ║
║ | Diversity Score | [X]% | [X]% | [→↗↘] |                        ║
║                                                                  ║
║ Attention Needed:                                                ║
║ - [Items requiring user action]                                  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ AUTONOMOUS ACTIONS TAKEN                                         ║
║ ────────────────────────                                         ║
║ Actions taken without user involvement:                          ║
║ 1. [Check] [Action description]                                  ║
║ 2. [Check] [Action description]                                  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ LOOKING AHEAD                                                    ║
║ ─────────────                                                    ║
║ Scheduled:                                                       ║
║ - [Upcoming automated activity]                                  ║
║                                                                  ║
║ Recommendations:                                                 ║
║ 1. [Action user should consider]                                 ║
║ 2. [Action user should consider]                                 ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

## Data Sources

The digest compiles from:

| Source | Data |
|--------|------|
| Learning Feed | All events from the week |
| Win Records | Competition results |
| Outcomes | Reported outcomes |
| Calibration | Judge accuracy |
| Critique Effectiveness | Critic performance |
| Learning Requests | Skill updates |
| Research Cache | Completed research |
| Wild Card Log | Experiments |
| Dashboard | System health |

## Generation Schedule

- **Automatic:** Every Monday at 8:00 AM
- **On-demand:** Via `/arena-digest --generate`

## Significance Markers

| Marker | Meaning |
|--------|---------|
| :dart: | Breakthrough (Wild Card win, major discovery) |
| :green_circle: | Healthy/Good |
| :yellow_circle: | Attention needed |
| :red_circle: | Problem detected |
| :warning: | Action required |
| :chart_with_upwards_trend: | Improving trend |
| :chart_with_downwards_trend: | Declining trend |

## Trend Calculation

Compare current week to previous week:
- **Improving:** >10% increase
- **Stable:** Within ±10%
- **Declining:** >10% decrease

## Storage

Digests stored at: `~/.claude/webinar-arena/digests/[YYYY-MM-DD].md`

## Edge Cases

| Scenario | Handling |
|----------|----------|
| No activity | Generate confirming "No Arena activity this week" |
| Very high activity (50+ events) | Summarize by category, highlight top 5 |
| Missing data from one system | Note incomplete, show available |
| First week (no comparison) | Skip trend analysis, note "First digest" |
| Future date requested | Error: "Cannot generate digest for future dates" |

## Graceful Degradation

If some tracking systems aren't built yet:
- Show available data
- Note which sections are unavailable
- Don't block digest generation

---

*Part of Webinar Arena v2.0*
*PRD-11: Weekly Digest Generator*
