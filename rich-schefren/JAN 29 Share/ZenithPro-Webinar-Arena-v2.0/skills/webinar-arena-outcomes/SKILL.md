---
name: webinar-arena-outcomes
description: Outcome Tracking System for Webinar Arena v2.0. Captures marketplace results and proxy signals to close feedback loops and enable system learning.
version: 1.0.0
author: Rich Schefren
triggers:
  - /arena-outcome
  - report outcome
  - arena outcome
---

# Webinar Arena Outcome Tracking System

## Purpose

Close the feedback loop between Arena predictions and marketplace reality. Capture both slow ground truth (conversion rates) and fast proxy signals (user behavior) to enable continuous calibration.

## Commands

### `/arena-outcome`

Launch the outcome capture flow.

**Options:**
- `--competition=[id]` - Specify competition directly
- `--last` - Report outcome for most recent competition

## Outcome Capture Flow

### Step 1: Competition Selection

```
Which competition are you reporting an outcome for?

1. [Most recent] ZenithPro Launch - Jan 22, 2026 (Synthesis won)
2. BGS Evergreen - Jan 18, 2026 (Brunson won)
3. Apex Webinar - Jan 15, 2026 (Kennedy won)
4. Other (I'll describe it)

>
```

### Step 2: Version Used

```
For the ZenithPro Launch competition where Synthesis won:

Did you use the winning version?
1. Yes, used Synthesis as-is
2. Yes, but modified it
3. No, used a different version from the competition
4. No, didn't use any Arena output

>
```

### Step 3: Modifications (if applicable)

```
What did you modify?

> [free text]
```

### Step 4: Satisfaction Rating

```
On a scale of 1-5, how satisfied were you with the result?
(1 = very dissatisfied, 5 = very satisfied)

>
```

### Step 5: Satisfaction Notes (optional)

```
Any notes on why [rating]? (optional, press enter to skip)

>
```

### Step 6: Conversion Data (optional)

```
Do you have conversion data to share? (optional - any format works)
Examples: "2.5%", "3 out of 100", "better than usual", "skip"

>
```

### Step 7: Confirmation

```
Outcome recorded!

Summary:
- Competition: ZenithPro Launch (Synthesis)
- Used: Winner with modifications (shortened intro, different story)
- Satisfaction: 4/5 (close felt weak)
- Conversion: 3.2% (above benchmark)
- Judge Accuracy: Partial (modifications made)

This data will help calibrate future predictions.
```

## Proxy Signals

In addition to explicit outcome reporting, the system automatically captures:

### 1. Deployment Signal (Immediate)

Triggered when user:
- Exports winner to file
- Copies winner content
- Requests final version for use

**Capture:** `deployed: true/false`, `timestamp`

### 2. Edit Signal (Immediate)

Triggered when user:
- Requests revisions before using
- Makes significant changes to winner
- Asks for alternative versions

**Capture:** `edited: true/false`, `edit_scope: minor/major`

### 3. Selection Signal (Immediate)

Triggered when user:
- Accepts Judge's winner (normal)
- Overrides to select different entry (links to PRD-08)

**Capture:** `accepted_winner: true/false`, `override_choice: [expert]`

### 4. Return Signal (Days)

Tracked passively:
- Did user run another Arena competition?
- Time between competitions

**Capture:** `returned: true/false`, `days_to_return: N`

## Data Model

### Outcome Record Structure

```markdown
---
type: outcome
competition_id: zenithpro-launch-2026-01-23
created: 2026-01-25T14:32:00Z
---

# Outcome Record: ZenithPro Launch

## Competition Reference
- **Competition:** ZenithPro Launch - Jan 23, 2026
- **Winner:** Synthesis (Fladlien 60% + Joon 30% + Kern 10%)
- **Judge Prediction Confidence:** High

## Outcome Data
- **Version Used:** Winner with modifications
- **Modifications Made:** Shortened intro by 2 minutes, replaced story in middle section with personal case study
- **Satisfaction Rating:** 4/5
- **Satisfaction Notes:** Worked well but the close felt a bit weak

## Conversion Data
- **Conversion Reported:** Yes
- **Conversion Rate:** 3.2%
- **Conversion Context:** Webinar to $2K offer, warm list, 500 registrants

## Proxy Signals
- **Deployed:** Yes (2026-01-23 16:45:00)
- **Edited Before Use:** Yes (major)
- **Accepted Winner:** Yes
- **Returned for Competition:** Yes (3 days later)

## Calibration Value
- **Signal Strength:** Medium
  - Reason: Winner used but with major modifications
- **Judge Accuracy:** Partial
  - Winner was used, but heavy modifications reduce signal clarity

---

*Recorded: 2026-01-25T14:32:00Z*
*Reported by: User*
```

