# ESCALATION PROTOCOL — GATE FAILURE RESPONSE SYSTEM
## What Happens When Gates Fail
## Version 1.0 — March 2026

---

## PURPOSE

This protocol defines EXACTLY what happens when a gate fails. No ambiguity. No "use your judgment." Clear escalation paths, recovery workflows, and resolution procedures.

**This Protocol Covers:**
- Failure categorization (what kind of failure is this?)
- Escalation tiers (how serious is it?)
- Recovery workflows (how do we fix it?)
- User notification (how do we communicate it?)
- Rollback procedures (when do we undo work?)

---

## FAILURE CATEGORIZATION

### Category 1: MISSING FILES

**Definition:** Required prerequisite file does not exist at expected path.

**Examples:**
- No AIF file when S02 is requested
- No CBF file when any production skill is requested
- No Arena output when S14 Assembly is requested

**Severity:** MEDIUM
- Work cannot proceed
- But no data is corrupted
- Clear path to resolution

**Root Causes:**
- User skipped foundation phase
- Previous skill output not saved
- Incorrect campaign name (path mismatch)
- File accidentally deleted

---

### Category 2: INCOMPLETE FILES

**Definition:** Prerequisite file exists but lacks required fields.

**Examples:**
- AIF exists but missing `pain_points` array
- CBF exists but `content_plan.content_pieces` is empty
- PSF exists but no `per_platform` entries

**Severity:** MEDIUM-HIGH
- Partial data exists (risk of overwriting)
- Downstream skills would produce incomplete outputs
- May indicate interrupted session

**Root Causes:**
- Previous skill was interrupted before completion
- User provided partial input
- System error during file write
- Manual edit removed required fields

---

### Category 3: VALIDATION FAILURES

**Definition:** Prerequisite file exists with all fields, but values don't pass validation rules.

**Examples:**
- `primary_platforms` array has only 1 item (requires min 2)
- `virality_targets.minimum_score` is below 60
- `posting_frequency` is "sometimes" (too vague)

**Severity:** MEDIUM
- Data exists but quality is insufficient
- Downstream outputs would inherit quality issues
- Fix is usually quick (update values)

**Root Causes:**
- User provided insufficient detail
- System generated placeholder values
- Validation rules updated after file creation

---

### Category 4: CHAIN BREAKS

**Definition:** A file in the middle of the chain is missing or invalid, breaking all downstream gates.

**Examples:**
- S03 BVF is missing, blocking S04-S14+
- S01 AIF exists but S02 PSF is missing, blocking S03-S14+
- Multiple files missing in sequence

**Severity:** HIGH
- Multiple skills blocked
- May require significant rebuild
- Chain integrity compromised

**Root Causes:**
- Started pipeline at wrong point
- Session ended mid-foundation
- Files moved or renamed incorrectly

---

### Category 5: QUALITY FAILURES

**Definition:** Gate passes technically but MC-CHECK reveals quality issues.

**Examples:**
- CBF exists and validates but Arena reveals weak hooks
- Content assembled but Virality Score is below 60
- Output passes slop scan but feels generic

**Severity:** MEDIUM-HIGH
- Work completed but substandard
- Distribution would harm brand
- Rework required

**Root Causes:**
- Insufficient iteration during skill execution
- User accepted first draft
- Template over-reliance
- Missing specimen comparison

---

### Category 6: SYSTEM ERRORS

**Definition:** Technical failure prevents gate checking or skill execution.

**Examples:**
- File path resolution error
- YAML parsing failure
- Context overflow during validation

**Severity:** HIGH
- Cannot proceed regardless of data quality
- May require session restart
- Technical intervention needed

**Root Causes:**
- Malformed file syntax
- Encoding issues
- Path character issues
- Context exhaustion

---

## ESCALATION TIERS

### TIER 1: AUTO-FIX (No Human Intervention)

**When Applied:**
- Single missing field with clear default
- Validation failure with obvious fix
- Minor formatting issues

**Actions:**
```
1. IDENTIFY the specific issue
2. APPLY automatic fix:
   - Add default value for missing field
   - Correct formatting
   - Apply standard value
3. LOG the auto-fix for transparency
4. NOTIFY user of change made
5. PROCEED with skill execution
```

