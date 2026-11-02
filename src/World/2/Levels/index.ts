/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from "../../../types";

export function generateWorld2Level(levelId: number): GameLevel {
  if (levelId === 0) {
    return {
      id: 0,
      name: "Temple Exploration Courtyard",
      placeId: "temple",
      targetDistance: 2000,
      tickDensity: 10,
      opponentFrequency: 0,
      colorHue: 280
    };
  }

  const templeLineup = [
    { id: "temple", name: "The Ancient Relic Temple", hue: 280 },
    { id: "temple_grand_fairy_temple", name: "Grand Fairy Temple", hue: 290 },
    { id: "temple_rainbow_passage", name: "The Rainbow Passage", hue: 300 },
    { id: "temple_sacred_sanctuary", name: "Sacred Sanctuary", hue: 270 },
    { id: "temple_golden_chamber", name: "Golden Chamber", hue: 45 },
    { id: "temple_jade_gallery", name: "Jade Gallery", hue: 140 },
    { id: "temple_silent_shrine", name: "Silent Shrine", hue: 260 }
  ];

  const selected = templeLineup[(levelId - 1) % templeLineup.length];
  const cycle = Math.floor((levelId - 1) / templeLineup.length) + 1;

  return {
    id: levelId,
    name: `${selected.name} - Part ${cycle}`,
    placeId: selected.id,
    targetDistance: 1500 + (levelId * 100),
    tickDensity: 12 + Math.min(10, levelId),
    opponentFrequency: 2 + Math.min(8, Math.floor(levelId / 3)),
    colorHue: selected.hue
  };
}

export default generateWorld2Level;

export * from "./Index";

