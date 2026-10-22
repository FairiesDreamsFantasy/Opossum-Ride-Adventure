/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericDoeSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Goat/Doe";

/**
 * Generic Goat Character Class
 * Represents non-named generic goats across rocky and pasture areas.
 */
export class GenericGoatCharacter {
  public id: string = "generic_goat";
  public name: string = "Generic Goat";
  public category: string = "Generic Ungulate";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericDoeSynthesizer.playDoeBleat(ctx, dest);
  }
}

export const globalGenericGoat = new GenericGoatCharacter();
