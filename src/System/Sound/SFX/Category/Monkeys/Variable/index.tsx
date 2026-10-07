/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonkeySoundVariableGeneral } from "./General";

export * from "./General";

export interface MonkeyVocalPitchVariable {
  type: "chatter" | "screech" | "hoot" | "call" | "jump" | "alarm" | "coo";
  startFreq: number;
  endFreq: number;
  burstCount: number;
  burstDurationSeconds: number;
  burstSpacingSeconds: number;
  peakVolume: number;
  waveform: OscillatorType;
  frequencyModulationRateHz?: number;
}

/**
 * Sound Pitch & Timbre Variables for Monkey Chatters, Vocalizations, and Acrobatic Jumps
 * Allows individual monkeys to vary across distinct pitches, agile frequencies, and speeds.
 */
export const MONKEY_SOUND_PITCH_VARIABLES: Record<string, MonkeyVocalPitchVariable> = {
  high_curious_chatter: {
    type: "chatter",
    startFreq: 2200,
    endFreq: 950,
    burstCount: 7,
    burstDurationSeconds: 0.035,
    burstSpacingSeconds: 0.065,
    peakVolume: 0.22,
    waveform: "sawtooth",
    frequencyModulationRateHz: 25
  },
  playful_screech: {
    type: "screech",
    startFreq: 1400,
    endFreq: 2800,
    burstCount: 3,
    burstDurationSeconds: 0.12,
    burstSpacingSeconds: 0.09,
    peakVolume: 0.28,
    waveform: "triangle",
    frequencyModulationRateHz: 18
  },
  low_rhythmic_hoot: {
    type: "hoot",
    startFreq: 750,
    endFreq: 520,
    burstCount: 4,
    burstDurationSeconds: 0.08,
    burstSpacingSeconds: 0.12,
    peakVolume: 0.30,
    waveform: "sine",
    frequencyModulationRateHz: 8
  },
  alert_canopy_call: {
    type: "call",
    startFreq: 1800,
    endFreq: 1200,
    burstCount: 5,
    burstDurationSeconds: 0.05,
    burstSpacingSeconds: 0.08,
    peakVolume: 0.25,
    waveform: "sawtooth",
    frequencyModulationRateHz: 20
  },
  capuchin_quick_chatter: {
    type: "chatter",
    startFreq: 2400,
    endFreq: 1100,
    burstCount: 8,
    burstDurationSeconds: 0.03,
    burstSpacingSeconds: 0.055,
    peakVolume: 0.24,
    waveform: "sawtooth",
    frequencyModulationRateHz: 30
  },
  howler_resonant_hoot: {
    type: "hoot",
    startFreq: 580,
    endFreq: 420,
    burstCount: 3,
    burstDurationSeconds: 0.14,
    burstSpacingSeconds: 0.16,
    peakVolume: 0.34,
    waveform: "sine",
    frequencyModulationRateHz: 6
  },
  tamarin_rapid_trill: {
    type: "screech",
    startFreq: 2600,
    endFreq: 3100,
    burstCount: 4,
    burstDurationSeconds: 0.06,
    burstSpacingSeconds: 0.045,
    peakVolume: 0.26,
    waveform: "triangle",
    frequencyModulationRateHz: 35
  },
  gibbon_melodic_canopy: {
    type: "coo",
    startFreq: 1100,
    endFreq: 1650,
    burstCount: 2,
    burstDurationSeconds: 0.25,
    burstSpacingSeconds: 0.15,
    peakVolume: 0.27,
    waveform: "sine",
    frequencyModulationRateHz: 12
  },
  macaque_warning_bark: {
    type: "alarm",
    startFreq: 1650,
    endFreq: 820,
    burstCount: 2,
    burstDurationSeconds: 0.09,
    burstSpacingSeconds: 0.08,
    peakVolume: 0.32,
    waveform: "sawtooth",
    frequencyModulationRateHz: 22
  },
  acrobatic_spring_jump: {
    type: "jump",
    startFreq: 340,
    endFreq: 980,
    burstCount: 1,
    burstDurationSeconds: 0.36,
    burstSpacingSeconds: 0.1,
    peakVolume: 0.32,
    waveform: "triangle",
    frequencyModulationRateHz: 15
  }
};

/**
 * Generates dynamic pitch-varied monkey sound parameters to ensure distinct character voices.
 */
export const calculateMonkeyPitchVariation = (
  basePreset: MonkeyVocalPitchVariable,
  pitchOffsetRatio: number = 0.0
): MonkeyVocalPitchVariable => {
  const multiplier = Math.max(0.65, Math.min(1.6, 1.0 + pitchOffsetRatio));
  return {
    ...basePreset,
    startFreq: Math.min(
      MonkeySoundVariableGeneral.frequencyLimits.maxFreqHz,
      Math.max(MonkeySoundVariableGeneral.frequencyLimits.minFreqHz, basePreset.startFreq * multiplier)
    ),
    endFreq: Math.min(
      MonkeySoundVariableGeneral.frequencyLimits.maxFreqHz,
      Math.max(MonkeySoundVariableGeneral.frequencyLimits.minFreqHz, basePreset.endFreq * multiplier)
    ),
    peakVolume: basePreset.peakVolume,
  };
};
