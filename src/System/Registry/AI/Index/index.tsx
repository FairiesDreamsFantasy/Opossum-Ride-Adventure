/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIIndex } from "../../../AI/Index";

export const AIRegistryIndex = {
  id: "ai_registry_index",
  name: "AI Registry Index",
  module: "System/Registry/AI/Index",
  Index: AIIndex,
  inGameList: AIIndex.InGame.behaviors,
  geminiList: AIIndex.Gemini.capabilities,
  version: "1.0.0-scientific",
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};
