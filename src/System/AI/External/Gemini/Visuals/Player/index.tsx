/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualPlayerData } from "./Data";
import { GeminiVisualPlayerGeneralEngine, GeminiVisualPlayerGeneral } from "./General";

export const GeminiVisualPlayer = {
  systemName: "Gemini Visual Player System",
  Engine: GeminiVisualPlayerGeneralEngine,
  General: GeminiVisualPlayerGeneral,
  Data: VisualPlayerData,
};

export * from "./Data";
export * from "./General";
export default GeminiVisualPlayer;
