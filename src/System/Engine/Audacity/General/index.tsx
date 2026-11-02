/**
 * Opossum Ride Adventure - Audacity Multi-Track Engine General Registry
 * License: Apache-2.0 / Proprietary Artistry
 */

export interface AudacityTrackClip {
  clipId: string;
  startTime: number;
  duration: number;
  offset: number;
  gain: number;
  pan: number; // -1.0 (left) to +1.0 (right)
  buffer?: AudioBuffer;
}

export interface AudacityTrack {
  trackId: string;
  name: string;
  muted: boolean;
  solo: boolean;
  gain: number;
  pan: number;
  clips: AudacityTrackClip[];
}

export interface AudacityProjectSpec {
  formatVersion: "AUP3" | "AUP_LEGACY";
  sampleRate: number;
  channels: number;
  fftWindowSize: number;
  isOffline: boolean;
}

export const AudacityEngineGeneral = {
  name: "Audacity Multi-Track & DSP Audio Engine",
  version: "3.0.0-ultra",
  supportedFormats: [".aup3", ".aup", ".wav", ".flac", ".mp3", ".aiff", ".opus", ".ogg"],
  defaultSampleRate: 48000,
  defaultFFTSize: 2048,
  isFullyOffline: true,
  license: "GPL-3.0 / Open DSP Engine"
};
