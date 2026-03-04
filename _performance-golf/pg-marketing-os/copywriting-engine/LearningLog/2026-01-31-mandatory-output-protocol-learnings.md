# Learning Log: Mandatory Output Protocol & Anti-Degradation

**Date:** 2026-01-31
**Type:** Critical System Fix
**Scope:** All CopywritingEngine skill agent files
**Triggered By:** Proof Inventory skill failure (Harmoni Pendant project)

---

## INCIDENT SUMMARY

The Proof Inventory skill for the Harmoni Pendant project was marked "complete" with:
- ✅ proof-inventory-output.json created
- ❌ PROOF-INVENTORY-SUMMARY.md missing
- ❌ execution-log.md missing
- ❌ JSON `elements` array missing (required by 4.7-final-output-assembly.md schema)

**Impact:** User could not review proof inventory in human-readable format. Downstream skills potentially received incomplete handoffs. User experienced this as one of many repeated skill failures.

---

## ROOT CAUSE ANALYSIS

### Primary Root Cause: Implicit Output Requirements

The agent file listed output files in a "Project Output Location" section but did not MANDATE them with explicit gates. The model treated the JSON as "the main output" and considered supporting files optional.

**Evidence:**
- PROOF-INVENTORY-AGENT.md v2.1 mentioned all three files in documentation
- No explicit "MUST create all three files" constraint existed
- No completion gate checklist verified all files existed

### Secondary Root Cause: Schema Requirements Buried in Microskills

The `elements` array requirement was defined in `4.7-final-output-assembly.md` but not repeated in the agent file. The model produced JSON without this section because it wasn't prominently mandated.

**Evidence:**
- 4.7 microskill clearly shows `REQUIRED_SECTIONS = ['summary', 'by_category', 'gaps', 'rankings', 'handoffs', 'elements']`
- Agent file output schema didn't emphasize `elements` as mandatory
- Model generated JSON with 5/6 required sections

### Tertiary Root Cause: Context Window Degradation

User observation: "As tasks and context windows get large, processes get more complex and elaborate. The model starts to rush through execution and ignores some of the rules or interprets some of the rules or instructions more loosely."

**Pattern identified:** Degradation is progressive, not sudden. Early outputs tend to be complete; later outputs become abbreviated.

---

## CORE LEARNINGS

### 35. Output Requirements Must Be Explicit and Gated

**Learning:** Listing output files in documentation is insufficient. Output requirements must be:
1. Explicitly stated as MANDATORY
2. Gated with a completion checklist
3. Verified before claiming success

**Evidence:**
- Agent file mentioned PROOF-INVENTORY-SUMMARY.md as expected output
- Model did not create it because there was no gate requiring it
- Adding explicit "MUST create" constraint and completion checklist fixed the issue

**Action:** Added MANDATORY OUTPUT FILE PROTOCOL to all agent files with:
- Explicit 3-file requirement table
- Schema validation requirements for each file
- Completion gate with 15-25 checkboxes per skill
- ANTI-PARTIAL-OUTPUT ENFORCEMENT section

---

### 36. Schema Requirements Must Be Surfaced in Agent Files

**Learning:** Requirements defined in microskills but not repeated in agent files get overlooked. Agent files are the "source of truth" the model consults most frequently.

**Evidence:**
- `elements` array clearly required in 4.7-final-output-assembly.md
- Agent file didn't emphasize this requirement
- Model produced valid-looking JSON without the required section

**Action:** Added explicit schema validation section to agent files repeating the critical requirements from microskills:
```
THE ELEMENTS ARRAY IS MANDATORY:
- Must contain ALL proof elements with FULL details
- Each element must include: id, category, sub_type, raw_text, scores
- Elements must be sorted by stage_adjusted_score descending
- Partial or summary elements = VALIDATION FAILURE
```

---

### 37. Degradation Is Progressive, Not Binary

**Learning:** Execution quality doesn't fail suddenly. It degrades progressively as:
- Context window fills
- Tasks become more complex
- Session length increases
- Cognitive load accumulates

**Evidence:**
- Early Harmoni Pendant skills produced complete outputs
- Later skills (like Proof Inventory) had missing components
- User reported this pattern across multiple skill failures

**Implication:** Anti-degradation measures must be STRUCTURAL (gates that block progress) not INSTRUCTIONAL (guidelines that can be loosely interpreted).

**Action:** Created CopywritingEngine CLAUDE.md with:
- Anti-Degradation Protocol section
- Session Break Protocol when degradation detected
- Explicit acknowledgment requirement for LLMs entering sessions

---

### 38. Standardization Prevents Cross-Skill Failures

**Learning:** When one skill fails in a particular way, ALL similar skills likely have the same vulnerability. Fixing one skill without fixing others just moves the failure.

