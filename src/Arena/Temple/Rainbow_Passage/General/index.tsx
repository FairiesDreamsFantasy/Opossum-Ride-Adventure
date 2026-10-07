/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RAINBOW_PASSAGE_DESCRIPTION, RAINBOW_PASSAGE_DIMENSIONS } from "../Description";
import { RAINBOW_PASSAGE_ANIMATIONS } from "../Animations";

export class RainbowPassageGeneral {
  public static readonly arenaId = "temple_rainbow_passage";
  public static readonly displayName = "The Rainbow Passage";
  public static readonly surfaceType = "polished slate tiles";
  public static readonly footstepSound = "brite metal clinks";
  public static readonly colorBase = "#6b21a8";
  public static readonly hasBGM = false; // Ambience only
  public static readonly ambientNoise = "ambient resonant crystal hum";
}

export default RainbowPassageGeneral;
