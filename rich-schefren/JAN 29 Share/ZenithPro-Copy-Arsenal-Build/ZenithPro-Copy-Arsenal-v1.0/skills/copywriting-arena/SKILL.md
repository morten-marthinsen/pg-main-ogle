---
name: copywriting-arena
description: Competitive copywriting system where multiple copywriters compete on the same assignment. Each round includes drafting, critic feedback, revision, and judgment. Skills evolve through competition, and winning syntheses spawn new copywriters.
version: 1.0.0
author: Rich Schefren
trigger: "arena", "copywriting competition", "compete", "copywriter battle"
---

# Copywriting Arena

## ⚠️ PRIME DIRECTIVE: EVOLUTION HAPPENS EVERY MATCH

**The entire point of this system is that copywriters IMPROVE after every competition.**

This is NON-NEGOTIABLE. After EVERY match/round:
1. Identify WHY the winner won (specific frameworks, techniques, structures)
2. UPDATE the losing copywriters' skills with those learnings BEFORE the next match
3. Save learnings to ledger IMMEDIATELY

**This applies even when briefs are different.** Learning transfers across brief types:
- "Dual Journey works" → Add to all skills
- "Nuclear guarantee wins skeptics" → Add to all skills
- "Croc Brain activation creates urgency" → Add to all skills

**If you run multiple matches without updating skills between them, you have FAILED the core purpose of this system.**

---

## What This Is

The Copywriting Arena is an evolutionary competition system for copywriting excellence.

**How it works:**
1. You provide an assignment (copy project brief)
2. All copywriters in the stable draft their version (in parallel)
3. Each copywriter's draft is evaluated by their critic
4. Each copywriter revises based on critic feedback
5. The Marketplace Judge evaluates all entries and declares a winner
6. You can override the winner if you disagree
7. Learning briefs are produced for all competitors
8. **⚠️ SKILLS ARE UPDATED with learnings from this match**
9. The process repeats for the number of rounds you specified
10. After the Arena, cumulative learning is verified and finalized

**The goal:**
- Get excellent copy for YOUR actual project
- **Accelerate skill improvement through competition** ← THIS IS THE MAIN GOAL
- Breed new methodologies through successful synthesis

---

## Quick Start

To launch the Arena, provide:

```
/arena [project-name] [rounds]

Example: /arena ai-execution-engine 3
```

Or simply say:
> "Run the copywriting arena on [project] for [N] rounds"

---

## The Stable (Current Copywriters)

The Arena automatically detects all copywriters with both a skill AND a critic:

| Copywriter | Skill | Critic | Status |
|------------|-------|--------|--------|
| Deutsch | `~/.claude/skills/deutsch/` | `~/.claude/agents/deutsch-critic/` | Active |
| Clayton | `~/.claude/skills/clayton/` | `~/.claude/agents/clayton-critic/` | Active |
| Evaldo | `~/.claude/skills/evaldo/` | `~/.claude/agents/evaldo-critic/` | Active |
| Carlton | `~/.claude/skills/carlton/` | `~/.claude/agents/carlton-critic/` | Active |
| Synthesis | `~/.claude/agents/arena-synthesist/` | `~/.claude/agents/synthesis-critic/` | Active |
| [Spawned] | Auto-detected | Auto-detected | When spawned |

**Adding new copywriters:** When you build a new copywriter (e.g., Bencivenga), create both the skill folder AND the critic agent. The Arena will automatically include them.

---

## Arena Flow

### Phase 0: Setup

**User Provides:**
1. **Assignment Brief**
   - Product/service description
   - Target market
   - Price point
   - Key constraints
   - Mandatory elements (if any)
   - Copy type (sales letter, VSL, email, landing page)

2. **Number of Rounds** (recommended: 3-5)

**Arena Creates:**
- Project folder in `~/Documents/Obsidian/Active-Brain/00 Projects/[project-name]-arena-[date]/`
- Round subfolders for each round
- Output tracking structure

### Phase 1: Drafting (Parallel)

All copywriters receive the same brief and draft simultaneously.

**Each copywriter:**
1. Uses their methodology's skill
2. Produces a complete draft
3. Saves to project folder

**Synthesis additionally:**
1. Analyzes the brief
2. Selects strategic combination
3. Documents combination rationale
4. Produces synthesis draft

**Output:** 5 draft files (or N+1 where N = number of individual copywriters)

### Phase 2: Critique (Parallel)

Each draft is evaluated by its corresponding critic.

| Draft | Critic |
|-------|--------|
| Deutsch draft | deutsch-critic |
| Clayton draft | clayton-critic |
| Evaldo draft | evaldo-critic |
| Carlton draft | carlton-critic |
| Synthesis draft | synthesis-critic |

