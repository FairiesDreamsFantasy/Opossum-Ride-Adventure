/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Building Block Module: Flowers, Stars, Diamonds, and Rainbow Stone Door With Carvings
 */

import FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_CONFIG from "./General";
import FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_DESCRIPTION, {
  FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_DIMENSIONS
} from "./Description";
import FLOWERS_STARS_DIAMONDS_RAINBOW_COLOR_PALETTE, {
  drawCarvedStoneDoorLeaf,
  drawFivePointStar,
  drawCarvedDiamond
} from "./Animations";

export {
  FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_CONFIG,
  FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_DESCRIPTION,
  FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_DIMENSIONS,
  FLOWERS_STARS_DIAMONDS_RAINBOW_COLOR_PALETTE,
  drawCarvedStoneDoorLeaf,
  drawFivePointStar,
  drawCarvedDiamond
};

export const FlowersStarsDiamondsRainbowStoneDoors = {
  config: FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_CONFIG,
  description: FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_DESCRIPTION,
  dimensions: FLOWERS_STARS_DIAMONDS_RAINBOW_STONE_DOORS_DIMENSIONS,
  palette: FLOWERS_STARS_DIAMONDS_RAINBOW_COLOR_PALETTE,
  drawLeaf: drawCarvedStoneDoorLeaf
};

export default FlowersStarsDiamondsRainbowStoneDoors;
