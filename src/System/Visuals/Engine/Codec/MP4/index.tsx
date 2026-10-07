/**
 * Opossum Ride Adventure - MP4 Video Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { MP4CodecGeneral } from "./General";

export class MP4VisualDecoderEngine {
  public getSpecification() {
    return MP4CodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 12) return false;
    const view = new Uint8Array(buffer, 0, 12);
    const hasFtyp = view[4] === 0x66 && view[5] === 0x74 && view[6] === 0x79 && view[7] === 0x70;
    return hasFtyp;
  }

  public isSupportedInBrowser(): boolean {
    return (
      typeof HTMLVideoElement !== "undefined" &&
      HTMLVideoElement.prototype.canPlayType("video/mp4; codecs=avc1.42E01E") !== ""
    );
  }
}

export const MP4Decoder = new MP4VisualDecoderEngine();
