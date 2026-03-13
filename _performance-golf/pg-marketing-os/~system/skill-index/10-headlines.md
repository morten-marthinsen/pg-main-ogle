# Skill Index: 10-Headlines
**Source:** Extracted from CLAUDE-SKILL-INDEX.md. Load ONLY this file for skill 10.

---

## 10-Headlines

**Full protocol in ~system/ARENA-PROTOCOL.md for Arena execution.**

### Layer Execution Order (NON-NEGOTIABLE)

Layer 0 → Layer 1 → Layer 2 → Layer 3 → Layer 4

### Specimen Injection (MANDATORY)

Before ANY headline generation:
1. READ: `10-headlines/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. LOAD verbatim specimens for selected pattern type
3. HOLD in active context during generation

### Type-Indexed Specimen Usage

| Pattern Type | Specimens |
|--------------|-----------|
| curiosity | Type-1, Type-7, Type-9 |
| benefit | Type-8, Type-10, Type-13 |
| question | Type-6, Type-7, Type-12, Type-13 |
| warning | Type-5, Type-7 |
| story_hook | Type-3, Type-1, Type-10 |
| contrarian | Type-2, Type-11, Type-4 |

### Quality Gates

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 2 | 5 candidates ≥ 6.0 | Return to generation |
| Gate 3 | Top candidate ≥ 7.5 | Return to refinement |
| Gate 4 | Human selects headline | Cannot package |
