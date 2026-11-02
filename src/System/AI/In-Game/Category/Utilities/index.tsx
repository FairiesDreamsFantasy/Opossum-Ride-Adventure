/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import { AIInGameUtilitiesGeneral } from "./General";

/**
 * AI In-Game Category Utilities
 * High-level orchestration for in-game decision modeling, proximity detection,
 * and deterministic path-finding metrics.
 */
export const AIInGameCategoryUtilities = {
  General: AIInGameUtilitiesGeneral,
  
  /**
   * Evaluates closest active entity within a given perception radius.
   */
  findNearestEntity: <T extends { x: number; y: number }>(
    origin: { x: number; y: number },
    entities: T[],
    maxRadius: number = Infinity
  ): { entity: T; distance: number } | null => {
    let nearest: T | null = null;
    let minDistance = maxRadius;

    for (const entity of entities) {
      const dist = AIInGameUtilitiesGeneral.calculateDistance(
        origin.x,
        origin.y,
        entity.x,
        entity.y
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearest = entity;
      }
    }

    return nearest ? { entity: nearest, distance: minDistance } : null;
  }
};
