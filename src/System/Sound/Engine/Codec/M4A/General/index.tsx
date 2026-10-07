/**
 * Opossum Ride Adventure - M4A Codec General Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const M4ACodecGeneral = {
  codecName: "MPEG-4 Audio (M4A / AAC)",
  ftypBox: "ftyp",
  majorBrand: "M4A ",
  magicBytes: [0x66, 0x74, 0x79, 0x70],
  supportedBitsPerSample: [16, 24],
  maxSampleRate: 96000,
  isOpenSource: false,
  isUniversal: true,
  license: "ISO/IEC 14496-3 AAC Standard"
};
