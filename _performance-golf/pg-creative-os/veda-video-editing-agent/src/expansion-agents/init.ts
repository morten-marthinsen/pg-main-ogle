/**
 * Expansion Agent initialization — registers all agents on import.
 *
 * Import this module once at startup (e.g., from orchestrator or CLI)
 * to populate the registry with all available expansion agents.
 */

import { registerAgent } from "./registry.js";
import { hookStackAgent } from "./hook-stack/index.js";
import { scrollStopperAgent } from "./scroll-stopper/index.js";
import { durationAgent } from "./duration/index.js";
import { environmentAgent } from "./environment/index.js";
import { adFormatAgent } from "./ad-format/index.js";
import { similarPresenterAgent, differentPresenterAgent } from "./presenter-gen/index.js";
import { copyFrameworkAgent } from "./copy-framework/index.js";
import { internationalAgent } from "./international/index.js";

// ── Register native expansion agents ────────────────────────────────────────

registerAgent(hookStackAgent);
registerAgent(scrollStopperAgent);
registerAgent(durationAgent);
registerAgent(environmentAgent);
registerAgent(adFormatAgent);
registerAgent(similarPresenterAgent);
registerAgent(differentPresenterAgent);
registerAgent(copyFrameworkAgent);
registerAgent(internationalAgent);
