/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericDrakeSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Duck/Drake";

/**
 * Generic Duck Character Class
 * Represents non-named generic ducks across arenas and farm environments.
 */
export class GenericDuckCharacter {
  public id: string = "generic_duck";
  public name: string = "Generic Duck";
  public category: string = "Generic Waterfowl";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericDrakeSynthesizer.playQuack(ctx, dest);
  }
}

export const globalGenericDuck = new GenericDuckCharacter();
