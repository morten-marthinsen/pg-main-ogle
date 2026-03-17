# Handoff Prompt — Paste This Into Your Next Claude Conversation

Copy everything below the line into the new conversation:

---

## SF2 Launch Board — Post-John Feedback Iteration

Please check the session log at `_performance-golf/pg-creative-os/orion-chief-of-staff/SESSION-LOG.md` — read session **S101** for full context on what was built and where we are.

### Context
I built a complete SF2 Launch Board (10 sections, left-to-right, PG brand guidelines) and captured it into Figma. The board is live here: `https://www.figma.com/design/pWzfEuks7YKhe6Uatdr05B`

I showed it to John Hardesty (my CMO). He provided feedback. I need you to integrate his feedback into the board.

### Your starting files
1. **Plan with John's 5 gaps (A-E)**: `~/.claude/plans/snuggly-cooking-cookie.md` — READ THIS FIRST. It cross-references John's voice message against the board and identifies exactly what's solved, partially solved, and missing.
2. **HTML board**: `_performance-golf/pg-creative-os/orion-chief-of-staff/_ops/launch-boards/sf2/sf2-launch-board.html` — this is the source file. All changes go here first, then re-capture to Figma.
3. **Content doc**: `_performance-golf/pg-creative-os/orion-chief-of-staff/_ops/launch-boards/sf2/sf2-launch-board-content.md` — 801 lines, source of truth for all board content. Update this alongside the HTML.
4. **Build plan**: `~/.claude/plans/snuggly-launching-stream.md` — original 7-phase plan. We're at Phase 6 complete. Phase 7 (SOP Template + skill creation) comes after this iteration.

### What I need you to do
1. Read the plan (`snuggly-cooking-cookie.md`) and the session log (S101) to understand the full picture.
2. I'll tell you what John's specific feedback was from our call.
3. Update the HTML board (`sf2-launch-board.html`) and content doc (`sf2-launch-board-content.md`) to integrate his feedback.
4. Re-serve locally (`python3 -m http.server 8765` from the `sf2/` directory) and re-capture to the SAME Figma file using `outputMode: "existingFile"` with `fileKey: "pWzfEuks7YKhe6Uatdr05B"`.
5. Phase-stop after each major change — show me what changed before moving to the next.

### Key constraints
- PG brand guidelines are already applied. Don't change the visual design unless John specifically asks for it.
- Left-to-right layout is confirmed. Don't change to vertical.
- Placeholder sections (6, 8-10) stay as placeholders unless John asks for them to be filled.
- The HTML file IS the source artifact. Figma is the rendered output. Always update HTML first, then re-capture.
- The Figma capture script is already in the HTML (`<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>`). Don't remove it.

### After John's feedback is integrated
Proceed to Phase 7: SOP Template extraction and `/launch-board` skill creation (see `snuggly-launching-stream.md` Phase 7 for details).
