/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General constants and settings for Play Area procedural audio.
 */
export interface AudioSettings {
  masterVolume: number;
  sfxVolume: number;
  speechRate: number;
  speechPitch: number;
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 1.265, // Base amplified master volume
  sfxVolume: 1.0,
  speechRate: 1.1,
  speechPitch: 0.95,
};

/**
 * Checks if Web Audio API is supported in the current environment.
 */
export function isAudioSupported(): boolean {
  return typeof window !== "undefined" && (!!window.AudioContext || !!(window as any).webkitAudioContext);
}