**Auto-Fix Examples:**
```yaml
auto_fixes:
  - issue: "missing timestamp"
    fix: "add current datetime"

  - issue: "posting_frequency empty"
    fix: "prompt user for input before proceeding"

  - issue: "YAML syntax error (trailing comma)"
    fix: "remove trailing comma and continue"

  - issue: "minimum_score not set"
    fix: "set to default 60 with notice"
```

**Notification Template:**
```
╔══════════════════════════════════════════════════════════════════════════╗
║                    AUTO-FIX APPLIED                                      ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Issue detected: [description]                                           ║
║  Auto-fix applied: [what was done]                                       ║
║                                                                          ║
║  Proceeding with skill execution.                                        ║
║  To review or override this fix, say "show auto-fix details"             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### TIER 2: GUIDED RECOVERY (Minimal Human Input)

**When Applied:**
- Missing file that requires running previous skill
- Incomplete file needing specific user input
- Validation failure requiring user decision

**Actions:**
```
1. BLOCK current skill execution
2. EXPLAIN what's missing and why it matters
3. PROVIDE specific options:
   - Option A: Run prerequisite skill
   - Option B: Provide missing information now
   - Option C: Load from alternative source
4. WAIT for user selection
5. EXECUTE selected recovery path
6. VALIDATE fix was successful
7. PROCEED with original skill
```

**Guided Recovery Template:**
```
╔══════════════════════════════════════════════════════════════════════════╗
║                    RECOVERY REQUIRED: TIER 2                             ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Issue: [specific issue]                                                 ║
║  Impact: [why this blocks progress]                                      ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  RECOVERY OPTIONS:                                                       ║
║                                                                          ║
║  [A] Run prerequisite skill                                              ║
║      Execute [S0X] to generate required [output type]                    ║
║      Estimated time: [X] minutes                                         ║
║                                                                          ║
║  [B] Provide missing information now                                     ║
║      Answer [X] questions to complete prerequisite                       ║
║      Estimated time: [X] minutes                                         ║
║                                                                          ║
║  [C] Load from existing source                                           ║
║      Import from [source] if available                                   ║
║      Estimated time: [X] minutes                                         ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  Respond with A, B, or C to continue.                                    ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### TIER 3: HUMAN REVIEW (Significant Human Input)

**When Applied:**
- Multiple files missing (chain break)
- Quality failure requiring content revision
- Conflicting information in prerequisites
- Arena rejection requiring creative rework

**Actions:**
```
1. STOP all automated processing
2. SUMMARIZE the full issue scope
3. PRESENT the current state of all relevant files
4. EXPLAIN the implications of each option
5. REQUEST user direction on how to proceed
6. AWAIT explicit user decision
7. EXECUTE user-directed recovery
8. VALIDATE and document
```

