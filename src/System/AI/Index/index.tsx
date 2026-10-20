/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InGameAIIndex } from "./In-Game";
import { GeminiAIIndex } from "./Gemini";

export * from "./In-Game";
export * from "./Gemini";

export const AIIndex = {
  InGame: InGameAIIndex,
  Gemini: GeminiAIIndex,
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
