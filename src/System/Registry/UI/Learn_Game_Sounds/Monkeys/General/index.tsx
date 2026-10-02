/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeySoundDefinition {
  id: string;
  name: string;
  presetKey: string;
  gender: "Male" | "Female";
  pitchOffset: number;
  description: string;
}

export const MONKEY_SOUND_DEFINITIONS: MonkeySoundDefinition[] = [
  {
    id: "curious_chatter",
    name: "Curious Monkey Chatter",
    presetKey: "high_curious_chatter",
    gender: "Female",
    pitchOffset: 0.0,
    description: "Rapid multi-burst frequency sweep chatter with sawtooth timbre (2200Hz to 950Hz)."
  },
  {
    id: "playful_screech",
    name: "Playful Monkey Screech",
    presetKey: "playful_screech",
    gender: "Female",
    pitchOffset: 0.1,
    description: "High-register triangle sweep rising from 1400Hz to 2800Hz with FM frequency modulation."
  },
  {
    id: "canopy_call",
    name: "Alert Canopy Call",
    presetKey: "alert_canopy_call",
    gender: "Male",
    pitchOffset: -0.05,
    description: "Sharp, alerting territorial vocal pulse from 1800Hz downward."
  },
  {
    id: "rhythmic_hoot",
    name: "Low Rhythmic Hoot",
    presetKey: "low_rhythmic_hoot",
    gender: "Male",
    pitchOffset: -0.15,
    description: "Deep sinusoidal rhythmic hoot bursts (750Hz down to 520Hz) with 8Hz tremor."
  },
  {
    id: "female_rider_screech",
    name: "Female Monkey Opponent Vocal",
    presetKey: "playful_screech",
    gender: "Female",
    pitchOffset: 0.2,
    description: "Sharp, high-pitched vocal folds with FM cross-modulation representing mounted female opponents."
  },
  {
    id: "male_rider_grunt",
    name: "Male Monkey Opponent Vocal",
    presetKey: "low_rhythmic_hoot",
    gender: "Male",
    pitchOffset: -0.2,
    description: "Guttural, resonant lower vocal fold vibration representing mounted male opponents."
  }
];
