# Calibration Records — Engine Tuning Over Time

## Purpose
Track how the engine's predictions and outputs compare to actual performance. Calibration records tune the Virality Scoring Framework (S06) and improve content production quality.

## What to Calibrate

### 1. Virality Score Calibration
Compare predicted RSF scores to actual content performance.

```yaml
calibration_id: CAL-001
date: 2026-03-04
batch_size: 10  # number of content pieces evaluated

predictions:
  - content_id: "..."
    predicted_rsf: 72
    actual_performance:
      views: 15000
      engagement_rate: 4.2%
      shares: 340
    derived_actual_rsf: 68
    delta: -4

accuracy_metrics:
  mean_absolute_error: 5.2
  correlation: 0.85
  overpredict_rate: 40%
  underpredict_rate: 60%

calibration_adjustments:
  - dimension: emotional_activation
    adjustment: "-0.5 average (engine overweights aspiration content)"
  - dimension: platform_fit
    adjustment: "+1.0 for carousel format (engine undervalues saves)"

applied_to_vsf: true|false
```

### 2. Hook Performance Calibration
Track which hook types actually perform best by platform.

### 3. Posting Time Calibration
Verify recommended posting windows against actual engagement data.

### 4. Arena Persona Calibration
Track which persona's content wins most often and adjust weights.

### Naming Convention
`CAL-{number}_{date}_{type}.yaml`
Types: `rsf`, `hooks`, `timing`, `arena`, `format`

## Update Frequency
- RSF calibration: After every 10 published pieces
- Hook calibration: Monthly
- Timing calibration: Bi-weekly for first 3 months, then monthly
- Arena calibration: After every 5 arena competitions
