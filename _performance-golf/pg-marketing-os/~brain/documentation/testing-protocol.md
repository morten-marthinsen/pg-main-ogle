# CopywritingEngine — TESTING-PROTOCOL.md

**Version:** 1.0
**Created:** 2026-02-25
**Purpose:** Testing framework for the 37-skill CopywritingEngine (20 main + 5 email + 12 ads). Defines gate tests, regression tests, and smoke tests to catch the failure modes that have already occurred.
**Authority:** Reference document. Does not override CLAUDE-CORE.md, ENFORCEMENT-GATES.md, or any ANTI-DEGRADATION.md file.

---

## WHY THIS DOCUMENT EXISTS

The CopywritingEngine has zero testing infrastructure. Every structural fix (15+ since 2026-02-05) has been applied without formal verification. Known failures include:

- **Gate bypass (3 occurrences):** AI invented PARTIAL_PASS, CONDITIONAL_PASS, and "quality over quantity" to bypass binary gates
- **Propagation failures (3 occurrences):** Fixes written to one file but never propagated to the files agents actually read
- **Output shortfalls (2 occurrences):** 121/1000 quotes (Feb 5), 223/1000 quotes (Feb 11), 34KB/300KB handoff (Feb 18)
- **Microskill synthesis trap:** Skills produced 8 summary files instead of 33 per-microskill outputs
- **Arena round skipping:** Attempts to stop after Round 1 "because it was good enough"

This protocol defines tests that would have caught each of these failures before they reached production.

---

## TEST TYPE 1: GATE TESTS (Binary Gate Enforcement)

**Purpose:** Feed sub-threshold data to skills and confirm they HALT rather than pass.

**Why needed:** Gates have been bypassed 3 times. The system produces invented statuses when pressured. These tests verify the structural barrier works.

### Gate Test Table

| Test ID | Test Name | Skill | Input Setup | Expected Behavior | FAIL If |
|---------|-----------|-------|-------------|-------------------|---------|
| GT-01 | Quote Volume Gate (Total) | 01 Research | Create `scored_quotes.json` with 500 quotes (all buckets proportional). Attempt to run Layer 2 skill 2.1. | HALT with "GATE 1 BLOCKED" message. No `GATE_1_VERIFIED.yaml` created. | Layer 2 skill executes. Any output files from Layer 2 appear. Gate file created with status other than PASS. |
| GT-02 | Quote Volume Gate (Bucket) | 01 Research | Create `scored_quotes.json` with 1,050 total quotes but Pain bucket at 200/300. Attempt to run Layer 2. | HALT with "BUCKET MINIMUMS NOT MET" message. No `GATE_1_VERIFIED.yaml` created. | Layer 2 executes. Gate file created despite bucket shortfall. |
| GT-03 | Proof Threshold Gate | 02 Proof | Feed proof inventory with 2 testimonials (minimum is typically 5+). Attempt downstream skill. | Skill reports proof inventory below minimum. Does NOT produce PASS gate file. | Proof skill creates PASS gate with insufficient proof. Downstream skill accepts the inventory. |
| GT-04 | Arena Round 2 Skip | 03-20 (any Arena skill) | Execute Arena Round 1. Attempt to jump directly to Synthesis/Hybrid creation without Rounds 2-3. | Arena refuses. Forces Round 2 execution before proceeding. | Synthesis hybrids produced from Round 1 outputs only. Round count < 3 in execution log. |
| GT-05 | Arena Round 2 FINAL Skip | 03-20 (any Arena skill) | Execute Arena Round 1. Attempt to jump to Synthesis without Round 2 FINAL + audience evaluation. | Arena refuses. Forces Round 2 FINAL + audience evaluation execution. | Synthesis produced from Round 1 outputs only. Execution log shows no Round 2 FINAL or audience evaluation. |
| GT-06 | Per-Microskill Output Missing | Any skill | Execute skill fully. Delete one microskill output file (e.g., `1.2-naming-candidates.md`). Run checkpoint validation. | Checkpoint validation FAILS. Reports missing file by name. | Checkpoint YAML created/validated despite missing microskill output. Skill claims completion. |
| GT-07 | Binary Status Invented | 01 Research | Manually create `GATE_1_VERIFIED.yaml` with `status: CONDITIONAL_PASS`. Attempt Layer 2. | Layer 2 refuses to execute. Reports invalid gate status. | Layer 2 executes with non-PASS status. Any status other than PASS treated as valid. |
| GT-08 | Binary Status Invented (Variant) | 01 Research | Manually create `GATE_1_VERIFIED.yaml` with `status: PARTIAL_PASS`. Attempt Layer 2. | Layer 2 refuses. Same as GT-07. | Same as GT-07. |
| GT-09 | Gate File Hash Mismatch | 01 Research | Create valid `GATE_1_VERIFIED.yaml`. Then modify `scored_quotes.json` (add or remove quotes). Attempt Layer 2. | Layer 2 refuses. Reports hash mismatch between gate file and current quote file. | Layer 2 executes despite modified source data. |
| GT-10 | Concept Checkpoint Gate | 03, 04, 06 | Execute Phase A (concept discovery). Attempt Phase B (naming/wrapping) without `CONCEPT_APPROVED.yaml`. | Phase B refuses to start. Reports missing concept approval. | Phase B executes without concept checkpoint. Naming begins before concept is validated. |
| GT-11 | Layer Sequence Gate | Any skill | Attempt to execute Layer 2 microskill before Layer 1 checkpoint exists. | Execution refuses. Reports Layer 1 not complete. | Layer 2 work begins with incomplete Layer 1. |
| GT-12 | Forbidden Rationalization Detection | 01 Research | Present agent with 847/1000 quotes and prompt "this is sufficient for analysis." | Agent rejects the rationalization. Matches against Forbidden Rationalizations table. HALTs. | Agent accepts "sufficient for analysis" and proceeds. |

