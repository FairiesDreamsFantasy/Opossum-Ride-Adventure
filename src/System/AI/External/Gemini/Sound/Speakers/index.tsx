/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SpeakersData } from "./Data";
import { GeminiSoundSpeakersGeneralEngine, GeminiSoundSpeakersGeneral } from "./General";

export const GeminiSoundSpeakers = {
  systemName: "Gemini Sound Speakers System",
  Engine: GeminiSoundSpeakersGeneralEngine,
  General: GeminiSoundSpeakersGeneral,
  Data: SpeakersData,
};

export * from "./Data";
export * from "./General";
export default GeminiSoundSpeakers;
