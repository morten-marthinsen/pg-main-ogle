# SESSION CONTINUITY — HANDOFF PROTOCOL BETWEEN SESSIONS
## Preserving State for Seamless Resume
## Version 1.0 — March 2026

---

## PURPOSE

Sessions end. Context is lost. But work must continue. This file defines the exact protocol for capturing state, creating handoff documents, and enabling seamless resume in new sessions.

**The Problem:**
- LLM sessions are stateless between conversations
- Complex campaigns span multiple sessions
- Context cannot be transferred automatically
- Without handoff, work restarts from scratch

**The Solution:**
- Structured state capture
- Standardized handoff documents
- Clear resume instructions
- Validation that continuity is maintained

---

## WHEN TO CREATE HANDOFF

### Mandatory Handoff Triggers

Create a handoff document when:

```
CRITICAL TRIGGERS (Must execute immediately):
• Context reaches CRITICAL zone (90%+)
• System error prevents continuation
• User explicitly requests session end
• Natural session timeout approaching

RECOMMENDED TRIGGERS (Should execute proactively):
• Context reaches RED zone (70%+)
• Complex multi-skill workflow will exceed session
• Work stopping at natural break point
• End of work day with continuation planned
```

### Handoff Decision Point

```
Ask before ending any significant session:

"Before ending, should I create a handoff document for continuity?
This will preserve:
• Current pipeline state
• Active task progress
• Critical context summary
• File dependencies
• Resume instructions

Respond 'yes' to create handoff, or 'no' to end without handoff."
```

---

## STATE CAPTURE TEMPLATE

### Complete State Capture Document

```yaml
# SESSION HANDOFF — [Campaign Name]
# Generated: [ISO 8601 timestamp]
# Session ID: [unique identifier]

session_metadata:
  campaign_name: [from CBF]
  session_id: [SES-YYYYMMDD-HHMMSS]
  session_start: [timestamp]
  session_end: [timestamp]
  context_zone_at_end: [GREEN/YELLOW/RED/CRITICAL]
  reason_for_handoff: [user_request/context_limit/natural_break/error]

pipeline_state:
  current_phase: [foundation/production/distribution/analysis]

  foundation_status:
    S01_audience_intelligence:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]
    S02_platform_strategy:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]
    S03_brand_voice:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]
    S04_content_architecture:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]
    S05_hook_library:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]
    S06_virality_scoring:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]
    S07_campaign_brief:
      status: [not_started/in_progress/complete]
      output_file: [path if complete, null if not]
      completion_percentage: [0-100]

  production_status:
    content_pieces_planned: [number]
    content_pieces_complete: [number]
    current_content_in_progress: [content ID or null]
    arena_runs_complete: [number]

  distribution_status:
    scheduled_count: [number]
    published_count: [number]
    queue_file: [path if exists]

  analysis_status:
    performance_data_available: [yes/no]
    analysis_complete: [yes/no]
    learnings_captured: [yes/no]

active_task:
  skill: [S0X - Skill Name]
  task_description: [what was being worked on]
  progress_percentage: [0-100]
  last_completed_step: [description]
  next_required_step: [description]
  blockers: [any blockers or null]

  partial_work:
    exists: [yes/no]
    location: [path if exists]
    description: [what the partial work contains]
    can_resume: [yes/no]
    resume_instructions: [specific instructions]

critical_context_summary:
  campaign_objective: |
    [2-3 sentence summary of campaign goal and success metrics]

  target_audience: |
    [2-3 sentence summary of primary audience from AIF]

  platform_focus: |
    [Primary platform(s) and key tactics from PSF]

  voice_essence: |
    [Core voice characteristics and tone from BVF]

  content_pillars: |
    [List of content pillars from CAF]

  key_hooks: |
    [Top 3-5 hooks being used from HLF]

  quality_threshold: |
    [Minimum virality score and key quality criteria from VSF]

file_dependencies:
  required_for_resume:
    - file: [path]
      purpose: [why needed]
    - file: [path]
      purpose: [why needed]

  outputs_created_this_session:
    - file: [path]
      content: [brief description]
    - file: [path]
      content: [brief description]

session_learnings:
  insights_discovered:
    - [insight 1]
    - [insight 2]

  issues_encountered:
    - issue: [description]
      resolution: [how resolved or "pending"]

  recommendations_for_next_session:
    - [recommendation 1]
    - [recommendation 2]

resume_instructions:
  immediate_first_step: |
    [Exact first thing to do when resuming]

  context_to_load: |
    [List files to load at session start]

  task_to_continue: |
    [Specific task to pick up]

  things_to_verify: |
    [Any checks to run before continuing]

  warnings_or_notes: |
    [Any important context for next session]
```

---

## CRITICAL CONTEXT SUMMARY FORMAT

### Compression Requirements

The critical context summary must be:
- **Concise:** Maximum 500 words total
- **Complete:** Contains enough to resume work
- **Actionable:** Enables continuation without re-reading all files
- **Accurate:** Reflects true state, not aspirational state

