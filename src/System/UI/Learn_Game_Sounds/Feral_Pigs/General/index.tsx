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
    id: "feral_pig_walk",
    name: "Feral Pig Foraging Walk Footfalls",
    buttonLabel: "Play Pig Walk Footfalls",
    category: "movement",
    pigType: "Universal",
    description: "Steady 2-step cloven hoof earth strikes with soft soil rustle during slow foraging walks."
  },
  {
    id: "feral_pig_trot",
    name: "Feral Pig Rapid Trot Footfalls",
    buttonLabel: "Play Pig Trot Footfalls",
    category: "movement",
    pigType: "Universal",
    description: "Brisk paired diagonal cloven-hoof strike with crisp terrain transient during arena patrols."
  },
  {
    id: "feral_pig_gallop",
    name: "Feral Pig Bounding Gallop",
    buttonLabel: "Play Pig Gallop Footfalls",
    category: "movement",
    pigType: "Universal",
    description: "Rapid 3-beat bounding hoof cascade triggered when fleeing sows or pacing boars break into full gallop."
  },
  {
    id: "feral_pig_charge",
    name: "Feral Pig Heavy Charge Rush",
    buttonLabel: "Play Pig Charge Rush",
    category: "movement",
    pigType: "Boar",
    description: "Thunderous heavy hoof strike bursts layered with an aggressive rushing nasal huff."
  },
  {
    id: "feral_pig_forage_snuffle",
    name: "Feral Pig Root & Forage Snuffle",
    buttonLabel: "Play Pig Forage Snuffle",
    category: "vocal",
    pigType: "Universal",
    description: "Double nasal rooting snuffle with soft earth-grazing grunt pulses while nosing through terrain."
  },
  {
    id: "feral_pig_alert_chuff",
    name: "Feral Pig Territorial Alert Chuff",
    buttonLabel: "Play Pig Alert Chuff",
    category: "vocal",
    pigType: "Boar",
    description: "Sharp double-burst warning exhalation fired when a feral pig locks onto an approaching opossum."
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
