/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import GeminiCameraInput from "../../../Input/Camera";
import GeminiMicrophoneInput from "../../../Input/Microphone";
import GeminiCameraLens from "../../../Input/Camera/Lens";

export const GeminiRegistryInputGeneral = {
  systemName: "Gemini AI Registry Input General Subsystem",
  Camera: GeminiCameraInput,
  Microphone: GeminiMicrophoneInput,
  Lens: GeminiCameraLens
};