# Outcome Tracking Reference Index

## Capture Flow Summary

1. Select competition (or use --last)
2. Report version used (winner/modified/other/none)
3. Describe modifications (if any)
4. Rate satisfaction (1-5)
5. Add notes (optional)
6. Report conversion (optional, any format)

## Signal Strength Matrix

| Version Used | Mods | Conversion | Strength |
|--------------|------|------------|----------|
| Winner | None | Yes | HIGH |
| Winner | Minor | Yes | HIGH |
| Winner | Major | Yes | MEDIUM |
| Winner | Any | No | MEDIUM |
| Runner-up | Any | Any | MEDIUM |
| None | N/A | N/A | LOW |

## Proxy Signals

| Signal | Timing | Capture Method |
|--------|--------|----------------|
| Deployment | Immediate | Auto on export |
| Edit | Immediate | Auto on revision request |
| Selection | Immediate | Auto on winner choice |
| Return | Days | Passive tracking |

## Conversion Parsing

Accepts: percentages, fractions, qualitative ("good", "terrible")

## File Location

Outcomes stored at: `~/.claude/webinar-arena/outcomes/[competition-id].md`
