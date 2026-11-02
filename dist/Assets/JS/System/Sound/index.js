/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - System Sound JS Module Asset
 */

export const SOUND_ASSET_METADATA = {
  sampleRate: 44100,
  bitDepth: 64,
  chatterWaveform: "sawtooth",
  headroomDb: 13.98,
  antiClickingRampMs: 8.0
};

export function getSoundAssetSummary() {
  return "64-bit IEEE 754 DSP Chatter Engine with 8ms anti-clicking attack ramp.";
}
