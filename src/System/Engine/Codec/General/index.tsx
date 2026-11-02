/**
 * Opossum Ride Adventure - System Engine Codec General Registry
 * License: Apache-2.0 / Proprietary Artistry
 */

export interface MagicByteSignature {
  container: string;
  bytes: number[];
  mimeType: string;
  category: "audio" | "visual" | "data";
  openSource: boolean;
}

export const KNOWN_MAGIC_SIGNATURES: MagicByteSignature[] = [
  { container: "WAV", bytes: [0x52, 0x49, 0x46, 0x46], mimeType: "audio/wav", category: "audio", openSource: true },
  { container: "FLAC", bytes: [0x66, 0x4C, 0x61, 0x43], mimeType: "audio/flac", category: "audio", openSource: true },
  { container: "OGG_OPUS", bytes: [0x4F, 0x67, 0x67, 0x53], mimeType: "audio/ogg; codecs=opus", category: "audio", openSource: true },
  { container: "OGG_VORBIS", bytes: [0x4F, 0x67, 0x67, 0x53], mimeType: "audio/ogg; codecs=vorbis", category: "audio", openSource: true },
  { container: "MP3", bytes: [0x49, 0x44, 0x33], mimeType: "audio/mpeg", category: "audio", openSource: true },
  { container: "AIFF", bytes: [0x46, 0x4F, 0x52, 0x4D], mimeType: "audio/aiff", category: "audio", openSource: true },
  { container: "M4A", bytes: [0x66, 0x74, 0x79, 0x70], mimeType: "audio/mp4", category: "audio", openSource: false },
  { container: "AAC", bytes: [0xFF, 0xF1], mimeType: "audio/aac", category: "audio", openSource: false },
  { container: "WEBM", bytes: [0x1A, 0x45, 0xDF, 0xA3], mimeType: "video/webm", category: "visual", openSource: true },
  { container: "MP4", bytes: [0x66, 0x74, 0x79, 0x70], mimeType: "video/mp4", category: "visual", openSource: false }
];

export const SystemCodecEngineGeneral = {
  name: "System Universal Codec Ultra-Module Registry",
  description: "Ultra-precision magic-byte solver, stream buffer parser, and universal audio/visual codec routing matrix.",
  supportedContainers: ["WAV", "FLAC", "OGG_OPUS", "OGG_VORBIS", "MP3", "AIFF", "M4A", "AAC", "WEBM", "MP4"],
  ultraModuleVersion: "1.1.0-ultra",
  isFullyOffline: true
};
