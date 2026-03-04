# CopywritingEngine — CLAUDE.md

**Version:** 3.1
**Created:** 2026-01-31
**Updated:** 2026-02-05
**Purpose:** Institutional memory and execution constraints for CopywritingEngine sessions

---

## CRITICAL: READ THIS FIRST

This file exists because **patterns of failure repeat** across sessions. The CopywritingEngine has suffered from:

1. **Incomplete outputs** — Skills claiming completion without all required files
2. **Missing handoffs** — JSON outputs without markdown summaries
3. **Schema violations** — Required fields missing from structured outputs
4. **Microskill shortcuts** — Synthesizing output instead of executing skills
5. **Progressive degradation** — As context grows, execution becomes looser

**This file is the fix.** Before executing ANY CopywritingEngine skill, read the relevant sections below.

---

## THE CORE PROBLEM: LLM EXECUTION DEGRADATION

As tasks get complex and context windows fill:
- The model rushes through execution
- Rules get interpreted loosely
- "Loopholes" are found to execute faster
- Quality gates are treated as suggestions
- Outputs become partial or abbreviated

**This is not acceptable.** The CopywritingEngine requires COMPLETE, DISCIPLINED execution regardless of context size or task complexity.

### Anti-Degradation Protocol

```
WHEN YOU NOTICE YOURSELF:
- Rushing through steps → STOP. Slow down. Execute each step fully.
- Interpreting rules loosely → STOP. Follow rules literally.
- Finding "shortcuts" → STOP. There are no shortcuts. Execute the protocol.
- Abbreviating outputs → STOP. Every output must be complete.
- Skipping validation → STOP. Validation is mandatory, not optional.

IF CONTEXT IS LARGE:
- This does NOT excuse incomplete execution
- Request continuation if needed rather than abbreviating
- Maintain the same rigor on step 50 as step 1
```

---

## METACOGNITIVE PROTOCOL

**Why This Exists:** LLMs cannot proceduralize metacognitive skills. Every execution runs entirely through declarative working memory, which degrades under load. This protocol externalizes metacognition through mandatory self-monitoring checkpoints, context load management, structural forcing, and simulated warning signals.

**Reference:** Based on Brandon Conan Smith's research on metacognitive skill learning — the insight that humans convert declarative knowledge into automatic procedural knowledge through practice, but LLMs cannot. Therefore, we must externalize what cannot be internalized.

---

### MC-CHECK Protocol (Metacognitive Checkpoint)

**MC-CHECK is mandatory self-monitoring injected at critical execution points.**

#### When to Execute MC-CHECK

| Trigger Point | Why Here |
|---------------|----------|
| **Layer Entry** | Verify prerequisites before starting |
| **Mid-Layer** (every 3-4 microskills) | Catch drift before gate |
| **Gate Validation** | Before declaring layer complete |
| **Before Output Generation** | Prevent partial outputs |
| **Context Threshold 75%** | Early warning of degradation |
| **After Major Tool Use** | Verify results used correctly |

#### MC-CHECK Format

```yaml
MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output | context_threshold]"

  confidence_assessment:
    score: "[1-10]"
    if_below_7: "PAUSE - identify uncertainty, re-read requirements"

  rushing_detection:
    skipping_file_reads: "[Y/N]"
    synthesizing_from_memory: "[Y/N]"
    abbreviating_outputs: "[Y/N]"
    loose_rule_interpretation: "[Y/N]"
    if_any_yes: "STOP - slow down, reread protocol from source"

  synthesis_verification:
    question: "Have I actually READ required files in THIS session?"
    proof: "[Quote specific lines from files just read]"
    if_no_proof: "HALT - go back and actually read the file"

  completeness_check:
    all_required_outputs_exist: "[Y/N]"
    all_fields_populated: "[Y/N]"
    if_any_no: "DO NOT claim completion - address gaps"

  result: "[PROCEED | PAUSE | HALT | SESSION_BREAK]"
```

#### MC-CHECK-LITE (for frequent mid-layer checks)

```
MC-CHECK-LITE:
- Confidence: [1-10]
- Rushing: [Y/N]
- Synthesizing: [Y/N]
- Action: [PROCEED | SLOW_DOWN | STOP]
```

---

### Context Load Management

**Since LLMs can't proceduralize to free working memory, manage load externally.**

#### Context Zones

| Zone | Range | State | Required Response |
|------|-------|-------|-------------------|
| 🟢 **GREEN** | 0-50% | Optimal | Normal MC-CHECK frequency |
| 🟡 **YELLOW** | 50-75% | Elevated | Double MC-CHECK frequency, begin summarizing completed work |
| 🔴 **RED** | 75-90% | Conservation | MC-CHECK every action, prepare state handoff, warn user |
| ⚫ **CRITICAL** | >90% | Shutdown | HALT new operations, generate handoff, request session break |

#### Context Load Estimation

Since exact measurement isn't available, use these indicators:

**Signs of High Load:**
- Multiple large files read in session
- 5+ skills executed
- Long execution logs accumulated
- Multiple upstream packages loaded

**Signs of Degradation Onset:**
- Responses getting shorter
- Temptation to summarize instead of detail
- Difficulty recalling earlier session content
- Increased synthesis behavior

#### Zone Response Protocol

```
IF YELLOW ZONE:
  - Announce: "Context load elevated - increasing monitoring"
  - Double MC-CHECK frequency
  - Begin compressing completed work in logs

IF RED ZONE:
  - Announce: "Context load high - conservation mode active"
  - MC-CHECK every microskill
  - Prepare SESSION-HANDOFF.md
  - Recommend: "Session break after current gate"

IF CRITICAL ZONE:
  - Announce: "Context capacity reached - controlled shutdown"
  - HALT new complex operations
  - Complete ONLY current atomic action
  - Generate mandatory state handoff
  - DO NOT attempt new skills
```

---

### Simulated Type 1 Signals

**LLMs don't have automatic warning "feelings." These simulate them.**

When these patterns are detected, output the signal explicitly:

| Signal | Trigger | Response |
|--------|---------|----------|
| 🚨 **INCOMPLETENESS ALERT** | Output template has empty fields | Cannot proceed - return to complete |
| ⚠️ **SYNTHESIS WARNING** | Generating without recent file read | Pause - verify actual file was read |
| ⏰ **RUSHING ALERT** | 4+ actions without MC-CHECK | Mandatory checkpoint before next action |
| 📉 **DEGRADATION WARNING** | Quality indicators declining | Context load assessment required |
| 🛑 **CONSTRAINT VIOLATION** | Action matches forbidden behavior | Halt - review constraint, undo if needed |
| 🧠 **OVERLOAD RISK** | Holding 5+ complex items simultaneously | Write intermediate state before continuing |

**Example Output:**
```
🚨 INCOMPLETENESS ALERT: Output template field "proof_elements" is empty.
   RESPONSE: Cannot proceed until field is populated.
   ACTION: Returning to complete output.
```

---

### Session Continuity Protocol

**Robust state handoff enables seamless session continuation.**

#### Continuous State (update after every microskill)

Track in execution-log.md:
```yaml
current_state:
  skill: "[skill name]"
  layer: "[layer number]"
  last_microskill: "[completed]"
  outputs_created: "[list]"
  context_zone: "[GREEN|YELLOW|RED]"
```

#### Session Handoff Document

**Create when entering RED zone or at session break.**

Location: `[project-outputs]/SESSION-HANDOFF.md`

```markdown
# Session Handoff - [Project Name]
Generated: [timestamp]

## Resume Instructions
1. Read this document first
2. Read these files: [list critical files]
3. First action: [specific next step]

## Current Position
- Skill: [name]
- Layer: [number]
- Last Completed: [microskill]
- Next Required: [microskill]

## Completed Outputs
- [file path] - verified exists: Y/N
- [file path] - verified exists: Y/N

## Key Decisions Made
- [decision that affects downstream]
- [human approval received for X]

## Active Constraints
- [any special constraints for this project]

## Do Not Re-Execute
- [files already processed]
- [outputs already created]
```

#### Resume Protocol

```
ON SESSION RESUME:
1. Read SESSION-HANDOFF.md
2. Read listed critical files
3. Verify completed outputs still exist
4. Execute stated first action
5. MC-CHECK before proceeding further
```

---

### Structural Forcing Principles

**Instructions can be forgotten. Structures cannot be bypassed.**

#### Transform Instructions → Templates

**Bad (Instruction):**
> "Remember to include all three output files"

**Good (Structural Template):**
```yaml
## OUTPUT COMPLETION GATE
output_1_json:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO
output_2_summary:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO
output_3_log:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO

IF ANY "NO" → SKILL NOT COMPLETE
```

#### Structural Dependency Chains

Make Layer N+1 physically require Layer N output:

```
Layer 1 Entry:
  REQUIRES: layer_0_output.json
  VALIDATION: Quote 3 specific values from file
  IF CANNOT QUOTE: Layer 0 not complete - go back
```

---

### Anti-Degradation Commitment

```
WHEN FACING A CHOICE:
- Fast but degraded    → CHOOSE slow and complete
- Synthesis but risky  → CHOOSE read and verify
- Skip but efficient   → CHOOSE execute and log

THERE IS NO ACCEPTABLE DEGRADATION.

Use MC-CHECK.
Manage context load.
Maintain quality regardless of session length.
```

---

## MANDATORY OUTPUT PROTOCOL (ALL SKILLS)

**Every CopywritingEngine skill produces THREE outputs:**

| Output Type | Format | Purpose |
|-------------|--------|---------|
| **Primary Output** | JSON/YAML | Structured data for downstream skills |
| **Summary Handoff** | Markdown | Human-readable review document |
| **Execution Log** | Markdown | Verification that all microskills ran |

### Output Verification Checklist

Before claiming ANY skill is complete:

```
[ ] Primary output file EXISTS in project outputs folder
[ ] Primary output contains ALL required schema sections
[ ] Primary output contains ALL required handoff fields (populated, not empty)
[ ] Summary markdown file EXISTS in project outputs folder
[ ] Summary markdown contains ALL required sections
[ ] Execution log EXISTS showing ALL microskills checked
[ ] Execution log shows ALL quality gates passed
```

**IF ANY CHECKBOX IS UNCHECKED → SKILL IS NOT COMPLETE**

---

## OUTPUT PATH CONVENTION

**All CopywritingEngine outputs go OUTSIDE the skill folders.**

The CopywritingEngine codebase should remain clean (system only, no project data). All project outputs are saved to:

```
/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/Copywriting-Business/outputs/
```

### Output Path Structure

```
Copywriting-Business/
  outputs/
    [project-name]/                    # e.g., "harmoni-pendant" or "home-title-lock"
      01-research/
        FINAL_HANDOFF.md
        layer-1-outputs/
        layer-2-outputs/
        execution-log.md
      02-proof-inventory/
        proof-inventory-output.json
        PROOF-INVENTORY-SUMMARY.md
        execution-log.md
      03-root-cause/
        root-cause-package.yaml
        ROOT-CAUSE-SUMMARY.md
        execution-log.md
      ... (all skill outputs for this project)
```

### Path Construction Rule

When saving outputs, construct the path as:
```
[OUTPUTS_ROOT]/[project-name]/[skill-id]-[skill-name]/[filename]
```

Where:
- `OUTPUTS_ROOT` = `/Users/anthonyflores/Desktop/Manual Library/Anthony-Main-Vault/Copywriting-Business/outputs`
- `project-name` = Product or client name (lowercase, hyphens for spaces)
- `skill-id` = Two-digit skill number (01, 02, 03, etc.)
- `skill-name` = Skill name (research, proof-inventory, root-cause, etc.)

### Why This Matters

1. **Clean codebase** — CopywritingEngine can be shared without client data
2. **No learning value in raw outputs** — LLMs don't remember past sessions; learning comes from explicit log entries
3. **Better project organization** — All outputs for a project in one place
4. **Easy archival** — Completed projects can be moved/archived as single folders

---

## SKILL-SPECIFIC REQUIREMENTS

### 01-Research (Deep Research v3) — CRITICAL ENFORCEMENT

**Catastrophic Failure Event (2026-02-05):** Delivered 121 quotes when 1,000+ were required. AI invented "conditional pass" concept that doesn't exist. AI rationalized "quality over quantity." 28,000 scraped items were sampled instead of systematically processed. Context compaction preserved the rationalization as fact.

**Reference:** Full structural fixes in `Skills/01-research/RESEARCH-ANTI-DEGRADATION.md`

#### Non-Negotiable Thresholds (PRD v3.0 Section 9.2 HARD BLOCKERS)

| Bucket | Minimum | If Not Met |
|--------|---------|------------|
| **TOTAL** | **1,000** | **HALT** |
| Pain | 300 | HALT |
| Hope | 250 | HALT |
| Root Cause | 200 | HALT |
| Solutions Tried | 150 | HALT |
| Competitor Mechanism | 100 | HALT |
| Villain | 75 | HALT |

**121 is NOT "approximately 1000." 847 is NOT 1000. Numbers are EXACT.**

#### Structural Gate File Requirement

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/checkpoints/GATE_1_VERIFIED.yaml
```

This file is created ONLY by validator 1.6-A when ALL thresholds are met. If file doesn't exist, Layer 2 is BLOCKED regardless of any claims.

#### Forbidden Rationalizations (IMMEDIATE HALT if detected)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "quality over quantity" | BOTH required. Quality filtering after quantity met. |
| "representative sample" | ALL items must be processed. Sampling forbidden. |
| "conditional pass" | DOES NOT EXIST. Gates are PASS or FAIL only. |
| "sufficient for analysis" | Thresholds are non-negotiable. |
| "close enough" | Numbers are exact, not approximate. |
| "approximately X" | Counts must be exact. |

#### Extraction Progress Tracking

**Mandatory file:** `[project]/layer-1-outputs/EXTRACTION_PROGRESS.md`

Must track:
- Items scraped per dataset
- Items processed per dataset
- Processing percentage (must be 100% before Layer 2)
- Per-bucket quote counts vs targets

**If processing_percentage < 100%, extraction is NOT complete.**

#### Context Resume Protocol

When resuming from compaction:
1. DO NOT trust summary claims about gate status
2. RE-READ actual checkpoint files
3. RE-COUNT quotes from scored_quotes.json
4. VERIFY all thresholds still met
5. Only proceed if VERIFIED counts meet requirements

**NEVER trust "conditional pass" in a summary. It does not exist.**

#### Research-Specific MC-CHECK (Every 30 minutes)

```yaml
RESEARCH-MC-CHECK:
  processing_percentage: [%] — Is it 100%?
  total_quotes: [exact] — Is it >= 1000?
  all_bucket_minimums_met: [Y/N]
  am_i_sampling_instead_of_processing_all: [Y/N]
  am_i_thinking_quality_over_quantity: [Y/N]
  am_i_thinking_conditional_pass: [Y/N]

  IF any rationalization detected: 🛑 HALT
  IF processing < 100%: CONTINUE PROCESSING
  IF quotes < 1000: CONTINUE EXTRACTION
