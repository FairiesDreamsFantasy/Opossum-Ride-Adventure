/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JadeGalleryGeneral } from "./General";
import { JADE_GALLERY_DESCRIPTION, JADE_GALLERY_DIMENSIONS } from "./Description";
import { JADE_GALLERY_ANIMATIONS } from "./Animations";

export const JadeGallery = {
  id: "temple_jade_gallery",
  name: "The Jade Gallery",
  General: JadeGalleryGeneral,
  Description: JADE_GALLERY_DESCRIPTION,
  Dimensions: JADE_GALLERY_DIMENSIONS,
  Animations: JADE_GALLERY_ANIMATIONS,
  surfaceType: "polished slate tiles",
  footstepSound: "brite metal clinks",
  colorBase: "#064e3b",
  hasBGM: false
};

export default JadeGallery;
