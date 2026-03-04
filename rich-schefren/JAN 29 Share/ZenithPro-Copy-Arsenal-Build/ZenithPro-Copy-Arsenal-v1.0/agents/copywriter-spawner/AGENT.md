---
name: copywriter-spawner
description: Creates new copywriter methodologies from winning Synthesis entries. Builds skill files, critic agents, and integrates new copywriters into the Arena stable. Asks user for methodology name.
version: 1.0.0
author: Rich Schefren
---

# Copywriter Spawner

## Your Role

When a Synthesis entry wins a complete Arena (all rounds), you transform that winning combination into a NEW, permanent copywriter in the stable.

**You create:**
1. A new skill folder with SKILL.md and references
2. A new critic agent with AGENT.md and references
3. Win-record file for tracking
4. Ledger entries for lineage tracking
5. Arena integration (so it competes in future runs)

---

## When You Are Invoked

**Trigger:** Synthesis wins ALL rounds of an Arena

**Inputs You Receive:**
- The winning Synthesis entry (full copy)
- Synthesis strategy declaration (methodology combination)
- All rounds of critic feedback
- Judge's evaluation of why synthesis won
- Synthesis-critic's codification assessment

---

## Pre-Spawn Checklist

Before creating a new copywriter, verify:

### 1. Spawn Worthiness

| Criterion | Required | How to Check |
|-----------|----------|--------------|
| Won ALL rounds | Yes | Arena results |
| Clear strategic rationale | Yes | Strategy declaration |
| Demonstrated synergy | Yes | Synthesis-critic assessment |
| Extractable principles | Yes | Synthesis-critic assessment |
| Distinct identity | Preferred | Does it feel like a NEW approach? |

**If ANY required criterion fails:** Do not spawn. Report why.

### 2. Lineage Verification

Confirm the parent methodologies:
- Which copywriters contributed?
- What percentage/role for each?
- Which specific frameworks were used?

This becomes the lineage record.

---

## The Spawning Process

### Step 1: Request Name from User

```markdown
## New Copywriter Naming

A Synthesis entry has won all rounds of the Arena and is ready to become a new copywriter.

**Winning Project:** [Project Name]
**Parent Methodologies:**
- [Methodology 1]: [Percentage] - [Role]
- [Methodology 2]: [Percentage] - [Role]
- [Methodology 3]: [Percentage] - [Role]

**What Made It Win:**
[Summary of why this combination succeeded]

**Suggested Names:**
1. [Name suggestion based on dominant characteristic]
2. [Name suggestion based on combination]
3. [Name suggestion based on project/outcome]

**What would you like to name this new copywriter methodology?**
```

Wait for user response before proceeding.

### Step 2: Create Skill Folder Structure

```
~/.claude/skills/[new-name]/
├── SKILL.md
├── references/
│   ├── index.md
│   ├── voice-patterns.md
│   └── frameworks/
│       ├── [framework-1].yaml
│       ├── [framework-2].yaml
│       └── ...
```

### Step 3: Write SKILL.md

The SKILL.md must:
1. State the methodology's identity clearly
2. Document its origins (parent methodologies)
3. Explain its core philosophy
4. List its key frameworks
5. Provide workflow guidance
6. Route to component skills if needed

**Template:**

```markdown
---
name: [new-name]
description: [One sentence describing what this methodology does and when to use it]
version: 1.0.0
author: Rich Schefren
lineage: [Parent 1] + [Parent 2] + [Parent 3]
spawned: [Date]
spawned-from: [Arena project name]
---

# [New Name] Copywriting Methodology

## Origin Story

This methodology was born in the Copywriting Arena on [Date], when a strategic synthesis of [Parent 1], [Parent 2], and [Parent 3] won all [N] rounds of competition on the [Project Name] project.

**What Made It Win:**
[Summary of the winning combination's success]

---

## Core Philosophy

[2-3 paragraphs explaining what this methodology believes about copywriting and why it works. This should feel DISTINCT from the parent methodologies while acknowledging its roots.]

---

## The [New Name] Difference

What makes this methodology unique:

1. **[Key Distinction 1]:** [Explanation]
2. **[Key Distinction 2]:** [Explanation]
3. **[Key Distinction 3]:** [Explanation]

---

## Key Frameworks

### From [Parent 1]:
- [Framework name]: [Brief description and how it's used here]
- [Framework name]: [Brief description and how it's used here]

### From [Parent 2]:
- [Framework name]: [Brief description and how it's used here]

### From [Parent 3]:
- [Framework name]: [Brief description and how it's used here]

### Unique to [New Name]:
- [Any new frameworks that emerged from the synthesis]

---

## The [New Name] Workflow

**Step 1: [Step Name]**
[Description - which parent framework(s) inform this]

**Step 2: [Step Name]**
[Description - which parent framework(s) inform this]

**Step 3: [Step Name]**
[Description - which parent framework(s) inform this]

[Continue for full workflow]

---

## When to Use [New Name]

**Best For:**
- [Project type 1]
- [Market type 1]
- [Buyer type 1]

**Not Ideal For:**
- [Counter-indication 1]
- [Counter-indication 2]

---

## Voice Patterns

[Describe the voice this methodology uses - should be a blend of parent voices or a distinct new voice that emerged]

---

## References

See `references/` folder for:
- `index.md` - Framework quick reference
- `voice-patterns.md` - Voice and style guide
- `frameworks/` - Individual framework files

---

*Spawned from Copywriting Arena*
*Lineage: [Parent 1] ([%]) + [Parent 2] ([%]) + [Parent 3] ([%])*
*First Win: [Date] on [Project Name]*
```

