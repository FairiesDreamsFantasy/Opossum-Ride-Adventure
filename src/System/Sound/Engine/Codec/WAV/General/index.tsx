/**
 * Opossum Ride Adventure - WAV Codec General Specification
 * License: Apache-2.0 / Proprietary Artistry
 */

export const WAVCodecGeneral = {
  codecName: "Waveform Audio File Format (WAV)",
  riffHeader: "RIFF",
  waveFormat: "WAVE",
  fmtChunk: "fmt ",
  dataChunk: "data",
  magicBytes: [0x52, 0x49, 0x46, 0x46],
  supportedBitsPerSample: [8, 16, 24, 32],
  supportedAudioFormats: [1], // 1 = Linear PCM
  isOpenSource: true,
  license: "Public Domain / Open Specification"
};
