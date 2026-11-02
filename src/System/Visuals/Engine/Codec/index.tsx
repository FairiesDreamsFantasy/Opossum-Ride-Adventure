/**
 * Opossum Ride Adventure - Visuals Engine Codec Master Dispatcher
 * License: Apache-2.0 / Proprietary Artistry
 */

import { VisualEngineCodecGeneral, OPEN_SOURCE_VISUAL_CODECS } from "./General";
import { WEBMDecoder } from "./WEBM";
import { VP9Decoder } from "./VP9";
import { AV1Decoder } from "./AV1";
import { MP4Decoder } from "./MP4";

export class VisualEngineCodecDispatcher {
  public getRegistry() {
    return VisualEngineCodecGeneral;
  }

  public getCodecs() {
    return OPEN_SOURCE_VISUAL_CODECS;
  }

  public getDecoder(codecId: "webm" | "vp9" | "av1" | "mp4") {
    switch (codecId) {
      case "webm":
        return WEBMDecoder;
      case "vp9":
        return VP9Decoder;
      case "av1":
        return AV1Decoder;
      case "mp4":
        return MP4Decoder;
      default:
        return WEBMDecoder;
    }
  }

  public getSupportedVisualCodecs(): string[] {
    const supported: string[] = [];
    if (VP9Decoder.isSupportedInBrowser()) supported.push("VP9");
    if (AV1Decoder.isSupportedInBrowser()) supported.push("AV1");
    if (MP4Decoder.isSupportedInBrowser()) supported.push("MP4");
    supported.push("WEBM");
    return supported;
  }
}

export const VisualEngineCodec = new VisualEngineCodecDispatcher();
