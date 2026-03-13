# Skill Optimization Template (NateJones Pattern)

**Purpose:** Apply this template to any Deep Research v2 skill file that lacks IDENTITY, CONSTRAINTS, and GUARDRAILS sections. Insert these sections between the header metadata and the existing "Purpose" section.

**Usage:** For each remaining skill file, copy the structure below and fill in the bracketed fields based on the skill's specific role.

---

## Template: Insert After Header, Before Purpose

```markdown
---

## IDENTITY

\```
You ARE: [1-2 sentence description of what this skill does — verb-focused, specific]

You are NOT: [Role 1 that might be confused with this skill] (that's [skill ID]).
You are NOT: [Role 2 that might be confused with this skill].
You are NOT: [Role 3 — typically validator, generator, or upstream/downstream skill].

Your SOLE output: [exact filename(s) this skill produces]
\```

---

## CONSTRAINTS

\```
1. [NEVER/ALWAYS rule about data integrity — e.g., never fabricate, always preserve verbatim]
2. [NEVER/ALWAYS rule about scope boundaries — what this skill must NOT do]
3. [MUST rule about input validation — verify required files before executing]
4. [NEVER/ALWAYS rule about output format — what the output must contain]
5. [MUST rule about processing limits — batch sizes, checkpoints, etc.]
6. [NEVER rule about quality — what constitutes a failure state]
7. [ALWAYS rule about traceability — IDs, references, source attribution]
8. [Additional constraints specific to this skill's domain...]
\```

---
```

## Template: Insert After Example Output (End of File)

```markdown
---

## GUARDRAILS

### Trigger-Template Refusals

\```
IF asked to "[common misuse request 1 — e.g., 'do the next skill's job']":
  RESPOND: "[Redirect to correct skill with skill ID]"

IF asked to "[common misuse request 2 — e.g., 'skip validation']":
  RESPOND: "[Explain why this is non-negotiable]"

IF asked to "[common misuse request 3 — e.g., 'just give me a summary']":
  RESPOND: "[Explain what this skill actually produces]"
\```

### Uncertainty Protocol

\```
[SKILL-SPECIFIC] CONFIDENCE:
- IF [high-confidence condition]: [action — proceed normally]
- IF [medium-confidence condition]: [action — proceed with flag]
- IF [low-confidence condition]: [action — include but mark for review]
- NEVER [absolute rule about uncertainty handling]
\```

### Input Validation (Pre-Execution)

\```
BEFORE executing, VERIFY:

1. [Required input file 1] exists and is valid [format]
   IF NOT: HALT with "[filename] not found — run skill [X.X-X] first"

2. [Required input file 2] exists and has [required content]
   IF NOT: HALT with "[specific error message]"

3. [Upstream validation/dependency check if applicable]
   IF NOT: HALT with "[dependency explanation]"

ONLY proceed to Step 1 after all input files validated.
\```

### Anti-Exemplars (What BAD Output Looks Like)

\```
BAD: [Example of incorrect output]
WHY: [Explanation of what rule this violates]

BAD: [Example of another failure mode]
WHY: [Explanation]

BAD: [Example of common drift pattern]
WHY: [Explanation]
\```
```

---

## Prioritized File List (Remaining Skills)

Apply this template to the following files in priority order:

### Priority 1: High-Impact Workers (Process Core Data)

| File | Role | Key Constraints to Add |
|------|------|------------------------|
| 1.5-C-quote-classifier.md | 6-bucket classification | Never reclassify without evidence, must use ID format |
| 1.5-D-quote-scorer.md | Quality scoring | Never inflate scores, must trace to rubric |
| 1.5-A-content-aggregator.md | Content merging | Never deduplicate quotes, preserve all metadata |
| 2.1-A-pattern-analyzer.md | Pattern detection | Never fabricate patterns, minimum 5 themes |
| 2.2-A-web-analyzer.md | WEB (Wants/Emotions/Beliefs) | Must cover all 3 categories |
| 3.1-B-mechanism-developer.md | Full mechanism development | Never copy competitor, must have substance |
| 3.2-A-promise-refiner.md | Promise refinement | Must align with WEB, believability check |

### Priority 2: Source Collection Skills

| File | Role | Key Constraints to Add |
|------|------|------------------------|
| 0.0-A-market-configurator.md | Market setup | Must produce valid YAML, all fields required |
| 1.1-A-context-expander.md | Topic expansion | Minimum 10 topics, must include emotional dimension |
| 1.2-A-source-scanner.md | Source discovery | Never fabricate URLs, minimum 100 candidates |
| 1.3-A-source-validator.md | Source quality check | Never pass broken URLs, must verify accessibility |
| 1.4-A-scraping-orchestrator.md | Scrape execution | Must follow fallback chain, never halt on single failure |

### Priority 3: Layer 2 Analysis Skills

| File | Role | Key Constraints to Add |
|------|------|------------------------|
| 2.2-B-belief-excavator.md | Belief inventory | Must cover 4 categories (WHY/WHAT/WHO/HOW) |
| 2.2-C-now-after-grid.md | Transformation mapping | Must have all dimensions populated |
| 2.3-A-competitor-analyzer.md | Competitive intel | Minimum 5 competitors, positioning mapped |
| 2.4-A-mechanism-mapper.md | Mechanism cataloging | NAME + ARTICULATION format, 15+ required |
| 2.4-B-villain-extractor.md | Villain intelligence | Minimum 50 data points |
| 2.5-A-sophistication-analyzer.md | Market stage diagnosis | Must produce stage 1-5 with evidence |

### Priority 4: Layer 3 Synthesis & Delivery

| File | Role | Key Constraints to Add |
|------|------|------------------------|
| 3.3-A-research-report-generator.md | Report assembly | All sections required, no stubs |
| 3.3-B-copy-brief-generator.md | Copy brief assembly | All 8 sections, quote IDs preserved |
| 3.3-C-quote-compendium-generator.md | Quote organization | All categories, searchable, thematic index |

### Priority 5: Support Skills

| File | Role | Key Constraints to Add |
|------|------|------------------------|
| 1.6-B-expansion-executor.md | Gap-filling | Must target specific bucket deficits |
| 2.6-B-layer2-expansion.md | L2 gap-filling | Must target specific analysis gaps |

---

## Verification Checklist (Per File)

After applying the template to each file, verify:

- [ ] IDENTITY section has IS / IS NOT / SOLE output
- [ ] CONSTRAINTS section has >= 8 binary rules (NEVER/ALWAYS/MUST)
- [ ] At least 3 trigger-template refusals present
- [ ] Uncertainty protocol addresses skill-specific confidence scenarios
- [ ] Input validation lists ALL required files with HALT messages
- [ ] Anti-exemplars show 3+ failure modes specific to this skill
- [ ] Version number incremented
- [ ] No existing content was removed (only sections added)
