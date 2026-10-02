/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SurfaceTrotSoundItem {
  id: string;
  name: string;
  surfaceKey: string;
  description: string;
}

export const CONVENTIONAL_SURFACE_TROTS: SurfaceTrotSoundItem[] = [
  { id: "ceramic_tile", name: "Trot on Ceramic Tile", surfaceKey: "tile", description: "Crisp high-frequency click with subtle resonant rebound (30cm ceramic tiles)" },
  { id: "hardwood", name: "Trot on Hardwood Floor", surfaceKey: "hardwood", description: "Warm mid-frequency resonant wooden floor tap" },
  { id: "carpet", name: "Trot on Carpet", surfaceKey: "carpet", description: "Soft, cushioned low-thud trotting step" },
  { id: "stone_granite", name: "Trot on Stone & Granite", surfaceKey: "granite", description: "Dense, authoritative mineral contact step" },
  { id: "garden_soil", name: "Trot on Garden Soil", surfaceKey: "soil", description: "Resonant, earthy soil thud" },
  { id: "gravel_path", name: "Trot on Gravel", surfaceKey: "gravel", description: "Crispy crunch gravel and pebble trot" },
  { id: "wood_deck", name: "Trot on Porch Deck", surfaceKey: "deck", description: "Hollow reverberant outdoor decking thud" },
  { id: "marble_slab", name: "Trot on Marble", surfaceKey: "marble", description: "Silky, polished high-definition stone contact" }
];

export const CONVENTIONAL_JACK_VOCALS = [
  { id: "jack_grunt", name: "Jack Opossum Low Grunt", description: "Low-frequency resonant chest grunt for jack opossums" },
  { id: "jack_jump", name: "Jack Opossum Power Jump", description: "Low-lift parabolic swing frequency curve" },
  { id: "jill_jump", name: "Jill Opossum Parabolic Jump", description: "Dynamic soaring frequency swoop curve" },
  { id: "retro_chatter", name: "Retro 8-Bit Opossum Chatter", description: "Square-wave synthesized vintage arcade chatter" }
];
