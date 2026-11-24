/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CourtyardPerspectiveKernel — Orthonormal Directional Basis & Depth Projection for World 2 Temple Courtyard.
 */

export interface CourtyardBasisVectors {
  fwdX: number;
  fwdY: number;
  rightX: number;
  rightY: number;
}

export interface CourtyardProjectedPoint {
  x: number;
  y: number;
  scale: number;
  depth: number;
  visible: boolean;
}

export class CourtyardPerspectiveKernel {
  public static readonly MIN_DEPTH_FT = 6;
  public static readonly MAX_DEPTH_FT = 25000;

  /**
   * Computes orthonormal horizontal camera basis vectors for North/South/East/West courtyard orientation.
   */
  public static resolveDirectionBasis(direction: string): CourtyardBasisVectors {
    if (direction === "East") return { fwdX: 1, fwdY: 0, rightX: 0, rightY: -1 };
    if (direction === "West") return { fwdX: -1, fwdY: 0, rightX: 0, rightY: 1 };
    if (direction === "South") return { fwdX: 0, fwdY: -1, rightX: -1, rightY: 0 };
    return { fwdX: 0, fwdY: 1, rightX: 1, rightY: 0 };
  }

  /**
   * Projects World 2 courtyard coordinates (X, Y, heightFt) to canvas screen space.
   */
  public static projectCourtyardPoint(
    gx: number,
    gy: number,
    heightFt: number,
    foyerX: number,
    foyerY: number,
    basis: CourtyardBasisVectors,
    centerX: number,
    horizonY: number,
    focalLength: number
  ): CourtyardProjectedPoint {
    const dx = gx - foyerX;
    const dy = gy - foyerY;
    const depth = dx * basis.fwdX + dy * basis.fwdY;
    const lat = dx * basis.rightX + dy * basis.rightY;

    const clampedDepth = Math.max(this.MIN_DEPTH_FT, depth);
    const scale = focalLength / clampedDepth;
    const x = centerX + lat * scale;
    const y = horizonY + (12 - heightFt) * scale;

    return {
      x,
      y,
      scale,
      depth,
      visible: Number.isFinite(x) && Number.isFinite(y) && depth > 2 && depth < this.MAX_DEPTH_FT
    };
  }
}
