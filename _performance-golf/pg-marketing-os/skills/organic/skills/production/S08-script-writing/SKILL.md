---
name: organic-script-writing
description: >-
  Platform-native video script production for organic short-form and long-form
  content. Use when producing video scripts for Reels, TikTok, YouTube Shorts,
  or YouTube long-form after the Campaign Brief (S07 CBF) is complete. Produces
  platform-specific video scripts optimized for attention, retention, and action.
  Every script runs through the Arena (S13) before finalization. Trigger when
  users mention video scripts, Reels scripts, TikTok scripts, YouTube scripts,
  short-form video content, or scripting talking-head content. Requires the
  Campaign Brief File (CBF) from S07. Arena is mandatory for all output.
---

# S08: SCRIPT WRITING
## Video Scripts (Short-Form + Long-Form)
## Gate: G07 (Requires S07 CBF) | Output: Video Scripts

---

## PURPOSE

This skill produces platform-native video scripts optimized for attention, retention, and action. Every script runs through the Arena before finalization.

**Output:** Platform-specific video scripts
**Requires:** Campaign Brief File (CBF)
**Arena:** MANDATORY for all script production

## ANTI-DEGRADATION

- Read `S08-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `skills/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## REQUIRED CONTEXT

### Prerequisite Files
- Campaign Brief: `outputs/[campaign]-CBF.yaml`

### Teachings to Load
- `teachings/content-strategy/hormozi-content-to-leads.yaml`
- `teachings/virality/kane-hook-point-system.yaml`
- `teachings/virality/berger-stepps-framework.yaml`
- `teachings/audience-psychology/eyal-hook-model.yaml`

### Specimens to Load
- 5+ script specimens for target platform
- Hook specimens matching content pillar
- High-retention intro patterns

---

## INPUT REQUIREMENTS

From Campaign Brief, plus:

```yaml
script_request:
  content_title: [Working title]
  platform: [Target platform]
  format: [Reel/TikTok/Short/Long-form]
  target_length: [Seconds or minutes]
  content_pillar: [From CAF]
  content_function: [Awareness/Engagement/Conversion/Community]
  key_message: [Core message to deliver]
  desired_action: [What we want viewer to do]
  tone: [From BVF, campaign-specific]
  hooks_to_consider: [From HLF]
```

---

## SCRIPT ARCHITECTURE

### Short-Form Script Structure (15-60 seconds)

```
┌─────────────────────────────────────────────────┐
│ HOOK (0-3 seconds)                              │
│ ─────────────────────────────────────────────── │
│ Pattern interrupt that stops the scroll         │
│ Visual + verbal hook working together           │
│ Must create IMMEDIATE curiosity or emotion      │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ CONTEXT (3-8 seconds)                           │
│ ─────────────────────────────────────────────── │
│ Quick setup that justifies the hook             │
│ Establishes why this matters NOW                │
│ Transitions smoothly to value                   │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ VALUE DELIVERY (8-45 seconds)                   │
│ ─────────────────────────────────────────────── │
│ The actual content/teaching/story               │
│ Dense value, no filler                          │
│ Pattern interrupt every 5-8 seconds             │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ CTA (final 3-5 seconds)                         │
│ ─────────────────────────────────────────────── │
│ Clear, single action                            │
│ Platform-appropriate (follow, save, comment)    │
│ Optional: loop back to hook                     │
└─────────────────────────────────────────────────┘
```

### Long-Form Script Structure (8+ minutes)

```
┌─────────────────────────────────────────────────┐
│ COLD OPEN HOOK (0-30 seconds)                   │
│ ─────────────────────────────────────────────── │
│ The most compelling moment from the video       │
│ Creates immediate commitment to watch more      │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ INTRO + VALUE PROMISE (30-90 seconds)           │
│ ─────────────────────────────────────────────── │
│ What they'll learn/gain from watching           │
│ Why this matters to them specifically           │
│ Establishes authority                           │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ BODY SECTIONS (bulk of video)                   │
│ ─────────────────────────────────────────────── │
│ 3-7 distinct sections with:                     │
│   - Section hook (re-engagement)                │
│   - Content delivery                            │
│   - Section summary                             │
│ Pattern interrupt every 30-60 seconds           │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ CLOSE + CTA (final 30-60 seconds)               │
│ ─────────────────────────────────────────────── │
│ Summary of key points                           │
│ Clear next step                                 │
│ Open loop for next video (optional)             │
└─────────────────────────────────────────────────┘
```

