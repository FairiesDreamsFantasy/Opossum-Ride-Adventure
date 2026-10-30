/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DAISY_ROSE_DIMENSIONS } from "../../Description/Dimensions";

export const DAISY_ROSE_GEOMETRY = {
  body: {
    width: DAISY_ROSE_DIMENSIONS.width,
    length: DAISY_ROSE_DIMENSIONS.length,
    flowerDiameter: 4.0,
    borderCm: 1.5011,
    spacing: 2.5013
  },
  head: {
    width: DAISY_ROSE_DIMENSIONS.headWidth,
    height: DAISY_ROSE_DIMENSIONS.headHeight,
    orientation: "perched_on_neck"
  },
  ears: {
    orientation: "upright",
    scaleFactor: DAISY_ROSE_DIMENSIONS.earScaleFactor
  },
  tail: {
    length: DAISY_ROSE_DIMENSIONS.tailLength,
    scaleFactor: DAISY_ROSE_DIMENSIONS.tailScaleFactor,
    spiralWidthCm: 1.44
  }
};

export default DAISY_ROSE_GEOMETRY;
