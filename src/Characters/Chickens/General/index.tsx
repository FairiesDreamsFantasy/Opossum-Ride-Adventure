/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericHenSynthesizer } from "../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Chicken/Hen";

/**
 * Chicken Character Module
 * Features local frequency-sweep synthesis for "Cluck" vocalizations.
 */
export class ChickenCharacter {
  public playCluck(ctx: AudioContext, dest: AudioNode) {
    GenericHenSynthesizer.playCluck(ctx, dest);
  }
}

export const globalChicken = new ChickenCharacter();
