/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getOliviaPixelationSettings(blockSize: number) {
  return {
    characterId: "olivia_chin",
    retroScaleMultiplier: blockSize > 4 ? 0.94 : 1.0,
    ditherIntensity: blockSize > 1 ? 0.20 : 0
  };
}

export default getOliviaPixelationSettings;
