/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Fence Obstacle Definition
 */
export const FenceObstacle = {
  id: "obstacle_fence",
  type: "Physical",
  dimensions: {
    width: 128,
    height: 32,
    depth: 8
  },
  physics: {
    mass: 50,
    restitution: 0.4,
    friction: 0.3
  },
  audio: {
    collision: "wood_clatter",
    surface: "wood"
  }
};
