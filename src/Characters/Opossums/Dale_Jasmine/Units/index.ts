/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DALE_JASMINE_DIMENSIONS } from "../Description/Dimensions";

export const DALE_JASMINE_UNITS = {
  morphometrics: {
    shoulderHeightInches: DALE_JASMINE_DIMENSIONS.shoulderHeightInches,
    shoulderHeightFormatted: DALE_JASMINE_DIMENSIONS.shoulderHeight,
    bodyLengthInches: DALE_JASMINE_DIMENSIONS.length,
    bodyWidthInches: DALE_JASMINE_DIMENSIONS.width,
    headWidthInches: DALE_JASMINE_DIMENSIONS.headWidth,
    headHeightInches: DALE_JASMINE_DIMENSIONS.headHeight,
    tailLengthMultiplier: DALE_JASMINE_DIMENSIONS.tailLengthMultiplier,
    furryFace: false
  },
  kinematics: {
    baseGaitFrequency: 1.85,
    strideLengthMeters: 1.45
  },
  acoustics: {
    startFrequency: 1278.6822864,
    endFrequency: 442.6154064,
    offsetVsStaceyPercent: 0.008
  }
};

export default DALE_JASMINE_UNITS;
