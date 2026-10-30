/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getJahmellaPixelationSettings(pixelSize: number) {
  return {
    characterId: "jahmella",
    retroScaleMultiplier: pixelSize > 4 ? 0.98 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.22 : 0.0,
  };
}
