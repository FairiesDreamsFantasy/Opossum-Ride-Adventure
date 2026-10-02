/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawOlivia2D } from "./2-D";
import { drawOlivia3D } from "./3-D";
import { drawOliviaPolygons } from "./Polygons";
import { getOliviaPixelationSettings } from "./Pixelations";
import { OLIVIA_COLOR_PALETTE } from "./Color_Palette";
import { OLIVIA_GEOMETRY } from "./Geometry";
export const OLIVIA_PARTS = {
    head: "perched_upright (37in width, 35in height)",
    snout: "standard_chin_proportion",
    ears: "blond_outer_reddish_brown_inner",
    eyes: "deep_indigo",
    nose: "reddish-brown",
    neck: "perched_upright",
    body: "distinctive_blond (38in width, 84in length, 61in shoulder height)",
    fur: "Distinctive Blond coat",
    skin: "Light Brown Face Skin (100% furry face coverage with Light Brown face fur tone)",
    tail: "reddish_brown_30pct_scale",
    legs: "four_legged_compact",
    paws: "saffron_padded",
    accessories: []
  };
import { OLIVIA_MOVEMENTS } from "./Movements";
import { OLIVIA_ACCESSORIES } from "./Accessories";

export const OliviaAnimations = {
  draw2D: drawOlivia2D,
  draw3D: drawOlivia3D,
  drawPolygons: drawOliviaPolygons,
  getPixelationSettings: getOliviaPixelationSettings,
  ColorPalette: OLIVIA_COLOR_PALETTE,
  Geometry: OLIVIA_GEOMETRY,
  Parts: OLIVIA_PARTS,
  Movements: OLIVIA_MOVEMENTS,
  Accessories: OLIVIA_ACCESSORIES
};

export default OliviaAnimations;