**Evidence:**
- Proof Inventory missing output files
- User reported failures "across multiple skills"
- Pattern inspection revealed all agent files lacked explicit output gates

**Action:** Standardized the MANDATORY OUTPUT FILE PROTOCOL across all agent files:
- 01-research/MASTER-AGENT.md → v5.2
- 02-proof-inventory/PROOF-INVENTORY-AGENT.md → v2.2
- 03-root-cause/ROOT-CAUSE-AGENT.md → v3.1
- 07-offer/OFFER-AGENT.md → v1.1

---

### 39. Completion Gates Must Use Checkbox Format

**Learning:** Narrative descriptions of requirements are interpreted loosely. Checkbox formats force verification of each item.

**Wrong (can be rushed through):**
> "Before output, verify all required sections are present and handoffs are populated."

**Right (requires item-by-item verification):**
```
[ ] proof-inventory-output.json EXISTS
[ ] proof-inventory-output.json contains 'elements' array
[ ] proof-inventory-output.json contains 'summary' section
...
```

**Action:** All completion gates converted to explicit checkbox format with 15-25 items per skill.

---

### 40. CLAUDE.md Files for Mega-Projects

**Learning:** A personal ~/.claude/CLAUDE.md is insufficient for mega-projects like CopywritingEngine. Each major project system needs its own CLAUDE.md that captures project-specific:
- Failure patterns
- Anti-patterns to avoid
- Mandatory protocols
- Learning history

**Source:** Boris Cherny observation about "investing in CLAUDE.md"

**Action:** Created `/CopywritingEngine/CLAUDE.md` as project-level institutional memory.

---

## PATTERN FLAGS FOR FUTURE REFERENCE

### Implicit Requirement Pattern
**Symptom:** Output mentioned in documentation but not created
**Cause:** Requirement stated but not gated
**Prevention:** All requirements need explicit MUST + completion gate checkbox

### Schema Drift Pattern
**Symptom:** Output validates partially but missing required sections
**Cause:** Requirements defined in microskills but not surfaced in agent
**Prevention:** Critical schema requirements must be repeated in agent files

### Progressive Degradation Pattern
**Symptom:** Early outputs complete, later outputs incomplete
**Cause:** Cognitive load accumulation over long sessions
**Prevention:** Structural gates that block progress + session break protocol

### Single-Point Fix Pattern
**Symptom:** Fixing one skill while others have same vulnerability
**Cause:** Treating failure as skill-specific rather than systemic
**Prevention:** When fixing one skill, audit and fix all similar skills

---

## SYSTEM CHANGES IMPLEMENTED

| Priority | Change | Files Updated |
|----------|--------|---------------|
| CRITICAL | MANDATORY OUTPUT FILE PROTOCOL | All agent files (00, 01, 02, 06) |
| CRITICAL | Completion gate checklists | All agent files |
| CRITICAL | CopywritingEngine CLAUDE.md | New file created |
| HIGH | Schema validation sections | All agent files |
| HIGH | ANTI-PARTIAL-OUTPUT ENFORCEMENT | 02-proof-inventory |
| MEDIUM | Version bumps | 00 (v5.2), 01 (v2.2), 02 (v3.1), 06 (v1.1) |

---

## UPDATED TECHNICAL TERMS

| Term | Definition |
|------|------------|
| **Completion Gate** | Checkbox-based verification that must pass before claiming skill completion |
| **Progressive Degradation** | Gradual decline in execution quality as context/complexity increases |
| **Implicit Requirement** | Requirement mentioned but not enforced with a gate |
| **Schema Surfacing** | Repeating critical microskill requirements in agent files |
| **Project CLAUDE.md** | Project-specific institutional memory file |

---

## PREVENTION CHECKLIST FOR NEW SKILLS

When creating or modifying any CopywritingEngine skill:

- [ ] All output files listed in MANDATORY OUTPUT FILE PROTOCOL table
- [ ] Schema validation requirements explicit for primary output
- [ ] Completion gate with checkbox for EVERY required output/section
- [ ] ANTI-PARTIAL-OUTPUT section with forbidden behaviors
- [ ] Version history updated with changes
- [ ] CopywritingEngine CLAUDE.md updated if new failure pattern discovered

---

## CONNECTION TO PREVIOUS LEARNINGS

This incident connects to previous learnings:

- **Learning #8 (Quality > Speed):** Degradation happens when model optimizes for speed
- **Learning #26 (Completeness Imperative):** Final deliverables must be 100% complete
- **Learning #27 (Continuation Markers):** Abbreviation is output failure
- **Learning #30 (Efficiency Trap in Output):** Model abbreviates even final deliverables

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-31 | Initial learning log from Proof Inventory failure analysis and system fix |
