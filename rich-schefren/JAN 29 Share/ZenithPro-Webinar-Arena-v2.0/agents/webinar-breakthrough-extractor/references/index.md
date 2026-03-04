# Breakthrough Extraction Reference Index

## Extraction Types

| Type | When | Approval |
|------|------|----------|
| Full Spawn | Fundamentally different approach | Required |
| Principle Addition | Useful principle for existing skills | Required |
| Tactical Addition | Specific tactic, smaller scope | Auto-apply |
| Archive Only | Not generalizable | None |

## Codifiability Scoring

| Score | Meaning | Action |
|-------|---------|--------|
| 9-10 | Highly codifiable | Full Spawn likely |
| 7-8 | Good codifiability | Full Spawn or Principle |
| 5-6 | Moderate | Principle or Tactical |
| 3-4 | Limited | Tactical or Archive |
| 1-2 | Not codifiable | Archive |

## Codifiability Questions

1. Can this be replicated consistently?
2. Can this be taught to other skills?
3. Does this represent a new paradigm or just a tactic?

## Victory Analysis Checklist

- [ ] What did Wild Card do differently?
- [ ] Why did it work better?
- [ ] What didn't translate well?
- [ ] What does Judge assessment say?
- [ ] Is this replicable?
- [ ] Is this teachable?
- [ ] Paradigm or tactic?

## Full Spawn Deliverables

```
~/.claude/skills/webinar-[name]/
├── SKILL.md
└── references/
    ├── index.md
    ├── origin.md
    └── frameworks/

~/.claude/agents/webinar-[name]-critic/
├── AGENT.md
└── references/
    └── evaluation-criteria.md
```

## Trigger Conditions

1. Wild Card wins (automatic)
2. Wild Card places 2nd/3rd with praise
3. User requests via `/arena-extract`
