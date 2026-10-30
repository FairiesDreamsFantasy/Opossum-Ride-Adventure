/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericEweSynthesizer } from "../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Sheep/Ewe";

/**
 * Sheep Character Module
 * Features local frequency-sweep synthesis for "Bleat" vocalizations.
 */
export class SheepCharacter {
  public playBleat(ctx: AudioContext, dest: AudioNode) {
    GenericEweSynthesizer.playBleat(ctx, dest);
  }
}

export const globalSheep = new SheepCharacter();
