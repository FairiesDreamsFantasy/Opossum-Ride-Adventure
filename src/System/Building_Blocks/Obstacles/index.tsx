/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RockObstacle } from "./Rock";
import { FenceObstacle } from "./Fence";
import { FountainObstacle } from "./Fountain";
import { TriangularStoneFenceObstacle } from "../Triangular_Stone_Fence";

/**
 * Obstacles Registry
 */
export const ObstaclesRegistry = {
  Rock: RockObstacle,
  Fence: FenceObstacle,
  Fountain: FountainObstacle,
  TriangularStoneFence: TriangularStoneFenceObstacle
};
