/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeyPlayableSound {
  id: string;
  name: string;
  presetKey: string;
  gender: "Male" | "Female";
  pitchOffset: number;
  description: string;
  vocalType: string;
  actionType?: "chatter" | "jump" | "screech" | "hoot" | "pant_hoot" | "alarm" | "coo";
}

export const MONKEY_PLAYABLE_SOUNDS: MonkeyPlayableSound[] = [
  {
    id: "monkey_jump",
    name: "Acrobatic Monkey Jump",
    presetKey: "acrobatic_spring_jump",
    gender: "Female",
    pitchOffset: 0.0,
    vocalType: "Jump & Rebound",
    actionType: "jump",
    description: "Procedural monkey jump combining elastic leap swoop, branch tension click, and excited mid-air chirp."
  },
  {
    id: "monkey_chatter",
    name: "Curious Monkey Chatter",
    presetKey: "high_curious_chatter",
    gender: "Female",
    pitchOffset: 0.0,
    vocalType: "Chatter Sweep",
    actionType: "chatter",
    description: "Multi-burst curious chattering frequency sweep (2200Hz to 950Hz)."
  },
  {
    id: "monkey_screech",
    name: "Playful Monkey Screech",
    presetKey: "playful_screech",
    gender: "Female",
    pitchOffset: 0.1,
    vocalType: "FM Screech",
    actionType: "screech",
    description: "High-register rising screech with FM cross-modulation (1400Hz to 2800Hz)."
  },
  {
    id: "monkey_pant_hoot",
    name: "Resonant Pant-Hoot Climax",
    presetKey: "pant_hoot_climax",
    gender: "Male",
    pitchOffset: 0.0,
    vocalType: "Pant-Hoot Call",
    actionType: "pant_hoot",
    description: "Rhythmic panting building up to an explosive resonant canopy hoot."
  },
  {
    id: "monkey_alarm_call",
    name: "Sharp Alarm Warning Call",
    presetKey: "sharp_alarm_bark",
    gender: "Male",
    pitchOffset: 0.0,
    vocalType: "Alarm Warning",
    actionType: "alarm",
    description: "Rapid, high-frequency descending warning call alerting the troop to obstacles."
  },
  {
    id: "monkey_coo_call",
    name: "Gentle Social Coo Call",
    presetKey: "gentle_social_coo",
    gender: "Female",
    pitchOffset: 0.0,
    vocalType: "Social Coo",
    actionType: "coo",
    description: "Soft parabolic pitch glide with soothing harmonic overtones."
  },
  {
    id: "monkey_female_opponent",
    name: "Female Monkey Opponent Cry",
    presetKey: "playful_screech",
    gender: "Female",
    pitchOffset: 0.25,
    vocalType: "Rider Screech",
    actionType: "chatter",
    description: "High-pitched vocal folds with FM cross-modulation for mounted female opponents."
  },
  {
    id: "monkey_male_opponent",
    name: "Male Monkey Opponent Cry",
    presetKey: "low_rhythmic_hoot",
    gender: "Male",
    pitchOffset: -0.25,
    vocalType: "Rider Grunt",
    actionType: "chatter",
    description: "Low guttural vocal fold resonance for mounted male opponents."
  }
];
