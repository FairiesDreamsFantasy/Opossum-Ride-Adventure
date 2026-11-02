/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SACRED_SANCTUARY_DESCRIPTION, SACRED_SANCTUARY_DIMENSIONS } from "../Description";
import { SACRED_SANCTUARY_ANIMATIONS } from "../Animations";

export class SacredSanctuaryGeneral {
  public static readonly arenaId = "temple_sacred_sanctuary";
  public static readonly displayName = "The Sacred Sanctuary";
  public static readonly surfaceType = "polished slate tiles";
  public static readonly footstepSound = "brite metal clinks";
  public static readonly colorBase = "#4c1d95";
  public static readonly hasBGM = false; // Ambience only
  public static readonly ambientNoise = "ambient peaceful chamber hum";
}

export default SacredSanctuaryGeneral;
