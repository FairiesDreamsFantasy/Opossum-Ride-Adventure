/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Bounds checking model for high-speed coordinate processing.
 */
export interface BoundingBox2D {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Ultra-high performance visual optimization calculations and rendering routines.
 */
export const VisualEngineGeneral = {
  /**
   * Fast viewport intersection check (Frustum Culling approximation)
   * to determine if an object is visible on the display area.
   */
  isWithinViewport(
    x: number,
    y: number,
    width: number,
    height: number,
    viewWidth: number,
    viewHeight: number,
    margin: number = 64
  ): boolean {
    return (
      x + width + margin >= 0 &&
      x - margin <= viewWidth &&
      y + height + margin >= 0 &&
      y - margin <= viewHeight
    );
  },

  /**
   * Generates a spatial lookup index key for canvas grid partitioning,
   * significantly reducing broadphase collision and drawing checks.
   */
  getGridCellKey(x: number, y: number, cellSize: number = 100): string {
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    return `${col},${row}`;
  },

  /**
   * Throttles high-frequency particle emission to maintain smooth 60 FPS performance.
   * If frame-time exceeds standard threshold, reduces requested particle count.
   */
  getOptimizedParticleCount(
    requestedCount: number,
    currentFps: number,
    targetFps: number = 60
  ): number {
    if (currentFps >= targetFps - 5) {
      return requestedCount;
    }
    const ratio = Math.max(0.2, currentFps / targetFps);
    return Math.round(requestedCount * ratio);
  },

  /**
   * Calculates a 2D bounding box from a collection of points for precise collision and redraw framing.
   */
  computeBoundingBox(points: { x: number; y: number }[]): BoundingBox2D {
    if (points.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }

    return { minX, minY, maxX, maxY };
  }
};
