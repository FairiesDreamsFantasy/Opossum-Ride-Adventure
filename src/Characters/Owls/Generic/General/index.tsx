/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericOwlSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Owl";

/**
 * Generic Owl Character Class
 * Represents non-named generic owls across nighttime and forest environments.
 */
export class GenericOwlCharacter {
  public id: string = "generic_owl";
  public name: string = "Generic Owl";
  public category: string = "Generic Avian";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericOwlSynthesizer.playHoot(ctx, dest);
  }
}

export const globalGenericOwl = new GenericOwlCharacter();
