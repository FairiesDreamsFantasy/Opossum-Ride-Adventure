/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SurfaceTrotButtonItem {
  id: string;
  name: string;
  surfaceKey: string;
  description: string;
  ariaLabel: string;
}

export const SURFACE_TROT_BUTTONS: SurfaceTrotButtonItem[] = [
  {
    id: "ceramic_tile",
    name: "Trot on Ceramic Tile (30cmx30cm)",
    surfaceKey: "tile",
    description: "Crisp high-frequency click with subtle resonant rebound for tea room ceramic tiles.",
    ariaLabel: "Play opossum trotting on ceramic tile"
  },
  {
    id: "hardwood",
    name: "Trot on Hardwood Floor",
    surfaceKey: "hardwood",
    description: "Warm mid-frequency resonant wooden floor tap.",
    ariaLabel: "Play opossum trotting on hardwood"
  },
  {
    id: "carpet",
    name: "Trot on Soft Carpet",
    surfaceKey: "carpet",
    description: "Low-thud cushioned footfall with high absorption.",
    ariaLabel: "Play opossum trotting on carpet"
  },
  {
    id: "stone_granite",
    name: "Trot on Granite & Solid Stone",
    surfaceKey: "granite",
    description: "Dense, authoritative mineral contact step.",
    ariaLabel: "Play opossum trotting on granite stone"
  },
  {
    id: "garden_soil",
    name: "Trot on Earthy Garden Soil",
    surfaceKey: "soil",
    description: "Resonant, earthy soil thud for outdoor trails.",
    ariaLabel: "Play opossum trotting on garden soil"
  },
  {
    id: "gravel_path",
    name: "Trot on Gravel Pathway",
    surfaceKey: "gravel",
    description: "Crispy crunch multi-pebble displacement step.",
    ariaLabel: "Play opossum trotting on gravel"
  },
  {
    id: "wood_deck",
    name: "Trot on Porch Decking",
    surfaceKey: "deck",
    description: "Hollow reverberant outdoor decking wood footstep.",
    ariaLabel: "Play opossum trotting on wooden porch deck"
  },
  {
    id: "marble_slab",
    name: "Trot on Polished Marble",
    surfaceKey: "marble",
    description: "Silky, polished high-definition stone contact step.",
    ariaLabel: "Play opossum trotting on polished marble"
  }
];

export interface JackVocalButtonItem {
  id: string;
  name: string;
  description: string;
  ariaLabel: string;
}

export const JACK_VOCAL_BUTTONS: JackVocalButtonItem[] = [
  {
    id: "jack_grunt",
    name: "Jack Opossum Low Chest Grunt",
    description: "Low-frequency resonant chest grunt synthesizer for male jack opossums in onesies.",
    ariaLabel: "Play jack opossum low chest grunt"
  },
  {
    id: "jack_jump",
    name: "Jack Opossum Power Jump Sweep",
    description: "Parabolic lift frequency curve with low-end ballast.",
    ariaLabel: "Play jack opossum power jump"
  },
  {
    id: "retro_arcade_chatter",
    name: "Retro 8-Bit Opossum Chatter",
    description: "Vintage square-wave 8-bit arcade synthesizer option.",
    ariaLabel: "Play retro 8-bit opossum chatter"
  }
];
