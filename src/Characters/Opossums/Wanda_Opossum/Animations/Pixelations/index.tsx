/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getWandaPixelationSettings(blockSize: number) {
  return {
    characterId: "wanda",
    retroScaleMultiplier: blockSize > 4 ? 0.94 : 1.0,
    ditherIntensity: blockSize > 1 ? 0.20 : 0
  };
}

export default getWandaPixelationSettings;
