/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STACEY_JASMIN_DIMENSIONS } from "../../Description/Dimensions";

export const STACEY_JASMIN_GEOMETRY = {
  body: {
    width: STACEY_JASMIN_DIMENSIONS.width,
    length: STACEY_JASMIN_DIMENSIONS.length,
    furThicknessPercent: 135
  },
  head: {
    width: STACEY_JASMIN_DIMENSIONS.headWidth,
    height: STACEY_JASMIN_DIMENSIONS.headHeight,
    orientation: "perched_on_neck"
  },
  ears: {
    orientation: "upright"
  },
  tail: {
    length: STACEY_JASMIN_DIMENSIONS.tailLength
  }
};

export default STACEY_JASMIN_GEOMETRY;
