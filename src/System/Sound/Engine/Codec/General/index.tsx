/**
 * Opossum Ride Adventure - Sound Engine Codec General Registry
 * License: Apache-2.0 / Proprietary Artistry
 */

export interface AudioCodecProfile {
  codecId: string;
  name: string;
  extension: string;
  openSource: boolean;
  lossless: boolean;
  maxBitDepth: number;
  maxSampleRate: number;
  description: string;
}

export const OPEN_SOURCE_AUDIO_CODECS: AudioCodecProfile[] = [
  {
    codecId: "flac",
    name: "Free Lossless Audio Codec",
    extension: ".flac",
    openSource: true,
    lossless: true,
    maxBitDepth: 24,
    maxSampleRate: 192000,
    description: "Royalty-free open-source lossless compression format delivering studio-master quality."
  },
  {
    codecId: "wav",
    name: "Waveform Audio File Format",
    extension: ".wav",
    openSource: true,
    lossless: true,
    maxBitDepth: 32,
    maxSampleRate: 384000,
    description: "Uncompressed PCM raw audio buffer format for ultra-low latency transient playback."
  },
  {
    codecId: "opus",
    name: "Opus Interactive Audio Codec",
    extension: ".opus",
    openSource: true,
    lossless: false,
    maxBitDepth: 16,
    maxSampleRate: 48000,
    description: "IETF open-source ultra-low latency speech and interactive audio codec."
  },
  {
    codecId: "vorbis",
    name: "Ogg Vorbis Audio Codec",
    extension: ".ogg",
    openSource: true,
    lossless: false,
    maxBitDepth: 16,
    maxSampleRate: 96000,
    description: "Xiph.Org royalty-free open-source general-purpose perceptual audio codec."
  },
  {
    codecId: "mp3",
    name: "MPEG-1/2 Audio Layer III",
    extension: ".mp3",
    openSource: true,
    lossless: false,
    maxBitDepth: 24,
    maxSampleRate: 48000,
    description: "Universal royalty-free compressed audio format delivering maximum playback compatibility."
  },
  {
    codecId: "aiff",
    name: "Audio Interchange File Format",
    extension: ".aiff",
    openSource: true,
    lossless: true,
    maxBitDepth: 32,
    maxSampleRate: 192000,
    description: "Apple/EA uncompressed linear PCM audio container format."
  },
  {
    codecId: "m4a",
    name: "MPEG-4 Audio",
    extension: ".m4a",
    openSource: false,
    lossless: false,
    maxBitDepth: 24,
    maxSampleRate: 96000,
    description: "ISO BMFF compressed audio format using Advanced Audio Coding."
  },
  {
    codecId: "aac",
    name: "Advanced Audio Coding Raw Bitstream",
    extension: ".aac",
    openSource: false,
    lossless: false,
    maxBitDepth: 24,
    maxSampleRate: 96000,
    description: "ADTS raw bitstream Advanced Audio Coding format."
  }
];

export const SoundEngineCodecGeneral = {
  name: "Universal Audio Codec Engine Registry",
  description: "Registers FLAC, WAV, Opus, Vorbis, MP3, AIFF, M4A, and AAC audio codecs for offline Web Audio API decoding.",
  supportedCodecs: OPEN_SOURCE_AUDIO_CODECS
};
