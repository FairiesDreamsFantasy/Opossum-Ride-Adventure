/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SILENT_SHRINE_DESCRIPTION, SILENT_SHRINE_DIMENSIONS } from "../Description";
import { SILENT_SHRINE_ANIMATIONS } from "../Animations";

export class SilentShrineGeneral {
  public static readonly arenaId = "temple_silent_shrine";
  public static readonly displayName = "The Silent Shrine";
  public static readonly surfaceType = "polished slate tiles";
  public static readonly footstepSound = "brite metal clinks";
  public static readonly colorBase = "#312e81";
  public static readonly hasBGM = false; // Ambience only
  public static readonly ambientNoise = "ambient deep shrine silence";
}

export default SilentShrineGeneral;
