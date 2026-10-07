/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MicrophoneData } from "./Data";
import { GeminiMicrophoneGeneralEngine, GeminiMicrophoneGeneral } from "./General";

export const GeminiMicrophoneInput = {
  systemName: "Gemini Virtual Microphone Perception System",
  Engine: GeminiMicrophoneGeneralEngine,
  General: GeminiMicrophoneGeneral,
  Data: MicrophoneData,
};

export * from "./Data";
export * from "./General";
export default GeminiMicrophoneInput;
