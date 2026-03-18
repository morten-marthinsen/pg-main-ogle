# MCP Tool Registry — Template
**Quality Engine v4** | Component: Template
**Purpose:** Document which skills/agents require which external tools, enabling lazy tool discovery and token savings
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]

---

## HOW TO USE

1. At skill/agent startup, check this registry for the current skill
2. If the skill has tool requirements, call `ToolSearch("[tool-group]")` to load tool schemas
3. If the skill has NO tool requirements, skip ToolSearch entirely — saves 10-40K tokens

**Most skills need NO external tools.** Only load tool schemas when this registry says to.

---

## Tool Strategy

Define the role of each tool group in your system so operators know when to use what.

### [TOOL_GROUP_1] — [ROLE]

**Skills that use it:** [LIST]

**Tools:**
- `[tool_name_1]` — [PURPOSE]
- `[tool_name_2]` — [PURPOSE]

**When to use:** [GUIDANCE — describe the situations where this tool group adds value]

**Critical:** [YES/NO] — [If YES, the skill cannot function without this tool]
**Est. cost per use:** [RANGE — e.g., "$0.001-0.01 per call"]
**Setup verification:** [HOW TO VERIFY — e.g., "Run `tool_name --test` to confirm API key is configured"]

**Load via:** `ToolSearch("[SEARCH_TERM]")` at startup

---

### [TOOL_GROUP_2] — [ROLE]

**Skills that use it:** [LIST]

**Tools:**
- `[tool_name_1]` — [PURPOSE]
- `[tool_name_2]` — [PURPOSE]

**When to use:** [GUIDANCE]

**Critical:** [YES/NO]
**Est. cost per use:** [RANGE]
**Setup verification:** [HOW TO VERIFY]

**Load via:** `ToolSearch("[SEARCH_TERM]")` at startup

---

<!-- Repeat for each tool group -->

---

## Tool-to-Skill Mapping

### Overview Table

| Skill/Phase | Tool Groups Required | Critical? | Load Command |
|------------|---------------------|-----------|-------------|
| [SKILL_1] | [GROUP_1], [GROUP_2] | Yes | `ToolSearch("[term]")` |
| [SKILL_2] | [GROUP_1] | No | `ToolSearch("[term]")` |
| [SKILL_3] | None | N/A | Skip ToolSearch |

---

## Skills That Need NO External Tools

The majority of skills use NO external tools. These skills should NOT trigger any ToolSearch calls.

| Engine/Group | Skills WITH Tools | Skills WITHOUT |
|-------------|------------------|----------------|
| [ENGINE_1] | [LIST] | [LIST] |
| [ENGINE_2] | None | [ALL] |
| [ENGINE_3] | [LIST] | [LIST] |

---

## Token Savings

Tool schemas are typically 500-2,000 tokens each. With [N]+ tools configured, that is ~[N]K tokens of schema loaded into every session.

For the [N]+ skills that do not use external tools, skipping ToolSearch eliminates this overhead entirely.

| Session Type | Current Overhead | With Lazy Discovery | Savings |
|-------------|-----------------|---------------------|---------|
| Non-tool skill (majority) | ~[N]K (all schemas loaded) | 0 (no ToolSearch) | ~[N]K |
| Tool-using skill | ~[N]K (all schemas) | ~[N]K (only needed schemas) | ~[N]K |

---

## Setup Checklist

Before first use, verify all tool connections:

- [ ] [TOOL_GROUP_1]: API key configured, test call succeeds
- [ ] [TOOL_GROUP_2]: API key configured, test call succeeds
- [ ] [TOOL_GROUP_3]: OAuth configured, permissions verified
- [ ] All optional tools: graceful fallback if unavailable

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. |
