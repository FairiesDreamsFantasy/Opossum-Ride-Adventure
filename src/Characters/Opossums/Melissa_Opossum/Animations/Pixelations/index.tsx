/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";

/**
 * Applies or provides custom offsets and behaviors for retro pixelation modes on Melissa
 */
export function getMelissaPixelationSettings(pixelSize: number) {
  return {
    characterId: "melissa",
    retroScaleMultiplier: pixelSize > 4 ? 0.85 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.15 : 0.0,
    scanlineAlpha: pixelSize > 4 ? 0.12 : 0.0,
  };
}
