/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Daisy Rose Bespoke Geometry Generator
 * Native C++ High-Precision Individual Character Kernel
 */

export const DaisyRoseFlowerGeometryCPP = {
  flowerDiameterInches: 4.0,
  blueBorderThicknessInches: 0.25,

  /**
   * Computes 2D radial coordinate offset for 4-inch flower pattern placement:
   */
  computeFlowerPatternPolarOffset: (angleRad: number, radiusRatio: number = 1.0): { x: number; y: number } => {
    const r = (DaisyRoseFlowerGeometryCPP.flowerDiameterInches / 2.0) * radiusRatio;
    return {
      x: Number((r * Math.cos(angleRad)).toFixed(4)),
      y: Number((r * Math.sin(angleRad)).toFixed(4))
    };
  }
};

export default DaisyRoseFlowerGeometryCPP;
