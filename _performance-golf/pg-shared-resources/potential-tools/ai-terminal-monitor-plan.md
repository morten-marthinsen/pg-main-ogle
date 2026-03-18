# AI Terminal Monitor — Cursor Extension Build Plan

> **Paste this entire file as a prompt into Claude Code in your target repo.**
> It contains everything needed to build and install the extension.

---

## What to Build

A VS Code/Cursor extension called `ai-terminal-monitor` that automatically color-codes terminal tabs and a status bar indicator based on the state of AI CLI tools (starting with Claude Code) running inside them.

**States and colors:**

| State | Color | Meaning |
|-------|-------|---------|
| Working | Green | AI is actively processing/generating |
| Waiting | Yellow/Orange | AI needs user input or approval |
| Idle | Gray | Session ended or shell prompt returned |
| Error | Red | API error, timeout, rate limit |

**Critical requirements:**
- Must be a **system-level extension** — installed once into Cursor, works globally across all repos/workspaces
- Uses the proposed `onDidWriteTerminalData` API (works in Cursor, requires side-loading via VSIX)
- **Dual visual indicator**: status bar item (always works) + terminal tab color (best-effort via internal commands)
- Extensible to other AI CLI tools beyond Claude Code

---

## Project Structure

```
ai-terminal-monitor/
  .vscode/
    launch.json              # Extension debug config
    tasks.json               # Build tasks
  src/
    extension.ts             # Entry point: activation, command registration
    terminalMonitor.ts       # Core class: attaches to terminals, manages lifecycle
    stateDetector.ts         # Pattern matching engine: raw text -> state transitions
    patterns/
      claudeCode.ts          # Claude Code-specific patterns
      types.ts               # Shared pattern interfaces
    indicators/
      statusBarIndicator.ts  # Status bar visual indicator
      terminalColorManager.ts # Terminal tab color management (best-effort)
    config.ts                # Settings reader utility
  test/
    suite/
      stateDetector.test.ts  # Unit tests for pattern matching
      terminalMonitor.test.ts
    runTest.ts
  package.json               # Extension manifest
  tsconfig.json
  .vscodeignore
  README.md
  CHANGELOG.md
```

---

## package.json

```json
{
  "name": "ai-terminal-monitor",
  "displayName": "AI Terminal Monitor",
  "description": "Color-codes terminal state for AI CLI tools like Claude Code",
  "version": "0.1.0",
  "publisher": "your-publisher-id",
  "engines": {
    "vscode": "^1.93.0"
  },
  "categories": ["Other"],
  "activationEvents": [
    "onStartupFinished"
  ],
  "enabledApiProposals": [
    "terminalDataWriteEvent"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "aiTerminalMonitor.toggle",
        "title": "AI Terminal Monitor: Toggle Monitoring"
      },
      {
        "command": "aiTerminalMonitor.createMonitoredTerminal",
        "title": "AI Terminal Monitor: New Claude Code Terminal"
      },
      {
        "command": "aiTerminalMonitor.showState",
        "title": "AI Terminal Monitor: Show Current State"
      }
    ],
    "configuration": {
      "title": "AI Terminal Monitor",
      "properties": {
        "aiTerminalMonitor.enabled": {
          "type": "boolean",
          "default": true,
          "description": "Enable or disable terminal monitoring"
        },
        "aiTerminalMonitor.colors.working": {
          "type": "string",
          "default": "terminal.ansiGreen",
          "description": "Color when AI is actively working/generating"
        },
        "aiTerminalMonitor.colors.waiting": {
          "type": "string",
          "default": "terminal.ansiYellow",
          "description": "Color when AI is waiting for user input/approval"
        },
        "aiTerminalMonitor.colors.idle": {
          "type": "string",
          "default": "terminal.ansiBrightBlack",
          "description": "Color when terminal is idle/session ended"
        },
        "aiTerminalMonitor.colors.error": {
          "type": "string",
          "default": "terminal.ansiRed",
          "description": "Color when AI encountered an error"
        },
        "aiTerminalMonitor.detectClaude": {
          "type": "boolean",
          "default": true,
          "description": "Monitor for Claude Code sessions"
        },
        "aiTerminalMonitor.statusBar.enabled": {
          "type": "boolean",
          "default": true,
          "description": "Show status bar indicator for active terminal state"
        },
        "aiTerminalMonitor.statusBar.position": {
          "type": "string",
          "enum": ["left", "right"],
          "default": "left",
          "description": "Status bar indicator position"
        },
        "aiTerminalMonitor.tabColor.enabled": {
          "type": "boolean",
          "default": true,
          "description": "Attempt to change terminal tab color on state changes"
        },
        "aiTerminalMonitor.idleTimeout": {
          "type": "number",
          "default": 5000,
          "description": "Milliseconds of no output before marking as idle"
        }
      }
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "lint": "eslint src",
    "test": "node ./out/test/runTest.js",
    "package": "vsce package"
  },
  "devDependencies": {
    "@types/vscode": "^1.93.0",
    "@types/node": "^20.0.0",
    "@types/mocha": "^10.0.0",
    "@vscode/test-electron": "^2.3.0",
    "@vscode/vsce": "^2.22.0",
    "typescript": "^5.3.0",
    "eslint": "^8.50.0",
    "mocha": "^10.2.0"
  }
}
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2022",
    "outDir": "out",
    "lib": ["ES2022"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

---

## Core Architecture

### State Machine

Each monitored terminal maintains an independent state machine:

```
UNKNOWN -> SESSION_DETECTED -> WORKING -> WAITING -> WORKING (cycles)
                                  |          |
                                  v          v
                               IDLE       IDLE
