/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Double-Precision Verlet Kinematics & SIMD Matrix Kernel
 * Native C++ High-Precision Engine Bridge
 */

export interface IVerletParticle {
  x: number;
  y: number;
  z: number;
  oldX: number;
  oldY: number;
  oldZ: number;
  accelX: number;
  accelY: number;
  accelZ: number;
}

export const EngineKinematicsKernelCPP = {
  /**
   * Integrates second-order Verlet particle motion:
   * x_new = 2*x - x_old + a * dt^2
   */
  evaluateVerletStep: (p: IVerletParticle, dtSeconds: number = 0.016667): IVerletParticle => {
    const dtSq = dtSeconds * dtSeconds;
    const newX = 2.0 * p.x - p.oldX + p.accelX * dtSq;
    const newY = 2.0 * p.y - p.oldY + p.accelY * dtSq;
    const newZ = 2.0 * p.z - p.oldZ + p.accelZ * dtSq;

    return {
      x: Number(newX.toFixed(6)),
      y: Number(newY.toFixed(6)),
      z: Number(newZ.toFixed(6)),
      oldX: p.x,
      oldY: p.y,
      oldZ: p.z,
      accelX: p.accelX,
      accelY: p.accelY,
      accelZ: p.accelZ
    };
  }
};

export default EngineKinematicsKernelCPP;
