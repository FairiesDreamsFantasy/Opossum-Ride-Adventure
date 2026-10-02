/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericHenSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Chicken/Hen";

/**
 * Generic Chicken Character Class
 * Represents non-named generic chickens/hens across yards and coops.
 */
export class GenericChickenCharacter {
  public id: string = "generic_chicken";
  public name: string = "Generic Chicken";
  public category: string = "Generic Avian";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericHenSynthesizer.playCluck(ctx, dest);
  }
}

export const globalGenericChicken = new GenericChickenCharacter();
