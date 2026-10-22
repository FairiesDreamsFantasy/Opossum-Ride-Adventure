/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Generate regular polygon coordinates for high-performance vector rendering
 */
export function generatePolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation = 0
): Point2D[] {
  const points: Point2D[] = [];
  const angleStep = (Math.PI * 2) / sides;
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep + rotation;
    points.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  }
  return points;
}
