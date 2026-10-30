/**
 * Opossum Ride Adventure - MP3 Codec General Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const MP3CodecGeneral = {
  codecName: "MPEG-1/2 Audio Layer III (MP3)",
  id3Header: "ID3",
  id3MagicBytes: [0x49, 0x44, 0x33],
  frameSyncBytes: [0xFF, 0xFB],
  supportedBitsPerSample: [16, 24],
  maxSampleRate: 48000,
  isUniversal: true,
  patentStatus: "Expired (Royalty-Free Public Domain since 2017)",
  license: "ISO/IEC 11172-3 Standard"
};
