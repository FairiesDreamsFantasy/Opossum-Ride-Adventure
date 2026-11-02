/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SmartSkyRegistry } from "./In-Game/Smart_Sky";
import { InGameAIRegistry } from "./In-Game";

export * from "./In-Game";

/**
 * AI Registry
 * Maps AI modules for master system registration.
 */
export const AIRegistry = {
  id: "ai_registry",
  categories: {
    InGame: { path: "src/System/AI/In-Game/index.tsx", smartSky: SmartSkyRegistry, details: InGameAIRegistry },
    External: { path: "src/System/AI/External/index.tsx" }
  },
  timestamp: new Date().toISOString()
};
