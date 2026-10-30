/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getDagmarPixelationSettings(pixelSize: number) {
  return {
    characterId: "dagmar",
    retroScaleMultiplier: pixelSize > 4 ? 0.92 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.28 : 0.0,
  };
}
