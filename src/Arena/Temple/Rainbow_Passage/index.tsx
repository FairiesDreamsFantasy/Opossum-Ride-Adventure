/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RainbowPassageGeneral } from "./General";
import { RAINBOW_PASSAGE_DESCRIPTION, RAINBOW_PASSAGE_DIMENSIONS } from "./Description";
import { RAINBOW_PASSAGE_ANIMATIONS } from "./Animations";

export const RainbowPassage = {
  id: "temple_rainbow_passage",
  name: "The Rainbow Passage",
  General: RainbowPassageGeneral,
  Description: RAINBOW_PASSAGE_DESCRIPTION,
  Dimensions: RAINBOW_PASSAGE_DIMENSIONS,
  Animations: RAINBOW_PASSAGE_ANIMATIONS,
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#6b21a8",
  hasBGM: false
};

export default RainbowPassage;
