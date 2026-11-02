/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawSandra2D } from "./2-D";
import { drawSandra3D } from "./3-D";
import { drawSandraPolygons } from "./Polygons";
import { getSandraPixelationSettings } from "./Pixelations";
import { SANDRA_COLOR_PALETTE } from "./Color_Palette";
import { SANDRA_GEOMETRY } from "./Geometry";
export const SANDRA_PARTS = {
    head: "perched_upright (36in width, 36in height)",
    snout: "extended_ashley_plus_3_percent",
    ears: "solid_lavender_pink_inner",
    eyes: "dark-blue",
    nose: "pink",
    neck: "perched_upright",
    body: "lavender (38in width, 88in length, 63in shoulder height)",
    fur: "Lavender coat (0.0000000001% facial fur layer)",
    skin: "Light Brown Face Skin (100% furry face coverage with Light Brown face fur tone)",
    tail: "flexible_winding_pink_extended (32.4% scale ratio)",
    legs: "four_legged_standard",
    paws: "light_pink_padded",
    accessories: []
  };
import { SANDRA_MOVEMENTS } from "./Movements";
import { SANDRA_ACCESSORIES } from "./Accessories";

export const SandraAnimations = {
  draw2D: drawSandra2D,
  draw3D: drawSandra3D,
  drawPolygons: drawSandraPolygons,
  getPixelationSettings: getSandraPixelationSettings,
  ColorPalette: SANDRA_COLOR_PALETTE,
  Geometry: SANDRA_GEOMETRY,
  Parts: SANDRA_PARTS,
  Movements: SANDRA_MOVEMENTS,
  Accessories: SANDRA_ACCESSORIES
};

export default SandraAnimations;