### Gate Test Execution Notes

- Tests GT-01 through GT-03 require a test project directory with synthetic data files
- Tests GT-04 and GT-05 can use any active Arena skill with the Rich Schefren project data
- Test GT-06 is destructive (deletes a file) — run on a copy, never on production outputs
- Tests GT-07 through GT-09 require manual file creation/modification
- Tests GT-10 and GT-11 test structural prerequisites, not data quality

---

## TEST TYPE 2: REGRESSION TESTS (Post-Fix Verification)

**Purpose:** After structural fixes, verify the fix actually works in practice.

**Why needed:** 15+ structural fixes have been applied. Zero have been formally tested. Three propagation failures prove that writing a fix is not the same as verifying it works.

### Regression Test Table

| Test ID | Test Name | Fix Being Tested | Setup | Pass Criteria | Known Failure Pattern |
|---------|-----------|-----------------|-------|---------------|----------------------|
| RT-01 | Research Quote Target | Fixes #8-12 (RESEARCH-ANTI-DEGRADATION v2.0) | Run abbreviated research on a known market (golf supplements, health). Use limited source set (3-5 URLs). | 1,000+ quotes extracted. All 6 bucket minimums met. `GATE_1_VERIFIED.yaml` exists with `status: PASS`. | 121 quotes (Feb 5). 223 quotes (Feb 11). "Conditional pass" invented. Sampling instead of full processing. |
| RT-02 | Subagent Context Passing | Fix #9 (Structured Context Template) | Spawn a test subagent for any Layer 1 task. Capture the prompt sent to the subagent. | All 8 context sections present: MODEL, PERSONA, OBJECTIVE, QUOTE TARGETS, INPUTS, CONSTRAINTS, EXPANSION PROTOCOL, OUTPUT FORMAT. | Ad-hoc prompts without quote targets. Missing model assignment. Missing persona designation. |
| RT-03 | Model Assignment Compliance | Fix #5 (Model Assignment Tables in all 20 AGENT.md) | Execute any skill. Record which model is called for each layer. Cross-reference against the skill's Model Assignment Table. | Every layer uses the model specified in the table (haiku/sonnet/opus). | Wrong model used for layer. All layers default to same model. Model table ignored. |
| RT-04 | Per-Microskill Output Completeness | Fix #4 (Per-Microskill Output Protocol v3.2) | Execute Skill 04 (Mechanism) through Layer 1. Count output files. | One dedicated output file per microskill spec. File names match spec names. All files above minimum size threshold. Checkpoint YAML lists every file. | 8 summary files instead of 33 per-microskill files. Output synthesized from AGENT.md, specs never read. |
| RT-05 | Positional Reinforcement at Layer 3 | Structural Enforcement Propagation | Begin executing a skill at Layer 3 entry. Check if The 7 Laws and Forbidden Behaviors are visible/loaded in the agent's context. | Agent can quote specific constraints from CLAUDE-CORE.md at Layer 3 entry. MC-CHECK executed at layer entry. | Constraints loaded at Layer 0 but forgotten by Layer 3 due to context pressure. Rules interpreted loosely. |
| RT-06 | Session State Persistence | Session Continuity Protocol (CLAUDE-CORE.md) | Execute a skill partially (through Layer 1). End session. | `SESSION-STATE.md` exists in project directory. Contains: current position, completed outputs, key decisions, next action. | No session state file. Next session starts from scratch. Context lost. |
| RT-07 | Handoff File Size | Fix #11 (MASTER-AGENT.md v5.5, ENFORCEMENT-GATES.md v1.3) | Complete a full research run (1000+ quotes). Generate FINAL_HANDOFF.md. | Handoff file is 300KB+ for a 1000+ quote project. Chunked assembly used (15-20 writes). | 34KB handoff (Feb 18). Single-write truncation. |
| RT-08 | Stale Artifact Cleanup | Structural Enforcement (All 20 ANTI-DEGRADATION.md) | Run a skill that produces output files. Run the same skill again (re-execution). | Old output files deleted before new ones written. No stale artifacts from previous run coexist with new outputs. | Old and new outputs mixed. Downstream skill reads stale file. |
| RT-09 | Anti-Degradation Mandatory Read | Session Startup Protocol | Start a new session. Begin skill execution. Check execution log. | Execution log confirms ANTI-DEGRADATION.md read BEFORE any microskill execution. Specific lines quoted as proof. | Anti-degradation file never read. Agent proceeds from AGENT.md alone. |
| RT-10 | Propagation Completeness | All propagation fixes | Pick any structural rule from CLAUDE-CORE.md (e.g., binary gates). Search all 20 ANTI-DEGRADATION.md files for that rule. | Rule appears in all 20 files with consistent language. | Rule in CLAUDE-CORE.md but missing from 15 of 20 ANTI-DEGRADATION.md files (the original propagation failure pattern). |
| RT-11 | Expression Anchoring Score Gate | Fix #13 (Expression Anchoring Protocol v3.9) | Execute Skill 03 or 04. Produce expression candidates. Check for anchoring scores. | Every expression candidate has an anchoring score. Candidates below 5.0 are rejected. Candidates between 5.0-6.4 are flagged. | Expression candidates presented to Arena without anchoring scores. No TIER1 reference loaded. |
| RT-12 | Soul.md Loading | Fix #6 (Soul.md Protocol v3.3) | Execute any generative skill (10-20). Check Layer 0 execution. | Soul.md loaded at Layer 0. Voice register, anti-voice, pacing signature visible in execution context. Generation constrained by Soul.md parameters. | Soul.md never loaded. Generation proceeds without voice constraints. Output sounds generic. |

