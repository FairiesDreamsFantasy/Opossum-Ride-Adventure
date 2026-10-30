/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RastaCaveGeneral } from "./General";
import { RASTA_CAVE_DESCRIPTION, RASTA_CAVE_DIMENSIONS } from "./Description";
import { RASTA_CAVE_ANIMATIONS } from "./Animations";
import { RASTA_CAVE_SOUNDS } from "./Sounds";

export const RastaCave = {
  id: "cave_rasta_cave",
  name: "Rasta-Cave",
  displayName: "Rasta-Cave",
  General: RastaCaveGeneral,
  Description: RASTA_CAVE_DESCRIPTION,
  Dimensions: RASTA_CAVE_DIMENSIONS,
  Animations: RASTA_CAVE_ANIMATIONS,
  Sounds: RASTA_CAVE_SOUNDS,
  surfaceType: "solid rock brick",
  footstepSound: "natural stone footstep",
  colorBase: "#15803d",
  ambientNoise: "ambient deep cave wind",
  hasBGM: false
};

export default RastaCave;
