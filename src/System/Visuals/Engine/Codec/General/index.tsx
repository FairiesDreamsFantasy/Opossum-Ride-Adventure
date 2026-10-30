/**
 * Opossum Ride Adventure - Visuals Engine Codec General Registry
 * License: Apache-2.0 / Proprietary Artistry
 */

export interface VisualCodecProfile {
  codecId: string;
  name: string;
  container: string;
  extension: string;
  supportsAlpha: boolean;
  isOpenSource: boolean;
  maxResolution: string;
  description: string;
}

export const OPEN_SOURCE_VISUAL_CODECS: VisualCodecProfile[] = [
  {
    codecId: "webm",
    name: "WebM Open Media Project",
    container: "WebM",
    extension: ".webm",
    supportsAlpha: true,
    isOpenSource: true,
    maxResolution: "4K (3840x2160)",
    description: "Royalty-free open media container featuring VP8/VP9 visual streams with alpha transparency."
  },
  {
    codecId: "vp9",
    name: "VP9 Video Codec",
    container: "WebM / IVF",
    extension: ".vp9",
    supportsAlpha: true,
    isOpenSource: true,
    maxResolution: "8K (7680x4320)",
    description: "High-efficiency open-source video coding format developed by Google."
  },
  {
    codecId: "av1",
    name: "AOMedia Video 1 (AV1)",
    container: "WebM / MP4",
    extension: ".av1",
    supportsAlpha: true,
    isOpenSource: true,
    maxResolution: "8K (7680x4320)",
    description: "Next-generation royalty-free open-source video coding format for pristine high-density visuals."
  },
  {
    codecId: "mp4",
    name: "MPEG-4 Part 14 Video (H.264 / AVC)",
    container: "MP4",
    extension: ".mp4",
    supportsAlpha: false,
    isOpenSource: false,
    maxResolution: "4K (3840x2160)",
    description: "Universal MPEG-4 Part 14 container format for standard background animation sequences."
  }
];

export const VisualEngineCodecGeneral = {
  name: "Universal Visual Codec Engine Registry",
  description: "Registers WebM, VP9, AV1, and MP4 video stream decoders for dynamic canvas and overlay rendering.",
  supportedCodecs: OPEN_SOURCE_VISUAL_CODECS
};
