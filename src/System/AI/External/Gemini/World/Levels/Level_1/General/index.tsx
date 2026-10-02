/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GeminiLevel1General = {
  systemName: "Gemini Level 1 General Subsystem",
  levelNumber: 1,
  status: "Active",
  getDifficulty() {
    return 1 > 64 ? "Master" : 1 > 32 ? "Hard" : 1 > 16 ? "Medium" : "Standard";
  }
};

export default GeminiLevel1General;
