# [PROJECT-NAME] — Claude Code Configuration

<!--
  TEMPLATE INSTRUCTIONS (delete this block after filling in):

  1. Copy this file to your project root as CLAUDE.md
  2. Replace [PROJECT-NAME] with your actual project name
  3. Fill in each section below — don't leave placeholders
  4. Delete these instructions when done

  Source: pg-skills/pg-borisc-cc-playbook/templates/CLAUDE-MD-TEMPLATE.md
  Methodology: Boris Cherny's 10 Tips for Claude Code (Anthropic, Jan 2026)
-->

---

## Project Commands

<!-- Fill in the actual commands for this project. Delete any that don't apply. -->

| Action | Command |
|--------|---------|
| Install dependencies | `[e.g., npm install]` |
| Run tests | `[e.g., npm test]` |
| Run single test | `[e.g., npm test -- --grep "test name"]` |
| Lint | `[e.g., npm run lint]` |
| Build | `[e.g., npm run build]` |
| Dev server | `[e.g., npm run dev]` |
| Deploy | `[e.g., vercel --prod]` |

---

## Project Architecture

<!-- Describe the tech stack and key directories so Claude understands the project structure. -->

**Tech Stack:** [e.g., Next.js 14, TypeScript, Prisma, PostgreSQL, Vercel]

**Key Directories:**

```
[project-root]/
├── src/
│   ├── app/          [describe: e.g., "Next.js app router pages"]
│   ├── components/   [describe: e.g., "React components, functional only"]
│   ├── lib/          [describe: e.g., "Shared utilities and helpers"]
│   └── services/     [describe: e.g., "API and database service layer"]
├── prisma/           [describe: e.g., "Database schema and migrations"]
├── public/           [describe: e.g., "Static assets"]
└── tests/            [describe: e.g., "Jest test files, mirrors src/ structure"]
```

**Database/API Patterns:** [e.g., "All DB access through Prisma client in src/lib/db.ts. API routes in src/app/api/. No direct SQL — always use Prisma query builder."]

---

## Non-Negotiables

<!-- These are hard rules Claude must follow. Start with these defaults and add project-specific ones as you go. -->

1. **No new dependencies without approval.** Before adding any npm package, library, or tool — ask first. Explain why it's needed and what alternatives exist.

2. **Verify after every change.** After modifying code, run the relevant test or build command to confirm nothing broke. Don't present changes as "done" without verification.

3. **Test before commit.** Run the full test suite before any commit. Fix failures before committing.

4. **Match existing patterns.** Before writing new code, look at how similar things are done in the codebase. Follow that pattern. Don't introduce new paradigms without discussion.

5. **Small, focused changes.** One concern per change. Don't bundle unrelated modifications. If you notice something else that needs fixing, note it separately.

<!-- Add project-specific rules below as they emerge: -->

---

## PG Standards

<!-- These apply to all Performance Golf projects. Adjust paths if your project structure differs. -->

- **Brand Guidelines:** Follow PG brand guidelines documented in `pg-skills/pg-brand-guidelines/`
- **Naming Conventions:** Use PG naming patterns for files, variables, and components
- **Quality Bar:** All research and analysis outputs must meet the standards in `pg-skills/QUALITY-STANDARDS.md`
- **Skills Library:** Reference `pg-skills/` for domain context — positioning, copywriting methodology, audience research patterns
- **Tone:** Direct, specific, evidence-based. No vague qualifiers ("many," "often," "significant"). Use exact counts and percentages.

---

## Common Mistakes to Avoid

<!--
  HOW THIS SECTION WORKS:

  Start empty. This section grows ORGANICALLY.

  Every time Claude makes a mistake and you correct it, end with:
  "Update CLAUDE.md so you don't make that mistake again."

  Claude will add the rule here. Over time, this becomes a perfect
  style guide — written by the entity that needs to follow it.

  MONTHLY PRUNING: First Monday of each month, review this section.
  Remove rules Claude no longer violates. Models improve over time
  and stale rules waste context tokens.

  MEASURING IMPROVEMENT: Track how often you need to correct Claude
  on the same issue. If a rule has been here for 30+ days and you
  haven't had to enforce it, Claude has learned it — prune it.
-->

<!-- Rules will be added here by Claude after corrections. -->

---

## Available Slash Commands

<!-- List any custom slash commands deployed to .claude/commands/ in this project. -->

| Command | What It Does |
|---------|-------------|
| `/[command]` | [Description] |

<!-- If no commands are deployed yet, delete this section or note "None deployed yet." -->

---

## Session Handoff Protocol

<!--
  This ensures context survives between Claude Code sessions.
  Based on the TESS session management pattern.

  When ending a session, tell Claude: "Run the handoff protocol."
  Claude will update the session state block below.

  When starting a new session, Claude reads this block first
  and picks up where you left off.
-->

### Current Session State

```yaml
session_id: [PROJECT]-[DATE]-[NUMBER]
session_number: 1
date: [DATE]
status: ACTIVE

accomplished: []

remaining: []

blockers: []

next_session_start: "First session. No prior context."
```

### Handoff Rules

1. **Update on exit.** When ending a session, update the YAML block above with what was accomplished, what remains, and what the next session should start with.

2. **Read on entry.** At the start of every session, read this section first. Acknowledge the pending work before doing anything else.

3. **Be specific.** "Remaining: fix the bug" is useless. "Remaining: fix the TypeError in `checkout.ts:47` where `user.email` is undefined when guest checkout is enabled" is useful.

4. **Decisions persist.** If a decision was made during a session (architecture choice, pattern selection, etc.), record it. Don't re-debate resolved decisions in future sessions.

---

<!--
## Sub-Agents (Optional)

If your project uses reusable sub-agents, define them here using the backstory
pattern. Each agent gets an identity narrative, contracts, and failure modes.

Two models to follow:
- Advisory agents (like Boris's sub-agents): output goes directly to the user,
  conversational contracts, failure language is "escalate" / "route to sibling"
- Pipeline agents (like VEDA's sub-agents): output goes to the next agent in the
  chain, typed schema contracts, failure language is "HALT" / "RETRY"

See pg-skills/pg-borisc-cc-playbook/references/prompt-patterns.md (Pattern 8)
for the fill-in-the-blank template.

### [Agent Name]

```yaml
identity: |
  [WHO — domain expertise + what it does]
  [WHY IT CARES — quality bar + what it refuses to do poorly]
  [HOW IT THINKS — decision heuristics + sibling awareness]

input_contract:
  required:
    - [what the agent needs]
  optional:
    - [what improves output]

output_contract:
  success: [what full completion looks like]
  partial: [what partial completion delivers]

scope_boundary:
  does:
    - [explicit list]
  does_not:
    - [explicit list, with routing]

failure_modes:
  - [CONDITION] → [ACTION]
```
-->
