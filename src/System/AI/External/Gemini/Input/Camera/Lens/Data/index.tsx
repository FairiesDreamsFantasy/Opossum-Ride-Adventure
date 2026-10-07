/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LensGridConfig {
  focalLengthMm: number;
  apertureFStop: number;
  pixelGridColumns: number;
  pixelGridRows: number;
  sensorWidthMm: number;
  sensorHeightMm: number;
  distortionCoefficient: number;
}

export const DEFAULT_LENS_GRID_CONFIG: LensGridConfig = {
  focalLengthMm: 50,
  apertureFStop: 1.8,
  pixelGridColumns: 1920,
  pixelGridRows: 1080,
  sensorWidthMm: 36,
  sensorHeightMm: 24,
  distortionCoefficient: 0.001
};

export const LensData = {
  defaultConfig: DEFAULT_LENS_GRID_CONFIG
};
