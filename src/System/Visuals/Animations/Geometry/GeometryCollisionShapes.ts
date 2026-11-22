/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GeometryCollisionShapes — AABB, Circle Overlap, & Point-In-Segment Primitives.
 */

import { GeometryVec2, GeometryVectorMath2D } from "./GeometryVectorMath2D";

export interface GeometryAABB2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class GeometryCollisionShapes {
  public static aabbIntersects(a: GeometryAABB2D, b: GeometryAABB2D): boolean {
    if (!a || !b) return false;
    const ax = Number.isFinite(a.x) ? a.x : 0;
    const ay = Number.isFinite(a.y) ? a.y : 0;
    const aw = Math.max(0, Number.isFinite(a.width) ? a.width : 0);
    const ah = Math.max(0, Number.isFinite(a.height) ? a.height : 0);
    const bx = Number.isFinite(b.x) ? b.x : 0;
    const by = Number.isFinite(b.y) ? b.y : 0;
    const bw = Math.max(0, Number.isFinite(b.width) ? b.width : 0);
    const bh = Math.max(0, Number.isFinite(b.height) ? b.height : 0);

    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  public static pointInAABB(point: GeometryVec2, box: GeometryAABB2D): boolean {
    if (!point || !box) return false;
    const p = GeometryVectorMath2D.sanitizeVec2(point);
    const bx = Number.isFinite(box.x) ? box.x : 0;
    const by = Number.isFinite(box.y) ? box.y : 0;
    const bw = Math.max(0, Number.isFinite(box.width) ? box.width : 0);
    const bh = Math.max(0, Number.isFinite(box.height) ? box.height : 0);
    return p.x >= bx && p.x <= bx + bw && p.y >= by && p.y <= by + bh;
  }

  public static circlesOverlap(c1: GeometryVec2, r1: number, c2: GeometryVec2, r2: number): boolean {
    const a = GeometryVectorMath2D.sanitizeVec2(c1);
    const b = GeometryVectorMath2D.sanitizeVec2(c2);
    const radSum = Math.max(0, Number.isFinite(r1) ? r1 : 0) + Math.max(0, Number.isFinite(r2) ? r2 : 0);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return dx * dx + dy * dy <= radSum * radSum;
  }
}
