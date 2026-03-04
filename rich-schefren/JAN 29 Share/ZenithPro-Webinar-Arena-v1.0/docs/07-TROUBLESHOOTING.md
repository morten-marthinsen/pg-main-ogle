# Troubleshooting
## Common Issues and Solutions

---

## Installation Issues

### "Command not found" when running installer

**Symptoms:**
```
bash: /path/to/install.sh: No such file or directory
```

**Solution:**
1. Check the path is correct
2. On Mac, you may need to make it executable first:
   ```
   chmod +x /path/to/ZenithPro-Webinar-Arena-v1.0/install.sh
   ```
3. Then run again

---

### "Permission denied"

**Symptoms:**
```
Permission denied
```

**Solution:**
Make the installer executable:
```
chmod +x /path/to/install.sh
```

---

### Skills not showing up after install

**Symptoms:**
- `/webinar-arena` doesn't work
- Claude doesn't recognize the command

**Solution:**
1. Check that files were copied to `~/.claude/skills/webinar-arena/`
2. Restart Claude Code CLI
3. Try the command again

---

## Running the Arena

### "Expert skill not found"

**Symptoms:**
```
Error: Could not find webinar-fladlien skill
```

**Cause:**
The expert skills didn't install properly.

**Solution:**
1. Re-run the installer - it will copy all skills again
2. Verify expert skills exist at `~/.claude/skills/webinar-fladlien/` etc.
3. Run the Arena again

---

### Arena runs but produces no output

**Symptoms:**
- Arena starts but nothing appears
- No project folder created

**Solution:**
1. Check the projects folder exists: `~/.claude/webinar-arena/projects/`
2. Provide a more detailed brief
3. Try with just 1 round first

---

### Critique phase takes too long

**Symptoms:**
- Arena hangs during critique phase
- Very slow between phases

**Cause:**
Critics are reading all frameworks. For experts with many frameworks (Kern has 265), this takes time.

**Solution:**
This is normal. Each critic needs to evaluate against all their frameworks. Be patient - thoroughness is the point.

---

### Judge declares unexpected winner

**Symptoms:**
- You expected one expert to win
- A different expert won

**Solution:**
1. This is the Arena working as designed
2. Read the judge's explanation carefully
3. If you disagree, override the decision
4. Your override helps calibrate future judgments

---

## Synthesis Issues

### Synthesis never wins

**Symptoms:**
- Pure methodology always beats synthesis
- Synthesis consistently ranks lower

**Cause:**
For many briefs, a pure methodology is genuinely best. Synthesis wins when no single approach fits.

**Solution:**
Try briefs with conflicting requirements:
- High-ticket but automated
- Skeptical market but emotional offer
- These create conditions where synthesis excels

---

### Spawning triggered but no new expert created

**Symptoms:**
- Synthesis won all rounds
- Spawning didn't happen

**Cause:**
The synthesis-critic may have rated codification potential below B+.

**Solution:**
1. Check the synthesis-critic's assessment
2. The combination may be too situational
3. This is quality control - not all wins should spawn

---

## Evolution Issues

### Skills not updating after matches

**Symptoms:**
- Ran multiple arenas
- No skill updates appearing

**Cause:**
Updates require pattern detection across multiple occurrences.

**Solution:**
1. Check `~/.claude/webinar-arena/ledger.md` for detected patterns
2. Most patterns need 3+ occurrences to trigger updates
3. Keep running matches - patterns will emerge

---

### Want to rollback a skill update

**Symptoms:**
- Skill was updated but now performs worse
- Want to go back to previous version

**Solution:**
1. Check version history at `~/.claude/skills/webinar-[expert]/.versions/`
2. Copy the previous version back:
   ```
   cp ~/.claude/skills/webinar-fladlien/.versions/v1.2.0.md ~/.claude/skills/webinar-fladlien/SKILL.md
   ```

---

## File Location Reference

If something's missing, here's where everything should be:

| Component | Location |
|-----------|----------|
| Arena skill | `~/.claude/skills/webinar-arena/` |
| Arena config | `~/.claude/webinar-arena/config.md` |
| Arena ledger | `~/.claude/webinar-arena/ledger.md` |
| Win records | `~/.claude/webinar-arena/win-records/` |
| Projects output | `~/.claude/webinar-arena/projects/` |
| Expert critics | `~/.claude/agents/webinar-*-critic/` |
| Arena agents | `~/.claude/agents/webinar-*/` |

---

## Still Stuck?

1. **Re-run the installer** - it's safe to run multiple times
2. **Check file permissions** - ensure Claude Code can read/write to `~/.claude/`
3. **Bring your question to ZenithPro** - post in the community or next call

---

## Known Limitations

### Format limitations
- Joon's methodology is designed for live events with physical rooms
- Some frameworks don't translate well to pure automated

### Context requirements
- Better briefs = better competition
- Vague briefs produce vague webinars

### Time requirements
- Full 7-competitor arena takes time
- Multiple rounds compound the time
- This is thoroughness, not a bug

---

*Most issues are fixed by running the installer again or providing more detailed briefs.*
