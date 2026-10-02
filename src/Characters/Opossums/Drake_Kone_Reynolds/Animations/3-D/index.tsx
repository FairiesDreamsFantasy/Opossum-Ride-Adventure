/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DRAKE_COLOR_PALETTE } from "../Color_Palette";

export const DRAKE_3D_MODEL = {
  meshId: "drake_kone_reynolds_stocky_mesh",
  material: {
    color: DRAKE_COLOR_PALETTE.baseFur,
    roughness: 0.8,
    metalness: 0.1
  },
  stripesCount: 7,
  stripeMaterial: {
    color: DRAKE_COLOR_PALETTE.stripes,
    borderColor: DRAKE_COLOR_PALETTE.stripeBorder
  },
  ears: {
    outer: DRAKE_COLOR_PALETTE.outerEar,
    inner: DRAKE_COLOR_PALETTE.innerEar
  },
  tail: {
    shortenedRatio: 0.7,
    furryPercent: 5
  },
  paws: {
    color: DRAKE_COLOR_PALETTE.paws,
    pads: DRAKE_COLOR_PALETTE.pawPads
  }
};

export default DRAKE_3D_MODEL;