---

## SCRIPT WRITING PROCESS

### Step 1: Hook Selection
From HLF, select 3-5 potential hooks. Score each against:
- Platform fit
- Content pillar fit
- Audience relevance
- Virality potential

### Step 2: Structure Planning
Map the script architecture to specific content:
- What's the value being delivered?
- Where are the pattern interrupt moments?
- What's the retention strategy?

### Step 3: Draft Generation
Write full script following structure. Include:
- Speaking directions [IN BRACKETS]
- Visual cues [ON SCREEN: description]
- B-roll suggestions [B-ROLL: description]
- Text overlay specs [TEXT: exact text]

### Step 4: Arena Submission
Submit draft to Arena for 7-persona competition.

### Step 5: Synthesis & Finalization
Incorporate Arena synthesis. Final polish.

### Step 6: Virality Scoring
Score final script. Must meet minimum threshold.

---

## SCRIPT FORMAT TEMPLATE

```markdown
# SCRIPT: [Title]

## Metadata
- Platform: [Platform]
- Target Length: [Duration]
- Content Pillar: [Pillar]
- Function: [Awareness/Engagement/Conversion/Community]
- Hook Type: [From taxonomy]

---

## HOOK (0:00 - 0:03)

**VISUAL:**
[What's on screen - first frame matters for thumbnail]

**AUDIO/SPEAKING:**
"[Exact hook text]"

**TEXT OVERLAY:**
[If applicable]

---

## CONTEXT (0:03 - 0:08)

**VISUAL:**
[Description]

**AUDIO/SPEAKING:**
"[Context setup - why this matters]"

---

## VALUE SECTION 1 (0:08 - 0:XX)

**VISUAL:**
[Description]

**AUDIO/SPEAKING:**
"[Content delivery]"

**PATTERN INTERRUPT @ [timestamp]:**
[Cut/zoom/visual change]

**TEXT OVERLAY:**
[Key point to reinforce]

---

## [Continue for each section]

---

## CTA (final seconds)

**VISUAL:**
[Description]

**AUDIO/SPEAKING:**
"[Clear call to action]"

---

## Production Notes
- Pacing: [Fast/Medium/Slow]
- Energy: [High/Medium/Calm]
- B-Roll Needed: [List]
- Graphics Needed: [List]

---

## Virality Score
| Dimension | Score | Rationale |
|-----------|-------|-----------|
| EA | /10 | |
| SC | /10 | |
| PI | /10 | |
| PF | /10 | |
| SH | /10 | |
| **TOTAL** | /100 | |

---

## Arena Notes
- Strongest elements from: [Personas]
- Key synthesis decisions: [What changed]
```

---

## PLATFORM-SPECIFIC ADAPTATIONS

### TikTok Scripts
- Maximum hook in 0.5-1 second
- Casual, conversational energy
- Native text styling
- Consider trending sounds
- Loop potential

### Instagram Reels
- Strong visual hook (thumbnail matters)
- Caption strategy integrated
- Save triggers embedded
- Slightly more polished than TikTok

### YouTube Shorts
- Title + thumbnail synergy
- Slightly longer hook window (3 sec)
- Can reference main channel
- End screens consideration

### YouTube Long-Form
- Cold open essential
- Chapter-friendly structure
- Multiple retention hooks
- Subscribe CTA placement strategic

---

## VALIDATION REQUIREMENTS

Script passes when:
- [ ] Hook follows taxonomy pattern
- [ ] Structure matches platform requirements
- [ ] Pattern interrupts at required frequency
- [ ] CTA is clear and single
- [ ] Arena has run
- [ ] Virality Score ≥ 60
- [ ] Anti-slop scan passes

---

## OUTPUT LOCATION

Save scripts to:
```
skills/production/S08-script-writing/outputs/[campaign]-[title]-script.md
```

---

*Scripts are architecture. Every word is load-bearing.*
