/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ARNOLD_ROSE_DIMENSIONS } from "../../Description/Dimensions";

export const ARNOLD_ROSE_GEOMETRY = {
  body: {
    width: ARNOLD_ROSE_DIMENSIONS.width,
    length: ARNOLD_ROSE_DIMENSIONS.length,
    ovalDiameterInches: 2.5
  },
  head: {
    width: ARNOLD_ROSE_DIMENSIONS.headWidth,
    height: ARNOLD_ROSE_DIMENSIONS.headHeight,
    orientation: "perched_forward"
  },
  ears: {
    orientation: "standard"
  },
  tail: {
    length: ARNOLD_ROSE_DIMENSIONS.tailLength
  }
};

export default ARNOLD_ROSE_GEOMETRY;
