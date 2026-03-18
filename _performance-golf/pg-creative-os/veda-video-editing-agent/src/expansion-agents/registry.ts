/**
 * Expansion Agent Registry — maps type codes to agent implementations.
 *
 * The orchestrator calls `getAgent(typeCode)` to dispatch to the correct
 * expansion agent at Step 5. All 9 expansion types (hs, ssr, dur, env, af,
 * sp, dp, cf, int) have native agents. Unknown types return undefined.
 */

import type { ExpansionAgent } from "./types.js";

// ── Registry ────────────────────────────────────────────────────────────────

const agents = new Map<string, ExpansionAgent>();

/** Register an expansion agent. Overwrites any existing agent for that type code. */
export function registerAgent(agent: ExpansionAgent): void {
  agents.set(agent.typeCode, agent);
}

/** Look up the expansion agent for a type code. Returns undefined if not registered. */
export function getAgent(typeCode: string): ExpansionAgent | undefined {
  return agents.get(typeCode);
}

/** Get all registered type codes. */
export function getRegisteredTypes(): string[] {
  return Array.from(agents.keys());
}

/** Check if a type code has a registered agent. */
export function hasAgent(typeCode: string): boolean {
  return agents.has(typeCode);
}

/** Clear all registrations (for testing). */
export function clearRegistry(): void {
  agents.clear();
}
