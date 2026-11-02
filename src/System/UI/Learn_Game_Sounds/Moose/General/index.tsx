/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MoosePlayableSound {
  id: string;
  name: string;
  buttonLabel?: string;
  category: "smash" | "movement" | "vocal" | "impact" | "jump";
  mooseType: "Bull" | "Cow" | "Universal";
  description: string;
  highlight?: boolean;
}

export const MOOSE_PLAYABLE_SOUNDS: MoosePlayableSound[] = [
  {
    id: "moose_smashed_jump",
    name: "Moose Smashed When Perfect Jump Is Successful",
    buttonLabel: "Moose Smashed When Perfect Jump Is Successful",
    category: "smash",
    mooseType: "Universal",
    description: "Sound played when an opossum jumps on an unmounted moose, smashing it flat into the track surface and earning points.",
    highlight: true
  },
  {
    id: "moose_jump",
    name: "Bull Moose Hurdle Jump",
    buttonLabel: "Play Bull Moose Hurdle Jump",
    category: "jump",
    mooseType: "Bull",
    description: "Deep mass-propulsion aerodynamic sweep and heavy landing impact."
  },
  {
    id: "bull_deep_bellow",
    name: "Bull Moose Deep Resonant Bellow",
    buttonLabel: "Play Deep Bull Bellow",
    category: "vocal",
    mooseType: "Bull",
    description: "Low 75-50Hz fundamental vocal fold sweep with sub-resonance and natural tremolo."
  },
  {
    id: "cow_mating_call",
    name: "Cow Moose Mating Call",
    buttonLabel: "Play Cow Moose Call",
    category: "vocal",
    mooseType: "Cow",
    description: "Higher-register 115-80Hz vocal tract formant filter sweep echoing across forests."
  },
  {
    id: "bull_hoof_click",
    name: "Bull Moose Cloven Hoof Clicks",
    buttonLabel: "Play Bull Moose Hoof Clicks",
    category: "movement",
    mooseType: "Bull",
    description: "Heavy 70Hz low-frequency double-digit ground strike with sharp bone-resonance click."
  },
  {
    id: "cow_hoof_click",
    name: "Cow Moose Cloven Hoof Clicks",
    buttonLabel: "Play Cow Moose Hoof Clicks",
    category: "movement",
    mooseType: "Cow",
    description: "Higher-register 100Hz cloven hoof contact paired with organic nasal breath."
  },
  {
    id: "bull_grunt",
    name: "Bull Moose Low Chest Grunt",
    buttonLabel: "Play Bull Moose Chest Grunt",
    category: "vocal",
    mooseType: "Bull",
    description: "Deep sawtooth vocal fold rumble with natural chest wall resonance (55Hz)."
  },
  {
    id: "cow_snort",
    name: "Cow Moose Resonant Snort",
    buttonLabel: "Play Cow Moose Snort",
    category: "vocal",
    mooseType: "Cow",
    description: "Bandpass filtered white noise burst through wide nostrils modeling biological snorting."
  },
  {
    id: "charge_trample",
    name: "Moose Charge Trample & Splinter",
    buttonLabel: "Play Charge Trample & Splinter",
    category: "impact",
    mooseType: "Bull",
    description: "Polyphonic impact burst with sliding hoof skid, timber crunch, and sub-bass shockwave."
  }
];
