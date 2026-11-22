/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SpatialStabilizer3D — IEEE 754 Guard, Near-Plane Singularity Prevention, & Vertex Float64 Pool.
 */

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export class VertexFloat64Pool {
  private readonly buffer: Float64Array;
  private cursor = 0;

  constructor(public readonly maxVertices: number = 1024) {
    const count = Math.max(16, Math.floor(maxVertices));
    this.buffer = new Float64Array(count * 3);
  }

  public reset(): void {
    this.cursor = 0;
  }

  public pushVertex(x: number, y: number, z: number): number {
    const idx = this.cursor % this.maxVertices;
    const base = idx * 3;
    this.buffer[base] = SpatialStabilizer3D.sanitizeFinite(x, 0);
    this.buffer[base + 1] = SpatialStabilizer3D.sanitizeFinite(y, 0);
    this.buffer[base + 2] = SpatialStabilizer3D.sanitizeFinite(z, 0);
    this.cursor++;
    return idx;
  }

  public readVertex(index: number): Vec3Tuple {
    const safeIdx = Math.max(0, Math.min(this.maxVertices - 1, Math.floor(index)));
    const base = safeIdx * 3;
    return {
      x: this.buffer[base],
      y: this.buffer[base + 1],
      z: this.buffer[base + 2]
    };
  }
}

export class SpatialStabilizer3D {
  public static readonly DENORMAL_EPS = 1e-18;
  public static readonly MIN_NEAR_Z = 0.05;

  public static sanitizeFinite(value: number, fallback: number = 0): number {
    return Number.isFinite(value) ? value : fallback;
  }

  public static clampFinite(value: number, minVal: number, maxVal: number, fallback?: number): number {
    const fb = fallback !== undefined ? fallback : minVal;
    const clean = this.sanitizeFinite(value, fb);
    if (clean < minVal) return minVal;
    if (clean > maxVal) return maxVal;
    return clean;
  }

  public static flushDenormal(value: number): number {
    if (!Number.isFinite(value) || Math.abs(value) < this.DENORMAL_EPS) return 0;
    return value;
  }

  public static sanitizeVec3(v: Partial<Vec3Tuple> | null | undefined, fallback: Vec3Tuple = { x: 0, y: 0, z: 0 }): Vec3Tuple {
    if (!v) return { ...fallback };
    return {
      x: this.flushDenormal(this.sanitizeFinite(v.x ?? fallback.x, fallback.x)),
      y: this.flushDenormal(this.sanitizeFinite(v.y ?? fallback.y, fallback.y)),
      z: this.flushDenormal(this.sanitizeFinite(v.z ?? fallback.z, fallback.z))
    };
  }

  /**
   * Prevents division-by-zero when camera z + fov crosses zero.
   */
  public static guardPerspectiveDenominator(z: number, fov: number): number {
    const safeFov = Math.max(1.0, this.sanitizeFinite(fov, 250));
    const safeZ = this.sanitizeFinite(z, 0);
    const denom = safeFov + safeZ;
    return denom < this.MIN_NEAR_Z ? this.MIN_NEAR_Z : denom;
  }
}
