/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const ChickenFarmSubArena: PlaceDefinition = {
  id: "chicken_farm",
  name: "The Chicken Farm",
  description: "A lively pasture filled with scratching hens, proud roosters, and soft chirping chicks under wide-open skies.",
  longDescription: "You are riding through a spacious, fenced chicken run with numerous wooden coops, scattered hay, and feeding troughs. The air is warm and filled with the gentle, rhythmic clucking and scratching of hundreds of chickens.",
  accessibilityInfo: "The terrain is soft dirt and scattered hay straw. Low fences line the perimeter, with small coops spaced out across the landscape.",
  surfaceType: "straw-covered dirt",
  footstepSound: "crunchy straw rustle",
  colorBase: "#FEF08A", // Soft yellow base
  ambientNoise: "gentle clucking and rooster crows",
  pathElevation: 25,
  hasChainLinkBarriers: true,
  barrierGlassRatio: 0.5,
  hasArchesBeneath: true,
  pathPattern: "elevated"
};
