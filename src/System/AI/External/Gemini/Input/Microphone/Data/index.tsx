/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualMicrophoneConfig {
  sampleRate: number;
  channels: number;
  gainLevel: number;
  stereoPanner: number;
  masterAmplifierGain: number;
  noiseFilterCutoff: number;
  hdEnabled: boolean;
}

export const DEFAULT_VIRTUAL_MICROPHONE_CONFIG: VirtualMicrophoneConfig = {
  sampleRate: 48000,
  channels: 2,
  gainLevel: 1.0,
  stereoPanner: 0.0,
  masterAmplifierGain: 1.2,
  noiseFilterCutoff: 18000,
  hdEnabled: true
};

export const MicrophoneData = {
  defaultConfig: DEFAULT_VIRTUAL_MICROPHONE_CONFIG,
  submodules: ["HD", "Gain_Level", "Stereo", "Amplifier", "Master_Amplifier", "Panner", "Noise_Filters"]
};