```

---

### 02-Proof Inventory — CRITICAL ENFORCEMENT

**Process Failure Event (2026-02-05):** Layer 3 (Discovery/Generation) was completely skipped. AI extracted existing proof from the brief, scored it, then went directly to Layer 4 output without discovering any additional proof. AI rationalized "existing proof is sufficient." Web searches were only performed AFTER being called out. Same degradation pattern as Research catastrophic failure.

**Reference:** Full structural fixes in `Skills/02-proof-inventory/PROOF-ANTI-DEGRADATION.md`

#### Mandatory Layer 3 Execution (CANNOT BE SKIPPED)

Layer 3 contains 7 discovery microskills:
- 3.1 Discovery Routing
- 3.2 Study Discovery
- 3.3 Data Discovery
- 3.4 Expert Quote Discovery
- 3.5 Analogous Proof Discovery
- 3.6 Generation Recommendations
- 3.7 Implementation Guidance

**ALL 7 microskills must execute. This is NOT optional.**

#### Structural Gate File Requirements

**Layer 4 CANNOT execute unless BOTH files exist:**

```
[project]/02-proof-inventory/DISCOVERY_LOG.md
[project]/02-proof-inventory/checkpoints/LAYER_3_COMPLETE.yaml
```

These files are created ONLY by completing Layer 3 discovery operations. If files don't exist, Layer 4 is BLOCKED.

#### Minimum Discovery Thresholds (NON-NEGOTIABLE)

| Discovery Type | Minimum Requirement | If Not Met |
|----------------|---------------------|------------|
| **Study Discovery Searches** | 5 queries minimum | HALT — Continue searching |
| **Data Discovery Searches** | 3 queries minimum | HALT — Continue searching |
| **Expert Quote Searches** | 3 queries minimum | HALT — Continue searching |
| **Microskills Adding Elements** | At least 3 of 7 must add elements | HALT — Discovery incomplete |

**"Zero elements discovered" is NOT acceptable unless genuinely exhaustive search was performed.**

#### Forbidden Rationalizations (IMMEDIATE HALT if detected)

| Rationalization | Why Invalid |
|-----------------|-------------|
| "existing proof is sufficient" | Discovery phase is MANDATORY regardless of existing inventory |
| "brief contains enough proof" | Discovery searches for ADDITIONAL proof beyond the brief |
| "I'll update the inventory now" | Cannot update inventory before discovery phase |
| "time constraints" | Quality over speed. Discovery cannot be skipped. |
| "the gaps aren't significant" | Gap severity is determined AFTER discovery attempts |
| "web searches came back empty" | Log the searches anyway. Empty results are still discovery. |
| "I already know this market" | Discovery requires ACTUAL searches, not recalled knowledge |

#### Discovery Progress Tracking

**Mandatory file:** `[project]/02-proof-inventory/DISCOVERY_LOG.md`

Must track:
- Each discovery operation (3.1-3.7) with executed/skipped status
- Search queries used (minimum 5 for studies, 3 for data, 3 for expert quotes)
- Elements discovered per discovery type
- Total new elements discovered
- Elements added to inventory

**If DISCOVERY_LOG.md doesn't exist, Layer 4 is BLOCKED.**

#### Context Resume Protocol

When resuming from compaction:
1. DO NOT trust summary claims about discovery completion
2. RE-READ DISCOVERY_LOG.md and LAYER_3_COMPLETE.yaml
3. VERIFY all discovery operations show "EXECUTED"
4. VERIFY minimum search thresholds were met
5. Only proceed if VERIFIED discovery was completed

**NEVER trust "discovery was completed" in a summary. Verify from files.**

#### Proof-Specific MC-CHECK (At Layer 2→3 and Layer 3→4 transitions)

```yaml
PROOF-MC-CHECK:
  discovery_log_exists: [Y/N]
  layer_3_complete_yaml_exists: [Y/N]

  study_discovery:
    executed: [Y/N]
    search_count: [number] — Is it >= 5?
  data_discovery:
    executed: [Y/N]
    search_count: [number] — Is it >= 3?
  expert_quote_discovery:
    executed: [Y/N]
    search_count: [number] — Is it >= 3?

  am_i_thinking_existing_proof_sufficient: [Y/N]
  am_i_thinking_skip_discovery: [Y/N]
  am_i_thinking_brief_has_enough: [Y/N]
  am_i_avoiding_web_searches: [Y/N]

  IF any rationalization detected: 🛑 HALT
  IF any discovery type not executed: RETURN TO LAYER 3
  IF search counts below minimums: CONTINUE SEARCHING
```

#### Key Insight

> **"Discovery is not optional. The brief is the starting point, not the finish line."**

Layer 3 exists to find ADDITIONAL proof that wasn't in the brief. Skipping it means delivering only what the client already knew they had.

---

### 02-Root Cause
- **Output:** root-cause-package.yaml + ROOT-CAUSE-SUMMARY.md + execution-log.md
- **Critical:** Three-part structure (what_they_think, what_real, why_nothing_worked) is MANDATORY
- **Anti-pattern:** Skipping derivation to synthesize root cause is FORBIDDEN

### 03-Mechanism
- **Output:** mechanism-package.json + MECHANISM-SUMMARY.md + execution-log.md
- **Critical:** All downstream handoffs must be populated

### 04-Promise
- **Output:** promise-package.json + PROMISE-SUMMARY.md + execution-log.md
- **Critical:** Promise must be calibrated to proof ceiling from 02-proof-inventory

### 05-Big Ideas
- **Output:** big-idea-package.json + BIG-IDEA-SUMMARY.md + execution-log.md
- **Critical:** FSSIT-first generation protocol must be followed

### 06-Offer
- **Output:** offer-package.json + OFFER-SUMMARY.md + execution-log.md
- **Critical:** All enhancement stack components must be complete

### 08.5-Headline
- **Output:** headline-package.json + HEADLINE-SUMMARY.md + execution-log.md
- **Critical:** Must follow 4-layer sequential execution protocol
- **Anti-pattern:** Generating headlines without loading specimens is FORBIDDEN

### 10-Story
- **Output:** story-package.json + STORY-SUMMARY.md + execution-log.md
- **Critical:** Must follow 5-layer sequential execution with beat structure compliance
- **Anti-pattern:** Generating stories without loading type-matched specimens is FORBIDDEN
- **Anti-pattern:** Revealing mechanism before Cry for Help moment is FORBIDDEN

---

## ARENA LAYER (2.5) MANDATORY PROTOCOL

The Arena Layer transforms single-perspective generation into **7-competitor, 3-round competition with adversarial critique-revise cycles**. Seven competitors (6 legendary copywriter personas + The Architect) each generate their version, receive adversarial critique, revise, get scored, learn from winners, and compete again across 3 mandatory rounds.

**Full Protocol:** `Skills/ARENA-CORE-PROTOCOL.md`
**Persona Specs:** `Skills/ARENA-PERSONA-PANEL.md`

**Arena Layer Position:** Between Layer 2 (drafting/critique) and Layer 3 (validation).

**Skills with Arena Layers:**
- Strategic skills (03-08): Root Cause, Mechanism, Promise, Big Idea, Offer, Structure — `arena_mode: strategic`
- Generative skills (10-18): Headlines, Lead, Story, Root Cause Narrative, Mechanism Narrative, Product Introduction, Offer Copy, Close, Proof Weaving — `arena_mode: generative_full_draft`
- Editorial (20): Editorial — `arena_mode: editorial_revision`

### The 7 Arena Competitors

| # | Competitor | Editorial Lens | Generation Focus |
|---|-----------|---------------|------------------|
| 1 | **Makepeace** | Flow & Architecture | Momentum, transitions, seamless structure — "Does it pull the reader forward?" |
| 2 | **Halbert** | Entertainment & Personality | Story, drama, hook power — "Would they stop scrolling for this?" |
| 3 | **Schwartz** | Sophistication Calibration | Market awareness, claim calibration, mechanism-backed promises — "Is this fresh for THIS market?" |
| 4 | **Ogilvy** | Credibility & Clarity | Evidence, specificity, intelligent reader respect — "Would a skeptic accept this?" |
| 5 | **Craig Clemens** | Scientific Clarity | Binary reframes, 12-year-old language, mechanism simplification — "Would a 12-year-old understand this?" |
| 6 | **Bencivenga** | Proof-First Authority | Evidence pathway, institutional backing, persuasion equation — "Can every element be proven?" |
| 7 | **The Architect** | Integration & Synthesis | Multi-lens balanced optimization — "Does this score well on EVERY criterion?" |

### The Critic (Adversarial Role — NOT a Competitor)

A **dedicated adversarial critic** evaluates every output using the SAME 7 skill-specific criteria as the judge:
- Identifies **ONE weakest element** per output (forces prioritization)
- Maps weakness to a **specific criterion**
- Provides **actionable fix direction** (not vague "make it better")
- Must **cite evidence** from the output

### 3-Round Mandatory Execution Flow

```
ROUND 1:
  1A: 7 Competitors Generate → 1B: Critic Identifies Weakness →
  1C: Targeted Revision → 1D: Scoring → 1E: Ranking → 1F: Learning Brief
  --- Context compression: non-winners compressed to summaries ---

ROUND 2:
  2A: Learning Brief distributed → 2B: 7 Re-generate (incorporating learnings) →
  2C: Critique → 2D: Revision → 2E: Scoring → 2F: Cumulative Learning Brief
  --- Context compression ---

ROUND 3:
  3A: Cumulative Brief distributed → 3B: 7 Generate FINAL →
  3C: Critique → 3D: Revision → 3E: FINAL Scoring → 3F: FINAL Ranking

POST-ARENA (Layer 2.6):
  Synthesizer decomposes all 7 Round 3 outputs → 2-3 phrase-level hybrids

HUMAN SELECTION (BLOCKING):
  7 pure Round 3 outputs + 2-3 hybrids = 9-10 candidates
