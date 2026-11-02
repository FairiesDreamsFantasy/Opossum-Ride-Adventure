/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ObstacleSpecification {
  id: string;
  type: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  physics: {
    mass: number;
    restitution: number;
    friction: number;
  };
  audio: {
    collision: string;
    surface: string;
  };
}

export const FOUNTAIN_OBSTACLE_SPEC: ObstacleSpecification = {
  id: "obstacle_fountain",
  type: "Water_Decorative",
  dimensions: {
    width: 96,
    height: 72,
    depth: 96
  },
  physics: {
    mass: 1200, // Very heavy stone basin
    restitution: 0.15,
    friction: 0.90
  },
  audio: {
    collision: "splash_stone",
    surface: "stone"
  }
};