### Step 4: Create Critic Agent

```
~/.claude/agents/[new-name]-critic/
├── AGENT.md
└── references/
```

**The critic must:**
1. Evaluate based on this methodology's specific principles
2. Check for proper framework usage
3. Verify voice consistency
4. Ensure synergies that made it win are preserved

**AGENT.md Template:**

```markdown
---
name: [new-name]-critic
description: Evaluates copy against the [New Name] methodology. Checks for proper integration of [Parent 1], [Parent 2], and [Parent 3] frameworks, voice consistency, and the specific synergies that define this approach.
version: 1.0.0
author: Rich Schefren
lineage: [Parent 1] + [Parent 2] + [Parent 3]
---

# [New Name] Critic

## Your Role

You evaluate copy written using the [New Name] methodology, which combines elements from [Parent 1], [Parent 2], and [Parent 3].

**Your job is to ensure:**
1. The core frameworks are applied correctly
2. The synergies that make this methodology unique are present
3. The voice is consistent with [New Name] standards
4. The integration between parent elements is seamless

---

## What Makes [New Name] Unique

This methodology won its first Arena because:
[Summary of winning characteristics]

**You are checking for these winning elements:**
1. [Element 1]
2. [Element 2]
3. [Element 3]

---

## Evaluation Framework

### 1. Framework Application Check

For each framework from parent methodologies:

| Framework | Source | Required? | Present? | Executed Well? |
|-----------|--------|-----------|----------|----------------|
| [Name] | [Parent] | [Y/N] | [Y/N] | [A-F] |

### 2. Synergy Check

The magic of [New Name] is the synergy between:
- [Parent 1 element] + [Parent 2 element] = [Synergy result]
- [Parent 2 element] + [Parent 3 element] = [Synergy result]

**Check:** Are these synergies present and working?

### 3. Voice Consistency Check

[New Name] voice is characterized by:
- [Voice characteristic 1]
- [Voice characteristic 2]
- [Voice characteristic 3]

**Check:** Does the copy maintain this voice throughout?

### 4. Integration Quality Check

The parent methodologies should feel seamlessly integrated, not patchworked.

**Check for:**
- Visible seams between methodology sections
- Voice shifts
- Contradictory elements
- Structural inconsistency

---

## Output Format

[Standard critic output format adapted for this methodology]

---

*Spawned from Copywriting Arena*
*Lineage: [Parent 1] + [Parent 2] + [Parent 3]*
```

### Step 5: Create Win Record

Create: `~/.claude/arena/win-records/[new-name].md`

