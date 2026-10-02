/**
 * Opossum Ride Adventure - FLAC Codec General Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const FLACCodecGeneral = {
  codecName: "Free Lossless Audio Codec (FLAC)",
  headerMagic: "fLaC",
  magicBytes: [0x66, 0x4C, 0x61, 0x43],
  supportedBitsPerSample: [16, 24],
  supportedChannels: [1, 2],
  lpcMaxOrder: 32,
  isOpenSource: true,
  license: "Xiph.Org BSD-style / GPL"
};
