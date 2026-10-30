/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericGanderSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Goose/Gander";

/**
 * Generic Goose Character Class
 * Represents non-named generic geese across arenas and farm environments.
 */
export class GenericGooseCharacter {
  public id: string = "generic_goose";
  public name: string = "Generic Goose";
  public category: string = "Generic Waterfowl";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericGanderSynthesizer.playHonk(ctx, dest);
  }
}

export const globalGenericGoose = new GenericGooseCharacter();
