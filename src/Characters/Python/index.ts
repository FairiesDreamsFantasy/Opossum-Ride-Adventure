/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Fauna Population & Habitat Density Optimizer
 * Python Scientific Modeling Bridge (NumPy / SciPy Hybrid)
 */

export const FaunaPopulationModelerPython = {
  distribution: "Gaussian Normal Weight & Stride Distribution",

  /**
   * Generates Gaussian-distributed biometric mass based on species mean and standard deviation:
   */
  evaluateBiometricMassKg: (meanKg: number, stdDevKg: number, randomFactor: number = 0.5): number => {
    // Box-Muller transform emulation
    const u1 = Math.max(0.0001, randomFactor);
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * randomFactor);
    const mass = meanKg + z0 * stdDevKg;
    return Number(Math.max(meanKg * 0.5, mass).toFixed(2));
  },

  /**
   * Computes recommended habitat fauna carrying capacity:
   */
  computeCarryingCapacity: (habitatAreaSqMeters: number, densityPerAcre: number = 2.5): number => {
    const acres = habitatAreaSqMeters / 4046.86;
    return Math.max(1, Math.floor(acres * densityPerAcre));
  }
};

export default FaunaPopulationModelerPython;
