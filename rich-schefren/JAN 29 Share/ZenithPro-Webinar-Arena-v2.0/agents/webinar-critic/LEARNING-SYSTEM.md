# Webinar Critic Learning System

This document defines how the Webinar Critic contributes to the central skill improvement system.

---

## Core Responsibility

After EVERY critique, this critic:
1. Logs findings locally (for Webinar-specific pattern detection)
2. Reports to central learning system (for cross-skill pattern sharing)
3. Checks pattern index for recurring issues
4. Triggers alerts or auto-applies based on thresholds

---

## Dual Logging Protocol

### Local Log
**Location:** `~/.claude/agents/webinar-critic/logs/critique-log.md`

Contains:
- Full 5-tier evaluation details
- Expert-specific pattern categorization
- Historical record of all evaluations
- Performance data when available

### Central Log
**Location:** `~/.claude/learning-system/logs/central-log.md`

Report format:
```markdown
## [TIMESTAMP] | WEBINAR-CRITIC | Pattern: [PATTERN-ID]

**Affected Skill(s):** [webinar-fladlien, webinar-brunson, etc.]
**Expert Source:** [Fladlien/Cage/Brunson/Kern/Joon/Kennedy/Universal]
**Failure:** [specific failure description]
**Root Cause:** [execution gap / skill gap / knowledge gap]
**Proposed Fix:** [specific skill update proposal]
**Occurrence:** [1st / 2nd / 3rd / etc.]
```

---

## The Learning Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   USE CRITIC → GENERATE EVALUATION → IDENTIFY FAILURES     │
│        ↑                              │                     │
│        │                              ▼                     │
│   SKILL UPDATED ← PATTERN DETECTED ← LOG TO BOTH LOCATIONS │
│                   (2nd: Alert, 6th: Auto-Apply)             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Pattern Detection Thresholds

| Occurrence | Status | Action |
|------------|--------|--------|
| 1st | LOGGED | Log only, no alert |
| 2nd | **PENDING** | Alert user: "Skill update pending approval" |
| 3rd-5th | PENDING | Remind user each occurrence |
| 6th | **AUTO-APPLY** | Update skill automatically, notify user |

---

## Log Files

All local logs are stored in: `~/.claude/agents/webinar-critic/logs/`

### 1. critique-log.md

**Purpose:** Captures findings from every Webinar Critic evaluation

**When to Update:** After every critique

**What to Log:**
- Date, webinar name, grade
- Context (price, market, type)
- 5-tier scores
- Key failures identified
- Root cause analysis (execution vs. skill gap)
- Fixes recommended

**Pattern Detection:**
- If same failure appears 3+ times → SKILL GAP
- Track by expert (Fladlien vs. Cage vs. Universal)
- Propose update to relevant skill
- Flag for approval

### 2. skill-changelog.md

**Purpose:** Version history of all skill changes

**When to Update:** When any skill file is modified

**What to Log:**
- Version number (semantic versioning)
- Skills affected (webinar-expert, webinar-critic)
- What triggered the change
- Specific changes made
- Rollback instructions

### 3. source-intake-log.md

**Purpose:** Tracks new webinar expert material integration

**When to Update:** When new source material is reviewed

**What to Log:**
- Source details (file, type, expert, length)
- Analysis summary (new vs. already captured)
- New elements identified
- Integration decision

---

## Workflow: After Each Critique

