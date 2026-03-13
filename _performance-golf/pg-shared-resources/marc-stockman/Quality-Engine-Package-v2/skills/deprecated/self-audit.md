---
name: self-audit
description: "DEPRECATED — merged into audit v3.0. The old 7-stage single-pass quality loop is now subsumed by the unified convergence loop."
---

# Self-Audit Command Protocol — DEPRECATED

**Status:** DEPRECATED as of v3.0 audit merge (March 10, 2026)
**Superseded by:** `audit` v3.4

---

## What happened

The self-audit protocol's 7-stage quality loop (orient, verify, adversarial test, pre-mortem, revise, share, system learning) was restructured and enhanced in the unified `audit` skill v3.0+. Key improvements in the unified version:

- **Convergence loop:** Passes 1-4 (Verify → Adversarial → Pre-Mortem → Revise) now loop automatically until zero material changes — the old self-audit ran one pass and stopped
- **Pre-Flight phase:** Operational hygiene checks (from the former `check-protocol`) run before the convergence loop
- **Learning Ledger:** Every audit produces a visible Learned / Memorialized / Activated table — the old self-audit's system learning was informal
- **Mandatory 3-part chat output:** Audit Summary + Learning Ledger + Attention Items appear in conversation, not buried in a log file

All "self audit" trigger words now route to the unified `audit` command.

**Do not use this skill. Load `audit` instead.**

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Deprecation | COMPLETE | 2026-03-10 | AI | Merged into audit v3.0. Convergence loop + Learning Ledger replaced single-pass approach. |
