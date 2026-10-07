/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericFrogSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Frog";

/**
 * Generic Frog Character Class
 * Represents non-named generic frogs across arenas and pond environments.
 */
export class GenericFrogCharacter {
  public id: string = "generic_frog";
  public name: string = "Generic Frog";
  public category: string = "Generic Amphibian";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericFrogSynthesizer.playCroak(ctx, dest);
  }
}

export const globalGenericFrog = new GenericFrogCharacter();