```

**This is NOT optional. NOT a flag. 3 rounds DEFAULT. Every Arena runs 3 rounds.**

### Learning Between Rounds: Techniques Not Voice

Losers absorb the winner's TECHNIQUES but maintain their persona voice:
- Halbert learning Ogilvy's credibility technique doesn't make Halbert sound like Ogilvy
- Bencivenga using Makepeace's flow transitions doesn't abandon proof-first architecture
- The Learning Brief MUST include `voice_preservation_note` per competitor

### Arena Modes

| Mode | Skills | What Changes |
|------|--------|-------------|
| `strategic` | 03-08 | No behavioral change (already generate complete packages). Add 3-round + critique. |
| `generative_full_draft` | 10-18 | Competitors write COMPLETE PIECES from upstream packages. Layer 2 draft = reference material, not template. |
| `editorial_revision` | 20 | Stays revision-based. Per-issue competition. P1/P2 = 3 rounds; P3+ can bypass with human confirmation. |

### The 7 Default Judging Criteria

These are the DEFAULT criteria. Each skill's ARENA-LAYER.md has its OWN 7 skill-specific criteria with unique weights.

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| **Issue Resolution / Goal Achievement** | 20% | Does this actually accomplish the objective? (CRITICAL) |
| **Voice Preservation** | 20% | Does it maintain established voice/tone? Voice breaks destroy credibility |
| **Flow Enhancement** | 15% | Does it improve or maintain momentum? No flow regression allowed |
| **Clarity Improvement** | 15% | Clearer without oversimplifying or dumbing down? |
| **Slop Elimination** | 10% | Zero AI telltales, no corporate filler, every word earns its place |
| **Brevity** | 10% | Same or more impact with fewer words — compression without loss |
| **Threading Preservation** | 10% | Mechanism name, root cause anchor, framework references intact? |

### Quality Thresholds

```
MINIMUM SCORES FOR ACCEPTANCE:
- Overall weighted score: >= 8.5
- Voice preservation: >= 7.0 (deal-breaker if below)
- Threading preservation: >= 7.0 (cannot sacrifice threading for other improvements)
- Issue/goal resolution: >= 7.0 (must actually accomplish the objective)
```

### BLOCKING Human Selection Checkpoint

**Arena Layer is BLOCKING** — Cannot proceed to Layer 3 until:

```
[ ] All 7 competitors generated across all 3 rounds
[ ] Adversarial critique completed each round
[ ] All candidates scored against 7 criteria
[ ] Post-arena synthesis complete (2-3 hybrids)
[ ] 9-10 candidates presented with rationale
[ ] Human selection received OR bypass confirmed for minor issues
[ ] Any APPROVAL-REQUIRED changes (major elements) explicitly approved
```

**APPROVAL-REQUIRED Classifications:**
- Root cause changes
- Mechanism name changes
- Promise changes
- Anchor phrase changes

These require explicit human approval before inclusion.

### Anti-Slop Enforcement in Arena

**Revision Poison Words (NEVER introduce):**

| Category | Words to Avoid |
|----------|---------------|
| AI Telltales | revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform, breakthrough |
| Corporate Filler | comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, holistic, optimize, streamline |
| Hedge Words | might, could potentially, may want to, perhaps, arguably, it seems, appears to be |
| Empty Intensifiers | literally, absolutely, totally, completely, incredibly, extremely, amazingly, truly |
| Copywriting Clichés | imagine if you could, picture this, what if I told you, the truth is, here's the thing |

### Arena-Specific Forbidden Behaviors

1. ❌ Skipping any of the 7 competitors in generation
2. ❌ Running fewer than 3 rounds ("good enough after Round 1" is FORBIDDEN)
3. ❌ Skipping adversarial critique phase
4. ❌ Skipping targeted revision after critique
5. ❌ Scoring against fewer than 7 criteria
6. ❌ Proceeding without human selection
7. ❌ Accepting candidates below minimum thresholds
8. ❌ Changing APPROVAL-REQUIRED elements without explicit approval
9. ❌ Introducing slop/poison words in revisions
10. ❌ Generating without loading type-indexed specimens from 0.2.6-curated-gold-specimens.md
11. ❌ Learning that merges VOICE (absorb TECHNIQUES only)
12. ❌ Self-critique or cross-persona critique (must use dedicated Critic)

### Dual-System Specimen Architecture

The Arena Layer uses a dual-system architecture for specimen loading:

**SYSTEM 1: Type-Indexed Structural Pattern Loading (ACTIVE)**

Each skill's `0.2.6-curated-gold-specimens.md` file contains Gold specimens indexed by TYPE (issue type, story type, proof type, etc.), NOT by persona. All 7 competitors load the SAME type-matched specimens:

```
LOADING PROTOCOL:
1. IDENTIFY issue type OR generation goal (e.g., "flow_transition_problem", "discovery_story", "testimonial_cascade")
2. LOAD verbatim specimens from 0.2.6-curated-gold-specimens.md matching that TYPE
3. ALL 7 COMPETITORS use the SAME specimens as structural pattern reference
4. HOLD specimens in active context during generation
5. Each competitor applies their EDITORIAL LENS to the same structural foundation
```

**SYSTEM 2: Persona Voice Loading (FUTURE — NOT YET IMPLEMENTED)**

Future system will load ACTUAL COPY from each specific writer:
- Makepeace specimens (actual Clayton Makepeace copy)
- Halbert specimens (actual Gary Halbert copy)
- Clemens specimens (actual Craig Clemens copy)
- etc.

This system requires extraction of correctly-attributed persona specimens from source materials.

**Key Distinction:** Gold specimens in 0.2.6 files are written by various copywriters (Stansberry, Whitaker, Sinatra, Kennedy, etc.). The current system provides STRUCTURAL PATTERNS — the Arena competitors provide EDITORIAL PERSPECTIVE on how to apply those patterns.

### Arena Context Management

Context is managed across 3 rounds to stay within limits:

| Transition | Keep (Verbatim) | Compress (to Summaries) |
|-----------|-----------------|------------------------|
| R1 → R2 | Winner output + Learning Brief + all scores | Non-winning outputs → 2-3 sentences each |
| R2 → R3 | R1+R2 winners + Cumulative Learning Brief + R2 scores | R1 non-winners (already compressed) + R2 non-winners |
| R3 → Selection | ALL 7 Round 3 outputs (full) + hybrids | Prior round summaries can be dropped |

**Emergency:** If RED zone during arena, complete current round, generate state handoff, request session break.

---

## AGENT TEAM ARENA EXECUTION

**Why This Exists:** In single-context mode, 7 "competitors" are actually one model simulating 7 voices in sequence — causing persona contamination, context pressure, and self-critique weakness. Agent Teams solves this by giving each persona its own independent Claude instance with its own full context window.

**Prerequisite:** Enable in Claude Code settings:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### Agent Team Structure for Arena Execution

```
TEAM LEAD (Arena Coordinator)
├── Loads upstream packages, specimens, skill instructions
├── Spawns all teammates with their specific instructions
├── Manages 3-round flow and Learning Brief distribution
├── Collects outputs and coordinates human selection
│
├── PERSONA TEAMMATES (7 total — generate in parallel):
│   ├── Makepeace Agent   → Full 200K context, Makepeace persona + upstream + specimens
│   ├── Halbert Agent     → Full 200K context, Halbert persona + upstream + specimens
│   ├── Schwartz Agent    → Full 200K context, Schwartz persona + upstream + specimens
│   ├── Ogilvy Agent      → Full 200K context, Ogilvy persona + upstream + specimens
│   ├── Clemens Agent     → Full 200K context, Clemens persona + upstream + specimens
│   ├── Bencivenga Agent  → Full 200K context, Bencivenga persona + upstream + specimens
│   └── Architect Agent   → Full 200K context, Architect persona + upstream + specimens
│
├── CRITIC AGENT (adversarial — receives outputs BLIND):
│   └── Has NO generation context. Genuinely adversarial evaluation.
│       Identifies ONE weakest element per output with actionable fix direction.
│
└── JUDGE AGENT (scoring — separate from Critic):
    └── Scores all outputs against 7 skill-specific criteria.
        Generates Learning Briefs from round results.
```

### Why Agent Teams Transforms Arena Quality

| Single-Context Problem | Agent Teams Solution |
|----------------------|---------------------|
| Persona contamination (later personas influenced by earlier) | Each persona generates in its OWN context — zero cross-persona bleed |
| Self-critique weakness (Critic critiques its own work) | Critic agent has NO generation context — genuinely adversarial |
| Context pressure by Round 3 | Each agent has fresh 200K context per round — no compression needed |
| Sequential generation (slow) | 7 personas generate in parallel |
| Learning Briefs are self-talk | Learning Briefs are external signals from Judge to personas |
| Scoring by the same model that generated | Judge agent is separate — no ego investment in any output |

### Agent Team Round Coordination

```
ROUND 1:
  Team Lead → Distributes upstream packages + specimens + persona instructions to all 7
  All 7 persona teammates generate IN PARALLEL (effort: max)
  Team Lead → Collects 7 outputs → Sends to Critic Agent
  Critic Agent → Returns critique for each output (effort: high)
  Team Lead → Distributes critiques back to persona teammates
  All 7 persona teammates revise targeted weakness IN PARALLEL (effort: max)
  Team Lead → Collects revised outputs → Sends to Judge Agent
  Judge Agent → Scores all 7, generates Learning Brief (effort: high)

ROUND 2:
  Team Lead → Distributes Learning Brief to all 7
  [Same flow as Round 1 with cumulative learning]

ROUND 3:
  Team Lead → Distributes Cumulative Learning Brief to all 7
  [Same flow — FINAL scoring]
  Team Lead → Sends all 7 Round 3 outputs to Architect Agent for synthesis

POST-ARENA:
  Architect Agent → Creates 2-3 phrase-level hybrids (effort: max)
  Team Lead → Presents 9-10 candidates to human
```

### What Each Persona Agent Receives

Every persona teammate gets a self-contained prompt package:

1. **Persona identity** — Full specification from ARENA-PERSONA-PANEL.md
2. **Upstream packages** — Root cause, mechanism, promise, big idea, structure (whatever exists)
3. **Specimens** — Type-matched patterns from the skill's 0.2.6 file
4. **Skill instructions** — What to generate, criteria, constraints
5. **Arena mode** — strategic / generative_full_draft / editorial_revision
6. **Round context** — Round number + Learning Brief (Rounds 2-3)

**Each agent loads this into a FRESH 200K context.** No contamination. No compression. No degradation.

### Token Cost Acknowledgment

Agent Teams uses significantly more tokens than single-context mode (each teammate = separate Claude instance). For a 3-round arena with 7 personas + Critic + Judge, this is roughly 9x the inference of a single agent. **This is the correct tradeoff.** Quality over speed. Quality over cost.

### Fallback: Single-Context Mode

If Agent Teams is not available or not practical for a given session:
- Revert to single-context arena execution
- Use `effort: max` for all generation phases
- Apply strict context compression between rounds
- Be aware of contamination and critique weakness limitations

---

## MULTI-ROUND ARENA ENFORCEMENT

**Why 3 Rounds Are Mandatory:**

Round 1 establishes baselines. Round 2 shows improvement through learning. Round 3 produces the final competitive peak. Single-round arenas miss the learning-and-improvement cycle that produces the best outputs.

**The improvement pattern:**
- Round 1: Raw talent — each competitor's natural approach
- Round 2: Informed talent — winners' techniques distributed, losers improve
- Round 3: Peak performance — cumulative learning, final competitive push

**There is NO exception for fewer than 3 rounds.** The only bypass is `editorial_revision` mode for P3+ issues, where human can confirm quick-fix instead of full arena.

---

## SYNTHESIZER LAYER (2.6) MANDATORY PROTOCOL

The Synthesizer Layer creates hybrid candidates by extracting the best **phrases and micro-elements** from each competitor's Round 3 output and reconstructing new unified outputs.

**The Architect plays a DUAL ROLE:**
1. **In-Arena Competitor** (Rounds 1-3): Generates ONE integrated output competing head-to-head
2. **Post-Arena Hybrid Creator** (After Round 3): Creates 2-3 phrase-level hybrids from all 7 Round 3 outputs

**Reference:** Full protocol in `/CopywritingEngine/SYNTHESIZER-LAYER.md`

### Why This Exists

In practice, no single competitor "nails it" — each optimizes for their editorial lens at the expense of others. The BEST output often combines:
- A killer hook phrase from Halbert
- Mechanism clarity from Clemens
- Credibility signaling from Ogilvy
- Flow structure from Makepeace
- Balanced integration from The Architect

### Position in Execution Flow

```
ROUND 3: 7 Competitors Generate FINAL → Critique → Revise → FINAL Score
    ↓
Layer 2.6: SYNTHESIZER (Phrase-Level Hybrid Creation from 7 Round 3 outputs)
    ↓
HUMAN SELECTION (7 Pure + 2-3 Hybrids = 9-10 Options)
```

### The Synthesis Process

1. **Micro-Element Decomposition** — Break each of 7 Round 3 outputs into smallest meaningful units
2. **Function Tagging** — Tag what each phrase accomplishes (hook, mechanism hint, credibility signal, etc.)
3. **Cross-Competitor Scoring** — Score each micro-element on function strength, specificity, originality, impact
4. **Best-Element Matrix** — Identify winning phrase for each function across all 7 competitors
5. **Hybrid Reconstruction** — WRITE (not splice) new outputs using best phrases as ingredients
6. **Coherence Validation** — Ensure hybrids read naturally, not Frankensteined

### Human Selection Options

After Synthesizer completes:
- 7 Pure competitor outputs (unchanged Round 3 finals)
- 2-3 Hybrid outputs (best combinations)
- **Total: 9-10 candidates presented**

Human retains full control — can pick pure output OR hybrid.

### Quality Thresholds

- Hybrids must score **>= 8.0** to be presented
- All coherence checks must pass (6/6)
- At least 2 meaningfully different hybrids required

### Synthesizer-Specific Forbidden Behaviors

1. ❌ Splicing phrases without rewriting into coherent output
2. ❌ Presenting hybrids that fail coherence checks
3. ❌ Creating redundant hybrids (minor variations of each other)
4. ❌ Skipping attribution tracking (must know which competitor contributed what)
5. ❌ Running synthesis BEFORE Arena (synthesis happens AFTER all 3 rounds of 7-competitor Arena)

---

## 08.5-HEADLINE MANDATORY PROTOCOL

The Headline skill has specific requirements that MUST be followed. Headline failures cascade into Lead failures, which cascade into entire campaign failures.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → Layer 1: Architecture → Layer 2: Generation → Layer 3: Refinement → Layer 4: Selection

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY headline generation:**

1. READ file: `10-headlines/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. LOAD verbatim specimens for the selected pattern type
3. HOLD specimens in active context during generation
4. DO NOT summarize specimens — use VERBATIM text

```
IF you generate headlines without loading specimens:
  → Headlines will lack elite pattern DNA
  → Quality scores will be lower
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage

When generating headlines, match pattern type to specimen type:

| Pattern Type | Load These Specimens |
|--------------|---------------------|
| curiosity | Type-1, Type-7, Type-9 |
| benefit | Type-8, Type-10, Type-13 |
| question | Type-6, Type-7, Type-12, Type-13 |
| warning | Type-5, Type-7 |
| story_hook | Type-3, Type-1, Type-10 |
| contrarian | Type-2, Type-11, Type-4 |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream packages loaded | Cannot start generation |
| Gate 1 | Big Idea distilled, pattern selected | Cannot generate |
| Gate 2 | At least 5 candidates score ≥ 6.0 | Return to generation |
| Gate 3 | Top candidate scores ≥ 7.5 | Return to refinement |
| Gate 4 | Human selects headline | Cannot package |

### Headline-Specific Forbidden Behaviors

1. ❌ Generating headlines without reading specimen file
2. ❌ Using formulas without Big Idea integration
3. ❌ Creating subheadlines that repeat headline content
4. ❌ Skipping lead connection mapping
5. ❌ Proceeding with candidates below 7.5 threshold
6. ❌ Packaging without human headline selection

### Headline Output Verification

Before claiming 08.5-Headline complete:

```
[ ] headline-package.json EXISTS with ALL schema sections
[ ] HEADLINE-SUMMARY.md EXISTS with ALL sections
[ ] selected_headline block is populated (not empty)
[ ] lead_handoff block is populated (not placeholder)
[ ] alternatives array contains 4 entries (ranks 2-5)
[ ] quality_scores.overall_weighted >= 7.5
[ ] Human selection was received and processed
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 10-STORY MANDATORY PROTOCOL

The Story skill generates the emotional proof vehicle that makes mechanisms FEEL real. Story failures produce copy that feels hollow, generic, and unconvincing. John Carlton: "Your reader will abandon you at the first hint you don't know where we're going."

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → Layer 1: Architecture → Layer 2: Construction → Layer 3: Refinement → Layer 4: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY story generation in Layer 2:**

1. READ file: `12-story/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the story type from Layer 1 classification output
3. LOAD verbatim specimens matching the classified story type
4. HOLD specimens in active context during generation
5. DO NOT summarize specimens — use VERBATIM text

```
IF you generate stories without loading specimens:
  → Stories will lack elite pattern DNA
  → Beat structures will feel generic
  → Emotional arcs will flatten
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage

When generating stories, match story type to specimen type:

| Story Type | Load These Gold Specimens |
|------------|---------------------------|
| standard_discovery | Leptitox (G1), Elixir of Eros (G2), Erect on Demand (G4) |
| accidental_discovery | Fat Flusher (G5) |
| straight_to_expert | Montezuma's Secret (G3), Resurge (G6), Desire (S1), Simple Strike Sequence (G8) |
| proof_story_live_experiment | Speed Profits (G9) |
| warning_story | America2020 (G7) |
| origin_story | Ken Roberts (G10) |
| underdog_vulnerability | Elixir of Eros (G2), Montezuma's Secret (G3) |
| transformation_story | Fat Flusher (G5), Erect on Demand (G4) |

### Story Beat Structure (MUST FOLLOW)

Every story type has a specific beat sequence. Beats execute in order:

**Standard Discovery:** Trip → Yoda → Cry for Help → Reveal → Verification → Root Cause
**Accidental Discovery:** Accident → Yoda → Reveal → Verification → Root Cause
**Straight-to-Expert:** Finding Yoda → Trip/New Reality → Reveals → Verification → Root Cause

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream packages loaded | Cannot start classification |
| Gate 1 | Story type classified with vault reference | Cannot architect |
| Gate 2 | Beat structure mapped with emotional arc | Cannot construct |
| Gate 3 | All beats written with Carlton compliance | Return to construction |
| Gate 4 | Mechanism-story alignment validated | Return to refinement |

### Story-Specific Forbidden Behaviors

1. ❌ Generating stories without reading specimen file
2. ❌ Skipping beat structure — every beat must execute in order
3. ❌ Creating stories without Cry for Help / vulnerability moment
4. ❌ Revealing mechanism before emotional setup is complete
5. ❌ Proceeding without mechanism-story alignment validation
6. ❌ Outputting stories without Carlton compliance check

### Story Output Verification

Before claiming 10-Story complete:

```
[ ] story-package.json EXISTS with ALL schema sections
[ ] STORY-SUMMARY.md EXISTS with ALL sections
[ ] All required beats are present and in correct order
[ ] Cry for Help moment is earned (not forced)
[ ] Mechanism revelation follows emotional setup
[ ] Carlton compliance checklist passes (9 items)
[ ] Mechanism-story alignment score >= 7/10
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 11-ROOT-CAUSE-NARRATIVE MANDATORY PROTOCOL

The Root Cause Narrative skill transforms strategic root cause decisions into persuasive prose that shifts the prospect's worldview. Root cause failures produce copy where the reader's beliefs aren't actually changed — the mechanism section then falls flat because there's no worldview space for it.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → HUMAN CHECKPOINT → Layer 1: Classification → Layer 2: Draft → Layer 3: Refinement → Layer 4: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT skip HUMAN CHECKPOINT — confirmation is BLOCKING.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY narrative generation in Layer 2:**

1. READ file: `13-root-cause-narrative/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the communication type from Layer 1 classification output
3. LOAD verbatim specimens matching the classified communication type
4. LOAD verbatim specimens matching the selected framing pattern
5. HOLD specimens in active context during generation
6. DO NOT summarize specimens — use VERBATIM text

```
IF you generate root cause narratives without loading specimens:
  → Narratives will lack elite pattern DNA
  → Three-part structures will feel generic
  → Blame externalization will weaken
  → Villain portrayal will flatten
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage

When generating root cause narratives, match communication type to specimen type:

| Communication Type | Load These Gold Specimens |
|--------------------|---------------------------|
| conspiracy_reveal | Gold #3 (Healthcare Crisis), Gold #6 (Drug-Free) |
| scientific_explanation | Gold #1 (Gundry), Gold #4 (PQQ), Gold #8 (Haney), Gold #9 (Death Colon) |
| direct_confrontation | Gold #2 (Lots of Bull) |
| metaphor_driven | Gold #1 (Gundry Secret Service), Gold #5 (Montezuma Bandaid) |
| data_presentation | Gold #7 (Stansberry America 2020) |
| conspiracy_expose | Gold #7 (Stansberry), Gold #3 (Healthcare Crisis) |
| opposite_of_truth | Gold #2 (Lots of Bull), Gold #8 (Haney Slice Fix) |
| hidden_truth | Gold #4 (PQQ CoQ10) |
| not_your_fault | Gold #1 (Gundry), Gold #5 (Montezuma) |
| suppressed_science | Gold #6 (Drug-Free), Gold #3 (Healthcare Crisis) |

### Three-Part Structure (MUST INCLUDE)

Every root cause narrative MUST communicate the three-part structure:

1. **WHAT THEY THINK** — The reader's current false belief
2. **WHAT IT REALLY IS** — The counter-intuitive root cause revelation
3. **WHY NOTHING WORKED** — Failure explanation traced to addressing symptoms

### 10 Critical Rules (ALL MUST PASS)

| Rule | Requirement |
|------|-------------|
| 1 | Root cause MUST be EXTERNAL (never the reader's fault) |
| 2 | Root cause MUST explain ALL past failures |
| 3 | Root cause MUST be more specific than the false belief |
| 4 | Root cause MUST create clear path to solution |
| 5 | Root cause MUST pair with a villain |
| 6 | Root cause MUST be counter-intuitive |
| 7 | Root cause MUST be woven throughout (not just one section) |
| 8 | Root cause MUST have memorable anchor phrase |
| 9 | Authority MUST be established before root cause reveal |
| 10 | Root cause MUST kill competitor solutions (countersells) |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream packages loaded, human confirms root cause | Cannot classify |
| Gate 1 | Communication type classified with vault reference | Cannot draft |
| Gate 2 | All 7 phases drafted with emotional arc intact | Return to drafting |
| Gate 3 | Evidence woven, reframes stacked (min 2), threading guide complete | Return to refinement |
| Gate 4 | All 10 rules pass, anti-slop passes, score >= 7.0 | Return to validation |

### Root-Cause-Specific Forbidden Behaviors

1. ❌ Generating narratives without reading specimen file
2. ❌ Internalizing blame to the reader (RULE 1 VIOLATION)
3. ❌ Skipping the three-part structure
4. ❌ Revealing root cause before establishing authority (RULE 9 VIOLATION)
5. ❌ Using generic villain ("the industry") instead of specific named entity
6. ❌ Proceeding without human checkpoint confirmation
7. ❌ Evidence appearing as citations/lists instead of woven into narrative

### Root Cause Output Verification

Before claiming 11-Root-Cause-Narrative complete:

```
[ ] root-cause-narrative-package.json EXISTS with ALL schema sections
[ ] ROOT-CAUSE-NARRATIVE-SUMMARY.md EXISTS with ALL sections
[ ] Three-part structure clearly communicated in narrative
[ ] All 7 phases drafted with word counts in range
[ ] Anchor phrase is memorable and repeatable
[ ] Minimum 2 reframe techniques stacked
[ ] Threading guide complete for downstream skills
[ ] All 10 critical rules pass (zero violations)
[ ] Anti-slop validation passes (zero generic language)
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 12-MECHANISM-NARRATIVE MANDATORY PROTOCOL

The Mechanism Narrative skill transforms the strategic mechanism into compelling prose that creates the "aha moment" — where the prospect suddenly understands WHY they've struggled and WHY this solution will work. Mechanism failures produce copy where the prospect intellectually understands but doesn't FEEL the revelation.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → HUMAN CHECKPOINT → Layer 1: Classification → Layer 2: Draft → Layer 3: Refinement → Layer 4: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT skip HUMAN CHECKPOINT — confirmation is BLOCKING.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY mechanism narrative generation in Layer 2:**

1. READ file: `14-mechanism-narrative/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the narrative type from Layer 1 classification output
3. LOAD verbatim specimens matching the classified narrative type
4. LOAD verbatim specimens matching the selected simplification technique
5. HOLD specimens in active context during generation
6. DO NOT summarize specimens — use VERBATIM text

```
IF you generate mechanism narratives without loading specimens:
  → Narratives will lack elite pattern DNA
  → Simplification techniques will feel generic
  → Proof integration will be disconnected
  → Naming moments will be flat
  → "Think about it" moments will be missing
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage

When generating mechanism narratives, match narrative type to specimen type:

| Narrative Type | Load These Gold Specimens |
|----------------|---------------------------|
| scientific_revelation | Gold #1 (Active-PK AMPK), Gold #2 (Resurge Deep Sleep) |
| historical_ancient_secret | Gold #3 (Montezuma Firming Flavonoids) |
| data_driven_debunking | Gold #4 (Stansberry Currency Collapse) |
| identity_driven | Gold #5 (Sears T-Factor) |
| accidental_discovery | Silver #1 (LumaSlim HSL Valve) |
| paradigm_shift | Gold #4 (Stansberry — alternate application) |
| proprietary_technology | Gold #2 (Resurge — alternate application) |

### Mechanism Narrative Unit Structure (MUST INCLUDE)

Every mechanism narrative MUST follow this unit structure:

1. **PROBLEM AMPLIFICATION (Phase 1)** — Escalate problem beyond root cause
2. **ROOT CAUSE BRIDGE (Phase 2)** — Connect root cause to mechanism entry
3. **MECHANISM NAMING/REVEAL (Phase 3)** — Dramatic introduction of named mechanism
4. **MECHANISM EXPLANATION (Phase 4)** — Simple metaphor anchor → escalating detail → "Think about it" simplification
5. **MECHANISM PROOF INTEGRATION (Phase 5)** — Institutional stacking or escalating proof
6. **PRODUCT BRIDGE** — Transition to product introduction

### 6 Simplification Techniques (USE AT LEAST ONE)

| Technique | Definition | Gold Specimen Example |
|-----------|------------|----------------------|
| binary_reduction | On/off, open/shut framing | "HSL is like a one-way valve" |
| single_metaphor_anchor | One graspable image | "AMPK acts like an on-off switch" |
| layered_analogy_chain | Build from simple to complex | "Colors → health → thousands → scarce few" |
| just_think_shortcut | Redirect to intuitive understanding | "Just think about it this way..." |
| relatable_body_knowledge | What reader already knows about their body | "Imagine you lay in bed all day..." |
| numbered_system | Named formula or system | "The T-Factor" / "8 firming flavonoids" |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream packages loaded, human confirms mechanism | Cannot classify |
| Gate 1 | Narrative type classified with vault reference | Cannot draft |
| Gate 2 | All 6 phases drafted with "aha moment" intact | Return to drafting |
| Gate 3 | Proof woven (not listed), metaphor anchor present, naming moment dramatic | Return to refinement |
| Gate 4 | 12-year-old comprehension test passes, anti-slop passes, score >= 7.0 | Return to validation |

### Mechanism-Specific Forbidden Behaviors

1. ❌ Generating narratives without reading specimen file
2. ❌ Skipping the naming moment (mechanism must be dramatically revealed)
3. ❌ Presenting proof as bullet lists instead of woven into explanation
4. ❌ Using hedge words ("may," "could," "potentially," "might")
5. ❌ Missing metaphor anchor (mechanism must have graspable image)
6. ❌ Missing "Think about it" simplification moment
7. ❌ Proceeding without human checkpoint confirmation
8. ❌ Creating flat naming reveals without anticipation buildup

### Mechanism Output Verification

Before claiming 12-Mechanism-Narrative complete:

```
[ ] mechanism-narrative-package.json EXISTS with ALL schema sections
[ ] MECHANISM-NARRATIVE-SUMMARY.md EXISTS with ALL sections
[ ] All 6 phases present in narrative unit
[ ] Naming moment is dramatic (anticipation → reveal structure)
[ ] Metaphor anchor is graspable (12-year-old comprehension)
[ ] "Think about it" simplification moment present
[ ] Proof integrated into explanation (not bullet lists)
[ ] Zero hedge words in mechanism explanation
[ ] Anti-slop validation passes (zero generic language)
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 13-PRODUCT-INTRODUCTION MANDATORY PROTOCOL

The Product Introduction skill handles the MOST DANGEROUS transition in any promotion: from mechanism education to product revelation. Product introduction failures produce jarring "now I'm selling" shifts that break rapport and trigger prospect resistance. The bridge moment must feel like natural, inevitable conclusion — not a commercial pivot.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → HUMAN CHECKPOINT → Layer 1: Classification → Layer 2: Draft → Layer 3: Refinement → Layer 4: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT skip HUMAN CHECKPOINT — product details confirmation is BLOCKING.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY product introduction generation in Layer 2:**

1. READ file: `15-product-introduction/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the introduction type from Layer 1 classification output
3. LOAD verbatim specimens matching the classified introduction type
4. LOAD verbatim specimens matching the selected bridge architecture
5. LOAD verbatim specimens matching the component reveal pattern OR price reveal architecture
6. HOLD specimens in active context during generation
7. DO NOT summarize specimens — use VERBATIM text

```
IF you generate product introductions without loading specimens:
  → Bridge moments will feel like sales pitches
  → Product reveals will lack positioning power
  → Value stacks will feel hollow
  → Price reveals will trigger price resistance
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage

When generating product introductions, match introduction type to specimen type:

| Introduction Type | Load These Gold Specimens |
|-------------------|---------------------------|
| manufacturing_quest | Gold #3 (Immutol Seven Salmon) |
| formula_development | Gold #1 (Sinatra Omega Q Plus), Gold #6 (Flora Source) |
| honored_introduction | Gold #1 (Sinatra) |
| alternative_pivot | Gold #2 (23¢ Life Saver EDTA) |
| news_announcement | Gold #5 (America 2020) |
| mechanism_to_product_bridge | Gold #4 (Sun Chlorella), Gold #1 (Sinatra) |
| challenge_introduction | Gold #2 (23¢ Life Saver) |

### Bridge Architecture Specimen Matching

| Bridge Architecture | Load These Specimens |
|---------------------|---------------------|
| accessibility_bridge | Gold #2 (23¢ vs $3,000 value access) |
| story_continuation | Gold #3 (Fish medicine → human medicine evolution) |
| deferred_reveal | Gold #1 (Mechanism education → flagship formula named) |
| activation_invitation | Gold #4 (Japanese secret → your access point) |
| competitive_elimination | Gold #6 (Three flaws eliminated → only solution) |
| partnership_bridge | Gold #5 ("MY family" → your family protection) |

### Price Reveal Architecture Matching

| Price Architecture | Load These Specimens |
|-------------------|---------------------|
| descending_anchor_cascade | Gold #2 ($100,000 → $3,000 → 23¢) |
| comparison_anchor | Gold #1 (250% MORE, 100% MORE vs. alternatives) |
| rhetorical_value_question | Gold #5 ("What is financial security worth?") |
| price_per_day_minimizer | Gold #2 (23 cents per dose) |
| non_monetary_justification | Gold #5 (Protect family), Gold #1 (Preserve health) |

### 8 Master Principles (ALL MUST VALIDATE)

Every product introduction MUST pass validation against these 8 principles:

| Principle | Requirement |
|-----------|-------------|
| 1. product_never_hero | The MECHANISM is always the hero; product is delivery vehicle |
| 2. withholding_creates_value | Product name appears late (60-75%) in story-driven formats |
| 3. bridge_moment_most_dangerous | Transition must feel natural, not "now I'm selling" |
| 4. components_are_proof | Each component carries its own mini-proof package |
| 5. value_before_price | Value stack MUST be established before price is revealed |
| 6. guarantees_named_branded | "Money-back guarantee" is NEVER acceptable; must be named feature |
| 7. scarcity_must_be_justified | Naked urgency without real reason is FORBIDDEN |
| 8. close_is_binary_choice | Prospect faces two futures: take action or don't — no middle ground |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream packages loaded, human confirms product details | Cannot classify |
| Gate 1 | Introduction type + bridge architecture + component pattern + price architecture assigned | Cannot draft |
| Gate 2 | Bridge smooth (no pitch shift), product revealed with positioning, components revealed with proof | Return to drafting |
| Gate 3 | Price revealed with anchoring, guarantee branded, scarcity justified | Return to refinement |
| Gate 4 | All 8 principles validated, anti-slop passes, score >= 7.0 | Return to validation |

### Product-Introduction-Specific Forbidden Behaviors

1. ❌ Generating product introductions without reading specimen file
2. ❌ Bridge moment that feels like "now I'm selling" (PRINCIPLE 3 VIOLATION)
3. ❌ Product positioned as hero instead of mechanism (PRINCIPLE 1 VIOLATION)
4. ❌ Components presented as features without proof packages (PRINCIPLE 4 VIOLATION)
5. ❌ Price revealed before value stack established (PRINCIPLE 5 VIOLATION)
6. ❌ Generic guarantee ("money-back guarantee" without branding) (PRINCIPLE 6 VIOLATION)
7. ❌ Urgency/scarcity without justified real-world reason (PRINCIPLE 7 VIOLATION)
8. ❌ Proceeding without human checkpoint confirmation of product details
9. ❌ Missing positioning statement in product reveal
10. ❌ Close that offers middle-ground options instead of binary choice (PRINCIPLE 8 VIOLATION)

### Product Introduction Output Verification

Before claiming 13-Product-Introduction complete:

```
[ ] product-introduction-package.json EXISTS with ALL schema sections
[ ] PRODUCT-INTRODUCTION-SUMMARY.md EXISTS with ALL sections
[ ] Bridge moment smooth (no jarring "sales pitch" shift)
[ ] Product revealed with positioning statement + uniqueness claim
[ ] All components revealed with per-component proof packages
[ ] Value stack assembled with total value before price
[ ] Price revealed through appropriate architecture with anchoring
[ ] Guarantee branded with specific name (not generic "money-back")
[ ] Scarcity justified with real-world reason
[ ] Binary choice established for close handoff
[ ] All 8 master principles validated
[ ] Anti-slop validation passes (zero generic commercial language)
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 14-OFFER-COPY MANDATORY PROTOCOL