### Storage Location

`~/.claude/webinar-arena/outcomes/[competition-id].md`

Example: `~/.claude/webinar-arena/outcomes/zenithpro-launch-2026-01-23.md`

## Signal Strength Calculation

| Version Used | Modifications | Conversion Data | Signal Strength |
|--------------|---------------|-----------------|-----------------|
| Winner | None | Yes | High |
| Winner | Minor | Yes | High |
| Winner | Major | Yes | Medium |
| Winner | None/Minor | No | Medium |
| Winner | Major | No | Low |
| Runner-up | Any | Any | Medium (override signal) |
| None | N/A | N/A | Low (rejection signal) |

## Judge Accuracy Calculation

| Scenario | Accuracy Score |
|----------|----------------|
| Winner used as-is, positive outcome | Correct |
| Winner used with minor mods, positive outcome | Correct |
| Winner used with major mods, positive outcome | Partial |
| Runner-up used, positive outcome | Incorrect |
| Winner used, negative outcome | Incorrect |
| None used | No signal (don't count) |

## Conversion Rate Parsing

Accept flexible formats:

| Input | Parsed Value |
|-------|--------------|
| "2.5%" | 2.5 |
| "2.5" | 2.5 |
| "3 out of 100" | 3.0 |
| "about 3%" | ~3.0 |
| "3-4%" | 3.5 (midpoint) |
| "better than usual" | qualitative:positive |
| "terrible" | qualitative:negative |
| "good" | qualitative:positive |
| "skip" | null |

## Integration Points

### Outputs To

1. **Learning Ledger** - Link outcome to competition record
2. **Judge Calibration (PRD-06)** - Accuracy data for calibration
3. **Learning Feed (PRD-02)** - Emit OUTCOME_REPORTED event
4. **Critique Effectiveness (PRD-07)** - If critiqued version was used

### Reads From

1. **Competition Records** - To list recent competitions
2. **Win Records** - To identify winner for each competition

## Proxy Signal Validation

Over time, validate that proxy signals predict actual outcomes:

```markdown
## Proxy Correlation Analysis

| Proxy Signal | Correlation with Positive Outcome |
|--------------|-----------------------------------|
| Deployed immediately | 0.72 (strong) |
| No major edits | 0.65 (moderate) |
| Accepted winner | 0.58 (moderate) |
| Returned within 7 days | 0.45 (weak) |

*Based on N=47 outcome reports*
*Last updated: 2026-01-23*
```

Use this correlation data to weight proxy signals appropriately. High-correlation proxies can inform fast calibration; low-correlation proxies should be weighted less.

## Edge Cases

| Scenario | Handling |
|----------|----------|
| Can't remember competition | Show recent competitions with dates and project names |
| Heavily modified version | Capture modifications, flag as "low signal" |
| Didn't use any | Still valuable - capture why (quality? timing? direction?) |
| Months-delayed report | Accept, flag as `delayed: true` |
| Unusual conversion format | Parse flexibly, store original input |
| No matching competition | Help user find right one, or create orphan record |

## Low-Friction Design

The system is designed for <30 second reporting:

1. **Minimal required fields:** Competition + what was used + satisfaction
2. **Flexible inputs:** Accept any conversion format
3. **Smart defaults:** Most recent competition pre-selected
4. **Optional everything:** User can skip any field
5. **No signup/login:** Just report and go

Some data is better than no data.

---

*Part of Webinar Arena v2.0*
*PRD-03: Outcome Tracking System*
