/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JACINTA_OPOSSUM_DIMENSIONS } from "../Description/Dimensions";

export const JACINTA_OPOSSUM_UNITS = {
  morphometrics: {
    shoulderHeightInches: JACINTA_OPOSSUM_DIMENSIONS.shoulderHeightInches,
    shoulderHeightFormatted: JACINTA_OPOSSUM_DIMENSIONS.shoulderHeight,
    bodyLengthInches: JACINTA_OPOSSUM_DIMENSIONS.length,
    bodyWidthInches: JACINTA_OPOSSUM_DIMENSIONS.width,
    headWidthInches: JACINTA_OPOSSUM_DIMENSIONS.headWidth,
    headHeightInches: JACINTA_OPOSSUM_DIMENSIONS.headHeight,
    furryFace: false
  },
  kinematics: {
    baseGaitFrequency: 1.82,
    strideLengthMeters: 1.42
  },
  acoustics: {
    startFrequency: 1313.000000000000,
    endFrequency: 454.500000000000,
    offsetVsMelissaPercent: 1.0
  }
};

export default JACINTA_OPOSSUM_UNITS;