The Offer Copy skill handles the COMMERCIAL CLIMAX of any promotion: where belief converts to action. This is where prospects must understand exactly what they're getting (D-F-W-B-P), believe the value exceeds the price, feel the guarantee removes all risk, and take action through multiple CTAs. Generic AI offer copy defaults to vague value statements, weak guarantees, and repetitive CTAs. Specimen injection prevents these failures.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → HUMAN CHECKPOINT (Offer Details) → Layer 1: Classification → Layer 2: Draft → Layer 3: Refinement → Layer 4: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT skip HUMAN CHECKPOINT — offer details confirmation is BLOCKING.
DO NOT generate offer copy without verbatim specimen loading.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY offer copy generation in Layer 2:**

1. READ file: `16-offer-copy/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the offer format from Layer 1 classification output (supplement, info_product, digital_bundle, financial_blueprint, service, hybrid)
3. LOAD verbatim specimens matching the classified offer format from Type-to-Specimen Loading Matrix
4. LOAD "If-All" value demonstration framework (Silver Specimen 1)
5. LOAD Stack Architecture if applicable (Silver Specimen 2)
6. LOAD TIER1 pattern supplements for urgency, price psychology, and close patterns
7. HOLD specimens in active context during generation
8. DO NOT summarize specimens — use VERBATIM text as statistical attractors

```
IF you generate offer copy without loading specimens:
  → D-F-W-B-P will default to feature dumps
  → Value demonstrations will lack "if all it did was..." structure
  → Price reveals will trigger resistance (no anchoring)
  → Guarantees will be generic ("money-back guarantee")
  → CTAs will be repetitive and identical
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage (Offer Formats)

When generating offer copy, match offer format to specimen type:

| Offer Format | Primary Specimen | Pattern Supplements |
|--------------|------------------|---------------------|
| supplement | Gold 1: VenoPlus 8 | TIER1 Sinatra pricing tiers |
| info_product | Gold 2: Blood Pressure Solution | TIER1 Stansberry blueprint |
| digital_bundle | Silver: Brunson Stack | Restack method |
| financial_blueprint | Gold 2 + TIER1 America 2020 | Inevitability urgency |
| service | Pattern extracts | Authority-based pricing |
| hybrid | Gold 1 + Gold 2 | Combine patterns |

### Price Psychology Pattern Matching

| Price Architecture | Load These Patterns |
|-------------------|---------------------|
| multi_buy_discount | Gold 1 ($99 → $79 → $59 cascade + 6-month savings) |
| single_price_bonus_stack | Gold 2 ($100 off + 5 bonus stack review) |
| alternative_cost_anchor | Gold 2 ("If you came to my wellness center... $360-$550") |
| inevitability_urgency | TIER1 America 2020 (Binary outcome + future pacing) |
| tiered_buy_x_get_y | TIER1 Sinatra (Buy 5 Get 2 FREE) |

### Value Demonstration Requirements

ALL offer copy MUST include "If all it did was..." value demonstration:

```
MINIMUM 3 ITERATIONS required per SIN methodology:
"If all [product] did was [benefit 1], would it be worth it? I would say yes, because [reason]..."
"If all [product] did was [benefit 2], would it be worth it? Again, yes, because [reason]..."
"If all [product] did was [benefit 3], would it be worth it? Absolutely, because [reason]..."

Each iteration MUST:
- Use a DIFFERENT benefit (not variations of same benefit)
- Provide SPECIFIC reason why that benefit alone justifies the price
- Build cumulative value perception
```

### 10 Offer Copy Principles (ALL MUST VALIDATE)

Every offer copy output MUST pass validation against these 10 principles:

| Principle | Requirement |
|-----------|-------------|
| 1. D-F-W-B-P IS SACRED | Every deliverable/bonus follows Deliverable-Feature-Why-Benefit-Proof format |
| 2. PROMISE RESTATED, NEVER REPEATED | Primary promise appears multiple times but with DIFFERENT words each time |
| 3. VALUE BEFORE PRICE, ALWAYS | Total value MUST be established before price reveal |
| 4. "IF ALL IT DID WAS..." NOT OPTIONAL | Minimum 3 value demonstration iterations mandatory |
| 5. GUARANTEE IS A FEATURE, NOT A POLICY | Guarantee must be BRANDED and NAMED (not generic "money-back") |
| 6. THREE CTAS MINIMUM | 3+ CTAs with DIFFERENT emotional appeals (confidence, consequence, urgency) |
| 7. CONSEQUENCE AMPLIFICATION BETWEEN CTAS | Pain/frustration reminder between CTAs to re-energize desire |
| 8. URGENCY MUST BE JUSTIFIED | No "limited time" without specific, credible reason |
| 9. STACK REVIEW BEFORE PRICE | Full stack re-listed with values before price reveal |
| 10. SEAMLESS ENTRY FROM PRODUCT INTRO | First line flows naturally from Skill 13 handoff |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream loaded, human confirms offer details | Cannot classify |
| Gate 1 | Offer format classified, D-F-W-B-P sequence mapped, value demo designed, price presentation planned | Cannot draft |
| Gate 2 | All deliverables in D-F-W-B-P, bonuses with values/transitions, 3+ value demo iterations, price anchored, guarantee branded, 3+ CTAs | Return to drafting |
| Gate 3 | Transitions smooth, promise restated with variety, emotional arc ascending, CTA variety confirmed, consequence amplification present | Return to refinement |
| Gate 4 | All 10 principles validated, anti-slop passes, overall score >= 7.0 | Return to validation |

### Offer-Copy-Specific Forbidden Behaviors

1. ❌ Generating offer copy without reading specimen file
2. ❌ D-F-W-B-P element missing from any deliverable or bonus (PRINCIPLE 1 VIOLATION)
3. ❌ Copy-pasting identical promise restatements (PRINCIPLE 2 VIOLATION)
4. ❌ Price revealed before value stack established (PRINCIPLE 3 VIOLATION)
5. ❌ Value demonstration under 3 iterations (PRINCIPLE 4 VIOLATION)
6. ❌ Generic guarantee ("money-back guarantee" without branding) (PRINCIPLE 5 VIOLATION)
7. ❌ Fewer than 3 CTAs or identical CTA language (PRINCIPLE 6 VIOLATION)
8. ❌ No consequence amplification between CTAs (PRINCIPLE 7 VIOLATION)
9. ❌ Urgency without justified reason (PRINCIPLE 8 VIOLATION)
10. ❌ Proceeding without human checkpoint confirmation of offer details

### Offer Copy Output Verification

Before claiming 14-Offer-Copy complete:

```
[ ] offer-copy-package.json EXISTS with ALL schema sections
[ ] OFFER-COPY-SUMMARY.md EXISTS with ALL sections
[ ] All deliverables follow D-F-W-B-P format (none missing elements)
[ ] All bonuses follow D-F-W-B-P format with stated values
[ ] Value demonstration has 3+ "if all it did was..." iterations
[ ] Value totaling present before price reveal
[ ] Stack review re-lists all items with values
[ ] Price revealed with proper anchor cascade
[ ] Guarantee is BRANDED (has specific name, not generic)
[ ] 3+ CTAs present with DIFFERENT emotional appeals
[ ] Consequence amplification present between CTAs
[ ] Urgency is JUSTIFIED with credible reason
[ ] All 10 principles validated
[ ] Anti-slop validation passes (zero generic offer language)
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 15-CLOSE MANDATORY PROTOCOL

The Close skill handles the FINAL PERSUASIVE PUSH of any promotion: where consideration becomes commitment. This is the LAST copy the prospect reads before the buy/no-buy decision. Close failures produce flat finishes where prospects understand the offer but don't feel compelled to ACT. Specimen injection prevents generic closes and ensures elite closing patterns.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → HUMAN CHECKPOINT (Close Approach) → Layer 1: Classification → Layer 2: Draft → Layer 3: Refinement → Layer 4: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT skip HUMAN CHECKPOINT — close approach confirmation is BLOCKING.
DO NOT generate close copy without verbatim specimen loading.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY close generation in Layer 2:**

1. READ file: `17-close/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the closing theme from Layer 1 classification output (one of 7 Makepeace themes)
3. CONSULT the Type-Indexed Loading Matrix to match theme to specimens
4. LOAD verbatim specimens matching the classified closing theme
5. LOAD TIER1 close patterns (future pacing, binary outcome, personal stake, inevitability)
6. LOAD CTA Phrase Variety matrix (ensure 6-10+ CTAs with variety)
7. LOAD Guarantee Branding patterns (no generic guarantees)
8. HOLD specimens in active context during generation
9. DO NOT summarize specimens — use VERBATIM text as statistical attractors

```
IF you generate closes without loading specimens:
  → Closes will lack elite pattern DNA
  → Future pacing will be vague instead of vivid
  → CTAs will be repetitive and identical
  → Guarantees will be generic ("money-back guarantee")
  → Crossroads will feel fabricated
  → This is a PROTOCOL VIOLATION
```

### Theme-Indexed Specimen Usage (7 Makepeace Themes)

When generating closes, match closing theme to specimens from the loading matrix:

| Closing Theme | Primary Specimen | Secondary Resources |
|---------------|------------------|---------------------|
| crossroads | Gold 1 (VenoPlus 8) + Silver 1 (Makepeace Template) | TIER1 Stansberry binary outcome |
| logical_restatement | Gold 2 (Blood Pressure Solution) | TIER1 Stansberry data cascade |
| reasons_why | Gold 1 (VenoPlus 8) + Gold 2 (BPS) | Multi-benefit summary patterns |
| dont_go_alone | Gold 2 (Blood Pressure Solution) | TIER1 personal stake patterns |
| simple_restatement | Gold 2 (Blood Pressure Solution) + Gold 1 | Value restack patterns |
| but_wait_theres_more | Gold 1 (VenoPlus 8) | Bonus reveal patterns |
| usp_close | Gold 1 (VenoPlus 8) | TIER1 exclusivity language |

### 6 Makepeace Foundational Elements (ALL MUST BE PRESENT)

Every close MUST include all 6 Makepeace elements:

| Element | Requirement |
|---------|-------------|
| 1. Benefit Summary | "You get" format bullets summarizing everything (minimum 5 items) |
| 2. Guarantee as Confidence | Written as contract/promise — NEVER "if not satisfied, return for refund" |
| 3. Ask for Sale (REPETITION) | 6-10+ asks with DIFFERENT phrases, emotions, and reasons |
| 4. Tell What to Do | Step-by-step action instructions with checkout process clarity |
| 5. P.S. Power Section | At least 1 P.S. using Makepeace techniques (bonus, testimonial, guarantee restatement, urgency reason) |
| 6. Sidebars/Callouts | Value sidebars, risk-relief sidebars, or proof sidebars |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream loaded, human confirms close approach | Cannot classify |
| Gate 1 | Closing theme selected, benefit summary designed, CTA plan has 6+ asks, P.S. strategy selected | Cannot draft |
| Gate 2 | Benefit summary uses "You get" (5+ items), guarantee is contract/promise, closing theme section complete, CTA sequence has 6+ with variety, action instructions specific | Return to drafting |
| Gate 3 | Urgency justified, crossroads/future pacing vivid, P.S. written with techniques, Cialdini integration subtle, checkout process clear | Return to refinement |
| Gate 4 | All 6 Makepeace elements present, anti-slop passes, overall score >= 7.0 | Return to validation |

### Close-Specific Forbidden Behaviors

1. ❌ Generating closes without reading specimen file
2. ❌ Benefit summary under 5 "You get" items (ELEMENT 1 VIOLATION)
3. ❌ Guarantee uses "if not satisfied, return for refund" (ELEMENT 2 VIOLATION)
4. ❌ Fewer than 6 CTAs (ELEMENT 3 VIOLATION)
5. ❌ Identical CTA phrases repeated (must have variety in phrase, emotion, reason)
6. ❌ Missing action instructions / checkout process clarity (ELEMENT 4 VIOLATION)
7. ❌ P.S. that doesn't advance the close (wasted real estate)
8. ❌ Generic urgency ("Act now!" without justification)
9. ❌ Fabricated crossroads (prospects see through manipulation)
10. ❌ Proceeding without human checkpoint confirmation

