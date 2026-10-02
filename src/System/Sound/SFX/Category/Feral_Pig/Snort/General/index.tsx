/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericBoarSynthesizer } from "../../../../Synthesizer/Special_Effects/Animal/Generic/Pig/Boar";

export class FeralPigSnortSound {
  public static play(ctx: AudioContext, dest: AudioNode, pitch: number = 1.0) {
    GenericBoarSynthesizer.playBoarSnort(ctx, dest, pitch);
  }
}
