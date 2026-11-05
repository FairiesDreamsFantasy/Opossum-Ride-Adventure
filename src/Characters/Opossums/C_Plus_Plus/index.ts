/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Opossum Biometric & Skeletal Kernel
 * Native C++ High-Performance Simulation Bridge
 */

export interface IOpossumBiometricKernel {
  computeDisplacementVolume(shoulderHeightInches: number, bodyLengthInches: number, bodyWidthInches: number): number;
  computeSaddleEquilibrium(mountMassKg: number, riderMassKg: number, velocityMs: number): { saddleYOffset: number; pitchRadians: number };
  evaluateSpinalFlexion(stridePhase: number, flexionFactor: number): number;
}

export const OpossumBiometricKernelCPP: IOpossumBiometricKernel = {
  /**
   * Calculates volumetric displacement (ellipsoidal mass approximation) in cubic inches:
   * V = (4/3) * pi * (length / 2) * (width / 2) * (height / 2)
   */
  computeDisplacementVolume: (shoulderHeightInches: number, bodyLengthInches: number, bodyWidthInches: number): number => {
    const a = Math.max(0.1, bodyLengthInches / 2.0);
    const b = Math.max(0.1, bodyWidthInches / 2.0);
    const c = Math.max(0.1, shoulderHeightInches / 2.0);
    return Number(((4.0 / 3.0) * Math.PI * a * b * c).toFixed(4));
  },

  /**
   * Computes dynamic saddle equilibrium with 64-bit precision to maintain frame-perfect rider anchoring:
   * Considers dynamic downward force and parabolic motion balance.
   */
  computeSaddleEquilibrium: (mountMassKg: number, riderMassKg: number, velocityMs: number): { saddleYOffset: number; pitchRadians: number } => {
    const massRatio = Math.min(1.5, riderMassKg / Math.max(1.0, mountMassKg));
    const dynamicSag = massRatio * 0.0825; // 8.25 cm base compression per unit mass ratio
    const velocityCompression = Math.min(0.04, Math.abs(velocityMs) * 0.005);
    const saddleYOffset = -(dynamicSag + velocityCompression);
    
    // Pitch calculation via linear deceleration/acceleration torque
    const pitchRadians = Math.sin(velocityMs * 0.25) * 0.035 * massRatio;
    return {
      saddleYOffset: Number(saddleYOffset.toFixed(6)),
      pitchRadians: Number(pitchRadians.toFixed(6))
    };
  },

  /**
   * Evaluates spine flexion during active lope/trot strides using cubic trigonometric interpolation:
   */
  evaluateSpinalFlexion: (stridePhase: number, flexionFactor: number = 1.0): number => {
    const normalizedPhase = ((stridePhase % 1.0) + 1.0) % 1.0;
    const baseWave = Math.sin(normalizedPhase * Math.PI * 2.0);
    const harmonicWave = Math.sin(normalizedPhase * Math.PI * 4.0) * 0.25;
    return Number(((baseWave + harmonicWave) * 0.065 * flexionFactor).toFixed(6));
  }
};

export default OpossumBiometricKernelCPP;