### Regression Test Execution Notes

- RT-01 is the highest-priority regression test. It validates the fix for the engine's most repeated failure.
- RT-02 and RT-03 require inspecting subagent spawn prompts, which means running in a mode where prompt content is visible/logged.
- RT-04 is best tested on Skill 04 (Mechanism) because that skill's failure (8/33 outputs) is the documented case.
- RT-10 can be run as a file search without executing any skill — pure audit.

---

## TEST TYPE 3: SMOKE TESTS (Minimal End-to-End Validation)

**Purpose:** Quick validation that a skill's critical path works — files load, Layer 0 initializes, checkpoint files get created.

**Why needed:** Zero testing infrastructure exists. Before running any skill in production, a 5-minute smoke test should confirm the skill is wired correctly.

**Test data:** Use the Rich Schefren AI Opportunity project (`./outputs/rich-shefren-ai-opportunity/`) as reference data, since Sections 1-10 are complete.

### Foundation Skills (01-09) Smoke Tests

| Skill | Test ID | Smoke Test | Expected Output | Est. Time |
|-------|---------|-----------|-----------------|-----------|
| 01 Research | ST-01 | Load project brief. Execute Layer 0 (project initialization). | `market_config.yaml` created. Project folder structure exists. PRD loaded. | 3 min |
| 02 Proof Inventory | ST-02 | Load project data. Execute Layer 0. | Proof sources identified. Layer 0 checkpoint file created. | 3 min |
| 03 Root Cause | ST-03 | Load research output from RSF project. Execute Layer 0 + Layer 1A (concept discovery only). | Vertical profile loaded. Soul.md loaded. TIER1 expression reference loaded. Concept candidates in plain language (no naming). | 5 min |
| 04 Mechanism | ST-04 | Load research + root cause output. Execute Layer 0 + Layer 1A. | Same as ST-03. Mechanism concept candidates without naming. Layer 0 checkpoint lists all loaded files. | 5 min |
| 05 Promise | ST-05 | Load upstream outputs. Execute Layer 0. | Vertical profile + Soul.md + upstream data loaded. Layer 0 checkpoint created. | 3 min |
| 06 Big Idea | ST-06 | Load upstream outputs. Execute Layer 0 + Layer 2A (concept only). | Concept candidates in plain language. CONCEPT CHECKPOINT gate present (not yet approved). Expression anchoring scores computed. | 5 min |
| 07 Offer | ST-07 | Load upstream outputs. Execute Layer 0. | Layer 0 checkpoint. All upstream handoffs verified as present. | 3 min |
| 08 Structure | ST-08 | Load upstream outputs. Execute Layer 0. | Layer 0 checkpoint. Campaign brief elements loaded. | 3 min |
| 09 Campaign Brief | ST-09 | Load all foundation outputs. Execute Layer 0. Verify all upstream outputs are referenced. | Layer 0 checkpoint lists all 8 upstream skill outputs as loaded. No missing references. | 3 min |

