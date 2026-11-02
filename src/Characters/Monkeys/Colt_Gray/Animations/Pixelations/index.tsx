/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Retro pixelation settings for Colt Monkey.
 */
export function getColtPixelationSettings(pixelSize: number) {
  return {
    characterId: "colt",
    retroScaleMultiplier: pixelSize > 3 ? 1.05 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.2 : 0.0,
  };
}
