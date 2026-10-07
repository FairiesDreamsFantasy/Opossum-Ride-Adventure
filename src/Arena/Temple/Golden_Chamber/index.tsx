/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoldenChamberGeneral } from "./General";
import { GOLDEN_CHAMBER_DESCRIPTION, GOLDEN_CHAMBER_DIMENSIONS } from "./Description";
import { GOLDEN_CHAMBER_ANIMATIONS } from "./Animations";

export const GoldenChamber = {
  id: "temple_golden_chamber",
  name: "The Golden Chamber",
  General: GoldenChamberGeneral,
  Description: GOLDEN_CHAMBER_DESCRIPTION,
  Dimensions: GOLDEN_CHAMBER_DIMENSIONS,
  Animations: GOLDEN_CHAMBER_ANIMATIONS,
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#713f12",
  hasBGM: false
};

export default GoldenChamber;
