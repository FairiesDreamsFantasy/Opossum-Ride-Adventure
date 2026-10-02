/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseSoundVariableGeneral } from "./General";

export * from "./General";

export interface MooseVocalPitchVariable {
  type: "bellow" | "grunt" | "snort" | "moo" | "smash" | "trample" | "jump" | "hoofstep";
  baseFreqOsc1: number;
  baseFreqOsc2: number;
  endFreqOsc1: number;
  endFreqOsc2: number;
  filterStartFreq: number;
  filterEndFreq: number;
  filterQ: number;
  lfoRateHz: number;
  lfoDepthHz: number;
  durationSeconds: number;
  peakVolume: number;
  detuneCents?: number;
}

/**
 * Sound Pitch & Timbre Variables for Moose Vocalizations & Physical Movements
 * Allows individual moose in the world to vary dynamically in pitch, formant, and depth.
 */
export const MOOSE_SOUND_PITCH_VARIABLES: Record<string, MooseVocalPitchVariable> = {
  deep_bull_bellow: {
    type: "bellow",
    baseFreqOsc1: 85,
    baseFreqOsc2: 82,
    endFreqOsc1: 60,
    endFreqOsc2: 58,
    filterStartFreq: 450,
    filterEndFreq: 120,
    filterQ: 5.0,
    lfoRateHz: 12,
    lfoDepthHz: 5,
    durationSeconds: 1.2,
    peakVolume: 0.60,
    detuneCents: -50
  },
  high_cow_bellow: {
    type: "bellow",
    baseFreqOsc1: 110,
    baseFreqOsc2: 106,
    endFreqOsc1: 80,
    endFreqOsc2: 76,
    filterStartFreq: 580,
    filterEndFreq: 180,
    filterQ: 4.2,
    lfoRateHz: 10,
    lfoDepthHz: 6,
    durationSeconds: 1.0,
    peakVolume: 0.55,
    detuneCents: 40
  },
  standard_grunt: {
    type: "grunt",
    baseFreqOsc1: 95,
    baseFreqOsc2: 90,
    endFreqOsc1: 70,
    endFreqOsc2: 65,
    filterStartFreq: 380,
    filterEndFreq: 150,
    filterQ: 3.5,
    lfoRateHz: 8,
    lfoDepthHz: 3,
    durationSeconds: 0.35,
    peakVolume: 0.45,
    detuneCents: 0
  },
  snort_puff: {
    type: "snort",
    baseFreqOsc1: 140,
    baseFreqOsc2: 135,
    endFreqOsc1: 90,
    endFreqOsc2: 85,
    filterStartFreq: 600,
    filterEndFreq: 220,
    filterQ: 2.0,
    lfoRateHz: 15,
    lfoDepthHz: 8,
    durationSeconds: 0.25,
    peakVolume: 0.35,
    detuneCents: 10
  },
  forest_moo: {
    type: "moo",
    baseFreqOsc1: 105,
    baseFreqOsc2: 100,
    endFreqOsc1: 75,
    endFreqOsc2: 70,
    filterStartFreq: 500,
    filterEndFreq: 160,
    filterQ: 4.0,
    lfoRateHz: 9,
    lfoDepthHz: 4,
    durationSeconds: 0.9,
    peakVolume: 0.50,
    detuneCents: 20
  },
  territorial_bull_roar: {
    type: "bellow",
    baseFreqOsc1: 72,
    baseFreqOsc2: 69,
    endFreqOsc1: 45,
    endFreqOsc2: 42,
    filterStartFreq: 420,
    filterEndFreq: 95,
    filterQ: 6.0,
    lfoRateHz: 14,
    lfoDepthHz: 7,
    durationSeconds: 1.45,
    peakVolume: 0.68,
    detuneCents: -65
  },
  cow_mating_call: {
    type: "bellow",
    baseFreqOsc1: 120,
    baseFreqOsc2: 114,
    endFreqOsc1: 85,
    endFreqOsc2: 79,
    filterStartFreq: 620,
    filterEndFreq: 210,
    filterQ: 4.5,
    lfoRateHz: 9,
    lfoDepthHz: 5,
    durationSeconds: 1.15,
    peakVolume: 0.58,
    detuneCents: 45
  },
  aggressive_charge_huff: {
    type: "snort",
    baseFreqOsc1: 155,
    baseFreqOsc2: 148,
    endFreqOsc1: 75,
    endFreqOsc2: 70,
    filterStartFreq: 680,
    filterEndFreq: 180,
    filterQ: 2.8,
    lfoRateHz: 20,
    lfoDepthHz: 10,
    durationSeconds: 0.3,
    peakVolume: 0.42,
    detuneCents: 15
  },
  moose_smash_impact: {
    type: "smash",
    baseFreqOsc1: 110,
    baseFreqOsc2: 100,
    endFreqOsc1: 25,
    endFreqOsc2: 20,
    filterStartFreq: 450,
    filterEndFreq: 80,
    filterQ: 4.0,
    lfoRateHz: 0,
    lfoDepthHz: 0,
    durationSeconds: 0.58,
    peakVolume: 0.65,
    detuneCents: 0
  },
  moose_jump_vault: {
    type: "jump",
    baseFreqOsc1: 75,
    baseFreqOsc2: 70,
    endFreqOsc1: 210,
    endFreqOsc2: 50,
    filterStartFreq: 260,
    filterEndFreq: 80,
    filterQ: 3.0,
    lfoRateHz: 0,
    lfoDepthHz: 0,
    durationSeconds: 0.52,
    peakVolume: 0.45,
    detuneCents: 0
  }
};

/**
 * Calculates a pitch-varied moose vocalization configuration based on deterministic offset.
 */
export const calculateMooseVocalVariation = (
  basePreset: MooseVocalPitchVariable,
  pitchOffsetRatio: number = 0.0
): MooseVocalPitchVariable => {
  const multiplier = Math.max(0.6, Math.min(1.6, 1.0 + pitchOffsetRatio));
  return {
    ...basePreset,
    baseFreqOsc1: Math.max(MooseSoundVariableGeneral.frequencyLimits.minChestResonanceHz, basePreset.baseFreqOsc1 * multiplier),
    baseFreqOsc2: Math.max(MooseSoundVariableGeneral.frequencyLimits.minChestResonanceHz, basePreset.baseFreqOsc2 * multiplier),
    endFreqOsc1: Math.max(MooseSoundVariableGeneral.frequencyLimits.minChestResonanceHz, basePreset.endFreqOsc1 * multiplier),
    endFreqOsc2: Math.max(MooseSoundVariableGeneral.frequencyLimits.minChestResonanceHz, basePreset.endFreqOsc2 * multiplier),
    filterStartFreq: Math.min(MooseSoundVariableGeneral.frequencyLimits.maxFormantFilterHz, basePreset.filterStartFreq * multiplier),
    filterEndFreq: Math.max(MooseSoundVariableGeneral.frequencyLimits.minFormantFilterHz, basePreset.filterEndFreq * multiplier),
  };
};
