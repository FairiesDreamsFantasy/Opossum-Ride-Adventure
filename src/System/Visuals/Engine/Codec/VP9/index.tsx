/**
 * Opossum Ride Adventure - VP9 Video Codec Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { VP9CodecGeneral } from "./General";

export class VP9VisualDecoderEngine {
  public getSpecification() {
    return VP9CodecGeneral;
  }

  public isSupportedInBrowser(): boolean {
    return (
      typeof HTMLVideoElement !== "undefined" &&
      HTMLVideoElement.prototype.canPlayType("video/webm; codecs=vp9") !== ""
    );
  }
}

export const VP9Decoder = new VP9VisualDecoderEngine();
