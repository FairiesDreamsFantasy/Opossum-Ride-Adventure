/**
 * Opossum Ride Adventure - Waveform Audio (WAV) Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { WAVCodecGeneral } from "./General";

export class WAVAudioDecoderEngine {
  public getSpecification() {
    return WAVCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 12) return false;
    const view = new Uint8Array(buffer, 0, 12);
    const isRiff = view[0] === 0x52 && view[1] === 0x49 && view[2] === 0x46 && view[3] === 0x46;
    const isWave = view[8] === 0x57 && view[9] === 0x41 && view[10] === 0x56 && view[11] === 0x45;
    return isRiff && isWave;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const WAVDecoder = new WAVAudioDecoderEngine();
