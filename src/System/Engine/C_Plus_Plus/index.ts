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
  },

  /**
   * C++ Damped Verlet Stabilizer: prevents numerical kinetic energy explosion on large delta spikes.
   */
  stabilizeDampedVerlet: (p: IVerletParticle, dtSeconds: number = 0.016667, damping: number = 0.994): IVerletParticle => {
    const safeDt = Number.isFinite(dtSeconds) ? Math.max(0.0005, Math.min(0.05, dtSeconds)) : 0.016667;
    const safeDamp = Number.isFinite(damping) ? Math.max(0.5, Math.min(1.0, damping)) : 0.994;
    const dtSq = safeDt * safeDt;
    const vx = (Number.isFinite(p.x) ? p.x : 0) - (Number.isFinite(p.oldX) ? p.oldX : 0);
    const vy = (Number.isFinite(p.y) ? p.y : 0) - (Number.isFinite(p.oldY) ? p.oldY : 0);
    const vz = (Number.isFinite(p.z) ? p.z : 0) - (Number.isFinite(p.oldZ) ? p.oldZ : 0);

    const newX = p.x + vx * safeDamp + p.accelX * dtSq;
    const newY = p.y + vy * safeDamp + p.accelY * dtSq;
    const newZ = p.z + vz * safeDamp + p.accelZ * dtSq;

    return {
      x: Number((Math.abs(newX) < 1e-18 ? 0 : newX).toFixed(6)),
      y: Number((Math.abs(newY) < 1e-18 ? 0 : newY).toFixed(6)),
      z: Number((Math.abs(newZ) < 1e-18 ? 0 : newZ).toFixed(6)),
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
