/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiVFXRendererGeneral } from "../General";
import { GeminiVFXRendererData } from "../Data";

export const VFXRendererWildcard = {
  General: GeminiVFXRendererGeneral,
  Data: GeminiVFXRendererData,
  systemName: "Gemini AI VFX Renderer Supermodule"
};

export * from "../Data";
