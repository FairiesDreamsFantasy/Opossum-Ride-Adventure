/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericCowSynthesizer } from "../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Cattle/Cow";

/**
 * Cattle Character Module
 * Features local frequency-sweep synthesis for "Moo" vocalizations.
 */
export class CattleCharacter {
  public playMoo(ctx: AudioContext, dest: AudioNode) {
    GenericCowSynthesizer.playMoo(ctx, dest);
  }
}

export const globalCattle = new CattleCharacter();
