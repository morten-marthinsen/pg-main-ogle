# Neco Failure Fixes

> Every failure gets a structural fix. Entries are added during sessions when errors are caught and corrected.

## Entries

### LEARN-2026-02-08-001

```yaml
entry_id: "LEARN-2026-02-08-001"
date: 2026-02-08
session: 009
category: "fabrication"
what_happened: |
  During S009 planning, Neco referred to "SuperSpeed Golf SF2" — a product name
  that does not exist. SF2 is PG's anti-slice driver. "SuperSpeed Golf" was
  fabricated and appears nowhere in project files.
root_cause: |
  No structural check on product names. Neco generated a plausible-sounding
  product name without verifying against Context Gatherer output or known
  PG product list.
structural_fix: |
  Added to Sub-Agent #8 claim_verification_check forbidden fabrication patterns:
  "Product names not in Context Gatherer output (e.g., SF2 = PG's anti-slice
  driver — never fabricate product names)"
prevention: |
  Tier 1 claim verification now treats product names as mandatory-verify.
  Any product reference not traceable to Context Gatherer output triggers
  HALT at Gate 3.
```
