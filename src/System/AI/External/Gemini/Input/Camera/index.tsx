/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CameraData } from "./Data";
import { GeminiCameraGeneralEngine, GeminiCameraGeneral } from "./General";

export const GeminiCameraInput = {
  systemName: "Gemini Virtual Camera Perception System",
  Engine: GeminiCameraGeneralEngine,
  General: GeminiCameraGeneral,
  Data: CameraData,
};

export * from "./Data";
export * from "./General";
export default GeminiCameraInput;
