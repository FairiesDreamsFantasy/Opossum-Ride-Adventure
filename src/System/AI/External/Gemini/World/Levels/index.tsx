/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiLevelsGeneral } from "./General";
import { GeminiLevelsData } from "./Data";

export const GeminiLevels = {
  General: GeminiLevelsGeneral,
  Data: GeminiLevelsData,
  totalLevels: 128,
  getLevel(levelIndex: number) {
    if (levelIndex < 1 || levelIndex > 128) {
      return GeminiLevelsGeneral.getLevelTemplate(levelIndex);
    }
    return {
      levelId: `Level_${levelIndex}`,
      name: `Gemini Procedural Level ${levelIndex}`,
      difficulty: levelIndex > 64 ? "Master" : levelIndex > 32 ? "Hard" : levelIndex > 16 ? "Medium" : "Standard"
    };
  }
};

export default GeminiLevels;