**Output:** 5 critique files with grades, issues, and fixes

### Phase 3: Revision (Parallel)

Each copywriter revises based on their critic's feedback.

**Copywriter receives:**
- Original draft
- Critic's evaluation
- Critical fixes to apply

**Output:** 5 revised draft files

### Phase 4: Judgment (Sequential)

The Marketplace Judge evaluates all revised entries.

**Judge produces:**
- Winner declaration with explanation
- Full ranking with predicted conversion
- Overall learning brief
- Individual learning briefs for each competitor

**User Override Pause:**
After judgment, user is asked:
> "The Judge selected [Winner]. Do you agree, or would you like to override?"

If override:
- Capture user's selection and reasoning
- Log for future judge calibration

### Phase 4.5: MANDATORY Ledger Update ⚠️ CRITICAL

**IMMEDIATELY after judgment (before Phase 5), UPDATE THE LEDGER:**

1. **Open `~/.claude/arena/ledger.md`**
2. **Add match result to Arena Run History** (match number, brief, winner, all scores)
3. **Add key learnings from this specific match**
4. **Add any new patterns detected**
5. **Save immediately**

**WHY THIS IS CRITICAL:**
- Context can be lost mid-tournament
- If ledger isn't updated incrementally, all learning is lost
- This is a hard requirement, not optional

**DO NOT proceed to Phase 5 until ledger is updated.**

### Phase 5: Learning Integration (Parallel)

Each copywriter receives:
1. Their critic's feedback
2. Judge's overall learning
3. Their individual learning brief
4. What the winner did (if not them)

**This learning informs the next round.**

### Phase 6: Next Round (if rounds remain)

Return to Phase 1 with accumulated learning.

### Phase 7: Post-Arena Processing

After all rounds complete:

**Skill Evolver runs:**
- Collects all learning from all rounds
- Detects patterns
- Proposes/applies skill updates
- Updates win records

**If Synthesis won all rounds:**
- Copywriter Spawner is invoked
- User is asked to name the new methodology
- New copywriter is created and added to stable

---

## Output Structure

```
00 Projects/
└── [project-name]-arena-[date]/
    ├── brief.md                    # Original assignment
    ├── round-1/
    │   ├── drafts/
    │   │   ├── deutsch-draft.md
    │   │   ├── clayton-draft.md
    │   │   ├── evaldo-draft.md
    │   │   ├── carlton-draft.md
    │   │   └── synthesis-draft.md
    │   ├── critiques/
    │   │   ├── deutsch-critique.md
    │   │   ├── clayton-critique.md
    │   │   ├── evaldo-critique.md
    │   │   ├── carlton-critique.md
    │   │   └── synthesis-critique.md
    │   ├── revisions/
    │   │   ├── deutsch-revised.md
    │   │   ├── clayton-revised.md
    │   │   ├── evaldo-revised.md
    │   │   ├── carlton-revised.md
    │   │   └── synthesis-revised.md
    │   └── judgment.md             # Judge's full evaluation
    ├── round-2/
    │   └── [same structure]
    ├── round-N/
    │   └── [same structure]
    ├── final/
    │   ├── winner.md               # Best performing version
    │   ├── learning-summary.md     # All learning from all rounds
    │   └── evolution-log.md        # Skill updates triggered
    └── arena-summary.md            # Complete run summary
```

---

## Parallel Execution Model

The Arena maximizes parallelization:

```
ROUND TIMELINE
──────────────

Phase 1 (Drafting):     [D] [C] [E] [Ca] [S] ← All 5 in parallel
                            │
Phase 2 (Critique):     [D] [C] [E] [Ca] [S] ← All 5 in parallel
                            │
Phase 3 (Revision):     [D] [C] [E] [Ca] [S] ← All 5 in parallel
                            │
Phase 4 (Judgment):         [Judge]          ← Sequential (needs all inputs)
                            │
Phase 5 (Learning):     [D] [C] [E] [Ca] [S] ← All 5 in parallel
                            │
                        [NEXT ROUND]
```

**Total Agents Per Round:** 16 parallel agent calls
- 5 drafters
- 5 critics
- 5 revisers
- 1 judge

---

## Skill Evolution (How Skills Improve)

### Within Arena
- Each round provides learning that informs the next round
- Copywriters adapt based on what works

### After Arena
- Skill Evolver analyzes all learning
- Patterns detected across rounds
- Skill updates proposed/applied

### Across Arenas
- Win records track performance over time
- Patterns across multiple arenas trigger updates
- Skills get better with each competition

### Evolution Rules
- **Minor updates (auto):** Clarifications, examples, reinforcement
- **Major updates (approval required):** New frameworks, structural changes
- **Rollback available:** Last 3 versions maintained

