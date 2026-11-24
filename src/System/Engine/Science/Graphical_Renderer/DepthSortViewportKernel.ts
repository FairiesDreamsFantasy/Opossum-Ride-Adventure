/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * DepthSortViewportKernel — Singularity-Safe Perspective Projection & Painter's Sort Kernel.
 * Prevents division-by-zero projection blowups and allocates typed Float64 scratch buffers
 * to keep 3D frame loops stable and jitter-free.
 */

export interface DepthProjectResult {
  x: number;
  y: number;
  scale: number;
  depth: number;
  visible: boolean;
}

export class DepthSortViewportKernel {
  public static readonly MIN_DEPTH_EPSILON = 0.25;
  public static readonly MAX_SCALE_CLAMP = 40.0;
  private static readonly scratchBuffer = new Float64Array(8);

  /**
   * Computes finite-safe camera-space depth and perspective scale factor.
   */
  public static computePerspectiveScale(relZ: number, focalLength: number): number {
    const safeFocal = Number.isFinite(focalLength) && focalLength > 1 ? focalLength : 250;
    const safeDepth = Number.isFinite(relZ) ? Math.max(this.MIN_DEPTH_EPSILON, relZ) : this.MIN_DEPTH_EPSILON;
    const rawScale = safeFocal / safeDepth;
    return Math.min(this.MAX_SCALE_CLAMP, Math.max(0.0001, rawScale));
  }

  /**
   * Projects a 3D world point into 2D screen coordinates with strict finite guards.
   */
  public static projectWorldPoint(
    worldX: number,
    worldY: number,
    worldZ: number,
    camX: number,
    camY: number,
    camZ: number,
    focalLength: number,
    viewportWidth: number,
    viewportHeight: number,
    horizonY: number
  ): DepthProjectResult {
    const relZ = worldZ - camZ;
    if (!Number.isFinite(relZ) || relZ < this.MIN_DEPTH_EPSILON) {
      return { x: 0, y: 0, scale: 0, depth: 0, visible: false };
    }

    const scale = this.computePerspectiveScale(relZ, focalLength);
    const dx = Number.isFinite(worldX - camX) ? worldX - camX : 0;
    const dy = Number.isFinite(worldY - camY) ? worldY - camY : 0;

    const sx = viewportWidth * 0.5 + dx * scale;
    const sy = horizonY - dy * scale;

    this.scratchBuffer[0] = sx;
    this.scratchBuffer[1] = sy;
    this.scratchBuffer[2] = scale;
    this.scratchBuffer[3] = relZ;

    const visible =
      Number.isFinite(sx) &&
      Number.isFinite(sy) &&
      sx > -viewportWidth * 0.5 &&
      sx < viewportWidth * 1.5 &&
      sy > -viewportHeight &&
      sy < viewportHeight * 2.0;

    return {
      x: sx,
      y: sy,
      scale,
      depth: relZ,
      visible
    };
  }

  /**
   * Deterministic back-to-front comparator for painter's algorithm sorting.
   */
  public static compareBackToFront(depthA: number, depthB: number): number {
    const a = Number.isFinite(depthA) ? depthA : 0;
    const b = Number.isFinite(depthB) ? depthB : 0;
    return b - a;
  }
}