**Human Review Template:**
```
╔══════════════════════════════════════════════════════════════════════════╗
║                    HUMAN REVIEW REQUIRED: TIER 3                         ║
║                    Manual Decision Needed                                ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  SITUATION:                                                              ║
║  [Detailed description of the issue]                                     ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  CURRENT STATE:                                                          ║
║                                                                          ║
║  File: [filename]                                                        ║
║  Status: [EXISTS/MISSING/INCOMPLETE]                                     ║
║  Issues: [specific issues]                                               ║
║                                                                          ║
║  [Repeat for each affected file]                                         ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  OPTIONS:                                                                ║
║                                                                          ║
║  [1] Full rebuild from [starting point]                                  ║
║      Pros: Clean slate, no inherited issues                              ║
║      Cons: [time estimate], loses existing work                          ║
║                                                                          ║
║  [2] Patch existing files                                                ║
║      Pros: Faster, preserves good work                                   ║
║      Cons: May inherit subtle quality issues                             ║
║                                                                          ║
║  [3] Bypass with documented risk                                         ║
║      Pros: Immediate progress                                            ║
║      Cons: Quality not guaranteed, logged as bypass                      ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  RECOMMENDATION: [Option X] because [reasoning]                          ║
║                                                                          ║
║  Please respond with your decision (1, 2, or 3) and any guidance.        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### TIER 4: FULL STOP (Critical Failure)

**When Applied:**
- System error preventing any file access
- Data corruption detected
- Context overflow (CRITICAL zone)
- Irreconcilable conflicts in data

**Actions:**
```
1. IMMEDIATELY HALT all processing
2. PRESERVE current state (no modifications)
3. CREATE emergency state dump
4. ALERT user to critical status
5. PROVIDE recovery instructions for new session
6. DO NOT attempt automated recovery
```

**Full Stop Template:**
```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║  ██████╗██████╗ ██╗████████╗██╗ ██████╗ █████╗ ██╗                       ║
║ ██╔════╝██╔══██╗██║╚══██╔══╝██║██╔════╝██╔══██╗██║                       ║
║ ██║     ██████╔╝██║   ██║   ██║██║     ███████║██║                       ║
║ ██║     ██╔══██╗██║   ██║   ██║██║     ██╔══██║██║                       ║
║ ╚██████╗██║  ██║██║   ██║   ██║╚██████╗██║  ██║███████╗                  ║
║  ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝                  ║
║                                                                          ║
║                    FULL STOP — TIER 4 ESCALATION                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  CRITICAL FAILURE DETECTED                                               ║
║                                                                          ║
║  Type: [failure type]                                                    ║
║  Description: [what happened]                                            ║
║  Impact: [what is affected]                                              ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  ALL PROCESSING HALTED                                                   ║
║  No automated recovery attempted.                                        ║
║  Current state preserved.                                                ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  IMMEDIATE ACTIONS:                                                      ║
║                                                                          ║
║  1. State dump saved to:                                                 ║
║     learning-log/session-continuity/emergency-[timestamp].yaml           ║
║                                                                          ║
║  2. Start a new session                                                  ║
║                                                                          ║
║  3. Load the state dump file first                                       ║
║                                                                          ║
║  4. Review and resolve the issue manually                                ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  DO NOT continue in this session.                                        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## RECOVERY WORKFLOWS BY FAILURE TYPE

### Workflow: Missing File Recovery

```
╔══════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW: MISSING FILE RECOVERY                                         ║
╠══════════════════════════════════════════════════════════════════════════╣

Step 1: IDENTIFY
├── What file is missing?
├── What skill generates this file?
└── Are any upstream files also missing?

Step 2: CHECK UPSTREAM
├── Verify all prerequisite files for the generator skill exist
├── If upstream also missing → Start recovery at earliest gap
└── If upstream complete → Proceed to Step 3

Step 3: PREPARE
├── Gather required inputs for the generator skill
├── Check for any existing partial work
└── Estimate time to generate

Step 4: GENERATE
├── Execute the prerequisite skill
├── Ensure all prompts are answered completely
└── Verify output file is created

Step 5: VALIDATE
├── Check file exists at expected path
├── Verify all required fields present
├── Run validation rules
└── Confirm gate now passes

Step 6: CONTINUE
├── Return to originally requested skill
├── Re-run gate check
└── Proceed with execution

╚══════════════════════════════════════════════════════════════════════════╝
```

### Workflow: Incomplete File Recovery

```
╔══════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW: INCOMPLETE FILE RECOVERY                                      ║
╠══════════════════════════════════════════════════════════════════════════╣

Step 1: ANALYZE
├── List all missing fields
├── Categorize by source:
│   ├── User input required
│   ├── Derivable from other files
│   └── Can use defaults
└── Prioritize by impact

Step 2: GATHER USER INPUT (if needed)
├── Present specific questions for missing data
├── Explain why each field matters
└── Capture responses

Step 3: DERIVE VALUES (if possible)
├── Check referenced files for source data
├── Apply transformation/extraction logic
└── Document derivation for transparency

Step 4: APPLY DEFAULTS (if appropriate)
├── Only for non-critical fields
├── Use documented default values
├── Flag with [DEFAULT] marker
└── Note in session log

Step 5: UPDATE FILE
├── Add missing fields with gathered values
├── Preserve existing valid data
├── Update timestamp
└── Save to correct path

Step 6: VALIDATE
├── Re-run field check (should be complete)
├── Run validation rules
└── Confirm gate now passes

Step 7: CONTINUE
├── Return to originally requested skill
├── Proceed with execution

╚══════════════════════════════════════════════════════════════════════════╝
```

### Workflow: Validation Failure Recovery

