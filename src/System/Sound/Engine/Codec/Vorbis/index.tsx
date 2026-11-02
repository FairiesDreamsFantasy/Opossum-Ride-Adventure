/**
 * Opossum Ride Adventure - Ogg Vorbis Audio Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { VorbisCodecGeneral } from "./General";

export class VorbisAudioDecoderEngine {
  public getSpecification() {
    return VorbisCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 4) return false;
    const view = new Uint8Array(buffer, 0, 4);
    return view[0] === 0x4F && view[1] === 0x67 && view[2] === 0x67 && view[3] === 0x53;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const VorbisDecoder = new VorbisAudioDecoderEngine();