```

### Pattern Types (src/patterns/types.ts)

```typescript
export type TerminalState = 'unknown' | 'session_detected' | 'working' | 'waiting' | 'idle' | 'error';

export interface ToolPatternSet {
  name: string;
  sessionStart: RegExp[];
  working: RegExp[];
  waiting: RegExp[];
  idle: RegExp[];
  error: RegExp[];
}

export interface StateChangeEvent {
  terminal: any; // vscode.Terminal
  previousState: TerminalState;
  newState: TerminalState;
  toolName: string;
  timestamp: number;
}
```

### Claude Code Patterns (src/patterns/claudeCode.ts)

These patterns detect Claude Code's terminal output states:

```typescript
export const claudeCodePatterns: ToolPatternSet = {
  name: 'Claude Code',

  sessionStart: [
    /╭─/,                               // Box-drawing chars on startup
    /Claude Code/,                       // Startup banner
    /\$ claude\b/,                       // Shell command invocation
  ],

  working: [
    /⠋|⠙|⠹|⠸|⠼|⠴|⠦|⠧|⠇|⠏/,           // Braille spinner (processing)
    /(?:Reading|Writing|Editing)\s/,     // File operations
    /(?:Bash|Read|Glob|Grep|Write|Edit)[\s(]/,  // Tool invocations
    /Running:/,                          // Command execution
    /Searching/,                         // Search operations
    /thinking/i,                         // Thinking indicator
  ],

  waiting: [
    /Do you want to proceed/i,
    /Allow|Deny|Yes|No.*\?/,
    /Press Enter/i,
    /\(y\/n\)/i,
    /permission/i,
    /approve/i,
    /Would you like/i,
    /waiting for/i,
    />\s*$/,                             // Input prompt
    /╰─.*>\s*$/,                         // Claude Code prompt line
  ],

  idle: [
    /\$\s*$/,                            // Shell prompt returned
    /❯\s*$/,                             // Zsh prompt
    /Session ended/i,
    /Goodbye/i,
    /Cost:/,                             // Cost summary at session end
    /tokens used/i,
  ],

  error: [
    /Error:/i,
    /API error/i,
    /rate limit/i,
    /connection.*failed/i,
    /timed?\s*out/i,
    /SIGTERM|SIGKILL/,
  ],
};
```

### State Detector (src/stateDetector.ts)

Key design decisions:

1. **Strip ANSI before matching** — raw terminal output is full of escape sequences. All regex matching runs against cleaned text.
2. **Rolling buffer** — keep last 500 chars to handle patterns spanning chunk boundaries.
3. **Priority order** — when multiple patterns match: error > waiting > working > idle.
4. **Minimum dwell time** — state must hold for 300ms before the indicator updates (prevents flickering).
5. **Idle timeout** — configurable (default 5s) silence threshold triggers idle state.

Implementation guidance:
- Use `strip-ansi` npm package or this regex: `/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g`
- Each terminal gets its own state object in a `Map<Terminal, TerminalState>`
- Fire a `StateChangeEvent` via VS Code's `EventEmitter` pattern
- On activation, scan existing terminal names for "claude" and auto-detect

### Terminal Monitor (src/terminalMonitor.ts)

The orchestrator that wires everything together:

```typescript
// Subscribe to the proposed API
vscode.window.onDidWriteTerminalData((e) => {
  stateDetector.processData(e.terminal, e.data);
});

// Track which terminal is active (for status bar)
vscode.window.onDidChangeActiveTerminal((terminal) => {
  statusBarIndicator.updateForTerminal(terminal);
});

// Clean up on terminal close
vscode.window.onDidCloseTerminal((terminal) => {
  stateDetector.removeTerminal(terminal);
});

// React to state changes
stateDetector.onDidChangeState((event) => {
  statusBarIndicator.updateState(event);
  terminalColorManager.updateState(event);
});
```

### Status Bar Indicator (src/indicators/statusBarIndicator.ts)

The **primary** visual feedback — always works, no API limitations:

```
$(sync~spin) Claude: Working     [green]
$(bell) Claude: Needs Input      [yellow]
$(circle-slash) Claude: Idle     [gray]
$(error) Claude: Error           [red]
```

- Use `vscode.window.createStatusBarItem(StatusBarAlignment.Left, 100)`
- Set `.text` with codicon prefix, `.backgroundColor` with ThemeColor
- `.command` = `'aiTerminalMonitor.showState'` (click to see all terminal states)
- Shows state of the **active** terminal only

### Terminal Tab Color Manager (src/indicators/terminalColorManager.ts)

**Best-effort** tab coloring using internal VS Code commands:

```typescript
// This is NOT a stable API — it uses VS Code's own internal command
// that powers the right-click > Change Color menu. It works in practice
// but could break in future versions. Wrap in try/catch.
await vscode.commands.executeCommand('workbench.action.terminal.changeColor', colorId);
```

- Only works on the **active** terminal
- Gracefully degrades — if the command fails, status bar still works
- Can be disabled via `aiTerminalMonitor.tabColor.enabled` setting

### Extension Entry Point (src/extension.ts)

Register three commands:
1. `aiTerminalMonitor.toggle` — enable/disable monitoring
2. `aiTerminalMonitor.createMonitoredTerminal` — create a terminal with initial color + auto-launch `claude`
3. `aiTerminalMonitor.showState` — quick pick showing all terminal states

---

## Proposed API Setup

The `onDidWriteTerminalData` event requires proposed API type definitions:

```bash
npx @vscode/dts dev
```

This downloads `vscode.proposed.terminalDataWriteEvent.d.ts` into your workspace.

---

## Build and Install

```bash
# 1. Install dependencies
npm install

# 2. Fetch proposed API types
npx @vscode/dts dev

# 3. Compile
npm run compile

# 4. Package as VSIX (side-loaded because proposed API)
npx vsce package --allow-proposed-api

# 5. Install into Cursor
#    Option A: GUI — Extensions panel > "..." > "Install from VSIX..."
#    Option B: CLI
cursor --install-extension ai-terminal-monitor-0.1.0.vsix
```

---

## Implementation Phases

Build in this order. Complete one phase, test it, then proceed.

### Phase 1: Scaffold
- Create project structure, `package.json`, `tsconfig.json`
- Run `npx @vscode/dts dev` for proposed API types
- Create minimal `extension.ts` that logs "AI Terminal Monitor activated"
- Verify it activates in Cursor debug mode (F5)

### Phase 2: State Detector
- Implement `src/patterns/types.ts` and `src/patterns/claudeCode.ts`
- Implement `src/stateDetector.ts` with full state machine
- Write unit tests with mock terminal data
- Test pattern matching in isolation

### Phase 3: Status Bar Indicator
- Implement `src/indicators/statusBarIndicator.ts`
- Wire to state detector with hardcoded test events
- Verify colors and icons render correctly in Cursor

### Phase 4: Terminal Monitor (End-to-End)
- Implement `src/terminalMonitor.ts`
- Subscribe to `onDidWriteTerminalData`
- Connect state detector to status bar indicator
- Test with a real Claude Code session in Cursor

### Phase 5: Tab Color Manager
- Implement `src/indicators/terminalColorManager.ts`
- Add `createMonitoredTerminal` command
- Test tab color changes with real sessions

### Phase 6: Settings and Polish
- Wire all `configuration` settings to actual behavior
- Add the toggle and showState commands
- Handle edge cases (terminal reuse, rapid flickering)

### Phase 7: Package and Install
- `npx vsce package --allow-proposed-api`
- Install VSIX into Cursor
- Test across multiple repos to confirm global behavior

---

## Edge Cases to Handle

1. **Performance** — `onDidWriteTerminalData` fires frequently. Cap rolling buffer at 500 chars, debounce state changes at 100ms, skip non-AI terminals.
2. **False positives** — only match patterns when a session is detected (state != UNKNOWN).
3. **Rapid flickering** — 300ms minimum dwell time before updating indicators.
4. **Terminal reuse** — reset to UNKNOWN when idle patterns match followed by non-AI output.
5. **Existing terminals on startup** — scan `vscode.window.terminals` names for "claude" on activation.
6. **Tab color fragility** — `workbench.action.terminal.changeColor` is internal. Wrap in try/catch, degrade to status-bar-only.
7. **Multi-terminal** — each terminal gets independent state. Status bar shows the active terminal's state.
