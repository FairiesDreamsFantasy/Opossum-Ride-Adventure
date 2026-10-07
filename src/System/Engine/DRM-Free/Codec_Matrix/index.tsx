/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CodecMatrixMath, CodecSpecs } from "./General";

export * from "./General";

/**
 * Codec_Matrix Master Subsystem
 * 
 * Provides an unrestricted, open-source library of codecs for 
 * Opossum Ride Adventure. Ensures no proprietary licenses 
 * are required for audio or video playback.
 */
export class CodecMatrixSubsystem {
  private supportedCodecs: CodecSpecs[] = [
    { id: "AV1", type: "VIDEO", container: "IVF/WebM", isLossless: false, isDRMFree: true },
    { id: "VP9", type: "VIDEO", container: "WebM", isLossless: false, isDRMFree: true },
    { id: "OPUS", type: "AUDIO", container: "Ogg/WebM", isLossless: false, isDRMFree: true },
    { id: "FLAC", type: "AUDIO", container: "Native FLAC", isLossless: true, isDRMFree: true }
  ];

  public listCodecs(): CodecSpecs[] {
    return [...this.supportedCodecs];
  }

  public getMath(): typeof CodecMatrixMath {
    return CodecMatrixMath;
  }

  public getStatus(): {
    status: "OPEN_SOURCE_TRANSPARENCY";
    totalCodecs: number;
    licenseRequired: false;
  } {
    return {
      status: "OPEN_SOURCE_TRANSPARENCY",
      totalCodecs: this.supportedCodecs.length,
      licenseRequired: false
    };
  }
}

export const CodecMatrix = new CodecMatrixSubsystem();
export default CodecMatrix;
