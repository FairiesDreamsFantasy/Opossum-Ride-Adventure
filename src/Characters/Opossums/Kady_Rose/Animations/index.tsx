/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawKady2D } from "./2-D";
import { drawKady3D } from "./3-D";
import { drawKadyPolygons } from "./Polygons";
import { getKadyPixelationSettings } from "./Pixelations";
import { KADY_COLOR_PALETTE } from "./Color_Palette";
import { KADY_GEOMETRY } from "./Geometry";
export const KADY_PARTS = {
    head: "perched_upright (47.5in width, 46in height)",
    snout: "standard_rose_proportion",
    ears: "light_gray_bronze_circles",
    eyes: "light-green",
    nose: "red-orange",
    neck: "perched_upright",
    body: "light_gray_bronze_circles (48in width, 95in length, 71in shoulder height)",
    fur: "Light Gray fur with bronze ear circles",
    skin: "Honey Dark-Brown (0% furry face coverage)",
    tail: "flexible_winding_red_orange",
    legs: "four_legged_substantial",
    paws: "saffron_padded",
    accessories: [
      "gold_earrings_3in",
      "red_necklace_pink_heart"
    ]
  };
import { KADY_MOVEMENTS } from "./Movements";
import { KADY_ACCESSORIES } from "./Accessories";

export const KadyAnimations = {
  draw2D: drawKady2D,
  draw3D: drawKady3D,
  drawPolygons: drawKadyPolygons,
  getPixelationSettings: getKadyPixelationSettings,
  ColorPalette: KADY_COLOR_PALETTE,
  Geometry: KADY_GEOMETRY,
  Parts: KADY_PARTS,
  Movements: KADY_MOVEMENTS,
  Accessories: KADY_ACCESSORIES
};

export default KadyAnimations;
