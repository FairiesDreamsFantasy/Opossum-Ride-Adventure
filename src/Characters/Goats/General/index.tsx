/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericDoeSynthesizer } from "../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Goat/Doe";

/**
 * Goat Character Module
 * Features local frequency-sweep synthesis for "Bleat" vocalizations.
 */
export class GoatCharacter {
  public playBleat(ctx: AudioContext, dest: AudioNode) {
    GenericDoeSynthesizer.playDoeBleat(ctx, dest);
  }
}

export const globalGoat = new GoatCharacter();
