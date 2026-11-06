/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Cherry Orchard Train Track Acoustic Shadow Kernel
 * Native C++ High-Precision Subarena Bridge
 */

export const CherryOrchardAcousticsCPP = {
  trackElevationFeet: 50.0,
  pillarSpacingFeet: 40.0,

  computeTrackAcousticShadowAtten: (distanceFromPillarMeters: number): number => {
    const shadowRatio = Math.min(1.0, distanceFromPillarMeters / 15.0);
    return Number((0.65 + shadowRatio * 0.35).toFixed(4));
  }
};

export default CherryOrchardAcousticsCPP;
