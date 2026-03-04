# pg-borisc-cc-playbook

A team-wide Claude Code operating system for Performance Golf. Master agent + 4 sub-agents that deploy, audit, coach, and maintain Claude Code across any PG project.

Based on Boris Cherny's "10 Tips for Claude Code" (Anthropic, January 31, 2026).

---

## Folder Structure

```
pg-borisc-cc-playbook/
├── BORIS-MASTER-AGENT.md              ← Start here. The brain.
├── README.md                          ← You are here
├── agents/
│   ├── boris-deploy.md                ← Sets up Claude Code on a project
│   ├── boris-auditor.md               ← Reviews CLAUDE.md quality
│   ├── boris-coach.md                 ← Teaches prompt patterns
│   └── boris-scorekeeper.md           ← Manages session memory
├── templates/
│   ├── CLAUDE-MD-TEMPLATE.md          ← Copy into any project as CLAUDE.md
│   └── slash-commands/                ← (Phase 3)
├── references/
│   ├── boris-cherny-methodology.md    ← (Next session)
│   ├── prompt-patterns.md             ← 8 copy-paste prompt templates
│   ├── environment-setup.md           ← (Phase 4)
│   └── data-analytics-patterns.md     ← (Phase 4)
├── deployment/
│   └── project-bootstrap.md           ← (Next session)
└── SESSION-LOG.md                     ← (Created per-project by Boris Scorekeeper)
```

---

## Quick Start

1. Read [BORIS-MASTER-AGENT.md](BORIS-MASTER-AGENT.md) — understand the system
2. Call **Boris Deploy** to set up Claude Code on your project
3. Call **Boris Coach** when you want to improve your prompting
4. Call **Boris Auditor** after 2 weeks to check your CLAUDE.md quality
5. Call **Boris Scorekeeper** at the end of every session to save state

---

## Version

| Field | Value |
|-------|-------|
| Version | 2.0 |
| Created | 2026-02-04 |
| Updated | 2026-02-06 |
| Owner | Christopher Ogle |
| Source | Boris Cherny, "10 Tips for Claude Code" (Anthropic, Jan 31 2026) |
| Architecture | Master agent + 4 sub-agents (modeled after TESS) |

### v2.0 Changes (2026-02-06)

- Added the **backstory pattern** as Pattern 8 — identity narratives, contracts, and decision heuristics for reusable sub-agents
- Upgraded all 4 sub-agents with backstory blocks (Identity & Contract sections replacing Purpose + What I Don't Do)
- Added Sub-Agent Design Principles section to BORIS-MASTER-AGENT.md documenting advisory vs. pipeline agent patterns
- Added optional Sub-Agents section to CLAUDE-MD-TEMPLATE.md
