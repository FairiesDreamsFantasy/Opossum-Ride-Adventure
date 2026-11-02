/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiProceduralGeneratorGeneral } from "../General";
import { GeminiProceduralGeneratorData } from "../Data";

export const ProceduralGeneratorWildcard = {
  General: GeminiProceduralGeneratorGeneral,
  Data: GeminiProceduralGeneratorData,
  systemName: "Gemini AI Procedural Generator Supermodule"
};

export * from "../Data";