### Summary Generation Protocol

```
STEP 1: Extract Campaign Objective
Pull from CBF:
- Primary goal (with metric)
- Success criteria
- Campaign duration/phase

Compress to: 2-3 sentences

STEP 2: Extract Audience Summary
Pull from AIF:
- Primary segment
- Key pain point
- Core desire

Compress to: 2-3 sentences

STEP 3: Extract Platform Focus
Pull from PSF:
- Primary platform
- Top 3 tactics
- Key algorithm signal

Compress to: 2-3 sentences

STEP 4: Extract Voice Essence
Pull from BVF:
- 3 core traits
- Tone positioning
- 5 power words

Compress to: 2-3 sentences + word list

STEP 5: Extract Content Structure
Pull from CAF:
- Pillar names
- Primary formats
- Current series

Compress to: Bullet list

STEP 6: Extract Hook Guidance
Pull from HLF:
- Top 5 hook formulas
- Working hooks from this campaign

Compress to: Bullet list

STEP 7: Extract Quality Bar
Pull from VSF:
- Minimum score
- Weight emphasis
- Critical dimensions

Compress to: 2-3 sentences
```

---

## ACTIVE TASK HANDOFF STRUCTURE

### Task Capture Requirements

For any in-progress task, capture:

```yaml
active_task:
  # IDENTIFICATION
  skill: S08  # Which skill
  skill_name: Script Writing
  content_id: bellringer-tiktok-001  # If applicable

  # PROGRESS
  progress_percentage: 65
  time_invested: 15 minutes

  # STATE
  last_completed_step: |
    Generated 3 hook variants and selected the strongest.
    Hook: "The strategy that 10x'd my reach—and why most creators get it backwards"

  next_required_step: |
    Write body content following hook promise.
    Need to include 3 key points:
    1. The backwards approach most creators use
    2. The correct strategy and why it works
    3. Implementation step for immediate action

  # PARTIAL WORK
  partial_work:
    exists: true
    location: skills/production/S08-script-writing/drafts/bellringer-tiktok-001-draft.md
    description: |
      Contains:
      - Selected hook
      - Outline of 3 key points
      - Draft of point 1 (complete)
      - Draft of point 2 (partial)
    can_resume: true
    resume_instructions: |
      1. Load the draft file
      2. Review point 1 for continuity
      3. Complete point 2 draft
      4. Write point 3
      5. Add closing/CTA
      6. Run MC-CHECK

  # CONTEXT NEEDED
  context_requirements:
    - BVF power words for this voice
    - Platform length guidelines from PSF
    - Hook selected already (in draft)

  # BLOCKERS
  blockers: null  # or describe any blockers
```

---

## FILE DEPENDENCY LIST FORMAT

### What to Track

Track all files that:
- Must exist for next session to proceed
- Were created or modified this session
- Will be needed immediately upon resume

### Dependency List Format

```yaml
file_dependencies:
  # Files required before resuming
  required_for_resume:
    - file: /path/to/campaign-CBF.yaml
      purpose: Campaign brief needed for production context
      status: exists_validated

    - file: /path/to/campaign-AIF.yaml
      purpose: Audience reference for content alignment
      status: exists_validated

    - file: /path/to/campaign-BVF.yaml
      purpose: Voice reference for content writing
      status: exists_validated

  # Files created this session
  outputs_created_this_session:
    - file: /path/to/content-001-draft.md
      content: Partial TikTok script (65% complete)
      status: in_progress

    - file: /path/to/content-002-FINAL.yaml
      content: Completed Instagram carousel
      status: complete_validated

  # Files to verify before proceeding
  verification_required:
    - file: /path/to/content-001-draft.md
      verification: Ensure draft file is readable and content intact
```

---

## RESUME INSTRUCTIONS FORMAT

### Clear, Actionable Resume Protocol

```yaml
resume_instructions:
  # What to do FIRST
  immediate_first_step: |
    Load this handoff document and read the active_task section.
    Then load the partial work file at:
    skills/production/S08-script-writing/drafts/bellringer-tiktok-001-draft.md

  # Context loading order
  context_to_load:
    1. This handoff document
    2. Campaign Brief (CBF) - for objective alignment
    3. Brand Voice File (BVF) - for voice consistency
    4. Partial work draft file
    # Note: Other files can be loaded as needed, but these are critical

  # The specific task to continue
  task_to_continue: |
    Complete the TikTok script for content piece bellringer-tiktok-001.

    Current state:
    - Hook: DONE (selected)
    - Point 1: DONE
    - Point 2: PARTIAL (needs completion)
    - Point 3: NOT STARTED
    - Closing/CTA: NOT STARTED

    Next action: Open draft file and complete Point 2.

  # Verification checks before continuing
  things_to_verify:
    - Draft file exists and is readable
    - Hook selection is still strong (quick review)
    - Voice alignment still feels right
    - No new campaign updates that change direction

  # Important notes for next session
  warnings_or_notes: |
    - We were approaching YELLOW zone context when this session ended
    - The hook we selected performed well in Arena - keep it
    - User mentioned wanting to emphasize the "backwards" angle strongly
    - Consider length - target 45-60 seconds for TikTok
```

