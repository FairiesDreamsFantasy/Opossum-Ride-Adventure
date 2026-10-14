/**
 * Opossum Ride Adventure - WEBM Visual Stream Engine
 * License: Apache-2.0 / Proprietary Artistry
 */

import { WEBMCodecGeneral } from "./General";

export class WEBMVisualStreamEngine {
  public getSpecification() {
    return WEBMCodecGeneral;
  }

  public validateHeader(buffer: ArrayBuffer): boolean {
    if (!buffer || buffer.byteLength < 4) return false;
    const view = new Uint8Array(buffer, 0, 4);
    return view[0] === 0x1A && view[1] === 0x45 && view[2] === 0xDF && view[3] === 0xA3;
  }

  public createVideoElement(srcUrl: string): HTMLVideoElement {
    const video = document.createElement("video");
    video.src = srcUrl;
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "anonymous";
    return video;
  }
}

export const WEBMDecoder = new WEBMVisualStreamEngine();
