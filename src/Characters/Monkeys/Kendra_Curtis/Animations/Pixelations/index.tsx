/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getKendraCurtisPixelationSettings(pixelSize: number) {
  return {
    characterId: "kendra_curtis",
    troop: "Curtis",
    statureMultiplier: 1.41,
    shimmerEffect: pixelSize > 1 ? 0.35 : 0.0
  };
}