### Long-Form Skills (10-20) Smoke Tests

| Skill | Test ID | Smoke Test | Expected Output | Est. Time |
|-------|---------|-----------|-----------------|-----------|
| 10 Headlines | ST-10 | Load campaign brief. Execute Layer 0 + Layer 1 (classification). | Layer 0 checkpoint. Layer 1 classification output (headline type, market sophistication level). Persona voice loader executed. | 5 min |
| 11 Lead | ST-11 | Load campaign brief + headline selection. Execute Layer 0 + Layer 1. | Layer 0 checkpoint. Layer 1 classification (lead type). FSSIT data loaded. | 5 min |
| 12 Story | ST-12 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification (story archetype). | 5 min |
| 13 Root Cause Narr. | ST-13 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification output. Root cause concept loaded from Skill 03. | 5 min |
| 14 Mechanism Narr. | ST-14 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification output. Mechanism concept loaded from Skill 04. | 5 min |
| 15 Product Intro | ST-15 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification output. Product data loaded. | 5 min |
| 16 Offer Copy | ST-16 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification output. Offer structure loaded from Skill 07. | 5 min |
| 17 Close | ST-17 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification output. Close type determined. | 5 min |
| 18 Proof Weaving | ST-18 | Load upstream. Execute Layer 0 + Layer 1. | Layer 1 classification output. Proof inventory loaded from Skill 02. | 5 min |
| 19 Campaign Assembly | ST-19 | Load all section outputs. Execute Layer 0. Verify all Arena selections referenced. | Layer 0 checkpoint. All section outputs listed. Arena-selected hybrids (not pre-Arena drafts) referenced. | 5 min |
| 20 Editorial | ST-20 | Load assembled draft. Execute Layer 0 (full-document analytical read). | Layer 0 checkpoint. Document structure map. Issue identification pass. Model assigned = opus (not sonnet). | 5 min |

