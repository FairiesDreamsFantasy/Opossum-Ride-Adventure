/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JAMIE_JASMINE_DIMENSIONS } from "../Description/Dimensions";

export const JAMIE_JASMINE_UNITS = {
  morphometrics: {
    shoulderHeightInches: JAMIE_JASMINE_DIMENSIONS.shoulderHeightInches,
    shoulderHeightFormatted: JAMIE_JASMINE_DIMENSIONS.shoulderHeight,
    bodyLengthInches: JAMIE_JASMINE_DIMENSIONS.length,
    bodyWidthInches: JAMIE_JASMINE_DIMENSIONS.width,
    headWidthInches: JAMIE_JASMINE_DIMENSIONS.headWidth,
    headHeightInches: JAMIE_JASMINE_DIMENSIONS.headHeight,
    tailLengthMultiplier: JAMIE_JASMINE_DIMENSIONS.tailLengthMultiplier,
    furryFace: false
  },
  kinematics: {
    baseGaitFrequency: 1.85,
    strideLengthMeters: 1.45
  },
  acoustics: {
    startFrequency: 1278.810156674532,
    endFrequency: 442.659668648825,
    offsetVsQiPercent: 0.008
  }
};

export default JAMIE_JASMINE_UNITS;
