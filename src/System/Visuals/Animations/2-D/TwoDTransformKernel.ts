/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TwoDTransformKernel — Stabilized 2D Affine Matrices, Camera Projection, and Parallax Solver.
 */

export interface TwoDPoint {
  x: number;
  y: number;
}

export class TwoDTransformKernel {
  public static sanitizeFinite(val: number, fallback: number = 0): number {
    return Number.isFinite(val) ? val : fallback;
  }

  public static calculateParallax(offset: number, speed: number, viewportWidth: number = 1280): number {
    const cleanOffset = this.sanitizeFinite(offset, 0);
    const cleanSpeed = Math.max(-4, Math.min(4, this.sanitizeFinite(speed, 1)));
    const span = Math.max(64, this.sanitizeFinite(viewportWidth, 1280));
    return ((cleanOffset * cleanSpeed) % span + span) % span;
  }

  public static transformAffine2D(
    x: number,
    y: number,
    tx: number,
    ty: number,
    angleRad: number,
    scaleX: number = 1,
    scaleY: number = 1
  ): TwoDPoint {
    const px = this.sanitizeFinite(x, 0) * this.sanitizeFinite(scaleX, 1);
    const py = this.sanitizeFinite(y, 0) * this.sanitizeFinite(scaleY, 1);
    const cosA = Math.cos(this.sanitizeFinite(angleRad, 0));
    const sinA = Math.sin(this.sanitizeFinite(angleRad, 0));
    return {
      x: px * cosA - py * sinA + this.sanitizeFinite(tx, 0),
      y: px * sinA + py * cosA + this.sanitizeFinite(ty, 0)
    };
  }
}
