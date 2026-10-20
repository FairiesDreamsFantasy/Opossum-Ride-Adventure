/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Point2D } from "../../../Engine/Mathematics";

/**
 * Convex polygon generation and rendering operations.
 */
export const AnimationsPolygons = {
  /**
   * Generates a regular polygon coordinate path with N vertices.
   */
  generateRegularPolygon(center: Point2D, radius: number, numVertices: number, rotationRad: number = 0): Point2D[] {
    const vertices: Point2D[] = [];
    const step = (Math.PI * 2) / Math.max(3, numVertices);

    for (let i = 0; i < numVertices; i++) {
      const angle = step * i + rotationRad;
      vertices.push({
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius
      });
    }
    return vertices;
  },

  /**
   * Triangulates a simple convex polygon into independent triangle indices.
   */
  triangulateConvexPolygon(numVertices: number): [number, number, number][] {
    const triangles: [number, number, number][] = [];
    for (let i = 1; i < numVertices - 1; i++) {
      triangles.push([0, i, i + 1]);
    }
    return triangles;
  }
};
