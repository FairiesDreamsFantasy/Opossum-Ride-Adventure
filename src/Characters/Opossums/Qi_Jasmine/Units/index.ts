/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QI_JASMINE_DIMENSIONS } from "../Description/Dimensions";

export const QI_JASMINE_UNITS = {
  morphometrics: {
    shoulderHeightInches: QI_JASMINE_DIMENSIONS.shoulderHeightInches,
    shoulderHeightFormatted: QI_JASMINE_DIMENSIONS.shoulderHeight,
    bodyLengthInches: QI_JASMINE_DIMENSIONS.length,
    bodyWidthInches: QI_JASMINE_DIMENSIONS.width,
    headWidthInches: QI_JASMINE_DIMENSIONS.headWidth,
    headHeightInches: QI_JASMINE_DIMENSIONS.headHeight,
    furryFace: false
  },
  kinematics: {
    baseGaitFrequency: 1.85,
    strideLengthMeters: 1.45
  },
  acoustics: {
    startFrequency: 1278.707860045728,
    endFrequency: 442.624258708128,
    offsetVsDalePercent: 0.002
  }
};

export default QI_JASMINE_UNITS;
