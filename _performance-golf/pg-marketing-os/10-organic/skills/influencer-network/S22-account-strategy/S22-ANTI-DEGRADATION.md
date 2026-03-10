# S22 Account Strategy — Anti-Degradation Protocol

## Version
v1.0 | 2026-03-05

## Mandatory Read
**This file MUST be read before executing S22 Account Strategy.** Reading this file is not optional. Any agent executing this skill without reading this file first is operating blind to known failure modes.

## Purpose
Prevent degradation in account strategy development: identical strategies across personas, missing platform-specific adaptations, growth strategy without tactics, no cross-promotion plan.

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S22 Account Strategy — Anti-Degradation Protocol v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Create identical strategies across personas with >70% overlap. Use vague growth tactics like "use hashtags" or "engage with audience" without specifics. Skip platform-specific adaptation for bio copy, posting times, or content formats.
```

**Write this declaration to your first output file before executing any microskill.**

---

## Fix 1: Project Infrastructure Requirements

### Required Files at Project Start
Before any execution begins:
- [ ] `PROJECT-STATE.md` exists in project root
- [ ] `PROGRESS-LOG.md` exists with session entries
- [ ] S21 Persona Bibles confirmed present

### Per-Session Protocol
**Start of session:**
1. Read PROJECT-STATE.md
2. Read last 3 PROGRESS-LOG.md entries
3. Load S22-AGENT.md and this anti-degradation file

**End of session:**
1. Update PROJECT-STATE.md with current status
2. Add entry to PROGRESS-LOG.md with timestamp

---

## Fix 2: Failure Mode Table

### Account Strategy-Specific Failure Modes

| Failure Mode | Detection Signal | Immediate Response | Escalation Threshold |
|--------------|------------------|-------------------|---------------------|
| **Identical strategies across personas** | Same platforms, same content calendar, same growth tactics for multiple personas | HALT. Review persona differentiation. Redesign strategies to reflect archetype and niche differences. | If 2+ personas have >70% strategy overlap |
| **Missing platform adaptation** | Bio copy doesn't respect character limits, content calendar ignores platform norms, growth tactics generic | HALT. Review platform specifications. Adapt all elements to platform constraints and conventions. | If any strategy missing platform-specific details |
| **Growth strategy without tactics** | Vague instructions like "use hashtags" or "engage with audience" without specifics | HALT. Convert strategy to tactics: which hashtags, when to post, who to engage with. | If growth strategy lacks actionable steps |
| **No cross-promotion plan** | Personas operate independently with no reference to network | HALT. Design cross-promotion map showing how personas amplify each other. | If cross-promotion section empty or generic |
| **Brand firewall breach** | Personas reference parent brand or reveal connection | HALT. Remove all parent brand references. Ensure personas operate as independent entities. | If any persona links to parent brand |
| **Unsustainable posting rhythm** | Content calendar requires daily posts across multiple platforms for all personas | HALT. Assess production capacity. Design realistic posting frequency. | If total network posts >50/week without production team |

---

## Fix 3: Binary Gate Enforcement

### Gates Are PASS/FAIL Only
**Forbidden rationalizations:**
- "Conditional pass pending..."
- "Partial completion sufficient for now..."
- "Moving forward with caveat..."
- "Good enough given constraints..."

**Only valid gate outputs:**
- `PASS` — All criteria met, proceed to next layer
- `FAIL` — Criteria not met, halt execution, escalate to human

### Gate Status in Filenames
If a gate checkpoint file exists (e.g., `GATE_0_INPUT_VALIDATION.md`), it MUST contain `status: PASS`. Any other status means the file should not exist or execution must halt.

---

## Fix 4: Per-Microskill Output Protocol

### Universal Rules
1. **One file per microskill** — Every microskill produces its own output file
2. **No premature synthesis** — Don't combine microskill outputs until Layer 4
3. **Minimum sizes enforced** — Files below minimum size trigger investigation
4. **Structured formats required** — Use templates, not freeform text
5. **Cross-references mandatory** — Each microskill file references its inputs
6. **Timestamp all outputs** — Include execution timestamp in metadata
7. **Version outputs** — Track output version if regenerated

### Forbidden Synthesis Behaviors
- Reading AGENT.md and writing "comprehensive strategy" without executing individual microskills
- Combining 1.1-1.6 into single "strategy document"
- Writing Layer 4 assembly before Layer 1 microskills complete
- Skipping microskills because "they're similar to previous"

### S22-Specific Output Table

| Microskill | Output Filename | Minimum Size | Required Sections |
|------------|----------------|--------------|-------------------|
| 0.1 | input-validation-report.md | 2KB | Persona Bible status, PSF status, readiness decision |
| 0.2 | teaching-summary.md | 4KB | Platform frameworks, growth teachings, profile optimization |
| 0.3 | upstream-context-summary.md | 5KB | Persona summaries, platform priorities, network context |
| 1.1 | platform-selection-per-persona.md | 4KB | Platform assignments per persona with rationale |
| 1.2 | profile-optimization-specs.md | 6KB | Bio copy, profile specs per persona × platform |
| 1.3 | content-calendar-frameworks.md | 5KB | Posting frequency, content mix per persona |
| 1.4 | growth-strategy-tactics.md | 6KB | Specific tactics per persona × platform |
| 1.5 | cross-promotion-map.md | 4KB | How personas reference and amplify each other |
| 1.6 | audience-targeting-plans.md | 5KB | Target followers, where to find them, engagement tactics |
| 4.1 | account-plan-[persona]-[platform].md | 15KB | Complete account strategy per combination |
| 4.2 | network-sync-report.md | 5KB | Conflict verification, cross-promotion coherence |
| 4.3 | execution-log.md | 4KB | Platform decisions, strategy trade-offs |

---

## Fix 5: Stale Artifact Cleanup

### Before Starting Layer 1
Check for stale output files from previous incomplete runs:
- Any `*-draft-*.md` files older than current session
- Any `GATE_*.md` files with status other than PASS
- Any incomplete Layer 1 outputs from abandoned runs

**Cleanup protocol:**
1. Move stale files to `archive/session-[timestamp]/`
2. Log cleanup action in PROGRESS-LOG.md
3. Start fresh execution

### Artifact Staleness Signals
- Modified timestamp >24 hours old but project still active
- File exists but referenced by no downstream microskills
- Gate file with FAIL status but execution continued anyway

---

## Fix 6: Platform-Specific Adaptation Enforcement

### Required Platform Adaptations

**Per platform, account strategy MUST include:**
- Bio copy respecting character limits (Twitter 160, Instagram 150, LinkedIn 2000)
- Profile specs matching platform conventions (profile photo dimensions, header image)
- Content calendar aligned with platform best practices (LinkedIn weekday, Instagram evening)
- Growth tactics specific to platform mechanics (Twitter threads, LinkedIn carousels, TikTok duets)

### Validation Checklist Per Persona × Platform
- [ ] Bio copy within character limit
- [ ] Profile photo dimensions specified for platform
- [ ] Posting times aligned with platform peak engagement
- [ ] Growth tactics use platform-specific features
- [ ] Content formats match platform strengths

**If any checklist item fails:** HALT and complete platform adaptation before proceeding.

---

## Fix 7: Cross-Promotion Authenticity Rules

### Cross-Promotion Must Look Organic

**NEVER:**
- Have all personas share the same content simultaneously
- Use identical language when personas reference each other
- Create obvious coordination patterns (e.g., Persona A always shares Persona B on Tuesdays)
- Make personas tag each other constantly

**ALWAYS:**
- Design varied timing for cross-promotion
- Use persona-specific language when referencing others
- Create natural reasons for engagement (genuine value-add, different angle)
- Maintain persona voice even when promoting others

### Cross-Promotion Map Requirements
- Frequency limits (max 1-2 cross-promotions per persona per week)
- Varied interaction types (share, comment, quote, respond)
- Authentic value rationale (why would this persona genuinely share this?)
- Brand firewall maintenance (never reveal network connection)

---

## Fix 8: Growth Strategy Tactical Depth

### Growth Strategy Anti-Pattern: Vague Instructions

**FORBIDDEN:**
- "Use relevant hashtags"
- "Engage with audience"
- "Post consistently"
- "Collaborate with others"

**REQUIRED:**
- "Use hashtags: #SpecificTopic (500K posts), #NicheTerm (50K posts), #BrandedPhrase — research trending hashtags in niche weekly"
- "Engage with: [List 10-20 specific accounts], comment on their posts within 1 hour of posting, ask questions, add value"
- "Post schedule: Monday 9am [format], Wednesday 2pm [format], Friday 5pm [format] — test and optimize based on engagement"
- "Collaborate with: [3-5 specific creators in niche], pitch collaboration angles: [specific ideas], reach out via DM with personalized message"

### Growth Strategy Validation
Each growth strategy MUST include:
- Specific accounts to engage with (names, not types)
- Specific hashtags with follower counts
- Specific posting times with format per day
- Specific collaboration targets with pitch angles

**If growth strategy lacks these specifics:** HALT and develop tactical depth.

---

## Fix 9: Production Capacity Reality Check

### Sustainable Posting Rhythm Assessment

**Before finalizing content calendars:**
1. Calculate total posts per week across all personas
2. Estimate production time per post type
3. Calculate total production hours per week
4. Compare to available production capacity

**Thresholds:**
- Solo creator: Maximum 10-15 posts/week across all personas
- Small team (2-3): Maximum 30-40 posts/week
- Larger team (4+): Maximum 50+ posts/week

**If content calendar exceeds capacity:** HALT and reduce posting frequency or prioritize platforms.

### Capacity Planning Section Required
Account strategy MUST include:
- Total posts per week calculation
- Production time estimate per post type
- Capacity assessment (sustainable vs. unsustainable)
- Scaling plan (when/how to increase posting frequency)

---

## Checkpoint Summary

**Before Layer 1:**
- [ ] PROJECT-STATE.md and PROGRESS-LOG.md exist
- [ ] All S21 Persona Bibles loaded
- [ ] Teaching frameworks loaded
- [ ] Stale artifacts archived

**After Each Layer 1 Microskill:**
- [ ] Individual output file created
- [ ] Minimum size met
- [ ] Required sections present
- [ ] Platform-specific adaptations included
- [ ] No synthesis across microskills yet

**Before Layer 4:**
- [ ] All Layer 1 outputs complete
- [ ] Platform adaptations validated
- [ ] Cross-promotion authenticity verified
- [ ] Growth strategy tactical depth confirmed
- [ ] Production capacity reality-checked

**Final Gate:**
- [ ] Account plans minimum 15KB per persona × platform
- [ ] Network sync report confirms no conflicts
- [ ] Execution log documents all decisions

---

## Escalation Triggers

**Immediate human escalation if:**
1. 70%+ strategy overlap across personas
2. Any platform adaptation missing
3. Growth strategy lacks tactical specifics
4. Cross-promotion reveals brand connection
5. Content calendar exceeds production capacity
6. Any gate status other than PASS

**Report to human:**
- Which failure mode triggered
- What was attempted
- Why it failed
- What's needed to proceed
