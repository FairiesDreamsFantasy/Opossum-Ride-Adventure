/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ObstacleBase {
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
