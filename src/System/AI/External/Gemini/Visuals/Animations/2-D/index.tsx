/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D } from "../../../Engine/Mathematics";

/**
 * 2D rendering and coordinate translation transformations.
 */
export const Animations2D = {
  /**
   * Applies translation, scale, and rotation to a 2D point coordinate.
   */
  transformPoint(point: Point2D, tx: number, ty: number, scaleX: number, scaleY: number, angleRad: number): Point2D {
    // Scale
    let x = point.x * scaleX;
    let y = point.y * scaleY;

    // Rotate
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;

    // Translate
    return {
      x: rx + tx,
      y: ry + ty
    };
  }
};
