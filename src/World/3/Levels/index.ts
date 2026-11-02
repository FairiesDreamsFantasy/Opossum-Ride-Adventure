/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from "../../../types";

export function generateWorld3Level(levelId: number): GameLevel {
  if (levelId === 0) {
    return {
      id: 0,
      name: "Subterranean Mine Exploration Vault",
      placeId: "simulated_gold_mine",
      targetDistance: 2000,
      tickDensity: 10,
      opponentFrequency: 0,
      colorHue: 45
    };
  }

  const mineLineup = [
    { id: "simulated_gold_mine", name: "Simulated Gold Mine", hue: 45 },
    { id: "simulated_silver_mine", name: "Simulated Silver Mine", hue: 200 },
    { id: "simulated_emerald_mine", name: "Simulated Emerald Mine", hue: 140 },
    { id: "simulated_diamond_mine", name: "Simulated Diamond Mine", hue: 190 },
    { id: "simulated_salt_mine", name: "Simulated Salt Mine", hue: 0 },
    { id: "gold_mine", name: "Natural Gold Mine Cavern", hue: 40 },
    { id: "silver_mine", name: "Natural Silver Mine Shafts", hue: 210 },
    { id: "emerald_mine", name: "Natural Emerald Mine Deep Grotto", hue: 145 },
    { id: "diamond_mine", name: "Natural Diamond Mine Prismatic Vault", hue: 185 },
    { id: "salt_mine", name: "Natural Salt Mine Crystal Chamber", hue: 10 }
  ];

  const selected = mineLineup[(levelId - 1) % mineLineup.length];
  const cycle = Math.floor((levelId - 1) / mineLineup.length) + 1;

  return {
    id: levelId,
    name: `${selected.name} - Depth ${cycle}`,
    placeId: selected.id,
    targetDistance: 1600 + (levelId * 100),
    tickDensity: 12 + Math.min(10, levelId),
    opponentFrequency: 2 + Math.min(8, Math.floor(levelId / 3)),
    colorHue: selected.hue
  };
}

export default generateWorld3Level;

export * from "./Index";

