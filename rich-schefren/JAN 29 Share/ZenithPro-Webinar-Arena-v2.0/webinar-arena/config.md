# Webinar Arena Configuration

## Competition Settings

| Setting | Value | Description |
|---------|-------|-------------|
| default_rounds | 3 | Number of rounds per competition |
| parallel_drafting | true | All experts draft simultaneously |
| parallel_critique | true | All critics evaluate simultaneously |
| parallel_revision | true | All experts revise simultaneously |
| auto_save_ledger | true | Save after every phase |

---

## Update Thresholds

| Update Type | Threshold | Action |
|-------------|-----------|--------|
| Minor | 1 occurrence | Auto-apply |
| Major | 3 occurrences | Request approval |
| Auto-override | 6 occurrences | Auto-apply (with notification) |

---

## Spawn Conditions

| Condition | Required |
|-----------|----------|
| Synthesis wins all rounds | Yes |
| Synthesis-critic codification grade | B or higher |
| User approval for name | Yes |

---

## Active Competitors

| Expert | Status | Skill Path | Critic Path |
|--------|--------|------------|-------------|
| Fladlien | Active | ~/.claude/skills/webinar-fladlien/ | ~/.claude/agents/webinar-fladlien-critic/ |
| Cage | Active | ~/.claude/skills/webinar-cage/ | ~/.claude/agents/webinar-cage-critic/ |
| Brunson | Active | ~/.claude/skills/webinar-brunson/ | ~/.claude/agents/webinar-brunson-critic/ |
| Kern | Active | ~/.claude/skills/webinar-kern/ | ~/.claude/agents/webinar-kern-critic/ |
| Joon | Active | ~/.claude/skills/webinar-joon/ | ~/.claude/agents/webinar-joon-critic/ |
| Kennedy | Active | ~/.claude/skills/webinar-kennedy/ | ~/.claude/agents/webinar-kennedy-critic/ |

---

## Judge Weights

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Stopping Power | 20% | Would they stop and pay attention? |
| Believability | 15% | Do they believe the promise? |
| Desire Activation | 20% | Does it awaken want? |
| Objection Handling | 15% | Are real concerns addressed? |
| Offer Clarity | 10% | Do they know what they get? |
| Risk Reversal | 10% | Is saying yes easier than no? |
| Creative Strategy | 10% | Right angle for this market? |

---

## File Locations

| Purpose | Path |
|---------|------|
| Ledger | ~/.claude/webinar-arena/ledger.md |
| Config | ~/.claude/webinar-arena/config.md |
| Win Records | ~/.claude/webinar-arena/win-records/ |
| Successful Syntheses | ~/.claude/webinar-arena/synthesis-registry/successful/ |
| Attempted Syntheses | ~/.claude/webinar-arena/synthesis-registry/attempted/ |
| Project Folders | ~/.claude/webinar-arena/projects/ |

---

*Webinar Arena Config v1.0*
