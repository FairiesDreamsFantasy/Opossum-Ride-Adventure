/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericDrakeSynthesizer } from "../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Duck/Drake";

/**
 * Duck Character Module
 * Features local frequency-sweep synthesis for "Quack" vocalizations.
 */
export class DuckCharacter {
  public playQuack(ctx: AudioContext, dest: AudioNode) {
    GenericDrakeSynthesizer.playQuack(ctx, dest);
  }
}

export const globalDuck = new DuckCharacter();
