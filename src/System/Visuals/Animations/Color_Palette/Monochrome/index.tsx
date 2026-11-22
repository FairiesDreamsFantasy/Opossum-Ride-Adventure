/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LuminanceWeightsKernel } from "./LuminanceWeightsKernel";
import { OrderedHalftoneSolver } from "./OrderedHalftoneSolver";
import { MonochromeGrayscaleSystem } from "./Grayscale";

export * from "./LuminanceWeightsKernel";
export * from "./OrderedHalftoneSolver";
export * from "./Grayscale";

/**
 * Monochrome Visuals System
 * Manages dual-color aesthetics, grayscale mapping, and vintage displays.
 */
export const MonochromeSystem = {
  Luminance: LuminanceWeightsKernel,
  Halftone: OrderedHalftoneSolver,
  Grayscale: MonochromeGrayscaleSystem,

  toGrayscale: (r: number, g: number, b: number) => {
    return LuminanceWeightsKernel.computeRec601Luminance(r, g, b);
  },
  
  applyMonochromeFilter: (gray: number, threshold: number = 128) => {
    return OrderedHalftoneSolver.thresholdBinary(gray, threshold);
  }
};
