/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { OBSTACLE_SOUND_DEFINITIONS } from "./General";

export const ObstacleCollisionsSoundRegistry = {
  name: "Obstacle and Collision Sound Registry",
  description: "Sound activation mappings for physical world objects, pickups, and environmental contacts.",
  sounds: OBSTACLE_SOUND_DEFINITIONS,
  count: OBSTACLE_SOUND_DEFINITIONS.length
};
