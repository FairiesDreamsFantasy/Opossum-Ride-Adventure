/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const ElegantChatterGeneral = {
  baseChirpCount: 6,
  baseSpacing: 0.08,
  baseDuration: 0.04,
  baseMaxVolume: 0.20,
  defaultWaveform: "sawtooth" as const,
  retroWaveform: "square" as const,
  
  calculateFrequency: (baseFreq: number, pitchOffsetRatio: number = 0) => {
    return baseFreq * (1 + pitchOffsetRatio);
  }
};
