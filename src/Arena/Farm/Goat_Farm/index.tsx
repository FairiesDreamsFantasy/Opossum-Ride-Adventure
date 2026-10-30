/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const GoatFarmSubArena: PlaceDefinition = {
  id: "goat_farm",
  name: "The Goat Farm",
  description: "A rugged, rocky pasture where agile goats scale small wooden structures and climb gentle grassy knolls.",
  longDescription: "You are exploring a fenced hillside goat paddock equipped with wooden climbing ramps, climbing blocks, and scattered salt licks. Friendly goats roam around, bleating softly as they graze.",
  accessibilityInfo: "The surface is rocky, gravel-strewn soil with patches of short grass. Ramps and elevated wooden play structures are distributed across the area.",
  surfaceType: "rocky soil and gravel",
  footstepSound: "clattering gravel trot",
  colorBase: "#D1D5DB", // Slate gray base
  ambientNoise: "soft goat bleating and wooden ramp clattering",
  pathElevation: 0,
  pathPattern: "ground",
  hasGroundPath: true
};
