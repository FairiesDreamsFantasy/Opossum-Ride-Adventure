/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiPhysicsEngineGeneral } from "../General";
import { GeminiPhysicsEngineData } from "../Data";

export const PhysicsEngineWildcard = {
  General: GeminiPhysicsEngineGeneral,
  Data: GeminiPhysicsEngineData,
  systemName: "Gemini AI Physics Engine Supermodule"
};

export * from "../Data";
