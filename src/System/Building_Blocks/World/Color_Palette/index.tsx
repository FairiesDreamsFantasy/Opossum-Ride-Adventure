import { ColorPaletteGeneral } from "./General";
import { PatternPalette } from "./Pattern_Palette";
import { TexturePalette } from "./Texture_Palette";

/**
 * World Color Palette System
 * Master themes, patterns, and texture profiles for Opossum Ride Adventure.
 */
export const ColorPalette = {
  ...ColorPaletteGeneral,
  General: ColorPaletteGeneral,
  Pattern: PatternPalette,
  Texture: TexturePalette
};
