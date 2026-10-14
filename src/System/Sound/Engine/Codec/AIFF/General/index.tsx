/**
 * Opossum Ride Adventure - AIFF Codec General Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const AIFFCodecGeneral = {
  codecName: "Audio Interchange File Format (AIFF)",
  formHeader: "FORM",
  aiffFormat: "AIFF",
  aifcFormat: "AIFC",
  magicBytes: [0x46, 0x4F, 0x52, 0x4D],
  supportedBitsPerSample: [16, 24, 32],
  maxSampleRate: 192000,
  isOpenSource: true,
  license: "Apple Computer Inc. Open Audio Specification"
};
