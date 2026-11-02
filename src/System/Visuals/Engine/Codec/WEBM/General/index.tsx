/**
 * Opossum Ride Adventure - WEBM Visual Codec Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const WEBMCodecGeneral = {
  codecName: "WebM Open Media Container",
  ebmlHeader: 0x1A45DFA3,
  magicBytes: [0x1A, 0x45, 0xDF, 0xA3],
  supportedVideoCodecs: ["V_VP8", "V_VP9", "V_AV1"],
  supportsAlphaChannel: true,
  isOpenSource: true,
  license: "BSD 3-Clause / Creative Commons"
};