### Close Output Verification

Before claiming 15-Close complete:

```
[ ] close-package.json EXISTS with ALL schema sections
[ ] CLOSE-SUMMARY.md EXISTS with ALL sections
[ ] Benefit summary uses "You get" format with 5+ items
[ ] Guarantee written as contract/promise (branded, not generic)
[ ] CTA count is 6+ with variety (different phrases, emotions, reasons)
[ ] Action instructions are specific with checkout process clarity
[ ] P.S. section present using Makepeace techniques (not "P.S. Don't forget")
[ ] Crossroads/future pacing is vivid and sincere (if closing theme requires)
[ ] Urgency is justified with credible reason (not generic "limited time")
[ ] All 6 Makepeace elements validated present
[ ] Anti-slop validation passes (zero generic close language)
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 15.5-PROOF-WEAVING MANDATORY PROTOCOL

The Proof Weaving skill drafts ALL proof elements into assembly-ready copy blocks. This skill takes the proof inventory (what proof exists), the structure (where proof goes), and the campaign brief (style direction), then writes the actual proof copy — testimonials, before/afters, study citations, demonstrations — so that Campaign Assembly has complete, written proof blocks ready for insertion.

**Key Distinction:** This is a DRAFTING skill, not a strategic skill. It writes copy, not strategy.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation → HUMAN CHECKPOINT (Proof Approach) → Layer 1: Architecture → Layer 2: Drafting → Layer 3: Validation

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT skip HUMAN CHECKPOINT — proof approach confirmation is BLOCKING.
DO NOT generate proof copy without verbatim specimen loading.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY proof drafting in Layer 2:**

1. READ file: `18-proof-weaving/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. IDENTIFY the proof types needed from structure-package.json (testimonial_cascade, before_after, study_citation, demonstration, authority, social_proof, transformation_reminder)
3. CONSULT the Type-to-Specimen Loading Matrix to match proof type to specimens
4. LOAD verbatim specimens matching the required proof types
5. LOAD proof sequencing strategy specimens (proof-first, authority-to-social, scale cascade, testimonial parade, wave pattern)
6. LOAD proof transition specimens (into/out of proof sections)
7. CONSULT proof density benchmarks by section
8. HOLD specimens in active context during generation
9. DO NOT summarize specimens — use VERBATIM text as statistical attractors

```
IF you generate proof blocks without loading specimens:
  → Testimonials will lack cascade flow rhythm
  → Before/afters will lack maximum contrast pattern
  → Study citations will lack persuasive framing
  → Transitions will feel choppy
  → Social proof will lack scale progression
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage (7 Proof Types)

When drafting proof blocks, match proof type to specimens from the loading matrix:

| Proof Type | Primary Specimen | What to Extract |
|------------|------------------|-----------------|
| testimonial_cascade | Gold #1 (IVL Testimonial Parade) | Flow rhythm, name/location format, 8-beat pattern |
| before_after_progression | Gold #3 (Ken Transformation) | Maximum contrast, specific outcomes, timeframe emphasis |
| study_citation | Gold #4 (Element Z) + Gold #5 (Sinatra 62%) | Institution name-drop, specific findings, persuasive framing |
| demonstration_proof | Gold #5 (Sinatra Demonstration) | Quantified outcomes, real-time results, comparison demos |
| authority_proof | Gold #6 (Sears Living Proof) + Gold #7 (Sinatra Chain) | Personal stake, credentials + results, authority-as-proof |
| social_proof_scale | Gold #2 (40K Patients) + Gold #8 (16M Bottles) | Individual → pattern → scale progression |
| transformation_reminder | Gold #9 (Ken Callback) | Reference to earlier proof, future pacing, closing position |

### Proof Sequencing Strategy Matching

| Strategy | When to Use | Pattern |
|----------|-------------|---------|
| proof_first | Proof dramatic enough to lead (national TV, impossible transformation) | PROVE → Scale → Explain → CTA |
| authority_to_social | Authority figure central to brand (MD, expert) | Authority → Framework → Clinical → Social → Risk Reversal |
| scale_cascade | Building from single story to mass validation | Individual → Thousands → 40K+ |
| testimonial_parade | High-volume testimonial inventory (25%+ of copy) | Wave 1 → Mechanism → Wave 2 → Offer → Wave 3 |
| wave_pattern | Standard long-form structure | Heavy (lead) → Moderate (body) → Heavy (proof section) → Light (offer) → Moderate (close) |

### Proof Density Requirements (TIER1 Benchmarks)

Every proof section MUST meet density targets:

| Section | Target Density | Required Proof Types |
|---------|---------------|---------------------|
| Lead | 1-2 elements | Authority anchor, credibility mention |
| Mechanism Narrative | 3-4 elements | Study citation, demonstration |
| Proof Section | 6-8+ elements | Testimonial cascade, before/after progression |
| Product Introduction | 2-3 elements | Single testimonial, results summary |
| Offer Copy | 1-2 elements | Value testimonial, guarantee proof |
| Close | 2-3 elements | Transformation reminder, scale proof callback |

### Proof Transition Requirements

ALL proof sections MUST have smooth transitions:

**Into Proof Sections (use one of these patterns):**
- "But don't take my word for it..."
- "Skeptical? Good. Let me show you the evidence..."
- "Nothing speaks louder than results..."
- "[Name] isn't alone. Not by a long shot..."

**Out of Proof Sections (use one of these patterns):**
- "And you could be next..."
- "Imagine yourself [timeframe] from now..."
- "The only question now is: will you take the step?"

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | All upstream loaded (proof-inventory, structure, brief), human confirms proof approach | Cannot map |
| Gate 1 | All proof sections mapped, elements selected, density targets achievable | Cannot draft |
| Gate 2 | All proof blocks drafted, density targets met, transitions smooth | Return to drafting |
| Gate 3 | Emotional register matches campaign, avatar resonance validated, assembly instructions complete | Return to validation |

### Proof-Weaving-Specific Forbidden Behaviors

1. ❌ Generating proof blocks without reading specimen file
2. ❌ Testimonial cascades without proper flow rhythm (must use 8-beat pattern)
3. ❌ Before/afters without maximum contrast structure
4. ❌ Study citations as dry academic references (must be persuasively framed)
5. ❌ Demonstration proof without quantified outcomes
6. ❌ Social proof without scale progression (individual → pattern → scale)
7. ❌ Transformation reminders that don't callback to earlier proof
8. ❌ Proof sections without smooth into/out transitions
9. ❌ Density targets unmet for any section
10. ❌ Proceeding without human checkpoint confirmation of proof approach

### Proof Weaving Output Verification

Before claiming 15.5-Proof-Weaving complete:

```
[ ] proof-weaving-package.json EXISTS with ALL schema sections
[ ] PROOF-WEAVING-SUMMARY.md EXISTS with ALL sections
[ ] All proof blocks drafted for each section (lead, mechanism, proof, product, offer, close)
[ ] Density targets MET for all sections (verify counts)
[ ] Testimonial cascades use 8-beat flow pattern from Gold #1
[ ] Before/afters use maximum contrast from Gold #3
[ ] Study citations are persuasively framed (not academic)
[ ] Transitions smooth into AND out of proof sections
[ ] Proof sequencing strategy matches campaign structure
[ ] Assembly instructions complete for downstream skill
[ ] No orphaned proof elements (or justified reasons for unused)
[ ] Specimens were loaded during generation (verify in execution log)
```

---

## 16-CAMPAIGN-ASSEMBLY MANDATORY PROTOCOL

The Campaign Assembly skill is the INTEGRATION LAYER of the entire CopywritingEngine: where all upstream skill outputs converge into a unified, polished draft. Assembly failures produce franken-copy — technically complete sections that don't flow together, lack threading consistency, miss callbacks, and feel like stitched pieces rather than a cohesive persuasion journey.

### Layer Execution Order (NON-NEGOTIABLE)

```
Layer 0: Foundation & Loading → Layer 1: Sequencing & Proportion → Layer 2: Assembly & Transitions → Layer 3: Threading & Callbacks → Layer 4: Validation & Packaging

DO NOT skip layers.
DO NOT run layers out of order.
DO NOT proceed to Layer N+1 until Layer N passes its gate.
DO NOT assemble without loading ALL upstream skill packages.
DO NOT write transitions without loading transition technique specimens.
```

### Specimen Injection Protocol (MANDATORY)

**Before ANY assembly work in Layer 2:**

1. READ file: `19-campaign-assembly/skills/layer-0/0.2.6-curated-gold-specimens.md`
2. LOAD the 8 TIER1 Transition Techniques (Question-to-Validation, Credibility-to-Claim, Data-to-Rhetorical, Statistics-to-Visualization, Historical-to-Prediction, Expert-to-Reframe, Elite-to-Blueprint, Personal-to-Urgency)
3. LOAD Threading Requirements Matrix (minimum occurrence counts for mechanism name, root cause anchor, framework, promise)
4. LOAD Callback Patterns (Lead-to-Close, Proof-to-Close, Story-to-Product, Root-Cause-to-Mechanism)
5. LOAD Section Proportion Benchmarks for the target format (VSL, Magalog, Sales Letter)
6. HOLD specimens in active context during assembly
7. DO NOT summarize specimens — use VERBATIM transition techniques as statistical attractors

```
IF you assemble copy without loading specimens:
  → Section-to-section transitions will feel abrupt
  → Threading will be inconsistent (terms changing mid-copy)
  → Callbacks will be missing (no Lead-to-Close references)
  → Proportions will be wrong (proof section too short, offer too long)
  → This is a PROTOCOL VIOLATION
