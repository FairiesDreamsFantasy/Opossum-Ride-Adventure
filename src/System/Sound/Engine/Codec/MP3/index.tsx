/**
 * Opossum Ride Adventure - MP3 Audio Decoder Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { MP3CodecGeneral } from "./General";

export class MP3AudioDecoderEngine {
  public getSpecification() {
    return MP3CodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 3) return false;
    const view = new Uint8Array(buffer, 0, 3);
    const hasID3 = view[0] === 0x49 && view[1] === 0x44 && view[2] === 0x33;
    const hasSync = view[0] === 0xFF && (view[1] & 0xE0) === 0xE0;
    return hasID3 || hasSync;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const MP3Decoder = new MP3AudioDecoderEngine();
