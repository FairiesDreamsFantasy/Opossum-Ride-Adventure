/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUDY_KONE_REYNOLDS_DIMENSIONS } from "../../Description/Dimensions";

export const RUDY_GEOMETRY = {
  torso: {
    shoulderHeight: RUDY_KONE_REYNOLDS_DIMENSIONS.shoulderHeight,
    shoulderHeightInches: RUDY_KONE_REYNOLDS_DIMENSIONS.shoulderHeightInches,
    circleDiameterInches: 6,
    circleBorderCm: 1,
    circleSpacingInches: 1.88,
    compactScale: 0.92
  },
  head: {
    orientation: "Standard",
    faceFurCoverageRatio: 0.30
  },
  ears: {
    orientation: "Downward (similar to a dog, oriented to sides)",
    outerColor: "Orange",
    innerColor: "Brownish-Red"
  },
  tail: {
    length: "Short",
    furryRatio: 0.07128,
    scaleRatio: 0.65
  }
};

export default RUDY_GEOMETRY;
