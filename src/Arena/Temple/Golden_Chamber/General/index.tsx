/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GOLDEN_CHAMBER_DESCRIPTION, GOLDEN_CHAMBER_DIMENSIONS } from "../Description";
import { GOLDEN_CHAMBER_ANIMATIONS } from "../Animations";

export class GoldenChamberGeneral {
  public static readonly arenaId = "temple_golden_chamber";
  public static readonly displayName = "The Golden Chamber";
  public static readonly surfaceType = "polished slate tiles";
  public static readonly footstepSound = "brite metal clinks";
  public static readonly colorBase = "#713f12";
  public static readonly hasBGM = false; // Ambience only
  public static readonly ambientNoise = "ambient warm gilded resonance";
}

export default GoldenChamberGeneral;
