/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import { AIUtilitiesGeneralRegistry } from "./General";

export const AIUtilitiesRegistry = {
  General: AIUtilitiesGeneralRegistry,
  id: "ai_in_game_category_utilities_registry",
  name: "AI In-Game Category Utilities Registry",
  version: "1.0.0",
  type: "AI_CATEGORY_UTILITIES"
};
