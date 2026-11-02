/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SacredSanctuaryGeneral } from "./General";
import { SACRED_SANCTUARY_DESCRIPTION, SACRED_SANCTUARY_DIMENSIONS } from "./Description";
import { SACRED_SANCTUARY_ANIMATIONS } from "./Animations";

export const SacredSanctuary = {
  id: "temple_sacred_sanctuary",
  name: "The Sacred Sanctuary",
  General: SacredSanctuaryGeneral,
  Description: SACRED_SANCTUARY_DESCRIPTION,
  Dimensions: SACRED_SANCTUARY_DIMENSIONS,
  Animations: SACRED_SANCTUARY_ANIMATIONS,
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#4c1d95",
  hasBGM: false
};

export default SacredSanctuary;
