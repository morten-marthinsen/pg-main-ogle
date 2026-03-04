# Copywriting Arena - Quick Reference

## Trigger Phrases
- "Run the copywriting arena"
- "Arena on [project]"
- "Copywriting competition"
- "Copywriter battle"
- "/arena [project] [rounds]"

---

## Components

| Component | Type | Location |
|-----------|------|----------|
| **copywriting-arena** | Skill (Orchestrator) | `~/.claude/skills/copywriting-arena/` |
| **marketplace-judge** | Agent | `~/.claude/agents/marketplace-judge/` |
| **synthesis-critic** | Agent | `~/.claude/agents/synthesis-critic/` |
| **arena-synthesist** | Agent | `~/.claude/agents/arena-synthesist/` |
| **skill-evolver** | Agent | `~/.claude/agents/skill-evolver/` |
| **copywriter-spawner** | Agent | `~/.claude/agents/copywriter-spawner/` |

---

## Current Stable

| Copywriter | Skill | Critic | Frameworks |
|------------|-------|--------|------------|
| Deutsch | deutsch | deutsch-critic | 102 |
| Clayton | clayton | clayton-critic | 514 |
| Evaldo | evaldo | evaldo-critic | 66 |
| Carlton | carlton | carlton-critic | 200+ |
| Synthesis | arena-synthesist | synthesis-critic | Combined |

---

## Round Flow

```
1. DRAFT (parallel) → 5 drafts
2. CRITIQUE (parallel) → 5 critiques
3. REVISE (parallel) → 5 revisions
4. JUDGE (sequential) → Winner + learning
5. USER OVERRIDE → Optional
6. INTEGRATE (parallel) → Learning absorbed
7. REPEAT → Next round or end
```

---

## Post-Arena

- **Skill Evolver:** Patterns detected, updates proposed
- **Spawner (if synthesis wins all):** New copywriter created
- **Records Updated:** Win records, ledger, synthesis registry

---

## Output Location

```
00 Projects/[project]-arena-[date]/
├── brief.md
├── round-N/
│   ├── drafts/
│   ├── critiques/
│   ├── revisions/
│   └── judgment.md
├── final/
│   ├── winner.md
│   ├── learning-summary.md
│   └── evolution-log.md
└── arena-summary.md
```

---

## Evolution Rules

| Update Type | Auto/Approval | Trigger |
|-------------|---------------|---------|
| Patch (clarification) | Auto | Any learning |
| Minor (new example) | Auto | Clear improvement |
| Major (new framework) | Approval | 3+ pattern occurrences |

---

## Spawning Rules

| Condition | Result |
|-----------|--------|
| Synthesis wins some rounds | No spawn |
| Synthesis wins ALL rounds | Spawn triggered |
| User names new copywriter | Skill + critic created |
| New copywriter competes | Added to future arenas |
