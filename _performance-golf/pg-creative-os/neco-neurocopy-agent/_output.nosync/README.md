# Neco Output Archive

> Every deliverable gets archived with metadata. Winners get promoted to `_vault/`.

## Protocol

After every delivery (Gate 3 passed):

1. Archive the output in the appropriate subdirectory (`hooks/`, `scripts/`, `briefs/`, `angles/`)
2. Apply the metadata template below
3. Performance data is populated later from Tess when available
4. Outputs scoring HSP/SSP >= 7.0 with positive performance data are candidates for `_vault/` promotion

## Directory Structure

```
_output/
  hooks/       # Archived hook sets
  scripts/     # Archived full scripts
  briefs/      # Archived influencer + static image briefs
  angles/      # Archived angle libraries
```

## Output Metadata Template

```yaml
output_id: "Neco-YYYY-MM-DD-[type]-[seq]"
type: "hooks | script | influencer_brief | static_image_brief | angle_library"
product: "[product_id]"
brand_thread: "Thread 1 | Thread 2 | Both"
core_angle: "[angle name]"
audiences: []
hsp_score: null  # For hooks — populated by Quality Validator
ssp_score: null  # For scripts — populated by Quality Validator
performance_data: null  # Populated later from Tess
vault_candidate: false  # Set to true when proven winner
date_created: YYYY-MM-DD
session: NNN
gate_3_passed: true
```

## Naming Convention

Files follow the output_id pattern:
- `Neco-2026-02-08-hooks-001.md`
- `Neco-2026-02-08-script-001.md`
- `Neco-2026-02-08-brief-001.md`
- `Neco-2026-02-08-angles-001.md`

## Vault Promotion Criteria

An output becomes a vault candidate when:
1. HSP/SSP score >= 7.0
2. Performance data from Tess shows above-average results
3. Human confirms promotion

Promotion copies the output to `_vault/` with a 2-3 sentence annotation explaining why it works.
