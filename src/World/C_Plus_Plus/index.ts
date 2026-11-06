/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - World Orbital Clock & Solar Elevation Tensor
 * Native C++ High-Precision World Bridge
 */

export const WorldSolarTensorCPP = {
  /**
   * Computes solar elevation angle (degrees) based on diurnal time percentage (0.0 to 1.0):
   */
  computeSolarElevationDeg: (timePercent: number): number => {
    const angleRad = timePercent * Math.PI * 2.0 - Math.PI / 2.0;
    const sinElev = Math.sin(angleRad);
    return Number((sinElev * 90.0).toFixed(2));
  },

  /**
   * Evaluates world gravity acceleration scalar: g = 9.80665 * gravityMultiplier
   */
  computeGravityAcceleration: (gravityMultiplier: number = 1.0): number => {
    return Number((9.80665 * Math.max(0.1, gravityMultiplier)).toFixed(4));
  }
};

export default WorldSolarTensorCPP;
