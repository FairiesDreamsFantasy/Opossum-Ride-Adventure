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
   * Evaluates if an opossum jump intersects top bounding box to execute smash
   */
  public static checkJumpSmashHit(
    playerX: number,
    playerY: number,
    playerZ: number,
    playerVy: number,
    pigX: number,
    pigY: number,
    pigZ: number,
    pigBox: HitBoxDimensions = { width: 44, height: 32, depth: 32 }
  ): boolean {
    // Jump condition: Player must be descending (Vy < 0 or downward momentum)
    const isFalling = playerVy < 0 || playerZ > pigZ + 8;
    
    // Spatial horizontal alignment check
    const deltaX = Math.abs(playerX - pigX);
    const deltaY = Math.abs(playerY - pigY);
    const deltaZ = playerZ - pigZ;

    const horizontallyAligned = deltaX <= (pigBox.width * 0.65) && deltaY <= (pigBox.depth * 0.65);
    const landedOnTop = deltaZ >= 0 && deltaZ <= (pigBox.height + 16);

    return isFalling && horizontallyAligned && landedOnTop;
  }
}
