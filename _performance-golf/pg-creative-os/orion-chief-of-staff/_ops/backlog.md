# Orion — Ideas & Future Work Backlog

> Drop ideas here during any session. Orion surfaces them during weekly reviews.
> Tagged by agent/domain for easy filtering.

---

## Format

```
### [IDEA-YYYY-MM-DD-NNN] — Short title
- **Agent/Domain**: [Orion | Tess | Veda | Neco | Creative OS | Infrastructure]
- **Source**: [Session where this came up]
- **Priority**: [P0 Critical | P1 High | P2 Medium | P3 Low | Unscored]
- **Status**: [Open | In Progress | Done | Deferred | Rejected]
- **Description**: [What and why]
```

---

## Open Ideas

### [IDEA-2026-02-08-001] — Airtable MCP Integration for Task Management
- **Agent/Domain**: Creative OS / Infrastructure
- **Source**: Neco S011
- **Priority**: P2 Medium
- **Status**: Open
- **Description**: Connect all Creative OS agents to Christopher's Airtable to-do list via an Airtable MCP server. Would allow any agent (Orion, Tess, Veda, Neco) to read/write tasks, set reminders, and query the to-do list. Wiring goes in root Creative OS CLAUDE.md so all agents inherit it. Estimated scope: 1 session to configure MCP server + define base/table structure + add routing rules. Community Airtable MCP servers exist. Could enable "Orion, what's on my plate this week?" queries against the real task list.

### [IDEA-2026-02-09-002] — Doc Sweep: Stale hook_swap References in Veda Docs
- **Agent/Domain**: Veda
- **Source**: Tess S110 (TC-004), moved to Orion backlog in Tess S118
- **Priority**: P3 Low
- **Status**: Open
- **Description**: 5 Veda doc files still reference stale "hook_swap" terminology that was replaced by "hook_stack" (hs). This creates confusion for any agent reading Veda docs. Files affected need to be identified via grep for "hook_swap" in Veda's .md files. Originally tracked as Tess Challenger TC-004 but belongs in Veda's scope. Execute in a Veda session. Deferred since Tess S023 plan.
