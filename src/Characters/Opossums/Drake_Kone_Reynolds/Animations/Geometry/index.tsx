/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DRAKE_KONE_REYNOLDS_DIMENSIONS } from "../../Description/Dimensions";

export const DRAKE_GEOMETRY = {
  torso: {
    width: DRAKE_KONE_REYNOLDS_DIMENSIONS.width,
    length: DRAKE_KONE_REYNOLDS_DIMENSIONS.length,
    stockyFactor: 1.15,
    stripeCount: 7,
    stripeWidth: 7, // inches
    stripeSpacing: (DRAKE_KONE_REYNOLDS_DIMENSIONS.length - 7 * 7) / 8
  },
  head: {
    width: DRAKE_KONE_REYNOLDS_DIMENSIONS.headWidth,
    height: DRAKE_KONE_REYNOLDS_DIMENSIONS.headHeight,
    orientation: "perched_forward",
    snoutRatio: DRAKE_KONE_REYNOLDS_DIMENSIONS.snoutScale
  },
  tail: {
    scaleRatio: DRAKE_KONE_REYNOLDS_DIMENSIONS.tailScale,
    furryRatio: 0.05
  },
  faceFurRatio: 0.30
};

export default DRAKE_GEOMETRY;
