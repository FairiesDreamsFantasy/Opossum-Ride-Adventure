/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SilentShrineGeneral } from "./General";
import { SILENT_SHRINE_DESCRIPTION, SILENT_SHRINE_DIMENSIONS } from "./Description";
import { SILENT_SHRINE_ANIMATIONS } from "./Animations";

export const SilentShrine = {
  id: "temple_silent_shrine",
  name: "The Silent Shrine",
  General: SilentShrineGeneral,
  Description: SILENT_SHRINE_DESCRIPTION,
  Dimensions: SILENT_SHRINE_DIMENSIONS,
  Animations: SILENT_SHRINE_ANIMATIONS,
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#312e81",
  hasBGM: false
};

export default SilentShrine;