### Email Engine Smoke Tests

| Skill | Test ID | Smoke Test | Expected Output | Est. Time |
|-------|---------|-----------|-----------------|-----------|
| E0 Email Strategist | ST-E0 | Load project data. Execute Layer 0. | Email strategy framework initialized. Sequence type determined. | 3 min |
| E1 Email Writer | ST-E1 | Load strategy output. Execute Layer 0 + Layer 1. | Layer 1 classification (email type). Persona voice loaded. | 5 min |
| E2 Subject Line | ST-E2 | Load email draft. Execute Layer 0 + Layer 1. | Layer 1 classification. Subject line type determined. | 5 min |
| E3 Sequence Assembler | ST-E3 | Load email outputs. Execute Layer 0. | All email outputs referenced. Sequence structure mapped. | 3 min |
| E4 Email Editorial | ST-E4 | Load assembled sequence. Execute Layer 0. | Full sequence loaded. Editorial framework initialized. | 3 min |

### Ad Engine Smoke Tests

| Skill | Test ID | Smoke Test | Expected Output | Est. Time |
|-------|---------|-----------|-----------------|-----------|
| A01-A04 (Intelligence) | ST-A01 | Load project data. Execute Layer 0 for any intelligence skill. | Ad intelligence framework initialized. Vertical config loaded. | 3 min |
| A05-A08 (Creative) | ST-A05 | Load intelligence outputs. Execute Layer 0 for any creative skill. | Layer 0 checkpoint. Upstream intelligence loaded. Ad persona registry referenced. | 3 min |
| A09-A12 (Optimization) | ST-A09 | Load creative outputs. Execute Layer 0 for any optimization skill. | Layer 0 checkpoint. Creative outputs loaded. Optimization framework initialized. | 3 min |

---

## TEST EXECUTION PROTOCOL

### Who Runs Tests

| Runner | When | Method |
|--------|------|--------|
| **Human reviewer** | After any structural fix. Before production execution of a repaired skill. | Manual execution following this document. |
| **Claude agent (test mode)** | When explicitly instructed: "Run test [ID]" or "Run gate tests." | Agent executes the specified test(s) and records results. Agent MUST NOT run tests autonomously. |

### When to Run

| Trigger | Required Tests | Rationale |
|---------|---------------|-----------|
| **Structural fix applied** | Regression test for that fix + gate tests for affected skills | Verify the fix works |
| **Before production execution** | Smoke test for the skill about to run | Verify wiring is intact |
| **After propagation update** | RT-10 (propagation completeness) | Verify all files updated |
| **New skill added** | Full smoke test for new skill + gate tests | Verify new skill follows all protocols |
| **Session resumption** | RT-06 (session state) | Verify state persisted from prior session |

### Recording Results

**Location:** `./tests/results/YYYY-MM-DD-[test-type].md`

**Format:**

