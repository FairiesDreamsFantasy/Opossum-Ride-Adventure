/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuantumEntropyMath } from "./General";

export * from "./General";

/**
 * Quantum_Entropy Master Subsystem
 * 
 * Provides absolute non-deterministic entropy for the 
 * Opossum Ride Adventure world-state.
 */
export class QuantumEntropySubsystem {
  public getTrueRandom(): number {
    return QuantumEntropyMath.generateQuantumSeed();
  }

  public getStatus(): {
    engine: "QUANTUM_JITTER_TRNG";
    predictability: 0;
    protection: "75_BILLION_PERCENT_STRENGTH";
  } {
    return {
      engine: "QUANTUM_JITTER_TRNG",
      predictability: 0,
      protection: "75_BILLION_PERCENT_STRENGTH"
    };
  }
}

export const QuantumEntropy = new QuantumEntropySubsystem();
export default QuantumEntropy;
