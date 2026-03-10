# Event-Driven Reminder Protocol

**Version:** 1.0
**Created:** 2026-03-10
**Authority:** Companion to SYSTEM-CORE.md MC-CHECK — replaces fixed-schedule mid-layer checks with detector-triggered reminders
**Source:** OpenDev Enhancement 1 (Event-Driven System Reminders)

---

## Purpose

Static MC-CHECK schedules fire even when execution is clean (wasting tokens) and miss degradation that occurs between checkpoints. Event-driven detectors monitor for specific failure conditions and inject targeted reminders ONLY when a condition is detected.

**Key principle:** "Static prompts fade; dynamic reminders sustain alignment."

---

## MC-CHECK Schedule Change

### Static Triggers (kept — reduced set)

| Trigger | Why Kept |
|---------|----------|
| **Layer entry** | Verify prerequisites before starting — irreplaceable |
| **Gate validation** | Binary check before declaring complete — irreplaceable |

### Event-Driven Triggers (replace mid-layer, output, context, tool-use triggers)

| Former Static Trigger | Now Handled By |
|----------------------|----------------|
| Mid-layer (every 3-4 microskills) | Detectors 1, 2, 4, 7 |
| Before output generation | Detector 2 (rushing) |
| Context threshold 75% | Detector 6 (context pressure) |
| After major tool use | Detector 7 (stale reads) |

**No overhead when execution is clean.** Detectors fire ONLY when a condition is flagged.

---

## Detector Definitions

### Detector 1: Synthesis Detector

| Field | Value |
|-------|-------|
| **Trigger** | Agent references content from an upstream file it has NOT read in the current session |
| **Signal** | Uses specific data (quote, score, mechanism name) without a preceding Read tool call for that file |
| **Detection** | Track file reads via hook state; compare against data references in output |
| **Implemented In** | `reminder_detector.py` |

**Reminder Template:**
> SYNTHESIS WARNING: You referenced data from [file] without reading it in this session. You may be generating from cached memory, not from source files. ACTION: Read [file] now before continuing. Quote the specific line you need.

---

### Detector 2: Rushing Detector

| Field | Value |
|-------|-------|
| **Trigger** | Output file size falls below 60% of the microskill's minimum threshold |
| **Signal** | File written by Write/Edit tool is undersized |
| **Detection** | Compare file size against SYSTEM-CORE.md minimum thresholds |
| **Implemented In** | `reminder_detector.py` |

**Reminder Template:**
> RUSHING ALERT: [filename] is [X]KB — the minimum for [microskill-type] is [Y]KB. This suggests abbreviated output. Re-read the microskill spec: [spec-path]. ACTION: Re-execute this microskill with full output. Do not proceed.

---

### Detector 3: Voice Drift / Convergence Detector

| Field | Value |
|-------|-------|
| **Trigger** | During Arena rounds, 3+ persona outputs share >40% 5-gram overlap |
| **Signal** | Structural similarity across outputs that should be distinct |
| **Detection** | 5-gram overlap calculation across persona outputs |
| **Implemented In** | Future `convergence_detector.py` (Phase 3 — Enhancement 7) |

**Reminder Template:**
> CONVERGENCE WARNING: Personas [X], [Y], and [Z] share [N]% 5-gram overlap. This indicates persona contamination — the model is generating variations, not independent voices. ACTION: Re-read each persona's specimen file before regenerating. Use Sequential Isolation Protocol.

---

### Detector 4: Abbreviation Detector

| Field | Value |
|-------|-------|
| **Trigger** | Output contains summary markers instead of concrete specifics |
| **Signal** | Phrases like "continues with...", "similar pattern for...", "[additional examples]", "etc.", "and so on" |
| **Detection** | Regex scan on PostToolUse Write/Edit content |
| **Implemented In** | `reminder_detector.py` |

**Reminder Template:**
> ABBREVIATION ALERT: Output contains summary placeholder language: "[matched phrase]". Full output is required. "Close enough" does not exist (Law 6). ACTION: Replace the abbreviated section with complete, specific content.

---

### Detector 5: Gate Drift Detector

| Field | Value |
|-------|-------|
| **Trigger** | Gate status uses any word other than PASS, FAIL, or COMPLETE |
| **Signal** | "CONDITIONAL_PASS", "PARTIAL_PASS", "PASS_WITH_NOTES", or any variant |
| **Detection** | Extends existing `gate_validator.py` forbidden status detection |
| **Implemented In** | `gate_validator.py` (extended to emit reminder JSON) |

**Reminder Template:**
> GATE VIOLATION: Status "[status]" is forbidden. Gates are PASS or FAIL (Law 3). There is no conditional pass, no partial pass, no invented statuses. ACTION: Either fix the issue and write PASS, or write FAIL and halt.

---

### Detector 6: Context Pressure Detector

| Field | Value |
|-------|-------|
| **Trigger** | Token estimator reports zone transition (GREEN->YELLOW, YELLOW->ORANGE, etc.) |
| **Signal** | Cumulative context crosses zone boundary |
| **Detection** | Extends existing `token_estimator.py` zone transition logic |
| **Implemented In** | `token_estimator.py` (extended to emit reminder JSON) |

**Reminder Template:** Varies by zone — uses SYSTEM-CORE.md Zone Response Protocol messages.

---

### Detector 7: Stale Read Detector

| Field | Value |
|-------|-------|
| **Trigger** | Agent executes 6+ consecutive Write/Edit actions without any Read action |
| **Signal** | Extended generation without consulting source files |
| **Detection** | Track action sequence in hook state file |
| **Implemented In** | `reminder_detector.py` |

**Reminder Template:**
> STALE READ WARNING: You have written [N] files without reading any source files. Extended generation without source consultation risks drift from foundation decisions. ACTION: Re-read the context reservoir and current skill's upstream packages before continuing.

---

## Reminder Output Format

All detectors emit structured JSON for consistent processing:

```json
{
  "type": "reminder",
  "detector": "[detector_name]",
  "severity": "warning|critical",
  "message": "[human-readable message]",
  "action_required": "[specific action the agent must take]"
}
```

---

## Integration Points

| Component | Integration |
|-----------|------------|
| `dispatch-validator.sh` | Routes ALL Write/Edit events through `reminder_detector.py` |
| `token_estimator.py` | Emits reminder JSON on zone transitions (Detector 6) |
| `gate_validator.py` | Emits reminder JSON on forbidden statuses (Detector 5) |
| `reminder_detector.py` | New validator implementing Detectors 1, 2, 4, 7 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-10 | Initial creation — 7 detectors from OpenDev Enhancement 1 |