---

## HANDOFF VALIDATION CHECKLIST

Before finalizing any handoff, verify:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    HANDOFF VALIDATION CHECKLIST                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  COMPLETENESS                                                            ║
║  □ Session metadata filled                                               ║
║  □ Pipeline state accurately captured                                    ║
║  □ Active task fully documented                                          ║
║  □ Critical context summarized                                           ║
║  □ File dependencies listed                                              ║
║  □ Resume instructions clear                                             ║
║                                                                          ║
║  ACCURACY                                                                ║
║  □ Status of each skill is correct                                       ║
║  □ File paths are valid and verified                                     ║
║  □ Progress percentages are realistic                                    ║
║  □ Context summary matches actual state                                  ║
║                                                                          ║
║  ACTIONABILITY                                                           ║
║  □ Resume instructions are specific enough to follow                     ║
║  □ Next step is clearly defined                                          ║
║  □ Context to load is prioritized                                        ║
║  □ Verification steps are practical                                      ║
║                                                                          ║
║  FILE INTEGRITY                                                          ║
║  □ All referenced files exist                                            ║
║  □ Partial work files are saved                                          ║
║  □ No unsaved work will be lost                                          ║
║                                                                          ║
║  HANDOFF SAVED                                                           ║
║  □ Handoff document saved to session-continuity folder                   ║
║  □ Filename includes timestamp for identification                        ║
║  □ User has been given the file path                                     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## HANDOFF STORAGE

### File Location

All handoff documents are stored at:
```
OrganicMarketingEngine/learning-log/session-continuity/
```

### Naming Convention

```
handoff-[campaign-name]-[YYYYMMDD]-[HHMMSS].yaml

Examples:
handoff-bellringer-q1-20260315-143022.yaml
handoff-product-launch-20260401-091500.yaml
emergency-handoff-20260315-235959.yaml
```

### Retention

- Keep last 10 handoff documents per campaign
- Archive older handoffs to `archive/` subfolder
- Never delete handoffs until campaign is fully complete

---

## RESUME PROTOCOL (NEW SESSION)

### How to Resume from Handoff

When starting a new session to continue work:

```
RESUME PROTOCOL

STEP 1: LOAD HANDOFF
"I'm continuing work from a previous session.
Please load the handoff document at:
[path to handoff file]"

STEP 2: VERIFY STATE
After loading, the system should:
- Confirm campaign name and objective
- State current pipeline position
- Identify the active task
- List immediate next step

STEP 3: VERIFY FILES
Check that all required files exist:
- Gate check on prerequisite files
- Verify partial work files are intact
- Confirm no file corruption

STEP 4: CONTEXT RESTORATION
Load critical context in order:
1. Campaign Brief (CBF)
2. Active skill protocol
3. Relevant foundation files (as needed)
4. Partial work files

STEP 5: CONTINUE WORK
Pick up exactly where left off:
- Execute the next_required_step from handoff
- Maintain continuity with prior work
- Run MC-CHECK when task completes
```

### Resume Confirmation Message

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    SESSION RESUMED                                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Campaign: [name]                                                        ║
║  Previous Session: [timestamp]                                           ║
║  Handoff Loaded: ✓                                                       ║
║                                                                          ║
║  Pipeline Position:                                                      ║
║  [Current phase and skill status summary]                                ║
║                                                                          ║
║  Active Task:                                                            ║
║  [Task description from handoff]                                         ║
║  Progress: [X]%                                                          ║
║                                                                          ║
║  Immediate Next Step:                                                    ║
║  [Next step from handoff]                                                ║
║                                                                          ║
║  Ready to continue. Say "proceed" or specify different direction.        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## EMERGENCY HANDOFF

### When Normal Handoff Isn't Possible

If context hits CRITICAL zone unexpectedly:

```
EMERGENCY HANDOFF PROTOCOL

1. STOP all generation immediately

2. CAPTURE minimal critical state:
   - Campaign name
   - Current skill
   - Last completed step
   - Files created this session

3. SAVE to emergency handoff file:
   learning-log/session-continuity/emergency-handoff-[timestamp].yaml

4. ALERT user:
   "Emergency handoff executed. Context exhausted.
   Start new session and load:
   [emergency handoff path]"

5. DO NOT attempt to continue
```

### Emergency Handoff Template (Minimal)

```yaml
# EMERGENCY HANDOFF — [Campaign Name]
# Generated: [timestamp]
# Type: EMERGENCY (Context exhausted)

campaign: [name]
last_skill: [S0X]
last_step: [description]
files_this_session:
  - [path]
  - [path]
resume_note: |
  Context exhausted mid-task.
  Review files created this session.
  May need to redo recent work.
  Verify partial work integrity.
```

---

*Sessions end. Work continues. Handoffs bridge the gap. Never lose state.*
