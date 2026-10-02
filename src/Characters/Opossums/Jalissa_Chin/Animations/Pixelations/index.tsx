/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getJalissaPixelationSettings(pixelSize: number) {
  return {
    characterId: "jalissa",
    retroScaleMultiplier: pixelSize > 4 ? 0.94 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.2 : 0.0,
  };
}
