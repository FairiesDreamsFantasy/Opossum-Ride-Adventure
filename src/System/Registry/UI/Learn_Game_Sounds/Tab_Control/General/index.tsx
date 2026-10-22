/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LearnGameSoundsTabDefinition {
  id: "feral_pigs" | "monkeys" | "moose" | "obstacles" | "opossums";
  label: string;
  ariaLabel: string;
  description: string;
}

export const LEARN_GAME_SOUNDS_TABS: LearnGameSoundsTabDefinition[] = [
  {
    id: "feral_pigs",
    label: "Feral Pigs",
    ariaLabel: "Feral Pigs Sound Category Tab",
    description: "Bio-acoustic synthesizers for deep 88Hz boar grunts, alert sow squeals, trotting hooves, and iconic perfect jump flat-smash explosions."
  },
  {
    id: "monkeys",
    label: "Monkeys",
    ariaLabel: "Monkeys Sound Category Tab",
    description: "Listen to procedural curious chatters, playful screeches, canopy calls, and rhythmic hoots synthesized with FM cross-modulation."
  },
  {
    id: "moose",
    label: "Moose",
    ariaLabel: "Moose Sound Category Tab",
    description: "Experience cloven hoof clicks, resonant chest grunts, snorts, bellows, and the high-impact moose charge trample sound."
  },
  {
    id: "obstacles",
    label: "Obstacles",
    ariaLabel: "Obstacles and Collisions Sound Category Tab",
    description: "Hear tactile collision sounds for wooden fences, garden flora, solid stone rocks, crystal tick pickups, and sliding doors."
  },
  {
    id: "opossums",
    label: "Opossums",
    ariaLabel: "Opossums Sound Category Tab",
    description: "Explore trotting steps across diverse terrains, parabolic jumps, and authentic elegant vocal chatters of crafted and conventional opossums."
  }
];
