/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RUDY_COLOR_PALETTE } from "../Color_Palette";

export const RUDY_3D_MODEL = {
  meshId: "rudy_kone_reynolds_compact_mesh",
  material: {
    color: RUDY_COLOR_PALETTE.baseFur,
    roughness: 0.85,
    metalness: 0.05
  },
  patternMaterial: {
    circleColor: RUDY_COLOR_PALETTE.circlePattern,
    circleBorderColor: RUDY_COLOR_PALETTE.circleBorder
  },
  ears: {
    outer: RUDY_COLOR_PALETTE.outerEar,
    inner: RUDY_COLOR_PALETTE.innerEar,
    orientation: "downward_dog_like_sides"
  },
  tail: {
    color: RUDY_COLOR_PALETTE.tail,
    shortenedRatio: 0.65,
    furryPercent: 7.128
  },
  paws: {
    color: RUDY_COLOR_PALETTE.paws
  },
  face: {
    eyes: RUDY_COLOR_PALETTE.eyes,
    nose: RUDY_COLOR_PALETTE.nose,
    furryFacePercentage: 30
  }
};

export default RUDY_3D_MODEL;
