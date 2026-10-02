/**
 * Opossum Ride Adventure - Free Lossless Audio Codec (FLAC) Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { FLACCodecGeneral } from "./General";

export class FLACAudioDecoderEngine {
  public getSpecification() {
    return FLACCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 4) return false;
    const view = new Uint8Array(buffer, 0, 4);
    return (
      view[0] === 0x66 &&
      view[1] === 0x4C &&
      view[2] === 0x61 &&
      view[3] === 0x43
    );
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const FLACDecoder = new FLACAudioDecoderEngine();
