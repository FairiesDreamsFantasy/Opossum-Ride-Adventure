/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getSaffronPixelationSettings(pixelSize: number) {
  return {
    characterId: "saffron",
    retroScaleMultiplier: pixelSize > 4 ? 0.96 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.3 : 0.0,
  };
}
