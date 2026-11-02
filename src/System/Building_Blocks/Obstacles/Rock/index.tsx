/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Rock Obstacle Definition
 */
export const RockObstacle = {
  id: "obstacle_rock",
  type: "Physical",
  dimensions: {
    width: 64,
    height: 48,
    depth: 64
  },
  physics: {
    mass: 500,
    restitution: 0.2, // Low bounce
    friction: 0.8
  },
  audio: {
    collision: "thud_heavy",
    surface: "stone"
  }
};
