/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CropFieldColorPalette } from "./Color_Palette";

export const CropFieldAnimations = {
  id: "crop_field_animations",
  pathOrientation: "ground" as const,
  stoneGeometry: "flat_triangular_slate" as const,
  borderStoneInches: 12,
  borderColors: CropFieldColorPalette.borderStones,
  pathPalette36: CropFieldColorPalette.pathBlocks36,
  stalkSwayFrequencyHz: 1.35,
  stalkSwayAmplitudeRad: 0.14
};

export * from "./Color_Palette";
export default CropFieldAnimations;
