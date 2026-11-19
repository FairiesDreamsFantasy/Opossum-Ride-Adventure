/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HitBoxDimensions {
  width: number;
  height: number;
  depth: number;
}

export class FeralPigCollisionDetector {
  /**
   * Evaluates if an opossum jump intersects feral pig collision volume (no stomp mechanics).
   */
  public static checkJumpSmashHit(
    playerX: number,
    playerY: number,
    playerZ: number,
    _playerVy: number,
    pigX: number,
    pigY: number,
    pigZ: number,
    pigBox: HitBoxDimensions = { width: 44, height: 32, depth: 32 }
  ): boolean {
    const deltaX = Math.abs(playerX - pigX);
    const deltaY = Math.abs(playerY - pigY);
    const deltaZ = Math.abs(playerZ - pigZ);

    const horizontallyAligned = deltaX <= (pigBox.width * 0.65) && deltaY <= (pigBox.depth * 0.65);
    const aboveGroundImpact = deltaZ <= (pigBox.height + 16);

    return horizontallyAligned && aboveGroundImpact;
  }

  /**
   * Path-based world coordinate proximity check aligning visual lane interpolation with collision.
   */
  public static checkCoursePigProximity(
    playerVisualX: number,
    playerZ: number,
    pigLane: number,
    pigXOffset: number,
    pigZ: number
  ): { isAligned: boolean; zDistance: number; lateralDistance: number } {
    const pigWorldX = pigLane * 4 + pigXOffset;
    const lateralDistance = Math.abs(pigWorldX - playerVisualX);
    const zDistance = Math.abs(pigZ - playerZ);
    return {
      isAligned: zDistance < 2.5 && lateralDistance < 2.35,
      zDistance,
      lateralDistance
    };
  }
}
