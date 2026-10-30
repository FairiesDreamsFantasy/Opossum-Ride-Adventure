/**
 * Opossum Ride Adventure - AIFF Audio Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { AIFFCodecGeneral } from "./General";

export class AIFFAudioDecoderEngine {
  public getSpecification() {
    return AIFFCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 12) return false;
    const view = new Uint8Array(buffer, 0, 12);
    const isForm = view[0] === 0x46 && view[1] === 0x4F && view[2] === 0x52 && view[3] === 0x4D;
    const isAiff = view[8] === 0x41 && view[9] === 0x49 && view[10] === 0x46 && (view[11] === 0x46 || view[11] === 0x43);
    return isForm && isAiff;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const AIFFDecoder = new AIFFAudioDecoderEngine();
