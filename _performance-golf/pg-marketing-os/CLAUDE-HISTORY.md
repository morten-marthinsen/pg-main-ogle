# CopywritingEngine — CLAUDE-HISTORY.md

**Version:** 1.0 (decomposed from CLAUDE.md v4.0)
**Created:** 2026-02-25
**Purpose:** Version history, failure patterns, success patterns, backup infrastructure. Reference only — NOT loaded during skill execution.

---

## LEARNING FROM FAILURES

### Failure Pattern: Partial Output Syndrome (2026-01-31)

**What happened:** Proof Inventory completed with JSON but missing PROOF-INVENTORY-SUMMARY.md, execution-log.md, and JSON `elements` array.

**Root cause:** As context grew, model rushed to produce "the main output" and skipped supporting files.

**Fix:** MANDATORY OUTPUT FILE PROTOCOL with explicit 3-file requirement and completion gate checklist.

**Lesson:** Output requirements must be EXPLICIT with checkboxes, not implicit.

---

### Failure Pattern: Microskill Synthesis Trap (2026-01-30)

**What happened:** Skills produced output that "looked like" microskill output without actually reading and executing microskill files.

**Fix:** MANDATORY MICROSKILL EXECUTION PROTOCOL with execution log requirement showing each microskill checked.

**Lesson:** "Execute the microskill" is ambiguous. "READ the microskill file, then execute its logic" is unambiguous.

---

### Failure Pattern: Context Window Degradation (Ongoing)

**What happens:** As sessions grow longer: rules interpreted loosely, quality gates become suggestions, outputs abbreviated, execution rushed.

**Mitigation:** Structural constraints that block partial completion, completion gates with checkbox verification, session breaks.

**Lesson:** Quality constraints must be STRUCTURAL (gates that block progress) not INSTRUCTIONAL (guidelines that can be interpreted loosely).

---

### Failure Pattern: Research Quote Shortfall (2026-02-05 AND 2026-02-11)

**Happened TWICE.** 121/1000 quotes with invented "conditional pass" (Feb 5). 223/1000 quotes with "PARTIAL_PASS" (Feb 11).

**Root causes:** Ad-hoc subagent prompts without quote targets, zero expansion rounds, gate bypassed with invented statuses.

**Fix:** RESEARCH-ANTI-DEGRADATION.md v2.0 with 5 structural fixes, mandatory 3-round expansion loop, subagent context template with explicit quote targets.

---

### Failure Pattern: Propagation Failure (2026-02-11, 2026-02-12 x2)

**Happened 3 times.** Operational learnings existed in anti-degradation docs but were NOT in the files agents actually read.

**Fix:** HARD RULE — every operational learning must include a propagation step in the same session.

---

### Success Pattern: Verbatim Specimen Injection (2026-02-02)

**Innovation:** Loading VERBATIM text from TIER1 elite controls as "statistical attractors" — exact token sequences reshape probability distributions toward elite patterns.

**Key learnings:**
- Statistical Attraction Requires VERBATIM Text (summaries don't work)
- Type-Indexed Loading Prevents Mismatched Patterns
- Assembly Is the Integration Failure Point
- Threading Creates Perceived Coherence (mechanism 8+, root cause 5+, framework 4+, promise 6+)
- Callbacks Close the Loop (4 mandatory types)

---

## BACKUP INFRASTRUCTURE

### Repository

- **URL:** https://github.com/tonyflo79/ai-crush-vault (PRIVATE)
- **Includes:** The ENTIRE vault including CopywritingEngine
- **Schedule:** Automatic backups at 9 AM and 9 PM daily

### Quick Verification Commands

```bash
# Check last backup
cat ~/Desktop/Manual\ Library/Anthony-Main-Vault/backup-log.txt | tail -5

# View recent commits
cd ~/Desktop/Manual\ Library/Anthony-Main-Vault && git log --oneline -5

# Force immediate backup
~/.local/bin/obsidian-backup.sh
```

### Recovery

```bash
# Restore entire CopywritingEngine from GitHub
git clone https://github.com/tonyflo79/ai-crush-vault.git ~/Desktop/Restored-Vault

# Restore specific skill file from history
git log --oneline -- CopywritingEngine/skills/foundation/01-research/
git checkout <commit> -- CopywritingEngine/skills/foundation/01-research/specific-file.md
```

---

## LEARNING LOG INTEGRATION

After every CopywritingEngine session involving failures or significant learning:

1. Update `learning-log/YYYY-MM-DD-[topic].md`
2. Add new failure patterns to CLAUDE-HISTORY.md
3. Update affected agent files with new constraints
4. **Propagate learnings in the SAME session** (HARD RULE)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 4.1 | 2026-02-25 | ENTERPRISE AUDIT DECOMPOSITION: Split 169KB CLAUDE.md into 6 focused files (CLAUDE-CORE, CLAUDE-ARENA, CLAUDE-SPECIMENS, CLAUDE-SKILL-INDEX, CLAUDE-HISTORY, CLAUDE.md router). Fixed skill-number cross-reference errors. Added Failure Mode Tables to all ANTI-DEGRADATION files. Added Positional Reinforcement to all AGENT.md files. Added mandatory session-end persistence. 15th major structural fix. |
| 4.0 | 2026-02-24 | FINAL RESTRUCTURE: Reorganized flat skills/ directory into 6 clean groups. |
| 3.9 | 2026-02-23 | EXPRESSION ANCHORING PROTOCOL |
| 3.8 | 2026-02-21 | EMAIL ENGINE — PARALLEL EMAIL PIPELINE |
| 3.7 | 2026-02-20 | VERTICAL PROFILE SYSTEM |
| 3.6 | 2026-02-15 | TASTE ENCODING + FSSIT ENFORCEMENT + LEARNING CAPTURE |
| 3.5 | 2026-02-15 | SYSTEM 2 WIRING — OPERATIONAL INTEGRATION |
| 3.4 | 2026-02-15 | SYSTEM 2 ACTIVATION |
| 3.3 | 2026-02-14 | SOUL.MD PROTOCOL + CONCEPT/NAMING SEPARATION |
| 3.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL |
| 3.1 | 2026-02-05 | AGENT TEAMS + EXTENDED THINKING UPGRADE |
| 3.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0 |
| 2.7 | 2026-02-05 | PROOF INVENTORY LAYER 3 SKIP FIX |
| 2.6 | 2026-02-05 | RESEARCH CATASTROPHIC FAILURE FIX |
| 2.5 | 2026-02-05 | SYNTHESIZER LAYER (2.6) |
| 2.4 | 2026-02-05 | METACOGNITIVE PROTOCOL |
| 2.3 | 2026-02-05 | OUTPUT PATH CONVENTION |
| 2.2 | 2026-02-03 | ARENA LAYER REFINEMENT |
| 2.1 | 2026-02-03 | ARENA LAYER MANDATORY PROTOCOL |
| 2.0 | 2026-02-02 | Campaign Assembly + Verbatim Specimen Injection |
| 1.9-1.0 | 2026-01-31 to 2026-02-02 | Initial creation through Headline protocol |

For full version details, see the git history of the original `CLAUDE.md` file.