---

## Synthesis Spawning (How New Copywriters Are Born)

**Trigger:** Synthesis wins ALL rounds of an Arena

**Process:**
1. Copywriter Spawner is invoked
2. User is asked to name the new methodology
3. New skill folder created
4. New critic agent created
5. Win record initialized
6. Ledger updated
7. New copywriter competes in future arenas

**Lineage Tracking:**
Each spawned copywriter knows its parents:
> "Schefren Method = 50% Evaldo + 30% Carlton + 20% Deutsch"

---

## Agents Used

| Agent | Role |
|-------|------|
| `marketplace-judge` | Evaluates entries, declares winner |
| `synthesis-critic` | Evaluates synthesis entries |
| `arena-synthesist` | Creates synthesis entries |
| `skill-evolver` | Integrates learning into skills |
| `copywriter-spawner` | Creates new copywriters from winning synthesis |
| `deutsch-critic` | Evaluates Deutsch entries |
| `clayton-critic` | Evaluates Clayton entries |
| `evaldo-critic` | Evaluates Evaldo entries |
| `carlton-critic` | Evaluates Carlton entries |
| `[spawned]-critic` | Evaluates spawned copywriter entries |

---

## User Interactions During Arena

### Mandatory
1. **Assignment Brief** (at start)
2. **Number of Rounds** (at start)
3. **Winner Override** (after each judgment) - optional response
4. **New Copywriter Name** (if synthesis wins all rounds)

### Optional
1. **Mid-round feedback** - You can provide additional direction
2. **Early termination** - Stop the arena if you've seen enough
3. **Copy selection** - Choose a specific version even if not "winner"

---

## Records and Memory

### ⚠️ CRITICAL: Incremental Save Protocol

**After EVERY match/round, you MUST immediately update:**
1. `~/.claude/arena/ledger.md` - Add match result + learnings
2. Win records (if applicable)

**Why this matters:**
- Claude context can be lost at any time
- If you batch updates until "the end," context loss = total loss
- Incremental saves protect against this failure mode

**Failure to save incrementally is a critical workflow error.**

### Win Records
Location: `~/.claude/arena/win-records/`
- Tracks each copywriter's performance
- Head-to-head records
- Learning accumulated
- Skill evolution history

### Master Ledger
Location: `~/.claude/arena/ledger.md`
- Active copywriter stable
- Spawned copywriters
- Arena run history
- Pattern detection queue
- Synthesis lineage tree
- **UPDATED AFTER EVERY MATCH (not just at the end)**

### Synthesis Registry
Location: `~/.claude/arena/synthesis-registry/`
- `successful/` - Combinations that became copywriters
- `attempted/` - All combinations tried (for learning)

---

## Example Arena Run

```
USER: Run the copywriting arena on AI Execution Engine for 3 rounds

ARENA: Starting Copywriting Arena
       Project: AI Execution Engine
       Rounds: 3
       Competitors: Deutsch, Clayton, Evaldo, Carlton, Synthesis

       [Creating project folder...]
       [Reading assignment brief...]

ROUND 1:
       [Drafting - 5 agents in parallel...]
       [Critiquing - 5 agents in parallel...]
       [Revising - 5 agents in parallel...]
       [Judging...]

       JUDGMENT: Clayton wins Round 1
       - Best stopping power (incongruous juxtaposition hook)
       - Strong proof cascade
       - Lost points on emotional depth

       Do you agree with this selection? [Override available]

USER: I think Deutsch's version was more compelling. Override to Deutsch.

ARENA: Override recorded. Deutsch declared Round 1 winner.
       Learning integrated for all competitors.

       [Round 2 begins with accumulated learning...]

[... continues through Round 3 ...]

POST-ARENA:
       Final Winner: Synthesis (won rounds 2 and 3)

       Synthesis won 2/3 rounds but not all.
       Not eligible for spawning (requires all rounds).

       [Skill Evolver running...]
       - Detected pattern: Clayton's hooks outperform Deutsch opening
       - Proposed update to Deutsch skill: Add hook-strengthening framework
       - Update type: MAJOR (requires approval)

       Approve this update? [Y/N]

       Arena complete. Files saved to:
       ~/Documents/Obsidian/Active-Brain/00 Projects/ai-execution-engine-arena-2025-12-20/
```

---

## References

- Ledger: `~/.claude/arena/ledger.md`
- Win Records: `~/.claude/arena/win-records/`
- Synthesis Registry: `~/.claude/arena/synthesis-registry/`
- Arena Output: `~/Documents/Obsidian/Active-Brain/00 Projects/[project]-arena-[date]/`

---

*Copywriting Arena v1.0.0*
*"Evolution through competition"*
