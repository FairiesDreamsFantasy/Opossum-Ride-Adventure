/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericGanderSynthesizer } from "../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Goose/Gander";

/**
 * Goose Character Module
 * Features local frequency-sweep synthesis for "Honk" vocalizations.
 */
export class GooseCharacter {
  public playHonk(ctx: AudioContext, dest: AudioNode) {
    GenericGanderSynthesizer.playHonk(ctx, dest);
  }
}

export const globalGoose = new GooseCharacter();
