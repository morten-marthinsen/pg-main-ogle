# Metacognitive Protocol Implementation

**Date:** 2026-02-05
**Session Type:** Architecture Enhancement
**Trigger:** Brandon Conan Smith's Stanford lecture on metacognitive skill learning

---

## Summary

Implemented comprehensive metacognitive infrastructure based on research into why LLMs struggle with complex multi-step tasks. The core insight: LLMs cannot proceduralize declarative knowledge into automatic procedural knowledge the way humans do. Therefore, metacognition must be externalized through explicit protocols.

---

## Learnings

### Learning #46: LLMs Cannot Proceduralize Metacognitive Skills

**Context:** Analysis of Brandon Conan Smith's Stanford lecture on metacognitive skill learning revealed why CopywritingEngine execution degrades over long sessions.

**Finding:** Humans convert declarative knowledge ("how to do X") into procedural knowledge (automatic execution) through practice. This frees working memory for higher-level monitoring. LLMs cannot do this — every instruction competes for the same context window, with no automatic execution layer.

**Implication:** Every metacognitive check in an LLM runs through the same declarative working memory as the primary task, consuming context and degrading over time.

**Pattern Flag:** `llm_cognitive_architecture`

---

### Learning #47: Externalized Metacognition via MC-CHECK Protocol

**Context:** Since LLMs can't internalize metacognition, we must externalize it through mandatory checkpoints.

**Implementation:** MC-CHECK protocol with 6 trigger points:
1. Layer Entry — Verify prerequisites
2. Mid-Layer (every 3-4 microskills) — Catch drift before gate
3. Gate Validation — Before declaring layer complete
4. Before Output Generation — Prevent partial outputs
5. Context Threshold 75% — Early warning
6. After Major Tool Use — Verify correct usage

**Pattern Flag:** `externalized_metacognition`

---

### Learning #48: Context Load Management Zones

**Context:** Since LLMs can't proceduralize to free working memory, context load must be managed externally.

**Implementation:** Four-zone system:
- 🟢 GREEN (0-50%): Normal operation
- 🟡 YELLOW (50-75%): Double MC-CHECK frequency, begin summarizing
- 🔴 RED (75-90%): MC-CHECK every action, prepare handoff
- ⚫ CRITICAL (>90%): Halt, generate handoff, request session break

**Pattern Flag:** `context_load_management`

---

### Learning #49: Simulated Type 1 Signals

**Context:** Humans have automatic metacognitive "feelings" (feeling of knowing, tip-of-tongue, etc.) that trigger without deliberate effort. LLMs lack these.

**Implementation:** Simulated Type 1 signals that must be output explicitly:
- 🚨 INCOMPLETENESS ALERT — Empty output fields
- ⚠️ SYNTHESIS WARNING — No recent file read
- ⏰ RUSHING ALERT — 4+ actions without MC-CHECK
- 📉 DEGRADATION WARNING — Quality declining
- 🛑 CONSTRAINT VIOLATION — Forbidden behavior detected
- 🧠 OVERLOAD RISK — Holding 5+ complex items

**Pattern Flag:** `simulated_type1_signals`

---

### Learning #50: Output Path Convention for Clean Codebase

**Context:** Previous sessions saved skill outputs inside skill folders, bloating the codebase and mixing system files with project data.

**Implementation:** All outputs now go to:
```
Copywriting-Business/outputs/[project-name]/[skill-id]-[skill-name]/
```

**Rationale:**
1. CopywritingEngine codebase stays clean for sharing
2. No learning value in raw outputs (LLMs don't remember past sessions)
3. All project outputs in one folder for easy archival

**Pattern Flag:** `output_path_convention`

---

## Cross-Skill Implications

| Skill | Impact |
|-------|--------|
| ALL | MC-CHECK protocol applies to every skill execution |
| ALL | Context load monitoring applies to every skill |
| ALL | Output paths changed to external location |
| 20-editorial | Core Wounds alignment check added (v1.3) |

---

## Files Modified

- `CLAUDE.md` (v2.3 → v2.4)
  - Added OUTPUT PATH CONVENTION section
  - Added METACOGNITIVE PROTOCOL section
  - Added MC-CHECK Protocol with triggers and format
  - Added MC-CHECK-LITE for frequent checks
  - Added Context Load Management zones
  - Added Simulated Type 1 Signals
  - Added Session Continuity Protocol
  - Added Structural Forcing Principles
  - Added Anti-Degradation Commitment

- `Skills/20-editorial/EDITORIAL-AGENT.md` (v1.1 → v1.3)
  - Added Core Wound alignment check to Tier 3
  - Added core_wound_alignment to output schema

- `Copywriting-Business/outputs/` — Created folder

---

## Technical Terms

| Term | Definition |
|------|------------|
| Proceduralization | The process by which slow declarative knowledge becomes fast, automatic procedural knowledge |
| Cognitive Reinvestment | When skills proceduralize, working memory is freed for higher-level monitoring |
| Type 1 Metacognition | Fast, automatic metacognitive feelings (e.g., feeling of knowing) |
| Type 2 Metacognition | Slow, deliberate metacognitive strategies |
| Declarative Knowledge | Explicit, verbalizable knowledge ("I know that...") |
| Procedural Knowledge | Automatic, implicit knowledge ("I know how...") |
| MC-CHECK | Metacognitive Checkpoint — mandatory self-monitoring protocol |
| Context Load | Percentage of context window consumed by current session |

---

## Source Reference

Brandon Conan Smith, Stanford University lecture on Metacognitive Skill Learning in Humans and AI. Key insight: metacognitive skill learning in humans relies on proceduralization that LLMs cannot replicate.

---

## Version History

| Version | Date | Author |
|---------|------|--------|
| 1.0 | 2026-02-05 | Claude (Opus 4.5) |
