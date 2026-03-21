# Mandatory Copy Principles — Enforced During Writing

## THE NON-NEGOTIABLE

Before writing ANY customer-facing copy — even a single sentence — the PreToolUse hook will load the actual Copywriting Principles from WORKSPACE.md into active context. After every edit, the PostToolUse hook will fire an audit checklist.

## DURING ENFORCEMENT: WRITE IN SMALL CHUNKS

Never write large blocks of copy in a single Edit call. Break copy into section-by-section edits. Each edit triggers the hooks — principles loaded before, audit fired after. More edits = more enforcement touchpoints. One massive edit = the hooks fire once and the principles decay during generation. Six small edits = six enforcement cycles.

## How This Works

Every sentence of customer-facing copy is written THROUGH the principles, not checked against them after. There is no "writing mode" and "checking mode." They are the same mode.

While generating any copy:
- **Every word:** Would the reader understand this, or did it come from internal docs? Translate before it hits the page.
- **Every sentence:** Am I describing what the SYSTEM does or what the READER gets? If the system is the subject and the reader is absent, don't write it that way in the first place.
- **Every claim:** Am I using absolutes the reader can argue with, or experiential language they recognize? Recognition, not proclamation.
- **Every section:** Does this plant doubt anywhere? Does any element say the same thing as something already on the page?
- **Every data point:** Is this in reader language or research language? "Zero of 9 competitors" is research. "Nobody else does this" is reader.

## Why This Exists

Multiple editing sessions proved that reading principles at session start and then writing copy later produces violations of those same principles. The only solution is automated enforcement at the point of writing — hooks that load principles before, audit after, and a rule that forces small edits so the hooks fire frequently. Every violation the user catches is a failure of this process.
