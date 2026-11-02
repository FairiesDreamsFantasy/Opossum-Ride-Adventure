/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MooseSoundDefinition {
  id: string;
  name: string;
  category: "vocal" | "movement" | "impact";
  mooseType: "Bull" | "Cow";
  description: string;
}

export const MOOSE_SOUND_DEFINITIONS: MooseSoundDefinition[] = [
  {
    id: "moose_smashed_jump",
    name: "Moose Smashed When Perfect Jump Is Successful",
    category: "impact",
    mooseType: "Bull",
    description: "Plays when an opossum-riding player successfully jumps on an unmounted opponent moose, flat-smashing it and earning bonus points."
  },
  {
    id: "bull_hoof_click",
    name: "Bull Moose Cloven Hoof Clicks",
    category: "movement",
    mooseType: "Bull",
    description: "Double-pulse cloven digit contact with heavy ground impact and bone-resonance click (70Hz base)."
  },
  {
    id: "cow_hoof_click",
    name: "Cow Moose Cloven Hoof Clicks",
    category: "movement",
    mooseType: "Cow",
    description: "Lighter, higher-frequency double-digit hoof strike and breath puff (100Hz base)."
  },
  {
    id: "bull_grunt",
    name: "Bull Moose Deep Chest Grunt",
    category: "vocal",
    mooseType: "Bull",
    description: "Massive low-frequency sawtooth fold vibration with sub-bass chest resonance."
  },
  {
    id: "cow_snort",
    name: "Cow Moose Resonant Snort",
    category: "vocal",
    mooseType: "Cow",
    description: "Organic modulated air-stream burst through wide nasal cavity filters."
  },
  {
    id: "bull_bellow",
    name: "Bull Moose Distant Bellow",
    category: "vocal",
    mooseType: "Bull",
    description: "Prolonged reverberant territorial call echoing across wide arenas."
  },
  {
    id: "charge_trample",
    name: "Moose Charge Trample & Splinter",
    category: "impact",
    mooseType: "Bull",
    description: "4-voice polyphonic synthesis featuring heavy thud, debris splinter, sliding hoof clatter, and rider panic sweep."
  }
];
