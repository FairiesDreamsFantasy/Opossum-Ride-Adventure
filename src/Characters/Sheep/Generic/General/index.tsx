/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericEweSynthesizer } from "../../../../System/Sound/SFX/Synthesizer/Special_Effects/Animal/Generic/Sheep/Ewe";

/**
 * Generic Sheep Character Class
 * Represents non-named generic sheep across meadows and pastures.
 */
export class GenericSheepCharacter {
  public id: string = "generic_sheep";
  public name: string = "Generic Sheep";
  public category: string = "Generic Ungulate";

  public playVocal(ctx: AudioContext, dest: AudioNode) {
    GenericEweSynthesizer.playBleat(ctx, dest);
  }
}

export const globalGenericSheep = new GenericSheepCharacter();
