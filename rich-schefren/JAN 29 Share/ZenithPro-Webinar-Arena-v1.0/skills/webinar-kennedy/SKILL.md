---
name: webinar-kennedy
description: Dan Kennedy complete "Selling One To Many" methodology. Use for end-to-end group selling presentations across any media (stage, webcast, DVD). Orchestrates all Kennedy component skills.
license: Private
metadata:
  version: 1.1.0
  author: Rich Schefren (frameworks by Dan Kennedy)
  category: webinar-orchestrator
  framework_count: 87
  skills_orchestrated: 6
  updated: 2025-12-20
---

# Kennedy "Selling One To Many" System

## IMPORTANT: Silent Critique Workflow

**After generating any output with this skill, Claude MUST run the webinar-critic agent BEFORE presenting to user.**

```
1. Generate draft using this skill (user does not see)
2. Run webinar-critic agent on draft (user does not see)
3. Log critique findings to ~/.claude/agents/webinar-critic/logs/critique-log.md
4. Log to central system: ~/.claude/learning-system/logs/central-log.md
5. Apply all fixes from critique (user does not see)
6. Present ONLY the final polished output to user
```

**The user sees:** Polished final output only
**The user does NOT see:** Draft, critique, or fix process

---

Dan Kennedy's comprehensive methodology for group selling presentations, distilled from decades of direct response marketing, infomercials, and stage selling experience.

## When to Use This Skill

- Building complete group selling presentation (any media)
- Need media-agnostic approach (stage = webcast = DVD)
- Converting stage presentation to webcast or vice versa
- Want direct-sales precision applied to group selling
- Need structure-first, engineering approach

## Kennedy's Core Philosophy

"A group presentation is a group presentation is a group presentation. The structure elements don't change that much, if at all, depending on delivery."

**Three Foundational Truths:**
1. Structure is universal - media changes execution, not architecture
2. Prevention over conversion - stopping checkout > converting interest
3. No false borders - there is no line between "content" and "selling"

## Complete System: 87 Frameworks Across 6 Skills

### Component Skills

1. **webinar-kennedy-architecture** (12 frameworks)
   - Universal structure principles
   - Media adaptation strategies
   - Time box engineering
   - Evergreen appeal design

2. **webinar-kennedy-intro** (24 frameworks)
   - The Open: checkout prevention
   - Authority/celebrity establishment
   - Stay-tuned tactics
   - Why you, why this, why now

3. **webinar-kennedy-content** (31 frameworks)
   - The Middle: commitment creation
   - E-Factors (10 emotional drivers)
   - Proof methods
   - Interest retention

4. **webinar-kennedy-transition** (8 frameworks)
   - Bridges and segues
   - Content-to-commercial flow
   - Trial close integration
   - No-border selling

5. **webinar-kennedy-close** (9 frameworks)
   - Offer clarity and structure
   - Urgency (believed scarcity)
   - Ease of buying
   - Risk reversal math

6. **webinar-kennedy-delivery** (3 framework clusters)
   - Physical environment control
   - Video/technical production
   - Presenter tells to avoid

## Kennedy's Complete Workflow

### Phase 1: Architecture
1. Define total available time
2. Create time boxes (Open 15%, Middle 60-70%, Bridge 5-10%, Close 15-20%)
3. Identify media format and adapt execution
4. Design evergreen core with replaceable timely hooks

### Phase 2: Build the Open
1. Create checkout prevention elements
2. Establish who/why (even for known audiences)
3. Stack stay-tuned tactics
4. Never assume anything is pre-established

### Phase 3: Build the Middle
1. Map E-Factors relevant to offer
2. Design commitment creation sequence
3. Handle all possible objections
4. Plan 7-21 repetitions of key ideas
5. Mix content types and media for interest

### Phase 4: Design Transitions
1. Plan bridges (acknowledged) and segues (seamless)
2. Integrate trial closes throughout
3. Design content-to-commercial bridge
4. Eliminate physiological change tells

### Phase 5: Build the Close
1. Create clearly understood offer
2. Build price-to-value demonstration
3. Create believed scarcity
4. Remove all buying friction
5. Plan risk reversal (it's just math)

### Phase 6: Delivery Preparation
1. Set up physical environment (if applicable)
2. Plan video production approach
3. Rehearse to eliminate tells
4. Get more footage than needed

## Kennedy's Unique Contributions

**What Kennedy covers that others don't:**
- Media-agnostic architecture (stage = webcast = DVD structurally)
- Physical room sales prevention department (blocking exits, stampede creation)
- Pre-presentation establishment control
- Time box engineering approach
- Direct-sales precision in group context
- E-Factors (10 emotional drivers)
- Assumed knowledge trap
- Evergreen appeal architecture

**Kennedy's Philosophy in One Quote:**
> "Think of the presentation, no matter how good a job you do in advance of it, think of it as happening in a vacuum, as if they saw nothing before they got there, they heard nothing before they got there, they have fallen out of the sky into the room or in front of the screen."

**What Kennedy doesn't cover:**
- Pre-webinar funnel (liquidator, indoctrination)
- Post-webinar follow-up sequences
- Specific slide design
- Webinar software/tech
- Team training systems

## Using This Skill

### For Complete Webinar Creation:
```
1. Invoke webinar-kennedy-architecture → Plan structure
2. Invoke webinar-kennedy-intro → Build the Open
3. Invoke webinar-kennedy-content → Build the Middle
4. Invoke webinar-kennedy-transition → Design bridges
5. Invoke webinar-kennedy-close → Build the Close
6. Invoke webinar-kennedy-delivery → Technical execution
```

### For Specific Challenges:
- **Low show-up-to-stay:** → webinar-kennedy-intro
- **Weak conversion:** → webinar-kennedy-content + webinar-kennedy-close
- **Awkward selling transition:** → webinar-kennedy-transition
- **Poor video quality:** → webinar-kennedy-delivery
- **Structure confusion:** → webinar-kennedy-architecture

## Related Skills

- **webinar-expert** - Meta-synthesis across all webinar experts
- **webinar-brunson** - Russell Brunson's Perfect Webinar
- **webinar-kern** - Frank Kern's Ultimate Webinar Blueprint
- **webinar-fladlien** - Jason Fladlien's One-to-Many
- **webinar-cage** - Michael Cage's Teleseminar System
- **webinar-joon** - Peng Joon's Event Codex

---

*"The idea that there is a border between primary content and selling, all that does is get you in trouble."* — Dan Kennedy
