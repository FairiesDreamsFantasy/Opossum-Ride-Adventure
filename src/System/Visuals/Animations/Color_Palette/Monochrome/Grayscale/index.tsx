/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GrayscaleHistogramSolver } from "./GrayscaleHistogramSolver";
import { GrayscaleToneMapper } from "./GrayscaleToneMapper";

export * from "./GrayscaleHistogramSolver";
export * from "./GrayscaleToneMapper";

/**
 * Monochrome Grayscale Subsystem
 * Combines 256-bin Otsu histogram segmentation with Reinhard/Gamma tone mapping.
 */
export const MonochromeGrayscaleSystem = {
  Histogram: GrayscaleHistogramSolver,
  ToneMapper: GrayscaleToneMapper,

  toToneMappedByte: (hdrLuminance: number, gamma: number = 2.2): number => {
    const mapped = GrayscaleToneMapper.applyReinhardToneMap(hdrLuminance);
    return GrayscaleToneMapper.applyGamma(mapped, gamma);
  }
};

export default MonochromeGrayscaleSystem;
