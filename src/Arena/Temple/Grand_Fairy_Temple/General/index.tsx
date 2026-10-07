/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GRAND_FAIRY_TEMPLE_DESCRIPTION, GRAND_FAIRY_TEMPLE_DIMENSIONS } from "../Description";
import { GRAND_FAIRY_TEMPLE_ANIMATIONS } from "../Animations";

export class GrandFairyTempleGeneral {
  public static readonly arenaId = "temple_grand_fairy";
  public static readonly displayName = "The Grand Fairy Temple";
  public static readonly surfaceType = "polished slate tiles";
  public static readonly footstepSound = "brite metal clinks";
  public static readonly colorBase = "#581c87";
  public static readonly hasBGM = false; // Ambience only
  public static readonly ambientNoise = "ambient silent chamber breeze";
}

export default GrandFairyTempleGeneral;
