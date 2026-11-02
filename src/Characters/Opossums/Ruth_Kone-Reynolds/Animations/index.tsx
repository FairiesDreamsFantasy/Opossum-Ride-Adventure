/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawRuth2D } from "./2-D";
import { drawRuth3D } from "./3-D";
import { drawRuthPolygons } from "./Polygons";
import { getRuthPixelationSettings } from "./Pixelations";
import { RUTH_COLOR_PALETTE } from "./Color_Palette";
import { RUTH_GEOMETRY } from "./Geometry";
export const RUTH_PARTS = {
    head: "perched_upright (43.33in width, 44.88in height)",
    snout: "standard_kone_reynolds",
    ears: "pink_rainbow_diamond_pattern_reddish_brown_inner",
    eyes: "serene_sky_blue",
    nose: "light_pink",
    neck: "perched_serenity",
    body: "pink_25_color_flower_motifs (45in width, 96in length, 72in shoulder height)",
    fur: "Pink fur patterned with 25-color flower motifs (4-inch flower diameter)",
    skin: "Honey Dark-Brown (0% furry face coverage, smooth face skin)",
    tail: "flexible_winding_pink",
    legs: "four_legged_tall",
    paws: "orange_padded",
    earrings: "yellow_earrings_4in",
    necklace: "yellow_necklace_gold_flower",
    accessories: [
      "yellow_earrings_4in",
      "yellow_necklace_gold_flower"
    ]
  };
import { RUTH_MOVEMENTS } from "./Movements";
import { RUTH_ACCESSORIES } from "./Accessories";

export const RuthAnimations = {
  draw2D: drawRuth2D,
  draw3D: drawRuth3D,
  drawPolygons: drawRuthPolygons,
  getPixelationSettings: getRuthPixelationSettings,
  ColorPalette: RUTH_COLOR_PALETTE,
  Geometry: RUTH_GEOMETRY,
  Parts: RUTH_PARTS,
  Movements: RUTH_MOVEMENTS,
  Accessories: RUTH_ACCESSORIES
};

export default RuthAnimations;
