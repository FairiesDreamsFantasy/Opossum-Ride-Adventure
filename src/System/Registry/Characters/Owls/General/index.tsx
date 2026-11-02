/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OwlDefinition {
  id: string;
  species: string;
  baseColor: string;
  hootPitch: number;
}

export const INITIAL_OWLS: OwlDefinition[] = [
  { id: "barn_owl", species: "Barn Owl", baseColor: "#fef3c7", hootPitch: 220 },
  { id: "great_horned_owl", species: "Great Horned Owl", baseColor: "#451a03", hootPitch: 180 },
  { id: "snowy_owl", species: "Snowy Owl", baseColor: "#ffffff", hootPitch: 240 }
];
