/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";

import { FeralPigStereoCalibrator, FeralPigSpatialParameters, CalibratedAcousticProfile } from "./General";

export const FeralPigSpatialAudio = {
  Calibrator: FeralPigStereoCalibrator,
  calculateAcoustics: FeralPigStereoCalibrator.calculateAcoustics.bind(FeralPigStereoCalibrator),
  createSpatialSubchain: FeralPigStereoCalibrator.createSpatialSubchain.bind(FeralPigStereoCalibrator)
};
