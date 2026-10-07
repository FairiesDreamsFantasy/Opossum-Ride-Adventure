/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Quantum_Entropy General: True Randomness Models
 */

export class QuantumEntropyMath {
  /**
   * Models a True Random Number Generator (TRNG) based on 
   * simulated hardware clock jitter and quantum state collapse.
   */
  public static generateQuantumSeed(): number {
    const jitter = Math.random() * performance.now();
    const state = Math.sin(jitter) * Math.cos(jitter * Math.PI);
    return Math.abs(state % 1);
  }

  /**
   * Normalizes a quantum seed into a specific range [min, max].
   */
  public static normalize(seed: number, min: number, max: number): number {
    return min + (seed * (max - min));
  }
}

export default QuantumEntropyMath;
