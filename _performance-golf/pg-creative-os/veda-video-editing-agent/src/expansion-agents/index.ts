/**
 * Expansion Agents — barrel export.
 *
 * Import this module to get the registry + all types.
 * Import "./init.js" separately to populate the registry.
 */

export type {
  ExpansionAgent,
  ExpansionContext,
  ExpansionDeps,
  ExpansionResult,
  ExpansionValidationResult,
} from "./types.js";

export {
  registerAgent,
  getAgent,
  getRegisteredTypes,
  hasAgent,
  clearRegistry,
} from "./registry.js";