```
╔══════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW: VALIDATION FAILURE RECOVERY                                   ║
╠══════════════════════════════════════════════════════════════════════════╣

Step 1: REVIEW FAILURES
├── List each failing field
├── Show current value
├── Show required rule
└── Explain the purpose of the rule

Step 2: DETERMINE FIX TYPE
├── For each failure:
│   ├── Simple fix: Value just needs adjustment
│   ├── Data needed: User must provide information
│   └── Regeneration: Field needs complete rework
└── Group by fix type

Step 3: APPLY SIMPLE FIXES
├── Adjust values to meet rules
├── Example: Add items to array to meet minimum count
├── Example: Increase specificity in text fields
└── Document changes

Step 4: REQUEST NEEDED DATA
├── Ask specific questions for complex fixes
├── Provide context on what good data looks like
└── Capture responses

Step 5: REGENERATE IF NEEDED
├── If field is fundamentally wrong, regenerate
├── Use specimens for guidance
├── Ensure new value passes rule
└── Document regeneration reason

Step 6: UPDATE FILE
├── Apply all fixes
├── Update timestamp
├── Save to correct path

Step 7: RE-VALIDATE
├── Run full validation suite
├── Confirm all rules pass
└── Proceed to original skill

╚══════════════════════════════════════════════════════════════════════════╝
```

### Workflow: Chain Break Recovery

```
╔══════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW: CHAIN BREAK RECOVERY                                          ║
╠══════════════════════════════════════════════════════════════════════════╣

Step 1: AUDIT CHAIN
├── Check each file in sequence: S01 → S02 → S03 → S04 → S05 → S06 → S07
├── Mark status: ✓ Valid | ⚠ Incomplete | ✗ Missing
└── Identify first break point

Step 2: ASSESS SCOPE
├── Count missing/incomplete files
├── Estimate effort to repair
├── Check for any reusable existing work
└── Present options to user

Step 3: USER DECISION
├── Present rebuild options:
│   ├── Full rebuild from S01
│   ├── Partial rebuild from break point
│   └── Attempt repair of individual files
├── Get user preference
└── Document decision

Step 4: EXECUTE RECOVERY
├── Follow selected path
├── For full rebuild: Execute S01 through S07 in sequence
├── For partial: Start at break point, use existing upstream
├── For repair: Apply incomplete file recovery to each gap
└── Validate at each step

Step 5: VERIFY CHAIN
├── Run G07 chain validation
├── Confirm all files exist and valid
├── Confirm CBF synthesizes all prior correctly
└── Document recovery completion

Step 6: CONTINUE
├── Chain restored
├── Proceed to production phase
└── Log recovery in session

╚══════════════════════════════════════════════════════════════════════════╝
```

### Workflow: Quality Failure Recovery

```
╔══════════════════════════════════════════════════════════════════════════╗
║  WORKFLOW: QUALITY FAILURE RECOVERY                                      ║
╠══════════════════════════════════════════════════════════════════════════╣

Step 1: DIAGNOSE QUALITY ISSUE
├── Review MC-CHECK failures
├── Review Arena critiques
├── Review Virality Score breakdown
└── Identify root cause

Step 2: CATEGORIZE ISSUE
├── Hook weakness → Return to S05 Hook Library
├── Voice drift → Review S03 BVF alignment
├── Generic content → Apply specificity from S01 AIF
├── Platform mismatch → Review S02 PSF requirements
├── Structure issues → Review S04 CAF pillars
└── Overall weak → Full Arena re-run with new variants

Step 3: TARGET INTERVENTION
├── Load relevant foundation file
├── Load relevant specimens for comparison
├── Identify specific improvements needed
└── Revise with targeted fixes

Step 4: RE-GENERATE CONTENT
├── Apply fixes to content generation
├── Run MC-CHECK on revised version
├── Compare to original score/feedback
└── Verify improvement

Step 5: RE-RUN ARENA (if significant changes)
├── Submit revised content to Arena
├── Get fresh persona critiques
├── Synthesize improvements
└── Verify synthesis quality

Step 6: RE-SCORE
├── Run Virality Scoring on final version
├── Confirm score ≥ 60 (or target minimum)
├── If still below → Return to Step 2
└── If passing → Proceed to assembly

Step 7: DOCUMENT LEARNING
├── What caused quality failure?
├── What fixed it?
├── Update learning log
└── Flag pattern for system improvement

╚══════════════════════════════════════════════════════════════════════════╝
```

