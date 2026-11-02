/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundPlayerData } from "./Data";
import { GeminiSoundPlayerGeneralEngine, GeminiSoundPlayerGeneral } from "./General";

export const GeminiSoundPlayer = {
  systemName: "Gemini Sound Player System",
  Engine: GeminiSoundPlayerGeneralEngine,
  General: GeminiSoundPlayerGeneral,
  Data: SoundPlayerData,
};

export * from "./Data";
export * from "./General";
export default GeminiSoundPlayer;
