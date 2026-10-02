/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getRuthPixelationSettings(blockSize: number) {
  return {
    characterId: "ruth_kone_reynolds",
    retroScaleMultiplier: blockSize > 4 ? 0.94 : 1.0,
    ditherIntensity: blockSize > 1 ? 0.20 : 0
  };
}

export default getRuthPixelationSettings;
