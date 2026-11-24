/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ObjectGeometryTessellator — Zero-Allocation Normalized Polygon Tessellation for Props.
 */

export class ObjectGeometryTessellator {
  private static readonly DIAMOND_VERTS = new Float32Array([
    0, -1,
    1, 0,
    0, 1,
    -1, 0
  ]);

  /**
   * Generates regular N-sided polygon vertices scaled around (cx, cy) into a Float32Array.
   */
  public static computeRegularPolygonVertices(
    cx: number,
    cy: number,
    radius: number,
    sides: number,
    rotationRad: number = 0
  ): Float32Array {
    const safeSides = Math.max(3, Math.min(24, Math.floor(Number.isFinite(sides) ? sides : 4)));
    const safeRadius = Number.isFinite(radius) ? Math.max(0.5, radius) : 8;
    const safeCx = Number.isFinite(cx) ? cx : 0;
    const safeCy = Number.isFinite(cy) ? cy : 0;
    const safeRot = Number.isFinite(rotationRad) ? rotationRad : 0;

    const verts = new Float32Array(safeSides * 2);
    const step = (Math.PI * 2) / safeSides;
    for (let i = 0; i < safeSides; i++) {
      const theta = safeRot + i * step;
      verts[i * 2] = safeCx + Math.cos(theta) * safeRadius;
      verts[i * 2 + 1] = safeCy + Math.sin(theta) * safeRadius;
    }
    return verts;
  }

  /**
   * Returns a scaled copy of normalized diamond marker coordinates.
   */
  public static getDiamondVertices(cx: number, cy: number, radius: number): Float32Array {
    const out = new Float32Array(8);
    const r = Number.isFinite(radius) ? Math.max(0.5, radius) : 8;
    for (let i = 0; i < 4; i++) {
      out[i * 2] = cx + this.DIAMOND_VERTS[i * 2] * r;
      out[i * 2 + 1] = cy + this.DIAMOND_VERTS[i * 2 + 1] * r;
    }
    return out;
  }
}
