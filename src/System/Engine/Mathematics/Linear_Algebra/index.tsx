/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 3D Vector mathematical operations.
 */
export class Vector3 {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public add(v: Vector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  public subtract(v: Vector3): Vector3 {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  public multiplyScalar(s: number): Vector3 {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }

  public dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  public cross(v: Vector3): Vector3 {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  public magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public magnitude(): number {
    return Math.sqrt(this.magnitudeSquared());
  }

  public normalize(): Vector3 {
    const mag = this.magnitude();
    if (mag > 1e-12) {
      return this.multiplyScalar(1 / mag);
    }
    return new Vector3(0, 0, 0);
  }

  public distanceTo(v: Vector3): number {
    return this.subtract(v).magnitude();
  }

  public angleTo(v: Vector3): number {
    const d = this.dot(v);
    const m = this.magnitude() * v.magnitude();
    if (m < 1e-12) return 0;
    return Math.acos(Math.max(-1, Math.min(1, d / m)));
  }

  public projectOnto(v: Vector3): Vector3 {
    const vMagSq = v.magnitudeSquared();
    if (vMagSq < 1e-12) return new Vector3(0, 0, 0);
    return v.multiplyScalar(this.dot(v) / vMagSq);
  }
}

/**
 * 4x4 Matrix representation and transformations.
 */
export class Matrix4 {
  public elements: Float64Array;

  constructor() {
    this.elements = new Float64Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }

  public static identity(): Matrix4 {
    return new Matrix4();
  }

  public static translation(tx: number, ty: number, tz: number): Matrix4 {
    const m = new Matrix4();
    m.elements[12] = tx;
    m.elements[13] = ty;
    m.elements[14] = tz;
    return m;
  }

  public static scaling(sx: number, sy: number, sz: number): Matrix4 {
    const m = new Matrix4();
    m.elements[0] = sx;
    m.elements[5] = sy;
    m.elements[10] = sz;
    return m;
  }

  public static rotationY(radians: number): Matrix4 {
    const m = new Matrix4();
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    m.elements[0] = c;
    m.elements[2] = -s;
    m.elements[8] = s;
    m.elements[10] = c;
    return m;
  }

  public multiply(other: Matrix4): Matrix4 {
    const result = new Matrix4();
    const a = this.elements;
    const b = other.elements;
    const r = result.elements;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        r[row + col * 4] =
          a[row + 0 * 4] * b[0 + col * 4] +
          a[row + 1 * 4] * b[1 + col * 4] +
          a[row + 2 * 4] * b[2 + col * 4] +
          a[row + 3 * 4] * b[3 + col * 4];
      }
    }
    return result;
  }

  public transformPoint(v: Vector3): Vector3 {
    const e = this.elements;
    const x = v.x * e[0] + v.y * e[4] + v.z * e[8] + e[12];
    const y = v.x * e[1] + v.y * e[5] + v.z * e[9] + e[13];
    const z = v.x * e[2] + v.y * e[6] + v.z * e[10] + e[14];
    const w = v.x * e[3] + v.y * e[7] + v.z * e[11] + e[15];
    if (Math.abs(w) > 1e-12 && w !== 1) {
      return new Vector3(x / w, y / w, z / w);
    }
    return new Vector3(x, y, z);
  }

  public determinant(): number {
    const e = this.elements;
    const b00 = e[0] * e[5] - e[1] * e[4];
    const b01 = e[0] * e[6] - e[2] * e[4];
    const b02 = e[0] * e[7] - e[3] * e[4];
    const b03 = e[1] * e[6] - e[2] * e[5];
    const b04 = e[1] * e[7] - e[3] * e[5];
    const b05 = e[2] * e[7] - e[3] * e[6];
    const b06 = e[8] * e[13] - e[9] * e[12];
    const b07 = e[8] * e[14] - e[10] * e[12];
    const b08 = e[8] * e[15] - e[11] * e[12];
    const b09 = e[9] * e[14] - e[10] * e[13];
    const b10 = e[9] * e[15] - e[11] * e[13];
    const b11 = e[10] * e[15] - e[11] * e[14];

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
}

/**
 * Unit Quaternion for 3D orientation and rotation without gimbal lock.
 */
export class Quaternion {
  constructor(public w: number = 1, public x: number = 0, public y: number = 0, public z: number = 0) {}

  public static fromAxisAngle(axis: Vector3, angleRad: number): Quaternion {
    const norm = axis.normalize();
    const halfAngle = angleRad / 2;
    const s = Math.sin(halfAngle);
    return new Quaternion(Math.cos(halfAngle), norm.x * s, norm.y * s, norm.z * s);
  }

  public multiply(q: Quaternion): Quaternion {
    return new Quaternion(
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w
    );
  }

  public conjugate(): Quaternion {
    return new Quaternion(this.w, -this.x, -this.y, -this.z);
  }

  public normalize(): Quaternion {
    const len = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
    if (len > 1e-12) {
      return new Quaternion(this.w / len, this.x / len, this.y / len, this.z / len);
    }
    return new Quaternion(1, 0, 0, 0);
  }

  public rotateVector(v: Vector3): Vector3 {
    const qv = new Quaternion(0, v.x, v.y, v.z);
    const rotated = this.multiply(qv).multiply(this.conjugate());
    return new Vector3(rotated.x, rotated.y, rotated.z);
  }

  public static slerp(qa: Quaternion, qb: Quaternion, t: number): Quaternion {
    let cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
    let b = qb;
    if (cosHalfTheta < 0) {
      b = new Quaternion(-qb.w, -qb.x, -qb.y, -qb.z);
      cosHalfTheta = -cosHalfTheta;
    }

    if (Math.abs(cosHalfTheta) >= 1.0) {
      return qa;
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
      return new Quaternion(
        qa.w * 0.5 + b.w * 0.5,
        qa.x * 0.5 + b.x * 0.5,
        qa.y * 0.5 + b.y * 0.5,
        qa.z * 0.5 + b.z * 0.5
      ).normalize();
    }

    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    return new Quaternion(
      qa.w * ratioA + b.w * ratioB,
      qa.x * ratioA + b.x * ratioB,
      qa.y * ratioA + b.y * ratioB,
      qa.z * ratioA + b.z * ratioB
    );
  }
}

/**
 * Master Linear Algebra Engine.
 */
export class LinearAlgebraEngine {
  public static Vector3 = Vector3;
  public static Matrix4 = Matrix4;
  public static Quaternion = Quaternion;

  /**
   * Gram-Schmidt Orthonormalization for 3 basis vectors.
   */
  public static gramSchmidt(v1: Vector3, v2: Vector3, v3: Vector3): [Vector3, Vector3, Vector3] {
    const u1 = v1.normalize();
    const u2 = v2.subtract(u1.multiplyScalar(v2.dot(u1))).normalize();
    const u3 = v3
      .subtract(u1.multiplyScalar(v3.dot(u1)))
      .subtract(u2.multiplyScalar(v3.dot(u2)))
      .normalize();
    return [u1, u2, u3];
  }

  /**
   * Power iteration method to calculate dominant eigenvalue and eigenvector.
   */
  public static powerIteration(matrix: number[][], iterations: number = 30): { eigenvalue: number; eigenvector: number[] } {
    const n = matrix.length;
    let b = new Array(n).fill(1 / Math.sqrt(n));

    for (let iter = 0; iter < iterations; iter++) {
      const nextB = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          nextB[i] += matrix[i][j] * b[j];
        }
      }

      let norm = 0;
      for (let i = 0; i < n; i++) norm += nextB[i] * nextB[i];
      norm = Math.sqrt(norm);

      if (norm < 1e-12) break;
      for (let i = 0; i < n; i++) b[i] = nextB[i] / norm;
    }

    // Rayleigh quotient: lambda = (b^T A b) / (b^T b)
    let numerator = 0;
    for (let i = 0; i < n; i++) {
      let rowDot = 0;
      for (let j = 0; j < n; j++) {
        rowDot += matrix[i][j] * b[j];
      }
      numerator += b[i] * rowDot;
    }

    return { eigenvalue: numerator, eigenvector: b };
  }
}
