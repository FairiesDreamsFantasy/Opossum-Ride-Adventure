/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LensData } from "./Data";
import { GeminiCameraLensGeneralEngine, GeminiCameraLensGeneral } from "./General";
import WildcardLens from "./_Wildcard_";
import LensTier1 from "./1";

export const GeminiCameraLens = {
  systemName: "Gemini Virtual Camera Lens Optoelectronic Grid Array",
  Engine: GeminiCameraLensGeneralEngine,
  General: GeminiCameraLensGeneral,
  Data: LensData,
  Wildcard: WildcardLens,
  Tier1: LensTier1
};

export * from "./Data";
export * from "./General";
export default GeminiCameraLens;
