/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericCowSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Cattle/Cow";

/**
 * Generic Cattle Character Class
 * Represents non-named generic cows/cattle across pastures and barns.
 */
export class GenericCattleCharacter {
  public id: string = "generic_cattle";
  public name: string = "Generic Cow";
  public category: string = "Generic Ungulate";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericCowSynthesizer.playMoo(ctx, dest);
  }
}

export const globalGenericCattle = new GenericCattleCharacter();
