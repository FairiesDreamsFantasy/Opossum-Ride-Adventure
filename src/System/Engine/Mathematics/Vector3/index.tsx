/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 3D Vector mathematics for spatial positioning and velocity kinematics.
 */
export class Vector3Engine {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  public static add(v1: Vector3Engine, v2: Vector3Engine): Vector3Engine {
    return new Vector3Engine(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  public static multiply(v: Vector3Engine, scalar: number): Vector3Engine {
    return new Vector3Engine(v.x * scalar, v.y * scalar, v.z * scalar);
  }

  public static dot(v1: Vector3Engine, v2: Vector3Engine): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public normalize(): Vector3Engine {
    const mag = this.magnitude();
    return mag > 0 ? new Vector3Engine(this.x / mag, this.y / mag, this.z / mag) : new Vector3Engine();
  }
}
