/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Zen Stone Garden Raked Gravel Acoustic Kernel
 * Native C++ High-Precision Subarena Bridge
 */

export const ZenStoneGardenAcousticsCPP = {
  surface: "White Raked Gravel & Moss Stones",
  absorptionCoeff: 0.28,

  computeGravelCrunchFrequencyHz: (stepVelocityMs: number): number => {
    return Number((1200.0 + stepVelocityMs * 150.0).toFixed(2));
  }
};

export default ZenStoneGardenAcousticsCPP;
