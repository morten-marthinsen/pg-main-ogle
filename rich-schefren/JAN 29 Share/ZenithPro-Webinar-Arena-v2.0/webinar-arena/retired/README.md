# Retired Experts Archive

**Location:** `~/.claude/webinar-arena/retired/`

## Purpose

Archive for spawned experts that have been retired due to consistent underperformance. These are preserved for historical reference and potential restoration if conditions change.

---

## Retirement Criteria

An expert is retired when:
- Win rate <20% for 90+ consecutive days
- User explicitly requests retirement
- Methodology becomes obsolete (market shift)

---

## Retired Expert Structure

When an expert is retired:

1. Skill removed from `~/.claude/skills/`
2. Critic removed from `~/.claude/agents/`
3. All files moved to `~/.claude/webinar-arena/retired/webinar-[name]/`
4. Retirement documentation added

### Retirement Record

```markdown
# Retired Expert: [Name]

**Active Period:** [Start Date] - [End Date]
**Total Competitions:** [N]
**Peak Win Rate:** [X]%
**Final Win Rate:** [X]%

## Reason for Retirement
[Why this expert was retired]

## Lessons Learned
[What we learned from this expert's rise and fall]

## Conditions for Restoration
[Under what circumstances this expert might be valuable again]

---

*Retired: [Date]*
```

---

## Retired Registry

*No retired experts yet*

---

## Restoration Process

To restore a retired expert:

1. Review original methodology
2. Assess whether market conditions favor restoration
3. Optionally update before restoration
4. Run `/arena-spawn --restore [name]`
5. Monitor closely for 30 days

---

*Part of Webinar Arena v2.0*
*PRD-15: Enhanced Expert Spawner*
