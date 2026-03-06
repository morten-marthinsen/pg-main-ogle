# CONTEXT LOAD ZONES — GREEN / YELLOW / RED / CRITICAL
## Managing AI Context for Sustained Quality
## Version 1.0 — March 2026

---

## PURPOSE

LLM context windows are finite. As context fills, quality degrades. This file defines the four context load zones, exact thresholds, behaviors per zone, loading priorities, and protocols for managing context health throughout a session.

**The Problem:**
- LLMs have limited context windows
- As context fills, recall becomes unreliable
- Quality degrades silently without monitoring
- Sessions end abruptly when limits hit

**The Solution:**
- Proactive zone monitoring
- Zone-appropriate behaviors
- Strategic loading priorities
- Graceful degradation protocols

---

## ZONE DEFINITIONS

### GREEN ZONE: 0-40% Context Used

```
╔══════════════════════════════════════════════════════════════════════════╗
║                         GREEN ZONE: 0-40%                                ║
║                         FULL OPERATIONS                                  ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  STATUS: Optimal capacity. All systems fully operational.               ║
║                                                                          ║
║  CHARACTERISTICS:                                                        ║
║  • Complete context retention                                            ║
║  • Fast, accurate recall                                                 ║
║  • No degradation risk                                                   ║
║  • Maximum flexibility                                                   ║
║                                                                          ║
║  TYPICAL SCENARIOS:                                                      ║
║  • Fresh session start                                                   ║
║  • Single skill execution                                                ║
║  • Foundation phase work                                                 ║
║  • Light production tasks                                                ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Exact Threshold:** Context usage ≤ 40%

---

### YELLOW ZONE: 40-70% Context Used

```
╔══════════════════════════════════════════════════════════════════════════╗
║                        YELLOW ZONE: 40-70%                               ║
║                        SELECTIVE OPERATIONS                              ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  STATUS: Elevated usage. Selective loading required.                     ║
║                                                                          ║
║  CHARACTERISTICS:                                                        ║
║  • Context beginning to fill                                             ║
║  • Recall still reliable but not optimal                                 ║
║  • Loading decisions become important                                    ║
║  • Should compress completed work                                        ║
║                                                                          ║
║  TYPICAL SCENARIOS:                                                      ║
║  • Mid-session after multiple skills                                     ║
║  • Production phase with specimen loading                                ║
║  • Arena generation with all personas                                    ║
║  • Extended conversation with iterations                                 ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Exact Threshold:** 40% < Context usage ≤ 70%

---

### RED ZONE: 70-90% Context Used

```
╔══════════════════════════════════════════════════════════════════════════╗
║                          RED ZONE: 70-90%                                ║
║                          MINIMAL OPERATIONS                              ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  STATUS: High usage. Single skill focus. Prepare for handoff.            ║
║                                                                          ║
║  CHARACTERISTICS:                                                        ║
║  • Context significantly filled                                          ║
║  • Recall may be spotty for early context                                ║
║  • Loading must be highly selective                                      ║
║  • Quality degradation risk is real                                      ║
║  • Handoff document should be prepared                                   ║
║                                                                          ║
║  TYPICAL SCENARIOS:                                                      ║
║  • Extended session with heavy production                                ║
║  • Multiple Arena runs                                                   ║
║  • Complex multi-skill workflows                                         ║
║  • Sessions approaching natural end                                      ║
║                                                                          ║
║  ALERTS:                                                                 ║
║  ⚠ "Context RED zone reached. Preparing handoff capabilities."          ║
║  ⚠ "Single skill focus mode active. Minimize new context loading."      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Exact Threshold:** 70% < Context usage ≤ 90%

---

### CRITICAL ZONE: 90%+ Context Used

```
╔══════════════════════════════════════════════════════════════════════════╗
║                       CRITICAL ZONE: 90%+                                ║
║                       IMMEDIATE HANDOFF REQUIRED                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  STATUS: At capacity. New session required. Execute handoff.             ║
║                                                                          ║
║  CHARACTERISTICS:                                                        ║
║  • Context near maximum capacity                                         ║
║  • Quality degradation likely occurring                                  ║
║  • Recall unreliable for older context                                   ║
║  • Continuation risk is high                                             ║
║  • MUST execute handoff protocol                                         ║
║                                                                          ║
║  IMMEDIATE ACTIONS:                                                      ║
║  1. Stop current task at safe point                                      ║
║  2. Generate full state handoff document                                 ║
║  3. Save handoff to session-continuity folder                            ║
║  4. Provide user with resume instructions                                ║
║  5. DO NOT continue with complex tasks                                   ║
║                                                                          ║
║  ALERTS:                                                                 ║
║  🚨 "CRITICAL: Context at 90%+. Executing immediate handoff."           ║
║  🚨 "New session required to continue with quality assurance."          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

