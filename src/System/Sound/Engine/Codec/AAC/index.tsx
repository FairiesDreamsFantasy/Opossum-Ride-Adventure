/**
 * Opossum Ride Adventure - AAC Raw Bitstream Audio Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { AACCodecGeneral } from "./General";

export class AACAudioDecoderEngine {
  public getSpecification() {
    return AACCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 2) return false;
    const view = new Uint8Array(buffer, 0, 2);
    // ADTS syncword is 12 bits set to 1 (0xFFF)
    return view[0] === 0xFF && (view[1] & 0xF0) === 0xF0;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const AACDecoder = new AACAudioDecoderEngine();
