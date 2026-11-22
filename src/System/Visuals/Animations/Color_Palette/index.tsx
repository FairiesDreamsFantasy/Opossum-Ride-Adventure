/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ColorSpaceMath } from "./ColorSpaceMath";
import { MonochromeSystem } from "./Monochrome";
import { PatternPalette, PatternPaletteSolver } from "./Pattern_Palette";
import { TexturePalette, TexturePalettePhysics } from "./Texture_Palette";

export * from "./ColorSpaceMath";
export * from "./Monochrome";
export * from "./Pattern_Palette";
export * from "./Texture_Palette";

/**
 * Master Color Palette Subsystem
 * Aggregates ColorSpaceMath, Monochrome (+ Grayscale), Pattern_Palette, and Texture_Palette.
 */
export const ColorPaletteEngine = {
  ColorSpace: ColorSpaceMath,
  Monochrome: MonochromeSystem,
  PatternPalette,
  PatternSolver: PatternPaletteSolver,
  TexturePalette,
  TexturePhysics: TexturePalettePhysics
};

export default ColorPaletteEngine;
