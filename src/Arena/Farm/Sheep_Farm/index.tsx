/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceDefinition } from "../../index";

export const SheepFarmSubArena: PlaceDefinition = {
  id: "sheep_farm",
  name: "The Sheep Farm",
  description: "A rolling green pasture with soft meadows where herds of fluffy sheep graze peacefully.",
  longDescription: "You graze past rolling green hills covered in lush clover and soft grass. Flocks of pristine sheep graze in groups under the shade of ancient oaks, filling the air with soft bleats.",
  accessibilityInfo: "Very soft, even loam terrain with dense short grass. Few obstacles, providing a wide open and smooth ride.",
  surfaceType: "lush green grass",
  footstepSound: "soft grass thuds",
  colorBase: "#F9FAF9", // Warm wool-white base
  ambientNoise: "soothing sheep bleat chorus",
  pathElevation: 0,
  pathPattern: "ground",
  hasGroundPath: true
};