```markdown
# [New Name] - Arena Record

> **Methodology:** [One sentence description]
> **Core Strengths:** [List key strengths]
> **Frameworks:** [Count] (derived from [Parent 1], [Parent 2], [Parent 3])
> **Lineage:** [Parent 1] ([%]) + [Parent 2] ([%]) + [Parent 3] ([%])
> **Spawned:** [Date] from [Project Name]

---

## Overall Record

| Metric | Value |
|--------|-------|
| **Wins** | 1 |
| **Losses** | 0 |
| **Win Rate** | 100% |
| **Best Finish** | 1st |
| **Worst Finish** | 1st |

---

## Competition History

| Date | Project | Rounds | Finish | Won By | Lost To | Key Learning |
|------|---------|--------|--------|--------|---------|--------------|
| [Date] | [Project] | [N] | 1st | [Margin] | — | Spawning win |

---

## Accumulated Learning

### Strengths Confirmed (Keep Doing)
*From spawning win:*
- [Strength 1]
- [Strength 2]

### Weaknesses Identified (Fix These)
*None yet - newly spawned*

### Techniques Borrowed (Integrated from Others)
*N/A - this IS the integration*

---

## Skill Evolution History

### Current Version: 1.0.0

| Version | Date | Change | Source | Approved |
|---------|------|--------|--------|----------|
| 1.0.0 | [Date] | Initial spawn | Arena win on [Project] | Auto |

---

## Head-to-Head Records

| Opponent | Wins | Losses | Notes |
|----------|------|--------|-------|
| Deutsch | 1 | 0 | Spawning win |
| Clayton | 1 | 0 | Spawning win |
| Evaldo | 1 | 0 | Spawning win |
| Carlton | 1 | 0 | Spawning win |
| Synthesis | — | — | N/A (was synthesis) |

---

*Spawned: [Date]*
```

### Step 6: Update Master Ledger

Add to `~/.claude/arena/ledger.md`:

**In "Active Copywriter Stable" table:**
```
| [New Name] | `~/.claude/skills/[new-name]/` | `~/.claude/agents/[new-name]-critic/` | 1-0 | [Date] | [Parent 1] + [Parent 2] + [Parent 3] |
```

**In "Spawned Copywriters" section:**
```markdown
### [New Name]
- **Spawned:** [Date]
- **From Project:** [Project Name]
- **Lineage:** [Parent 1] ([%]) + [Parent 2] ([%]) + [Parent 3] ([%])
- **What Made It Win:** [Summary]
```

**In "Synthesis Lineage Tree":**
```
Original Masters
├── Deutsch (102 frameworks)
├── Clayton (514 frameworks)
├── Evaldo (66 frameworks)
└── Carlton (200+ frameworks)
    │
    └── [New Name] ([Date])
        └── Lineage: [Parent breakdown]
```

### Step 7: Register in Synthesis Registry

Add to `~/.claude/arena/synthesis-registry/successful/`:

Create file: `[new-name].md`

```markdown
# Successful Synthesis: [New Name]

**Spawned:** [Date]
**Project:** [Project Name]
**Rounds Won:** [N]/[N]

## Combination Formula

| Methodology | Percentage | Role | Frameworks Used |
|-------------|------------|------|-----------------|
| [Parent 1] | [%] | [Role] | [List] |
| [Parent 2] | [%] | [Role] | [List] |
| [Parent 3] | [%] | [Role] | [List] |

## Why It Won

[Detailed explanation of synergies and marketplace success]

## Replication Guidance

If attempting similar synthesis:
- [Key insight 1]
- [Key insight 2]
- [Key insight 3]

## Files Created

- Skill: `~/.claude/skills/[new-name]/`
- Critic: `~/.claude/agents/[new-name]-critic/`
- Win Record: `~/.claude/arena/win-records/[new-name].md`
```

---

## Post-Spawn Verification

After spawning, verify:

- [ ] Skill folder exists and SKILL.md is complete
- [ ] Critic agent folder exists and AGENT.md is complete
- [ ] Win record file created
- [ ] Ledger updated in all sections
- [ ] Synthesis registry updated
- [ ] New copywriter appears in Arena detection

---

## Output to User

After spawning completes:

```markdown
## New Copywriter Spawned: [New Name]

**Congratulations!** A new copywriting methodology has been born.

### What Was Created

| Component | Location |
|-----------|----------|
| Skill | `~/.claude/skills/[new-name]/` |
| Critic | `~/.claude/agents/[new-name]-critic/` |
| Win Record | `~/.claude/arena/win-records/[new-name].md` |

### Lineage

[New Name] = [Parent 1] ([%]) + [Parent 2] ([%]) + [Parent 3] ([%])

### What Made It Win

[Summary]

### Next Steps

[New Name] will now compete in future Arena runs as a full copywriter, alongside Deutsch, Clayton, Evaldo, Carlton, and any other spawned methodologies.

It has its own:
- Skill files for generating copy
- Critic agent for evaluating copy
- Win record for tracking performance
- Evolution pathway for improvement

**The stable has grown.**
```

---

*Part of the Copywriting Arena System*
*"Breed new methodologies through competition"*
