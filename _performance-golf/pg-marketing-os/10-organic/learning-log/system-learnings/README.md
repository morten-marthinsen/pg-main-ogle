# SYSTEM LEARNINGS — LEARNING LOG
## Compounding Intelligence Repository

---

## PURPOSE

This directory captures learnings that improve the engine over time. Every campaign execution, every content piece, every performance analysis generates insights that get fed back into the system.

**The flywheel:**
```
Execute → Analyze → Learn → Update Engine → Execute Better
```

---

## LEARNING TYPES

### 1. Teaching Updates
When we discover a framework needs refinement or a new principle emerges.

**File Pattern:** `teaching-update-[date]-[topic].yaml`
**Location:** `learning-log/system-learnings/`

```yaml
learning_id: "TU-2026-03-XX"
date: "YYYY-MM-DD"
type: "teaching_update"
source_campaign: "[Campaign name]"

affected_teaching: "[Teaching file path]"
current_state: |
  [What the teaching currently says]

discovery: |
  [What we learned from execution]

update_required: |
  [How the teaching should change]

evidence:
  - "[Specific data point]"
  - "[Specific outcome]"

impact_assessment: "[High/Medium/Low]"
status: "[Pending/Applied/Rejected]"
```

### 2. Specimen Additions
When we identify new content worth adding to the specimen library.

**File Pattern:** `specimen-add-[date]-[platform].yaml`
**Location:** `learning-log/system-learnings/`

```yaml
learning_id: "SA-2026-03-XX"
date: "YYYY-MM-DD"
type: "specimen_addition"

source_url: "[Where we found it]"
platform: "[Platform]"
format: "[Format type]"
why_notable: |
  [What makes this specimen-worthy]

performance_data:
  views: "[If known]"
  engagement: "[If known]"
  shares: "[If known]"

specimen_category: "[Where it should be filed]"
status: "[Pending/Added/Rejected]"
```

### 3. Skill Refinements
When a skill's process needs adjustment based on execution experience.

**File Pattern:** `skill-refinement-[date]-[skill].yaml`
**Location:** `learning-log/system-learnings/`

```yaml
learning_id: "SR-2026-03-XX"
date: "YYYY-MM-DD"
type: "skill_refinement"
source_campaign: "[Campaign name]"

affected_skill: "[S0X: Skill Name]"
current_process: |
  [What the skill currently does]

friction_point: |
  [What didn't work or was inefficient]

proposed_refinement: |
  [How the skill should change]

evidence:
  - "[What showed us this was a problem]"

impact_assessment: "[High/Medium/Low]"
status: "[Pending/Applied/Rejected]"
```

### 4. Gate Adjustments
When gates are too strict, too loose, or need new conditions.

**File Pattern:** `gate-adjustment-[date]-[gate].yaml`
**Location:** `learning-log/system-learnings/`

```yaml
learning_id: "GA-2026-03-XX"
date: "YYYY-MM-DD"
type: "gate_adjustment"

affected_gate: "[G0X]"
current_condition: |
  [Current gate requirements]

issue: |
  [Why current gate is problematic]

proposed_adjustment: |
  [New gate conditions]

reasoning: |
  [Why this improves quality without blocking unnecessarily]

status: "[Pending/Applied/Rejected]"
```

### 5. Hook Discoveries
When new hook patterns emerge from high-performing content.

**File Pattern:** `hook-discovery-[date].yaml`
**Location:** `learning-log/system-learnings/`

```yaml
learning_id: "HD-2026-03-XX"
date: "YYYY-MM-DD"
type: "hook_discovery"

discovered_hook:
  text: "[Exact hook text]"
  pattern: "[What makes it work]"
  platform: "[Where it worked]"

performance_data:
  content_id: "[Reference]"
  metrics: "[Performance]"

hook_taxonomy_update:
  fits_existing_type: "[Yes/No]"
  existing_type: "[If yes, which type]"
  new_type_needed: "[If no, proposed type name]"

status: "[Pending/Added]"
```

### 6. Failure Mode Documentation
When something fails systematically and needs structural prevention.

**File Pattern:** `failure-mode-[date]-[issue].yaml`
**Location:** `learning-log/failure-modes/`

```yaml
learning_id: "FM-2026-03-XX"
date: "YYYY-MM-DD"
type: "failure_mode"

failure_description: |
  [What went wrong]

root_cause: |
  [Why it went wrong]

impact: |
  [What was the cost]

structural_fix: |
  [System change to prevent recurrence]

fix_implemented: "[Yes/No]"
implementation_date: "[Date if yes]"
implementation_location: "[Where in system]"
```

---

## LEARNING CAPTURE WORKFLOW

### From S19: Performance Analysis
1. Analyze content performance
2. Identify variance from prediction
3. Extract learning candidates
4. Document in appropriate learning type
5. Mark for review

### From S20: Learning Capture
1. Review pending learnings
2. Validate with additional data
3. Determine system impact
4. Apply or reject with reasoning
5. Update affected system files

### Weekly Review
- Review all pending learnings
- Prioritize high-impact updates
- Apply batch updates
- Archive completed learnings

---

## CALIBRATION RECORDS

Track prediction accuracy to improve Virality Scoring:

**Location:** `learning-log/calibration-records/`

```yaml
calibration_id: "CAL-2026-03-XX"
date: "YYYY-MM-DD"
content_id: "[Reference]"

prediction:
  virality_score: [0-100]
  dimension_scores:
    ea: [1-10]
    sc: [1-10]
    pi: [1-10]
    pf: [1-10]
    sh: [1-10]

actual_performance:
  views: "[X]"
  engagement_rate: "[%]"
  save_rate: "[%]"
  share_rate: "[%]"

variance_analysis: |
  [Which predictions were off and why]

calibration_insight: |
  [What this tells us about scoring]
```

---

## ACCESS PATTERNS

**When creating new content:**
- Check recent `hook-discovery` for new patterns
- Review `failure-modes` to avoid known issues

**When refining skills:**
- Review `skill-refinement` history
- Look for patterns across multiple learnings

**When scoring content:**
- Reference `calibration-records` for accuracy
- Adjust based on historical variance

---

## COMPOUNDING PRINCIPLE

Every learning makes the next execution better.
Every campaign is a data point.
The engine gets smarter with every cycle.

**Never delete learnings.** Archive, don't remove.
**Always apply or reject with reasoning.** No limbo.
**Connect learnings to system files.** No orphaned insights.

---

*What we learn, we keep. What we keep, we use. What we use, we improve.*
