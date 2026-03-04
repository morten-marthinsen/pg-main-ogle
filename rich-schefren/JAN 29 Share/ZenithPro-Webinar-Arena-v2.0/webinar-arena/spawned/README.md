# Spawned Experts Directory

**Location:** `~/.claude/webinar-arena/spawned/`

## Purpose

Track and store experts spawned from winning synthesis combinations or Wild Card breakthroughs. This is the nursery for new methodologies that have proven themselves in competition.

---

## Enhanced Expert Spawner (PRD-15)

### Spawn Triggers

An expert spawn is triggered when:

1. **Synthesis wins all rounds** of an Arena competition (requires user approval)
2. **Wild Card breakthrough extracted** and approved as Full Spawn
3. **User explicitly requests** spawn from high-performing synthesis

### Spawn Requirements

Before spawning, validate:

| Requirement | Threshold | Purpose |
|-------------|-----------|---------|
| Competition wins | 3+ rounds | Prove it's not luck |
| Contexts tested | 2+ different | Prove generalizability |
| Unique approach | Differentiation score >70% | Not just restating an expert |
| User approval | Required | Final gate |

### Spawn Process

```
1. Validate spawn requirements met
2. Extract winning combination formula
3. Generate skill files
4. Generate critic agent
5. Register in spawned experts directory
6. Track performance over time
7. Monitor for degradation
```

---

## Spawned Expert Structure

Each spawned expert creates:

```
~/.claude/webinar-arena/spawned/webinar-[name]/
├── metadata.md          # Spawn details and lineage
├── skill/               # Skill files (deployed to ~/.claude/skills/)
│   ├── SKILL.md
│   └── references/
└── critic/              # Critic agent (deployed to ~/.claude/agents/)
    ├── AGENT.md
    └── references/
```

### Metadata File

```markdown
# Spawned Expert: [Name]

**Spawned:** [Date]
**Status:** Active | Probation | Retired
**Origin:** Synthesis | Wild Card

---

## Lineage

### If from Synthesis:
**Winning Combination:**
- Primary: [Expert] ([X]%)
- Secondary: [Expert] ([Y]%)
- Tertiary: [Expert] ([Z]%)

**Competition(s) Won:**
- [Competition 1]: [Result]
- [Competition 2]: [Result]
- [Competition 3]: [Result]

### If from Wild Card:
**Source:** [File path]
**Wild Card ID:** [id]
**Competition Won:** [name]

---

## Performance Record

| Date | Competition | Result | Notes |
|------|-------------|--------|-------|
| | | | |

### Summary
- **Total Competitions:** 0
- **Wins:** 0
- **Win Rate:** N/A
- **Trend:** N/A

---

## Degradation Monitoring

| Period | Win Rate | Trend | Alert |
|--------|----------|-------|-------|
| Last 30 days | N/A | N/A | N/A |
| Last 60 days | N/A | N/A | N/A |
| Last 90 days | N/A | N/A | N/A |

**Retirement Threshold:** Win rate <20% for 90+ days

---

## Deployment Status

- **Skill:** ~/.claude/skills/webinar-[name]/
- **Critic:** ~/.claude/agents/webinar-[name]-critic/
- **Deployed:** [Date]

---

*Enhanced Expert Spawner (PRD-15)*
```

---

## Spawned Expert Registry

### Active Experts

| Name | Origin | Spawned | Win Rate | Status |
|------|--------|---------|----------|--------|
| *None yet* | | | | |

### On Probation

Experts with declining performance under review:

| Name | Issue | Since | Decision Date |
|------|-------|-------|---------------|
| *None* | | | |

### Retired

Experts that have been retired due to consistent underperformance:

*None yet*

---

## Retirement Process

When spawned expert degrades:

1. **Alert at 60 days** of win rate <30%
2. **Probation at 90 days** of win rate <20%
3. **Retirement review** after 30 days of probation
4. **If retired:**
   - Move to `~/.claude/webinar-arena/retired/`
   - Remove from active competitor pool
   - Preserve for historical reference
   - Note lessons learned

### Retirement doesn't mean deletion

Retired experts are preserved because:
- They document what worked before
- Market conditions may change
- Their frameworks may inspire new approaches

---

## Commands

### `/arena-spawn`

Manage spawned experts.

**Options:**
- `--list` - Show all spawned experts with status
- `--status [name]` - Detailed status for specific expert
- `--retire [name]` - Initiate retirement process
- `--restore [name]` - Restore retired expert to active

---

## Integration

### Inputs
- Winning synthesis combinations
- Wild Card breakthrough extractions
- Competition results
- User approval

### Outputs
- New skill and critic files
- Registry entries
- Performance tracking
- Retirement recommendations

---

*Part of Webinar Arena v2.0*
*PRD-15: Enhanced Expert Spawner*
