/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Monkey Brachiation & Pendulum Physics
 * Native C++ High-Precision Simulation Bridge
 */

export const MonkeyBrachiationKernelCPP = {
  gravity: 9.80665,

  /**
   * Evaluates pendulum swing angular velocity: omega = sqrt((2*g/L)*(cos(theta) - cos(theta0)))
   */
  computeSwingAngularVelocity: (armLengthMeters: number, initialAngleRad: number, currentAngleRad: number): number => {
    const l = Math.max(0.2, armLengthMeters);
    const deltaCos = Math.max(0.0, Math.cos(currentAngleRad) - Math.cos(initialAngleRad));
    const omegaSq = ((2.0 * MonkeyBrachiationKernelCPP.gravity) / l) * deltaCos;
    return Number(Math.sqrt(omegaSq).toFixed(6));
  },

  /**
   * Computes tangential release velocity vector upon branch dismount:
   */
  computeReleaseVelocity: (armLengthMeters: number, angularVelocity: number, releaseAngleRad: number): { vx: number; vy: number } => {
    const speed = armLengthMeters * angularVelocity;
    const vx = speed * Math.cos(releaseAngleRad + Math.PI / 2.0);
    const vy = speed * Math.sin(releaseAngleRad + Math.PI / 2.0);
    return {
      vx: Number(vx.toFixed(4)),
      vy: Number(vy.toFixed(4))
    };
  }
};

export default MonkeyBrachiationKernelCPP;
