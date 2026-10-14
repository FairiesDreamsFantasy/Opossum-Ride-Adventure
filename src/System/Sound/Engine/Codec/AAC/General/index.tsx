/**
 * Opossum Ride Adventure - AAC Codec General Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const AACCodecGeneral = {
  codecName: "Advanced Audio Coding (AAC / ADTS)",
  syncBytes: [0xFF, 0xF1],
  supportedBitsPerSample: [16, 24],
  maxSampleRate: 96000,
  isOpenSource: false,
  isUniversal: true,
  license: "ISO/IEC 13818-7 / ISO/IEC 14496-3"
};
