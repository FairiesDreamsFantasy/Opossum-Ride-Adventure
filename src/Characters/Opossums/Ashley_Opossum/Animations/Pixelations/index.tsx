/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../types";

/**
 * Applies or provides custom offsets and behaviors for retro pixelation modes on Ashley
 */
export function getAshleyPixelationSettings(pixelSize: number) {
  return {
    characterId: "ashley",
    retroScaleMultiplier: pixelSize > 4 ? 0.95 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.22 : 0.0,
    scanlineAlpha: pixelSize > 4 ? 0.15 : 0.0,
  };
}