**Exact Threshold:** Context usage > 90%

---

## BEHAVIORS PER ZONE

### GREEN Zone Behaviors (0-40%)

```
LOADING:
✓ Load all relevant context freely
✓ Include full foundation files (AIF, PSF, BVF, CAF, HLF, VSF, CBF)
✓ Load complete specimens for reference
✓ Include full skill protocols
✓ Load all 7 persona files for Arena
✓ Include teaching files
✓ Reference learning logs

PROCESSING:
✓ Run full MC-CHECK with all questions
✓ Execute complete Arena with all personas
✓ Generate multiple variants
✓ Perform thorough iterations
✓ Include detailed explanations

OUTPUT:
✓ Comprehensive outputs with full detail
✓ Include rationale and reasoning
✓ Provide multiple options
✓ Offer extensive recommendations

MONITORING:
• Check context health every 10 messages
• Note zone transitions
• Proactive, not reactive
```

---

### YELLOW Zone Behaviors (40-70%)

```
LOADING:
✓ Load active skill protocol fully
✓ Summarize completed foundation files to key points
✓ Load only specimens directly relevant to current task
✓ Compress persona files to key criteria only
○ Skip teaching files unless directly needed
○ Reference learning logs by ID only, don't load full content

PROCESSING:
✓ Run rapid MC-CHECK (10 questions) instead of full
✓ Execute Arena with focus on 3-4 most relevant personas
✓ Generate fewer variants (quality over quantity)
✓ More focused iterations
○ Reduce detailed explanations unless requested

OUTPUT:
✓ Complete outputs with essential detail
○ Summarize rationale unless explicitly asked
✓ Provide recommended option with brief alternatives
○ Focused recommendations over extensive lists

COMPRESSION ACTIONS:
• Summarize completed skills to 2-3 key points each
• Replace full file references with IDs
• Clear specimen examples after extraction
• Archive conversation context where possible

MONITORING:
• Check context health every 5 messages
• Alert user to zone status
• Prepare for potential RED transition
```

---

### RED Zone Behaviors (70-90%)

```
LOADING:
✓ Load ONLY current skill protocol
✓ Reference prior files by ID — do not load full content
✓ Load 1-2 specimens maximum
○ Skip persona files — use synthesized persona guidance
○ No teaching files — assume knowledge
○ No learning logs — work from memory

PROCESSING:
✓ Run rapid MC-CHECK (5 critical questions only)
○ Skip Arena — use best-judgment synthesis
✓ Generate single best variant
✓ Minimal iterations — get it right first time
○ No explanations unless critical

OUTPUT:
✓ Essential outputs only
○ No rationale unless requested
✓ Single recommendation
○ Minimal supporting detail

COMPRESSION ACTIONS:
• Summarize entire session state to single paragraph
• Drop all but most recent skill context
• Archive all prior outputs to file references
• Begin drafting handoff document

HANDOFF PREPARATION:
• Capture current pipeline state
• Document active task status
• List critical context to preserve
• Prepare resume instructions

MONITORING:
• Check context health every 2-3 messages
• Strong alert to user about zone
• Recommend session break
• Have handoff ready to execute
```

---

### CRITICAL Zone Behaviors (90%+)

