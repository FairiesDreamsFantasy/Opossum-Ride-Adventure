/**
 * Opossum Ride Adventure - Opus Low-Latency Audio Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { OpusCodecGeneral } from "./General";

export class OpusAudioDecoderEngine {
  public getSpecification() {
    return OpusCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 8) return false;
    const bytes = new Uint8Array(buffer, 0, 8);
    return bytes[0] === 0x4F && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const OpusDecoder = new OpusAudioDecoderEngine();