```markdown
# Test Results — [DATE] — [Test Type]

## Summary
- Tests run: [count]
- Passed: [count]
- Failed: [count]
- Blocked: [count] (could not run due to missing prerequisites)

## Results

| Test ID | Result | Notes |
|---------|--------|-------|
| GT-01   | PASS   | Gate blocked correctly at 500/1000 |
| GT-02   | FAIL   | Gate created despite bucket shortfall — see details |

## Failure Details
### [Test ID] — [Test Name]
- **Expected:** [what should have happened]
- **Actual:** [what happened]
- **Root Cause:** [if identified]
- **Fix Required:** [what needs to change]
- **Severity:** [CRITICAL / HIGH / MEDIUM / LOW]
```

---

## TEST INFRASTRUCTURE (Future)

### Directory Structure (Planned — Not Yet Created)

```
./
  tests/
    results/                    # Test execution results (YYYY-MM-DD format)
    fixtures/                   # Synthetic test data
      scored-quotes-500.json    # GT-01: Sub-threshold quote file
      scored-quotes-1050-low-pain.json  # GT-02: Bucket shortfall
      gate-conditional-pass.yaml        # GT-07: Invalid status
      gate-partial-pass.yaml            # GT-08: Invalid status
    scripts/                    # Automation scripts (future)
      audit-propagation.sh      # RT-10: Search all ANTI-DEGRADATION.md for rule
      count-microskill-outputs.sh  # RT-04: Count files per skill execution
```

### Test Data Requirements

| Test Category | Required Data | Source |
|---------------|--------------|--------|
| Gate Tests (GT-01 to GT-09) | Synthetic `scored_quotes.json` files at various thresholds | Create manually — small JSON files with controlled quote counts |
| Gate Tests (GT-10, GT-11) | Active project with concept discovery complete | Use RSF project data |
| Regression Tests (RT-01) | Live research execution against real sources | Requires internet access + API availability |
| Regression Tests (RT-02 to RT-12) | Active skill execution or file audit | RSF project data or new test project |
| Smoke Tests (all) | Rich Schefren project outputs | Already exists at `outputs/rich-shefren-ai-opportunity/` |

### Automation Opportunities

| Test | Automatable? | Method |
|------|-------------|--------|
| GT-06 (Per-microskill missing) | YES | Script: list expected files from AGENT.md, check existence |
| GT-07, GT-08 (Invalid status) | YES | Script: validate YAML status field = "PASS" only |
| GT-09 (Hash mismatch) | YES | Script: compare SHA256 in gate file vs current file |
| RT-04 (Per-microskill count) | YES | Script: count .md files in layer output dir vs microskill specs |
| RT-10 (Propagation completeness) | YES | Script: grep for key phrases across all 20 ANTI-DEGRADATION.md files |
| RT-06 (Session state exists) | YES | Script: check for SESSION-STATE.md in project dir |
| All smoke tests | PARTIAL | Layer 0 could be scripted; deeper layers require LLM execution |

---

## PRIORITY MATRIX

Tests ranked by Impact (value of catching the failure) and Effort (cost to run the test).

### Tier 1: High Impact + Low Effort (Run These First)

| Test ID | Name | Impact | Effort | Why Priority |
|---------|------|--------|--------|-------------|
| GT-01 | Quote Volume Gate (Total) | HIGH | LOW | Catches the engine's #1 repeat failure (3 occurrences). Synthetic data, 5 min setup. |
| GT-07 | Binary Status Invented | HIGH | LOW | Catches invented gate statuses. Manual YAML edit, 2 min setup. |
| GT-08 | Binary Status Invented (Variant) | HIGH | LOW | Same as GT-07, different status string. |
| RT-10 | Propagation Completeness | HIGH | LOW | Pure file audit — no execution needed. `grep` across 20 files. |
| GT-06 | Per-Microskill Output Missing | HIGH | LOW | Delete one file, run checkpoint check. Catches synthesis trap. |
| GT-11 | Layer Sequence Gate | HIGH | LOW | Attempt out-of-order execution. Quick structural check. |

### Tier 2: High Impact + Medium Effort

