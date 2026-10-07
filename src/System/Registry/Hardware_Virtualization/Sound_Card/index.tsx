/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SoundCardSpecification {
  sampleRateHz: number;
  channels: number;
  synthesisEngine: string;
}

export const SoundCardRegistry: SoundCardSpecification = {
  sampleRateHz: 44100,
  channels: 2,
  synthesisEngine: "Web Audio API Frequency Sweep & Procedural Oscillator Engine"
};
