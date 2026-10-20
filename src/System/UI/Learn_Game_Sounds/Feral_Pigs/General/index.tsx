/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeralPigPlayableSound {
  id: string;
  name: string;
  buttonLabel?: string;
  category: "smash" | "movement" | "vocal" | "impact";
  pigType: "Boar" | "Sow" | "Universal";
  description: string;
  highlight?: boolean;
}

export const FERAL_PIG_PLAYABLE_SOUNDS: FeralPigPlayableSound[] = [
  {
    id: "pig_smashed_jump",
    name: "Feral Pig Smashed When Perfect Jump Is Successful",
    buttonLabel: "Feral Pig Smashed When Perfect Jump Is Successful",
    category: "smash",
    pigType: "Universal",
    description: "Iconic sound played when an opossum jumps on a feral pig, smashing it flat into the track with sub-bass seismic shockwave, resonant noise blast, and cartoon squash squeal.",
    highlight: true
  },
  {
    id: "boar_guttural_grunt",
    name: "Wild Boar Low Guttural Grunt",
    buttonLabel: "Play Boar Guttural Grunt",
    category: "vocal",
    pigType: "Boar",
    description: "Deep 88Hz sawtooth vocal fold vibration modulated by 22Hz LFO for rough chest-cavity resonance."
  },
  {
    id: "boar_sharp_snort",
    name: "Wild Boar Aggressive Snort",
    buttonLabel: "Play Boar Sharp Snort",
    category: "vocal",
    pigType: "Boar",
    description: "Sawtooth nasal sweep (145Hz down to 95Hz) driven through 520Hz bandpass resonant filter."
  },
  {
    id: "sow_high_squeal",
    name: "Feral Sow High Alert Squeal",
    buttonLabel: "Play Sow Alert Squeal",
    category: "vocal",
    pigType: "Sow",
    description: "Piercing 540Hz upward sweep (up to 729Hz) with 16Hz LFO flutter and 1100Hz formant peak."
  },
  {
    id: "feral_pig_trot",
    name: "Feral Pig Rapid Trot Footfalls",
    buttonLabel: "Play Pig Trot Footfalls",
    category: "movement",
    pigType: "Universal",
    description: "Low-pitch 80Hz rapid ground strike simulating thick hooves on terrain."
  },
  {
    id: "sow_smashed_pop",
    name: "Feral Sow High-Register Squash Pop",
    buttonLabel: "Play Sow Squash Pop",
    category: "smash",
    pigType: "Sow",
    description: "Higher-pitch variant of the smash explosion with 1.15x pitch offset for sow impacts."
  }
];
