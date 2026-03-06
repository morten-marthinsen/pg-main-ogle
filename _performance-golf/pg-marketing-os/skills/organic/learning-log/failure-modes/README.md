# Failure Modes — What Didn't Work and Why

## Purpose
Document content that underperformed expectations so the engine gets smarter over time. Every failure is data. The goal is to never repeat the same mistake.

## Capture Protocol
After S19 (Performance Analysis) identifies underperforming content:

1. **Document the failure** using the template below
2. **Classify the failure mode** (hook, timing, format, topic, audience mismatch)
3. **Extract the learning** that prevents recurrence
4. **Update relevant teachings** if the failure reveals a gap

## File Format
```yaml
failure_id: FM-001
date: 2026-03-04
content_reference: "[link or ID of failed content]"
platform: instagram
format: reel
expected_performance:
  metric: views
  target: 10000
  actual: 500
  gap: -95%

failure_classification:
  primary: hook_failure | timing_failure | format_mismatch | topic_mismatch | audience_mismatch | algorithm_penalty | quality_issue
  secondary: [optional secondary cause]

analysis:
  what_happened: "..."
  why_it_failed: "..."
  what_we_learned: "..."

corrective_action:
  immediate: "..."
  systemic: "..."
  teaching_to_update: "[yaml file if applicable]"

similar_failures: [list of related FM-IDs]
resolved: true|false
```

### Naming Convention
`FM-{number}_{date}_{platform}_{classification}.yaml`

## Teaching Alignment
- S20 Learning Capture feeds this directory
- Anti-degradation system uses failure patterns to prevent quality drift
