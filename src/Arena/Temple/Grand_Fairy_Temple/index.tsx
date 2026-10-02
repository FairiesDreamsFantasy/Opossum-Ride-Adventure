/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GrandFairyTempleGeneral } from "./General";
import { GRAND_FAIRY_TEMPLE_DESCRIPTION, GRAND_FAIRY_TEMPLE_DIMENSIONS } from "./Description";
import { GRAND_FAIRY_TEMPLE_ANIMATIONS } from "./Animations";

export const GrandFairyTemple = {
  id: "temple_grand_fairy",
  name: "The Grand Fairy Temple",
  General: GrandFairyTempleGeneral,
  Description: GRAND_FAIRY_TEMPLE_DESCRIPTION,
  Dimensions: GRAND_FAIRY_TEMPLE_DIMENSIONS,
  Animations: GRAND_FAIRY_TEMPLE_ANIMATIONS,
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#581c87",
  hasBGM: false
};

export default GrandFairyTemple;