1. **Complete the critique** using the full 5-tier evaluation framework
2. **Identify key failures** — What went wrong?
3. **Root cause analysis** — Is this:
   - Execution gap (creator didn't follow skill)?
   - Skill gap (skill doesn't address this)?
   - Knowledge gap (skill lacks this framework)?
4. **Append to critique-log.md** using the template
5. **Check for patterns** — Does this failure appear 3+ times?
6. **Track by expert** — Is it a Fladlien, Cage, or Universal gap?
7. **If pattern detected** → Propose skill update

---

## Workflow: Integrating New Source Material

1. **Log the source** in source-intake-log.md
2. **Identify the expert** — Fladlien, Cage, or other?
3. **Analyze against existing frameworks**:
   - What's genuinely new?
   - What's already captured?
   - What's partially captured?
4. **Propose additions** to relevant skills
5. **Get approval** before integrating
6. **Update skill files** with new frameworks
7. **Log changes** in skill-changelog.md

---

---

## Pattern ID Format

`webinar-{expert}-{element}-{short-description}`

Examples:
- `webinar-fladlien-commitment-missing-yeses`
- `webinar-brunson-stack-incomplete`
- `webinar-cage-objections-not-prehandled`
- `webinar-kern-followup-missing`
- `webinar-joon-table-rush-weak`
- `webinar-kennedy-delivery-poor`
- `webinar-universal-proof-insufficient`

---

## Expert-Specific Tracking

The webinar methodology integrates multiple experts. Track patterns by expert:

### Fladlien Patterns
Common areas where gaps may emerge:
- Commitment psychology underutilized
- Emotional levers incomplete
- 4-part transitions missing
- Price psychology weak
- Bonus time ratio off

### Cage Patterns
Common areas where gaps may emerge:
- Desire Tap not activated
- Objections not pre-handled
- Stick Strategy absent
- Market language generic
- Transformation unclear

### Brunson Patterns
Common areas where gaps may emerge:
- Stack presentation incomplete
- Three Secrets structure weak
- Permission Pattern missing
- 16 closes underutilized
- Intro energy drops too fast

### Kern Patterns
Common areas where gaps may emerge:
- Follow-up system missing
- Indoctrination weak
- BOND phase rushed
- Hybrid method not applied
- Ultimate Offer incomplete

### Joon Patterns
Common areas where gaps may emerge:
- Table rush poorly executed
- Application close missing
- Yes momentum weak
- Price marinade insufficient
- Venue logistics ignored

### Kennedy Patterns
Common areas where gaps may emerge:
- Room control poor
- Presentation craft weak
- Selling tells present
- Universal structure violated
- Checkout prevention missing

### Universal Patterns
Common areas where gaps may emerge:
- Content vs. pitch ratio off
- Stories poorly placed
- Proof insufficient
- Urgency feels fake
- Offer unclear

---

## Cross-Pollination Opportunities

Patterns found here may apply to:
- `deutsch-*` skills (persuasion structure overlaps)
- `clayton-*` skills (close, proof, emotion parallels)
- `evaldo-*` skills (VSL structure similarities)

When logging, consider if pattern is webinar-specific or universal.

---

## Files Maintained

| File | Purpose |
|------|---------|
| `logs/critique-log.md` | Full local critique history |
| `logs/skill-changelog.md` | Version history of skill changes |
| `logs/source-intake-log.md` | New source material tracking |
| `LEARNING-SYSTEM.md` | This file - protocol definition |

Central files referenced:
| File | Purpose |
|------|---------|
| `~/.claude/learning-system/logs/central-log.md` | All critics report here |
| `~/.claude/learning-system/logs/pending-updates.md` | Updates awaiting approval |
| `~/.claude/learning-system/logs/applied-updates.md` | Completed updates history |
| `~/.claude/learning-system/logs/pattern-index.md` | Pattern occurrence tracking |

---

## Skill Update Protocol

When a skill gap is detected:

1. **Identify the gap** — What's missing or unclear?
2. **Identify the expert** — Whose methodology does this relate to?
3. **Propose the fix** — What should be added/changed?
4. **Log in skill-changelog.md** — Before making changes
5. **Get approval** — User confirms the update
6. **Apply changes** — Update skill files
7. **Update version** — Increment version in frontmatter
8. **Test** — Use updated skill, verify improvement

---

## Rollback Protocol

If a skill update causes problems:

1. **Check skill-changelog.md** for the version entry
2. **Follow rollback instructions** in that entry
3. **Revert files** to previous state
4. **Log the rollback** as a new changelog entry
5. **Analyze why** the update caused issues

---

## Performance Validation

Unlike copywriting critics, webinar critics can validate against performance data:

### Metrics to Track (When Available)
- Registration rate
- Attendance rate
- Conversion rate
- Drop-off points
- Replay conversion

### Validation Questions
- Did our critique predict which webinars would perform well?
- Did recommended fixes improve performance?
- Are our benchmarks calibrated correctly?

### Updating Benchmarks
If real-world data consistently differs from benchmarks:
1. Log the discrepancy
2. Gather 5+ data points
3. Propose benchmark update
4. Get approval
5. Update skill with new benchmarks

---

## Commands

### Review Critique Log
```
"Review the webinar critique log and identify any patterns that indicate skill gaps"
```

### Propose Skill Updates
```
"Based on the webinar critique log, propose updates to the skills"
```

### Integrate New Material
```
"Analyze [source file] and identify what should be added to webinar skills"
```

### Check Skill Versions
```
"What are the current versions of all webinar skills?"
```

### Validate Benchmarks
```
"Compare our webinar benchmarks against [performance data] and recommend updates"
```

---

## Best Practices

1. **Log everything** — Better to over-log than miss a pattern
2. **Be specific** — Vague failures are hard to fix
3. **Root cause matters** — Not all failures are skill gaps
4. **Track by expert** — Know whose methodology needs updating
5. **Small updates** — Incremental improvements beat rewrites
6. **Preserve what works** — Don't "fix" working patterns into mediocrity
7. **Version carefully** — Always log before changing
8. **Validate with data** — Use performance metrics when available

---

## Integration with Webinar-Expert Skill

The webinar-critic agent and webinar-expert skill form a closed loop:

```
webinar-expert (create) → webinar-critic (evaluate) → feedback → webinar-expert (improve)
                                    ↓
                              learning system
                                    ↓
                         skill updates (when patterns detected)
```

Findings from critiques should:
1. Feed back into immediate webinar improvements
2. Accumulate into pattern detection
3. Eventually update the skills themselves

---

*Part of the Webinar Excellence Suite*
