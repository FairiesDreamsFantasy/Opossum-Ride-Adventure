/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeralPigSoundDefinition {
  id: string;
  name: string;
  category: "vocal" | "movement" | "impact" | "smash";
  pigType: "Boar" | "Sow" | "Universal";
  description: string;
}

export const FERAL_PIG_SOUND_DEFINITIONS: FeralPigSoundDefinition[] = [
  {
    id: "pig_smashed_jump",
    name: "Feral Pig Smashed When Perfect Jump Is Successful",
    category: "smash",
    pigType: "Universal",
    description: "Plays when an opossum-riding player successfully jumps on an unmounted feral pig, flat-smashing it and earning bonus points."
  },
  {
    id: "boar_guttural_grunt",
    name: "Wild Boar Low Guttural Grunt",
    category: "vocal",
    pigType: "Boar",
    description: "88Hz base sawtooth vocal fold rumble with 22Hz LFO throat modulation."
  },
  {
    id: "boar_sharp_snort",
    name: "Wild Boar Aggressive Snort",
    category: "vocal",
    pigType: "Boar",
    description: "Sawtooth nasal exhalation sweep filtered through 520Hz bandpass resonator."
  },
  {
    id: "sow_high_squeal",
    name: "Feral Sow High Alert Squeal",
    category: "vocal",
    pigType: "Sow",
    description: "High-register 540Hz ascending scream with 16Hz LFO flutter and 1100Hz formant filter."
  },
  {
    id: "feral_pig_trot",
    name: "Feral Pig Rapid Trot Footfalls",
    category: "movement",
    pigType: "Universal",
    description: "Low-pitch 80Hz rapid ground strike simulating thick hooves on terrain."
  },
  {
    id: "sow_smashed_pop",
    name: "Feral Sow High-Register Squash Pop",
    category: "smash",
    pigType: "Sow",
    description: "Higher-pitch variant of the smash explosion with 1.15x pitch offset for sow impacts."
  }
];