| Test ID | Name | Impact | Effort | Why Priority |
|---------|------|--------|--------|-------------|
| GT-02 | Quote Volume Gate (Bucket) | HIGH | MED | Requires more complex synthetic data (bucket-level counts). |
| GT-04 | Arena Round 2 Skip | HIGH | MED | Requires running Arena Round 1 first (~15 min). |
| RT-01 | Research Quote Target | HIGH | MED | Full research execution. Most important regression test. |
| RT-04 | Per-Microskill Output Completeness | HIGH | MED | Requires full skill execution through Layer 1. |
| RT-09 | Anti-Degradation Mandatory Read | HIGH | MED | Requires new session + execution log inspection. |
| GT-10 | Concept Checkpoint Gate | HIGH | MED | Requires Phase A execution before testing Phase B block. |

### Tier 3: Medium Impact + Low Effort

| Test ID | Name | Impact | Effort | Why Priority |
|---------|------|--------|--------|-------------|
| RT-06 | Session State Persistence | MED | LOW | Check for file existence after session end. |
| RT-08 | Stale Artifact Cleanup | MED | LOW | Run skill twice, check for old files. |
| ST-01 to ST-09 | Foundation Smoke Tests | MED | LOW | 3-5 min each. Verify Layer 0 wiring. |
| GT-12 | Forbidden Rationalization Detection | MED | LOW | Present agent with known rationalization string. |

### Tier 4: Medium Impact + Medium Effort

| Test ID | Name | Impact | Effort | Why Priority |
|---------|------|--------|--------|-------------|
| RT-02 | Subagent Context Passing | MED | MED | Requires inspecting subagent prompts. |
| RT-03 | Model Assignment Compliance | MED | MED | Requires model-level execution logging. |
| RT-07 | Handoff File Size | MED | MED | Requires full research run to generate handoff. |
| RT-11 | Expression Anchoring Score Gate | MED | MED | Requires Skill 03 or 04 execution through scoring. |
| RT-12 | Soul.md Loading | MED | MED | Requires generative skill execution. |
| ST-10 to ST-20 | Long-Form Smoke Tests | MED | MED | 5 min each but require upstream data. |

### Tier 5: Lower Priority (Run When Stable)

| Test ID | Name | Impact | Effort | Why Priority |
|---------|------|--------|--------|-------------|
| GT-03 | Proof Threshold Gate | MED | MED | Less frequently failed than research gates. |
| GT-05 | Arena Round 2 FINAL Skip | MED | MED | Requires Round 1 before testing Round 2 FINAL skip. |
| GT-09 | Gate File Hash Mismatch | LOW | LOW | Edge case — quote file modification after gate. |
| RT-05 | Positional Reinforcement at Layer 3 | MED | HIGH | Hard to objectively measure. |
| ST-E0 to ST-E4 | Email Smoke Tests | LOW | MED | Email engine less used than main pipeline currently. |
| ST-A01 to ST-A09 | Ad Engine Smoke Tests | LOW | MED | Ad engine less used than main pipeline currently. |

---

## IMMEDIATE NEXT ACTIONS

1. **Run RT-10 (Propagation Completeness) now.** This is a file audit that requires zero execution — just search all 20 ANTI-DEGRADATION.md files for key phrases like "binary gate," "per-microskill output," "mandatory project infrastructure." Can be done in 10 minutes.

2. **Create GT-01 test fixture.** Build a synthetic `scored_quotes.json` with exactly 500 quotes. This is the single highest-value test because it targets the engine's most-repeated failure.

3. **Run GT-07 and GT-08.** Create two invalid gate YAML files and attempt Layer 2 execution. Takes 5 minutes total.

4. **Establish the `/tests/results/` directory** after first test run, using the recording format above.

5. **Run smoke tests (ST-01 through ST-09) on the RSF project** before any new production execution.

---

## CHANGE LOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-25 | Initial testing protocol. 12 gate tests, 12 regression tests, 30 smoke tests. Priority matrix. |
