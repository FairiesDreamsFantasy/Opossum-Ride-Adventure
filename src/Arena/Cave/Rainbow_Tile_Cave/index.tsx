/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RainbowTileCaveGeneral } from "./General";
import { RAINBOW_TILE_CAVE_DESCRIPTION, RAINBOW_TILE_CAVE_DIMENSIONS } from "./Description";
import { RAINBOW_TILE_CAVE_ANIMATIONS } from "./Animations";
import { RAINBOW_TILE_CAVE_SOUNDS } from "./Sounds";

export const RainbowTileCave = {
  id: "cave_rainbow_tile_cave",
  name: "Rainbow Tile Cave",
  displayName: "Rainbow Tile Cave",
  General: RainbowTileCaveGeneral,
  Description: RAINBOW_TILE_CAVE_DESCRIPTION,
  Dimensions: RAINBOW_TILE_CAVE_DIMENSIONS,
  Animations: RAINBOW_TILE_CAVE_ANIMATIONS,
  Sounds: RAINBOW_TILE_CAVE_SOUNDS,
  surfaceType: "non-slip rainbow ceramic tile",
  footstepSound: "resonant tile footstep",
  colorBase: "#c026d3",
  ambientNoise: "ambient resonant subway breeze",
  hasBGM: false
};

export default RainbowTileCave;
