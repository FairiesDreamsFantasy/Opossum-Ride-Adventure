/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getArdenRosiePixelationSettings(pixelSize: number) {
  return {
    characterId: "arden_rosie",
    retroScaleMultiplier: pixelSize > 4 ? 0.95 : 1.0,
    ditherIntensity: pixelSize > 1 ? 0.25 : 0.0,
  };
}
