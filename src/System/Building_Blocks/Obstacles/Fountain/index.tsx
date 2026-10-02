/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FOUNTAIN_OBSTACLE_SPEC } from "./General";

/**
 * Fountain Obstacle Definition
 * Provides physical and sound-surface coordinates for interactive water basins.
 */
export const FountainObstacle = {
  ...FOUNTAIN_OBSTACLE_SPEC,
  timestamp: new Date().toISOString()
};
