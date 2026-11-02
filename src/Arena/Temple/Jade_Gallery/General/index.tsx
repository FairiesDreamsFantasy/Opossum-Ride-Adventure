/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JADE_GALLERY_DESCRIPTION, JADE_GALLERY_DIMENSIONS } from "../Description";
import { JADE_GALLERY_ANIMATIONS } from "../Animations";

export class JadeGalleryGeneral {
  public static readonly arenaId = "temple_jade_gallery";
  public static readonly displayName = "The Jade Gallery";
  public static readonly surfaceType = "polished slate tiles";
  public static readonly footstepSound = "brite metal clinks";
  public static readonly colorBase = "#064e3b";
  public static readonly hasBGM = false; // Ambience only
  public static readonly ambientNoise = "ambient deep jade resonance";
}

export default JadeGalleryGeneral;
