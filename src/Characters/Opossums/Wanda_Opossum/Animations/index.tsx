/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawWanda2D } from "./2-D";
import { drawWanda3D } from "./3-D";
import { drawWandaPolygons } from "./Polygons";
import { getWandaPixelationSettings } from "./Pixelations";
import { WANDA_COLOR_PALETTE } from "./Color_Palette";
import { WANDA_GEOMETRY } from "./Geometry";
export const WANDA_PARTS = {
    head: "perched_upright (35.9999in width, 44.9999in height)",
    snout: "compact_5pct_shorter",
    ears: "scaled_up_3.5pct_light_amber_outer_reddish_brown_inner",
    eyes: "indigo",
    nose: "red",
    neck: "perched_upright",
    body: "light_amber (36in width, 84in length, 62.9999in shoulder height)",
    fur: "Light Amber coat",
    skin: "Dark-Brown (0.0001% furry face coverage, highly sensitive hairless face skin)",
    tail: "flexible_winding_red",
    legs: "four_legged_standard",
    paws: "saffron_padded",
    accessories: []
  };
import { WANDA_MOVEMENTS } from "./Movements";
import { WANDA_ACCESSORIES } from "./Accessories";

export const WandaAnimations = {
  draw2D: drawWanda2D,
  draw3D: drawWanda3D,
  drawPolygons: drawWandaPolygons,
  getPixelationSettings: getWandaPixelationSettings,
  ColorPalette: WANDA_COLOR_PALETTE,
  Geometry: WANDA_GEOMETRY,
  Parts: WANDA_PARTS,
  Movements: WANDA_MOVEMENTS,
  Accessories: WANDA_ACCESSORIES
};

export default WandaAnimations;