```
LOADING:
✗ NO new context loading
✗ Do not read new files
✗ Do not load specimens
✗ Do not expand scope

PROCESSING:
✗ STOP complex processing
✓ Complete only immediate atomic task
✓ Execute handoff protocol
✗ No new tasks accepted

OUTPUT:
✓ Handoff document only
✓ State preservation
✓ Resume instructions
✗ No new content generation

IMMEDIATE ACTIONS:
1. HALT current work at safe stopping point
2. GENERATE emergency state dump
3. SAVE to learning-log/session-continuity/
4. PROVIDE clear resume instructions
5. INSTRUCT user to start new session
6. DO NOT attempt to continue

ALERT:
"CRITICAL ZONE REACHED. Executing mandatory handoff.
Quality cannot be guaranteed beyond this point.
Please start a new session to continue work.
Handoff document has been generated."
```

---

## LOADING PRIORITIES PER ZONE

### Priority Hierarchy

When context is limited, load in this order:

```
PRIORITY 1 — ALWAYS LOAD (Even in RED)
├── Current skill SKILL.md protocol
├── Campaign Brief (CBF) — summary if not GREEN
└── Active task requirements

PRIORITY 2 — LOAD IN GREEN/YELLOW
├── Relevant foundation files (AIF, PSF, BVF, CAF, HLF, VSF)
├── Platform-specific specimens
├── Arena personas (for production tasks)
└── Teaching files for active skill

PRIORITY 3 — LOAD ONLY IN GREEN
├── Full specimen library
├── Complete learning logs
├── Historical campaign data
├── Extended reference materials
└── All persona full definitions

PRIORITY 4 — OPTIONAL EVEN IN GREEN
├── Comparison campaigns
├── Extended framework references
├── Non-essential examples
└── Background context
```

### Loading Decision Matrix

| Zone | P1 | P2 | P3 | P4 |
|------|----|----|----|----|
| GREEN | Full | Full | Full | Optional |
| YELLOW | Full | Summary | Skip | Skip |
| RED | Critical only | Skip | Skip | Skip |
| CRITICAL | Minimal | Skip | Skip | Skip |

---

## CONTEXT SHEDDING PROTOCOLS

### When to Shed Context

Shed context when:
- Transitioning from YELLOW to RED
- After completing a major skill
- When context estimate exceeds 50%
- When recall accuracy decreases

### Shedding Protocol: YELLOW Zone

```
SHEDDING PROTOCOL: YELLOW

1. IDENTIFY completed work
   - Foundation files that are done and validated
   - Specimens that have been applied
   - Skill outputs that are finalized

2. SUMMARIZE to key points
   - AIF → 3-5 bullet points of audience insights
   - PSF → Primary platform + top 3 tactics
   - BVF → Core voice traits + power words list
   - CAF → Pillar list + primary formats
   - HLF → Top 5 hook formulas
   - VSF → Scoring weights + minimum threshold

3. REPLACE full context with summaries
   - Remove verbose explanations
   - Keep actionable elements only
   - Reference file paths for later retrieval

4. VERIFY critical info preserved
   - Can I still answer questions about the campaign?
   - Do I know the key constraints?
   - Is the current task clear?

5. CONTINUE with reduced context
```

### Shedding Protocol: RED Zone

```
SHEDDING PROTOCOL: RED

1. EMERGENCY COMPRESSION
   - Reduce session to single paragraph state summary
   - Keep only: Campaign name, current skill, next step, key constraint
   - Drop all historical context

2. ARCHIVE everything else
   - Reference outputs by file path only
   - Do not maintain content in context
   - Trust that files exist

3. SINGLE FOCUS
   - One skill
   - One task
   - One output
   - No branching

4. PREPARE HANDOFF
   - Draft handoff document
   - Have it ready to execute
   - Transition to CRITICAL likely imminent
```

---

## ZONE TRANSITION ALERTS

