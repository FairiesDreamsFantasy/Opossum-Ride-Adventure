/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRIANGULAR_STONE_FENCE_SPEC, TriangularStoneFenceSpec } from "./General";

/**
 * Triangular Stone Fence Obstacle Definition
 * Stacked blocks of triangular slate stones resembling a jumpable fence.
 */
export const TriangularStoneFenceObstacle = {
  id: TRIANGULAR_STONE_FENCE_SPEC.id,
  name: TRIANGULAR_STONE_FENCE_SPEC.name,
  category: TRIANGULAR_STONE_FENCE_SPEC.category,
  type: "Physical" as const,
  obstacleType: "triangular_stone_fence" as const,
  dimensions: {
    width: TRIANGULAR_STONE_FENCE_SPEC.dimensions.width,
    height: TRIANGULAR_STONE_FENCE_SPEC.dimensions.height,
    depth: TRIANGULAR_STONE_FENCE_SPEC.dimensions.depth
  },
  worldBounds: {
    widthMeters: TRIANGULAR_STONE_FENCE_SPEC.dimensions.worldWidthM,
    heightMeters: TRIANGULAR_STONE_FENCE_SPEC.dimensions.worldHeightM,
    jumpClearanceY: TRIANGULAR_STONE_FENCE_SPEC.physics.jumpClearanceY
  },
  spacing: TRIANGULAR_STONE_FENCE_SPEC.spacing,
  physics: {
    mass: TRIANGULAR_STONE_FENCE_SPEC.physics.mass,
    restitution: TRIANGULAR_STONE_FENCE_SPEC.physics.restitution,
    friction: TRIANGULAR_STONE_FENCE_SPEC.physics.friction
  },
  audio: {
    collision: TRIANGULAR_STONE_FENCE_SPEC.audio.collision,
    surface: TRIANGULAR_STONE_FENCE_SPEC.audio.surface,
    resonantFreqHz: TRIANGULAR_STONE_FENCE_SPEC.audio.resonantFreqHz,
    thudFreqHz: TRIANGULAR_STONE_FENCE_SPEC.audio.thudFreqHz
  },
  spec: TRIANGULAR_STONE_FENCE_SPEC
};

export { TRIANGULAR_STONE_FENCE_SPEC };
export type { TriangularStoneFenceSpec };
export default TriangularStoneFenceObstacle;
