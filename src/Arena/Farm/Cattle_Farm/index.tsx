/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const CattleFarmSubArena: PlaceDefinition = {
  id: "cattle_farm",
  name: "The Cattle Farm",
  description: "A vast prairie pasture home to majestic cattle, with sturdy wooden barns and metal feeding silos.",
  longDescription: "You are riding through a massive prairie paddock with giant cattle grazing lazily. Massive red timber barns and high metal silos stand in the background, creating a majestic rustic atmosphere.",
  accessibilityInfo: "Firm, deep soil with tall pasture grass. Massive concrete cattle paths and feeding fences run along the north side.",
  surfaceType: "deep pasture soil",
  footstepSound: "heavy soil thuds",
  colorBase: "#F59E0B", // Amber base
  ambientNoise: "deep cow lowing and rustic wind chime",
  pathElevation: 25,
  hasChainLinkBarriers: true,
  barrierGlassRatio: 0.5,
  hasArchesBeneath: true,
  pathPattern: "elevated"
};
