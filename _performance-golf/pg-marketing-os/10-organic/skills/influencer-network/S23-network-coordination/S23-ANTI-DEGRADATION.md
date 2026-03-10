# S23 Network Coordination — Anti-Degradation Protocol

## Version
v1.0 | 2026-03-05

## Mandatory Read
**This file MUST be read before executing S23 Network Coordination.** Reading this file is not optional. Any agent executing this skill without reading this file first is operating blind to known failure modes.

## Purpose
Prevent degradation in network coordination: personas breaking character, engagement appearing artificial, narrative inconsistencies, timing conflicts, brand firewall breaches.

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S23 Network Coordination — Anti-Degradation Protocol v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Allow personas to break character or use voice inconsistent with their Bible. Create coordination patterns that appear artificial with simultaneous engagement or identical language. Breach the brand firewall by revealing network connections between personas.
```

**Write this declaration to your first output file before executing any microskill.**

---

## Fix 1: Project Infrastructure Requirements

### Required Files at Project Start
Before any execution begins:
- [ ] `PROJECT-STATE.md` exists in project root
- [ ] `PROGRESS-LOG.md` exists with session entries
- [ ] All S21 Persona Bibles confirmed present
- [ ] All S22 Account Plans confirmed present

### Per-Session Protocol
**Start of session:**
1. Read PROJECT-STATE.md
2. Read last 3 PROGRESS-LOG.md entries
3. Load S23-AGENT.md and this anti-degradation file

**End of session:**
1. Update PROJECT-STATE.md with current status
2. Add entry to PROGRESS-LOG.md with timestamp

---

## Fix 2: Failure Mode Table

### Coordination-Specific Failure Modes

| Failure Mode | Detection Signal | Immediate Response | Escalation Threshold |
|--------------|------------------|-------------------|---------------------|
| **Personas breaking character** | Persona uses voice/language inconsistent with Bible, references knowledge they shouldn't have | HALT. Review Persona Bible voice/identity. Rewrite coordination to maintain character. | If any coordination plan violates persona voice or knowledge boundaries |
| **Engagement appearing artificial** | Simultaneous engagement, identical language, obvious patterns, too frequent cross-promotion | HALT. Add timing variations, language diversity, reduce frequency. | If coordination patterns would be obvious to external observer |
| **Narrative inconsistencies** | Personas contradict each other, timeline conflicts, incompatible perspectives on same event | HALT. Map narrative arcs, identify conflicts, resolve before coordination plan finalized. | If 2+ personas have incompatible narratives on same topic |
| **Timing conflicts** | Multiple personas posting simultaneously, engagement clustering, no coverage gaps | HALT. Spread posting times, stagger engagement, ensure 24-hour coverage without overlaps. | If >30% of network posts occur in same 2-hour window |
| **Brand firewall breaches** | Persona mentions parent brand, links to brand properties, reveals network connection | HALT. Remove all brand references, audit all personas for firewall integrity. | If ANY persona reveals brand connection |
| **Over-coordination** | Every post gets engagement from all personas, perfect choreography obvious | HALT. Reduce coordination frequency, add randomness, create realistic participation patterns. | If coordination percentage >40% (most content should NOT be cross-promoted) |

---

## Fix 3: Binary Gate Enforcement

### Gates Are PASS/FAIL Only
**Forbidden rationalizations:**
- "Conditional pass pending authenticity review..."
- "Partial coordination sufficient..."
- "Moving forward with minor firewall concerns..."
- "Good enough for network effects..."

**Only valid gate outputs:**
- `PASS` — All criteria met, coordination is authentic and firewall secure
- `FAIL` — Criteria not met, halt execution, escalate to human

### Gate Status in Filenames
If a gate checkpoint file exists (e.g., `GATE_1_AUTHENTICITY_CHECK.md`), it MUST contain `status: PASS`. Any other status means the file should not exist or execution must halt.

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
- Reading AGENT.md and writing "network coordination strategy" without executing individual microskills
- Combining 1.1-1.7 into single "coordination document"
- Writing Layer 4 assembly before Layer 1 microskills complete
- Skipping microskills because "coordination is straightforward"

### S23-Specific Output Table

| Microskill | Output Filename | Minimum Size | Required Sections |
|------------|----------------|--------------|-------------------|
| 0.1 | input-validation-report.md | 2KB | Persona Bible status, Account Plan status, readiness |
| 0.2 | teaching-summary.md | 4KB | Coordination frameworks, choreography principles, narrative sequencing |
| 0.3 | upstream-context-summary.md | 6KB | Persona summaries, account strategies, cross-promotion baseline |
| 1.1 | network-calendar-sync.md | 5KB | Synchronized posting schedule, coverage analysis, conflict resolution |
| 1.2 | engagement-choreography.md | 6KB | Engagement patterns per persona, timing variations, authenticity rules |
| 1.3 | narrative-arc-planning.md | 5KB | Multi-persona story arcs, consistency rules, timeline coordination |
| 1.4 | cross-persona-campaigns.md | 5KB | Campaign concepts, persona angles, execution choreography |
| 1.5 | brand-firewall-protocol.md | 4KB | Firewall rules, violation detection, enforcement mechanisms |
| 1.6 | conflict-resolution-protocol.md | 4KB | Conflict types, resolution procedures, escalation paths |
| 1.7 | amplification-sequences.md | 5KB | Strategic amplification playbook, timing, authenticity maintenance |
| 4.1 | network-coordination-plan.md | 20KB | Complete coordination strategy across all dimensions |
| 4.2 | network-dashboard.md | 8KB | Real-time coordination view, status tracking, alerts |
| 4.3 | execution-log.md | 5KB | Coordination decisions, choreography rationale, lessons |

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

## Fix 6: Authenticity Enforcement Rules

### Coordination Must Look Organic

**RED FLAGS (artificial coordination signals):**
- Simultaneous posting or engagement within 5 minutes
- Identical or near-identical language across personas
- Every post from one persona gets engagement from all others
- Cross-promotion happening on predictable schedule
- Personas always agreeing with each other
- Zero missed engagement opportunities (too perfect)

**GREEN FLAGS (authentic coordination signals):**
- Timing spreads across hours or days
- Language variation that maintains persona voice
- 10-30% cross-promotion rate (most content standalone)
- Random-appearing engagement patterns
- Personas occasionally disagree or have different takes
- Some engagement opportunities missed (realistic behavior)

### Authenticity Checklist Per Coordination Plan
- [ ] Timing variations minimum 2 hours between related actions
- [ ] Language diversity verified (no copy-paste phrasing)
- [ ] Cross-promotion rate <40% of network content
- [ ] Engagement patterns include realistic inconsistencies
- [ ] Persona voice maintained in all coordinated actions
- [ ] Some opportunities intentionally missed for realism

**If any checklist item fails:** HALT and redesign coordination for authenticity.

---

## Fix 7: Narrative Consistency Protocol

### Cross-Persona Narrative Mapping Required

**Before creating narrative arcs:**
1. Map existing narratives per persona (what stories they've told)
2. Identify potential conflicts (incompatible perspectives, timeline issues)
3. Resolve conflicts BEFORE launching multi-persona arc
4. Create narrative consistency rules per arc
5. Designate narrative owner (which persona drives story)

**Narrative Conflict Types:**
- Timeline conflicts (events in different order)
- Perspective conflicts (incompatible views on same event)
- Knowledge conflicts (persona shouldn't know this yet)
- Voice conflicts (story told in inconsistent voice)
- Value conflicts (persona's stated values contradict)

### Narrative Consistency Verification
Each narrative arc MUST include:
- Timeline mapping (what happens when, who knows what when)
- Perspective alignment (how each persona views events from their angle)
- Knowledge boundaries (what each persona can/cannot know)
- Voice consistency rules (how each persona tells their piece)
- Conflict resolution log (any conflicts found and resolved)

**If narrative inconsistencies detected:** HALT and resolve before coordination proceeds.

---

## Fix 8: Brand Firewall Non-Negotiable Rules

### Zero-Tolerance Brand Firewall Policy

**FORBIDDEN (any of these = immediate FAIL):**
- Persona mentions parent brand name
- Persona links to parent brand website or properties
- Persona reveals they're part of a network
- Persona uses parent brand's taglines or distinctive phrases
- Persona coordinates in way that reveals common management
- Persona references other personas too frequently (signals connection)

**REQUIRED:**
- All personas operate as independent entities
- No direct brand links or mentions anywhere
- Cross-promotion uses authentic discovery narratives
- Coordination patterns look coincidental, not managed
- Each persona has independent web presence
- No shared management signals in bios or profiles

### Brand Firewall Audit Checklist
- [ ] No persona mentions parent brand (search all content)
- [ ] No links to parent brand properties
- [ ] Cross-promotion frequency <2 per persona per week
- [ ] Discovery narratives established for all cross-references
- [ ] No shared management signals in profiles
- [ ] Independent web presence per persona verified

**If firewall breach detected:** HALT ALL coordination until resolved.

---

## Fix 9: Timing and Sequencing Rules

### Strategic Timing to Avoid Pattern Detection

**Timing Variation Requirements:**
- Minimum 2 hours between related posts from different personas
- Maximum 30% of daily posts in same 2-hour window
- Cross-promotion engagement delayed 4-24 hours after original post
- Campaign rollout spread across 3-7 days, not all at once
- Amplification sequences staggered with realistic delays

**Sequencing Choreography:**
- Primary content posts first (persona owns topic)
- Supporting personas engage 4+ hours later
- Amplification spreads across 24-72 hours
- Not all personas participate (realistic participation rate)
- Some personas engage early, some later, some not at all

### Timing Verification Checklist
- [ ] No simultaneous posting within 2-hour windows
- [ ] Cross-promotion delayed minimum 4 hours
- [ ] Daily posting spread across 12+ hour window
- [ ] Campaign rollout spans multiple days
- [ ] Realistic participation rates (not 100% every time)

**If timing patterns detectable:** HALT and redesign timing choreography.

---

## Checkpoint Summary

**Before Layer 1:**
- [ ] PROJECT-STATE.md and PROGRESS-LOG.md exist
- [ ] All Persona Bibles and Account Plans loaded
- [ ] Teaching frameworks loaded
- [ ] Stale artifacts archived

**After Each Layer 1 Microskill:**
- [ ] Individual output file created
- [ ] Minimum size met
- [ ] Required sections present
- [ ] Authenticity rules applied
- [ ] No synthesis across microskills yet

**Before Layer 4:**
- [ ] All Layer 1 outputs complete
- [ ] Authenticity checklist passed
- [ ] Narrative consistency verified
- [ ] Brand firewall audit clean
- [ ] Timing patterns undetectable

**Final Gate:**
- [ ] Coordination plan minimum 20KB
- [ ] Network dashboard operational
- [ ] Execution log documents all decisions
- [ ] Authenticity, narrative, firewall, timing all verified

---

## Escalation Triggers

**Immediate human escalation if:**
1. Any persona breaks character
2. Coordination patterns appear artificial
3. Narrative inconsistencies across personas
4. Brand firewall breach detected
5. Timing conflicts or obvious patterns
6. Over-coordination (>40% cross-promotion)

**Report to human:**
- Which failure mode triggered
- Specific examples of failure
- What was attempted to resolve
- Why resolution failed
- What's needed to proceed safely
