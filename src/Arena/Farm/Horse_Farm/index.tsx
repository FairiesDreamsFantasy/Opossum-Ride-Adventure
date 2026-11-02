/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const HorseFarmSubArena: PlaceDefinition = {
  id: "horse_farm",
  name: "The Horse Farm",
  description: "A picturesque equestrian paddock with white fences and training loops where horses graze and run.",
  longDescription: "You are riding through a beautifully manicured pasture with elegant split-rail fences and professional training loops. Majestic horses run gracefully along the perimeter.",
  accessibilityInfo: "The terrain is rich loam soil and soft pasture grass. Split-rail fences line the main track.",
  surfaceType: "pasture loam and dirt",
  footstepSound: "hollow hoof gallop",
  colorBase: "#DDB892", // Equestrian tan
  ambientNoise: "gentle nickering and soft wind breeze",
  pathElevation: 25,
  hasChainLinkBarriers: true,
  barrierGlassRatio: 0.5,
  hasArchesBeneath: true,
  pathPattern: "elevated"
};
