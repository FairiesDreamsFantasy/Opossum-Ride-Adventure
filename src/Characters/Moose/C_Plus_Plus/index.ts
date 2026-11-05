/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Moose Momentum & Kinetic Impact Engine
 * Native C++ High-Inertia Simulation Bridge
 */

export const MooseKinematicsKernelCPP = {
  /**
   * Computes high-mass linear momentum: p = m * v (kg * m/s)
   */
  computeMomentum: (massKg: number, velocityMs: number): number => {
    return Number((massKg * velocityMs).toFixed(4));
  },

  /**
   * Computes charge deceleration stopping distance: d = v^2 / (2 * mu * g)
   */
  computeChargeStoppingDistance: (velocityMs: number, frictionCoeff: number = 0.35): number => {
    const g = 9.80665;
    const stoppingDist = (velocityMs * velocityMs) / (2.0 * frictionCoeff * g);
    return Number(stoppingDist.toFixed(4));
  },

  /**
   * Antler 3D Oriented Bounding Box (OBB) half-extents based on bull/cow type:
   */
  getAntlerBoundingExtents: (isBull: boolean, antlerSpreadInches: number = 60.0): { halfWidth: number; halfHeight: number; halfDepth: number } => {
    if (!isBull) {
      return { halfWidth: 0.15, halfHeight: 0.15, halfDepth: 0.20 }; // Cow moose (no massive rack)
    }
    const widthMeters = (antlerSpreadInches * 0.0254) / 2.0;
    return {
      halfWidth: Number(widthMeters.toFixed(4)),
      halfHeight: 0.35,
      halfDepth: 0.45
    };
  }
};

export default MooseKinematicsKernelCPP;
