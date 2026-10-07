/**
 * Opossum Ride Adventure - M4A Audio Decoder Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { M4ACodecGeneral } from "./General";

export class M4AAudioDecoderEngine {
  public getSpecification() {
    return M4ACodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 12) return false;
    const view = new Uint8Array(buffer, 0, 12);
    // ftyp at bytes 4..7
    const hasFtyp = view[4] === 0x66 && view[5] === 0x74 && view[6] === 0x79 && view[7] === 0x70;
    const isM4A = view[8] === 0x4D && view[9] === 0x34 && view[10] === 0x41;
    return hasFtyp && isM4A;
  }

  public async decodeAudioBuffer(ctx: AudioContext, buffer: ArrayBuffer): Promise<AudioBuffer> {
    return await ctx.decodeAudioData(buffer.slice(0));
  }
}

export const M4ADecoder = new M4AAudioDecoderEngine();