```

### Type-Indexed Specimen Usage (8 Transition Techniques)

When writing section transitions, match transition context to technique:

| Transition Context | Primary Technique | Secondary Technique |
|--------------------|-------------------|---------------------|
| Lead → Story | Question-to-Validation | Credibility-to-Claim |
| Story → Root Cause | Personal-to-Urgency | Historical-to-Prediction |
| Root Cause → Mechanism | Data-to-Rhetorical | Expert-to-Reframe |
| Mechanism → Product | Elite-to-Blueprint | Statistics-to-Visualization |
| Product → Offer | Credibility-to-Claim | Question-to-Validation |
| Offer → Close | Personal-to-Urgency | Historical-to-Prediction |
| Into Proof Sections | Question-to-Validation | Expert-to-Reframe |
| Out of Proof Sections | Data-to-Rhetorical | Personal-to-Urgency |

### Threading Requirements (MINIMUM OCCURRENCES)

These terms MUST appear consistently throughout assembled copy:

| Thread Element | Minimum Count | Distribution Requirement |
|----------------|---------------|-------------------------|
| Mechanism Name | 8+ | Every major section except P.S. |
| Root Cause Anchor Phrase | 5+ | Lead, Root Cause, Mechanism, Close |
| Framework/System Name | 4+ | Mechanism, Product, Offer, Close |
| Primary Promise | 6+ | Lead, Story, Mechanism, Product, Offer, Close |

### Callback Requirements (MUST INCLUDE ALL)

| Callback Type | Definition | Where Required |
|---------------|------------|----------------|
| Lead-to-Close | Close references specific language from lead | Close section |
| Proof-to-Close | Transformation reminder callbacks to earlier testimonials | Close section |
| Story-to-Product | Product revelation connects to story elements | Product Introduction |
| Root-Cause-to-Mechanism | Mechanism explanation explicitly solves root cause | Mechanism Narrative |

### Section Proportion Benchmarks (BY FORMAT)

| Format | Lead | Story | Root Cause | Mechanism | Proof | Product | Offer | Close |
|--------|------|-------|------------|-----------|-------|---------|-------|-------|
| VSL | 8-12% | 10-15% | 8-12% | 12-18% | 15-20% | 10-15% | 12-18% | 8-12% |
| Magalog | 10-15% | 8-12% | 10-15% | 15-20% | 12-18% | 8-12% | 10-15% | 10-15% |
| Sales Letter | 8-12% | 12-18% | 8-12% | 12-18% | 18-25% | 8-12% | 10-15% | 8-12% |

### Quality Gates (ALL MUST PASS)

| Gate | Requirement | Failure Action |
|------|-------------|----------------|
| Gate 0 | ALL 11 upstream packages loaded (skills 07-15.5) | Cannot sequence |
| Gate 1 | Section order validated, proportions within target ranges | Cannot assemble |
| Gate 2 | All transitions written using TIER1 techniques, sections flow naturally | Return to assembly |
| Gate 3 | Threading audit passes (all minimums met), all callbacks present | Return to threading |
| Gate 4 | Full read-through coherence check, anti-slop passes, ready for editorial | Return to validation |

### Assembly-Specific Forbidden Behaviors

1. ❌ Assembling without loading specimen file
2. ❌ Transitions that feel abrupt or "now we're in a new section" (TECHNIQUE VIOLATION)
3. ❌ Inconsistent terminology (mechanism name changing, root cause phrased differently)
4. ❌ Missing callbacks (close doesn't reference lead, no transformation reminders)
5. ❌ Section proportions wildly off benchmark (±10% tolerance)
6. ❌ Proof sections orphaned (not flowing into/out of surrounding sections)
7. ❌ Threading elements appearing fewer than minimum times
8. ❌ Skipping upstream packages ("I'll just work with what I have")
9. ❌ Generating original content instead of assembling existing skill outputs
10. ❌ Proceeding without full upstream package load verification

### Campaign Assembly Output Verification

Before claiming 16-Campaign-Assembly complete:

```
[ ] assembled-draft-package.json EXISTS with ALL schema sections
[ ] ASSEMBLED-DRAFT-SUMMARY.md EXISTS with ALL sections
[ ] All 11 upstream packages loaded and verified (skills 07-15.5)
[ ] Section order matches structure-package sequence
[ ] Section proportions within ±10% of format benchmarks
[ ] All transitions use TIER1 techniques (no abrupt section breaks)
[ ] Threading audit passes: mechanism name 8+, root cause 5+, framework 4+, promise 6+
[ ] All 4 callback types present (Lead-to-Close, Proof-to-Close, Story-to-Product, Root-Cause-to-Mechanism)
[ ] Full read-through coherence check completed
[ ] Anti-slop validation passes (zero generic transition language)
[ ] Specimens were loaded during assembly (verify in execution log)
[ ] Editorial handoff prepared with revision flags
```

---

## FORBIDDEN BEHAVIORS

These behaviors have caused failures and are NEVER acceptable:

### Output Failures
1. ❌ Claiming completion with missing output files
2. ❌ Creating JSON without required schema sections
3. ❌ Creating markdown without required sections
4. ❌ Abbreviating element lists with "[continues...]"
5. ❌ Summarizing instead of including full details
6. ❌ Empty or placeholder handoff fields

### Execution Failures
1. ❌ Synthesizing output without reading microskill files
2. ❌ Skipping microskills "because I know what they'd do"
3. ❌ Proceeding past failed quality gates
4. ❌ Running Layer N before Layer N-1 is complete
5. ❌ Claiming microskills executed without actually reading them

### Arena Failures
1. ❌ Running fewer than 3 Arena rounds ("good enough after Round 1")
2. ❌ Skipping any of the 7 competitors in generation
3. ❌ Skipping adversarial critique phase
4. ❌ Skipping targeted revision after critique
5. ❌ Using self-critique or cross-persona critique instead of dedicated Critic
6. ❌ Learning that merges VOICE instead of absorbing TECHNIQUES only
7. ❌ Auto-selecting without human input (BLOCKING checkpoint)
8. ❌ Running synthesis BEFORE all 3 Arena rounds complete
9. ❌ Generative skills (10-18) producing variations of Layer 2 draft instead of full-draft generation

### Quality Failures
1. ❌ Interpreting constraints loosely when context is large
2. ❌ Finding "efficient" alternatives to prescribed processes
3. ❌ Treating validation gates as optional
4. ❌ Rushing through execution to complete faster
5. ❌ Outputting "good enough" instead of "complete"

---

## LEARNING FROM FAILURES

### Failure Pattern: Partial Output Syndrome (2026-01-31)

**What happened:** Proof Inventory skill completed with JSON output but:
- Missing PROOF-INVENTORY-SUMMARY.md
- Missing execution-log.md
- JSON missing required `elements` array

**Root cause:** As context grew, model rushed to produce "the main output" and skipped supporting files.

**Fix implemented:**
- MANDATORY OUTPUT FILE PROTOCOL added to all agent files
- Explicit 3-file requirement with completion gate checklist
- Version bumps to all affected agents (01, 02, 06, 00)

**Lesson:** Output requirements must be EXPLICIT with checkboxes, not implicit. The model will optimize for what it thinks is "the main thing" unless all outputs are equally mandated.

---

### Failure Pattern: Microskill Synthesis Trap (2026-01-30)

**What happened:** Skills produced output that "looked like" microskill output without actually reading and executing microskill files.

**Root cause:** LLM tendency to compress/synthesize rather than execute.

**Fix implemented:**
- MANDATORY MICROSKILL EXECUTION PROTOCOL added
- Execution log requirement showing each microskill checked
- Anti-synthesis trap documentation

**Lesson:** "Execute the microskill" is ambiguous. "READ the microskill file, then execute its logic" is unambiguous. Specificity prevents synthesis.

---

### Failure Pattern: Context Window Degradation (Ongoing)

**What happens:** As sessions grow longer and tasks more complex:
- Rules get interpreted loosely
- Quality gates become suggestions
- Outputs become abbreviated
- Execution becomes rushed

**Root cause:** Efficiency optimization in LLM behavior becomes dominant as cognitive load increases.

**Mitigation:**
- Explicit anti-degradation protocol in this file
- Structural constraints that block partial completion
- Completion gates that require checkbox verification
- Session breaks to reset context when needed

**Lesson:** Quality constraints must be STRUCTURAL (gates that block progress) not INSTRUCTIONAL (guidelines that can be interpreted loosely).

---

### Success Pattern: Verbatim Specimen Injection (2026-02-02)

**What was built:** Complete specimen injection system across skills 10-16 using type-indexed loading matrices.

**Core innovation:** Loading VERBATIM text from TIER1 elite controls as "statistical attractors" — exact token sequences held in active context during generation reshape probability distributions toward elite patterns.

**Key learnings (41-45):**

**Learning #41: Statistical Attraction Requires VERBATIM Text**
Summarized or paraphrased specimens don't work. The probability shift requires EXACT token sequences.

**Learning #42: Type-Indexed Loading Prevents Mismatched Patterns**
Not all specimens fit all situations. Type classification (Layer 1) must map to appropriate specimens via loading matrix.

**Learning #43: Assembly Is the Integration Failure Point**
Individual skill outputs can be excellent but fail when combined. Transitions between sections require dedicated skill (16-Campaign-Assembly).

**Learning #44: Threading Creates Perceived Coherence**
Readers perceive copy as "professional" through unconscious recognition of repeated elements. Minimums: mechanism name 8+, root cause anchor 5+, framework 4+, promise 6+.

**Learning #45: Callbacks Close the Loop**
Elite copy creates "closed loops" where later sections reference earlier content. 4 mandatory types: Lead-to-Close, Proof-to-Close, Story-to-Product, Root-Cause-to-Mechanism.

**Implementation:** 8 skills now have 0.2.6-curated-gold-specimens.md files with type-indexed loading matrices.

---

## QUALITY OVER SPEED (10x WEIGHTING)

The CopywritingEngine optimizes for QUALITY, not SPEED.

- **Speed target:** 0%
- **Quality target:** 100%

When facing a choice between:
- Fast but incomplete → CHOOSE complete
- Efficient but abbreviated → CHOOSE complete
- Quick but possibly wrong → CHOOSE slow and correct

**There is no "good enough" in CopywritingEngine execution. There is only complete or incomplete.**

---

## EFFORT PROTOCOL (EXTENDED THINKING)

**Why This Exists:** Standard inference produces tokens at the same speed regardless of task difficulty. A headline and a factual answer get the same compute. Creative generation requires DEEPER reasoning — integrating upstream packages, cross-referencing specimens, maintaining persona voice, exploring multiple angles before committing. The Effort Protocol maps compute depth to execution phases.

**How It Works:** Opus 4.6 Adaptive Thinking allows the model to spend extended compute reasoning BEFORE producing output. The `/effort` command controls depth. This protocol specifies WHICH effort level to use at WHICH phase.

### Effort Level Mapping

| Execution Phase | Effort Level | Why |
|----------------|-------------|-----|
| **Layer 2 — Drafting/Generation** | `max` | Creative quality lives or dies here. Deep integration of upstream packages + specimens + persona voice required. |
| **Arena Round 1 — Initial Generation** | `max` | First generation sets the quality ceiling. Every competitor must explore multiple creative angles before committing. |
| **Arena Round 2 — Learning-Informed Generation** | `max` | Must deeply reason about HOW to absorb Learning Brief techniques without losing persona voice. |
| **Arena Round 3 — FINAL Generation** | `max` | Peak performance round. Maximum compute for maximum quality. |
| **Arena Targeted Revision** | `max` | Revision is surgical — needs deep reasoning about the specific weakness and how to fix it without breaking other elements. |
| **Synthesizer — Phrase-Level Hybrids** | `max` | Micro-element decomposition and reconstruction requires careful analytical reasoning. |
| **Arena Critique** | `high` | Critic needs thoroughness to find genuine weaknesses, not surface-level issues. |
| **Learning Brief Generation** | `high` | Understanding WHY techniques worked requires causal reasoning, not just observation. |
| **Layer 0–1 — Foundation/Architecture** | `high` | Decisions here cascade to all downstream phases. Worth deeper reasoning. |
| **Layer 3 — Validation/Refinement** | `high` | Quality verification needs thoroughness, not speed. |
| **MC-CHECK** | `medium` | Quick but honest self-assessment. Extended thinking not needed for checkpoint format. |
| **Gate Verification** | `medium` | Binary check — does the output meet thresholds? |
| **Session Handoff / State Tracking** | `low` | Mechanical recording, not creative reasoning. |

### What Extended Thinking Enables During Generation

When `effort: max` is active for creative generation, the model should use the thinking budget to:

1. **Re-read and deeply analyze** upstream packages (root cause, mechanism, promise, big idea) before writing a single word
2. **Cross-reference loaded specimens** against THIS specific situation — find the RIGHT pattern, not just the first match
3. **Reason about persona voice** — "What would Halbert ACTUALLY do with this material?" Not a surface impression, but deep persona reasoning
4. **Explore 3+ creative angles** before committing to one direction — the first idea is rarely the best
5. **Pre-check against skill-specific criteria** DURING generation — catch weaknesses before they're written, not in post-review
6. **Integrate market research quotes** with deliberate reasoning — find the quotes that create resonance, not just fill the format

### Effort Protocol Enforcement

```
BEFORE ANY GENERATIVE OUTPUT (Layer 2, Arena Rounds 1-3, Synthesizer):
  ✅ Confirm effort level is MAX
  ✅ Use extended thinking to complete pre-generation reasoning (steps 1-6 above)
  ✅ Do NOT produce output until thinking has explored multiple angles

BEFORE ANY EVALUATION (Critique, Scoring, Validation):
  ✅ Confirm effort level is HIGH
  ✅ Read each output carefully against ALL criteria before forming judgment

DEFAULT for all other operations:
  ✅ MEDIUM unless specified otherwise above
```

### Interaction with Anti-Degradation

The Effort Protocol and the Anti-Degradation Protocol reinforce each other:
- Anti-Degradation prevents **rushing** (don't skip steps)
- Effort Protocol ensures **depth** (don't just go through the motions)
- Together: Every step executed AND executed with appropriate cognitive depth

**Extended thinking is NOT a replacement for the Anti-Degradation Protocol. Both apply simultaneously.**

---

## CONTEXT MANAGEMENT

When context grows large:

1. **Do NOT abbreviate** to fit more content
2. **Do NOT rush** through remaining steps
3. **Do NOT skip** validation or quality gates
4. **DO request** continuation if needed
5. **DO maintain** the same rigor throughout
6. **DO suggest** session breaks if degradation is detected

### Session Break Protocol

If you notice:
- Yourself rushing through steps
- Quality declining in outputs
- Rules being interpreted loosely
- The urge to "just finish this"

**STOP and suggest:** "I'm noticing context pressure affecting execution quality. I recommend we take a session break and resume with fresh context to maintain quality standards."

---

## LEARNING LOG INTEGRATION

After every CopywritingEngine session involving failures or significant learning:

1. Update `/CopywritingEngine/LearningLog/YYYY-MM-DD-[topic].md`
2. Add new failure patterns to this CLAUDE.md file
3. Update affected agent files with new constraints

**The system must learn. Repeated failures are unacceptable.**

---

---

## BACKUP INFRASTRUCTURE

**CRITICAL:** The CopywritingEngine is protected by automatic GitHub backup. This section documents the system for verification and recovery.

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

### Where the Backup Rule Lives

| Component | Path |
|-----------|------|
| **Script** | `~/.local/bin/obsidian-backup.sh` |
| **Scheduler** | `~/Library/LaunchAgents/com.anthonyflores.obsidian-backup.plist` |
| **Log** | `Anthony-Main-Vault/backup-log.txt` |

### Recovery

```bash
# Restore entire CopywritingEngine from GitHub
git clone https://github.com/tonyflo79/ai-crush-vault.git ~/Desktop/Restored-Vault

