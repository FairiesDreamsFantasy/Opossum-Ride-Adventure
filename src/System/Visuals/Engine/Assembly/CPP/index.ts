/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C++ High-Performance Math Vector & Object Pipeline
 */

export class Vector3D {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  public dot(v: Vector3D): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  public cross(v: Vector3D): Vector3D {
    return new Vector3D(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}

export default Vector3D;
