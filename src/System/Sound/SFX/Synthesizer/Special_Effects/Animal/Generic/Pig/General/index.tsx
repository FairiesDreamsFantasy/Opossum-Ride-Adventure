/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GenericBoarSynthesizer } from "../Boar";
import { GenericSowSynthesizer } from "../Sow";
import { GenericPigletSynthesizer } from "../Piglet";

export class GenericPigSynthesizerMaster {
  public static playGrunt(ctx: AudioContext, dest: AudioNode, pitch: number = 1.0) {
    GenericBoarSynthesizer.playBoarGrunt(ctx, dest, pitch);
  }
  public static playSqueal(ctx: AudioContext, dest: AudioNode, pitch: number = 1.0) {
    GenericSowSynthesizer.playSowSqueal(ctx, dest, pitch);
  }
  public static playSnort(ctx: AudioContext, dest: AudioNode, pitch: number = 1.0) {
    GenericBoarSynthesizer.playBoarSnort(ctx, dest, pitch);
  }
}
