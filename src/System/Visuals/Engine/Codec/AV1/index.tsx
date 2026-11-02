/**
 * Opossum Ride Adventure - AV1 Video Codec Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { AV1CodecGeneral } from "./General";

export class AV1VisualDecoderEngine {
  public getSpecification() {
    return AV1CodecGeneral;
  }

  public isSupportedInBrowser(): boolean {
    return (
      typeof HTMLVideoElement !== "undefined" &&
      HTMLVideoElement.prototype.canPlayType("video/webm; codecs=av01.0.08M.08") !== ""
    );
  }
}

export const AV1Decoder = new AV1VisualDecoderEngine();
