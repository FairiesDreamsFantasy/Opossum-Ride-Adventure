/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getAmaraPixelationSettings(pixelSize: number) {
  return {
    characterId: "amara",
    retroScaleMultiplier: pixelSize > 4 ? 0.9 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.1 : 0.0,
  };
}