### GREEN → YELLOW Transition

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    ZONE TRANSITION: GREEN → YELLOW                       ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Context usage has exceeded 40%.                                         ║
║                                                                          ║
║  CHANGES:                                                                ║
║  • Switching to selective loading mode                                   ║
║  • Compressing completed work to summaries                               ║
║  • MC-CHECK will use rapid version                                       ║
║                                                                          ║
║  IMPACT:                                                                 ║
║  • Session can continue normally                                         ║
║  • Quality will be maintained                                            ║
║  • Complex operations still available                                    ║
║                                                                          ║
║  NO ACTION REQUIRED — Informational only.                                ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### YELLOW → RED Transition

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    ZONE TRANSITION: YELLOW → RED                         ║
║                    ⚠ ATTENTION REQUIRED                                 ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Context usage has exceeded 70%.                                         ║
║                                                                          ║
║  CHANGES:                                                                ║
║  • Minimal loading mode active                                           ║
║  • Single skill focus only                                               ║
║  • Preparing handoff capabilities                                        ║
║                                                                          ║
║  IMPACT:                                                                 ║
║  • Complex multi-skill workflows not recommended                         ║
║  • Arena generation will be simplified                                   ║
║  • Quality may begin to degrade                                          ║
║                                                                          ║
║  RECOMMENDED ACTIONS:                                                    ║
║  • Complete current task                                                 ║
║  • Consider session break after this task                                ║
║  • Do not start new complex workflows                                    ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### RED → CRITICAL Transition

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    ZONE TRANSITION: RED → CRITICAL                       ║
║                    🚨 IMMEDIATE ACTION REQUIRED                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Context usage has exceeded 90%.                                         ║
║                                                                          ║
║  IMMEDIATE ACTIONS:                                                      ║
║                                                                          ║
║  1. STOPPING current work at safe point                                  ║
║  2. GENERATING handoff document                                          ║
║  3. SAVING state for session continuity                                  ║
║                                                                          ║
║  YOU MUST:                                                               ║
║  • Start a new session to continue                                       ║
║  • Load the handoff document first in new session                        ║
║  • Resume from the documented state                                      ║
║                                                                          ║
║  HANDOFF LOCATION:                                                       ║
║  learning-log/session-continuity/handoff-[timestamp].yaml                ║
║                                                                          ║
║  Quality cannot be guaranteed in this session beyond this point.         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## CONTEXT ESTIMATION GUIDELINES

### Estimating Current Usage

Context usage is estimated based on:

```
ESTIMATION FACTORS:

1. Message Count
   • Each user message: ~2-5% depending on length
   • Each AI response: ~3-10% depending on length
   • 10 messages typically = 30-50% context

2. File Loading
   • Full SKILL.md file: ~5-8%
   • Foundation file (AIF/PSF/etc.): ~3-5%
   • Specimen file: ~2-4%
   • Persona file: ~2-3%
   • Teaching file: ~3-5%

3. Content Generation
   • Each content variant: ~2-4%
   • Arena with 7 personas: ~15-25%
   • Full MC-CHECK output: ~2-3%

4. Conversation History
   • Iterative conversation: Accumulates quickly
   • Each revision cycle: ~5-10%
```

### Quick Estimation Formula

```
Estimated Context =
  (Message Count × 4%) +
  (Files Loaded × 4%) +
  (Content Variants × 3%) +
  (Arena Runs × 20%)

Example:
  12 messages = 48%
  5 files loaded = 20%
  3 variants = 9%
  1 Arena run = 20%
  TOTAL = 97% → CRITICAL ZONE
```

---

## ZONE STATUS COMMAND

`/context-status` returns:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    CONTEXT STATUS                                        ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Estimated Usage: [XX]%                                                  ║
║  Current Zone: [GREEN/YELLOW/RED/CRITICAL]                               ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  Zone Bar:                                                               ║
║  [████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 40%               ║
║   GREEN      |    YELLOW     |     RED      | CRIT                       ║
║              40%             70%            90%                          ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────── ║
║                                                                          ║
║  Session Stats:                                                          ║
║  • Messages: [XX]                                                        ║
║  • Files loaded: [XX]                                                    ║
║  • Content variants: [XX]                                                ║
║  • Arena runs: [XX]                                                      ║
║                                                                          ║
║  Current Behavior Mode: [FULL/SELECTIVE/MINIMAL/HANDOFF]                 ║
║                                                                          ║
║  [If YELLOW+]                                                            ║
║  Recommendation: [Specific guidance based on zone]                       ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

*Context is finite. Manage it proactively. Never let quality degrade silently.*