---

## USER NOTIFICATION TEMPLATES

### Notification: Recovery Starting

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    RECOVERY INITIATED                                    ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Issue: [brief description]                                              ║
║  Recovery Type: [workflow name]                                          ║
║  Estimated Time: [X minutes]                                             ║
║                                                                          ║
║  I'll guide you through the recovery process.                            ║
║  You may need to provide some input along the way.                       ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Notification: Recovery Progress

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    RECOVERY PROGRESS                                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Step [X] of [Y]: [step name]                                            ║
║  Status: [COMPLETE / IN PROGRESS / PENDING]                              ║
║                                                                          ║
║  [Current action being taken]                                            ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Notification: Recovery Complete

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    RECOVERY COMPLETE                                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Issue: [what was wrong]                                                 ║
║  Resolution: [what was fixed]                                            ║
║                                                                          ║
║  Gate Status: NOW OPEN                                                   ║
║                                                                          ║
║  Proceeding with original request: [skill name]                          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### Notification: Recovery Failed

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    RECOVERY FAILED                                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Attempted: [recovery workflow]                                          ║
║  Failed at: [step]                                                       ║
║  Reason: [why it failed]                                                 ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  NEXT STEPS:                                                             ║
║  [Specific guidance on what user should do]                              ║
║                                                                          ║
║  If you need to escalate further, say "escalate to Tier [X]"             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## ROLLBACK PROCEDURES

### When to Rollback

Rollback is triggered when:
- Recovery attempt corrupted existing good data
- User requests undo of recent changes
- System detects inconsistent state after recovery
- Auto-fix produced incorrect results

### Rollback Protocol

```
ROLLBACK PROCEDURE

1. IDENTIFY rollback scope
   - Which files were modified?
   - What was the previous state?
   - When was the last known good state?

2. CHECK for backups
   - Look for auto-backup in learning-log/session-continuity/
   - Check if YAML history exists
   - Identify recovery point

3. CONFIRM with user
   "Rolling back will restore [files] to [state from timestamp].
   Any work done since will be lost.
   Confirm rollback? (yes/no)"

4. EXECUTE rollback
   - Restore files from backup
   - Verify restoration successful
   - Update session log

5. VERIFY state
   - Run gate checks on restored files
   - Confirm valid state
   - Report to user

6. DOCUMENT
   - Log rollback in failure log
   - Note what triggered rollback
   - Flag for pattern analysis
```

### Rollback Notification

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    ROLLBACK EXECUTED                                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Files Restored:                                                         ║
║  - [file 1] → restored to [timestamp]                                    ║
║  - [file 2] → restored to [timestamp]                                    ║
║                                                                          ║
║  Reason: [why rollback was needed]                                       ║
║                                                                          ║
║  Current State: [description of current pipeline state]                  ║
║                                                                          ║
║  Recommended Next Step: [what to do now]                                 ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## FAILURE LOG SCHEMA

Every failure and recovery is logged:

```yaml
failure_record:
  failure_id: [unique id, format: FAIL-YYYYMMDD-HHMMSS]
  timestamp: [ISO 8601 datetime]
  session_id: [session identifier]
  campaign: [campaign name]

  failure_details:
    category: [1-6, from categorization above]
    category_name: [human readable]
    severity: [LOW/MEDIUM/MEDIUM-HIGH/HIGH/CRITICAL]
    skill_requested: [S0X]
    gate_blocked: [G0X]

  issue:
    description: [what happened]
    affected_files: [list of file paths]
    root_cause: [determined cause]

  escalation:
    tier: [1-4]
    tier_name: [AUTO-FIX/GUIDED/HUMAN REVIEW/FULL STOP]

  recovery:
    workflow_used: [workflow name]
    steps_completed: [list]
    user_input_required: [yes/no]
    time_to_resolve: [minutes]
    outcome: [SUCCESS/FAILED/PARTIAL/ROLLBACK]

  learnings:
    pattern_detected: [if this is a recurring pattern]
    system_improvement: [suggested system change]
    prevention_action: [how to prevent recurrence]
```

---

*Escalation is not failure. It's quality protection. Trust the tiers.*
