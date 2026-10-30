/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Swift SIMD Vectors & Affine Transformations
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Swift SIMD4 parallel computations and affine matrices
 */

/**
 * Emulates Swift's SIMD4<Double> vector registration layout.
 * Provides element-wise parallel calculations typical of Apple Silicon SIMD instruction sets.
 */
export class SIMD4 {
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(x = 0.0, y = 0.0, z = 0.0, w = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public add(other: SIMD4): SIMD4 {
    return new SIMD4(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z,
      this.w + other.w
    );
  }

  public subtract(other: SIMD4): SIMD4 {
    return new SIMD4(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z,
      this.w - other.w
    );
  }

  public multiply(scalar: number): SIMD4 {
    return new SIMD4(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.w * scalar
    );
  }

  public dot(other: SIMD4): number {
    return (
      this.x * other.x +
      this.y * other.y +
      this.z * other.z +
      this.w * other.w
    );
  }

  public length(): number {
    return Math.sqrt(this.dot(this));
  }

  public normalized(): SIMD4 {
    const len = this.length();
    if (len === 0) return new SIMD4();
    return this.multiply(1.0 / len);
  }
}

/**
 * Emulates Swift affine 2D transform protocol layouts (similar to CGAffineTransform).
 */
export class CGAffineTransform {
  public a: number;  // scale x
  public b: number;  // shear y
  public c: number;  // shear x
  public d: number;  // scale y
  public tx: number; // translate x
  public ty: number; // translate y

  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }

  public static makeTranslation(tx: number, ty: number): CGAffineTransform {
    return new CGAffineTransform(1, 0, 0, 1, tx, ty);
  }

  public static makeScale(sx: number, sy: number): CGAffineTransform {
    return new CGAffineTransform(sx, 0, 0, sy, 0, 0);
  }

  public static makeRotation(angleRadians: number): CGAffineTransform {
    const cosVal = Math.cos(angleRadians);
    const sinVal = Math.sin(angleRadians);
    return new CGAffineTransform(cosVal, sinVal, -sinVal, cosVal, 0, 0);
  }

  public concatenate(other: CGAffineTransform): CGAffineTransform {
    return new CGAffineTransform(
      this.a * other.a + this.b * other.c,
      this.a * other.b + this.b * other.d,
      this.c * other.a + this.d * other.c,
      this.c * other.b + this.d * other.d,
      this.tx * other.a + this.ty * other.c + other.tx,
      this.tx * other.b + this.ty * other.d + other.ty
    );
  }
}
