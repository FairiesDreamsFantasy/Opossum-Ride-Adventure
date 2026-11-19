/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameLevel } from "../types";
import { generateLevel as generateWorld1Level } from "../World/1/Levels";
import { generateWorld2Level } from "../World/2/Levels";
import { generateWorld3Level } from "../World/3/Levels";
import { generateWorld4Level } from "../World/4/Levels";

export * from "../World/1/Levels";
export { generateWorld2Level } from "../World/2/Levels";
export { generateWorld3Level } from "../World/3/Levels";
export { generateWorld4Level } from "../World/4/Levels";
export * from "./Index";

/**
 * Resolves a GameLevel for any World (1-4) and stage index cleanly.
 */
export function generateLevelForWorld(worldId: number, levelId: number): GameLevel {
  if (worldId === 2) {
    return generateWorld2Level(levelId);
  }
  if (worldId === 3) {
    return { ...generateWorld3Level(levelId), worldId: 3, isExploration: levelId === 0 };
  }
  if (worldId === 4) {
    return { ...generateWorld4Level(levelId), worldId: 4, isExploration: false };
  }
  return generateWorld1Level(levelId);
}

