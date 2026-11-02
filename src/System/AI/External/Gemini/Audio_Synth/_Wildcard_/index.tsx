/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiAudioSynthGeneral } from "../General";
import { GeminiAudioSynthData } from "../Data";

export const AudioSynthWildcard = {
  General: GeminiAudioSynthGeneral,
  Data: GeminiAudioSynthData,
  systemName: "Gemini AI Audio Synth Supermodule"
};

export * from "../Data";
