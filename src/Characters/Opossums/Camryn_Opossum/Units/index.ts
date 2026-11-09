/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CAMRYN_OPOSSUM_DIMENSIONS } from "../Description/Dimensions";

export const CAMRYN_OPOSSUM_UNITS = {
  morphometrics: {
    shoulderHeightInches: CAMRYN_OPOSSUM_DIMENSIONS.shoulderHeightInches,
    shoulderHeightFormatted: CAMRYN_OPOSSUM_DIMENSIONS.shoulderHeight,
    bodyLengthInches: CAMRYN_OPOSSUM_DIMENSIONS.length,
    bodyWidthInches: CAMRYN_OPOSSUM_DIMENSIONS.width,
    headWidthInches: CAMRYN_OPOSSUM_DIMENSIONS.headWidth,
    headHeightInches: CAMRYN_OPOSSUM_DIMENSIONS.headHeight,
    furryFace: false
  },
  kinematics: {
    baseGaitFrequency: 1.82,
    strideLengthMeters: 1.42
  },
  acoustics: {
    startFrequency: 1332.695000000000,
    endFrequency: 461.317500000000,
    offsetVsJacintaPercent: 1.5
  }
};

export default CAMRYN_OPOSSUM_UNITS;
