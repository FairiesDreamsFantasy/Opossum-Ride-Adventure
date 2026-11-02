/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericSowSynthesizer } from "../../../../Synthesizer/Special_Effects/Animal/Generic/Pig/Sow";

export class FeralPigSquealSound {
  public static play(ctx: AudioContext, dest: AudioNode, pitch: number = 1.0) {
    GenericSowSynthesizer.playSowSqueal(ctx, dest, pitch);
  }
}