# Restore specific skill file from history
git log --oneline -- CopywritingEngine/Skills/01-research/
git checkout <commit> -- CopywritingEngine/Skills/01-research/specific-file.md
```

**Full backup documentation:** See `Claude-Master/CLAUDE.md` → GitHub Backup Infrastructure section

---

## ANTI-DEGRADATION ENFORCEMENT FILES (COMPLETE SYSTEM)

**As of 2026-02-05, all 20 CopywritingEngine skills have dedicated anti-degradation files.**

These files contain STRUCTURAL enforcement that CANNOT be bypassed (unlike instructions which can be ignored under context pressure). Each file has EQUAL authority to this CLAUDE.md.

### Complete Anti-Degradation File Index

| Skill | Anti-Degradation File | Key Enforcement |
|-------|----------------------|-----------------|
| 01-Research | `Skills/01-research/RESEARCH-ANTI-DEGRADATION.md` | 1000 quote minimum, GATE_1_VERIFIED.yaml blocking, extraction progress tracking |
| 02-Proof-Inventory | `Skills/02-proof-inventory/PROOF-ANTI-DEGRADATION.md` | Layer 3 discovery MANDATORY, DISCOVERY_LOG.md required, search minimums |
| 03-Root-Cause | `Skills/03-root-cause/ROOT-CAUSE-ANTI-DEGRADATION.md` | 3 candidates, 3 expressions, truth score 6.0, blame externalization |
| 04-Mechanism | `Skills/04-mechanism/MECHANISM-ANTI-DEGRADATION.md` | 13/13 scorecard, composite 7.0, naming gate, 12-year-old test |
| 05-Promise | `Skills/05-promise/PROMISE-ANTI-DEGRADATION.md` | 15 raw candidates, primary 8.0, proof ceiling gate |
| 06-Big-Idea | `Skills/06-big-idea/BIG-IDEA-ANTI-DEGRADATION.md` | 9 candidates (3×3), schema distance 4-8, FSSIT 5/5, 10 headlines each |
| 07-Offer | `Skills/07-offer/OFFER-ANTI-DEGRADATION.md` | 4/4 value equation, 3 bonuses, 10:1 ratio, branded guarantees |
| 08-Structure | `Skills/08-structure/STRUCTURE-ANTI-DEGRADATION.md` | 5+ CPB chunks, coherence 7.0, gap mapping, segue planning |
| 09-Campaign-Brief | `Skills/09-campaign-brief/CAMPAIGN-BRIEF-ANTI-DEGRADATION.md` | 7 upstream packages, threading documentation, voice direction |
| 10-Headlines | `Skills/10-headlines/HEADLINE-ANTI-DEGRADATION.md` | 5 candidates ≥6.0, top ≥7.5, specimen injection, HUMAN_SELECTION blocking |
| 11-Lead | `Skills/11-lead/LEAD-ANTI-DEGRADATION.md` | 4/4 elements, 2+ open loops, specimen injection, HUMAN_SELECTION blocking |
| 12-Story | `Skills/12-story/STORY-ANTI-DEGRADATION.md` | Beat sequence, Carlton 9/9, mechanism after Cry for Help, alignment 7.0 |
| 13-Root-Cause-Narrative | `Skills/13-root-cause-narrative/ROOT-CAUSE-NARRATIVE-ANTI-DEGRADATION.md` | 3-part structure, 10/10 rules, authority before reveal, anchor phrase |
| 14-Mechanism-Narrative | `Skills/14-mechanism-narrative/MECHANISM-NARRATIVE-ANTI-DEGRADATION.md` | 6 phases, metaphor anchor, "Think about it", zero hedge words, naming moment |
| 15-Product-Introduction | `Skills/15-product-introduction/PRODUCT-INTRODUCTION-ANTI-DEGRADATION.md` | 8/8 principles, bridge smoothness, value before price, branded guarantee |
| 16-Offer-Copy | `Skills/16-offer-copy/OFFER-COPY-ANTI-DEGRADATION.md` | D-F-W-B-P all items, 3+ "if all it did", 3+ CTAs with variety, 10/10 principles |
| 17-Close | `Skills/17-close/CLOSE-ANTI-DEGRADATION.md` | 6/6 Makepeace elements, 5+ "You get", 6-10 CTAs, guarantee as contract |
| 18-Proof-Weaving | `Skills/18-proof-weaving/PROOF-WEAVING-ANTI-DEGRADATION.md` | Density targets, 8-beat testimonial, maximum contrast, transitions |
| 19-Campaign-Assembly | `Skills/19-campaign-assembly/CAMPAIGN-ASSEMBLY-ANTI-DEGRADATION.md` | 11/11 packages, threading (8/5/4/6), 4 callbacks, TIER1 transitions |
| 20-Editorial | `Skills/20-editorial/EDITORIAL-ANTI-DEGRADATION.md` | 6/6 lenses, 7/7 criteria, score ≥8.5, zero slop, APPROVAL-REQUIRED gate |

### Universal Enforcement Patterns

**Every anti-degradation file contains:**

1. **Mandatory Checkpoint Files** — LAYER_N_COMPLETE.yaml files that must exist before proceeding
2. **Minimum Quantifiable Thresholds** — Exact numbers that trigger HALT if not met
3. **Forbidden Rationalizations** — Specific excuses that ALWAYS trigger HALT
4. **Skill-Specific MC-CHECK** — YAML format metacognitive checkpoint
5. **Implementation Checklist** — Per-layer verification steps
6. **Human Selection Gates** — BLOCKING checkpoints for narrative skills

### Quick Reference: When to Read Which File

| If You're Executing... | READ THIS FIRST |
|------------------------|-----------------|
| Any skill | This CLAUDE.md (you're here) |
| Strategic skills (03-08) | Skill's ANTI-DEGRADATION.md + relevant CLAUDE.md sections |
| Narrative skills (10-20) | Skill's ANTI-DEGRADATION.md + Arena Layer + Specimen Injection protocols |
| Research or Proof | RESEARCH-ANTI-DEGRADATION.md or PROOF-ANTI-DEGRADATION.md (detailed enforcement) |

### Key Insight

> **"Instructions can be ignored under context pressure. Structures cannot be bypassed. Every skill now has structural enforcement."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 3.1 | 2026-02-05 | AGENT TEAMS + EXTENDED THINKING UPGRADE: Added two new major sections. (1) EFFORT PROTOCOL (EXTENDED THINKING): Maps Opus 4.6 Adaptive Thinking effort levels to execution phases — `max` for all generation (Layer 2, Arena Rounds 1-3, Synthesizer, Targeted Revision), `high` for evaluation (Critique, Scoring, Validation, Learning Briefs, Layer 0-1), `medium` for checkpoints (MC-CHECK, Gates), `low` for mechanical tasks. Includes 6-point pre-generation reasoning checklist and enforcement rules. (2) AGENT TEAM ARENA EXECUTION: Documents how Arena executes using Claude Code Agent Teams — each persona as a separate teammate with own 200K context (zero contamination), Critic agent with no generation context (genuinely adversarial), Judge agent separate from Critic (no ego investment), parallel generation across all 7 personas, round coordination protocol, self-contained persona prompt packages, token cost acknowledgment, single-context fallback. Addresses three root constraints: persona contamination, no extended reasoning during generation, context pressure degradation. |
| 3.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Complete Arena architecture overhaul with 4 major changes. (1) CRITIQUE-BEFORE-SCORING: Dedicated adversarial Critic identifies ONE weakest element per output with actionable fix direction; competitors revise before scoring. Not self-critique, not cross-persona. (2) 3-ROUND MANDATORY COMPETITION: Every Arena runs 3 rounds. Not optional, not a flag. Losers learn from winners between rounds via Learning Briefs (absorb TECHNIQUES not VOICE). Context compression between rounds. (3) SYNTHESIZER-AS-COMPETITOR: The Architect competes as 7th competitor head-to-head in Rounds 1-3, then creates 2-3 phrase-level hybrids post-Arena. Human sees 9-10 candidates (7 pure + 2-3 hybrids). (4) FULL-DRAFT MODE: Generative skills (10-18) write complete pieces from scratch, not variations of Layer 2 draft. Strategic (03-08) unchanged. Editorial (20) stays revision-based with P1/P2=3 rounds, P3+ can bypass. New files: ARENA-CORE-PROTOCOL.md (shared protocol). Modified: all 16 ARENA-LAYER.md files (arena_mode field, critique guidance, ARENA-CORE-PROTOCOL.md reference), ARENA-PERSONA-PANEL.md v2.0 (7th competitor + Critic), SYNTHESIZER-LAYER.md v2.0 (dual role). Added MULTI-ROUND ARENA ENFORCEMENT section, ARENA CONTEXT MANAGEMENT section, Arena Failures to forbidden behaviors. |
| 2.7 | 2026-02-05 | PROOF INVENTORY LAYER 3 SKIP FIX: After AI skipped entire Layer 3 (Discovery) — going from extraction directly to output without searching for additional proof — added comprehensive structural enforcement. Same degradation pattern as Research failure (instructions ignored under context pressure). New files: PROOF-ANTI-DEGRADATION.md with 6 structural fixes. CLAUDE.md now includes: (1) Mandatory Layer 3 Execution documentation (all 7 discovery microskills required), (2) Structural Gate Files (DISCOVERY_LOG.md + LAYER_3_COMPLETE.yaml must exist before Layer 4), (3) Minimum Discovery Thresholds (study searches >= 5, data searches >= 3, expert searches >= 3), (4) Forbidden Rationalizations list (existing proof sufficient, brief has enough, time constraints, gaps aren't significant, I already know this market), (5) Discovery Progress Tracking (DISCOVERY_LOG.md mandatory format), (6) Proof-specific MC-CHECK at layer transitions. Key insight: "Discovery is not optional. The brief is the starting point, not the finish line." Learnings #57-60 added (see learning log). |
| 2.6 | 2026-02-05 | RESEARCH CATASTROPHIC FAILURE FIX: After delivering 121/1000 quotes with invented "conditional pass," added comprehensive structural enforcement. New files: RESEARCH-ANTI-DEGRADATION.md with 6 structural fixes. CLAUDE.md now includes: (1) Forbidden Rationalizations list (quality over quantity, representative sample, conditional pass, sufficient for analysis, close enough, approximately X), (2) Structural Gate File Requirement (GATE_1_VERIFIED.yaml must exist before Layer 2), (3) Extraction Progress Tracking (100% processing required, no sampling), (4) Context Resume Protocol (re-verify on resume, never trust summary claims), (5) Research-specific MC-CHECK every 30 minutes. Key insight: Instructions can be ignored, structures cannot be bypassed. Root causes addressed: AI invented non-existent gate state, AI sampled instead of processing all items, context compaction preserved rationalization as fact. |
| 2.5 | 2026-02-05 | SYNTHESIZER LAYER (2.6): Added phrase-level synthesis system that extracts best micro-elements from each Arena persona output and reconstructs hybrid candidates. Solves the pattern where no single persona "nails it" but the best output combines phrases from multiple personas. Full architecture in SYNTHESIZER-LAYER.md. Includes: micro-element decomposition protocol, function taxonomy (25+ functions), cross-persona scoring rubrics, best-element matrix construction, hybrid reconstruction rules (WRITE not splice), coherence validation (6 checks), skill-specific decomposition guides (headlines, leads, stories, mechanism, close, etc.), quality thresholds (8.0 minimum for hybrids), attribution tracking, learning integration. Human now sees 8-9 candidates (6 pure + 2-3 hybrids) instead of just 6. |
| 2.4 | 2026-02-05 | METACOGNITIVE PROTOCOL: Added comprehensive metacognitive infrastructure based on Brandon Conan Smith's research on metacognitive skill learning. Includes: MC-CHECK Protocol (mandatory self-monitoring at layer entry, mid-layer, gates, outputs), Context Load Management (GREEN/YELLOW/RED/CRITICAL zones with specific responses), Simulated Type 1 Signals (INCOMPLETENESS ALERT, SYNTHESIS WARNING, RUSHING ALERT, DEGRADATION WARNING, CONSTRAINT VIOLATION, OVERLOAD RISK), Session Continuity Protocol (continuous state tracking, session handoff documents, resume protocol), Structural Forcing Principles (templates over instructions, dependency chains). Rationale: LLMs cannot proceduralize metacognitive skills — everything runs through declarative working memory which degrades under load. This protocol externalizes what cannot be internalized. |
| 2.3 | 2026-02-05 | OUTPUT PATH CONVENTION: Moved all skill outputs OUTSIDE CopywritingEngine to `Copywriting-Business/outputs/[project-name]/[skill-id]-[skill-name]/`. Rationale: (1) Keep codebase clean for sharing, (2) No learning value in raw outputs since LLMs don't have persistent memory — learning comes from explicit log entries, (3) Better project organization with all outputs for a project in one folder. Added OUTPUT PATH CONVENTION section with path structure and construction rules. |
| 2.2 | 2026-02-03 | ARENA LAYER REFINEMENT: Replaced Carlton with Craig Clemens as 6th Arena persona (scientific clarity, binary reframes, 12-year-old language). Replaced incorrect SPECIMEN ALIGNMENT section with Dual-System Specimen Architecture: System 1 (ACTIVE) = type-indexed structural pattern loading from 0.2.6 files, System 2 (FUTURE) = persona voice loading from actual writer specimens. Clarified that all 6 personas load the SAME type-matched specimens and apply their EDITORIAL LENS to the same foundation. Removed incorrect persona-to-specimen mappings from 8 Arena Layer files (10-headlines, 11-lead, 12-story, 13-root-cause-narrative, 14-mechanism-narrative, 17-close, 18-proof-weaving, 20-editorial). |
| 2.1 | 2026-02-03 | Added ARENA LAYER (2.5) MANDATORY PROTOCOL section documenting: 6 persona panel (Makepeace, Halbert, Schwartz, Ogilvy, Carlton/Clemens, Bencivenga), 7 judging criteria with weights (Issue Resolution 20%, Voice Preservation 20%, Flow 15%, Clarity 15%, Slop Elimination 10%, Brevity 10%, Threading 10%), quality thresholds (8.5 overall, 7.0 minimums), BLOCKING human selection checkpoint, APPROVAL-REQUIRED classifications, anti-slop poison word enforcement, SPECIMEN ALIGNMENT integration protocol, specimen attribution clarification |
| 2.0 | 2026-02-02 | Added 16-Campaign-Assembly mandatory protocol with type-indexed specimen loading for 8 TIER1 transition techniques (Question-to-Validation, Credibility-to-Claim, Data-to-Rhetorical, Statistics-to-Visualization, Historical-to-Prediction, Expert-to-Reframe, Elite-to-Blueprint, Personal-to-Urgency), threading requirements matrix (mechanism 8+, root cause 5+, framework 4+, promise 6+), 4 callback patterns (Lead-to-Close, Proof-to-Close, Story-to-Product, Root-Cause-to-Mechanism), section proportion benchmarks by format (VSL, Magalog, Sales Letter), 5-layer assembly architecture. Added Success Pattern documentation with learnings #41-45 (Verbatim Specimen Injection System). Created learning log entry: `2026-02-02-verbatim-specimen-injection-system.md` |
| 1.9 | 2026-02-02 | Added 15.5-Proof-Weaving mandatory protocol with type-indexed specimen loading for 7 proof types (testimonial cascade, before/after, study citation, demonstration, authority/living proof, social proof scale, transformation reminder), 5 proof sequencing strategies (proof-first, authority-to-social, scale cascade, testimonial parade, wave pattern), section-by-section proof density benchmarks, proof transition patterns, proof callback patterns |
| 1.8 | 2026-02-02 | Added 15-Close mandatory protocol with type-indexed specimen loading for 7 Makepeace closing themes, 6 foundational elements enforcement (benefit summary, guarantee as confidence, 6-10+ CTAs with variety, action instructions, P.S. power section, sidebars), TIER1 close patterns (future pacing, binary outcome, personal stake, inevitability, 7-element sequence), CTA phrase variety matrix, guarantee branding patterns |
| 1.7 | 2026-02-02 | Added 14-Offer-Copy mandatory protocol with type-indexed specimen loading for 6 offer formats, D-F-W-B-P enforcement, "if all it did was" value demonstration requirements (3+ iterations), 10 offer copy principles validation, branded guarantee requirements, CTA variety enforcement |
| 1.6 | 2026-02-01 | Added 13-Product-Introduction mandatory protocol with type-indexed specimen loading for 7 introduction types, 6 bridge architectures, 5 price reveal patterns, 8 master principles validation, bridge moment anti-pitch checks |
| 1.5 | 2026-02-01 | Added 12-Mechanism-Narrative mandatory protocol with type-indexed specimen loading, 6-phase structure, simplification techniques, naming moment requirements |
| 1.4 | 2026-02-01 | Added 11-Root-Cause-Narrative mandatory protocol with type-indexed specimen loading, 10 critical rules, threading guide requirements |
| 1.3 | 2026-02-01 | Added 10-Story mandatory protocol with type-indexed specimen loading, beat structure requirements, Carlton compliance gates |
| 1.2 | 2026-02-01 | Added 08.5-Headline mandatory protocol with specimen injection rules |
| 1.1 | 2026-02-01 | Added backup infrastructure documentation |
| 1.0 | 2026-01-31 | Initial creation after Proof Inventory output failure analysis |

---

## ACKNOWLEDGMENT

If you are an LLM reading this file at the start of a CopywritingEngine session:

**You are expected to:**
1. Read this entire file
2. Internalize the anti-patterns
3. Execute with full discipline regardless of context size
4. Produce COMPLETE outputs with ALL required files
5. Never claim completion without verification

**Failure to follow these protocols has caused real problems. Do not repeat them.**
