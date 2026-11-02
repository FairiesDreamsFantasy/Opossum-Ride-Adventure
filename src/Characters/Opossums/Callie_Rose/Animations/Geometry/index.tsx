/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CALLIE_ROSE_DIMENSIONS } from "../../Description/Dimensions";

export const CALLIE_ROSE_GEOMETRY = {
  body: {
    width: CALLIE_ROSE_DIMENSIONS.width,
    length: CALLIE_ROSE_DIMENSIONS.length,
    circleDiameter: 4.5,
    borderCm: 1.8,
    spacing: 3.0
  },
  head: {
    width: CALLIE_ROSE_DIMENSIONS.headWidth,
    height: CALLIE_ROSE_DIMENSIONS.headHeight,
    orientation: "perched_on_neck"
  },
  ears: {
    orientation: "upright",
    scaleFactor: CALLIE_ROSE_DIMENSIONS.earScaleFactor,
    lengthFactor: CALLIE_ROSE_DIMENSIONS.earLengthFactor
  },
  tail: {
    length: CALLIE_ROSE_DIMENSIONS.tailLength
  }
};

export default CALLIE_ROSE_GEOMETRY;
