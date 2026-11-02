/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemObject {
  id: string;
  name: string;
  category: "Obstacle" | "Structure" | "Decoration" | "Interactive";
  interactable: boolean;
}

export const ObjectsGeneralRegistry: SystemObject[] = [
  { id: "wooden_crate", name: "Wooden Crate", category: "Obstacle", interactable: true },
  { id: "stone_pillar", name: "Stone Pillar", category: "Structure", interactable: false },
  { id: "iron_fence", name: "Iron Fence", category: "Obstacle", interactable: false },
  { id: "golden_goblet", name: "Golden Goblet", category: "Interactive", interactable: true },
  { id: "wind_chimes", name: "Interactive Crystal Wind Chimes", category: "Decoration", interactable: true }
];
